
import { useState } from 'react';
import { Github, ExternalLink, ChevronRight, ChevronDown, Code } from 'lucide-react';
import { useRevealAnimation } from '../utils/animations';

// Sample timeline data
const timelineData = [
  {
    id: 1,
    year: '2023',
    title: 'TravelMateApp',
    description: 'SwiftUI-based iOS app for travel planning with RESTful API integration.',
    role: 'Lead Developer',
    tech: ['Swift', 'SwiftUI', 'REST API', 'CoreData'],
    expanded: false,
  },
  {
    id: 2,
    year: '2022',
    title: 'Music Production Suite',
    description: 'Digital audio workstation plugin for procedural beat generation.',
    role: 'Full Stack Developer',
    tech: ['C++', 'JUCE', 'WebAssembly', 'React'],
    expanded: false,
  },
  {
    id: 3,
    year: '2021',
    title: 'Creative Portfolio Platform',
    description: 'Web platform for artists to showcase and sell their work.',
    role: 'Frontend Developer',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    expanded: false,
  },
  {
    id: 4,
    year: '2020',
    title: 'Educational Content Management System',
    description: 'CMS designed for music educators to organize and share teaching materials.',
    role: 'Backend Developer',
    tech: ['Node.js', 'Express', 'MongoDB', 'AWS'],
    expanded: false,
  },
];

const DeveloperSection = () => {
  const [timeline, setTimeline] = useState(timelineData);
  const { ref: sectionRef, isVisible: sectionVisible } = useRevealAnimation();

  // Toggle expanded state for timeline item
  const toggleExpand = (id: number) => {
    setTimeline(timeline.map(item => 
      item.id === id ? { ...item, expanded: !item.expanded } : item
    ));
  };

  return (
    <section 
      id="developer" 
      className="section-padding py-24" 
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <span className="px-3 py-1 rounded-full bg-heieh-gray text-xs uppercase tracking-wider text-white/70 inline-block mb-3">
            Developer
          </span>
          <h2 className="text-3xl md:text-4xl font-heading mb-2">Technical Projects</h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Creating innovative software solutions that blend artistry with functionality.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="max-w-3xl mx-auto mt-16">
          {timeline.map((item, index) => (
            <div 
              key={item.id}
              className={`timeline-item ${
                sectionVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-heieh-neon-blue font-semibold">{item.year}</div>
                <div className="flex-1">
                  <div 
                    className="neumorph p-4 rounded-xl cursor-pointer"
                    onClick={() => toggleExpand(item.id)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-heading">{item.title}</h3>
                      {item.expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                    
                    <div className="text-white/60 text-sm mb-2">{item.role}</div>
                    
                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {item.tech.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-0.5 bg-heieh-gray/70 rounded-full text-xs text-white/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Expanded content */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      item.expanded ? 'max-h-96 mt-3' : 'max-h-0'
                    }`}>
                      <p className="text-white/70 mb-4">{item.description}</p>
                      
                      {/* Project screenshot placeholder */}
                      <div className="aspect-video bg-heieh-gray rounded-lg mb-4 overflow-hidden image-loading">
                        <div className="w-full h-full flex items-center justify-center text-white/30">
                          Project Screenshot
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex gap-3">
                        <button className="py-1.5 px-4 text-sm bg-heieh-gray hover:bg-heieh-gray/80 rounded-full flex items-center gap-2 transition-all duration-300">
                          <Code size={14} />
                          <span>View Code</span>
                        </button>
                        <button className="py-1.5 px-4 text-sm bg-heieh-gray hover:bg-heieh-gray/80 rounded-full flex items-center gap-2 transition-all duration-300">
                          <ExternalLink size={14} />
                          <span>Live Demo</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* GitHub Link */}
        <div className={`text-center mt-16 ${
          sectionVisible ? 'animate-fade-in' : 'opacity-0'
        }`} style={{ animationDelay: '800ms' }}>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="neumorph neumorph-hover py-3 px-6 rounded-full inline-flex items-center gap-2 transition-all duration-300 hover:neon-text-blue"
          >
            <Github size={20} />
            <span>View More Projects on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
