import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const upcomingEvents = [
  {
    date: "2025-10-19",
    displayDate: "October 19, 2025",
    time: "2:30 PM",
    venue: "Amherst College",
    location: "Amherst, MA",
    program: "Rachmaninoff Trio élégiaque No. 2",
    description: "Memorial Concert at Amherst College",
    ticketsUrl: "#"
  }
];

const AgendaSection = () => {
  const [visibleEvents, setVisibleEvents] = useState<number[]>([]);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = eventRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleEvents(prev => [...prev, index]);
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
    <section id="agenda" className="py-32 bg-gradient-to-br from-background via-cream-warm to-cream relative overflow-hidden">
      {/* Sophisticated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-br from-olive-dark/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-gradient-to-br from-gold/15 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <h2 className="font-display text-6xl lg:text-8xl font-bold text-olive-dark mb-8 italic">
            Latest
          </h2>
          <div className="section-divider max-w-40 mx-auto mb-8"></div>
        </div>

        <div className="space-y-12">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.date}
              ref={el => eventRefs.current[index] = el}
              className={`fade-in-up ${visibleEvents.includes(index) ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="luxury-card bg-cream/95 backdrop-blur-sm rounded-2xl overflow-hidden boutique-hover relative">
                {/* Premium card styling */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className="p-10 relative z-10">
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    {/* Date Display */}
                    <div className="lg:col-span-3 text-left">
                      <div className="inline-flex flex-col items-start">
                        <div className="bg-olive-dark rounded-2xl p-6 mb-4 shadow-xl">
                          <div className="text-center">
                            <p className="font-display text-4xl font-bold text-gold mb-1">
                              {event.displayDate.split(',')[0].split(' ')[1]}
                            </p>
                            <p className="font-serif text-gold-muted text-sm elegant-caps tracking-wider">
                              {event.displayDate.split(',')[0].split(' ')[0]}
                            </p>
                            <p className="font-serif text-cream text-xs mt-1">
                              {event.displayDate.split(',')[1]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="lg:col-span-6">
                      <div className="mb-6">
                        <div className="inline-flex items-center gap-2 mb-4">
                          <div className="w-6 h-0.5 bg-olive-dark"></div>
                          <span className="font-serif text-olive-dark elegant-caps text-xs tracking-widest">Concert</span>
                          <div className="w-6 h-0.5 bg-olive-dark"></div>
                        </div>
                        <h3 className="font-display text-3xl lg:text-4xl font-bold text-olive-dark mb-4 leading-tight">
                          {event.program}
                        </h3>
                        <p className="font-serif text-charcoal-light text-lg mb-6 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-charcoal" />
                          </div>
                          <span className="font-serif text-charcoal text-lg">
                            <strong>{event.venue}</strong>, {event.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                            <Clock className="w-4 h-4 text-charcoal" />
                          </div>
                          <span className="font-serif text-charcoal text-lg">
                            {event.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Section */}
                    <div className="lg:col-span-3 text-center">
                      <Button 
                        className="bg-gradient-to-r from-olive-dark to-olive-medium hover:from-olive-medium hover:to-olive-dark text-gold font-serif text-lg px-8 py-4 boutique-hover shadow-xl w-full transition-all duration-500 ease-out"
                        onClick={() => window.open(event.ticketsUrl, '_blank')}
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Reserve Seats
                      </Button>
                      
                      <p className="font-serif text-charcoal/60 text-sm mt-3 italic">
                        Limited availability
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Elegant corner decoration */}
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-olive-dark/5 to-transparent rounded-tr-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;