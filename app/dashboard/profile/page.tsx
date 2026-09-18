import { AppShell } from "@/components/AppShell";
import { ProfileForm } from "@/components/ProfileForm";
import { requireUser } from "@/lib/auth";
import { tr, locale } from "@/lib/i18n";
import { logout, becomeCoach } from "@/app/actions/auth";
import { PLANS } from "@/lib/plan";

export default async function Profile({ searchParams }: { searchParams: Promise<{ coach?: string }> }) {
  const [user, { lang, L }, sp] = await Promise.all([requireUser(), tr(), searchParams]);
  const planLabel = user.plan === "free" ? L.common.gratis : PLANS[user.plan].name;
  return (
    <AppShell title={L.profile.title} kicker={`${L.profile.cuenta} ${new Date(user.created_at).toLocaleDateString(locale(lang), { day: "numeric", month: "long", year: "numeric" })} · ${L.profile.plan} ${planLabel}`}>
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
    </AppShell>
  );
}
