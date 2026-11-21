import Portfolio from "./cli/Portfolio";

const SITE_URL = "https://liamgrant.com";

export const metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Liam Grant",
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      jobTitle: "Software Engineer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gold Coast",
        addressRegion: "QLD",
        addressCountry: "AU",
      },
      sameAs: [
        "https://github.com/8liam",
        "https://linkedin.com/in/liamgrantdev",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Liam Grant's Portfolio",
      inLanguage: "en-AU",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Portfolio />
    </>
  );
}
