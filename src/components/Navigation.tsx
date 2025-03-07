
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <span className="logo">
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
              {item}
            </button>
          ))}
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
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
