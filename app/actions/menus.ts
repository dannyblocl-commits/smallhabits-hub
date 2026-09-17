"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export type MenuItem = { name: string; kcal: number };
export type UserMenu = { id: string; name: string; items: MenuItem[]; kcal: number; at: string };

export async function listMyMenus(userId?: string): Promise<UserMenu[]> {
  const me = await requireUser();
  const target = me.role === "coach" && userId ? userId : me.id;
  const r = await db().query("select id, name, items, kcal, at from user_menus where user_id=$1 order by at desc", [target]);
  return r.rows.map((m) => ({ ...m, at: new Date(m.at).toISOString() }));
}

export async function createMenu(form: FormData) {
  const me = await requireUser();
  const name = String(form.get("name") || "").trim().slice(0, 80);
  const names = form.getAll("item_name").map(String);
  const kcals = form.getAll("item_kcal").map((k) => parseInt(String(k), 10) || 0);
  const items: MenuItem[] = names.map((n, i) => ({ name: n.trim().slice(0, 120), kcal: Math.max(0, Math.min(5000, kcals[i] ?? 0)) })).filter((x) => x.name && x.kcal);
  if (!name || !items.length) return;
  const kcal = items.reduce((a, x) => a + x.kcal, 0);
  await db().query("insert into user_menus (user_id, name, items, kcal) values ($1,$2,$3,$4)", [me.id, name, JSON.stringify(items), kcal]);
  redirect("/dashboard/menus");
}

export async function deleteMenu(form: FormData) {
  const me = await requireUser();
  await db().query("delete from user_menus where id=$1 and user_id=$2", [String(form.get("id") || ""), me.id]);
  redirect("/dashboard/menus");
}

// Registra todas las comidas del menú como consumidas hoy.
export async function logMenuToday(form: FormData) {
  const me = await requireUser();
  const r = await db().query("select items from user_menus where id=$1 and user_id=$2", [String(form.get("id") || ""), me.id]);
  const items = (r.rows[0]?.items ?? []) as MenuItem[];
  for (const it of items) await db().query("insert into food_entries (user_id, name, kcal, photo) values ($1,$2,$3,'◐')", [me.id, it.name, it.kcal]);
  redirect("/dashboard/food");
}
