import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PLANS, getPlan, stripeLink } from "@/lib/plan";

export default async function Upgrade() {
  const current = await getPlan();
  return (
    <AppShell title="Planes" kicker="Lo gratis se queda gratis. El pago se activa solo cuando Stripe lo confirma.">
      <div className="grid md:grid-cols-3 gap-4">
        {(["basico", "pro", "elite"] as const).map((key) => {
          const p = PLANS[key]; const link = stripeLink(key); const active = current === key; const hl = key === "pro";
          return (
            <div key={key} className={`card p-6 relative ${hl ? "lift ring-1 ring-[var(--fucsia)]" : ""} ${key === "elite" ? "ring-1 ring-[rgba(217,183,124,.4)]" : ""}`}>
              {hl && <span className="pill pill-f absolute -top-3 left-5">Más elegido</span>}
              {key === "elite" && <span className="pill pill-g absolute -top-3 left-5">Transformación guiada</span>}
              {active && <span className="pill pill-s absolute -top-3 right-5">Tu plan</span>}
              <h2 className="text-3xl">{p.name}</h2>
              <p className="muted text-sm">{p.tagline}</p>
              <div className="num text-4xl my-4" style={{ color: hl ? "var(--fucsia)" : key === "elite" ? "var(--gold)" : "var(--text)" }}>{p.price}<span className="text-sm muted font-normal"> /mes</span></div>
              <ul className="space-y-2 text-sm muted mb-6">{p.features.map((f) => <li key={f} className="flex gap-2"><span style={{ color: "var(--sage)" }}>·</span>{f}</li>)}</ul>
              {link ? <a href={link} className={`btn w-full ${hl ? "btn-go" : "btn-balance"}`}>Suscribirme con Stripe</a> : <div className="row p-3 text-center text-xs faint">Link de pago pendiente</div>}
            </div>
          );
        })}
      </div>
      <div className="card p-5 mt-6">
        <div className="eyebrow">Modo demostración</div>
        <p className="muted text-sm mt-1 mb-3">Cambia el plan sin pagar para mostrar cómo se ve la app en cada nivel. En producción se desactiva.</p>
        <div className="flex flex-wrap gap-2">
          {(["free", "basico", "pro", "elite"] as const).map((k) => (
            <Link key={k} href={`/api/plan?plan=${k}`} className={`btn btn-sm ${current === k ? "btn-go" : "btn-ghost"}`}>Ver como {k === "free" ? "Gratis" : PLANS[k].name}</Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
