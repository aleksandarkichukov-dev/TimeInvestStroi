import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { categories, coverOf, type Project } from "@/content/projects";
import { img } from "@/lib/img";
import { ArrowUpRight } from "@/components/icons";
import s from "./ProjectCard.module.css";

export function ProjectCard({
  project,
  index,
  sizes = "(min-width: 900px) 50vw, 100vw",
  aspect = "4 / 3",
  fade = true,
}: {
  project: Project;
  index?: number;
  sizes?: string;
  aspect?: string;
  fade?: boolean;
}) {
  const category = categories.find((c) => c.id === project.category)?.label;
  return (
    <article className={s.card} data-fade={fade ? "" : undefined} data-category={project.category}>
      <Link href={`/proekti/${project.slug}`} className={s.link} data-cursor="Виж" transitionTypes={["morph"]}>
        <div className={s.media} style={{ aspectRatio: aspect }}>
          <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
            <div className={s.imgWrap}>
              <Image src={img(coverOf(project))} alt="" fill sizes={sizes} placeholder="blur" className={s.img} />
            </div>
          </ViewTransition>
          <div className={s.overlay} aria-hidden="true">
            <span className={s.meta}>Разгледай снимките</span>
          </div>
        </div>
        <div className={s.body}>
          <div>
            <p className="mono muted">
              {index !== undefined && <span>{String(index + 1).padStart(2, "0")} · </span>}
              {category} · {project.images.length} снимки
            </p>
            <h3 className={s.title}>{project.title}</h3>
          </div>
          <ArrowUpRight className={s.arrow} width={28} height={28} />
        </div>
      </Link>
    </article>
  );
}
