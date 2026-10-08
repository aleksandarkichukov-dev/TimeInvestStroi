import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ViewTransition } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { ArrowUpRight } from "@/components/icons";
import { serviceGroups, services, servicesByGroup } from "@/content/services";
import { site } from "@/content/site";
import { img } from "@/lib/img";
import inner from "../inner.module.css";
import s from "./services.module.css";

export const metadata: Metadata = {
  title: "Строителни услуги във Варна",
  description: `Строителни услуги във Варна от ${site.name}: ${services.map((svc) => svc.title.toLowerCase()).slice(0, 8).join(", ")} и др.`,
  alternates: { canonical: "/uslugi" },
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbLd([{ name: "Услуги", path: "/uslugi" }])} />
      <section className={`${inner.pageHead} grid-paper`}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Услуги" }]} />
          <h1 className={`${inner.title} h1-in`}>
            Услуги
          </h1>
          <div className={inner.headRow}>
            <p className="lead" data-fade>
              {site.servicesLead}
            </p>
            <nav className={s.jump} aria-label="Етапи" data-fade>
              {serviceGroups.map((g) => (
                <a key={g.id} href={`#${g.id}`} className={s.jumpLink}>
                  <span className="mono">{g.index}</span> {g.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {serviceGroups.map((g) => (
        <section key={g.id} id={g.id} className={`section-tight ${s.group}`} aria-labelledby={`${g.id}-title`}>
          <div className={`container ${inner.split}`}>
            <div className={inner.sticky}>
              <span className={s.groupIndex}>{g.index}</span>
              <h2 id={`${g.id}-title`} className={s.groupTitle} data-split>
                {g.title}
              </h2>
            </div>
            <ul className={s.list}>
              {servicesByGroup(g.id).map((svc) => (
                <li key={svc.slug} data-fade>
                  <Link href={`/uslugi/${svc.slug}`} className={s.item} transitionTypes={["morph"]}>
                    <ViewTransition name={`service-${svc.slug}`} share="morph" default="none">
                      <span className={s.thumb} aria-hidden="true">
                        {svc.image ? (
                          <Image src={img(svc.image)} alt="" fill sizes="120px" className={s.thumbImg} />
                        ) : (
                          <span className={`${s.thumbPlaceholder} grid-paper`} />
                        )}
                      </span>
                    </ViewTransition>
                    <span className={s.itemBody}>
                      <span className={s.itemTitle}>{svc.title}</span>
                      <span className="muted">{svc.short}</span>
                    </span>
                    <ArrowUpRight className={s.itemArrow} width={26} height={26} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CtaBand />
    </PageTransition>
  );
}
