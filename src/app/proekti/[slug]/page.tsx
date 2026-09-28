import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Gallery } from "@/components/projects/Gallery";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { ArrowRight } from "@/components/icons";
import { site } from "@/content/site";
import { categories, coverOf, getProject, projectImage, projects } from "@/content/projects";
import { img } from "@/lib/img";
import s from "./project.module.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const cover = img(coverOf(p));
  return {
    title: p.title,
    description: `${p.title}: снимки от проекта на ${site.name}.`,
    alternates: { canonical: `/proekti/${p.slug}` },
    openGraph: { images: [{ url: cover.src, width: cover.width, height: cover.height, alt: p.title }] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const index = projects.indexOf(p);
  const next = projects[(index + 1) % projects.length];
  const category = categories.find((c) => c.id === p.category)!;
  const images = p.images.map((f) => projectImage(p.slug, f));

  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbLd([
          { name: "Проекти", path: "/proekti" },
          { name: p.title, path: `/proekti/${p.slug}` },
        ])}
      />

      <article>
        <header className={`${s.head} grid-paper`}>
          <div className="container">
            <Breadcrumbs items={[{ label: "Проекти", href: "/proekti" }, { label: p.title }]} />
            <p className={`mono ${s.kicker}`} data-fade>
              Проект {String(index + 1).padStart(2, "0")} · {category.label} · {images.length} снимки
            </p>
            <h1 className={`${s.title} h1-in`}>{p.title}</h1>
          </div>
        </header>

        <div className={`container ${s.heroWrap}`}>
          <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
            <div className={s.hero}>
              <Image
                src={img(coverOf(p))}
                alt={p.title}
                fill
                preload
                sizes="(min-width: 1520px) 1440px, 100vw"
                quality={75}
                placeholder="blur"
                className={s.heroImg}
              />
            </div>
          </ViewTransition>
        </div>

        <section className="section-tight" aria-labelledby="gallery-title">
          <div className="container">
            <h2 id="gallery-title" className={s.galleryTitle} data-split>
              Снимки
            </h2>
            <Gallery title={p.title} images={images} />
          </div>
        </section>

        {p.beforeAfter && (
          <section className="section-tight concrete" aria-label="Преди и след">
            <div className={`container ${s.ba}`}>
              <BeforeAfter
                before={projectImage(p.slug, p.beforeAfter.before)}
                after={projectImage(p.slug, p.beforeAfter.after)}
                alt={p.title}
              />
            </div>
          </section>
        )}
      </article>

      <section className={`section-tight ${s.next}`} aria-label="Следващ проект">
        <div className="container">
          <p className="eyebrow">
            <b>→</b> Следващ проект
          </p>
          <div className={s.nextGrid}>
            <ProjectCard project={next} aspect="16 / 9" sizes="(min-width: 900px) 60vw, 100vw" fade={false} />
            <Link href="/proekti" className={`btn btn-ghost ${s.allBtn}`} transitionTypes={["curtain"]}>
              Всички проекти <ArrowRight className="btn-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </PageTransition>
  );
}
