"use client";

import { useState } from "react";

type Entry = { time: string; name: string; kcal: number; p: number; c: number; f: number; photo: string };
const seed: Entry[] = [
  { time: "07:30", name: "Huevos revueltos + pan integral + aguacate", kcal: 490, p: 27, c: 36, f: 28, photo: "🍳" },
  { time: "12:45", name: "Pollo a la plancha + arroz integral + verduras", kcal: 600, p: 70, c: 57, f: 9, photo: "🍗" },
  { time: "16:00", name: "Batido de proteína + plátano", kcal: 225, p: 26, c: 29, f: 2, photo: "🥤" },
];

export function FoodTracker({ aiEnabled }: { aiEnabled: boolean }) {
  const [log, setLog] = useState<Entry[]>(seed);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Entry | null>(null);
  const [manual, setManual] = useState({ name: "", kcal: "" });
  const total = log.reduce((a, m) => ({ kcal: a.kcal + m.kcal, p: a.p + m.p, c: a.c + m.c, f: a.f + m.f }), { kcal: 0, p: 0, c: 0, f: 0 });
  const goal = 1800, pct = Math.min(100, Math.round((total.kcal / goal) * 100));
  const now = () => new Date().toTimeString().slice(0, 5);

  function analyze() { if (!aiEnabled) return; setAnalyzing(true); setResult(null); setTimeout(() => { setResult({ time: now(), name: "Salmón + camote + espinaca", kcal: 450, p: 40, c: 37, f: 15, photo: "🐟" }); setAnalyzing(false); }, 1600); }
  function addManual(e: React.FormEvent) { e.preventDefault(); const k = parseInt(manual.kcal, 10); if (!manual.name.trim() || !k) return; setLog((l) => [...l, { time: now(), name: manual.name, kcal: k, p: 0, c: 0, f: 0, photo: "◐" }]); setManual({ name: "", kcal: "" }); }

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-4">
      <div className="space-y-4">
        <div className={`card p-5 ${aiEnabled ? "lift-sage" : ""}`}>
          <div className="flex justify-between items-center"><div className="eyebrow" style={{ color: "var(--sage)" }}>Foto → IA</div>{!aiEnabled && <span className="pill pill-f">Premium</span>}</div>
          <label className={`row block mt-3 p-6 text-center border-dashed ${aiEnabled ? "cursor-pointer hover:!border-[var(--sage)]" : "opacity-50"}`}>
            <input type="file" accept="image/*" capture="environment" className="hidden" disabled={!aiEnabled} onChange={analyze} />
            <div className="text-3xl" style={{ color: "var(--sage)" }}>◐</div>
            <p className="muted text-xs mt-1">{aiEnabled ? "Toca para tomar foto de tu plato" : "Desde el plan Básico"}</p>
          </label>
          {aiEnabled && <button onClick={analyze} className="btn btn-balance btn-sm w-full mt-3">Probar con foto de ejemplo</button>}
          {analyzing && <p className="text-center text-sm mt-3 animate-pulse" style={{ color: "var(--sage)" }}>Analizando tu comida…</p>}
          {result && (
            <div className="row p-3 mt-3 fade-in"><div className="display text-sm">{result.photo} {result.name}</div><div className="num text-2xl" style={{ color: "var(--sage)" }}>{result.kcal} <span className="text-xs muted font-normal">kcal</span></div><div className="faint text-xs">P {result.p}g · C {result.c}g · G {result.f}g</div><button onClick={() => { setLog((l) => [...l, result]); setResult(null); }} className="btn btn-balance btn-sm w-full mt-2">Agregar</button></div>
          )}
        </div>
        <form onSubmit={addManual} className="card p-5">
          <div className="flex justify-between items-center mb-3"><div className="eyebrow">Registro manual</div><span className="pill pill-s">Gratis</span></div>
          <input id="food-name" value={manual.name} onChange={(e) => setManual({ ...manual, name: e.target.value })} placeholder="¿Qué comiste?" className="input input-s mb-2" />
          <input id="food-kcal" value={manual.kcal} onChange={(e) => setManual({ ...manual, kcal: e.target.value })} placeholder="Calorías aprox." type="number" className="input input-s mb-3" />
          <button className="btn btn-sm w-full">Agregar</button>
        </form>
      </div>

      <div className="space-y-3">
        <div className="card p-5 flex items-center gap-5">
          <div className="ring w-24 h-24 shrink-0" style={{ background: `conic-gradient(var(--sage) 0 ${pct}%, var(--surface-3) ${pct}% 100%)` }}><span className="num text-lg">{pct}%</span></div>
          <div className="flex-1">
            <div className="eyebrow">Hoy</div>
            <div className="num text-3xl">{total.kcal} <span className="text-sm muted font-normal">/ {goal} kcal</span></div>
            <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
              {[["Proteína", total.p, 135], ["Carbos", total.c, 225], ["Grasas", total.f, 60]].map(([l, v, g]) => (<div key={l as string}><div className="faint">{l}</div><div className="num">{v}g <span className="faint font-normal">/ {g}</span></div></div>))}
            </div>
          </div>
        </div>
        {log.map((m, i) => (
          <div key={i} className="row p-4 flex items-center gap-4 fade-in"><div className="text-2xl">{m.photo}</div><div className="flex-1"><div className="faint text-xs">{m.time}</div><div className="display text-sm">{m.name}</div>{m.p > 0 && <div className="faint text-xs">P {m.p}g · C {m.c}g · G {m.f}g</div>}</div><div className="num text-lg" style={{ color: "var(--sage)" }}>{m.kcal}</div></div>
        ))}
      </div>
    </div>
  );
}
