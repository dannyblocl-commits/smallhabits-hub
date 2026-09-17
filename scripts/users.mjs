// Lista de usuarios recientes (para verificar registros). Uso: node scripts/users.mjs
import { readFileSync } from "node:fs";
import pg from "pg";
for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
// Aplica el esquema actual (idempotente) antes de consultar: evita depender de la migración perezosa de la app.
await pool.query(readFileSync("lib/db.ts", "utf8").match(/query\(`([\s\S]*?)`\)/)[1]);
const r = await pool.query(`select name, email, role, plan, (google_sub is not null) as google, (password_hash is not null) as pass,
  to_char(created_at at time zone 'America/New_York','DD Mon HH24:MI') as created from users order by created_at desc limit 15`);
console.table(r.rows);
await pool.end();
