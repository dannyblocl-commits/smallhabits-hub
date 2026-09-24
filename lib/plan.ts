export type Plan = "free" | "basico" | "pro" | "elite";

export const PLAN_ORDER: Plan[] = ["free", "basico", "pro", "elite"];

export const PLANS: Record<Exclude<Plan, "free">, { name: string; price: string; tagline: string; features: string[]; envKey: string }> = {
  basico: {
    name: "Básico", price: "$19.99", tagline: "Entrena y come bien",
    features: ["Todas las rutinas (funcional, calistenia, pilates, yoga, estiramientos)", "Todos los menús y recetas", "Food Tracker con IA (10 fotos/día)", "Meditaciones y worship completos", "Progreso completo con gráficos"],
    envKey: "NEXT_PUBLIC_STRIPE_LINK_BASICO",
  },
  pro: {
    name: "Pro", price: "$39", tagline: "Con tu reloj y tu coach",
    features: ["Todo lo de Básico", "Apple Watch y Garmin sincronizados", "Food Tracker IA ilimitado", "Bot IA ilimitado", "Chat 1:1 con Maleja (1 consulta/semana)"],
    envKey: "NEXT_PUBLIC_STRIPE_LINK_PRO",
  },
  elite: {
    name: "Elite", price: "$199", tagline: "Transformación guiada",
    features: ["Todo lo de Pro", "Plan de entrenamiento y nutrición hecho por Maleja para ti", "Videollamada mensual 1:1", "Chat 1:1 ilimitado", "Soporte prioritario"],
    envKey: "NEXT_PUBLIC_STRIPE_LINK_ELITE",
  },
};

export function hasPlan(current: Plan, required: Plan) {
  return PLAN_ORDER.indexOf(current) >= PLAN_ORDER.indexOf(required);
}

// Ids de precio LIVE de Stripe; si Danny crea precios nuevos, van por env.
export const STRIPE_PRICES: Record<Exclude<Plan, "free">, string> = {
  basico: process.env.STRIPE_PRICE_BASICO || "price_1UJHuaCJarrQxrae9v2uXE5R",
  pro: process.env.STRIPE_PRICE_PRO || "price_1UJHugCJarrQxraeZGq9l3YZ",
  elite: process.env.STRIPE_PRICE_ELITE || "price_1UJHuiCJarrQxraeSw76KkhB",
};

// Reto 30 días: pago único que da Pro durante 30 días.
export const RETO_PRICE = process.env.STRIPE_PRICE_RETO || "price_1UJKGiCJarrQxraefeIe5byQ";
export const RETO_DAYS = 30;
export const RETO_LINK = process.env.NEXT_PUBLIC_STRIPE_LINK_RETO || "https://buy.stripe.com/14AbJ09vw29BcAv8Qk8og0b";
export const RETO_PRICE_LABEL = "$49";

// Precios anteriores ($9.99/$19.99/$49.99): suscripciones ya cobradas siguen valiendo.
const LEGACY_PRICES: Record<string, Exclude<Plan, "free">> = {
  price_1UGTvcCJarrQxraeRUDSia0k: "basico",
  price_1UGTvdCJarrQxraef7R9OFhH: "pro",
  price_1UGTveCJarrQxraeU4A0s0gx: "elite",
};

export function planFromPrice(priceId: string | null | undefined): Plan {
  if (!priceId) return "free";
  const hit = (Object.keys(STRIPE_PRICES) as Exclude<Plan, "free">[]).find((k) => STRIPE_PRICES[k] === priceId);
  return hit ?? LEGACY_PRICES[priceId] ?? "free";
}

export async function getPlan(): Promise<Plan> {
  const { getUser } = await import("@/lib/auth");
  const u = await getUser();
  if (!u) return "free";
  const p = PLAN_ORDER.includes(u.plan) ? u.plan : "free";
  if (u.role === "coach" || p === "free" || u.subscription_id) return p;
  // Acceso temporal (prueba gratis o regalo de la coach) que ya venció.
  if (u.trial_end && new Date(u.trial_end) < new Date()) return "free";
  return p;
}

export function stripeLink(plan: Exclude<Plan, "free">) {
  return process.env[PLANS[plan].envKey] || "";
}
