import { AppShell, Locked } from "@/components/AppShell";
import { FoodTracker } from "@/components/FoodTracker";
import { getPlan, hasPlan } from "@/lib/plan";

export default async function Food() {
  const plan = await getPlan();
  return (
    <AppShell title="Comidas" kicker="Registro manual gratis · foto con IA desde Básico">
      <FoodTracker aiEnabled={hasPlan(plan, "basico")} />
      <div className="mt-4">
        <Locked plan={plan} requires="basico" feature="Historial de 30 días">
          <div className="card p-5"><div className="eyebrow" style={{ color: "var(--sage)" }}>Últimos 30 días</div><p className="muted text-sm mt-1">Promedio 1.720 kcal · 128g proteína · Tendencia −0,4 kg/semana · Mejor día: martes</p></div>
        </Locked>
      </div>
    </AppShell>
  );
}
