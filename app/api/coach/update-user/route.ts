import { NextRequest, NextResponse } from "next/server";
import { getUser, isAdmin } from "@/lib/auth";
import { db, ensureSchema } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const coach = await getUser();
    if (!coach || (coach.role !== "coach" && !isAdmin(coach))) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { userId, action, planLevel, daysOfAccess, track } = await req.json();

    await ensureSchema();

    if (action === "change-plan") {
      // Cambiar plan de un usuario
      if (!["basico", "pro", "elite"].includes(planLevel)) {
        return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
      }
      await db().query(
        "UPDATE users SET plan_level = $1, plan = $1 WHERE id = $2",
        [planLevel, userId]
      );
      return NextResponse.json({ success: true, message: `Plan cambiado a ${planLevel}` });
    }

    if (action === "give-access") {
      // Dar acceso temporal (X días)
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + daysOfAccess);

      await db().query(
        `UPDATE users
           SET trial_end = $1,
               plan = case when plan = 'free' then 'basico' else plan end,
               plan_level = case when plan = 'free' then 'basico' else plan_level end
         WHERE id = $2`,
        [trialEnd, userId]
      );
      return NextResponse.json({
        success: true,
        message: `Acceso extendido ${daysOfAccess} días`
      });
    }

    if (action === "start-reto") {
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 30);
      await db().query(
        `UPDATE users
           SET reto_start = now(),
               reto_track = $3,
               trial_end = $1,
               plan = case when plan = 'elite' then plan else 'pro' end,
               plan_level = case when plan_level = 'elite' then plan_level else 'pro' end
         WHERE id = $2`,
        [trialEnd, userId, track === "hombre" ? "hombre" : "mujer"]
      );
      return NextResponse.json({ success: true, message: "Reto de 30 días asignado" });
    }

    return NextResponse.json({ error: "Acción inválida" }, { status: 400 });
  } catch (error: any) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
