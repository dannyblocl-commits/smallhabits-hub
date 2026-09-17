import { AppShell } from "@/components/AppShell";
import { ProfileForm } from "@/components/ProfileForm";
import { requireUser } from "@/lib/auth";
import { logout } from "@/app/actions/auth";
import { PLANS } from "@/lib/plan";

export default async function Profile() {
  const user = await requireUser();
  const planLabel = user.plan === "free" ? "Gratis" : PLANS[user.plan].name;
  return (
    <AppShell title="Mi perfil" kicker={`Cuenta creada ${new Date(user.created_at).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" })} · plan ${planLabel}`}>
      <ProfileForm user={user} />
      <form action={logout} className="mt-6"><button className="btn btn-ghost btn-sm">Cerrar sesión</button></form>
    </AppShell>
  );
}
