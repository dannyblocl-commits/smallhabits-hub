"use server";

import { put, del } from "@vercel/blob";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export type Photo = { id: string; url: string; kind: string; weight: number | null; note: string | null; at: string };

// Las fotos viven en un store PRIVADO; se sirven por /api/photos/<id> que verifica dueña o su coach.
export async function listPhotos(userId?: string): Promise<Photo[]> {
  const me = await requireUser();
  const target = me.role === "coach" && userId ? userId : me.id;
  const r = await db().query("select id, kind, weight, note, at from photos where user_id=$1 order by at asc", [target]);
  return r.rows.map((p) => ({ ...p, url: `/api/photos/${p.id}`, weight: p.weight === null ? null : Number(p.weight), at: new Date(p.at).toISOString() }));
}

export async function uploadPhoto(form: FormData) {
  const me = await requireUser();
  const file = form.get("photo");
  if (!(file instanceof File) || !file.type.startsWith("image/") || file.size > 12_000_000) return;
  const kind = String(form.get("kind") || "progress");
  const weight = form.get("weight") ? Number(form.get("weight")) : me.weight;
  const note = String(form.get("note") || "").trim().slice(0, 200) || null;
  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const blob = await put(`photos/${me.id}/${Date.now()}.${ext}`, file, { access: "private", addRandomSuffix: true, contentType: file.type });
  await db().query("insert into photos (user_id, url, pathname, kind, weight, note) values ($1,$2,$3,$4,$5,$6)", [me.id, blob.url, blob.pathname, kind, weight, note]);
  redirect("/dashboard/photos");
}

export async function deletePhoto(form: FormData) {
  const me = await requireUser();
  const id = String(form.get("id") || "");
  const r = await db().query("delete from photos where id=$1 and user_id=$2 returning pathname", [id, me.id]);
  if (r.rows[0]) await del(r.rows[0].pathname).catch(() => {});
  redirect("/dashboard/photos");
}
