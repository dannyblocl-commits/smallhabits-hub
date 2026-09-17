import Link from "next/link";
import { getPlan, hasPlan, Plan, PLANS } from "@/lib/plan";
import { Logo } from "@/components/Leaves";

const nav = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/dashboard/routines", label: "Entrenar" },
  { href: "/dashboard/food", label: "Comidas" },
  { href: "/dashboard/nutrition", label: "Menús" },
  { href: "/dashboard/mindfulness", label: "Paz mental" },
  { href: "/dashboard/progress", label: "Progreso" },
  { href: "/dashboard/chat", label: "Chat" },
  { href: "/dashboard/tickets", label: "Soporte" },
];

export async function AppShell({ children, title, requires }: { children: React.ReactNode; title: string; requires?: Plan }) {
  const plan = await getPlan();
  const planLabel = plan === "free" ? "Gratis" : PLANS[plan].name;

  return (
    <div className="min-h-screen bg-hero">
      <header className="sticky top-0 z-40 bg-[rgba(250,250,247,0.85)] backdrop-blur border-b border-[#E0D5C8]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard"><Logo /></Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/upgrade" className={`text-[0.65rem] tracking-[0.12em] uppercase px-3 py-1 rounded-full ${plan === "free" ? "bg-white/70 border border-[#E0D5C8] text-[#6B6560]" : "bg-rosa text-white"}`}>{planLabel}</Link>
            <Link href="/" className="text-xs tracking-wide text-[#6B6560] hover:text-[#9B3A5A]">SALIR</Link>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-6 pb-3 flex gap-1 overflow-x-auto text-[0.78rem] tracking-wide">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="whitespace-nowrap px-4 py-1.5 rounded-full text-[#2C2C2C] hover:bg-white/80 transition">{n.label}</Link>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <h1 className="text-4xl md:text-5xl text-[#2C2C2C]">{title}</h1>
          {requires && requires !== "free" && <span className="pill">desde {PLANS[requires].name}</span>}
        </div>
        {children}
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-8 text-center">
        <p className="fine">Contenido educativo. Cada persona lo practica bajo su propia responsabilidad; consulta a un profesional de salud.</p>
      </footer>
    </div>
  );
}

export function Locked({ children, feature, plan, requires = "basico" }: { children: React.ReactNode; feature: string; plan: Plan; requires?: Plan }) {
  if (hasPlan(plan, requires)) return <>{children}</>;
  const label = requires === "free" ? "Gratis" : PLANS[requires].name;
  return (
    <div className="relative">
      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-[rgba(250,250,247,0.6)] backdrop-blur-sm">
        <div className="card p-6 text-center max-w-xs">
          <div className="text-2xl mb-1">✦</div>
          <p className="display text-2xl">{feature}</p>
          <p className="text-sm text-[#6B6560] mb-4">Disponible desde el plan {label}</p>
          <Link href="/dashboard/upgrade" className="btn btn-rosa !py-2 !px-5 text-sm">Ver planes</Link>
        </div>
      </div>
      <div className="pointer-events-none select-none opacity-50">{children}</div>
    </div>
  );
}

export function Badge({ free }: { free: boolean }) {
  return (
    <span className={`text-[0.6rem] tracking-[0.12em] uppercase px-2 py-1 rounded-full ${free ? "bg-[#C8D5C0] text-[#2C2C2C]" : "bg-rosa text-white"}`}>
      {free ? "Gratis" : "Premium"}
    </span>
  );
}
