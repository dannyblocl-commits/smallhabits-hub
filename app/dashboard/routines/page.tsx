"use client";

import Link from "next/link";
import { demoRoutines } from "@/data/routines";
import { useState } from "react";

export default function Routines() {
  const [selectedRoutine, setSelectedRoutine] = useState(demoRoutines[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D]">
      {/* Header */}
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
        <h1 className="text-4xl font-bold text-[#FAFAF7] mb-8">Tus Entrenamientos</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Rutinas */}
          <div className="lg:col-span-1">
            <div className="bg-[#2D2D2D] border border-[#6B8F71]/20 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#FAFAF7] mb-4">Disponibles</h2>
              <div className="space-y-3">
                {demoRoutines.map((routine) => (
                  <button
                    key={routine.id}
                    onClick={() => setSelectedRoutine(routine)}
                    className={`w-full text-left p-4 rounded-lg border transition ${
                      selectedRoutine.id === routine.id
                        ? "bg-[#6B8F71]/20 border-[#6B8F71]"
                        : "bg-[#1A1A1A] border-[#6B8F71]/10 hover:border-[#6B8F71]/30"
                    }`}
                  >
                    <h3 className="font-semibold text-[#FAFAF7] text-sm mb-1">{routine.name}</h3>
                    <p className="text-xs text-[#FAFAF7]/60">
                      {routine.duration_minutes}min • {routine.exercises.length} ejercicios
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main - Rutina Detalles */}
          <div className="lg:col-span-2">
            <div className="bg-[#2D2D2D] border border-[#6B8F71]/20 rounded-xl p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-[#FAFAF7] mb-2">{selectedRoutine.name}</h2>
                    <p className="text-[#FAFAF7]/70">{selectedRoutine.description}</p>
                  </div>
                  <span className="bg-[#6B8F71]/20 text-[#6B8F71] px-3 py-1 rounded-lg text-sm font-semibold">
                    {selectedRoutine.difficulty.toUpperCase()}
                  </span>
                </div>

                <div className="flex gap-8 text-sm text-[#FAFAF7]/60">
                  <div>
                    <span className="font-semibold text-[#FAFAF7]">⏱️ Duración:</span> {selectedRoutine.duration_minutes} minutos
                  </div>
                  <div>
                    <span className="font-semibold text-[#FAFAF7]">🏋️ Ejercicios:</span> {selectedRoutine.exercises.length}
                  </div>
                  <div>
                    <span className="font-semibold text-[#FAFAF7]">📂 Tipo:</span> {selectedRoutine.type.replace(/_/g, " ").toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#6B8F71]/20 pt-8">
                <h3 className="text-xl font-bold text-[#FAFAF7] mb-6">Ejercicios</h3>

                <div className="space-y-6">
                  {selectedRoutine.exercises.map((exercise, index) => (
                    <div key={exercise.id} className="bg-[#1A1A1A] border border-[#6B8F71]/10 rounded-lg p-6 hover:border-[#6B8F71]/30 transition">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-bold text-[#FAFAF7] mb-1">
                            {index + 1}. {exercise.name}
                          </h4>
                          <p className="text-[#FAFAF7]/70 text-sm">{exercise.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-[#6B8F71]/10">
                        <div>
                          <span className="text-xs text-[#FAFAF7]/60 font-semibold">SERIES</span>
                          <p className="text-lg font-bold text-[#6B8F71]">{exercise.sets}</p>
                        </div>
                        <div>
                          <span className="text-xs text-[#FAFAF7]/60 font-semibold">REPS</span>
                          <p className="text-lg font-bold text-[#6B8F71]">{exercise.reps}</p>
                        </div>
                        <div>
                          <span className="text-xs text-[#FAFAF7]/60 font-semibold">DESCANSO</span>
                          <p className="text-lg font-bold text-[#6B8F71]">{exercise.rest_seconds}s</p>
                        </div>
                        <div>
                          <span className="text-xs text-[#FAFAF7]/60 font-semibold">MÚSCULOS</span>
                          <p className="text-sm text-[#A67C5B] font-semibold">
                            {exercise.muscle_groups.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 pt-8 border-t border-[#6B8F71]/20">
                <button className="w-full bg-[#A67C5B] hover:bg-[#C9A882] text-[#1A1A1A] py-3 rounded-lg font-bold transition">
                  ▶️ Comenzar Entrenamiento
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
