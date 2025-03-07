
import { Music, Instagram, Github, Linkedin, ArrowUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { Icon } from '@iconify/react';

const Footer = () => {
  const { t, language } = useLanguage();
  
  // Main social media links
  const mainSocialLinks = [
    { 
      name: 'SoundCloud', 
      icon: <Music size={20} />, 
      url: 'https://soundcloud.com/heiahmusic', 
      hoverClass: 'hover:text-heieh-neon-green' 
    },
    { 
      name: 'TikTok', 
      icon: <Icon icon="logos:tiktok-icon" width="20" height="20" />, 
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

  // Instagram accounts
  const instagramAccounts = [
    { 
      name: 'Instagram', 
      description: t('instagramMusic'), 
      url: 'https://instagram.com/heiah.music', 
      hoverClass: 'hover:text-heieh-neon-blue' 
    },
    { 
      name: 'Instagram', 
      description: t('instagramPhotography'), 
      url: 'https://instagram.com/shot.heiah', 
      hoverClass: 'hover:text-white' 
    },
    { 
      name: 'Instagram', 
      description: t('instagramEducation'), 
      url: 'https://instagram.com/musiclevers', 
      hoverClass: 'hover:text-heieh-neon-blue' 
    },
  ];

  // Teacher platform links
  const teacherLinks = [
    {
      name: 'Check24 Profis',
      url: 'https://unterricht.check24.de/musik/profil/sp_OVa9j',
      hoverClass: 'hover:text-heieh-neon-green'
    },
    {
      name: 'Superprof',
      url: 'https://www.superprof.de/musikunterricht-gitarre-individuell-flexibel-und-mit-spass-egal-anfanger-oder-fortgeschritten-entdecke-deinen-sound.html',
      hoverClass: 'hover:text-heieh-neon-blue'
    }
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Main Social Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-white mb-4 text-lg">{t('socialMedia')}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {mainSocialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/70 transition-all duration-300 ${link.hoverClass} neumorph p-2 rounded-full`}
                  aria-label={link.name}
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Instagram Accounts */}
          <div className="flex flex-col items-center">
            <h3 className="text-white mb-4 text-lg">Instagram</h3>
            <div className="flex flex-col gap-3">
              {instagramAccounts.map((account, index) => (
                <a
                  key={index}
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/70 transition-all duration-300 ${account.hoverClass} flex items-center gap-2 neumorph px-3 py-2 rounded-lg`}
                  aria-label={`${account.name} - ${account.description}`}
                  title={`${account.name} - ${account.description}`}
                >
                  <Instagram size={20} />
                  <span>{account.description}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Teaching Platforms */}
          <div className="flex flex-col items-center">
            <h3 className="text-white mb-4 text-lg">{t('teachingPlatforms')}</h3>
            <div className="flex flex-col gap-3">
              {teacherLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/70 transition-all duration-300 ${link.hoverClass} neumorph px-3 py-2 rounded-lg`}
                  aria-label={link.name}
                  title={link.name}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
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
