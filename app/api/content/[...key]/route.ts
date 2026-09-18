import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";

// Sirve el contenido subido por la coach: /api/content/video/routine_1 · /api/content/audio/m_1.es
// Si la coach no subió nada, redirige al archivo por defecto del proyecto.
export async function GET(req: NextRequest, ctx: { params: Promise<{ key: string[] }> }) {
  const me = await getUser();
  if (!me) return new NextResponse(null, { status: 401 });
  const { key } = await ctx.params;
  const [kind, id] = key;
  if (!kind || !id) return new NextResponse(null, { status: 404 });
  const r = await db().query("select pathname, content_type, size from content_media where key=$1", [`${kind}:${id}`]);
  const row = r.rows[0];
  if (!row) return NextResponse.redirect(new URL(kind === "video" ? `/videos/${id}.mp4` : `/audio/${id}.mp3`, req.url));
  const b = await get(row.pathname, { access: "private" });
  if (!b || b.statusCode !== 200 || !b.stream) return new NextResponse(null, { status: 404 });
  const headers: Record<string, string> = { "Content-Type": b.blob.contentType || row.content_type, "Cache-Control": "private, max-age=600", "Accept-Ranges": "bytes" };
  if (b.blob.size) headers["Content-Length"] = String(b.blob.size);
  return new NextResponse(b.stream, { headers });
}
