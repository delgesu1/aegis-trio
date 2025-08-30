import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h3 className="font-display text-3xl font-bold text-gold mb-4">
            Aegis Trio
          </h3>
          <p className="font-serif text-cream/80 mb-6 max-w-2xl mx-auto">
            Dedicated to the artistry and tradition of classical chamber music, 
            bringing timeless compositions to life with passion and precision.
          </p>
          
          <div className="section-divider max-w-24 mx-auto mb-6"></div>
          
          <div className="flex items-center justify-center gap-2 font-serif text-cream/60">
            <span>© {currentYear} Aegis Trio. Made with</span>
            <Heart className="w-4 h-4 text-gold fill-current" />
            <span>for classical music.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;