import { AppShell, Locked } from "@/components/AppShell";
import { ChatUI } from "@/components/ChatUI";
import { ChatThread } from "@/components/ChatThread";
import { requireUser } from "@/lib/auth";
import { hasPlan } from "@/lib/plan";
import { tr, fill } from "@/lib/i18n";
import { listThread } from "@/app/actions/chat";

export default async function Chat() {
  const [user, { L }] = await Promise.all([requireUser(), tr()]);
  const pro = hasPlan(user.plan, "pro");
  const thread = await listThread();
  const first = user.name.trim().split(" ")[0];
  return (
    <AppShell title={L.chat.title} kicker={L.chat.kicker}>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2"><div className="eyebrow">{L.chat.ia}</div><span className="pill pill-s">{pro ? L.chat.ilimitado : L.chat.porDia}</span></div>
          <ChatUI dailyLimit={pro ? null : 5} L={L.chat} greeting={fill(L.chat.hello, first)} />
          <p className="fine mt-2">{L.chat.iaFine}</p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2"><div className="eyebrow" style={{ color: "var(--fucsia)" }}>{thread.peerName} · 1:1</div><span className="pill pill-f">Pro</span></div>
          <Locked plan={user.plan} requires="pro" feature={`${L.chat.feature} ${thread.peerName}`} L={L}>
            <ChatThread initial={thread.messages} peerId={thread.peerId} peerName={thread.peerName} canSend={pro} L={{ writeTo: L.chat.writeTo, desdePro: L.chat.desdePro, noCoach: L.chat.noCoach, firstMsg: L.chat.firstMsg, enviar: L.common.enviar }} />
          </Locked>
          {pro && <p className="fine mt-2">{L.chat.coachFine}</p>}
        </div>
      </div>
    </AppShell>
  );
}
