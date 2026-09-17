import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getUser } from "@/lib/auth";
import { db, ensureSchema } from "@/lib/db";
import { hasPlan } from "@/lib/plan";
import { getLang } from "@/lib/i18n";
import { demoRoutines } from "@/data/routines";

const MODEL = "claude-opus-5";
const LIMITS = { chat: { free: 5, basico: 40, pro: Infinity, elite: Infinity }, photo: { free: 0, basico: 10, pro: Infinity, elite: Infinity } } as const;
const LANG_NAME = { es: "Spanish", en: "English", pt: "Brazilian Portuguese" } as const;

const SYSTEM = `You are the Small Habits assistant, the in-app helper of "Small Habits by Maleja" — a wellness app built on the idea "small habits, big results" (pequeños hábitos, grandes resultados). Maleja is an ISSA-certified coach (CPT, Nutrition Coach, Strength & Conditioning).

How you behave:
- Warm, direct, encouraging, never preachy. Short answers: 2–5 sentences, or a short list when it truly helps. No emoji walls.
- You give general educational guidance on training, nutrition, habits, rest and mindset. You never diagnose, prescribe, or promise results. For pain, injury, pregnancy, eating disorders, medication or any medical condition: say clearly to stop and consult a health professional, and offer to notify their coach.
- Use the member's real context (goal, calories today, assigned routine) when relevant. If something needs a personal decision (changing a plan, supplements), point them to their coach in the 1:1 chat.
- Supplements: only general information; no brand claims, no "burns fat", "detox" or cure language.
- Answer in the member's language.`;

const PHOTO_PROMPT = `Look at this meal photo and estimate its nutrition. Respond ONLY with JSON, no prose: {"name": "<short dish name in the member's language>", "kcal": <integer>, "protein_g": <integer>, "carbs_g": <integer>, "fat_g": <integer>, "confidence": "low"|"medium"|"high", "note": "<one short sentence in the member's language about what you assumed, e.g. portion size>"}. If it is not food, return {"name": "", "kcal": 0, "protein_g": 0, "carbs_g": 0, "fat_g": 0, "confidence": "low", "note": "<why>"}.`;

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ error: "assistant not configured" }, { status: 501 });
  await ensureSchema();
  const lang = await getLang();

  const body = (await req.json().catch(() => ({}))) as { message?: string; history?: { role: "user" | "assistant"; text: string }[]; image?: string; media_type?: string };
  const kind: "chat" | "photo" = body.image ? "photo" : "chat";
  const limit = LIMITS[kind][user.plan];
  const used = (await db().query("select count(*)::int as n from ai_usage where user_id=$1 and kind=$2 and at >= date_trunc('day', now())", [user.id, kind])).rows[0].n as number;
  if (used >= limit) return NextResponse.json({ error: "limit", used, limit: Number.isFinite(limit) ? limit : null, upgrade: kind === "photo" ? "basico" : "pro" }, { status: 429 });

  const [kcal, assign] = await Promise.all([
    db().query("select coalesce(sum(kcal),0)::int as kcal from food_entries where user_id=$1 and at >= date_trunc('day', now())", [user.id]),
    db().query("select routine_id, note from assignments where user_id=$1", [user.id]),
  ]);
  const routine = assign.rows[0]?.routine_id ? demoRoutines.find((r) => r.id === assign.rows[0].routine_id)?.name : null;
  const goalKcal: Record<string, number> = { "Perder peso": 1500, Tonificar: 1800, "Ganar fuerza": 2600, Resistencia: 2200, Flexibilidad: 1900, "Salud integral": 1900 };
  const target = goalKcal[user.goal] ?? 1800;
  const context = `Member context — name: ${user.name}; goal: ${user.goal}; plan: ${user.plan}; daily calorie target (app default for this goal, the coach may adjust): ${target} kcal; calories logged today: ${kcal.rows[0].kcal}; weight: ${user.weight ?? "unknown"} kg; assigned routine: ${routine ?? "none"}; coach note: ${assign.rows[0]?.note ?? "none"}. Reply in ${LANG_NAME[lang]}.`;

  const client = new Anthropic();
  const messages: Anthropic.Beta.BetaMessageParam[] = [];
  if (kind === "chat") {
    for (const h of (body.history ?? []).slice(-10)) messages.push({ role: h.role, content: h.text.slice(0, 2000) });
    const text = (body.message ?? "").trim().slice(0, 2000);
    if (!text) return NextResponse.json({ error: "empty" }, { status: 400 });
    messages.push({ role: "user", content: text });
  } else {
    const media = (body.media_type ?? "image/jpeg") as "image/jpeg" | "image/png" | "image/webp" | "image/gif";
    messages.push({ role: "user", content: [{ type: "image", source: { type: "base64", media_type: media, data: body.image!.replace(/^data:[^;]+;base64,/, "") } }, { type: "text", text: PHOTO_PROMPT }] });
  }

  try {
    const res = await client.beta.messages.create({
      model: MODEL,
      max_tokens: kind === "chat" ? 600 : 300,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }, { type: "text", text: context }],
      messages,
    });
    await db().query("insert into ai_usage (user_id, kind, tokens_in, tokens_out) values ($1,$2,$3,$4)", [user.id, kind, res.usage.input_tokens, res.usage.output_tokens]);
    if (res.stop_reason === "refusal") return NextResponse.json({ error: "refusal" }, { status: 200 });
    const text = res.content.filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text").map((b) => b.text).join("").trim();
    const remaining = Number.isFinite(limit) ? Math.max(0, limit - used - 1) : null;

    if (kind === "chat") return NextResponse.json({ text, remaining });

    const m = text.match(/\{[\s\S]*\}/);
    let parsed: { name: string; kcal: number; protein_g: number; carbs_g: number; fat_g: number; confidence: string; note: string } | null = null;
    try { parsed = m ? JSON.parse(m[0]) : null; } catch { parsed = null; }
    if (!parsed || !parsed.name) return NextResponse.json({ error: "not_food", note: parsed?.note ?? text, remaining });
    return NextResponse.json({ food: { name: String(parsed.name).slice(0, 120), kcal: Math.round(Number(parsed.kcal) || 0), protein: Math.round(Number(parsed.protein_g) || 0), carbs: Math.round(Number(parsed.carbs_g) || 0), fat: Math.round(Number(parsed.fat_g) || 0), confidence: parsed.confidence, note: parsed.note }, remaining });
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) return NextResponse.json({ error: "busy" }, { status: 503 });
    if (e instanceof Anthropic.APIError) return NextResponse.json({ error: "api", status: e.status }, { status: 502 });
    return NextResponse.json({ error: "unknown" }, { status: 500 });
  }
}
