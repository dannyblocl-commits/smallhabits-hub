"use server";

import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export type Msg = { id: string; from_user: string; to_user: string; body: string; at: string; mine: boolean };

async function coachId(): Promise<string | null> {
  const r = await db().query("select id from users where role='coach' order by created_at asc limit 1");
  return r.rows[0]?.id ?? null;
}

// Miembro: hilo con su coach. Coach: hilo con el miembro indicado.
export async function listThread(memberId?: string): Promise<{ peerId: string | null; peerName: string; messages: Msg[] }> {
  const me = await requireUser();
  let peer: string | null;
  if (me.role === "coach") { if (!memberId) throw new Error("memberId requerido"); peer = memberId; }
  else peer = await coachId();
  if (!peer) return { peerId: null, peerName: "Coach", messages: [] };
  const [name, rows] = await Promise.all([
    db().query("select name from users where id=$1", [peer]),
    db().query("select id, from_user, to_user, body, at from messages where (from_user=$1 and to_user=$2) or (from_user=$2 and to_user=$1) order by at asc limit 200", [me.id, peer]),
  ]);
  await db().query("update messages set read_at=now() where to_user=$1 and from_user=$2 and read_at is null", [me.id, peer]);
  return { peerId: peer, peerName: name.rows[0]?.name ?? "Coach", messages: rows.rows.map((m) => ({ ...m, at: new Date(m.at).toISOString(), mine: m.from_user === me.id })) };
}

export async function sendMessage(body: string, toUserId?: string): Promise<Msg> {
  const me = await requireUser();
  const text = body.trim().slice(0, 2000);
  if (!text) throw new Error("Mensaje vacío");
  const to = me.role === "coach" ? toUserId : await coachId();
  if (!to) throw new Error("No hay coach disponible todavía");
  const r = await db().query("insert into messages (from_user, to_user, body) values ($1,$2,$3) returning id, from_user, to_user, body, at", [me.id, to, text]);
  return { ...r.rows[0], at: new Date(r.rows[0].at).toISOString(), mine: true };
}

export async function unreadCount(): Promise<number> {
  const me = await requireUser();
  const r = await db().query("select count(*)::int as n from messages where to_user=$1 and read_at is null", [me.id]);
  return r.rows[0].n;
}
