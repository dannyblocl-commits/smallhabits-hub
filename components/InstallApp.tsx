"use client";

import { useEffect, useState } from "react";

type BIP = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export function InstallApp({ L }: { L: { installed: string; install: string; ios: string[]; android: string[]; iosTitle: string; androidTitle: string } }) {
  const [evt, setEvt] = useState<BIP | null>(null);
  const [standalone, setStandalone] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setStandalone(window.matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone === true);
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    const on = (e: Event) => { e.preventDefault(); setEvt(e as BIP); };
    window.addEventListener("beforeinstallprompt", on);
    return () => window.removeEventListener("beforeinstallprompt", on);
  }, []);

  if (standalone) return <p className="text-sm" style={{ color: "var(--sage)" }}>✓ {L.installed}</p>;

  return (
    <div className="space-y-4">
      {evt && <button onClick={async () => { await evt.prompt(); await evt.userChoice; setEvt(null); }} className="btn btn-go w-full">{L.install}</button>}
      <div className={`row p-4 ${ios ? "!border-[var(--sage)]" : ""}`}>
        <div className="display text-sm mb-2">{L.iosTitle}</div>
        <ol className="list-decimal pl-5 space-y-1 text-sm muted">{L.ios.map((s) => <li key={s}>{s}</li>)}</ol>
      </div>
      <div className={`row p-4 ${!ios ? "!border-[var(--sage)]" : ""}`}>
        <div className="display text-sm mb-2">{L.androidTitle}</div>
        <ol className="list-decimal pl-5 space-y-1 text-sm muted">{L.android.map((s) => <li key={s}>{s}</li>)}</ol>
      </div>
    </div>
  );
}
