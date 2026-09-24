"use server";

import Stripe from "stripe";
import { db } from "./db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

export async function createCheckoutSession(
  userId: string,
  planLevel: "basico" | "pro" | "elite",
  successUrl: string,
  cancelUrl: string
) {
  // Precios de los planes (en centavos)
  const prices: Record<string, { price: number; name: string }> = {
    basico: { price: 1999, name: "Básico" },
    pro: { price: 3900, name: "Pro" },
    elite: { price: 19900, name: "Elite" },
  };

  const plan = prices[planLevel];
  if (!plan) throw new Error("Plan inválido");

  // Obtener o crear customer de Stripe
  const user = await db().query("select email, stripe_customer_id from users where id = $1", [userId]);
  const userData = user.rows[0];

  let customerId = userData?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: userData.email,
      metadata: { userId },
    });
    customerId = customer.id;
    await db().query("update users set stripe_customer_id = $1 where id = $2", [customerId, userId]);
  }

  // Crear sesión de checkout con trial de 3 días
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Small Habits - Plan ${plan.name}`,
            description: `Acceso a todo el contenido del plan ${plan.name}`,
          },
          unit_amount: plan.price,
          recurring: {
            interval: "month",
            trial_period_days: 3,
          },
        },
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
      planLevel,
    },
  });

  return session.id;
}

export async function handleCheckoutComplete(event: Stripe.CheckoutSessionCompletedEvent) {
  const session = event.data.object as Stripe.Checkout.Session;
  const { userId, planLevel } = session.metadata as Record<string, string>;

  if (!userId || !planLevel) {
    console.error("Missing metadata in checkout session", session.id);
    return;
  }

  // Obtener la suscripción
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

  // Actualizar usuario en BD
  await db().query(
    `update users
     set subscription_id = $1, plan_level = $2, trial_end = $3
     where id = $4`,
    [subscription.id, planLevel, new Date(subscription.trial_end! * 1000), userId]
  );

  // Registrar el pago
  await db().query(
    `insert into payments (user_id, stripe_payment_id, amount, currency, plan_level, status)
     values ($1, $2, $3, $4, $5, $6)`,
    [userId, session.payment_intent, session.amount_total || 0, "USD", planLevel, "completed"]
  );
}

export async function handleSubscriptionUpdated(event: Stripe.CustomerSubscriptionUpdatedEvent) {
  const subscription = event.data.object as Stripe.Subscription;
  const userId = subscription.metadata?.userId;

  if (!userId) return;

  // Actualizar estado de la suscripción
  await db().query(
    `update users
     set subscription_id = $1, trial_end = $2
     where id = $3`,
    [subscription.id, new Date((subscription.trial_end || subscription.current_period_end) * 1000), userId]
  );
}

export async function handleSubscriptionDeleted(event: Stripe.CustomerSubscriptionDeletedEvent) {
  const subscription = event.data.object as Stripe.Subscription;
  const userId = subscription.metadata?.userId;

  if (!userId) return;

  // Cancelar suscripción (volver a plan free/básico)
  await db().query(
    `update users
     set subscription_id = NULL, plan_level = 'basico', trial_end = NULL
     where id = $1`,
    [userId]
  );
}

export async function verifyWebhookSignature(body: string, signature: string): Promise<Stripe.Event> {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET || ""
  );
}
