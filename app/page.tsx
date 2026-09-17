import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D]">
      {/* Header */}
      <header className="border-b border-[#6B8F71]/20 bg-[#1A1A1A]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="text-[#6B8F71]">Small Habits</span>
            <span className="text-[#FAFAF7] ml-2">Hub</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/login" className="text-[#FAFAF7] hover:text-[#6B8F71] transition">
              Inicia sesión
            </Link>
            <Link href="/dashboard" className="bg-[#A67C5B] hover:bg-[#C9A882] text-[#1A1A1A] px-4 py-2 rounded-lg font-semibold transition">
              Ir a Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#FAFAF7] mb-6">
            Tu Transformación Comienza Aquí
          </h1>
          <p className="text-xl text-[#FAFAF7]/70 mb-8 max-w-2xl mx-auto">
            Entrenamientos personalizados, planes de nutrición, y paz mental en una sola plataforma.
            Con Maleja, tu coach de transformación integral.
          </p>
          <Link href="/dashboard" className="inline-block bg-[#A67C5B] hover:bg-[#C9A882] text-[#1A1A1A] px-8 py-3 rounded-lg text-lg font-semibold transition">
            Comienza Gratis
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mt-20">
          <FeatureCard title="Entrenamiento Funcional" description="Calistenia, pilates y yoga diseñados para tus objetivos" icon="🏋️" />
          <FeatureCard title="Planes de Nutrición" description="Cálculos de calorías y macros personalizados" icon="🥗" />
          <FeatureCard title="Paz Mental" description="Meditaciones, reflexiones y journaling" icon="🧘" />
          <FeatureCard title="Seguimiento Real" description="Ve tu progreso y celebra cada logro" icon="📊" />
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 py-20 border-t border-[#6B8F71]/20">
        <h2 className="text-4xl font-bold text-[#FAFAF7] text-center mb-12">Simple y Flexible</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-[#2D2D2D] border border-[#6B8F71]/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-[#FAFAF7] mb-2">Plan Gratuito</h3>
            <p className="text-[#FAFAF7]/60 mb-6">Perfecto para empezar</p>
            <div className="text-4xl font-bold text-[#A67C5B] mb-6">$0/mes</div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-[#FAFAF7]"><span className="text-[#6B8F71]">✓</span> Dashboard básico</li>
              <li className="flex items-center gap-3 text-[#FAFAF7]"><span className="text-[#6B8F71]">✓</span> 2 rutinas de demostración</li>
              <li className="flex items-center gap-3 text-[#FAFAF7]"><span className="text-[#6B8F71]">✓</span> Reflexión diaria básica</li>
              <li className="flex items-center gap-3 text-[#FAFAF7]"><span className="text-[#6B8F71]">✓</span> Perfil y configuración</li>
            </ul>
            <Link href="/dashboard" className="block w-full bg-[#6B8F71] hover:bg-[#5a7a61] text-[#FAFAF7] text-center py-2 rounded-lg font-semibold transition">
              Comienza gratis
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-[#A67C5B]/20 to-[#6B8F71]/20 border-2 border-[#A67C5B] rounded-xl p-8 relative">
            <div className="absolute -top-4 left-6 bg-[#A67C5B] text-[#1A1A1A] px-3 py-1 rounded text-sm font-bold">POPULAR</div>
            <h3 className="text-2xl font-bold text-[#FAFAF7] mb-2">Plan Premium</h3>
            <p className="text-[#FAFAF7]/60 mb-6">Acceso completo y personalizado</p>
            <div className="text-4xl font-bold text-[#A67C5B] mb-6">$9.99<span className="text-lg">/mes</span></div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-[#FAFAF7]"><span className="text-[#A67C5B]">✓</span> Rutinas personalizadas</li>
              <li className="flex items-center gap-3 text-[#FAFAF7]"><span className="text-[#A67C5B]">✓</span> Planes de nutrición completos</li>
              <li className="flex items-center gap-3 text-[#FAFAF7]"><span className="text-[#A67C5B]">✓</span> Meditaciones premium</li>
              <li className="flex items-center gap-3 text-[#FAFAF7]"><span className="text-[#A67C5B]">✓</span> Seguimiento avanzado</li>
              <li className="flex items-center gap-3 text-[#FAFAF7]"><span className="text-[#A67C5B]">✓</span> Chat con Maleja (1/sem)</li>
            </ul>
            <Link href="/dashboard" className="block w-full bg-[#A67C5B] hover:bg-[#C9A882] text-[#1A1A1A] text-center py-2 rounded-lg font-semibold transition">
              Prueba 7 días gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#6B8F71]/20 bg-[#1A1A1A]/80 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-[#FAFAF7]/60">
          <p>© 2024 Small Habits Hub. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-[#2D2D2D] border border-[#6B8F71]/20 rounded-lg p-6 hover:border-[#6B8F71]/50 transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-[#FAFAF7] mb-2">{title}</h3>
      <p className="text-[#FAFAF7]/70">{description}</p>
    </div>
  );
}
