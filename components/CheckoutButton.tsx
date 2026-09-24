"use client";

import { useState } from "react";
// Stripe redirect removed - using direct payment links instead

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
    // Using direct Stripe links instead of client-side redirect
    setLoading(false);
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
