import { NextRequest, NextResponse } from "next/server";
import { PLAN_ORDER, Plan } from "@/lib/plan";
import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";

// Fija el plan del usuario con sesión. Stripe redirige aquí tras el pago (?plan=pro);
// tambien lo usa el modo demo. Cuando exista webhook + DB de suscripciones, esa sera la fuente de verdad.
export async function GET(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.redirect(new URL("/login", req.url));
  const plan = (req.nextUrl.searchParams.get("plan") || "free") as Plan;
  const safe: Plan = PLAN_ORDER.includes(plan) ? plan : "free";
  await db().query("update users set plan=$1 where id=$2", [safe, user.id]);
  return NextResponse.redirect(new URL("/dashboard", req.url));
}
