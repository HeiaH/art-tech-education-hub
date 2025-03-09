
import { ExternalLink, Music, Headphones, BookOpen, Users, ChevronUp, ChevronDown, Calendar } from 'lucide-react';
import { useRevealAnimation } from '../utils/animations';
import { useLanguage } from '../hooks/useLanguage';
import { useState, useRef, useEffect } from 'react';

const CoachSection = () => {
  const [isSectionCollapsed, setIsSectionCollapsed] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useRevealAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useRevealAnimation(0.2);
  const { t, language } = useLanguage();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const reviewIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      name: "Phil",
      text: "Lucien is the perfect teacher if you really want to learn music. He brings a lot of experience and explains everything in a way that you can understand immediately – without pressure, but with a lot of patience. Whether it's guitar, piano, bass or vocals, you feel well taken care of with him. He takes the time to respond to each individual, and you notice that right away. He also knows about music production, so it's ideal if you not only want to play, but also want to record your own songs. You can tell that he himself is really passionate about music – it's simply contagious. With Lucien, you not only learn something, but also have a lot of fun."
    },
    {
      name: "Allan",
      text: "Qualified, experienced, motivating and entertaining"
    },
    {
      name: "Simon",
      text: "I've known Lucien for 12 years and have been making music with him since then. He is an absolute all-rounder when it comes to instruments and music understanding. I've often been able to learn the basics of various instruments from him, and I can also recommend him as a vocal coach. He manages to give you the help you need to develop musically with just a few words. 10/10"
    },
    {
      name: "Michelle",
      text: "I have never met anyone who is so musically talented in so many ways. I don't think there's any instrument that Lucien can't play, at least that's how I perceive it. Music simply flows through his veins and he also has a love for explaining. An absolute recommendation for anyone who wants to learn guitar!"
    },
    {
      name: "Kevin",
      text: "Lucien is very reliable and honest. What I always appreciate about him is his commitment, his passion - a good teacher must burn himself and be able to inspire others. He was also always able to assess very precisely what I need or what I was missing, which is important to find the right lever, where to start. Another plus point, this huge palette of knowledge. He is still my personal Wikipedia. I am very grateful to Lucien for everything he has done for me and I can always come to him when I need help and advice."
    },
    {
      name: "Leo",
      text: "Lucien is an outstanding piano teacher and full-blooded musician who not only masters the piano but also plays a variety of other instruments. His passion for music and his comprehensive experience make him a unique teacher. With his ability to communicate complex topics in an understandable way, he enables his students to reach their full potential. Lucien brings not only technical skills but also musical passion to his lessons, making playing the piano an inspiring experience. Highly recommended!"
    }
  ];

  // Handle navigation through reviews with animation
  const nextReview = () => {
    const nextIndex = (currentReviewIndex + 1) % studentReviews.length;
    animateCarousel(nextIndex);
    setCurrentReviewIndex(nextIndex);
  };

  const prevReview = () => {
    const prevIndex = (currentReviewIndex - 1 + studentReviews.length) % studentReviews.length;
    animateCarousel(prevIndex);
    setCurrentReviewIndex(prevIndex);
  };

  // Animate carousel to show specific review
  const animateCarousel = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
    }
  };
  
  // Navigate to specific review via dot indicator
  const goToReview = (index: number) => {
    animateCarousel(index);
    setCurrentReviewIndex(index);
  };
  
  // Auto-rotate reviews every 20 seconds
  useEffect(() => {
    // Clear any existing intervals when component unmounts or dependencies change
    if (reviewIntervalRef.current) {
      clearInterval(reviewIntervalRef.current);
    }
    
    // Create new interval
    reviewIntervalRef.current = setInterval(() => {
      nextReview();
    }, 20000);
    
    // Cleanup on unmount
    return () => {
      if (reviewIntervalRef.current) {
        clearInterval(reviewIntervalRef.current);
        reviewIntervalRef.current = null;
      }
    };
  }, [currentReviewIndex, studentReviews.length]);

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
            
            {/* "Book a free coaching session" button */}
            <div className="text-center mt-6">
              <a 
                href="mailto:contact@heieh.com?subject=Free%20Coaching%20Session%20Request" 
                className="neumorph py-3 px-6 bg-heieh-neon-green/20 hover:bg-heieh-neon-green text-heieh-neon-green hover:text-black font-semibold rounded-full inline-flex items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_5px_15px_rgba(29,185,84,0.4)] hover:translate-y-[-2px]"
              >
                <Calendar size={18} />
                <span>{t('bookFreeSession')}</span>
              </a>
            </div>
            
            {/* One-on-one online coaching section - Moved here as requested */}
            <div className={`mt-12 neumorph p-8 rounded-2xl max-w-3xl mx-auto ${
              sectionVisible ? 'animate-fade-in' : 'opacity-0'
            }`} style={{ animationDelay: '500ms' }}>
              <h3 className="text-xl font-heading mb-4 text-center">{t('onlineCoaching')}</h3>
              <p className="text-white/80 mb-6 text-center">
                {t('onlineCoachingDesc')}
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
            
            {/* Improved Student reviews carousel with side-scrolling */}
            <div className={`mt-16 max-w-3xl mx-auto ${
              sectionVisible ? 'animate-fade-in' : 'opacity-0'
            }`} style={{ animationDelay: '400ms' }}>
              <h3 className="text-xl font-heading mb-6 text-center">{t('studentSuccessStories')}</h3>
              
              {/* Carousel container with fixed height to maintain consistent layout */}
              <div className="relative carousel-container neumorph rounded-xl p-8 overflow-hidden">
                {/* Carousel content with fixed height */}
                <div className="relative mb-12">
                  {/* Horizontal scrollable container */}
                  <div 
                    ref={carouselRef}
                    className="flex overflow-x-hidden snap-x snap-mandatory w-full"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {studentReviews.map((review, index) => (
                      <div 
                        key={index}
                        className="min-w-full flex-shrink-0 snap-center h-[280px]"
                      >
                        <div className="h-full flex flex-col justify-between overflow-y-auto">
                          <blockquote className="text-white/80 italic border-l-4 border-heieh-neon-blue pl-4 mb-4">
                            "{review.text}"
                          </blockquote>
                          <div className="text-right text-white/70">— {review.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Fixed position navigation controls at bottom */}
                <div className="flex justify-between absolute bottom-6 left-8 right-8">
                  <button 
                    onClick={prevReview}
                    className="neumorph p-2 rounded-full hover:text-heieh-neon-blue transition-colors hover:bg-heieh-neon-blue/10 hover:translate-y-[-2px] hover:shadow-[0_5px_15px_rgba(26,115,232,0.3)]"
                    aria-label="Previous review"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                  
                  {/* Pagination dots */}
                  <div className="flex gap-2 items-center">
                    {studentReviews.map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => goToReview(index)}
                        className={`h-2 rounded-full transition-all ${
                          currentReviewIndex === index ? 'w-4 bg-heieh-neon-blue' : 'w-2 bg-white/30'
                        }`}
                        aria-label={`Go to review ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextReview}
                    className="neumorph p-2 rounded-full hover:text-heieh-neon-blue transition-colors hover:bg-heieh-neon-blue/10 hover:translate-y-[-2px] hover:shadow-[0_5px_15px_rgba(26,115,232,0.3)]"
                    aria-label="Next review"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>

                {/* Swipe instructions for mobile - only visible on small screens */}
                <div className="text-center text-white/50 text-xs mt-2 absolute bottom-2 left-0 right-0 md:hidden">
                  Swipe left or right to navigate
                </div>
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
                  className="neumorph py-2 px-5 rounded-full inline-flex items-center gap-2 transition-all duration-300 hover:bg-heieh-neon-green hover:text-black hover:translate-y-[-2px] hover:shadow-[0_5px_15px_rgba(29,185,84,0.4)]"
                >
                  <span>Check24Profis</span>
                  <ExternalLink size={16} />
                </a>
                <a 
                  href="https://www.superprof.de/musikunterricht-gitarre-individuell-flexibel-und-mit-spass-egal-anfanger-oder-fortgeschritten-entdecke-deinen-sound.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="neumorph py-2 px-5 rounded-full inline-flex items-center gap-2 transition-all duration-300 hover:bg-heieh-neon-green hover:text-black hover:translate-y-[-2px] hover:shadow-[0_5px_15px_rgba(29,185,84,0.4)]"
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
