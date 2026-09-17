import Link from "next/link";
import { PLANS } from "@/lib/plan";

const serif = { fontFamily: "Cormorant Garamond, serif" };

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <header className="border-b-2 border-[#6B8F71] bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🌿</span>
            <div>
              <div className="text-2xl font-semibold text-[#6B8F71]" style={serif}>Small Habits</div>
              <div className="text-[10px] text-[#6B6560] tracking-widest">HUB WELLNESS · BY MALEJA</div>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-[#6B6560] hover:text-[#6B8F71] font-medium text-sm">Iniciar sesión</Link>
            <Link href="/dashboard" className="bg-[#6B8F71] hover:bg-[#5a7a61] text-white px-5 py-2 rounded-full font-semibold text-sm transition">Entrar gratis</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold text-[#2C2C2C] mb-5 leading-tight" style={serif}>Tu gimnasio, tu nutrición y tu paz mental en una sola app</h1>
            <p className="text-lg text-[#6B6560] mb-6">Entrena con rutinas guiadas, registra tus comidas con una foto, conecta tu Apple Watch o Garmin, y cuida tu mente con reflexión y worship. Con Maleja como coach.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard" className="bg-[#A67C5B] hover:bg-[#C9A882] text-white px-7 py-3 rounded-full font-semibold transition">Empezar gratis →</Link>
              <Link href="/dashboard/upgrade" className="bg-white border-2 border-[#6B8F71] text-[#6B8F71] px-7 py-3 rounded-full font-semibold hover:bg-[#EDE6DC] transition">Ver planes</Link>
            </div>
            <p className="text-xs text-[#6B6560] mt-4">Sin tarjeta para lo gratis. Cancela cuando quieras.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[["🏋️", "Entrenar", "Funcional, calistenia, pilates, yoga"], ["📸", "Comidas", "Foto → calorías con IA"], ["🧘", "Paz mental", "Reflexión, worship, meditación"], ["⌚", "Tu reloj", "Apple Watch y Garmin"]].map(([i, t, d]) => (
              <div key={t} className="bg-white rounded-2xl p-5 border border-[#E0D5C8]"><div className="text-3xl mb-2">{i}</div><div className="font-semibold text-[#2C2C2C]">{t}</div><div className="text-xs text-[#6B6560]">{d}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EDE6DC] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center text-[#2C2C2C] mb-12" style={serif}>Todo lo que incluye</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["🏋️", "Entrenamientos", "Rutinas completas con series, reps y descansos. Videos de avatar como demostración."],
              ["🍽️", "Food Tracker IA", "Foto del plato → calorías y macros. Registro diario y tendencia mensual."],
              ["🥗", "Menús y recetas", "Planes por objetivo con recetas y marcas recomendadas por limpieza de ingredientes."],
              ["🧘", "Paz mental", "Reflexión diaria, worship, meditación guiada y journal."],
              ["⌚", "Apple Watch & Garmin", "Pasos, ritmo cardíaco, calorías activas y sueño sincronizados."],
              ["🤖", "Asistente IA + Maleja", "Bot que responde al instante y chat 1:1 con tu coach."],
            ].map(([i, t, d]) => (
              <div key={t} className="bg-white rounded-2xl p-6"><div className="text-4xl mb-3">{i}</div><h3 className="text-lg font-semibold text-[#2C2C2C] mb-1">{t}</h3><p className="text-sm text-[#6B6560]">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-semibold text-center text-[#2C2C2C] mb-3" style={serif}>Planes</h2>
        <p className="text-center text-[#6B6560] mb-12">Empieza gratis. Sube de plan cuando quieras más.</p>
        <div className="grid md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-6 border-2 border-[#C8D5C0]">
            <h3 className="text-2xl font-semibold text-[#2C2C2C]" style={serif}>Gratis</h3>
            <div className="text-3xl font-bold text-[#6B8F71] my-3">$0</div>
            <ul className="text-sm space-y-2 text-[#2C2C2C]">
              {["2 rutinas completas", "1 menú con recetas", "Reflexión diaria + worship", "Registro manual de comidas", "Asistente IA (5/día)", "Soporte por tickets"].map((f) => <li key={f}>✓ {f}</li>)}
            </ul>
            <Link href="/dashboard" className="block mt-6 text-center bg-[#C8D5C0] hover:bg-[#B8C5B0] text-[#2C2C2C] py-2 rounded-full font-semibold text-sm transition">Entrar</Link>
          </div>
          {(["basico", "pro", "elite"] as const).map((k) => {
            const p = PLANS[k];
            const hl = k === "pro";
            return (
              <div key={k} className={`bg-white rounded-2xl p-6 border-2 relative ${hl ? "border-[#A67C5B] shadow-lg" : "border-[#E0D5C8]"}`}>
                {hl && <span className="absolute -top-3 left-5 bg-[#A67C5B] text-white text-xs font-bold px-3 py-1 rounded-full">MÁS ELEGIDO</span>}
                <h3 className="text-2xl font-semibold text-[#2C2C2C]" style={serif}>{p.name}</h3>
                <div className="text-3xl font-bold text-[#A67C5B] my-3">{p.price}<span className="text-sm text-[#6B6560] font-normal">/mes</span></div>
                <ul className="text-sm space-y-2 text-[#2C2C2C]">{p.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
                <Link href="/dashboard/upgrade" className={`block mt-6 text-center py-2 rounded-full font-semibold text-sm transition ${hl ? "bg-[#A67C5B] hover:bg-[#C9A882] text-white" : "bg-[#6B8F71] hover:bg-[#5a7a61] text-white"}`}>Elegir {p.name}</Link>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-[#E0D5C8] bg-white py-10 text-center text-xs text-[#6B6560] px-4">
        <p>© 2026 Small Habits by Maleja · smallhabitsbymaleja.com</p>
        <p className="mt-2 text-[#A67C5B]">Contenido educativo. Cada persona lo usa bajo su propia responsabilidad. Consulta a un profesional de salud antes de comenzar.</p>
      </footer>
    </div>
  );
}
