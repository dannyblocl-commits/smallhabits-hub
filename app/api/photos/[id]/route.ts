import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";

// Sirve una foto del store privado solo a su dueña o a la coach de su dueña.
export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const me = await getUser();
  if (!me) return new NextResponse(null, { status: 401 });
  const { id } = await ctx.params;
  const r = await db().query("select p.pathname, p.user_id, u.coach_id from photos p join users u on u.id=p.user_id where p.id=$1", [id]);
  const p = r.rows[0];
  if (!p) return new NextResponse(null, { status: 404 });
  const allowed = p.user_id === me.id || (me.role === "coach" && (p.coach_id === me.id || p.coach_id === null));
  if (!allowed) return new NextResponse(null, { status: 403 });
  const b = await get(p.pathname, { access: "private" });
  if (b.statusCode !== 200 || !b.stream) return new NextResponse(null, { status: 404 });
  return new NextResponse(b.stream, { headers: { "Content-Type": b.blob.contentType, "Cache-Control": "private, max-age=3600", "Content-Length": String(b.blob.size) } });
}
