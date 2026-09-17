"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";

type Ticket = { id: number; subject: string; category: string; status: "abierto" | "respondido"; date: string; reply?: string };
const seed: Ticket[] = [
  { id: 1042, subject: "No me carga el video de la rutina 3", category: "Técnico", status: "respondido", date: "14 sep", reply: "Ya está corregido. Recarga la página y avísame si sigue." },
  { id: 1038, subject: "¿Puedo cambiar el menú por uno vegetariano?", category: "Nutrición", status: "respondido", date: "11 sep", reply: "Sí, te asigné el menú Vegetariano balance. Revísalo en Menús." },
];

export function TicketForm({ priority, L }: { priority: boolean; L: Dict["tickets"] }) {
  const [tickets, setTickets] = useState<Ticket[]>(seed);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState(L.cats[0]);
  const [body, setBody] = useState("");
  function submit(e: React.FormEvent) { e.preventDefault(); if (!subject.trim()) return; setTickets((t) => [{ id: 1043 + t.length, subject, category, status: "abierto", date: "—" }, ...t]); setSubject(""); setBody(""); }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <form onSubmit={submit} className="card p-5 space-y-3">
        <div className="flex items-center justify-between"><div className="eyebrow">{L.nuevo}</div>{priority && <span className="pill pill-g">{L.prio}</span>}</div>
        <input id="t-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={L.asunto} className="input" />
        <select id="t-cat" value={category} onChange={(e) => setCategory(e.target.value)} className="input">{L.cats.map((c) => <option key={c}>{c}</option>)}</select>
        <textarea id="t-body" value={body} onChange={(e) => setBody(e.target.value)} rows={5} placeholder={L.cuenta} className="input" />
        <button className="btn btn-go w-full">{L.enviar}</button>
      </form>
      <div className="space-y-2">
        <div className="eyebrow">{L.mis}</div>
        {tickets.map((t) => (
          <div key={t.id} className="row p-4 fade-in">
            <div className="flex justify-between items-start gap-2"><div><div className="faint text-xs">#{t.id} · {t.category} · {t.date}</div><div className="display text-sm">{t.subject}</div></div><span className={`pill ${t.status === "abierto" ? "pill-w" : "pill-s"}`}>{t.status}</span></div>
            {t.reply && <div className="mt-3 p-3 text-sm rounded-[12px]" style={{ background: "var(--sage-tint)", color: "var(--sage-soft)" }}><b className="display">Coach:</b> {t.reply}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
