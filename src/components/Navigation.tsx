import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import flowerImage from '../assets/Flower58.png';

const navigationItems = [
  { 
    label: 'Trio', 
    href: '#trio'
  },
  { 
    label: 'Latest', 
    href: '#latest'
  },
  { 
    label: 'Live', 
    href: '#live'
  },
  { 
    label: 'About', 
    href: '#about'
  },
  { 
    label: 'Contact', 
    href: '#contact'
  },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      // Calculate offset for fixed navigation
      const navHeight = 80; // Height of fixed navigation
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
      isScrolled 
        ? 'glass-effect shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`font-display text-2xl lg:text-3xl font-bold hover:text-gold transition-all duration-300 relative ${
              isScrolled ? 'text-burgundy-rich' : 'text-white'
            }`}
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
                className={`font-display text-lg font-semibold transition-all duration-300 relative group px-3 py-2 ${
                  isScrolled 
                    ? 'text-charcoal hover:text-burgundy-rich' 
                    : 'text-white hover:text-gold'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-gold-rich to-gold transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute inset-0 bg-gold/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden p-2 transition-all duration-300 ${
              isScrolled 
                ? 'text-charcoal hover:text-burgundy' 
                : 'text-white hover:text-gold'
            }`}
            aria-label="Toggle mobile menu"
          >
            <div className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </div>
          </button>
        </div>

        {/* Luxury Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          {/* Close Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="mobile-menu-close menu-item-stagger"
            style={{ transitionDelay: '0.05s' }}
            aria-label="Close menu"
          >
            <X />
          </button>

          <div className="mobile-menu-content">
            {/* Flower Background */}
            <img 
              src={flowerImage} 
              alt="Decorative flower branch" 
              className="absolute bottom-0 right-2 object-contain opacity-60 z-1 pointer-events-none"
              style={{
                height: '50vh',
                width: 'auto',
                objectPosition: 'right bottom'
              }}
            />
            
            {/* Floating Particles */}
            <div className="floating-particle" style={{ top: '15%', zIndex: 10 }}></div>
            <div className="floating-particle" style={{ top: '35%', zIndex: 10 }}></div>
            <div className="floating-particle" style={{ top: '65%', zIndex: 10 }}></div>
            <div className="floating-particle" style={{ top: '85%', zIndex: 10 }}></div>
            
            {/* Menu Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
              {/* Menu Header */}
              <div className="menu-item-stagger mb-12" style={{ transitionDelay: '0.1s' }}>
                <div className="mobile-menu-logo">Aegis Trio</div>
              </div>

              {/* Navigation Items */}
              <div className="space-y-2 mb-12">
                {navigationItems.map((item, index) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className={`luxury-menu-item menu-item-stagger w-auto text-center block mx-auto`}
                    style={{ 
                      transitionDelay: `${0.15 + (index) * 0.05}s`,
                      padding: '1.5rem 2rem',
                      border: 'none',
                      borderRadius: '0.75rem',
                      minWidth: '280px'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Decorative Divider */}
              <div className="menu-divider menu-item-stagger mx-auto max-w-xs" style={{ transitionDelay: '0.4s' }}></div>

              {/* Footer Section */}
              <div className="menu-item-stagger mt-8" style={{ transitionDelay: '0.45s' }}>
                <div className="text-center max-w-md mx-auto">
                  <p className="font-serif text-charcoal-light text-sm italic mb-4">
                    "Music is the universal language of mankind"
                  </p>
                  <p className="font-serif text-xs text-charcoal opacity-60">
                    Follow our musical journey
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Close overlay when clicking backdrop */}
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ zIndex: -1 }}
          ></div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;