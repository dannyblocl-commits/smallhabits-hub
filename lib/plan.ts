export type Plan = "free" | "basico" | "pro" | "elite";

export const PLAN_ORDER: Plan[] = ["free", "basico", "pro", "elite"];

export const PLANS: Record<Exclude<Plan, "free">, { name: string; price: string; tagline: string; features: string[]; envKey: string }> = {
  basico: {
    name: "Básico", price: "$9.99", tagline: "Entrena y come bien",
    features: ["Todas las rutinas (funcional, calistenia, pilates, yoga, estiramientos)", "Todos los menús y recetas", "Food Tracker con IA (10 fotos/día)", "Meditaciones y worship completos", "Progreso completo con gráficos"],
    envKey: "NEXT_PUBLIC_STRIPE_LINK_BASICO",
  },
  pro: {
    name: "Pro", price: "$19.99", tagline: "Con tu reloj y tu coach",
    features: ["Todo lo de Básico", "Apple Watch y Garmin sincronizados", "Food Tracker IA ilimitado", "Bot IA ilimitado", "Chat 1:1 con Maleja (1 consulta/semana)"],
    envKey: "NEXT_PUBLIC_STRIPE_LINK_PRO",
  },
  elite: {
    name: "Elite", price: "$49.99", tagline: "Transformación guiada",
    features: ["Todo lo de Pro", "Plan de entrenamiento y nutrición hecho por Maleja para ti", "Videollamada mensual 1:1", "Chat 1:1 ilimitado", "Soporte prioritario"],
    envKey: "NEXT_PUBLIC_STRIPE_LINK_ELITE",
  },
};

export function hasPlan(current: Plan, required: Plan) {
  return PLAN_ORDER.indexOf(current) >= PLAN_ORDER.indexOf(required);
}

export async function getPlan(): Promise<Plan> {
  const { getUser } = await import("@/lib/auth");
  const u = await getUser();
  const p = u?.plan as Plan | undefined;
  return p && PLAN_ORDER.includes(p) ? p : "free";
}

export function stripeLink(plan: Exclude<Plan, "free">) {
  return process.env[PLANS[plan].envKey] || "";
}
