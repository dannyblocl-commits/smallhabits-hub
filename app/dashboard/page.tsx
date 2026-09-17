import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { demoClients, maleja } from "@/data/clients";

export default function Dashboard() {
  const me = demoClients[0];

  return (
    <AppShell title={`Hola, ${me.name.split(" ")[0]}`}>
      {/* Resumen del día */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Stat label="Calorías hoy" value="1.240" sub="de 1.800 kcal" color="#A67C5B" />
        <Stat label="Pasos" value="6.842" sub="⌚ Apple Watch" color="#6B8F71" />
        <Stat label="Entrenos semana" value="3/4" sub="¡Vas bien!" color="#B8956A" />
        <Stat label="Racha" value="12 días" sub="🔥 Sigue así" color="#C06080" />
      </div>

      {/* Coach */}
      <div className="bg-white rounded-2xl p-6 border-2 border-[#C8D5C0] mb-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-6xl">👩‍🏫</div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-[#2C2C2C]">Tu coach: {maleja.name}</h2>
          <p className="text-[#6B6560]">{maleja.bio}</p>
          <p className="text-sm text-[#A67C5B] mt-1">{maleja.specialties.join(" · ")}</p>
        </div>
        <Link href="/dashboard/chat" className="bg-[#A67C5B] hover:bg-[#C9A882] text-white px-6 py-3 rounded-full font-semibold transition whitespace-nowrap">
          💬 Chat 1:1
        </Link>
      </div>

      {/* Accesos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card href="/dashboard/routines" icon="🏋️" title="Entrenar hoy" desc="Rutinas de funcional, calistenia y estiramientos. 2 gratis, el resto premium." free />
        <Card href="/dashboard/food" icon="📸" title="Registrar comida" desc="Sube la foto de tu plato y la IA calcula calorías y macros." />
        <Card href="/dashboard/nutrition" icon="🥗" title="Menús recomendados" desc="Planes de alimentación con recetas. 1 menú gratis de ejemplo." free />
        <Card href="/dashboard/mindfulness" icon="🧘" title="Paz mental" desc="Reflexión, worship y meditación guiada. Sesión diaria gratis." free />
        <Card href="/dashboard/progress" icon="📊" title="Mi progreso" desc="Peso, calorías, entrenos y datos del reloj en gráficos." />
        <Card href="/dashboard/tickets" icon="🎫" title="Soporte" desc="¿Dudas o problemas? Abre un ticket y Maleja responde." free />
      </div>
    </AppShell>
  );
}

function Stat({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#E0D5C8]">
      <div className="text-xs text-[#6B6560] uppercase tracking-wider">{label}</div>
      <div className="text-3xl font-bold mt-1" style={{ color }}>{value}</div>
      <div className="text-xs text-[#6B6560] mt-1">{sub}</div>
    </div>
  );
}

function Card({ href, icon, title, desc, free }: { href: string; icon: string; title: string; desc: string; free?: boolean }) {
  return (
    <Link href={href} className="bg-white rounded-2xl p-6 border border-[#E0D5C8] hover:border-[#6B8F71] hover:shadow-md transition block relative">
      <span className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full ${free ? "bg-[#C8D5C0] text-[#2C2C2C]" : "bg-[#A67C5B] text-white"}`}>
        {free ? "GRATIS" : "PREMIUM"}
      </span>
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-[#2C2C2C] mb-1">{title}</h3>
      <p className="text-sm text-[#6B6560]">{desc}</p>
    </Link>
  );
}
