"use client";

import { useState, useTransition } from "react";
import { addFoodEntry, deleteFoodEntry, type FoodEntry } from "@/app/actions/food";
import type { Dict } from "@/lib/i18n";

const hhmm = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
type Analysis = { name: string; kcal: number; protein: number; carbs: number; fat: number; confidence: string; note: string };

async function downscale(file: File, max = 1024): Promise<{ data: string; type: string }> {
  const bmp = await createImageBitmap(file);
  const s = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas"); c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  const url = c.toDataURL("image/jpeg", 0.85);
  return { data: url.split(",")[1], type: "image/jpeg" };
}

export function FoodTracker({ aiEnabled, initial, goal, L, gratis, premium }: { aiEnabled: boolean; initial: FoodEntry[]; goal: number; L: Dict["food"]; gratis: string; premium: string }) {
  const [log, setLog] = useState<FoodEntry[]>(initial);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Analysis | null>(null);
  const [note, setNote] = useState("");
  const [manual, setManual] = useState({ name: "", kcal: "" });
  const [manualMacros, setManualMacros] = useState<{ protein: number; carbs: number; fat: number; note: string } | null>(null);
  const [estimating, setEstimating] = useState(false);
  const [resultKcal, setResultKcal] = useState("");
  const [pending, start] = useTransition();
  const [err, setErr] = useState("");

  const total = log.reduce((a, m) => ({ kcal: a.kcal + m.kcal, p: a.p + m.protein, c: a.c + m.carbs, f: a.f + m.fat }), { kcal: 0, p: 0, c: 0, f: 0 });
  const pct = Math.min(100, Math.round((total.kcal / goal) * 100));

  async function analyze(file: File) {
    if (!aiEnabled) return;
    setAnalyzing(true); setResult(null); setNote(""); setErr("");
    try {
      const img = await downscale(file);
      const r = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: img.data, media_type: img.type }) });
      const d = await r.json();
      if (r.status === 429) setErr(L.desdeBasico);
      else if (d.food) { setResult(d.food); setResultKcal(String(d.food.kcal)); setNote(d.food.note || ""); }
      else if (d.error === "not_food") setNote(d.note || "?");
      else setErr(L.err);
    } catch { setErr(L.err); }
    finally { setAnalyzing(false); }
  }
  function save(e: { name: string; kcal: number; protein?: number; carbs?: number; fat?: number; photo?: string }) {
    setErr("");
    start(async () => { try { const saved = await addFoodEntry(e); setLog((l) => [...l, saved]); } catch { setErr(L.err); } });
  }
  function remove(id: string) { setLog((l) => l.filter((x) => x.id !== id)); start(() => deleteFoodEntry(id).catch(() => {})); }
  function addManual(ev: React.FormEvent) { ev.preventDefault(); const k = parseInt(manual.kcal, 10); if (!manual.name.trim() || !k) return; save({ name: manual.name, kcal: k, ...(manualMacros ? { protein: manualMacros.protein, carbs: manualMacros.carbs, fat: manualMacros.fat } : {}) }); setManual({ name: "", kcal: "" }); setManualMacros(null); }
  async function estimate() {
    if (!manual.name.trim()) return;
    setEstimating(true); setErr(""); setManualMacros(null);
    try {
      const r = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ food_text: manual.name }) });
      const d = await r.json();
      if (r.status === 429) setErr(L.desdeBasico);
      else if (d.food && d.food.kcal > 0) { setManual({ name: d.food.name || manual.name, kcal: String(d.food.kcal) }); setManualMacros({ protein: d.food.protein, carbs: d.food.carbs, fat: d.food.fat, note: d.food.note || "" }); }
      else if (d.error === "not_food") setErr(d.note || "?");
      else setErr(L.err);
    } catch { setErr(L.err); }
    finally { setEstimating(false); }
  }

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-4">
      <div className="space-y-4">
        <div className={`card p-5 ${aiEnabled ? "lift-sage" : ""}`}>
          <div className="flex justify-between items-center"><div className="eyebrow" style={{ color: "var(--sage)" }}>{L.fotoIA}</div>{!aiEnabled && <span className="pill pill-f">{premium}</span>}</div>
          <label className={`row block mt-3 p-6 text-center border-dashed ${aiEnabled && !analyzing ? "cursor-pointer hover:!border-[var(--sage)]" : "opacity-50"}`}>
            <input type="file" accept="image/*" capture="environment" className="hidden" disabled={!aiEnabled || analyzing} onChange={(e) => { const f = e.target.files?.[0]; if (f) analyze(f); e.target.value = ""; }} />
            <div className="text-3xl" style={{ color: "var(--sage)" }}>◐</div>
            <p className="muted text-xs mt-1">{aiEnabled ? L.tocaFoto : L.desdeBasico}</p>
          </label>
          {analyzing && <p className="text-center text-sm mt-3 animate-pulse" style={{ color: "var(--sage)" }}>{L.analizando}</p>}
          {note && !result && <p className="faint text-xs mt-3">{note}</p>}
          {result && (
            <div className="row p-3 mt-3 fade-in">
              <div className="flex items-center justify-between"><div className="display text-sm">{result.name}</div><span className={`pill ${result.confidence === "high" ? "pill-s" : result.confidence === "medium" ? "" : "pill-w"}`}>{result.confidence}</span></div>
              <div className="flex items-center gap-2 mt-1">
                <input type="number" inputMode="numeric" value={resultKcal} onChange={(e) => setResultKcal(e.target.value)} className="input input-s !w-24 num text-xl" style={{ color: "var(--sage)" }} aria-label="kcal" />
                <span className="text-xs muted">kcal</span>
              </div>
              <div className="faint text-xs mt-1">P {result.protein}g · C {result.carbs}g · G {result.fat}g</div>
              {note && <div className="faint text-[.65rem] mt-1 italic">{note}</div>}
              <div className="faint text-[.65rem] mt-1">{L.ajusta}</div>
              <button
                type="button"
                disabled={pending || !(parseInt(resultKcal, 10) > 0)}
                onClick={() => { const k = parseInt(resultKcal, 10) || result.kcal; save({ name: result.name, kcal: k, protein: result.protein, carbs: result.carbs, fat: result.fat, photo: "📷" }); setResult(null); setNote(""); setResultKcal(""); }}
                className="btn btn-go w-full mt-3 text-base py-3"
              >
                {pending ? L.guardando : L.agregar.replace("{n}", String(parseInt(resultKcal, 10) || result.kcal))}
              </button>
              <button type="button" onClick={() => { setResult(null); setNote(""); setResultKcal(""); }} className="faint text-xs w-full mt-2">✕</button>
            </div>
          )}
          {err && <p className="text-xs mt-2" style={{ color: "#FF8A8A" }}>{err}</p>}
        </div>
        <form onSubmit={addManual} className="card p-5">
          <div className="flex justify-between items-center mb-3"><div className="eyebrow">{L.manual}</div><span className="pill pill-s">{gratis}</span></div>
          <input id="food-name" value={manual.name} onChange={(e) => { setManual({ ...manual, name: e.target.value }); setManualMacros(null); }} placeholder={L.quecomiste} className="input input-s mb-2" />
          <button type="button" onClick={estimate} disabled={estimating || !manual.name.trim()} className="btn btn-balance btn-sm w-full mb-2">{estimating ? L.estimando : `◐ ${L.estimar}`}</button>
          <input id="food-kcal" value={manual.kcal} onChange={(e) => setManual({ ...manual, kcal: e.target.value })} placeholder={L.calorias} type="number" inputMode="numeric" className="input input-s mb-1" />
          {manualMacros && <div className="faint text-xs mb-2">P {manualMacros.protein}g · C {manualMacros.carbs}g · G {manualMacros.fat}g{manualMacros.note ? ` · ${manualMacros.note}` : ""}</div>}
          <button disabled={pending || !manual.name.trim() || !(parseInt(manual.kcal, 10) > 0)} className="btn btn-go w-full mt-2 py-3 text-base">{pending ? L.guardando : (parseInt(manual.kcal, 10) > 0 ? L.agregar.replace("{n}", manual.kcal) : "+")}</button>
        </form>
      </div>

      <div className="space-y-3">
        <div className="card p-5 flex items-center gap-5">
          <div className="ring w-24 h-24 shrink-0" style={{ background: `conic-gradient(var(--sage) 0 ${pct}%, var(--surface-3) ${pct}% 100%)` }}><span className="num text-lg">{pct}%</span></div>
          <div className="flex-1">
            <div className="eyebrow">{L.hoy}</div>
            <div className="num text-3xl">{total.kcal} <span className="text-sm muted font-normal">/ {goal} kcal</span></div>
            <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
              {[[L.proteina, total.p], [L.carbos, total.c], [L.grasas, total.f]].map(([l, v]) => (<div key={l as string}><div className="faint">{l}</div><div className="num">{v}g</div></div>))}
            </div>
          </div>
        </div>
        {log.length === 0 && <div className="row p-6 text-center muted text-sm">{L.sinComidas}</div>}
        {log.map((m) => (
          <div key={m.id} className="row p-4 flex items-center gap-4 fade-in">
            <div className="text-2xl">{m.photo}</div>
            <div className="flex-1"><div className="faint text-xs">{hhmm(m.at)}</div><div className="display text-sm">{m.name}</div>{m.protein > 0 && <div className="faint text-xs">P {m.protein}g · C {m.carbs}g · G {m.fat}g</div>}</div>
            <div className="num text-lg" style={{ color: "var(--sage)" }}>{m.kcal}</div>
            <button onClick={() => remove(m.id)} className="faint text-xs px-2" aria-label="✕">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
