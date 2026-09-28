import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { coverOf, projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, images?: string[]): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
    images: images?.map((src) => `${site.url}${src}`),
  });

  return [
    page("", 1, ["/img/projects/lake-house/005.webp"]),
    page("/uslugi", 0.9),
    page("/proekti", 0.9),
    page("/za-nas", 0.7),
    page("/kontakti", 0.8),
    ...services.map((svc) => page(`/uslugi/${svc.slug}`, 0.8, svc.image ? [svc.image] : undefined)),
    ...projects.map((p) => page(`/proekti/${p.slug}`, 0.7, [coverOf(p)])),
    page("/politika-za-poveritelnost", 0.2),
  ];
}
