import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "@/app/actions/auth";
import { listAllUsers, adminUpdateUser, adminDeleteUser, adminStartReto, adminStopReto } from "@/app/actions/admin";
import { retoProgress } from "@/lib/reto-plan";
import { PLANS } from "@/lib/plan";
import { Logo } from "@/components/Leaves";

const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short" }) : "—");

export default async function Admin() {
  const admin = await requireAdmin();
  const users = await listAllUsers();
  const coaches = users.filter((u) => u.role === "coach");
  const members = users.filter((u) => u.role === "member");
  const paying = members.filter((m) => m.plan !== "free").length;

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "var(--surface-1)", borderColor: "var(--line)", paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3"><Logo /><span className="pill pill-g">Admin</span></div>
          <div className="flex items-center gap-3 text-sm">
            <span className="muted hidden sm:inline">{admin.name}</span>
            {admin.role === "coach" && <Link href="/coach" className="btn btn-ghost btn-sm">Panel coach</Link>}
            <Link href="/coach/reto" className="btn btn-ghost btn-sm">🏁 Inscripciones</Link>
            <Link href="/dashboard/reto" className="btn btn-ghost btn-sm">Ver reto</Link>
            <Link href="/dashboard" className="btn btn-ghost btn-sm">App</Link>
            <form action={logout}><button className="faint text-xs">Salir</button></form>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-6">
        <div className="eyebrow" style={{ color: "var(--gold)" }}>Dueño de la plataforma</div>
        <h1 className="text-3xl md:text-4xl mb-5">Accesos</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[["Usuarios", users.length, ""], ["Coaches", coaches.length, "var(--sage)"], ["Miembros", members.length, ""], ["De pago", paying, "var(--fucsia)"]].map(([l, v, c]) => (
            <div key={l as string} className="row p-4"><div className="eyebrow">{l}</div><div className="num text-3xl mt-1" style={c ? { color: c as string } : undefined}>{v}</div></div>
          ))}
        </div>

        <p className="muted text-sm mb-3">Cambia plan, rol o coach y pulsa Guardar en esa fila. El cambio aplica al instante en la cuenta de esa persona (sin pasar por Stripe: útil para invitados, pruebas y cortesías).</p>

        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left" style={{ color: "var(--text-3)" }}>
              {["Usuario", "Rol", "Plan", "Coach", "Reto 30 días", "Registro", "Última actividad", ""].map((h) => <th key={h} className="px-3 py-3 eyebrow font-semibold">{h}</th>)}
            </tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderTop: "1px solid var(--line)" }}>
                  <td className="px-3 py-3"><div className="display">{u.name}</div><div className="faint text-xs">{u.email}</div></td>
                  <td className="px-3 py-2" colSpan={3}>
                    <form action={adminUpdateUser} className="flex flex-wrap items-center gap-2">
                      <input type="hidden" name="id" value={u.id} />
                      <select name="role" defaultValue={u.role} className="input input-s !w-auto !py-1.5"><option value="member">miembro</option><option value="coach">coach</option></select>
                      <select name="plan" defaultValue={u.plan} className="input input-s !w-auto !py-1.5"><option value="free">gratis</option>{(["basico", "pro", "elite"] as const).map((p) => <option key={p} value={p}>{PLANS[p].name}</option>)}</select>
                      <select name="coach_id" defaultValue={u.coach_id ?? ""} className="input input-s !w-auto !py-1.5" disabled={u.role === "coach"}><option value="">— coach —</option>{coaches.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
                      <button className="btn btn-balance btn-sm">Guardar</button>
                    </form>
                  </td>
                  <td className="px-3 py-2">
                    {(() => {
                      const p = retoProgress(u.reto_start);
                      return p && !p.done ? (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="pill pill-f">Día {p.day}/30 {u.reto_track === "hombre" ? "♂" : "♀"}</span>
                          <form action={adminStopReto}><input type="hidden" name="id" value={u.id} /><button className="faint hover:text-[#FF8A8A]" title="Quitar el reto (no cambia el plan)">quitar</button></form>
                        </div>
                      ) : (
                        <div className="flex gap-1">
                          {(["mujer", "hombre"] as const).map((tk) => (
                            <form key={tk} action={adminStartReto}>
                              <input type="hidden" name="id" value={u.id} /><input type="hidden" name="track" value={tk} />
                              <button className="btn btn-ghost btn-sm" title={`Asignar Reto 30 días (guía ${tk}): Pro + 30 días + guía en la app`}>Reto {tk === "mujer" ? "♀" : "♂"}</button>
                            </form>
                          ))}
                        </div>
                      );
                    })()}
                  </td>
                  <td className="px-3 py-3 muted">{fmt(u.created_at)}</td>
                  <td className="px-3 py-3 muted">{fmt(u.last_seen)}</td>
                  <td className="px-3 py-3">
                    {u.id !== admin.id && <form action={adminDeleteUser}><input type="hidden" name="id" value={u.id} /><button className="faint text-xs hover:text-[#FF8A8A]" title="Eliminar cuenta y sus datos">Eliminar</button></form>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row p-4 mt-6 text-sm muted">
          <div className="eyebrow mb-1">Quién es admin</div>
          Los emails listados en <span className="display text-[var(--text)]">ADMIN_EMAILS</span> (variable de entorno en Vercel). Hoy: {(process.env.ADMIN_EMAILS || "").split(",").filter(Boolean).join(", ") || "ninguno"}.
        </div>
      </div>
    </div>
  );
}
