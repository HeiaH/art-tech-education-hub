import { ExternalLink, LineChart, FlaskConical, Radar, Library } from 'lucide-react';
import { useRevealAnimation } from '../utils/animations';
import { useLanguage } from '../hooks/useLanguage';

type Tool = {
  key: 'scanner' | 'studio' | 'mission' | 'vault';
  url: string;
  icon: React.ElementType;
  accent: 'green' | 'blue' | 'purple' | 'orange';
};

const TOOLS: Tool[] = [
  { key: 'scanner', url: 'https://scanner.heiah.de', icon: LineChart,    accent: 'green'  },
  { key: 'studio',  url: 'https://studio.heiah.de',  icon: FlaskConical, accent: 'blue'   },
  { key: 'mission', url: 'https://mission.heiah.de', icon: Radar,        accent: 'purple' },
  { key: 'vault',   url: 'https://vault.heiah.de',   icon: Library,      accent: 'orange' },
];

const ACCENT_CLASSES: Record<Tool['accent'], { text: string; ring: string; glow: string }> = {
  green:  { text: 'text-heieh-neon-green', ring: 'group-hover:ring-heieh-neon-green/40', glow: 'group-hover:shadow-[0_0_28px_rgba(29,185,84,0.18)]' },
  blue:   { text: 'text-heieh-neon-blue',  ring: 'group-hover:ring-heieh-neon-blue/40',  glow: 'group-hover:shadow-[0_0_28px_rgba(26,115,232,0.18)]' },
  purple: { text: 'text-[#a855f7]',         ring: 'group-hover:ring-[#a855f7]/40',         glow: 'group-hover:shadow-[0_0_28px_rgba(168,85,247,0.18)]' },
  orange: { text: 'text-[#f59e0b]',         ring: 'group-hover:ring-[#f59e0b]/40',         glow: 'group-hover:shadow-[0_0_28px_rgba(245,158,11,0.18)]' },
};

const ToolsSection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useRevealAnimation();
  const { t } = useLanguage();

  return (
    <section
      id="tools"
      className="section-padding py-24"
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="px-3 py-1 rounded-full bg-heieh-gray text-xs uppercase tracking-wider text-white/70 inline-block mb-3">
            {t('toolsBadge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading mb-2">{t('toolsTitle')}</h2>
          <p className="text-white/70 max-w-xl mx-auto">{t('toolsSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            const accent = ACCENT_CLASSES[tool.accent];
            return (
              <a
                key={tool.key}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative neumorph p-6 rounded-2xl ring-1 ring-white/5 transition-all duration-300 ${accent.ring} ${accent.glow} ${
                  sectionVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl bg-heieh-dark/60 flex items-center justify-center ring-1 ring-white/10 ${accent.text}`}>
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <ExternalLink size={14} className="text-white/30 group-hover:text-white/70 transition-colors" />
                </div>

                <h3 className="text-lg font-heading text-white mb-1.5">{t(`tool_${tool.key}_name`)}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">{t(`tool_${tool.key}_desc`)}</p>

                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-heieh-neon-green animate-pulse" />
                  <span className="font-mono">{tool.url.replace('https://', '')}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
