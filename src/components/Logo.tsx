// Знакът е прерисуван от растерния favicon на сегашния сайт.
// Заменете с оригиналния векторен файл, когато бъде предоставен.
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="42" fill="var(--accent)" />
      <path d="M25 28.5h9.2v15.7h39.1V71h-9.1V54.2H25Z" fill="#fff" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <LogoMark size={30} />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "0.92rem",
          letterSpacing: "0.02em",
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        Тайминвест
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "0.62rem", letterSpacing: "0.32em", marginTop: 4 }}>
          Строй
        </span>
      </span>
    </span>
  );
}
