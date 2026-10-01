import Link from "next/link";
import { HeroVideo } from "@/components/HeroVideo";
import { LangSwitch } from "@/components/LangSwitch";
import { getLang } from "@/lib/i18n";
import { HOME } from "@/lib/home-i18n";
import { PLANS, ANNUAL } from "@/lib/plan";
import { BillingToggle } from "@/components/BillingToggle";

export async function generateMetadata() {
  const t = HOME[await getLang()];
  return { title: t.metaTitle, description: t.metaDesc };
}

const STRIPE_LINKS = {
  pro: "https://buy.stripe.com/eVqcN42343dF6c77Mg8og08",
  elite: "https://buy.stripe.com/bJeaEWePQ29B7gb3w08og09",
};

export default async function HomePage({ searchParams }: { searchParams: Promise<{ anual?: string }> }) {
  const lang = await getLang();
  const yearly = (await searchParams).anual === "1";
  const t = HOME[lang];
  const plans = [
    { key: "basico" as const, ...t.plans.basico, price: yearly ? ANNUAL.basico.price : PLANS.basico.price, per: yearly ? t.perYear : t.perMonth, note: yearly ? t.equiv.replace("{n}", ANNUAL.basico.perMonth) : t.monthly, href: yearly ? ANNUAL.basico.link : "/signup-free", external: yearly, highlight: false },
    { key: "pro" as const, ...t.plans.pro, price: yearly ? ANNUAL.pro.price : PLANS.pro.price, per: yearly ? t.perYear : t.perMonth, note: yearly ? t.equiv.replace("{n}", ANNUAL.pro.perMonth) : t.monthly, href: yearly ? ANNUAL.pro.link : STRIPE_LINKS.pro, external: true, highlight: true },
    { key: "elite" as const, ...t.plans.elite, price: PLANS.elite.price, per: t.perMonth, note: yearly ? t.eliteMonthly : t.monthly, href: STRIPE_LINKS.elite, external: true, highlight: false },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#0B0B0F" }}>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(55% 55% at 72% 45%, rgba(255,45,138,0.22), transparent 70%), radial-gradient(40% 40% at 15% 80%, rgba(127,194,155,0.12), transparent 70%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 pt-5 flex justify-end">
          <LangSwitch lang={lang} next="/" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-12 md:pt-16 md:pb-20 grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-center">
          <div className="text-center md:text-left order-2 md:order-1">
            <Link href="/reto" className="inline-block mb-4 px-4 py-2 rounded-full" style={{ background: "rgba(255, 45, 138, 0.1)", borderColor: "#FF2D8A", borderWidth: 1 }}>
              <span style={{ color: "#FF2D8A", fontSize: "14px", fontWeight: 600 }}>{t.pill}</span>
            </Link>

            <h1 className="text-[2.5rem] sm:text-5xl md:text-7xl font-black mb-6 break-words" style={{ letterSpacing: "-0.03em", color: "#F5F2F0", lineHeight: 1.05 }}>
              <span style={{ color: "#FF2D8A" }}>{t.h1a}</span> {lang === "en" ? "habits," : lang === "pt" ? "hábitos," : "hábitos,"}
              <br className="hidden sm:block" />{" "}
              <span style={{ color: "#7FC29B" }}>{t.h1b}</span>
            </h1>

            <p className="text-lg md:text-xl mb-6" style={{ color: "#A8A3AE" }}>{t.sub}</p>
            <p className="text-base md:text-lg mb-10" style={{ color: "#BA8E54", fontWeight: 600 }}>{t.motto}</p>

            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
              <a href="#planes" className="px-8 py-4 rounded-lg font-bold text-lg" style={{ background: "#FF2D8A", color: "#F5F2F0" }}>{t.ctaPlans}</a>
              <a href="#sobre" className="px-8 py-4 rounded-lg font-bold text-lg border-2" style={{ borderColor: "#7FC29B", color: "#7FC29B" }}>{t.ctaMeet}</a>
            </div>
          </div>

          <div className="order-1 md:order-2 mx-auto w-full max-w-[300px] md:max-w-[380px]">
            <div className="relative rounded-[32px] overflow-hidden" style={{ aspectRatio: "9 / 16", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 30px 80px rgba(255,45,138,0.18), 0 10px 30px rgba(0,0,0,0.5)" }}>
              <HeroVideo src="/videos/hero.mp4" poster="/img/miphoto.jpg" className="absolute inset-0 w-full h-full object-cover" label="Maleja" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(11,11,15,0.85), transparent)" }} />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: "#F5F2F0" }}>Maleja</span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(255,45,138,0.9)", color: "#F5F2F0" }}>{t.coachBadge}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE MALEJA */}
      <section id="sobre" className="py-24 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden">
            <HeroVideo src="/videos/ad.mp4" poster="/img/miphoto.jpg" className="w-full aspect-[4/5] object-cover object-top" label="Maleja" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: "#F5F2F0" }}>
              {t.aboutHi} <span style={{ color: "#FF2D8A" }}>Maleja</span>
            </h2>
            <div className="space-y-4 text-lg mb-8" style={{ color: "#A8A3AE" }}>
              <p><strong>{t.aboutCert}</strong></p>
              <ul className="space-y-2 ml-4">{t.aboutSpecs.map((s) => <li key={s}>✓ {s}</li>)}</ul>
            </div>
            <p className="text-lg" style={{ color: "#A8A3AE" }}>
              {t.aboutPhilo1} <strong style={{ color: "#7FC29B" }}>{t.aboutPhilo2}</strong> {t.aboutPhilo3}
            </p>
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section className="py-24 px-6" style={{ background: "#1a1a1f" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16" style={{ color: "#F5F2F0" }}>{t.includesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.includes.map((item) => (
              <div key={item.title} className="card p-6" style={{ borderColor: "#7FC29B", borderWidth: 2, background: "#0B0B0F" }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#F5F2F0" }}>{item.title}</h3>
                <p style={{ color: "#A8A3AE" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILARES CON VIDEO */}
      <section className="py-24 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16" style={{ color: "#F5F2F0" }}>{t.pillarsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.pillars.map((item, i) => {
              const media = [["/videos/entrenar.mp4", "#FF2D8A"], ["/videos/comer-bien.mp4", "#7FC29B"], ["/videos/paz-mental.mp4", "#7FC29B"]][i];
              return (
                <div key={item.title} className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1f", borderColor: media[1], borderWidth: 2 }}>
                  <video autoPlay muted loop playsInline className="w-full aspect-square object-cover" src={media[0]} />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: media[1] }}>{item.title}</h3>
                    <p style={{ color: "#A8A3AE" }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CÓMO EMPEZAR */}
      <section className="py-24 px-6" style={{ background: "#1a1a1f" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4" style={{ color: "#F5F2F0" }}>{t.howTitle}</h2>
          <p className="text-center text-lg mb-16" style={{ color: "#A8A3AE" }}>{t.howSub}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {t.how.map((s) => (
              <div key={s.title} className="card p-8" style={{ background: "#0B0B0F", borderColor: "#7FC29B", borderWidth: 2 }}>
                <h3 className="text-2xl font-bold mb-3" style={{ color: "#FF2D8A" }}>{s.title}</h3>
                <p style={{ color: "#A8A3AE" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/reto" className="inline-block px-8 py-4 rounded-lg font-bold border-2" style={{ borderColor: "#FF2D8A", color: "#FF2D8A" }}>{t.howCta}</Link>
          </div>
        </div>
      </section>

      {/* PROGRESO */}
      <section className="py-24 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: "#F5F2F0" }}>
            {t.progressA} <span style={{ color: "#7FC29B" }}>{t.progressB}</span> {t.progressC}
          </h2>
          <p className="text-xl mb-12" style={{ color: "#A8A3AE" }}>{t.progressSub}</p>
          <div className="rounded-2xl overflow-hidden max-w-2xl mx-auto">
            <video autoPlay muted loop playsInline className="w-full aspect-video object-cover" src="/videos/progreso.mp4" />
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="py-24 px-6" style={{ background: "#1a1a1f" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4" style={{ color: "#F5F2F0" }}>{t.plansTitle}</h2>
          <p className="text-center text-lg mb-8" style={{ color: "#A8A3AE" }}>{t.plansSub}</p>
          <div className="flex justify-center mb-14"><BillingToggle yearly={yearly} base="/#planes" labels={[t.monthlyT, t.yearlyT]} save={t.save.replace("{n}", ANNUAL.basico.save)} /></div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.key} className="rounded-2xl p-8" style={{ background: plan.highlight ? "#FF2D8A" : "#0B0B0F", color: plan.highlight ? "#0B0B0F" : "#F5F2F0", border: plan.highlight ? "none" : "2px solid #7FC29B", transform: plan.highlight ? "scale(1.05)" : "scale(1)" }}>
                {plan.highlight && <div className="text-xs font-black mb-2" style={{ color: "#0B0B0F", opacity: 0.8 }}>{t.popular}</div>}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm mb-4" style={{ opacity: 0.8 }}>{plan.desc}</p>
                <div className="text-4xl font-black mb-1">{plan.price}<span style={{ fontSize: "18px", opacity: 0.7 }}>{plan.per}</span></div>
                <p style={{ opacity: 0.7, marginBottom: "24px", fontSize: "14px" }}>{plan.note}</p>
                <ul className="space-y-3 mb-8">{plan.features.map((f) => <li key={f} style={{ fontSize: "14px" }}>✓ {f}</li>)}</ul>
                <a href={plan.href} target={plan.external ? "_blank" : "_self"} rel={plan.external ? "noopener noreferrer" : undefined} className="w-full py-3 font-bold rounded-lg inline-block text-center" style={{ background: plan.highlight ? "#0B0B0F" : "#FF2D8A", color: plan.highlight ? "#FF2D8A" : "#F5F2F0" }}>
                  {yearly && plan.key === "basico" ? t.plans.pro.cta.replace("Pro", t.plans.basico.name) : plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center mt-12 max-w-2xl mx-auto" style={{ color: "#A8A3AE" }}>{t.trialNote}</p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6" style={{ background: "#0B0B0F" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: "#F5F2F0" }}>{t.finalTitle}</h2>
          <p className="text-xl mb-12" style={{ color: "#A8A3AE" }}>{t.finalSub}</p>
          <Link href="/signup-free" className="inline-block px-12 py-4 rounded-lg font-bold text-lg" style={{ background: "#FF2D8A", color: "#F5F2F0" }}>{t.finalCta}</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 border-t" style={{ borderColor: "#7FC29B", background: "#1a1a1f" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4" style={{ color: "#7FC29B" }}>{t.fCoaching}</h4>
              <ul className="space-y-2 text-sm" style={{ color: "#A8A3AE" }}>
                <li><a href="#planes">{t.fPlans}</a></li>
                <li><a href="#sobre">{t.fAbout}</a></li>
                <li><Link href="/reto">{t.fReto}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: "#7FC29B" }}>{t.fSocial}</h4>
              <ul className="space-y-2 text-sm" style={{ color: "#A8A3AE" }}>
                <li><Link href="/linktree">Instagram · TikTok · YouTube</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: "#7FC29B" }}>{t.fLegal}</h4>
              <ul className="space-y-2 text-sm" style={{ color: "#A8A3AE" }}>
                <li><Link href="/privacidad">{t.fPrivacy}</Link></li>
                <li><Link href="/terminos">{t.fTerms}</Link></li>
                <li><Link href="/eliminar-cuenta">{t.fDelete}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{ color: "#7FC29B" }}>{t.fSupport}</h4>
              <p className="text-sm" style={{ color: "#A8A3AE" }}><a href="mailto:hola@smallhabitsbymaleja.com">hola@smallhabitsbymaleja.com</a></p>
            </div>
          </div>
          <div className="pt-8 border-t text-center" style={{ borderColor: "#7FC29B", color: "#A8A3AE" }}>
            <p>{t.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
