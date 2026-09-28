import type { StaticImageData } from "next/image";
import manifest from "@/content/images.json";

type Entry = { w: number; h: number; blur: string };
const images = manifest as Record<string, Entry>;

// Връща обект, който next/image приема като src: с размери и blur placeholder от манифеста.
export function img(src: string): StaticImageData {
  const entry = images[src];
  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[img] липсва в манифеста: ${src} (пуснете npm run images)`);
    }
    return { src, width: 1600, height: 1200 };
  }
  return { src, width: entry.w, height: entry.h, blurDataURL: entry.blur };
}

export const isPortrait = (src: string) => {
  const e = images[src];
  return e ? e.h > e.w : false;
};
