import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Webhook de Stripe: fuente de verdad del plan de cada usuario.
// Pendiente: persistir (customer_email -> plan) en base de datos y leerlo en getPlan().
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !whsec) return NextResponse.json({ error: "stripe not configured" }, { status: 501 });

  const stripe = new Stripe(secret);
  const sig = req.headers.get("stripe-signature") || "";
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, whsec);
  } catch {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      console.log("[stripe]", event.type, event.id);
      break;
  }
  return NextResponse.json({ received: true });
}
