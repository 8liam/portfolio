import {
  GeistSans,
  GeistMono,
} from "geist/font";

import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport = {
  themeColor: "#141312",
};

export const metadata = {
  title: {
    default: "Liam Grant | Software Engineer",
  },
  description:
    "I'm a software engineer based in the Gold Coast, Queensland, building modern web applications and solutions.",
  referrer: "strict-origin-when-cross-origin",
  keywords: [
    "Liam Grant",
    "Software Engineer",
    "Gold Coast",
    "Web Developer",
    "React",
    "Next.js",
    "Fullstack",
    "Queensland",
    "Gold Coast Web Dev",
  ],
  authors: [{ name: "Liam Grant" }],
  creator: "Liam Grant",
  publisher: "Liam Grant",
  metadataBase: new URL("https://liamgrant.com"),

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
    },
  },

  twitter: {
    card: "summary_large_image",
    title: "Liam Grant | Software Engineer",
    description:
      "I'm a software engineer based in the Gold Coast, Queensland, building modern web applications and solutions.",
    images: ["https://liamgrant.com/og-image.png"],
    creator: "@liamgrantdev",
  },

  openGraph: {
    title: "Liam Grant | Software Engineer",
    description:
      "I'm a software engineer based in the Gold Coast, Queensland, building modern web applications and solutions.",
    url: "https://liamgrant.com",
    siteName: "Liam Grant's Portfolio",
    images: [
      {
        url: "https://liamgrant.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Liam Grant's Portfolio",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased font-sans`}
      >
        <SpeedInsights />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
