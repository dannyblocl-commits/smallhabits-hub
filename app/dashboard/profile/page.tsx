import { AppShell } from "@/components/AppShell";
import { ProfileForm } from "@/components/ProfileForm";
import { requireUser } from "@/lib/auth";
import { tr, locale } from "@/lib/i18n";
import { logout } from "@/app/actions/auth";
import { PLANS } from "@/lib/plan";

export default async function Profile() {
  const [user, { lang, L }] = await Promise.all([requireUser(), tr()]);
  const planLabel = user.plan === "free" ? L.common.gratis : PLANS[user.plan].name;
  return (
    <AppShell title={L.profile.title} kicker={`${L.profile.cuenta} ${new Date(user.created_at).toLocaleDateString(locale(lang), { day: "numeric", month: "long", year: "numeric" })} · ${L.profile.plan} ${planLabel}`}>
      <ProfileForm user={user} L={L.profile} goals={L.goals} />
      <form action={logout} className="mt-6"><button className="btn btn-ghost btn-sm">{L.profile.cerrar}</button></form>
    </AppShell>
  );
}
