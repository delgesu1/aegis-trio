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
        
        <div className="grid md:grid-cols-3 gap-12">
          {musicians.map((musician, index) => (
            <div
              key={musician.name}
              ref={el => cardRefs.current[index] = el}
              className={`text-center fade-in-up ${visibleCards.includes(index) ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="group elegant-hover">
                <div className="relative mb-8">
                  <img
                    src={musician.image}
                    alt={musician.name}
                    className="w-80 h-80 mx-auto object-cover rounded-full shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-burgundy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="font-display text-3xl font-bold text-burgundy mb-2">
                  {musician.name}
                </h3>
                <p className="font-serif text-gold text-xl mb-6 uppercase tracking-wider">
                  {musician.instrument}
                </p>
                <p className="font-serif text-charcoal leading-relaxed">
                  {musician.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusiciansSection;