import Link from "next/link";
import { Logo, Glow } from "@/components/Leaves";

export default function Login() {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-5" style={{ background: "var(--obsidian)" }}>
      <Glow />
      <div className="glass lift p-9 w-full max-w-md relative fade-in">
        <div className="text-center mb-8"><Logo size="text-3xl" /><p className="eyebrow mt-2">Hub wellness · by Maleja</p></div>
        <form action="/dashboard" className="space-y-4">
          <div><label className="eyebrow block mb-1" htmlFor="email">Email</label><input id="email" type="email" defaultValue="maria.garcia@example.com" className="input" /></div>
          <div><label className="eyebrow block mb-1" htmlFor="pass">Contraseña</label><input id="pass" type="password" defaultValue="demo1234" className="input" /></div>
          <button type="submit" className="btn btn-go w-full">Entrar</button>
        </form>
        <p className="quote text-center muted mt-6">Wellness from the inside out.</p>
        <p className="text-center text-xs faint mt-4"><Link href="/" className="hover:text-[var(--text)]">← Volver</Link></p>
      </div>
    </div>
  );
}
