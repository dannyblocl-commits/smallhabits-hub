import { getUser, isAdmin } from "./auth";
import { getUserSubscription, isUserInTrial, PLAN_CONFIG } from "./subscriptions";
import { redirect } from "next/navigation";

// Lo gratis se queda gratis: sin trial ni pago el miembro sigue entrando con el
// tier gratuito; solo se le muestra el aviso para mejorar. Nunca se le expulsa.
export async function requireSubscription() {
  const user = await getUser();
  if (!user) redirect("/login");

  const sub = await getUserSubscription(user.id);
  const inTrial = await isUserInTrial(user.id);
  const staff = user.role === "coach" || isAdmin(user);

  return {
    userId: user.id,
    planLevel: sub?.plan_level || "basico",
    inTrial,
    trialEnd: sub?.trial_end,
    isActive: staff || !!sub?.subscription_id || inTrial,
    staff,
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
