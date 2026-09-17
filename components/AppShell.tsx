import Link from "next/link";
import { hasPlan, Plan, PLANS } from "@/lib/plan";
import { requireUser, isAdmin } from "@/lib/auth";
import { tr, type Dict } from "@/lib/i18n";
import { logout } from "@/app/actions/auth";
import { Logo, Glow } from "@/components/Leaves";
import { LangSwitch } from "@/components/LangSwitch";

export async function AppShell({ children, title, kicker, requires }: { children: React.ReactNode; title: string; kicker?: string; requires?: Plan }) {
  const [user, { lang, L }] = await Promise.all([requireUser(), tr()]);
  const plan = user.plan;
  const planLabel = plan === "free" ? L.common.gratis : PLANS[plan].name;
  const nav = [
    { href: "/dashboard", label: L.nav.hoy, icon: "◉" },
    { href: "/dashboard/routines", label: L.nav.entrenar, icon: "▶" },
    { href: "/dashboard/food", label: L.nav.comidas, icon: "◐" },
    { href: "/dashboard/mindfulness", label: L.nav.mente, icon: "◌" },
    { href: "/dashboard/progress", label: L.nav.progreso, icon: "◔" },
  ];
  const more = [
    { href: "/dashboard/nutrition", label: L.nav.menus },
    { href: "/dashboard/chat", label: L.nav.chat },
    { href: "/dashboard/tickets", label: L.nav.soporte },
    { href: "/dashboard/coaches", label: L.nav.micoach },
    { href: "/dashboard/wearables", label: L.wearables.title },
    { href: "/dashboard/upgrade", label: L.nav.planes },
    { href: "/dashboard/profile", label: L.nav.perfil },
  ];

  return (
    <div className="min-h-screen relative" style={{ background: "var(--obsidian)" }}>
      <Glow />
      <header className="sticky z-40 glass !rounded-none !border-x-0 !border-t-0 !shadow-none" style={{ top: 0, paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link href="/dashboard"><Logo /></Link>
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-1 mr-2">
              {[...nav, ...more].map((n) => (
                <Link key={n.href} href={n.href} className="px-3 py-1.5 rounded-full text-[.8rem] muted hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition">{n.label}</Link>
              ))}
            </nav>
            <LangSwitch lang={lang} />
            {user.role === "coach" && <Link href="/coach" className="pill pill-s">{L.nav.panelCoach}</Link>}
            {isAdmin(user) && <Link href="/admin" className="pill pill-g">{L.nav.admin}</Link>}
            <Link href="/dashboard/upgrade" className={`pill ${plan === "free" ? "" : "pill-f"}`}>{planLabel}</Link>
            <Link href="/dashboard/profile" className="w-8 h-8 rounded-full grid place-items-center display text-sm" style={{ background: "var(--fucsia-soft)", color: "var(--fucsia)" }} title={user.name}>{user.name.trim()[0]?.toUpperCase()}</Link>
            <form action={logout}><button className="faint text-xs px-1">{L.nav.salir}</button></form>
          </div>
        </div>
        <nav className="md:hidden max-w-6xl mx-auto px-5 pb-2 flex gap-1 overflow-x-auto text-[.75rem]">
          {more.map((n) => <Link key={n.href} href={n.href} className="whitespace-nowrap px-3 py-1 rounded-full row muted">{n.label}</Link>)}
        </nav>
      </header>

      <main className="relative max-w-6xl mx-auto px-5 pt-6 pb-28 md:pb-12">
        {kicker && <div className="eyebrow mb-2">{kicker}</div>}
        <div className="flex items-end gap-3 mb-6 flex-wrap">
          <h1 className="text-4xl md:text-5xl">{title}</h1>
          {requires && requires !== "free" && <span className="pill pill-f mb-2">{L.common.desde} {PLANS[requires].name}</span>}
        </div>
        {children}
        <p className="fine text-center mt-12">{L.common.disclaimer}</p>
      </main>

      <nav className="md:hidden fixed left-0 right-0 z-40 glass !rounded-none !border-x-0 !border-b-0" style={{ bottom: 0, paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="grid grid-cols-5 px-2 py-2">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="flex flex-col items-center gap-0.5 py-1 text-[.62rem] tracking-wide muted hover:text-[var(--text)]">
              <span className="text-base">{n.icon}</span>{n.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export function Locked({ children, feature, plan, requires = "basico", L }: { children: React.ReactNode; feature: string; plan: Plan; requires?: Plan; L: Dict }) {
  if (hasPlan(plan, requires)) return <>{children}</>;
  const label = requires === "free" ? L.common.gratis : PLANS[requires].name;
  return (
    <div className="relative">
      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[20px]" style={{ background: "rgba(11,11,15,.55)", backdropFilter: "blur(6px)" }}>
        <div className="glass lift p-6 text-center max-w-xs">
          <div className="eyebrow" style={{ color: "var(--fucsia)" }}>{L.common.desde} {label}</div>
          <p className="display text-2xl mt-1">{feature}</p>
          <Link href="/dashboard/upgrade" className="btn btn-go btn-sm mt-4">{L.common.desbloquear}</Link>
        </div>
      </div>
      <div className="pointer-events-none select-none opacity-40">{children}</div>
    </div>
  );
}

export function Badge({ free, L }: { free: boolean; L: Dict }) {
  return <span className={`pill ${free ? "pill-s" : "pill-f"}`}>{free ? L.common.gratis : L.common.premium}</span>;
}
