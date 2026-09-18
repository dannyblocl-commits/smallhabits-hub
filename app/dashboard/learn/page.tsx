import Link from "next/link";
import { AppShell, Badge, Locked } from "@/components/AppShell";
import { LessonBody } from "@/components/LessonBody";
import { requireUser } from "@/lib/auth";
import { tr } from "@/lib/i18n";
import { listLessons, localizeLesson } from "@/lib/library";

export default async function Learn({ searchParams }: { searchParams: Promise<{ l?: string }> }) {
  const [user, { lang, L }] = await Promise.all([requireUser(), tr()]);
  const { l } = await searchParams;
  const lessons = await listLessons();
  const openId = lessons.some((x) => x.id === l) ? l : lessons[0]?.id;

  return (
    <AppShell title={L.learn.title} kicker={L.learn.kicker}>
      <div className="grid lg:grid-cols-[280px_1fr] gap-5">
        <aside className="space-y-1">
          {lessons.map((x, i) => { const t = localizeLesson(x, lang); return (
            <Link key={x.id} href={`/dashboard/learn?l=${x.id}`} className={`row block p-3 transition ${x.id === openId ? "!border-[var(--sage)]" : "hover:!border-[var(--line-strong)]"}`}>
              <div className="flex items-center gap-3"><span className="num text-sm w-6" style={{ color: "var(--sage)" }}>{String(i + 1).padStart(2, "0")}</span><span className="display text-sm flex-1 leading-tight">{t.title}</span>{!x.free && <Badge free={false} L={L} />}</div>
            </Link>
          ); })}
        </aside>
        <section>
          {lessons.filter((x) => x.id === openId).map((x) => { const t = localizeLesson(x, lang); return (
            <Locked key={x.id} plan={user.plan} requires={x.free ? "free" : "basico"} feature={t.title} L={L}>
              <article className="card lift-sage p-6 md:p-8">
                <div className="eyebrow" style={{ color: "var(--sage)" }}>{L.learn.by}</div>
                <h2 className="text-3xl mt-1 mb-3">{t.title}</h2>
                <LessonBody body={t.body} />
              </article>
            </Locked>
          ); })}
          <div className="mt-6"><Link href="/dashboard/recipes" className="btn btn-balance btn-sm">{L.learn.verRecetas} →</Link></div>
        </section>
      </div>
    </AppShell>
  );
}
