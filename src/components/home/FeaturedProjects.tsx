import Link from "next/link";
import { featured, getProject } from "@/content/projects";
import { site } from "@/content/site";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHead } from "@/components/ui";
import { ArrowRight } from "@/components/icons";
import s from "./FeaturedProjects.module.css";

export function FeaturedProjects() {
  const list = featured.map(getProject).filter((p) => p !== undefined);
  return (
    <section className="section concrete" aria-labelledby="featured-title">
      <div className="container">
        <SectionHead
          index="04"
          label="Галерия"
          title={<span id="featured-title">Проекти</span>}
          lead={site.projectsLead}
          action={
            <Link href="/proekti" className="btn" transitionTypes={["curtain"]}>
              Всички проекти <ArrowRight className="btn-arrow" />
            </Link>
          }
        />
        <div className={s.grid}>
          {list.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} aspect="4 / 3" sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      </div>
    </section>
  );
}
