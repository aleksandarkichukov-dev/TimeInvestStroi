import { site } from "@/content/site";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.nameLatin,
  legalName: site.legalName,
  slogan: site.slogan,
  description: site.about.join(" "),
  url: site.url,
  logo: `${site.url}/icon.svg`,
  image: `${site.url}/img/projects/lake-house/000.webp`,
  telephone: site.phone.replace(/\s/g, ""),
  email: site.email,
  taxID: site.eik,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.street}, ${site.address.office}`,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: [
    { "@type": "City", name: "Варна" },
    { "@type": "AdministrativeArea", name: "Област Варна" },
  ],
  memberOf: { "@type": "Organization", name: site.chamber.name },
  parentOrganization: { "@type": "Organization", name: site.group.name, url: site.group.url },
  sameAs: site.social.map((item) => item.url),
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Начало", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
