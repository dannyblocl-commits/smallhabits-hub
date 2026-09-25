import Link from "next/link";
import { requireCoach, isAdmin } from "@/lib/auth";
import { logout } from "@/app/actions/auth";
import { listMembers, coachSummary, type MemberRow } from "@/app/actions/coach";
import { updateCoachProfile } from "@/app/actions/coaches";
import { db } from "@/lib/db";
import { Logo } from "@/components/Leaves";

const ago = (iso: string | null) => {
  if (!iso) return "nunca";
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  return d === 0 ? "hoy" : d === 1 ? "ayer" : `hace ${d} días`;
};
const stale = (iso: string | null) => !iso || Date.now() - new Date(iso).getTime() > 5 * 86400000;

function Rows({ rows }: { rows: MemberRow[] }) {
  return (
    <tbody>
      {rows.map((m) => {
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
  );
}

const head = ["Miembro", "Objetivo", "Plan", "Kcal hoy", "Entrenos sem.", "Última comida", "Último entreno", "Estado"];

export default async function CoachPanel() {
  const coach = await requireCoach();
  const [members, s, prof] = await Promise.all([listMembers(), coachSummary(), db().query("select bio, specialties from users where id=$1", [coach.id])]);
  const mine = members.filter((m) => m.mine);
  const free = members.filter((m) => !m.mine);
  const code = process.env.COACH_INVITE_CODE;
  const p = prof.rows[0] ?? {};

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "var(--surface-1)", borderColor: "var(--line)", paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3"><Logo /><span className="pill pill-s">Panel coach</span>{isAdmin(coach) && <Link href="/admin" className="pill pill-g">Admin</Link>}</div>
          <div className="flex items-center gap-3 text-sm">
            <span className="muted hidden sm:inline">{coach.name}</span>
            <Link href="/dashboard" className="btn btn-ghost btn-sm">Ver como miembro</Link>
            <form action={logout}><button className="faint text-xs">Salir</button></form>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="space-y-4">
          <div className="hidden lg:block text-sm space-y-1">
            <Link href="/coach/members" className="px-3 py-2 rounded-[12px] row" style={{ color: "var(--sage)" }}>👥 Mis miembros</Link>
            <Link href="/coach/reto" className="block px-3 py-2 rounded-[12px]" style={{ color: "var(--fucsia)" }}>🏁 Inscripciones al reto</Link>
            <Link href="/coach/usuarios" className="block px-3 py-2 rounded-[12px] muted hover:text-[var(--text)]">Planes y accesos</Link>
            <Link href="/coach/routines" className="block px-3 py-2 rounded-[12px] muted hover:text-[var(--text)]">Rutinas</Link>
            <Link href="/coach/menus" className="block px-3 py-2 rounded-[12px] muted hover:text-[var(--text)]">Planes de alimentación</Link>
            <Link href="/coach/recipes" className="block px-3 py-2 rounded-[12px] muted hover:text-[var(--text)]">Recetario</Link>
            <Link href="/coach/learn" className="block px-3 py-2 rounded-[12px] muted hover:text-[var(--text)]">Hacks nutricionales</Link>
            <Link href="/coach/content" className="block px-3 py-2 rounded-[12px] muted hover:text-[var(--text)]">Videos y audios</Link>
            {["Sesiones 1:1", "Ingresos"].map((l) => <div key={l} className="px-3 py-2 rounded-[12px] faint">{l}</div>)}
          </div>
          <form action={updateCoachProfile} className="card p-4 space-y-2">
            <div className="eyebrow" style={{ color: "var(--sage)" }}>Mi perfil público</div>
            <p className="faint text-xs">Así te ven los miembros cuando eligen coach.</p>
            <input id="specialties" name="specialties" defaultValue={p.specialties ?? ""} placeholder="Especialidades (ej: Funcional · Nutrición)" className="input input-s" />
            <textarea id="bio" name="bio" rows={4} defaultValue={p.bio ?? ""} placeholder="Tu presentación en 2-3 frases" className="input input-s" />
            <button className="btn btn-balance btn-sm w-full">Guardar perfil</button>
          </form>
        </aside>

        <main>
          <div className="eyebrow" style={{ color: "var(--sage)" }}>Gestión</div>
          <h1 className="text-3xl md:text-4xl mb-5">Mis miembros</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[["Miembros", s.members, ""], ["De pago", s.paying, "var(--sage)"], ["Activos 7 días", s.active_week, "var(--sage)"], ["Registraron hoy", s.logged_today, ""]].map(([l, v, c]) => (
              <div key={l as string} className="row p-4"><div className="eyebrow">{l}</div><div className="num text-3xl mt-1" style={c ? { color: c as string } : undefined}>{v}</div></div>
            ))}
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left" style={{ color: "var(--text-3)" }}>{head.map((h) => <th key={h} className="px-4 py-3 eyebrow font-semibold">{h}</th>)}</tr></thead>
              {mine.length === 0 && <tbody><tr><td colSpan={8} className="px-4 py-8 text-center muted">Aún nadie te ha elegido como coach. Completa tu perfil público: es lo que ven al elegir.</td></tr></tbody>}
              <Rows rows={mine} />
            </table>
          </div>

          {free.length > 0 && (
            <>
              <h2 className="text-2xl mt-8 mb-3">Sin coach todavía <span className="pill ml-2">{free.length}</span></h2>
              <p className="muted text-sm mb-3">Puedes escribirles y asignarles plan; en cuanto elijan coach, pasan a la lista de quien elijan.</p>
              <div className="card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left" style={{ color: "var(--text-3)" }}>{head.map((h) => <th key={h} className="px-4 py-3 eyebrow font-semibold">{h}</th>)}</tr></thead>
                  <Rows rows={free} />
                </table>
              </div>
            </>
          )}

          <div className="row p-4 mt-6 text-sm">
            <div className="eyebrow mb-1">Invitar a otra coach</div>
            <p className="muted">Que cree su cuenta en <span className="display">/signup</span> y escriba este código en “¿Eres coach?”: <span className="num" style={{ color: "var(--sage)" }}>{code || "no configurado"}</span></p>
          </div>
        </main>
      </div>
    </div>
  );
}
