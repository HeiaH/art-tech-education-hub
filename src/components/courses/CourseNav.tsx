import { useState, useEffect } from 'react';
import { Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const CourseNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glassmorphism' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-heieh-neon-green/15 flex items-center justify-center">
            <Music size={16} className="text-heieh-neon-green" />
          </div>
          <span className="text-white font-semibold text-sm">
            HeiaH <span className="text-white/40 font-normal">/ Learn</span>
          </span>
        </Link>

        {/* Links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-white/50 hover:text-white text-sm transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <Button
          onClick={() => scrollTo('#pricing')}
          className="bg-heieh-neon-green hover:bg-heieh-neon-green/90 text-black text-sm font-semibold px-5 py-2 rounded-full h-9"
        >
          Enroll Now
        </Button>
      </div>
    </nav>
  );
};

export default CourseNav;
