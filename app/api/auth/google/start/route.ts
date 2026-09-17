import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { appUrl } from "@/lib/wearables";

// Inicio de "Continuar con Google": reutiliza el cliente OAuth del proyecto (mismo client_id que Health).
export async function GET(req: NextRequest) {
  if (!process.env.GOOGLE_HEALTH_CLIENT_ID) return NextResponse.json({ error: "google not configured" }, { status: 501 });
  const next = req.nextUrl.searchParams.get("next") || "";
  const state = await new SignJWT({ p: "google-auth", next }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("15m").sign(new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret-change-me"));
  const u = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  u.searchParams.set("client_id", process.env.GOOGLE_HEALTH_CLIENT_ID);
  u.searchParams.set("redirect_uri", `${appUrl()}/api/auth/google/callback`);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("scope", "openid email profile");
  u.searchParams.set("prompt", "select_account");
  u.searchParams.set("state", state);
  return NextResponse.redirect(u);
}
