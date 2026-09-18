// E2E del gestor de contenido: sube un audio real al store privado como si fuera la coach y devuelve cookies para verificar.
import { readFileSync } from "node:fs";
import pg from "pg";
import { put } from "@vercel/blob";
import { SignJWT } from "jose";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
await pool.query(readFileSync("lib/db.ts", "utf8").match(/query\(`([\s\S]*?)`\)/)[1]);
const coach = (await pool.query("select id from users where email='coach@smallhabits.com'")).rows[0].id;
const member = (await pool.query("select id from users where email='prueba@smallhabits.com'")).rows[0].id;

const mode = process.argv[2] || "up";
const key = "audio:m_1.es";
if (mode === "up") {
  const file = readFileSync("public/audio/m_3.es.mp3"); // un audio distinto al default, para distinguirlo por tamaño
  const blob = await put(`content/audio/m_1.es/${Date.now()}.mp3`, file, { access: "private", addRandomSuffix: true, contentType: "audio/mpeg" });
  await pool.query(`insert into content_media (key, pathname, content_type, size, uploaded_by) values ($1,$2,'audio/mpeg',$3,$4)
    on conflict (key) do update set pathname=excluded.pathname, size=excluded.size, at=now()`, [key, blob.pathname, file.length, coach]);
  console.log(`uploaded\t${file.length}`);
} else {
  const r = await pool.query("delete from content_media where key=$1 returning pathname", [key]);
  console.log(`removed\t${r.rowCount}`);
}
const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const sign = (uid) => new SignJWT({ uid }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1h").sign(secret);
console.log(`coach\tsh_session=${await sign(coach)}`);
console.log(`member\tsh_session=${await sign(member)}`);
await pool.end();
