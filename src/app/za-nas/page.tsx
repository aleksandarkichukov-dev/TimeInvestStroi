import type { Metadata } from "next";
import Image from "next/image";
import { PageTransition } from "@/components/PageTransition";
import { Breadcrumbs, CtaBand, RevealImage } from "@/components/ui";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { Partners } from "@/components/home/Partners";
import { ArrowUpRight } from "@/components/icons";
import { site } from "@/content/site";
import { img } from "@/lib/img";
import inner from "../inner.module.css";
import s from "./about.module.css";

export const metadata: Metadata = {
  title: "За нас: строителна фирма във Варна",
  description: `${site.name} – строителна фирма във Варна. ${site.about[0]}`,
  alternates: { canonical: "/za-nas" },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbLd([{ name: "За нас", path: "/za-nas" }])} />

      <section className={`${inner.pageHead} grid-paper`}>
        <div className="container">
          <Breadcrumbs items={[{ label: "За нас" }]} />
          <h1 className={`${inner.title} h1-in`}>{site.slogan}</h1>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.story}`}>
          <RevealImage src="/img/projects/kashti-sotira/000a.webp" alt="Къщи Сотира" className={s.storyImg} sizes="(min-width: 900px) 40vw, 100vw" />
          <div className={s.storyText}>
            <p className="eyebrow" data-fade>
              <b>01</b> За нас
            </p>
            <div className="prose" data-fade>
              {site.about.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <a href={site.group.url} target="_blank" rel="noopener" className={`link-underline ${s.ext}`} data-fade>
              Част от {site.group.name} <ArrowUpRight width={16} height={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="section dark" aria-labelledby="chamber-title">
        <div className={`container ${s.chamber}`}>
          <div className={s.seal}>
            <Image
              src={img("/img/misc/kamara-na-stroitelite.webp")}
              alt="Медал на Камарата на строителите в България – Централен професионален регистър"
              sizes="(min-width: 900px) 360px, 70vw"
              className={s.sealImg}
            />
          </div>
          <div>
            <p className="eyebrow" data-fade>
              <b>02</b> Камара на строителите
            </p>
            <h2 id="chamber-title" data-split>
              Част от „{site.chamber.name}“
            </h2>
            <dl className={s.reg} data-fade>
              <div>
                <dt className="mono muted">Вписана с №</dt>
                <dd>{site.chamber.reg}</dd>
              </div>
              <div>
                <dt className="mono muted">ЕИК</dt>
                <dd>{site.eik}</dd>
              </div>
              <div>
                <dt className="mono muted">Фирма</dt>
                <dd>{site.legalName}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="partners-title">
        <div className="container">
          <p className="eyebrow" data-fade>
            <b>03</b> Партньори
          </p>
          <p id="partners-title" className={s.partnersLead} data-fade>
            {site.partnersLead}
          </p>
        </div>
        <Partners />
      </section>

      <CtaBand />
    </PageTransition>
  );
}
