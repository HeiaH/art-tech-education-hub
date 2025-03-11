
import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRevealAnimation } from '../../utils/animations';
import { useLanguage } from '../../hooks/useLanguage';
import CategorySelector from './CategorySelector';
import CategoryContent from './CategoryContent';
import ImageViewer from './ImageViewer';

const ArtistSection = () => {
  const [activeCategory, setActiveCategory] = useState('music');
  const [activePhotoSubcategory, setActivePhotoSubcategory] = useState('portrait');
  const [activeDrawingSubcategory, setActiveDrawingSubcategory] = useState('watercolor');
  const [isSectionCollapsed, setIsSectionCollapsed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { ref: sectionRef, isVisible: sectionVisible } = useRevealAnimation();
  const { t } = useLanguage();
  
  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // Handle subcategory changes
  const handlePhotoSubcategoryChange = (subcategoryId: string) => {
    setActivePhotoSubcategory(subcategoryId);
  };

  const handleDrawingSubcategoryChange = (subcategoryId: string) => {
    setActiveDrawingSubcategory(subcategoryId);
  };

  // Toggle section collapse
  const toggleSectionCollapse = () => {
    setIsSectionCollapsed(!isSectionCollapsed);
  };

  // Image viewer
  const openImageViewer = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  return (
    <section 
      id="artist" 
      className="section-padding bg-heieh-dark relative py-24"
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-20 pointer-events-none" />
      
      <div className="container mx-auto">
        <div className="mb-12 text-center relative">
          {/* Collapsible section control */}
          <button 
            onClick={toggleSectionCollapse}
            className="absolute right-0 top-0 neumorph neumorph-hover p-2 rounded-full"
            aria-label={isSectionCollapsed ? "Expand section" : "Collapse section"}
          >
            {isSectionCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
          
          <span className="px-3 py-1 rounded-full bg-heieh-gray text-xs uppercase tracking-wider text-white/70 inline-block mb-3">
            {t('artist')}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading mb-8">{t('creativeWorks')}</h2>
          
          {/* Render the section content only if not collapsed */}
          {!isSectionCollapsed && (
            <>
              {/* Category Selector */}
              <CategorySelector 
                activeCategory={activeCategory} 
                onCategoryChange={handleCategoryChange} 
              />
            
              {/* Content Area */}
              <div className="mt-12">
                <CategoryContent
                  activeCategory={activeCategory}
                  activePhotoSubcategory={activePhotoSubcategory}
                  activeDrawingSubcategory={activeDrawingSubcategory}
                  onPhotoSubcategoryChange={handlePhotoSubcategoryChange}
                  onDrawingSubcategoryChange={handleDrawingSubcategoryChange}
                  onImageSelect={openImageViewer}
                />
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Full-screen image viewer */}
      {selectedImage && (
        <ImageViewer 
          imageSrc={selectedImage} 
          onClose={closeImageViewer} 
        />
      )}
    </section>
  );
};

export default ArtistSection;
