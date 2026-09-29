import type { Lang } from "@/lib/i18n";

type Plan = { name: string; desc: string; features: string[]; cta: string };

export type HomeDict = {
  metaTitle: string; metaDesc: string;
  pill: string; h1a: string; h1b: string; sub: string; motto: string; ctaPlans: string; ctaMeet: string; coachBadge: string;
  aboutHi: string; aboutCert: string; aboutSpecs: string[]; aboutPhilo1: string; aboutPhilo2: string; aboutPhilo3: string;
  includesTitle: string; includes: { icon: string; title: string; desc: string }[];
  pillarsTitle: string; pillars: { title: string; desc: string }[];
  howTitle: string; howSub: string; how: { title: string; desc: string }[]; howCta: string;
  progressA: string; progressB: string; progressC: string; progressSub: string;
  plansTitle: string; plansSub: string; popular: string; perMonth: string; monthly: string; plans: { basico: Plan; pro: Plan; elite: Plan };
  trialNote: string;
  finalTitle: string; finalSub: string; finalCta: string;
  fCoaching: string; fPlans: string; fAbout: string; fReto: string; fSocial: string; fLegal: string; fPrivacy: string; fTerms: string; fDelete: string; fSupport: string; rights: string;
};

const es: HomeDict = {
  metaTitle: "Small Habits by Maleja — Coaching de transformación personal",
  metaDesc: "Pequeños hábitos, grandes resultados. Entrenamiento, nutrición y bienestar mental con Maleja, coach certificada ISSA. 7 días gratis.",
  pill: "Reto de transformación de 30 días →",
  h1a: "Pequeños", h1b: "grandes resultados",
  sub: "Coaching personalizado de transformación física y mental con Maleja, coach certificada ISSA.",
  motto: "Empieza con 7 días gratis. Sin tarjeta.",
  ctaPlans: "Ver planes", ctaMeet: "Conocer a Maleja", coachBadge: "Coach ISSA",
  aboutHi: "Hola, soy", aboutCert: "Coach certificada ISSA", aboutSpecs: ["Entrenamiento personal (CPT)", "Nutrición y planes de alimentación", "Fuerza y acondicionamiento", "Transformación de hábitos"],
  aboutPhilo1: "Mi filosofía es simple:", aboutPhilo2: "no se trata de perfección, se trata de constancia.", aboutPhilo3: "Trabajo con personas como tú para construir hábitos sostenibles que generan resultados reales.",
  includesTitle: "Qué incluye tu coaching",
  includes: [
    { icon: "💪", title: "Rutinas a tu medida", desc: "Según tu nivel, tu tiempo y tu objetivo" },
    { icon: "🍽️", title: "Plan de alimentación", desc: "Recetas balanceadas, ajustadas a tus gustos" },
    { icon: "📊", title: "Seguimiento real", desc: "Peso, fotos de progreso y cómo te sientes" },
    { icon: "💬", title: "Soporte directo", desc: "Escríbele a Maleja para dudas y ajustes" },
    { icon: "🎯", title: "Estrategia de hábitos", desc: "La base que hace que el cambio dure" },
    { icon: "🏆", title: "Comunidad", desc: "Gente en tu mismo proceso, para no rendirte" },
  ],
  pillarsTitle: "Entrena • Come bien • Paz mental",
  pillars: [
    { title: "Rutinas de fuerza", desc: "De principiante a avanzado. Peso corporal, pesas y calistenia, con video." },
    { title: "Plan nutricional", desc: "92 recetas de Maleja, menús por objetivo y registro de comidas con IA." },
    { title: "Bienestar mental", desc: "Meditación, respiración y reflexión. Tu mente también entrena." },
  ],
  howTitle: "Cómo empezar",
  howSub: "Tres pasos, sin complicaciones.",
  how: [
    { title: "1 · Crea tu cuenta", desc: "7 días gratis del plan Básico, sin tarjeta. Explora rutinas, recetas y la app." },
    { title: "2 · Elige tu camino", desc: "Únete al Reto de 30 días con Maleja o elige el plan que va con tu ritmo." },
    { title: "3 · Constancia", desc: "Un hábito pequeño cada día, con seguimiento y la comunidad de tu lado." },
  ],
  howCta: "Ver el reto de 30 días",
  progressA: "Tu", progressB: "progreso", progressC: "es el nuestro",
  progressSub: "Medimos lo que importa: fotos, peso, fuerza, energía y cómo te sientes. Tu avance queda registrado en la app.",
  plansTitle: "Elige tu plan", plansSub: "Todos incluyen rutinas, recetas y comunidad. La diferencia es cuánto te acompaña Maleja.",
  popular: "⭐ MÁS POPULAR", perMonth: "/mes", monthly: "Facturación mensual",
  plans: {
    basico: { name: "Básico", desc: "Perfecto para empezar", features: ["Biblioteca de rutinas con video", "Recetario de 92 recetas", "Registro de comidas con IA", "Chat de soporte", "Acceso a la comunidad"], cta: "Empezar 7 días gratis" },
    pro: { name: "Pro", desc: "El más elegido", features: ["Todo lo de Básico", "Rutinas personalizadas", "Plan de alimentación ajustado a ti", "Seguimiento semanal", "Notas y recomendaciones de Maleja", "Prioridad en soporte"], cta: "Elegir Pro" },
    elite: { name: "Elite", desc: "Transformación guiada", features: ["Todo lo de Pro", "Sesiones 1:1 por video (2 al mes)", "Estrategia de hábitos personalizada", "Acceso VIP a la comunidad", "Ajustes sin límite", "Prioridad máxima"], cta: "Elegir Elite" },
  },
  trialNote: "La prueba gratis de 7 días es del plan Básico y no pide tarjeta. Pro y Elite se cobran al suscribirte; cancelas cuando quieras.",
  finalTitle: "Tu transformación empieza hoy", finalSub: "Pequeños hábitos, grandes resultados.", finalCta: "Empezar gratis",
  fCoaching: "Coaching", fPlans: "Planes", fAbout: "Sobre Maleja", fReto: "Reto de 30 días", fSocial: "Redes", fLegal: "Legal", fPrivacy: "Privacidad", fTerms: "Términos", fDelete: "Eliminar cuenta", fSupport: "Soporte",
  rights: "© 2026 Small Habits by Maleja. Pequeños hábitos, grandes resultados.",
};

const en: HomeDict = {
  metaTitle: "Small Habits by Maleja — Personal transformation coaching",
  metaDesc: "Small habits, big results. Training, nutrition and mental wellbeing with Maleja, ISSA-certified coach. 7 days free.",
  pill: "30-day transformation challenge →",
  h1a: "Small", h1b: "big results",
  sub: "Personal coaching for body and mind with Maleja, ISSA-certified coach.",
  motto: "Start with 7 days free. No card needed.",
  ctaPlans: "See plans", ctaMeet: "Meet Maleja", coachBadge: "ISSA Coach",
  aboutHi: "Hi, I'm", aboutCert: "ISSA-certified coach", aboutSpecs: ["Personal training (CPT)", "Nutrition and meal planning", "Strength and conditioning", "Habit transformation"],
  aboutPhilo1: "My philosophy is simple:", aboutPhilo2: "it's not about perfection, it's about consistency.", aboutPhilo3: "I work with people like you to build lasting habits that bring real results.",
  includesTitle: "What your coaching includes",
  includes: [
    { icon: "💪", title: "Workouts for you", desc: "Built around your level, your time and your goal" },
    { icon: "🍽️", title: "Meal plan", desc: "Balanced recipes, adjusted to what you like" },
    { icon: "📊", title: "Real tracking", desc: "Weight, progress photos and how you feel" },
    { icon: "💬", title: "Direct support", desc: "Message Maleja for questions and adjustments" },
    { icon: "🎯", title: "Habit strategy", desc: "The foundation that makes change last" },
    { icon: "🏆", title: "Community", desc: "People on the same journey, so you don't quit" },
  ],
  pillarsTitle: "Train • Eat well • Peace of mind",
  pillars: [
    { title: "Strength workouts", desc: "Beginner to advanced. Bodyweight, weights and calisthenics, with video." },
    { title: "Nutrition plan", desc: "92 recipes by Maleja, goal-based menus and AI meal logging." },
    { title: "Mental wellbeing", desc: "Meditation, breathing and reflection. Your mind trains too." },
  ],
  howTitle: "How to start",
  howSub: "Three simple steps.",
  how: [
    { title: "1 · Create your account", desc: "7 days of the Basic plan free, no card. Explore workouts, recipes and the app." },
    { title: "2 · Choose your path", desc: "Join the 30-day challenge with Maleja or pick the plan that fits your pace." },
    { title: "3 · Consistency", desc: "One small habit a day, with tracking and the community on your side." },
  ],
  howCta: "See the 30-day challenge",
  progressA: "Your", progressB: "progress", progressC: "is ours",
  progressSub: "We track what matters: photos, weight, strength, energy and how you feel. Your progress lives in the app.",
  plansTitle: "Choose your plan", plansSub: "Every plan includes workouts, recipes and community. The difference is how closely Maleja guides you.",
  popular: "⭐ MOST POPULAR", perMonth: "/mo", monthly: "Billed monthly",
  plans: {
    basico: { name: "Basic", desc: "Perfect to start", features: ["Workout library with video", "92-recipe cookbook", "AI meal logging", "Support chat", "Community access"], cta: "Start 7 days free" },
    pro: { name: "Pro", desc: "Most chosen", features: ["Everything in Basic", "Personalized workouts", "Meal plan adjusted to you", "Weekly check-in", "Notes and tips from Maleja", "Priority support"], cta: "Choose Pro" },
    elite: { name: "Elite", desc: "Guided transformation", features: ["Everything in Pro", "1:1 video sessions (2 a month)", "Personal habit strategy", "VIP community access", "Unlimited adjustments", "Top priority"], cta: "Choose Elite" },
  },
  trialNote: "The 7-day free trial is for the Basic plan and needs no card. Pro and Elite are charged when you subscribe; cancel anytime.",
  finalTitle: "Your transformation starts today", finalSub: "Small habits, big results.", finalCta: "Start free",
  fCoaching: "Coaching", fPlans: "Plans", fAbout: "About Maleja", fReto: "30-day challenge", fSocial: "Social", fLegal: "Legal", fPrivacy: "Privacy", fTerms: "Terms", fDelete: "Delete account", fSupport: "Support",
  rights: "© 2026 Small Habits by Maleja. Small habits, big results.",
};

const pt: HomeDict = {
  metaTitle: "Small Habits by Maleja — Coaching de transformação pessoal",
  metaDesc: "Pequenos hábitos, grandes resultados. Treino, nutrição e bem-estar mental com a Maleja, coach certificada ISSA. 7 dias grátis.",
  pill: "Desafio de transformação de 30 dias →",
  h1a: "Pequenos", h1b: "grandes resultados",
  sub: "Coaching personalizado de transformação física e mental com a Maleja, coach certificada ISSA.",
  motto: "Comece com 7 dias grátis. Sem cartão.",
  ctaPlans: "Ver planos", ctaMeet: "Conhecer a Maleja", coachBadge: "Coach ISSA",
  aboutHi: "Oi, eu sou a", aboutCert: "Coach certificada ISSA", aboutSpecs: ["Personal trainer (CPT)", "Nutrição e planos alimentares", "Força e condicionamento", "Transformação de hábitos"],
  aboutPhilo1: "Minha filosofia é simples:", aboutPhilo2: "não é sobre perfeição, é sobre constância.", aboutPhilo3: "Trabalho com pessoas como você para construir hábitos duradouros que trazem resultados reais.",
  includesTitle: "O que o seu coaching inclui",
  includes: [
    { icon: "💪", title: "Treinos sob medida", desc: "De acordo com seu nível, seu tempo e seu objetivo" },
    { icon: "🍽️", title: "Plano alimentar", desc: "Receitas equilibradas, ajustadas ao seu gosto" },
    { icon: "📊", title: "Acompanhamento real", desc: "Peso, fotos de progresso e como você se sente" },
    { icon: "💬", title: "Suporte direto", desc: "Fale com a Maleja para dúvidas e ajustes" },
    { icon: "🎯", title: "Estratégia de hábitos", desc: "A base que faz a mudança durar" },
    { icon: "🏆", title: "Comunidade", desc: "Pessoas no mesmo processo, para você não desistir" },
  ],
  pillarsTitle: "Treine • Coma bem • Paz mental",
  pillars: [
    { title: "Treinos de força", desc: "Do iniciante ao avançado. Peso corporal, halteres e calistenia, com vídeo." },
    { title: "Plano nutricional", desc: "92 receitas da Maleja, cardápios por objetivo e registro de refeições com IA." },
    { title: "Bem-estar mental", desc: "Meditação, respiração e reflexão. Sua mente também treina." },
  ],
  howTitle: "Como começar",
  howSub: "Três passos, sem complicação.",
  how: [
    { title: "1 · Crie sua conta", desc: "7 dias grátis do plano Básico, sem cartão. Explore treinos, receitas e o app." },
    { title: "2 · Escolha seu caminho", desc: "Entre no Desafio de 30 dias com a Maleja ou escolha o plano no seu ritmo." },
    { title: "3 · Constância", desc: "Um pequeno hábito por dia, com acompanhamento e a comunidade do seu lado." },
  ],
  howCta: "Ver o desafio de 30 dias",
  progressA: "Seu", progressB: "progresso", progressC: "é o nosso",
  progressSub: "Medimos o que importa: fotos, peso, força, energia e como você se sente. Seu avanço fica registrado no app.",
  plansTitle: "Escolha seu plano", plansSub: "Todos incluem treinos, receitas e comunidade. A diferença é o quanto a Maleja acompanha você.",
  popular: "⭐ MAIS POPULAR", perMonth: "/mês", monthly: "Cobrança mensal",
  plans: {
    basico: { name: "Básico", desc: "Perfeito para começar", features: ["Biblioteca de treinos com vídeo", "Livro de 92 receitas", "Registro de refeições com IA", "Chat de suporte", "Acesso à comunidade"], cta: "Começar 7 dias grátis" },
    pro: { name: "Pro", desc: "O mais escolhido", features: ["Tudo do Básico", "Treinos personalizados", "Plano alimentar ajustado a você", "Acompanhamento semanal", "Notas e dicas da Maleja", "Prioridade no suporte"], cta: "Escolher Pro" },
    elite: { name: "Elite", desc: "Transformação guiada", features: ["Tudo do Pro", "Sessões 1:1 por vídeo (2 por mês)", "Estratégia de hábitos personalizada", "Acesso VIP à comunidade", "Ajustes ilimitados", "Prioridade máxima"], cta: "Escolher Elite" },
  },
  trialNote: "O teste grátis de 7 dias é do plano Básico e não pede cartão. Pro e Elite são cobrados ao assinar; cancele quando quiser.",
  finalTitle: "Sua transformação começa hoje", finalSub: "Pequenos hábitos, grandes resultados.", finalCta: "Começar grátis",
  fCoaching: "Coaching", fPlans: "Planos", fAbout: "Sobre a Maleja", fReto: "Desafio de 30 dias", fSocial: "Redes", fLegal: "Legal", fPrivacy: "Privacidade", fTerms: "Termos", fDelete: "Excluir conta", fSupport: "Suporte",
  rights: "© 2026 Small Habits by Maleja. Pequenos hábitos, grandes resultados.",
};

export const HOME: Record<Lang, HomeDict> = { es, en, pt };
