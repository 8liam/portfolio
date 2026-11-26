import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistSans, GeistMono } from "geist/font";

import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export const metadata: Metadata = {
  title: "Liam Grant | Software engineer working with AI agents",
  description:
    "Liam Grant is a Gold Coast software engineer who orchestrates AI agents and builds in TypeScript.",
  referrer: "strict-origin-when-cross-origin",
  keywords: [
    "Liam Grant",
    "Software Engineer",
    "AI agents",
    "Agent orchestration",
    "TypeScript",
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
    title: "Liam Grant | Software engineer working with AI agents",
    description:
      "Liam Grant is a Gold Coast software engineer who orchestrates AI agents and builds in TypeScript.",
    images: ["https://liamgrant.com/og-image.png"],
    creator: "@liamgrantdev",
  },

  openGraph: {
    title: "Liam Grant | Software engineer working with AI agents",
    description:
      "Liam Grant is a Gold Coast software engineer who orchestrates AI agents and builds in TypeScript.",
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU">
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
