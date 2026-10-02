// Линеен чертеж на завършения „Лейк хаус“, начертан в координатите на снимката
// /img/misc/hero-lake-house.webp (2048 × 1440). SVG-то и снимката са в един и същ блок (.canvas),
// затова линиите лягат точно върху сградата при всеки размер на екрана.

const building = [
  // покриви (силует)
  "M1377 365 L1822 256 L1880 437",
  "M772 474 L992 417 L1135 470",
  "M1135 467 L1395 415",
  "M600 612 V640 L985 628 L1392 638",
  "M607 782 H1660",
  "M625 645 V782",
  "M1395 385 V565",
  "M1805 292 V520 M1825 296 V520",
  // челни ивици на покривите
  "M1377 385 L1805 292",
  "M1377 365 V385 M1822 256 V292",
  "M1825 296 L1872 440",
  "M777 494 L992 444 L1135 492",
  "M772 474 V494 M1135 470 V492",
  "M1150 485 L1395 440",
  // горен ляв обем
  "M992 444 V615",
  "M777 494 V567",
  "M905 502 L960 492 V590 L905 594 Z",
  "M1003 494 L1105 515 V628 L1003 614 Z M1054 505 V621",
  // тераса със стъклен парапет
  "M625 550 L787 512 M625 550 V605 M706 531 V588 M787 512 V570",
  "M600 612 L815 567",
  "M985 600 L1100 612 L1392 610",
  // горен среден обем
  "M1155 520 H1265 V610 H1155 Z M1205 520 V610",
  "M1302 488 H1395 V602 H1302 Z M1350 488 V602",
  // горен десен обем
  "M1427 432 L1755 372 V540 L1430 562 Z M1580 405 V550",
  "M1377 572 L1780 530",
  "M1380 590 L1760 580",
  // партер
  "M640 650 H767 V782 H640 Z",
  "M767 645 V782 M840 645 V782",
  "M910 652 H1050 V780 M980 652 V780",
  "M1220 652 H1372 V770 H1220 M1302 652 V770",
  "M1392 590 V772 M1420 590 V772",
  "M1600 625 H1725 V772 M1662 625 V772",
  // пергола
  "M1782 527 L2048 510",
  "M1760 570 V772 M1795 570 V772",
  // басейн
  "M995 800 H1660 M995 860 H1600",
  // стълби
  "M830 787 H990 M810 802 H990 M795 815 H990 M775 827 H990 M755 840 H990 M735 852 H990",
  "M1665 785 H2048 M1655 800 H2048 M1645 820 H2048 M1635 840 H2048 M1625 857 H2048 M1617 875 H2048 M1610 895 H2048 M1602 912 H2048",
];

const axes = [
  { x: 625, label: "А" },
  { x: 992, label: "Б" },
  { x: 1395, label: "В" },
  { x: 1822, label: "Г" },
];

const levels = [
  { y: 880, label: "терен" },
  { y: 612, label: "етаж" },
  { y: 474, label: "покрив" },
];

export function HeroDrawing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 2048 1440" preserveAspectRatio="none" className={className} aria-hidden="true" data-drawing>
      <g data-axes fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="14 10" opacity="0.45">
        {axes.map((a) => (
          <path key={a.x} d={`M${a.x} 244 V900`} data-axis />
        ))}
      </g>
      <path d="M0 880 H2048" fill="none" stroke="currentColor" strokeWidth="2.4" pathLength={1} data-line data-ground />
      <g data-axes-labels fontFamily="var(--font-mono)" fontSize="22" fill="currentColor" textAnchor="middle">
        {axes.map((a) => (
          <g key={a.x}>
            <circle cx={a.x} cy={222} r={22} fill="none" stroke="currentColor" strokeWidth="1.6" />
            <text x={a.x} y={230}>
              {a.label}
            </text>
          </g>
        ))}
      </g>

      <g data-hatch stroke="currentColor" strokeWidth="1.2" opacity="0.3">
        {Array.from({ length: 64 }, (_, i) => (
          <path key={i} d={`M${i * 32} 910 l30 -30`} />
        ))}
      </g>

      <g data-building fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
        {building.map((d, i) => (
          <path key={i} d={d} pathLength={1} data-line />
        ))}
      </g>

      <g data-dims fill="none" stroke="currentColor" strokeWidth="1.6" fontFamily="var(--font-mono)" fontSize="24">
        <path
          d="M625 330 H1395 M625 310 V350 M992 310 V350 M1395 310 V350 M613 342 l24 -24 M980 342 l24 -24 M1383 342 l24 -24"
          pathLength={1}
          data-line
        />
        <rect x="698" y="310" width="220" height="40" fill="var(--paper)" stroke="none" data-dim-bg />
        <text x="808" y="338" textAnchor="middle" fill="currentColor" stroke="none">
          Лейк хаус
        </text>

        <path d="M500 880 V474 M480 880 H520 M480 612 H520 M480 474 H520" pathLength={1} data-line data-levels />
        <g fill="currentColor" stroke="none" textAnchor="end" data-levels>
          {levels.map((l) => (
            <g key={l.label}>
              <path d={`M500 ${l.y} l14 -18 h-28 Z`} />
              <text x="472" y={l.y - 4}>
                {l.label}
              </text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
