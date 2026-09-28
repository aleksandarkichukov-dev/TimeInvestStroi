import Image from "next/image";
import Link from "next/link";
import { serviceGroups, servicesByGroup } from "@/content/services";
import { img } from "@/lib/img";
import { site } from "@/content/site";
import { SectionHead } from "@/components/ui";
import { ArrowRight } from "@/components/icons";
import s from "./ServicesOverview.module.css";

const groupImages: Record<string, string> = {
  proektirane: "/img/projects/lake-house/003.webp",
  stroezh: "/img/projects/kashti-kazashko/032.webp",
  instalacii: "/img/projects/lake-house/050.webp",
  dovarshitelni: "/img/projects/kashta-aksakovo/006.webp",
  eksterior: "/img/projects/lake-house/025.webp",
};

export function ServicesOverview() {
  return (
    <section className="section" aria-labelledby="services-title">
      <div className="container">
        <SectionHead
          index="03"
          label="Услуги"
          title={<span id="services-title">Нашите услуги</span>}
          lead={site.servicesLead}
          action={
            <Link href="/uslugi" className="btn" transitionTypes={["curtain"]}>
              Всички услуги <ArrowRight className="btn-arrow" />
            </Link>
          }
        />

        <ol className={s.list}>
          {serviceGroups.map((g) => (
            <li key={g.id} className={s.row} data-fade>
              <span className={s.index}>{g.index}</span>
              <div className={s.main}>
                <h3 className={s.title}>
                  <Link href={`/uslugi#${g.id}`} className={s.titleLink} transitionTypes={["curtain"]}>
                    {g.title}
                  </Link>
                </h3>
              </div>
              <ul className={s.services}>
                {servicesByGroup(g.id).map((svc) => (
                  <li key={svc.slug}>
                    <Link href={`/uslugi/${svc.slug}`} className={s.pill} transitionTypes={["curtain"]}>
                      {svc.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className={s.thumb} aria-hidden="true">
                <Image src={img(groupImages[g.id])} alt="" fill sizes="240px" className={s.thumbImg} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
