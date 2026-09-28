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
            <div key={p.slug} className={s[`item${i}`]}>
              <ProjectCard
                project={p}
                index={i}
                aspect={i === 0 ? "16 / 10" : i === 1 || i === 2 ? "4 / 5" : "4 / 3"}
                sizes={i === 0 ? "(min-width: 900px) 66vw, 100vw" : "(min-width: 900px) 33vw, 100vw"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
