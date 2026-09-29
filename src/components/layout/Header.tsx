"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { serviceGroups, servicesByGroup } from "@/content/services";
import { Logo } from "@/components/Logo";
import { ArrowRight, Phone } from "@/components/icons";
import { lockScroll } from "@/lib/motion";
import s from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 240 && y > lastY.current + 4 ? true : y < lastY.current - 4 ? false : (h) => h);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Затваряме менюто при смяна на страницата (корекция на състоянието по време на рендер).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={s.header}
      data-scrolled={scrolled || undefined}
      data-hidden={(hidden && !open) || undefined}
      data-open={open || undefined}
      style={{ viewTransitionName: "site-header" }}
    >
      <div className={s.bar}>
        <Link href="/" className={s.logo} transitionTypes={["curtain"]}>
          <Logo />
        </Link>

        <nav className={s.nav} aria-label="Основна навигация">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={s.navLink}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  transitionTypes={["curtain"]}
                >
                  <span className={s.navIndex}>0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.actions}>
          <a href={site.phoneHref} className={s.phone}>
            <Phone width={16} height={16} />
            {site.phone}
          </a>
          <Link href="/kontakti#oferta" className={`btn btn-accent ${s.cta}`} transitionTypes={["curtain"]}>
            Поискай оферта
          </Link>
          <button
            className={s.burger}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Затвори менюто" : "Отвори менюто"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="site-menu" className={s.menu} hidden={!open} inert={!open}>
        <div className={s.menuGrid}>
          <nav aria-label="Меню">
            <ul className={s.menuList}>
              <li>
                <Link href="/" className={s.menuLink} onClick={close} aria-current={pathname === "/" ? "page" : undefined}>
                  <span className="mono">00</span>Начало
                </Link>
              </li>
              {nav.map((item, i) => (
                <li key={item.href} style={{ "--i": i + 1 } as React.CSSProperties}>
                  <Link
                    href={item.href}
                    className={s.menuLink}
                    onClick={close}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <span className="mono">0{i + 1}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={s.menuSide}>
            <p className="mono muted">Услуги</p>
            <ul>
              {serviceGroups.map((g) => (
                <li key={g.id}>
                  <Link href={`/uslugi#${g.id}`} className={s.sideLink} onClick={close}>
                    <span className="mono">{g.index}</span>
                    {g.title}
                  </Link>
                  <ul className={s.sideSub}>
                    {servicesByGroup(g.id).map((svc) => (
                      <li key={svc.slug}>
                        <Link href={`/uslugi/${svc.slug}`} onClick={close}>
                          {svc.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={s.menuFoot}>
          <Link href="/kontakti#oferta" className="btn btn-accent" onClick={close}>
            Поискай оферта <ArrowRight className="btn-arrow" />
          </Link>
          <a href={site.phoneHref} className="mono">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="mono">
            {site.email}
          </a>
        </div>
      </div>
    </header>
  );
}
