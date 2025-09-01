import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TrioSection from '@/components/TrioSection';
import LatestSection from '@/components/LatestSection';
import LiveSection from '@/components/LiveSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <TrioSection />
        <LatestSection />
        <LiveSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
