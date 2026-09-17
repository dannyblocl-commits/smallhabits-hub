import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const display = Sora({ subsets: ["latin"], weight: ["500", "600", "800"], variable: "--font-d" });
const body = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-b" });
const editorial = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["italic"], variable: "--font-e" });

export const metadata: Metadata = {
  metadataBase: new URL("https://smallhabits-hub.vercel.app"),
  title: "Small Habits",
  description: "Energía para moverte. Calma para quedarte. Gimnasio, nutrición y paz mental en una app.",
  manifest: "/manifest.json",
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Small Habits" },
  openGraph: { title: "Small Habits", description: "Energía para moverte. Calma para quedarte.", images: ["/img/miphoto.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0B0B0F", viewportFit: "cover", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${editorial.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
