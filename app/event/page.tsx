import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Small Habits by Maleja — Evento 19 Septiembre",
  description: "Pequeños hábitos, grandes resultados. Descarga la app hoy.",
};

export default function EventPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0B0B0F" }}>
      {/* HERO */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0B0F]" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <svg className="w-16 h-16 mx-auto mb-6" viewBox="0 0 64 64" fill="none">
            <path d="M32 6C18 14 10 30 14 52c18 4 34-6 42-24C50 16 42 10 32 6z" fill="#7FC29B" />
            <path
              d="M16 50C24 36 32 28 48 18"
              stroke="#0B0B0F"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.55"
            />
          </svg>

          <h1 className="text-7xl md:text-8xl font-black mb-6" style={{ letterSpacing: "-0.03em" }}>
            <span style={{ color: "#FF2D8A" }}>Small</span> <span style={{ color: "#F5F2F0" }}>Habits</span>
          </h1>

          <p className="text-2xl md:text-3xl mb-8" style={{ color: "#A8A3AE" }}>
            Pequeños hábitos, grandes resultados
          </p>

          <p className="text-lg md:text-xl mb-12" style={{ color: "#BA8E54", fontWeight: 600 }}>
            by Maleja • Coach Certificada ISSA
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://apps.apple.com/app/small-habits"
              className="px-8 py-4 rounded-lg font-bold text-lg"
              style={{ background: "#FF2D8A", color: "#F5F2F0" }}
            >
              Descargar App
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-lg font-bold text-lg border-2"
              style={{ borderColor: "#7FC29B", color: "#7FC29B" }}
            >
              Ver más
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16" style={{ color: "#F5F2F0" }}>
            Entrena • Come • Respira
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* ENTRENAR */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1f", borderColor: "#FF2D8A", borderWidth: 2 }}>
              <video autoPlay muted loop playsInline className="w-full aspect-square object-cover" src="/videos/entrenar.mp4" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2" style={{ color: "#FF2D8A" }}>
                  Entrena
                </h3>
                <p style={{ color: "#A8A3AE" }}>Rutinas de fuerza, funcional, calistenia y yoga. Cronómetro y guía en cada sesión.</p>
              </div>
            </div>

            {/* COMER BIEN */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1f", borderColor: "#7FC29B", borderWidth: 2 }}>
              <video autoPlay muted loop playsInline className="w-full aspect-square object-cover" src="/videos/comer-bien.mp4" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2" style={{ color: "#7FC29B" }}>
                  Come Bien
                </h3>
                <p style={{ color: "#A8A3AE" }}>Recetario de Maleja con 92 recetas. Registra tu comida con una foto.</p>
              </div>
            </div>

            {/* PAZ MENTAL */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1f", borderColor: "#7FC29B", borderWidth: 2 }}>
              <video autoPlay muted loop playsInline className="w-full aspect-square object-cover" src="/videos/paz-mental.mp4" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2" style={{ color: "#7FC29B" }}>
                  Paz Mental
                </h3>
                <p style={{ color: "#A8A3AE" }}>Reflexión, worship y respiración. Cuidar tu mente es cuidar tu vida.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE MALEJA */}
      <section className="py-20 px-6" style={{ background: "#1a1a1f" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-black mb-6" style={{ color: "#F5F2F0" }}>
                Sobre <span style={{ color: "#FF2D8A" }}>Maleja</span>
              </h2>
              <p className="text-lg mb-6" style={{ color: "#A8A3AE" }}>
                Coach certificada ISSA con especialidad en CPT (Personal Training), Nutrición y Fuerza & Acondicionamiento.
              </p>
              <p className="text-lg mb-6" style={{ color: "#A8A3AE" }}>
                La misión de Maleja es simple: ayudarte a construir pequeños hábitos que generen grandes resultados. No se trata de perfección, se trata de consistencia.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: "#FF2D8A", color: "#F5F2F0" }}>
                  📷
                </a>
                <a href="https://tiktok.com" target="_blank" className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: "#7FC29B", color: "#0B0B0F" }}>
                  🎵
                </a>
                <a href="https://youtube.com" target="_blank" className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: "#BA8E54", color: "#F5F2F0" }}>
                  ▶️
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <video autoPlay muted loop playsInline className="w-full aspect-square object-cover" src="/videos/ad.mp4" />
            </div>
          </div>
        </div>
      </section>

      {/* PROGRESO */}
      <section className="py-20 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6" style={{ color: "#F5F2F0" }}>
            Tu <span style={{ color: "#7FC29B" }}>progreso</span> importa
          </h2>
          <p className="text-lg mb-12" style={{ color: "#A8A3AE" }}>
            Cada sesión completada, cada receta preparada, cada momento de paz que encuentras, suma hacia tus objetivos.
          </p>
          <div className="rounded-2xl overflow-hidden max-w-2xl mx-auto">
            <video autoPlay muted loop playsInline className="w-full aspect-video object-cover" src="/videos/progreso.mp4" />
          </div>
        </div>
      </section>

      {/* PLAN GATING */}
      <section className="py-20 px-6" style={{ background: "#1a1a1f" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-12" style={{ color: "#F5F2F0" }}>
            Planes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Básico", price: "$12.99", features: ["5 rutinas", "Acceso a recetas", "Gratis"] },
              { name: "Pro", price: "$29.99", features: ["20+ rutinas", "Recetario completo", "Hacks nutricionales", "Analytics"], accent: true },
              { name: "Elite", price: "$129.99", features: ["Todo incluido", "Coach personal", "Seguimiento 1:1", "Prioridad"] },
            ].map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl p-8"
                style={{
                  background: plan.accent ? "#FF2D8A" : "#0B0B0F",
                  color: plan.accent ? "#0B0B0F" : "#F5F2F0",
                  border: plan.accent ? "none" : "2px solid #7FC29B",
                }}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-4xl font-black mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <button className="w-full py-3 font-bold rounded-lg" style={{ background: plan.accent ? "#0B0B0F" : "#FF2D8A", color: plan.accent ? "#FF2D8A" : "#F5F2F0" }}>
                  Seleccionar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + QR */}
      <section className="py-20 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-6" style={{ color: "#F5F2F0" }}>
              Comienza <span style={{ color: "#7FC29B" }}>hoy</span>
            </h2>
            <p className="text-xl mb-8" style={{ color: "#A8A3AE" }}>
              Descarga Small Habits y empieza tu transformación. Gratis. Sin compromisos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <a
                href="https://smallhabitsbymaleja.com/download"
                className="block mb-6 px-8 py-4 rounded-lg font-bold text-lg text-center"
                style={{ background: "#FF2D8A", color: "#F5F2F0" }}
              >
                Descargar App
              </a>
              <p style={{ color: "#A8A3AE" }}>Disponible en iOS y Android. Empieza con acceso gratis a 5 rutinas y recetas.</p>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg">
                <img src="/qr-smallhabits.png" alt="QR Code" className="w-64 h-64" />
                <p className="text-center text-xs text-black mt-2">smallhabitsbymaleja.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: "#7FC29B", background: "#1a1a1f" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4" style={{ color: "#7FC29B" }}>
                Producto
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#A8A3AE" }}>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/dashboard/recipes">Recetas</Link>
                </li>
                <li>
                  <Link href="/dashboard/routines">Rutinas</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: "#7FC29B" }}>
                Maleja
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#A8A3AE" }}>
                <li>
                  <a href="https://instagram.com">Instagram</a>
                </li>
                <li>
                  <a href="https://tiktok.com">TikTok</a>
                </li>
                <li>
                  <a href="https://youtube.com">YouTube</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: "#7FC29B" }}>
                Legal
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#A8A3AE" }}>
                <li>
                  <Link href="/privacy">Privacidad</Link>
                </li>
                <li>
                  <Link href="/terms">Términos</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: "#7FC29B" }}>
                Contacto
              </h4>
              <p className="text-sm" style={{ color: "#A8A3AE" }}>
                hola@smallhabitsbymaleja.com
              </p>
            </div>
          </div>

          <div className="pt-8 border-t text-center" style={{ borderColor: "#7FC29B", color: "#A8A3AE" }}>
            <p>© 2026 Small Habits by Maleja. Pequeños hábitos, grandes resultados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
