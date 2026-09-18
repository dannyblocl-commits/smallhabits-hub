import { AppShell, Badge, Locked } from "@/components/AppShell";
import { VideoCard } from "@/components/VideoCard";
import { requireUser } from "@/lib/auth";
import { tr } from "@/lib/i18n";

const menus = [
  { id: "menu_1", free: true, kcal: 1800, macros: "135P · 225C · 60G", goal: "Tonificar",
    meals: [["07:00", "3 huevos revueltos, 2 rebanadas pan integral, ½ aguacate", 490], ["12:30", "200g pechuga de pollo, 150g arroz integral, verduras al vapor", 600], ["15:30", "Batido proteína (30g) + 1 plátano", 225], ["19:30", "150g salmón, 200g camote, espinaca salteada", 450]],
    recipes: [["Bowl de proteína & verdes", "Pollo desmenuzado, arroz, espinaca, tomate cherry, aderezo de limón.", 580], ["Avena nocturna", "50g avena + 200ml leche + 1 cda chía. Refrigerar toda la noche.", 320]] },
  { id: "menu_2", free: false, kcal: 1500, macros: "140P · 130C · 50G", goal: "Perder peso",
    meals: [["07:30", "Yogurt griego 200g, fresas, 20g almendras", 320], ["12:30", "Ensalada grande con atún 150g, garbanzos, aceite de oliva", 480], ["16:00", "Manzana + 1 huevo cocido", 170], ["19:30", "Pavo a la plancha 180g, brócoli, quinoa 80g", 530]],
    recipes: [["Wrap de pavo y hummus", "Tortilla integral, pavo, hummus, pepino, rúcula.", 410]] },
  { id: "menu_3", free: false, kcal: 2600, macros: "190P · 300C · 75G", goal: "Ganar fuerza",
    meals: [["07:00", "Avena 80g, 2 huevos + 3 claras, plátano, mantequilla de maní", 720], ["12:30", "Carne magra 200g, arroz 200g, ensalada", 780], ["16:00", "Batido proteína + 60g avena", 380], ["20:00", "Pollo 200g, pasta integral 150g, verduras", 720]],
    recipes: [["Pasta proteica", "Pasta integral, pollo, salsa de tomate natural, queso cottage.", 690]] },
  { id: "menu_4", free: false, kcal: 1900, macros: "110P · 240C · 65G", goal: "Salud integral",
    meals: [["07:30", "Tofu revuelto, pan integral, aguacate", 480], ["13:00", "Lentejas 200g, arroz, ensalada", 620], ["16:30", "Yogurt vegetal + granola", 260], ["19:30", "Curry de garbanzos con quinoa", 540]],
    recipes: [["Curry de garbanzos", "Garbanzos, leche de coco, curry, espinaca. 20 min.", 540]] },
];

export default async function Nutrition({ searchParams }: { searchParams: Promise<{ m?: string }> }) {
  const [user, { L }] = await Promise.all([requireUser(), tr()]);
  const { m } = await searchParams;
  const sel = menus.find((x) => x.id === m) || menus[0];
  const name = (id: string) => L.content.menus[id as keyof typeof L.content.menus] ?? id;
  const goal = (g: string) => L.goals[g as keyof typeof L.goals] ?? g;

  return (
    <AppShell title={L.nutrition.title} kicker={L.nutrition.kicker}>
      <div className="grid lg:grid-cols-[300px_1fr] gap-5">
        <aside className="space-y-2">
          {menus.map((x) => (
            <a key={x.id} href={`/dashboard/nutrition?m=${x.id}`} className={`row block p-4 transition ${x.id === sel.id ? "!border-[var(--sage)]" : "hover:!border-[var(--line-strong)]"}`}>
              <div className="flex justify-between items-start gap-2"><div><div className="display text-base">{name(x.id)}</div><div className="faint text-xs mt-0.5">{x.kcal} kcal · {goal(x.goal)}</div></div><Badge free={x.free} L={L} /></div>
            </a>
          ))}
        </aside>
        <section>
          <Locked plan={user.plan} requires={sel.free ? "free" : "basico"} feature={`${L.nutrition.menu} ${name(sel.id)}`} L={L}>
            <div className="card lift-sage p-6">
              <span className="pill pill-s">{L.home.balance}</span>
              <h2 className="text-3xl mt-2">{name(sel.id)}</h2>
              <p className="muted text-sm">{sel.kcal} {L.nutrition.kcalDia} · {sel.macros}</p>
              <div className="mt-4"><VideoCard src={`/api/content/video/${sel.id}`} fallback="/videos/comer-bien.mp4" title={name(sel.id)} emoji="◐" /></div>
              <div className="eyebrow mt-6 mb-2">{L.nutrition.planDia}</div>
              <div className="space-y-2">
                {sel.meals.map(([t, d, k]) => (
                  <div key={t as string} className="row p-3 flex items-center gap-4"><div className="num text-sm w-12" style={{ color: "var(--sage)" }}>{t}</div><div className="flex-1 muted text-sm">{d}</div><div className="num">{k}</div></div>
                ))}
              </div>
              <div className="eyebrow mt-6 mb-2">{L.nutrition.recetas}</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {sel.recipes.map(([n, s, k]) => (<div key={n as string} className="row p-4"><div className="display text-sm">{n}</div><div className="muted text-xs my-1">{s}</div><div className="num text-xs" style={{ color: "var(--sage)" }}>{k} kcal</div></div>))}
              </div>
              <div className="row p-4 mt-4 text-sm muted"><b className="display text-[var(--text)]">{L.nutrition.marcas}</b> {L.nutrition.marcasText}</div>
            </div>
          </Locked>
        </section>
      </div>
    </AppShell>
  );
}
