"use client";

import Link from "next/link";
import { useState } from "react";

const mindfulnessContent = [
  {
    id: "m_1",
    type: "meditacion",
    title: "Meditación para Antes del Entrenamiento",
    duration: 5,
    description: "Prepara tu mente y cuerpo para el entrenamiento. Enfoque y energía.",
    content: "Cierra los ojos. Respira profundamente. Visualiza tu sesión perfecta. Tú eres fuerte. Tú eres capaz. Cada movimiento cuenta.",
    icon: "🧘",
  },
  {
    id: "m_2",
    type: "reflexion",
    title: "Reflexión Diaria: ¿Qué Aprendiste Hoy?",
    duration: 5,
    description: "Reflexiona sobre tu día y celebra tus pequeños logros.",
    content: "¿Qué te salió bien hoy? ¿Qué puedes mejorar mañana? Recuerda: los pequeños hábitos crean grandes transformaciones.",
    icon: "💭",
  },
  {
    id: "m_3",
    type: "meditacion",
    title: "Meditación de Recuperación Post-Entrenamiento",
    duration: 8,
    description: "Relaja tu cuerpo y mente después de entrenar.",
    content: "Tu cuerpo acaba de trabajar duro. Respira lentamente. Siente el cansancio transformarse en satisfacción. Descansa y regenera.",
    icon: "☮️",
  },
  {
    id: "m_4",
    type: "journal",
    title: "Diario: Cómo Fue Tu Día",
    duration: 10,
    description: "Escribe tus pensamientos, emociones y gratitudes del día.",
    content: "Hoy me sentí... Estoy agradecido por... Mañana quiero... Mis pequeños hábitos de hoy fueron...",
    icon: "📔",
  },
  {
    id: "m_5",
    type: "reflexion",
    title: "Reflexión: Paz en el Presente",
    duration: 6,
    description: "Enfócate en el momento presente, libre de preocupaciones.",
    content: "El pasado no se puede cambiar. El futuro aún no existe. Todo lo que tienes es AHORA. ¿Qué harás con este momento?",
    icon: "🌿",
  },
];

export default function Mindfulness() {
  const [selectedSession, setSelectedSession] = useState(mindfulnessContent[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D]">
      <header className="border-b border-[#6B8F71]/20 bg-[#1A1A1A]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold">
            <span className="text-[#6B8F71]">Small Habits</span>
            <span className="text-[#FAFAF7] ml-2">Hub</span>
          </Link>
          <Link href="/dashboard" className="text-[#FAFAF7] hover:text-[#6B8F71] transition">
            ← Volver
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#FAFAF7] mb-2">Paz Mental & Reflexión</h1>
        <p className="text-[#FAFAF7]/60 mb-8">Meditaciones, reflexiones y journaling para tu bienestar integral.</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Sesiones */}
          <div className="lg:col-span-1">
            <div className="bg-[#2D2D2D] border border-[#6B8F71]/20 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#FAFAF7] mb-4">Sesiones Disponibles</h2>
              <div className="space-y-3">
                {mindfulnessContent.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className={`w-full text-left p-4 rounded-lg border transition ${
                      selectedSession.id === session.id
                        ? "bg-[#6B8F71]/20 border-[#6B8F71]"
                        : "bg-[#1A1A1A] border-[#6B8F71]/10 hover:border-[#6B8F71]/30"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">{session.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#FAFAF7] text-sm mb-1">{session.title}</h3>
                        <p className="text-xs text-[#FAFAF7]/60">{session.duration} min</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main - Sesión Detalles */}
          <div className="lg:col-span-2">
            <div className="bg-[#2D2D2D] border border-[#6B8F71]/20 rounded-xl p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{selectedSession.icon}</div>
                <h2 className="text-3xl font-bold text-[#FAFAF7] mb-2">{selectedSession.title}</h2>
                <p className="text-[#FAFAF7]/70 mb-4">{selectedSession.description}</p>
                <div className="flex justify-center gap-6 text-sm text-[#FAFAF7]/60">
                  <span>⏱️ {selectedSession.duration} minutos</span>
                  <span>
                    📁{" "}
                    {selectedSession.type === "meditacion"
                      ? "Meditación"
                      : selectedSession.type === "reflexion"
                      ? "Reflexión"
                      : "Journaling"}
                  </span>
                </div>
              </div>

              {/* Player */}
              <div className="bg-gradient-to-br from-[#6B8F71]/10 to-[#A67C5B]/10 border border-[#6B8F71]/20 rounded-lg p-8 mb-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">▶️</div>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="mx-auto bg-[#A67C5B] hover:bg-[#C9A882] text-[#1A1A1A] px-12 py-4 rounded-full text-lg font-bold transition"
                  >
                    {isPlaying ? "⏸️ Pausar" : "▶️ Iniciar"}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="bg-[#1A1A1A] rounded-full h-2 mb-4">
                  <div className="bg-[#6B8F71] h-2 rounded-full w-1/3"></div>
                </div>
                <div className="flex justify-between text-xs text-[#FAFAF7]/60">
                  <span>1:42</span>
                  <span>{selectedSession.duration}:00</span>
                </div>
              </div>

              {/* Content */}
              <div className="border-t border-[#6B8F71]/20 pt-8">
                <h3 className="text-lg font-bold text-[#FAFAF7] mb-4">
                  {selectedSession.type === "journal" ? "Preguntas para Reflexionar" : "Contenido"}
                </h3>
                <p className="text-[#FAFAF7]/80 leading-relaxed text-lg italic">
                  "{selectedSession.content}"
                </p>

                {selectedSession.type === "journal" && (
                  <div className="mt-6">
                    <textarea
                      placeholder="Escribe tus pensamientos aquí..."
                      className="w-full bg-[#1A1A1A] border border-[#6B8F71]/20 rounded-lg p-4 text-[#FAFAF7] placeholder-[#FAFAF7]/40 focus:outline-none focus:border-[#6B8F71]"
                      rows={6}
                    ></textarea>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-8 pt-8 border-t border-[#6B8F71]/20 flex gap-4">
                <button className="flex-1 bg-[#6B8F71] hover:bg-[#5a7a61] text-[#FAFAF7] py-3 rounded-lg font-bold transition">
                  ✓ Completar Sesión
                </button>
                <button className="flex-1 bg-[#1A1A1A] border border-[#6B8F71]/20 hover:border-[#6B8F71] text-[#FAFAF7] py-3 rounded-lg font-bold transition">
                  ♡ Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
