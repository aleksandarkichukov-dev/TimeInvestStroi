import { site } from "@/content/site";
import { Facebook, Instagram } from "@/components/icons";
import s from "./SocialLinks.module.css";

const icons = { Facebook, Instagram } as const;

// Връзки към профилите на фирмата в социалните мрежи.
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={`${s.list} ${className ?? ""}`}>
      {site.social.map((item) => {
        const Icon = icons[item.name as keyof typeof icons];
        return (
          <li key={item.name}>
            <a href={item.url} target="_blank" rel="noopener" className={s.link} aria-label={`${item.name} на ${site.name}`}>
              <Icon width={20} height={20} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
