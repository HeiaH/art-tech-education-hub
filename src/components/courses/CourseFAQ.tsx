import { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Do I need any music theory to start?',
    a: "No. The course is designed so that complete beginners can follow it, while still giving experienced musicians something to chew on. If you can hum a melody and you've heard a song before, you're ready.",
  },
  {
    q: 'What software or instruments do I need?',
    a: 'Nothing is required beyond a voice and something to capture ideas — your phone works. The production module covers DAW basics (GarageBand, Logic, Ableton), but the core songwriting lessons are software-agnostic.',
  },
  {
    q: 'How is this different from YouTube tutorials?',
    a: "YouTube gives you isolated tips. This course gives you a system — a deliberate sequence where each lesson builds on the last, with exercises that force you to apply it before moving on. The community and feedback loop are also things YouTube can't offer.",
  },
  {
    q: 'What if I get stuck or have a question mid-course?',
    a: "Post it in the Discord — you'll get a response from the instructor or a community member. Membership plan holders also get priority in the monthly live Q&A sessions.",
  },
  {
    q: 'Can I upgrade from the course to the membership later?',
    a: "Yes. If you buy the course first and decide to join the membership, the course fee is credited toward your first few months. Just reach out before purchasing.",
  },
  {
    q: 'Is the 1:1 coaching only for students of the course?',
    a: "No — coaching sessions are open to anyone. That said, students who have worked through at least Module 1–2 tend to get more out of a session because we can move faster.",
  },
  {
    q: 'What is your refund policy?',
    a: "If you complete less than 20% of the course and feel it's not for you within 14 days of purchase, get in touch for a full refund. No hoops.",
  },
];

const CourseFAQ = () => {
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
    <section id="faq" className="section-padding bg-heieh-gray" ref={ref}>
      <div className="max-w-2xl mx-auto px-6">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-heieh-neon-blue text-sm font-semibold uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Common questions.</h2>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="neumorph rounded-xl border-0 px-6"
              >
                <AccordionTrigger className="py-5 text-left text-white/85 hover:text-white hover:no-underline font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-white/50 leading-relaxed text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default CourseFAQ;
