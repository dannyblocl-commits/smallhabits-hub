import { AppShell, Badge, Locked } from "@/components/AppShell";
import { VideoCard } from "@/components/VideoCard";
import { getPlan } from "@/lib/plan";

const sessions = [
  { id: "m_1", free: true, type: "Reflexión del día", icon: "💭", title: "Pequeños hábitos, grandes cambios", min: 5, text: "¿Qué hábito pequeño cumpliste hoy? Anótalo. No importa el tamaño: importa la repetición. Mañana, repítelo una vez más." },
  { id: "m_2", free: true, type: "Worship", icon: "🙏", title: "Gratitud y propósito", min: 8, text: "Respira. Agradece por tu cuerpo, que hoy se movió. Agradece por tu mente, que hoy eligió cuidarse. Pide fuerza para mañana." },
  { id: "m_3", free: false, type: "Meditación", icon: "🧘", title: "Antes de entrenar: enfoque", min: 5, text: "Cierra los ojos. Visualiza tu sesión completa. Cada repetición con intención. Tú eres capaz." },
  { id: "m_4", free: false, type: "Meditación", icon: "☮️", title: "Recuperación post-entreno", min: 8, text: "Tu cuerpo trabajó. Respira lento. Siente cómo el cansancio se vuelve satisfacción. Descansa." },
  { id: "m_5", free: false, type: "Journal", icon: "📔", title: "Diario de la noche", min: 10, text: "Hoy me sentí... Estoy agradecido por... Mañana quiero... Mi pequeño hábito de hoy fue..." },
  { id: "m_6", free: false, type: "Worship", icon: "🕊️", title: "Paz en el presente", min: 6, text: "El pasado no se cambia. El futuro no existe aún. Solo tienes este momento. Entrégalo con paz." },
];

export default async function Mindfulness({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const plan = await getPlan();
  const { s } = await searchParams;
  const sel = sessions.find((x) => x.id === s) || sessions[0];

  return (
    <AppShell title="Paz mental">
      <p className="text-[#6B6560] mb-6">Reflexión diaria y worship gratis. Meditaciones guiadas y journal desde el plan Básico.</p>

      <div className="grid lg:grid-cols-3 gap-6">
        <aside className="space-y-3">
          {sessions.map((x) => (
            <a key={x.id} href={`/dashboard/mindfulness?s=${x.id}`} className={`block bg-white rounded-xl p-4 border-2 transition ${x.id === sel.id ? "border-[#6B8F71]" : "border-[#E0D5C8] hover:border-[#C8D5C0]"}`}>
              <div className="flex justify-between items-start gap-2">
                <div className="flex gap-3">
                  <span className="text-2xl">{x.icon}</span>
                  <div>
                    <div className="font-semibold text-[#2C2C2C] text-sm">{x.title}</div>
                    <div className="text-xs text-[#6B6560]">{x.type} · {x.min} min</div>
                  </div>
                </div>
                <Badge free={x.free} />
              </div>
            </a>
          ))}
        </aside>

        <section className="lg:col-span-2">
          <Locked plan={plan} requires={sel.free ? "free" : "basico"} feature={`"${sel.title}"`}>
            <div className="bg-white rounded-2xl p-8 border border-[#E0D5C8] text-center">
              <div className="text-6xl mb-3">{sel.icon}</div>
              <div className="text-xs tracking-widest text-[#A67C5B] font-bold">{sel.type.toUpperCase()} · {sel.min} MIN</div>
              <h2 className="text-3xl font-semibold text-[#2C2C2C] mt-2 mb-6">{sel.title}</h2>

              <VideoCard src={`/videos/${sel.id}.mp4`} title={`Avatar guía: ${sel.title}`} emoji={sel.icon} />

              <p className="text-lg italic text-[#2C2C2C] leading-relaxed max-w-xl mx-auto mt-6">“{sel.text}”</p>

              {sel.type === "Journal" && (
                <textarea rows={5} placeholder="Escribe aquí..." className="w-full mt-6 border border-[#E0D5C8] rounded-xl p-4 focus:outline-none focus:border-[#6B8F71]" />
              )}

              <div className="flex gap-3 mt-6 justify-center">
                <button className="bg-[#6B8F71] hover:bg-[#5a7a61] text-white px-6 py-3 rounded-full font-semibold transition">✓ Completar sesión</button>
                <button className="bg-[#EDE6DC] hover:bg-[#C8D5C0] text-[#2C2C2C] px-6 py-3 rounded-full font-semibold transition">♡ Guardar</button>
              </div>
            </div>
          </Locked>
        </section>
      </div>
    </AppShell>
  );
}
