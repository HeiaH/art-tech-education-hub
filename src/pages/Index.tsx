
import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import AboutMe from '../components/AboutMe';
import ArtistSection from '../components/ArtistSection';
import CoachSection from '../components/CoachSection';
import DeveloperSection from '../components/DeveloperSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import InstagramFeed from '../components/InstagramFeed';

const Index = () => {
  // Setup IntersectionObserver for animations
  useEffect(() => {
    // Observer for elements with appear-animation class
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-animation');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with appear-animation class
    document.querySelectorAll('.appear-animation').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.appear-animation').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-heieh-dark text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <AboutMe />
      <ArtistSection />
      <CoachSection />
      <DeveloperSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
