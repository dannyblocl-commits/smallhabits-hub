import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { db, ensureSchema } from "@/lib/db";
import { sendPush } from "@/lib/push";

type Sub = { endpoint?: string; keys?: { p256dh?: string; auth?: string } };

export async function POST(req: NextRequest) {
  const u = await getUser();
  if (!u) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { subscription?: Sub; test?: boolean };
  const s = body.subscription;
  if (!s?.endpoint || !s.keys?.p256dh || !s.keys?.auth || !s.endpoint.startsWith("https://")) return NextResponse.json({ error: "bad subscription" }, { status: 400 });
  await ensureSchema();
  await db().query(
    `insert into push_subscriptions (user_id, endpoint, p256dh, auth, ua) values ($1,$2,$3,$4,$5)
     on conflict (endpoint) do update set user_id=excluded.user_id, p256dh=excluded.p256dh, auth=excluded.auth, ua=excluded.ua`,
    [u.id, s.endpoint, s.keys.p256dh, s.keys.auth, (req.headers.get("user-agent") || "").slice(0, 300)]
  );
  if (body.test) await sendPush([u.id], { title: "Small Habits", body: "¡Listo! Las notificaciones están activadas 💚", url: "/dashboard", tag: "test" });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const u = await getUser();
  if (!u) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { endpoint } = (await req.json().catch(() => ({}))) as { endpoint?: string };
  if (endpoint) await db().query("delete from push_subscriptions where endpoint=$1 and user_id=$2", [endpoint, u.id]);
  return NextResponse.json({ ok: true });
}
