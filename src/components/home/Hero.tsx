"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { img } from "@/lib/img";
import { site } from "@/content/site";
import { ArrowDown, ArrowRight } from "@/components/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { HeroDrawing } from "./HeroDrawing";
import s from "./Hero.module.css";

const PHOTO = "/img/projects/lake-house/005.webp";
const PHASES = ["Чертеж", "Строеж", "Готово"];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const phase = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const lines = q<SVGPathElement>("[data-building] [data-line], [data-dims] [data-line]");
      const intro = lines.slice(0, 8);
      const rest = lines.slice(8);

      if (prefersReducedMotion()) {
        el.dataset.static = "";
        return;
      }

      gsap.set([...lines, ...q("[data-ground]")], { strokeDasharray: 1, strokeDashoffset: 1 });

      // При зареждане: оси, земя и първите линии на сградата (заглавието се анимира с CSS).
      const load = gsap.timeline({ defaults: { ease: "expo.out" } });
      load
        .from(q("[data-axis]"), { scaleY: 0, transformOrigin: "50% 100%", duration: 1.4, stagger: 0.08, ease: "expo.inOut" }, 0.2)
        .from(q("[data-axes-labels] g"), { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.08 }, 0.9)
        .to(q("[data-ground]"), { strokeDashoffset: 0, duration: 1.6, ease: "expo.inOut" }, 0.3)
        .from(q("[data-hatch]"), { autoAlpha: 0, duration: 1 }, 1)
        .to(intro, { strokeDashoffset: 0, duration: 1.6, stagger: 0.07, ease: "power2.inOut" }, 0.8)
        .from(q("[data-stamp]"), { autoAlpha: 0, x: 20, duration: 1 }, 1.2);

      // При скрол: чертежът се дорисува, снимката „израства“ отдолу нагоре, линиите стават бели.
      const scroll = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => {
            const i = self.progress < 0.38 ? 0 : self.progress < 0.78 ? 1 : 2;
            if (phase.current && phase.current.textContent !== PHASES[i]) phase.current.textContent = PHASES[i];
          },
        },
      });
      scroll
        .to(rest, { strokeDashoffset: 0, stagger: 0.012, duration: 0.2 }, 0)
        .fromTo(q("[data-photo]"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45, ease: "power1.inOut" }, 0.38)
        .fromTo(q("[data-photo] img"), { scale: 1.12 }, { scale: 1, duration: 0.6 }, 0.38)
        .to(q("[data-drawing]"), { color: "#ffffff", duration: 0.2 }, 0.5)
        .to(q("[data-dim-bg]"), { autoAlpha: 0, duration: 0.1 }, 0.5)
        .to(q("[data-hatch], [data-axes]"), { autoAlpha: 0, duration: 0.2 }, 0.6)
        .to(q("[data-building]"), { autoAlpha: 0.25, duration: 0.25 }, 0.72)
        .fromTo(q("[data-caption]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.84)
        .to(q("[data-hint]"), { autoAlpha: 0, duration: 0.05 }, 0.02);
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.hero} aria-labelledby="hero-title">
      <div className={s.sticky}>
        <div className={`container ${s.intro}`}>
          <p className="eyebrow" data-hero-fade>
            <b>ТС</b> {site.name}
          </p>
          <div className={s.introRow}>
            <h1 id="hero-title" className={s.title}>
              <span className="line-in">
                <span>Оправдаваме</span>
              </span>
              <span className="line-in">
                <span>вашите очаквания.</span>
              </span>
            </h1>
            <div className={s.aside}>
              <p className={s.lead} data-hero-fade>
                {site.servicesLead}
              </p>
              <div className={s.buttons} data-hero-fade>
                <Magnetic>
                  <Link href="/kontakti#oferta" className="btn btn-accent" data-cursor="Оферта" transitionTypes={["curtain"]}>
                    Поискай оферта <ArrowRight className="btn-arrow" />
                  </Link>
                </Magnetic>
                <Link href="/proekti" className="btn btn-ghost" transitionTypes={["curtain"]}>
                  Проекти
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={`container ${s.stageWrap}`}>
          <div className={s.stage}>
            {/* Снимката се показва цялата (4:3), в средата на „чертожния лист“. */}
            <div className={s.frame}>
              <div className={s.photo} data-photo>
                <Image src={img(PHOTO)} alt="Лейк хаус" fill sizes="(min-width: 900px) 70vw, 100vw" quality={85} className={s.img} />
              </div>
              <div className={s.drawing}>
                <HeroDrawing />
              </div>
              <Link href="/proekti/lake-house" className={s.caption} data-caption data-cursor="Виж">
                <span className="mono">Проект</span>
                <span className={s.captionTitle}>
                  Лейк хаус <ArrowRight width={22} height={22} />
                </span>
              </Link>
            </div>
            <span className={`${s.tick} ${s.tl}`} />
            <span className={`${s.tick} ${s.tr}`} />
            <span className={`${s.tick} ${s.bl}`} />
            <span className={`${s.tick} ${s.br}`} />

            <dl className={s.stamp} data-stamp aria-hidden="true">
              <div>
                <dt>Обект</dt>
                <dd>Лейк хаус</dd>
              </div>
              <div>
                <dt>Фаза</dt>
                <dd>
                  <span ref={phase}>{PHASES[0]}</span>
                </dd>
              </div>
            </dl>

            <span className={`mono ${s.hint}`} data-hint>
              Скролирай <ArrowDown width={14} height={14} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
