import ArchiveHome from "./ArchiveHome";

export const metadata = {
  title: "Liam Grant | Archive",
  // the same content lives at /, so keep this copy out of the index
  robots: { index: false, follow: true },
};

export default function ArchivePage() {
  return <ArchiveHome />;
}
