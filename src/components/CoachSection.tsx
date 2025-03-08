
import { ExternalLink, Music, Headphones, BookOpen, Users, ChevronUp, ChevronDown } from 'lucide-react';
import { useRevealAnimation } from '../utils/animations';
import { useLanguage } from '../hooks/useLanguage';
import { useState } from 'react';

const CoachSection = () => {
  const [isSectionCollapsed, setIsSectionCollapsed] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useRevealAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useRevealAnimation(0.2);
  const { t, language } = useLanguage();

  // Toggle section collapse
  const toggleSectionCollapse = () => {
    setIsSectionCollapsed(!isSectionCollapsed);
  };

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

  // Student reviews
  const studentReviews = language === 'de' ? [
    {
      name: "Phil",
      text: "Lucien ist der perfekte Lehrer, wenn man wirklich Musik lernen will. Er bringt eine Menge Erfahrung mit und erklärt alles so, dass man es direkt checkt – ohne Druck, dafür mit richtig viel Geduld. Ob Gitarre, Klavier, Bass oder Gesang, bei ihm fühlt man sich einfach gut aufgehoben. Er nimmt sich die Zeit, auf jeden individuell einzugehen, und das merkt man sofort. Außerdem kennt er sich mit Musikproduktion aus, also ideal, wenn du nicht nur spielen, sondern auch eigene Songs aufnehmen willst. Man merkt, dass er selbst richtig für Musik brennt – das steckt einfach an. Bei Lucien lernt man nicht nur was, sondern hat dabei auch richtig Spaß."
    },
    {
      name: "Allan",
      text: "Qualifiziert, erfahren, motivierend und unterhaltend"
    },
    {
      name: "Simon",
      text: "Ich kenne Lucien seit 12 Jahren und musiziere seit dem auch mit ihm. Er ist ein absoluter Allrounder was Instrumente und Musikverständnis angeht. Ich konnte von ihm schon oft Grundlagen verschiedener Instrumenten lernen, zudem kann ich ihn auch als Gesangscoach empfehlen. Er schafft es einem mit wenigen Worten die Hilfe zu geben, die man benötigt um sich musikalisch zu entfalten. 10/10"
    },
    {
      name: "Michelle",
      text: "Ich habe noch nie jemanden kennengelernt, der musikalisch so vielfältig begabt ist. Es gibt glaube ich kein Instrument welches Lucien nicht spielen kann, zumindest so nehme ich es wahr. Musik fließt einfach durch seine Adern und eine Liebe fürs erklären hat er auch. Eine absolute Empfehlung für alle die Gitarre lernen möchten!"
    },
    {
      name: "Kevin",
      text: "Lucien ist sehr zuverlässig und ehrlich. Was ich an ihn auch immer schätze ist sein Engagement, seine Leidenschaft - ein guter Lehrer muss selber brennen und andere anstecken können. Er konnte auch immer sehr genau einschätzen, was ich brauche oder mir fehlte, was wichtig ist um den richtigen Hebel zu finden, wo angesetzt werden muss. Ein anderer Pluspunkt, diese riesen Palette an Wissen. Er ist jetzt immer noch mein persönliches Wikipedia. Ich bin Lucien sehr dankbar für alles was er für mich getan hat und ich kann immer zu ihm kommen wenn ich Hilfe und Rat brauche."
    },
    {
      name: "Leo",
      text: "Lucien ist ein herausragender Klavierlehrer und Vollblutmusiker, der nicht nur das Klavier beherrscht, sondern auch eine Vielzahl weiterer Instrumente spielt. Seine Leidenschaft für Musik und seine umfassende Erfahrung machen ihn zu einem einzigartigen Lehrer. Mit seiner Fähigkeit, komplexe Themen verständlich zu vermitteln, ermöglicht er seinen Schülern, ihr volles Potenzial zu entfalten. Lucien bringt nicht nur technisches Können, sondern auch musikalische Leidenschaft in den Unterricht, was das Klavierspielen zu einer inspirierenden Erfahrung macht. Uneingeschränkt zu empfehlen!"
    }
  ] : [
    {
      name: "Former Student",
      text: t('testimonial')
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
            {t('coach')}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading mb-2">{t('musicEducation')}</h2>
          <p className="text-white/70 max-w-xl mx-auto">
            {t('coachSubtitle')}
          </p>
        </div>
        
        {/* Render the section content only if not collapsed */}
        {!isSectionCollapsed && (
          <>
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
            
            {/* Student reviews */}
            <div className={`mt-16 neumorph p-8 rounded-2xl max-w-3xl mx-auto ${
              sectionVisible ? 'animate-fade-in' : 'opacity-0'
            }`} style={{ animationDelay: '400ms' }}>
              <h3 className="text-xl font-heading mb-6 text-center">{t('studentSuccessStories')}</h3>
              
              <div className="space-y-6">
                {studentReviews.map((review, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <blockquote className="text-white/80 italic border-l-4 border-heieh-neon-blue pl-4 mb-2">
                      "{review.text}"
                    </blockquote>
                    <div className="text-right text-white/70">— {review.name}</div>
                  </div>
                ))}
              </div>
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
          </>
        )}
      </div>
    </section>
  );
};

export default CoachSection;
