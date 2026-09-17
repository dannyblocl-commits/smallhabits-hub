import { NextRequest, NextResponse } from "next/server";
import { PLAN_ORDER, Plan } from "@/lib/plan";

// Fija el plan en cookie. Se llama al volver de Stripe (?plan=pro) o desde el modo demo.
// En produccion real, el webhook de Stripe debe ser la fuente de verdad (ver /api/stripe/webhook).
export async function GET(req: NextRequest) {
  const plan = (req.nextUrl.searchParams.get("plan") || "free") as Plan;
  const safe: Plan = PLAN_ORDER.includes(plan) ? plan : "free";
  const res = NextResponse.redirect(new URL("/dashboard", req.url));
  res.cookies.set("sh_plan", safe, { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" });
  return res;
}
