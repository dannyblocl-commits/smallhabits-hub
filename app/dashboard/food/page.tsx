import { AppShell, Locked } from "@/components/AppShell";
import { FoodTracker } from "@/components/FoodTracker";
import { requireUser } from "@/lib/auth";
import { hasPlan } from "@/lib/plan";
import { listFoodToday } from "@/app/actions/food";

const goalKcal: Record<string, number> = { "Perder peso": 1500, Tonificar: 1800, "Ganar fuerza": 2600, Resistencia: 2200, Flexibilidad: 1900, "Salud integral": 1900 };

export default async function Food() {
  const user = await requireUser();
  const entries = await listFoodToday();
  return (
    <AppShell title="Comidas" kicker="Registro manual gratis · foto con IA desde Básico">
      <FoodTracker aiEnabled={hasPlan(user.plan, "basico")} initial={entries} goal={goalKcal[user.goal] ?? 1800} />
      <div className="mt-4">
        <Locked plan={user.plan} requires="basico" feature="Historial de 30 días">
          <div className="card p-5"><div className="eyebrow" style={{ color: "var(--sage)" }}>Últimos 30 días</div><p className="muted text-sm mt-1">Promedio, proteína y tendencia semanal aparecen aquí a partir de tu segundo día de registro.</p></div>
        </Locked>
      </div>
    </AppShell>
  );
}
