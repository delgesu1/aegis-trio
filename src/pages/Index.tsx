import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import NewsSection from '@/components/NewsSection';
import MusiciansSection from '@/components/MusiciansSection';
import VideosSection from '@/components/VideosSection';
import AgendaSection from '@/components/AgendaSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <NewsSection />
        <AgendaSection />
        <VideosSection />
        <MusiciansSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
