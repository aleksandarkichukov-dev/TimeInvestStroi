// Проектите от галерията на сегашния сайт, в същия ред. Снимките са в public/img/projects/<slug>/
// (генерират се с `npm run images` от media-src/projects/<slug>/) и са подредени от началото на строежа
// до завършения обект.

export type ProjectCategory = "kashti" | "kooperacii" | "drugi";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  cover: string;
  images: string[];
  beforeAfter?: { before: string; after: string };
};

export const categories: { id: ProjectCategory; label: string }[] = [
  { id: "kashti", label: "Къщи" },
  { id: "kooperacii", label: "Кооперации" },
  { id: "drugi", label: "Склад и стени" },
];

const n = (list: string) => list.split(" ");

export const projects: Project[] = [
  {
    slug: "kooperacia-sotira",
    title: "Кооперация Сотира",
    category: "kooperacii",
    cover: "002",
    images: n("044 043 041 040 038 037 036 033 031 028 025 022 020 019 017 016 015 014 013 012 011 010 009 002 000 001 003 004 005 006 007 008"),
    beforeAfter: { before: "019", after: "002" },
  },
  {
    slug: "kooperacia-radecki",
    title: "Кооперация Радецки",
    category: "kooperacii",
    cover: "005",
    images: n("038 036 033 031 028 026 025 023 021 019 018 016 014 012 011 009 008 006 005 003 002 000"),
  },
  {
    slug: "kashti-sotira",
    title: "Къщи Сотира",
    category: "kashti",
    cover: "000",
    images: n("104 103 102 101 100 099 094 088 083 078 073 067 065 062 061 057 053 049 046 042 038 034 000 004 007 011 015 017 018 022 026 029 033"),
  },
  {
    slug: "lake-house",
    title: "Лейк хаус",
    category: "kashti",
    cover: "000",
    images: n("088 087 086 085 083 082 081 080 077 076 073 069 064 062 060 059 056 052 051 050 047 046 043 041 036 030 025 020 016 015 000 001 002 003 005 006 008 009 011 012 014"),
  },
  {
    slug: "kashta-basein-akchelar",
    title: "Къща с басейн Акчелар",
    category: "kashti",
    cover: "000",
    images: n("089 078 066 055 043 004 035 032 028 025 021 016 012 009 000 001 002 003 008 017 018"),
  },
  {
    slug: "kashta-ezero",
    title: "Къща Езеро",
    category: "kashti",
    cover: "004",
    images: n("071 064 056 049 041 034 033 030 026 023 019 016 012 009 004 000 001 002 003 005 006 007 008"),
  },
  {
    slug: "kashti-kazashko",
    title: "Къщи Казашко",
    category: "kashti",
    cover: "000",
    images: n("068 064 061 057 054 050 049 045 041 037 032 028 024 020 000 002 004 006 008 011 013 015 017 019"),
  },
  {
    slug: "kashta-aksakovo",
    title: "Къща Аксаково",
    category: "kashti",
    cover: "001",
    images: n("016 014 012 010 008 006 004 002 001 000"),
  },
  {
    slug: "steni-akchelar",
    title: "Стени Акчелар",
    category: "drugi",
    cover: "002",
    images: n("027 026 025 024 023 022 021 019 016 014 011 009 006 004 002 000 001 003"),
  },
  {
    slug: "sklad-chaika",
    title: "Склад Чайка",
    category: "drugi",
    cover: "000",
    images: n("048 047 046 045 044 040 039 035 030 025 020 016 013 011 000 001 002 003 004 006 007 008 009 010"),
  },
  {
    slug: "kooperacia-napetov",
    title: "Кооперация П. Напетов",
    category: "kooperacii",
    cover: "007",
    images: n("019 018 017 016 015 014 013 011 009 007 006 004 002 000"),
  },
  {
    slug: "kashta-alen-mak",
    title: "Къща Ален мак",
    category: "kashti",
    cover: "000",
    images: n("015 014 013 012 011 010 009 008 007 006 000 001 002 003 004 005"),
  },
];

export const projectImage = (slug: string, file: string) => `/img/projects/${slug}/${file}.webp`;
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const coverOf = (p: Project) => projectImage(p.slug, p.cover);

// Проекти за началната страница, в този ред.
export const featured = ["lake-house", "kooperacia-sotira", "kashti-sotira", "kashta-basein-akchelar", "kooperacia-radecki", "sklad-chaika"];
