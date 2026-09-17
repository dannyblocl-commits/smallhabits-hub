"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { listThread, sendMessage, type Msg } from "@/app/actions/chat";

export type ThreadLabels = { writeTo: string; desdePro: string; noCoach: string; firstMsg: string; enviar: string };
const hhmm = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export function ChatThread({ initial, peerId, peerName, canSend, memberId, accent = "fucsia", L }: { initial: Msg[]; peerId: string | null; peerName: string; canSend: boolean; memberId?: string; accent?: "fucsia" | "sage"; L: ThreadLabels }) {
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [text, setText] = useState("");
  const [pending, start] = useTransition();
  const [err, setErr] = useState("");
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight }); }, [msgs.length]);
  useEffect(() => { const id = setInterval(() => { listThread(memberId).then((t) => setMsgs(t.messages)).catch(() => {}); }, 8000); return () => clearInterval(id); }, [memberId]);

  function send() {
    const body = text.trim(); if (!body || !canSend) return;
    setErr(""); setText("");
    start(async () => { try { const m = await sendMessage(body, memberId); setMsgs((l) => [...l, m]); } catch (e) { setErr(e instanceof Error ? e.message : "Error"); setText(body); } });
  }
  const mineBg = accent === "sage" ? "linear-gradient(135deg, var(--sage-deep), var(--sage))" : "linear-gradient(135deg, var(--vino), var(--fucsia))";

  return (
    <div className="card h-[520px] flex flex-col">
      <div ref={box} className="flex-1 overflow-y-auto p-4 space-y-3">
        {!peerId && <div className="row p-4 text-sm muted text-center">{L.noCoach}</div>}
        {peerId && msgs.length === 0 && <div className="row p-4 text-sm muted text-center">{L.firstMsg} {peerName}.</div>}
        {msgs.map((m) => (
          <div key={m.id} className={`flex fade-in ${m.mine ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 text-sm ${m.mine ? "rounded-[12px] text-white" : "row"}`} style={m.mine ? { background: mineBg } : undefined}>
              <div>{m.body}</div>
              <div className={`text-[.6rem] mt-1 ${m.mine ? "text-white/70" : "faint"}`}>{hhmm(m.at)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3" style={{ borderTop: "1px solid var(--line)" }}>
        {err && <div className="text-xs mb-2" style={{ color: "#FF8A8A" }}>{err}</div>}
        <div className="flex gap-2">
          <input id={`msg-${memberId ?? "coach"}`} value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} disabled={!canSend || pending}
            placeholder={canSend ? `${L.writeTo} ${peerName}…` : L.desdePro} className={`input ${accent === "sage" ? "input-s" : ""}`} />
          <button onClick={send} disabled={!canSend || pending} className={`btn btn-sm ${accent === "sage" ? "btn-balance" : "btn-go"}`}>{L.enviar}</button>
        </div>
      </div>
    </div>
  );
}
