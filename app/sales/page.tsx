import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Small Habits by Maleja — Coaching de Transformación Personal",
  description: "Pequeños hábitos, grandes resultados. Coaching 1:1 personalizado con Maleja, coach certificada ISSA.",
};

export default function SalesPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0B0B0F" }}>
      {/* HERO */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0B0F]" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black mb-6" style={{ letterSpacing: "-0.03em" }}>
            <span style={{ color: "#FF2D8A" }}>Pequeños</span> hábitos,
            <br />
            <span style={{ color: "#7FC29B" }}>grandes resultados</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8" style={{ color: "#A8A3AE" }}>
            Coaching personalizado de transformación física y mental.
            <br />
            Con Maleja, coach certificada ISSA.
          </p>

          <p className="text-lg mb-12" style={{ color: "#BA8E54", fontWeight: 600 }}>
            Ya 500+ personas transformadas
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#planes"
              className="px-8 py-4 rounded-lg font-bold text-lg"
              style={{ background: "#FF2D8A", color: "#F5F2F0" }}
            >
              Ver planes
            </a>
            <a
              href="#sobre"
              className="px-8 py-4 rounded-lg font-bold text-lg border-2"
              style={{ borderColor: "#7FC29B", color: "#7FC29B" }}
            >
              Conocer a Maleja
            </a>
          </div>
        </div>
      </section>

      {/* SOBRE MALEJA */}
      <section id="sobre" className="py-20 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden">
              <video autoPlay muted loop playsInline className="w-full aspect-square object-cover" src="/videos/ad.mp4" />
            </div>
            <div>
              <h2 className="text-5xl font-black mb-6" style={{ color: "#F5F2F0" }}>
                Hola, soy <span style={{ color: "#FF2D8A" }}>Maleja</span>
              </h2>
              <div className="space-y-4 text-lg mb-8" style={{ color: "#A8A3AE" }}>
                <p>Coach certificada ISSA con especialidad en:</p>
                <ul className="space-y-2 ml-4">
                  <li>✓ Entrenamiento personal (CPT)</li>
                  <li>✓ Nutrición y planes de alimentación</li>
                  <li>✓ Fuerza y acondicionamiento</li>
                  <li>✓ Transformación de hábitos</li>
                </ul>
              </div>
              <p className="text-lg mb-8" style={{ color: "#A8A3AE" }}>
                Mi filosofía es simple: <strong>no se trata de perfección, se trata de consistencia.</strong> Trabajo con personas como tú para construir hábitos sostenibles que generan resultados reales.
              </p>
              <p style={{ color: "#BA8E54", fontWeight: 600, fontSize: "18px" }}>
                "He ayudado a 500+ personas a transformar su cuerpo y su mentalidad en menos de 90 días."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LO QUE OBTIENES */}
      <section className="py-20 px-6" style={{ background: "#1a1a1f" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16" style={{ color: "#F5F2F0" }}>
            Qué incluye tu coaching
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: "💪", title: "Rutinas personalizadas", desc: "Diseñadas según tu nivel, disponibilidad y objetivo" },
              { icon: "🍽️", title: "Plan de nutrición", desc: "Recetas balanceadas y ajustadas a tus preferencias" },
              { icon: "📊", title: "Seguimiento real", desc: "Métricas medibles: peso, fotos, performance" },
              { icon: "💬", title: "Soporte directo", desc: "Acceso a Maleja para dudas y ajustes" },
              { icon: "🎯", title: "Estrategia de hábitos", desc: "Construimos la base que genera cambios duraderos" },
              { icon: "🏆", title: "Acceso a comunidad", desc: "Red de personas en tu misma transformación" },
            ].map((item, i) => (
              <div key={i} className="card p-6" style={{ borderColor: "#7FC29B", borderWidth: 2 }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#F5F2F0" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#A8A3AE" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMACIONES */}
      <section className="py-20 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16" style={{ color: "#F5F2F0" }}>
            Historias de transformación
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "María", time: "90 días", result: "-15 kg + definición", desc: "De sedentaria a entrenar 4x/semana" },
              { name: "Carlos", time: "60 días", result: "+8 kg músculo", desc: "Fuerza aumentó 40% en ejercicios clave" },
              { name: "Ana", time: "120 días", result: "Hábitos sostenibles", desc: "Cambio mental: ahora disfruta entrenar" },
            ].map((t, i) => (
              <div key={i} className="card p-8 text-center" style={{ background: "#1a1a1f" }}>
                <div className="text-5xl font-black mb-4" style={{ color: "#FF2D8A" }}>
                  {t.result.split(" ")[0]}
                </div>
                <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
                <p className="text-sm mb-4" style={{ color: "#BA8E54" }}>
                  {t.time}
                </p>
                <p style={{ color: "#A8A3AE" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="planes" className="py-20 px-6" style={{ background: "#1a1a1f" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-4" style={{ color: "#F5F2F0" }}>
            Elige tu plan
          </h2>
          <p className="text-center text-lg mb-12" style={{ color: "#A8A3AE" }}>
            Todos incluyen acceso completo. La diferencia está en el nivel de personalización y soporte.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Básico",
                price: "$12.99",
                period: "/mes",
                features: ["5 rutinas prehechas", "Acceso a recetario", "Chat de soporte", "Gratis los primeros 7 días"],
                cta: "Empezar gratis",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$29.99",
                period: "/mes",
                features: [
                  "Rutinas personalizadas",
                  "Plan nutricional ajustado",
                  "Seguimiento semanal",
                  "Notas y recomendaciones",
                  "Prioridad en soporte",
                ],
                cta: "Elegir Pro",
                highlight: true,
              },
              {
                name: "Elite",
                price: "$129.99",
                period: "/mes",
                features: [
                  "TODO del plan Pro",
                  "Sesiones 1:1 (2/mes)",
                  "Estrategia de hábitos",
                  "Acceso VIP a comunidad",
                  "Ajustes sin límite",
                ],
                cta: "Conversemos",
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className="rounded-2xl p-8"
                style={{
                  background: plan.highlight ? "#FF2D8A" : "#0B0B0F",
                  color: plan.highlight ? "#0B0B0F" : "#F5F2F0",
                  border: plan.highlight ? "none" : "2px solid #7FC29B",
                }}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-black mb-1">
                  {plan.price}
                  <span style={{ fontSize: "18px", opacity: 0.7 }}>{plan.period}</span>
                </div>
                <p style={{ opacity: 0.8, marginBottom: "24px", fontSize: "14px" }}>Facturación mensual</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ fontSize: "14px" }}>
                      ✓ {f}
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3 font-bold rounded-lg"
                  style={{
                    background: plan.highlight ? "#0B0B0F" : "#FF2D8A",
                    color: plan.highlight ? "#FF2D8A" : "#F5F2F0",
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6" style={{ color: "#F5F2F0" }}>
            Tu transformación comienza HOY
          </h2>
          <p className="text-xl mb-8" style={{ color: "#A8A3AE" }}>
            500+ personas ya han tomado la decisión. ¿Cuándo es tu turno?
          </p>
          <button
            className="px-12 py-4 rounded-lg font-bold text-lg"
            style={{ background: "#FF2D8A", color: "#F5F2F0" }}
          >
            Comenzar transformación
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: "#7FC29B", background: "#1a1a1f" }}>
        <div className="max-w-6xl mx-auto text-center">
          <p style={{ color: "#A8A3AE" }}>
            © 2026 Small Habits by Maleja. Pequeños hábitos, grandes resultados.
          </p>
          <div className="mt-4 flex gap-4 justify-center text-sm">
            <a href="#" style={{ color: "#7FC29B" }}>
              Instagram
            </a>
            <a href="#" style={{ color: "#7FC29B" }}>
              TikTok
            </a>
            <a href="#" style={{ color: "#7FC29B" }}>
              YouTube
            </a>
            <a href="#" style={{ color: "#7FC29B" }}>
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
