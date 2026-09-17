import { AppShell, Locked } from "@/components/AppShell";
import { FoodTracker } from "@/components/FoodTracker";
import { getPlan, hasPlan } from "@/lib/plan";

export default async function Food() {
  const plan = await getPlan();
  return (
    <AppShell title="Registro de comidas">
      <p className="text-[#6B6560] mb-6">Registro manual gratis. Sube una foto y la IA calcula calorías y macros desde el plan Básico. Los valores son estimados.</p>
      <FoodTracker aiEnabled={hasPlan(plan, "basico")} />
      <div className="mt-6">
        <Locked plan={plan} requires="basico" feature="Historial de 30 días">
          <div className="bg-white rounded-2xl p-6 border border-[#E0D5C8]">
            <h3 className="font-semibold text-[#2C2C2C] mb-1">Últimos 30 días</h3>
            <p className="text-sm text-[#6B6560]">Promedio 1.720 kcal · 128g proteína · Tendencia −0,4 kg/semana · Mejor día: martes</p>
          </div>
        </Locked>
      </div>
    </AppShell>
  );
}
