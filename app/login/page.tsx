import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { Logo, Glow } from "@/components/Leaves";
import { AuthForm } from "@/components/AuthForm";

export default async function Login() {
  if (await getUser()) redirect("/dashboard");
  return (
    <div className="min-h-screen relative flex items-center justify-center px-5" style={{ background: "var(--obsidian)" }}>
      <Glow />
      <div className="glass lift p-9 w-full max-w-md relative fade-in">
        <div className="text-center mb-8"><Logo size="text-3xl" /><p className="eyebrow mt-2">Hub wellness · by Maleja</p></div>
        <AuthForm mode="login" />
        <p className="quote text-center muted mt-6">Wellness from the inside out.</p>
        <p className="text-center text-xs faint mt-4"><Link href="/" className="hover:text-[var(--text)]">← Volver</Link></p>
      </div>
    </div>
  );
}
