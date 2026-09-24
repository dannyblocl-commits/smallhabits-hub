import Link from "next/link";
import { PLANS, RETO_LINK } from "@/lib/plan";

export const metadata = {
  title: "Reto de Transformación 90 Días — Small Habits by Maleja",
  description: "90 días con Maleja: plan Pro completo, check-in semanal, fotos de progreso y premio final. Pago único.",
};

const FARMASI =
  process.env.NEXT_PUBLIC_FARMASI_LINK ||
  "https://www.farmasius.com/malejacuna/product-detail/womens-balance-system-for-beauty-relief?pid=PK93249";
const WHATSAPP = (process.env.NEXT_PUBLIC_MALEJA_WHATSAPP || "").replace(/\D/g, "");
const WA_MSG = encodeURIComponent("Hola Maleja, quiero el combo de suplementos del reto de 90 días. ¿Me ayudas con el pedido?");
const WA_LINK = WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${WA_MSG}` : "";

function proximoLunes() {
  const d = new Date();
  const delta = (8 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + delta);
  return d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
}

const INCLUYE = [
  ["90 días de plan Pro", "Todas las rutinas, las 92 recetas, menús, meditaciones y el asistente IA sin límite."],
  ["Check-in semanal con Maleja", "Cada semana revisas tu avance en grupo: peso, fotos, energía y qué ajustar."],
  ["Fotos de progreso privadas", "Antes, mitad y después. Solo las ves tú y Maleja."],
  ["Comunidad del reto", "Entras con un grupo que empieza el mismo día. Nadie lo hace sola."],
  ["Premio final", "La transformación más constante gana 3 meses de Elite con sesiones 1:1."],
];

const FAQ = [
  ["¿Necesito experiencia?", "No. Las rutinas tienen nivel inicial, intermedio y avanzado, y Maleja te dice por cuál empezar."],
  ["¿Qué pasa cuando terminan los 90 días?", "Tu acceso Pro termina y decides si sigues con un plan mensual. No hay cobro automático."],
  ["¿Puedo empezar otro día?", "Cada edición arranca un lunes para que todo el grupo vaya junto. Si compras hoy, entras en la próxima."],
  ["¿Los suplementos son obligatorios?", "No. El reto funciona con entrenamiento y comida. Los productos son lo que Maleja usa y los ofrece aparte."],
];

export default function RetoPage() {
  const inicio = proximoLunes();
  const mensual = PLANS.pro.price;

  return (
    <div className="min-h-screen" style={{ background: "#0B0B0F", color: "#F5F2F0" }}>
      <section className="px-6 pt-20 pb-16 text-center max-w-3xl mx-auto">
        <div className="inline-block mb-5 px-4 py-2 rounded-full border" style={{ borderColor: "#FF2D8A", color: "#FF2D8A", fontSize: 13, fontWeight: 700 }}>
          Próxima edición: {inicio}
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6" style={{ letterSpacing: "-0.03em" }}>
          Reto de <span style={{ color: "#FF2D8A" }}>transformación</span>
          <br />
          <span style={{ color: "#7FC29B" }}>90 días</span>
        </h1>
        <p className="text-xl mb-4" style={{ color: "#A8A3AE" }}>
          Tres meses con Maleja, un grupo que empieza contigo y un plan que cabe en tu vida real.
        </p>
        <p className="text-lg mb-10" style={{ color: "#BA8E54", fontWeight: 600 }}>
          Pequeños hábitos, grandes resultados.
        </p>
        <a href={RETO_LINK} className="inline-block px-10 py-5 rounded-xl font-black text-xl" style={{ background: "#FF2D8A", color: "#F5F2F0" }}>
          Entrar al reto — $99
        </a>
        <p className="mt-3 text-sm" style={{ color: "#A8A3AE" }}>
          Pago único. Equivale a $33/mes; el plan Pro suelto cuesta {mensual}/mes.
        </p>
      </section>

      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-10 text-center">Qué incluye</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {INCLUYE.map(([t, d]) => (
            <div key={t} className="rounded-2xl p-6" style={{ background: "#141419", border: "1px solid rgba(127,194,155,0.25)" }}>
              <p className="font-bold text-lg mb-2" style={{ color: "#7FC29B" }}>✓ {t}</p>
              <p style={{ color: "#A8A3AE" }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-3 text-center">Cómo funciona</h2>
        <p className="text-center mb-10" style={{ color: "#A8A3AE" }}>Tres fases, una por mes.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ["Mes 1 · Base", "Aprendes a entrenar y a comer sin dietas. Rutinas de 20-30 min y recetas de la casa."],
            ["Mes 2 · Ritmo", "Subes intensidad, registras comidas con foto y ajustas con Maleja cada semana."],
            ["Mes 3 · Resultado", "Consolidas el hábito. Foto final, medidas y el premio para la más constante."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl p-6" style={{ background: "#141419" }}>
              <p className="font-bold mb-2" style={{ color: "#FF2D8A" }}>{t}</p>
              <p style={{ color: "#A8A3AE" }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="rounded-3xl p-8 md:p-10" style={{ background: "#141419", border: "1px solid rgba(186,142,84,0.35)" }}>
          <p className="text-sm font-bold mb-2" style={{ color: "#BA8E54" }}>OPCIONAL · LO QUE MALEJA USA</p>
          <h2 className="text-3xl font-black mb-4">El combo del reto</h2>
          <p className="mb-6" style={{ color: "#A8A3AE" }}>
            Maleja acompaña sus 90 días con el <strong style={{ color: "#F5F2F0" }}>Women&apos;s Balance System</strong> de
            Farmasi, el sistema que ella misma toma. No se compra aquí: le escribes, ella te dice qué te conviene, te ayuda
            con el pedido y te entrega su guía de cómo tomarlo durante el reto. No cambia el precio del reto.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={WA_LINK || FARMASI}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-4 rounded-xl font-bold"
              style={{ background: WA_LINK ? "#25D366" : "#BA8E54", color: "#0B0B0F" }}
            >
              {WA_LINK ? "Escribirle a Maleja por WhatsApp" : "Pedir el combo a Maleja"}
            </a>
            <a
              href={FARMASI}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-4 rounded-xl font-bold border"
              style={{ borderColor: "#BA8E54", color: "#BA8E54" }}
            >
              Ver el producto
            </a>
          </div>
          <p className="mt-5 text-xs" style={{ color: "#A8A3AE" }}>
            Los suplementos no son necesarios para hacer el reto ni sustituyen una alimentación equilibrada. Consulta con tu médico
            antes de tomar cualquier suplemento, especialmente si estás embarazada, lactando o tomas medicación.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-black mb-8 text-center">Preguntas</h2>
        <div className="space-y-4">
          {FAQ.map(([q, a]) => (
            <div key={q} className="rounded-2xl p-6" style={{ background: "#141419" }}>
              <p className="font-bold mb-1">{q}</p>
              <p style={{ color: "#A8A3AE" }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <a href={RETO_LINK} className="inline-block px-10 py-5 rounded-xl font-black text-xl" style={{ background: "#FF2D8A", color: "#F5F2F0" }}>
          Entrar al reto — $99
        </a>
        <p className="mt-4 text-sm" style={{ color: "#A8A3AE" }}>
          ¿Prefieres ir mes a mes?{" "}
          <Link href="/#planes" className="underline font-bold" style={{ color: "#7FC29B" }}>
            Ver planes
          </Link>
        </p>
      </section>
    </div>
  );
}
