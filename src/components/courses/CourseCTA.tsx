import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CourseCTA = () => {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-padding bg-heieh-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Your next song is waiting.{' '}
          <span className="neon-text-green">Start writing it.</span>
        </h2>
        <p className="text-white/50 mb-10 text-lg">
          Join the course today. No monthly obligation, no upsells, no fluff.
        </p>
        <Button
          onClick={scrollToPricing}
          className="bg-heieh-neon-green hover:bg-heieh-neon-green/90 text-black font-semibold px-10 py-6 text-base rounded-full transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(29,185,84,0.45)] gap-2"
        >
          See Pricing <ArrowRight size={18} />
        </Button>
      </div>
    </section>
  );
};

export default CourseCTA;
