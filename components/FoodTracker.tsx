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
  const now = () => new Date().toTimeString().slice(0, 5);

  function analyze() {
    if (!aiEnabled) return;
    setAnalyzing(true); setResult(null);
    setTimeout(() => { setResult({ time: now(), name: "Salmón + camote + espinaca", kcal: 450, p: 40, c: 37, f: 15, photo: "🐟" }); setAnalyzing(false); }, 1600);
  }
  function addResult() { if (result) { setLog((l) => [...l, result]); setResult(null); } }
  function addManual(e: React.FormEvent) {
    e.preventDefault();
    const k = parseInt(manual.kcal, 10);
    if (!manual.name.trim() || !k) return;
    setLog((l) => [...l, { time: now(), name: manual.name, kcal: k, p: 0, c: 0, f: 0, photo: "🍽️" }]);
    setManual({ name: "", kcal: "" });
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="space-y-4">
        <div className={`bg-white rounded-2xl p-6 border-2 ${aiEnabled ? "border-[#C8D5C0]" : "border-[#E0D5C8]"} relative`}>
          {!aiEnabled && <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#A67C5B] text-white px-2 py-1 rounded-full">PREMIUM</span>}
          <h2 className="text-xl font-semibold text-[#2C2C2C] mb-3">📸 Foto → IA calcula</h2>
          <label className={`block border-2 border-dashed rounded-xl p-6 text-center ${aiEnabled ? "border-[#E0D5C8] hover:border-[#6B8F71] cursor-pointer" : "border-[#E0D5C8] opacity-50"}`}>
            <input type="file" accept="image/*" capture="environment" className="hidden" disabled={!aiEnabled} onChange={analyze} />
            <div className="text-4xl mb-1">📷</div>
            <p className="text-xs text-[#6B6560]">{aiEnabled ? "Toca para tomar foto de tu plato" : "Disponible desde el plan Básico"}</p>
          </label>
          {aiEnabled && <button onClick={analyze} className="w-full mt-3 bg-[#6B8F71] hover:bg-[#5a7a61] text-white py-2 rounded-full text-sm font-semibold transition">Probar con foto de ejemplo</button>}
          {analyzing && <p className="mt-3 text-center text-sm text-[#A67C5B] animate-pulse">🤖 Analizando tu comida...</p>}
          {result && (
            <div className="mt-3 bg-[#EDE6DC] rounded-xl p-3">
              <p className="font-semibold text-[#2C2C2C] text-sm">{result.photo} {result.name}</p>
              <p className="text-xl font-bold text-[#A67C5B]">{result.kcal} kcal</p>
              <p className="text-xs text-[#6B6560]">P {result.p}g · C {result.c}g · G {result.f}g</p>
              <button onClick={addResult} className="w-full mt-2 bg-[#A67C5B] text-white py-2 rounded-full text-xs font-semibold">+ Agregar</button>
            </div>
          )}
        </div>

        <form onSubmit={addManual} className="bg-white rounded-2xl p-6 border border-[#E0D5C8]">
          <h2 className="text-lg font-semibold text-[#2C2C2C] mb-3">✍️ Registro manual <span className="text-[10px] bg-[#C8D5C0] px-2 py-1 rounded-full ml-1">GRATIS</span></h2>
          <input value={manual.name} onChange={(e) => setManual({ ...manual, name: e.target.value })} placeholder="¿Qué comiste?" className="w-full border border-[#E0D5C8] rounded-lg px-3 py-2 text-sm mb-2" />
          <input value={manual.kcal} onChange={(e) => setManual({ ...manual, kcal: e.target.value })} placeholder="Calorías aprox." type="number" className="w-full border border-[#E0D5C8] rounded-lg px-3 py-2 text-sm mb-3" />
          <button className="w-full bg-[#EDE6DC] hover:bg-[#C8D5C0] text-[#2C2C2C] py-2 rounded-full text-sm font-semibold transition">Agregar</button>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-2xl p-6 border border-[#E0D5C8]">
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-xl font-semibold text-[#2C2C2C]">Hoy</h2>
            <div><span className="text-3xl font-bold text-[#A67C5B]">{total.kcal}</span><span className="text-[#6B6560]"> / 1.800 kcal</span></div>
          </div>
          <div className="h-3 bg-[#EDE6DC] rounded-full overflow-hidden mb-3"><div className="h-full bg-[#6B8F71] transition-all" style={{ width: `${Math.min(100, (total.kcal / 1800) * 100)}%` }} /></div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="bg-[#FAFAF7] rounded-lg p-2"><div className="text-[#6B6560] text-xs">Proteína</div><div className="font-bold">{total.p}g / 135g</div></div>
            <div className="bg-[#FAFAF7] rounded-lg p-2"><div className="text-[#6B6560] text-xs">Carbos</div><div className="font-bold">{total.c}g / 225g</div></div>
            <div className="bg-[#FAFAF7] rounded-lg p-2"><div className="text-[#6B6560] text-xs">Grasas</div><div className="font-bold">{total.f}g / 60g</div></div>
          </div>
        </div>
        {log.map((m, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-[#E0D5C8] flex items-center gap-4">
            <div className="text-3xl">{m.photo}</div>
            <div className="flex-1"><div className="text-xs text-[#6B6560]">{m.time}</div><div className="font-medium text-[#2C2C2C]">{m.name}</div>{m.p > 0 && <div className="text-xs text-[#6B6560]">P {m.p}g · C {m.c}g · G {m.f}g</div>}</div>
            <div className="text-lg font-bold text-[#A67C5B]">{m.kcal}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
