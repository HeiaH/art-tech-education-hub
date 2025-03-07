
import { ExternalLink, Music, Headphones, BookOpen, Users } from 'lucide-react';
import { useRevealAnimation } from '../utils/animations';
import { useLanguage } from '../hooks/useLanguage';

const CoachSection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useRevealAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useRevealAnimation(0.2);
  const { t } = useLanguage();

  // Coaching service cards
  const services = [
    {
      icon: <Music size={24} />,
      title: t('instrumentalTraining'),
      description: t('instrumentalTrainingDesc')
    },
    {
      icon: <Headphones size={24} />,
      title: t('musicProduction'),
      description: t('musicProductionDesc')
    },
    {
      icon: <BookOpen size={24} />,
      title: t('theoryComposition'),
      description: t('theoryCompositionDesc')
    },
    {
      icon: <Users size={24} />,
      title: t('groupWorkshops'),
      description: t('groupWorkshopsDesc')
    }
  ];

  return (
    <section 
      id="coach" 
      className="section-padding py-24 relative bg-heieh-dark"
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:30px_30px] opacity-5 pointer-events-none" />
      
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <span className="px-3 py-1 rounded-full bg-heieh-gray text-xs uppercase tracking-wider text-white/70 inline-block mb-3">
            {t('coach')}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading mb-2">{t('musicEducation')}</h2>
          <p className="text-white/70 max-w-xl mx-auto">
            {t('coachSubtitle')}
          </p>
        </div>
        
        {/* Coaching philosophy */}
        <div 
          className={`neumorph p-8 rounded-2xl max-w-3xl mx-auto ${
            sectionVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <h3 className="text-xl font-heading mb-4">{t('coachingPhilosophy')}</h3>
          <p className="text-white/80 mb-4">
            {t('coachingPhilosophyP1')}
          </p>
          <p className="text-white/80">
            {t('coachingPhilosophyP2')}
          </p>
        </div>
        
        {/* Service cards */}
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          ref={cardsRef as React.RefObject<HTMLDivElement>}
        >
          {services.map((service, index) => (
            <div 
              key={index}
              className={`neumorph p-6 rounded-xl ${
                cardsVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-heieh-neon-green mb-4">{service.icon}</div>
              <h3 className="text-lg font-heading mb-2">{service.title}</h3>
              <p className="text-white/70 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
        
        {/* Testimonial placeholder */}
        <div className={`mt-16 neumorph p-8 rounded-2xl max-w-3xl mx-auto ${
          sectionVisible ? 'animate-fade-in' : 'opacity-0'
        }`} style={{ animationDelay: '400ms' }}>
          <h3 className="text-xl font-heading mb-6 text-center">{t('studentSuccessStories')}</h3>
          <blockquote className="text-white/80 italic border-l-4 border-heieh-neon-blue pl-4 mb-4">
            "{t('testimonial')}"
          </blockquote>
          <div className="text-right text-white/70">— {t('formerStudent')}</div>
        </div>
        
        {/* External profiles */}
        <div className={`mt-12 text-center ${
          sectionVisible ? 'animate-fade-in' : 'opacity-0'
        }`} style={{ animationDelay: '600ms' }}>
          <h3 className="text-lg font-heading mb-4">{t('findMeOn')}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://unterricht.check24.de/musik/profil/sp_OVa9j" 
              target="_blank" 
              rel="noopener noreferrer"
              className="neumorph py-2 px-5 rounded-full inline-flex items-center gap-2 transition-all duration-300 hover:neon-text-green"
            >
              <span>Check24Profis</span>
              <ExternalLink size={16} />
            </a>
            <a 
              href="https://www.superprof.de/musikunterricht-gitarre-individuell-flexibel-und-mit-spass-egal-anfanger-oder-fortgeschritten-entdecke-deinen-sound.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="neumorph py-2 px-5 rounded-full inline-flex items-center gap-2 transition-all duration-300 hover:neon-text-green"
            >
              <span>SuperProf</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachSection;
