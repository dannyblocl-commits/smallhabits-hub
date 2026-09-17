import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { tr } from "@/lib/i18n";
import { Logo, Glow } from "@/components/Leaves";
import { AuthForm } from "@/components/AuthForm";
import { LangSwitch } from "@/components/LangSwitch";

export default async function Login() {
  if (await getUser()) redirect("/dashboard");
  const { lang, L } = await tr();
  return (
    <div className="min-h-screen relative flex items-center justify-center px-5" style={{ background: "var(--obsidian)" }}>
      <Glow />
      <div className="glass lift p-9 w-full max-w-md relative fade-in">
        <div className="flex justify-end mb-2"><LangSwitch lang={lang} next="/login" /></div>
        <div className="text-center mb-8"><Logo size="text-3xl" /><p className="eyebrow mt-2">{L.auth.hub}</p></div>
        <AuthForm mode="login" L={L.auth} goals={L.goals} />
        <p className="quote text-center muted mt-6">{L.auth.quote}</p>
        <p className="text-center text-xs faint mt-4"><Link href="/" className="hover:text-[var(--text)]">{L.common.volver}</Link></p>
      </div>
    </div>
  );
}
