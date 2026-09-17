import { db } from "@/lib/db";

export type WearableProvider = "google" | "garmin";

export const GOOGLE = {
  auth: "https://accounts.google.com/o/oauth2/v2/auth",
  token: "https://oauth2.googleapis.com/token",
  api: "https://health.googleapis.com/v4",
  scopes: [
    "https://www.googleapis.com/auth/googlehealth.activity_and_fitness.readonly",
    "https://www.googleapis.com/auth/googlehealth.sleep.readonly",
  ],
};

export function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "https://smallhabits-hub.vercel.app";
}

export async function getConnection(userId: string, provider: WearableProvider) {
  const r = await db().query("select * from wearable_connections where user_id=$1 and provider=$2", [userId, provider]);
  return r.rows[0] as { access_token: string; refresh_token: string | null; expires_at: string | null; last_sync: string | null; connected_at: string } | undefined;
}

export async function saveConnection(userId: string, provider: WearableProvider, t: { access_token: string; refresh_token?: string; expires_in?: number; scope?: string }) {
  const exp = t.expires_in ? new Date(Date.now() + t.expires_in * 1000) : null;
  await db().query(
    `insert into wearable_connections (user_id, provider, access_token, refresh_token, expires_at, scope)
     values ($1,$2,$3,$4,$5,$6)
     on conflict (user_id, provider) do update set access_token=excluded.access_token,
       refresh_token=coalesce(excluded.refresh_token, wearable_connections.refresh_token),
       expires_at=excluded.expires_at, scope=excluded.scope`,
    [userId, provider, t.access_token, t.refresh_token ?? null, exp, t.scope ?? null]
  );
}

export async function googleAccessToken(userId: string): Promise<string | null> {
  const c = await getConnection(userId, "google");
  if (!c) return null;
  const fresh = c.expires_at && new Date(c.expires_at).getTime() - Date.now() > 60_000;
  if (fresh) return c.access_token;
  if (!c.refresh_token) return c.access_token;
  const body = new URLSearchParams({ client_id: process.env.GOOGLE_HEALTH_CLIENT_ID!, client_secret: process.env.GOOGLE_HEALTH_CLIENT_SECRET!, refresh_token: c.refresh_token, grant_type: "refresh_token" });
  const r = await fetch(GOOGLE.token, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
  if (!r.ok) return null;
  const t = (await r.json()) as { access_token: string; expires_in: number; scope?: string };
  await saveConnection(userId, "google", t);
  return t.access_token;
}

type Daily = { steps?: number; resting_hr?: number; active_kcal?: number; sleep_min?: number; workouts?: number; workout_min?: number };

export async function upsertDaily(userId: string, provider: WearableProvider, day: string, d: Daily) {
  await db().query(
    `insert into wearable_daily (user_id, day, provider, steps, resting_hr, active_kcal, sleep_min, workouts, workout_min, updated_at)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,now())
     on conflict (user_id, day, provider) do update set
       steps=coalesce(excluded.steps, wearable_daily.steps), resting_hr=coalesce(excluded.resting_hr, wearable_daily.resting_hr),
       active_kcal=coalesce(excluded.active_kcal, wearable_daily.active_kcal), sleep_min=coalesce(excluded.sleep_min, wearable_daily.sleep_min),
       workouts=coalesce(excluded.workouts, wearable_daily.workouts), workout_min=coalesce(excluded.workout_min, wearable_daily.workout_min), updated_at=now()`,
    [userId, day, provider, d.steps ?? null, d.resting_hr ?? null, d.active_kcal ?? null, d.sleep_min ?? null, d.workouts ?? null, d.workout_min ?? null]
  );
}

// Sincroniza los últimos N días desde la Google Health API. Tolerante: cada tipo de dato es independiente.
export async function syncGoogle(userId: string, days = 7): Promise<{ ok: boolean; synced: number; error?: string }> {
  const token = await googleAccessToken(userId);
  if (!token) return { ok: false, synced: 0, error: "no_token" };
  const end = new Date(); const start = new Date(end.getTime() - days * 86400000);
  const q = (dataType: string) =>
    fetch(`${GOOGLE.api}/users/me/dataTypes/${dataType}/dataPoints:aggregate?startTime=${start.toISOString()}&endTime=${end.toISOString()}&bucket=DAY`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (r) => (r.ok ? ((await r.json()) as { buckets?: { startTime: string; value?: number; total?: number; average?: number; count?: number }[] }) : null))
      .catch(() => null);

  const [steps, kcal, hr, sleep, act] = await Promise.all([q("steps"), q("active_calories_burned"), q("resting_heart_rate"), q("sleep_session"), q("exercise_session")]);
  const byDay = new Map<string, Daily>();
  const put = (res: Awaited<ReturnType<typeof q>>, f: (b: NonNullable<typeof res>["buckets"] extends (infer B)[] | undefined ? B : never) => Partial<Daily>) => {
    for (const b of res?.buckets ?? []) { const day = b.startTime.slice(0, 10); byDay.set(day, { ...(byDay.get(day) ?? {}), ...f(b) }); }
  };
  put(steps, (b) => ({ steps: Math.round(b.total ?? b.value ?? 0) }));
  put(kcal, (b) => ({ active_kcal: Math.round(b.total ?? b.value ?? 0) }));
  put(hr, (b) => ({ resting_hr: Math.round(b.average ?? b.value ?? 0) }));
  put(sleep, (b) => ({ sleep_min: Math.round((b.total ?? b.value ?? 0) / 60) }));
  put(act, (b) => ({ workouts: b.count ?? 0, workout_min: Math.round((b.total ?? 0) / 60) }));

  let n = 0;
  for (const [day, d] of byDay) { await upsertDaily(userId, "google", day, d); n++; }
  await db().query("update wearable_connections set last_sync=now() where user_id=$1 and provider='google'", [userId]);
  const anyOk = [steps, kcal, hr, sleep, act].some(Boolean);
  return { ok: anyOk, synced: n, error: anyOk ? undefined : "api_error" };
}

export async function latestDaily(userId: string) {
  const r = await db().query(
    `select day, steps, resting_hr, active_kcal, sleep_min, workouts, workout_min, provider, updated_at
     from wearable_daily where user_id=$1 order by day desc limit 14`, [userId]);
  return r.rows.map((x) => ({ ...x, day: new Date(x.day).toISOString().slice(0, 10), updated_at: new Date(x.updated_at).toISOString() })) as { day: string; steps: number | null; resting_hr: number | null; active_kcal: number | null; sleep_min: number | null; workouts: number | null; workout_min: number | null; provider: string; updated_at: string }[];
}
