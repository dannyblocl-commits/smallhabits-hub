"use client";

import { useActionState } from "react";
import { updateProfile, type AuthState } from "@/app/actions/auth";

export function ProfileForm({ user }: { user: { name: string; goal: string; weight: number | null; height: number | null; email: string } }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(updateProfile, undefined);
  return (
    <form action={action} className="card p-6 space-y-4 max-w-lg">
      <div><label className="eyebrow block mb-1" htmlFor="p-name">Nombre</label><input id="p-name" name="name" defaultValue={user.name} required minLength={2} className="input" /></div>
      <div><label className="eyebrow block mb-1">Email</label><div className="input opacity-60">{user.email}</div></div>
      <div><label className="eyebrow block mb-1" htmlFor="p-goal">Objetivo</label>
        <select id="p-goal" name="goal" defaultValue={user.goal} className="input">{["Tonificar", "Perder peso", "Ganar fuerza", "Resistencia", "Flexibilidad", "Salud integral"].map((g) => <option key={g}>{g}</option>)}</select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="eyebrow block mb-1" htmlFor="p-weight">Peso (kg)</label><input id="p-weight" name="weight" type="number" step="0.1" min="30" max="300" defaultValue={user.weight ?? ""} className="input input-s" /></div>
        <div><label className="eyebrow block mb-1" htmlFor="p-height">Altura (cm)</label><input id="p-height" name="height" type="number" min="100" max="250" defaultValue={user.height ?? ""} className="input input-s" /></div>
      </div>
      <p className="faint text-xs">Cada vez que guardas un peso nuevo se añade a tu historial de progreso.</p>
      {state?.error && <p className="text-sm" style={{ color: "#FF8A8A" }}>{state.error}</p>}
      <button type="submit" disabled={pending} className="btn btn-go w-full">{pending ? "Guardando…" : "Guardar cambios"}</button>
    </form>
  );
}
