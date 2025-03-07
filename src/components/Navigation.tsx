
import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full glassmorphism z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-white text-2xl font-heading tracking-wide"
        >
          <span className="logo-container inline-block">
            He<span className="logo-i">i</span>ǝH
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {['about', 'artist', 'developer', 'coach', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="capitalize text-white/80 hover:text-white hover:neon-text-green transition-all duration-300 text-sm font-medium"
            >
              {t(item)}
            </button>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            <Globe size={16} className="text-white/70" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as 'en' | 'de')}
              className="bg-transparent text-white/80 hover:text-white text-sm outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="de">DE</option>
            </select>
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-white neumorph-hover p-2 rounded-lg"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden glassmorphism absolute w-full left-0 py-5 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col items-center space-y-6 py-4">
          {['about', 'artist', 'developer', 'coach', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="capitalize text-white/80 hover:text-white hover:neon-text-green transition-all duration-300 text-base font-medium"
            >
              {t(item)}
            </button>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="flex items-center space-x-3 mt-4">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded ${language === 'en' ? 'neumorph' : 'text-white/70'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('de')}
              className={`px-3 py-1 rounded ${language === 'de' ? 'neumorph' : 'text-white/70'}`}
            >
              DE
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
