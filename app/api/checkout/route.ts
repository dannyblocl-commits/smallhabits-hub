import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe-server";

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planLevel } = await req.json();

    if (!["basico", "pro", "elite"].includes(planLevel)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || "https://smallhabits-hub.vercel.app";
    const successUrl = `${origin}/dashboard?payment=success`;
    const cancelUrl = `${origin}/upgrade?payment=cancelled`;

    const sessionId = await createCheckoutSession(
      user.id,
      planLevel as "basico" | "pro" | "elite",
      successUrl,
      cancelUrl
    );

    return NextResponse.json({ sessionId });
  } catch (error: any) {
    console.error("Checkout error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
