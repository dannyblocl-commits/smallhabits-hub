"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/js";

interface CheckoutButtonProps {
  planLevel: "basico" | "pro" | "elite";
  label: string;
}

export function CheckoutButton({ planLevel, label }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      // Crear sesión de checkout
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planLevel }),
      });

      if (!response.ok) {
        throw new Error("Error al crear sesión de pago");
      }

      const { sessionId } = await response.json();

      // Redirigir a Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
      if (!stripe) throw new Error("Stripe no está disponible");

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
      if (stripeError) throw stripeError;
    } catch (err: any) {
      setError(err.message || "Error al procesar el pago");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full py-3 font-bold rounded-lg inline-block text-center"
        style={{
          background: loading ? "#7FC29B" : "#FF2D8A",
          color: "#F5F2F0",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Cargando..." : label}
      </button>
      {error && (
        <p className="text-xs mt-2" style={{ color: "#FF2D8A" }}>
          ❌ {error}
        </p>
      )}
    </>
  );
}
