"use client";

import { useState, useTransition } from "react";
import { addFoodEntry, deleteFoodEntry, type FoodEntry } from "@/app/actions/food";
import type { Dict } from "@/lib/i18n";

const hhmm = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export function FoodTracker({ aiEnabled, initial, goal, L, gratis, premium }: { aiEnabled: boolean; initial: FoodEntry[]; goal: number; L: Dict["food"]; gratis: string; premium: string }) {
  const [log, setLog] = useState<FoodEntry[]>(initial);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ name: string; kcal: number; p: number; c: number; f: number; photo: string } | null>(null);
  const [manual, setManual] = useState({ name: "", kcal: "" });
  const [pending, start] = useTransition();
  const [err, setErr] = useState("");

  const total = log.reduce((a, m) => ({ kcal: a.kcal + m.kcal, p: a.p + m.protein, c: a.c + m.carbs, f: a.f + m.fat }), { kcal: 0, p: 0, c: 0, f: 0 });
  const pct = Math.min(100, Math.round((total.kcal / goal) * 100));

  function analyze() { if (!aiEnabled) return; setAnalyzing(true); setResult(null); setTimeout(() => { setResult({ name: "Salmón + camote + espinaca", kcal: 450, p: 40, c: 37, f: 15, photo: "🐟" }); setAnalyzing(false); }, 1600); }
  function save(e: { name: string; kcal: number; protein?: number; carbs?: number; fat?: number; photo?: string }) {
    setErr("");
    start(async () => { try { const saved = await addFoodEntry(e); setLog((l) => [...l, saved]); } catch { setErr(L.err); } });
  }
  function remove(id: string) { setLog((l) => l.filter((x) => x.id !== id)); start(() => deleteFoodEntry(id).catch(() => {})); }
  function addManual(ev: React.FormEvent) { ev.preventDefault(); const k = parseInt(manual.kcal, 10); if (!manual.name.trim() || !k) return; save({ name: manual.name, kcal: k }); setManual({ name: "", kcal: "" }); }

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-4">
      <div className="space-y-4">
        <div className={`card p-5 ${aiEnabled ? "lift-sage" : ""}`}>
          <div className="flex justify-between items-center"><div className="eyebrow" style={{ color: "var(--sage)" }}>{L.fotoIA}</div>{!aiEnabled && <span className="pill pill-f">{premium}</span>}</div>
          <label className={`row block mt-3 p-6 text-center border-dashed ${aiEnabled ? "cursor-pointer hover:!border-[var(--sage)]" : "opacity-50"}`}>
            <input type="file" accept="image/*" capture="environment" className="hidden" disabled={!aiEnabled} onChange={analyze} />
            <div className="text-3xl" style={{ color: "var(--sage)" }}>◐</div>
            <p className="muted text-xs mt-1">{aiEnabled ? L.tocaFoto : L.desdeBasico}</p>
          </label>
          {aiEnabled && <button onClick={analyze} className="btn btn-balance btn-sm w-full mt-3">{L.probar}</button>}
          {analyzing && <p className="text-center text-sm mt-3 animate-pulse" style={{ color: "var(--sage)" }}>{L.analizando}</p>}
          {result && (
            <div className="row p-3 mt-3 fade-in"><div className="display text-sm">{result.photo} {result.name}</div><div className="num text-2xl" style={{ color: "var(--sage)" }}>{result.kcal} <span className="text-xs muted font-normal">kcal</span></div><div className="faint text-xs">P {result.p}g · C {result.c}g · G {result.f}g</div>
              <button onClick={() => { save({ name: result.name, kcal: result.kcal, protein: result.p, carbs: result.c, fat: result.f, photo: result.photo }); setResult(null); }} className="btn btn-balance btn-sm w-full mt-2">+</button></div>
          )}
        </div>
        <form onSubmit={addManual} className="card p-5">
          <div className="flex justify-between items-center mb-3"><div className="eyebrow">{L.manual}</div><span className="pill pill-s">{gratis}</span></div>
          <input id="food-name" value={manual.name} onChange={(e) => setManual({ ...manual, name: e.target.value })} placeholder={L.quecomiste} className="input input-s mb-2" />
          <input id="food-kcal" value={manual.kcal} onChange={(e) => setManual({ ...manual, kcal: e.target.value })} placeholder={L.calorias} type="number" className="input input-s mb-3" />
          <button disabled={pending} className="btn btn-sm w-full">{pending ? L.guardando : "+"}</button>
          {err && <p className="text-xs mt-2" style={{ color: "#FF8A8A" }}>{err}</p>}
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
