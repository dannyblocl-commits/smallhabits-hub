import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getUser } from "@/lib/auth";
import { ensureSchema } from "@/lib/db";
import { GOOGLE, appUrl, saveConnection, syncGoogle } from "@/lib/wearables";

export async function GET(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.redirect(new URL("/login", req.url));
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state") || "";
  const err = req.nextUrl.searchParams.get("error");
  const back = (q: string) => NextResponse.redirect(new URL(`/dashboard/wearables?${q}`, req.url));
  if (err || !code) return back(`error=${encodeURIComponent(err || "no_code")}`);
  try {
    const { payload } = await jwtVerify(state, new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret-change-me"));
    if (payload.uid !== user.id) return back("error=state");
  } catch { return back("error=state"); }

  const body = new URLSearchParams({ code, client_id: process.env.GOOGLE_HEALTH_CLIENT_ID!, client_secret: process.env.GOOGLE_HEALTH_CLIENT_SECRET!, redirect_uri: `${appUrl()}/api/wearables/google/callback`, grant_type: "authorization_code" });
  const r = await fetch(GOOGLE.token, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
  if (!r.ok) return back(`error=token_${r.status}`);
  const t = (await r.json()) as { access_token: string; refresh_token?: string; expires_in?: number; scope?: string };
  await ensureSchema();
  await saveConnection(user.id, "google", t);
  const s = await syncGoogle(user.id, 14);
  return back(`connected=google&synced=${s.synced}${s.error ? `&warn=${s.error}` : ""}`);
}
