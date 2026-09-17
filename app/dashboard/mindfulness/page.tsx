import { AppShell, Badge, Locked } from "@/components/AppShell";
import { VideoCard } from "@/components/VideoCard";
import { Timer } from "@/components/Timer";
import { getPlan } from "@/lib/plan";

const sessions = [
  { id: "m_1", free: true, type: "Reflexión", title: "Pequeños hábitos, grandes cambios", min: 5, text: "¿Qué hábito pequeño cumpliste hoy? Anótalo. No importa el tamaño: importa la repetición. Mañana, repítelo una vez más." },
  { id: "m_2", free: true, type: "Worship", title: "Gratitud y propósito", min: 8, text: "Respira. Agradece por tu cuerpo, que hoy se movió. Agradece por tu mente, que hoy eligió cuidarse. Pide fuerza para mañana." },
  { id: "m_3", free: false, type: "Meditación", title: "Antes de entrenar: enfoque", min: 5, text: "Cierra los ojos. Visualiza tu sesión completa. Cada repetición con intención. Tú eres capaz." },
  { id: "m_4", free: false, type: "Meditación", title: "Recuperación post-entreno", min: 8, text: "Tu cuerpo trabajó. Respira lento. Siente cómo el cansancio se vuelve satisfacción. Descansa." },
  { id: "m_5", free: false, type: "Journal", title: "Diario de la noche", min: 10, text: "Hoy me sentí... Estoy agradecido por... Mañana quiero... Mi pequeño hábito de hoy fue..." },
  { id: "m_6", free: false, type: "Worship", title: "Paz en el presente", min: 6, text: "El pasado no se cambia. El futuro no existe aún. Solo tienes este momento. Entrégalo con paz." },
];

export default async function Mindfulness({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const plan = await getPlan();
  const { s } = await searchParams;
  const sel = sessions.find((x) => x.id === s) || sessions[0];
  const steps = [{ name: "Inhala", seconds: 4, kind: "rest" as const }, { name: "Sostén", seconds: 7, kind: "rest" as const }, { name: "Exhala", seconds: 8, kind: "rest" as const }, { name: "Inhala", seconds: 4, kind: "rest" as const }, { name: "Sostén", seconds: 7, kind: "rest" as const }, { name: "Exhala", seconds: 8, kind: "rest" as const }];

  return (
    <AppShell title="Paz mental" kicker="Reflexión y worship gratis · meditación y journal desde Básico">
      <div className="grid lg:grid-cols-[300px_1fr] gap-5">
        <aside className="space-y-2">
          {sessions.map((x) => (
            <a key={x.id} href={`/dashboard/mindfulness?s=${x.id}`} className={`row block p-4 transition ${x.id === sel.id ? "!border-[var(--sage)]" : "hover:!border-[var(--line-strong)]"}`}>
              <div className="flex justify-between items-start gap-2"><div><div className="display text-sm">{x.title}</div><div className="faint text-xs mt-0.5">{x.type} · {x.min} min</div></div><Badge free={x.free} /></div>
            </a>
          ))}
        </aside>
        <section className="space-y-4">
          <Locked plan={plan} requires={sel.free ? "free" : "basico"} feature={sel.title}>
            <div className="card lift-sage p-8 text-center">
              <span className="pill pill-s">{sel.type} · {sel.min} min</span>
              <h2 className="text-3xl mt-3">{sel.title}</h2>
              <div className="mt-5"><VideoCard src={`/videos/${sel.id}.mp4`} title={`Avatar guía · ${sel.title}`} emoji="◌" /></div>
              <p className="quote text-2xl mt-6 max-w-xl mx-auto" style={{ color: "var(--sage-soft)" }}>“{sel.text}”</p>
              {sel.type === "Journal" && <textarea rows={5} placeholder="Escribe aquí..." className="input input-s mt-6" />}
              <div className="flex gap-3 justify-center mt-6"><button className="btn btn-balance">Completar sesión</button><button className="btn btn-ghost">Guardar</button></div>
            </div>
            <div><div className="eyebrow mb-2" style={{ color: "var(--sage)" }}>Respiración 4-7-8</div><Timer steps={steps} tone="sage" /></div>
          </Locked>
        </section>
      </div>
    </AppShell>
  );
}
