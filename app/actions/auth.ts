"use server";

import { redirect } from "next/navigation";
import { db, ensureSchema } from "@/lib/db";
import { createSession, destroySession, hashPassword, requireUser, verifyPassword } from "@/lib/auth";

export type AuthState = { error?: string } | undefined;

export async function signup(_: AuthState, form: FormData): Promise<AuthState> {
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");
  const goal = String(form.get("goal") || "Salud integral");
  if (name.length < 2) return { error: "Escribe tu nombre." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Ese email no parece válido." };
  if (password.length < 6) return { error: "La contraseña necesita al menos 6 caracteres." };
  await ensureSchema();
  const exists = await db().query("select 1 from users where email = $1", [email]);
  if (exists.rowCount) return { error: "Ya existe una cuenta con ese email. Inicia sesión." };
  const code = String(form.get("coach_code") || "").trim().toUpperCase();
  let role = "member";
  if (code) {
    if (process.env.COACH_INVITE_CODE && code === process.env.COACH_INVITE_CODE.toUpperCase()) role = "coach";
    else return { error: "El código de coach no es válido. Déjalo vacío si eres miembro." };
  }
  const r = await db().query("insert into users (email, password_hash, name, goal, role) values ($1,$2,$3,$4,$5) returning id", [email, await hashPassword(password), name, goal, role]);
  await createSession(r.rows[0].id);
  redirect(role === "coach" ? "/coach" : "/dashboard/coaches");
}

export async function login(_: AuthState, form: FormData): Promise<AuthState> {
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");
  await ensureSchema();
  const r = await db().query("select id, password_hash, role from users where email = $1", [email]);
  const u = r.rows[0];
  if (u && !u.password_hash) return { error: "Esta cuenta entra con Google. Usa el botón \"Continuar con Google\"." };
  if (!u || !(await verifyPassword(password, u.password_hash))) return { error: "Email o contraseña incorrectos." };
  await createSession(u.id);
  redirect(u.role === "coach" ? "/coach" : "/dashboard");
}

export async function logout() { await destroySession(); redirect("/"); }

export async function updateProfile(_: AuthState, form: FormData): Promise<AuthState> {
  const user = await requireUser();
  const name = String(form.get("name") || "").trim();
  const goal = String(form.get("goal") || "").trim();
  const weight = form.get("weight") ? Number(form.get("weight")) : null;
  const height = form.get("height") ? Number(form.get("height")) : null;
  if (name.length < 2) return { error: "El nombre es muy corto." };
  await db().query("update users set name=$1, goal=$2, weight=$3, height=$4 where id=$5", [name, goal, weight, height, user.id]);
  if (weight) await db().query("insert into progress_entries (user_id, weight) values ($1,$2)", [user.id, weight]);
  redirect("/dashboard");
}

// Cuentas creadas con Google no pasan por el formulario de registro: aquí una coach canjea su código desde su perfil.
export async function becomeCoach(form: FormData) {
  const user = await requireUser();
  const code = String(form.get("coach_code") || "").trim().toUpperCase();
  const ok = !!process.env.COACH_INVITE_CODE && code === process.env.COACH_INVITE_CODE.toUpperCase();
  if (!ok) redirect("/dashboard/profile?coach=bad");
  await db().query("update users set role='coach', coach_id=null where id=$1 and role<>'coach'", [user.id]);
  redirect("/coach");
}
