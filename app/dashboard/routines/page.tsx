import { AppShell, Badge, Locked } from "@/components/AppShell";
import { VideoCard } from "@/components/VideoCard";
import { Timer } from "@/components/Timer";
import { demoRoutines } from "@/data/routines";
import { getPlan } from "@/lib/plan";

const FREE_IDS = ["routine_1", "routine_5"];

export default async function Routines({ searchParams }: { searchParams: Promise<{ r?: string }> }) {
  const plan = await getPlan();
  const { r } = await searchParams;
  const sel = demoRoutines.find((x) => x.id === r) || demoRoutines[0];
  const isFree = FREE_IDS.includes(sel.id);
  const steps = sel.exercises.flatMap((e, i) => {
    const work = { name: e.name, seconds: sel.type === "estiramientos" ? 40 : 45, kind: "work" as const };
    return i < sel.exercises.length - 1 ? [work, { name: "Descanso", seconds: Math.min(e.rest_seconds, 30), kind: "rest" as const }] : [work];
  });

  return (
    <AppShell title="Entrenar" kicker="2 rutinas gratis · el resto desde Básico">
      <div className="grid lg:grid-cols-[300px_1fr] gap-5">
        <aside className="space-y-2">
          {demoRoutines.map((x) => (
            <a key={x.id} href={`/dashboard/routines?r=${x.id}`} className={`row block p-4 transition ${x.id === sel.id ? "!border-[var(--fucsia)]" : "hover:!border-[var(--line-strong)]"}`}>
              <div className="flex justify-between items-start gap-2">
                <div><div className="display text-base">{x.name}</div><div className="faint text-xs mt-0.5">{x.duration_minutes} min · {x.exercises.length} ejercicios · {x.type}</div></div>
                <Badge free={FREE_IDS.includes(x.id)} />
              </div>
            </a>
          ))}
        </aside>

        <section className="space-y-4">
          <Locked plan={plan} requires={isFree ? "free" : "basico"} feature={sel.name}>
            <div className="card p-6">
              <div className="flex justify-between items-start gap-3 flex-wrap">
                <div><span className={`pill ${sel.type === "estiramientos" || sel.type === "yoga" || sel.type === "pilates" ? "pill-s" : "pill-f"}`}>{sel.type}</span><h2 className="text-3xl mt-2">{sel.name}</h2><p className="muted text-sm mt-1">{sel.description}</p></div>
                <span className="pill">{sel.difficulty}</span>
              </div>
              <div className="mt-5"><VideoCard src={`/videos/${sel.id}.mp4`} title={`Demo avatar · ${sel.name}`} emoji="▶" /></div>
            </div>

            <Timer steps={steps} tone={sel.type === "estiramientos" || sel.type === "yoga" || sel.type === "pilates" ? "sage" : "fucsia"} />

            <div className="card p-6">
              <div className="eyebrow mb-3">Ejercicios</div>
              <div className="space-y-2">
                {sel.exercises.map((e, i) => (
                  <div key={e.id} className="row p-4">
                    <div className="display">{i + 1}. {e.name}</div>
                    <div className="muted text-sm mb-3">{e.description}</div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {[["Series", e.sets], ["Reps", e.reps], ["Descanso", `${e.rest_seconds}s`], ["Músculos", e.muscle_groups.slice(0, 2).join(", ")]].map(([l, v]) => (
                        <div key={l as string}><div className="eyebrow text-[.58rem]">{l}</div><div className="num text-sm mt-0.5" style={{ color: "var(--sage)" }}>{v}</div></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="fine text-center mt-4">Realiza los ejercicios bajo tu responsabilidad. Detente ante cualquier dolor.</p>
            </div>
          </Locked>
        </section>
      </div>
    </AppShell>
  );
}
