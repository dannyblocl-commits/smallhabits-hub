import Link from "next/link";
import Image from "next/image";
import { PLANS } from "@/lib/plan";
import { Leaves, Logo } from "@/components/Leaves";

export default function Home() {
  return (
    <div className="min-h-screen bg-hero relative">
      <Leaves />

      <header className="sticky top-0 z-40 bg-[rgba(250,250,247,0.8)] backdrop-blur border-b border-[#E0D5C8]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/login" className="hidden sm:inline text-[#6B6560] hover:text-[#6B8F71] tracking-wide">INICIAR SESIÓN</Link>
            <Link href="/dashboard" className="btn btn-sage !py-2 !px-5">Entrar</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <span className="pill">✦ Gimnasio · Nutrición · Paz mental</span>
        <h1 className="text-5xl md:text-7xl text-[#2C2C2C] mt-6 mb-4">Tu bienestar, en una sola app</h1>
        <p className="text-[#6B6560] max-w-xl mx-auto leading-relaxed">
          Entrena con rutinas guiadas, registra tus comidas con una foto, conecta tu Apple Watch o Garmin y cuida tu mente con reflexión y worship.
        </p>
        <p className="quote text-2xl md:text-3xl text-[#2C2C2C] mt-8">Because when we feel good inside, everything flourishes outside.</p>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Link href="/dashboard" className="btn btn-sage">Empezar gratis</Link>
          <Link href="/dashboard/upgrade" className="btn btn-ghost">Ver planes</Link>
        </div>

        <div className="relative mx-auto mt-12 w-64 h-64 md:w-80 md:h-80">
          <div className="absolute inset-0 rounded-full bg-soft" />
          <Image src="/img/miphoto.jpg" alt="Maleja" fill priority className="rounded-full object-cover object-top p-3" sizes="320px" />
        </div>

        <div className="flex justify-center gap-10 mt-10 pt-8 border-t border-[#E0D5C8] max-w-md mx-auto">
          {[["200+", "Miembros"], ["3+", "Años"], ["1K+", "Transformaciones"]].map(([n, l]) => (
            <div key={l} className="text-center"><div className="stat-num text-3xl">{n}</div><div className="text-[0.7rem] tracking-[0.1em] uppercase text-[#6B6560] mt-1">{l}</div></div>
          ))}
        </div>
      </section>

      {/* Features con fotos */}
      <section className="relative max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl md:text-5xl text-center mb-12">Lo que vas a vivir</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            ["/img/gal_fuerza.jpg", "Entrenar", "Funcional, calistenia, pilates, yoga y estiramientos con guía en video."],
            ["/img/gal_display.jpg", "Comer bien", "Menús y recetas por objetivo. Foto del plato → calorías con IA."],
            ["/img/gal_campo.jpg", "Paz mental", "Reflexión diaria, worship, meditación guiada y journal."],
            ["/img/gal_parque.jpg", "Tu reloj y tu coach", "Apple Watch y Garmin sincronizados. Chat con Maleja."],
          ].map(([img, t, d]) => (
            <div key={t} className="card overflow-hidden">
              <div className="relative h-44"><Image src={img} alt={t} fill className="object-cover" sizes="(max-width:768px) 100vw, 25vw" /></div>
              <div className="p-5"><h3 className="text-2xl mb-1">{t}</h3><p className="text-sm text-[#6B6560]">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Planes */}
      <section className="relative max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl md:text-5xl text-center mb-2">Planes</h2>
        <p className="text-center text-[#6B6560] mb-10">Empieza gratis. Sube cuando quieras más.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="card p-6">
            <h3 className="text-3xl">Gratis</h3>
            <div className="stat-num text-3xl my-3">$0</div>
            <ul className="text-sm space-y-2 text-[#2C2C2C]">
              {["2 rutinas completas", "1 menú con recetas", "Reflexión diaria + worship", "Registro manual de comidas", "Asistente IA (5/día)", "Soporte"].map((f) => <li key={f}>✦ {f}</li>)}
            </ul>
            <Link href="/dashboard" className="btn btn-ghost w-full mt-6">Entrar</Link>
          </div>
          {(["basico", "pro", "elite"] as const).map((k) => {
            const p = PLANS[k]; const hl = k === "pro";
            return (
              <div key={k} className={`card p-6 relative ${hl ? "ring-2 ring-[#C06080]" : ""}`}>
                {hl && <span className="absolute -top-3 left-5 bg-rosa text-white text-[0.65rem] tracking-[0.12em] px-3 py-1 rounded-full">MÁS ELEGIDO</span>}
                <h3 className="text-3xl">{p.name}</h3>
                <div className="stat-num text-3xl my-3" style={{ color: hl ? "#9B3A5A" : undefined }}>{p.price}<span className="text-sm text-[#6B6560] font-normal"> /mes</span></div>
                <ul className="text-sm space-y-2 text-[#2C2C2C]">{p.features.map((f) => <li key={f}>✦ {f}</li>)}</ul>
                <Link href="/dashboard/upgrade" className={`btn w-full mt-6 ${hl ? "btn-rosa" : "btn-sage"}`}>Elegir {p.name}</Link>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="relative max-w-6xl mx-auto px-6 py-10 text-center">
        <Logo size="text-xl" />
        <p className="text-xs text-[#6B6560] mt-2">© 2026 Small Habits by Maleja · smallhabitsbymaleja.com</p>
        <p className="fine mt-3 max-w-xl mx-auto">Contenido con fines educativos. Cada persona lo practica bajo su propia responsabilidad; consulta a un profesional de salud antes de iniciar un programa.</p>
      </footer>
    </div>
  );
}
