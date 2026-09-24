import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { signupFree as signupFreeAction } from "@/app/actions/auth";
import Link from "next/link";

async function handleSignupFree(formData: FormData) {
  "use server";
  return signupFreeAction(undefined, formData);
}

export const metadata = {
  title: "Prueba Gratuita — Small Habits by Maleja",
  description: "3 días gratis. Sin tarjeta requerida.",
};

export default async function SignupFreePage() {
  if (await getUser()) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#0B0B0F" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2" style={{ color: "#FF2D8A" }}>
            Small Habits
          </h1>
          <p style={{ color: "#A8A3AE" }}>3 días gratis. Sin tarjeta.</p>
        </div>

        <form action={handleSignupFree} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: "#F5F2F0" }}>
              Nombre
            </label>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre completo"
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1f] text-white border border-[#7FC29B]/30 focus:outline-none focus:border-[#7FC29B]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: "#F5F2F0" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1f] text-white border border-[#7FC29B]/30 focus:outline-none focus:border-[#7FC29B]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: "#F5F2F0" }}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="Mínimo 6 caracteres"
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1f] text-white border border-[#7FC29B]/30 focus:outline-none focus:border-[#7FC29B]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold text-lg"
            style={{ background: "#FF2D8A", color: "#F5F2F0" }}
          >
            Comenzar mi prueba gratis
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "#A8A3AE" }}>
          Ya tienes cuenta?{" "}
          <Link href="/login" className="font-bold" style={{ color: "#FF2D8A" }}>
            Inicia sesión
          </Link>
        </p>

        <p className="text-center text-xs mt-8 px-4" style={{ color: "#7FC29B" }}>
          ✓ Acceso completo al plan Básico<br />
          ✓ 3 días sin cobro<br />
          ✓ Puedes cancelar cuando quieras
        </p>
      </div>
    </div>
  );
}
