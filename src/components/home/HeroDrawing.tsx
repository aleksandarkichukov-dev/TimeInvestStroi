// Линейна фасада на „Лейк хаус“, начертана в координатите на снимката
// /img/projects/lake-house/029.webp (2048 × 1536). SVG-то и снимката се мащабират по един и същи
// начин (slice / cover, центрирани), затова линиите легнат точно върху сградата.

const building = [
  // горен ляв обем
  "M378 423 H772 L820 530",
  "M382 455 H760",
  "M400 455 V533",
  "M450 500 H715 V533 M450 500 V533 M585 500 V533",
  "M760 457 V600",
  // конзолна плоча над партера
  "M82 532 H680 L815 680",
  "M82 532 V582 H672 L800 712",
  // ляв партерен обем
  "M140 582 V942 H665 V582",
  "M218 621 H600 V838 H218 Z",
  "M410 621 V838",
  // среден обем
  "M805 530 H1105 M805 555 H1105",
  "M815 675 H1105 M815 700 H1105",
  "M830 585 H950 V675 M975 585 H1085 V675 M905 585 V675 M1045 585 V675",
  "M810 530 V822",
  "M890 715 H1065 V822 M978 715 V822",
  // десен обем
  "M1105 487 H1412 L1410 510 H1110 Z",
  "M1115 510 V655 M1405 510 V655",
  "M1158 555 H1370 V655 H1158 Z M1262 555 V655",
  "M1100 655 H1415 V700 H1100 Z",
  "M1110 700 V822 M1132 700 V822 M1335 700 V822 M1368 700 V822",
  "M1150 715 H1280 V822 M1215 715 V822",
  "M1370 705 H1460 V822",
  // тераса и стълби
  "M600 822 H1570",
  "M650 842 H925 M635 862 H925 M620 882 H925 M605 902 H925 M598 922 H925",
  "M930 822 V940 M930 880 H1640",
  "M1570 822 H1800 M1600 842 H1850 M1630 862 H1890 M1650 882 H1920 M1670 902 H1950 M1690 922 H1965",
];

const axes = [
  { x: 140, label: "А" },
  { x: 665, label: "Б" },
  { x: 1105, label: "В" },
  { x: 1412, label: "Г" },
];

export function HeroDrawing() {
  return (
    <svg viewBox="0 0 2048 1536" preserveAspectRatio="xMidYMid slice" aria-hidden="true" data-drawing>
      <g data-axes fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="14 10" opacity="0.45">
        {axes.map((a) => (
          <path key={a.x} d={`M${a.x} 312 V1010`} data-axis />
        ))}
      </g>
      <path d="M0 942 H2048" fill="none" stroke="currentColor" strokeWidth="2.4" pathLength={1} data-line data-ground />
      <g data-axes-labels fontFamily="var(--font-mono)" fontSize="22" fill="currentColor" textAnchor="middle">
        {axes.map((a) => (
          <g key={a.x}>
            <circle cx={a.x} cy={290} r={22} fill="none" stroke="currentColor" strokeWidth="1.6" />
            <text x={a.x} y={298}>
              {a.label}
            </text>
          </g>
        ))}
      </g>

      <g data-hatch stroke="currentColor" strokeWidth="1.2" opacity="0.3">
        {Array.from({ length: 64 }, (_, i) => (
          <path key={i} d={`M${i * 32} 972 l30 -30`} />
        ))}
      </g>

      <g data-building fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
        {building.map((d, i) => (
          <path key={i} d={d} pathLength={1} data-line />
        ))}
      </g>

      <g data-dims fill="none" stroke="currentColor" strokeWidth="1.6" fontFamily="var(--font-mono)" fontSize="24">
        <path d="M82 372 H1415 M82 352 V392 M1415 352 V392 M70 384 l24 -24 M1403 384 l24 -24" pathLength={1} data-line />
        <rect x="650" y="352" width="220" height="40" fill="var(--paper)" stroke="none" data-dim-bg />
        <text x="760" y="380" textAnchor="middle" fill="currentColor" stroke="none">
          Лейк хаус
        </text>

        <path d="M1520 942 V423 M1500 942 H1540 M1500 700 H1540 M1500 487 H1540 M1500 423 H1540" pathLength={1} data-line />
        <g fill="currentColor" stroke="none" textAnchor="start">
          <path d="M1548 942 l14 -18 h-28 Z" />
          <text x="1572" y="948">терен</text>
          <path d="M1548 700 l14 -18 h-28 Z" />
          <text x="1572" y="706">етаж</text>
          <path d="M1548 487 l14 -18 h-28 Z" />
          <text x="1572" y="493">покрив</text>
        </g>
      </g>
    </svg>
  );
}
