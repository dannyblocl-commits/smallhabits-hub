import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { db, ensureSchema } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { appUrl } from "@/lib/wearables";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state") || "";
  const err = req.nextUrl.searchParams.get("error");
  const fail = (e: string) => NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(e)}`, req.url));
  if (err || !code) return fail(err || "no_code");
  let next = "";
  try {
    const { payload } = await jwtVerify(state, new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret-change-me"));
    if (payload.p !== "google-auth") return fail("state");
    next = typeof payload.next === "string" ? payload.next : "";
  } catch { return fail("state"); }

  const body = new URLSearchParams({ code, client_id: process.env.GOOGLE_HEALTH_CLIENT_ID!, client_secret: process.env.GOOGLE_HEALTH_CLIENT_SECRET!, redirect_uri: `${appUrl()}/api/auth/google/callback`, grant_type: "authorization_code" });
  const tr = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
  if (!tr.ok) return fail(`token_${tr.status}`);
  const t = (await tr.json()) as { access_token: string };
  const ur = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { Authorization: `Bearer ${t.access_token}` } });
  if (!ur.ok) return fail("userinfo");
  const g = (await ur.json()) as { sub: string; email?: string; email_verified?: boolean; name?: string; given_name?: string; picture?: string };
  if (!g.email || g.email_verified === false) return fail("email_unverified");
  const email = g.email.toLowerCase();
  const name = (g.name || g.given_name || email.split("@")[0]).slice(0, 80);

  await ensureSchema();
  let r = await db().query("select id, role, coach_id from users where google_sub=$1 or email=$2 limit 1", [g.sub, email]);
  let isNew = false;
  if (r.rows[0]) {
    await db().query("update users set google_sub=coalesce(google_sub,$1), avatar_url=coalesce($2, avatar_url) where id=$3", [g.sub, g.picture ?? null, r.rows[0].id]);
  } else {
    isNew = true;
    r = await db().query("insert into users (email, name, google_sub, avatar_url, goal, role) values ($1,$2,$3,$4,'Salud integral','member') returning id, role, coach_id", [email, name, g.sub, g.picture ?? null]);
  }
  const u = r.rows[0];
  await createSession(u.id);
  const dest = u.role === "coach" ? "/coach" : isNew || !u.coach_id ? "/dashboard/coaches" : next.startsWith("/") ? next : "/dashboard";
  return NextResponse.redirect(new URL(dest, req.url));
}
