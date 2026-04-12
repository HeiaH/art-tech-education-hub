import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlayCircle,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  FileText,
  Mic,
  Menu,
  X,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { courseModules, type Lesson, type Module } from '@/data/courseContent';

/* ------------------------------------------------------------------ */
/*  Local-storage helpers                                              */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'heiah-course-progress';

function loadProgress(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveProgress(progress: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/* ------------------------------------------------------------------ */
/*  Lesson icon                                                        */
/* ------------------------------------------------------------------ */

const LessonIcon = ({ type, completed }: { type: string; completed: boolean }) => {
  if (completed) return <CheckCircle size={14} className="text-heieh-neon-green flex-shrink-0" />;
  if (type === 'video') return <PlayCircle size={14} className="text-heieh-neon-green/60 flex-shrink-0" />;
  if (type === 'exercise') return <Mic size={14} className="text-heieh-neon-blue/60 flex-shrink-0" />;
  return <FileText size={14} className="text-white/30 flex-shrink-0" />;
};

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const CoursePlayer = () => {
  const [progress, setProgress] = useState<Record<string, boolean>>(loadProgress);
  const [activeLessonId, setActiveLessonId] = useState(courseModules[0].lessons[0].id);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [courseModules[0].id]: true,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Persist progress
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Derived values
  const allLessons = courseModules.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter((l) => progress[l.id]).length;
  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const currentIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const currentLesson = allLessons[currentIndex];
  const currentModule = courseModules.find((m) => m.lessons.some((l) => l.id === activeLessonId))!;

  const hasNext = currentIndex < totalLessons - 1;
  const hasPrev = currentIndex > 0;

  /* ---- Actions ---- */

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const selectLesson = (lesson: Lesson, mod: Module) => {
    setActiveLessonId(lesson.id);
    setExpandedModules((prev) => ({ ...prev, [mod.id]: true }));
    setSidebarOpen(false);
  };

  const markComplete = () => {
    setProgress((prev) => ({ ...prev, [activeLessonId]: true }));
  };

  const markIncomplete = () => {
    setProgress((prev) => {
      const next = { ...prev };
      delete next[activeLessonId];
      return next;
    });
  };

  const goNext = () => {
    if (!hasNext) return;
    const nextLesson = allLessons[currentIndex + 1];
    const nextModule = courseModules.find((m) => m.lessons.some((l) => l.id === nextLesson.id))!;
    selectLesson(nextLesson, nextModule);
  };

  const goPrev = () => {
    if (!hasPrev) return;
    const prevLesson = allLessons[currentIndex - 1];
    const prevModule = courseModules.find((m) => m.lessons.some((l) => l.id === prevLesson.id))!;
    selectLesson(prevLesson, prevModule);
  };

  /* ---- Module progress ---- */

  const moduleProgress = (mod: Module) => {
    const done = mod.lessons.filter((l) => progress[l.id]).length;
    return { done, total: mod.lessons.length };
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-heieh-dark flex flex-col">
      {/* Top bar */}
      <header className="h-14 border-b border-white/5 bg-heieh-gray flex items-center px-4 gap-3 flex-shrink-0 z-30">
        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to="/learn" className="text-white/40 hover:text-white/70 transition-colors flex items-center gap-1 text-sm">
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">Back</span>
        </Link>

        <div className="flex-1 flex items-center gap-3 min-w-0">
          <span className="text-white/70 text-sm font-medium truncate hidden sm:block">
            {currentModule.title}
          </span>
          <span className="text-white/20 hidden sm:block">/</span>
          <span className="text-white text-sm font-semibold truncate">{currentLesson.title}</span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-white/40 text-xs">{overallPercent}%</span>
          <div className="w-24 hidden sm:block">
            <Progress value={overallPercent} className="h-1.5 bg-white/10" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside
          className={`
            absolute md:relative z-20 top-0 left-0 h-full w-72 bg-heieh-gray border-r border-white/5
            flex-shrink-0 flex flex-col overflow-y-auto transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          {/* Overall progress */}
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center justify-between text-xs text-white/40 mb-2">
              <span>Course progress</span>
              <span>{completedCount}/{totalLessons} lessons</span>
            </div>
            <Progress value={overallPercent} className="h-2 bg-white/10" />
          </div>

          {/* Module list */}
          <nav className="flex-1 overflow-y-auto py-2">
            {courseModules.map((mod) => {
              const { done, total } = moduleProgress(mod);
              const isExpanded = expandedModules[mod.id];
              const allDone = done === total;

              return (
                <div key={mod.id}>
                  {/* Module header */}
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors"
                  >
                    <span
                      className={`text-xs font-mono font-bold flex-shrink-0 ${
                        allDone ? 'text-heieh-neon-green' : 'text-white/30'
                      }`}
                    >
                      {mod.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white/80 text-sm font-medium truncate">{mod.title}</div>
                      <div className="text-white/30 text-xs mt-0.5">
                        {done}/{total} complete
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown size={14} className="text-white/20 flex-shrink-0" />
                    ) : (
                      <ChevronRight size={14} className="text-white/20 flex-shrink-0" />
                    )}
                  </button>

                  {/* Lessons */}
                  {isExpanded && (
                    <div className="pb-1">
                      {mod.lessons.map((lesson) => {
                        const isActive = lesson.id === activeLessonId;
                        const isCompleted = !!progress[lesson.id];

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => selectLesson(lesson, mod)}
                            className={`w-full text-left pl-11 pr-4 py-2 flex items-center gap-2 transition-colors ${
                              isActive
                                ? 'bg-heieh-neon-green/10 border-l-2 border-heieh-neon-green'
                                : 'hover:bg-white/5 border-l-2 border-transparent'
                            }`}
                          >
                            <LessonIcon type={lesson.type} completed={isCompleted} />
                            <span
                              className={`text-xs leading-tight flex-1 ${
                                isActive ? 'text-white' : isCompleted ? 'text-white/50' : 'text-white/60'
                              }`}
                            >
                              {lesson.title}
                            </span>
                            <span className="text-white/20 text-[10px] flex-shrink-0">
                              {lesson.duration}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="absolute inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
            {/* Video placeholder */}
            {currentLesson.type === 'video' && (
              <div className="neumorph rounded-2xl aspect-video flex items-center justify-center mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-heieh-neon-green/5 to-transparent" />
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-heieh-neon-green/10 flex items-center justify-center border border-heieh-neon-green/20 hover:bg-heieh-neon-green/20 transition-colors cursor-pointer">
                    <PlayCircle size={32} className="text-heieh-neon-green" />
                  </div>
                  <span className="text-white/30 text-sm">{currentLesson.duration}</span>
                </div>
              </div>
            )}

            {/* Lesson header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs text-white/30 mb-2">
                <span className="text-heieh-neon-green font-mono font-bold">{currentModule.number}</span>
                <span>/</span>
                <span>{currentModule.title}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2">
                {currentLesson.title}
              </h1>
              <p className="text-white/50">{currentLesson.description}</p>
            </div>

            {/* Lesson content */}
            <div className="neumorph rounded-2xl p-6 sm:p-8 mb-8">
              <div className="space-y-1">
                {currentLesson.content.split('\n').map((line, i) => {
                  const trimmed = line.trim();
                  if (!trimmed) return <div key={i} className="h-3" />;
                  if (trimmed.startsWith('## '))
                    return (
                      <h2 key={i} className="text-xl font-bold text-white mt-6 mb-3 font-heading">
                        {trimmed.slice(3)}
                      </h2>
                    );
                  if (trimmed.startsWith('### '))
                    return (
                      <h3 key={i} className="text-lg font-semibold text-white/80 mt-5 mb-2 font-heading">
                        {trimmed.slice(4)}
                      </h3>
                    );
                  if (trimmed.startsWith('- [ ] '))
                    return (
                      <div key={i} className="flex items-start gap-2 py-0.5 text-white/60 text-sm">
                        <span className="text-white/20 mt-0.5">&#9744;</span>
                        <span>{trimmed.slice(6)}</span>
                      </div>
                    );
                  if (trimmed.startsWith('- '))
                    return (
                      <div key={i} className="flex items-start gap-2 py-0.5 text-white/60 text-sm">
                        <span className="text-heieh-neon-green/50 mt-0.5">&#8226;</span>
                        <span>{trimmed.slice(2)}</span>
                      </div>
                    );
                  if (/^\d+\.\s/.test(trimmed))
                    return (
                      <div key={i} className="flex items-start gap-2 py-0.5 text-white/60 text-sm">
                        <span className="text-white/30 font-mono text-xs mt-0.5 w-4 flex-shrink-0">
                          {trimmed.match(/^(\d+)\./)?.[1]}.
                        </span>
                        <span>{trimmed.replace(/^\d+\.\s/, '')}</span>
                      </div>
                    );
                  if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
                    const cells = trimmed
                      .slice(1, -1)
                      .split('|')
                      .map((c) => c.trim());
                    if (cells.every((c) => /^-+$/.test(c))) return null;
                    return (
                      <div
                        key={i}
                        className="grid gap-4 text-white/50 text-xs py-1"
                        style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}
                      >
                        {cells.map((cell, ci) => (
                          <span key={ci}>{cell}</span>
                        ))}
                      </div>
                    );
                  }
                  const rendered = trimmed.replace(
                    /\*\*(.+?)\*\*/g,
                    '<strong class="text-white/80">$1</strong>'
                  );
                  return (
                    <p
                      key={i}
                      className="text-white/60 text-sm leading-relaxed my-1"
                      dangerouslySetInnerHTML={{ __html: rendered }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-12">
              {progress[activeLessonId] ? (
                <Button
                  onClick={markIncomplete}
                  className="bg-white/5 hover:bg-white/10 text-white/60 rounded-xl py-5 flex-1 sm:flex-none border border-white/10"
                >
                  <CheckCircle size={16} className="mr-2 text-heieh-neon-green" />
                  Completed — undo?
                </Button>
              ) : (
                <Button
                  onClick={markComplete}
                  className="bg-heieh-neon-green hover:bg-heieh-neon-green/90 text-black font-semibold rounded-xl py-5 flex-1 sm:flex-none transition-all hover:shadow-[0_0_20px_rgba(29,185,84,0.35)]"
                >
                  <CheckCircle size={16} className="mr-2" />
                  Mark as Complete
                </Button>
              )}

              <div className="flex gap-3 flex-1 sm:flex-none sm:ml-auto">
                <Button
                  onClick={goPrev}
                  disabled={!hasPrev}
                  className="border border-white/10 text-white/60 hover:bg-white/5 rounded-xl py-5 bg-transparent flex-1 sm:flex-none disabled:opacity-30"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Prev
                </Button>
                <Button
                  onClick={goNext}
                  disabled={!hasNext}
                  className="border border-white/10 text-white/60 hover:bg-white/5 rounded-xl py-5 bg-transparent flex-1 sm:flex-none disabled:opacity-30"
                >
                  Next
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursePlayer;
