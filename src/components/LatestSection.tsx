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

const LatestSection = () => {
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
    <section id="latest" className="py-32 bg-gradient-to-br from-background via-cream-warm to-cream relative overflow-hidden">
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
              <div className="boutique-event-card shimmer-border relative">
                {/* Floating accent elements */}
                <div className="floating-accent"></div>
                <div className="floating-accent"></div>
                <div className="floating-accent"></div>
                
                {/* Premium card styling */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gold/8 via-gold-muted/5 to-transparent rounded-full -translate-y-20 translate-x-20 opacity-60"></div>
                
                <div className="p-12 md:p-8 sm:p-6 relative z-10">
                  <div className="grid lg:grid-cols-12 gap-8 md:gap-6 sm:gap-4 items-center">
                    {/* Date Display */}
                    <div className="lg:col-span-3 text-left">
                      <div className="inline-flex flex-col items-start w-auto">
                        <div className="premium-date-display mb-4 shadow-2xl w-auto">
                          <div className="text-center relative z-10">
                            <p className="font-display text-5xl md:text-4xl sm:text-3xl font-bold text-gold mb-2 drop-shadow-sm">
                              {event.displayDate.split(',')[0].split(' ')[1]}
                            </p>
                            <p className="font-serif text-gold-muted text-base md:text-sm elegant-caps tracking-widest mb-1">
                              {event.displayDate.split(',')[0].split(' ')[0]}
                            </p>
                            <div className="w-8 h-0.5 bg-gold-muted mx-auto mb-2 opacity-60"></div>
                            <p className="font-serif text-cream text-sm font-light tracking-wide">
                              {event.displayDate.split(',')[1]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="lg:col-span-6">
                      <div className="mb-8">
                        <div className="inline-flex items-center gap-3 mb-6">
                          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-olive-dark to-transparent"></div>
                          <span className="font-serif text-olive-dark elegant-caps text-sm tracking-[0.2em] font-semibold">Concert</span>
                          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-olive-dark to-transparent"></div>
                        </div>
                        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-olive-dark mb-6 leading-[0.9] tracking-tight">
                          {event.program}
                        </h3>
                        <p className="font-serif text-charcoal-light text-lg md:text-xl mb-8 leading-relaxed font-light tracking-wide">
                          {event.description}
                        </p>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="flex items-center gap-4 group">
                          <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-rich rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                            <MapPin className="w-5 h-5 text-charcoal drop-shadow-sm" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-display text-xl font-bold text-charcoal tracking-tight">
                              {event.venue}
                            </span>
                            <span className="font-serif text-charcoal-light text-base tracking-wide">
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                          <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-rich rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                            <Clock className="w-5 h-5 text-charcoal drop-shadow-sm" />
                          </div>
                          <span className="font-serif text-charcoal text-xl font-semibold tracking-wide">
                            {event.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Section */}
                    <div className="lg:col-span-3 text-left lg:text-center">
                      <Button 
                        className="premium-button text-gold font-serif text-lg px-10 py-5 w-auto lg:w-full rounded-2xl font-semibold tracking-wider"
                        onClick={() => window.open(event.ticketsUrl, '_blank')}
                      >
                        <ExternalLink className="w-5 h-5 mr-3 drop-shadow-sm" />
                        Reserve Seats
                      </Button>
                      
                      <div className="mt-6 space-y-2">
                        <p className="font-serif text-charcoal/70 text-sm italic tracking-wide">
                          Limited availability
                        </p>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-muted to-transparent mx-auto opacity-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Elegant corner decoration */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-gold-muted/6 to-transparent rounded-br-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestSection;