import Link from "next/link";
import Image from "next/image";
import { AppShell, Badge } from "@/components/AppShell";
import { demoClients, maleja } from "@/data/clients";

export default function Dashboard() {
  const me = demoClients[0];

  return (
    <AppShell title={`Hola, ${me.name.split(" ")[0]}`}>
      <p className="quote text-xl text-[#6B6560] -mt-4 mb-8">Un pequeño hábito hoy. Uno más mañana.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[["Calorías hoy", "1.240", "de 1.800 kcal", "#A67C5B"], ["Pasos", "6.842", "Apple Watch", "#6B8F71"], ["Entrenos", "3/4", "esta semana", "#B8956A"], ["Racha", "12", "días seguidos", "#C06080"]].map(([l, v, s, c]) => (
          <div key={l} className="card p-5">
            <div className="text-[0.65rem] tracking-[0.12em] uppercase text-[#6B6560]">{l}</div>
            <div className="stat-num text-4xl mt-1" style={{ color: c }}>{v}</div>
            <div className="text-xs text-[#6B6560] mt-1">{s}</div>
          </div>
        ))}
      </div>

      <div className="card p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-28 h-28 shrink-0">
          <div className="absolute inset-0 rounded-full bg-soft" />
          <Image src="/img/miphoto.jpg" alt="Maleja" fill className="rounded-full object-cover object-top p-1.5" sizes="112px" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-3xl">Tu coach, {maleja.name}</h2>
          <p className="text-sm text-[#6B6560] mt-1">{maleja.bio}</p>
          <p className="text-[0.7rem] tracking-[0.1em] uppercase text-[#A67C5B] mt-2">{maleja.specialties.join(" · ")}</p>
        </div>
        <Link href="/dashboard/chat" className="btn btn-rosa">Escribirle</Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          ["/dashboard/routines", "/img/gal_fuerza.jpg", "Entrenar hoy", "Funcional, calistenia y estiramientos. 2 rutinas gratis.", true],
          ["/dashboard/food", "/img/gal_display.jpg", "Registrar comida", "Foto del plato y la IA calcula calorías y macros.", false],
          ["/dashboard/nutrition", "/img/gal_display.jpg", "Menús y recetas", "Planes de alimentación por objetivo. 1 menú gratis.", true],
          ["/dashboard/mindfulness", "/img/gal_campo.jpg", "Paz mental", "Reflexión, worship y meditación. Sesión diaria gratis.", true],
          ["/dashboard/progress", "/img/gal_parque.jpg", "Mi progreso", "Peso, calorías, entrenos y datos del reloj.", false],
          ["/dashboard/tickets", "/img/gal_campo.jpg", "Soporte", "Abre un ticket y Maleja te responde.", true],
        ].map(([href, img, t, d, free]) => (
          <Link key={t as string} href={href as string} className="card overflow-hidden block">
            <div className="relative h-36"><Image src={img as string} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" /><span className="absolute top-3 right-3"><Badge free={free as boolean} /></span></div>
            <div className="p-5"><h3 className="text-2xl">{t}</h3><p className="text-sm text-[#6B6560] mt-1">{d}</p></div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
