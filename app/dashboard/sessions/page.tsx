import Link from "next/link";
import { AppShell, Locked } from "@/components/AppShell";
import { requireUser } from "@/lib/auth";
import { tr } from "@/lib/i18n";

export default async function Sessions() {
  const [user, { lang, L }] = await Promise.all([requireUser(), tr()]);
  const cal = process.env.NEXT_PUBLIC_CALCOM_LINK || "";
  const t = {
    es: { title: "Sesiones 1:1", kicker: "Videollamada con Maleja · plan Elite", pick: "Elige el día y la hora que te vengan bien. Recibirás el link de la videollamada por email.", soon: "Maleja está configurando su agenda. Mientras tanto, escríbele por el chat para coordinar tu sesión.", chat: "Ir al chat" },
    en: { title: "1:1 Sessions", kicker: "Video call with Maleja · Elite plan", pick: "Pick the day and time that suit you. You'll get the video-call link by email.", soon: "Maleja is setting up her calendar. Meanwhile, message her in the chat to arrange your session.", chat: "Go to chat" },
    pt: { title: "Sessões 1:1", kicker: "Videochamada com a Maleja · plano Elite", pick: "Escolha o dia e a hora que preferir. Você receberá o link da videochamada por email.", soon: "A Maleja está configurando a agenda. Enquanto isso, fale com ela no chat para combinar sua sessão.", chat: "Ir para o chat" },
  }[lang];

  return (
    <AppShell title={t.title} kicker={t.kicker}>
      <Locked plan={user.plan} requires="elite" feature={t.title} L={L}>
        {cal ? (
          <div className="card overflow-hidden">
            <p className="muted text-sm p-4 pb-0">{t.pick}</p>
            <iframe
              src={`https://cal.com/${cal}?embed=true&theme=dark&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`}
              title={t.title}
              className="w-full"
              style={{ height: "78vh", border: 0, background: "transparent" }}
              allow="camera; microphone"
            />
          </div>
        ) : (
          <div className="card p-8 text-center">
            <p className="muted mb-4">{t.soon}</p>
            <Link href="/dashboard/chat" className="btn btn-go btn-sm">{t.chat}</Link>
          </div>
        )}
      </Locked>
    </AppShell>
  );
}
