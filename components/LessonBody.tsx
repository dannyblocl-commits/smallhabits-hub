// Renderiza el cuerpo de una lección con marcado ligero: "# " subtítulo · "- " lista · "> " cita · línea vacía = párrafo nuevo.
export function LessonBody({ body }: { body: string }) {
  const lines = body.split("\n");
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => { if (list.length) { out.push(<ul key={`ul${out.length}`} className="space-y-1.5 my-2 pl-1">{list.map((t, i) => <li key={i} className="flex gap-2 text-sm"><span style={{ color: "var(--sage)" }}>•</span><span className="muted">{t}</span></li>)}</ul>); list = []; } };
  lines.forEach((raw, i) => {
    const l = raw.trim();
    if (l.startsWith("- ")) { list.push(l.slice(2)); return; }
    flush();
    if (!l) return;
    if (l.startsWith("# ")) out.push(<h3 key={i} className="display text-base mt-4 mb-1" style={{ color: "var(--text)" }}>{l.slice(2)}</h3>);
    else if (l.startsWith("> ")) out.push(<blockquote key={i} className="quote text-lg my-3 pl-4 border-l-2" style={{ borderColor: "var(--sage)", color: "var(--sage-soft)" }}>{l.slice(2)}</blockquote>);
    else out.push(<p key={i} className="muted text-sm my-2 leading-relaxed">{l}</p>);
  });
  flush();
  return <div>{out}</div>;
}
