import { NextResponse } from "next/server";
import { getUser, isAdmin } from "@/lib/auth";
import { db, ensureSchema } from "@/lib/db";

export async function GET() {
  try {
    const user = await getUser();
    if (!user || (user.role !== "coach" && !isAdmin(user))) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await ensureSchema();

    // Obtener todos los usuarios y sus planes
    const result = await db().query(`
      SELECT
        id,
        email,
        name,
        plan_level,
        trial_end,
        subscription_id,
        created_at,
        reto_start,
        CASE
          WHEN reto_start IS NOT NULL AND reto_start > NOW() - interval '30 days'
            THEN 'Reto día ' || (floor(extract(epoch from (NOW() - reto_start)) / 86400) + 1)::int
          WHEN subscription_id IS NOT NULL THEN 'Activa'
          WHEN trial_end > NOW() THEN 'En trial'
          ELSE 'Sin suscripción'
        END as status
      FROM users
      WHERE role = 'member'
      ORDER BY created_at DESC
    `);

    return NextResponse.json({
      totalUsers: result.rows.length,
      users: result.rows,
    });
  } catch (error: any) {
    console.error("Get users error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
