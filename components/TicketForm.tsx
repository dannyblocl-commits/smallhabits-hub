"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTicket, type Ticket } from "@/app/actions/tickets";
import type { Dict } from "@/lib/i18n";

const fmt = (iso: string) => new Date(iso).toLocaleDateString([], { day: "numeric", month: "short" });

export function TicketForm({ priority, tickets, L }: { priority: boolean; tickets: Ticket[]; L: Dict["tickets"] }) {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState(L.cats[0]);
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, start] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim()) return;
    const fd = new FormData();
    fd.set("subject", subject); fd.set("category", category); fd.set("body", body);
    start(async () => {
      const r = await createTicket(fd);
      if (r?.ok) { setSubject(""); setBody(""); setSent(true); router.refresh(); setTimeout(() => setSent(false), 4000); }
    });
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <form onSubmit={submit} className="card p-5 space-y-3">
        <div className="flex items-center justify-between"><div className="eyebrow">{L.nuevo}</div>{priority && <span className="pill pill-g">{L.prio}</span>}</div>
        <input id="t-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={L.asunto} className="input" required />
        <select id="t-cat" value={category} onChange={(e) => setCategory(e.target.value)} className="input">{L.cats.map((c) => <option key={c}>{c}</option>)}</select>
        <textarea id="t-body" value={body} onChange={(e) => setBody(e.target.value)} rows={5} placeholder={L.cuenta} className="input" />
        <button disabled={pending} className="btn btn-go w-full">{pending ? "…" : L.enviar}</button>
        {sent && <p className="text-sm text-center" style={{ color: "var(--sage)" }}>✓</p>}
      </form>
      <div className="space-y-2">
        <div className="eyebrow">{L.mis}</div>
        {tickets.length === 0 && <div className="row p-6 text-center muted text-sm">—</div>}
        {tickets.map((t) => (
          <div key={t.id} className="row p-4 fade-in">
            <div className="flex justify-between items-start gap-2">
              <div><div className="faint text-xs">{t.category} · {fmt(t.created_at)}</div><div className="display text-sm">{t.subject}</div>{t.body && <div className="muted text-xs mt-1 whitespace-pre-wrap">{t.body}</div>}</div>
              <span className={`pill ${t.status === "abierto" ? "pill-w" : "pill-s"}`}>{t.status}</span>
            </div>
            {t.reply && <div className="mt-3 p-3 text-sm rounded-[12px] whitespace-pre-wrap" style={{ background: "var(--sage-tint)", color: "var(--sage-soft)" }}><b className="display">Coach:</b> {t.reply}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
