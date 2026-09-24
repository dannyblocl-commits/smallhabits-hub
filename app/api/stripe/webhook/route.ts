import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ensureSchema } from "@/lib/db";
import { applyReto, applySubscription, sessionIsReto, stripe } from "@/lib/stripe-sync";

// Fuente de verdad del plan: lo que Stripe confirma, casado por email del cliente.
export async function POST(req: NextRequest) {
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;
  if (!process.env.STRIPE_SECRET_KEY || !whsec) return NextResponse.json({ error: "stripe not configured" }, { status: 501 });

  const s = stripe();
  const sig = req.headers.get("stripe-signature") || "";
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = s.webhooks.constructEvent(body, sig, whsec);
  } catch {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }

  await ensureSchema();

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_details?.email || session.customer_email;
      if (email && session.subscription) {
        const sub = await s.subscriptions.retrieve(String(session.subscription));
        const r = await applySubscription(email, sub);
        console.log("[stripe] checkout", email, r);
      } else if (email && session.payment_status === "paid" && (await sessionIsReto(s, session.id))) {
        const r = await applyReto(email, session.created);
        console.log("[stripe] reto", email, r);
      }
    } else if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
      const sub = event.data.object;
      const customer = await s.customers.retrieve(String(sub.customer));
      const email = customer.deleted ? null : customer.email;
      if (email) {
        const r = await applySubscription(email, event.type === "customer.subscription.deleted" ? null : sub);
        console.log("[stripe]", event.type, email, r);
      }
    }
  } catch (e) {
    console.error("[stripe] webhook error", event.type, e);
    return NextResponse.json({ error: "handler failed" }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
