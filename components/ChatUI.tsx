"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";

type Msg = { from: "user" | "bot"; text: string };

export function ChatUI({ dailyLimit, L, greeting }: { dailyLimit: number | null; L: Dict["chat"]; greeting: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: greeting }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(dailyLimit);
  const box = useRef<HTMLDivElement>(null);
  const blocked = remaining !== null && remaining <= 0;

  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight }); }, [msgs.length, busy]);

  async function send() {
    const q = input.trim(); if (!q || blocked || busy) return;
    const history = msgs.slice(1).map((m) => ({ role: m.from === "user" ? "user" as const : "assistant" as const, text: m.text }));
    setMsgs((m) => [...m, { from: "user", text: q }]); setInput(""); setBusy(true);
    try {
      const r = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: q, history }) });
      const d = await r.json();
      if (r.status === 429) { setRemaining(0); setMsgs((m) => [...m, { from: "bot", text: L.limite }]); }
      else if (d.text) { setMsgs((m) => [...m, { from: "bot", text: d.text }]); if (d.remaining !== null && d.remaining !== undefined) setRemaining(d.remaining); }
      else setMsgs((m) => [...m, { from: "bot", text: "…" }]);
    } catch { setMsgs((m) => [...m, { from: "bot", text: "…" }]); }
    finally { setBusy(false); }
  }

  const used = dailyLimit !== null && remaining !== null ? dailyLimit - remaining : 0;

  return (
    <div className="card h-[520px] flex flex-col">
      <div ref={box} className="flex-1 overflow-y-auto p-4 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex fade-in ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 text-sm whitespace-pre-wrap ${m.from === "user" ? "rounded-[12px] text-white" : "row"}`} style={m.from === "user" ? { background: "linear-gradient(135deg, var(--sage-deep), var(--sage))" } : undefined}>{m.text}</div>
          </div>
        ))}
        {busy && <div className="flex justify-start"><div className="row px-4 py-3 text-sm animate-pulse">···</div></div>}
      </div>
      <div className="p-3" style={{ borderTop: "1px solid var(--line)" }}>
        {dailyLimit !== null && <div className="faint text-[.65rem] mb-2">{used}/{dailyLimit} {L.msgsHoy}</div>}
        <div className="flex gap-2">
          <input id="msg-ia" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} disabled={blocked || busy} placeholder={blocked ? L.limite : L.placeholder} className="input input-s" />
          <button onClick={send} disabled={blocked || busy} className="btn btn-balance btn-sm">→</button>
        </div>
      </div>
    </div>
  );
}
