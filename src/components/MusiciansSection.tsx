import { useEffect, useRef, useState } from 'react';
import kurganovImage from '@/assets/kurganov-violin.jpg';
import lelchukImage from '@/assets/lelchuk-cello.jpg';
import finehouseImage from '@/assets/finehouse-piano.jpg';

const musicians = [
  {
    name: "Daniel Kurganov",
    instrument: "Violin",
    image: kurganovImage,
    bio: "A virtuoso violinist with international acclaim, Daniel brings passionate artistry and technical precision to every performance. Trained at the world's most prestigious conservatories, he has graced stages from Carnegie Hall to the Vienna Musikverein."
  },
  {
    name: "Daniel Lelchuk", 
    instrument: "Cello",
    image: lelchukImage,
    bio: "Daniel's profound musical sensitivity and rich, warm tone have captivated audiences across continents. His interpretations combine deep scholarly understanding with intuitive musicality, creating performances that are both intellectually satisfying and emotionally moving."
  },
  {
    name: "Constantine Finehouse",
    instrument: "Piano", 
    image: finehouseImage,
    bio: "A pianist of extraordinary versatility and depth, Constantine anchors the trio with his sophisticated harmonic understanding and remarkable collaborative instincts. His performances are marked by elegance, power, and an unwavering sense of musical architecture."
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
    <section id="musicians" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-burgundy mb-6">
            The Artists
          </h2>
          <div className="section-divider max-w-32 mx-auto mb-6"></div>
          <p className="font-serif text-xl text-charcoal max-w-3xl mx-auto">
            Three exceptional musicians united by artistic vision and musical excellence
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {musicians.map((musician, index) => (
            <div
              key={musician.name}
              ref={el => cardRefs.current[index] = el}
              className={`fade-in-up ${visibleCards.includes(index) ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="group boutique-hover luxury-card rounded-3xl p-8 text-center relative overflow-hidden">
                {/* Decorative background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className="relative z-10">
                  <div className="relative mb-10">
                    {/* Portrait with elegant frame */}
                    <div className="relative inline-block">
                      <div className="image-frame rounded-2xl overflow-hidden w-64 h-80 mx-auto">
                        <img
                          src={musician.image}
                          alt={musician.name}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                        />
                      </div>
                      
                      {/* Instrument badge */}
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-burgundy-rich text-gold px-6 py-3 rounded-full shadow-xl">
                          <p className="font-serif elegant-caps text-sm font-bold tracking-wider">
                            {musician.instrument}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="font-display text-4xl font-bold text-burgundy-rich">
                      {musician.name}
                    </h3>
                    
                    <div className="section-divider w-20 mx-auto"></div>
                    
                    <p className="font-serif text-charcoal-light leading-relaxed text-lg">
                      {musician.bio}
                    </p>
                  </div>
                </div>
                
                {/* Subtle corner accent */}
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-gold/5 to-transparent rounded-tr-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusiciansSection;