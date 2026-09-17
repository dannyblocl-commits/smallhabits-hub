"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireCoach, requireUser } from "@/lib/auth";

export type Assignment = { routine_id: string | null; menu_id: string | null; note: string | null; at: string; coach_name: string | null };

export async function getAssignment(userId?: string): Promise<Assignment | null> {
  const me = await requireUser();
  const target = me.role === "coach" && userId ? userId : me.id;
  const r = await db().query("select a.routine_id, a.menu_id, a.note, a.at, u.name as coach_name from assignments a left join users u on u.id=a.by_coach where a.user_id=$1", [target]);
  if (!r.rows[0]) return null;
  return { ...r.rows[0], at: new Date(r.rows[0].at).toISOString() };
}

export async function assign(form: FormData) {
  const coach = await requireCoach();
  const userId = String(form.get("user_id") || "");
  const routine = String(form.get("routine_id") || "") || null;
  const menu = String(form.get("menu_id") || "") || null;
  const note = String(form.get("note") || "").trim().slice(0, 500) || null;
  if (!userId) return;
  await db().query(
    `insert into assignments (user_id, routine_id, menu_id, note, by_coach, at) values ($1,$2,$3,$4,$5,now())
     on conflict (user_id) do update set routine_id=excluded.routine_id, menu_id=excluded.menu_id, note=excluded.note, by_coach=excluded.by_coach, at=now()`,
    [userId, routine, menu, note, coach.id]
  );
  redirect(`/coach/${userId}`);
}

export async function getMember(id: string) {
  const coach = await requireCoach();
  const r = await db().query(`
    select u.id, u.name, u.email, u.goal, u.plan, u.weight, u.height, u.created_at, (u.coach_id = $2) as mine,
      coalesce((select sum(kcal) from food_entries f where f.user_id=u.id and f.at >= date_trunc('day', now())),0)::int as kcal_today,
      (select count(*) from workouts_done w where w.user_id=u.id and w.at >= date_trunc('week', now()))::int as workouts_week,
      (select count(*) from workouts_done w where w.user_id=u.id)::int as workouts_total
    from users u where u.id=$1 and u.role='member' and (u.coach_id=$2 or u.coach_id is null)`, [id, coach.id]);
  const m = r.rows[0];
  if (!m) return null;
  const [foods, weights] = await Promise.all([
    db().query("select name, kcal, at from food_entries where user_id=$1 order by at desc limit 8", [id]),
    db().query("select weight, at from progress_entries where user_id=$1 and weight is not null order by at desc limit 8", [id]),
  ]);
  return {
    ...m, weight: m.weight === null ? null : Number(m.weight), created_at: new Date(m.created_at).toISOString(),
    foods: foods.rows.map((f) => ({ ...f, at: new Date(f.at).toISOString() })),
    weights: weights.rows.map((w) => ({ weight: Number(w.weight), at: new Date(w.at).toISOString() })),
  };
}
