import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Small Habits Hub - Tu Gimnasio Virtual",
  description: "Entrenamientos, nutrición, paz mental y seguimiento de calorías. Todo en una app.",
  openGraph: {
    title: "Small Habits Hub",
    description: "Tu transformación comienza aquí",
    images: [{ url: "/og-image.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAFAF7] text-[#2C2C2C]">
        {/* Global Disclaimer Bar */}
        <div className="disclaimer-bar">
          <strong>⚠️ Descargo de responsabilidad:</strong> Esta app es con fines educativos.
          Todos los ejercicios, planes de nutrición y recomendaciones se hacen bajo responsabilidad personal.
          Consulta a un profesional de salud antes de comenzar cualquier programa de ejercicio.
        </div>

        {children}
      </body>
    </html>
  );
}
