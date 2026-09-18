"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireCoach } from "@/lib/auth";
import { seedLibrary } from "@/lib/library";

const clean = (v: FormDataEntryValue | null, max = 200) => String(v ?? "").trim().slice(0, max);
const int = (v: FormDataEntryValue | null, d = 0, min = 0, max = 100000) => { const n = parseInt(String(v ?? ""), 10); return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : d; };

export async function saveRoutine(form: FormData) {
  const coach = await requireCoach(); await seedLibrary();
  const id = clean(form.get("id"), 80) || null;
  const name = clean(form.get("name"), 80); if (!name) return;
  const names = form.getAll("ex_name").map(String);
  const exercises = names.map((n, i) => ({
    name: n.trim().slice(0, 80),
    description: clean(form.getAll("ex_desc")[i] ?? "", 300),
    sets: int(form.getAll("ex_sets")[i] ?? "", 3, 1, 20),
    reps: clean(form.getAll("ex_reps")[i] ?? "", 40) || "10",
    rest_seconds: int(form.getAll("ex_rest")[i] ?? "", 45, 0, 600),
    muscle_groups: clean(form.getAll("ex_muscles")[i] ?? "", 120).split(",").map((s) => s.trim()).filter(Boolean),
  })).filter((e) => e.name);
  const description = clean(form.get("description"), 300);
  const prev = id ? await getRoutine(id) : null;
  const same = prev && prev.name === name && prev.description === description && JSON.stringify(prev.exercises.map((e) => [e.name, e.description, e.muscle_groups])) === JSON.stringify(exercises.map((e) => [e.name, e.description, e.muscle_groups]));
  const i18n = same ? prev.i18n : await routineI18n({ name, description, exercises });
  const vals = [name, description, clean(form.get("type"), 30) || "funcional", int(form.get("duration_minutes"), 20, 1, 240), clean(form.get("difficulty"), 20) || "beginner", JSON.stringify(exercises), form.get("free") === "on", int(form.get("sort"), 100, 0, 999), coach.id, JSON.stringify(i18n)];
  if (id) await db().query("update routines set name=$1, description=$2, type=$3, duration_minutes=$4, difficulty=$5, exercises=$6, free=$7, sort=$8, updated_by=$9, i18n=$10, updated_at=now() where id=$11", [...vals, id]);
  else await db().query("insert into routines (name, description, type, duration_minutes, difficulty, exercises, free, sort, updated_by, i18n) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)", vals);
  redirect(`/coach/routines?ok=1${same ? "" : "&tr=" + (Object.keys(i18n).length ? "ok" : "no")}`);
}

export async function deleteRoutine(form: FormData) {
  await requireCoach();
  const id = clean(form.get("id"), 80);
  await db().query("update assignments set routine_id=null where routine_id=$1", [id]);
  await db().query("delete from routines where id=$1", [id]);
  redirect("/coach/routines");
}

export async function saveMenu(form: FormData) {
  const coach = await requireCoach(); await seedLibrary();
  const id = clean(form.get("id"), 80) || null;
  const name = clean(form.get("name"), 80); if (!name) return;
  const meals = form.getAll("meal_name").map(String).map((n, i) => ({
    time: clean(form.getAll("meal_time")[i] ?? "", 5) || "12:00", name: n.trim().slice(0, 40),
    description: clean(form.getAll("meal_desc")[i] ?? "", 300), kcal: int(form.getAll("meal_kcal")[i] ?? "", 0, 0, 5000),
  })).filter((m) => m.name);
  const recipes = form.getAll("rec_name").map(String).map((n, i) => ({
    name: n.trim().slice(0, 80), steps: clean(form.getAll("rec_steps")[i] ?? "", 500), kcal: int(form.getAll("rec_kcal")[i] ?? "", 0, 0, 5000),
  })).filter((r) => r.name);
  const kcal = int(form.get("kcal"), 0, 0, 10000) || meals.reduce((a, m) => a + m.kcal, 0);
  const brands = clean(form.get("brands"), 500);
  const prev = id ? await getMenu(id) : null;
  const same = prev && prev.name === name && prev.brands === brands && JSON.stringify(prev.meals.map((x) => [x.name, x.description])) === JSON.stringify(meals.map((x) => [x.name, x.description])) && JSON.stringify(prev.recipes.map((x) => [x.name, x.steps])) === JSON.stringify(recipes.map((x) => [x.name, x.steps]));
  const i18n = same ? prev.i18n : await menuI18n({ name, meals, recipes, brands });
  const vals = [name, kcal, clean(form.get("macros"), 60), clean(form.get("goal"), 40) || "Salud integral", JSON.stringify(meals), JSON.stringify(recipes), brands, form.get("free") === "on", int(form.get("sort"), 100, 0, 999), coach.id, JSON.stringify(i18n)];
  if (id) await db().query("update menus set name=$1, kcal=$2, macros=$3, goal=$4, meals=$5, recipes=$6, brands=$7, free=$8, sort=$9, updated_by=$10, i18n=$11, updated_at=now() where id=$12", [...vals, id]);
  else await db().query("insert into menus (name, kcal, macros, goal, meals, recipes, brands, free, sort, updated_by, i18n) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)", vals);
  redirect(`/coach/menus?ok=1${same ? "" : "&tr=" + (Object.keys(i18n).length ? "ok" : "no")}`);
}

export async function deleteMenu(form: FormData) {
  await requireCoach();
  const id = clean(form.get("id"), 80);
  await db().query("update assignments set menu_id=null where menu_id=$1", [id]);
  await db().query("delete from menus where id=$1", [id]);
  redirect("/coach/menus");
}

export async function addRecommendation(form: FormData) {
  const coach = await requireCoach();
  const userId = clean(form.get("user_id"), 80); const body = clean(form.get("body"), 600);
  const category = ["entreno", "nutricion", "mente", "general"].includes(String(form.get("category"))) ? String(form.get("category")) : "general";
  if (!userId || !body) return;
  await db().query("insert into recommendations (user_id, coach_id, category, body) values ($1,$2,$3,$4)", [userId, coach.id, category, body]);
  redirect(`/coach/${userId}`);
}

export async function deleteRecommendation(form: FormData) {
  const coach = await requireCoach();
  const id = clean(form.get("id"), 80); const userId = clean(form.get("user_id"), 80);
  await db().query("delete from recommendations where id=$1 and coach_id=$2", [id, coach.id]);
  redirect(`/coach/${userId}`);
}

// ---------- Recetario y hacks (la coach edita en español; la app traduce sola a EN/PT) ----------
import { seedRecetario, getRecipe, getLesson, getRoutine, getMenu, RECIPE_CATEGORIES } from "@/lib/library";
import { translateContent } from "@/lib/translate";
import { routineI18n, menuI18n } from "@/lib/library-i18n";

const lines = (v: FormDataEntryValue | null, max = 40, each = 240) => String(v ?? "").split("\n").map((s) => s.trim().replace(/^[-•]\s*/, "")).filter(Boolean).slice(0, max).map((s) => s.slice(0, each));

export async function saveRecipe(form: FormData) {
  const coach = await requireCoach(); await seedRecetario();
  const id = clean(form.get("id"), 80) || null;
  const name = clean(form.get("name"), 120); if (!name) return;
  const category = RECIPE_CATEGORIES.some((c) => c.id === form.get("category")) ? String(form.get("category")) : "desayunos";
  const ingredients = lines(form.get("ingredients")); const steps = clean(form.get("steps"), 3000); const tips = clean(form.get("tips"), 800);
  const tags = clean(form.get("tags"), 200).split(",").map((s) => s.trim()).filter(Boolean).slice(0, 8);
  const prev = id ? await getRecipe(id) : null;
  const same = prev && prev.name === name && prev.steps === steps && prev.tips === tips && JSON.stringify(prev.ingredients) === JSON.stringify(ingredients);
  const i18n = same ? prev.i18n : (await translateContent({ name, ingredients, steps, tips })) ?? {};
  const vals = [category, name, JSON.stringify(ingredients), steps, tips, JSON.stringify(tags), JSON.stringify(i18n), form.get("free") === "on", int(form.get("sort"), 100, 0, 999), coach.id];
  if (id) await db().query("update recipes set category=$1, name=$2, ingredients=$3, steps=$4, tips=$5, tags=$6, i18n=$7, free=$8, sort=$9, updated_by=$10, updated_at=now() where id=$11", [...vals, id]);
  else await db().query("insert into recipes (category, name, ingredients, steps, tips, tags, i18n, free, sort, updated_by) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)", vals);
  redirect(`/coach/recipes?c=${category}&ok=1${same ? "" : "&tr=" + (Object.keys(i18n).length ? "ok" : "no")}`);
}

export async function deleteRecipe(form: FormData) {
  await requireCoach();
  const id = clean(form.get("id"), 80);
  const r = await db().query("delete from recipes where id=$1 returning category", [id]);
  redirect(`/coach/recipes?c=${r.rows[0]?.category ?? ""}`);
}

export async function saveLesson(form: FormData) {
  const coach = await requireCoach(); await seedRecetario();
  const id = clean(form.get("id"), 80) || null;
  const title = clean(form.get("title"), 120); if (!title) return;
  const body = clean(form.get("body"), 6000);
  const prev = id ? await getLesson(id) : null;
  const same = prev && prev.title === title && prev.body === body;
  const i18n = same ? prev.i18n : (await translateContent({ title, body })) ?? {};
  const vals = [title, body, JSON.stringify(i18n), form.get("free") === "on", int(form.get("sort"), 100, 0, 999), coach.id];
  if (id) await db().query("update lessons set title=$1, body=$2, i18n=$3, free=$4, sort=$5, updated_by=$6, updated_at=now() where id=$7", [...vals, id]);
  else await db().query("insert into lessons (title, body, i18n, free, sort, updated_by) values ($1,$2,$3,$4,$5,$6)", vals);
  redirect(`/coach/learn?ok=1${same ? "" : "&tr=" + (Object.keys(i18n).length ? "ok" : "no")}`);
}

export async function deleteLesson(form: FormData) {
  await requireCoach();
  await db().query("delete from lessons where id=$1", [clean(form.get("id"), 80)]);
  redirect("/coach/learn");
}
