import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    // Малко размери = малко варианти за генериране; всички се генерират предварително след
    // обновяване (scripts/warm-images.mjs), за да не чака посетителят сървъра.
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Наклонената черта в края и старите адреси се обработват в src/proxy.ts
  // с едно 301 пренасочване, вместо верига 308 → 301.
  skipTrailingSlashRedirect: true,
  poweredByHeader: false,
  experimental: {
    // CSS-ът е малък (~20 KB), затова го вграждаме в HTML: без блокиращи заявки при първо зареждане.
    inlineCss: true,
  },
};

export default nextConfig;
