"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { PLAN_ORDER } from "@/lib/plan";

export type AdminUser = { id: string; name: string; email: string; role: string; plan: string; goal: string; coach_id: string | null; coach_name: string | null; created_at: string; last_seen: string | null };

export async function listAllUsers(): Promise<AdminUser[]> {
  await requireAdmin();
  const r = await db().query(`
    select u.id, u.name, u.email, u.role, u.plan, u.goal, u.coach_id, c.name as coach_name, u.created_at,
      greatest((select max(at) from food_entries f where f.user_id=u.id), (select max(at) from workouts_done w where w.user_id=u.id), (select max(at) from messages m where m.from_user=u.id)) as last_seen
    from users u left join users c on c.id=u.coach_id
    order by u.role desc, u.created_at desc`);
  return r.rows.map((x) => ({ ...x, created_at: new Date(x.created_at).toISOString(), last_seen: x.last_seen ? new Date(x.last_seen).toISOString() : null }));
}

export async function adminUpdateUser(form: FormData) {
  const admin = await requireAdmin();
  const id = String(form.get("id") || "");
  const plan = String(form.get("plan") || "free");
  const role = String(form.get("role") || "member");
  const coach = String(form.get("coach_id") || "") || null;
  if (!id || !PLAN_ORDER.includes(plan as never) || !["member", "coach"].includes(role)) return;
  if (id === admin.id && role !== "coach" && admin.role === "coach") { /* el admin puede degradarse; permitido */ }
  await db().query("update users set plan=$1, role=$2, coach_id=$3 where id=$4", [plan, role, role === "coach" ? null : coach, id]);
  redirect("/admin");
}

export async function adminDeleteUser(form: FormData) {
  const admin = await requireAdmin();
  const id = String(form.get("id") || "");
  if (!id || id === admin.id) return;
  await db().query("delete from users where id=$1", [id]);
  redirect("/admin");
}
