import type { Lang } from "@/lib/i18n";

export type RetoDict = {
  metaTitle: string;
  metaDesc: string;
  h1a: string;
  h1b: string;
  h1c: string;
  sub: string;
  motto: string;
  cta: string;
  ctaNote: string;
  includesTitle: string;
  includes: [string, string][];
  howTitle: string;
  howSub: string;
  weeks: [string, string][];
  faqTitle: string;
  faq: [string, string][];
  app: {
    title: string;
    kicker: string;
    day: string;
    weekOf: string;
    routine: string;
    menu: string;
    habits: string;
    checkin: string;
    checkinBody: string;
    photos: string;
    photosBody: string;
    done: string;
    doneBody: string;
    none: string;
    noneBody: string;
    join: string;
    go: string;
    open: string;
    ends: string;
    training: string;
    warmup: string;
    sets: string;
    meals: string;
    mealsNote: string;
    choose: string;
  };
};

const es: RetoDict = {
  metaTitle: "Reto de Transformación 30 Días — Small Habits by Maleja",
  metaDesc: "30 días con Maleja: plan Pro completo, check-in semanal, fotos de progreso y premio final. Pago único.",
  h1a: "Reto de",
  h1b: "transformación",
  h1c: "30 días",
  sub: "Un mes con Maleja, un grupo que empieza contigo y un plan que cabe en tu vida real.",
  motto: "Pequeños hábitos, grandes resultados.",
  cta: "Entrar al reto",
  ctaNote: "Pago único, sin renovación. Incluye el plan Pro ({pro}/mes) más el acompañamiento del grupo.",
  includesTitle: "Qué incluye",
  includes: [
    ["30 días de plan Pro", "Todas las rutinas, las 92 recetas, menús, meditaciones y el asistente IA sin límite."],
    ["Check-in semanal con Maleja", "Cada semana revisas tu avance en grupo: peso, fotos, energía y qué ajustar."],
    ["Fotos de progreso privadas", "Antes y después. Solo las ves tú y Maleja."],
    ["Comunidad del reto", "Entras a un grupo que ya está en marcha. Nadie lo hace sola."],
    ["Premio final", "La transformación más constante gana un mes de Elite con sesión 1:1."],
  ],
  howTitle: "Cómo funciona",
  howSub: "Cuatro semanas, un objetivo por semana.",
  weeks: [
    ["Semana 1 · Base", "Aprendes a entrenar y a comer sin dietas. Rutinas de 20-30 min y recetas de la casa."],
    ["Semana 2 · Ritmo", "Subes intensidad y registras comidas con foto. Primer ajuste con Maleja."],
    ["Semana 3 · Constancia", "El hábito ya existe. Toca sostenerlo cuando la motivación baja."],
    ["Semana 4 · Resultado", "Foto final, medidas y el premio para la más constante."],
  ],
  faqTitle: "Preguntas",
  faq: [
    ["¿Necesito experiencia?", "No. Las rutinas tienen nivel inicial, intermedio y avanzado, y Maleja te dice por cuál empezar."],
    ["¿Qué pasa cuando terminan los 30 días?", "Tu acceso Pro termina y decides si sigues con un plan mensual. No hay cobro automático."],
    ["¿Cuándo empiezo?", "El día que quieras. Tus 30 días cuentan desde que entras, y Maleja te suma al grupo esa misma semana."],
  ],
  app: {
    title: "Reto 30 días",
    kicker: "Tu camino, semana a semana",
    day: "Día {d} de 30",
    weekOf: "Semana {w} de 4",
    routine: "Tu rutina de esta semana",
    menu: "Tu menú de esta semana",
    habits: "Tus 3 hábitos de la semana",
    checkin: "Check-in con Maleja",
    checkinBody: "Cada semana cuéntale cómo vas: peso, energía, qué te costó. Ella ajusta el plan.",
    photos: "Fotos de progreso",
    photosBody: "Solo las ves tú y Maleja. Sube la de inicio hoy y la final el día 30.",
    done: "¡Reto completado!",
    doneBody: "30 días. Lo hiciste. Escríbele a Maleja para cerrar con tu foto final y tu resultado.",
    none: "Todavía no estás en el reto",
    noneBody: "30 días con Maleja, un grupo y un plan semana a semana.",
    join: "Ver el reto",
    go: "Entrenar",
    open: "Ver menú",
    ends: "Termina el",
    training: "Tu entrenamiento de la semana",
    warmup: "Calienta 8-10 min (bici, elíptica o caminadora) y estira 10 s por músculo al terminar. Gym o casa: con mancuernas o bandas.",
    sets: "series",
    meals: "Tu menú del reto",
    mealsNote: "Elige una opción por comida. Porciones orientativas; el shake o la proteína en polvo son opcionales. Café y té sin azúcar, sí.",
    choose: "opciones",
  },
};

const en: RetoDict = {
  metaTitle: "30-Day Transformation Challenge — Small Habits by Maleja",
  metaDesc: "30 days with Maleja: full Pro plan, weekly check-in, progress photos and a final prize. One-time payment.",
  h1a: "30-day",
  h1b: "transformation",
  h1c: "challenge",
  sub: "One month with Maleja, a group that starts with you and a plan that fits your real life.",
  motto: "Small habits, big results.",
  cta: "Join the challenge",
  ctaNote: "One-time payment, no renewal. Includes the Pro plan ({pro}/mo) plus the group coaching.",
  includesTitle: "What's included",
  includes: [
    ["30 days of the Pro plan", "Every workout, the 92 recipes, meal plans, meditations and the AI assistant with no limits."],
    ["Weekly check-in with Maleja", "Every week you review your progress as a group: weight, photos, energy and what to adjust."],
    ["Private progress photos", "Before and after. Only you and Maleja can see them."],
    ["Challenge community", "You join a group that is already going. Nobody does it alone."],
    ["Final prize", "The most consistent transformation wins a month of Elite with a 1:1 session."],
  ],
  howTitle: "How it works",
  howSub: "Four weeks, one goal per week.",
  weeks: [
    ["Week 1 · Foundation", "Learn to train and eat without dieting. 20-30 minute workouts and home-style recipes."],
    ["Week 2 · Rhythm", "Turn up the intensity and log meals with a photo. First adjustment with Maleja."],
    ["Week 3 · Consistency", "The habit exists now. Time to hold it when motivation dips."],
    ["Week 4 · Results", "Final photo, measurements and the prize for the most consistent."],
  ],
  faqTitle: "Questions",
  faq: [
    ["Do I need experience?", "No. Workouts come in beginner, intermediate and advanced levels, and Maleja tells you where to start."],
    ["What happens after the 30 days?", "Your Pro access ends and you decide whether to continue on a monthly plan. Nothing renews automatically."],
    ["When do I start?", "Whenever you want. Your 30 days count from the moment you join, and Maleja adds you to the group that same week."],
  ],
  app: {
    title: "30-Day Challenge",
    kicker: "Your path, week by week",
    day: "Day {d} of 30",
    weekOf: "Week {w} of 4",
    routine: "This week's workout",
    menu: "This week's meal plan",
    habits: "Your 3 habits this week",
    checkin: "Check-in with Maleja",
    checkinBody: "Every week tell her how it's going: weight, energy, what was hard. She adjusts the plan.",
    photos: "Progress photos",
    photosBody: "Only you and Maleja can see them. Upload your starting photo today and the final one on day 30.",
    done: "Challenge complete!",
    doneBody: "30 days. You did it. Message Maleja to close with your final photo and your result.",
    none: "You're not in the challenge yet",
    noneBody: "30 days with Maleja, a group and a week-by-week plan.",
    join: "See the challenge",
    go: "Train",
    open: "See menu",
    ends: "Ends on",
    training: "Your workouts this week",
    warmup: "Warm up 8-10 min (bike, elliptical or treadmill) and stretch 10 s per muscle when done. Gym or home: dumbbells or bands.",
    sets: "sets",
    meals: "Your challenge meal plan",
    mealsNote: "Pick one option per meal. Portions are a guide; shake or protein powder are optional. Unsweetened coffee and tea are fine.",
    choose: "options",
  },
};

const pt: RetoDict = {
  metaTitle: "Desafio de Transformação 30 Dias — Small Habits by Maleja",
  metaDesc: "30 dias com a Maleja: plano Pro completo, check-in semanal, fotos de progresso e prêmio final. Pagamento único.",
  h1a: "Desafio de",
  h1b: "transformação",
  h1c: "30 dias",
  sub: "Um mês com a Maleja, um grupo que começa com você e um plano que cabe na sua vida real.",
  motto: "Pequenos hábitos, grandes resultados.",
  cta: "Entrar no desafio",
  ctaNote: "Pagamento único, sem renovação. Inclui o plano Pro ({pro}/mês) mais o acompanhamento do grupo.",
  includesTitle: "O que inclui",
  includes: [
    ["30 dias de plano Pro", "Todos os treinos, as 92 receitas, cardápios, meditações e o assistente IA sem limite."],
    ["Check-in semanal com a Maleja", "Toda semana você revisa seu avanço em grupo: peso, fotos, energia e o que ajustar."],
    ["Fotos de progresso privadas", "Antes e depois. Só você e a Maleja veem."],
    ["Comunidade do desafio", "Você entra num grupo que já está em andamento. Ninguém faz sozinha."],
    ["Prêmio final", "A transformação mais constante ganha um mês de Elite com sessão 1:1."],
  ],
  howTitle: "Como funciona",
  howSub: "Quatro semanas, um objetivo por semana.",
  weeks: [
    ["Semana 1 · Base", "Aprenda a treinar e a comer sem dietas. Treinos de 20-30 min e receitas de casa."],
    ["Semana 2 · Ritmo", "Aumente a intensidade e registre refeições com foto. Primeiro ajuste com a Maleja."],
    ["Semana 3 · Constância", "O hábito já existe. Hora de sustentá-lo quando a motivação cai."],
    ["Semana 4 · Resultado", "Foto final, medidas e o prêmio para a mais constante."],
  ],
  faqTitle: "Perguntas",
  faq: [
    ["Preciso de experiência?", "Não. Os treinos têm nível iniciante, intermediário e avançado, e a Maleja diz por onde começar."],
    ["O que acontece quando os 30 dias terminam?", "Seu acesso Pro termina e você decide se continua com um plano mensal. Não há cobrança automática."],
    ["Quando eu começo?", "No dia que quiser. Seus 30 dias contam a partir da entrada, e a Maleja te adiciona ao grupo na mesma semana."],
  ],
  app: {
    title: "Desafio 30 dias",
    kicker: "Seu caminho, semana a semana",
    day: "Dia {d} de 30",
    weekOf: "Semana {w} de 4",
    routine: "Seu treino desta semana",
    menu: "Seu cardápio desta semana",
    habits: "Seus 3 hábitos da semana",
    checkin: "Check-in com a Maleja",
    checkinBody: "Toda semana conte como está indo: peso, energia, o que foi difícil. Ela ajusta o plano.",
    photos: "Fotos de progresso",
    photosBody: "Só você e a Maleja veem. Envie a foto inicial hoje e a final no dia 30.",
    done: "Desafio concluído!",
    doneBody: "30 dias. Você conseguiu. Fale com a Maleja para fechar com sua foto final e seu resultado.",
    none: "Você ainda não está no desafio",
    noneBody: "30 dias com a Maleja, um grupo e um plano semana a semana.",
    join: "Ver o desafio",
    go: "Treinar",
    open: "Ver cardápio",
    ends: "Termina em",
    training: "Seu treino da semana",
    warmup: "Aqueça 8-10 min (bike, elíptico ou esteira) e alongue 10 s por músculo ao terminar. Academia ou casa: halteres ou elásticos.",
    sets: "séries",
    meals: "Seu cardápio do desafio",
    mealsNote: "Escolha uma opção por refeição. Porções orientativas; o shake ou a proteína em pó são opcionais. Café e chá sem açúcar, sim.",
    choose: "opções",
  },
};

export const RETO: Record<Lang, RetoDict> = { es, en, pt };
