import Link from "next/link";
import { AppShell, Badge, Locked } from "@/components/AppShell";
import { requireUser } from "@/lib/auth";
import { tr, fill } from "@/lib/i18n";
import { listRecipes, listRecommendations, localizeRecipe, categoryName, RECIPE_CATEGORIES } from "@/lib/library";
import { listRecipeMedia, mediaUrl } from "@/lib/media";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default async function Recipes({ searchParams }: { searchParams: Promise<{ c?: string; r?: string; q?: string }> }) {
  const [user, { lang, L }] = await Promise.all([requireUser(), tr()]);
  const sp = await searchParams;
  const [all, recs] = await Promise.all([listRecipes(), listRecommendations(user.id, "nutricion", 2)]);
  const cat = RECIPE_CATEGORIES.some((c) => c.id === sp.c) ? sp.c! : "";
  const q = (sp.q ?? "").trim().slice(0, 60);
  const loc = (r: (typeof all)[number]) => localizeRecipe(r, lang);
  const list = all.filter((r) => (!cat || r.category === cat) && (!q || norm([loc(r).name, ...loc(r).ingredients, ...r.tags].join(" ")).includes(norm(q))));
  const sel = all.find((r) => r.id === sp.r) ?? null;
  const selT = sel ? loc(sel) : null;
  const media = sel ? await listRecipeMedia(sel.id) : [];
  const href = (p: { c?: string; r?: string; q?: string }) => { const u = new URLSearchParams(); const c = p.c ?? cat, r = p.r ?? "", qq = p.q ?? q; if (c) u.set("c", c); if (r) u.set("r", r); if (qq) u.set("q", qq); const s = u.toString(); return `/dashboard/recipes${s ? "?" + s : ""}`; };
  const counts = Object.fromEntries(RECIPE_CATEGORIES.map((c) => [c.id, all.filter((r) => r.category === c.id).length]));

  return (
    <AppShell title={L.recipes.title} kicker={fill(L.recipes.kicker, all.length)}>
      {recs.length > 0 && (
        <div className="card lift-sage p-4 mb-5">
          <div className="eyebrow mb-2" style={{ color: "var(--sage)" }}>{L.recs.title}</div>
          {recs.map((x) => <p key={x.id} className="text-sm mb-1"><span className="faint text-xs">{x.coach_name} · </span>{x.body}</p>)}
        </div>
      )}

      {sel && selT && (
        <section className="mb-6">
          <Locked plan={user.plan} requires={sel.free ? "free" : "basico"} feature={selT.name} L={L}>
            <div className="card lift-sage p-6">
              <div className="flex justify-between items-start gap-3 flex-wrap">
                <div><span className="pill pill-s">{categoryName(sel.category, lang)}</span><h2 className="text-3xl mt-2">{selT.name}</h2>{sel.tags.length > 0 && <div className="faint text-xs mt-1">{sel.tags.join(" · ")}</div>}</div>
                <Badge free={sel.free} L={L} />
              </div>
              {media.length > 0 && (
                <div className={`grid gap-3 mt-5 ${media.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {media.map((m) => m.content_type.startsWith("video/")
                    ? <video key={m.key} src={mediaUrl(m.key)} controls playsInline preload="metadata" className="w-full rounded-[16px] bg-black" style={{ maxHeight: 420 }} />
                    : <img key={m.key} src={mediaUrl(m.key)} alt={selT.name} className="w-full rounded-[16px] object-cover" style={{ maxHeight: 420 }} />)}
                </div>
              )}
              <div className="grid md:grid-cols-[1fr_1.4fr] gap-6 mt-5">
                <div>
                  <div className="eyebrow mb-2" style={{ color: "var(--sage)" }}>{L.recipes.ingredientes}</div>
                  <ul className="space-y-1.5">{selT.ingredients.map((x, i) => <li key={i} className="flex gap-2 text-sm"><span style={{ color: "var(--sage)" }}>•</span><span className="muted">{x}</span></li>)}</ul>
                </div>
                <div>
                  <div className="eyebrow mb-2" style={{ color: "var(--sage)" }}>{L.recipes.preparacion}</div>
                  <ol className="space-y-2">{selT.steps.split("\n").filter(Boolean).map((x, i) => <li key={i} className="flex gap-3 text-sm"><span className="num shrink-0" style={{ color: "var(--sage)" }}>{i + 1}</span><span className="muted leading-relaxed">{x}</span></li>)}</ol>
                  {selT.tips && <div className="row p-4 mt-4 text-sm"><div className="eyebrow mb-1" style={{ color: "var(--fucsia)" }}>{L.recipes.tip}</div><p className="muted">{selT.tips}</p></div>}
                </div>
              </div>
            </div>
          </Locked>
        </section>
      )}

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        <Link href={href({ c: "", r: "" })} className={`whitespace-nowrap pill ${!cat ? "pill-s" : ""}`} style={{ padding: "8px 14px" }}>{L.recipes.todas} · {all.length}</Link>
        {RECIPE_CATEGORIES.map((c) => <Link key={c.id} href={href({ c: c.id, r: "" })} className={`whitespace-nowrap pill ${cat === c.id ? "pill-s" : ""}`} style={{ padding: "8px 14px" }}>{categoryName(c.id, lang)} · {counts[c.id]}</Link>)}
      </div>
      <form className="flex gap-2 my-3" action="/dashboard/recipes">
        {cat && <input type="hidden" name="c" value={cat} />}
        <input name="q" defaultValue={q} placeholder={L.recipes.buscar} className="input input-s flex-1" />
        <button className="btn btn-ghost btn-sm">→</button>
      </form>

      {list.length === 0 && <div className="row p-6 muted text-sm">{L.recipes.nada}</div>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {list.map((r) => { const t = loc(r); return (
          <Link key={r.id} href={href({ r: r.id })} className={`row block p-4 transition ${sel?.id === r.id ? "!border-[var(--sage)]" : "hover:!border-[var(--line-strong)]"}`}>
            <div className="flex justify-between items-start gap-2"><div className="display text-base leading-tight">{t.name}</div><Badge free={r.free} L={L} /></div>
            <div className="faint text-xs mt-2">{categoryName(r.category, lang)} · {t.ingredients.length} {L.recipes.ingredientes.toLowerCase()}</div>
          </Link>
        ); })}
      </div>

      <div className="flex gap-3 flex-wrap mt-8">
        <Link href="/dashboard/learn" className="btn btn-balance btn-sm">{L.recipes.verAprende} →</Link>
        <Link href="/dashboard/nutrition" className="btn btn-ghost btn-sm">{L.recipes.verMenus}</Link>
      </div>
    </AppShell>
  );
}
