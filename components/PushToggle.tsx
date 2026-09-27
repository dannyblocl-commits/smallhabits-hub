"use client";

import { useEffect, useState } from "react";

export type PushL = { on: string; off: string; enable: string; disable: string; test: string; denied: string; iosFirst: string; unsupported: string; working: string };

function b64ToUint8(b64: string) {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

type State = "loading" | "unsupported" | "ios-browser" | "denied" | "off" | "on";

export function PushToggle({ L }: { L: PushL }) {
  const [state, setState] = useState<State>("loading");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
      const standalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone === true;
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) return setState(ios && !standalone ? "ios-browser" : "unsupported");
      if (Notification.permission === "denied") return setState("denied");
      const reg = await navigator.serviceWorker.register("/sw.js");
      const sub = await reg.pushManager.getSubscription();
      setState(sub ? "on" : "off");
    })().catch(() => setState("unsupported"));
  }, []);

  async function enable(test = true) {
    setBusy(true);
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") { setState(perm === "denied" ? "denied" : "off"); return; }
      const reg = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;
      const sub = (await reg.pushManager.getSubscription()) ?? (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToUint8(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "") }));
      const r = await fetch("/api/push", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subscription: sub.toJSON(), test }) });
      setState(r.ok ? "on" : "off");
    } catch { setState("off"); } finally { setBusy(false); }
  }

  async function disable() {
    setBusy(true);
    try {
      const reg = await navigator.serviceWorker.getRegistration("/sw.js");
      const sub = await reg?.pushManager.getSubscription();
      if (sub) { await fetch("/api/push", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ endpoint: sub.endpoint }) }); await sub.unsubscribe(); }
      setState("off");
    } finally { setBusy(false); }
  }

  if (state === "loading") return <p className="faint text-sm">…</p>;
  if (state === "ios-browser") return <p className="text-sm" style={{ color: "#BA8E54" }}>{L.iosFirst}</p>;
  if (state === "unsupported") return <p className="faint text-sm">{L.unsupported}</p>;
  if (state === "denied") return <p className="text-sm" style={{ color: "#FF8A8A" }}>{L.denied}</p>;
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={`pill ${state === "on" ? "pill-s" : ""}`}>{state === "on" ? L.on : L.off}</span>
      {state === "on" ? (
        <>
          <button disabled={busy} onClick={() => enable(true)} className="btn btn-ghost btn-sm">{busy ? L.working : L.test}</button>
          <button disabled={busy} onClick={disable} className="faint text-xs">{L.disable}</button>
        </>
      ) : (
        <button disabled={busy} onClick={() => enable(true)} className="btn btn-go btn-sm">{busy ? L.working : L.enable}</button>
      )}
    </div>
  );
}
