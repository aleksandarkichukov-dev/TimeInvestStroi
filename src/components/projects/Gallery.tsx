"use client";

import Image from "next/image";
import { useState } from "react";
import { img } from "@/lib/img";
import { projectPlace } from "@/content/projects";
import { Expand } from "@/components/icons";
import { Lightbox } from "./Lightbox";
import s from "./Gallery.module.css";

// Снимките на проекта (от началото на строежа до завършения обект) с лайтбокс.
export function Gallery({ title, images }: { title: string; images: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const items = images.map((src, i) => ({ src, label: title, alt: `${title} – ${projectPlace}, снимка ${i + 1}` }));

  return (
    <>
      <div className={s.masonry}>
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            className={s.thumb}
            onClick={() => setOpen(i)}
            data-cursor="Виж"
            data-fade
            aria-label={`Отвори снимка ${i + 1} от ${items.length}`}
          >
            <Image
              src={img(item.src)}
              alt={item.alt}
              sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 100vw"
              placeholder="blur"
              className={s.img}
            />
            <span className={s.expand} aria-hidden="true">
              <Expand width={18} height={18} />
            </span>
          </button>
        ))}
      </div>
      {open !== null && <Lightbox images={items} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
