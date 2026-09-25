"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { PLAN_ORDER } from "@/lib/plan";

export type AdminUser = { id: string; name: string; email: string; role: string; plan: string; goal: string; coach_id: string | null; coach_name: string | null; created_at: string; last_seen: string | null; reto_start: string | null; reto_track: string | null; trial_end: string | null };

export async function listAllUsers(): Promise<AdminUser[]> {
  await requireAdmin();
  const r = await db().query(`
    select u.id, u.name, u.email, u.role, u.plan, u.goal, u.coach_id, c.name as coach_name, u.created_at, u.reto_start, u.reto_track, u.trial_end,
      greatest((select max(at) from food_entries f where f.user_id=u.id), (select max(at) from workouts_done w where w.user_id=u.id), (select max(at) from messages m where m.from_user=u.id)) as last_seen
    from users u left join users c on c.id=u.coach_id
    order by u.role desc, u.created_at desc`);
  const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : null);
  return r.rows.map((x) => ({ ...x, created_at: new Date(x.created_at).toISOString(), last_seen: iso(x.last_seen), reto_start: iso(x.reto_start), trial_end: iso(x.trial_end) }));
}

export async function adminStartReto(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") || "");
  const track = String(form.get("track") || "") === "hombre" ? "hombre" : "mujer";
  if (!id) return;
  await db().query(
    `update users
       set reto_start = now(), reto_track = $2, trial_end = now() + interval '30 days',
           plan = case when plan = 'elite' then plan else 'pro' end,
           plan_level = case when plan_level = 'elite' then plan_level else 'pro' end
     where id = $1 and role = 'member'`,
    [id, track]
  );
  redirect("/admin");
}

export async function adminStopReto(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") || "");
  if (!id) return;
  await db().query("update users set reto_start = null, reto_track = null where id = $1", [id]);
  redirect("/admin");
}

export async function adminUpdateUser(form: FormData) {
  const admin = await requireAdmin();
  const id = String(form.get("id") || "");
  const plan = String(form.get("plan") || "free");
  const role = String(form.get("role") || "member");
  const coach = String(form.get("coach_id") || "") || null;
  if (!id || !PLAN_ORDER.includes(plan as never) || !["member", "coach"].includes(role)) return;
  if (id === admin.id && role !== "coach" && admin.role === "coach") { /* el admin puede degradarse; permitido */ }
  await db().query("update users set plan=$1, plan_level=$5, role=$2, coach_id=$3 where id=$4", [plan, role, role === "coach" ? null : coach, id, plan === "free" ? "basico" : plan]);
  redirect("/admin");
}

export async function adminDeleteUser(form: FormData) {
  const admin = await requireAdmin();
  const id = String(form.get("id") || "");
  if (!id || id === admin.id) return;
  await db().query("delete from users where id=$1", [id]);
  redirect("/admin");
}
