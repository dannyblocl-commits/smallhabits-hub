import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PLANS, getPlan, stripeLink } from "@/lib/plan";

export default async function Upgrade() {
  const current = await getPlan();

  return (
    <AppShell title="Elige tu plan">
      <p className="text-[#6B6560] mb-8 max-w-2xl">
        Lo gratis se queda gratis siempre. Los planes desbloquean todo el contenido, la IA y el acompañamiento de Maleja.
        El acceso se activa solo cuando Stripe confirma el pago.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {(["basico", "pro", "elite"] as const).map((key) => {
          const p = PLANS[key];
          const link = stripeLink(key);
          const active = current === key;
          const highlight = key === "pro";
          return (
            <div key={key} className={`bg-white rounded-2xl p-7 border-2 relative ${highlight ? "border-[#A67C5B] shadow-lg" : "border-[#E0D5C8]"}`}>
              {highlight && <span className="absolute -top-3 left-6 bg-[#A67C5B] text-white text-xs font-bold px-3 py-1 rounded-full">MÁS ELEGIDO</span>}
              {active && <span className="absolute -top-3 right-6 bg-[#6B8F71] text-white text-xs font-bold px-3 py-1 rounded-full">TU PLAN</span>}
              <h2 className="text-3xl font-semibold text-[#2C2C2C]">{p.name}</h2>
              <p className="text-sm text-[#6B6560] mb-4">{p.tagline}</p>
              <div className="text-4xl font-bold text-[#A67C5B] mb-6">{p.price}<span className="text-base text-[#6B6560] font-normal">/mes</span></div>
              <ul className="space-y-2 mb-8 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-[#2C2C2C]"><span className="text-[#6B8F71]">✓</span>{f}</li>
                ))}
              </ul>
              {link ? (
                <a href={link} className={`block text-center py-3 rounded-full font-semibold transition ${highlight ? "bg-[#A67C5B] hover:bg-[#C9A882] text-white" : "bg-[#6B8F71] hover:bg-[#5a7a61] text-white"}`}>
                  Suscribirme con Stripe
                </a>
              ) : (
                <div className="text-center py-3 rounded-full bg-[#EDE6DC] text-[#6B6560] text-sm">Link de pago pendiente de configurar</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 bg-[#EDE6DC] rounded-2xl p-6 border border-[#E0D5C8]">
        <h3 className="font-semibold text-[#2C2C2C] mb-2">Modo demostración (para presentaciones)</h3>
        <p className="text-sm text-[#6B6560] mb-4">Cambia el plan sin pagar para mostrar cómo se ve la app en cada nivel. En producción esto se desactiva.</p>
        <div className="flex flex-wrap gap-2">
          {(["free", "basico", "pro", "elite"] as const).map((k) => (
            <Link key={k} href={`/api/plan?plan=${k}`} className={`px-4 py-2 rounded-full text-sm font-medium transition ${current === k ? "bg-[#6B8F71] text-white" : "bg-white text-[#2C2C2C] hover:bg-[#C8D5C0]"}`}>
              Ver como {k === "free" ? "Gratis" : PLANS[k].name}
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
