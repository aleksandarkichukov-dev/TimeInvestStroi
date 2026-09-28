"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Споделена инстанция на Lenis (плавен скрол), за да може менюто и лайтбоксът да го спират.
export const smooth: { lenis: Lenis | null } = { lenis: null };

export function lockScroll(lock: boolean) {
  if (lock) {
    smooth.lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    smooth.lenis?.start();
    document.documentElement.style.overflow = "";
  }
}
