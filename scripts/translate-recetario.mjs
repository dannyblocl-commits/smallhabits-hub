// Traduce data/recetario.json (ES, la voz de Maleja) a EN y PT-BR con Claude y escribe data/recetario.i18n.json.
// Uso: node scripts/translate-recetario.mjs            (solo lo que falte)
//      node scripts/translate-recetario.mjs --all      (rehace todo)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const client = new Anthropic();
const MODEL = "claude-sonnet-5";
const LANGS = { en: "American English", pt: "Brazilian Portuguese" };
const src = JSON.parse(readFileSync("data/recetario.json", "utf8"));
const outPath = "data/recetario.i18n.json";
const out = !process.argv.includes("--all") && existsSync(outPath) ? JSON.parse(readFileSync(outPath, "utf8")) : { categories: {}, recipes: {}, lessons: {} };

const SYSTEM = `You translate content for "Small Habits by Maleja", a wellness app. The author is Maleja, a Colombian ISSA-certified coach; the text is her own recipe book and nutrition tips written in warm, direct, second-person Spanish.
Rules:
- Translate into the requested language keeping her warm, personal voice (first person asides like "yo las tomo así" stay personal).
- Keep the JSON structure and keys EXACTLY. Translate only string values. Arrays keep the same length and order.
- Preserve line breaks (\\n) and the light markup used in lesson bodies: lines starting with "# " are subheadings, "- " list items, "> " quotes. Keep them.
- Units: cda → tbsp (EN) / colher de sopa (PT); cdita → tsp (EN) / colher de chá (PT). Keep °F/°C, grams and cups as written.
- Keep brand handles (@NatMatStore), product names (ghee, stevia, sriracha, kale, airfryer) and the dish names that have no equivalent, adding a short gloss the first time when helpful: patacones (crispy green plantain), arepa, ahuyama (squash/pumpkin), hogao (Colombian tomato-onion sauce), maduro (ripe plantain), tajín, cuajada. In Portuguese, ahuyama = abóbora, batata = batata-doce, plátano verde = banana-da-terra verde.
- Do not add or remove information. Do not add disclaimers.
Respond ONLY with the JSON object, no prose, no code fences.`;

async function translate(lang, payload) {
  const r = await client.messages.create({
    model: MODEL, max_tokens: 16000, system: SYSTEM,
    messages: [{ role: "user", content: `Target language: ${LANGS[lang]}.\n\n${JSON.stringify(payload)}` }],
  });
  const text = r.content.filter((b) => b.type === "text").map((b) => b.text).join("").trim().replace(/^```(json)?/i, "").replace(/```$/, "").trim();
  return JSON.parse(text);
}

const jobs = [];
const chunk = (arr, n) => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

for (const lang of Object.keys(LANGS)) {
  const cats = src.categories.filter((c) => !out.categories[c.id]?.[lang]);
  if (cats.length) jobs.push(async () => {
    const t = await translate(lang, cats.map((c) => ({ id: c.id, name: c.name })));
    for (const c of t) (out.categories[c.id] ||= {})[lang] = { name: c.name };
  });
  const recipes = src.recipes.filter((r) => !out.recipes[r.id]?.[lang]);
  for (const batch of chunk(recipes, 8)) jobs.push(async () => {
    const t = await translate(lang, batch.map((r) => ({ id: r.id, name: r.name, ingredients: r.ingredients, steps: r.steps, tips: r.tips })));
    for (const r of t) {
      const s = batch.find((x) => x.id === r.id);
      if (!s || !Array.isArray(r.ingredients) || r.ingredients.length !== s.ingredients.length) { console.error(`shape mismatch ${lang} ${r.id}`); continue; }
      (out.recipes[r.id] ||= {})[lang] = { name: r.name, ingredients: r.ingredients, steps: r.steps, tips: r.tips ?? "" };
    }
  });
  const lessons = src.lessons.filter((l) => !out.lessons[l.id]?.[lang]);
  for (const batch of chunk(lessons, 4)) jobs.push(async () => {
    const t = await translate(lang, batch.map((l) => ({ id: l.id, title: l.title, body: l.body })));
    for (const l of t) (out.lessons[l.id] ||= {})[lang] = { title: l.title, body: l.body };
  });
}

console.log(`${jobs.length} llamadas a ${MODEL}`);
let done = 0, failed = 0;
const workers = Array.from({ length: 5 }, async () => {
  while (jobs.length) {
    const j = jobs.shift();
    try { await j(); } catch (e) { failed++; console.error("fallo:", e.message?.slice(0, 200)); }
    done++; process.stdout.write(`\r${done} listas, ${failed} fallidas`);
    writeFileSync(outPath, JSON.stringify(out, null, 1));
  }
});
await Promise.all(workers);
writeFileSync(outPath, JSON.stringify(out, null, 1));
const missing = [];
for (const lang of Object.keys(LANGS)) {
  for (const r of src.recipes) if (!out.recipes[r.id]?.[lang]) missing.push(`${lang}:${r.id}`);
  for (const l of src.lessons) if (!out.lessons[l.id]?.[lang]) missing.push(`${lang}:${l.id}`);
  for (const c of src.categories) if (!out.categories[c.id]?.[lang]) missing.push(`${lang}:${c.id}`);
}
console.log(`\nfaltan: ${missing.length}${missing.length ? " → " + missing.join(", ") : ""}`);
