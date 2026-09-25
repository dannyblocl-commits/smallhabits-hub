import Link from "next/link";
import { getLang } from "@/lib/i18n";
import { RETO } from "@/lib/reto-i18n";

export default async function RetoThanks() {
  const t = RETO[await getLang()].form;
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#0B0B0F", color: "#F5F2F0" }}>
      <div className="max-w-md text-center">
        <div className="text-5xl mb-4">💚</div>
        <h1 className="text-3xl font-black mb-3">{t.thanksTitle}</h1>
        <p className="mb-8" style={{ color: "#A8A3AE" }}>{t.thanksBody}</p>
        <Link href="/signup-free" className="inline-block px-8 py-4 rounded-xl font-bold" style={{ background: "#FF2D8A", color: "#F5F2F0" }}>
          {t.thanksCta}
        </Link>
      </div>
    </div>
  );
}
