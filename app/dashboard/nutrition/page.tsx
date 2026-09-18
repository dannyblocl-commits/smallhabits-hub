import Link from "next/link";
import { AppShell, Badge, Locked } from "@/components/AppShell";
import { VideoCard } from "@/components/VideoCard";
import { requireUser } from "@/lib/auth";
import { tr } from "@/lib/i18n";
import { listMenus, listRecommendations } from "@/lib/library";

export default async function Nutrition({ searchParams }: { searchParams: Promise<{ m?: string }> }) {
  const [user, { L }] = await Promise.all([requireUser(), tr()]);
  const { m } = await searchParams;
  const [menus, recs] = await Promise.all([listMenus(), listRecommendations(user.id, "nutricion", 3)]);
  const sel = menus.find((x) => x.id === m) || menus[0];
  if (!sel) return <AppShell title={L.nutrition.title}><div className="row p-6 muted">—</div></AppShell>;
  const name = (x: typeof sel) => L.content.menus[x.id as keyof typeof L.content.menus] ?? x.name;
  const goal = (g: string) => L.goals[g as keyof typeof L.goals] ?? g;

  return (
    <AppShell title={L.nutrition.title} kicker={L.nutrition.kicker}>
      {recs.length > 0 && (
        <div className="card lift-sage p-4 mb-5">
          <div className="eyebrow mb-2" style={{ color: "var(--sage)" }}>{L.recs.title}</div>
          {recs.map((x) => <p key={x.id} className="text-sm mb-1"><span className="faint text-xs">{x.coach_name} · </span>{x.body}</p>)}
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        <Link href="/dashboard/recipes" className="card lift-sage p-4 block"><div className="eyebrow" style={{ color: "var(--sage)" }}>{L.recipes.title}</div><div className="display text-lg mt-1">{L.recipes.kicker.replace(" · {n}", "").replace("{n}", "")}</div><div className="faint text-xs mt-1">{L.common.gratis} ✓</div></Link>
        <Link href="/dashboard/learn" className="card lift-sage p-4 block"><div className="eyebrow" style={{ color: "var(--sage)" }}>{L.learn.title}</div><div className="display text-lg mt-1">{L.learn.kicker}</div></Link>
      </div>
      <div className="grid lg:grid-cols-[300px_1fr] gap-5">
        <aside className="space-y-2">
          {menus.map((x) => (
            <a key={x.id} href={`/dashboard/nutrition?m=${x.id}`} className={`row block p-4 transition ${x.id === sel.id ? "!border-[var(--sage)]" : "hover:!border-[var(--line-strong)]"}`}>
              <div className="flex justify-between items-start gap-2"><div><div className="display text-base">{name(x)}</div><div className="faint text-xs mt-0.5">{x.kcal} kcal · {goal(x.goal)}</div></div><Badge free={x.free} L={L} /></div>
            </a>
          ))}
        </aside>
        <section>
          <Locked plan={user.plan} requires={sel.free ? "free" : "basico"} feature={`${L.nutrition.menu} ${name(sel)}`} L={L}>
            <div className="card lift-sage p-6">
              <span className="pill pill-s">{L.home.balance}</span>
              <h2 className="text-3xl mt-2">{name(sel)}</h2>
              <p className="muted text-sm">{sel.kcal} {L.nutrition.kcalDia}{sel.macros ? ` · ${sel.macros}` : ""}</p>
              <div className="mt-4"><VideoCard src={`/api/content/video/${sel.id}`} fallback="/videos/comer-bien.mp4" title={name(sel)} emoji="◐" /></div>
              <div className="eyebrow mt-6 mb-2">{L.nutrition.planDia}</div>
              <div className="space-y-2">
                {sel.meals.map((x, i) => (
                  <div key={i} className="row p-3 flex items-center gap-4"><div className="num text-sm w-12" style={{ color: "var(--sage)" }}>{x.time}</div><div className="flex-1"><div className="display text-sm">{x.name}</div><div className="muted text-xs">{x.description}</div></div><div className="num">{x.kcal}</div></div>
                ))}
              </div>
              {sel.recipes.length > 0 && <>
                <div className="eyebrow mt-6 mb-2">{L.nutrition.recetas}</div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {sel.recipes.map((r, i) => (<div key={i} className="row p-4"><div className="display text-sm">{r.name}</div><div className="muted text-xs my-1">{r.steps}</div><div className="num text-xs" style={{ color: "var(--sage)" }}>{r.kcal} kcal</div></div>))}
                </div>
              </>}
              {sel.brands && <div className="row p-4 mt-4 text-sm muted"><b className="display text-[var(--text)]">{L.nutrition.marcas}</b> {sel.brands}</div>}
            </div>
          </Locked>
        </section>
      </div>
    </AppShell>
  );
}
