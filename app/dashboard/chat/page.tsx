import { AppShell, Locked } from "@/components/AppShell";
import { ChatUI } from "@/components/ChatUI";
import { getPlan, hasPlan } from "@/lib/plan";

export default async function Chat() {
  const plan = await getPlan();
  const unlimited = hasPlan(plan, "pro");

  return (
    <AppShell title="Chat">
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold text-[#2C2C2C] mb-3">🤖 Asistente IA <span className="text-xs bg-[#C8D5C0] px-2 py-1 rounded-full ml-2">GRATIS 5/día</span></h2>
          <ChatUI dailyLimit={unlimited ? null : 5} />
          <p className="text-xs text-[#6B6560] mt-2">El asistente da información general y educativa. No sustituye consejo médico.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#2C2C2C] mb-3">👩‍🏫 Chat 1:1 con Maleja <span className="text-xs bg-[#A67C5B] text-white px-2 py-1 rounded-full ml-2">PRO</span></h2>
          <Locked plan={plan} requires="pro" feature="Chat directo con Maleja">
            <div className="bg-white rounded-2xl border border-[#E0D5C8] h-[520px] flex flex-col">
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                <div className="flex justify-start"><div className="bg-[#EDE6DC] rounded-2xl px-4 py-3 text-sm max-w-[80%]">Hola María 💚 Vi que llevas 12 días de racha. ¿Cómo te sientes con la rutina de calistenia?</div></div>
                <div className="flex justify-end"><div className="bg-[#6B8F71] text-white rounded-2xl px-4 py-3 text-sm max-w-[80%]">Bien, pero las flexiones me cuestan mucho todavía.</div></div>
                <div className="flex justify-start"><div className="bg-[#EDE6DC] rounded-2xl px-4 py-3 text-sm max-w-[80%]">Normal. Hazlas con rodillas apoyadas 2 semanas más y sube 1 rep por sesión. Te mando un video de la técnica hoy.</div></div>
              </div>
              <div className="border-t border-[#E0D5C8] p-3 flex gap-2">
                <input placeholder="Escribe a Maleja..." className="flex-1 border border-[#E0D5C8] rounded-full px-4 py-2 text-sm" />
                <button className="bg-[#A67C5B] text-white px-5 py-2 rounded-full text-sm font-semibold">Enviar</button>
              </div>
            </div>
          </Locked>
        </div>
      </div>
    </AppShell>
  );
}
