import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCoach } from "@/lib/auth";
import { getMember, getAssignment, assign } from "@/app/actions/assign";
import { listThread } from "@/app/actions/chat";
import { listPhotos } from "@/app/actions/photos";
import { listMyMenus } from "@/app/actions/menus";
import { listRoutines, listMenus, listRecommendations } from "@/lib/library";
import { addRecommendation, deleteRecommendation } from "@/app/actions/library";
import { ChatThread } from "@/components/ChatThread";
import { Logo } from "@/components/Leaves";
const fmt = (iso: string) => new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short" });

export default async function MemberDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireCoach();
  const { id } = await params;
  const [m, a, thread, photos, userMenus, routines, libMenus, recs] = await Promise.all([getMember(id), getAssignment(id), listThread(id), listPhotos(id), listMyMenus(id), listRoutines(), listMenus(), listRecommendations(id, undefined, 20)]);
  if (!m) notFound();
  const firstPhoto = photos[0], lastPhoto = photos.length > 1 ? photos[photos.length - 1] : null;

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "var(--surface-1)", borderColor: "var(--line)", paddingTop: "env(safe-area-inset-top, 0px)" }}>
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
                <select id="routine_id" name="routine_id" defaultValue={a?.routine_id ?? ""} className="input input-s"><option value="">— sin asignar —</option>{routines.map((r) => <option key={r.id} value={r.id}>{r.name} · {r.duration_minutes} min</option>)}</select></div>
              <div><label className="eyebrow block mb-1" htmlFor="menu_id">Plan de alimentación</label>
                <select id="menu_id" name="menu_id" defaultValue={a?.menu_id ?? ""} className="input input-s"><option value="">— sin asignar —</option>{libMenus.map((x) => <option key={x.id} value={x.id}>{x.name} · {x.kcal} kcal</option>)}</select></div>
              <div><label className="eyebrow block mb-1" htmlFor="note">Nota para el miembro</label>
                <textarea id="note" name="note" rows={3} defaultValue={a?.note ?? ""} placeholder="Ej: esta semana prioriza técnica, no velocidad." className="input input-s" /></div>
              <button className="btn btn-balance w-full">Guardar asignación</button>
            </form>

            <div className="card p-5">
              <div className="eyebrow mb-2">Últimas comidas</div>
              {m.foods.length === 0 && <p className="muted text-sm">Sin registros todavía.</p>}
              {m.foods.map((f: { name: string; kcal: number; at: string }, i: number) => (<div key={i} className="flex justify-between text-sm py-1.5" style={{ borderTop: i ? "1px solid var(--line)" : undefined }}><span className="muted">{fmt(f.at)} · {f.name}</span><span className="num">{f.kcal}</span></div>))}
            </div>

            <div className="card lift p-5">
              <div className="eyebrow mb-2" style={{ color: "var(--fucsia)" }}>Recomendaciones personalizadas</div>
              <p className="faint text-xs mb-3">La miembro las ve en su inicio y en la sección correspondiente (entreno, nutrición o mente).</p>
              <form action={addRecommendation} className="space-y-2">
                <input type="hidden" name="user_id" value={m.id} />
                <select name="category" className="input input-s"><option value="general">General</option><option value="entreno">Entreno</option><option value="nutricion">Nutrición</option><option value="mente">Mente</option></select>
                <textarea name="body" rows={3} required placeholder="Ej: esta semana sube a 12 reps en sentadilla; en la cena cambia el arroz por camote." className="input input-s" />
                <button className="btn btn-go btn-sm w-full">Enviar recomendación</button>
              </form>
              <div className="mt-4 space-y-2">
                {recs.length === 0 && <p className="muted text-sm">Sin recomendaciones todavía.</p>}
                {recs.map((r) => (
                  <div key={r.id} className="row p-3 text-sm">
                    <div className="flex justify-between items-start gap-2"><span className="pill">{r.category}</span><form action={deleteRecommendation}><input type="hidden" name="id" value={r.id} /><input type="hidden" name="user_id" value={m.id} /><button className="faint text-xs">✕</button></form></div>
                    <p className="mt-2">{r.body}</p><p className="faint text-[.65rem] mt-1">{fmt(r.at)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <div className="eyebrow mb-2" style={{ color: "var(--fucsia)" }}>Antes y después</div>
              {photos.length === 0 && <p className="muted text-sm">Sin fotos todavía.</p>}
              {firstPhoto && (
                <div className="grid grid-cols-2 gap-2">
                  {[firstPhoto, lastPhoto ?? firstPhoto].map((p, i) => (
                    <div key={`${p.id}-${i}`} className="relative rounded-[12px] overflow-hidden" style={{ aspectRatio: "3/4" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 veil" />
                      <div className="absolute bottom-2 left-2 text-xs"><span className={`pill ${i === 0 ? "" : "pill-f"}`}>{i === 0 ? "Antes" : "Ahora"}</span><div className="mt-1">{fmt(p.at)}{p.weight != null ? ` · ${p.weight} kg` : ""}</div></div>
                    </div>
                  ))}
                </div>
              )}
              {photos.length > 2 && <p className="faint text-xs mt-2">{photos.length} fotos en total</p>}
            </div>

            <div className="card p-5">
              <div className="eyebrow mb-2" style={{ color: "var(--sage)" }}>Sus menús</div>
              {userMenus.length === 0 && <p className="muted text-sm">Aún no ha creado menús.</p>}
              {userMenus.map((mn) => (
                <div key={mn.id} className="row p-3 mb-2">
                  <div className="flex justify-between"><span className="display text-sm">{mn.name}</span><span className="num text-sm" style={{ color: "var(--sage)" }}>{mn.kcal} kcal</span></div>
                  <div className="faint text-xs mt-1">{mn.items.map((it) => `${it.name} (${it.kcal})`).join(" · ")}</div>
                </div>
              ))}
            </div>

            <div className="card p-5">
              <div className="eyebrow mb-2">Historial de peso</div>
              {m.weights.length === 0 && <p className="muted text-sm">Sin registros todavía.</p>}
              <div className="flex flex-wrap gap-2">{m.weights.map((w: { weight: number; at: string }, i: number) => <span key={i} className="pill">{fmt(w.at)} · {w.weight} kg</span>)}</div>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-2" style={{ color: "var(--sage)" }}>Chat con {m.name.split(" ")[0]}</div>
            <ChatThread initial={thread.messages} peerId={thread.peerId} peerName={m.name.split(" ")[0]} canSend memberId={m.id} accent="sage" L={{ writeTo: "Escribe a", desdePro: "", noCoach: "", firstMsg: "Escribe el primer mensaje a", enviar: "Enviar" }} />
            <p className="fine mt-2">El miembro ve tus mensajes en su Chat. Si su plan es gratis o Básico, puede leerte pero no responder hasta Pro.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
