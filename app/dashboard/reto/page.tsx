import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { requireUser, isAdmin } from "@/lib/auth";
import { tr, locale } from "@/lib/i18n";
import { RETO } from "@/lib/reto-i18n";
import { RETO_TRAINING, RETO_MEALS, RETO_SUPPLEMENTS, RETO_HABITS, retoProgress, trackOf, type RetoExercise } from "@/lib/reto-plan";
import { mediaToken, withToken } from "@/lib/musclewiki";
import videosJson from "@/data/reto-videos.json";
import type { Lang } from "@/lib/i18n";

type MwVideo = { url: string; poster?: string | null };
type MwCue = { breathing: string; mistake: string; feel: string };
type MwExercise = { name: string; steps: Partial<Record<Lang, string[]>>; cues?: Partial<Record<Lang, MwCue>>; videos: Record<string, Record<string, MwVideo>> };
const VIDEOS = videosJson as Record<string, MwExercise>;

function ExerciseCard({ e, gender, lang, token, t }: { e: RetoExercise; gender: "male" | "female"; lang: Lang; token: string | null; t: { how: string; gym: string; home: string; side: string; breathing: string; mistake: string; feel: string } }) {
  const ids = e.mw ? (e.mw[0] === e.mw[1] ? [e.mw[0]] : e.mw) : [];
  const variants = ids.map((id, i) => ({ id, label: ids.length > 1 ? (i === 0 ? t.gym : t.home) : null, x: VIDEOS[String(id)] })).filter((v) => v.x);
  const steps = variants[0]?.x.steps[lang] ?? variants[0]?.x.steps.en ?? [];
  const cue = variants[0]?.x.cues?.[lang] ?? variants[0]?.x.cues?.en;
  return (
    <li className="py-3" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="flex justify-between gap-3"><span className="font-semibold">{e.name}</span><span className="num faint whitespace-nowrap">{e.sets} × {e.reps}</span></div>
      {variants.length > 0 && (
        <div className={`grid gap-3 mt-2 ${variants.length > 1 ? "grid-cols-2" : "grid-cols-1 max-w-[260px]"}`}>
          {variants.map((v) => {
            const g = v.x.videos[gender] ?? v.x.videos.male ?? {};
            const front = g.front, side = g.side;
            if (!front) return null;
            return (
              <div key={v.id}>
                <video controls playsInline preload="none" muted loop className="w-full rounded-xl" style={{ background: "#000", aspectRatio: "1 / 1" }} poster={front.poster ? withToken(front.poster, token) : undefined} src={withToken(front.url, token)} />
                <div className="flex justify-between text-xs mt-1">
                  <span className="faint">{v.label ?? v.x.name}</span>
                  {side && <a href={withToken(side.url, token)} target="_blank" rel="noreferrer" className="underline" style={{ color: "var(--sage)" }}>{t.side} ↗</a>}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {cue && (
        <div className="mt-2 text-sm space-y-1">
          <p><span className="font-semibold" style={{ color: "var(--sage)" }}>{t.breathing}:</span> <span className="muted">{cue.breathing}</span></p>
          <p><span className="font-semibold" style={{ color: "var(--fucsia)" }}>{t.mistake}:</span> <span className="muted">{cue.mistake}</span></p>
          <p><span className="font-semibold" style={{ color: "#BA8E54" }}>{t.feel}:</span> <span className="muted">{cue.feel}</span></p>
        </div>
      )}
      {steps.length > 0 && (
        <details className="mt-2 text-sm">
          <summary className="cursor-pointer" style={{ color: "var(--sage)" }}>{t.how}</summary>
          <ol className="list-decimal pl-5 mt-1 space-y-1 muted">{steps.map((s) => <li key={s}>{s}</li>)}</ol>
        </details>
      )}
    </li>
  );
}

export default async function RetoDashboard({ searchParams }: { searchParams: Promise<{ track?: string; day?: string }> }) {
  const [user, { lang }, sp] = await Promise.all([requireUser(), tr(), searchParams]);
  const t = RETO[lang];
  const staff = user.role === "coach" || isAdmin(user);
  let p = retoProgress(user.reto_start);
  let preview = false;

  if (!p && staff) {
    preview = true;
    const day = Math.min(30, Math.max(1, Number(sp.day) || 1));
    p = { day, week: Math.min(4, Math.ceil(day / 7)), done: false, pct: Math.round((day / 30) * 100), end: new Date(Date.now() + (30 - day + 1) * 86400000) };
  }

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

  const track = trackOf(preview ? sp.track : user.reto_track);
  const weekText = t.weeks[p.week - 1];
  const habits = RETO_HABITS[p.week - 1][lang];
  const training = RETO_TRAINING[track];
  const meals = RETO_MEALS[track];
  const sup = RETO_SUPPLEMENTS[lang];
  const token = await mediaToken();
  const gender = track === "hombre" ? "male" : "female";

  return (
    <AppShell title={t.app.title} kicker={t.app.kicker}>
      {preview && (
        <div className="card p-4 mb-5 flex flex-wrap items-center justify-between gap-3" style={{ borderColor: "#BA8E54" }}>
          <span className="text-sm" style={{ color: "#BA8E54" }}>Vista previa (coach/admin) — así lo ve una persona en el día {p.day}. Nada se guarda en tu cuenta.</span>
          <div className="flex gap-2 text-xs">
            <Link href="/dashboard/reto?track=mujer" className={`pill ${track === "mujer" ? "pill-f" : ""}`}>♀ Mujer</Link>
            <Link href="/dashboard/reto?track=hombre" className={`pill ${track === "hombre" ? "pill-f" : ""}`}>♂ Hombre</Link>
            <Link href={`/dashboard/reto?track=${track}&day=8`} className="pill">Día 8</Link>
            <Link href={`/dashboard/reto?track=${track}&day=30`} className="pill">Día 30</Link>
          </div>
        </div>
      )}
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
              <div className="flex items-baseline justify-between mb-2"><span className="pill pill-f">{d.day[lang]}</span><span className="display">{d.focus[lang]}</span></div>
              <ul className="text-sm">
                {d.exercises.map((e, i) => <ExerciseCard key={`${e.name}-${i}`} e={e} gender={gender} lang={lang} token={token} t={t.app} />)}
              </ul>
            </div>
          ))}
        </div>
        <p className="faint text-xs mt-3">{t.app.videoBy}</p>
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
