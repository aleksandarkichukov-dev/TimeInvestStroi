import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/content/site";
import { serviceGroups } from "@/content/services";
import { img } from "@/lib/img";
import { Logo } from "@/components/Logo";
import { ArrowUpRight } from "@/components/icons";
import { SocialLinks } from "@/components/SocialLinks";
import s from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={`dark ${s.footer}`}>
      <div className={`container ${s.top}`}>
        <div className={s.brand}>
          <Link href="/" className={s.logo} aria-label="Timeinvest Stroy – начало" transitionTypes={["curtain"]}>
            <Logo size={52} />
          </Link>
          <p className={s.slogan}>{site.slogan}</p>
          <SocialLinks />
        </div>

        <div className={s.cols}>
          <div>
            <p className={s.colTitle}>Навигация</p>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline" transitionTypes={["curtain"]}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={s.colTitle}>Услуги</p>
            <ul>
              {serviceGroups.map((g) => (
                <li key={g.id}>
                  <Link href={`/uslugi#${g.id}`} className="link-underline" transitionTypes={["curtain"]}>
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={s.colTitle}>Контакти</p>
            <ul>
              <li>
                <a href={site.phoneHref} className="link-underline">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-underline">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.mapsUrl} target="_blank" rel="noopener" className="link-underline">
                  {site.address.city}, {site.address.street}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={s.chamber}>
          <Image
            src={img("/img/misc/kamara-na-stroitelite.webp")}
            alt="Медал на Камарата на строителите в България"
            sizes="80px"
            className={s.medal}
          />
          <p>
            Част от „{site.chamber.name}“
            <br />
            <span className="mono muted">вписана с № {site.chamber.reg}</span>
          </p>
          <a href={site.group.url} target="_blank" rel="noopener" className={s.group}>
            Част от групата <strong>{site.group.name}</strong> <ArrowUpRight width={16} height={16} />
          </a>
        </div>
      </div>


      <div className={`container ${s.bottom}`}>
        <span className="mono muted">
          © {year} {site.legalName} · ЕИК {site.eik}
        </span>
        <Link href="/politika-za-poveritelnost" className="mono muted link-underline">
          Политика за поверителност
        </Link>
      </div>
    </footer>
  );
}
