import Image from "next/image";
import { partners } from "@/content/site";
import { img } from "@/lib/img";
import s from "./Partners.module.css";

// Безкрайна лента с логата на партньорите от сегашния сайт; спира при посочване.
export function Partners() {
  const row = (hidden: boolean) => (
    <ul className={s.row} aria-hidden={hidden || undefined}>
      {partners.map((p) => (
        <li key={p.name} className={s.item}>
          <Image src={img(p.logo)} alt={hidden ? "" : p.name} sizes="200px" className={s.logo} />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={s.marquee} role="region" aria-label="Партньори">
      <div className={s.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
