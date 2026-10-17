// Етапите на строителството от проекта до озеленяването. Ползват се на началната страница
// и на страницата „Строителство на къщи във Варна“.

export type Stage = {
  n: string;
  title: string;
  text: string;
  image?: string;
  services: string[];
};

// Текстовете са от описанията на услугите в сегашния сайт.
export const stages: Stage[] = [
  {
    n: "01",
    title: "Проектиране",
    text: "Изготвянето на технически проект отнема средно около 35 дни, като срокът варира в зависимост от особеностите на къщата. След като цялата документация е финализирана, проектът се изпраща за одобрение в общината, която след това издава разрешението за строеж и същинската работа започва.",
    services: ["proektirane-i-arhitektura", "interioren-dizain"],
  },
  {
    n: "02",
    title: "Изкоп",
    text: "Изкопните работи са процесът на изкопаване, премахване и преработка на земни маси, камъни и други материали от строителната площадка. Ние извършваме всякакъв тип изкопни работи.",
    image: "/img/projects/kooperacia-napetov/018.webp",
    services: ["izkopni-raboti", "kartene-i-izvozvane"],
  },
  {
    n: "03",
    title: "Груб строеж",
    text: "Това е етапът, когато сградата придобива своята форма и размери, но още не е завършена и не се извършват детайлни работи по декорация и обзавеждане.",
    image: "/img/projects/kashta-alen-mak/000.webp",
    services: ["grub-stroezh", "zidaria-i-zamazka", "sglobyaemi-kashti"],
  },
  {
    n: "04",
    title: "Инсталации",
    text: "Ние можем да изградим електрически системи от нулата или да модернизираме вече съществуващи, за да отговарят на всички изисквания за безопасност и ефективност.",
    image: "/img/projects/lake-house/050.webp",
    services: ["el-i-vik-instalacia", "ovk", "sot-videonablyudenie-domofoni"],
  },
  {
    n: "05",
    title: "Довършителни",
    text: "Внесете завършеност и издръжливост във вашия дом с нашите услуги за мазилки, предлагащи широка гама от текстури, цветове и дълготрайни решения за вътрешни и външни повърхности.",
    image: "/img/projects/lake-house/046.webp",
    services: [
      "toplo-i-hidroizolacia",
      "shpaklovka-boyadisvane-mazilki",
      "suho-stroitelstvo",
      "oblicovki-i-nastilki",
      "dograma",
      "darvodelski-uslugi",
    ],
  },
  {
    n: "06",
    title: "Екстериор",
    text: "Озеленяването е важна част от образа на едно място и ние сме на разположение, за да ви помогнем да направите вашето място зелено и живописно.",
    image: "/img/projects/lake-house/005.webp",
    services: ["ozelenyavane-polivni-sistemi", "garazhni-vrati-portali-ogradi"],
  },
];
