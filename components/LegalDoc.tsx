import Link from "next/link";
import { LangSwitch } from "@/components/LangSwitch";
import type { Lang } from "@/lib/i18n";
import { LEGAL_UPDATED } from "@/lib/legal";

export function LegalDoc({ lang, next, title, updated, sections }: { lang: Lang; next: string; title: string; updated: string; sections: [string, string[]][] }) {
  return (
    <div className="min-h-screen px-6 py-10" style={{ background: "#0B0B0F", color: "#F5F2F0" }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-sm" style={{ color: "#FF2D8A" }}>Small Habits</Link>
          <LangSwitch lang={lang} next={next} />
        </div>
        <h1 className="text-4xl font-black mb-2">{title}</h1>
        <p className="text-sm mb-8" style={{ color: "#A8A3AE" }}>{updated}: {LEGAL_UPDATED}</p>
        {sections.map(([h, ps]) => (
          <section key={h} className="mb-7">
            <h2 className="text-xl font-bold mb-2" style={{ color: "#7FC29B" }}>{h}</h2>
            {ps.length === 1 ? <p className="leading-relaxed" style={{ color: "#D6D2D9" }}>{ps[0]}</p> : (
              <ul className="space-y-2 list-disc pl-5" style={{ color: "#D6D2D9" }}>{ps.map((p) => <li key={p} className="leading-relaxed">{p}</li>)}</ul>
            )}
          </section>
        ))}
        <p className="text-sm mt-10" style={{ color: "#A8A3AE" }}>
          <Link href="/privacidad" className="underline">Privacidad</Link> · <Link href="/terminos" className="underline">Términos</Link> · <Link href="/eliminar-cuenta" className="underline">Eliminar cuenta</Link>
        </p>
      </div>
    </div>
  );
}
