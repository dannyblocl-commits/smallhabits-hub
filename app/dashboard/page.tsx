import Link from "next/link";
import Image from "next/image";
import { AppShell, Badge } from "@/components/AppShell";
import { demoClients } from "@/data/clients";
import { HeroVideo } from "@/components/HeroVideo";

export default function Dashboard() {
  const me = demoClients[0];
  const kcal = 1240, goal = 1800, pct = Math.round((kcal / goal) * 100);

  return (
    <AppShell title={`Hola, ${me.name.split(" ")[0]}`} kicker="Martes · día 12 de racha">
      <p className="quote text-xl muted -mt-3 mb-6">Un pequeño hábito hoy. Uno más mañana.</p>

      {/* Hero del día: GO */}
      <div className="relative rounded-[28px] overflow-hidden min-h-[260px] flex items-end mb-5 lift">
        <HeroVideo src="/videos/entrenar.mp4" poster="/img/gal_fuerza.jpg" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" label="Maleja en el gym" />
        <div className="absolute inset-0 veil" />
        <div className="relative p-6 w-full flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="pill pill-f">Hoy toca</span>
            <h2 className="text-3xl mt-2">HIIT Funcional · 20 min</h2>
            <p className="muted text-sm">4 rondas · 3 ejercicios · descanso 30s</p>
          </div>
          <Link href="/dashboard/routines?r=routine_2" className="btn btn-go text-lg px-8">GO ▶</Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="card p-5 flex items-center gap-4">
          <div className="ring w-20 h-20" style={{ background: `conic-gradient(var(--fucsia) 0 ${pct}%, var(--surface-3) ${pct}% 100%)` }}><span className="num text-base">{pct}%</span></div>
          <div><div className="eyebrow">Calorías</div><div className="num text-2xl">{kcal}</div><div className="faint text-xs">de {goal}</div></div>
        </div>
        {[["Pasos", "6.842", "Apple Watch", "var(--sage)"], ["Entrenos", "3/4", "esta semana", "var(--text)"], ["Racha", "12", "días", "var(--fucsia)"]].map(([l, v, s, c]) => (
          <div key={l} className="card p-5"><div className="eyebrow">{l}</div><div className="num text-3xl mt-1" style={{ color: c }}>{v}</div><div className="faint text-xs">{s}</div></div>
        ))}
      </div>

      {/* Balance del día */}
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="card lift-sage p-5">
          <div className="flex justify-between items-center"><div className="eyebrow" style={{ color: "var(--sage)" }}>Nutrición</div><Badge free={false} /></div>
          <h3 className="text-xl mt-1">Te quedan {goal - kcal} kcal</h3>
          <div className="progress mt-3"><i style={{ width: `${pct}%` }} /></div>
          <div className="flex gap-2 mt-4"><Link href="/dashboard/food" className="btn btn-balance btn-sm">Registrar comida</Link><Link href="/dashboard/nutrition" className="btn btn-ghost btn-sm">Ver menú</Link></div>
        </div>
        <div className="card p-5">
          <div className="flex justify-between items-center"><div className="eyebrow" style={{ color: "var(--sage)" }}>Paz mental</div><Badge free /></div>
          <p className="quote text-lg mt-2" style={{ color: "var(--sage-soft)" }}>Respira. Agradece por tu cuerpo, que hoy se movió.</p>
          <Link href="/dashboard/mindfulness" className="btn btn-balance btn-sm mt-4">Reflexión de hoy · 5 min</Link>
        </div>
      </div>

      {/* Coach */}
      <Link href="/dashboard/chat" className="card p-5 flex items-center gap-4 hover:border-[var(--line-strong)] transition">
        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[var(--fucsia)] shrink-0"><Image src="/img/miphoto.jpg" alt="Maleja" fill className="object-cover object-top" sizes="56px" /></div>
        <div className="flex-1"><div className="display">Maleja</div><div className="muted text-sm">Vi tu racha de 12 días. ¿Cómo vas con las flexiones?</div></div>
        <span className="pill pill-f">1 nuevo</span>
      </Link>
    </AppShell>
  );
}
