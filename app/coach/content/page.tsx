import Link from "next/link";
import { requireCoach } from "@/lib/auth";
import { listContent, uploadContent, removeContent } from "@/app/actions/content";
import { Logo } from "@/components/Leaves";
import { listRoutines, listMenus } from "@/lib/library";
const sessions = [["m_1", "Reflexión: pequeños hábitos"], ["m_2", "Worship: gratitud y propósito"], ["m_3", "Meditación: antes de entrenar"], ["m_4", "Meditación: recuperación"], ["m_5", "Journal de la noche"], ["m_6", "Worship: paz en el presente"]];
const langs = [["es", "ES"], ["en", "EN"], ["pt", "PT"]];
const fmt = (iso: string) => new Date(iso).toLocaleString("es", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const mb = (n: number | null) => (n ? `${(n / 1_000_000).toFixed(1)} MB` : "");

export default async function CoachContent({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  await requireCoach();
  const [rows, sp, demoRoutines, menus] = await Promise.all([listContent(), searchParams, listRoutines(), listMenus().then((ms) => ms.map((m) => [m.id, m.name] as [string, string]))]);
  const have = new Map(rows.map((r) => [r.key, r]));

  function Row({ k, label, accept, kind }: { k: string; label: string; accept: string; kind: "video" | "audio" }) {
    const r = have.get(k);
    const src = `/api/content/${k.replace(":", "/")}`;
    return (
      <div className="row p-4 flex flex-col md:flex-row md:items-center gap-3">
        <div className="md:w-64"><div className="display text-sm">{label}</div><div className="faint text-xs">{r ? `Subido ${fmt(r.at)} · ${mb(r.size)}` : "Usando el video/audio por defecto"}</div></div>
        <div className="flex-1">{kind === "video" ? <video src={src} controls preload="metadata" className="h-28 rounded-[8px] bg-black" /> : <audio src={src} controls preload="metadata" className="w-full max-w-sm" />}</div>
        <form action={uploadContent} className="flex items-center gap-2">
          <input type="hidden" name="key" value={k} />
          <input type="file" name="file" accept={accept} required className="text-xs muted max-w-[180px]" />
          <button className="btn btn-balance btn-sm">{r ? "Reemplazar" : "Subir"}</button>
        </form>
        {r && <form action={removeContent}><input type="hidden" name="key" value={k} /><button className="faint text-xs hover:text-[#FF8A8A]">Quitar</button></form>}
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "var(--surface-1)", borderColor: "var(--line)", paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3"><Link href="/coach"><Logo /></Link><span className="pill pill-s">Contenido</span></div>
          <Link href="/coach" className="btn btn-ghost btn-sm">← Panel</Link>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-5 py-6">
        <div className="eyebrow" style={{ color: "var(--sage)" }}>Videos y audios de la app</div>
        <h1 className="text-3xl md:text-4xl mb-2">Tu contenido</h1>
        <p className="muted text-sm mb-6 max-w-2xl">Sube tus propios videos de cada rutina y menú, y los audios de cada sesión. Se reemplazan al instante para todas las miembros; el anterior se borra. Formato recomendado: video vertical 1080×1920 MP4 (máx. 200 MB), audio MP3 o M4A.</p>
        {sp.ok && <div className="row p-3 mb-5 text-sm" style={{ borderColor: "var(--sage)" }}>Listo: <b className="display">{sp.ok.replace(":", " · ")}</b> actualizado.</div>}

        <h2 className="text-2xl mt-6 mb-3">Rutinas</h2>
        <div className="space-y-2">{demoRoutines.map((r) => <Row key={r.id} k={`video:${r.id}`} label={`${r.name} · ${r.duration_minutes} min`} accept="video/*" kind="video" />)}</div>

        <h2 className="text-2xl mt-8 mb-3">Menús</h2>
        <div className="space-y-2">{menus.map(([id, n]) => <Row key={id} k={`video:${id}`} label={n} accept="video/*" kind="video" />)}</div>

        <h2 className="text-2xl mt-8 mb-3">Sesiones de paz mental (audio por idioma)</h2>
        <div className="space-y-2">{sessions.flatMap(([id, n]) => langs.map(([l, L]) => <Row key={`${id}.${l}`} k={`audio:${id}.${l}`} label={`${n} · ${L}`} accept="audio/*" kind="audio" />))}</div>

        <p className="fine mt-8">Los archivos se guardan en un almacén privado y solo se sirven a miembros con sesión. Para grabar bien: luz de ventana, teléfono fijo, vertical, sin música de fondo (la app no la necesita).</p>
      </div>
    </div>
  );
}
