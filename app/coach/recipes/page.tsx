import Link from "next/link";
import { requireCoach } from "@/lib/auth";
import { listRecipes, getRecipe, RECIPE_CATEGORIES } from "@/lib/library";
import { saveRecipe, deleteRecipe } from "@/app/actions/library";
import { Logo } from "@/components/Leaves";

export default async function CoachRecipes({ searchParams }: { searchParams: Promise<{ id?: string; new?: string; ok?: string; c?: string; tr?: string }> }) {
  await requireCoach();
  const sp = await searchParams;
  const cat = RECIPE_CATEGORIES.some((c) => c.id === sp.c) ? sp.c! : RECIPE_CATEGORIES[0].id;
  const [recipes, editing] = await Promise.all([listRecipes(cat), sp.id ? getRecipe(sp.id) : null]);
  const showForm = !!editing || sp.new === "1";

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "var(--surface-1)", borderColor: "var(--line)", paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3"><Link href="/coach"><Logo /></Link><span className="pill pill-s">Recetario</span></div>
          <div className="flex gap-2"><Link href="/coach/learn" className="btn btn-ghost btn-sm">Hacks</Link><Link href="/coach/menus" className="btn btn-ghost btn-sm">Planes</Link><Link href="/coach" className="btn btn-ghost btn-sm">← Panel</Link></div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-5 py-6">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {RECIPE_CATEGORIES.map((c) => <Link key={c.id} href={`/coach/recipes?c=${c.id}`} className={`whitespace-nowrap pill ${cat === c.id ? "pill-s" : ""}`} style={{ padding: "8px 14px" }}>{c.name}</Link>)}
        </div>
        <div className="grid lg:grid-cols-[360px_1fr] gap-6">
          <aside>
            <div className="flex items-center justify-between mb-3"><div className="eyebrow" style={{ color: "var(--sage)" }}>{recipes.length} recetas</div><Link href={`/coach/recipes?c=${cat}&new=1`} className="btn btn-balance btn-sm">+ Nueva</Link></div>
            {sp.ok && <div className="row p-3 mb-3 text-sm" style={{ borderColor: "var(--sage)" }}>Guardado. Las miembros ya lo ven.{sp.tr === "ok" && " Traducido a inglés y portugués."}{sp.tr === "no" && " No se pudo traducir: se muestra en español en los tres idiomas hasta que lo guardes otra vez."}</div>}
            <div className="space-y-2">
              {recipes.map((r) => (
                <Link key={r.id} href={`/coach/recipes?c=${cat}&id=${r.id}`} className={`row block p-3 ${editing?.id === r.id ? "!border-[var(--sage)]" : ""}`}>
                  <div className="flex justify-between gap-2 items-start"><div className="display text-sm leading-tight">{r.name}</div><span className={`pill ${r.free ? "pill-s" : "pill-f"}`}>{r.free ? "Gratis" : "Premium"}</span></div>
                  <div className="faint text-xs mt-1">{r.ingredients.length} ingredientes{Object.keys(r.i18n ?? {}).length ? " · EN/PT" : " · solo ES"}</div>
                </Link>
              ))}
            </div>
          </aside>
          <main>
            {!showForm && <div className="card p-8 text-center muted">Estas son tus recetas del recetario. Elige una para editarla o crea una nueva. Escribes en español: la app la traduce sola a inglés y portugués al guardar.</div>}
            {showForm && (
              <form action={saveRecipe} className="card p-6 space-y-4">
                {editing && <input type="hidden" name="id" value={editing.id} />}
                <h1 className="text-2xl">{editing ? `Editar: ${editing.name}` : "Nueva receta"}</h1>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="md:col-span-2"><label className="eyebrow block mb-1" htmlFor="name">Nombre</label><input id="name" name="name" required defaultValue={editing?.name ?? ""} className="input" /></div>
                  <div><label className="eyebrow block mb-1" htmlFor="category">Categoría</label><select id="category" name="category" defaultValue={editing?.category ?? cat} className="input">{RECIPE_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
                  <div className="md:col-span-2"><label className="eyebrow block mb-1" htmlFor="tags">Etiquetas (separadas por coma)</label><input id="tags" name="tags" defaultValue={editing?.tags.join(", ") ?? ""} placeholder="low carb, proteína, express" className="input input-s" /></div>
                  <div><label className="eyebrow block mb-1" htmlFor="sort">Orden</label><input id="sort" name="sort" type="number" defaultValue={editing?.sort ?? 100} className="input input-s" /></div>
                  <label className="flex items-center gap-2 text-sm md:col-span-3"><input type="checkbox" name="free" defaultChecked={editing?.free ?? false} /> Gratis (visible sin pagar)</label>
                </div>
                <div><label className="eyebrow block mb-1" htmlFor="ingredients">Ingredientes (uno por línea)</label><textarea id="ingredients" name="ingredients" rows={7} required defaultValue={editing?.ingredients.join("\n") ?? ""} className="input input-s" placeholder={"2 claras + 1 huevo\n1 arepa de yuca artesanal"} /></div>
                <div><label className="eyebrow block mb-1" htmlFor="steps">Preparación (un paso por línea)</label><textarea id="steps" name="steps" rows={7} required defaultValue={editing?.steps ?? ""} className="input input-s" /></div>
                <div><label className="eyebrow block mb-1" htmlFor="tips">Tip de Maleja (opcional)</label><textarea id="tips" name="tips" rows={2} defaultValue={editing?.tips ?? ""} className="input input-s" /></div>
                <div className="flex gap-3 flex-wrap"><button className="btn btn-balance">Guardar receta</button><Link href={`/coach/recipes?c=${cat}`} className="btn btn-ghost">Cancelar</Link></div>
                <p className="fine">Al guardar, la app traduce la receta a inglés y portugués (tarda unos segundos). Si solo cambias el orden o si es gratis, no vuelve a traducir.</p>
              </form>
            )}
            {editing && <form action={deleteRecipe} className="mt-4 text-right"><input type="hidden" name="id" value={editing.id} /><button className="faint text-xs hover:text-[#FF8A8A]">Eliminar esta receta</button></form>}
          </main>
        </div>
      </div>
    </div>
  );
}
