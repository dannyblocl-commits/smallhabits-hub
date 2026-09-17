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
      <a href="/api/auth/google/start" className="btn w-full !bg-white !text-[#1f1f1f] gap-3">
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.5 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 6.9-10.3 6.9-17.7z"/><path fill="#FBBC05" d="M10.5 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.1.8-4.6l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.1 1.4-4.9 2.3-8.2 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>
        {L.google}
      </a>
      <div className="flex items-center gap-3 faint text-[.65rem] uppercase tracking-widest"><span className="flex-1 h-px" style={{ background: "var(--line)" }} />{L.o}<span className="flex-1 h-px" style={{ background: "var(--line)" }} /></div>
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
