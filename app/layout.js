import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Liam Grant | Software Engineer", // Default for pages without specific title
  },
  description: "I'm a software engineer based in the Gold Coast, Queensland, building modern web applications and solutions.",
  referrer: 'strict-origin-when-cross-origin',
  keywords: ["Liam Grant", "Software Engineer", "Gold Coast", "Web Developer", "React", "Next.js", "Fullstack", "Queensland", "Gold Coast Web Dev"],
  authors: [{ name: "Liam Grant" }],
  creator: "Liam Grant",
  publisher: "Liam Grant",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1, // No character limit for snippets
    },
  },

  // Open Graph metadata for social sharing
  openGraph: {
    title: "Liam Grant | Software Engineer",
    description: "I'm a software engineer based in the Gold Coast, Queensland, building modern web applications and solutions.",
    url: "https://liamgrant.com",
    siteName: "Liam Grant's Portfolio",
    images: [
      {
        url: "https://liamgrant.com/og-image.png", // Make sure this path is correct and the image exists
        width: 1200,
        height: 630,
        alt: "Liam Grant's Portfolio",
      },
      // You can add more image objects here if needed
    ],
    locale: "en_AU", // Or 'en_US' etc.
    type: "website",
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
