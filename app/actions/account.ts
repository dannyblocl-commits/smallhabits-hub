"use server";

import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { db } from "@/lib/db";
import { requireUser, destroySession } from "@/lib/auth";
import { stripe } from "@/lib/stripe-sync";

const CONFIRM = ["ELIMINAR", "DELETE", "EXCLUIR"];

export async function deleteMyAccount(form: FormData) {
  const u = await requireUser();
  if (!CONFIRM.includes(String(form.get("confirm") || "").trim().toUpperCase())) redirect("/dashboard/profile?del=confirm");

  if (u.subscription_id && process.env.STRIPE_SECRET_KEY) {
    try { await stripe().subscriptions.cancel(u.subscription_id); } catch (e) { console.error("[delete] stripe cancel", e); }
  }

  const blobs = await db().query("select pathname from photos where user_id=$1", [u.id]).catch(() => ({ rows: [] as { pathname: string }[] }));
  for (const b of blobs.rows) await del(b.pathname).catch(() => {});

  // Referencias sin ON DELETE CASCADE (contenido que la persona editó como coach).
  const nullify = [
    "update routines set updated_by=null where updated_by=$1",
    "update menus set updated_by=null where updated_by=$1",
    "update recipes set updated_by=null where updated_by=$1",
    "update lessons set updated_by=null where updated_by=$1",
    "update content_media set uploaded_by=null where uploaded_by=$1",
    "update assignments set by_coach=null where by_coach=$1",
    "update member_notes set coach_id=null where coach_id=$1",
    "update member_overrides set coach_id=null where coach_id=$1",
    "update recommendations set coach_id=null where coach_id=$1",
    "update tickets set replied_by=null where replied_by=$1",
    "update users set coach_id=null where coach_id=$1",
  ];
  for (const q of nullify) await db().query(q, [u.id]).catch(() => {});
  await db().query("delete from reto_leads where lower(email)=lower($1)", [u.email]).catch(() => {});
  await db().query("delete from users where id=$1", [u.id]);

  await destroySession();
  redirect("/?cuenta=eliminada");
}
