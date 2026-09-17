"use server";

import { db } from "@/lib/db";
import { requireCoach } from "@/lib/auth";

export type MemberRow = {
  id: string; name: string; email: string; goal: string; plan: string; weight: number | null; created_at: string;
  kcal_today: number; workouts_week: number; last_food: string | null; last_workout: string | null;
};

export async function listMembers(): Promise<MemberRow[]> {
  await requireCoach();
  const r = await db().query(`
    select u.id, u.name, u.email, u.goal, u.plan, u.weight, u.created_at,
      coalesce((select sum(kcal) from food_entries f where f.user_id=u.id and f.at >= date_trunc('day', now())),0)::int as kcal_today,
      (select count(*) from workouts_done w where w.user_id=u.id and w.at >= date_trunc('week', now()))::int as workouts_week,
      (select max(at) from food_entries f where f.user_id=u.id) as last_food,
      (select max(at) from workouts_done w where w.user_id=u.id) as last_workout
    from users u where u.role='member' order by u.created_at desc`);
  return r.rows.map((x) => ({ ...x, weight: x.weight === null ? null : Number(x.weight), created_at: new Date(x.created_at).toISOString(), last_food: x.last_food ? new Date(x.last_food).toISOString() : null, last_workout: x.last_workout ? new Date(x.last_workout).toISOString() : null }));
}

export async function coachSummary() {
  await requireCoach();
  const r = await db().query(`
    select
      (select count(*) from users where role='member')::int as members,
      (select count(*) from users where role='member' and plan<>'free')::int as paying,
      (select count(distinct user_id) from workouts_done where at >= now() - interval '7 days')::int as active_week,
      (select count(distinct user_id) from food_entries where at >= date_trunc('day', now()))::int as logged_today`);
  return r.rows[0] as { members: number; paying: number; active_week: number; logged_today: number };
}
