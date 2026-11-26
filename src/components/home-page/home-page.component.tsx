import { CommitGrid } from "@/src/components/commit-grid/commit-grid.component";
import { HomeIntro } from "@/src/components/home-intro/home-intro.component";
import { ProfileDock } from "@/src/components/profile-dock/profile-dock.component";

import { HOME_PAGE_CONFIG as config } from "./home-page.config";
import type { HomePageProps } from "./home-page.types";

export function HomePage({ calendar }: HomePageProps) {
  return (
    <div className={config.className.root}>
      <header className={config.className.hero}>
        <CommitGrid calendar={calendar} />
      </header>
      <main>
        <HomeIntro />
      </main>
      <ProfileDock />
    </div>
  );
}
