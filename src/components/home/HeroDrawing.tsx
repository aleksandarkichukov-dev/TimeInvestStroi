// Линейна фасада на „Лейк хаус“, начертана в координатите на цялата снимка
// /img/projects/lake-house/005.webp (в мащаб 2048 × 1536). Снимката се показва цялата (4:3),
// а SVG-то е със същите пропорции, затова линиите легнат точно върху сградата.

const building = [
  // десен горен обем
  "M1377 364 L1828 259 L1879 433",
  "M1377 364 L1377 553",
  "M1377 395 L1823 297",
  "M1444 433 L1753 376 L1753 544 L1444 553 Z",
  "M1597 405 L1597 546",
  // среден обем
  "M1137 468 L1393 420",
  "M1157 507 L1382 487 L1382 599 L1157 608 Z",
  // ляв горен обем
  "M773 468 L988 418 L1142 468",
  "M788 471 L788 604",
  "M988 418 L988 615",
  "M891 507 L1106 526 L1106 615 L891 608",
  // стъклен парапет
  "M620 553 L788 538",
  "M604 601 L620 553",
  // плоча между етажите
  "M604 601 L1137 618 L1377 591 L1884 553",
  "M604 630 L1137 642 L1382 615 L1884 581",
  // партер
  "M625 651 L625 782",
  "M645 642 L778 642 L778 782",
  "M1213 651 L1372 651 L1372 775",
  "M1597 630 L1741 630 L1741 773",
  "M604 782 L1782 775",
  // стълби
  "M840 789 L988 789 M809 809 L988 809 M778 830 L988 830 M748 850 L988 850",
  "M1638 799 L2048 799 M1633 825 L2048 825 M1628 855 L2048 855 M1623 886 L2048 886 M1618 917 L2048 917",
];

const axes = [
  { x: 604, label: "А" },
  { x: 988, label: "Б" },
  { x: 1377, label: "В" },
  { x: 1879, label: "Г" },
];

const GROUND = 866;

export function HeroDrawing() {
  return (
    <svg viewBox="0 0 2048 1536" aria-hidden="true" data-drawing>
      <g data-axes fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="18 12" opacity="0.45">
        {axes.map((a) => (
          <path key={a.x} d={`M${a.x} 170 V${GROUND + 60}`} data-axis />
        ))}
      </g>
      <path d={`M0 ${GROUND} H2048`} fill="none" stroke="currentColor" strokeWidth="3" pathLength={1} data-line data-ground />
      <g data-axes-labels fontFamily="var(--font-mono)" fontSize="28" fill="currentColor" textAnchor="middle">
        {axes.map((a) => (
          <g key={a.x}>
            <circle cx={a.x} cy={140} r={28} fill="none" stroke="currentColor" strokeWidth="2" />
            <text x={a.x} y={150}>
              {a.label}
            </text>
          </g>
        ))}
      </g>

      <g data-hatch stroke="currentColor" strokeWidth="1.6" opacity="0.3">
        {Array.from({ length: 52 }, (_, i) => (
          <path key={i} d={`M${i * 40} ${GROUND + 38} l38 -38`} />
        ))}
      </g>

      <g data-building fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round">
        {building.map((d, i) => (
          <path key={i} d={d} pathLength={1} data-line />
        ))}
      </g>

      <g data-dims fill="none" stroke="currentColor" strokeWidth="2" fontFamily="var(--font-mono)" fontSize="30">
        <path d="M604 215 H1879 M604 193 V237 M1879 193 V237 M590 229 l28 -28 M1865 229 l28 -28" pathLength={1} data-line />
        <rect x="1100" y="193" width="280" height="44" fill="var(--paper)" stroke="none" data-dim-bg />
        <text x="1240" y="225" textAnchor="middle" fill="currentColor" stroke="none">
          Лейк хаус
        </text>

        <path d={`M160 ${GROUND} V259 M136 ${GROUND} H184 M136 553 H184 M136 259 H184`} pathLength={1} data-line />
        <g fill="currentColor" stroke="none" textAnchor="start">
          <path d={`M160 ${GROUND} l16 -22 h-32 Z`} />
          <text x="196" y={GROUND - 10}>терен</text>
          <path d="M160 553 l16 -22 h-32 Z" />
          <text x="196" y="543">етаж</text>
          <path d="M160 259 l16 -22 h-32 Z" />
          <text x="196" y="249">покрив</text>
        </g>
      </g>
    </svg>
  );
}
