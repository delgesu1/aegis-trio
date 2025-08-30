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
    <section id="videos" className="py-24 bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-gold mb-6">
            Performances
          </h2>
          <div className="section-divider max-w-32 mx-auto mb-6"></div>
          <p className="font-serif text-xl max-w-3xl mx-auto">
            Experience our artistry through these intimate chamber music performances
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={video.id}
              ref={el => videoRefs.current[index] = el}
              className={`fade-in-up ${visibleVideos.includes(index) ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="group elegant-hover">
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl mb-6">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-gold mb-3">
                  {video.title}
                </h3>
                <p className="font-serif text-cream/80 text-lg">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideosSection;