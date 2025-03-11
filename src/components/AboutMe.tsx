
import { useRevealAnimation } from '../utils/animations';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const AboutMe = () => {
  const [isSectionCollapsed, setIsSectionCollapsed] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useRevealAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useRevealAnimation(0.3);
  const { ref: textRef, isVisible: textVisible } = useRevealAnimation(0.3);
  const { t, language } = useLanguage();

  // Toggle section collapse
  const toggleSectionCollapse = () => {
    setIsSectionCollapsed(!isSectionCollapsed);
  };

  return (
    <section 
      id="about" 
      className="section-padding py-24"
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      <div className="container mx-auto">
        <div className="mb-12 text-center relative">
          {/* Collapsible section control */}
          <button 
            onClick={toggleSectionCollapse}
            className="absolute right-0 top-0 neumorph neumorph-hover p-2 rounded-full"
            aria-label={isSectionCollapsed ? "Expand section" : "Collapse section"}
          >
            {isSectionCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
          
          <span className="px-3 py-1 rounded-full bg-heieh-gray text-xs uppercase tracking-wider text-white/70 inline-block mb-3">
            {t('about')}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading mb-0">{t('whoIsHeieh')}</h2>
        </div>

        {/* Show content only when not collapsed */}
        {!isSectionCollapsed && (
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Profile image */}
            <div 
              ref={imageRef as React.RefObject<HTMLDivElement>}
              className={`transition-opacity duration-700 ${
                imageVisible ? 'opacity-100 transform-none' : 'opacity-0'
              }`}
              style={{ transform: imageVisible ? 'none' : 'translateX(10px)', transition: 'opacity 700ms, transform 700ms' }}
            >
              <div className="neumorph aspect-square overflow-hidden rounded-2xl max-w-md mx-auto">
                <div className="w-full h-full p-3">
                  {/* Fixed profile image display */}
                  <div className="w-full h-full rounded-xl bg-heieh-gray overflow-hidden relative">
                    <img 
                      src="/images/profile/meSunset.jpg" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      loading="eager"
                      onError={(e) => {
                        console.error("Image failed to load:", e);
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* About text */}
            <div 
              ref={textRef as React.RefObject<HTMLDivElement>}
              className="transition-opacity duration-700"
              style={{ 
                opacity: textVisible ? 1 : 0, 
                transform: textVisible ? 'none' : 'translateX(-10px)',
                transition: 'opacity 700ms, transform 700ms'
              }}
            >
              <div className="neumorph p-8 rounded-2xl h-full">
                <blockquote className="text-xl md:text-2xl font-heading text-white mb-6 border-l-4 border-heieh-neon-green pl-4 italic">
                  "{t('combineArtTech')}"
                </blockquote>
                
                <p className="text-white/80 mb-6">
                  {t('aboutP1')}
                </p>
                
                <p className="text-white/80">
                  {t('aboutP2')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutMe;
