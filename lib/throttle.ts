import { headers } from "next/headers";
import { db } from "@/lib/db";

// Límite de intentos por clave (IP, email…) guardado en la base: sobrevive a las
// funciones serverless, que no comparten memoria. Falla abierto si la DB falla.
export async function rateLimit(key: string, max: number, windowSec: number): Promise<{ ok: boolean; retryAfterSec: number }> {
  try {
    const r = await db().query(
      `insert into rate_limits (key, hits, reset_at) values ($1, 1, now() + ($2 || ' seconds')::interval)
       on conflict (key) do update set
         hits = case when rate_limits.reset_at < now() then 1 else rate_limits.hits + 1 end,
         reset_at = case when rate_limits.reset_at < now() then now() + ($2 || ' seconds')::interval else rate_limits.reset_at end
       returning hits, greatest(0, extract(epoch from (reset_at - now())))::int as retry`,
      [key, String(windowSec)]
    );
    const { hits, retry } = r.rows[0];
    return { ok: hits <= max, retryAfterSec: retry };
  } catch {
    return { ok: true, retryAfterSec: 0 };
  }
}

export async function clientIp(): Promise<string> {
  const h = await headers();
  return (h.get("x-forwarded-for") || h.get("x-real-ip") || "unknown").split(",")[0].trim();
}
