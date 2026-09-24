"use client";

interface SubscriptionStatusProps {
  inTrial: boolean;
  trialEnd?: string | null;
  planLevel: string;
  daysRemaining?: number;
  isActive?: boolean;
  staff?: boolean;
}

export function SubscriptionStatus({
  inTrial,
  trialEnd,
  planLevel,
  daysRemaining = 0,
  isActive = true,
  staff = false,
}: SubscriptionStatusProps) {
  if (staff) return null;

  if (!isActive) {
    return (
      <div
        className="px-4 py-3 rounded-lg mb-4 border-2"
        style={{
          background: "#A8A3AE/10",
          borderColor: "#A8A3AE",
          color: "#F5F2F0",
        }}
      >
        <p className="font-bold text-sm">Estás en el plan gratis</p>
        <p className="text-xs mt-1 opacity-80">
          Desbloquea rutinas, recetas y chat con la coach.{" "}
          <a href="/upgrade" className="underline font-bold" style={{ color: "#FF2D8A" }}>
            Ver planes
          </a>
        </p>
      </div>
    );
  }

  if (inTrial && daysRemaining > 0) {
    return (
      <div
        className="px-4 py-3 rounded-lg mb-4 border-2"
        style={{
          background: "#FF2D8A/10",
          borderColor: "#FF2D8A",
          color: "#FF2D8A",
        }}
      >
        <p className="font-bold text-sm">
          ⏰ Tu prueba gratis vence en {daysRemaining} día{daysRemaining !== 1 ? "s" : ""}
        </p>
        <p className="text-xs mt-1 opacity-80">
          Después se cobrará automáticamente. Puedes cancelar cuando quieras.
        </p>
      </div>
    );
  }

  if (inTrial && daysRemaining === 0) {
    return (
      <div
        className="px-4 py-3 rounded-lg mb-4 border-2"
        style={{
          background: "#FF2D8A/10",
          borderColor: "#FF2D8A",
          color: "#FF2D8A",
        }}
      >
        <p className="font-bold text-sm">
          🎯 Tu prueba termina HOY
        </p>
      </div>
    );
  }

  const planNames: Record<string, string> = {
    basico: "Plan Básico",
    pro: "Plan Pro",
    elite: "Plan Elite",
  };

  return (
    <div
      className="px-4 py-3 rounded-lg mb-4 border-2"
      style={{
        background: "#7FC29B/10",
        borderColor: "#7FC29B",
        color: "#7FC29B",
      }}
    >
      <p className="font-bold text-sm">
        ✓ {planNames[planLevel] || "Suscripción Activa"}
      </p>
    </div>
  );
}

export function FeatureLimit({
  feature: featureName,
  used,
  limit,
}: {
  feature: string;
  used: number;
  limit: number | null;
}) {
  if (limit === null) {
    return (
      <p className="text-xs" style={{ color: "#A8A3AE" }}>
        ✓ Ilimitado
      </p>
    );
  }

  const percentage = (used / limit) * 100;
  const isNearLimit = percentage >= 80;

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span style={{ color: "#A8A3AE" }}>{featureName}</span>
        <span style={{ color: isNearLimit ? "#FF2D8A" : "#7FC29B" }}>
          {used} de {limit}
        </span>
      </div>
      <div className="h-2 bg-[#1a1a1f] rounded-full overflow-hidden">
        <div
          className="h-full transition-all"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            background: isNearLimit ? "#FF2D8A" : "#7FC29B",
          }}
        />
      </div>
    </div>
  );
}

export function UpgradePrompt({ planLevel }: { planLevel: string }) {
  if (planLevel === "elite") return null;

  return (
    <div
      className="px-4 py-4 rounded-lg border-2"
      style={{
        background: "#BA8E54/10",
        borderColor: "#BA8E54",
        color: "#BA8E54",
      }}
    >
      <p className="font-bold text-sm mb-2">⬆️ Desbloquea más</p>
      <p className="text-xs mb-3">
        {planLevel === "basico"
          ? "Upgrade a Pro para más entrenamientos, recetas y soporte prioritario."
          : "Upgrade a Elite para acceso VIP y sesiones 1:1."}
      </p>
      <a
        href="/planes#upgrade"
        className="inline-block px-4 py-2 rounded font-bold text-sm"
        style={{ background: "#BA8E54", color: "#0B0B0F" }}
      >
        Ver planes
      </a>
    </div>
  );
}
