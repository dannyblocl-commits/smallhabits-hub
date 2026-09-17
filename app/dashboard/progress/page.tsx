import { AppShell, Locked } from "@/components/AppShell";
import { getPlan } from "@/lib/plan";
import { HeroVideo } from "@/components/HeroVideo";

const weight = [66.2, 66.0, 65.8, 65.9, 65.5, 65.3, 65.0, 64.8];
const kcal = [1720, 1650, 1810, 1590, 1700, 1760, 1680];
const days = ["L", "M", "X", "J", "V", "S", "D"];

function Bars({ data, min, max, color, labels }: { data: number[]; min: number; max: number; color: string; labels?: string[] }) {
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-md" style={{ height: `${((v - min) / (max - min)) * 100}%`, background: `linear-gradient(180deg, ${color}, transparent)`, minHeight: 6 }} />
          <span className="faint text-[.6rem]">{labels?.[i] ?? ""}</span>
        </div>
      ))}
    </div>
  );
}

export default async function Progress() {
  const plan = await getPlan();
  return (
    <AppShell title="Progreso" kicker="8 semanas contigo">
      <div className="relative rounded-[28px] overflow-hidden h-44 md:h-56 mb-5 lift">
        <HeroVideo src="/videos/progreso.mp4" poster="/img/gal_parque.jpg" className="absolute inset-0 w-full h-full object-cover" label="Maleja corriendo al amanecer" />
        <div className="absolute inset-0 veil" />
        <div className="absolute bottom-5 left-6"><span className="pill pill-f">Racha 12 días</span><h2 className="text-3xl mt-2">Cada día suma.</h2></div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[["Peso", "64.8", "kg · −1.4", "var(--sage)"], ["Racha", "12", "días · mejor 19", "var(--fucsia)"], ["Entrenos", "27", "totales", "var(--text)"]].map(([l, v, s, c]) => (
          <div key={l} className="card p-5"><div className="eyebrow">{l}</div><div className="num text-3xl mt-1" style={{ color: c }}>{v}</div><div className="faint text-xs">{s}</div></div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <div className="card p-5"><div className="eyebrow mb-3" style={{ color: "var(--sage)" }}>Peso · 8 semanas</div><Bars data={weight} min={64} max={67} color="var(--sage)" labels={["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"]} /></div>
        <Locked plan={plan} requires="basico" feature="Calorías semanales">
          <div className="card p-5"><div className="eyebrow mb-3" style={{ color: "var(--fucsia)" }}>Calorías · esta semana</div><Bars data={kcal} min={1200} max={2000} color="var(--fucsia)" labels={days} /></div>
        </Locked>
      </div>
      <Locked plan={plan} requires="pro" feature="Apple Watch y Garmin">
        <div className="card lift-sage p-5">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4"><div className="eyebrow" style={{ color: "var(--sage)" }}>Reloj conectado</div><div className="flex gap-2"><span className="pill pill-s">Apple Watch · sincronizado 09:41</span><span className="pill">Garmin</span></div></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[["Pasos", "6.842"], ["BPM reposo", "68"], ["Kcal activas", "412"], ["Sueño", "7h 20m"]].map(([l, v]) => (<div key={l} className="row p-4 text-center"><div className="num text-2xl">{v}</div><div className="faint text-xs mt-1">{l}</div></div>))}
          </div>
          <p className="faint text-xs mt-3">Vía Apple HealthKit y Garmin Connect API. Sincroniza cada 15 minutos.</p>
        </div>
      </Locked>
    </AppShell>
  );
}
