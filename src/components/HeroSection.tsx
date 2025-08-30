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
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
          filter: 'brightness(0.8) contrast(1.1)',
        }}
      />
      
      {/* Layered Overlays */}
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-burgundy/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-5xl mx-auto px-6">
          {/* Decorative top element */}
          <div className="mb-8 animate-fade-in">
            <div className="w-24 h-0.5 bg-gold mx-auto mb-4"></div>
            <p className="font-serif text-gold elegant-caps text-sm tracking-widest">
              Est. Chamber Music Excellence
            </p>
          </div>
          
          <h1 className="font-display text-7xl md:text-9xl lg:text-[12rem] font-bold mb-8 animate-fade-in leading-none" style={{ animationDelay: '0.2s' }}>
            <span className="inline-block relative">
              Aegis
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gold-rich via-gold to-gold-muted"></span>
            </span>
            <br />
            <span className="text-6xl md:text-8xl lg:text-9xl text-gold-muted font-light italic">Trio</span>
          </h1>
          
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl mb-12 opacity-90 animate-fade-in max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: '0.4s' }}>
            Where Classical Tradition Meets 
            <em className="text-gold-muted"> Artistic Innovation</em>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-gold-rich to-gold hover:from-gold hover:to-gold-muted text-charcoal font-serif text-lg px-10 py-5 boutique-hover shadow-2xl border border-gold/20"
              onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Experience Performances
            </Button>
            <Button 
              size="lg" 
              className="glass-effect border-gold/30 text-white hover:bg-gold/10 font-serif text-lg px-10 py-5 boutique-hover shadow-2xl"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Private Bookings
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