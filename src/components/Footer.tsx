
import { Music, Instagram, Github, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
  // Social media links
  const socialLinks = [
    { 
      name: 'SoundCloud', 
      icon: <Music size={20} />, 
      url: 'https://soundcloud.com', 
      hoverClass: 'hover:text-heieh-neon-green' 
    },
    { 
      name: 'Instagram', 
      icon: <Instagram size={20} />, 
      url: 'https://instagram.com', 
      hoverClass: 'hover:text-heieh-neon-blue' 
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
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white/70 transition-all duration-300 ${link.hoverClass}`}
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
        
        {/* Footer links and copyright */}
        <div className="text-center">
          <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 mb-4 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Imprint</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
          </div>
          
          <div className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} HeiǝH. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
