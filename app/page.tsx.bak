import Link from "next/link";
import Image from "next/image";
import { PLANS } from "@/lib/plan";
import { tr } from "@/lib/i18n";
import { Logo, Glow } from "@/components/Leaves";
import { HeroVideo } from "@/components/HeroVideo";
import { LangSwitch } from "@/components/LangSwitch";

export default async function Home() {
  const { lang, L } = await tr();
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--obsidian)" }}>
      <Glow />
      <header className="sticky top-0 z-40 glass !rounded-none !border-x-0 !border-t-0 !shadow-none" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-2">
            <LangSwitch lang={lang} next="/" />
            <Link href="/login" className="px-3 text-sm muted hover:text-[var(--text)]">{L.common.iniciarSesion}</Link>
            <Link href="/signup" className="btn btn-go btn-sm">{L.common.crearCuenta}</Link>
          </nav>
        </div>
      </header>

      <section className="relative max-w-6xl mx-auto px-5 pt-8 pb-10">
        <div className="relative rounded-[28px] overflow-hidden min-h-[520px] md:min-h-[600px] flex items-end">
          <HeroVideo src="/videos/hero.mp4" poster="/img/gal_fuerza.jpg" className="absolute inset-0 w-full h-full object-cover object-[center_20%]" label="Maleja" />
          <div className="absolute inset-0 veil" />
          <div className="relative p-6 md:p-12 max-w-2xl">
            <span className="pill pill-f">{L.home.pill}</span>
            <h1 className="text-5xl md:text-7xl mt-4">{L.home.h1a}<br /><span style={{ color: "var(--sage)" }}>{L.home.h1b}</span></h1>
            <p className="muted mt-4 max-w-lg">{L.home.text}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/signup" className="btn btn-go text-base">{L.home.go}</Link>
              <Link href="/dashboard/upgrade" className="btn btn-ghost">{L.common.verPlanes}</Link>
            </div>
            <p className="eyebrow mt-5" style={{ color: "var(--sage)" }}>{L.common.issa}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4 max-w-lg">
          {[["200+", L.home.miembros], ["3+", L.home.anos], ["1K+", L.home.transf]].map(([n, l]) => (
            <div key={l} className="text-center"><div className="num text-3xl" style={{ color: "var(--sage)" }}>{n}</div><div className="eyebrow mt-1">{l}</div></div>
          ))}
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-5 py-6 text-center">
        <p className="quote text-3xl md:text-4xl" style={{ color: "var(--sage-soft)" }}>{L.common.tagline}</p>
      </section>

      <section className="relative max-w-6xl mx-auto px-5 py-8">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="card lift p-7 relative overflow-hidden isolate">
            <HeroVideo src="/videos/entrenar.mp4" poster="/img/gal_fuerza.jpg" className="absolute inset-0 w-full h-full object-cover opacity-30 -z-10" label="" />
            <div className="absolute inset-0 veil -z-10" />
            <div className="eyebrow" style={{ color: "var(--fucsia)" }}>{L.home.energia}</div>
            <h2 className="text-3xl mt-1">{L.home.entrenar}</h2>
            <p className="muted mt-2">{L.home.entrenarText}</p>
            <div className="timer mt-4 text-5xl">00:42</div>
            <Link href="/dashboard/routines" className="btn btn-go btn-sm mt-5">{L.home.verRutinas}</Link>
          </div>
          <div className="card lift-sage p-7 relative overflow-hidden isolate">
            <HeroVideo src="/videos/comer-bien.mp4" poster="/img/gal_display.jpg" className="absolute inset-0 w-full h-full object-cover opacity-30 -z-10" label="" />
            <div className="absolute inset-0 veil -z-10" />
            <div className="eyebrow" style={{ color: "var(--sage)" }}>{L.home.balance}</div>
            <h2 className="text-3xl mt-1">{L.home.comerBien}</h2>
            <p className="muted mt-2">{L.home.comerBienText}</p>
            <p className="quote text-2xl mt-4" style={{ color: "var(--sage-soft)" }}>Because when we feel good inside, everything flourishes outside.</p>
            <Link href="/dashboard/mindfulness" className="btn btn-balance btn-sm mt-5">{L.home.explorar}</Link>
          </div>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-5 py-8">
        <div className="card p-6 md:p-8 grid md:grid-cols-[auto_1fr] gap-6 items-center">
          <div className="relative w-36 h-36 rounded-full overflow-hidden ring-2 ring-[var(--fucsia)] shadow-[0_0_40px_-10px_var(--fucsia-glow)] mx-auto">
            <Image src="/img/miphoto.jpg" alt="Maleja" fill className="object-cover object-top" sizes="144px" />
          </div>
          <div className="text-center md:text-left">
            <div className="eyebrow">{L.home.tuCoach}</div>
            <h2 className="text-4xl mt-1">Maleja</h2>
            <p className="eyebrow mt-1" style={{ color: "var(--sage)" }}>{L.common.issa}</p>
            <p className="muted mt-2">{L.home.coachBio}</p>
          </div>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-5 py-12">
        <div className="eyebrow">{L.home.planes}</div>
        <h2 className="text-4xl mt-1 mb-8">{L.home.planesSub}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-6">
            <h3 className="text-2xl">{L.common.gratis}</h3>
            <div className="num text-3xl my-3" style={{ color: "var(--sage)" }}>$0</div>
            <ul className="text-sm space-y-2 muted">{L.home.free.map((f) => <li key={f}>· {f}</li>)}</ul>
            <Link href="/signup" className="btn btn-ghost w-full mt-6">{L.home.crearGratis}</Link>
          </div>
          {(["basico", "pro", "elite"] as const).map((k) => {
            const p = PLANS[k]; const hl = k === "pro"; const t = L.plans[k];
            return (
              <div key={k} className={`card p-6 relative ${hl ? "lift ring-1 ring-[var(--fucsia)]" : ""}`}>
                {hl && <span className="pill pill-f absolute -top-3 left-5">{L.home.masElegido}</span>}
                <h3 className="text-2xl">{p.name}</h3>
                <div className="num text-3xl my-3" style={{ color: hl ? "var(--fucsia)" : "var(--text)" }}>{p.price}<span className="text-sm muted font-normal"> {L.common.mes}</span></div>
                <ul className="text-sm space-y-2 muted">{t.features.map((f) => <li key={f}>· {f}</li>)}</ul>
                <Link href="/dashboard/upgrade" className={`btn w-full mt-6 ${hl ? "btn-go" : "btn-balance"}`}>{L.home.elegir} {p.name}</Link>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="relative max-w-6xl mx-auto px-5 py-10 text-center">
        <Logo size="text-lg" />
        <p className="faint text-xs mt-2">© 2026 Small Habits by Maleja · smallhabitsbymaleja.com</p>
        <p className="fine mt-3 max-w-xl mx-auto">{L.home.footer}</p>
      </footer>
    </div>
  );
}
