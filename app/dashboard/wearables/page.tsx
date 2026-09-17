import Link from "next/link";
import { AppShell, Locked } from "@/components/AppShell";
import { requireUser } from "@/lib/auth";
import { tr, locale } from "@/lib/i18n";
import { hasPlan } from "@/lib/plan";
import { wearableStatus, syncNow, disconnect } from "@/app/actions/wearables";

export default async function Wearables({ searchParams }: { searchParams: Promise<{ connected?: string; error?: string; synced?: string; warn?: string }> }) {
  const [user, { lang, L }] = await Promise.all([requireUser(), tr()]);
  const sp = await searchParams;
  const s = await wearableStatus();
  const pro = hasPlan(user.plan, "pro");
  const W = L.wearables;
  const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleString(locale(lang), { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—");
  const h = (m: number | null) => (m == null ? "—" : `${Math.floor(m / 60)}h ${m % 60}m`);

  return (
    <AppShell title={W.title} kicker={W.kicker}>
      {sp.connected && <div className="row p-4 mb-4 text-sm" style={{ borderColor: "var(--sage)" }}>{W.connectedMsg} {sp.warn ? `· ${W.noDataYet}` : ""}</div>}
      {sp.error && <div className="row p-4 mb-4 text-sm" style={{ color: "#FF8A8A" }}>{W.errorMsg} ({sp.error})</div>}

      <Locked plan={user.plan} requires="pro" feature={W.feature} L={L}>
        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <div className={`card p-6 ${s.google ? "lift-sage" : ""}`}>
            <div className="flex items-center justify-between"><div className="eyebrow" style={{ color: "var(--sage)" }}>Google Health</div>{s.google ? <span className="pill pill-s">{W.connected}</span> : <span className="pill">{W.notConnected}</span>}</div>
            <h2 className="text-2xl mt-2">Fitbit · Pixel Watch · Wear OS · Android</h2>
            <p className="muted text-sm mt-1">{W.googleText}</p>
            {s.google ? (
              <div className="mt-4 space-y-2">
                <p className="faint text-xs">{W.lastSync}: {fmt(s.google.last_sync)}</p>
                <div className="flex gap-2 flex-wrap">
                  <form action={syncNow}><button className="btn btn-balance btn-sm">{W.syncNow}</button></form>
                  <form action={disconnect}><input type="hidden" name="provider" value="google" /><button className="btn btn-ghost btn-sm">{W.disconnect}</button></form>
                </div>
              </div>
            ) : (
              pro && <Link href="/api/wearables/google/start" className="btn btn-balance mt-4">{W.connectGoogle}</Link>
            )}
          </div>
          <div className="card p-6 opacity-80">
            <div className="flex items-center justify-between"><div className="eyebrow">Garmin</div><span className="pill">{W.soon}</span></div>
            <h2 className="text-2xl mt-2">Garmin Connect</h2>
            <p className="muted text-sm mt-1">{W.garminText}</p>
          </div>
          <div className="card p-6 opacity-80 md:col-span-2">
            <div className="flex items-center justify-between"><div className="eyebrow">Apple Watch</div><span className="pill">{W.soon}</span></div>
            <p className="muted text-sm mt-1">{W.appleText}</p>
          </div>
        </div>

        {s.today && (
          <div className="card p-5 mb-4">
            <div className="eyebrow mb-3" style={{ color: "var(--sage)" }}>{W.todayData} · {s.today.day}</div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[[L.progress.pasos, s.today.steps ?? "—"], [L.progress.bpm, s.today.resting_hr ?? "—"], [L.progress.kcalAct, s.today.active_kcal ?? "—"], [L.progress.sueno, h(s.today.sleep_min)], [L.dash.entrenos, s.today.workouts ?? "—"]].map(([l, v]) => (
                <div key={l as string} className="row p-4 text-center"><div className="num text-2xl">{v}</div><div className="faint text-xs mt-1">{l}</div></div>
              ))}
            </div>
          </div>
        )}
        {s.days.length > 1 && (
          <div className="card p-5 overflow-x-auto">
            <div className="eyebrow mb-3">{W.history}</div>
            <table className="w-full text-sm">
              <thead><tr className="text-left" style={{ color: "var(--text-3)" }}>{[W.day, L.progress.pasos, L.progress.bpm, L.progress.kcalAct, L.progress.sueno, L.dash.entrenos].map((x) => <th key={x} className="px-3 py-2 eyebrow font-semibold">{x}</th>)}</tr></thead>
              <tbody>{s.days.map((d) => (<tr key={d.day} style={{ borderTop: "1px solid var(--line)" }}><td className="px-3 py-2 muted">{d.day}</td><td className="px-3 py-2 num">{d.steps ?? "—"}</td><td className="px-3 py-2 num">{d.resting_hr ?? "—"}</td><td className="px-3 py-2 num">{d.active_kcal ?? "—"}</td><td className="px-3 py-2 num">{h(d.sleep_min)}</td><td className="px-3 py-2 num">{d.workouts ?? "—"}</td></tr>))}</tbody>
            </table>
          </div>
        )}
      </Locked>
      <p className="fine mt-4">{W.privacy}</p>
    </AppShell>
  );
}
