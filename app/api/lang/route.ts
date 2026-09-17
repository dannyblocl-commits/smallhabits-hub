import { NextRequest, NextResponse } from "next/server";
import { LANGS, Lang } from "@/lib/i18n";

export async function GET(req: NextRequest) {
  const l = req.nextUrl.searchParams.get("l") as Lang;
  const next = req.nextUrl.searchParams.get("next") || req.headers.get("referer") || "/";
  const safeNext = next.startsWith("http") ? new URL(next).pathname : next;
  const res = NextResponse.redirect(new URL(safeNext.startsWith("/") ? safeNext : "/", req.url));
  if (LANGS.includes(l)) res.cookies.set("sh_lang", l, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return res;
}
