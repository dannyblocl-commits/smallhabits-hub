import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { requireUser } from "@/lib/auth";
import { tr, locale } from "@/lib/i18n";
import { RETO } from "@/lib/reto-i18n";
import { RETO_TRAINING, RETO_MEALS, RETO_SUPPLEMENTS, RETO_HABITS, retoProgress, trackOf } from "@/lib/reto-plan";

export default async function RetoDashboard() {
  const [user, { lang }] = await Promise.all([requireUser(), tr()]);
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

  const track = trackOf(user.reto_track);
  const weekText = t.weeks[p.week - 1];
  const habits = RETO_HABITS[p.week - 1][lang];
  const training = RETO_TRAINING[track];
  const meals = RETO_MEALS[track];
  const sup = RETO_SUPPLEMENTS[lang];

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

      <div className="card p-5 mb-5">
        <div className="eyebrow mb-3" style={{ color: "var(--sage)" }}>{t.app.habits}</div>
        <ul className="space-y-2">
          {habits.map((h, i) => (
            <li key={h} className="flex items-center gap-3"><span className="num text-sm w-6" style={{ color: "var(--fucsia)" }}>{String(i + 1).padStart(2, "0")}</span><span>{h}</span></li>
          ))}
        </ul>
      </div>

      <section className="mb-5">
        <div className="eyebrow mb-1" style={{ color: "var(--fucsia)" }}>{t.app.training}</div>
        <p className="muted text-sm mb-3">{t.app.warmup}</p>
        <div className="grid md:grid-cols-2 gap-3">
          {training.map((d) => (
            <div key={d.day.es} className="card lift p-5">
              <div className="flex items-baseline justify-between"><span className="pill pill-f">{d.day[lang]}</span><span className="display">{d.focus[lang]}</span></div>
              <ul className="mt-3 space-y-1 text-sm">
                {d.exercises.map((e) => (
                  <li key={e.name} className="flex justify-between gap-3"><span>{e.name}</span><span className="num faint whitespace-nowrap">{e.sets} × {e.reps}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5">
        <div className="eyebrow mb-1" style={{ color: "var(--sage)" }}>{t.app.meals}</div>
        <p className="muted text-sm mb-3">{t.app.mealsNote}</p>
        <div className="space-y-3">
          {meals.map((m) => (
            <div key={m.name.es} className="card lift-sage p-5">
              <div className="display mb-2">{m.name[lang]}</div>
              <ul className="space-y-1 text-sm">
                {m.options[lang].map((o, i) => (
                  <li key={o} className="flex gap-3"><span className="num w-6 shrink-0" style={{ color: "var(--sage)" }}>{i + 1}</span><span>{o}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-5 mb-5" style={{ borderColor: "rgba(186,142,84,0.45)" }}>
        <div className="eyebrow mb-1" style={{ color: "#BA8E54" }}>{sup.title}</div>
        <p className="muted text-sm mb-3">{sup.intro}</p>
        <ul className="space-y-2 text-sm">
          {sup.steps.map(([k, v]) => (
            <li key={k}><b>{k}:</b> {v}</li>
          ))}
        </ul>
        <p className="faint text-xs mt-4">{sup.note}</p>
      </section>

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
