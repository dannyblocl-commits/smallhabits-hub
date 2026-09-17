import { AppShell } from "@/components/AppShell";
import { TicketForm } from "@/components/TicketForm";
import { getPlan, hasPlan } from "@/lib/plan";

export default async function Tickets() {
  const plan = await getPlan();
  return (
    <AppShell title="Soporte" kicker="Gratis para todos · prioridad en Elite">
      <TicketForm priority={hasPlan(plan, "elite")} />
    </AppShell>
  );
}
