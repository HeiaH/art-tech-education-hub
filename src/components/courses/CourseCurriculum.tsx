import { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, FileText, Mic } from 'lucide-react';

const modules = [
  {
    number: '01',
    title: 'The Architecture of a Song',
    description: 'Understand how every hit is built before you write a single word.',
    lessons: [
      { type: 'video', title: 'How song structure actually works', duration: '14 min' },
      { type: 'video', title: 'Verse, chorus, bridge — and when to break the rules', duration: '11 min' },
      { type: 'video', title: 'Tension & release: the emotional engine', duration: '9 min' },
      { type: 'exercise', title: 'Structure Map Exercise', duration: '~20 min' },
    ],
  },
  {
    number: '02',
    title: 'Melody & Hook Writing',
    description: 'Craft melodies that stick in people\'s heads days after they hear it.',
    lessons: [
      { type: 'video', title: 'What makes a melody memorable', duration: '13 min' },
      { type: 'video', title: 'Motif development and variation', duration: '10 min' },
      { type: 'video', title: 'Writing melodic hooks from rhythm', duration: '12 min' },
      { type: 'exercise', title: 'Hook Workshop', duration: '~30 min' },
    ],
  },
  {
    number: '03',
    title: 'Lyric Writing That Lands',
    description: 'Say something real. Say it in a way only you could.',
    lessons: [
      { type: 'video', title: 'Show don\'t tell: scene writing in lyrics', duration: '15 min' },
      { type: 'video', title: 'Rhyme schemes without sounding corny', duration: '11 min' },
      { type: 'video', title: 'Finding your lyric voice', duration: '13 min' },
      { type: 'worksheet', title: 'Lyric Revision Worksheet', duration: 'Download' },
      { type: 'exercise', title: 'Full Verse Exercise', duration: '~45 min' },
    ],
  },
  {
    number: '04',
    title: 'Chord Progressions & Harmony',
    description: 'Build harmonic beds that support your melody and emotional intent.',
    lessons: [
      { type: 'video', title: 'The progressions that work — and why', duration: '12 min' },
      { type: 'video', title: 'Modal borrowing and color chords', duration: '14 min' },
      { type: 'video', title: 'Voicing for emotional impact', duration: '10 min' },
      { type: 'exercise', title: 'Chord Palette Exercise', duration: '~25 min' },
    ],
  },
  {
    number: '05',
    title: 'From Demo to Finished Song',
    description: 'Produce, record, and finalize your first complete song.',
    lessons: [
      { type: 'video', title: 'Demo workflow: fast and decisive', duration: '16 min' },
      { type: 'video', title: 'Arrangement choices that serve the song', duration: '12 min' },
      { type: 'video', title: 'Feedback, revision, and knowing when it\'s done', duration: '11 min' },
      { type: 'exercise', title: 'Final Song Project', duration: 'Ongoing' },
    ],
  },
];

const LessonIcon = ({ type }: { type: string }) => {
  if (type === 'video') return <PlayCircle size={14} className="text-heieh-neon-green flex-shrink-0" />;
  if (type === 'exercise') return <Mic size={14} className="text-heieh-neon-blue flex-shrink-0" />;
  return <FileText size={14} className="text-white/40 flex-shrink-0" />;
};

const CourseCurriculum = () => {
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
    <section id="curriculum" className="section-padding bg-heieh-gray" ref={ref}>
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-heieh-neon-blue text-sm font-semibold uppercase tracking-widest mb-3">
            Course Curriculum
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">5 Modules. 25+ Lessons.</h2>
          <p className="text-white/50">Everything maps to one goal: a finished song you're proud of.</p>
        </div>

        {/* Stats row */}
        <div
          className={`grid grid-cols-3 gap-4 mb-10 transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '5', label: 'Modules' },
            { value: '25+', label: 'Lessons' },
            { value: '~5h', label: 'Total Content' },
          ].map((stat) => (
            <div key={stat.label} className="neumorph rounded-xl p-4 text-center">
              <div className="text-2xl font-bold neon-text-green">{stat.value}</div>
              <div className="text-white/40 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div
          className={`transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {modules.map((mod) => (
              <AccordionItem
                key={mod.number}
                value={mod.number}
                className="neumorph rounded-xl border-0 px-6 overflow-hidden"
              >
                <AccordionTrigger className="py-5 hover:no-underline">
                  <div className="flex items-start gap-4 text-left">
                    <span className="text-heieh-neon-green font-mono text-sm font-bold mt-0.5 flex-shrink-0">
                      {mod.number}
                    </span>
                    <div>
                      <div className="text-white font-semibold">{mod.title}</div>
                      <div className="text-white/40 text-sm font-normal mt-0.5">{mod.description}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="space-y-2 ml-8">
                    {mod.lessons.map((lesson, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-3 py-2 border-t border-white/5"
                      >
                        <div className="flex items-center gap-2">
                          <LessonIcon type={lesson.type} />
                          <span className="text-white/70 text-sm">{lesson.title}</span>
                          {lesson.type === 'exercise' && (
                            <Badge
                              variant="outline"
                              className="text-[10px] border-heieh-neon-blue/40 text-heieh-neon-blue px-1.5 py-0"
                            >
                              Exercise
                            </Badge>
                          )}
                        </div>
                        <span className="text-white/30 text-xs flex-shrink-0">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default CourseCurriculum;
