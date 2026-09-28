"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { img } from "@/lib/img";
import { lockScroll } from "@/lib/motion";
import { ArrowLeft, ArrowRight, Close } from "@/components/icons";
import s from "./Lightbox.module.css";

export type LightboxImage = { src: string; alt: string; label: string };

export function Lightbox({
  images,
  index,
  onChange,
  onClose,
}: {
  images: LightboxImage[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const total = images.length;
  const go = useCallback((d: number) => onChange((index + d + total) % total), [index, total, onChange]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    lockScroll(true);
    closeBtn.current?.focus();
    return () => {
      lockScroll(false);
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialog.current) {
        // задържаме фокуса в диалога
        const f = dialog.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const current = images[index];
  const neighbours = [images[(index + 1) % total], images[(index - 1 + total) % total]];

  return (
    <div
      ref={dialog}
      className={s.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={`Галерия: снимка ${index + 1} от ${total}`}
      onPointerDown={(e) => (start.current = { x: e.clientX, y: e.clientY })}
      onPointerUp={(e) => {
        if (!start.current) return;
        const dx = e.clientX - start.current.x;
        const dy = e.clientY - start.current.y;
        start.current = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className={s.top}>
        <span className="mono">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {current.label}
        </span>
        <button ref={closeBtn} type="button" className={s.iconBtn} onClick={onClose} aria-label="Затвори галерията">
          <Close width={22} height={22} />
        </button>
      </div>

      <figure className={s.stage}>
        <Image
          key={current.src}
          src={img(current.src)}
          alt={current.alt}
          fill
          sizes="100vw"
          quality={85}
          className={s.image}
          placeholder="blur"
          draggable={false}
        />
      </figure>

      {/* предварително зареждане на съседните снимки */}
      <div hidden>
        {neighbours.map((n) => (
          <Image key={n.src} src={img(n.src)} alt="" sizes="100vw" quality={85} loading="eager" />
        ))}
      </div>

      <div className={s.nav}>
        <button type="button" className={s.iconBtn} onClick={() => go(-1)} aria-label="Предишна снимка">
          <ArrowLeft width={22} height={22} />
        </button>
        <div className={s.progress} aria-hidden="true">
          <span style={{ transform: `scaleX(${(index + 1) / total})` }} />
        </div>
        <button type="button" className={s.iconBtn} onClick={() => go(1)} aria-label="Следваща снимка">
          <ArrowRight width={22} height={22} />
        </button>
      </div>
    </div>
  );
}
