// E2E del recetario: cookies firmadas de coach y miembro + conteo de recetas/lecciones en la DB. Uso: node scripts/e2e-recetario.mjs
import { readFileSync } from "node:fs";
import pg from "pg";
import { SignJWT } from "jose";
for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
await pool.query(readFileSync("lib/db.ts", "utf8").match(/query\(`([\s\S]*?)`\)/)[1]);
const coach = (await pool.query("select id from users where email='coach@smallhabits.com'")).rows[0].id;
const member = (await pool.query("select id, plan from users where email='prueba@smallhabits.com'")).rows[0];
const r = await pool.query("select count(*)::int as n, count(*) filter (where free)::int as free, count(*) filter (where i18n ? 'en' and i18n ? 'pt')::int as tr from recipes");
const l = await pool.query("select count(*)::int as n, count(*) filter (where i18n ? 'en' and i18n ? 'pt')::int as tr from lessons");
console.log(`recipes\t${r.rows[0].n}\tfree ${r.rows[0].free}\ttranslated ${r.rows[0].tr}`);
console.log(`lessons\t${l.rows[0].n}\ttranslated ${l.rows[0].tr}`);
console.log(`member plan\t${member.plan}`);
const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const sign = (uid) => new SignJWT({ uid }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1h").sign(secret);
console.log(`coach\tsh_session=${await sign(coach)}`);
console.log(`member\tsh_session=${await sign(member.id)}`);
await pool.end();
