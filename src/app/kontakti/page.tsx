import type { Metadata } from "next";
import Image from "next/image";
import { PageTransition } from "@/components/PageTransition";
import { Breadcrumbs, SectionHead } from "@/components/ui";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { ArrowUpRight, Mail, Phone, Pin } from "@/components/icons";
import { site } from "@/content/site";
import { img } from "@/lib/img";
import inner from "../inner.module.css";
import s from "./contact.module.css";

export const metadata: Metadata = {
  title: "Контакти: строителна фирма във Варна",
  description: `${site.contactsLead} ${site.phone}, ${site.email}, ${site.addressLine}.`,
  alternates: { canonical: "/kontakti" },
};

export default function ContactPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbLd([{ name: "Контакти", path: "/kontakti" }])} />

      <section className={`${inner.pageHead} grid-paper`}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Контакти" }]} />
          <h1 className={`${inner.title} h1-in`}>Контакти</h1>
          <p className={`lead ${s.lead}`} data-fade>
            {site.contactsLead}
          </p>
          <div className={s.cards}>
            <a href={site.phoneHref} className={`${s.card} ${s.cardMain}`} data-fade>
              <Phone width={26} height={26} />
              <span className="mono">Телефон</span>
              <strong>{site.phone}</strong>
            </a>
            <a href={`mailto:${site.email}`} className={s.card} data-fade>
              <Mail width={26} height={26} />
              <span className="mono">Имейл</span>
              <strong>{site.email}</strong>
            </a>
            <a href={site.mapsUrl} target="_blank" rel="noopener" className={s.card} data-fade>
              <Pin width={26} height={26} />
              <span className="mono">Адрес</span>
              <strong>
                {site.addressLine}
              </strong>
              <span className={s.hint}>
                Google Maps <ArrowUpRight width={14} height={14} />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="oferta" className={`section ${s.quote}`} aria-labelledby="quote-title">
        <div className={`container ${inner.split}`}>
          <div className={inner.sticky}>
            <SectionHead index="01" label="Оферта" title={<span id="quote-title">Поискай оферта</span>} />
            <div className={s.quotePhoto} data-fade>
              <Image
                src={img("/img/misc/hero-lake-house.webp")}
                alt="Лейк хаус"
                fill
                sizes="(min-width: 900px) 40vw, 100vw"
                placeholder="blur"
                className={s.quotePhotoImg}
              />
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>
    </PageTransition>
  );
}
