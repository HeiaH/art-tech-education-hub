
import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { useMouseParallax } from '../utils/animations';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const parallax = useMouseParallax(30);
  
  // Animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll to About section
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background graphics */}
      <div 
        className="absolute inset-0 bg-gradient-radial opacity-40"
        style={{ 
          transform: `translateX(${parallax.x}px) translateY(${parallax.y}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />
      
      <div 
        className="absolute inset-0 bg-grid-pattern bg-[length:30px_30px] opacity-5"
        style={{ 
          transform: `translateX(${parallax.x * 0.5}px) translateY(${parallax.y * 0.5}px)`,
          transition: 'transform 0.1s ease-out' 
        }}
      />

      {/* Logo and content */}
      <div className="z-10 text-center px-6">
        <div className={`logo text-7xl md:text-9xl font-heading mb-6 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          He<span className="logo-i inline-block transition-transform duration-500">i</span>ǝH
        </div>
        
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-xl md:text-2xl text-white/80 font-light mb-12">
            <span className="neon-text-green">Art</span> • <span className="neon-text-blue">Technology</span> • <span className="text-white">Education</span>
          </h2>
          
          <button 
            onClick={scrollToAbout}
            className="neumorph neumorph-hover py-3 px-8 rounded-full flex items-center gap-2 mx-auto text-white/90 hover:text-white transition-all duration-300 group"
          >
            <span>Explore</span>
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
      
      {/* Decorative floating elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-heieh-neon-green/5 animate-float blur-xl"
        style={{ animationDelay: '0.5s' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-heieh-neon-blue/5 animate-float-slow blur-xl"
        style={{ animationDelay: '0s' }}
      />
    </section>
  );
};

export default Hero;
