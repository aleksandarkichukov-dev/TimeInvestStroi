import { partners } from "@/content/site";
import s from "./Partners.module.css";

// Безкрайна лента с производителите от сегашния сайт; спира при посочване. Имената са изписани
// типографски, за да изглеждат еднакво (оригиналните логота са растерни и с различен фон).
export function Partners() {
  const row = (hidden: boolean) => (
    <ul className={s.row} aria-hidden={hidden || undefined}>
      {partners.map((name) => (
        <li key={name} className={s.item}>
          <span className={s.name}>{name}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={s.marquee} role="region" aria-label="Производители, с които работим">
      <div className={s.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
