// Rellena i18n (en/pt) de las rutinas y menús que no lo tengan, con Claude. Idempotente. Uso: node scripts/translate-library.mjs [--all]
import { readFileSync } from "node:fs";
import pg from "pg";
import Anthropic from "@anthropic-ai/sdk";
for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
await pool.query(readFileSync("lib/db.ts", "utf8").match(/query\(`([\s\S]*?)`\)/)[1]);
const client = new Anthropic();
const SYSTEM = `You translate content for "Small Habits by Maleja", a wellness app, written by Maleja, a Colombian ISSA-certified coach, in warm second-person Spanish. Keep the JSON structure and keys EXACTLY; translate only string values; arrays keep length and order; "-" stays "-". Exercise names use the common gym term in the target language. Respond ONLY with the JSON object.`;
const LANGS = { en: "American English", pt: "Brazilian Portuguese" };
async function tr(lang, payload) {
  const r = await client.messages.create({ model: "claude-sonnet-5", max_tokens: 6000, system: SYSTEM, messages: [{ role: "user", content: `Target language: ${LANGS[lang]}.\n\n${JSON.stringify(payload)}` }] });
  const text = r.content.filter((b) => b.type === "text").map((b) => b.text).join("").trim().replace(/^```(json)?/i, "").replace(/```$/, "").trim();
  return JSON.parse(text);
}
const all = process.argv.includes("--all");
let n = 0;
for (const r of (await pool.query("select * from routines")).rows) {
  if (!all && r.i18n?.en && r.i18n?.pt) continue;
  const flat = { name: r.name, description: r.description ?? "", ex_names: r.exercises.map((e) => e.name), ex_descs: r.exercises.map((e) => e.description || "-"), ex_muscles: r.exercises.map((e) => (e.muscle_groups ?? []).join(", ") || "-") };
  const i18n = {};
  for (const lang of Object.keys(LANGS)) {
    const x = await tr(lang, flat);
    i18n[lang] = { name: x.name, description: x.description, exercises: r.exercises.map((_, i) => ({ name: x.ex_names[i], description: x.ex_descs[i] === "-" ? "" : x.ex_descs[i], muscle_groups: x.ex_muscles[i] === "-" ? [] : x.ex_muscles[i].split(",").map((s) => s.trim()).filter(Boolean) })) };
  }
  await pool.query("update routines set i18n=$1 where id=$2", [JSON.stringify(i18n), r.id]);
  console.log(`rutina ${r.name} → ${i18n.en.name} / ${i18n.pt.name}`); n++;
}
for (const m of (await pool.query("select * from menus")).rows) {
  if (!all && m.i18n?.en && m.i18n?.pt) continue;
  const flat = { name: m.name, meal_names: m.meals.map((x) => x.name), meal_descs: m.meals.map((x) => x.description || "-"), rec_names: m.recipes.map((x) => x.name), rec_steps: m.recipes.map((x) => x.steps || "-"), brands: m.brands || "-" };
  const i18n = {};
  for (const lang of Object.keys(LANGS)) {
    const x = await tr(lang, flat);
    i18n[lang] = { name: x.name, meals: m.meals.map((_, i) => ({ name: x.meal_names[i], description: x.meal_descs[i] === "-" ? "" : x.meal_descs[i] })), recipes: m.recipes.map((_, i) => ({ name: x.rec_names[i], steps: x.rec_steps[i] === "-" ? "" : x.rec_steps[i] })), brands: x.brands === "-" ? "" : x.brands };
  }
  await pool.query("update menus set i18n=$1 where id=$2", [JSON.stringify(i18n), m.id]);
  console.log(`menú ${m.name} → ${i18n.en.name} / ${i18n.pt.name}`); n++;
}
console.log(`${n} traducidos`);
await pool.end();
