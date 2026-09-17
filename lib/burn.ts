// kcal quemadas ≈ MET × peso(kg) × horas. METs aproximados por tipo (Compendium of Physical Activities).
const MET: Record<string, number> = { funcional: 8, calistenia: 6, pilates: 3, yoga: 2.5, estiramientos: 2.3 };

export function burnKcal(type: string, minutes: number, weightKg: number | null) {
  const met = MET[type] ?? 5;
  const w = weightKg && weightKg > 30 ? weightKg : 65;
  return Math.round(met * w * (minutes / 60));
}
