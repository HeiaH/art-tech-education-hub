import { Link } from 'react-router-dom';
import { XCircle, Music, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-heieh-dark flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Cancel icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center animate-scale-in">
            <XCircle size={44} className="text-white/40" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Kauf abgebrochen
        </h1>

        {/* Subtitle */}
        <p className="text-white/60 text-lg mb-8 leading-relaxed">
          Keine Sorge, du kannst jederzeit zurückkommen und den Kauf
          abschließen. Deine Daten sind sicher — es wurde nichts berechnet.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/learn#pricing">
            <Button className="bg-heieh-neon-green hover:bg-heieh-neon-green/90 text-black font-semibold rounded-xl px-8 py-5 transition-all hover:shadow-[0_0_20px_rgba(29,185,84,0.35)]">
              <span className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Zurück zu den Preisen
              </span>
            </Button>
          </Link>

          <Link to="/">
            <Button
              variant="outline"
              className="border border-white/15 text-white/80 hover:bg-white/5 rounded-xl px-8 py-5 bg-transparent"
            >
              Zur Startseite
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

export default PaymentCancel;
