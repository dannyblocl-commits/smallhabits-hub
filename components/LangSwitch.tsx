import { LANGS, LANG_LABEL, Lang } from "@/lib/i18n";

export function LangSwitch({ lang, next }: { lang: Lang; next?: string }) {
  return (
    <div className="flex items-center rounded-full overflow-hidden" style={{ border: "1px solid var(--line)" }} aria-label="Idioma">
      {LANGS.map((l) => (
        <a key={l} href={`/api/lang?l=${l}${next ? `&next=${encodeURIComponent(next)}` : ""}`} className="px-2 py-1 text-[.62rem] tracking-wider display"
          style={l === lang ? { background: "var(--surface-3)", color: "var(--text)" } : { color: "var(--text-3)" }}>{LANG_LABEL[l]}</a>
      ))}
    </div>
  );
}
