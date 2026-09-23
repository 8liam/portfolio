import {
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine,
} from "geist/font/pixel";

export const metadata = {
  title: "Liam Grant | Archive",
  robots: { index: false, follow: true },
};

export default function ArchiveLayout({ children }) {
  return (
    <div
      className={`${GeistPixelSquare.variable} ${GeistPixelCircle.variable} ${GeistPixelGrid.variable} ${GeistPixelLine.variable} ${GeistPixelTriangle.variable}`}
    >
      {children}
    </div>
  );
}
