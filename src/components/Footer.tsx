import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-charcoal via-burgundy-rich to-mahogany text-cream py-16 relative overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-gold/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-burgundy/10 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="font-display text-5xl font-bold text-gold-rich mb-4">
              Aegis Trio
            </h3>
            <div className="section-divider max-w-24 mx-auto mb-6"></div>
          </div>
          
          <p className="font-serif text-xl text-cream/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Dedicated to the artistry and tradition of classical chamber music, 
            bringing timeless compositions to life with passion, precision, and unwavering excellence.
          </p>
          
          <div className="luxury-card inline-block rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 font-serif text-charcoal">
              <span>© {currentYear} Aegis Trio.</span>
              <span>Crafted with</span>
              <Heart className="w-5 h-5 text-burgundy-rich fill-current" />
              <span>for classical music.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;