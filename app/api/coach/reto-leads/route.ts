import { NextRequest, NextResponse } from "next/server";
import { getUser, isAdmin } from "@/lib/auth";
import { db, ensureSchema } from "@/lib/db";

async function allowed() {
  const u = await getUser();
  return !!u && (u.role === "coach" || isAdmin(u));
}

export async function GET() {
  if (!(await allowed())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  await ensureSchema();
  const r = await db().query(`
    select l.*, u.id as user_id, u.reto_start, u.plan as user_plan
      from reto_leads l
      left join users u on lower(u.email) = lower(l.email)
     order by l.created_at desc
     limit 300`);
  return NextResponse.json({ leads: r.rows });
}

export async function POST(req: NextRequest) {
  if (!(await allowed())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { id, status } = await req.json();
  if (!["nuevo", "contactado", "activo", "descartado"].includes(status)) return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  await db().query("update reto_leads set status = $1 where id = $2", [status, id]);
  return NextResponse.json({ ok: true });
}
