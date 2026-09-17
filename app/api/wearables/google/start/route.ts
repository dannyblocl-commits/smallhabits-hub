import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { GOOGLE, appUrl } from "@/lib/wearables";
import { SignJWT } from "jose";

export async function GET(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.redirect(new URL("/login", req.url));
  if (!process.env.GOOGLE_HEALTH_CLIENT_ID) return NextResponse.json({ error: "google not configured" }, { status: 501 });
  const state = await new SignJWT({ uid: user.id, p: "google" }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("15m").sign(new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret-change-me"));
  const u = new URL(GOOGLE.auth);
  u.searchParams.set("client_id", process.env.GOOGLE_HEALTH_CLIENT_ID);
  u.searchParams.set("redirect_uri", `${appUrl()}/api/wearables/google/callback`);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("scope", GOOGLE.scopes.join(" "));
  u.searchParams.set("access_type", "offline");
  u.searchParams.set("prompt", "consent");
  u.searchParams.set("include_granted_scopes", "true");
  u.searchParams.set("state", state);
  return NextResponse.redirect(u);
}
