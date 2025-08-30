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
    <section id="press" className="py-24 bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-gold mb-6">
            Press & Reviews
          </h2>
          <div className="section-divider max-w-32 mx-auto mb-6"></div>
          <p className="font-serif text-xl max-w-3xl mx-auto">
            What critics and audiences are saying about our performances
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              ref={el => reviewRefs.current[index] = el}
              className={`fade-in-up ${visibleReviews.includes(index) ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-background/5 backdrop-blur-sm rounded-lg p-8 elegant-hover h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-6 h-6 text-charcoal" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="w-5 h-5 text-gold fill-current" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="font-serif text-lg leading-relaxed mb-6 italic">
                  "{review.quote}"
                </blockquote>
                
                <div className="border-t border-gold/20 pt-4">
                  <p className="font-display text-gold font-bold">
                    {review.source}
                  </p>
                  <p className="font-serif text-cream/70 text-sm">
                    {review.author}
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

export default PressSection;