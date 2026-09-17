"use client";

import { useEffect, useRef, useState } from "react";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function AudioCard({ src, title, labels }: { src: string; title: string; labels: { play: string; pause: string; missing: string } }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [missing, setMissing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const a = ref.current; if (!a) return;
    const onTime = () => setT(a.currentTime); const onMeta = () => setDur(a.duration || 0);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime); a.addEventListener("loadedmetadata", onMeta); a.addEventListener("ended", onEnd);
    return () => { a.removeEventListener("timeupdate", onTime); a.removeEventListener("loadedmetadata", onMeta); a.removeEventListener("ended", onEnd); };
  }, []);

  function toggle() { const a = ref.current; if (!a) return; if (playing) { a.pause(); setPlaying(false); } else { a.play().then(() => setPlaying(true)).catch(() => {}); } }

  if (missing) {
    return <div className="row p-5 text-center"><div className="text-3xl" style={{ color: "var(--sage)" }}>◌</div><p className="display text-sm mt-1">{title}</p><p className="faint text-xs mt-1">{labels.missing}</p></div>;
  }
  const pct = dur ? Math.min(100, (t / dur) * 100) : 0;
  return (
    <div className="card lift-sage p-5">
      <audio ref={ref} src={src} preload="metadata" onError={() => setMissing(true)} />
      <div className="flex items-center gap-4">
        <button onClick={toggle} className="btn btn-balance w-14 h-14 !p-0 rounded-full text-xl" aria-label={playing ? labels.pause : labels.play}>{playing ? "❚❚" : "▶"}</button>
        <div className="flex-1">
          <div className="display text-sm">{title}</div>
          <div className="progress mt-2"><i style={{ width: `${pct}%` }} /></div>
          <div className="flex justify-between faint text-[.65rem] mt-1 num"><span>{fmt(t)}</span><span>{dur ? fmt(dur) : "—"}</span></div>
        </div>
      </div>
    </div>
  );
}
