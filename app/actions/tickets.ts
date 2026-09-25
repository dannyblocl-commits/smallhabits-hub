"use server";

import { revalidatePath } from "next/cache";
import { db, ensureSchema } from "@/lib/db";
import { requireUser, requireStaff } from "@/lib/auth";

export type Ticket = { id: string; subject: string; category: string; body: string; status: string; reply: string | null; created_at: string; replied_at: string | null; user_name?: string; user_email?: string; user_plan?: string };

const row = (t: Record<string, unknown>): Ticket => ({
  ...(t as Ticket),
  created_at: new Date(t.created_at as string).toISOString(),
  replied_at: t.replied_at ? new Date(t.replied_at as string).toISOString() : null,
});

export async function createTicket(form: FormData) {
  const u = await requireUser();
  const subject = String(form.get("subject") || "").trim().slice(0, 160);
  const category = String(form.get("category") || "Otro").slice(0, 40);
  const body = String(form.get("body") || "").trim().slice(0, 4000);
  if (!subject) return { error: "empty" };
  await ensureSchema();
  await db().query("insert into tickets (user_id, subject, category, body) values ($1,$2,$3,$4)", [u.id, subject, category, body]);
  revalidatePath("/dashboard/tickets");
  revalidatePath("/coach/tickets");
  return { ok: true };
}

export async function listMyTickets(): Promise<Ticket[]> {
  const u = await requireUser();
  await ensureSchema();
  const r = await db().query("select id, subject, category, body, status, reply, created_at, replied_at from tickets where user_id=$1 order by created_at desc limit 50", [u.id]);
  return r.rows.map(row);
}

export async function listAllTickets(): Promise<Ticket[]> {
  await requireStaff();
  await ensureSchema();
  const r = await db().query(`
    select t.id, t.subject, t.category, t.body, t.status, t.reply, t.created_at, t.replied_at, u.name as user_name, u.email as user_email, u.plan as user_plan
      from tickets t join users u on u.id = t.user_id
     order by case t.status when 'abierto' then 0 else 1 end, t.created_at desc
     limit 200`);
  return r.rows.map(row);
}

export async function replyTicket(form: FormData) {
  const staff = await requireStaff();
  const id = String(form.get("id") || "");
  const reply = String(form.get("reply") || "").trim().slice(0, 4000);
  if (!id || !reply) return;
  await db().query("update tickets set reply=$1, status='respondido', replied_by=$2, replied_at=now() where id=$3", [reply, staff.id, id]);
  revalidatePath("/coach/tickets");
  revalidatePath("/dashboard/tickets");
}

export async function closeTicket(form: FormData) {
  await requireStaff();
  const id = String(form.get("id") || "");
  if (!id) return;
  await db().query("update tickets set status='cerrado' where id=$1", [id]);
  revalidatePath("/coach/tickets");
  revalidatePath("/dashboard/tickets");
}

export async function openTicketsCount(): Promise<number> {
  await ensureSchema();
  const r = await db().query("select count(*)::int as n from tickets where status='abierto'");
  return r.rows[0].n;
}
