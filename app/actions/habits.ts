"use server";

import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";

const TZ = "America/New_York";
export const todayLocal = async () => new Date().toLocaleDateString("en-CA", { timeZone: TZ });

export async function getWaterToday(): Promise<number> {
  const u = await requireUser();
  const r = await db().query("select glasses from water_log where user_id=$1 and day=$2", [u.id, await todayLocal()]);
  return r.rows[0]?.glasses ?? 0;
}

export async function addWater(delta: number): Promise<number> {
  const u = await requireUser();
  const d = delta > 0 ? 1 : -1;
  const r = await db().query(
    `insert into water_log (user_id, day, glasses) values ($1, $2, greatest(0, $3))
     on conflict (user_id, day) do update set glasses = least(20, greatest(0, water_log.glasses + $3))
     returning glasses`,
    [u.id, await todayLocal(), d]
  );
  return r.rows[0].glasses;
}

// Días de esta semana (lunes a domingo, hora de Florida) con al menos un entreno.
export async function weekActivity(): Promise<{ days: string[]; trained: string[]; today: string }> {
  const u = await requireUser();
  const today = await todayLocal();
  const t = new Date(today + "T12:00:00Z");
  const monday = new Date(t);
  monday.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 6) % 7));
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    return d.toISOString().slice(0, 10);
  });
  const r = await db().query(
    `select distinct to_char((at at time zone $2)::date, 'YYYY-MM-DD') as d
       from workouts_done where user_id=$1 and at > now() - interval '9 days'`,
    [u.id, TZ]
  );
  const set = new Set(r.rows.map((x) => x.d as string));
  return { days, trained: days.filter((d) => set.has(d)), today };
}
