import { AppShell, Locked } from "@/components/AppShell";
import { FoodTracker } from "@/components/FoodTracker";
import { requireUser } from "@/lib/auth";
import { hasPlan } from "@/lib/plan";
import { tr } from "@/lib/i18n";
import { listFoodToday } from "@/app/actions/food";

const goalKcal: Record<string, number> = { "Perder peso": 1500, Tonificar: 1800, "Ganar fuerza": 2600, Resistencia: 2200, Flexibilidad: 1900, "Salud integral": 1900 };

export default async function Food() {
  const [user, { L }] = await Promise.all([requireUser(), tr()]);
  const entries = await listFoodToday();
  return (
    <AppShell title={L.food.title} kicker={L.food.kicker}>
      <FoodTracker aiEnabled={hasPlan(user.plan, "basico")} initial={entries} goal={goalKcal[user.goal] ?? 1800} L={L.food} gratis={L.common.gratis} premium={L.common.premium} />
      <div className="mt-4">
        <Locked plan={user.plan} requires="basico" feature={L.food.hist30} L={L}>
          <div className="card p-5"><div className="eyebrow" style={{ color: "var(--sage)" }}>{L.food.ult30}</div><p className="muted text-sm mt-1">{L.food.histText}</p></div>
        </Locked>
      </div>
    </AppShell>
  );
}
