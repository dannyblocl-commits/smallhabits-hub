import Link from "next/link";
import Image from "next/image";
import { AppShell, Badge } from "@/components/AppShell";
import { HeroVideo } from "@/components/HeroVideo";
import { requireUser } from "@/lib/auth";
import { stats } from "@/app/actions/food";
import { getAssignment } from "@/app/actions/assign";
import { unreadCount } from "@/app/actions/chat";
import { myCoach } from "@/app/actions/coaches";
import { demoRoutines } from "@/data/routines";

const goalKcal: Record<string, number> = { "Perder peso": 1500, Tonificar: 1800, "Ganar fuerza": 2600, Resistencia: 2200, Flexibilidad: 1900, "Salud integral": 1900 };

export default async function Dashboard() {
  const user = await requireUser();
  const [s, a, unread, coach] = await Promise.all([stats(), getAssignment(), unreadCount(), myCoach()]);
  const assigned = a?.routine_id ? demoRoutines.find((r) => r.id === a.routine_id) : undefined;
  const todayRoutine = assigned ?? (s.workoutsWeek === 0 ? demoRoutines[0] : demoRoutines[1]);
  const goal = goalKcal[user.goal] ?? 1800;
  const pct = Math.min(100, Math.round((s.kcalToday / goal) * 100));
  const first = user.name.trim().split(" ")[0];
  const today = new Date().toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" });

  return (
    <AppShell title={`Hola, ${first}`} kicker={`${today} · objetivo: ${user.goal}`}>
      <p className="quote text-xl muted -mt-3 mb-6">Un pequeño hábito hoy. Uno más mañana.</p>

      <div className="relative rounded-[28px] overflow-hidden min-h-[260px] flex items-end mb-5 lift">
        <HeroVideo src="/videos/entrenar.mp4" poster="/img/gal_fuerza.jpg" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" label="Maleja en el gym" />
        <div className="absolute inset-0 veil" />
        <div className="relative p-6 w-full flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="pill pill-f">{assigned ? `Asignado por ${a?.coach_name ?? "tu coach"}` : "Hoy toca"}</span>
            <h2 className="text-3xl mt-2">{todayRoutine.name} · {todayRoutine.duration_minutes} min</h2>
            <p className="muted text-sm">{a?.note ?? (s.workoutsWeek === 0 ? "Empieza suave. Lo importante es empezar." : `${todayRoutine.exercises.length} ejercicios · ${todayRoutine.type}`)}</p>
          </div>
          <Link href={`/dashboard/routines?r=${todayRoutine.id}`} className="btn btn-go text-lg px-8">GO ▶</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="card p-5 flex items-center gap-4">
          <div className="ring w-20 h-20" style={{ background: `conic-gradient(var(--fucsia) 0 ${pct}%, var(--surface-3) ${pct}% 100%)` }}><span className="num text-base">{pct}%</span></div>
          <div><div className="eyebrow">Calorías</div><div className="num text-2xl">{s.kcalToday}</div><div className="faint text-xs">de {goal}</div></div>
        </div>
        <div className="card p-5"><div className="eyebrow">Peso</div><div className="num text-3xl mt-1" style={{ color: "var(--sage)" }}>{user.weight ?? "—"}</div><div className="faint text-xs">{user.weight ? "kg" : "añádelo en tu perfil"}</div></div>
        <div className="card p-5"><div className="eyebrow">Entrenos</div><div className="num text-3xl mt-1">{s.workoutsWeek}/4</div><div className="faint text-xs">esta semana</div></div>
        <div className="card p-5"><div className="eyebrow">Días activos</div><div className="num text-3xl mt-1" style={{ color: "var(--fucsia)" }}>{s.activeDays}</div><div className="faint text-xs">últimos 30 días</div></div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="card lift-sage p-5">
          <div className="flex justify-between items-center"><div className="eyebrow" style={{ color: "var(--sage)" }}>Nutrición</div><Badge free /></div>
          <h3 className="text-xl mt-1">{s.kcalToday === 0 ? "Aún no registras comidas hoy" : `Te quedan ${Math.max(0, goal - s.kcalToday)} kcal`}</h3>
          <div className="progress mt-3"><i style={{ width: `${pct}%` }} /></div>
          <div className="flex gap-2 mt-4"><Link href="/dashboard/food" className="btn btn-balance btn-sm">Registrar comida</Link><Link href="/dashboard/nutrition" className="btn btn-ghost btn-sm">Ver menú</Link></div>
        </div>
        <div className="card p-5">
          <div className="flex justify-between items-center"><div className="eyebrow" style={{ color: "var(--sage)" }}>Paz mental</div><Badge free /></div>
          <p className="quote text-lg mt-2" style={{ color: "var(--sage-soft)" }}>Respira. Agradece por tu cuerpo, que hoy se movió.</p>
          <Link href="/dashboard/mindfulness" className="btn btn-balance btn-sm mt-4">Reflexión de hoy · 5 min</Link>
        </div>
      </div>

      <Link href="/dashboard/chat" className="card p-5 flex items-center gap-4 hover:border-[var(--line-strong)] transition">
        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[var(--fucsia)] shrink-0"><Image src="/img/miphoto.jpg" alt="Maleja" fill className="object-cover object-top" sizes="56px" /></div>
        <div className="flex-1"><div className="display">{coach?.name ?? a?.coach_name ?? "Elige tu coach"}</div><div className="muted text-sm">{unread > 0 ? `Tienes ${unread} mensaje${unread > 1 ? "s" : ""} sin leer.` : `Bienvenida, ${first}. Cuéntame cómo te sientes hoy y armamos tu semana.`}</div></div>
        <span className={`pill ${unread > 0 ? "pill-f" : ""}`}>{unread > 0 ? `${unread} nuevo${unread > 1 ? "s" : ""}` : "Chat"}</span>
      </Link>
    </AppShell>
  );
}
