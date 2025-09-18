import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalContent = submitButton?.innerHTML;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<svg class="w-6 h-6 mr-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Sending...';
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully!', {
          description: 'We\'ll get back to you soon.'
        });
        form.reset();
      } else {
        toast.error('Failed to send message', {
          description: 'Please try again later.'
        });
      }
    } catch (error) {
      toast.error('An error occurred', {
        description: 'Please check your connection and try again.'
      });
    } finally {
      // Restore button state
      if (submitButton && originalContent) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalContent;
      }
    }
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
          <h2 className="font-display text-6xl lg:text-8xl font-bold text-burgundy-rich mb-8">
            Contact
            <span className="block text-gold-rich italic font-light">Aegis Trio</span>
          </h2>
          <div className="section-divider max-w-40 mx-auto mb-8"></div>
          <p className="font-serif text-2xl text-charcoal-light max-w-4xl mx-auto leading-relaxed">
            We welcome inquiries about collaborations, concert bookings, and educational projects.<br />
            We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Form */}
          <div className={`fade-in-up ${isVisible ? 'animate' : ''}`}>
            <div className="rounded-2xl p-10 relative overflow-hidden">
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                {/* Hidden Web3Forms configuration fields */}
                <input type="hidden" name="access_key" value="7d4b8ad1-28fc-484d-a469-bdb2ab71db11" />
                <input type="hidden" name="from_name" value="Aegis Trio Website" />
                <input type="hidden" name="subject" value="New message from Aegis Trio website" />

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="font-display font-bold text-burgundy-rich mb-3 block text-lg">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="font-serif text-lg py-4 border border-gold/20 focus:border-gold bg-white/60"
                      style={{ boxShadow: '0 4px 12px hsla(38, 95%, 45%, 0.15)' }}
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
                      placeholder="your@email.com"
                      className="font-serif text-lg py-4 border border-gold/20 focus:border-gold bg-white/60"
                      style={{ boxShadow: '0 4px 12px hsla(38, 95%, 45%, 0.15)' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="font-display font-bold text-burgundy-rich mb-3 block text-lg">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell us about your project, concert booking, or collaboration ideas..."
                    className="font-serif text-lg resize-none border border-gold/20 focus:border-gold bg-white/60"
                    style={{ boxShadow: '0 4px 12px hsla(38, 95%, 45%, 0.15)' }}
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-burgundy-rich to-burgundy hover:from-burgundy hover:to-burgundy-light text-gold font-serif text-xl py-6"
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