import type { CapacitorConfig } from "@capacitor/cli";

// La app nativa carga la web en vivo: cada cambio que se despliega en Vercel llega
// a la app sin pasar por revisión. mobile/www es solo la pantalla sin conexión.
const config: CapacitorConfig = {
  appId: "com.smallhabitsbymaleja.app",
  appName: "Small Habits",
  webDir: "mobile/www",
  appendUserAgent: "SmallHabitsApp",
  backgroundColor: "#0B0B0F",
  server: {
    url: "https://smallhabits-hub.vercel.app/dashboard",
    errorPath: "index.html",
    allowNavigation: ["smallhabits-hub.vercel.app", "checkout.stripe.com", "buy.stripe.com", "cal.com", "app.cal.com"],
  },
  ios: { contentInset: "never", limitsNavigationsToAppBoundDomains: false },
  android: { allowMixedContent: false },
  plugins: {
    SplashScreen: { launchShowDuration: 800, backgroundColor: "#0B0B0F", showSpinner: false },
    StatusBar: { style: "DARK", backgroundColor: "#0B0B0F" },
  },
};

export default config;
