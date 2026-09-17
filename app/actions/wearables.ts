"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { syncGoogle, getConnection, latestDaily } from "@/lib/wearables";

export async function syncNow() {
  const user = await requireUser();
  const c = await getConnection(user.id, "google");
  if (c) await syncGoogle(user.id, 14);
  redirect("/dashboard/wearables?synced=1");
}

export async function disconnect(form: FormData) {
  const user = await requireUser();
  const provider = String(form.get("provider") || "");
  if (!["google", "garmin"].includes(provider)) return;
  await db().query("delete from wearable_connections where user_id=$1 and provider=$2", [user.id, provider]);
  await db().query("delete from wearable_daily where user_id=$1 and provider=$2", [user.id, provider]);
  redirect("/dashboard/wearables?disconnected=1");
}

export async function wearableStatus() {
  const user = await requireUser();
  const [g, daily] = await Promise.all([getConnection(user.id, "google"), latestDaily(user.id)]);
  const today = new Date().toISOString().slice(0, 10);
  return {
    google: g ? { connected_at: new Date(g.connected_at).toISOString(), last_sync: g.last_sync ? new Date(g.last_sync).toISOString() : null } : null,
    today: daily.find((d) => d.day === today) ?? daily[0] ?? null,
    days: daily,
  };
}
