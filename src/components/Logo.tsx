import s from "./Logo.module.css";

// Знакът е прерисуван като вектор по оригиналното лого на фирмата (кръг #54b9ff с бял знак),
// а името е изписано със същия шрифт (Comfortaa), както е в логото.
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill="#54b9ff" />
      <path
        d="M21.2 24.8H32.4V45.2H78.4V75.6H67.6V56.4H21.2Z"
        fill="#fff"
        stroke="#fff"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ size = 34, className }: { size?: number; className?: string }) {
  return (
    <span className={`${s.logo} ${className ?? ""}`} style={{ "--logo-size": `${size}px` } as React.CSSProperties}>
      <LogoMark size={size} />
      <span className={s.name}>Timeinvest Stroy</span>
    </span>
  );
}
