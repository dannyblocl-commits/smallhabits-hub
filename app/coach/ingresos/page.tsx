import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { stripe } from "@/lib/stripe-sync";
import { planFromPrice, PLANS, RETO_PRICE } from "@/lib/plan";

const usd = (cents: number) => `$${(cents / 100).toFixed(2)}`;
const ESTADO: Record<string, string> = { active: "activa", trialing: "en prueba", past_due: "pago pendiente", succeeded: "cobrado", canceled: "cancelada", unpaid: "impagada" };
const concepto = (desc: string | null, amount: number) => {
  const d = (desc || "").toLowerCase();
  if (d.includes("reto") || amount === 4900) return "Reto 30 días";
  if (d.includes("subscription creation")) return "Nueva suscripción";
  if (d.includes("subscription update")) return "Cambio de suscripción";
  if (d.includes("subscription")) return "Renovación de suscripción";
  return desc || "Suscripción";
};
const emailOf = (c: unknown) => (c && typeof c === "object" && "email" in c && !(c as { deleted?: boolean }).deleted ? String((c as { email?: string | null }).email ?? "—") : "—");
const fmt = (unix: number) => new Date(unix * 1000).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" });

export default async function CoachIngresos() {
  await requireStaff();
  if (!process.env.STRIPE_SECRET_KEY) return <div className="p-6">Stripe no configurado.</div>;
  const s = stripe();
  const since30 = Math.floor(Date.now() / 1000) - 30 * 86400;

  let subs: Awaited<ReturnType<typeof s.subscriptions.list>>["data"] = [];
  let intents: Awaited<ReturnType<typeof s.paymentIntents.list>>["data"] = [];
  let warn = "";
  try {
    const [a, b] = await Promise.all([
      s.subscriptions.list({ status: "active", limit: 100, expand: ["data.customer"] }),
      s.paymentIntents.list({ limit: 100, created: { gte: Math.floor(Date.now() / 1000) - 90 * 86400 }, expand: ["data.customer"] }),
    ]);
    subs = a.data; intents = b.data;
  } catch (e) {
    warn = e instanceof Error ? e.message : "No se pudo leer Stripe";
  }

  const active = subs.filter((x) => ["active", "trialing", "past_due"].includes(x.status));
  const byPlan: Record<string, number> = { basico: 0, pro: 0, elite: 0 };
  let mrr = 0;
  for (const x of active) {
    const item = x.items.data[0];
    const plan = planFromPrice(item?.price.id);
    if (plan !== "free") byPlan[plan] = (byPlan[plan] ?? 0) + 1;
    mrr += (item?.price.unit_amount ?? 0) * (item?.quantity ?? 1);
  }

  const paid = intents.filter((c) => c.status === "succeeded");
  const last30 = paid.filter((c) => c.created >= since30).reduce((a, c) => a + c.amount_received, 0);
  const last90 = paid.reduce((a, c) => a + c.amount_received, 0);
  const retoCount = paid.filter((c) => (c.description || "").toLowerCase().includes("reto") || c.metadata?.price === RETO_PRICE).length;

  return (
    <div className="min-h-screen px-5 py-6" style={{ background: "var(--obsidian)", color: "var(--text)" }}>
      <div className="max-w-5xl mx-auto">
        <Link href="/coach" style={{ color: "var(--fucsia)" }}>← Volver</Link>
        <h1 className="text-3xl mt-3 mb-1">💰 Ingresos</h1>
        <p className="muted text-sm mb-6">Datos reales de Stripe, en vivo. Lo que se cobra en Farmasi no aparece aquí.</p>
        {warn && <div className="card p-4 mb-6 text-sm" style={{ borderColor: "var(--fucsia)" }}>Stripe no dejó leer parte de los datos: <span className="muted">{warn}</span></div>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            ["Ingreso mensual recurrente", usd(mrr), "var(--fucsia)"],
            ["Suscripciones activas", String(active.length), "var(--sage)"],
            ["Cobrado últimos 30 días", usd(last30), ""],
            ["Cobrado últimos 90 días", usd(last90), ""],
          ].map(([l, v, c]) => (
            <div key={l} className="row p-4"><div className="eyebrow">{l}</div><div className="num text-2xl mt-1" style={c ? { color: c } : undefined}>{v}</div></div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="card p-5">
            <div className="eyebrow mb-2">Suscripciones por plan</div>
            {(["basico", "pro", "elite"] as const).map((p) => (
              <div key={p} className="flex justify-between py-1 text-sm"><span>{PLANS[p].name} <span className="faint">({PLANS[p].price}/mes)</span></span><span className="num">{byPlan[p]}</span></div>
            ))}
            <div className="flex justify-between py-1 text-sm mt-2" style={{ borderTop: "1px solid var(--line)" }}><span>Retos de 30 días cobrados (90 días)</span><span className="num">{retoCount}</span></div>
          </div>
          <div className="card p-5">
            <div className="eyebrow mb-2">Suscriptores activos</div>
            {active.length === 0 && <p className="muted text-sm">Ninguno todavía.</p>}
            {active.map((x) => {
              const c = typeof x.customer === "string" ? null : (x.customer as { email?: string | null; deleted?: boolean });
              const item = x.items.data[0];
              return (
                <div key={x.id} className="flex justify-between py-1 text-sm gap-3">
                  <span className="truncate">{c && !c.deleted ? c.email : "—"}</span>
                  <span className="num whitespace-nowrap">{PLANS[planFromPrice(item?.price.id) as "basico" | "pro" | "elite"]?.name ?? "—"} · {usd(item?.price.unit_amount ?? 0)}/mes · {ESTADO[x.status] ?? x.status}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card overflow-x-auto">
          <div className="eyebrow p-4 pb-0">Últimos cobros (90 días)</div>
          <table className="w-full text-sm">
            <thead><tr className="text-left" style={{ color: "var(--text-3)" }}>{["Fecha", "Cliente", "Concepto", "Importe", "Estado"].map((h) => <th key={h} className="px-4 py-3 eyebrow font-semibold">{h}</th>)}</tr></thead>
            <tbody>
              {paid.length === 0 && <tr><td className="px-4 py-4 muted" colSpan={5}>Sin cobros en los últimos 90 días.</td></tr>}
              {paid.slice(0, 50).map((c) => (
                <tr key={c.id} style={{ borderTop: "1px solid var(--line)" }}>
                  <td className="px-4 py-2 muted">{fmt(c.created)}</td>
                  <td className="px-4 py-2">{c.receipt_email || emailOf(c.customer)}</td>
                  <td className="px-4 py-2 muted">{concepto(c.description, c.amount_received)}</td>
                  <td className="px-4 py-2 num">{usd(c.amount_received)}</td>
                  <td className="px-4 py-2"><span className="pill pill-s">{ESTADO[c.status] ?? c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="faint text-xs mt-3">Panel completo, reembolsos y facturas: <a href="https://dashboard.stripe.com/payments" target="_blank" rel="noreferrer" className="underline">dashboard.stripe.com</a>.</p>
      </div>
    </div>
  );
}
