import { db, ensureSchema } from "@/lib/db";
import { demoRoutines } from "@/data/routines";

export type Exercise = { name: string; description: string; sets: number; reps: string; rest_seconds: number; muscle_groups: string[] };
export type Routine = { id: string; name: string; description: string; type: string; duration_minutes: number; difficulty: string; exercises: Exercise[]; free: boolean; sort: number; updated_at: string };
export type Meal = { time: string; name: string; description: string; kcal: number };
export type Recipe = { name: string; steps: string; kcal: number };
export type Menu = { id: string; name: string; kcal: number; macros: string; goal: string; meals: Meal[]; recipes: Recipe[]; brands: string; free: boolean; sort: number; updated_at: string };
export type Recommendation = { id: string; category: string; body: string; at: string; coach_name: string | null };

const seedMenus = [
  { id: "menu_1", name: "Tonificación", kcal: 1800, macros: "135P · 225C · 60G", goal: "Tonificar", free: true, sort: 1,
    meals: [{ time: "07:00", name: "Desayuno", description: "3 huevos revueltos, 2 rebanadas pan integral, ½ aguacate", kcal: 490 }, { time: "12:30", name: "Almuerzo", description: "200g pechuga de pollo, 150g arroz integral, verduras al vapor", kcal: 600 }, { time: "15:30", name: "Merienda", description: "Batido proteína (30g) + 1 plátano", kcal: 225 }, { time: "19:30", name: "Cena", description: "150g salmón, 200g camote, espinaca salteada", kcal: 450 }],
    recipes: [{ name: "Bowl de proteína & verdes", steps: "Pollo desmenuzado, arroz, espinaca, tomate cherry, aderezo de limón.", kcal: 580 }, { name: "Avena nocturna", steps: "50g avena + 200ml leche + 1 cda chía. Refrigerar toda la noche.", kcal: 320 }] },
  { id: "menu_2", name: "Pérdida de grasa", kcal: 1500, macros: "140P · 130C · 50G", goal: "Perder peso", free: false, sort: 2,
    meals: [{ time: "07:30", name: "Desayuno", description: "Yogurt griego 200g, fresas, 20g almendras", kcal: 320 }, { time: "12:30", name: "Almuerzo", description: "Ensalada grande con atún 150g, garbanzos, aceite de oliva", kcal: 480 }, { time: "16:00", name: "Merienda", description: "Manzana + 1 huevo cocido", kcal: 170 }, { time: "19:30", name: "Cena", description: "Pavo a la plancha 180g, brócoli, quinoa 80g", kcal: 530 }],
    recipes: [{ name: "Wrap de pavo y hummus", steps: "Tortilla integral, pavo, hummus, pepino, rúcula.", kcal: 410 }] },
  { id: "menu_3", name: "Ganancia muscular", kcal: 2600, macros: "190P · 300C · 75G", goal: "Ganar fuerza", free: false, sort: 3,
    meals: [{ time: "07:00", name: "Desayuno", description: "Avena 80g, 2 huevos + 3 claras, plátano, mantequilla de maní", kcal: 720 }, { time: "12:30", name: "Almuerzo", description: "Carne magra 200g, arroz 200g, ensalada", kcal: 780 }, { time: "16:00", name: "Pre-entreno", description: "Batido proteína + 60g avena", kcal: 380 }, { time: "20:00", name: "Cena", description: "Pollo 200g, pasta integral 150g, verduras", kcal: 720 }],
    recipes: [{ name: "Pasta proteica", steps: "Pasta integral, pollo, salsa de tomate natural, queso cottage.", kcal: 690 }] },
  { id: "menu_4", name: "Vegetariano balance", kcal: 1900, macros: "110P · 240C · 65G", goal: "Salud integral", free: false, sort: 4,
    meals: [{ time: "07:30", name: "Desayuno", description: "Tofu revuelto, pan integral, aguacate", kcal: 480 }, { time: "13:00", name: "Almuerzo", description: "Lentejas 200g, arroz, ensalada", kcal: 620 }, { time: "16:30", name: "Merienda", description: "Yogurt vegetal + granola", kcal: 260 }, { time: "19:30", name: "Cena", description: "Curry de garbanzos con quinoa", kcal: 540 }],
    recipes: [{ name: "Curry de garbanzos", steps: "Garbanzos, leche de coco, curry, espinaca. 20 min.", kcal: 540 }] },
];
const BRANDS = "Avena sin azúcar añadida, proteína sin edulcorantes artificiales, aceite de oliva extra virgen, huevos de pastoreo. Lee siempre la etiqueta.";

let seeded: Promise<void> | null = null;
export function seedLibrary() {
  if (!seeded) seeded = (async () => {
    await ensureSchema();
    const r = await db().query("select count(*)::int as n from routines");
    if (r.rows[0].n === 0) {
      for (const [i, x] of demoRoutines.entries()) {
        await db().query("insert into routines (id, name, description, type, duration_minutes, difficulty, exercises, free, sort) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) on conflict (id) do nothing",
          [x.id, x.name, x.description, x.type, x.duration_minutes, x.difficulty, JSON.stringify(x.exercises.map((e) => ({ name: e.name, description: e.description, sets: e.sets, reps: e.reps, rest_seconds: e.rest_seconds, muscle_groups: e.muscle_groups }))), x.id === "routine_1" || x.id === "routine_5", i + 1]);
      }
    }
    const m = await db().query("select count(*)::int as n from menus");
    if (m.rows[0].n === 0) {
      for (const x of seedMenus) {
        await db().query("insert into menus (id, name, kcal, macros, goal, meals, recipes, brands, free, sort) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) on conflict (id) do nothing",
          [x.id, x.name, x.kcal, x.macros, x.goal, JSON.stringify(x.meals), JSON.stringify(x.recipes), BRANDS, x.free, x.sort]);
      }
    }
  })();
  return seeded;
}

export async function listRoutines(): Promise<Routine[]> {
  await seedLibrary();
  const r = await db().query("select * from routines order by sort, updated_at");
  return r.rows.map((x) => ({ ...x, updated_at: new Date(x.updated_at).toISOString() }));
}
export async function getRoutine(id: string): Promise<Routine | null> {
  await seedLibrary();
  const r = await db().query("select * from routines where id=$1", [id]);
  return r.rows[0] ? { ...r.rows[0], updated_at: new Date(r.rows[0].updated_at).toISOString() } : null;
}
export async function listMenus(): Promise<Menu[]> {
  await seedLibrary();
  const r = await db().query("select * from menus order by sort, updated_at");
  return r.rows.map((x) => ({ ...x, updated_at: new Date(x.updated_at).toISOString() }));
}
export async function getMenu(id: string): Promise<Menu | null> {
  await seedLibrary();
  const r = await db().query("select * from menus where id=$1", [id]);
  return r.rows[0] ? { ...r.rows[0], updated_at: new Date(r.rows[0].updated_at).toISOString() } : null;
}
export async function listRecommendations(userId: string, category?: string, limit = 10): Promise<Recommendation[]> {
  const r = await db().query(
    `select r.id, r.category, r.body, r.at, c.name as coach_name from recommendations r left join users c on c.id=r.coach_id
     where r.user_id=$1 ${category ? "and (r.category=$3 or r.category='general')" : ""} order by r.at desc limit $2`,
    category ? [userId, limit, category] : [userId, limit]);
  return r.rows.map((x) => ({ ...x, at: new Date(x.at).toISOString() }));
}

// ---------- Recetario y hacks nutricionales de Maleja (contenido real de sus PDFs, editable por la coach) ----------
import recetario from "@/data/recetario.json";
import recetarioI18n from "@/data/recetario.i18n.json";
import type { Lang } from "@/lib/i18n";

export type RecipeText = { name: string; ingredients: string[]; steps: string; tips: string };
export type RecipeRow = RecipeText & { id: string; category: string; tags: string[]; i18n: Partial<Record<Lang, RecipeText>>; free: boolean; sort: number; updated_at: string };
export type LessonText = { title: string; body: string };
export type LessonRow = LessonText & { id: string; i18n: Partial<Record<Lang, LessonText>>; free: boolean; sort: number; updated_at: string };
export type RecipeCategory = { id: string; name: string; free: boolean };

type I18nFile = { categories: Record<string, Partial<Record<Lang, { name: string }>>>; recipes: Record<string, Partial<Record<Lang, RecipeText>>>; lessons: Record<string, Partial<Record<Lang, LessonText>>> };
const RI = recetarioI18n as I18nFile;
export const RECIPE_CATEGORIES: RecipeCategory[] = recetario.categories;
export const categoryName = (id: string, lang: Lang) => RI.categories?.[id]?.[lang]?.name ?? RECIPE_CATEGORIES.find((c) => c.id === id)?.name ?? id;
export const localizeRecipe = (r: RecipeRow, lang: Lang): RecipeText => (lang !== "es" && r.i18n?.[lang]) || { name: r.name, ingredients: r.ingredients, steps: r.steps, tips: r.tips };
export const localizeLesson = (l: LessonRow, lang: Lang): LessonText => (lang !== "es" && l.i18n?.[lang]) || { title: l.title, body: l.body };

let seededRecetario: Promise<void> | null = null;
export function seedRecetario() {
  if (!seededRecetario) seededRecetario = (async () => {
    await ensureSchema();
    const r = await db().query("select count(*)::int as n from recipes");
    if (r.rows[0].n === 0) {
      const catFree = Object.fromEntries(RECIPE_CATEGORIES.map((c) => [c.id, c.free]));
      for (const [i, x] of recetario.recipes.entries()) {
        await db().query("insert into recipes (id, category, name, ingredients, steps, tips, tags, i18n, free, sort) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) on conflict (id) do nothing",
          [x.id, x.category, x.name, JSON.stringify(x.ingredients), x.steps, x.tips ?? "", JSON.stringify(x.tags ?? []), JSON.stringify(RI.recipes?.[x.id] ?? {}), catFree[x.category] ?? false, i + 1]);
      }
    }
    const l = await db().query("select count(*)::int as n from lessons");
    if (l.rows[0].n === 0) {
      for (const [i, x] of recetario.lessons.entries()) {
        await db().query("insert into lessons (id, title, body, i18n, free, sort) values ($1,$2,$3,$4,true,$5) on conflict (id) do nothing", [x.id, x.title, x.body, JSON.stringify(RI.lessons?.[x.id] ?? {}), i + 1]);
      }
    }
  })();
  return seededRecetario;
}

const rowR = (x: Record<string, unknown>): RecipeRow => ({ ...(x as RecipeRow), updated_at: new Date(x.updated_at as string).toISOString() });
const rowL = (x: Record<string, unknown>): LessonRow => ({ ...(x as LessonRow), updated_at: new Date(x.updated_at as string).toISOString() });
export async function listRecipes(category?: string): Promise<RecipeRow[]> {
  await seedRecetario();
  const r = category ? await db().query("select * from recipes where category=$1 order by sort, updated_at", [category]) : await db().query("select * from recipes order by sort, updated_at");
  return r.rows.map(rowR);
}
export async function getRecipe(id: string): Promise<RecipeRow | null> {
  await seedRecetario();
  const r = await db().query("select * from recipes where id=$1", [id]);
  return r.rows[0] ? rowR(r.rows[0]) : null;
}
export async function listLessons(): Promise<LessonRow[]> {
  await seedRecetario();
  const r = await db().query("select * from lessons order by sort, updated_at");
  return r.rows.map(rowL);
}
export async function getLesson(id: string): Promise<LessonRow | null> {
  await seedRecetario();
  const r = await db().query("select * from lessons where id=$1", [id]);
  return r.rows[0] ? rowL(r.rows[0]) : null;
}
