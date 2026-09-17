import { AppShell } from "@/components/AppShell";
import { TicketForm } from "@/components/TicketForm";
import { getPlan, hasPlan } from "@/lib/plan";

export default async function Tickets() {
  const plan = await getPlan();
  return (
    <AppShell title="Soporte">
      <p className="text-[#6B6560] mb-6">Abre un ticket y Maleja o su equipo te responde. Gratis para todos; los planes Elite tienen prioridad.</p>
      <TicketForm priority={hasPlan(plan, "elite")} />
    </AppShell>
  );
}
