"use server";

import { put, del } from "@vercel/blob";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth";

// Claves válidas: video:<id de rutina o menú> · audio:<id de sesión>.<idioma> · recipe:<id de receta>.<1-4> (foto o video)
const VIDEO_IDS = ["routine_1", "routine_2", "routine_3", "routine_4", "routine_5", "menu_1", "menu_2", "menu_3", "menu_4", "hero", "ad", "entrenar", "comer-bien", "paz-mental", "progreso"];
const AUDIO_IDS = ["m_1", "m_2", "m_3", "m_4", "m_5", "m_6"];
const LANGS = ["es", "en", "pt"];

export type ContentRow = { key: string; content_type: string; size: number | null; at: string };

async function isValidKey(key: string) {
  const [kind, rest] = key.split(":");
  if (kind === "video") {
    if (VIDEO_IDS.includes(rest)) return true;
    const r = await db().query("select 1 from routines where id=$1 union all select 1 from menus where id=$1", [rest]);
    return (r.rowCount ?? 0) > 0;
  }
  if (kind === "audio") { const [id, lang] = rest.split("."); return AUDIO_IDS.includes(id) && LANGS.includes(lang); }
  if (kind === "recipe") {
    const [id, slot] = rest.split(".");
    if (!["1", "2", "3", "4"].includes(slot)) return false;
    const r = await db().query("select 1 from recipes where id=$1", [id]);
    return (r.rowCount ?? 0) > 0;
  }
  return false;
}

export async function listContent(): Promise<ContentRow[]> {
  await requireStaff();
  const r = await db().query("select key, content_type, size, at from content_media order by key");
  return r.rows.map((x) => ({ ...x, at: new Date(x.at).toISOString() }));
}

export async function uploadContent(form: FormData) {
  const coach = await requireStaff();
  const key = String(form.get("key") || "");
  const back = String(form.get("back") || "");
  const file = form.get("file");
  if (!(await isValidKey(key)) || !(file instanceof File) || file.size === 0) return;
  const kind = key.split(":")[0];
  const okType = kind === "video" ? file.type.startsWith("video/") : kind === "audio" ? file.type.startsWith("audio/") : file.type.startsWith("video/") || file.type.startsWith("image/");
  if (!okType) return;
  if (file.size > 200_000_000) return;
  const ext = file.name.split(".").pop()?.toLowerCase() || (file.type.startsWith("image/") ? "jpg" : kind === "audio" ? "mp3" : "mp4");
  const blob = await put(`content/${key.replace(":", "/")}/${Date.now()}.${ext}`, file, { access: "private", addRandomSuffix: true, contentType: file.type });
  const prev = await db().query("select pathname from content_media where key=$1", [key]);
  await db().query(
    `insert into content_media (key, pathname, content_type, size, uploaded_by, at) values ($1,$2,$3,$4,$5,now())
     on conflict (key) do update set pathname=excluded.pathname, content_type=excluded.content_type, size=excluded.size, uploaded_by=excluded.uploaded_by, at=now()`,
    [key, blob.pathname, file.type, file.size, coach.id]
  );
  if (prev.rows[0]?.pathname) await del(prev.rows[0].pathname).catch(() => {});
  redirect(back.startsWith("/coach/") ? back : "/coach/content?ok=" + encodeURIComponent(key));
}

export async function removeContent(form: FormData) {
  await requireStaff();
  const key = String(form.get("key") || "");
  const back = String(form.get("back") || "");
  const r = await db().query("delete from content_media where key=$1 returning pathname", [key]);
  if (r.rows[0]) await del(r.rows[0].pathname).catch(() => {});
  redirect(back.startsWith("/coach/") ? back : "/coach/content");
}
