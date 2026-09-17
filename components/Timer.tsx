"use client";

import { useEffect, useRef, useState } from "react";
import { markWorkoutDone } from "@/app/actions/food";

type Step = { name: string; seconds: number; kind: "work" | "rest" };
export type TimerLabels = { trabajo: string; descansoT: string; pausa: string; reiniciar: string; completada: string; completadaText: string; repetir: string };

function fmt(s: number) { return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; }

export function Timer({ steps, tone = "fucsia", routineId, routineType, labels }: { steps: Step[]; tone?: "fucsia" | "sage"; routineId?: string; routineType?: string; labels: TimerLabels }) {
  const [i, setI] = useState(0);
  const [left, setLeft] = useState(steps[0]?.seconds ?? 0);
  const [run, setRun] = useState(false);
  const [done, setDone] = useState(false);
  const [burned, setBurned] = useState<number | null>(null);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!run) { if (tick.current) clearInterval(tick.current); return; }
    tick.current = setInterval(() => {
      setLeft((l) => {
        if (l > 1) return l - 1;
        if (i + 1 < steps.length) { setI(i + 1); return steps[i + 1].seconds; }
        setRun(false); setDone(true); return 0;
      });
    }, 1000);
    return () => { if (tick.current) clearInterval(tick.current); };
  }, [run, i, steps]);

  useEffect(() => {
    if (!done || !routineId) return;
    const minutes = Math.max(1, Math.round(steps.reduce((a, s) => a + s.seconds, 0) / 60));
    markWorkoutDone(routineId, minutes, routineType).then((k) => setBurned(k)).catch(() => {});
  }, [done, routineId, routineType, steps]);

  const step = steps[i];
  const total = steps.reduce((a, s) => a + s.seconds, 0);
  const elapsed = steps.slice(0, i).reduce((a, s) => a + s.seconds, 0) + (step ? step.seconds - left : 0);
  const pct = total ? Math.round((elapsed / total) * 100) : 0;
  function reset() { setRun(false); setDone(false); setI(0); setLeft(steps[0]?.seconds ?? 0); }

  if (done) {
    return (
      <div className="card lift-sage p-8 text-center fade-in">
        <div className="eyebrow" style={{ color: "var(--sage)" }}>{labels.completada}</div>
        <div className="timer sage text-6xl mt-2">✓</div>
        {burned !== null && <div className="num text-3xl mt-3" style={{ color: "var(--fucsia)" }}>−{burned} <span className="text-sm muted font-normal">kcal</span></div>}
        <p className="muted mt-3">{labels.completadaText}</p>
        <button onClick={reset} className="btn btn-ghost btn-sm mt-4">{labels.repetir}</button>
      </div>
    );
  }

  const rest = step?.kind === "rest";
  return (
    <div className={`card p-6 text-center ${run && !rest ? "lift" : ""}`}>
      <div className="flex items-center justify-between text-xs">
        <span className={`pill ${rest ? "pill-s" : "pill-f"}`}>{rest ? labels.descansoT : labels.trabajo}</span>
        <span className="faint num">{i + 1}/{steps.length}</span>
      </div>
      <div className="display text-xl mt-4">{step?.name}</div>
      <div className={`timer ${rest || tone === "sage" ? "sage" : ""} ${run ? "run" : ""} mt-2`} style={{ fontSize: "clamp(4rem, 18vw, 6.5rem)" }}>{fmt(left)}</div>
      <div className={`progress ${rest ? "" : "f"} mt-5`}><i style={{ width: `${pct}%` }} /></div>
      <div className="flex gap-3 justify-center mt-6">
        {!run ? <button onClick={() => setRun(true)} className="btn btn-go text-lg px-10">GO ▶</button> : <button onClick={() => setRun(false)} className="btn">{labels.pausa}</button>}
        <button onClick={reset} className="btn btn-ghost">{labels.reiniciar}</button>
      </div>
    </div>
  );
}
