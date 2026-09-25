import { getLang } from "@/lib/i18n";
import { RETO } from "@/lib/reto-i18n";
import { LangSwitch } from "@/components/LangSwitch";
import { submitRetoLead } from "@/app/actions/reto";

export async function generateMetadata() {
  const t = RETO[await getLang()];
  return { title: `${t.form.title} — Small Habits by Maleja`, description: t.form.kicker };
}

const input = "w-full px-4 py-3 rounded-lg text-[15px]";
const inputStyle = { background: "#141419", color: "#F5F2F0", border: "1px solid rgba(127,194,155,0.3)" };
const label = "block text-sm font-bold mb-1";

function Field({ name, text, type = "text", required = true, placeholder }: { name: string; text: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className={label} htmlFor={name} style={{ color: "#F5F2F0" }}>{text}</label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} className={input} style={inputStyle} />
    </div>
  );
}

export default async function RetoSignup({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const lang = await getLang();
  const t = RETO[lang];
  const f = t.form;
  const { error } = await searchParams;
  const goalKeys = ["grasa", "tonificar", "musculo", "energia"];
  const levelKeys = ["principiante", "intermedio", "avanzado"];

  return (
    <div className="min-h-screen px-6 py-10" style={{ background: "#0B0B0F", color: "#F5F2F0" }}>
      <div className="max-w-xl mx-auto">
        <div className="flex justify-end mb-6"><LangSwitch lang={lang} next="/reto/inscripcion" /></div>
        <h1 className="text-4xl font-black mb-2" style={{ letterSpacing: "-0.02em" }}>{f.title}</h1>
        <p className="mb-8" style={{ color: "#A8A3AE" }}>{f.kicker}</p>

        {error && (
          <p className="mb-6 px-4 py-3 rounded-lg text-sm" style={{ background: "rgba(255,45,138,0.12)", color: "#FF2D8A" }}>
            {lang === "en" ? "Please complete all required fields." : lang === "pt" ? "Preencha todos os campos obrigatórios." : "Completa todos los campos obligatorios."}
          </p>
        )}

        <form action={submitRetoLead} className="space-y-5">
          <Field name="name" text={f.name} />
          <Field name="email" text={f.email} type="email" />
          <Field name="phone" text={f.phone} type="tel" placeholder="+1 407 …" />

          <h2 className="text-xl font-bold pt-4" style={{ color: "#7FC29B" }}>{f.shipping}</h2>
          <Field name="address1" text={f.address1} />
          <Field name="address2" text={f.address2} required={false} />
          <div className="grid grid-cols-2 gap-4">
            <Field name="city" text={f.city} />
            <Field name="state" text={f.state} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field name="zip" text={f.zip} />
            <div>
              <label className={label} htmlFor="country" style={{ color: "#F5F2F0" }}>{f.country}</label>
              <input id="country" name="country" defaultValue="US" className={input} style={inputStyle} />
            </div>
          </div>

          <h2 className="text-xl font-bold pt-4" style={{ color: "#7FC29B" }}>{f.about}</h2>
          <div>
            <span className={label} style={{ color: "#F5F2F0" }}>{f.track}</span>
            <div className="flex gap-3">
              {(["mujer", "hombre"] as const).map((v, i) => (
                <label key={v} className="flex-1 px-4 py-3 rounded-lg text-center cursor-pointer" style={inputStyle}>
                  <input type="radio" name="track" value={v} defaultChecked={i === 0} className="mr-2" />{f.tracks[i]}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className={label} htmlFor="goal" style={{ color: "#F5F2F0" }}>{f.goal}</label>
            <select id="goal" name="goal" required className={input} style={inputStyle} defaultValue="">
              <option value="" disabled>—</option>
              {f.goals.map((g, i) => <option key={g} value={goalKeys[i]}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="level" style={{ color: "#F5F2F0" }}>{f.level}</label>
            <select id="level" name="level" required className={input} style={inputStyle} defaultValue="">
              <option value="" disabled>—</option>
              {f.levels.map((l, i) => <option key={l} value={levelKeys[i]}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="health" style={{ color: "#F5F2F0" }}>{f.health}</label>
            <input id="health" name="health" placeholder={f.healthPh} className={input} style={inputStyle} />
          </div>
          <div>
            <label className={label} htmlFor="notes" style={{ color: "#F5F2F0" }}>{f.notes}</label>
            <textarea id="notes" name="notes" rows={3} placeholder={f.notesPh} className={input} style={inputStyle} />
          </div>

          <label className="flex items-start gap-3 text-sm" style={{ color: "#A8A3AE" }}>
            <input type="checkbox" name="consent" required className="mt-1" />
            <span>{f.consent}</span>
          </label>

          <button type="submit" className="w-full py-4 rounded-xl font-black text-lg" style={{ background: "#FF2D8A", color: "#F5F2F0" }}>
            {f.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
