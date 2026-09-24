import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Elige tu plan — Small Habits",
};

export default async function UpgradePage() {
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen py-24 px-6" style={{ background: "#0B0B0F" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#F5F2F0" }}>
            Tu prueba terminó
          </h1>
          <p className="text-lg" style={{ color: "#A8A3AE" }}>
            Elige un plan para continuar con tu transformación
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              name: "Básico",
              price: "$19.99",
              period: "/mes",
              desc: "Perfecto para empezar",
              features: ["Biblioteca de 20+ rutinas", "Recetario de 92 recetas", "Chat de soporte", "Acceso a comunidad"],
              color: "#FF2D8A",
              link: "https://buy.stripe.com/6oUcN4cHIbKb9oj2rW8og04",
              highlight: false,
            },
            {
              name: "Pro",
              price: "$39",
              period: "/mes",
              desc: "La más popular",
              features: ["TODO de Básico", "Rutinas PERSONALIZADAS", "Plan nutricional ajustado", "Seguimiento semanal", "Prioridad en soporte"],
              color: "#FF2D8A",
              link: "https://buy.stripe.com/00w6oG378aG75838Qk8og05",
              highlight: true,
            },
            {
              name: "Elite",
              price: "$199",
              period: "/mes",
              desc: "Transformación garantizada",
              features: ["TODO de Pro", "Sesiones 1:1 (2/mes)", "Estrategia personalizada", "Acceso VIP", "Prioridad máxima"],
              color: "#FF2D8A",
              link: "https://buy.stripe.com/3cIdR85fg7tV583aYs8og06",
              highlight: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
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
              <p style={{ opacity: 0.7, marginBottom: "24px", fontSize: "14px" }}>
                Facturación mensual
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} style={{ fontSize: "14px" }}>
                    ✓ {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 font-bold rounded-lg inline-block text-center"
                style={{
                  background: plan.highlight ? "#0B0B0F" : "#FF2D8A",
                  color: plan.highlight ? "#FF2D8A" : "#F5F2F0",
                }}
              >
                {plan.name === "Básico" ? "Continuar con Básico" : "Elegir " + plan.name}
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p style={{ color: "#A8A3AE", marginBottom: "12px" }}>
            ¿Preguntas? Contacta a Maleja
          </p>
          <Link
            href="/dashboard"
            style={{ color: "#7FC29B" }}
            className="underline font-bold"
          >
            Volver al dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
