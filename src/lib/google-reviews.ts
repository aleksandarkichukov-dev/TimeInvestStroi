import { googlePlace, savedReviews, type Review } from "@/content/reviews";

// Google Places API (New): връща оценката, броя отзиви и до 5 отзива.
// Резултатът се кешира за един ден, затова заявките са ~30 на месец (в безплатния лимит).
type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string };
  }[];
};

export async function getGoogleReviews() {
  const fallback = { rating: googlePlace.rating, count: googlePlace.count, reviews: savedReviews };
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return fallback;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${googlePlace.id}?languageCode=bg`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,reviews" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return fallback;
    const data: PlacesResponse = await res.json();

    const live: Review[] = (data.reviews ?? [])
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "",
        rating: r.rating ?? 0,
        text: (r.originalText?.text ?? r.text?.text ?? "").trim(),
        when: r.relativePublishTimeDescription,
        url: r.authorAttribution?.uri,
      }))
      .filter((r) => r.author && r.text && r.rating >= 4);

    // Новите отзиви от Google отпред, после записаните, без повторения.
    const names = new Set(live.map((r) => r.author));
    return {
      rating: data.rating ?? fallback.rating,
      count: data.userRatingCount ?? fallback.count,
      reviews: [...live, ...savedReviews.filter((r) => !names.has(r.author))],
    };
  } catch {
    return fallback;
  }
}
