import { getUser } from "./auth";
import { getUserSubscription, isUserInTrial, PLAN_CONFIG } from "./subscriptions";
import { redirect } from "next/navigation";

export async function requireSubscription() {
  const user = await getUser();
  if (!user) redirect("/login");

  const sub = await getUserSubscription(user.id);
  const inTrial = await isUserInTrial(user.id);

  // Si no tiene suscripción activa Y no está en trial, redirigir a planes
  if (!sub?.subscription_id && !inTrial) {
    redirect("/upgrade");
  }

  return {
    userId: user.id,
    planLevel: sub?.plan_level || "basico",
    inTrial,
    trialEnd: sub?.trial_end,
    isActive: !!sub?.subscription_id || inTrial,
  };
}

export function getPlanConfig(planLevel: string) {
  return PLAN_CONFIG[planLevel as keyof typeof PLAN_CONFIG] || PLAN_CONFIG.basico;
}

export function getTrialDaysRemaining(trialEnd: Date | string | null) {
  if (!trialEnd) return 0;
  const end = new Date(trialEnd);
  const now = new Date();
  const days = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

export function formatPlanName(planLevel: string) {
  const config = getPlanConfig(planLevel);
  return config.name;
}
