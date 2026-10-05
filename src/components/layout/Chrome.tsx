"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { site } from "@/content/site";
import { LogoMark } from "@/components/Logo";
import { Phone } from "@/components/icons";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import s from "./Chrome.module.css";

// Завесата е извън екрана и участва само във View Transition с тип „curtain“
// (виж globals.css → vt-curtain). Така при смяна на страницата минава бетонен панел с логото.
export function Curtain() {
  return (
    <div className={s.curtain} style={{ viewTransitionName: "curtain" }} aria-hidden="true">
      <div className={s.curtainInner}>
        <LogoMark size={64} />
        <span className={s.curtainName}>Timeinvest Stroy</span>
      </div>
      <span className={s.curtainStripe} />
    </div>
  );
}

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty("--p", String(max > 0 ? window.scrollY / max : 0));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return <div ref={bar} className={s.progress} aria-hidden="true" />;
}

// Кръгъл курсор (само на компютър с мишка).
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || prefersReducedMotion()) return;
    document.documentElement.classList.add("has-cursor");
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      el.dataset.visible = "";
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor], a, button, [role=button], input, label, select, textarea");
      const text = target?.dataset.cursor;
      if (text) {
        el.dataset.state = "label";
        if (label.current) label.current.textContent = text;
      } else if (target) {
        el.dataset.state = "link";
      } else {
        delete el.dataset.state;
      }
    };
    const onLeave = () => delete el.dataset.visible;
    const onDown = () => (el.dataset.down = "");
    const onUp = () => delete el.dataset.down;

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={ring} className={s.cursor} aria-hidden="true">
      <span ref={label} className={s.cursorLabel} />
    </div>
  );
}

export function CallButton() {
  return (
    <a href={site.phoneHref} className={s.call} aria-label={`Обади се: ${site.phone}`}>
      <Phone width={24} height={24} />
    </a>
  );
}

// Старият сайт използваше котви /#contacts и /#about-us. Те не стигат до сървъра,
// затова ги пренасочваме тук.
export function LegacyHashRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/") return;
    const map: Record<string, string> = { "#contacts": "/kontakti", "#about-us": "/za-nas" };
    const target = map[window.location.hash];
    if (target) router.replace(target);
  }, [pathname, router]);
  return null;
}
