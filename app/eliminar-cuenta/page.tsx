import { getLang } from "@/lib/i18n";
import { DELETE_INFO } from "@/lib/legal";
import { LegalDoc } from "@/components/LegalDoc";

export async function generateMetadata() {
  return { title: `${DELETE_INFO[await getLang()].title} — Small Habits` };
}

export default async function DeleteAccountInfo() {
  const lang = await getLang();
  const d = DELETE_INFO[lang];
  const label = { es: ["Cómo hacerlo", "Qué se borra", "Qué se conserva"], en: ["How to do it", "What is deleted", "What is kept"], pt: ["Como fazer", "O que é apagado", "O que é mantido"] }[lang];
  return (
    <LegalDoc
      lang={lang}
      next="/eliminar-cuenta"
      title={d.title}
      updated={{ es: "Última actualización", en: "Last updated", pt: "Última atualização" }[lang]}
      sections={[[label[0], [...d.body, d.inApp, d.email]], [label[1], d.what], [label[2], [d.kept]]]}
    />
  );
}
