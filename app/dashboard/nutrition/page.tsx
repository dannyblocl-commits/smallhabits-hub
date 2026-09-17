"use client";

import Link from "next/link";
import { demoNutritionPlans } from "@/data/nutrition";
import { PremiumBanner } from "@/components/PremiumLock";

export default function Nutrition() {
  const plan = demoNutritionPlans[0];
  const isPremium = false; // Simula que el usuario NO es premium

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
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold text-[#FAFAF7]">Planes de Nutrición</h1>
          <span className="bg-[#A67C5B] text-[#1A1A1A] px-3 py-1 rounded-full text-sm font-bold">PREMIUM</span>
        </div>
        <p className="text-[#FAFAF7]/60 mb-8">Acceso limitado. Upgrade para planes personalizados completos.</p>

        {/* Plan Preview */}
        <div className="bg-gradient-to-br from-[#6B8F71]/10 to-[#A67C5B]/10 border-2 border-[#A67C5B] rounded-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#FAFAF7] mb-2">Plan Tonificación Personalizado</h2>
            <p className="text-[#FAFAF7]/70 mb-6">Ejemplo de lo que obtendrás con Premium</p>

            {/* Macros Overview */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#1A1A1A] border border-[#6B8F71]/30 rounded-lg p-6">
                <span className="text-xs text-[#FAFAF7]/60 font-semibold block mb-2">CALORÍAS DIARIAS</span>
                <span className="text-3xl font-bold text-[#A67C5B]">{plan.daily_calories}</span>
                <span className="text-xs text-[#FAFAF7]/60 block mt-1">kcal/día</span>
              </div>

              <div className="bg-[#1A1A1A] border border-[#6B8F71]/30 rounded-lg p-6">
                <span className="text-xs text-[#FAFAF7]/60 font-semibold block mb-2">PROTEÍNA</span>
                <span className="text-3xl font-bold text-[#A67C5B]">{plan.macros.protein}g</span>
                <span className="text-xs text-[#FAFAF7]/60 block mt-1">30%</span>
              </div>

              <div className="bg-[#1A1A1A] border border-[#6B8F71]/30 rounded-lg p-6">
                <span className="text-xs text-[#FAFAF7]/60 font-semibold block mb-2">CARBOHIDRATOS</span>
                <span className="text-3xl font-bold text-[#A67C5B]">{plan.macros.carbs}g</span>
                <span className="text-xs text-[#FAFAF7]/60 block mt-1">50%</span>
              </div>

              <div className="bg-[#1A1A1A] border border-[#6B8F71]/30 rounded-lg p-6">
                <span className="text-xs text-[#FAFAF7]/60 font-semibold block mb-2">GRASAS</span>
                <span className="text-3xl font-bold text-[#A67C5B]">{plan.macros.fat}g</span>
                <span className="text-xs text-[#FAFAF7]/60 block mt-1">20%</span>
              </div>
            </div>
          </div>

          {/* Meals */}
          <div className="border-t border-[#6B8F71]/20 pt-8">
            <h3 className="text-xl font-bold text-[#FAFAF7] mb-6">Plan Diario de Comidas</h3>

            <div className="space-y-6">
              {plan.meals.map((meal) => (
                <div key={meal.id} className="bg-[#2D2D2D] border border-[#6B8F71]/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-[#FAFAF7]">{meal.name}</h4>
                    <div className="text-right">
                      <span className="text-sm text-[#FAFAF7]/60">Hora:</span>
                      <span className="text-lg font-bold text-[#A67C5B] ml-2">{meal.time}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {meal.foods.map((food) => (
                      <div key={food.id} className="flex items-center justify-between text-sm">
                        <span className="text-[#FAFAF7]">
                          {food.quantity} {food.unit} de {food.name}
                        </span>
                        <span className="text-[#FAFAF7]/60">{food.calories} kcal</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#1A1A1A] rounded-lg p-3 border border-[#6B8F71]/10">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#FAFAF7]">Total de calorías:</span>
                      <span className="text-lg font-bold text-[#A67C5B]">{meal.calories} kcal</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        <div className="bg-gradient-to-r from-[#A67C5B]/20 to-[#6B8F71]/20 border-2 border-[#A67C5B] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[#FAFAF7] mb-4">
            Obtén Planes Personalizados
          </h2>
          <p className="text-[#FAFAF7]/70 mb-6 max-w-2xl mx-auto">
            Con Premium, Maleja diseñará planes de nutrición específicos para tus objetivos,
            incluyendo cálculos exactos de calorías, macros y recomendaciones de alimentos.
          </p>
          <button className="bg-[#A67C5B] hover:bg-[#C9A882] text-[#1A1A1A] px-8 py-3 rounded-lg font-semibold transition">
            Actualizar a Premium - $9.99/mes
          </button>
        </div>
      </div>
    </div>
  );
}
