// E2E del bloque de seguimiento: foto real al Blob, menú propio, entreno con kcal, peso del día.
import { readFileSync } from "node:fs";
import pg from "pg";
import { put } from "@vercel/blob";
import { SignJWT } from "jose";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const schema = readFileSync("lib/db.ts", "utf8").match(/query\(`([\s\S]*?)`\)/)[1];
await pool.query(schema);
const member = (await pool.query("select id, weight from users where email='prueba@smallhabits.com'")).rows[0];

// 1) Foto real al Blob (misma ruta que uploadPhoto)
const img = readFileSync("public/img/gal_display.jpg");
const blob = await put(`photos/${member.id}/${Date.now()}.jpg`, img, { access: "private", addRandomSuffix: true, contentType: "image/jpeg" });
await pool.query("delete from photos where user_id=$1", [member.id]);
await pool.query("insert into photos (user_id, url, pathname, kind, weight, note, at) values ($1,$2,$3,'antes',66.2,'Semana 1', now() - interval '56 days')", [member.id, blob.url, blob.pathname]);
await pool.query("insert into photos (user_id, url, pathname, kind, weight, note) values ($1,$2,$3,'progress',64.8,'Semana 8')", [member.id, blob.url, blob.pathname]);
console.log("blob\t" + blob.url.slice(0, 60) + "…");

// 2) Menú propio
await pool.query("delete from user_menus where user_id=$1", [member.id]);
await pool.query(`insert into user_menus (user_id, name, items, kcal) values ($1,'Mi día típico',$2,1250)`, [member.id, JSON.stringify([{ name: "Avena con fruta", kcal: 350 }, { name: "Pollo con arroz", kcal: 600 }, { name: "Yogurt griego", kcal: 300 }])]);

// 3) Entreno de hoy con kcal (MET funcional 8 × 64.8 kg × 20/60 ≈ 173)
await pool.query("delete from workouts_done where user_id=$1 and at >= date_trunc('day', now())", [member.id]);
await pool.query("insert into workouts_done (user_id, routine_id, minutes, kcal) values ($1,'routine_2',20,173)", [member.id]);

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const jwt = await new SignJWT({ uid: member.id }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1h").sign(secret);
console.log(`member\t${member.id}\tsh_session=${jwt}`);
await pool.end();
