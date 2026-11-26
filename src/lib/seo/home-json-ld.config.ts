export const SITE_URL = "https://liamgrant.com";

export const HOME_SEO_CONFIG = {
  siteUrl: SITE_URL,
  name: "Liam Grant",
  jobTitle: "Software Engineer",
  email: "mailto:liamgrantdev@gmail.com",
  image: `${SITE_URL}/og-image.png`,
  locale: "en-AU",
  address: {
    locality: "Gold Coast",
    region: "QLD",
    country: "AU",
  },
  knowsAbout: ["AI agents", "Agent orchestration", "TypeScript"],
  sameAs: ["https://github.com/8liam", "https://linkedin.com/in/liamgrantdev"],
} as const;
