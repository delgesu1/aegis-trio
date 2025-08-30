import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navigationItems = [
  { label: 'About', href: '#about' },
  { label: 'Musicians', href: '#musicians' },
  { label: 'Performances', href: '#videos' },
  { label: 'News', href: '#news' },
  { label: 'Concerts', href: '#agenda' },
  { label: 'Press', href: '#press' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-effect shadow-2xl border-b border-gold/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-2xl lg:text-3xl font-bold text-burgundy-rich hover:text-gold transition-all duration-300 relative"
          >
            <span className="relative z-10">Aegis Trio</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 hover:w-full"></span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="font-serif text-charcoal hover:text-burgundy-rich transition-all duration-300 relative group px-2 py-1"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-gold-rich to-gold transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute inset-0 bg-gold/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-charcoal hover:text-burgundy transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass-effect border-b border-gold/20 shadow-2xl">
            <div className="px-6 py-6 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left font-serif text-charcoal hover:text-burgundy-rich transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gold/10 relative group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-4"></span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;