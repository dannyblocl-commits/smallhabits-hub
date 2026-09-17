// Prueba de humo: esquema + usuarios de prueba + sesiones firmadas. Uso: node scripts/smoke.mjs
import { readFileSync } from "node:fs";
import pg from "pg";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const schema = readFileSync("lib/db.ts", "utf8").match(/query\(`([\s\S]*?)`\)/)[1];
await pool.query(schema);

const users = [
  { email: "prueba@smallhabits.com", name: "Prueba Miembro", role: "member", goal: "Tonificar", weight: 64.8 },
  { email: "coach@smallhabits.com", name: "Maleja (coach)", role: "coach", goal: "Salud integral", weight: null },
];
const hash = await bcrypt.hash("demo1234", 10);
const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
for (const u of users) {
  const r = await pool.query(
    `insert into users (email, password_hash, name, goal, role, weight) values ($1,$2,$3,$4,$5,$6)
     on conflict (email) do update set name=excluded.name, role=excluded.role returning id`,
    [u.email, hash, u.name, u.goal, u.role, u.weight]);
  const id = r.rows[0].id;
  if (u.role === "member") {
    await pool.query("delete from food_entries where user_id=$1", [id]);
    await pool.query("insert into food_entries (user_id, name, kcal, protein, carbs, fat, photo) values ($1,'Huevos revueltos + pan integral',490,27,36,28,'🍳')", [id]);
    await pool.query("insert into workouts_done (user_id, routine_id) values ($1,'routine_1') on conflict do nothing", [id]);
  }
  const jwt = await new SignJWT({ uid: id }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1h").sign(secret);
  console.log(`${u.role}\t${u.email}\tsh_session=${jwt}`);
}
const n = await pool.query("select count(*)::int as n from users");
console.log(`users_total\t${n.rows[0].n}`);
await pool.end();
