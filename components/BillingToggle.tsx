import Link from "next/link";

// Selector Mensual / Anual sin JavaScript: dos enlaces con ?anual=1.
export function BillingToggle({ yearly, base, labels, save }: { yearly: boolean; base: string; labels: [string, string]; save: string }) {
  const sep = base.includes("?") ? "&" : "?";
  const [path, hash] = base.split("#");
  const href = (y: boolean) => (y ? `${path}${sep}anual=1` : path) + (hash ? `#${hash}` : "");
  return (
    <div className="inline-flex items-center rounded-full p-1 gap-1" style={{ background: "#141419", border: "1px solid rgba(255,255,255,0.08)" }} role="group">
      {[false, true].map((y, i) => (
        <Link key={i} href={href(y)} scroll={false} aria-current={yearly === y ? "true" : undefined} className="px-5 py-2 rounded-full text-sm font-bold transition" style={yearly === y ? { background: "#FF2D8A", color: "#F5F2F0" } : { color: "#A8A3AE" }}>
          {labels[i]}{y && <span className="ml-2 text-xs" style={{ color: yearly ? "#F5F2F0" : "#7FC29B" }}>{save}</span>}
        </Link>
      ))}
    </div>
  );
}
