import Link from "next/link";
import { requireCoach } from "@/lib/auth";
import { logout } from "@/app/actions/auth";
import { listMembers, coachSummary } from "@/app/actions/coach";
import { Logo } from "@/components/Leaves";

const ago = (iso: string | null) => {
  if (!iso) return "nunca";
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  return d === 0 ? "hoy" : d === 1 ? "ayer" : `hace ${d} días`;
};
const stale = (iso: string | null) => !iso || Date.now() - new Date(iso).getTime() > 5 * 86400000;

export default async function CoachPanel() {
  const coach = await requireCoach();
  const [members, s] = await Promise.all([listMembers(), coachSummary()]);
  const code = process.env.COACH_INVITE_CODE;

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "var(--surface-1)", borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3"><Logo /><span className="pill pill-s">Panel coach</span></div>
          <div className="flex items-center gap-3 text-sm">
            <span className="muted hidden sm:inline">{coach.name}</span>
            <Link href="/dashboard" className="btn btn-ghost btn-sm">Ver como miembro</Link>
            <form action={logout}><button className="faint text-xs">Salir</button></form>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-6 grid lg:grid-cols-[180px_1fr] gap-6">
        <aside className="hidden lg:block text-sm space-y-1">
          {[["Miembros", true], ["Rutinas", false], ["Menús", false], ["Sesiones 1:1", false], ["Ingresos", false]].map(([l, on]) => (
            <div key={l as string} className={`px-3 py-2 rounded-[12px] ${on ? "row" : "faint"}`} style={on ? { color: "var(--sage)" } : undefined}>{l}</div>
          ))}
        </aside>

        <main>
          <div className="eyebrow" style={{ color: "var(--sage)" }}>Gestión</div>
          <h1 className="text-3xl md:text-4xl mb-5">Miembros</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[["Miembros", s.members, ""], ["De pago", s.paying, "var(--sage)"], ["Activos 7 días", s.active_week, "var(--sage)"], ["Registraron hoy", s.logged_today, ""]].map(([l, v, c]) => (
              <div key={l as string} className="row p-4"><div className="eyebrow">{l}</div><div className="num text-3xl mt-1" style={c ? { color: c as string } : undefined}>{v}</div></div>
            ))}
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left" style={{ color: "var(--text-3)" }}>
                {["Miembro", "Objetivo", "Plan", "Kcal hoy", "Entrenos sem.", "Última comida", "Último entreno", "Estado"].map((h) => <th key={h} className="px-4 py-3 eyebrow font-semibold">{h}</th>)}
              </tr></thead>
              <tbody>
                {members.length === 0 && <tr><td colSpan={8} className="px-4 py-8 text-center muted">Aún no hay miembros registrados. Comparte el link de la app para que creen su cuenta.</td></tr>}
                {members.map((m) => {
                  const warn = stale(m.last_workout);
                  return (
                    <tr key={m.id} style={{ borderTop: "1px solid var(--line)" }}>
                      <td className="px-4 py-3"><Link href={`/coach/${m.id}`} className="display hover:underline" style={{ color: "var(--sage-soft)" }}>{m.name}</Link><div className="faint text-xs">{m.email}</div></td>
                      <td className="px-4 py-3 muted">{m.goal}</td>
                      <td className="px-4 py-3"><span className={`pill ${m.plan === "free" ? "" : "pill-f"}`}>{m.plan}</span></td>
                      <td className="px-4 py-3 num">{m.kcal_today}</td>
                      <td className="px-4 py-3 num">{m.workouts_week}</td>
                      <td className="px-4 py-3 muted">{ago(m.last_food)}</td>
                      <td className="px-4 py-3 muted">{ago(m.last_workout)}</td>
                      <td className="px-4 py-3"><span className={`pill ${warn ? "pill-w" : "pill-s"}`}>{warn ? "sin entrenar" : "al día"}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="row p-4 mt-6 text-sm">
            <div className="eyebrow mb-1">Invitar a otra coach</div>
            <p className="muted">Que cree su cuenta en <span className="display">/signup</span> y escriba este código en “¿Eres coach?”: <span className="num" style={{ color: "var(--sage)" }}>{code || "no configurado"}</span></p>
          </div>
        </main>
      </div>
    </div>
  );
}
