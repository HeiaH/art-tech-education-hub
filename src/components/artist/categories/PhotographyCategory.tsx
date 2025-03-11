
import { useState, useEffect } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { getCategoryImages } from '../../../utils/imageHelper';

// Photography subcategories
const photographySubcategories = [
  { id: 'portrait', label: 'Portrait' },
  { id: 'urban', label: 'Urban' },
  { id: 'nature', label: 'Nature' },
  { id: 'lightpainting', label: 'Light Painting' },
];

interface PhotographyCategoryProps {
  activeSubcategory: string;
  onSubcategoryChange: (subcategoryId: string) => void;
  onImageSelect: (imagePath: string) => void;
}

const PhotographyCategory = ({ 
  activeSubcategory, 
  onSubcategoryChange, 
  onImageSelect 
}: PhotographyCategoryProps) => {
  const { t } = useLanguage();
  const [categoryImages, setCategoryImages] = useState<string[]>([]);
  
  // Load images when subcategory changes
  useEffect(() => {
    const loadImages = async () => {
      const images = await getCategoryImages('photography', activeSubcategory);
      setCategoryImages(images);
    };
    
    loadImages();
  }, [activeSubcategory]);
  
  return (
    <div className="neumorph p-6 rounded-2xl animate-fade-in">
      <h3 className="text-2xl font-heading mb-4">{t('photography')}</h3>
      
      {/* Subcategory navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {photographySubcategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onSubcategoryChange(sub.id)}
            className={`
              neumorph neumorph-hover py-1 px-3 rounded-full text-sm transition-all duration-300
              ${activeSubcategory === sub.id ? 'text-heieh-neon-green' : 'text-white/70 hover:text-white'}
            `}
          >
            {sub.label}
          </button>
        ))}
      </div>
      
      {/* Dynamic gallery with masonry-like layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-min">
        {categoryImages.map((img, i) => {
          // Determine if image should span multiple columns (for variety)
          const spanClass = i % 5 === 0 ? 'col-span-2' : '';
          
          return (
            <div 
              key={i} 
              className={`${spanClass} overflow-hidden rounded-lg cursor-pointer transform transition hover:scale-105 hover:shadow-lg`}
              onClick={() => onImageSelect(img)}
            >
              <div className="relative aspect-square md:aspect-auto bg-heieh-gray image-loading">
                <img 
                  src={img} 
                  alt={`${activeSubcategory} ${i+1}`} 
                  className="w-full h-full object-cover opacity-0 transition-opacity duration-500" 
                  onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}
                />
                <div className="absolute inset-0 flex items-center justify-center text-white/30">
                  {activeSubcategory} {i+1}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <p className="mt-6 text-white/70">
        {t('photographyDescription')}
      </p>
    </div>
  );
};

export default PhotographyCategory;
