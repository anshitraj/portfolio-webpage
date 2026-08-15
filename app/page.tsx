import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { Hero } from '@/components/official/Hero';
import { CurrentlyBuilding } from '@/components/official/CurrentlyBuilding';
import { FeaturedWork } from '@/components/official/FeaturedWork';
import { MoreWork } from '@/components/official/MoreWork';
import { Numbers } from '@/components/official/Numbers';
import { Experience } from '@/components/official/Experience';
import { Testimonials } from '@/components/official/Testimonials';
import { About } from '@/components/official/About';
import { Achievements } from '@/components/official/Achievements';
import { CredibilitySignals } from '@/components/official/CredibilitySignals';
import { BuildLogPreview } from '@/components/official/BuildLogPreview';
import { OpenSource } from '@/components/official/OpenSource';
import { TechStack } from '@/components/official/TechStack';
import { Writing } from '@/components/official/Writing';
import { Resume } from '@/components/official/Resume';
import { Contact } from '@/components/official/Contact';

export default function OfficialPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <CurrentlyBuilding />
        <FeaturedWork />
        <Experience />
        <Testimonials />
        <Numbers />
        <CredibilitySignals />
        <Achievements />
        <MoreWork />
        <OpenSource />
        <TechStack />
        <BuildLogPreview />
        <Writing />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
