
import { useState, useEffect } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { getCategoryImages } from '../../../utils/imageHelper';

// Drawing subcategories
const drawingSubcategories = [
  { id: 'watercolor', label: 'Watercolor' },
  { id: 'pen_ink', label: 'Pen & Ink' },
  { id: 'digital', label: 'Digital' },
];

interface DrawingCategoryProps {
  activeSubcategory: string;
  onSubcategoryChange: (subcategoryId: string) => void;
  onImageSelect: (imagePath: string) => void;
}

const DrawingCategory = ({ 
  activeSubcategory, 
  onSubcategoryChange, 
  onImageSelect 
}: DrawingCategoryProps) => {
  const { t } = useLanguage();
  const [categoryImages, setCategoryImages] = useState<string[]>([]);
  
  // Load images when subcategory changes
  useEffect(() => {
    const loadImages = async () => {
      const images = await getCategoryImages('drawing', activeSubcategory);
      setCategoryImages(images);
    };
    
    loadImages();
  }, [activeSubcategory]);
  
  return (
    <div className="neumorph p-6 rounded-2xl animate-fade-in">
      <h3 className="text-2xl font-heading mb-4">{t('drawing')}</h3>
      
      {/* Subcategory navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {drawingSubcategories.map((sub) => (
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
      
      {/* Dynamic drawing gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryImages.map((img, i) => (
          <div 
            key={i} 
            className="overflow-hidden rounded-lg cursor-pointer transform transition hover:scale-105"
            onClick={() => onImageSelect(img)}
          >
            <div className="aspect-square bg-heieh-gray rounded-lg overflow-hidden image-loading">
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
        ))}
      </div>
      
      <p className="mt-6 text-white/70">
        {t('drawingDescription')}
      </p>
    </div>
  );
};

export default DrawingCategory;
