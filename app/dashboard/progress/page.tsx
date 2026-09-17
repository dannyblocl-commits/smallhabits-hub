import { AppShell, Locked } from "@/components/AppShell";
import { HeroVideo } from "@/components/HeroVideo";
import { requireUser } from "@/lib/auth";
import { tr } from "@/lib/i18n";
import { stats } from "@/app/actions/food";

const kcal = [1720, 1650, 1810, 1590, 1700, 1760, 1680];

function Bars({ data, min, max, color, labels }: { data: number[]; min: number; max: number; color: string; labels?: string[] }) {
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-md" style={{ height: `${Math.max(4, ((v - min) / (max - min)) * 100)}%`, background: `linear-gradient(180deg, ${color}, transparent)`, minHeight: 6 }} />
          <span className="faint text-[.6rem]">{labels?.[i] ?? ""}</span>
        </div>
      ))}
    </div>
  );
}

export default async function Progress() {
  const [user, { L, lang }] = await Promise.all([requireUser(), tr()]);
  const s = await stats();
  const weights = s.weights.length ? s.weights : user.weight ? [user.weight] : [];
  const wmin = weights.length ? Math.min(...weights) - 1 : 0, wmax = weights.length ? Math.max(...weights) + 1 : 1;
  const days = lang === "en" ? ["M", "T", "W", "T", "F", "S", "S"] : lang === "pt" ? ["S", "T", "Q", "Q", "S", "S", "D"] : ["L", "M", "X", "J", "V", "S", "D"];

  return (
    <AppShell title={L.progress.title} kicker={L.progress.kicker}>
      <div className="relative rounded-[28px] overflow-hidden h-44 md:h-56 mb-5 lift">
        <HeroVideo src="/videos/progreso.mp4" poster="/img/gal_parque.jpg" className="absolute inset-0 w-full h-full object-cover" label="Maleja" />
        <div className="absolute inset-0 veil" />
        <div className="absolute bottom-5 left-6"><span className="pill pill-f">{L.progress.racha} {s.activeDays}</span><h2 className="text-3xl mt-2">{L.progress.banner}</h2></div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="card p-5"><div className="eyebrow">{L.progress.peso}</div><div className="num text-3xl mt-1" style={{ color: "var(--sage)" }}>{user.weight ?? "—"}</div><div className="faint text-xs">kg</div></div>
        <div className="card p-5"><div className="eyebrow">{L.dash.diasActivos}</div><div className="num text-3xl mt-1" style={{ color: "var(--fucsia)" }}>{s.activeDays}</div><div className="faint text-xs">{L.dash.ult30}</div></div>
        <div className="card p-5"><div className="eyebrow">{L.progress.entrenos}</div><div className="num text-3xl mt-1">{s.workoutsWeek}</div><div className="faint text-xs">{L.dash.estaSemana}</div></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <div className="card p-5"><div className="eyebrow mb-3" style={{ color: "var(--sage)" }}>{L.progress.pesoSem}</div>{weights.length ? <Bars data={weights} min={wmin} max={wmax} color="var(--sage)" /> : <p className="muted text-sm">{L.dash.addProfile}</p>}</div>
        <Locked plan={user.plan} requires="basico" feature={L.progress.kcalFeature} L={L}>
          <div className="card p-5"><div className="eyebrow mb-3" style={{ color: "var(--fucsia)" }}>{L.progress.kcalSem}</div><Bars data={kcal} min={1200} max={2000} color="var(--fucsia)" labels={days} /></div>
        </Locked>
      </div>
      <Locked plan={user.plan} requires="pro" feature={L.progress.relojFeature} L={L}>
        <div className="card lift-sage p-5">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4"><div className="eyebrow" style={{ color: "var(--sage)" }}>{L.progress.reloj}</div><div className="flex gap-2"><span className="pill pill-s">Apple Watch · {L.progress.sync}</span><span className="pill">Garmin</span></div></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[[L.progress.pasos, "6.842"], [L.progress.bpm, "68"], [L.progress.kcalAct, "412"], [L.progress.sueno, "7h 20m"]].map(([l, v]) => (<div key={l} className="row p-4 text-center"><div className="num text-2xl">{v}</div><div className="faint text-xs mt-1">{l}</div></div>))}
          </div>
          <p className="faint text-xs mt-3">{L.progress.via}</p>
        </div>
      </Locked>
    </AppShell>
  );
}
