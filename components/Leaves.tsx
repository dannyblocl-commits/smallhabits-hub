const Leaf = ({ style }: { style: React.CSSProperties }) => (
  <svg viewBox="0 0 60 60" className="leaf" style={style} fill="#6B8F71">
    <path d="M30 4C14 12 6 28 10 48c18 4 36-4 44-22C48 12 40 6 30 4z" />
  </svg>
);

export function Leaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <Leaf style={{ top: "8%", left: "5%", transform: "rotate(-30deg)" }} />
      <Leaf style={{ top: "22%", right: "8%", transform: "rotate(20deg) scale(0.7)" }} />
      <Leaf style={{ bottom: "18%", left: "9%", transform: "rotate(60deg) scale(0.8)" }} />
      <Leaf style={{ bottom: "10%", right: "12%", transform: "rotate(-10deg) scale(1.1)" }} />
    </div>
  );
}

export function Logo({ size = "text-2xl" }: { size?: string }) {
  return (
    <span className={`display ${size} font-medium tracking-tight`}>
      <span style={{ color: "#9B3A5A" }}>Small</span> <span style={{ color: "#6B8F71" }}>Habits</span>
    </span>
  );
}
