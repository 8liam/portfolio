import type { Metadata } from "next";

import { NotFoundView } from "@/src/components/not-found-view/not-found-view.component";

export const metadata: Metadata = {
  title: "404 | Liam Grant",
};

export default function NotFound() {
  return <NotFoundView />;
}
