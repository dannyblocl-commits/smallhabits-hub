import { getLang } from "@/lib/i18n";
import { PRIVACY } from "@/lib/legal";
import { LegalDoc } from "@/components/LegalDoc";

export async function generateMetadata() {
  return { title: `${PRIVACY[await getLang()].title} — Small Habits` };
}

export default async function Privacy() {
  const lang = await getLang();
  const d = PRIVACY[lang];
  return <LegalDoc lang={lang} next="/privacidad" title={d.title} updated={d.updated} sections={d.sections} />;
}
