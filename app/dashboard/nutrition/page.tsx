import { AppShell, Badge, Locked } from "@/components/AppShell";
import { VideoCard } from "@/components/VideoCard";
import { getPlan } from "@/lib/plan";

const menus = [
  { id: "menu_1", free: true, name: "Tonificación", kcal: 1800, macros: "135P · 225C · 60G", goal: "Tonificar",
    meals: [["07:00", "Desayuno", "3 huevos revueltos, 2 rebanadas pan integral, ½ aguacate", 490], ["12:30", "Almuerzo", "200g pechuga de pollo, 150g arroz integral, verduras al vapor", 600], ["15:30", "Merienda", "Batido proteína (30g) + 1 plátano", 225], ["19:30", "Cena", "150g salmón, 200g camote, espinaca salteada", 450]],
    recipes: [["Bowl de proteína & verdes", "Pollo desmenuzado, arroz, espinaca, tomate cherry, aderezo de limón.", 580], ["Avena nocturna", "50g avena + 200ml leche + 1 cda chía. Refrigerar toda la noche.", 320]] },
  { id: "menu_2", free: false, name: "Pérdida de grasa", kcal: 1500, macros: "140P · 130C · 50G", goal: "Perder peso",
    meals: [["07:30", "Desayuno", "Yogurt griego 200g, fresas, 20g almendras", 320], ["12:30", "Almuerzo", "Ensalada grande con atún 150g, garbanzos, aceite de oliva", 480], ["16:00", "Merienda", "Manzana + 1 huevo cocido", 170], ["19:30", "Cena", "Pavo a la plancha 180g, brócoli, quinoa 80g", 530]],
    recipes: [["Wrap de pavo y hummus", "Tortilla integral, pavo, hummus, pepino, rúcula.", 410]] },
  { id: "menu_3", free: false, name: "Ganancia muscular", kcal: 2600, macros: "190P · 300C · 75G", goal: "Ganar fuerza",
    meals: [["07:00", "Desayuno", "Avena 80g, 2 huevos + 3 claras, plátano, mantequilla de maní", 720], ["12:30", "Almuerzo", "Carne magra 200g, arroz 200g, ensalada", 780], ["16:00", "Pre-entreno", "Batido proteína + 60g avena", 380], ["20:00", "Cena", "Pollo 200g, pasta integral 150g, verduras", 720]],
    recipes: [["Pasta proteica", "Pasta integral, pollo, salsa de tomate natural, queso cottage.", 690]] },
  { id: "menu_4", free: false, name: "Vegetariano balance", kcal: 1900, macros: "110P · 240C · 65G", goal: "Salud integral",
    meals: [["07:30", "Desayuno", "Tofu revuelto, pan integral, aguacate", 480], ["13:00", "Almuerzo", "Lentejas 200g, arroz, ensalada", 620], ["16:30", "Merienda", "Yogurt vegetal + granola", 260], ["19:30", "Cena", "Curry de garbanzos con quinoa", 540]],
    recipes: [["Curry de garbanzos", "Garbanzos, leche de coco, curry, espinaca. 20 min.", 540]] },
];

export default async function Nutrition({ searchParams }: { searchParams: Promise<{ m?: string }> }) {
  const plan = await getPlan();
  const { m } = await searchParams;
  const sel = menus.find((x) => x.id === m) || menus[0];

  return (
    <AppShell title="Menús y recetas" kicker="1 menú gratis · el resto desde Básico">
      <div className="grid lg:grid-cols-[300px_1fr] gap-5">
        <aside className="space-y-2">
          {menus.map((x) => (
            <a key={x.id} href={`/dashboard/nutrition?m=${x.id}`} className={`row block p-4 transition ${x.id === sel.id ? "!border-[var(--sage)]" : "hover:!border-[var(--line-strong)]"}`}>
              <div className="flex justify-between items-start gap-2"><div><div className="display text-base">{x.name}</div><div className="faint text-xs mt-0.5">{x.kcal} kcal · {x.goal}</div></div><Badge free={x.free} /></div>
            </a>
          ))}
        </aside>
        <section>
          <Locked plan={plan} requires={sel.free ? "free" : "basico"} feature={`Menú ${sel.name}`}>
            <div className="card lift-sage p-6">
              <span className="pill pill-s">Balance</span>
              <h2 className="text-3xl mt-2">{sel.name}</h2>
              <p className="muted text-sm">{sel.kcal} kcal/día · {sel.macros}</p>
              <div className="mt-4"><VideoCard src={`/videos/${sel.id}.mp4`} title={`Avatar explica · ${sel.name}`} emoji="◐" /></div>
              <div className="eyebrow mt-6 mb-2">Plan del día</div>
              <div className="space-y-2">
                {sel.meals.map(([t, n, d, k]) => (
                  <div key={t as string} className="row p-3 flex items-center gap-4"><div className="num text-sm w-12" style={{ color: "var(--sage)" }}>{t}</div><div className="flex-1"><div className="display text-sm">{n}</div><div className="muted text-xs">{d}</div></div><div className="num">{k}</div></div>
                ))}
              </div>
              <div className="eyebrow mt-6 mb-2">Recetas</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {sel.recipes.map(([n, s, k]) => (<div key={n as string} className="row p-4"><div className="display text-sm">{n}</div><div className="muted text-xs my-1">{s}</div><div className="num text-xs" style={{ color: "var(--sage)" }}>{k} kcal</div></div>))}
              </div>
              <div className="row p-4 mt-4 text-sm muted"><b className="display text-[var(--text)]">Marcas recomendadas por limpieza:</b> avena sin azúcar añadida, proteína sin edulcorantes artificiales, aceite de oliva extra virgen, huevos de pastoreo. Lee siempre la etiqueta.</div>
            </div>
          </Locked>
        </section>
      </div>
    </AppShell>
  );
}
