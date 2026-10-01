import { AppShell } from "@/components/AppShell";
import { InstallApp } from "@/components/InstallApp";
import { PushToggle } from "@/components/PushToggle";
import { requireUser } from "@/lib/auth";
import { tr } from "@/lib/i18n";
import { APP_L } from "@/lib/app-i18n";

export default async function AppInstall() {
  const [, { lang }] = await Promise.all([requireUser(), tr()]);
  const t = APP_L[lang];
  return (
    <AppShell tab="/dashboard/app" title={t.title} kicker={t.kicker}>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="eyebrow mb-1" style={{ color: "var(--sage)" }}>{t.installH}</div>
          <p className="muted text-sm mb-4">{t.installP}</p>
          <InstallApp L={t.install} />
        </div>
        <div className="card p-5">
          <div className="eyebrow mb-1" style={{ color: "var(--fucsia)" }}>{t.pushH}</div>
          <p className="muted text-sm mb-4">{t.pushP}</p>
          <PushToggle L={t.push} />
        </div>
      </div>
    </AppShell>
  );
}
