import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--font-d" });
const body = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-b" });

export const metadata: Metadata = {
  metadataBase: new URL("https://smallhabits-hub.vercel.app"),
  title: "Small Habits Hub",
  description: "Tu gimnasio, tu nutrición y tu paz mental en una sola app. By Maleja.",
  openGraph: { title: "Small Habits Hub", description: "Wellness from the inside out.", images: ["/img/miphoto.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
