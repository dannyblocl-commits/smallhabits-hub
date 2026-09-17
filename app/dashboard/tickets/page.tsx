import { AppShell } from "@/components/AppShell";
import { TicketForm } from "@/components/TicketForm";
import { requireUser } from "@/lib/auth";
import { hasPlan } from "@/lib/plan";
import { tr } from "@/lib/i18n";

export default async function Tickets() {
  const [user, { L }] = await Promise.all([requireUser(), tr()]);
  return (
    <AppShell title={L.tickets.title} kicker={L.tickets.kicker}>
      <TicketForm priority={hasPlan(user.plan, "elite")} L={L.tickets} />
    </AppShell>
  );
}
