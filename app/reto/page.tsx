import { PLANS, RETO_LINK, RETO_PRICE_LABEL } from "@/lib/plan";
import { getLang } from "@/lib/i18n";
import { RETO } from "@/lib/reto-i18n";
import { LangSwitch } from "@/components/LangSwitch";

export async function generateMetadata() {
  const t = RETO[await getLang()];
  return { title: t.metaTitle, description: t.metaDesc };
}

export default async function RetoPage() {
  const lang = await getLang();
  const t = RETO[lang];

  return (
    <div className="min-h-screen" style={{ background: "#0B0B0F", color: "#F5F2F0" }}>
      <div className="flex justify-end px-6 pt-5 max-w-4xl mx-auto">
        <LangSwitch lang={lang} next="/reto" />
      </div>

      <section className="px-6 pt-12 pb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-6" style={{ letterSpacing: "-0.03em" }}>
          {t.h1a} <span style={{ color: "#FF2D8A" }}>{t.h1b}</span>
          <br />
          <span style={{ color: "#7FC29B" }}>{t.h1c}</span>
        </h1>
        <p className="text-xl mb-4" style={{ color: "#A8A3AE" }}>{t.sub}</p>
        <p className="text-lg mb-10" style={{ color: "#BA8E54", fontWeight: 600 }}>{t.motto}</p>
        <a href={RETO_LINK} className="inline-block px-10 py-5 rounded-xl font-black text-xl" style={{ background: "#FF2D8A", color: "#F5F2F0" }}>
          {t.cta} — {RETO_PRICE_LABEL}
        </a>
        <p className="mt-3 text-sm" style={{ color: "#A8A3AE" }}>{t.ctaNote.replace("{pro}", PLANS.pro.price)}</p>
      </section>

      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-10 text-center">{t.includesTitle}</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {t.includes.map(([title, desc]) => (
            <div key={title} className="rounded-2xl p-6" style={{ background: "#141419", border: "1px solid rgba(127,194,155,0.25)" }}>
              <p className="font-bold text-lg mb-2" style={{ color: "#7FC29B" }}>✓ {title}</p>
              <p style={{ color: "#A8A3AE" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-3 text-center">{t.howTitle}</h2>
        <p className="text-center mb-10" style={{ color: "#A8A3AE" }}>{t.howSub}</p>
        <div className="grid md:grid-cols-2 gap-5">
          {t.weeks.map(([title, desc]) => (
            <div key={title} className="rounded-2xl p-6" style={{ background: "#141419" }}>
              <p className="font-bold mb-2" style={{ color: "#FF2D8A" }}>{title}</p>
              <p style={{ color: "#A8A3AE" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-black mb-8 text-center">{t.faqTitle}</h2>
        <div className="space-y-4">
          {t.faq.map(([q, a]) => (
            <div key={q} className="rounded-2xl p-6" style={{ background: "#141419" }}>
              <p className="font-bold mb-1">{q}</p>
              <p style={{ color: "#A8A3AE" }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <a href={RETO_LINK} className="inline-block px-10 py-5 rounded-xl font-black text-xl" style={{ background: "#FF2D8A", color: "#F5F2F0" }}>
          {t.cta} — {RETO_PRICE_LABEL}
        </a>
      </section>
    </div>
  );
}
