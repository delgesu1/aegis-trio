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
    <section id="news" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-burgundy mb-6">
            Latest News
          </h2>
          <div className="section-divider max-w-32 mx-auto mb-6"></div>
          <p className="font-serif text-xl text-charcoal max-w-3xl mx-auto">
            Stay updated with our recent achievements and upcoming performances
          </p>
        </div>

        <div className="space-y-8">
          {newsItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                ref={el => itemRefs.current[index] = el}
                className={`fade-in-up ${visibleItems.includes(index) ? 'animate' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-background rounded-lg shadow-lg p-8 elegant-hover">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-charcoal" />
                      </div>
                      <div className="text-left">
                        <p className="font-serif text-gold text-sm uppercase tracking-wider mb-1">
                          {item.type}
                        </p>
                        <p className="font-serif text-charcoal/70">
                          {item.date}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-burgundy mb-3">
                        {item.title}
                      </h3>
                      <p className="font-serif text-charcoal text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
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