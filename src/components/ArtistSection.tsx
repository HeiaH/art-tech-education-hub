
import { useState } from 'react';
import { Music, Camera, Pencil, Palette, Settings } from 'lucide-react';
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

const ArtistSection = () => {
  const [activeCategory, setActiveCategory] = useState('music');
  const { ref: sectionRef, isVisible: sectionVisible } = useRevealAnimation();
  const { t } = useLanguage();
  
  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // Render category content based on active category
  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'music':
        return (
          <div className="neumorph p-6 rounded-2xl animate-fade-in">
            <h3 className="text-2xl font-heading mb-4">{t('music')}</h3>
            <div className="rounded-lg overflow-hidden" style={{ maxHeight: '166px' }}>
              <iframe 
                width="100%" 
                height="166" 
                scrolling="no" 
                frameBorder="no" 
                allow="autoplay" 
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1788249257&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
              ></iframe>
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-heieh-gray rounded-lg overflow-hidden image-loading">
                  <div className="w-full h-full flex items-center justify-center text-white/30">
                    Photo {i}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-white/70">
              {t('photographyDescription')}
            </p>
          </div>
        );
      case 'drawing':
        return (
          <div className="neumorph p-6 rounded-2xl animate-fade-in">
            <h3 className="text-2xl font-heading mb-4">{t('drawing')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-heieh-gray rounded-lg overflow-hidden image-loading">
                  <div className="w-full h-full flex items-center justify-center text-white/30">
                    Drawing {i}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-white/70">
              {t('drawingDescription')}
            </p>
          </div>
        );
      case 'painting':
        return (
          <div className="neumorph p-6 rounded-2xl animate-fade-in">
            <h3 className="text-2xl font-heading mb-4">{t('painting')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="aspect-video bg-heieh-gray rounded-lg overflow-hidden image-loading">
                  <div className="w-full h-full flex items-center justify-center text-white/30">
                    Painting {i}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-white/70">
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
            <p className="mt-4 text-white/70">
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
        <div className="mb-12 text-center">
          <span className="px-3 py-1 rounded-full bg-heieh-gray text-xs uppercase tracking-wider text-white/70 inline-block mb-3">
            {t('artist')}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading mb-8">{t('creativeWorks')}</h2>
          
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
        </div>
        
        {/* Content Area */}
        <div className="mt-12">
          {renderCategoryContent()}
        </div>
        
        {/* Interactive Gallery Teaser */}
        <div className={`mt-16 neumorph p-6 rounded-xl text-center ${sectionVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
          <h3 className="text-xl font-heading mb-3">{t('interactiveGallery')}</h3>
          <p className="text-white/70 mb-4">
            {t('galleryDescription')}
          </p>
          <button className="neumorph neumorph-hover py-2 px-6 bg-heieh-neon-green/20 hover:bg-heieh-neon-green/30 text-heieh-neon-green rounded-full transition-all duration-300">
            {t('comingSoon')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
