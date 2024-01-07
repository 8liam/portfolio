import Image from "next/image";
import IntroSection from "./pages/intro";
import AboutSection from "./pages/about";
import PortfolioSection from "./pages/portfolio";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="bg-primary">
      <IntroSection />
      <AboutSection />
      <PortfolioSection />
      <Footer />
    </main>
  );
}
