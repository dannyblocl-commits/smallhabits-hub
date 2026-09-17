"use client";

import { useState } from "react";

// Muestra el video de avatar si existe en /public/videos; si no, un placeholder.
export function VideoCard({ src, title, emoji = "🎬" }: { src: string; title: string; emoji?: string }) {
  const [missing, setMissing] = useState(false);
  if (missing) {
    return (
      <div className="aspect-video bg-gradient-to-br from-[#EDE6DC] to-[#C8D5C0] rounded-xl flex flex-col items-center justify-center text-center p-4">
        <div className="text-5xl mb-2">{emoji}</div>
        <p className="text-sm font-medium text-[#2C2C2C]">{title}</p>
        <p className="text-xs text-[#6B6560] mt-1">Video de avatar: sube el archivo a /public{src}</p>
      </div>
    );
  }
  return (
    <video src={src} controls playsInline className="aspect-video w-full rounded-xl bg-black" onError={() => setMissing(true)} />
  );
}
