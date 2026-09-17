import { AppShell, Locked } from "@/components/AppShell";
import { ChatUI } from "@/components/ChatUI";
import { ChatThread } from "@/components/ChatThread";
import { requireUser } from "@/lib/auth";
import { hasPlan } from "@/lib/plan";
import { listThread } from "@/app/actions/chat";

export default async function Chat() {
  const user = await requireUser();
  const pro = hasPlan(user.plan, "pro");
  const thread = await listThread();
  return (
    <AppShell title="Chat" kicker="Asistente IA gratis · tu coach desde Pro">
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2"><div className="eyebrow">Asistente IA</div><span className="pill pill-s">{pro ? "Ilimitado" : "5 / día"}</span></div>
          <ChatUI dailyLimit={pro ? null : 5} />
          <p className="fine mt-2">Información general y educativa. No sustituye consejo médico.</p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2"><div className="eyebrow" style={{ color: "var(--fucsia)" }}>{thread.peerName} · 1:1</div><span className="pill pill-f">Pro</span></div>
          <Locked plan={user.plan} requires="pro" feature={`Chat directo con ${thread.peerName}`}>
            <ChatThread initial={thread.messages} peerId={thread.peerId} peerName={thread.peerName} canSend={pro} />
          </Locked>
          {pro && <p className="fine mt-2">Tu coach responde normalmente en menos de 24 h. Los mensajes quedan guardados.</p>}
        </div>
      </div>
    </AppShell>
  );
}
