import Link from "next/link";
import { requireCoach } from "@/lib/auth";
import { listLessons, getLesson } from "@/lib/library";
import { saveLesson, deleteLesson } from "@/app/actions/library";
import { Logo } from "@/components/Leaves";
import { LessonBody } from "@/components/LessonBody";

export default async function CoachLearn({ searchParams }: { searchParams: Promise<{ id?: string; new?: string; ok?: string; tr?: string }> }) {
  await requireCoach();
  const sp = await searchParams;
  const [lessons, editing] = await Promise.all([listLessons(), sp.id ? getLesson(sp.id) : null]);
  const showForm = !!editing || sp.new === "1";

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "var(--surface-1)", borderColor: "var(--line)", paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3"><Link href="/coach"><Logo /></Link><span className="pill pill-s">Hacks nutricionales</span></div>
          <div className="flex gap-2"><Link href="/coach/recipes" className="btn btn-ghost btn-sm">Recetario</Link><Link href="/coach" className="btn btn-ghost btn-sm">← Panel</Link></div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-5 py-6 grid lg:grid-cols-[360px_1fr] gap-6">
        <aside>
          <div className="flex items-center justify-between mb-3"><div className="eyebrow" style={{ color: "var(--sage)" }}>{lessons.length} lecciones</div><Link href="/coach/learn?new=1" className="btn btn-balance btn-sm">+ Nueva</Link></div>
          {sp.ok && <div className="row p-3 mb-3 text-sm" style={{ borderColor: "var(--sage)" }}>Guardado.{sp.tr === "ok" && " Traducido a inglés y portugués."}{sp.tr === "no" && " No se pudo traducir: se muestra en español hasta que lo guardes otra vez."}</div>}
          <div className="space-y-2">
            {lessons.map((l, i) => (
              <Link key={l.id} href={`/coach/learn?id=${l.id}`} className={`row block p-3 ${editing?.id === l.id ? "!border-[var(--sage)]" : ""}`}>
                <div className="flex justify-between gap-2 items-start"><div className="display text-sm leading-tight"><span className="num mr-2" style={{ color: "var(--sage)" }}>{String(i + 1).padStart(2, "0")}</span>{l.title}</div><span className={`pill ${l.free ? "pill-s" : "pill-f"}`}>{l.free ? "Gratis" : "Premium"}</span></div>
              </Link>
            ))}
          </div>
        </aside>
        <main className="space-y-4">
          {!showForm && <div className="card p-8 text-center muted">Tus hacks nutricionales, tal como están en tu PDF. Elige una lección para editarla o crea una nueva. Escribes en español; la app traduce sola al guardar.</div>}
          {showForm && (
            <form action={saveLesson} className="card p-6 space-y-4">
              {editing && <input type="hidden" name="id" value={editing.id} />}
              <h1 className="text-2xl">{editing ? `Editar: ${editing.title}` : "Nueva lección"}</h1>
              <div className="grid md:grid-cols-4 gap-3">
                <div className="md:col-span-3"><label className="eyebrow block mb-1" htmlFor="title">Título</label><input id="title" name="title" required defaultValue={editing?.title ?? ""} className="input" /></div>
                <div><label className="eyebrow block mb-1" htmlFor="sort">Orden</label><input id="sort" name="sort" type="number" defaultValue={editing?.sort ?? 100} className="input input-s" /></div>
                <label className="flex items-center gap-2 text-sm md:col-span-4"><input type="checkbox" name="free" defaultChecked={editing?.free ?? true} /> Gratis (visible sin pagar)</label>
              </div>
              <div><label className="eyebrow block mb-1" htmlFor="body">Contenido</label><textarea id="body" name="body" rows={16} required defaultValue={editing?.body ?? ""} className="input input-s" /></div>
              <p className="fine">Formato: una línea que empiece con <b>#</b> es un subtítulo · con <b>-</b> es un punto de lista · con <b>&gt;</b> es una cita · línea vacía separa párrafos.</p>
              <div className="flex gap-3 flex-wrap"><button className="btn btn-balance">Guardar lección</button><Link href="/coach/learn" className="btn btn-ghost">Cancelar</Link></div>
            </form>
          )}
          {editing && <div className="card p-6"><div className="eyebrow mb-2">Así lo ven las miembros</div><h2 className="text-2xl mb-2">{editing.title}</h2><LessonBody body={editing.body} /></div>}
          {editing && <form action={deleteLesson} className="text-right"><input type="hidden" name="id" value={editing.id} /><button className="faint text-xs hover:text-[#FF8A8A]">Eliminar esta lección</button></form>}
        </main>
      </div>
    </div>
  );
}
