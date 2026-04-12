
import { useState, useEffect } from 'react';
import { Menu, X, Globe, LogOut, LayoutDashboard, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();

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
          <div className="logo-container">
            <span className="logo">HeiaH</span>
          </div>
        </a>

        {/* Language Switcher - Always visible on small screens */}
        <div className="md:hidden flex items-center mr-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
            className="neumorph px-2 py-1 rounded-lg flex items-center gap-1"
          >
            <Globe size={16} className="text-white/70" />
            <span>{language === 'en' ? 'DE' : 'EN'}</span>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {['about', 'artist', 'coach', 'developer', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="capitalize text-white/80 hover:text-white hover:neon-text-green transition-all duration-300 text-sm font-medium neumorph-hover px-4 py-2 rounded-lg"
            >
              {t(item)}
            </button>
          ))}

          {/* Auth buttons */}
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-heieh-neon-green hover:text-heieh-neon-green/80 transition-all duration-300 text-sm font-medium neumorph px-4 py-2 rounded-lg"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                onClick={signOut}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300 text-sm font-medium neumorph-hover px-4 py-2 rounded-lg"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 text-heieh-neon-green hover:text-heieh-neon-green/80 transition-all duration-300 text-sm font-medium neumorph px-4 py-2 rounded-lg"
            >
              <LogIn size={16} />
              Login
            </Link>
          )}

          {/* Language Switcher */}
          <div className="flex items-center space-x-2 neumorph px-3 py-2 rounded-lg">
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
          className="md:hidden text-white neumorph neumorph-hover p-2 rounded-lg"
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
          {['about', 'artist', 'coach', 'developer', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="capitalize text-white/80 hover:text-white hover:neon-text-green transition-all duration-300 text-base font-medium neumorph px-4 py-2 rounded-lg"
            >
              {t(item)}
            </button>
          ))}

          {/* Auth buttons - Mobile */}
          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-heieh-neon-green hover:text-heieh-neon-green/80 transition-all duration-300 text-base font-medium neumorph px-4 py-2 rounded-lg"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                onClick={() => { signOut(); setIsMenuOpen(false); }}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300 text-base font-medium neumorph px-4 py-2 rounded-lg"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-heieh-neon-green hover:text-heieh-neon-green/80 transition-all duration-300 text-base font-medium neumorph px-4 py-2 rounded-lg"
            >
              <LogIn size={16} />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
