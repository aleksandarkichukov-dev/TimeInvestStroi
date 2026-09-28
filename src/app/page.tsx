import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Stages } from "@/components/home/Stages";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Partners } from "@/components/home/Partners";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CtaBand, SectionHead } from "@/components/ui";
import { ArrowRight } from "@/components/icons";
import { site } from "@/content/site";
import s from "./page.module.css";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Intro />
      <Stages />
      <ServicesOverview />
      <FeaturedProjects />

      <section className="section" aria-labelledby="ba-title">
        <div className={`container ${s.ba}`}>
          <div className={s.baText}>
            <p className="eyebrow" data-fade>
              <b>05</b> Преди и след
            </p>
            <h2 id="ba-title" data-split>
              Кооперация Сотира
            </h2>
            <Link href="/proekti/kooperacia-sotira" className="btn" data-fade transitionTypes={["curtain"]}>
              Разгледай снимките <ArrowRight className="btn-arrow" />
            </Link>
          </div>
          <div data-fade>
            <BeforeAfter
              before="/img/projects/kooperacia-sotira/019.webp"
              after="/img/projects/kooperacia-sotira/002.webp"
              alt="Кооперация Сотира"
            />
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="partners-title">
        <div className="container">
          <SectionHead index="06" label="Партньори" title={<span id="partners-title">Партньори</span>} lead={site.partnersLead} />
        </div>
        <Partners />
      </section>

      <CtaBand />
    </PageTransition>
  );
}
