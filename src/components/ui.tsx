import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { img } from "@/lib/img";
import { site } from "@/content/site";
import { ArrowRight } from "@/components/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import s from "./ui.module.css";

// Кóта като в архитектурен чертеж: ├──── 12,40 m ────┤
export function Dim({ label, className }: { label: string; className?: string }) {
  return (
    <span className={`${s.dim} ${className ?? ""}`} aria-hidden="true" data-dim>
      <i />
      <em>{label}</em>
      <i />
    </span>
  );
}

export function SectionHead({
  index,
  label,
  title,
  lead,
  action,
  className,
  titleAs: Title = "h2",
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  className?: string;
  titleAs?: "h1" | "h2";
}) {
  return (
    <div className={`${s.head} ${className ?? ""}`}>
      <p className="eyebrow" data-fade>
        <b>{index}</b> {label}
      </p>
      <div className={`${s.headRow} ${lead || action ? s.headRowSplit : ""}`}>
        <Title data-split className={s.headTitle}>
          {title}
        </Title>
        {(lead || action) && (
          <div className={s.headAside} data-fade>
            {lead && <p className="lead muted">{lead}</p>}
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

export function RevealImage({
  src,
  alt,
  sizes = "100vw",
  className,
  style,
  priority,
  parallax = 0.12,
  reveal = true,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  parallax?: number;
  reveal?: boolean;
}) {
  return (
    <div className={`${s.frame} ${className ?? ""}`} style={style} data-reveal={reveal ? "" : undefined}>
      <div className={s.frameInner} data-parallax={parallax || undefined} style={{ inset: parallax ? `-${parallax * 60}% 0` : 0 }}>
        <Image
          src={img(src)}
          alt={alt}
          fill
          sizes={sizes}
          placeholder="blur"
          preload={priority}
          quality={75}
          className={s.cover}
        />
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Навигационна пътека" className={s.crumbs}>
      <ol>
        <li>
          <Link href="/" transitionTypes={["curtain"]}>
            Начало
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <Link href={item.href} transitionTypes={["curtain"]}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CtaBand() {
  return (
    <section className={`${s.cta} grid-paper`}>
      <div className={`container ${s.ctaGrid}`}>
        <div>
          <p className="eyebrow" data-fade>
            <b>→</b> Контакти
          </p>
          <h2 className={s.ctaTitle} data-split>
            {site.contactsLead}
          </h2>
          <p className="lead" data-fade>
            <a href={`mailto:${site.email}`} className="link-underline">
              {site.email}
            </a>
            <br />
            {site.address.city}, {site.address.street}
          </p>
          <div className={s.ctaActions} data-fade>
            <Magnetic>
              <Link href="/kontakti#oferta" className={`btn btn-accent ${s.ctaBtn}`} data-cursor="Оферта" transitionTypes={["curtain"]}>
                Поискай оферта <ArrowRight className="btn-arrow" />
              </Link>
            </Magnetic>
            <a href={site.phoneHref} className="btn btn-ghost">
              {site.phone}
            </a>
          </div>
        </div>
        <div className={s.ctaPhoto} data-fade>
          <Image
            src={img("/img/projects/lake-house/014.webp")}
            alt="Лейк хаус"
            fill
            sizes="(min-width: 900px) 45vw, 100vw"
            placeholder="blur"
            className={s.ctaPhotoImg}
          />
          <span className={`${s.tick} ${s.tickTl}`} />
          <span className={`${s.tick} ${s.tickBr}`} />
        </div>
      </div>
    </section>
  );
}
