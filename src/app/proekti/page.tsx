import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { categories, projects } from "@/content/projects";
import { site } from "@/content/site";
import s from "../inner.module.css";

export const metadata: Metadata = {
  title: "Проекти: строителство във Варна и региона",
  description: `Проекти на ${site.name} във Варна и региона: къщи, кооперации, склад. ${site.projectsLead}`,
  alternates: { canonical: "/proekti" },
};

export default function ProjectsPage() {
  const counts: Record<string, number> = { all: projects.length };
  categories.forEach((c) => (counts[c.id] = projects.filter((p) => p.category === c.id).length));

  return (
    <PageTransition>
      <JsonLd data={breadcrumbLd([{ name: "Проекти", path: "/proekti" }])} />
      <section className={`${s.pageHead} grid-paper`}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Проекти" }]} />
          <h1 className={`${s.title} h1-in`}>Проекти</h1>
          <div className={s.headRow}>
            <p className="lead" data-fade>
              {site.projectsLead}
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <h2 className="sr-only">Всички проекти</h2>
          <ProjectsGrid counts={counts}>
            {projects.map((p, i) => (
              <div key={p.slug}>
                <ProjectCard project={p} index={i} sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw" />
              </div>
            ))}
          </ProjectsGrid>
        </div>
      </section>

      <CtaBand />
    </PageTransition>
  );
}
