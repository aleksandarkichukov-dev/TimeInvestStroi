"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion, smooth } from "@/lib/motion";

// Плавен скрол (Lenis) + общите анимации, задавани с data-атрибути в сървърните компоненти:
//   data-split     – заглавие, което влиза ред по ред
//   data-reveal    – снимка с маска, която се отваря отдолу нагоре („издигане на стена“)
//   data-parallax  – лек паралакс (стойност = сила)
//   data-fade      – плавно появяване отдолу
//   data-dim       – кóта, която се „изчертава“
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -80 } });
    smooth.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      smooth.lenis = null;
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) smooth.lenis?.scrollTo(0, { immediate: true, force: true });

    const root = document.getElementById("main");
    if (!root) return;
    const reduce = prefersReducedMotion();
    const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T & HTMLElement>(sel));

    if (reduce) {
      q("[data-split]").forEach((el) => el.classList.add("is-ready"));
      return;
    }

    const ctx = gsap.context(() => {
      q("[data-split]").forEach((el) => {
        const delay = Number(el.dataset.delay ?? 0);
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "sl",
          autoSplit: true,
          onSplit(self) {
            el.classList.add("is-ready");
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.15,
              delay,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });
          },
        });
      });

      q("[data-reveal]").forEach((el) => {
        const media = el.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        tl.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out" },
        );
        if (media) tl.fromTo(media, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);
      });

      q("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax || 0.12) * 100;
        gsap.fromTo(
          el,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Анимираме само елементите под видимата част; тези в първия екран вече са видими
      // (или се анимират с CSS), за да не забавяме LCP.
      const fold = window.innerHeight;
      const firstSection = root.querySelector(":scope > div > :first-child");
      const fades = q("[data-fade]").filter(
        (el) => el.getBoundingClientRect().top > fold && !(firstSection && firstSection.contains(el)),
      );
      if (fades.length) {
        gsap.set(fades, { y: 40, autoAlpha: 0 });
        ScrollTrigger.batch(fades, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }),
        });
      }

      q("[data-dim]").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    }, root);

    ScrollTrigger.sort();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(id);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
