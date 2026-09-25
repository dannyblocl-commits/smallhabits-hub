import { AppShell } from "@/components/AppShell";
import { TicketForm } from "@/components/TicketForm";
import { requireUser } from "@/lib/auth";
import { hasPlan } from "@/lib/plan";
import { tr } from "@/lib/i18n";
import { listMyTickets } from "@/app/actions/tickets";

export default async function Tickets() {
  const [user, { L }] = await Promise.all([requireUser(), tr()]);
  const tickets = await listMyTickets();
  return (
    <AppShell title={L.tickets.title} kicker={L.tickets.kicker}>
      <TicketForm priority={hasPlan(user.plan, "elite")} tickets={tickets} L={L.tickets} />
    </AppShell>
  );
}
