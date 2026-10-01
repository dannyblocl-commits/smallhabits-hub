import Link from "next/link";
import { hasPlan, Plan, PLANS } from "@/lib/plan";
import { requireUser, isAdmin } from "@/lib/auth";
import { tr, type Dict } from "@/lib/i18n";
import { db } from "@/lib/db";
import { Logo, Glow } from "@/components/Leaves";

type Item = { href: string; label: string };

// Cinco destinos diarios abajo; lo demás vive como pestañas dentro de su sección
// o en "Yo" (el círculo con la inicial).
function sections(L: Dict) {
  const main = [
    { key: "hoy", href: "/dashboard", label: L.nav.hoy, icon: "home" },
    { key: "entrenar", href: "/dashboard/routines", label: L.nav.entrenar, icon: "train" },
    { key: "comer", href: "/dashboard/food", label: L.nav.comer, icon: "eat" },
    { key: "mente", href: "/dashboard/mindfulness", label: L.nav.mente, icon: "mind" },
    { key: "chat", href: "/dashboard/chat", label: L.nav.chat, icon: "chat" },
  ] as const;
  const tabs: Record<string, Item[]> = {
    entrenar: [
      { href: "/dashboard/routines", label: L.nav.rutinas },
      { href: "/dashboard/reto", label: L.nav.reto },
      { href: "/dashboard/sessions", label: L.nav.sesiones },
    ],
    comer: [
      { href: "/dashboard/food", label: L.nav.registro },
      { href: "/dashboard/nutrition", label: L.nav.menus },
      { href: "/dashboard/recipes", label: L.nav.recetas },
      { href: "/dashboard/menus", label: L.menus.title },
      { href: "/dashboard/learn", label: L.nav.aprende },
    ],
    yo: [
      { href: "/dashboard/profile", label: L.nav.perfil },
      { href: "/dashboard/progress", label: L.nav.progreso },
      { href: "/dashboard/photos", label: L.photos.title },
      { href: "/dashboard/wearables", label: L.wearables.title },
      { href: "/dashboard/coaches", label: L.nav.micoach },
      { href: "/dashboard/upgrade", label: L.nav.planes },
      { href: "/dashboard/app", label: L.nav.app },
      { href: "/dashboard/tickets", label: L.nav.soporte },
    ],
  };
  return { main, tabs };
}

function Icon({ name }: { name: string }) {
  const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "home") return <svg {...p}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></svg>;
  if (name === "train") return <svg {...p}><path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12" /></svg>;
  if (name === "eat") return <svg {...p}><path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10" /><path d="M17 3c-2 1-3 4-3 7h3v11" /></svg>;
  if (name === "mind") return <svg {...p}><circle cx="12" cy="12" r="8" /><path d="M8.5 13.5c1 1.2 2.1 1.8 3.5 1.8s2.5-.6 3.5-1.8" /><path d="M9.5 9.5h.01M14.5 9.5h.01" /></svg>;
  return <svg {...p}><path d="M4 5h16v11H8l-4 4z" /></svg>;
}

export async function AppShell({ children, title, kicker, requires, tab = "/dashboard" }: { children: React.ReactNode; title: string; kicker?: string; requires?: Plan; tab?: string }) {
  const [user, { L }] = await Promise.all([requireUser(), tr()]);
  const unread = (await db().query("select count(*)::int as n from messages where to_user=$1 and read_at is null", [user.id]).catch(() => ({ rows: [{ n: 0 }] }))).rows[0].n as number;
  const { main, tabs } = sections(L);
  const group = Object.keys(tabs).find((g) => tabs[g].some((t) => t.href === tab)) ?? main.find((m) => m.href === tab)?.key ?? "hoy";
  const activeMain = group === "yo" ? null : group;
  const sub = tabs[group];

  return (
    <div className="min-h-screen relative" style={{ background: "var(--obsidian)" }}>
      <Glow />
      <header className="sticky z-40 glass !rounded-none !border-x-0 !border-t-0 !shadow-none" style={{ top: 0, paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
          <Link href="/dashboard" aria-label="Small Habits"><Logo /></Link>
          <nav className="hidden md:flex items-center gap-1" aria-label="Principal">
            {main.map((n) => (
              <Link key={n.key} href={n.href} aria-current={activeMain === n.key ? "page" : undefined} className="relative px-3.5 py-1.5 rounded-full text-[.85rem] transition" style={activeMain === n.key ? { background: "var(--surface-2)", color: "var(--text)" } : { color: "var(--text-3)" }}>
                {n.label}
                {n.key === "chat" && unread > 0 && <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full text-[.6rem] grid place-items-center" style={{ background: "var(--fucsia)", color: "#fff" }}>{unread}</span>}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {user.role === "coach" && <Link href="/coach" className="pill pill-s">{L.nav.panelCoach}</Link>}
            {isAdmin(user) && <Link href="/admin" className="pill pill-g">{L.nav.admin}</Link>}
            <Link href="/dashboard/profile" aria-label={L.nav.yo} className="w-9 h-9 rounded-full grid place-items-center display text-sm" style={group === "yo" ? { background: "var(--fucsia)", color: "#fff" } : { background: "var(--fucsia-soft)", color: "var(--fucsia)" }} title={user.name}>{user.name.trim()[0]?.toUpperCase()}</Link>
          </div>
        </div>
        {sub && (
          <nav className="max-w-6xl mx-auto px-5 pb-2.5 flex gap-1.5 overflow-x-auto text-[.8rem]" aria-label={group}>
            {sub.map((n) => (
              <Link key={n.href} href={n.href} aria-current={n.href === tab ? "page" : undefined} className="whitespace-nowrap px-3.5 py-1.5 rounded-full transition" style={n.href === tab ? { background: "var(--text)", color: "var(--obsidian)" } : { background: "var(--surface-2)", color: "var(--text-3)" }}>{n.label}</Link>
            ))}
          </nav>
        )}
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

      <nav className="md:hidden fixed left-0 right-0 z-40 glass !rounded-none !border-x-0 !border-b-0" style={{ bottom: 0, paddingBottom: "env(safe-area-inset-bottom, 0px)" }} aria-label="Principal">
        <div className="grid grid-cols-5 px-1 pt-2 pb-1.5">
          {main.map((n) => {
            const on = activeMain === n.key;
            return (
              <Link key={n.key} href={n.href} aria-current={on ? "page" : undefined} className="relative flex flex-col items-center gap-1 py-1 text-[.68rem]" style={{ color: on ? "var(--fucsia)" : "var(--text-3)" }}>
                <Icon name={n.icon} />
                <span style={{ fontWeight: on ? 600 : 400 }}>{n.label}</span>
                {n.key === "chat" && unread > 0 && <span className="absolute top-0 right-[22%] min-w-4 h-4 px-1 rounded-full text-[.6rem] grid place-items-center" style={{ background: "var(--fucsia)", color: "#fff" }}>{unread}</span>}
              </Link>
            );
          })}
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
