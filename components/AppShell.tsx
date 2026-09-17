import Link from "next/link";
import { getPlan, hasPlan, Plan, PLANS } from "@/lib/plan";

const nav = [
  { href: "/dashboard", label: "Inicio", icon: "🏠" },
  { href: "/dashboard/routines", label: "Entrenar", icon: "🏋️" },
  { href: "/dashboard/food", label: "Comidas", icon: "🍽️" },
  { href: "/dashboard/nutrition", label: "Menús", icon: "🥗" },
  { href: "/dashboard/mindfulness", label: "Paz Mental", icon: "🧘" },
  { href: "/dashboard/progress", label: "Progreso", icon: "📊" },
  { href: "/dashboard/chat", label: "Chat IA", icon: "🤖" },
  { href: "/dashboard/tickets", label: "Soporte", icon: "🎫" },
];

export async function AppShell({ children, title, requires }: { children: React.ReactNode; title: string; requires?: Plan }) {
  const plan = await getPlan();
  const planLabel = plan === "free" ? "Gratis" : PLANS[plan].name;

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <header className="border-b-2 border-[#6B8F71] bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="text-3xl">🌿</span>
            <div>
              <div className="text-xl font-semibold text-[#6B8F71]" style={{ fontFamily: "Cormorant Garamond, serif" }}>Small Habits</div>
              <div className="text-[10px] text-[#6B6560] tracking-widest">HUB WELLNESS</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/upgrade" className={`text-xs font-bold px-3 py-1 rounded-full ${plan === "free" ? "bg-[#EDE6DC] text-[#2C2C2C]" : "bg-[#A67C5B] text-white"}`}>
              {planLabel}
            </Link>
            <Link href="/" className="text-sm text-[#A67C5B] font-medium hover:underline">Salir</Link>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-[#EDE6DC] text-[#2C2C2C] hover:bg-[#C8D5C0] transition">
              {n.icon} {n.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <h1 className="text-4xl font-semibold text-[#2C2C2C]" style={{ fontFamily: "Cormorant Garamond, serif" }}>{title}</h1>
          {requires && requires !== "free" && (
            <span className="bg-[#A67C5B] text-white px-3 py-1 rounded-full text-xs font-bold">DESDE {PLANS[requires].name.toUpperCase()}</span>
          )}
        </div>
        {children}
      </main>

      <footer className="border-t border-[#E0D5C8] py-6 mt-12 text-center text-xs text-[#6B6560] px-4">
        Contenido con fines educativos. Cada persona lo usa bajo su propia responsabilidad. Consulta a un profesional de salud antes de iniciar cualquier programa.
      </footer>
    </div>
  );
}

export function Locked({ children, feature, plan, requires = "basico" }: { children: React.ReactNode; feature: string; plan: Plan; requires?: Plan }) {
  if (hasPlan(plan, requires)) return <>{children}</>;
  const label = requires === "free" ? "Gratis" : PLANS[requires].name;
  return (
    <div className="relative">
      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-[#FAFAF7]/70 backdrop-blur-sm">
        <div className="text-center bg-white border-2 border-[#A67C5B] rounded-xl p-6 shadow-lg max-w-xs">
          <div className="text-3xl mb-2">🔒</div>
          <p className="font-semibold text-[#2C2C2C]">{feature}</p>
          <p className="text-sm text-[#6B6560] mb-4">Disponible desde el plan {label}</p>
          <Link href="/dashboard/upgrade" className="inline-block bg-[#A67C5B] hover:bg-[#C9A882] text-white px-5 py-2 rounded-full text-sm font-semibold transition">
            Ver planes
          </Link>
        </div>
      </div>
      <div className="pointer-events-none select-none opacity-60">{children}</div>
    </div>
  );
}

export function Badge({ free }: { free: boolean }) {
  return (
    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${free ? "bg-[#C8D5C0] text-[#2C2C2C]" : "bg-[#A67C5B] text-white"}`}>
      {free ? "GRATIS" : "PREMIUM"}
    </span>
  );
}
