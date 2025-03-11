
import { useLanguage } from '../../../hooks/useLanguage';
import { useEffect, useState } from 'react';

const ProductionCategory = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Small delay to ensure smooth animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      className="neumorph p-6 rounded-2xl"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(20px)',
        transition: 'opacity 600ms ease, transform 600ms ease'
      }}
    >
      <h3 className="text-2xl font-heading mb-4">{t('production')}</h3>
      <div className="aspect-video bg-heieh-gray rounded-lg overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-white/50">
          Production Process Video
        </div>
      </div>
      <p className="mt-6 text-white/70">
        {t('productionDescription')}
      </p>
    </div>
  );
};

export default ProductionCategory;
