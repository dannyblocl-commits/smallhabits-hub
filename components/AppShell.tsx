import Link from "next/link";
import { getPlan, hasPlan, Plan, PLANS } from "@/lib/plan";
import { Logo, Glow } from "@/components/Leaves";

const nav = [
  { href: "/dashboard", label: "Hoy", icon: "◉" },
  { href: "/dashboard/routines", label: "Entrenar", icon: "▶" },
  { href: "/dashboard/food", label: "Comidas", icon: "◐" },
  { href: "/dashboard/mindfulness", label: "Mente", icon: "◌" },
  { href: "/dashboard/progress", label: "Progreso", icon: "◔" },
];
const more = [
  { href: "/dashboard/nutrition", label: "Menús" },
  { href: "/dashboard/chat", label: "Chat" },
  { href: "/dashboard/tickets", label: "Soporte" },
  { href: "/dashboard/upgrade", label: "Planes" },
];

export async function AppShell({ children, title, kicker, requires }: { children: React.ReactNode; title: string; kicker?: string; requires?: Plan }) {
  const plan = await getPlan();
  const planLabel = plan === "free" ? "Gratis" : PLANS[plan].name;

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
            <Link href="/dashboard/upgrade" className={`pill ${plan === "free" ? "" : "pill-f"}`}>{planLabel}</Link>
            <Link href="/" className="faint text-xs px-2">Salir</Link>
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
          {requires && requires !== "free" && <span className="pill pill-f mb-2">desde {PLANS[requires].name}</span>}
        </div>
        {children}
        <p className="fine text-center mt-12">Contenido educativo. Cada persona lo practica bajo su propia responsabilidad; consulta a un profesional de salud.</p>
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

export function Locked({ children, feature, plan, requires = "basico" }: { children: React.ReactNode; feature: string; plan: Plan; requires?: Plan }) {
  if (hasPlan(plan, requires)) return <>{children}</>;
  const label = requires === "free" ? "Gratis" : PLANS[requires].name;
  return (
    <div className="relative">
      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[20px]" style={{ background: "rgba(11,11,15,.55)", backdropFilter: "blur(6px)" }}>
        <div className="glass lift p-6 text-center max-w-xs">
          <div className="eyebrow" style={{ color: "var(--fucsia)" }}>Desde {label}</div>
          <p className="display text-2xl mt-1">{feature}</p>
          <Link href="/dashboard/upgrade" className="btn btn-go btn-sm mt-4">Desbloquear</Link>
        </div>
      </div>
      <div className="pointer-events-none select-none opacity-40">{children}</div>
    </div>
  );
}

export function Badge({ free }: { free: boolean }) {
  return <span className={`pill ${free ? "pill-s" : "pill-f"}`}>{free ? "Gratis" : "Premium"}</span>;
}
