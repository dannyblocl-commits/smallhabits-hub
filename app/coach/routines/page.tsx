import Link from "next/link";
import { requireCoach } from "@/lib/auth";
import { listRoutines, getRoutine, type Exercise } from "@/lib/library";
import { saveRoutine, deleteRoutine } from "@/app/actions/library";
import { Logo } from "@/components/Leaves";

const TYPES = ["funcional", "calistenia", "pilates", "yoga", "estiramientos"];
const DIFF = [["beginner", "Principiante"], ["intermediate", "Intermedio"], ["advanced", "Avanzado"]];

export default async function CoachRoutines({ searchParams }: { searchParams: Promise<{ id?: string; new?: string; ok?: string; tr?: string }> }) {
  await requireCoach();
  const sp = await searchParams;
  const routines = await listRoutines();
  const editing = sp.id ? await getRoutine(sp.id) : null;
  const showForm = !!editing || sp.new === "1";
  const ex: Exercise[] = editing?.exercises ?? [];
  const rows = Array.from({ length: Math.max(6, ex.length + 1) }, (_, i) => ex[i]);

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "var(--surface-1)", borderColor: "var(--line)", paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3"><Link href="/coach"><Logo /></Link><span className="pill pill-f">Rutinas</span></div>
          <div className="flex gap-2"><Link href="/coach/menus" className="btn btn-ghost btn-sm">Menús</Link><Link href="/coach" className="btn btn-ghost btn-sm">← Panel</Link></div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-5 py-6 grid lg:grid-cols-[380px_1fr] gap-6">
        <aside>
          <div className="flex items-center justify-between mb-3"><div className="eyebrow" style={{ color: "var(--fucsia)" }}>Biblioteca</div><Link href="/coach/routines?new=1" className="btn btn-go btn-sm">+ Nueva</Link></div>
          {sp.ok && <div className="row p-3 mb-3 text-sm" style={{ borderColor: "var(--sage)" }}>Guardado. Las miembros ya lo ven.{sp.tr === "ok" && " Traducido a inglés y portugués."}{sp.tr === "no" && " No se pudo traducir: se verá en español hasta que lo guardes otra vez."}</div>}
          <div className="space-y-2">
            {routines.map((r) => (
              <Link key={r.id} href={`/coach/routines?id=${r.id}`} className={`row block p-4 ${editing?.id === r.id ? "!border-[var(--fucsia)]" : ""}`}>
                <div className="flex justify-between gap-2"><div className="display text-sm">{r.name}</div><span className={`pill ${r.free ? "pill-s" : "pill-f"}`}>{r.free ? "Gratis" : "Premium"}</span></div>
                <div className="faint text-xs mt-1">{r.type} · {r.duration_minutes} min · {r.exercises.length} ejercicios</div>
              </Link>
            ))}
          </div>
        </aside>

        <main>
          {!showForm && <div className="card p-8 text-center muted">Elige una rutina para editarla o crea una nueva. Todo lo que guardes se ve al instante en la app de las miembros.</div>}
          {showForm && (
            <form action={saveRoutine} className="card p-6 space-y-4">
              {editing && <input type="hidden" name="id" value={editing.id} />}
              <div className="flex items-center justify-between"><h1 className="text-2xl">{editing ? `Editar: ${editing.name}` : "Nueva rutina"}</h1>{editing && <span className="faint text-xs">id {editing.id}</span>}</div>
              <div className="grid md:grid-cols-2 gap-3">
                <div><label className="eyebrow block mb-1" htmlFor="name">Nombre</label><input id="name" name="name" required defaultValue={editing?.name ?? ""} className="input" /></div>
                <div><label className="eyebrow block mb-1" htmlFor="type">Tipo</label><select id="type" name="type" defaultValue={editing?.type ?? "funcional"} className="input">{TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
                <div className="md:col-span-2"><label className="eyebrow block mb-1" htmlFor="description">Descripción (lo que ve la miembro)</label><input id="description" name="description" defaultValue={editing?.description ?? ""} className="input" /></div>
                <div><label className="eyebrow block mb-1" htmlFor="duration_minutes">Duración (min)</label><input id="duration_minutes" name="duration_minutes" type="number" min="1" max="240" defaultValue={editing?.duration_minutes ?? 20} className="input input-s" /></div>
                <div><label className="eyebrow block mb-1" htmlFor="difficulty">Nivel</label><select id="difficulty" name="difficulty" defaultValue={editing?.difficulty ?? "beginner"} className="input">{DIFF.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
                <div><label className="eyebrow block mb-1" htmlFor="sort">Orden</label><input id="sort" name="sort" type="number" defaultValue={editing?.sort ?? 100} className="input input-s" /></div>
                <label className="flex items-center gap-2 text-sm mt-6"><input type="checkbox" name="free" defaultChecked={editing?.free ?? false} /> Gratis (visible sin pagar)</label>
              </div>

              <div className="eyebrow mt-2" style={{ color: "var(--fucsia)" }}>Ejercicios (deja vacío el nombre para omitir)</div>
              <div className="space-y-2">
                {rows.map((e, i) => (
                  <div key={i} className="row p-3 grid grid-cols-2 md:grid-cols-6 gap-2 items-end">
                    <div className="md:col-span-2"><label className="faint text-[.6rem]">Ejercicio {i + 1}</label><input name="ex_name" defaultValue={e?.name ?? ""} className="input input-s" placeholder="Ej: Sentadillas" /></div>
                    <div><label className="faint text-[.6rem]">Series</label><input name="ex_sets" type="number" min="1" max="20" defaultValue={e?.sets ?? 3} className="input input-s" /></div>
                    <div><label className="faint text-[.6rem]">Reps</label><input name="ex_reps" defaultValue={e?.reps ?? "12"} className="input input-s" placeholder="12 o 30 seg" /></div>
                    <div><label className="faint text-[.6rem]">Descanso (s)</label><input name="ex_rest" type="number" min="0" max="600" defaultValue={e?.rest_seconds ?? 45} className="input input-s" /></div>
                    <div><label className="faint text-[.6rem]">Músculos</label><input name="ex_muscles" defaultValue={e?.muscle_groups?.join(", ") ?? ""} className="input input-s" placeholder="glúteos, core" /></div>
                    <div className="col-span-2 md:col-span-6"><input name="ex_desc" defaultValue={e?.description ?? ""} className="input input-s" placeholder="Técnica: cómo hacerlo bien, qué evitar" /></div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap"><button className="btn btn-go">Guardar rutina</button><Link href="/coach/routines" className="btn btn-ghost">Cancelar</Link>{editing && <Link href="/coach/content" className="btn btn-ghost btn-sm">Subir video de esta rutina</Link>}</div>
            </form>
          )}
          {editing && (
            <form action={deleteRoutine} className="mt-4 text-right"><input type="hidden" name="id" value={editing.id} /><button className="faint text-xs hover:text-[#FF8A8A]">Eliminar esta rutina</button></form>
          )}
        </main>
      </div>
    </div>
  );
}
