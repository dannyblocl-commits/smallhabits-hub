import { db } from "@/lib/db";

export type MediaMeta = { key: string; content_type: string; size: number | null; at: string };

export const RECIPE_SLOTS = [1, 2, 3, 4] as const;
export const recipeMediaKey = (recipeId: string, slot: number) => `recipe:${recipeId}.${slot}`;
export const mediaUrl = (key: string) => `/api/content/${key.replace(":", "/")}`;

export async function listRecipeMedia(recipeId: string): Promise<MediaMeta[]> {
  const r = await db().query("select key, content_type, size, at from content_media where key like $1 order by key", [`recipe:${recipeId}.%`]);
  return r.rows.map((x) => ({ ...x, at: new Date(x.at).toISOString() }));
}
