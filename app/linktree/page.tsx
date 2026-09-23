export const metadata = {
  title: "Small Habits by Maleja — Todos los links",
  description: "Acceso directo a coaching, redes, y comunidad de Small Habits.",
};

export default function LinkTree() {
  const links = [
    { label: "👉 Ver planes y comenzar", url: "https://smallhabits-hub.vercel.app#planes", color: "#FF2D8A" },
    { label: "📱 Descargar la app", url: "https://apps.apple.com/app/small-habits", color: "#7FC29B" },
    { label: "📸 Instagram", url: "https://instagram.com", color: "#E4405F" },
    { label: "🎵 TikTok", url: "https://tiktok.com", color: "#000000" },
    { label: "▶️ YouTube", url: "https://youtube.com", color: "#FF0000" },
    { label: "💬 WhatsApp", url: "https://wa.me/", color: "#25D366" },
    { label: "📧 Email", url: "mailto:hola@smallhabitsbymaleja.com", color: "#BA8E54" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#0B0B0F" }}>
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-2" style={{ color: "#F5F2F0" }}>
            <span style={{ color: "#FF2D8A" }}>Small</span> Habits
          </h1>
          <p className="text-lg" style={{ color: "#A8A3AE" }}>
            by Maleja
          </p>
          <p className="text-sm mt-4" style={{ color: "#BA8E54" }}>
            Pequeños hábitos, grandes resultados
          </p>
        </div>

        {/* LINKS */}
        <div className="space-y-3 mb-12">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block py-4 px-6 rounded-lg font-bold text-center transition-transform hover:scale-105"
              style={{
                background: link.color,
                color: link.color === "#000000" || link.color === "#FF0000" ? "#FFF" : "#0B0B0F",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: "Transformadas", value: "500+" },
            { label: "Certificación", value: "ISSA" },
            { label: "Promedio", value: "90 días" },
          ].map((stat, i) => (
            <div key={i} className="text-center" style={{ background: "#1a1a1f", padding: "16px", borderRadius: "12px" }}>
              <div className="text-2xl font-black" style={{ color: "#FF2D8A" }}>
                {stat.value}
              </div>
              <div className="text-xs mt-2" style={{ color: "#A8A3AE" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="text-center text-sm" style={{ color: "#A8A3AE" }}>
          <p>© 2026 Small Habits by Maleja</p>
        </div>
      </div>
    </div>
  );
}
