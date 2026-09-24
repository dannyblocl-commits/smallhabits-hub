import type { Lang } from "@/lib/i18n";
import { RETO_DAYS } from "@/lib/plan";

export type RetoTrack = "mujer" | "hombre";
type T3 = Record<Lang, string>;
export type RetoExercise = { name: string; sets: number; reps: string };
export type RetoDay = { day: T3; focus: T3; exercises: RetoExercise[] };
export type RetoMeal = { name: T3; options: Record<Lang, string[]> };

const t3 = (es: string, en: string, pt: string): T3 => ({ es, en, pt });

// Semana de entrenamiento: 5 días. Misma estructura ambas pistas; el volumen
// y el énfasis cambian. Calentamiento 8-10 min y estiramiento al final, siempre.
export const RETO_TRAINING: Record<RetoTrack, RetoDay[]> = {
  mujer: [
    { day: t3("Lunes", "Monday", "Segunda"), focus: t3("Glúteo e isquios", "Glutes & hamstrings", "Glúteo e posteriores"), exercises: [
      { name: "Hip thrust", sets: 3, reps: "8 + 8 hold + 8 pulse" }, { name: "Romanian deadlift", sets: 4, reps: "12" }, { name: "Leg curl (hold 2s)", sets: 4, reps: "12" },
      { name: "Bulgarian split squat", sets: 4, reps: "12 / pierna" }, { name: "Glute kickback (cable o banda)", sets: 4, reps: "12" } ] },
    { day: t3("Martes", "Tuesday", "Terça"), focus: t3("Hombro y tríceps", "Shoulders & triceps", "Ombro e tríceps"), exercises: [
      { name: "Dumbbell shoulder press", sets: 4, reps: "12" }, { name: "Lateral raises", sets: 3, reps: "12" }, { name: "Front raises", sets: 3, reps: "12" }, { name: "Tricep pushdown (cable o banda)", sets: 3, reps: "15" } ] },
    { day: t3("Miércoles", "Wednesday", "Quarta"), focus: t3("Cuádriceps", "Quads", "Quadríceps"), exercises: [
      { name: "Hack squat o sentadilla goblet", sets: 4, reps: "12" }, { name: "Leg press", sets: 4, reps: "12" }, { name: "Leg extensions", sets: 4, reps: "15" }, { name: "Walking lunges", sets: 4, reps: "10 / pierna" }, { name: "Static lunge", sets: 4, reps: "12" } ] },
    { day: t3("Jueves", "Thursday", "Quinta"), focus: t3("Espalda y bíceps", "Back & biceps", "Costas e bíceps"), exercises: [
      { name: "Lat pulldown o jalón con banda", sets: 4, reps: "12" }, { name: "Dumbbell row", sets: 3, reps: "12" }, { name: "Bicep curls", sets: 4, reps: "12" }, { name: "Hammer curls", sets: 4, reps: "12" } ] },
    { day: t3("Viernes", "Friday", "Sexta"), focus: t3("Pierna completa", "Full legs", "Perna completa"), exercises: [
      { name: "Hip thrust", sets: 3, reps: "8 + 8 hold + 8 pulse" }, { name: "Barbell o goblet squat", sets: 4, reps: "12" }, { name: "Romanian deadlift", sets: 4, reps: "12" }, { name: "Leg press", sets: 4, reps: "12" }, { name: "Leg curl", sets: 4, reps: "12" } ] },
  ],
  hombre: [
    { day: t3("Lunes", "Monday", "Segunda"), focus: t3("Hombro y tríceps", "Shoulders & triceps", "Ombro e tríceps"), exercises: [
      { name: "Arnold press", sets: 3, reps: "15" }, { name: "Alternating front raise", sets: 3, reps: "15" }, { name: "Lateral raises", sets: 3, reps: "15" }, { name: "Tricep dips", sets: 3, reps: "15" }, { name: "Overhead tricep extension", sets: 3, reps: "15" } ] },
    { day: t3("Martes", "Tuesday", "Terça"), focus: t3("Cuádriceps", "Quads", "Quadríceps"), exercises: [
      { name: "Side lunge", sets: 4, reps: "12" }, { name: "Elevated squat", sets: 4, reps: "12" }, { name: "Squat iso hold", sets: 3, reps: "30 s" }, { name: "Jump squat", sets: 4, reps: "12" }, { name: "Regular squat", sets: 4, reps: "12" }, { name: "Single-leg glute bridge", sets: 3, reps: "15 / lado" } ] },
    { day: t3("Miércoles", "Wednesday", "Quarta"), focus: t3("Glúteo y pierna", "Glutes & legs", "Glúteo e perna"), exercises: [
      { name: "Alternating back lunge", sets: 4, reps: "12" }, { name: "Bulgarian split squat", sets: 4, reps: "12" }, { name: "Deadlift", sets: 4, reps: "12" }, { name: "Side glute raise", sets: 4, reps: "12" }, { name: "Sumo squat", sets: 4, reps: "12" } ] },
    { day: t3("Jueves", "Thursday", "Quinta"), focus: t3("Espalda y bíceps", "Back & biceps", "Costas e bíceps"), exercises: [
      { name: "Reverse flies", sets: 3, reps: "12" }, { name: "Bicep curl", sets: 3, reps: "12" }, { name: "Dumbbell row", sets: 3, reps: "12" }, { name: "Hammer curl", sets: 3, reps: "12" }, { name: "Single-arm row", sets: 3, reps: "12" } ] },
    { day: t3("Viernes", "Friday", "Sexta"), focus: t3("Core y cuerpo completo", "Core & full body", "Core e corpo inteiro"), exercises: [
      { name: "Toe touches", sets: 3, reps: "12" }, { name: "Devil press", sets: 3, reps: "12" }, { name: "Elbow-to-hands plank", sets: 3, reps: "12" }, { name: "Knee tucks", sets: 3, reps: "12" }, { name: "Plank", sets: 3, reps: "45 s" } ] },
  ],
};

// Menú modelo del reto: 5 comidas con opciones. Porciones orientativas; no es un
// plan individualizado. El shake/whey es OPCIONAL: cualquier opción vale sin él.
export const RETO_MEALS: Record<RetoTrack, RetoMeal[]> = {
  mujer: [
    { name: t3("Desayuno", "Breakfast", "Café da manhã"), options: {
      es: ["Batido: 200 ml leche de almendras sin azúcar + 200 g frutos rojos + 1 scoop de colágeno o proteína (opcional) + hielo", "Waffles proteicos: 1 huevo + 1 scoop de avena + 1 banana + canela", "Avena cocida (40 g) con fruta y 1 cucharada de mantequilla de maní"],
      en: ["Smoothie: 200 ml unsweetened almond milk + 200 g berries + 1 scoop collagen or protein (optional) + ice", "Protein waffles: 1 egg + 1 scoop oats + 1 banana + cinnamon", "Cooked oats (40 g) with fruit and 1 tbsp peanut butter"],
      pt: ["Vitamina: 200 ml leite de amêndoa sem açúcar + 200 g frutas vermelhas + 1 scoop de colágeno ou proteína (opcional) + gelo", "Waffles proteicos: 1 ovo + 1 scoop de aveia + 1 banana + canela", "Aveia cozida (40 g) com fruta e 1 colher de pasta de amendoim"] } },
    { name: t3("Merienda de la mañana", "Morning snack", "Lanche da manhã"), options: {
      es: ["1 banana mediana + 2 huevos (spray de cocina, sin aceite)", "2 rebanadas de pan integral + 2 huevos + 50 g aguacate", "1 arepa pequeña (110 g) + 100 g queso feta light"],
      en: ["1 medium banana + 2 eggs (cooking spray, no oil)", "2 slices whole-grain bread + 2 eggs + 50 g avocado", "1 small arepa (110 g) + 100 g light feta"],
      pt: ["1 banana média + 2 ovos (spray de cozinha, sem óleo)", "2 fatias de pão integral + 2 ovos + 50 g abacate", "1 arepa pequena (110 g) + 100 g queijo feta light"] } },
    { name: t3("Almuerzo", "Lunch", "Almoço"), options: {
      es: ["80 g arroz cocido + 80 g frijoles negros + 100 g brócoli + 120 g pechuga de pollo a la plancha + ensalada verde a voluntad", "Cambia el arroz por: pasta 80 g · yuca 80 g · batata 90 g · quinoa 80 g", "Cambia el pollo por: pavo 120 g · carne magra 93% 120 g · tilapia 190 g · camarones 180 g"],
      en: ["80 g cooked rice + 80 g black beans + 100 g broccoli + 120 g grilled chicken breast + unlimited green salad", "Swap the rice for: pasta 80 g · cassava 80 g · sweet potato 90 g · quinoa 80 g", "Swap the chicken for: turkey 120 g · 93% lean beef 120 g · tilapia 190 g · shrimp 180 g"],
      pt: ["80 g arroz cozido + 80 g feijão preto + 100 g brócolis + 120 g peito de frango grelhado + salada verde à vontade", "Troque o arroz por: massa 80 g · mandioca 80 g · batata-doce 90 g · quinoa 80 g", "Troque o frango por: peru 120 g · carne magra 93% 120 g · tilápia 190 g · camarão 180 g"] } },
    { name: t3("Merienda de la tarde", "Afternoon snack", "Lanche da tarde"), options: {
      es: ["100 g arándanos + 250 ml agua de coco + 1 scoop proteína (opcional) + 20 g avena", "Muffin proteico: 1 huevo + ½ banana + 20 g avena + 1 scoop proteína, al horno 20 min a 180 °C", "Yogur griego natural 170 g + fruta"],
      en: ["100 g blueberries + 250 ml coconut water + 1 scoop protein (optional) + 20 g oats", "Protein muffin: 1 egg + ½ banana + 20 g oats + 1 scoop protein, baked 20 min at 350 °F", "Plain Greek yogurt 170 g + fruit"],
      pt: ["100 g mirtilos + 250 ml água de coco + 1 scoop de proteína (opcional) + 20 g aveia", "Muffin proteico: 1 ovo + ½ banana + 20 g aveia + 1 scoop de proteína, assado 20 min a 180 °C", "Iogurte grego natural 170 g + fruta"] } },
    { name: t3("Cena", "Dinner", "Jantar"), options: {
      es: ["80 g arroz + 80 g brócoli + 100 g pollo a la plancha + ensalada verde", "Cena rápida: 1 tortilla de almendra + 60 g pollo desmechado o atún en agua + 50 g cottage light + hojas verdes", "Sazona con limón, vinagre de manzana y hierbas; evita salsas industriales"],
      en: ["80 g rice + 80 g broccoli + 100 g grilled chicken + green salad", "Quick dinner: 1 almond-flour tortilla + 60 g shredded chicken or tuna in water + 50 g light cottage cheese + greens", "Season with lemon, apple cider vinegar and herbs; skip processed sauces"],
      pt: ["80 g arroz + 80 g brócolis + 100 g frango grelhado + salada verde", "Jantar rápido: 1 tortilha de amêndoa + 60 g frango desfiado ou atum em água + 50 g cottage light + folhas verdes", "Tempere com limão, vinagre de maçã e ervas; evite molhos industrializados"] } },
  ],
  hombre: [
    { name: t3("Desayuno", "Breakfast", "Café da manhã"), options: {
      es: ["Batido: 200 ml leche de almendras + 200 g frutos rojos + 1 scoop proteína (opcional) + 1 scoop avena", "Waffles proteicos: 2 huevos + 1 scoop avena + 1 banana + canela", "Avena cocida (60 g) con fruta y 1 cucharada de mantequilla de maní"],
      en: ["Smoothie: 200 ml almond milk + 200 g berries + 1 scoop protein (optional) + 1 scoop oats", "Protein waffles: 2 eggs + 1 scoop oats + 1 banana + cinnamon", "Cooked oats (60 g) with fruit and 1 tbsp peanut butter"],
      pt: ["Vitamina: 200 ml leite de amêndoa + 200 g frutas vermelhas + 1 scoop de proteína (opcional) + 1 scoop de aveia", "Waffles proteicos: 2 ovos + 1 scoop de aveia + 1 banana + canela", "Aveia cozida (60 g) com fruta e 1 colher de pasta de amendoim"] } },
    { name: t3("Merienda de la mañana", "Morning snack", "Lanche da manhã"), options: {
      es: ["1 banana + 3 huevos + 50 g aguacate", "2 rebanadas de pan integral + 3 huevos + 50 g aguacate", "1 arepa (110 g) + 150 g queso feta light"],
      en: ["1 banana + 3 eggs + 50 g avocado", "2 slices whole-grain bread + 3 eggs + 50 g avocado", "1 arepa (110 g) + 150 g light feta"],
      pt: ["1 banana + 3 ovos + 50 g abacate", "2 fatias de pão integral + 3 ovos + 50 g abacate", "1 arepa (110 g) + 150 g queijo feta light"] } },
    { name: t3("Almuerzo", "Lunch", "Almoço"), options: {
      es: ["100-150 g arroz cocido + 80 g frijoles + 100 g brócoli + 120-150 g pechuga de pollo + ensalada verde a voluntad", "Cambia el arroz por: pasta · yuca · batata · plátano maduro · quinoa (misma cantidad)", "Cambia el pollo por: pavo · carne magra 93% · tilapia (+50 %) · camarones (+50 %)"],
      en: ["100-150 g cooked rice + 80 g beans + 100 g broccoli + 120-150 g chicken breast + unlimited green salad", "Swap the rice for: pasta · cassava · sweet potato · ripe plantain · quinoa (same amount)", "Swap the chicken for: turkey · 93% lean beef · tilapia (+50%) · shrimp (+50%)"],
      pt: ["100-150 g arroz cozido + 80 g feijão + 100 g brócolis + 120-150 g peito de frango + salada verde à vontade", "Troque o arroz por: massa · mandioca · batata-doce · banana-da-terra · quinoa (mesma quantidade)", "Troque o frango por: peru · carne magra 93% · tilápia (+50%) · camarão (+50%)"] } },
    { name: t3("Merienda de la tarde", "Afternoon snack", "Lanche da tarde"), options: {
      es: ["150 g arándanos + 250 ml agua de coco + 1 scoop proteína (opcional) + 40 g avena", "Muffin proteico: 1 huevo + 1 banana + 30 g avena + 1 scoop proteína", "Yogur griego 170 g + 30 g granola sin azúcar"],
      en: ["150 g blueberries + 250 ml coconut water + 1 scoop protein (optional) + 40 g oats", "Protein muffin: 1 egg + 1 banana + 30 g oats + 1 scoop protein", "Greek yogurt 170 g + 30 g sugar-free granola"],
      pt: ["150 g mirtilos + 250 ml água de coco + 1 scoop de proteína (opcional) + 40 g aveia", "Muffin proteico: 1 ovo + 1 banana + 30 g aveia + 1 scoop de proteína", "Iogurte grego 170 g + 30 g granola sem açúcar"] } },
    { name: t3("Cena", "Dinner", "Jantar"), options: {
      es: ["100-150 g arroz + 100 g brócoli + 120-150 g pollo a la plancha + ensalada verde", "Cena rápida: 1 tortilla de almendra + 120-150 g pollo desmechado o atún + 50 g cottage light + hojas verdes", "Sazona con limón, vinagre de manzana y hierbas; evita salsas industriales"],
      en: ["100-150 g rice + 100 g broccoli + 120-150 g grilled chicken + green salad", "Quick dinner: 1 almond-flour tortilla + 120-150 g shredded chicken or tuna + 50 g light cottage cheese + greens", "Season with lemon, apple cider vinegar and herbs; skip processed sauces"],
      pt: ["100-150 g arroz + 100 g brócolis + 120-150 g frango grelhado + salada verde", "Jantar rápido: 1 tortilha de amêndoa + 120-150 g frango desfiado ou atum + 50 g cottage light + folhas verdes", "Tempere com limão, vinagre de maçã e ervas; evite molhos industrializados"] } },
  ],
};

// Rutina diaria del sistema de suplementación: texto oficial de Farmasi para el
// Women's Balance System (traducido). Solo se muestra a quien está en el reto.
export const RETO_SUPPLEMENTS: Record<Lang, { title: string; intro: string; steps: [string, string][]; note: string }> = {
  es: {
    title: "Tu combo del reto — rutina diaria",
    intro: "Así se toma el sistema que recibiste con el reto. Es la rutina oficial del fabricante.",
    steps: [
      ["Mañana", "En un vaso de agua: 15 ml (1 cucharada) de Aloe Glow Mango + 1 porción de Beauty Shot Collagen + 1 porción de Creatine. Después, 1 tableta de Calcium Magnesium Plus."],
      ["Comida", "Prepara el Meal Replacement Shake Cream Caramel según la etiqueta y tómalo como sustituto de una comida."],
      ["Cualquier momento", "2 Cyclical Relief Gummies como parte de tu rutina diaria."],
      ["Noche", "2 cucharadas de Restore en 250 ml de agua, por la noche."],
    ],
    note: "Los suplementos no sustituyen una alimentación equilibrada ni son necesarios para hacer el reto. Consulta con tu médico si estás embarazada, lactando, tomas medicación o tienes una condición de salud.",
  },
  en: {
    title: "Your challenge combo — daily routine",
    intro: "This is how to take the system you received with the challenge. It is the manufacturer's official routine.",
    steps: [
      ["Morning", "In a glass of water: 15 mL (1 tablespoon) Aloe Glow Mango + 1 serving Beauty Shot Collagen + 1 serving Creatine. Then take 1 Calcium Magnesium Plus tablet."],
      ["Meal window", "Prepare the Meal Replacement Shake Cream Caramel according to label directions and enjoy it as a meal replacement."],
      ["Anytime", "2 Cyclical Relief Gummies as part of your daily routine."],
      ["Evening", "2 scoops of Restore in 250 mL of water, in the evening."],
    ],
    note: "Supplements do not replace a balanced diet and are not required to do the challenge. Consult your doctor if you are pregnant, nursing, taking medication or have a medical condition.",
  },
  pt: {
    title: "Seu combo do desafio — rotina diária",
    intro: "É assim que se toma o sistema que você recebeu com o desafio. É a rotina oficial do fabricante.",
    steps: [
      ["Manhã", "Num copo de água: 15 ml (1 colher de sopa) de Aloe Glow Mango + 1 porção de Beauty Shot Collagen + 1 porção de Creatine. Depois, 1 comprimido de Calcium Magnesium Plus."],
      ["Refeição", "Prepare o Meal Replacement Shake Cream Caramel conforme o rótulo e tome como substituto de uma refeição."],
      ["Qualquer hora", "2 Cyclical Relief Gummies como parte da sua rotina diária."],
      ["Noite", "2 scoops de Restore em 250 ml de água, à noite."],
    ],
    note: "Os suplementos não substituem uma alimentação equilibrada nem são necessários para fazer o desafio. Consulte seu médico se estiver grávida, amamentando, tomando medicação ou tiver alguma condição de saúde.",
  },
};

export const RETO_HABITS: Record<Lang, [string, string, string]>[] = [
  { es: ["Entrena los 5 días, 8-10 min de calentamiento siempre", "Registra tus comidas con foto", "Sube tu foto de inicio"],
    en: ["Train all 5 days, always warm up 8-10 min", "Log your meals with a photo", "Upload your starting photo"],
    pt: ["Treine os 5 dias, sempre com 8-10 min de aquecimento", "Registre suas refeições com foto", "Envie sua foto inicial"] },
  { es: ["Sube el peso o las repeticiones respecto a la semana 1", "Agua: 2 litros al día", "Escríbele a Maleja tu primer ajuste"],
    en: ["Add weight or reps versus week 1", "Water: 2 liters a day", "Message Maleja for your first adjustment"],
    pt: ["Aumente o peso ou as repetições em relação à semana 1", "Água: 2 litros por dia", "Mande sua primeira revisão para a Maleja"] },
  { es: ["Entrena aunque no tengas ganas: esta es la semana que decide", "Duerme 7 horas", "Una reflexión de Paz Mental al día"],
    en: ["Train even when you don't feel like it: this is the week that decides", "Sleep 7 hours", "One Peace of Mind reflection a day"],
    pt: ["Treine mesmo sem vontade: esta é a semana que decide", "Durma 7 horas", "Uma reflexão de Paz Mental por dia"] },
  { es: ["Cierra fuerte: los 5 días", "Pésate y mide el último día", "Sube tu foto final y escríbele a Maleja"],
    en: ["Finish strong: all 5 days", "Weigh and measure on the last day", "Upload your final photo and message Maleja"],
    pt: ["Termine forte: os 5 dias", "Pese-se e meça no último dia", "Envie sua foto final e fale com a Maleja"] },
];

export function retoProgress(start: string | Date | null | undefined) {
  if (!start) return null;
  const s = new Date(start);
  const day = Math.floor((Date.now() - s.getTime()) / 86400000) + 1;
  if (day < 1) return null;
  const done = day > RETO_DAYS;
  const clamped = Math.min(day, RETO_DAYS);
  const week = Math.min(RETO_HABITS.length, Math.ceil(clamped / 7));
  const end = new Date(s.getTime() + RETO_DAYS * 86400000);
  return { day: clamped, week, done, pct: Math.round((clamped / RETO_DAYS) * 100), end };
}

export const trackOf = (t: string | null | undefined): RetoTrack => (t === "hombre" ? "hombre" : "mujer");
