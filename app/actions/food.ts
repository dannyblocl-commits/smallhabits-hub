"use server";

import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export type FoodEntry = { id: string; name: string; kcal: number; protein: number; carbs: number; fat: number; photo: string; at: string };

export async function listFoodToday(): Promise<FoodEntry[]> {
  const user = await requireUser();
  const r = await db().query(
    "select id, name, kcal, protein, carbs, fat, photo, at from food_entries where user_id=$1 and at >= date_trunc('day', now()) order by at asc",
    [user.id]
  );
  return r.rows.map((x) => ({ ...x, at: new Date(x.at).toISOString() }));
}

export async function addFoodEntry(e: { name: string; kcal: number; protein?: number; carbs?: number; fat?: number; photo?: string }): Promise<FoodEntry> {
  const user = await requireUser();
  const name = e.name.trim().slice(0, 120);
  const kcal = Math.max(0, Math.min(5000, Math.round(e.kcal)));
  if (!name || !kcal) throw new Error("Datos incompletos");
  const r = await db().query(
    "insert into food_entries (user_id, name, kcal, protein, carbs, fat, photo) values ($1,$2,$3,$4,$5,$6,$7) returning id, name, kcal, protein, carbs, fat, photo, at",
    [user.id, name, kcal, e.protein ?? 0, e.carbs ?? 0, e.fat ?? 0, e.photo ?? "◐"]
  );
  return { ...r.rows[0], at: new Date(r.rows[0].at).toISOString() };
}

export async function deleteFoodEntry(id: string) {
  const user = await requireUser();
  await db().query("delete from food_entries where id=$1 and user_id=$2", [id, user.id]);
}

export async function markWorkoutDone(routineId: string) {
  const user = await requireUser();
  await db().query("insert into workouts_done (user_id, routine_id) values ($1,$2)", [user.id, routineId]);
}

export async function stats() {
  const user = await requireUser();
  const [kcal, workouts, streak, weights] = await Promise.all([
    db().query("select coalesce(sum(kcal),0)::int as kcal from food_entries where user_id=$1 and at >= date_trunc('day', now())", [user.id]),
    db().query("select count(*)::int as n from workouts_done where user_id=$1 and at >= date_trunc('week', now())", [user.id]),
    db().query("select count(distinct date_trunc('day', at))::int as n from workouts_done where user_id=$1 and at >= now() - interval '30 days'", [user.id]),
    db().query("select weight, at from progress_entries where user_id=$1 and weight is not null order by at desc limit 8", [user.id]),
  ]);
  return {
    kcalToday: kcal.rows[0].kcal as number,
    workoutsWeek: workouts.rows[0].n as number,
    activeDays: streak.rows[0].n as number,
    weights: weights.rows.map((w) => Number(w.weight)).reverse() as number[],
  };
}
