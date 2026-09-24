import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { requireUser } from "@/lib/auth";
import { tr, locale } from "@/lib/i18n";
import { RETO } from "@/lib/reto-i18n";
import { RETO_WEEKS, retoProgress } from "@/lib/reto-plan";
import { getRoutine, getMenu, localizeRoutine, localizeMenu } from "@/lib/library";

export default async function RetoDashboard() {
  const [user, { lang, L }] = await Promise.all([requireUser(), tr()]);
  const t = RETO[lang];
  const p = retoProgress(user.reto_start);

  if (!p) {
    return (
      <AppShell title={t.app.title} kicker={t.app.kicker}>
        <div className="card lift p-8 text-center">
          <h2 className="text-2xl mb-2">{t.app.none}</h2>
          <p className="muted mb-5">{t.app.noneBody}</p>
          <Link href="/reto" className="btn btn-go">{t.app.join} →</Link>
        </div>
      </AppShell>
    );
  }

  const wk = RETO_WEEKS[p.week - 1];
  const weekText = t.weeks[p.week - 1];
  const [routine, menu] = await Promise.all([getRoutine(wk.routine), getMenu(wk.menu)]);
  const rt = L.content.routines[wk.routine as keyof typeof L.content.routines] as [string, string] | undefined;
  const mn = L.content.menus[wk.menu as keyof typeof L.content.menus] as string | undefined;
  const r = routine ? localizeRoutine(routine, lang, rt) : null;
  const m = menu ? localizeMenu(menu, lang, mn) : null;

  return (
    <AppShell title={t.app.title} kicker={t.app.kicker}>
      <div className="card lift p-6 mb-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="pill pill-f">{t.app.day.replace("{d}", String(p.day))}</span>
            <h2 className="text-3xl mt-2">{weekText[0]}</h2>
            <p className="muted text-sm">{weekText[1]}</p>
          </div>
          <div className="text-right">
            <div className="eyebrow">{t.app.weekOf.replace("{w}", String(p.week))}</div>
            <div className="faint text-xs">{t.app.ends} {p.end.toLocaleDateString(locale(lang), { day: "numeric", month: "long" })}</div>
          </div>
        </div>
        <div className="progress mt-4"><i style={{ width: `${p.pct}%` }} /></div>
      </div>

      {p.done && (
        <div className="card lift-sage p-6 mb-5">
          <h3 className="text-2xl" style={{ color: "var(--sage)" }}>{t.app.done}</h3>
          <p className="muted mt-1">{t.app.doneBody}</p>
          <Link href="/dashboard/chat" className="btn btn-balance btn-sm mt-4">{t.app.checkin}</Link>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="card lift p-5">
          <div className="eyebrow" style={{ color: "var(--fucsia)" }}>{t.app.routine}</div>
          <h3 className="text-xl mt-1">{r?.name ?? wk.routine}</h3>
          {routine && <p className="muted text-sm">{routine.duration_minutes} {L.common.min} · {r?.exercises.length} {L.common.ejercicios}</p>}
          <Link href={`/dashboard/routines?r=${wk.routine}`} className="btn btn-go btn-sm mt-4">{t.app.go} ▶</Link>
        </div>
        <div className="card lift-sage p-5">
          <div className="eyebrow" style={{ color: "var(--sage)" }}>{t.app.menu}</div>
          <h3 className="text-xl mt-1">{m?.name ?? wk.menu}</h3>
          {menu && <p className="muted text-sm">{menu.kcal} kcal · {menu.macros}</p>}
          <Link href={`/dashboard/menus?m=${wk.menu}`} className="btn btn-balance btn-sm mt-4">{t.app.open}</Link>
        </div>
      </div>

      <div className="card p-5 mb-5">
        <div className="eyebrow mb-3" style={{ color: "var(--sage)" }}>{t.app.habits}</div>
        <ul className="space-y-2">
          {wk.habits[lang].map((h, i) => (
            <li key={h} className="flex items-center gap-3"><span className="num text-sm w-6" style={{ color: "var(--fucsia)" }}>{String(i + 1).padStart(2, "0")}</span><span>{h}</span></li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/dashboard/chat" className="card p-5 hover:border-[var(--line-strong)] transition">
          <div className="eyebrow" style={{ color: "var(--fucsia)" }}>{t.app.checkin}</div>
          <p className="muted text-sm mt-1">{t.app.checkinBody}</p>
        </Link>
        <Link href="/dashboard/photos" className="card p-5 hover:border-[var(--line-strong)] transition">
          <div className="eyebrow" style={{ color: "var(--sage)" }}>{t.app.photos}</div>
          <p className="muted text-sm mt-1">{t.app.photosBody}</p>
        </Link>
      </div>
    </AppShell>
  );
}
