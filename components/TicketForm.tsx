"use client";

import { useState } from "react";

type Ticket = { id: number; subject: string; category: string; status: "abierto" | "respondido"; date: string; reply?: string };

const seed: Ticket[] = [
  { id: 1042, subject: "No me carga el video de la rutina 3", category: "Técnico", status: "respondido", date: "14 sep", reply: "Ya está corregido. Recarga la página y avísame si sigue." },
  { id: 1038, subject: "¿Puedo cambiar el menú por uno vegetariano?", category: "Nutrición", status: "respondido", date: "11 sep", reply: "Sí, te asigné el Menú Vegetariano Balance. Revísalo en Menús." },
];

export function TicketForm({ priority }: { priority: boolean }) {
  const [tickets, setTickets] = useState<Ticket[]>(seed);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Entrenamiento");
  const [body, setBody] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim()) return;
    setTickets((t) => [{ id: 1043 + t.length, subject, category, status: "abierto", date: "hoy" }, ...t]);
    setSubject(""); setBody("");
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form onSubmit={submit} className="bg-white rounded-2xl p-6 border border-[#E0D5C8] space-y-4">
        <h2 className="text-xl font-semibold text-[#2C2C2C]">Nuevo ticket</h2>
        {priority && <div className="text-xs bg-[#A67C5B] text-white inline-block px-3 py-1 rounded-full font-bold">SOPORTE PRIORITARIO · respuesta en 24h</div>}
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Asunto" className="w-full border border-[#E0D5C8] rounded-lg px-4 py-3 focus:outline-none focus:border-[#6B8F71]" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-[#E0D5C8] rounded-lg px-4 py-3 bg-white">
          {["Entrenamiento", "Nutrición", "Pagos", "Técnico", "Otro"].map((c) => <option key={c}>{c}</option>)}
        </select>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={5} placeholder="Cuéntanos qué pasa..." className="w-full border border-[#E0D5C8] rounded-lg px-4 py-3 focus:outline-none focus:border-[#6B8F71]" />
        <button className="w-full bg-[#6B8F71] hover:bg-[#5a7a61] text-white py-3 rounded-full font-semibold transition">Enviar ticket</button>
      </form>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-[#2C2C2C]">Mis tickets</h2>
        {tickets.map((t) => (
          <div key={t.id} className="bg-white rounded-xl p-4 border border-[#E0D5C8]">
            <div className="flex justify-between items-start gap-2">
              <div>
                <div className="text-xs text-[#6B6560]">#{t.id} · {t.category} · {t.date}</div>
                <div className="font-medium text-[#2C2C2C]">{t.subject}</div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${t.status === "abierto" ? "bg-[#F2E4E1] text-[#9B3A5A]" : "bg-[#C8D5C0] text-[#2C2C2C]"}`}>{t.status.toUpperCase()}</span>
            </div>
            {t.reply && <div className="mt-3 bg-[#EDE6DC] rounded-lg p-3 text-sm text-[#2C2C2C]"><strong>Maleja:</strong> {t.reply}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
