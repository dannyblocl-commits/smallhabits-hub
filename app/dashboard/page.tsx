"use client";

import Link from "next/link";
import { demoClients, maleja } from "@/data/clients";
import { demoRoutines } from "@/data/routines";

export default function Dashboard() {
  // Simulamos que el usuario es el primer cliente
  const currentClient = demoClients[0];
  const userRoutines = demoRoutines.slice(0, 2); // Primeras 2 rutinas (gratis)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D]">
      {/* Header */}
      <header className="border-b border-[#6B8F71]/20 bg-[#1A1A1A]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="text-[#6B8F71]">Small Habits</span>
            <span className="text-[#FAFAF7] ml-2">Hub</span>
          </div>
          <nav className="flex items-center gap-6">
            <span className="text-[#FAFAF7] text-sm">Bienvenido, {currentClient.name}</span>
            <button className="text-[#FAFAF7] hover:text-[#6B8F71] transition">Salir</button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-[#6B8F71]/20 to-[#A67C5B]/20 border border-[#6B8F71]/30 rounded-xl p-8 mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#FAFAF7] mb-2">
                ¡Hola, {currentClient.name}! 👋
              </h1>
              <p className="text-[#FAFAF7]/70 text-lg">
                Tu transformación con Maleja comienza ahora.
              </p>
              <div className="mt-4 text-sm text-[#FAFAF7]/60">
                <p>Peso: {currentClient.weight} kg | Altura: {currentClient.height} cm | Objetivo: {currentClient.goal}</p>
              </div>
            </div>
            <div className="text-6xl">{currentClient.avatar ? "🎯" : "💪"}</div>
          </div>
        </div>

        {/* Coach Card */}
        <div className="bg-[#2D2D2D] border border-[#6B8F71]/20 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#FAFAF7] mb-6">Tu Coach</h2>
          <div className="flex items-center gap-6">
            <div className="text-6xl">👩‍🏫</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#FAFAF7]">Maleja</h3>
              <p className="text-[#FAFAF7]/70 mb-3">{maleja.bio}</p>
              <p className="text-sm text-[#FAFAF7]/60">
                Especialidades: {maleja.specialties.join(", ")}
              </p>
            </div>
            <Link href="/dashboard/chat" className="bg-[#A67C5B] hover:bg-[#C9A882] text-[#1A1A1A] px-6 py-2 rounded-lg font-semibold transition">
              Contactar
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Entrenamientos */}
          <Link href="/dashboard/routines" className="group">
            <div className="bg-[#2D2D2D] border border-[#6B8F71]/20 rounded-xl p-8 hover:border-[#6B8F71]/50 transition h-full">
              <div className="text-5xl mb-4">🏋️</div>
              <h3 className="text-2xl font-bold text-[#FAFAF7] mb-2">Entrenamientos</h3>
              <p className="text-[#FAFAF7]/70 mb-4">
                Acceso a {userRoutines.length} rutinas: Funcional, Calistenia, Pilates, Yoga y Estiramientos.
              </p>
              <div className="text-sm text-[#A67C5B] font-semibold group-hover:text-[#C9A882] transition">
                Ver entrenamientos →
              </div>
            </div>
          </Link>

          {/* Nutrición */}
          <Link href="/dashboard/nutrition" className="group">
            <div className="bg-[#2D2D2D] border border-[#6B8F71]/20 rounded-xl p-8 hover:border-[#6B8F71]/50 transition h-full">
              <div className="text-5xl mb-4">🥗</div>
              <h3 className="text-2xl font-bold text-[#FAFAF7] mb-2">Planes de Nutrición</h3>
              <p className="text-[#FAFAF7]/70 mb-4">
                Planes personalizados con cálculo de calorías y macros. Suscripción requerida.
              </p>
              <div className="text-sm text-[#A67C5B] font-semibold group-hover:text-[#C9A882] transition">
                Ir a planes →
              </div>
            </div>
          </Link>

          {/* Paz Mental */}
          <Link href="/dashboard/mindfulness" className="group">
            <div className="bg-[#2D2D2D] border border-[#6B8F71]/20 rounded-xl p-8 hover:border-[#6B8F71]/50 transition h-full">
              <div className="text-5xl mb-4">🧘</div>
              <h3 className="text-2xl font-bold text-[#FAFAF7] mb-2">Paz Mental</h3>
              <p className="text-[#FAFAF7]/70 mb-4">
                Meditaciones guiadas, reflexiones diarias y journaling para tu bienestar mental.
              </p>
              <div className="text-sm text-[#A67C5B] font-semibold group-hover:text-[#C9A882] transition">
                Explorar →
              </div>
            </div>
          </Link>

          {/* Progreso */}
          <Link href="/dashboard/progress" className="group">
            <div className="bg-[#2D2D2D] border border-[#6B8F71]/20 rounded-xl p-8 hover:border-[#6B8F71]/50 transition h-full">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-[#FAFAF7] mb-2">Mi Progreso</h3>
              <p className="text-[#FAFAF7]/70 mb-4">
                Seguimiento detallado de tu peso, energía, estado de ánimo y sesiones completadas.
              </p>
              <div className="text-sm text-[#A67C5B] font-semibold group-hover:text-[#C9A882] transition">
                Ver progreso →
              </div>
            </div>
          </Link>
        </div>

        {/* Suscripción Banner */}
        <div className="bg-gradient-to-r from-[#A67C5B]/10 to-[#6B8F71]/10 border-2 border-[#A67C5B] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[#FAFAF7] mb-4">Desbloquea Tu Potencial Completo</h2>
          <p className="text-[#FAFAF7]/70 mb-6 max-w-2xl mx-auto">
            Suscríbete a Premium y accede a planes de nutrición personalizados, meditaciones premium, seguimiento avanzado y chat directo con Maleja.
          </p>
          <button className="bg-[#A67C5B] hover:bg-[#C9A882] text-[#1A1A1A] px-8 py-3 rounded-lg font-semibold transition">
            Actualizar a Premium - $9.99/mes
          </button>
        </div>
      </div>
    </div>
  );
}
