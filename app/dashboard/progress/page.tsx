import { AppShell, Locked } from "@/components/AppShell";
import { getPlan } from "@/lib/plan";

const weight = [66.2, 66.0, 65.8, 65.9, 65.5, 65.3, 65.0, 64.8];
const kcal = [1720, 1650, 1810, 1590, 1700, 1760, 1680];
const days = ["L", "M", "X", "J", "V", "S", "D"];

function Bars({ data, max, color }: { data: number[]; max: number; color: string }) {
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-md" style={{ height: `${(v / max) * 100}%`, background: color }} />
          <span className="text-[10px] text-[#6B6560]">{days[i] ?? ""}</span>
        </div>
      ))}
    </div>
  );
}

export default async function Progress() {
  const plan = await getPlan();

  return (
    <AppShell title="Mi progreso">
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-[#E0D5C8]"><div className="text-xs text-[#6B6560] uppercase">Peso actual</div><div className="text-3xl font-bold text-[#6B8F71]">64.8 kg</div><div className="text-xs text-[#6B6560]">−1.4 kg en 8 semanas</div></div>
        <div className="bg-white rounded-xl p-5 border border-[#E0D5C8]"><div className="text-xs text-[#6B6560] uppercase">Racha</div><div className="text-3xl font-bold text-[#A67C5B]">12 días</div><div className="text-xs text-[#6B6560]">Mejor racha: 19</div></div>
        <div className="bg-white rounded-xl p-5 border border-[#E0D5C8]"><div className="text-xs text-[#6B6560] uppercase">Entrenos totales</div><div className="text-3xl font-bold text-[#B8956A]">27</div><div className="text-xs text-[#6B6560]">Desde que empezaste</div></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E0D5C8]">
          <h2 className="text-xl font-semibold text-[#2C2C2C] mb-4">Peso (8 semanas)</h2>
          <Bars data={weight.map((w) => w - 60)} max={7} color="#6B8F71" />
        </div>
        <Locked plan={plan} requires="basico" feature="Calorías y macros semanales">
          <div className="bg-white rounded-2xl p-6 border border-[#E0D5C8]">
            <h2 className="text-xl font-semibold text-[#2C2C2C] mb-4">Calorías (esta semana)</h2>
            <Bars data={kcal} max={2000} color="#A67C5B" />
          </div>
        </Locked>
      </div>

      <Locked plan={plan} requires="pro" feature="Apple Watch y Garmin">
        <div className="bg-white rounded-2xl p-6 border-2 border-[#C8D5C0]">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <h2 className="text-xl font-semibold text-[#2C2C2C]">⌚ Reloj conectado</h2>
            <div className="flex gap-2">
              <button className="bg-[#2C2C2C] text-white px-4 py-2 rounded-full text-sm font-medium"> Apple Watch</button>
              <button className="bg-[#EDE6DC] text-[#2C2C2C] px-4 py-2 rounded-full text-sm font-medium">Garmin Connect</button>
            </div>
          </div>
          <div className="grid sm:grid-cols-4 gap-3">
            <div className="bg-[#FAFAF7] rounded-xl p-4 text-center"><div className="text-2xl">👟</div><div className="text-2xl font-bold text-[#2C2C2C]">6.842</div><div className="text-xs text-[#6B6560]">pasos hoy</div></div>
            <div className="bg-[#FAFAF7] rounded-xl p-4 text-center"><div className="text-2xl">❤️</div><div className="text-2xl font-bold text-[#2C2C2C]">68</div><div className="text-xs text-[#6B6560]">bpm reposo</div></div>
            <div className="bg-[#FAFAF7] rounded-xl p-4 text-center"><div className="text-2xl">🔥</div><div className="text-2xl font-bold text-[#2C2C2C]">412</div><div className="text-xs text-[#6B6560]">kcal activas</div></div>
            <div className="bg-[#FAFAF7] rounded-xl p-4 text-center"><div className="text-2xl">😴</div><div className="text-2xl font-bold text-[#2C2C2C]">7h 20m</div><div className="text-xs text-[#6B6560]">sueño</div></div>
          </div>
          <p className="text-xs text-[#6B6560] mt-4">Integración vía Apple HealthKit y Garmin Connect API. Los datos se sincronizan cada 15 minutos.</p>
        </div>
      </Locked>
    </AppShell>
  );
}
