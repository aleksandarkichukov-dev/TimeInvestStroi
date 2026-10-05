import Image from "next/image";
import Link from "next/link";
import { getService, homeServiceOrder } from "@/content/services";
import { img } from "@/lib/img";
import { site } from "@/content/site";
import { SectionHead } from "@/components/ui";
import { ArrowRight } from "@/components/icons";
import s from "./ServicesOverview.module.css";

// Всички услуги като карти (снимка, заглавие, кратко описание), както са на сегашния сайт.
export function ServicesOverview() {
  const list = homeServiceOrder.map(getService).filter((svc) => svc !== undefined);
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

        <ul className={s.grid}>
          {list.map((svc, i) => (
            <li key={svc.slug} data-fade>
              <Link href={`/uslugi/${svc.slug}`} className={s.card} transitionTypes={["curtain"]}>
                <span className={s.media} aria-hidden="true">
                  {svc.image ? (
                    <Image
                      src={img(svc.image)}
                      alt=""
                      fill
                      sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw"
                      placeholder="blur"
                      className={s.img}
                    />
                  ) : (
                    <span className={`${s.blueprint} grid-paper`}>{String(i + 1).padStart(2, "0")}</span>
                  )}
                </span>
                <span className={s.body}>
                  <span className={s.index}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={s.title}>{svc.title}</span>
                  <span className={s.short}>{svc.short}</span>
                  <span className={s.more}>
                    Виж още <ArrowRight width={16} height={16} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
