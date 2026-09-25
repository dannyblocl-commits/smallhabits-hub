// Los videos de MuscleWiki exigen un token de medios de 15 min (?token=).
// Se cachea en memoria del proceso para no gastar una llamada por cada vista.
let cached: { token: string; exp: number } | null = null;

export async function mediaToken(): Promise<string | null> {
  const key = process.env.MUSCLEWIKI_API_KEY;
  if (!key) return null;
  if (cached && cached.exp > Date.now() + 60_000) return cached.token;
  try {
    const r = await fetch("https://api.musclewiki.com/media/token", {
      method: "POST",
      headers: { "X-API-Key": key, "User-Agent": "SmallHabitsHub/1.0" },
      cache: "no-store",
    });
    if (!r.ok) return null;
    const d = (await r.json()) as { token: string; expires_in: number };
    cached = { token: d.token, exp: Date.now() + (d.expires_in ?? 900) * 1000 };
    return d.token;
  } catch {
    return null;
  }
}

export const withToken = (url: string, token: string | null) => (token ? `${url}${url.includes("?") ? "&" : "?"}token=${token}` : url);
