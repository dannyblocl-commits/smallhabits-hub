"use client";

import { useState } from "react";

// Reproduce /videos/<id>.mp4; si no existe, usa el clip de ambiente (fallback) para que nunca se vea un hueco.
export function VideoCard({ src, fallback, title, emoji = "▶" }: { src: string; fallback?: string; title: string; emoji?: string }) {
  const [cur, setCur] = useState(src);
  const [missing, setMissing] = useState(false);
  const isFallback = cur !== src;

  function onError() {
    if (fallback && cur !== fallback) setCur(fallback);
    else setMissing(true);
  }

  if (missing) {
    return (
      <div className="aspect-[9/16] max-h-[420px] mx-auto row flex flex-col items-center justify-center text-center p-4" style={{ background: "linear-gradient(135deg, var(--surface-2), var(--surface-3))" }}>
        <div className="text-4xl mb-2" style={{ color: "var(--fucsia)" }}>{emoji}</div>
        <p className="display text-sm">{title}</p>
      </div>
    );
  }
  return (
    <div className="relative mx-auto max-h-[520px] aspect-[9/16] rounded-[12px] overflow-hidden bg-black">
      <video key={cur} src={cur} controls={!isFallback} autoPlay={isFallback} muted={isFallback} loop={isFallback} playsInline className="absolute inset-0 w-full h-full object-cover" onError={onError} />
      {isFallback && <div className="absolute bottom-3 left-3 pill">{title}</div>}
    </div>
  );
}
