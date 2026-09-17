import { AppShell, Badge, Locked } from "@/components/AppShell";
import { VideoCard } from "@/components/VideoCard";
import { demoRoutines } from "@/data/routines";
import { getPlan } from "@/lib/plan";

const FREE_IDS = ["routine_1", "routine_5"];

export default async function Routines({ searchParams }: { searchParams: Promise<{ r?: string }> }) {
  const plan = await getPlan();
  const { r } = await searchParams;
  const selected = demoRoutines.find((x) => x.id === r) || demoRoutines[0];
  const isFree = FREE_IDS.includes(selected.id);

  return (
    <AppShell title="Entrenar">
      <p className="text-[#6B6560] mb-6">2 rutinas completas gratis. El resto se desbloquea desde el plan Básico. Los videos son avatares de ejemplo: cada persona entrena bajo su propia responsabilidad.</p>

      <div className="grid lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1 space-y-3">
          {demoRoutines.map((x) => {
            const free = FREE_IDS.includes(x.id);
            const active = x.id === selected.id;
            return (
              <a key={x.id} href={`/dashboard/routines?r=${x.id}`} className={`block bg-white rounded-xl p-4 border-2 transition ${active ? "border-[#6B8F71]" : "border-[#E0D5C8] hover:border-[#C8D5C0]"}`}>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="font-semibold text-[#2C2C2C]">{x.name}</div>
                    <div className="text-xs text-[#6B6560]">{x.duration_minutes} min · {x.exercises.length} ejercicios · {x.type}</div>
                  </div>
                  <Badge free={free} />
                </div>
              </a>
            );
          })}
        </aside>

        <section className="lg:col-span-2">
          <Locked plan={plan} requires={isFree ? "free" : "basico"} feature={`"${selected.name}"`}>
            <div className="bg-white rounded-2xl p-6 border border-[#E0D5C8]">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                <div>
                  <h2 className="text-3xl font-semibold text-[#2C2C2C]">{selected.name}</h2>
                  <p className="text-[#6B6560]">{selected.description}</p>
                </div>
                <span className="bg-[#EDE6DC] text-[#2C2C2C] text-xs font-bold px-3 py-1 rounded-full">{selected.difficulty.toUpperCase()}</span>
              </div>

              <VideoCard src={`/videos/${selected.id}.mp4`} title={`Demo avatar: ${selected.name}`} emoji="🏋️" />

              <div className="mt-6 space-y-4">
                {selected.exercises.map((e, i) => (
                  <div key={e.id} className="border border-[#E0D5C8] rounded-xl p-4">
                    <div className="font-semibold text-[#2C2C2C]">{i + 1}. {e.name}</div>
                    <div className="text-sm text-[#6B6560] mb-3">{e.description}</div>
                    <div className="grid grid-cols-4 gap-2 text-center text-sm">
                      <div className="bg-[#FAFAF7] rounded-lg p-2"><div className="text-[10px] text-[#6B6560]">SERIES</div><div className="font-bold text-[#6B8F71]">{e.sets}</div></div>
                      <div className="bg-[#FAFAF7] rounded-lg p-2"><div className="text-[10px] text-[#6B6560]">REPS</div><div className="font-bold text-[#6B8F71]">{e.reps}</div></div>
                      <div className="bg-[#FAFAF7] rounded-lg p-2"><div className="text-[10px] text-[#6B6560]">DESCANSO</div><div className="font-bold text-[#6B8F71]">{e.rest_seconds}s</div></div>
                      <div className="bg-[#FAFAF7] rounded-lg p-2"><div className="text-[10px] text-[#6B6560]">MÚSCULOS</div><div className="text-xs text-[#A67C5B] font-medium">{e.muscle_groups.slice(0, 2).join(", ")}</div></div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 bg-[#A67C5B] hover:bg-[#C9A882] text-white py-3 rounded-full font-semibold transition">▶ Comenzar entrenamiento</button>
              <p className="text-xs text-[#6B6560] text-center mt-3">Realiza los ejercicios bajo tu responsabilidad. Detente ante cualquier dolor.</p>
            </div>
          </Locked>
        </section>
      </div>
    </AppShell>
  );
}
