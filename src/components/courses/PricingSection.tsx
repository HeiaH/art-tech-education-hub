import { useEffect, useRef, useState } from 'react';
import { Check, Zap, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { redirectToCheckout } from '@/lib/stripe';

const tiers = [
  {
    id: 'course',
    name: 'Songwriting Course',
    badge: null,
    price: '$97',
    period: 'one-time',
    description: 'The complete course. Pay once, learn forever.',
    icon: Zap,
    iconColor: 'text-heieh-neon-green',
    iconBg: 'rgba(29,185,84,0.12)',
    ctaLabel: 'Get Lifetime Access',
    ctaStyle: 'outline' as const,
    features: [
      '5 modules, 25+ video lessons',
      'Guided exercises after every lesson',
      'Downloadable worksheets',
      'Private community Discord',
      'All future course updates',
      'Access on any device, forever',
    ],
  },
  {
    id: 'membership',
    name: 'Creator Membership',
    badge: 'Most Popular',
    price: '$29',
    period: 'per month',
    description: 'Everything in the course, plus ongoing support and new content every month.',
    icon: Zap,
    iconColor: 'text-black',
    iconBg: 'rgba(29,185,84,0.9)',
    ctaLabel: 'Start Membership',
    ctaStyle: 'primary' as const,
    features: [
      'Full Songwriting Course included',
      'New lessons & content monthly',
      'Monthly live Q&A with HeiaH',
      'Feedback on your exercises',
      'Priority Discord channel',
      'Cancel anytime, no lock-in',
    ],
  },
  {
    id: 'coaching',
    name: '1:1 Coaching',
    badge: null,
    price: '$150',
    period: 'per session',
    description: 'Direct, personalized guidance on your songs and creative process.',
    icon: Calendar,
    iconColor: 'text-heieh-neon-blue',
    iconBg: 'rgba(26,115,232,0.12)',
    ctaLabel: 'Book a Session',
    ctaStyle: 'outline' as const,
    calLink: 'https://cal.com/heiah/coaching',
    features: [
      '60-minute 1:1 video session',
      'Pre-session song/project review',
      'Actionable written recap after',
      'Recording of the session',
      'Book as often as you need',
      'Session bundles available (3 or 5)',
    ],
  },
];

const PricingSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleCTA = async (tier: typeof tiers[0]) => {
    if (tier.id === 'coaching' && tier.calLink) {
      window.open(tier.calLink, '_blank', 'noopener');
      return;
    }

    setLoadingTier(tier.id);
    try {
      await redirectToCheckout(tier.id);
    } catch (err) {
      console.error('Stripe checkout error:', err);
      setLoadingTier(null);
    }
  };

  return (
    <section id="pricing" className="section-padding bg-heieh-dark" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-heieh-neon-green text-sm font-semibold uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pick your level of support.
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            No subscriptions required to get the course. No hidden fees. Start at whatever level
            fits where you are right now.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            const isFeatured = tier.id === 'membership';

            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-7 flex flex-col gap-6 transition-all duration-700 hover:-translate-y-1 ${
                  isFeatured
                    ? 'bg-heieh-gray border border-heieh-neon-green/30 shadow-[0_0_40px_rgba(29,185,84,0.1)]'
                    : 'neumorph'
                } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Popular badge */}
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-heieh-neon-green text-black text-xs font-semibold px-3 py-1">
                      {tier.badge}
                    </Badge>
                  </div>
                )}

                {/* Icon + name */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: tier.iconBg }}
                  >
                    <Icon size={18} className={tier.iconColor} />
                  </div>
                  <span className="text-white/70 font-medium text-sm">{tier.name}</span>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-white/40 text-sm pb-1">{tier.period}</span>
                  </div>
                  <p className="text-white/50 text-sm mt-2 leading-relaxed">{tier.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        size={15}
                        className={`mt-0.5 flex-shrink-0 ${
                          isFeatured ? 'text-heieh-neon-green' : 'text-white/40'
                        }`}
                      />
                      <span className="text-white/65 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  onClick={() => handleCTA(tier)}
                  disabled={loadingTier === tier.id}
                  className={
                    isFeatured
                      ? 'w-full bg-heieh-neon-green hover:bg-heieh-neon-green/90 text-black font-semibold rounded-xl py-5 transition-all hover:shadow-[0_0_20px_rgba(29,185,84,0.35)] disabled:opacity-70'
                      : 'w-full border border-white/15 text-white/80 hover:bg-white/5 rounded-xl py-5 bg-transparent disabled:opacity-70'
                  }
                >
                  {loadingTier === tier.id ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Redirecting…
                    </span>
                  ) : (
                    tier.ctaLabel
                  )}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Reassurance note */}
        <p className="text-center text-white/30 text-sm mt-10">
          Payments processed securely by Stripe. Course access is immediate after purchase.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
