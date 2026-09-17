import { AppShell } from "@/components/AppShell";
import { requireUser } from "@/lib/auth";
import { listCoaches, chooseCoach, myCoach } from "@/app/actions/coaches";

export default async function Coaches() {
  await requireUser();
  const [coaches, mine] = await Promise.all([listCoaches(), myCoach()]);
  return (
    <AppShell title="Elige tu coach" kicker="Puedes cambiar cuando quieras · tu historial se conserva">
      <p className="muted mb-6 max-w-xl">Cada coach tiene su estilo. Elige a la persona que te inspire confianza: será quien te asigne rutina y menú y con quien hables en el chat.</p>
      {coaches.length === 0 && <div className="row p-6 text-center muted">Todavía no hay coaches registradas.</div>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coaches.map((c) => {
          const chosen = mine?.id === c.id;
          return (
            <div key={c.id} className={`card p-6 relative ${chosen ? "lift-sage ring-1 ring-[var(--sage)]" : ""}`}>
              {chosen && <span className="pill pill-s absolute -top-3 left-5">Tu coach</span>}
              <div className="w-14 h-14 rounded-full grid place-items-center display text-xl mb-3" style={{ background: "var(--sage-tint)", color: "var(--sage)" }}>{c.name.trim()[0]?.toUpperCase()}</div>
              <h2 className="text-2xl">{c.name}</h2>
              <p className="eyebrow mt-1" style={{ color: "var(--sage)" }}>{c.specialties || "Coach Small Habits"}</p>
              <p className="muted text-sm mt-3 min-h-[3rem]">{c.bio || "Esta coach aún no escribió su presentación."}</p>
              <p className="faint text-xs mt-3">{c.members} miembro{c.members === 1 ? "" : "s"}</p>
              {!chosen && (
                <form action={chooseCoach} className="mt-4"><input type="hidden" name="coach_id" value={c.id} /><button className="btn btn-balance w-full">Elegir a {c.name.split(" ")[0]}</button></form>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
