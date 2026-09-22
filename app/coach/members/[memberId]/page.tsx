import Link from "next/link";
import { requireCoach } from "@/lib/auth";
import { db } from "@/lib/db";
import { Logo } from "@/components/Leaves";

export default async function MemberDetailPage({ params }: { params: Promise<{ memberId: string }> }) {
  const coach = await requireCoach();
  const { memberId } = await params;

  // Obtener miembro
  const member = await db().query(
    `select id, name, email, goal, weight, height, plan, created_at from users where id=$1 and coach_id=$2`,
    [memberId, coach.id]
  );

  if (member.rows.length === 0) {
    return (
      <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
        <header className="sticky top-0 z-40 border-b" style={{ background: "var(--surface-1)", borderColor: "var(--line)" }}>
          <div className="max-w-7xl mx-auto px-5 py-3">
            <Link href="/coach/members" className="btn btn-ghost btn-sm">← Volver</Link>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-5 py-12 text-center">
          <p className="text-lg muted">Miembro no encontrado o no tienes acceso.</p>
        </div>
      </div>
    );
  }

  const m = member.rows[0];

  // Obtener rutinas asignadas
  const routines = await db().query(
    `select id, name, type, duration_minutes from routines limit 10`
  );

  // Obtener menús asignados
  const menus = await db().query(
    `select id, name, goal, kcal from menus limit 10`
  );

  // Obtener notas del coach
  const notes = await db().query(
    `select id, scope, body, at from member_notes where user_id=$1 and coach_id=$2 order by at desc`,
    [memberId, coach.id]
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "var(--surface-1)", borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/coach/members" className="hover:opacity-70">
              <Logo />
            </Link>
            <span className="pill pill-s">{m.name}</span>
          </div>
          <Link href="/coach/members" className="btn btn-ghost btn-sm">← Miembros</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-6">
        {/* Perfil del miembro */}
        <div className="card p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">{m.name}</h1>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-xs" style={{ color: "var(--text-3)" }}>Email</div>
              <div className="text-sm mt-1">{m.email}</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: "var(--text-3)" }}>Objetivo</div>
              <div className="text-sm mt-1">{m.goal}</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: "var(--text-3)" }}>Peso</div>
              <div className="text-sm mt-1">{m.weight ? `${m.weight} kg` : "No registrado"}</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: "var(--text-3)" }}>Plan</div>
              <div className="text-sm mt-1"><span className={`pill ${m.plan === "free" ? "" : "pill-f"}`}>{m.plan}</span></div>
            </div>
          </div>
        </div>

        {/* Grid de secciones */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Rutinas */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Rutinas</h2>
              <Link href={`/coach/members/${memberId}/routines`} className="btn btn-balance btn-xs">+</Link>
            </div>
            <div className="space-y-2">
              {routines.rows.length === 0 ? (
                <p className="text-sm muted">Sin rutinas asignadas</p>
              ) : (
                routines.rows.map((r: any) => (
                  <Link
                    key={r.id}
                    href={`/coach/members/${memberId}/routines/${r.id}`}
                    className="block p-2 rounded text-sm hover:bg-[var(--surface-2)]"
                  >
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs muted">{r.duration_minutes} min · {r.type}</div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Dietas */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Dietas</h2>
              <Link href={`/coach/members/${memberId}/menus`} className="btn btn-balance btn-xs">+</Link>
            </div>
            <div className="space-y-2">
              {menus.rows.length === 0 ? (
                <p className="text-sm muted">Sin dietas asignadas</p>
              ) : (
                menus.rows.map((menu: any) => (
                  <Link
                    key={menu.id}
                    href={`/coach/members/${memberId}/menus/${menu.id}`}
                    className="block p-2 rounded text-sm hover:bg-[var(--surface-2)]"
                  >
                    <div className="font-medium">{menu.name}</div>
                    <div className="text-xs muted">{menu.kcal} kcal · {menu.goal}</div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Notas */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Notas</h2>
              <Link href={`/coach/members/${memberId}/notes`} className="btn btn-balance btn-xs">+</Link>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notes.rows.length === 0 ? (
                <p className="text-sm muted">Sin notas</p>
              ) : (
                notes.rows.map((note: any) => (
                  <div key={note.id} className="p-2 border-l-2" style={{ borderColor: "var(--sage)" }}>
                    <div className="text-xs muted">{new Date(note.at).toLocaleDateString()}</div>
                    <p className="text-sm mt-1 line-clamp-2">{note.body}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
