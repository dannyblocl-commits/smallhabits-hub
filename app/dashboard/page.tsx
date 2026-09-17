import Link from "next/link";
import Image from "next/image";
import { AppShell, Badge } from "@/components/AppShell";
import { HeroVideo } from "@/components/HeroVideo";
import { requireUser } from "@/lib/auth";
import { tr, fill, locale } from "@/lib/i18n";
import { stats } from "@/app/actions/food";
import { getAssignment } from "@/app/actions/assign";
import { unreadCount } from "@/app/actions/chat";
import { myCoach } from "@/app/actions/coaches";
import { wearableStatus } from "@/app/actions/wearables";
import { demoRoutines } from "@/data/routines";

const goalKcal: Record<string, number> = { "Perder peso": 1500, Tonificar: 1800, "Ganar fuerza": 2600, Resistencia: 2200, Flexibilidad: 1900, "Salud integral": 1900 };

export default async function Dashboard() {
  const [user, { lang, L }] = await Promise.all([requireUser(), tr()]);
  const [s, a, unread, coach, w] = await Promise.all([stats(), getAssignment(), unreadCount(), myCoach(), wearableStatus()]);
  const steps = w.today?.steps ?? null;
  const assigned = a?.routine_id ? demoRoutines.find((r) => r.id === a.routine_id) : undefined;
  const todayRoutine = assigned ?? (s.workoutsWeek === 0 ? demoRoutines[0] : demoRoutines[1]);
  const rt = L.content.routines[todayRoutine.id as keyof typeof L.content.routines];
  const goal = goalKcal[user.goal] ?? 1800;
  const pct = Math.min(100, Math.round((s.kcalToday / goal) * 100));
  const first = user.name.trim().split(" ")[0];
  const today = new Date().toLocaleDateString(locale(lang), { weekday: "long", day: "numeric", month: "long" });
  const goalLabel = L.goals[user.goal as keyof typeof L.goals] ?? user.goal;

  return (
    <AppShell title={`${L.dash.hola}, ${first}`} kicker={`${today} · ${L.dash.objetivo}: ${goalLabel}`}>
      <p className="quote text-xl muted -mt-3 mb-6">{L.dash.quote}</p>

      <div className="relative rounded-[28px] overflow-hidden min-h-[260px] flex items-end mb-5 lift">
        <HeroVideo src="/videos/entrenar.mp4" poster="/img/gal_fuerza.jpg" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" label="Maleja" />
        <div className="absolute inset-0 veil" />
        <div className="relative p-6 w-full flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="pill pill-f">{assigned ? `${L.dash.asignadoPor} ${a?.coach_name ?? ""}` : L.dash.hoyToca}</span>
            <h2 className="text-3xl mt-2">{rt?.[0] ?? todayRoutine.name} · {todayRoutine.duration_minutes} {L.common.min}</h2>
            <p className="muted text-sm">{a?.note ?? (s.workoutsWeek === 0 ? L.dash.empiezaSuave : `${todayRoutine.exercises.length} ${L.common.ejercicios} · ${todayRoutine.type}`)}</p>
          </div>
          <Link href={`/dashboard/routines?r=${todayRoutine.id}`} className="btn btn-go text-lg px-8">GO ▶</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="card p-5 flex items-center gap-4">
          <div className="ring w-20 h-20" style={{ background: `conic-gradient(var(--fucsia) 0 ${pct}%, var(--surface-3) ${pct}% 100%)` }}><span className="num text-base">{pct}%</span></div>
          <div><div className="eyebrow">{L.dash.calorias}</div><div className="num text-2xl">{s.kcalToday}</div><div className="faint text-xs">{L.dash.de} {goal}</div></div>
        </div>
        {steps !== null ? (
          <div className="card p-5"><div className="eyebrow">{L.progress.pasos}</div><div className="num text-3xl mt-1" style={{ color: "var(--sage)" }}>{steps.toLocaleString(locale(lang))}</div><div className="faint text-xs">Google Health</div></div>
        ) : (
          <div className="card p-5"><div className="eyebrow">{L.dash.peso}</div><div className="num text-3xl mt-1" style={{ color: "var(--sage)" }}>{user.weight ?? "—"}</div><div className="faint text-xs">{user.weight ? L.dash.kg : L.dash.addProfile}</div></div>
        )}
        <div className="card p-5"><div className="eyebrow">{L.balance.neto}</div><div className="num text-3xl mt-1" style={{ color: s.kcalToday - s.burnedToday > goal ? "var(--warn)" : "var(--text)" }}>{s.kcalToday - s.burnedToday}</div><div className="faint text-xs">{s.kcalToday} − {s.burnedToday} {L.balance.quemadas}</div></div>
        <div className="card p-5"><div className="eyebrow">{L.dash.diasActivos}</div><div className="num text-3xl mt-1" style={{ color: "var(--fucsia)" }}>{s.activeDays}</div><div className="faint text-xs">{L.dash.ult30}</div></div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="card lift-sage p-5">
          <div className="flex justify-between items-center"><div className="eyebrow" style={{ color: "var(--sage)" }}>{L.dash.nutricion}</div><Badge free L={L} /></div>
          <h3 className="text-xl mt-1">{s.kcalToday === 0 ? L.dash.sinComidas : fill(L.dash.quedan, Math.max(0, goal - s.kcalToday))}</h3>
          <div className="progress mt-3"><i style={{ width: `${pct}%` }} /></div>
          <div className="flex gap-2 mt-4"><Link href="/dashboard/food" className="btn btn-balance btn-sm">{L.dash.registrar}</Link><Link href="/dashboard/nutrition" className="btn btn-ghost btn-sm">{L.dash.verMenu}</Link></div>
        </div>
        <div className="card p-5">
          <div className="flex justify-between items-center"><div className="eyebrow" style={{ color: "var(--sage)" }}>{L.dash.pazMental}</div><Badge free L={L} /></div>
          <p className="quote text-lg mt-2" style={{ color: "var(--sage-soft)" }}>{L.dash.quoteMente}</p>
          <Link href="/dashboard/mindfulness" className="btn btn-balance btn-sm mt-4">{L.dash.reflexionHoy}</Link>
        </div>
      </div>

      <Link href="/dashboard/chat" className="card p-5 flex items-center gap-4 hover:border-[var(--line-strong)] transition">
        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[var(--fucsia)] shrink-0"><Image src="/img/miphoto.jpg" alt="Coach" fill className="object-cover object-top" sizes="56px" /></div>
        <div className="flex-1"><div className="display">{coach?.name ?? a?.coach_name ?? L.dash.eligeCoach}</div><div className="muted text-sm">{unread > 0 ? fill(L.dash.unread, unread) : fill(L.dash.welcome, first)}</div></div>
        <span className={`pill ${unread > 0 ? "pill-f" : ""}`}>{unread > 0 ? fill(L.dash.nuevo, unread) : L.nav.chat}</span>
      </Link>
    </AppShell>
  );
}
