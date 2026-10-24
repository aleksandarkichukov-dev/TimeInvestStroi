import { SectionHead } from "@/components/ui";
import { ArrowUpRight } from "@/components/icons";
import { googlePlace } from "@/content/reviews";
import { getGoogleReviews } from "@/lib/google-reviews";
import s from "./Reviews.module.css";

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={`${s.stars} ${className ?? ""}`} role="img" aria-label={`${value} от 5 звезди`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="1em" height="1em" aria-hidden="true" data-off={i >= Math.round(value) || undefined}>
          <path d="M10 1.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.8l-5.2 2.7 1-5.8L1.6 7.6l5.8-.8z" fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}

// Отзивите на клиентите от Google профила; новите идват автоматично (виж src/lib/google-reviews.ts).
export async function Reviews() {
  const { rating, count, reviews } = await getGoogleReviews();
  const shown = reviews.slice(0, 6);
  const ratingText = rating.toFixed(1).replace(".", ",");

  return (
    <section className="section-tight" aria-labelledby="reviews-title">
      <div className="container">
        <SectionHead
          index="06"
          label="Отзиви"
          title={<span id="reviews-title">Какво казват клиентите</span>}
          action={
            <div className={s.summary}>
              <p className={s.score}>
                <span className={s.scoreValue}>{ratingText}</span>
                <span>
                  <Stars value={rating} />
                  <span className="mono muted">{count} отзива в Google</span>
                </span>
              </p>
              <div className={s.actions}>
                <a href={googlePlace.reviewsUrl} target="_blank" rel="noopener" className="btn">
                  Всички отзиви <ArrowUpRight className="btn-arrow" />
                </a>
                <a href={googlePlace.writeReviewUrl} target="_blank" rel="noopener" className="btn btn-ghost">
                  Напишете отзив
                </a>
              </div>
            </div>
          }
        />

        <ul className={s.list}>
          {shown.map((r) => (
            <li key={r.author} className={s.card} data-fade>
              <Stars value={r.rating} className={s.cardStars} />
              <blockquote className={s.text}>
                <p>{r.text}</p>
              </blockquote>
              <p className={s.author}>
                <span className={s.avatar} aria-hidden="true">
                  {r.author.charAt(0)}
                </span>
                <span>
                  <span className={s.name}>{r.author}</span>
                  <span className="mono muted">{r.when ? `${r.when} · Google` : "Отзив в Google"}</span>
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
