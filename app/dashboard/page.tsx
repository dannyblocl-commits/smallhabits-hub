import Link from "next/link";
import Image from "next/image";
import { AppShell } from "@/components/AppShell";
import { HeroVideo } from "@/components/HeroVideo";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { WaterTracker } from "@/components/WaterTracker";
import { requireUser } from "@/lib/auth";
import { tr, fill, locale } from "@/lib/i18n";
import { stats } from "@/app/actions/food";
import { getAssignment } from "@/app/actions/assign";
import { unreadCount } from "@/app/actions/chat";
import { myCoach } from "@/app/actions/coaches";
import { getWaterToday, weekActivity } from "@/app/actions/habits";
import { listRoutines, listMenus, listRecommendations, localizeRoutine, localizeMenu, type Routine } from "@/lib/library";
import { retoProgress } from "@/lib/reto-plan";
import { RETO } from "@/lib/reto-i18n";
import { requireSubscription, getTrialDaysRemaining } from "@/lib/subscription-guard";

const goalKcal: Record<string, number> = { "Perder peso": 1500, Tonificar: 1800, "Ganar fuerza": 2600, Resistencia: 2200, Flexibilidad: 1900, "Salud integral": 1900 };
const goalMenu: Record<string, string> = { "Perder peso": "menu_2", "Ganar fuerza": "menu_3" };

export default async function Dashboard() {
  const [user, { lang, L }, sub] = await Promise.all([requireUser(), tr(), requireSubscription()]);
  const daysRemaining = getTrialDaysRemaining(sub.trialEnd);
  const reto = retoProgress(user.reto_start);
  const [s, a, unread, coach, routines, menus, recs, water, week] = await Promise.all([
    stats(), getAssignment(), unreadCount(), myCoach(), listRoutines(), listMenus(), listRecommendations(user.id, undefined, 2), getWaterToday(), weekActivity(),
  ]);

  const assigned = a?.routine_id ? routines.find((r) => r.id === a.routine_id) : undefined;
  const todayRoutine = assigned ?? (routines.find((r) => r.free) ?? routines[0]) ?? { id: "routine_1", name: "Calistenia", duration_minutes: 30, exercises: [], type: "calistenia" };
  const rt = L.content.routines[todayRoutine.id as keyof typeof L.content.routines] as [string, string] | undefined;
  const todayName = (todayRoutine as Partial<Routine>).i18n ? localizeRoutine(todayRoutine as Routine, lang, rt).name : (rt?.[0] ?? todayRoutine.name);

  const menu = menus.find((m) => m.id === a?.menu_id) ?? menus.find((m) => m.id === goalMenu[user.goal]) ?? menus.find((m) => m.free) ?? menus[0];
  const menuT = menu ? localizeMenu(menu, lang, L.content.menus[menu.id as keyof typeof L.content.menus] as string | undefined) : null;

  const goal = goalKcal[user.goal] ?? 1800;
  const pct = Math.min(100, Math.round((s.kcalToday / goal) * 100));
  const first = user.name.trim().split(" ")[0];
  const loc = locale(lang);
  const today = new Date().toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" });
  const D = L.dash;

  return (
    <AppShell tab="/dashboard" title={`${D.hola}, ${first}`} kicker={today}>
      <SubscriptionStatus inTrial={sub.inTrial} trialEnd={sub.trialEnd} planLevel={sub.planLevel} daysRemaining={daysRemaining} isActive={sub.isActive} staff={sub.staff} />

      {/* Semana */}
      <section className="card p-5 mb-4" aria-label={D.semana}>
        <div className="flex items-baseline justify-between mb-3">
          <div className="eyebrow">{D.semana}</div>
          <div className="faint text-xs">{fill(D.diasSemana, week.trained.length)}</div>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {week.days.map((d) => {
            const done = week.trained.includes(d);
            const isToday = d === week.today;
            const date = new Date(d + "T12:00:00Z");
            return (
              <div key={d} className="flex flex-col items-center gap-1.5">
                <span className="text-[.7rem] uppercase faint">{date.toLocaleDateString(loc, { weekday: "narrow", timeZone: "UTC" })}</span>
                <span className="w-9 h-9 rounded-full grid place-items-center text-sm num" style={done ? { background: "var(--fucsia)", color: "#fff" } : isToday ? { border: "2px solid var(--fucsia)", color: "var(--text)" } : { background: "var(--surface-2)", color: "var(--text-3)" }}>
                  {done ? "✓" : date.getUTCDate()}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lo que toca hoy */}
      {reto ? (
        <Link href="/dashboard/reto" className="card lift p-5 mb-4 flex items-center justify-between gap-4 hover:border-[var(--line-strong)] transition">
          <div>
            <span className="pill pill-f">{RETO[lang].app.day.replace("{d}", String(reto.day))}</span>
            <h2 className="text-2xl mt-2">{RETO[lang].weeks[reto.week - 1][0]}</h2>
            <div className="progress mt-3" style={{ maxWidth: 280 }}><i style={{ width: `${reto.pct}%` }} /></div>
          </div>
          <span className="btn btn-go">{D.entrenaHoy} ▶</span>
        </Link>
      ) : (
        <div className="relative rounded-[28px] overflow-hidden min-h-[220px] flex items-end mb-4 lift">
          <HeroVideo src="/api/content/video/entrenar" poster="/img/gal_fuerza.jpg" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" label="Maleja" />
          <div className="absolute inset-0 veil" />
          <div className="relative p-5 w-full flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="pill pill-f">{assigned ? `${D.asignadoPor} ${a?.coach_name ?? ""}` : D.hoyToca}</span>
              <h2 className="text-2xl md:text-3xl mt-2">{todayName} · {todayRoutine.duration_minutes} {L.common.min}</h2>
              {a?.note && <p className="muted text-sm">{a.note}</p>}
            </div>
            <Link href={`/dashboard/routines?r=${todayRoutine.id}`} className="btn btn-go px-7">{D.entrenaHoy} ▶</Link>
          </div>
        </div>
      )}

      {/* Hábitos del día */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <WaterTracker initial={water} L={{ agua: D.agua, vasos: D.vasos, metaAgua: D.metaAgua, sumar: D.sumar, restar: D.restar }} />
        <Link href="/dashboard/food" className="card p-5 flex items-center gap-5 hover:border-[var(--line-strong)] transition">
          <div className="ring w-20 h-20 shrink-0" style={{ background: `conic-gradient(var(--fucsia) 0 ${pct}%, var(--surface-3) ${pct}% 100%)` }}><span className="num text-base">{pct}%</span></div>
          <div className="flex-1">
            <div className="eyebrow">{D.calorias}</div>
            <div className="num text-2xl">{s.kcalToday} <span className="faint text-sm">/ {goal}</span></div>
            <div className="text-sm mt-1" style={{ color: "var(--fucsia)" }}>{D.registrar} →</div>
          </div>
        </Link>
      </div>

      {/* Comidas de hoy */}
      {menu && menuT && menuT.meals.length > 0 && (
        <section className="mb-4">
          <div className="flex items-baseline justify-between mb-2">
            <div className="eyebrow" style={{ color: "var(--sage)" }}>{D.comidasHoy}</div>
            <Link href="/dashboard/nutrition" className="text-sm" style={{ color: "var(--sage)" }}>{D.verTodo} →</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 snap-x">
            {menuT.meals.map((m) => (
              <div key={m.time + m.name} className="card p-4 min-w-[190px] max-w-[220px] snap-start">
                <div className="faint text-xs uppercase tracking-wide">{m.time}</div>
                <div className="display text-sm mt-1 leading-snug">{m.name}</div>
                <div className="num text-sm mt-2" style={{ color: "var(--sage)" }}>{m.kcal} kcal</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Coach */}
      <Link href="/dashboard/chat" className="card p-5 flex items-center gap-4 hover:border-[var(--line-strong)] transition mb-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[var(--fucsia)] shrink-0"><Image src="/img/miphoto.jpg" alt="Coach" fill className="object-cover object-top" sizes="56px" /></div>
        <div className="flex-1 min-w-0">
          <div className="display">{coach?.name ?? a?.coach_name ?? D.eligeCoach}</div>
          <div className="muted text-sm truncate">{recs[0]?.body ?? (unread > 0 ? fill(D.unread, unread) : fill(D.welcome, first))}</div>
        </div>
        <span className={`pill ${unread > 0 ? "pill-f" : ""}`}>{unread > 0 ? fill(D.nuevo, unread) : L.nav.chat}</span>
      </Link>

      {/* Mente */}
      <Link href="/dashboard/mindfulness" className="card p-5 flex items-center justify-between gap-4 hover:border-[var(--line-strong)] transition">
        <p className="quote text-lg" style={{ color: "var(--sage-soft)" }}>{D.quoteMente}</p>
        <span className="text-sm whitespace-nowrap" style={{ color: "var(--sage)" }}>{D.reflexionHoy} →</span>
      </Link>
    </AppShell>
  );
}
