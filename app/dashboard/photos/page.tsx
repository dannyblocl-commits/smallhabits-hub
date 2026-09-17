import { AppShell } from "@/components/AppShell";
import { requireUser } from "@/lib/auth";
import { tr, locale } from "@/lib/i18n";
import { listPhotos, uploadPhoto, deletePhoto } from "@/app/actions/photos";

export default async function Photos() {
  const [user, { lang, L }] = await Promise.all([requireUser(), tr()]);
  const photos = await listPhotos();
  const P = L.photos;
  const first = photos[0], last = photos.length > 1 ? photos[photos.length - 1] : null;
  const fmt = (iso: string) => new Date(iso).toLocaleDateString(locale(lang), { day: "numeric", month: "short", year: "numeric" });
  const delta = first && last && first.weight != null && last.weight != null ? Math.round((last.weight - first.weight) * 10) / 10 : null;

  return (
    <AppShell title={P.title} kicker={P.kicker}>
      <div className="grid lg:grid-cols-[320px_1fr] gap-5">
        <form action={uploadPhoto} className="card p-5 space-y-3">
          <div className="eyebrow" style={{ color: "var(--fucsia)" }}>{P.nueva}</div>
          <label className="row block p-6 text-center cursor-pointer hover:!border-[var(--fucsia)]">
            <input id="photo" name="photo" type="file" accept="image/*" capture="environment" required className="hidden" />
            <div className="text-3xl" style={{ color: "var(--fucsia)" }}>◉</div>
            <p className="muted text-xs mt-1">{P.toca}</p>
          </label>
          <select id="kind" name="kind" className="input input-s"><option value="antes">{P.antes}</option><option value="progress" selected>{P.progreso}</option><option value="despues">{P.despues}</option></select>
          <input id="ph-weight" name="weight" type="number" step="0.1" min="30" max="300" defaultValue={user.weight ?? ""} placeholder={L.profile.pesoKg} className="input input-s" />
          <input id="ph-note" name="note" placeholder={P.notaPh} className="input input-s" />
          <button className="btn btn-go w-full">{P.subir}</button>
          <p className="fine">{P.privado}</p>
        </form>

        <div className="space-y-5">
          {first && last && (
            <div className="card lift p-5">
              <div className="flex items-center justify-between mb-3"><div className="eyebrow" style={{ color: "var(--fucsia)" }}>{P.comparar}</div>{delta !== null && <span className={`pill ${delta <= 0 ? "pill-s" : "pill-f"}`}>{delta > 0 ? "+" : ""}{delta} kg</span>}</div>
              <div className="grid grid-cols-2 gap-3">
                {[first, last].map((p, i) => (
                  <div key={p.id} className="relative rounded-[20px] overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 veil" />
                    <div className="absolute bottom-3 left-3 right-3"><span className={`pill ${i === 0 ? "" : "pill-f"}`}>{i === 0 ? P.antes : P.ahora}</span><div className="text-sm mt-1">{fmt(p.at)}{p.weight != null ? ` · ${p.weight} kg` : ""}</div></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {photos.length === 0 && <div className="row p-8 text-center muted">{P.vacio}</div>}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[...photos].reverse().map((p) => (
                <div key={p.id} className="relative rounded-[12px] overflow-hidden row" style={{ aspectRatio: "3/4" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 veil" />
                  <div className="absolute bottom-2 left-2 right-2 text-xs"><div className="faint">{fmt(p.at)}</div>{p.weight != null && <div className="num">{p.weight} kg</div>}{p.note && <div className="muted truncate">{p.note}</div>}</div>
                  <form action={deletePhoto} className="absolute top-2 right-2"><input type="hidden" name="id" value={p.id} /><button className="faint text-xs bg-black/40 rounded-full w-6 h-6" aria-label="✕">✕</button></form>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
