import { useEffect, useRef, useState } from 'react';
import trioPortrait from '@/assets/trio-portrait.jpg';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-32 bg-gradient-to-br from-cream via-background to-cream-warm relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-burgundy/5 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Image - Asymmetrical positioning */}
          <div className={`lg:col-span-7 fade-in-up ${isVisible ? 'animate' : ''}`}>
            <div className="relative">
              {/* Main image with sophisticated frame */}
              <div className="image-frame rounded-2xl overflow-hidden luxury-shadow">
                <img 
                  src={trioPortrait} 
                  alt="Aegis Trio" 
                  className="w-full h-[400px] lg:h-[600px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Decorative geometric elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 border-2 border-gold-rich rounded-full opacity-60"></div>
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-br from-burgundy/20 to-gold/20 rounded-lg rotate-12 blur-sm"></div>
              
              {/* Floating accent */}
              <div className="absolute top-1/4 -right-6 bg-luxury-card rounded-xl p-6 shadow-2xl max-w-48">
                <p className="font-display text-burgundy text-lg font-bold mb-2">Since 2018</p>
                <p className="font-serif text-charcoal text-sm">50+ Prestigious Venues</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className={`lg:col-span-5 fade-in-up ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
            <div className="lg:pl-8">
              {/* Decorative header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="section-divider w-16"></div>
                  <span className="font-serif text-gold elegant-caps text-sm tracking-widest">Our Story</span>
                </div>
                <h2 className="font-display text-5xl lg:text-7xl font-bold text-burgundy-rich leading-tight">
                  Crafting
                  <span className="block text-gold-rich italic font-light">Musical</span>
                  <span className="block">Excellence</span>
                </h2>
              </div>
              
              <div className="space-y-8 font-serif text-xl text-charcoal-light leading-relaxed">
                <p className="text-2xl text-burgundy-light font-medium border-l-4 border-gold pl-6">
                  Born from a shared vision in Europe's most prestigious conservatories, 
                  Aegis Trio has evolved into a beacon of chamber music excellence.
                </p>
                
                <p>
                  Our repertoire transcends traditional boundaries, weaving together the 
                  timeless works of Brahms and Mendelssohn with contemporary masterpieces. 
                  Each performance is an intimate journey, crafted with surgical precision 
                  and boundless artistic passion.
                </p>
                
                <p>
                  We believe in the transformative power of music—not merely as entertainment, 
                  but as a profound dialogue between artist and audience, between past and present, 
                  between the technical and the transcendent.
                </p>
                
                {/* Signature element */}
                <div className="pt-8 border-t border-gold/30">
                  <p className="font-display text-burgundy italic text-lg">
                    "Music is the universal language of the soul"
                  </p>
                  <p className="font-serif text-charcoal text-sm mt-2">— Aegis Trio Philosophy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;