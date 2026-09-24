import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { syncPlanFromStripe } from "@/lib/stripe-sync";

// Stripe redirige aquí tras el pago. El ?plan= de la URL NO se confía: el plan
// se lee de la suscripción real del cliente en Stripe (casada por email).
export async function GET(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.redirect(new URL("/login", req.url));
  try {
    await syncPlanFromStripe(user.email);
  } catch (e) {
    console.error("[plan] sync failed", e);
  }
  return NextResponse.redirect(new URL("/dashboard", req.url));
}
