import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const upcomingEvents = [
  {
    date: "2025-01-15",
    displayDate: "January 15, 2025",
    time: "7:30 PM",
    venue: "Lincoln Center",
    location: "New York, NY",
    program: "Brahms & Mendelssohn Evening",
    description: "An intimate evening featuring piano trios by Brahms and Mendelssohn",
    ticketsUrl: "#"
  },
  {
    date: "2025-02-08", 
    displayDate: "February 8, 2025",
    time: "8:00 PM",
    venue: "Kennedy Center",
    location: "Washington, DC", 
    program: "Dvorak & Rachmaninoff",
    description: "Romantic masterworks showcasing the trio's dynamic range",
    ticketsUrl: "#"
  },
  {
    date: "2025-03-22",
    displayDate: "March 22, 2025", 
    time: "7:00 PM",
    venue: "Symphony Hall",
    location: "Boston, MA",
    program: "Contemporary Voices",
    description: "A program featuring contemporary composers alongside classical favorites",
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
    <section id="agenda" className="py-32 bg-gradient-to-b from-charcoal-light via-charcoal to-burgundy-rich text-cream relative overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-burgundy/15 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="font-serif text-gold-muted elegant-caps text-sm tracking-widest">Upcoming</span>
          </div>
          <h2 className="font-display text-6xl lg:text-8xl font-bold text-gold-rich mb-8">
            Concert
            <span className="block text-cream font-light italic">Calendar</span>
          </h2>
          <div className="section-divider max-w-40 mx-auto mb-8"></div>
          <p className="font-serif text-2xl max-w-4xl mx-auto text-cream/90 leading-relaxed">
            Join us at these extraordinary venues for unforgettable musical experiences
          </p>
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
                    <div className="lg:col-span-3 text-center lg:text-left">
                      <div className="inline-flex flex-col items-center lg:items-start">
                        <div className="bg-burgundy-rich rounded-2xl p-6 mb-4 shadow-xl">
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
                          <div className="w-6 h-0.5 bg-burgundy-rich"></div>
                          <span className="font-serif text-burgundy-rich elegant-caps text-xs tracking-widest">Concert</span>
                          <div className="w-6 h-0.5 bg-burgundy-rich"></div>
                        </div>
                        <h3 className="font-display text-3xl lg:text-4xl font-bold text-burgundy-rich mb-4 leading-tight">
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
                        className="bg-gradient-to-r from-burgundy-rich to-burgundy hover:from-burgundy hover:to-burgundy-light text-gold font-serif text-lg px-8 py-4 boutique-hover shadow-xl w-full"
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
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-burgundy/5 to-transparent rounded-tr-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;