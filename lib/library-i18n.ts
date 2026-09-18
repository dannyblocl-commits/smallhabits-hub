// Traducción de rutinas y menús (estructuras anidadas) aplanadas para translateContent y vueltas a armar.
import { translateContent } from "@/lib/translate";
import type { RoutineText, MenuText } from "@/lib/library";

type ExIn = { name: string; description: string; muscle_groups: string[] };
export async function routineI18n(r: { name: string; description: string; exercises: ExIn[] }): Promise<Partial<Record<"en" | "pt", RoutineText>>> {
  const flat = { name: r.name, description: r.description, ex_names: r.exercises.map((e) => e.name), ex_descs: r.exercises.map((e) => e.description || "-"), ex_muscles: r.exercises.map((e) => e.muscle_groups.join(", ") || "-") };
  const t = await translateContent(flat);
  if (!t) return {};
  const build = (x: typeof flat): RoutineText => ({ name: x.name, description: x.description, exercises: r.exercises.map((_, i) => ({ name: x.ex_names[i], description: x.ex_descs[i] === "-" ? "" : x.ex_descs[i], muscle_groups: x.ex_muscles[i] === "-" ? [] : x.ex_muscles[i].split(",").map((s) => s.trim()).filter(Boolean) })) });
  return { en: build(t.en), pt: build(t.pt) };
}

export async function menuI18n(m: { name: string; meals: { name: string; description: string }[]; recipes: { name: string; steps: string }[]; brands: string }): Promise<Partial<Record<"en" | "pt", MenuText>>> {
  const flat = { name: m.name, meal_names: m.meals.map((x) => x.name), meal_descs: m.meals.map((x) => x.description || "-"), rec_names: m.recipes.map((x) => x.name), rec_steps: m.recipes.map((x) => x.steps || "-"), brands: m.brands || "-" };
  const t = await translateContent(flat);
  if (!t) return {};
  const build = (x: typeof flat): MenuText => ({ name: x.name, meals: m.meals.map((_, i) => ({ name: x.meal_names[i], description: x.meal_descs[i] === "-" ? "" : x.meal_descs[i] })), recipes: m.recipes.map((_, i) => ({ name: x.rec_names[i], steps: x.rec_steps[i] === "-" ? "" : x.rec_steps[i] })), brands: x.brands === "-" ? "" : x.brands });
  return { en: build(t.en), pt: build(t.pt) };
}
