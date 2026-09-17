export function PremiumLock({ feature, description }: { feature: string; description: string }) {
  return (
    <div className="relative">
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">🔒</div>
          <p className="text-[#FAFAF7] font-bold mb-1">{feature} es Premium</p>
          <p className="text-[#FAFAF7]/70 text-sm">Actualiza para acceso completo</p>
        </div>
      </div>

      {/* Content (blurred) */}
      <div className="blur-sm opacity-50">{description}</div>
    </div>
  );
}

export function PremiumBanner() {
  return (
    <div className="bg-gradient-to-r from-[#A67C5B]/20 to-[#6B8F71]/20 border-2 border-[#A67C5B] rounded-xl p-8 text-center">
      <div className="text-3xl mb-3">✨</div>
      <h2 className="text-2xl font-bold text-[#FAFAF7] mb-3">Desbloquea Premium</h2>
      <p className="text-[#FAFAF7]/70 mb-6">
        Accede a todos los planes de nutrición, meditaciones premium y seguimiento avanzado
      </p>
      <button className="bg-[#A67C5B] hover:bg-[#C9A882] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold transition">
        Actualizar a Premium - $9.99/mes
      </button>
      <p className="text-[#FAFAF7]/60 text-xs mt-4">Prueba gratis por 7 días. Sin compromiso.</p>
    </div>
  );
}
