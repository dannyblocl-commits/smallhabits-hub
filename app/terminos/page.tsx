import { getLang } from "@/lib/i18n";
import { TERMS } from "@/lib/legal";
import { LegalDoc } from "@/components/LegalDoc";

export async function generateMetadata() {
  return { title: `${TERMS[await getLang()].title} — Small Habits` };
}

export default async function Terms() {
  const lang = await getLang();
  const d = TERMS[lang];
  return <LegalDoc lang={lang} next="/terminos" title={d.title} updated={d.updated} sections={d.sections} />;
}
