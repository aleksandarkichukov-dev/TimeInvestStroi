"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { img } from "@/lib/img";
import { getService } from "@/content/services";
import { ArrowRight } from "@/components/icons";
import s from "./Stages.module.css";

type Stage = {
  n: string;
  title: string;
  text: string;
  image?: string;
  services: string[];
};

// Текстовете са от описанията на услугите в сегашния сайт.
const stages: Stage[] = [
  {
    n: "01",
    title: "Проектиране",
    text: "Изготвянето на технически проект отнема средно около 35 дни, като срокът варира в зависимост от особеностите на къщата. След като цялата документация е финализирана, проектът се изпраща за одобрение в общината, която след това издава разрешението за строеж и същинската работа започва.",
    services: ["proektirane-i-arhitektura", "interioren-dizain"],
  },
  {
    n: "02",
    title: "Изкоп",
    text: "Изкопните работи са процесът на изкопаване, премахване и преработка на земни маси, камъни и други материали от строителната площадка. Ние извършваме всякакъв тип изкопни работи.",
    image: "/img/projects/kooperacia-napetov/018.webp",
    services: ["izkopni-raboti", "kartene-i-izvozvane"],
  },
  {
    n: "03",
    title: "Груб строеж",
    text: "Това е етапът, когато сградата придобива своята форма и размери, но още не е завършена и не се извършват детайлни работи по декорация и обзавеждане.",
    image: "/img/projects/kashta-alen-mak/000.webp",
    services: ["grub-stroezh", "zidaria-i-zamazka", "sglobyaemi-kashti"],
  },
  {
    n: "04",
    title: "Инсталации",
    text: "Ние можем да изградим електрически системи от нулата или да модернизираме вече съществуващи, за да отговарят на всички изисквания за безопасност и ефективност.",
    image: "/img/projects/lake-house/050.webp",
    services: ["el-i-vik-instalacia", "ovk", "sot-videonablyudenie-domofoni"],
  },
  {
    n: "05",
    title: "Довършителни",
    text: "Внесете завършеност и издръжливост във вашия дом с нашите услуги за мазилки, предлагащи широка гама от текстури, цветове и дълготрайни решения за вътрешни и външни повърхности.",
    image: "/img/projects/lake-house/046.webp",
    services: [
      "toplo-i-hidroizolacia",
      "shpaklovka-boyadisvane-mazilki",
      "suho-stroitelstvo",
      "oblicovki-i-nastilki",
      "dograma",
      "darvodelski-uslugi",
    ],
  },
  {
    n: "06",
    title: "Екстериор",
    text: "Озеленяването е важна част от образа на едно място и ние сме на разположение, за да ви помогнем да направите вашето място зелено и живописно.",
    image: "/img/projects/lake-house/005.webp",
    services: ["ozelenyavane-polivni-sistemi", "garazhni-vrati-portali-ogradi"],
  },
];

function PlanDrawing() {
  // Схематичен план на етаж: визуализация за етап „Проектиране“.
  return (
    <svg
      viewBox="0 0 400 300"
      className={s.plan}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
    >
      <g strokeWidth="5">
        <path d="M40 40 H360 V260 H40 Z" />
        <path d="M200 40 V150 M200 190 V260 M40 150 H150 M250 150 H360" />
      </g>
      <g strokeWidth="1.2">
        <path d="M150 150 a40 40 0 0 1 40 -40 M250 150 a40 40 0 0 0 -40 -40" />
        <path d="M90 40 v-6 h60 v6 M260 260 v6 h60 v-6" />
        <path d="M20 40 V260 M14 40 H26 M14 260 H26 M40 285 H360 M40 279 V291 M360 279 V291" />
      </g>
      <g
        fill="currentColor"
        stroke="none"
        fontFamily="var(--font-mono)"
        fontSize="10"
      >
        <text x="110" y="100" textAnchor="middle">
          ДНЕВНА
        </text>
        <text x="290" y="100" textAnchor="middle">
          КУХНЯ
        </text>
        <text x="110" y="210" textAnchor="middle">
          СПАЛНЯ
        </text>
        <text x="290" y="210" textAnchor="middle">
          БАНЯ
        </text>
      </g>
    </svg>
  );
}

export function Stages() {
  const root = useRef<HTMLElement>(null);
  const panels = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Телефон: етапите са карти, които се плъзгат с пръст (CSS scroll-snap); точките показват текущата.
  const onPanelsScroll = () => {
    const el = panels.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card
      ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0")
      : el.clientWidth;
    const i = Math.round(el.scrollLeft / step);
    if (i !== active) setActive(Math.min(stages.length - 1, Math.max(0, i)));
  };

  const goTo = (i: number) => {
    const el = panels.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card)
      el.scrollTo({
        left: card.offsetLeft - el.offsetLeft,
        behavior: "smooth",
      });
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = root.current!;
      const track = el.querySelector<HTMLElement>("[data-track]")!;
      const fill = el.querySelector<HTMLElement>("[data-fill]")!;
      const marks = gsap.utils.toArray<HTMLElement>("[data-mark]", el);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        // Първите 12% от скрола задържат началната позиция, за да се прочете заглавието.
        const HOLD = 0.12;
        const distance = () => track.scrollWidth - window.innerWidth;
        const setHeight = () =>
          (el.style.height = `${distance() * (1 + HOLD) + window.innerHeight}px`);
        setHeight();
        const tween = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefreshInit: setHeight,
            onUpdate: (self) => {
              fill.style.transform = `scaleX(${self.progress})`;
              const active = Math.min(
                marks.length - 1,
                Math.floor(self.progress * marks.length * 0.999),
              );
              marks.forEach((m, i) =>
                m.toggleAttribute("data-active", i <= active),
              );
            },
          },
        });
        tween
          .to({}, { duration: HOLD })
          .to(track, { x: () => -distance(), ease: "none", duration: 1 });

        // Снимките в панелите: лек паралакс спрямо хоризонталното движение.
        gsap.utils
          .toArray<HTMLElement>("[data-panel-img]", el)
          .forEach((image) => {
            gsap.fromTo(
              image,
              { xPercent: -8 },
              {
                xPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: image.parentElement,
                  containerAnimation: tween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          });
        ScrollTrigger.refresh();
        return () => {
          el.style.height = "";
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className={`dark ${s.section}`}
      aria-labelledby="stages-title"
    >
      <div className={s.sticky}>
        <div className={s.track} data-track>
          <header className={s.intro}>
            <p className="eyebrow">
              <b>02</b> Етапи
            </p>
            <h2 id="stages-title" className={s.title} data-split>
              Етапите на строежа
            </h2>
            <Link
              href="/uslugi"
              className={`btn btn-ghost ${s.introBtn}`}
              transitionTypes={["curtain"]}
            >
              Всички услуги <ArrowRight className="btn-arrow" />
            </Link>
          </header>

          <div ref={panels} className={s.panels} onScroll={onPanelsScroll}>
            {stages.map((st) => (
              <article key={st.n} className={s.panel}>
                <div className={s.media}>
                  {st.image ? (
                    <div className={s.imgBox} data-panel-img>
                      <Image
                        src={img(st.image)}
                        alt={st.title}
                        fill
                        sizes="(min-width: 900px) 40vw, 100vw"
                        className={s.img}
                      />
                    </div>
                  ) : (
                    <div className={`${s.blueprint} grid-paper`}>
                      <PlanDrawing />
                    </div>
                  )}
                  <span className={s.num}>{st.n}</span>
                </div>
                <div className={s.text}>
                  <h3 className={s.panelTitle}>{st.title}</h3>
                  <p className="muted">{st.text}</p>
                  <ul className={s.links}>
                    {st.services.map((slug) => {
                      const svc = getService(slug);
                      return svc ? (
                        <li key={slug}>
                          <Link
                            href={`/uslugi/${slug}`}
                            transitionTypes={["curtain"]}
                          >
                            {svc.title}
                            <ArrowRight width={14} height={14} />
                          </Link>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={s.dots} role="group" aria-label="Етапи">
          {stages.map((st, i) => (
            <button
              key={st.n}
              type="button"
              className={s.dot}
              aria-label={`${st.n} ${st.title}`}
              aria-current={i === active ? "step" : undefined}
              onClick={() => goTo(i)}
            >
              <span className="mono">{st.n}</span>
            </button>
          ))}
        </div>

        {/* Прогрес като строително скеле */}
        <div className={s.scaffold} aria-hidden="true">
          <div className={s.scaffoldTrack}>
            <div className={s.scaffoldFill} data-fill />
          </div>
          <ol className={s.marks}>
            {stages.map((st) => (
              <li key={st.n} data-mark>
                <span className="mono">{st.n}</span> {st.title}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
