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
  const vals = [name, clean(form.get("description"), 300), clean(form.get("type"), 30) || "funcional", int(form.get("duration_minutes"), 20, 1, 240), clean(form.get("difficulty"), 20) || "beginner", JSON.stringify(exercises), form.get("free") === "on", int(form.get("sort"), 100, 0, 999), coach.id];
  if (id) await db().query("update routines set name=$1, description=$2, type=$3, duration_minutes=$4, difficulty=$5, exercises=$6, free=$7, sort=$8, updated_by=$9, updated_at=now() where id=$10", [...vals, id]);
  else await db().query("insert into routines (name, description, type, duration_minutes, difficulty, exercises, free, sort, updated_by) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)", vals);
  redirect("/coach/routines?ok=1");
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
  const vals = [name, kcal, clean(form.get("macros"), 60), clean(form.get("goal"), 40) || "Salud integral", JSON.stringify(meals), JSON.stringify(recipes), clean(form.get("brands"), 500), form.get("free") === "on", int(form.get("sort"), 100, 0, 999), coach.id];
  if (id) await db().query("update menus set name=$1, kcal=$2, macros=$3, goal=$4, meals=$5, recipes=$6, brands=$7, free=$8, sort=$9, updated_by=$10, updated_at=now() where id=$11", [...vals, id]);
  else await db().query("insert into menus (name, kcal, macros, goal, meals, recipes, brands, free, sort, updated_by) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)", vals);
  redirect("/coach/menus?ok=1");
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
