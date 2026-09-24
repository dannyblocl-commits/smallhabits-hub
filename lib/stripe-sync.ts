import Stripe from "stripe";
import { db } from "@/lib/db";
import { Plan, PLAN_ORDER, planFromPrice, RETO_PRICE, RETO_DAYS } from "@/lib/plan";

const ACTIVE = new Set(["active", "trialing", "past_due"]);

export function stripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY missing");
  return new Stripe(key);
}

export async function applySubscription(email: string, sub: Stripe.Subscription | null) {
  const live = sub && ACTIVE.has(sub.status);
  const plan: Plan = live ? planFromPrice(sub.items.data[0]?.price.id) : "free";
  const customer = sub ? (typeof sub.customer === "string" ? sub.customer : sub.customer.id) : null;
  const r = await db().query(
    `update users
       set plan = $1,
           plan_level = $2,
           subscription_id = $3,
           stripe_customer_id = coalesce($4, stripe_customer_id),
           trial_end = case when $3::text is null then trial_end else null end
     where lower(email) = lower($5)
     returning id`,
    [plan, plan === "free" ? "basico" : plan, live ? sub!.id : null, customer, email]
  );
  return { plan, matched: r.rowCount ?? 0 };
}

export async function applyReto(email: string, paidAtUnix: number) {
  const until = new Date((paidAtUnix + RETO_DAYS * 86400) * 1000);
  if (until < new Date()) return { plan: "free" as Plan, matched: 0 };
  const r = await db().query(
    `update users
       set plan = case when plan = 'elite' then plan else 'pro' end,
           plan_level = case when plan_level = 'elite' then plan_level else 'pro' end,
           trial_end = $1
     where lower(email) = lower($2)
     returning id`,
    [until, email]
  );
  return { plan: "pro" as Plan, matched: r.rowCount ?? 0, until };
}

export async function sessionIsReto(s: Stripe, sessionId: string) {
  const items = await s.checkout.sessions.listLineItems(sessionId, { limit: 5 });
  return items.data.some((i) => i.price?.id === RETO_PRICE);
}

export async function syncPlanFromStripe(email: string) {
  const s = stripe();
  const customers = await s.customers.list({ email, limit: 5 });
  let best: Stripe.Subscription | null = null;
  for (const c of customers.data) {
    const subs = await s.subscriptions.list({ customer: c.id, status: "all", limit: 10 });
    for (const sub of subs.data) {
      if (!ACTIVE.has(sub.status)) continue;
      const p = planFromPrice(sub.items.data[0]?.price.id);
      const bp = best ? planFromPrice(best.items.data[0]?.price.id) : "free";
      if (PLAN_ORDER.indexOf(p) > PLAN_ORDER.indexOf(bp)) best = sub;
    }
  }
  if (best) return applySubscription(email, best);

  const since = Math.floor(Date.now() / 1000) - RETO_DAYS * 86400;
  const sessions = await s.checkout.sessions.list({ customer_details: { email }, limit: 20 });
  for (const cs of sessions.data) {
    if (cs.payment_status !== "paid" || cs.created < since) continue;
    if (await sessionIsReto(s, cs.id)) return applyReto(email, cs.created);
  }
  return applySubscription(email, null);
}
