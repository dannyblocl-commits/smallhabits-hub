import { AppShell, Badge, Locked } from "@/components/AppShell";
import { VideoCard } from "@/components/VideoCard";
import { Timer } from "@/components/Timer";
import { requireUser } from "@/lib/auth";
import { tr } from "@/lib/i18n";
import { listRoutines, listRecommendations, localizeRoutine } from "@/lib/library";

export default async function Routines({ searchParams }: { searchParams: Promise<{ r?: string }> }) {
  const [user, { lang, L }] = await Promise.all([requireUser(), tr()]);
  const { r } = await searchParams;
  const [routines, recs] = await Promise.all([listRoutines(), listRecommendations(user.id, "entreno", 3)]);
  const sel = routines.find((x) => x.id === r) || routines[0];
  if (!sel) return <AppShell title={L.routines.title}><div className="row p-6 muted">—</div></AppShell>;
  const t = (id: string) => L.content.routines[id as keyof typeof L.content.routines] as [string, string] | undefined;
  const loc = (x: typeof sel) => localizeRoutine(x, lang, t(x.id));
  const name = (x: typeof sel) => loc(x).name;
  const desc = (x: typeof sel) => loc(x).description;
  const exercises = loc(sel).exercises;
  const calm = ["estiramientos", "yoga", "pilates"].includes(sel.type);
  const steps = exercises.flatMap((e, i) => {
    const work = { name: e.name, seconds: sel.type === "estiramientos" ? 40 : 45, kind: "work" as const };
    return i < sel.exercises.length - 1 ? [work, { name: L.routines.descansoT, seconds: Math.min(e.rest_seconds, 30), kind: "rest" as const }] : [work];
  });

  return (
    <AppShell title={L.routines.title} kicker={L.routines.kicker}>
      {recs.length > 0 && (
        <div className="card lift p-4 mb-5">
          <div className="eyebrow mb-2" style={{ color: "var(--fucsia)" }}>{L.recs.title}</div>
          {recs.map((x) => <p key={x.id} className="text-sm mb-1"><span className="faint text-xs">{x.coach_name} · </span>{x.body}</p>)}
        </div>
      )}
      <div className="grid lg:grid-cols-[300px_1fr] gap-5">
        <aside className="space-y-2">
          {routines.map((x) => (
            <a key={x.id} href={`/dashboard/routines?r=${x.id}`} className={`row block p-4 transition ${x.id === sel.id ? "!border-[var(--fucsia)]" : "hover:!border-[var(--line-strong)]"}`}>
              <div className="flex justify-between items-start gap-2">
                <div><div className="display text-base">{name(x)}</div><div className="faint text-xs mt-0.5">{x.duration_minutes} {L.common.min} · {x.exercises.length} {L.common.ejercicios} · {x.type}</div></div>
                <Badge free={x.free} L={L} />
              </div>
            </a>
          ))}
        </aside>
        <section className="space-y-4">
          <Locked plan={user.plan} requires={sel.free ? "free" : "basico"} feature={name(sel)} L={L}>
            <div className="card p-6">
              <div className="flex justify-between items-start gap-3 flex-wrap">
                <div><span className={`pill ${calm ? "pill-s" : "pill-f"}`}>{sel.type}</span><h2 className="text-3xl mt-2">{name(sel)}</h2><p className="muted text-sm mt-1">{desc(sel)}</p></div>
                <span className="pill">{sel.difficulty}</span>
              </div>
              <div className="mt-5"><VideoCard src={`/api/content/video/${sel.id}`} fallback={calm ? "/videos/paz-mental.mp4" : "/videos/entrenar.mp4"} title={`${L.routines.demo} · ${name(sel)}`} emoji="▶" /></div>
            </div>
            <Timer steps={steps} routineId={sel.id} routineType={sel.type} tone={calm ? "sage" : "fucsia"} labels={L.routines} />
            <div className="card p-6">
              <div className="eyebrow mb-3">{L.routines.ejercicios}</div>
              <div className="space-y-2">
                {exercises.map((e, i) => (
                  <div key={i} className="row p-4">
                    <div className="display">{i + 1}. {e.name}</div>
                    {e.description && <div className="muted text-sm mb-3">{e.description}</div>}
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {[[L.routines.series, e.sets], [L.routines.reps, e.reps], [L.routines.descanso, `${e.rest_seconds}s`], [L.routines.musculos, e.muscle_groups.slice(0, 2).join(", ")]].map(([l, v]) => (
                        <div key={l as string}><div className="eyebrow text-[.58rem]">{l}</div><div className="num text-sm mt-0.5" style={{ color: "var(--sage)" }}>{v}</div></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="fine text-center mt-4">{L.routines.warn}</p>
            </div>
          </Locked>
        </section>
      </div>
    </AppShell>
  );
}
