import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { CheckCircle, Music, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentSuccess = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [purchaseSaved, setPurchaseSaved] = useState(false);

  useEffect(() => {
    // Client-side purchase marker: store in localStorage so the dashboard
    // can show course access even without a backend webhook.
    const purchased = localStorage.getItem('heiah_purchases');
    const purchases: string[] = purchased ? JSON.parse(purchased) : [];

    if (!purchases.includes('course')) {
      purchases.push('course');
      localStorage.setItem('heiah_purchases', JSON.stringify(purchases));
    }

    setPurchaseSaved(true);

    // Redirect to dashboard after 5 seconds if user is logged in
    const timer = setTimeout(() => {
      if (user) navigate('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-heieh-dark flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-heieh-neon-green/15 flex items-center justify-center animate-scale-in">
            <CheckCircle size={44} className="text-heieh-neon-green" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Danke für deinen Kauf! 🎉
        </h1>

        {/* Subtitle */}
        <p className="text-white/60 text-lg mb-6 leading-relaxed">
          Check deine E-Mails — du solltest in Kürze eine Bestätigung und
          deine Zugangsdaten erhalten.
        </p>

        {/* Status indicator */}
        {purchaseSaved && (
          <p className="text-heieh-neon-green text-sm mb-8 flex items-center justify-center gap-2">
            <CheckCircle size={14} />
            Zugang wurde lokal aktiviert
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {user ? (
            <Link to="/dashboard">
              <Button className="bg-heieh-neon-green hover:bg-heieh-neon-green/90 text-black font-semibold rounded-xl px-8 py-5 transition-all hover:shadow-[0_0_20px_rgba(29,185,84,0.35)]">
                <span className="flex items-center gap-2">
                  Zum Dashboard
                  <ArrowRight size={16} />
                </span>
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="bg-heieh-neon-green hover:bg-heieh-neon-green/90 text-black font-semibold rounded-xl px-8 py-5 transition-all hover:shadow-[0_0_20px_rgba(29,185,84,0.35)]">
                <span className="flex items-center gap-2">
                  Einloggen & Loslegen
                  <ArrowRight size={16} />
                </span>
              </Button>
            </Link>
          )}

          <Link to="/learn">
            <Button
              variant="outline"
              className="border border-white/15 text-white/80 hover:bg-white/5 rounded-xl px-8 py-5 bg-transparent"
            >
              Zurück zum Kurs
            </Button>
          </Link>
        </div>

        {/* Home link */}
        <div className="mt-10">
          <Link
            to="/"
            className="text-white/30 hover:text-heieh-neon-green text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Music size={14} />
            heiah.de
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
