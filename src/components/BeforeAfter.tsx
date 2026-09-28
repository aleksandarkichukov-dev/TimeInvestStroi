"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { img } from "@/lib/img";
import s from "./BeforeAfter.module.css";

export function BeforeAfter({
  before,
  after,
  beforeLabel = "Преди",
  afterLabel = "След",
  alt,
  aspect = "4 / 5",
  sizes = "(min-width: 900px) 50vw, 100vw",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
  aspect?: string;
  sizes?: string;
}) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <div className={s.wrap} style={{ aspectRatio: aspect, "--pos": `${pos}%` } as React.CSSProperties}>
      <Image src={img(after)} alt={`${alt}: ${afterLabel.toLowerCase()}`} fill sizes={sizes} className={s.img} placeholder="blur" />
      <div className={s.before}>
        <Image src={img(before)} alt={`${alt}: ${beforeLabel.toLowerCase()}`} fill sizes={sizes} className={s.img} placeholder="blur" />
      </div>
      <span className={`${s.tag} ${s.tagBefore}`}>{beforeLabel}</span>
      <span className={`${s.tag} ${s.tagAfter}`}>{afterLabel}</span>
      <div className={s.handle} aria-hidden="true">
        <span className={s.knob}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>
      <label htmlFor={id} className="sr-only">
        Сравнение преди и след
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className={s.range}
        data-cursor="Плъзни"
      />
    </div>
  );
}
