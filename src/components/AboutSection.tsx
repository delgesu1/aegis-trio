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
      className="py-24 bg-cream relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gold"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className={`fade-in-up ${isVisible ? 'animate' : ''}`}>
            <div className="relative">
              <img 
                src={trioPortrait} 
                alt="Aegis Trio" 
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold rounded-lg -z-10"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className={`fade-in-up ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-burgundy mb-8">
              About Aegis Trio
            </h2>
            <div className="space-y-6 font-serif text-lg text-charcoal leading-relaxed">
              <p>
                Formed in the classical music capitals of Europe, Aegis Trio represents the pinnacle 
                of chamber music artistry. Our ensemble brings together three virtuosic musicians 
                united by a shared passion for excellence and innovation in classical performance.
              </p>
              <p>
                With a repertoire spanning from beloved classical masterworks to contemporary 
                compositions, we create intimate musical experiences that resonate with audiences 
                worldwide. Each performance is crafted with meticulous attention to detail and 
                an unwavering commitment to artistic integrity.
              </p>
              <p>
                Our mission extends beyond performance—we are dedicated to preserving the rich 
                tradition of chamber music while inspiring new generations of musicians and 
                music lovers alike.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;