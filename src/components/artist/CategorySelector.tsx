
import { Music, Camera, Pencil, Palette, Settings } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

// Categories for the artist section
const categories = [
  { id: 'music', label: 'Music', icon: <Music size={18} /> },
  { id: 'photography', label: 'Photography', icon: <Camera size={18} /> },
  { id: 'drawing', label: 'Drawing', icon: <Pencil size={18} /> },
  { id: 'painting', label: 'Painting', icon: <Palette size={18} /> },
  { id: 'production', label: 'Production', icon: <Settings size={18} /> },
];

interface CategorySelectorProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategorySelector = ({ activeCategory, onCategoryChange }: CategorySelectorProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
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
  );
};

export default CategorySelector;
