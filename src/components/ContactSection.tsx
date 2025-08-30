import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-32 bg-gradient-to-br from-cream-warm via-background to-pearl relative overflow-hidden"
    >
      {/* Elegant background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-burgundy/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-gold/15 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="font-serif text-burgundy-light elegant-caps text-sm tracking-widest">Get In Touch</span>
          </div>
          <h2 className="font-display text-6xl lg:text-8xl font-bold text-burgundy-rich mb-8">
            Contact
            <span className="block text-gold-rich italic font-light">Aegis Trio</span>
          </h2>
          <div className="section-divider max-w-40 mx-auto mb-8"></div>
          <p className="font-serif text-2xl text-charcoal-light max-w-4xl mx-auto leading-relaxed">
            Begin your journey with us. Reach out for bookings, collaborations, or to learn more about our artistry.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Contact Information */}
          <div className={`lg:col-span-5 fade-in-up ${isVisible ? 'animate' : ''}`}>
            <div className="luxury-card rounded-2xl p-10 h-full relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gold/5 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
              
              <div className="relative z-10">
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-8 h-0.5 bg-burgundy-rich"></div>
                    <span className="font-serif text-burgundy-rich elegant-caps text-sm tracking-widest">Reach Us</span>
                    <div className="w-8 h-0.5 bg-burgundy-rich"></div>
                  </div>
                  <h3 className="font-display text-4xl font-bold text-burgundy-rich mb-6">
                    Let's Create Music
                    <span className="block text-gold-rich italic font-light text-3xl">Together</span>
                  </h3>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-burgundy-rich to-burgundy rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
                      <Mail className="w-8 h-8 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-burgundy-rich mb-3 text-xl">Email</h4>
                      <p className="font-serif text-charcoal-light text-lg">info@aegistrio.com</p>
                      <p className="font-serif text-charcoal-light text-lg">bookings@aegistrio.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-burgundy-rich to-burgundy rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
                      <Phone className="w-8 h-8 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-burgundy-rich mb-3 text-xl">Phone</h4>
                      <p className="font-serif text-charcoal-light text-lg">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-burgundy-rich to-burgundy rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
                      <MapPin className="w-8 h-8 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-burgundy-rich mb-3 text-xl">Management</h4>
                      <p className="font-serif text-charcoal-light text-lg">
                        Classical Artists Management<br />
                        123 Carnegie Hall Way<br />
                        New York, NY 10019
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-7 fade-in-up ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
            <div className="luxury-card rounded-2xl p-10 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-burgundy/5 to-transparent rounded-tr-2xl"></div>
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="font-display font-bold text-burgundy-rich mb-3 block text-lg">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="font-serif text-lg py-4 luxury-shadow border-gold/20 focus:border-gold"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-display font-bold text-burgundy-rich mb-3 block text-lg">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="font-serif text-lg py-4 luxury-shadow border-gold/20 focus:border-gold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="font-display font-bold text-burgundy-rich mb-3 block text-lg">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="font-serif text-lg py-4 luxury-shadow border-gold/20 focus:border-gold"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="font-display font-bold text-burgundy-rich mb-3 block text-lg">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="font-serif text-lg resize-none luxury-shadow border-gold/20 focus:border-gold"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-burgundy-rich to-burgundy hover:from-burgundy hover:to-burgundy-light text-gold font-serif text-xl py-6 boutique-hover shadow-2xl"
                >
                  <Send className="w-6 h-6 mr-3" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;