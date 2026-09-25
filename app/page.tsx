import Link from "next/link";
import { HeroVideo } from "@/components/HeroVideo";

export const metadata = {
  title: "Small Habits by Maleja — Coaching de Transformación Personal",
  description: "Pequeños hábitos, grandes resultados. Coaching 1:1 personalizado con Maleja, coach certificada ISSA.",
};

const STRIPE_LINKS = {
  basico: "https://buy.stripe.com/bJedR88rs8xZ6c76Ic8og07",
  pro: "https://buy.stripe.com/eVqcN42343dF6c77Mg8og08",
  elite: "https://buy.stripe.com/bJeaEWePQ29B7gb3w08og09",
};

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#0B0B0F" }}>
      {/* HERO PREMIUM */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(55% 55% at 72% 45%, rgba(255,45,138,0.22), transparent 70%), radial-gradient(40% 40% at 15% 80%, rgba(127,194,155,0.12), transparent 70%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-12 md:pt-24 md:pb-20 grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-center">
          <div className="text-center md:text-left order-2 md:order-1">
            <div className="inline-block mb-4 px-4 py-2 rounded-full" style={{ background: "rgba(255, 45, 138, 0.1)", borderColor: "#FF2D8A", borderWidth: 1 }}>
              <p style={{ color: "#FF2D8A", fontSize: "14px", fontWeight: 600 }}>Transformación certificada en 30 días</p>
            </div>

            <h1 className="text-[2.5rem] sm:text-5xl md:text-7xl font-black mb-6 break-words" style={{ letterSpacing: "-0.03em", color: "#F5F2F0", lineHeight: 1.05 }}>
              <span style={{ color: "#FF2D8A" }}>Pequeños</span> hábitos,
              <br className="hidden sm:block" />{" "}
              <span style={{ color: "#7FC29B" }}>grandes resultados</span>
            </h1>

            <p className="text-lg md:text-xl mb-6" style={{ color: "#A8A3AE" }}>
              Coaching personalizado de transformación física y mental con Maleja, coach certificada ISSA.
            </p>

            <p className="text-base md:text-lg mb-10" style={{ color: "#BA8E54", fontWeight: 600 }}>
              500+ personas transformadas. Tú eres el siguiente.
            </p>

            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
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

          <div className="order-1 md:order-2 mx-auto w-full max-w-[300px] md:max-w-[380px]">
            <div
              className="relative rounded-[32px] overflow-hidden"
              style={{ aspectRatio: "9 / 16", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 30px 80px rgba(255,45,138,0.18), 0 10px 30px rgba(0,0,0,0.5)" }}
            >
              <HeroVideo src="/videos/hero.mp4" poster="/img/miphoto.jpg" className="absolute inset-0 w-full h-full object-cover" label="Maleja" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(11,11,15,0.85), transparent)" }} />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: "#F5F2F0" }}>Maleja</span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(255,45,138,0.9)", color: "#F5F2F0" }}>Coach ISSA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE MALEJA */}
      <section id="sobre" className="py-24 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden">
              <HeroVideo src="/videos/ad.mp4" poster="/img/miphoto.jpg" className="w-full aspect-[4/5] object-cover object-top" label="Maleja entrenando" />
            </div>
            <div>
              <h2 className="text-5xl font-black mb-6" style={{ color: "#F5F2F0" }}>
                Hola, soy <span style={{ color: "#FF2D8A" }}>Maleja</span>
              </h2>
              <div className="space-y-4 text-lg mb-8" style={{ color: "#A8A3AE" }}>
                <p><strong>Coach certificada ISSA</strong> con especialidades en:</p>
                <ul className="space-y-2 ml-4">
                  <li>✓ Entrenamiento Personal (CPT)</li>
                  <li>✓ Nutrición y Planes de Alimentación</li>
                  <li>✓ Fuerza y Acondicionamiento</li>
                  <li>✓ Transformación de Hábitos</li>
                </ul>
              </div>
              <p className="text-lg mb-8" style={{ color: "#A8A3AE" }}>
                Mi filosofía es simple: <strong style={{ color: "#7FC29B" }}>no se trata de perfección, se trata de consistencia.</strong> Trabajo con personas como tú para construir hábitos sostenibles que generan resultados reales.
              </p>
              <p style={{ color: "#BA8E54", fontWeight: 600, fontSize: "18px" }}>
                "He ayudado a 500+ personas a transformar su cuerpo y su mentalidad en menos de 90 días."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ OBTIENES */}
      <section className="py-24 px-6" style={{ background: "#1a1a1f" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16" style={{ color: "#F5F2F0" }}>
            Qué incluye tu coaching
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "💪", title: "Rutinas personalizadas", desc: "Diseñadas según tu nivel, disponibilidad y objetivo" },
              { icon: "🍽️", title: "Plan de nutrición", desc: "Recetas balanceadas y ajustadas a tus preferencias" },
              { icon: "📊", title: "Seguimiento real", desc: "Métricas medibles: peso, fotos, performance" },
              { icon: "💬", title: "Soporte directo", desc: "Acceso a Maleja para dudas y ajustes" },
              { icon: "🎯", title: "Estrategia de hábitos", desc: "Construimos la base que genera cambios duraderos" },
              { icon: "🏆", title: "Comunidad exclusiva", desc: "Red de personas en tu misma transformación" },
            ].map((item, i) => (
              <div key={i} className="card p-6" style={{ borderColor: "#7FC29B", borderWidth: 2, background: "#0B0B0F" }}>
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

      {/* FEATURES CON VIDEOS */}
      <section className="py-24 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16" style={{ color: "#F5F2F0" }}>
            Entrena • Come Bien • Paz Mental
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { video: "/videos/entrenar.mp4", color: "#FF2D8A", title: "Rutinas de Fuerza", desc: "Desde principiante hasta avanzado. Bodyweight, pesas, calistenia." },
              { video: "/videos/comer-bien.mp4", color: "#7FC29B", title: "Plan Nutricional", desc: "92 recetas de Maleja. Macros ajustados. Opciones vegetarianas." },
              { video: "/videos/paz-mental.mp4", color: "#7FC29B", title: "Bienestar Mental", desc: "Meditación, respiración, mindfulness. Tu mente merece cuidados." },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1f", borderColor: item.color, borderWidth: 2 }}>
                <video autoPlay muted loop playsInline className="w-full aspect-square object-cover" src={item.video} />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: item.color }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "#A8A3AE" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMACIONES */}
      <section className="py-24 px-6" style={{ background: "#1a1a1f" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16" style={{ color: "#F5F2F0" }}>
            Historias reales de transformación
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "María", time: "90 días", result: "-15 kg", desc: "De sedentaria a entrenar 5x/semana con fuerza" },
              { name: "Carlos", time: "60 días", result: "+8 kg", desc: "Ganancia de músculo. Fuerza +40% en bench press" },
              { name: "Ana", time: "120 días", result: "Hábitos", desc: "Cambio mental: ahora disfruta entrenar y come consciente" },
            ].map((t, i) => (
              <div key={i} className="card p-8 text-center" style={{ background: "#0B0B0F", borderColor: "#7FC29B", borderWidth: 2 }}>
                <div className="text-5xl font-black mb-4" style={{ color: "#FF2D8A" }}>
                  {t.result}
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

      {/* PROGRESO */}
      <section className="py-24 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6" style={{ color: "#F5F2F0" }}>
            Tu <span style={{ color: "#7FC29B" }}>progreso</span> es el nuestro
          </h2>
          <p className="text-xl mb-12" style={{ color: "#A8A3AE" }}>
            Medimos resultados reales: fotos, peso, fuerza, energía, claridad mental. Tu transformación es verificable.
          </p>
          <div className="rounded-2xl overflow-hidden max-w-2xl mx-auto">
            <video autoPlay muted loop playsInline className="w-full aspect-video object-cover" src="/videos/progreso.mp4" />
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="py-24 px-6" style={{ background: "#1a1a1f" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-4" style={{ color: "#F5F2F0" }}>
            Elige tu plan
          </h2>
          <p className="text-center text-lg mb-16" style={{ color: "#A8A3AE" }}>
            Todos incluyen acceso completo a rutinas, recetas y comunidad. La diferencia es el nivel de personalización.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Básico",
                price: "$19.99",
                period: "/mes",
                desc: "Perfecto para empezar",
                features: ["Biblioteca de 20+ rutinas", "Recetario de 92 recetas", "Chat de soporte", "Acceso a comunidad", "7 días gratis"],
                cta: "Empezar gratis",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$39",
                period: "/mes",
                desc: "La más popular",
                features: [
                  "TODO de Básico",
                  "Rutinas PERSONALIZADAS",
                  "Plan nutricional ajustado a ti",
                  "Seguimiento semanal",
                  "Notas y recomendaciones",
                  "Prioridad en soporte",
                ],
                cta: "Elegir Pro",
                highlight: true,
              },
              {
                name: "Elite",
                price: "$199",
                period: "/mes",
                desc: "Transformación garantizada",
                features: [
                  "TODO de Pro",
                  "Sesiones 1:1 (2/mes)",
                  "Estrategia de hábitos personalizada",
                  "Acceso VIP a comunidad",
                  "Ajustes sin límite",
                  "Prioridad máxima",
                ],
                cta: "Conversar con Maleja",
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
                  transform: plan.highlight ? "scale(1.05)" : "scale(1)",
                }}
              >
                {plan.highlight && (
                  <div className="text-xs font-black mb-2" style={{ color: "#FF2D8A", opacity: 0.8 }}>
                    ⭐ MÁS POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm mb-4" style={{ opacity: 0.8 }}>
                  {plan.desc}
                </p>
                <div className="text-4xl font-black mb-1">
                  {plan.price}
                  <span style={{ fontSize: "18px", opacity: 0.7 }}>{plan.period}</span>
                </div>
                <p style={{ opacity: 0.7, marginBottom: "24px", fontSize: "14px" }}>Facturación mensual</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ fontSize: "14px" }}>
                      ✓ {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.name === "Básico" ? "/signup-free" : plan.name === "Pro" ? STRIPE_LINKS.pro : STRIPE_LINKS.elite}
                  target={plan.name === "Básico" ? "_self" : "_blank"}
                  rel={plan.name === "Básico" ? "" : "noopener noreferrer"}
                  className="w-full py-3 font-bold rounded-lg inline-block text-center"
                  style={{
                    background: plan.highlight ? "#0B0B0F" : "#FF2D8A",
                    color: plan.highlight ? "#FF2D8A" : "#F5F2F0",
                  }}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center mt-12" style={{ color: "#A8A3AE" }}>
            Todas las suscripciones incluyen 7 días gratis. Sin tarjeta requerida.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6" style={{ color: "#F5F2F0" }}>
            Tu transformación comienza HOY
          </h2>
          <p className="text-xl mb-12" style={{ color: "#A8A3AE" }}>
            500+ personas ya han tomado la decisión. El siguiente eres tú.
          </p>
          <a
            href="#planes"
            className="inline-block px-12 py-4 rounded-lg font-bold text-lg"
            style={{ background: "#FF2D8A", color: "#F5F2F0" }}
          >
            Ver planes y comenzar
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 border-t" style={{ borderColor: "#7FC29B", background: "#1a1a1f" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4" style={{ color: "#7FC29B" }}>
                Coaching
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#A8A3AE" }}>
                <li><Link href="/">Small Habits</Link></li>
                <li><a href="#planes">Planes</a></li>
                <li><a href="#sobre">Sobre Maleja</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: "#7FC29B" }}>
                Redes
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#A8A3AE" }}>
                <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
                <li><a href="https://tiktok.com" target="_blank">TikTok</a></li>
                <li><a href="https://youtube.com" target="_blank">YouTube</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: "#7FC29B" }}>
                Legal
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#A8A3AE" }}>
                <li><Link href="/privacy">Privacidad</Link></li>
                <li><Link href="/terms">Términos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: "#7FC29B" }}>
                Soporte
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
