import { AppShell, Badge, Locked } from "@/components/AppShell";
import { AudioCard } from "@/components/AudioCard";
import { Timer } from "@/components/Timer";
import { HeroVideo } from "@/components/HeroVideo";
import { requireUser } from "@/lib/auth";
import { tr } from "@/lib/i18n";

const sessions = [
  { id: "m_1", free: true, icon: "💭", min: 2, journal: false },
  { id: "m_2", free: true, icon: "🙏", min: 2, journal: false },
  { id: "m_3", free: false, icon: "🧘", min: 5, journal: false },
  { id: "m_4", free: false, icon: "☮️", min: 8, journal: false },
  { id: "m_5", free: false, icon: "📔", min: 10, journal: true },
  { id: "m_6", free: false, icon: "🕊️", min: 6, journal: false },
];

export default async function Mindfulness({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const [user, { lang, L }] = await Promise.all([requireUser(), tr()]);
  const { s } = await searchParams;
  const sel = sessions.find((x) => x.id === s) || sessions[0];
  const c = (id: string) => L.content.sessions[id as keyof typeof L.content.sessions] ?? ["", id, ""];
  const [type, title, text] = c(sel.id);
  const steps = [L.mind.inhala, L.mind.sosten, L.mind.exhala, L.mind.inhala, L.mind.sosten, L.mind.exhala].map((n, i) => ({ name: n, seconds: [4, 7, 8][i % 3], kind: "rest" as const }));

  return (
    <AppShell title={L.mind.title} kicker={L.mind.kicker}>
      <div className="relative rounded-[28px] overflow-hidden h-44 md:h-56 mb-5 lift-sage">
        <HeroVideo src="/api/content/video/paz-mental" poster="/img/gal_campo.jpg" className="absolute inset-0 w-full h-full object-cover" label="Maleja" />
        <div className="absolute inset-0 veil" />
        <p className="quote absolute bottom-5 left-6 right-6 text-2xl" style={{ color: "var(--sage-soft)" }}>{L.mind.banner}</p>
      </div>
      <div className="grid lg:grid-cols-[300px_1fr] gap-5">
        <aside className="space-y-2">
          {sessions.map((x) => (
            <a key={x.id} href={`/dashboard/mindfulness?s=${x.id}`} className={`row block p-4 transition ${x.id === sel.id ? "!border-[var(--sage)]" : "hover:!border-[var(--line-strong)]"}`}>
              <div className="flex justify-between items-start gap-2"><div className="flex gap-3"><span className="text-2xl">{x.icon}</span><div><div className="display text-sm">{c(x.id)[1]}</div><div className="faint text-xs">{c(x.id)[0]} · {x.min} {L.common.min}</div></div></div><Badge free={x.free} L={L} /></div>
            </a>
          ))}
        </aside>
        <section className="space-y-4">
          <Locked plan={user.plan} requires={sel.free ? "free" : "basico"} feature={title} L={L}>
            <div className="card lift-sage p-8 text-center">
              <span className="pill pill-s">{type} · {sel.min} {L.common.min}</span>
              <h2 className="text-3xl mt-3">{title}</h2>
              <div className="mt-5 text-left"><AudioCard src={`/api/content/audio/${sel.id}.${lang}`} title={`${L.mind.guiada} · ${title}`} labels={{ play: L.mind.play, pause: L.mind.pause, missing: L.mind.missing }} /></div>
              <p className="quote text-2xl mt-6 max-w-xl mx-auto" style={{ color: "var(--sage-soft)" }}>“{text}”</p>
              {sel.journal && <textarea rows={5} placeholder={L.mind.journalPh} className="input input-s mt-6" />}
              <div className="flex gap-3 justify-center mt-6"><button className="btn btn-balance">{L.mind.completar}</button><button className="btn btn-ghost">{L.mind.guardar}</button></div>
            </div>
            <div><div className="eyebrow mb-2" style={{ color: "var(--sage)" }}>{L.mind.respiracion}</div><Timer steps={steps} tone="sage" labels={L.routines} /></div>
          </Locked>
        </section>
      </div>
    </AppShell>
  );
}
