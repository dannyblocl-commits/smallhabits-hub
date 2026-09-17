"use client";

import { useState } from "react";

export function VideoCard({ src, title, emoji = "▶" }: { src: string; title: string; emoji?: string }) {
  const [missing, setMissing] = useState(false);
  if (missing) {
    return (
      <div className="aspect-video row flex flex-col items-center justify-center text-center p-4" style={{ background: "linear-gradient(135deg, var(--surface-2), var(--surface-3))" }}>
        <div className="text-4xl mb-2" style={{ color: "var(--fucsia)" }}>{emoji}</div>
        <p className="display text-sm">{title}</p>
        <p className="faint text-xs mt-1">Video de avatar · sube el archivo a /public{src}</p>
      </div>
    );
  }
  return <video src={src} controls playsInline className="aspect-video w-full rounded-[12px] bg-black" onError={() => setMissing(true)} />;
}
