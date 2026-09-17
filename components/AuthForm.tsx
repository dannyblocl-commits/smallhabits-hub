"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, signup, type AuthState } from "@/app/actions/auth";
import type { Dict } from "@/lib/i18n";

export function AuthForm({ mode, L, goals }: { mode: "login" | "signup"; L: Dict["auth"]; goals: Dict["goals"] }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(mode === "login" ? login : signup, undefined);
  const isSignup = mode === "signup";
  return (
    <form action={action} className="space-y-4">
      {isSignup && (
        <div><label className="eyebrow block mb-1" htmlFor="name">{L.name}</label><input id="name" name="name" required minLength={2} placeholder={L.namePh} className="input" /></div>
      )}
      <div><label className="eyebrow block mb-1" htmlFor="email">{L.email}</label><input id="email" name="email" type="email" required autoComplete="email" className="input" /></div>
      <div><label className="eyebrow block mb-1" htmlFor="password">{L.password}</label><input id="password" name="password" type="password" required minLength={6} autoComplete={isSignup ? "new-password" : "current-password"} className="input" /></div>
      {isSignup && (
        <div><label className="eyebrow block mb-1" htmlFor="goal">{L.goal}</label>
          <select id="goal" name="goal" className="input">{Object.entries(goals).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        </div>
      )}
      {isSignup && (
        <details className="row p-3">
          <summary className="text-xs muted cursor-pointer">{L.coachQ}</summary>
          <input id="coach_code" name="coach_code" placeholder={L.coachCode} className="input input-s mt-2" autoCapitalize="characters" />
          <p className="faint text-[.65rem] mt-1">{L.coachHint}</p>
        </details>
      )}
      {state?.error && <p className="text-sm rounded-[12px] px-4 py-3" style={{ background: "rgba(255,90,90,.12)", color: "#FF8A8A" }}>{state.error}</p>}
      <button type="submit" disabled={pending} className="btn btn-go w-full">{pending ? L.wait : isSignup ? L.crear : L.entrar}</button>
      <p className="text-center text-xs muted">
        {isSignup ? <>{L.haveAccount} <Link href="/login" className="underline">{L.entrar}</Link></> : <>{L.firstTime} <Link href="/signup" className="underline">{L.crearGratis}</Link></>}
      </p>
    </form>
  );
}
