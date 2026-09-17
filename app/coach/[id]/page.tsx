import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCoach } from "@/lib/auth";
import { getMember, getAssignment, assign } from "@/app/actions/assign";
import { listThread } from "@/app/actions/chat";
import { ChatThread } from "@/components/ChatThread";
import { Logo } from "@/components/Leaves";
import { demoRoutines } from "@/data/routines";

const menus = [["menu_1", "Tonificación · 1.800 kcal"], ["menu_2", "Pérdida de grasa · 1.500 kcal"], ["menu_3", "Ganancia muscular · 2.600 kcal"], ["menu_4", "Vegetariano balance · 1.900 kcal"]];
const fmt = (iso: string) => new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short" });

export default async function MemberDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireCoach();
  const { id } = await params;
  const [m, a, thread] = await Promise.all([getMember(id), getAssignment(id), listThread(id)]);
  if (!m) notFound();

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "var(--surface-1)", borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3"><Link href="/coach"><Logo /></Link><span className="pill pill-s">Panel coach</span></div>
          <Link href="/coach" className="btn btn-ghost btn-sm">← Miembros</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-6">
        <div className="eyebrow" style={{ color: "var(--sage)" }}>Miembro · {m.goal} · plan {m.plan}</div>
        <h1 className="text-3xl md:text-4xl">{m.name}</h1>
        <p className="muted text-sm mb-6">{m.email} · desde {fmt(m.created_at)}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[["Kcal hoy", m.kcal_today, ""], ["Entrenos semana", m.workouts_week, "var(--sage)"], ["Entrenos totales", m.workouts_total, ""], ["Peso", m.weight ?? "—", "var(--sage)"]].map(([l, v, c]) => (
            <div key={l as string} className="row p-4"><div className="eyebrow">{l}</div><div className="num text-3xl mt-1" style={c ? { color: c as string } : undefined}>{v}</div></div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="space-y-5">
            <form action={assign} className="card p-5 space-y-3">
              <input type="hidden" name="user_id" value={m.id} />
              <div className="eyebrow" style={{ color: "var(--sage)" }}>Asignar plan de la semana</div>
              {a && <p className="faint text-xs">Última asignación: {fmt(a.at)} por {a.coach_name}</p>}
              <div><label className="eyebrow block mb-1" htmlFor="routine_id">Rutina</label>
                <select id="routine_id" name="routine_id" defaultValue={a?.routine_id ?? ""} className="input input-s"><option value="">— sin asignar —</option>{demoRoutines.map((r) => <option key={r.id} value={r.id}>{r.name} · {r.duration_minutes} min</option>)}</select></div>
              <div><label className="eyebrow block mb-1" htmlFor="menu_id">Menú</label>
                <select id="menu_id" name="menu_id" defaultValue={a?.menu_id ?? ""} className="input input-s"><option value="">— sin asignar —</option>{menus.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
              <div><label className="eyebrow block mb-1" htmlFor="note">Nota para el miembro</label>
                <textarea id="note" name="note" rows={3} defaultValue={a?.note ?? ""} placeholder="Ej: esta semana prioriza técnica, no velocidad." className="input input-s" /></div>
              <button className="btn btn-balance w-full">Guardar asignación</button>
            </form>

            <div className="card p-5">
              <div className="eyebrow mb-2">Últimas comidas</div>
              {m.foods.length === 0 && <p className="muted text-sm">Sin registros todavía.</p>}
              {m.foods.map((f: { name: string; kcal: number; at: string }, i: number) => (<div key={i} className="flex justify-between text-sm py-1.5" style={{ borderTop: i ? "1px solid var(--line)" : undefined }}><span className="muted">{fmt(f.at)} · {f.name}</span><span className="num">{f.kcal}</span></div>))}
            </div>

            <div className="card p-5">
              <div className="eyebrow mb-2">Historial de peso</div>
              {m.weights.length === 0 && <p className="muted text-sm">Sin registros todavía.</p>}
              <div className="flex flex-wrap gap-2">{m.weights.map((w: { weight: number; at: string }, i: number) => <span key={i} className="pill">{fmt(w.at)} · {w.weight} kg</span>)}</div>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-2" style={{ color: "var(--sage)" }}>Chat con {m.name.split(" ")[0]}</div>
            <ChatThread initial={thread.messages} peerId={thread.peerId} peerName={m.name.split(" ")[0]} canSend memberId={m.id} accent="sage" />
            <p className="fine mt-2">El miembro ve tus mensajes en su Chat. Si su plan es gratis o Básico, puede leerte pero no responder hasta Pro.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
