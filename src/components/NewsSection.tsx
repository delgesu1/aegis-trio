import { useEffect, useRef, useState } from 'react';
import { Calendar, Award, Music } from 'lucide-react';

const newsItems = [
  {
    date: "December 2024",
    title: "Carnegie Hall Debut",
    description: "Aegis Trio makes their Carnegie Hall debut with a program featuring works by Brahms, Mendelssohn, and Dvorak.",
    icon: Music,
    type: "Performance"
  },
  {
    date: "November 2024", 
    title: "Chamber Music Award",
    description: "Recognized with the International Chamber Music Competition's Gold Medal for artistic excellence.",
    icon: Award,
    type: "Recognition"
  },
  {
    date: "October 2024",
    title: "European Tour Announcement",
    description: "Upcoming performances scheduled across Vienna, Berlin, London, and Paris throughout spring 2025.",
    icon: Calendar,
    type: "Announcement"
  }
];

const NewsSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...prev, index]);
          }
        },
        { threshold: 0.3 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section id="news" className="py-32 bg-gradient-to-br from-background via-cream-warm to-cream relative overflow-hidden">
      {/* Sophisticated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-br from-burgundy/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-gradient-to-br from-gold/15 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="font-serif text-burgundy-light elegant-caps text-sm tracking-widest">Latest Updates</span>
          </div>
          <h2 className="font-display text-6xl lg:text-8xl font-bold text-burgundy-rich mb-8">
            News &
            <span className="block text-gold-rich italic font-light">Achievements</span>
          </h2>
          <div className="section-divider max-w-40 mx-auto mb-8"></div>
          <p className="font-serif text-2xl text-charcoal-light max-w-4xl mx-auto leading-relaxed">
            Celebrating milestones and upcoming performances that define our artistic journey
          </p>
        </div>

        <div className="space-y-12">
          {newsItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                ref={el => itemRefs.current[index] = el}
                className={`fade-in-up ${visibleItems.includes(index) ? 'animate' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="luxury-card rounded-2xl p-10 boutique-hover relative overflow-hidden">
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gold/5 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
                  
                  <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
                    {/* Icon and date section */}
                    <div className="md:col-span-3 text-center md:text-left">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-burgundy-rich to-burgundy rounded-2xl mb-6 shadow-xl">
                        <IconComponent className="w-10 h-10 text-gold" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-2 mb-3">
                          <div className="w-4 h-0.5 bg-gold-rich"></div>
                          <span className="font-serif text-gold-rich elegant-caps text-xs tracking-widest font-bold">
                            {item.type}
                          </span>
                          <div className="w-4 h-0.5 bg-gold-rich"></div>
                        </div>
                        <p className="font-display text-burgundy text-xl font-bold">
                          {item.date}
                        </p>
                      </div>
                    </div>
                    
                    {/* Content section */}
                    <div className="md:col-span-9">
                      <h3 className="font-display text-4xl lg:text-5xl font-bold text-burgundy-rich mb-6 leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-serif text-charcoal-light text-xl leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative corner */}
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gold/10 to-transparent rounded-tr-3xl"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;