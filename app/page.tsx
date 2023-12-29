import Image from 'next/image';
import IntroSection from './pages/intro';
import AboutSection from './pages/about';
import PortfolioSection from './pages/portfolio';

export default function Home() {
  return (
    <main className="bg-primary">
      <IntroSection />
      <AboutSection />
      <PortfolioSection />
      <div className='text-blue-400'></div>
    </main>
  )
}
