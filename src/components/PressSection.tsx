import { useEffect, useRef, useState } from 'react';
import { Quote, Star } from 'lucide-react';

const reviews = [
  {
    quote: "Aegis Trio delivers performances of extraordinary depth and refinement. Their interpretation of Brahms was nothing short of transcendent.",
    source: "The New York Times",
    author: "Classical Music Critic",
    rating: 5
  },
  {
    quote: "A masterclass in chamber music collaboration. Each musician shines individually while contributing to a cohesive, breathtaking whole.",
    source: "Musical America", 
    author: "Senior Editor",
    rating: 5
  },
  {
    quote: "The technical precision and emotional intelligence displayed by Aegis Trio places them among the finest chamber ensembles of our time.",
    source: "Gramophone Magazine",
    author: "Chief Music Critic", 
    rating: 5
  },
  {
    quote: "Their Carnegie Hall debut was a triumph—sophisticated artistry combined with passionate musicianship that left the audience spellbound.",
    source: "The Washington Post",
    author: "Arts Correspondent",
    rating: 5
  }
];

const PressSection = () => {
  const [visibleReviews, setVisibleReviews] = useState<number[]>([]);
  const reviewRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = reviewRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleReviews(prev => [...prev, index]);
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
    <section id="press" className="py-32 bg-gradient-to-br from-charcoal via-mahogany to-burgundy-rich text-cream relative overflow-hidden">
      {/* Sophisticated background elements */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-gradient-to-br from-gold/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-br from-burgundy/10 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="font-serif text-gold-muted elegant-caps text-sm tracking-widest">Critical Acclaim</span>
          </div>
          <h2 className="font-display text-6xl lg:text-8xl font-bold text-gold-rich mb-8">
            Press &
            <span className="block text-cream font-light italic">Reviews</span>
          </h2>
          <div className="section-divider max-w-40 mx-auto mb-8"></div>
          <p className="font-serif text-2xl max-w-4xl mx-auto text-cream/90 leading-relaxed">
            Testimonials from the world's most respected music critics and publications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              ref={el => reviewRefs.current[index] = el}
              className={`fade-in-up ${visibleReviews.includes(index) ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="luxury-card bg-cream-warm/95 backdrop-blur-sm rounded-2xl p-10 boutique-hover h-full relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/8 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header with quote icon and stars */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-burgundy-rich to-burgundy rounded-2xl flex items-center justify-center shadow-xl">
                      <Quote className="w-8 h-8 text-gold" />
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, starIndex) => (
                        <Star key={starIndex} className="w-6 h-6 text-gold fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="font-serif text-xl text-charcoal leading-relaxed mb-8 italic flex-grow">
                    "{review.quote}"
                  </blockquote>
                  
                  {/* Attribution */}
                  <div className="border-t border-gold/20 pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full"></div>
                      <div>
                        <p className="font-display text-burgundy-rich font-bold text-xl">
                          {review.source}
                        </p>
                        <p className="font-serif text-charcoal/70 text-sm mt-1">
                          {review.author}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Corner decoration */}
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-burgundy/5 to-transparent rounded-tr-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;