import Image from "next/image";
import { AppShell, Locked } from "@/components/AppShell";
import { ChatUI } from "@/components/ChatUI";
import { getPlan, hasPlan } from "@/lib/plan";

export default async function Chat() {
  const plan = await getPlan();
  const unlimited = hasPlan(plan, "pro");
  return (
    <AppShell title="Chat" kicker="Asistente IA gratis · Maleja 1:1 desde Pro">
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2"><div className="eyebrow">Asistente IA</div><span className="pill pill-s">{unlimited ? "Ilimitado" : "5 / día"}</span></div>
          <ChatUI dailyLimit={unlimited ? null : 5} />
          <p className="fine mt-2">Información general y educativa. No sustituye consejo médico.</p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2"><div className="eyebrow" style={{ color: "var(--fucsia)" }}>Maleja · 1:1</div><span className="pill pill-f">Pro</span></div>
          <Locked plan={plan} requires="pro" feature="Chat directo con Maleja">
            <div className="card h-[520px] flex flex-col">
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                <div className="flex gap-2 items-end"><div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0"><Image src="/img/miphoto.jpg" alt="" fill className="object-cover object-top" sizes="28px" /></div><div className="row px-4 py-3 text-sm max-w-[80%]">Hola María 💚 Vi tu racha de 12 días. ¿Cómo te sientes con la calistenia?</div></div>
                <div className="flex justify-end"><div className="px-4 py-3 text-sm max-w-[80%] rounded-[12px] text-white" style={{ background: "linear-gradient(135deg, var(--vino), var(--fucsia))" }}>Bien, pero las flexiones me cuestan mucho todavía.</div></div>
                <div className="flex gap-2 items-end"><div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0"><Image src="/img/miphoto.jpg" alt="" fill className="object-cover object-top" sizes="28px" /></div><div className="row px-4 py-3 text-sm max-w-[80%]">Normal. Hazlas con rodillas apoyadas 2 semanas más y sube 1 rep por sesión. Te mando un video de la técnica hoy.</div></div>
              </div>
              <div className="p-3 flex gap-2" style={{ borderTop: "1px solid var(--line)" }}><input id="msg-maleja" placeholder="Escribe a Maleja..." className="input" /><button className="btn btn-go btn-sm">Enviar</button></div>
            </div>
          </Locked>
        </div>
      </div>
    </AppShell>
  );
}
