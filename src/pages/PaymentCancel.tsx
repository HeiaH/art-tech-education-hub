import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentCancel = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-heieh-dark flex items-center justify-center">
      <div
        className={`text-center px-6 max-w-lg transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        <div className="neumorph rounded-2xl p-10 relative">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <XCircle size={40} className="text-white/40" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-heading">
            Payment cancelled
          </h1>

          <p className="text-white/60 text-lg mb-2">
            No worries — nothing was charged.
          </p>
          <p className="text-white/40 text-sm mb-8">
            If you ran into an issue or have questions, feel free to reach out. Otherwise, you can
            come back anytime.
          </p>

          <Link to="/learn#pricing">
            <Button className="border border-white/15 text-white/80 hover:bg-white/5 rounded-xl py-5 px-8 bg-transparent w-full sm:w-auto">
              <ArrowLeft size={16} className="mr-2" />
              Back to Pricing
            </Button>
          </Link>

          <p className="text-white/25 text-xs mt-6">
            Need help? Reach out at hello@heiah.de
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
