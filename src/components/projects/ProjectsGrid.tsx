"use client";

import { useRef, useState, type ReactNode } from "react";
import { Flip } from "gsap/Flip";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";

if (typeof window !== "undefined") gsap.registerPlugin(Flip);
import { categories, type ProjectCategory } from "@/content/projects";
import s from "./ProjectsGrid.module.css";

type Filter = ProjectCategory | "all";

// Филтър на проектите. Картите се подават като сървърни компоненти (children с data-category);
// при смяна на филтъра се скриват с CSS, а позициите се анимират с GSAP Flip.
export function ProjectsGrid({ counts, children }: { counts: Record<string, number>; children: ReactNode }) {
  const [filter, setFilter] = useState<Filter>("all");
  const grid = useRef<HTMLDivElement>(null);

  const apply = (next: Filter) => {
    const el = grid.current;
    if (!el || next === filter) return;
    const items = Array.from(el.children) as HTMLElement[];
    const state = prefersReducedMotion() ? null : Flip.getState(items);
    items.forEach((item) => {
      const cat = item.querySelector<HTMLElement>("[data-category]")?.dataset.category;
      item.hidden = next !== "all" && cat !== next;
    });
    setFilter(next);
    if (state) {
      Flip.from(state, {
        duration: 0.7,
        ease: "expo.inOut",
        absolute: true,
        stagger: 0.03,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.2 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.9, duration: 0.4 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    } else {
      ScrollTrigger.refresh();
    }
  };

  const tabs: { id: Filter; label: string }[] = [{ id: "all", label: "Всички" }, ...categories];

  return (
    <>
      <div className={s.filters} role="group" aria-label="Филтър по вид проект">
        {tabs.map((t) => (
          <button key={t.id} type="button" className={s.filter} aria-pressed={filter === t.id} onClick={() => apply(t.id)}>
            {t.label}
            <span className={s.count}>{counts[t.id] ?? 0}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Показани проекти: {filter === "all" ? counts.all : counts[filter]}
      </p>
      <div ref={grid} className={s.grid}>
        {children}
      </div>
    </>
  );
}
