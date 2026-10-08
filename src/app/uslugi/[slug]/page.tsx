import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { getGroup, getService, services, servicesByGroup } from "@/content/services";
import { site } from "@/content/site";
import { img } from "@/lib/img";
import s from "./service.module.css";

export function generateStaticParams() {
  return services.map((svc) => ({ slug: svc.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) return {};
  const og = svc.image ? img(svc.image) : null;
  return {
    title: `${svc.title} във Варна`,
    description: svc.body[0],
    alternates: { canonical: `/uslugi/${svc.slug}` },
    openGraph: og ? { images: [{ url: og.src, width: og.width, height: og.height, alt: svc.title }] } : undefined,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) notFound();

  const group = getGroup(svc.group);
  const siblings = servicesByGroup(svc.group).filter((x) => x.slug !== svc.slug);
  const i = services.indexOf(svc);
  const prev = services[(i - 1 + services.length) % services.length];
  const next = services[(i + 1) % services.length];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title,
    description: svc.body.join(" "),
    provider: { "@id": `${site.url}/#organization` },
    url: `${site.url}/uslugi/${svc.slug}`,
  };

  return (
    <PageTransition>
      <JsonLd data={serviceLd} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Услуги", path: "/uslugi" },
          { name: svc.title, path: `/uslugi/${svc.slug}` },
        ])}
      />

      <header className={`${s.head} grid-paper`}>
        <div className={`container ${s.headGrid}`}>
          <div>
            <Breadcrumbs
              items={[
                { label: "Услуги", href: "/uslugi" },
                { label: group.title, href: `/uslugi#${group.id}` },
                { label: svc.title },
              ]}
            />
            <p className={`mono ${s.kicker}`} data-fade>
              {group.index} · {group.title}
            </p>
            <h1 className={`${s.title} h1-in`}>{svc.title}</h1>
            <p className={`lead ${s.intro}`} data-fade>
              {svc.short}
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
          <ViewTransition name={`service-${svc.slug}`} share="morph" default="none">
            <div className={s.visual}>
              {svc.image ? (
                <Image
                  src={img(svc.image)}
                  alt={`${svc.title} във Варна – ${site.name}`}
                  fill
                  preload
                  sizes="(min-width: 900px) 45vw, 100vw"
                  placeholder="blur"
                  className={s.visualImg}
                />
              ) : (
                <div className={`${s.blueprint} grid-paper`} aria-hidden="true">
                  <span className={s.blueprintIndex}>{group.index}</span>
                  <span className="mono">{svc.title}</span>
                </div>
              )}
            </div>
          </ViewTransition>
        </div>
      </header>

      <section className="section-tight">
        <div className={`container ${s.body}`}>
          <div className={`prose ${s.prose}`}>
            {svc.body
              .filter((para) => para !== svc.short)
              .map((para, k) => (
                <p key={k} data-fade>
                  {para}
                </p>
              ))}
          </div>
          {siblings.length > 0 && (
            <div className={s.siblings} data-fade>
              <p className="mono muted">Още от „{group.title}“</p>
              <ul>
                {siblings.map((x) => (
                  <li key={x.slug}>
                    <Link href={`/uslugi/${x.slug}`} transitionTypes={["curtain"]}>
                      {x.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <nav className={`container ${s.pager}`} aria-label="Съседни услуги">
        <Link href={`/uslugi/${prev.slug}`} className={s.pagerLink} transitionTypes={["curtain"]}>
          <span className="mono muted">
            <ArrowLeft width={14} height={14} /> Предишна
          </span>
          <span className={s.pagerTitle}>{prev.title}</span>
        </Link>
        <Link href={`/uslugi/${next.slug}`} className={`${s.pagerLink} ${s.pagerNext}`} transitionTypes={["curtain"]}>
          <span className="mono muted">
            Следваща <ArrowRight width={14} height={14} />
          </span>
          <span className={s.pagerTitle}>{next.title}</span>
        </Link>
      </nav>

      <CtaBand />
    </PageTransition>
  );
}
