"use server";

import { redirect } from "next/navigation";
import { db, ensureSchema } from "@/lib/db";
import { getLang } from "@/lib/i18n";
import { rateLimit, clientIp } from "@/lib/throttle";

const s = (f: FormData, k: string, max = 200) => String(f.get(k) ?? "").trim().slice(0, max);

export async function submitRetoLead(form: FormData) {
  const lang = await getLang();
  const name = s(form, "name", 120);
  const email = s(form, "email", 160).toLowerCase();
  const phone = s(form, "phone", 40);
  const address1 = s(form, "address1");
  const city = s(form, "city", 80);
  const state = s(form, "state", 80);
  const zip = s(form, "zip", 20);
  const goal = s(form, "goal", 40);
  const level = s(form, "level", 40);
  const consent = form.get("consent") === "on";
  if (s(form, "website")) redirect("/reto/gracias");

  if (!name || !email.includes("@") || !phone || !address1 || !city || !state || !zip || !goal || !level || !consent) {
    redirect("/reto/inscripcion?error=1");
  }
  if (!(await rateLimit(`reto:ip:${await clientIp()}`, 5, 3600)).ok) redirect("/reto/gracias");

  await ensureSchema();
  await db().query(
    `insert into reto_leads (name, email, phone, address1, address2, city, state, zip, country, track, goal, level, health, notes, lang)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
    [
      name, email, phone, address1, s(form, "address2") || null, city, state, zip, s(form, "country", 60) || "US",
      s(form, "track", 10) === "hombre" ? "hombre" : "mujer", goal, level, s(form, "health", 500) || null, s(form, "notes", 1000) || null, lang,
    ]
  );
  redirect("/reto/gracias");
}
