import { useEffect, useRef, useState } from 'react';

const videos = [
  {
    id: "tKPMMBWIf4s",
    title: "Brahms Piano Trio No. 1 in B major",
    description: "A masterful interpretation of Brahms' beloved chamber work"
  },
  {
    id: "DC2jfoZFA6A", 
    title: "Mendelssohn Piano Trio No. 1 in D minor",
    description: "Romantic virtuosity at its finest"
  }
];

const VideosSection = () => {
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
    <section id="videos" className="py-32 bg-gradient-to-b from-charcoal via-charcoal-light to-charcoal text-cream relative overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-burgundy/10 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="font-serif text-gold-muted elegant-caps text-sm tracking-widest">Featured</span>
          </div>
          <h2 className="font-display text-6xl lg:text-8xl font-bold text-gold-rich mb-8">
            Live
            <span className="block text-cream font-light italic">Performances</span>
          </h2>
          <div className="section-divider max-w-40 mx-auto mb-8"></div>
          <p className="font-serif text-2xl max-w-4xl mx-auto text-cream/90 leading-relaxed">
            Witness the artistry that has captivated audiences across the world's most prestigious venues
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={video.id}
              ref={el => videoRefs.current[index] = el}
              className={`fade-in-up ${visibleVideos.includes(index) ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="group boutique-hover">
                {/* Premium video container */}
                <div className="luxury-card rounded-2xl p-6 mb-8">
                  <div className="relative aspect-video rounded-xl overflow-hidden luxury-shadow">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                    
                    {/* Decorative frame overlay */}
                    <div className="absolute inset-0 border-2 border-gold/20 rounded-xl pointer-events-none"></div>
                  </div>
                  
                  {/* Performance details */}
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <div className="w-8 h-0.5 bg-gold"></div>
                      <span className="font-serif text-gold elegant-caps text-xs tracking-widest">Performance</span>
                      <div className="w-8 h-0.5 bg-gold"></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="font-display text-3xl lg:text-4xl font-bold text-gold-rich mb-4 leading-tight">
                    {video.title}
                  </h3>
                  <p className="font-serif text-cream/80 text-xl leading-relaxed">
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

export default VideosSection;