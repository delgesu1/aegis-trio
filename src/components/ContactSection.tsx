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
      className="py-24 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-burgundy mb-6">
            Contact Us
          </h2>
          <div className="section-divider max-w-32 mx-auto mb-6"></div>
          <p className="font-serif text-xl text-charcoal max-w-3xl mx-auto">
            We would love to hear from you. Get in touch for bookings, collaborations, or general inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className={`fade-in-up ${isVisible ? 'animate' : ''}`}>
            <h3 className="font-display text-3xl font-bold text-burgundy mb-8">
              Get in Touch
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-charcoal" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-charcoal mb-1">Email</h4>
                  <p className="font-serif text-charcoal">info@aegistrio.com</p>
                  <p className="font-serif text-charcoal">bookings@aegistrio.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-charcoal" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-charcoal mb-1">Phone</h4>
                  <p className="font-serif text-charcoal">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-charcoal" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-charcoal mb-1">Management</h4>
                  <p className="font-serif text-charcoal">
                    Classical Artists Management<br />
                    123 Carnegie Hall Way<br />
                    New York, NY 10019
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`fade-in-up ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="font-serif font-bold text-charcoal mb-2 block">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="font-serif"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="font-serif font-bold text-charcoal mb-2 block">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="font-serif"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="font-serif font-bold text-charcoal mb-2 block">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  className="font-serif"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="font-serif font-bold text-charcoal mb-2 block">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="font-serif resize-none"
                  required
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full bg-burgundy hover:bg-burgundy/90 text-cream font-serif text-lg elegant-hover"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;