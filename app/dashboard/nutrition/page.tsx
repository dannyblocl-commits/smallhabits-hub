import { AppShell, Badge, Locked } from "@/components/AppShell";
import { VideoCard } from "@/components/VideoCard";
import { getPlan } from "@/lib/plan";

const menus = [
  {
    id: "menu_1", free: true, name: "Menú Tonificación", kcal: 1800, macros: "135P · 225C · 60G", goal: "Tonificar",
    meals: [
      { t: "07:00", n: "Desayuno", d: "3 huevos revueltos, 2 rebanadas pan integral, ½ aguacate", k: 490 },
      { t: "12:30", n: "Almuerzo", d: "200g pechuga de pollo, 150g arroz integral, verduras al vapor", k: 600 },
      { t: "15:30", n: "Merienda", d: "Batido proteína (30g) + 1 plátano", k: 225 },
      { t: "19:30", n: "Cena", d: "150g salmón, 200g camote, espinaca salteada", k: 450 },
    ],
    recipes: [
      { n: "Bowl de proteína & verdes", s: "Mezcla pollo desmenuzado, arroz, espinaca, tomate cherry y aderezo de limón.", k: 580 },
      { n: "Avena nocturna", s: "50g avena + 200ml leche + 1 cda chía. Refrigerar toda la noche.", k: 320 },
    ],
  },
  {
    id: "menu_2", free: false, name: "Menú Pérdida de Grasa", kcal: 1500, macros: "140P · 130C · 50G", goal: "Perder peso",
    meals: [
      { t: "07:30", n: "Desayuno", d: "Yogurt griego 200g, fresas, 20g almendras", k: 320 },
      { t: "12:30", n: "Almuerzo", d: "Ensalada grande con atún 150g, garbanzos, aceite de oliva", k: 480 },
      { t: "16:00", n: "Merienda", d: "Manzana + 1 huevo cocido", k: 170 },
      { t: "19:30", n: "Cena", d: "Pavo a la plancha 180g, brócoli, quinoa 80g", k: 530 },
    ],
    recipes: [{ n: "Wrap de pavo y hummus", s: "Tortilla integral, pavo, hummus, pepino, rúcula.", k: 410 }],
  },
  {
    id: "menu_3", free: false, name: "Menú Ganancia Muscular", kcal: 2600, macros: "190P · 300C · 75G", goal: "Ganar fuerza",
    meals: [
      { t: "07:00", n: "Desayuno", d: "Avena 80g, 2 huevos + 3 claras, plátano, mantequilla de maní", k: 720 },
      { t: "12:30", n: "Almuerzo", d: "Carne magra 200g, arroz 200g, ensalada", k: 780 },
      { t: "16:00", n: "Pre-entreno", d: "Batido proteína + 60g avena", k: 380 },
      { t: "20:00", n: "Cena", d: "Pollo 200g, pasta integral 150g, verduras", k: 720 },
    ],
    recipes: [{ n: "Pasta proteica", s: "Pasta integral, pollo, salsa de tomate natural, queso cottage.", k: 690 }],
  },
  {
    id: "menu_4", free: false, name: "Menú Vegetariano Balance", kcal: 1900, macros: "110P · 240C · 65G", goal: "Salud integral",
    meals: [
      { t: "07:30", n: "Desayuno", d: "Tofu revuelto, pan integral, aguacate", k: 480 },
      { t: "13:00", n: "Almuerzo", d: "Lentejas 200g, arroz, ensalada", k: 620 },
      { t: "16:30", n: "Merienda", d: "Yogurt vegetal + granola", k: 260 },
      { t: "19:30", n: "Cena", d: "Curry de garbanzos con quinoa", k: 540 },
    ],
    recipes: [{ n: "Curry de garbanzos", s: "Garbanzos, leche de coco, curry, espinaca. 20 min.", k: 540 }],
  },
];

export default async function Nutrition({ searchParams }: { searchParams: Promise<{ m?: string }> }) {
  const plan = await getPlan();
  const { m } = await searchParams;
  const sel = menus.find((x) => x.id === m) || menus[0];

  return (
    <AppShell title="Menús y recetas">
      <p className="text-[#6B6560] mb-6">1 menú completo gratis con recetas. Los demás desde el plan Básico. Estas recomendaciones son generales y cada persona las sigue bajo su responsabilidad.</p>

      <div className="grid lg:grid-cols-3 gap-6">
        <aside className="space-y-3">
          {menus.map((x) => (
            <a key={x.id} href={`/dashboard/nutrition?m=${x.id}`} className={`block bg-white rounded-xl p-4 border-2 transition ${x.id === sel.id ? "border-[#6B8F71]" : "border-[#E0D5C8] hover:border-[#C8D5C0]"}`}>
              <div className="flex justify-between items-start gap-2">
                <div>
                  <div className="font-semibold text-[#2C2C2C]">{x.name}</div>
                  <div className="text-xs text-[#6B6560]">{x.kcal} kcal · {x.goal}</div>
                </div>
                <Badge free={x.free} />
              </div>
            </a>
          ))}
        </aside>

        <section className="lg:col-span-2">
          <Locked plan={plan} requires={sel.free ? "free" : "basico"} feature={`"${sel.name}"`}>
            <div className="bg-white rounded-2xl p-6 border border-[#E0D5C8]">
              <h2 className="text-3xl font-semibold text-[#2C2C2C]">{sel.name}</h2>
              <p className="text-[#6B6560] mb-4">{sel.kcal} kcal/día · {sel.macros}</p>

              <VideoCard src={`/videos/${sel.id}.mp4`} title={`Avatar explica: ${sel.name}`} emoji="🥗" />

              <h3 className="text-xl font-semibold text-[#2C2C2C] mt-6 mb-3">Plan del día</h3>
              <div className="space-y-2">
                {sel.meals.map((x) => (
                  <div key={x.t} className="flex items-center gap-4 border border-[#E0D5C8] rounded-xl p-3">
                    <div className="text-sm font-bold text-[#A67C5B] w-12">{x.t}</div>
                    <div className="flex-1"><div className="font-medium text-[#2C2C2C]">{x.n}</div><div className="text-sm text-[#6B6560]">{x.d}</div></div>
                    <div className="font-bold text-[#6B8F71]">{x.k}</div>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-[#2C2C2C] mt-6 mb-3">Recetas</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {sel.recipes.map((r) => (
                  <div key={r.n} className="bg-[#EDE6DC] rounded-xl p-4">
                    <div className="font-semibold text-[#2C2C2C]">{r.n}</div>
                    <div className="text-sm text-[#6B6560] my-1">{r.s}</div>
                    <div className="text-xs font-bold text-[#A67C5B]">{r.k} kcal</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-[#F2E4E1] rounded-xl p-4 text-sm text-[#2C2C2C]">
                <strong>Marcas recomendadas (limpieza de ingredientes):</strong> avena sin azúcar añadida, proteína sin edulcorantes artificiales, aceite de oliva extra virgen, huevos de pastoreo. Lee siempre la etiqueta.
              </div>
            </div>
          </Locked>
        </section>
      </div>
    </AppShell>
  );
}
