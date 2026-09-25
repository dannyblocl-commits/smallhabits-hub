import Link from "next/link";
import { requireStaff } from "@/lib/auth";

export default async function CoachSesiones() {
  await requireStaff();
  const cal = process.env.NEXT_PUBLIC_CALCOM_LINK || "";

  return (
    <div className="min-h-screen px-5 py-6" style={{ background: "var(--obsidian)", color: "var(--text)" }}>
      <div className="max-w-3xl mx-auto">
        <Link href="/coach" style={{ color: "var(--fucsia)" }}>← Volver</Link>
        <h1 className="text-3xl mt-3 mb-1">📅 Sesiones 1:1</h1>
        <p className="muted text-sm mb-6">Las videollamadas se agendan con tu calendario real (Cal.com, gratis): la persona elige una hora libre, se crea la reunión con link de Google Meet y los dos reciben recordatorio.</p>

        <div className="card p-5 mb-4" style={{ borderColor: cal ? "var(--sage)" : "var(--fucsia)" }}>
          <div className="eyebrow mb-1" style={{ color: cal ? "var(--sage)" : "var(--fucsia)" }}>{cal ? "Conectado" : "Pendiente de conectar"}</div>
          {cal ? (
            <p className="text-sm">Tu agenda pública: <a href={`https://cal.com/${cal}`} target="_blank" rel="noreferrer" className="underline" style={{ color: "var(--sage)" }}>cal.com/{cal}</a>. Las personas con plan Elite la ven en <b>Sesiones 1:1</b> dentro de la app.</p>
          ) : (
            <p className="text-sm muted">Cuando tengas tu enlace de Cal.com, Danny lo pone en la configuración y esta sección se activa sola para tus miembros Elite.</p>
          )}
        </div>

        <div className="card p-5 space-y-3 text-sm">
          <div className="eyebrow">Cómo conectarlo (10 minutos, una sola vez)</div>
          <ol className="list-decimal pl-5 space-y-2 muted">
            <li>Crea tu cuenta gratis en <a href="https://cal.com/signup" target="_blank" rel="noreferrer" className="underline" style={{ color: "var(--sage)" }}>cal.com</a> con tu Gmail.</li>
            <li>En <b>Apps → Calendars</b> conecta tu <b>Google Calendar</b> (para que no te agenden encima de algo que ya tienes).</li>
            <li>En <b>Apps → Conferencing</b> activa <b>Google Meet</b> (o Zoom si prefieres). Cada reserva creará el link sola.</li>
            <li>Crea un tipo de evento, por ejemplo <b>"Sesión 1:1 · 30 min"</b>, y define tus horarios disponibles (<b>Availability</b>).</li>
            <li>Copia el enlace del evento (algo como <b>cal.com/maleja/sesion-30min</b>) y pásaselo a Danny.</li>
          </ol>
          <p className="faint text-xs">Las reservas, cancelaciones y recordatorios los gestiona Cal.com; tú solo ves tu Google Calendar llenarse.</p>
        </div>

        {cal && (
          <a href="https://app.cal.com/bookings/upcoming" target="_blank" rel="noreferrer" className="btn btn-balance btn-sm mt-4 inline-block">Ver mis reservas en Cal.com ↗</a>
        )}
      </div>
    </div>
  );
}
