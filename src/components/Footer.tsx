
import { Music, Instagram, Github, Linkedin, ArrowUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Footer = () => {
  const { t } = useLanguage();
  
  // Social media links
  const socialLinks = [
    { 
      name: 'SoundCloud', 
      icon: <Music size={20} />, 
      url: 'https://soundcloud.com/heiahmusic', 
      hoverClass: 'hover:text-heieh-neon-green' 
    },
    { 
      name: 'Instagram Music', 
      icon: <Instagram size={20} />, 
      url: 'https://instagram.com/heiah.music', 
      hoverClass: 'hover:text-heieh-neon-blue' 
    },
    { 
      name: 'Instagram Photography', 
      icon: <Instagram size={20} />, 
      url: 'https://instagram.com/shot.heiah', 
      hoverClass: 'hover:text-white' 
    },
    { 
      name: 'Instagram Education', 
      icon: <Instagram size={20} />, 
      url: 'https://instagram.com/musiclevers', 
      hoverClass: 'hover:text-heieh-neon-blue' 
    },
    { 
      name: 'TikTok', 
      icon: <Music size={20} />, // Replacing TikTok with Music icon as fallback
      url: 'https://tiktok.com/@heiah.music', 
      hoverClass: 'hover:text-heieh-neon-green' 
    },
    { 
      name: 'GitHub', 
      icon: <Github size={20} />, 
      url: 'https://github.com', 
      hoverClass: 'hover:text-white' 
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin size={20} />, 
      url: 'https://linkedin.com', 
      hoverClass: 'hover:text-heieh-neon-blue' 
    },
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 glassmorphism">
      <div className="container mx-auto px-6">
        {/* Back to top button */}
        <div className="flex justify-center mb-8">
          <button 
            onClick={scrollToTop}
            className="neumorph neumorph-hover p-3 rounded-full transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white/70 transition-all duration-300 ${link.hoverClass}`}
              aria-label={link.name}
              title={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
        
        {/* Footer links and copyright */}
        <div className="text-center">
          <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 mb-4 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors duration-300">{t('privacy')}</a>
            <a href="#" className="hover:text-white transition-colors duration-300">{t('imprint')}</a>
            <a href="#" className="hover:text-white transition-colors duration-300">{t('terms')}</a>
          </div>
          
          <div className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} HeiǝH. {t('allRightsReserved')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
