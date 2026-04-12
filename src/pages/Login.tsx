import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Music, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-heieh-dark flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-heieh-neon-green/5 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 mb-8 text-sm"
        >
          <ArrowLeft size={16} />
          Back to heiah.de
        </Link>

        <Card className="neumorph border-white/5 bg-heieh-gray">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-xl bg-heieh-neon-green/15 flex items-center justify-center">
              <Music size={24} className="text-heieh-neon-green" />
            </div>
            <CardTitle className="text-white font-heading text-2xl">Welcome back</CardTitle>
            <CardDescription className="text-white/50">
              Sign in to access your courses
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/70">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="bg-heieh-dark border-white/10 text-white placeholder:text-white/30 focus-visible:ring-heieh-neon-green/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/70">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="bg-heieh-dark border-white/10 text-white placeholder:text-white/30 focus-visible:ring-heieh-neon-green/50"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-heieh-neon-green hover:bg-heieh-neon-green/90 text-black font-semibold rounded-full h-11"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <p className="text-center mt-6 text-white/40 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-heieh-neon-green hover:text-heieh-neon-green/80 transition-colors">
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
