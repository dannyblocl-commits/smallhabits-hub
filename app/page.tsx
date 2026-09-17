import Link from "next/link";
import Image from "next/image";
import { PLANS } from "@/lib/plan";
import { Logo, Glow } from "@/components/Leaves";
import { HeroVideo } from "@/components/HeroVideo";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--obsidian)" }}>
      <Glow />
      <header className="sticky top-0 z-40 glass !rounded-none !border-x-0 !border-t-0 !shadow-none">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-2">
            <Link href="/login" className="px-3 text-sm muted hover:text-[var(--text)]">Iniciar sesión</Link>
            <Link href="/signup" className="btn btn-go btn-sm">Crear cuenta</Link>
          </nav>
        </div>
      </header>

      {/* Hero con foto a sangre */}
      <section className="relative max-w-6xl mx-auto px-5 pt-8 pb-10">
        <div className="relative rounded-[28px] overflow-hidden min-h-[520px] md:min-h-[600px] flex items-end">
          <HeroVideo src="/videos/hero.mp4" poster="/img/gal_fuerza.jpg" className="absolute inset-0 w-full h-full object-cover object-[center_20%]" label="Maleja preparándose para entrenar" />
          <div className="absolute inset-0 veil" />
          <div className="relative p-6 md:p-12 max-w-2xl">
            <span className="pill pill-f">Gimnasio · Nutrición · Paz mental</span>
            <h1 className="text-5xl md:text-7xl mt-4">Energía para moverte.<br /><span style={{ color: "var(--sage)" }}>Calma para quedarte.</span></h1>
            <p className="muted mt-4 max-w-lg">Entrena con cronómetro y guía en video, registra tus comidas con una foto, conecta tu Apple Watch y cuida tu mente con reflexión y worship. Con Maleja como coach.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/signup" className="btn btn-go text-base">GO · Empezar gratis</Link>
              <Link href="/dashboard/upgrade" className="btn btn-ghost">Ver planes</Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4 max-w-lg">
          {[["200+", "miembros"], ["3+", "años"], ["1K+", "transformaciones"]].map(([n, l]) => (
            <div key={l} className="text-center"><div className="num text-3xl" style={{ color: "var(--sage)" }}>{n}</div><div className="eyebrow mt-1">{l}</div></div>
          ))}
        </div>
      </section>

      {/* Dos temperaturas */}
      <section className="relative max-w-6xl mx-auto px-5 py-12">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="card lift p-7 relative overflow-hidden isolate">
            <HeroVideo src="/videos/entrenar.mp4" poster="/img/gal_fuerza.jpg" className="absolute inset-0 w-full h-full object-cover opacity-30 -z-10" label="" />
            <div className="absolute inset-0 veil -z-10" />
            <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,45,138,.3), transparent 65%)" }} />
            <div className="eyebrow" style={{ color: "var(--fucsia)" }}>Energía</div>
            <h2 className="text-3xl mt-1">Entrenar</h2>
            <p className="muted mt-2">Funcional, calistenia, HIIT. Cronómetro por intervalos, series y descansos guiados, demo en video.</p>
            <div className="timer mt-4 text-5xl">00:42</div>
            <Link href="/dashboard/routines" className="btn btn-go btn-sm mt-5">Ver rutinas</Link>
          </div>
          <div className="card lift-sage p-7 relative overflow-hidden isolate">
            <HeroVideo src="/videos/comer-bien.mp4" poster="/img/gal_display.jpg" className="absolute inset-0 w-full h-full object-cover opacity-30 -z-10" label="" />
            <div className="absolute inset-0 veil -z-10" />
            <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(127,194,155,.28), transparent 65%)" }} />
            <div className="eyebrow" style={{ color: "var(--sage)" }}>Balance</div>
            <h2 className="text-3xl mt-1">Comer bien y estar en paz</h2>
            <p className="muted mt-2">Menús por objetivo, foto del plato → calorías con IA, pilates, yoga, reflexión diaria y worship.</p>
            <p className="quote text-2xl mt-4" style={{ color: "var(--sage-soft)" }}>Because when we feel good inside, everything flourishes outside.</p>
            <Link href="/dashboard/mindfulness" className="btn btn-balance btn-sm mt-5">Explorar</Link>
          </div>
        </div>
      </section>

      {/* Coach */}
      <section className="relative max-w-6xl mx-auto px-5 py-8">
        <div className="card p-6 md:p-8 grid md:grid-cols-[auto_1fr] gap-6 items-center">
          <div className="relative w-36 h-36 rounded-full overflow-hidden ring-2 ring-[var(--fucsia)] shadow-[0_0_40px_-10px_var(--fucsia-glow)] mx-auto">
            <Image src="/img/miphoto.jpg" alt="Maleja" fill className="object-cover object-top" sizes="144px" />
          </div>
          <div className="text-center md:text-left">
            <div className="eyebrow">Tu coach</div>
            <h2 className="text-4xl mt-1">Maleja</h2>
            <p className="muted mt-2">Coach de transformación física y mental. Nutrición, entrenamiento funcional, calistenia y estiramientos. Chat 1:1 y sesiones en vivo desde el plan Pro.</p>
          </div>
        </div>
      </section>

      {/* Planes */}
      <section className="relative max-w-6xl mx-auto px-5 py-12">
        <div className="eyebrow">Planes</div>
        <h2 className="text-4xl mt-1 mb-8">Empieza gratis. Sube cuando quieras más.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-6">
            <h3 className="text-2xl">Gratis</h3>
            <div className="num text-3xl my-3" style={{ color: "var(--sage)" }}>$0</div>
            <ul className="text-sm space-y-2 muted">{["2 rutinas con cronómetro", "1 menú con recetas", "Reflexión + worship", "Registro manual de comidas", "Asistente IA (5/día)", "Soporte"].map((f) => <li key={f}>· {f}</li>)}</ul>
            <Link href="/signup" className="btn btn-ghost w-full mt-6">Crear cuenta gratis</Link>
          </div>
          {(["basico", "pro", "elite"] as const).map((k) => {
            const p = PLANS[k]; const hl = k === "pro";
            return (
              <div key={k} className={`card p-6 relative ${hl ? "lift ring-1 ring-[var(--fucsia)]" : ""}`}>
                {hl && <span className="pill pill-f absolute -top-3 left-5">Más elegido</span>}
                <h3 className="text-2xl">{p.name}</h3>
                <div className="num text-3xl my-3" style={{ color: hl ? "var(--fucsia)" : "var(--text)" }}>{p.price}<span className="text-sm muted font-normal"> /mes</span></div>
                <ul className="text-sm space-y-2 muted">{p.features.map((f) => <li key={f}>· {f}</li>)}</ul>
                <Link href="/dashboard/upgrade" className={`btn w-full mt-6 ${hl ? "btn-go" : "btn-balance"}`}>Elegir {p.name}</Link>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="relative max-w-6xl mx-auto px-5 py-10 text-center">
        <Logo size="text-lg" />
        <p className="faint text-xs mt-2">© 2026 Small Habits by Maleja · smallhabitsbymaleja.com</p>
        <p className="fine mt-3 max-w-xl mx-auto">Contenido educativo. Cada persona lo practica bajo su propia responsabilidad; consulta a un profesional de salud antes de iniciar un programa.</p>
      </footer>
    </div>
  );
}
