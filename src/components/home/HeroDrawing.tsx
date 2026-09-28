// Линейна фасада на „Лейк хаус“, начертана в координатите на снимката
// /img/misc/hero-lake-house.webp (1648 × 940, изрязана така, че къщата да е в центъра).
// SVG-то и снимката се мащабират по един и същи начин (slice / cover, центрирани),
// затова линиите легнат точно върху сградата.

const building = [
  // десен горен обем
  "M977 304 L1428 199 L1479 373",
  "M977 304 L977 493",
  "M977 335 L1423 237",
  "M1044 373 L1353 316 L1353 484 L1044 493 Z",
  "M1197 345 L1197 486",
  // среден обем
  "M737 408 L993 360",
  "M757 447 L982 427 L982 539 L757 548 Z",
  // ляв горен обем
  "M373 408 L588 358 L742 408",
  "M388 411 L388 544",
  "M588 358 L588 555",
  "M491 447 L706 466 L706 555 L491 548",
  // стъклен парапет
  "M220 493 L388 478",
  "M204 541 L220 493",
  // плоча между етажите
  "M204 541 L737 558 L977 531 L1484 493",
  "M204 570 L737 582 L982 555 L1484 521",
  // партер
  "M225 591 L225 722",
  "M245 582 L378 582 L378 722",
  "M813 591 L972 591 L972 715",
  "M1197 570 L1341 570 L1341 713",
  "M204 722 L1382 715",
  // стълби
  "M440 729 L588 729 M409 749 L588 749 M378 770 L588 770 M348 790 L588 790",
  "M1238 739 L1648 739 M1233 765 L1648 765 M1228 795 L1648 795 M1223 826 L1648 826",
];

const axes = [
  { x: 204, label: "А" },
  { x: 588, label: "Б" },
  { x: 977, label: "В" },
  { x: 1479, label: "Г" },
];

const GROUND = 806;

export function HeroDrawing() {
  return (
    <svg viewBox="0 0 1648 940" preserveAspectRatio="xMidYMid slice" aria-hidden="true" data-drawing>
      <g data-axes fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="14 10" opacity="0.45">
        {axes.map((a) => (
          <path key={a.x} d={`M${a.x} 92 V${GROUND + 28}`} data-axis />
        ))}
      </g>
      <path d={`M0 ${GROUND} H1648`} fill="none" stroke="currentColor" strokeWidth="2.4" pathLength={1} data-line data-ground />
      <g data-axes-labels fontFamily="var(--font-mono)" fontSize="20" fill="currentColor" textAnchor="middle">
        {axes.map((a) => (
          <g key={a.x}>
            <circle cx={a.x} cy={70} r={20} fill="none" stroke="currentColor" strokeWidth="1.6" />
            <text x={a.x} y={77}>
              {a.label}
            </text>
          </g>
        ))}
      </g>

      <g data-hatch stroke="currentColor" strokeWidth="1.2" opacity="0.3">
        {Array.from({ length: 53 }, (_, i) => (
          <path key={i} d={`M${i * 32} ${GROUND + 30} l30 -30`} />
        ))}
      </g>

      <g data-building fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        {building.map((d, i) => (
          <path key={i} d={d} pathLength={1} data-line />
        ))}
      </g>

      <g data-dims fill="none" stroke="currentColor" strokeWidth="1.6" fontFamily="var(--font-mono)" fontSize="22">
        <path d="M204 140 H1479 M204 122 V158 M1479 122 V158 M193 151 l22 -22 M1468 151 l22 -22" pathLength={1} data-line />
        <rect x="736" y="122" width="210" height="36" fill="var(--paper)" stroke="none" data-dim-bg />
        <text x="841" y="148" textAnchor="middle" fill="currentColor" stroke="none">
          Лейк хаус
        </text>

        <path d={`M1540 ${GROUND} V199 M1522 ${GROUND} H1558 M1522 493 H1558 M1522 199 H1558`} pathLength={1} data-line />
        <g fill="currentColor" stroke="none" textAnchor="start">
          <path d={`M1540 ${GROUND} l12 -16 h-24 Z`} />
          <text x="1562" y={GROUND - 6}>терен</text>
          <path d="M1540 493 l12 -16 h-24 Z" />
          <text x="1562" y="487">етаж</text>
          <path d="M1540 199 l12 -16 h-24 Z" />
          <text x="1562" y="226">покрив</text>
        </g>
      </g>
    </svg>
  );
}
