import { HOME_SEO_CONFIG as config } from "./home-json-ld.config";

export function homeJsonLd(): string {
  const personId = `${config.siteUrl}/#person`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: config.name,
        url: config.siteUrl,
        image: config.image,
        jobTitle: config.jobTitle,
        email: config.email,
        knowsAbout: config.knowsAbout,
        address: {
          "@type": "PostalAddress",
          addressLocality: config.address.locality,
          addressRegion: config.address.region,
          addressCountry: config.address.country,
        },
        sameAs: config.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${config.siteUrl}/#website`,
        url: config.siteUrl,
        name: config.name,
        inLanguage: config.locale,
        publisher: { "@id": personId },
      },
    ],
  };
  // escape "<" so the payload cannot close the script tag
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}
