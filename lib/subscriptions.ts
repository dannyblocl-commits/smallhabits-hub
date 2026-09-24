import { db } from "./db";

export type PlanLevel = "basico" | "pro" | "elite";

export const PLAN_CONFIG: Record<PlanLevel, {
  price: number;
  name: string;
  routines: number;
  recipes: number;
  messages: number | null;
  sessions_1on1: number;
}> = {
  basico: { price: 19.99, name: "Básico", routines: 3, recipes: 10, messages: 50, sessions_1on1: 0 },
  pro: { price: 39, name: "Pro", routines: 20, recipes: 50, messages: null, sessions_1on1: 0 },
  elite: { price: 199, name: "Elite", routines: 999, recipes: 999, messages: null, sessions_1on1: 2 },
};

export async function getUserSubscription(userId: string) {
  const result = await db().query(
    "select plan_level, subscription_id, trial_end from users where id = $1",
    [userId]
  );
  return result.rows[0];
}

export async function isUserInTrial(userId: string) {
  const sub = await getUserSubscription(userId);
  if (!sub?.trial_end) return false;
  return new Date(sub.trial_end) > new Date();
}

export async function createFreeAccount(email: string, password_hash: string, name: string) {
  const trial_end = new Date();
  trial_end.setDate(trial_end.getDate() + 3); // 3 días gratis

  try {
    const result = await db().query(
      `insert into users
        (email, password_hash, name, plan_level, trial_end, role)
      values ($1, $2, $3, $4, $5, $6)
      returning id, email, plan_level, trial_end`,
      [email, password_hash, name, "basico", trial_end, "member"]
    );

    console.log("createFreeAccount result:", result.rows[0]);
    return result.rows[0];
  } catch (error: any) {
    console.error("createFreeAccount error:", error.message, error.code);
    throw error;
  }
}

export async function getPaymentHistory(userId: string) {
  const result = await db().query(
    "select * from payments where user_id = $1 order by created_at desc",
    [userId]
  );
  return result.rows;
}

export async function canAccessFeature(userId: string, feature: "routines" | "recipes" | "messages") {
  const sub = await getUserSubscription(userId);
  const config = PLAN_CONFIG[sub.plan_level as PlanLevel];

  if (!config) return false;
  if (sub.trial_end && new Date(sub.trial_end) > new Date()) return true; // Trial tiene acceso
  if (!sub.subscription_id) return false; // Sin suscripción activa

  return true; // Suscripción activa
}

export async function getFeatureLimit(userId: string, feature: "routines" | "recipes" | "messages") {
  const sub = await getUserSubscription(userId);
  const config = PLAN_CONFIG[sub.plan_level as PlanLevel];

  if (!config) return 0;
  return config[feature] || 999;
}

export async function notifyCoach(coachId: string, title: string, body: string) {
  await db().query(
    `insert into notifications (user_id, title, body) values ($1, $2, $3)`,
    [coachId, title, body]
  );
}
