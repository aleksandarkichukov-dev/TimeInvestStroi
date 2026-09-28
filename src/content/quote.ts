// Стъпките на формата „Поискай оферта“. Използват се и от сървъра за валидиране.
export const quoteSteps = [
  {
    id: "type",
    title: "Какво ще строим?",
    options: ["Къща", "Жилищна сграда", "Промишлена / търговска сграда", "Ремонт или довършителни", "Сглобяема къща", "Друго"],
  },
  {
    id: "area",
    title: "Каква е приблизителната площ?",
    options: ["До 100 m²", "100 – 200 m²", "200 – 400 m²", "400 – 1000 m²", "Над 1000 m²", "Не знам още"],
  },
  {
    id: "stage",
    title: "На какъв етап сте?",
    options: ["Имам идея", "Имам парцел", "Имам проект", "Имам разрешение за строеж", "Сградата е в груб строеж", "Ремонт на съществуваща"],
  },
  {
    id: "timeline",
    title: "Кога искате да започнем?",
    options: ["Възможно най-скоро", "До 3 месеца", "3 – 6 месеца", "След 6 месеца", "Гъвкав съм"],
  },
] as const;

export type QuoteChoiceId = (typeof quoteSteps)[number]["id"];

export type QuotePayload = {
  type: string;
  area: string;
  stage: string;
  timeline: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  message: string;
  consent: boolean;
  // защита от ботове
  website: string;
  startedAt: number;
};
