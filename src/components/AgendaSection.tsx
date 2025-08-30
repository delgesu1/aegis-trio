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
    <section id="agenda" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-burgundy mb-6">
            Upcoming Concerts
          </h2>
          <div className="section-divider max-w-32 mx-auto mb-6"></div>
          <p className="font-serif text-xl text-charcoal max-w-3xl mx-auto">
            Join us for these upcoming performances across prestigious venues
          </p>
        </div>

        <div className="space-y-8">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.date}
              ref={el => eventRefs.current[index] = el}
              className={`fade-in-up ${visibleEvents.includes(index) ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-cream rounded-lg shadow-lg overflow-hidden elegant-hover">
                <div className="p-8">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    {/* Date Column */}
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy rounded-full mb-4">
                        <Calendar className="w-8 h-8 text-cream" />
                      </div>
                      <p className="font-display text-2xl font-bold text-burgundy mb-1">
                        {event.displayDate.split(',')[0].split(' ')[1]}
                      </p>
                      <p className="font-serif text-charcoal">
                        {event.displayDate.split(',')[0].split(' ')[0]} {event.displayDate.split(',')[1]}
                      </p>
                    </div>

                    {/* Event Details */}
                    <div className="md:col-span-2">
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-burgundy mb-2">
                        {event.program}
                      </h3>
                      <p className="font-serif text-charcoal mb-4">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gold" />
                          <span className="font-serif text-charcoal">
                            {event.venue}, {event.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gold" />
                          <span className="font-serif text-charcoal">
                            {event.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tickets Button */}
                    <div className="text-center md:text-right">
                      <Button 
                        className="bg-gold hover:bg-gold/90 text-charcoal font-serif"
                        onClick={() => window.open(event.ticketsUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Get Tickets
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;