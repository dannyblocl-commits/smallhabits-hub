import { AppShell } from "@/components/AppShell";
import { ProfileForm } from "@/components/ProfileForm";
import { requireUser } from "@/lib/auth";
import { tr, locale } from "@/lib/i18n";
import { LangSwitch } from "@/components/LangSwitch";
import { logout, becomeCoach } from "@/app/actions/auth";
import { PLANS } from "@/lib/plan";
import Link from "next/link";
import { deleteMyAccount } from "@/app/actions/account";

export default async function Profile({ searchParams }: { searchParams: Promise<{ coach?: string; del?: string }> }) {
  const [user, { lang, L }, sp] = await Promise.all([requireUser(), tr(), searchParams]);
  const planLabel = user.plan === "free" ? L.common.gratis : PLANS[user.plan].name;
  return (
    <AppShell tab="/dashboard/profile" title={L.profile.title} kicker={`${L.profile.cuenta} ${new Date(user.created_at).toLocaleDateString(locale(lang), { day: "numeric", month: "long", year: "numeric" })} · ${L.profile.plan} ${planLabel}`}>
      <div className="card p-5 mb-6 max-w-lg flex items-center justify-between gap-3">
        <div><div className="eyebrow">{L.nav.idioma}</div><div className="faint text-xs mt-1">ES · EN · PT</div></div>
        <LangSwitch lang={lang} next="/dashboard/profile" />
      </div>
      <ProfileForm user={user} L={L.profile} goals={L.goals} />
      {user.role !== "coach" && (
        <form action={becomeCoach} className="card p-6 mt-6 max-w-lg space-y-2">
          <div className="eyebrow" style={{ color: "var(--sage)" }}>{L.auth.coachQ}</div>
          <p className="faint text-xs">{L.auth.coachHint}</p>
          {sp.coach === "bad" && <p className="text-sm" style={{ color: "#FF8A8A" }}>{L.auth.coachBad}</p>}
          <div className="flex gap-2"><input name="coach_code" required placeholder={L.auth.coachCode} className="input input-s flex-1" autoCapitalize="characters" /><button className="btn btn-balance btn-sm">{L.common.entrar}</button></div>
        </form>
      )}
      <form action={logout} className="mt-6"><button className="btn btn-ghost btn-sm">{L.profile.cerrar}</button></form>
      {(() => {
        const t = {
          es: { h: "Eliminar mi cuenta", p: "Borra tu cuenta y todos tus datos (perfil, comidas, entrenamientos, fotos, mensajes). No se puede deshacer.", w: "ELIMINAR", ph: "Escribe ELIMINAR para confirmar", b: "Eliminar mi cuenta para siempre", bad: "Escribe ELIMINAR para confirmar.", sub: "Si tienes suscripción de Apple o Google, cancélala también en tu teléfono." },
          en: { h: "Delete my account", p: "Deletes your account and all your data (profile, meals, workouts, photos, messages). This cannot be undone.", w: "DELETE", ph: "Type DELETE to confirm", b: "Delete my account forever", bad: "Type DELETE to confirm.", sub: "If you have an Apple or Google subscription, cancel it on your phone too." },
          pt: { h: "Excluir minha conta", p: "Apaga sua conta e todos os seus dados (perfil, refeições, treinos, fotos, mensagens). Não dá para desfazer.", w: "EXCLUIR", ph: "Digite EXCLUIR para confirmar", b: "Excluir minha conta para sempre", bad: "Digite EXCLUIR para confirmar.", sub: "Se tiver assinatura da Apple ou do Google, cancele também no celular." },
        }[lang];
        return (
          <details className="card p-5 mt-10 max-w-lg" style={{ borderColor: "rgba(255,138,138,0.35)" }}>
            <summary className="cursor-pointer text-sm" style={{ color: "#FF8A8A" }}>{t.h}</summary>
            <form action={deleteMyAccount} className="mt-3 space-y-3">
              <p className="muted text-sm">{t.p}</p>
              <p className="faint text-xs">{t.sub}</p>
              {sp.del === "confirm" && <p className="text-sm" style={{ color: "#FF8A8A" }}>{t.bad}</p>}
              <input name="confirm" required placeholder={t.ph} autoCapitalize="characters" autoComplete="off" className="input input-s" />
              <button className="btn btn-sm w-full" style={{ background: "#FF8A8A", color: "#0B0B0F" }}>{t.b}</button>
            </form>
          </details>
        );
      })()}
      <p className="faint text-xs mt-6"><Link href="/privacidad" className="underline">Privacidad</Link> · <Link href="/terminos" className="underline">Términos</Link></p>
    </AppShell>
  );
}
