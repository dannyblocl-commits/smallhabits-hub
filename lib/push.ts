import webpush from "web-push";
import { db } from "@/lib/db";

export type PushPayload = { title: string; body: string; url?: string; tag?: string };

let configured = false;
function configure() {
  if (configured) return true;
  const pub = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY, priv = process.env.VAPID_PRIVATE_KEY;
  if (!pub || !priv) return false;
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || "mailto:smallhabitsbymaleja@gmail.com", pub, priv);
  configured = true;
  return true;
}

// Best-effort: nunca rompe la acción que la dispara. Borra suscripciones caducadas (404/410).
export async function sendPush(userIds: string[], payload: PushPayload) {
  if (!userIds.length || !configure()) return;
  try {
    const r = await db().query("select id, endpoint, p256dh, auth from push_subscriptions where user_id = any($1::uuid[])", [userIds]);
    await Promise.all(r.rows.map(async (s) => {
      try {
        await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, JSON.stringify(payload), { TTL: 60 * 60 * 24 });
      } catch (e) {
        const code = (e as { statusCode?: number }).statusCode;
        if (code === 404 || code === 410) await db().query("delete from push_subscriptions where id=$1", [s.id]).catch(() => {});
        else console.error("[push]", code, (e as Error).message);
      }
    }));
  } catch (e) {
    console.error("[push] query", e);
  }
}

export async function staffIds(): Promise<string[]> {
  const admins = (process.env.ADMIN_EMAILS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  const r = await db().query("select id from users where role='coach' or lower(email) = any($1::text[])", [admins]);
  return r.rows.map((x) => x.id);
}
