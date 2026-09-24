import { NextRequest, NextResponse } from "next/server";
import {
  handleCheckoutComplete,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  verifyWebhookSignature,
} from "@/lib/stripe-server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  try {
    const event = await verifyWebhookSignature(body, signature);

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutComplete(event as Stripe.CheckoutSessionCompletedEvent);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event as Stripe.CustomerSubscriptionUpdatedEvent);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event as Stripe.CustomerSubscriptionDeletedEvent);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
