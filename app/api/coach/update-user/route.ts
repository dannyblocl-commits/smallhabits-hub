import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { db, ensureSchema } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const coach = await getUser();
    if (!coach || coach.role !== "coach") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { userId, action, planLevel, daysOfAccess } = await req.json();

    await ensureSchema();

    if (action === "change-plan") {
      // Cambiar plan de un usuario
      await db().query(
        "UPDATE users SET plan_level = $1 WHERE id = $2 AND role = 'member'",
        [planLevel, userId]
      );
      return NextResponse.json({ success: true, message: `Plan cambiado a ${planLevel}` });
    }

    if (action === "give-access") {
      // Dar acceso temporal (X días)
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + daysOfAccess);

      await db().query(
        "UPDATE users SET trial_end = $1, plan_level = 'basico' WHERE id = $2",
        [trialEnd, userId]
      );
      return NextResponse.json({
        success: true,
        message: `Acceso extendido ${daysOfAccess} días`
      });
    }

    return NextResponse.json({ error: "Acción inválida" }, { status: 400 });
  } catch (error: any) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
