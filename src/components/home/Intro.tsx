import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/img";
import { site } from "@/content/site";
import { ArrowRight } from "@/components/icons";
import s from "./Intro.module.css";

const Chip = ({ src }: { src: string }) => (
  <span className={s.chip} aria-hidden="true">
    <Image src={img(src)} alt="" fill sizes="160px" className={s.chipImg} />
  </span>
);

export function Intro() {
  return (
    <section className="section" aria-labelledby="intro-title">
      <div className="container">
        <p className="eyebrow" data-fade>
          <b>01</b> За нас
        </p>
        <h2 id="intro-title" className={s.statement} data-fade>
          Изграждане на всичко необходимо <Chip src="/img/projects/kashti-sotira/000.webp" /> във вашия дом с най-новите{" "}
          <Chip src="/img/projects/lake-house/089.webp" /> и иновативни технологии, на разумна цена.
        </h2>

        <div className={s.row}>
          <div className={s.about} data-fade>
            <p>{site.about[0]}</p>
            <Link href="/za-nas" className={`${s.more} link-underline`} transitionTypes={["curtain"]}>
              За нас <ArrowRight width={18} height={18} />
            </Link>
          </div>
          <div className={s.member} data-fade>
            <span className={s.badge}>{site.chamber.short}</span>
            <p>
              Част от „{site.chamber.name}“
              <span className="mono muted">вписана с № {site.chamber.reg}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
