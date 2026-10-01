"use client";

import { useState, useTransition } from "react";
import { addWater } from "@/app/actions/habits";

const GOAL = 8;

export function WaterTracker({ initial, L }: { initial: number; L: { agua: string; vasos: string; metaAgua: string; sumar: string; restar: string } }) {
  const [n, setN] = useState(initial);
  const [, start] = useTransition();
  const change = (d: number) => {
    setN((x) => Math.max(0, Math.min(20, x + d)));
    start(async () => setN(await addWater(d)));
  };
  return (
    <div className="card lift-sage p-5">
      <div className="flex items-baseline justify-between">
        <div className="eyebrow" style={{ color: "var(--sage)" }}>{L.agua}</div>
        <div className="faint text-xs">{L.metaAgua}</div>
      </div>
      <div className="flex items-center justify-between mt-3 gap-3">
        <button onClick={() => change(-1)} disabled={n === 0} aria-label={L.restar} className="w-11 h-11 rounded-full text-xl grid place-items-center" style={{ background: "var(--surface-2)", color: "var(--text)", opacity: n === 0 ? 0.4 : 1 }}>−</button>
        <div className="text-center">
          <div className="num text-4xl" style={{ color: "var(--sage)" }}>{n}<span className="text-lg faint"> / {GOAL}</span></div>
          <div className="faint text-xs">{L.vasos}</div>
        </div>
        <button onClick={() => change(1)} aria-label={L.sumar} className="w-11 h-11 rounded-full text-xl grid place-items-center" style={{ background: "var(--sage)", color: "#0B0B0F" }}>+</button>
      </div>
      <div className="flex gap-1 mt-4" aria-hidden="true">
        {Array.from({ length: GOAL }, (_, i) => (
          <span key={i} className="flex-1 h-2 rounded-full" style={{ background: i < n ? "var(--sage)" : "var(--surface-3)" }} />
        ))}
      </div>
    </div>
  );
}
