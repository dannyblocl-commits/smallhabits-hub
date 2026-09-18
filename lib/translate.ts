// Traducción automática ES → EN/PT de contenido que edita la coach (recetas, lecciones). Best-effort: si falla, devuelve null y la app muestra el español.
import Anthropic from "@anthropic-ai/sdk";

export type Translatable = Record<string, string | string[]>;
const LANGS = { en: "American English", pt: "Brazilian Portuguese" } as const;
const SYSTEM = `You translate content for "Small Habits by Maleja", a wellness app. The author is Maleja, a Colombian ISSA-certified coach writing warm, direct, second-person Spanish.
Keep the JSON structure and keys EXACTLY; translate only string values; arrays keep the same length and order. Preserve line breaks and the light markup: lines starting with "# " are subheadings, "- " list items, "> " quotes.
Units: cda → tbsp / colher de sopa; cdita → tsp / colher de chá. Keep brand handles and dish names with no equivalent (patacones, arepa, hogao, ahuyama), adding a short gloss when helpful. Do not add or remove information.
Respond ONLY with the JSON object.`;

export async function translateContent<T extends Translatable>(payload: T): Promise<Record<"en" | "pt", T> | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  try {
    const client = new Anthropic();
    const one = async (lang: keyof typeof LANGS): Promise<T> => {
      const r = await client.messages.create({ model: "claude-sonnet-5", max_tokens: 4000, system: SYSTEM, messages: [{ role: "user", content: `Target language: ${LANGS[lang]}.\n\n${JSON.stringify(payload)}` }] }, { timeout: 45_000 });
      const text = r.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("").trim().replace(/^```(json)?/i, "").replace(/```$/, "").trim();
      const out = JSON.parse(text) as T;
      for (const k of Object.keys(payload)) {
        const a = payload[k], b = out[k];
        if (Array.isArray(a) ? !Array.isArray(b) || b.length !== a.length : typeof b !== "string") throw new Error(`shape ${k}`);
      }
      return out;
    };
    const [en, pt] = await Promise.all([one("en"), one("pt")]);
    return { en, pt };
  } catch (e) {
    console.error("translateContent:", (e as Error).message);
    return null;
  }
}
