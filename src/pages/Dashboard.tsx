import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, BookOpen, ArrowRight, LogOut, Play } from 'lucide-react';

const modules = [
  { id: 1, title: 'The Architecture of a Song', progress: 0 },
  { id: 2, title: 'Melody & Hook Writing', progress: 0 },
  { id: 3, title: 'Lyric Writing That Lands', progress: 0 },
  { id: 4, title: 'Chord Progressions & Harmony', progress: 0 },
  { id: 5, title: 'From Demo to Finished Song', progress: 0 },
];

const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-heieh-dark">
      {/* Nav bar */}
      <nav className="glassmorphism sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-heieh-neon-green/15 flex items-center justify-center">
              <Music size={16} className="text-heieh-neon-green" />
            </div>
            <span className="text-white font-semibold text-sm">
              HeiaH <span className="text-white/40 font-normal">/ Dashboard</span>
            </span>
          </Link>

          <Button
            onClick={signOut}
            variant="ghost"
            className="text-white/50 hover:text-white hover:bg-white/5 gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
            Welcome back
          </h1>
          <p className="text-white/50">
            {user?.email}
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Link to="/learn">
            <Card className="neumorph border-white/5 bg-heieh-gray hover:bg-heieh-gray/80 transition-all duration-300 cursor-pointer group h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-heieh-neon-green/15 flex items-center justify-center shrink-0">
                  <BookOpen size={18} className="text-heieh-neon-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">Browse Courses</p>
                  <p className="text-white/40 text-xs">Explore available content</p>
                </div>
                <ArrowRight size={16} className="text-white/20 group-hover:text-heieh-neon-green transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/course">
            <Card className="neumorph border-white/5 bg-heieh-gray hover:bg-heieh-gray/80 transition-all duration-300 cursor-pointer group h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-heieh-neon-blue/15 flex items-center justify-center shrink-0">
                  <Play size={18} className="text-heieh-neon-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">Continue Learning</p>
                  <p className="text-white/40 text-xs">Pick up where you left off</p>
                </div>
                <ArrowRight size={16} className="text-white/20 group-hover:text-heieh-neon-blue transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <a href="https://cal.com/heiah/coaching" target="_blank" rel="noopener noreferrer">
            <Card className="neumorph border-white/5 bg-heieh-gray hover:bg-heieh-gray/80 transition-all duration-300 cursor-pointer group h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
                  <Music size={18} className="text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">Book Coaching</p>
                  <p className="text-white/40 text-xs">1:1 session with HeiaH</p>
                </div>
                <ArrowRight size={16} className="text-white/20 group-hover:text-purple-400 transition-colors" />
              </CardContent>
            </Card>
          </a>
        </div>

        {/* Enrolled courses */}
        <div>
          <h2 className="text-xl font-heading font-semibold text-white mb-6">
            Your Courses
          </h2>

          <Card className="neumorph border-white/5 bg-heieh-gray">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-heieh-neon-green/15 flex items-center justify-center">
                  <Music size={18} className="text-heieh-neon-green" />
                </div>
                <div>
                  <CardTitle className="text-white text-lg">Songwriting Masterclass</CardTitle>
                  <p className="text-white/40 text-sm">5 modules &middot; 0% complete</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="space-y-4">
                {modules.map((mod) => (
                  <Link
                    key={mod.id}
                    to="/course"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 text-sm font-medium shrink-0 group-hover:bg-heieh-neon-green/15 group-hover:text-heieh-neon-green transition-colors">
                      {mod.id}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                        {mod.title}
                      </p>
                      {/* Progress bar */}
                      <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-heieh-neon-green rounded-full transition-all duration-500"
                          style={{ width: `${mod.progress}%` }}
                        />
                      </div>
                    </div>

                    <span className="text-white/30 text-xs shrink-0">{mod.progress}%</span>

                    <ArrowRight size={14} className="text-white/20 group-hover:text-heieh-neon-green transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
