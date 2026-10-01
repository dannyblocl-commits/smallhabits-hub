import { AppShell } from "@/components/AppShell";
import { PLANS, ANNUAL, stripeLink } from "@/lib/plan";
import { BillingToggle } from "@/components/BillingToggle";
import { fill } from "@/lib/i18n";
import { requireUser } from "@/lib/auth";
import { tr } from "@/lib/i18n";

export default async function Upgrade({ searchParams }: { searchParams: Promise<{ anual?: string }> }) {
  const [user, { L }, sp] = await Promise.all([requireUser(), tr(), searchParams]);
  const yearly = sp.anual === "1";
  const current = user.plan;
  return (
    <AppShell tab="/dashboard/upgrade" title={L.upgrade.title} kicker={L.upgrade.kicker}>
      <div className="mb-6"><BillingToggle yearly={yearly} base="/dashboard/upgrade" labels={[L.upgrade.mensual, L.upgrade.anual]} save={fill(L.upgrade.ahorra, ANNUAL.basico.save)} /></div>
      <div className="grid md:grid-cols-3 gap-4">
        {(["basico", "pro", "elite"] as const).map((key) => {
          const p = PLANS[key]; const t = L.plans[key]; const yr = yearly && key !== "elite" ? ANNUAL[key] : null; const link = yr ? yr.link : stripeLink(key); const active = current === key; const hl = key === "pro";
          return (
            <div key={key} className={`card p-6 relative ${hl ? "lift ring-1 ring-[var(--fucsia)]" : ""} ${key === "elite" ? "ring-1 ring-[rgba(217,183,124,.4)]" : ""}`}>
              {hl && <span className="pill pill-f absolute -top-3 left-5">{L.upgrade.masElegido}</span>}
              {key === "elite" && <span className="pill pill-g absolute -top-3 left-5">{L.upgrade.elite}</span>}
              {active && <span className="pill pill-s absolute -top-3 right-5">{L.upgrade.tuPlan}</span>}
              <h2 className="text-3xl">{p.name}</h2>
              <p className="muted text-sm">{t.tagline}</p>
              <div className="num text-4xl mt-4" style={{ color: hl ? "var(--fucsia)" : key === "elite" ? "var(--gold)" : "var(--text)" }}>{yr ? yr.price : p.price}<span className="text-sm muted font-normal"> {yr ? L.upgrade.alAnio : L.common.mes}</span></div>
              <div className="faint text-xs mb-4 h-4">{yr ? fill(L.upgrade.equivale, yr.perMonth) : yearly && key === "elite" ? L.upgrade.soloMensual : ""}</div>
              <ul className="space-y-2 text-sm muted mb-6">{t.features.map((f) => <li key={f} className="flex gap-2"><span style={{ color: "var(--sage)" }}>·</span>{f}</li>)}</ul>
              {link ? <a href={link} className={`btn w-full ${hl ? "btn-go" : "btn-balance"}`}>{L.upgrade.suscribir}</a> : <div className="row p-3 text-center text-xs faint">{L.upgrade.pendiente}</div>}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
