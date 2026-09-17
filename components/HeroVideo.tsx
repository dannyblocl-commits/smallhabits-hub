"use client";

import { useEffect, useRef } from "react";

export function HeroVideo({ src, poster, className, label }: { src: string; poster: string; className?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    const onVisible = () => document.visibilityState === "visible" && tryPlay();
    document.addEventListener("visibilitychange", onVisible);
    document.addEventListener("touchstart", tryPlay, { once: true });
    return () => { document.removeEventListener("visibilitychange", onVisible); document.removeEventListener("touchstart", tryPlay); };
  }, []);
  return <video ref={ref} src={src} poster={poster} autoPlay muted loop playsInline preload="auto" className={className} aria-label={label} />;
}
