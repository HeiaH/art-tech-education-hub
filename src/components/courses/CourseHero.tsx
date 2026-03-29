import { useEffect, useState } from 'react';
import { ArrowDown, Music, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CourseHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-heieh-dark">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern bg-[length:30px_30px] opacity-5 pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/6 w-48 h-48 rounded-full bg-heieh-neon-green/8 animate-float blur-2xl" />
      <div className="absolute bottom-1/4 right-1/6 w-56 h-56 rounded-full bg-heieh-neon-blue/8 animate-float-slow blur-2xl" />

      <div className="z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full neumorph mb-8 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Music size={14} className="text-heieh-neon-green" />
          <span className="text-sm text-white/70 font-medium">Songwriting Masterclass</span>
          <Sparkles size={14} className="text-heieh-neon-blue" />
        </div>

        {/* Headline */}
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-150 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Write songs that{' '}
          <span className="neon-text-green">actually</span>{' '}
          <span className="neon-text-blue">move people.</span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          A structured, step-by-step course — from blank page to finished song — built by an
          artist who has done it. At your pace, forever.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button
            onClick={() => scrollTo('pricing')}
            className="bg-heieh-neon-green hover:bg-heieh-neon-green/90 text-black font-semibold px-8 py-6 text-base rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(29,185,84,0.4)]"
          >
            See Pricing
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollTo('curriculum')}
            className="border-white/20 text-white/80 hover:bg-white/5 px-8 py-6 text-base rounded-full"
          >
            View Curriculum
          </Button>
        </div>

        {/* Scroll hint */}
        <button
          onClick={() => scrollTo('features')}
          className={`mt-16 flex flex-col items-center gap-2 mx-auto text-white/30 hover:text-white/60 transition-all duration-300 group ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
};

export default CourseHero;
