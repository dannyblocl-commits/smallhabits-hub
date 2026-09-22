import Link from "next/link";
import { requireCoach } from "@/lib/auth";
import { listMembers } from "@/app/actions/coach";
import { Logo } from "@/components/Leaves";

const ago = (iso: string | null) => {
  if (!iso) return "nunca";
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  return d === 0 ? "hoy" : d === 1 ? "ayer" : `hace ${d} días`;
};

export default async function MembersPage() {
  const coach = await requireCoach();
  const members = await listMembers();
  const mine = members.filter((m) => m.mine);

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "var(--surface-1)", borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="pill pill-s">Mis miembros</span>
          </div>
          <Link href="/coach" className="btn btn-ghost btn-sm">← Volver</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-6">
        <h1 className="text-4xl font-black mb-8">Gestiona tus miembros</h1>

        {mine.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-xl muted mb-4">Aún nadie te ha elegido como coach.</p>
            <p className="text-sm muted">Cuando alguien te seleccione como coach, aparecerá aquí.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {mine.map((m) => (
              <Link
                key={m.id}
                href={`/coach/members/${m.id}`}
                className="card p-6 hover:border-[var(--sage)] transition-colors block"
              >
                <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
                  <div>
                    <h2 className="text-xl font-bold mb-1">{m.name}</h2>
                    <p className="text-sm muted mb-4">{m.email}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <div className="text-xs" style={{ color: "var(--text-3)" }}>Objetivo</div>
                        <div className="text-sm mt-1">{m.goal}</div>
                      </div>
                      <div>
                        <div className="text-xs" style={{ color: "var(--text-3)" }}>Plan</div>
                        <div className="text-sm mt-1"><span className={`pill ${m.plan === "free" ? "" : "pill-f"}`}>{m.plan}</span></div>
                      </div>
                      <div>
                        <div className="text-xs" style={{ color: "var(--text-3)" }}>Último entreno</div>
                        <div className="text-sm mt-1 muted">{ago(m.last_workout)}</div>
                      </div>
                      <div>
                        <div className="text-xs" style={{ color: "var(--text-3)" }}>Última comida</div>
                        <div className="text-sm mt-1 muted">{ago(m.last_food)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="text-right">
                      <div className="text-3xl font-bold" style={{ color: "var(--sage)" }}>
                        {m.workouts_week}
                      </div>
                      <div className="text-xs muted">entrenamientos/semana</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
