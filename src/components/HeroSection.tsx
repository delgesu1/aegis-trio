import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-performance.jpg';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      {/* Elegant Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-6 animate-fade-in">
            Aegis Trio
          </h1>
          <p className="font-serif text-xl md:text-2xl lg:text-3xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Classical Excellence in Perfect Harmony
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold/90 text-charcoal font-serif text-lg px-8 py-4 elegant-hover"
              onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Watch Performances
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-charcoal font-serif text-lg px-8 py-4 elegant-hover"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book Concert
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-elegant-float">
        <div className="flex flex-col items-center">
          <span className="font-serif text-sm mb-2">Scroll</span>
          <div className="w-0.5 h-8 bg-white opacity-60"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;