
import { ExternalLink, Music, Headphones, BookOpen, Users } from 'lucide-react';
import { useRevealAnimation } from '../utils/animations';

const CoachSection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useRevealAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useRevealAnimation(0.2);

  // Coaching service cards
  const services = [
    {
      icon: <Music size={24} />,
      title: 'Instrumental Training',
      description: 'One-on-one sessions for mastering musical instruments with personalized learning paths.'
    },
    {
      icon: <Headphones size={24} />,
      title: 'Music Production',
      description: 'Learn professional audio production, mixing, and sound design techniques.'
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Theory & Composition',
      description: 'Develop a strong foundation in music theory and composition principles.'
    },
    {
      icon: <Users size={24} />,
      title: 'Group Workshops',
      description: 'Collaborative learning experiences for groups interested in music and technology.'
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
            Coach
          </span>
          <h2 className="text-3xl md:text-4xl font-heading mb-2">Music Education</h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Empowering students to discover their musical potential through personalized coaching.
          </p>
        </div>
        
        {/* Coaching philosophy */}
        <div 
          className={`neumorph p-8 rounded-2xl max-w-3xl mx-auto ${
            sectionVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <h3 className="text-xl font-heading mb-4">My Coaching Philosophy</h3>
          <p className="text-white/80 mb-4">
            I believe in the power of personalized education that adapts to each student's unique 
            learning style and goals. My approach combines traditional music foundations with 
            modern technology, making learning both effective and engaging.
          </p>
          <p className="text-white/80">
            Whether you're a complete beginner or looking to refine advanced skills, I create 
            a supportive environment where you can explore, experiment, and excel at your own pace.
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
          <h3 className="text-xl font-heading mb-6 text-center">Student Success Stories</h3>
          <blockquote className="text-white/80 italic border-l-4 border-heieh-neon-blue pl-4 mb-4">
            "HeiǝH's unique approach combining music theory with technology has completely 
            transformed my understanding of production. His teaching style makes complex 
            concepts accessible and engaging."
          </blockquote>
          <div className="text-right text-white/70">— Former Student</div>
        </div>
        
        {/* External profiles */}
        <div className={`mt-12 text-center ${
          sectionVisible ? 'animate-fade-in' : 'opacity-0'
        }`} style={{ animationDelay: '600ms' }}>
          <h3 className="text-lg font-heading mb-4">Find Me On</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://www.check24profis.de" 
              target="_blank" 
              rel="noopener noreferrer"
              className="neumorph py-2 px-5 rounded-full inline-flex items-center gap-2 transition-all duration-300 hover:neon-text-green"
            >
              <span>Check24Profis</span>
              <ExternalLink size={16} />
            </a>
            <a 
              href="https://www.superprof.com" 
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
