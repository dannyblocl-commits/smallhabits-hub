import { AppShell } from "@/components/AppShell";
import { requireUser } from "@/lib/auth";
import { tr } from "@/lib/i18n";
import { listCoaches, chooseCoach, myCoach } from "@/app/actions/coaches";

export default async function Coaches() {
  const [user, { L }] = await Promise.all([requireUser(), tr()]);
  const [coaches, mine] = await Promise.all([listCoaches(), myCoach()]);
  const chosenId = user.coach_id;
  return (
    <AppShell title={L.coaches.title} kicker={L.coaches.kicker}>
      <p className="muted mb-6 max-w-xl">{L.coaches.intro}</p>
      {!chosenId && mine && <div className="row p-4 mb-5 text-sm muted">{L.coaches.defaultNote} <b className="display text-[var(--text)]">{mine.name}</b>.</div>}
      {coaches.length === 0 && <div className="row p-6 text-center muted">{L.coaches.none}</div>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coaches.map((c) => {
          const chosen = chosenId === c.id;
          return (
            <div key={c.id} className={`card p-6 relative ${chosen ? "lift-sage ring-1 ring-[var(--sage)]" : ""}`}>
              {chosen && <span className="pill pill-s absolute -top-3 left-5">{L.coaches.tuCoach}</span>}
              <div className="w-14 h-14 rounded-full grid place-items-center display text-xl mb-3" style={{ background: "var(--sage-tint)", color: "var(--sage)" }}>{c.name.trim()[0]?.toUpperCase()}</div>
              <h2 className="text-2xl">{c.name}</h2>
              <p className="eyebrow mt-1" style={{ color: "var(--sage)" }}>{c.specialties || L.coaches.defaultSpec}</p>
              <p className="muted text-sm mt-3 min-h-[3rem]">{c.bio || L.coaches.noBio}</p>
              <p className="faint text-xs mt-3">{c.members} {L.coaches.miembros}</p>
              {!chosen && (
                <form action={chooseCoach} className="mt-4"><input type="hidden" name="coach_id" value={c.id} /><button className="btn btn-balance w-full">{L.coaches.elegirA} {c.name.split(" ")[0]}</button></form>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
