
import { useState } from 'react';
import { Music, Camera, Pencil, Palette, Settings, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useRevealAnimation } from '../utils/animations';
import { useLanguage } from '../hooks/useLanguage';

// Categories for the artist section
const categories = [
  { id: 'music', label: 'Music', icon: <Music size={18} /> },
  { id: 'photography', label: 'Photography', icon: <Camera size={18} /> },
  { id: 'drawing', label: 'Drawing', icon: <Pencil size={18} /> },
  { id: 'painting', label: 'Painting', icon: <Palette size={18} /> },
  { id: 'production', label: 'Production', icon: <Settings size={18} /> },
];

// Photography subcategories
const photographySubcategories = [
  { id: 'portrait', label: 'Portrait' },
  { id: 'urban', label: 'Urban' },
  { id: 'nature', label: 'Nature' },
  { id: 'lightpainting', label: 'Light Painting' },
];

// Drawing subcategories
const drawingSubcategories = [
  { id: 'watercolor', label: 'Watercolor' },
  { id: 'pen_ink', label: 'Pen & Ink' },
  { id: 'digital', label: 'Digital' },
];

const ArtistSection = () => {
  const [activeCategory, setActiveCategory] = useState('music');
  const [activePhotoSubcategory, setActivePhotoSubcategory] = useState('portrait');
  const [activeDrawingSubcategory, setActiveDrawingSubcategory] = useState('watercolor');
  const [isSectionCollapsed, setIsSectionCollapsed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { ref: sectionRef, isVisible: sectionVisible } = useRevealAnimation();
  const { t, language } = useLanguage();
  
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

  // Helper function to get images for a category/subcategory
  const getImages = (category: string, subcategory?: string) => {
    let basePath = '/images';
    
    if (category === 'photography' && subcategory) {
      return [`${basePath}/photography/${subcategory}/image1.jpg`, `${basePath}/photography/${subcategory}/image2.jpg`, `${basePath}/photography/${subcategory}/image3.jpg`];
    } else if (category === 'drawing' && subcategory) {
      return [`${basePath}/drawing/${subcategory}/image1.jpg`, `${basePath}/drawing/${subcategory}/image2.jpg`, `${basePath}/drawing/${subcategory}/image3.jpg`];
    } else if (category === 'painting') {
      return [`${basePath}/painting/image1.jpg`, `${basePath}/painting/image2.jpg`];
    }
    
    // Default fallback
    return [];
  };

  // Render category content based on active category
  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'music':
        return (
          <div className="neumorph p-6 rounded-2xl animate-fade-in">
            <h3 className="text-2xl font-heading mb-4">{t('music')}</h3>
            <div className="rounded-lg overflow-hidden mb-4">
              <iframe 
                width="100%" 
                height="300" 
                scrolling="no" 
                frameBorder="no" 
                allow="autoplay" 
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1410240007&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              ></iframe>
              <div className="text-xs text-white/50 mt-1 font-sans">
                <a href="https://soundcloud.com/heiahmusic" target="_blank" rel="noopener noreferrer" className="hover:text-heieh-neon-green">HeiaH</a> · 
                <a href="https://soundcloud.com/heiahmusic/roundnround" target="_blank" rel="noopener noreferrer" className="hover:text-heieh-neon-green ml-1">RoundnRound</a>
              </div>
            </div>
            <p className="mt-4 text-white/70">
              {t('musicDescription')}
            </p>
          </div>
        );
      case 'photography':
        return (
          <div className="neumorph p-6 rounded-2xl animate-fade-in">
            <h3 className="text-2xl font-heading mb-4">{t('photography')}</h3>
            
            {/* Subcategory navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {photographySubcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handlePhotoSubcategoryChange(sub.id)}
                  className={`
                    neumorph neumorph-hover py-1 px-3 rounded-full text-sm transition-all duration-300
                    ${activePhotoSubcategory === sub.id ? 'text-heieh-neon-green' : 'text-white/70 hover:text-white'}
                  `}
                >
                  {sub.label}
                </button>
              ))}
            </div>
            
            {/* Dynamic gallery with masonry-like layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-min">
              {getImages('photography', activePhotoSubcategory).map((img, i) => {
                // Determine if image should span multiple columns (for variety)
                const spanClass = i % 5 === 0 ? 'col-span-2' : '';
                
                return (
                  <div 
                    key={i} 
                    className={`${spanClass} overflow-hidden rounded-lg cursor-pointer transform transition hover:scale-105 hover:shadow-lg`}
                    onClick={() => openImageViewer(img)}
                  >
                    <div className="relative aspect-square md:aspect-auto bg-heieh-gray image-loading">
                      <img 
                        src={img} 
                        alt={`${activePhotoSubcategory} ${i+1}`} 
                        className="w-full h-full object-cover opacity-0 transition-opacity duration-500" 
                        onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-white/30">
                        {activePhotoSubcategory} {i+1}
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
      case 'drawing':
        return (
          <div className="neumorph p-6 rounded-2xl animate-fade-in">
            <h3 className="text-2xl font-heading mb-4">{t('drawing')}</h3>
            
            {/* Subcategory navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {drawingSubcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleDrawingSubcategoryChange(sub.id)}
                  className={`
                    neumorph neumorph-hover py-1 px-3 rounded-full text-sm transition-all duration-300
                    ${activeDrawingSubcategory === sub.id ? 'text-heieh-neon-green' : 'text-white/70 hover:text-white'}
                  `}
                >
                  {sub.label}
                </button>
              ))}
            </div>
            
            {/* Dynamic drawing gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getImages('drawing', activeDrawingSubcategory).map((img, i) => (
                <div 
                  key={i} 
                  className="overflow-hidden rounded-lg cursor-pointer transform transition hover:scale-105"
                  onClick={() => openImageViewer(img)}
                >
                  <div className="aspect-square bg-heieh-gray rounded-lg overflow-hidden image-loading">
                    <img 
                      src={img} 
                      alt={`${activeDrawingSubcategory} ${i+1}`} 
                      className="w-full h-full object-cover opacity-0 transition-opacity duration-500" 
                      onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-white/30">
                      {activeDrawingSubcategory} {i+1}
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
      case 'painting':
        return (
          <div className="neumorph p-6 rounded-2xl animate-fade-in">
            <h3 className="text-2xl font-heading mb-4">{t('painting')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getImages('painting').map((img, i) => (
                <div 
                  key={i} 
                  className="overflow-hidden rounded-lg cursor-pointer transform transition hover:scale-105"
                  onClick={() => openImageViewer(img)}
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
      case 'production':
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
      default:
        return null;
    }
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
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`
                      neumorph neumorph-hover py-2 px-4 rounded-full flex items-center gap-2 transition-all duration-300
                      ${activeCategory === category.id ? 'text-heieh-neon-green' : 'text-white/70 hover:text-white'}
                    `}
                  >
                    {category.icon}
                    <span>{t(category.id)}</span>
                  </button>
                ))}
              </div>
            
              {/* Content Area */}
              <div className="mt-12">
                {renderCategoryContent()}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Full-screen image viewer */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl max-h-full">
            <button 
              onClick={closeImageViewer}
              className="absolute -top-12 right-0 text-white bg-black/50 p-2 rounded-full"
            >
              <X size={24} />
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-w-full max-h-[90vh] object-contain" 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ArtistSection;
