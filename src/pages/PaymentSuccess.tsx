import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CONFETTI_COUNT = 60;

interface ConfettiPiece {
  id: number;
  left: string;
  delay: string;
  duration: string;
  color: string;
  size: number;
}

const PaymentSuccess = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const colors = ['#1DB954', '#1a73e8', '#ffffff', '#f0f0f0', '#1DB954'];
    const pieces: ConfettiPiece[] = Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 3}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 8,
    }));
    setConfetti(pieces);
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-heieh-dark flex items-center justify-center relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 animate-confetti-fall pointer-events-none"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}

      {/* Content */}
      <div
        className={`text-center px-6 max-w-lg transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        <div className="neumorph rounded-2xl p-10 relative">
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-2xl border border-heieh-neon-green/20 shadow-[0_0_60px_rgba(29,185,84,0.15)]" />

          <div className="w-20 h-20 rounded-full bg-heieh-neon-green/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-heieh-neon-green" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-heading">
            You're in!
          </h1>

          <p className="text-white/60 text-lg mb-2">
            Thanks for your purchase.
          </p>
          <p className="text-white/40 text-sm mb-8">
            Your course access is now active. Check your email for a confirmation receipt.
          </p>

          <Link to="/course">
            <Button className="bg-heieh-neon-green hover:bg-heieh-neon-green/90 text-black font-semibold rounded-xl py-5 px-8 transition-all hover:shadow-[0_0_20px_rgba(29,185,84,0.35)] w-full sm:w-auto">
              <Sparkles size={16} className="mr-2" />
              Start Learning
            </Button>
          </Link>

          <p className="text-white/25 text-xs mt-6">
            Need help? Reach out at hello@heiah.de
          </p>
        </div>
      </div>

      {/* Confetti keyframes injected via style tag */}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation: confetti-fall linear forwards;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
