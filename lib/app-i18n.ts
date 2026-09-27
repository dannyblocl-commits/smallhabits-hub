import type { Lang } from "@/lib/i18n";
import type { PushL } from "@/components/PushToggle";

type AppL = {
  title: string; kicker: string; installH: string; installP: string; pushH: string; pushP: string;
  install: { installed: string; install: string; ios: string[]; android: string[]; iosTitle: string; androidTitle: string };
  push: PushL;
};

export const APP_L: Record<Lang, AppL> = {
  es: {
    title: "Instalar la app", kicker: "Small Habits en tu pantalla de inicio · gratis",
    installH: "Instálala en tu teléfono", installP: "Queda con su ícono, a pantalla completa y sin barra del navegador. No ocupa espacio ni necesita tienda.",
    pushH: "Notificaciones", pushP: "Te avisamos cuando Maleja te responde, cuando contestan tu ticket y los días clave de tu reto.",
    install: {
      installed: "Ya estás usando la app instalada.", install: "Instalar Small Habits",
      iosTitle: "iPhone (Safari)", ios: ["Abre smallhabits-hub.vercel.app en Safari.", "Toca el botón Compartir (el cuadrado con la flecha hacia arriba).", "Elige \"Agregar a pantalla de inicio\" y toca Agregar.", "Abre Small Habits desde el ícono y activa las notificaciones aquí."],
      androidTitle: "Android (Chrome)", android: ["Abre smallhabits-hub.vercel.app en Chrome.", "Toca el menú ⋮ arriba a la derecha.", "Elige \"Instalar app\" o \"Agregar a la pantalla principal\"."],
    },
    push: { on: "Activadas", off: "Desactivadas", enable: "Activar notificaciones", disable: "Desactivar", test: "Enviar prueba", working: "…", denied: "Bloqueaste las notificaciones. Actívalas en la configuración del teléfono para Small Habits.", iosFirst: "En iPhone, primero instala la app en tu pantalla de inicio (pasos de arriba) y ábrela desde el ícono; ahí podrás activar las notificaciones.", unsupported: "Este navegador no admite notificaciones." },
  },
  en: {
    title: "Install the app", kicker: "Small Habits on your home screen · free",
    installH: "Install it on your phone", installP: "It gets its own icon, full screen, no browser bar. No storage, no app store.",
    pushH: "Notifications", pushP: "We let you know when Maleja replies, when your ticket is answered, and on key days of your challenge.",
    install: {
      installed: "You're already using the installed app.", install: "Install Small Habits",
      iosTitle: "iPhone (Safari)", ios: ["Open smallhabits-hub.vercel.app in Safari.", "Tap the Share button (square with the up arrow).", "Choose \"Add to Home Screen\" and tap Add.", "Open Small Habits from the icon and turn on notifications here."],
      androidTitle: "Android (Chrome)", android: ["Open smallhabits-hub.vercel.app in Chrome.", "Tap the ⋮ menu at the top right.", "Choose \"Install app\" or \"Add to Home screen\"."],
    },
    push: { on: "On", off: "Off", enable: "Turn on notifications", disable: "Turn off", test: "Send test", working: "…", denied: "You blocked notifications. Enable them for Small Habits in your phone settings.", iosFirst: "On iPhone, first add the app to your Home Screen (steps above) and open it from the icon; then you can turn on notifications.", unsupported: "This browser doesn't support notifications." },
  },
  pt: {
    title: "Instalar o app", kicker: "Small Habits na sua tela inicial · grátis",
    installH: "Instale no seu celular", installP: "Fica com ícone próprio, tela cheia e sem a barra do navegador. Não ocupa espaço nem precisa de loja.",
    pushH: "Notificações", pushP: "Avisamos quando a Maleja responde, quando seu ticket é respondido e nos dias-chave do seu desafio.",
    install: {
      installed: "Você já está usando o app instalado.", install: "Instalar Small Habits",
      iosTitle: "iPhone (Safari)", ios: ["Abra smallhabits-hub.vercel.app no Safari.", "Toque em Compartilhar (o quadrado com a seta para cima).", "Escolha \"Adicionar à Tela de Início\" e toque em Adicionar.", "Abra o Small Habits pelo ícone e ative as notificações aqui."],
      androidTitle: "Android (Chrome)", android: ["Abra smallhabits-hub.vercel.app no Chrome.", "Toque no menu ⋮ no canto superior direito.", "Escolha \"Instalar app\" ou \"Adicionar à tela inicial\"."],
    },
    push: { on: "Ativadas", off: "Desativadas", enable: "Ativar notificações", disable: "Desativar", test: "Enviar teste", working: "…", denied: "Você bloqueou as notificações. Ative para o Small Habits nas configurações do celular.", iosFirst: "No iPhone, primeiro adicione o app à Tela de Início (passos acima) e abra pelo ícone; aí poderá ativar as notificações.", unsupported: "Este navegador não suporta notificações." },
  },
};
