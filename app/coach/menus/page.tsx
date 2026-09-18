import Link from "next/link";
import { requireCoach } from "@/lib/auth";
import { listMenus, getMenu, type Meal, type Recipe } from "@/lib/library";
import { saveMenu, deleteMenu } from "@/app/actions/library";
import { Logo } from "@/components/Leaves";

const GOALS = ["Tonificar", "Perder peso", "Ganar fuerza", "Resistencia", "Flexibilidad", "Salud integral"];

export default async function CoachMenus({ searchParams }: { searchParams: Promise<{ id?: string; new?: string; ok?: string; tr?: string }> }) {
  await requireCoach();
  const sp = await searchParams;
  const menus = await listMenus();
  const editing = sp.id ? await getMenu(sp.id) : null;
  const showForm = !!editing || sp.new === "1";
  const meals: Meal[] = editing?.meals ?? []; const recipes: Recipe[] = editing?.recipes ?? [];
  const mealRows = Array.from({ length: Math.max(5, meals.length + 1) }, (_, i) => meals[i]);
  const recRows = Array.from({ length: Math.max(3, recipes.length + 1) }, (_, i) => recipes[i]);

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "var(--surface-1)", borderColor: "var(--line)", paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3"><Link href="/coach"><Logo /></Link><span className="pill pill-s">Planes de alimentación</span></div>
          <div className="flex gap-2"><Link href="/coach/routines" className="btn btn-ghost btn-sm">Rutinas</Link><Link href="/coach" className="btn btn-ghost btn-sm">← Panel</Link></div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-5 py-6 grid lg:grid-cols-[380px_1fr] gap-6">
        <aside>
          <div className="flex items-center justify-between mb-3"><div className="eyebrow" style={{ color: "var(--sage)" }}>Biblioteca</div><Link href="/coach/menus?new=1" className="btn btn-balance btn-sm">+ Nuevo</Link></div>
          {sp.ok && <div className="row p-3 mb-3 text-sm" style={{ borderColor: "var(--sage)" }}>Guardado. Las miembros ya lo ven.{sp.tr === "ok" && " Traducido a inglés y portugués."}{sp.tr === "no" && " No se pudo traducir: se verá en español hasta que lo guardes otra vez."}</div>}
          <div className="space-y-2">
            {menus.map((m) => (
              <Link key={m.id} href={`/coach/menus?id=${m.id}`} className={`row block p-4 ${editing?.id === m.id ? "!border-[var(--sage)]" : ""}`}>
                <div className="flex justify-between gap-2"><div className="display text-sm">{m.name}</div><span className={`pill ${m.free ? "pill-s" : "pill-f"}`}>{m.free ? "Gratis" : "Premium"}</span></div>
                <div className="faint text-xs mt-1">{m.kcal} kcal · {m.goal} · {m.meals.length} comidas</div>
              </Link>
            ))}
          </div>
        </aside>
        <main>
          {!showForm && <div className="card p-8 text-center muted">Elige un plan para editarlo o crea uno nuevo. Comidas, recetas y marcas recomendadas: todo lo que guardes se ve al instante.</div>}
          {showForm && (
            <form action={saveMenu} className="card p-6 space-y-4">
              {editing && <input type="hidden" name="id" value={editing.id} />}
              <h1 className="text-2xl">{editing ? `Editar: ${editing.name}` : "Nuevo plan"}</h1>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="md:col-span-2"><label className="eyebrow block mb-1" htmlFor="name">Nombre</label><input id="name" name="name" required defaultValue={editing?.name ?? ""} className="input" /></div>
                <div><label className="eyebrow block mb-1" htmlFor="goal">Objetivo</label><select id="goal" name="goal" defaultValue={editing?.goal ?? "Salud integral"} className="input">{GOALS.map((g) => <option key={g}>{g}</option>)}</select></div>
                <div><label className="eyebrow block mb-1" htmlFor="kcal">Kcal/día (0 = sumar comidas)</label><input id="kcal" name="kcal" type="number" defaultValue={editing?.kcal ?? 0} className="input input-s" /></div>
                <div><label className="eyebrow block mb-1" htmlFor="macros">Macros</label><input id="macros" name="macros" defaultValue={editing?.macros ?? ""} placeholder="135P · 225C · 60G" className="input input-s" /></div>
                <div><label className="eyebrow block mb-1" htmlFor="sort">Orden</label><input id="sort" name="sort" type="number" defaultValue={editing?.sort ?? 100} className="input input-s" /></div>
                <label className="flex items-center gap-2 text-sm md:col-span-3"><input type="checkbox" name="free" defaultChecked={editing?.free ?? false} /> Gratis (visible sin pagar)</label>
              </div>

              <div className="eyebrow mt-2" style={{ color: "var(--sage)" }}>Comidas del día</div>
              <div className="space-y-2">
                {mealRows.map((m, i) => (
                  <div key={i} className="row p-3 grid grid-cols-3 md:grid-cols-8 gap-2 items-end">
                    <div><label className="faint text-[.6rem]">Hora</label><input name="meal_time" defaultValue={m?.time ?? ""} placeholder="07:00" className="input input-s" /></div>
                    <div className="md:col-span-2"><label className="faint text-[.6rem]">Comida {i + 1}</label><input name="meal_name" defaultValue={m?.name ?? ""} placeholder="Desayuno" className="input input-s" /></div>
                    <div><label className="faint text-[.6rem]">Kcal</label><input name="meal_kcal" type="number" defaultValue={m?.kcal ?? ""} className="input input-s" /></div>
                    <div className="col-span-3 md:col-span-4"><label className="faint text-[.6rem]">Qué comer (alimentos y cantidades)</label><input name="meal_desc" defaultValue={m?.description ?? ""} className="input input-s" placeholder="3 huevos, 2 rebanadas pan integral, ½ aguacate" /></div>
                  </div>
                ))}
              </div>

              <div className="eyebrow mt-2" style={{ color: "var(--sage)" }}>Recetas</div>
              <div className="space-y-2">
                {recRows.map((r, i) => (
                  <div key={i} className="row p-3 grid grid-cols-3 md:grid-cols-6 gap-2 items-end">
                    <div className="col-span-2"><label className="faint text-[.6rem]">Receta {i + 1}</label><input name="rec_name" defaultValue={r?.name ?? ""} className="input input-s" /></div>
                    <div><label className="faint text-[.6rem]">Kcal</label><input name="rec_kcal" type="number" defaultValue={r?.kcal ?? ""} className="input input-s" /></div>
                    <div className="col-span-3"><label className="faint text-[.6rem]">Preparación</label><input name="rec_steps" defaultValue={r?.steps ?? ""} className="input input-s" /></div>
                  </div>
                ))}
              </div>

              <div><label className="eyebrow block mb-1" htmlFor="brands">Marcas / alimentos recomendados (limpieza de ingredientes)</label><textarea id="brands" name="brands" rows={3} defaultValue={editing?.brands ?? ""} className="input input-s" /></div>
              <div className="flex gap-3 flex-wrap"><button className="btn btn-balance">Guardar plan</button><Link href="/coach/menus" className="btn btn-ghost">Cancelar</Link>{editing && <Link href="/coach/content" className="btn btn-ghost btn-sm">Subir video de este plan</Link>}</div>
            </form>
          )}
          {editing && <form action={deleteMenu} className="mt-4 text-right"><input type="hidden" name="id" value={editing.id} /><button className="faint text-xs hover:text-[#FF8A8A]">Eliminar este plan</button></form>}
        </main>
      </div>
    </div>
  );
}
