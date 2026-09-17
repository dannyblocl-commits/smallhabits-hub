"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireCoach, requireUser } from "@/lib/auth";

export type CoachCard = { id: string; name: string; bio: string | null; specialties: string | null; members: number; created_at: string };

export async function listCoaches(): Promise<CoachCard[]> {
  await requireUser();
  const r = await db().query(`
    select c.id, c.name, c.bio, c.specialties, c.created_at,
      (select count(*) from users m where m.coach_id=c.id)::int as members
    from users c where c.role='coach' order by c.created_at asc`);
  return r.rows.map((c) => ({ ...c, created_at: new Date(c.created_at).toISOString() }));
}

export async function myCoach(): Promise<{ id: string; name: string; specialties: string | null } | null> {
  const me = await requireUser();
  const r = await db().query(
    "select c.id, c.name, c.specialties from users u join users c on c.id = coalesce(u.coach_id, (select id from users where role='coach' order by created_at asc limit 1)) where u.id=$1",
    [me.id]
  );
  return r.rows[0] ?? null;
}

export async function chooseCoach(form: FormData) {
  const me = await requireUser();
  const coachId = String(form.get("coach_id") || "");
  const ok = await db().query("select 1 from users where id=$1 and role='coach'", [coachId]);
  if (!ok.rowCount) return;
  await db().query("update users set coach_id=$1 where id=$2", [coachId, me.id]);
  redirect("/dashboard");
}

export async function updateCoachProfile(form: FormData) {
  const coach = await requireCoach();
  const bio = String(form.get("bio") || "").trim().slice(0, 400) || null;
  const specialties = String(form.get("specialties") || "").trim().slice(0, 160) || null;
  await db().query("update users set bio=$1, specialties=$2 where id=$3", [bio, specialties, coach.id]);
  redirect("/coach");
}
