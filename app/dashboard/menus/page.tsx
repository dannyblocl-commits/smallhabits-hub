import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { requireUser } from "@/lib/auth";
import { tr } from "@/lib/i18n";
import { listMyMenus, createMenu, deleteMenu, logMenuToday } from "@/app/actions/menus";

export default async function MyMenus() {
  const [, { L }] = await Promise.all([requireUser(), tr()]);
  const menus = await listMyMenus();
  const M = L.menus;
  return (
    <AppShell title={M.title} kicker={M.kicker}>
      <div className="grid lg:grid-cols-[360px_1fr] gap-5">
        <form action={createMenu} className="card p-5 space-y-3">
          <div className="eyebrow" style={{ color: "var(--sage)" }}>{M.nuevo}</div>
          <input id="menu-name" name="name" required placeholder={M.nombrePh} className="input input-s" />
          <div className="space-y-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="grid grid-cols-[1fr_88px] gap-2">
                <input id={`item-name-${i}`} name="item_name" placeholder={`${M.comida} ${i + 1}`} className="input input-s" />
                <input id={`item-kcal-${i}`} name="item_kcal" type="number" min="0" placeholder="kcal" className="input input-s" />
              </div>
            ))}
          </div>
          <button className="btn btn-balance w-full">{M.guardar}</button>
          <p className="fine">{M.tip} <Link href="/dashboard/nutrition" className="underline">{L.nav.menus}</Link>.</p>
        </form>

        <div className="space-y-3">
          {menus.length === 0 && <div className="row p-8 text-center muted">{M.vacio}</div>}
          {menus.map((m) => (
            <div key={m.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div><h2 className="text-2xl">{m.name}</h2><div className="num" style={{ color: "var(--sage)" }}>{m.kcal} <span className="text-xs muted font-normal">kcal</span></div></div>
                <div className="flex gap-2">
                  <form action={logMenuToday}><input type="hidden" name="id" value={m.id} /><button className="btn btn-balance btn-sm">{M.registrarHoy}</button></form>
                  <form action={deleteMenu}><input type="hidden" name="id" value={m.id} /><button className="btn btn-ghost btn-sm">✕</button></form>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {m.items.map((it, i) => (<div key={i} className="flex justify-between text-sm py-1" style={{ borderTop: i ? "1px solid var(--line)" : undefined }}><span className="muted">{it.name}</span><span className="num">{it.kcal}</span></div>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
