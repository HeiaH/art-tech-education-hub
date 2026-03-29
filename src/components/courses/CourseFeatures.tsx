import { useEffect, useRef, useState } from 'react';
import { Mic2, Layers, Target, Repeat, Users, Infinity } from 'lucide-react';

const features = [
  {
    icon: Mic2,
    color: 'text-heieh-neon-green',
    glow: 'rgba(29,185,84,0.15)',
    title: 'Real Craft, Not Theory',
    description:
      'Every lesson is built around what actually works in the room — chord frameworks, lyric structures, melodic hooks.',
  },
  {
    icon: Layers,
    color: 'text-heieh-neon-blue',
    glow: 'rgba(26,115,232,0.15)',
    title: 'Structured Curriculum',
    description:
      '5 modules, 25+ lessons progressing from song architecture through production-ready demos.',
  },
  {
    icon: Target,
    color: 'text-heieh-neon-green',
    glow: 'rgba(29,185,84,0.15)',
    title: 'Guided Exercises',
    description:
      'Each lesson ends with a focused exercise so you apply what you learn immediately — not six months from now.',
  },
  {
    icon: Repeat,
    color: 'text-heieh-neon-blue',
    glow: 'rgba(26,115,232,0.15)',
    title: 'Lifetime Access',
    description:
      'Buy once. The course and any future updates to it are yours forever, on any device.',
  },
  {
    icon: Users,
    color: 'text-heieh-neon-green',
    glow: 'rgba(29,185,84,0.15)',
    title: 'Community Included',
    description:
      'Access the private Discord with fellow students and direct feedback from the instructor on your exercises.',
  },
  {
    icon: Infinity,
    color: 'text-heieh-neon-blue',
    glow: 'rgba(26,115,232,0.15)',
    title: 'Zero Fluff',
    description:
      'No padding, no filler. Every minute earns its place. Average lesson runtime: 12 minutes.',
  },
];

const CourseFeatures = () => {
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

  return (
    <section id="features" className="section-padding bg-heieh-dark" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-heieh-neon-green text-sm font-semibold uppercase tracking-widest mb-3">
            What you get
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Everything you need. Nothing you don&apos;t.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`neumorph rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: feature.glow }}
                >
                  <Icon size={22} className={feature.color} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CourseFeatures;
