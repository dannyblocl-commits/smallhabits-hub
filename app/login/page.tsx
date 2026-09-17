import Link from "next/link";
import { Leaves, Logo } from "@/components/Leaves";

export default function Login() {
  return (
    <div className="min-h-screen bg-hero relative flex items-center justify-center px-6">
      <Leaves />
      <div className="card p-10 w-full max-w-md relative">
        <div className="text-center mb-8">
          <Logo size="text-4xl" />
          <p className="text-[0.7rem] tracking-[0.15em] uppercase text-[#6B6560] mt-1">Hub wellness · by Maleja</p>
        </div>
        <form action="/dashboard" className="space-y-4">
          <div>
            <label className="block text-xs tracking-wide text-[#6B6560] mb-1">EMAIL</label>
            <input type="email" defaultValue="maria.garcia@example.com" className="w-full bg-white/80 border border-[#E0D5C8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#6B8F71]" />
          </div>
          <div>
            <label className="block text-xs tracking-wide text-[#6B6560] mb-1">CONTRASEÑA</label>
            <input type="password" defaultValue="demo1234" className="w-full bg-white/80 border border-[#E0D5C8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#6B8F71]" />
          </div>
          <button type="submit" className="btn btn-sage w-full">Entrar</button>
        </form>
        <p className="quote text-center text-[#6B6560] mt-6">Wellness from the inside out.</p>
        <p className="text-center text-xs text-[#6B6560] mt-4"><Link href="/" className="hover:text-[#9B3A5A]">← Volver</Link></p>
      </div>
    </div>
  );
}
