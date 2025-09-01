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
        className="absolute inset-0 bg-cover bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: '40% 20%',
          transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
          filter: 'brightness(0.95) contrast(1.1)',
        }}
      />
      
      {/* Subtle Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
      
      {/* Top Dark Fade Overlay */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-yellow-950/65 via-yellow-950/35 to-transparent" style={{ height: '15%' }} />
      
      {/* Bottom Dark Fade Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-yellow-950/90 via-yellow-950/50 to-transparent" />
      
      {/* Aegis Trio - Responsive positioning */}
      <div className="hero-aegis absolute z-10 text-white">
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold">
            <span className="inline-block relative">
              Aegis
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gold-rich via-gold to-gold-muted"></span>
            </span>
          </div>
          <div className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-gold-muted font-light italic mt-2 md:mt-3 lg:mt-2">
            Trio
          </div>
        </div>
      </div>

      {/* Quote - Responsive positioning */}
      <div className="hero-quote absolute z-10 text-white">
        <p className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-white opacity-90 animate-fade-in leading-relaxed" style={{ animationDelay: '0.6s' }}>
          "They play with extraordinary fervor, commitment, and technical prowess"
          <span className="block text-gold-muted text-sm sm:text-base md:text-lg lg:text-xl mt-2 font-light">
            — ClassicsToday 2023
          </span>
        </p>
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