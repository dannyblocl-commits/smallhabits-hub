export function LeafMark({ size = 28, color = "#7FC29B" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path d="M32 6C18 14 10 30 14 52c18 4 34-6 42-24C50 16 42 10 32 6z" fill={color} />
      <path d="M16 50C24 36 32 28 48 18" stroke="#0B0B0F" strokeWidth="2.5" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export function Logo({ size = "text-xl", mark = true }: { size?: string; mark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      {mark && <LeafMark size={26} />}
      <span className={`display ${size} tracking-tight`}>
        <span style={{ color: "#FF2D8A" }}>Small</span> <span style={{ color: "#F5F2F0" }}>Habits</span>
      </span>
    </span>
  );
}

export function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,45,138,.22) 0%, transparent 65%)" }} />
      <div className="absolute top-1/3 -right-32 w-[380px] h-[380px] rounded-full" style={{ background: "radial-gradient(circle, rgba(127,194,155,.16) 0%, transparent 65%)" }} />
    </div>
  );
}
