import type { Lang } from "@/lib/i18n";
import { RETO_DAYS } from "@/lib/plan";

export type RetoWeek = { routine: string; menu: string; habits: Record<Lang, [string, string, string]> };

export const RETO_WEEKS: RetoWeek[] = [
  {
    routine: "routine_1",
    menu: "menu_2",
    habits: {
      es: ["Entrena 3 días esta semana, 20-30 min", "Registra tus comidas con foto", "Sube tu foto de inicio"],
      en: ["Train 3 days this week, 20-30 min", "Log your meals with a photo", "Upload your starting photo"],
      pt: ["Treine 3 dias esta semana, 20-30 min", "Registre suas refeições com foto", "Envie sua foto inicial"],
    },
  },
  {
    routine: "routine_2",
    menu: "menu_2",
    habits: {
      es: ["Entrena 4 días, sube la intensidad", "Agua: 2 litros al día", "Escríbele a Maleja tu primer ajuste"],
      en: ["Train 4 days, turn up the intensity", "Water: 2 liters a day", "Message Maleja for your first adjustment"],
      pt: ["Treine 4 dias, aumente a intensidade", "Água: 2 litros por dia", "Mande sua primeira revisão para a Maleja"],
    },
  },
  {
    routine: "routine_3",
    menu: "menu_1",
    habits: {
      es: ["Entrena 4 días aunque no tengas ganas", "Duerme 7 horas: es parte del plan", "Una reflexión de Paz Mental al día"],
      en: ["Train 4 days even when you don't feel like it", "Sleep 7 hours: it's part of the plan", "One Peace of Mind reflection a day"],
      pt: ["Treine 4 dias mesmo sem vontade", "Durma 7 horas: faz parte do plano", "Uma reflexão de Paz Mental por dia"],
    },
  },
  {
    routine: "routine_2",
    menu: "menu_1",
    habits: {
      es: ["Entrena 4 días y cierra fuerte", "Pésate y mide el último día", "Sube tu foto final"],
      en: ["Train 4 days and finish strong", "Weigh and measure on the last day", "Upload your final photo"],
      pt: ["Treine 4 dias e termine forte", "Pese-se e meça no último dia", "Envie sua foto final"],
    },
  },
];

export function retoProgress(start: string | Date | null | undefined) {
  if (!start) return null;
  const s = new Date(start);
  const day = Math.floor((Date.now() - s.getTime()) / 86400000) + 1;
  if (day < 1) return null;
  const done = day > RETO_DAYS;
  const clamped = Math.min(day, RETO_DAYS);
  const week = Math.min(RETO_WEEKS.length, Math.ceil(clamped / 7));
  const end = new Date(s.getTime() + RETO_DAYS * 86400000);
  return { day: clamped, week, done, pct: Math.round((clamped / RETO_DAYS) * 100), end };
}
