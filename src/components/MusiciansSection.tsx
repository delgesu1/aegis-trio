import { useEffect, useRef, useState } from 'react';
import kurganovImage from '@/assets/kurganov-violin.png';
import lelchukImage from '@/assets/lelchuk-cello.jpg';
import finehouseImage from '@/assets/finehouse-piano.png';

const musicians = [
  {
    name: "Daniel Kurganov",
    instrument: "Violin",
    image: kurganovImage,
    shortBio: "A master of lyrical expression, Daniel brings profound musical sensitivity to every performance."
  },
  {
    name: "Daniel Lelchuk", 
    instrument: "Cello",
    image: lelchukImage,
    shortBio: "With his rich, resonant tone and impeccable musical instincts, Daniel anchors the trio with both power and grace."
  },
  {
    name: "Constantine Finehouse",
    instrument: "Piano", 
    image: finehouseImage,
    shortBio: "A pianist of extraordinary versatility, Constantine seamlessly weaves between accompaniment and solo voice."
  }
];

const MusiciansSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => [...prev, index]);
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section id="musicians" className="py-24" style={{ 
      background: 'linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(0 0% 8%) 50%, hsl(0 0% 4%) 100%)',
      position: 'relative'
    }}>
      {/* Background overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'hsl(0 0% 12% / 0.2)' }}></div>
      
      <div className="container mx-auto px-8 relative">
        {/* Section header */}
        <div className="max-w-4xl mb-20 fade-up">
          <h2 className="section-title mb-8">
            <span className="text-muted-foreground">The</span>
            <br />
            <span className="accent-glow italic">Artists</span>
          </h2>
          <p className="display-text text-muted-foreground font-light max-w-2xl">
            Three exceptional musicians united by their commitment to artistic transcendence
          </p>
        </div>
        
        {/* Portrait gallery */}
        <div className="portrait-grid mb-20">
          {musicians.map((musician, index) => (
            <div 
              key={musician.name} 
              ref={el => cardRefs.current[index] = el}
              className={`scale-in portrait-card group ${visibleCards.includes(index) ? 'animate' : ''} ${musician.name === 'Daniel Kurganov' ? 'kurganov-card' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <img
                src={musician.image}
                alt={musician.name}
                className="w-full h-full object-cover"
              />
              
              {/* Portrait overlay with info */}
              <div className="portrait-overlay">
                <div className="portrait-name-section">
                  <div className="text-accent text-sm uppercase tracking-wider font-medium mb-2">
                    {musician.instrument}
                  </div>
                  <h3 className="display-text text-white mb-3">
                    {musician.name}
                  </h3>
                </div>
                <div className="portrait-bio-section">
                  <p className="text-white/80 leading-relaxed">
                    {musician.shortBio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusiciansSection;