import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { Logo, Glow } from "@/components/Leaves";
import { AuthForm } from "@/components/AuthForm";

export default async function Signup() {
  if (await getUser()) redirect("/dashboard");
  return (
    <div className="min-h-screen relative flex items-center justify-center px-5 py-10" style={{ background: "var(--obsidian)" }}>
      <Glow />
      <div className="glass lift p-9 w-full max-w-md relative fade-in">
        <div className="text-center mb-6"><Logo size="text-3xl" /><p className="eyebrow mt-2">Crea tu cuenta gratis</p></div>
        <p className="muted text-sm text-center mb-6">Sin tarjeta. Lo gratis se queda gratis: 2 rutinas, 1 menú, reflexión diaria y tu registro de comidas.</p>
        <AuthForm mode="signup" />
        <p className="fine text-center mt-6">Al crear tu cuenta aceptas que el contenido es educativo y lo practicas bajo tu responsabilidad.</p>
        <p className="text-center text-xs faint mt-3"><Link href="/" className="hover:text-[var(--text)]">← Volver</Link></p>
      </div>
    </div>
  );
}
