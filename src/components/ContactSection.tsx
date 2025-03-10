import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Send, User, Mail, MessageSquare } from 'lucide-react';
import { useRevealAnimation } from '../utils/animations';
import { useLanguage } from '../hooks/useLanguage';

const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useRevealAnimation();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Open default email client with pre-filled email
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:lucien.kreiser@gmail.com?subject=${subject}&body=${body}`;
    
    // Show success message
    toast({
      title: t('messageSent'),
      description: t('thankYouMessage'),
    });
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section 
      id="contact" 
      className="section-padding py-24"
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <span className="px-3 py-1 rounded-full bg-heieh-gray text-xs uppercase tracking-wider text-white/70 inline-block mb-3">
            {t('contact')}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading mb-2">{t('getInTouch')}</h2>
          <p className="text-white/70 max-w-xl mx-auto">
            {t('contactDescription')}
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <form 
            onSubmit={handleSubmit}
            className={`neumorph p-8 rounded-2xl ${
              sectionVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <div className="mb-6">
              <label htmlFor="name" className="flex items-center gap-2 text-white/80 mb-2">
                <User size={16} />
                <span>{t('yourName')}</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-heieh-gray border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:neon-border neumorph"
                placeholder={t('namePlaceholder')}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="flex items-center gap-2 text-white/80 mb-2">
                <Mail size={16} />
                <span>{t('emailAddress')}</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-heieh-gray border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:neon-border neumorph"
                placeholder={t('emailPlaceholder')}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="flex items-center gap-2 text-white/80 mb-2">
                <MessageSquare size={16} />
                <span>{t('yourMessage')}</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-heieh-gray border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:neon-border resize-none neumorph"
                placeholder={t('messagePlaceholder')}
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-heieh-neon-green/20 hover:bg-heieh-neon-green/30 text-heieh-neon-green rounded-lg flex justify-center items-center gap-2 transition-all duration-300 neumorph neumorph-hover"
            >
              {isSubmitting ? (
                <>{t('processing')}<span className="animate-pulse">...</span></>
              ) : (
                <>
                  <span>{t('sendMessage')}</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
          
          {/* Thank you message */}
          <div className={`text-center mt-8 text-white/70 ${
            sectionVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '300ms' }}>
            {t('lookForward')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
