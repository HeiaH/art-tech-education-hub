
import { useRevealAnimation } from '../utils/animations';

const AboutMe = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useRevealAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useRevealAnimation(0.3);
  const { ref: textRef, isVisible: textVisible } = useRevealAnimation(0.3);

  return (
    <section 
      id="about" 
      className="section-padding py-24"
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <span className="px-3 py-1 rounded-full bg-heieh-gray text-xs uppercase tracking-wider text-white/70 inline-block mb-3">
            About
          </span>
          <h2 className="text-3xl md:text-4xl font-heading mb-0">Who is HeiǝH?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Profile image */}
          <div 
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className={`${
              imageVisible ? 'animate-fade-in-right' : 'opacity-0 translate-x-10'
            } transition-all duration-700`}
          >
            <div className="neumorph aspect-square overflow-hidden rounded-2xl max-w-md mx-auto">
              <div className="w-full h-full p-3">
                {/* Placeholder for profile image - replace src with actual image */}
                <div className="w-full h-full rounded-xl bg-heieh-gray overflow-hidden relative image-loading">
                  <div className="absolute inset-0 flex items-center justify-center text-white/30">
                    Profile Image
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About text */}
          <div 
            ref={textRef as React.RefObject<HTMLDivElement>}
            className={`${
              textVisible ? 'animate-fade-in-left' : 'opacity-0 translate-x-10'
            } transition-all duration-700`}
          >
            <div className="neumorph p-8 rounded-2xl h-full">
              <blockquote className="text-xl md:text-2xl font-heading text-white mb-6 border-l-4 border-heieh-neon-green pl-4 italic">
                "I combine art, technology, and education."
              </blockquote>
              
              <p className="text-white/80 mb-6">
                With a passion for both creative expression and technical innovation, I work
                at the intersection of art and technology. My journey spans music production, 
                photography, digital art, software development, and education.
              </p>
              
              <p className="text-white/80">
                I believe in the power of technology to enhance artistic expression, and the value 
                of artistic thinking in technological development. Through coaching, I help others
                discover their own creative potential using modern tools and techniques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
