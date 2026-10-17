import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { ArrowRight } from "@/components/icons";
import { coverOf, getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { stages } from "@/content/stages";
import { site } from "@/content/site";
import { img } from "@/lib/img";
import s from "./houses.module.css";

// Събира всички къщи от галерията и етапите на строежа: страница за търсения като „строителство на къщи Варна“.

const path = "/stroitelstvo-na-kashti-varna";
const title = "Строителство на къщи във Варна";
const lead =
  "Строим фамилни къщи във Варна и региона – от проекта и разрешението за строеж, през изкопа, грубия строеж и инсталациите, до довършителните работи и озеленяването на двора.";

const houses = projects.filter((p) => p.category === "kashti");
const heroProject = getProject("lake-house")!;

// Снимка за етапа „Проектиране“, който няма снимка от обект.
const stageImage = (image: string | undefined) => image ?? "/img/services/proektirane-chertezhi.webp";

export const metadata: Metadata = {
  title,
  description: `${site.name} – строителна фирма във Варна. ${lead}`,
  alternates: { canonical: path },
  openGraph: { images: [{ url: img(coverOf(heroProject)).src, alt: `${heroProject.title} – ${title}` }] },
};

export default function HousesPage() {
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Строителство на къщи",
    serviceType: "Строителство на фамилни къщи",
    description: lead,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: [
      { "@type": "City", name: "Варна" },
      { "@type": "AdministrativeArea", name: "Област Варна" },
    ],
    url: `${site.url}${path}`,
  };

  return (
    <PageTransition>
      <JsonLd data={serviceLd} />
      <JsonLd data={breadcrumbLd([{ name: title, path }])} />

      <header className={`${s.head} grid-paper`}>
        <div className={`container ${s.headGrid}`}>
          <div>
            <Breadcrumbs items={[{ label: "Строителство на къщи" }]} />
            <p className={`mono ${s.kicker}`} data-fade>
              {houses.length} къщи · Варна и региона
            </p>
            <h1 className={`${s.title} h1-in`}>{title}</h1>
            <p className={`lead ${s.intro}`} data-fade>
              {lead}
            </p>
            <div className={s.actions} data-fade>
              <Link href="/kontakti#oferta" className="btn btn-accent" transitionTypes={["curtain"]}>
                Поискай оферта <ArrowRight className="btn-arrow" />
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost">
                {site.phone}
              </a>
            </div>
          </div>
          <div className={s.visual}>
            <Image
              src={img(coverOf(heroProject))}
              alt={`${heroProject.title} – строителство на къщи във Варна и региона`}
              fill
              preload
              sizes="(min-width: 900px) 45vw, 100vw"
              placeholder="blur"
              className={s.visualImg}
            />
          </div>
        </div>
      </header>

      <section className="section-tight" aria-labelledby="houses-title">
        <div className="container">
          <p className="eyebrow" data-fade>
            <b>01</b> Нашите къщи
          </p>
          <h2 id="houses-title" className={s.sectionTitle} data-split>
            Къщи, които строим във Варна и региона
          </h2>
          <p className={`lead ${s.sectionLead}`} data-fade>
            {site.projectsLead}
          </p>
          <div className={s.grid}>
            {houses.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight concrete" aria-labelledby="stages-title">
        <div className="container">
          <p className="eyebrow" data-fade>
            <b>02</b> Етапи
          </p>
          <h2 id="stages-title" className={s.sectionTitle} data-split>
            От проекта до озеленяването
          </h2>
          <ol className={s.stages}>
            {stages.map((st) => (
              <li key={st.n} className={s.stage} data-fade>
                <div className={s.stageMedia}>
                  <Image
                    src={img(stageImage(st.image))}
                    alt={`${st.title} – строителство на къща във Варна`}
                    fill
                    sizes="(min-width: 900px) 30vw, 100vw"
                    placeholder="blur"
                    className={s.stageImg}
                  />
                </div>
                <div className={s.stageBody}>
                  <p className={`mono ${s.stageIndex}`}>{st.n}</p>
                  <h3 className={s.stageTitle}>{st.title}</h3>
                  <p className="muted">{st.text}</p>
                  <ul className={s.stageLinks}>
                    {st.services.map((slug) => {
                      const svc = getService(slug);
                      if (!svc) return null;
                      return (
                        <li key={slug}>
                          <Link href={`/uslugi/${slug}`} className={s.stageLink} transitionTypes={["curtain"]}>
                            {svc.title} <ArrowRight width={14} height={14} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <p className={s.more} data-fade>
            Строим и кооперации и складове.{" "}
            <Link href="/proekti" className="link-underline" transitionTypes={["curtain"]}>
              Всички проекти
            </Link>{" "}
            ·{" "}
            <Link href="/uslugi" className="link-underline" transitionTypes={["curtain"]}>
              Всички услуги
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </PageTransition>
  );
}
