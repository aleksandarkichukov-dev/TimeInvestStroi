// Стари адреси (WordPress) → нови адреси. Ключовете са без „/“ в края и с малки букви.
// Котвите /#contacts и /#about-us не стигат до сървъра — те се пренасочват в браузъра
// (виж components/LegacyHashRedirect.tsx).
export const legacyRedirects: Record<string, string> = {
  "/services": "/uslugi",
  "/gallery": "/proekti",
  "/privacy-policy": "/politika-za-poveritelnost",
  "/кооперация-сотира": "/proekti/kooperacia-sotira",
  "/kooperaciq-radecki": "/proekti/kooperacia-radecki",
  "/coop-napoetov": "/proekti/kooperacia-napetov",
  "/houses-sotira": "/proekti/kashti-sotira",
  "/lake-house": "/proekti/lake-house",
  "/house-pool-akchelar": "/proekti/kashta-basein-akchelar",
  "/house_kazashko": "/proekti/kashta-ezero",
  "/къщи-казашко": "/proekti/kashti-kazashko",
  "/house-aksakovo": "/proekti/kashta-aksakovo",
  "/house-alenmak": "/proekti/kashta-alen-mak",
  "/steni-akchelar": "/proekti/steni-akchelar",
  "/sklad-chaika": "/proekti/sklad-chaika",
  "/feed": "/",
  "/comments/feed": "/",
};
