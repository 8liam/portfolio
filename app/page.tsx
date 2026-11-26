import type { Metadata } from "next";

import { HomePage } from "@/src/components/home-page/home-page.component";
import { getContributionCalendar } from "@/src/lib/github/contributions";
import { homeJsonLd } from "@/src/lib/seo/home-json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const calendar = await getContributionCalendar();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: homeJsonLd() }}
      />
      <HomePage calendar={calendar} />
    </>
  );
}
