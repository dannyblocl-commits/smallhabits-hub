import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { listAllTickets, replyTicket, closeTicket } from "@/app/actions/tickets";

const fmt = (iso: string) => new Date(iso).toLocaleString("es", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export default async function CoachTickets() {
  await requireStaff();
  const tickets = await listAllTickets();
  const open = tickets.filter((t) => t.status === "abierto");

  return (
    <div className="min-h-screen px-5 py-6" style={{ background: "var(--obsidian)", color: "var(--text)" }}>
      <div className="max-w-4xl mx-auto">
        <Link href="/coach" style={{ color: "var(--fucsia)" }}>← Volver</Link>
        <h1 className="text-3xl mt-3 mb-1">🎫 Tickets de soporte <span className="pill pill-w ml-2">{open.length} abiertos</span></h1>
        <p className="muted text-sm mb-6">Cada persona ve tu respuesta en su pantalla de Soporte. Responde y el ticket pasa a "respondido"; ciérralo cuando esté resuelto.</p>

        {tickets.length === 0 && <div className="card p-8 text-center muted">Todavía no hay tickets.</div>}

        <div className="space-y-4">
          {tickets.map((t) => (
            <div key={t.id} className="card p-5" style={{ borderColor: t.status === "abierto" ? "var(--fucsia)" : "var(--line)" }}>
              <div className="flex flex-wrap justify-between gap-2 items-start">
                <div>
                  <div className="faint text-xs">{t.category} · {fmt(t.created_at)} · <b>{t.user_name}</b> ({t.user_email}) · plan {t.user_plan}</div>
                  <div className="display text-lg mt-1">{t.subject}</div>
                  {t.body && <p className="muted text-sm mt-1 whitespace-pre-wrap">{t.body}</p>}
                </div>
                <span className={`pill ${t.status === "abierto" ? "pill-w" : t.status === "respondido" ? "pill-s" : ""}`}>{t.status}</span>
              </div>

              {t.reply && <div className="mt-3 p-3 text-sm rounded-[12px] whitespace-pre-wrap" style={{ background: "var(--sage-tint)", color: "var(--sage-soft)" }}><b>Tu respuesta</b> ({t.replied_at ? fmt(t.replied_at) : ""}): {t.reply}</div>}

              {t.status !== "cerrado" && (
                <div className="mt-3 flex flex-col gap-2">
                  <form action={replyTicket} className="flex flex-col gap-2">
                    <input type="hidden" name="id" value={t.id} />
                    <textarea name="reply" rows={3} placeholder={t.reply ? "Añadir otra respuesta…" : "Escribe tu respuesta…"} className="input" required />
                    <div className="flex gap-2">
                      <button className="btn btn-go btn-sm">Responder</button>
                    </div>
                  </form>
                  <form action={closeTicket}><input type="hidden" name="id" value={t.id} /><button className="faint text-xs">Cerrar ticket</button></form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
