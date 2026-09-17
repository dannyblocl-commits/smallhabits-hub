// E2E: la coach asigna rutina y escribe al miembro de prueba; imprime cookies para verificar en prod.
import { readFileSync } from "node:fs";
import pg from "pg";
import { SignJWT } from "jose";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const schema = readFileSync("lib/db.ts", "utf8").match(/query\(`([\s\S]*?)`\)/)[1];
await pool.query(schema);

const member = (await pool.query("select id from users where email='prueba@smallhabits.com'")).rows[0].id;
const coach = (await pool.query("select id from users where email='coach@smallhabits.com'")).rows[0].id;
await pool.query(`insert into assignments (user_id, routine_id, menu_id, note, by_coach) values ($1,'routine_2','menu_1','Esta semana prioriza técnica, no velocidad.',$2)
  on conflict (user_id) do update set routine_id='routine_2', menu_id='menu_1', note='Esta semana prioriza técnica, no velocidad.', by_coach=$2, at=now()`, [member, coach]);
await pool.query("delete from messages where from_user=$1 and to_user=$2", [coach, member]);
await pool.query("insert into messages (from_user, to_user, body) values ($1,$2,'Hola! Te asigné HIIT Funcional para esta semana. Cuéntame cómo te va.')", [coach, member]);

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const sign = (uid) => new SignJWT({ uid }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1h").sign(secret);
console.log(`member\t${member}\tsh_session=${await sign(member)}`);
console.log(`coach\t${coach}\tsh_session=${await sign(coach)}`);
await pool.end();
