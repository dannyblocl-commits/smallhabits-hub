import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#EDE6DC] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md border-2 border-[#C8D5C0] shadow-lg">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌿</div>
          <h1 className="text-3xl font-semibold text-[#6B8F71]" style={{ fontFamily: "Cormorant Garamond, serif" }}>Small Habits</h1>
          <p className="text-sm text-[#6B6560] tracking-widest">HUB WELLNESS</p>
        </div>

        <form action="/dashboard" className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Email</label>
            <input type="email" defaultValue="maria.garcia@example.com" className="w-full border border-[#E0D5C8] rounded-lg px-4 py-3 focus:outline-none focus:border-[#6B8F71]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Contraseña</label>
            <input type="password" defaultValue="demo1234" className="w-full border border-[#E0D5C8] rounded-lg px-4 py-3 focus:outline-none focus:border-[#6B8F71]" />
          </div>
          <button type="submit" className="w-full bg-[#6B8F71] hover:bg-[#5a7a61] text-white py-3 rounded-full font-semibold transition">
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#6B6560]">
          <p>Demo: cualquier email entra directo</p>
          <Link href="/" className="text-[#A67C5B] hover:underline mt-2 inline-block">← Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}
