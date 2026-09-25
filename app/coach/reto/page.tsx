"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Lead = {
  id: string; name: string; email: string; phone: string; address1: string; address2: string | null; city: string; state: string; zip: string; country: string;
  track: string; goal: string; level: string; health: string | null; notes: string | null; lang: string; status: string; created_at: string;
  user_id: string | null; reto_start: string | null; user_plan: string | null;
};

const GOAL: Record<string, string> = { grasa: "Perder grasa", tonificar: "Tonificar", musculo: "Ganar músculo", energia: "Energía y hábitos" };
const STATUS_COLOR: Record<string, string> = { nuevo: "#FF2D8A", contactado: "#BA8E54", activo: "#7FC29B", descartado: "#A8A3AE" };

export default function RetoLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = () => fetch("/api/coach/reto-leads").then((r) => r.json()).then((d) => { setLeads(d.leads || []); setLoading(false); });
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    setBusy(id);
    try {
      await fetch("/api/coach/reto-leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
      setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
    } finally { setBusy(null); }
  };

  const assign = async (l: Lead) => {
    if (!l.user_id) return;
    setBusy(l.id);
    try {
      const r = await fetch("/api/coach/update-user", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: l.user_id, action: "start-reto", track: l.track }) });
      if (r.ok) {
        await fetch("/api/coach/reto-leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: l.id, status: "activo" }) });
        setLeads(leads.map((x) => (x.id === l.id ? { ...x, status: "activo", reto_start: new Date().toISOString() } : x)));
      }
    } finally { setBusy(null); }
  };

  const wa = (phone: string, name: string) => `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${name.split(" ")[0]}! Soy Maleja 💚 Vi tu inscripción al reto de 30 días. ¿Te ayudo a activar tu mes?`)}`;

  if (loading) return <div style={{ padding: 20, color: "#F5F2F0" }}>Cargando...</div>;

  return (
    <div style={{ padding: 20, background: "#0B0B0F", minHeight: "100vh", color: "#F5F2F0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Link href="/coach" style={{ color: "#FF2D8A" }}>← Volver</Link>
        <h1 style={{ marginTop: 10 }}>🏁 Inscripciones al reto ({leads.filter((l) => l.status === "nuevo").length} nuevas)</h1>
        <p style={{ color: "#A8A3AE", marginBottom: 20, fontSize: 14 }}>
          Flujo: <b>WhatsApp</b> → activas su mes → cuando tenga cuenta en la app, <b>Asignar reto</b> (le pone Pro + 30 días + guía). Si no tiene cuenta, pídele que se registre con el mismo email.
        </p>

        {leads.length === 0 && <p style={{ color: "#A8A3AE" }}>Todavía no hay inscripciones.</p>}

        <div style={{ display: "grid", gap: 14 }}>
          {leads.map((l) => (
            <div key={l.id} style={{ background: "#141419", borderRadius: 14, padding: 16, border: `1px solid ${STATUS_COLOR[l.status] ?? "#333"}33` }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                <div>
                  <span style={{ background: STATUS_COLOR[l.status], color: "#0B0B0F", padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 700, marginRight: 8 }}>{l.status}</span>
                  <b style={{ fontSize: 18 }}>{l.name}</b>
                  <span style={{ color: "#A8A3AE", marginLeft: 8, fontSize: 13 }}>{new Date(l.created_at).toLocaleString("es-ES")} · {l.lang.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: 13, color: "#A8A3AE" }}>
                  {l.user_id ? (l.reto_start ? <span style={{ color: "#7FC29B" }}>✓ cuenta con reto activo</span> : <span>cuenta creada · plan {l.user_plan}</span>) : <span style={{ color: "#FF2D8A" }}>sin cuenta en la app todavía</span>}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginTop: 12, fontSize: 14 }}>
                <div>
                  <div style={{ color: "#7FC29B", fontSize: 12, fontWeight: 700 }}>CONTACTO</div>
                  <div>{l.email}</div>
                  <div>{l.phone}</div>
                </div>
                <div>
                  <div style={{ color: "#7FC29B", fontSize: 12, fontWeight: 700 }}>ENVÍO</div>
                  <div>{l.address1}{l.address2 ? `, ${l.address2}` : ""}</div>
                  <div>{l.city}, {l.state} {l.zip} · {l.country}</div>
                </div>
                <div>
                  <div style={{ color: "#7FC29B", fontSize: 12, fontWeight: 700 }}>OBJETIVO</div>
                  <div>{l.track === "hombre" ? "♂ Hombre" : "♀ Mujer"} · {GOAL[l.goal] ?? l.goal} · {l.level}</div>
                  {l.health && <div style={{ color: "#BA8E54" }}>Salud: {l.health}</div>}
                  {l.notes && <div style={{ color: "#A8A3AE" }}>“{l.notes}”</div>}
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                <a href={wa(l.phone, l.name)} target="_blank" rel="noreferrer" style={{ padding: "6px 12px", background: "#25D366", color: "#0B0B0F", borderRadius: 4, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>WhatsApp</a>
                <button onClick={() => setStatus(l.id, "contactado")} disabled={busy === l.id} style={{ padding: "6px 12px", background: "#BA8E54", color: "#0B0B0F", border: "none", borderRadius: 4, fontSize: 12, cursor: "pointer" }}>Contactada</button>
                <button onClick={() => assign(l)} disabled={busy === l.id || !l.user_id} title={l.user_id ? "Pro + 30 días + guía" : "Necesita crear su cuenta con este email"} style={{ padding: "6px 12px", background: l.user_id ? "#F5F2F0" : "#333", color: l.user_id ? "#0B0B0F" : "#777", border: "2px solid #FF2D8A", borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: l.user_id ? "pointer" : "not-allowed" }}>Asignar reto {l.track === "hombre" ? "♂" : "♀"}</button>
                <button onClick={() => setStatus(l.id, "descartado")} disabled={busy === l.id} style={{ padding: "6px 12px", background: "transparent", color: "#A8A3AE", border: "1px solid #333", borderRadius: 4, fontSize: 12, cursor: "pointer" }}>Descartar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
