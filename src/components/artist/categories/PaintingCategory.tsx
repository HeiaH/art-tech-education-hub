
import { useState, useEffect } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { getCategoryImages } from '../../../utils/imageHelper';

interface PaintingCategoryProps {
  onImageSelect: (imagePath: string) => void;
}

const PaintingCategory = ({ onImageSelect }: PaintingCategoryProps) => {
  const { t } = useLanguage();
  const [categoryImages, setCategoryImages] = useState<string[]>([]);
  
  useEffect(() => {
    const loadImages = async () => {
      const images = await getCategoryImages('painting');
      setCategoryImages(images);
    };
    
    loadImages();
  }, []);
  
  return (
    <div className="neumorph p-6 rounded-2xl animate-fade-in">
      <h3 className="text-2xl font-heading mb-4">{t('painting')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryImages.map((img, i) => (
          <div 
            key={i} 
            className="overflow-hidden rounded-lg cursor-pointer transform transition hover:scale-105"
            onClick={() => onImageSelect(img)}
          >
            <div className="aspect-video bg-heieh-gray rounded-lg overflow-hidden image-loading">
              <img 
                src={img} 
                alt={`Painting ${i+1}`} 
                className="w-full h-full object-cover opacity-0 transition-opacity duration-500" 
                onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white/30">
                Painting {i+1}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-white/70">
        {t('paintingDescription')}
      </p>
    </div>
  );
};

export default PaintingCategory;
