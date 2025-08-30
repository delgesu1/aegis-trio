import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MusiciansSection from '@/components/MusiciansSection';
import VideosSection from '@/components/VideosSection';
import NewsSection from '@/components/NewsSection';
import AgendaSection from '@/components/AgendaSection';
import PressSection from '@/components/PressSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <MusiciansSection />
        <VideosSection />
        <NewsSection />
        <AgendaSection />
        <PressSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
