import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { db, ensureSchema } from "@/lib/db";
import type { Plan } from "@/lib/plan";

export type Role = "member" | "coach";
export type User = { id: string; email: string; name: string; goal: string; weight: number | null; height: number | null; plan: Plan; role: Role; created_at: string };

const COOKIE = "sh_session";
const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret-change-me");

export async function createSession(userId: string) {
  const token = await new SignJWT({ uid: userId }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("30d").sign(secret());
  (await cookies()).set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 30 });
}

export async function destroySession() { (await cookies()).delete(COOKIE); }

export async function getUser(): Promise<User | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token || !process.env.DATABASE_URL) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    await ensureSchema();
    const r = await db().query("select id, email, name, goal, weight, height, plan, role, created_at from users where id = $1", [payload.uid]);
    if (!r.rows[0]) return null;
    const u = r.rows[0];
    return { ...u, weight: u.weight === null ? null : Number(u.weight), height: u.height === null ? null : Number(u.height) };
  } catch { return null; }
}

export async function requireUser(): Promise<User> {
  const u = await getUser();
  if (!u) redirect("/login");
  return u;
}

export async function requireCoach(): Promise<User> {
  const u = await requireUser();
  if (u.role !== "coach") redirect("/dashboard");
  return u;
}

export const hashPassword = (p: string) => bcrypt.hash(p, 10);
export const verifyPassword = (p: string, h: string) => bcrypt.compare(p, h);
