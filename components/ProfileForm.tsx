"use client";

import { useActionState } from "react";
import { updateProfile, type AuthState } from "@/app/actions/auth";
import type { Dict } from "@/lib/i18n";

export function ProfileForm({ user, L, goals }: { user: { name: string; goal: string; weight: number | null; height: number | null; email: string }; L: Dict["profile"]; goals: Dict["goals"] }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(updateProfile, undefined);
  return (
    <form action={action} className="card p-6 space-y-4 max-w-lg">
      <div><label className="eyebrow block mb-1" htmlFor="p-name">{L.nombre}</label><input id="p-name" name="name" defaultValue={user.name} required minLength={2} className="input" /></div>
      <div><label className="eyebrow block mb-1">Email</label><div className="input opacity-60">{user.email}</div></div>
      <div><label className="eyebrow block mb-1" htmlFor="p-goal">{L.objetivo}</label>
        <select id="p-goal" name="goal" defaultValue={user.goal} className="input">{Object.entries(goals).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="eyebrow block mb-1" htmlFor="p-weight">{L.pesoKg}</label><input id="p-weight" name="weight" type="number" step="0.1" min="30" max="300" defaultValue={user.weight ?? ""} className="input input-s" /></div>
        <div><label className="eyebrow block mb-1" htmlFor="p-height">{L.alturaCm}</label><input id="p-height" name="height" type="number" min="100" max="250" defaultValue={user.height ?? ""} className="input input-s" /></div>
      </div>
      <p className="faint text-xs">{L.note}</p>
      {state?.error && <p className="text-sm" style={{ color: "#FF8A8A" }}>{state.error}</p>}
      <button type="submit" disabled={pending} className="btn btn-go w-full">{pending ? L.guardando : L.guardar}</button>
    </form>
  );
}
