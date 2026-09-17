"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, signup, type AuthState } from "@/app/actions/auth";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(mode === "login" ? login : signup, undefined);
  const isSignup = mode === "signup";
  return (
    <form action={action} className="space-y-4">
      {isSignup && (
        <div><label className="eyebrow block mb-1" htmlFor="name">Tu nombre</label><input id="name" name="name" required minLength={2} placeholder="Como quieres que te llame la app" className="input" /></div>
      )}
      <div><label className="eyebrow block mb-1" htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" className="input" /></div>
      <div><label className="eyebrow block mb-1" htmlFor="password">Contraseña</label><input id="password" name="password" type="password" required minLength={6} autoComplete={isSignup ? "new-password" : "current-password"} className="input" /></div>
      {isSignup && (
        <div><label className="eyebrow block mb-1" htmlFor="goal">Tu objetivo</label>
          <select id="goal" name="goal" className="input">{["Tonificar", "Perder peso", "Ganar fuerza", "Resistencia", "Flexibilidad", "Salud integral"].map((g) => <option key={g}>{g}</option>)}</select>
        </div>
      )}
      {isSignup && (
        <details className="row p-3">
          <summary className="text-xs muted cursor-pointer">¿Eres coach? Ingresa tu código</summary>
          <input id="coach_code" name="coach_code" placeholder="Código de coach" className="input input-s mt-2" autoCapitalize="characters" />
          <p className="faint text-[.65rem] mt-1">Solo para coaches invitadas por Small Habits. Los miembros lo dejan vacío.</p>
        </details>
      )}
      {state?.error && <p className="text-sm rounded-[12px] px-4 py-3" style={{ background: "rgba(255,90,90,.12)", color: "#FF8A8A" }}>{state.error}</p>}
      <button type="submit" disabled={pending} className="btn btn-go w-full">{pending ? "Un momento…" : isSignup ? "Crear mi cuenta" : "Entrar"}</button>
      <p className="text-center text-xs muted">
        {isSignup ? <>¿Ya tienes cuenta? <Link href="/login" className="underline">Inicia sesión</Link></> : <>¿Primera vez? <Link href="/signup" className="underline">Crea tu cuenta gratis</Link></>}
      </p>
    </form>
  );
}
