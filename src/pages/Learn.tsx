import CourseNav from '@/components/courses/CourseNav';
import CourseHero from '@/components/courses/CourseHero';
import CourseFeatures from '@/components/courses/CourseFeatures';
import CourseCurriculum from '@/components/courses/CourseCurriculum';
import PricingSection from '@/components/courses/PricingSection';
import CourseFAQ from '@/components/courses/CourseFAQ';
import CourseCTA from '@/components/courses/CourseCTA';

const Learn = () => {
  return (
    <div className="bg-heieh-dark min-h-screen">
      <CourseNav />
      <CourseHero />
      <CourseFeatures />
      <CourseCurriculum />
      <PricingSection />
      <CourseFAQ />
      <CourseCTA />

      {/* Footer */}
      <footer className="bg-heieh-dark border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <span>© {new Date().getFullYear()} HeiaH — heiah.de/learn</span>
          <div className="flex gap-6">
            <a href="/" className="hover:text-white/60 transition-colors">Back to heiah.de</a>
            <a href="mailto:hello@heiah.de" className="hover:text-white/60 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Learn;
