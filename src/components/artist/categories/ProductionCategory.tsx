
import { useLanguage } from '../../../hooks/useLanguage';

const ProductionCategory = () => {
  const { t } = useLanguage();
  
  return (
    <div className="neumorph p-6 rounded-2xl animate-fade-in">
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
