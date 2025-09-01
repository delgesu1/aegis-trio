import { useEffect, useRef, useState } from 'react';

const videos = [
  {
    id: "tKPMMBWIf4s",
    title: "Shostakovich Piano Trio No. 2",
    description: "Amherst College, Center for Russian Culture, 2024"
  },
  {
    id: "DC2jfoZFA6A", 
    title: "Beethoven Piano Trio Op. 1 No. 1",
    description: "Frederick Historical Piano Collection, 2025"
  }
];

const LiveSection = () => {
  const [visibleVideos, setVisibleVideos] = useState<number[]>([]);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = videoRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleVideos(prev => [...prev, index]);
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
    <section id="live" className="py-32 bg-gradient-to-br from-olive-dark via-olive-medium to-olive-dark text-cream relative overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/6 w-80 h-80 bg-gradient-to-br from-gold/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-gradient-to-br from-pearl/8 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <h2 className="font-display text-6xl lg:text-8xl text-cream font-light italic mb-8">
            Live
          </h2>
          <div className="section-divider max-w-40 mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={video.id}
              ref={el => videoRefs.current[index] = el}
              className={`fade-in-up ${visibleVideos.includes(index) ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="group">
                {/* Premium video container */}
                <div className="luxury-card rounded-2xl p-6 mb-8 transition-all duration-700 ease-out group-hover:shadow-2xl group-hover:shadow-gold/20 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                  <div className="relative aspect-video rounded-xl overflow-hidden luxury-shadow">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&showinfo=0&controls=1&fs=0&iv_load_policy=3&cc_load_policy=0&disablekb=1&color=white&theme=dark&playsinline=1&widget_referrer=&origin=${window.location.origin}&title=0&byline=0&portrait=0`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      style={{ border: 'none' }}
                    ></iframe>
                    
                    {/* Decorative frame overlay */}
                    <div className="absolute inset-0 border border-gold-muted/25 rounded-xl pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="font-display text-3xl lg:text-4xl font-bold text-gold-rich mb-4 leading-tight">
                    {video.title}
                  </h3>
                  <p className="font-serif text-cream/70 text-xl leading-relaxed">
                    {video.description}
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

export default LiveSection;