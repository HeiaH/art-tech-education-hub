
import MusicCategory from './categories/MusicCategory';
import PhotographyCategory from './categories/PhotographyCategory';
import DrawingCategory from './categories/DrawingCategory';
import PaintingCategory from './categories/PaintingCategory';
import ProductionCategory from './categories/ProductionCategory';

interface CategoryContentProps {
  activeCategory: string;
  activePhotoSubcategory: string;
  activeDrawingSubcategory: string;
  onPhotoSubcategoryChange: (subcategoryId: string) => void;
  onDrawingSubcategoryChange: (subcategoryId: string) => void;
  onImageSelect: (imagePath: string) => void;
}

const CategoryContent = ({
  activeCategory,
  activePhotoSubcategory,
  activeDrawingSubcategory,
  onPhotoSubcategoryChange,
  onDrawingSubcategoryChange,
  onImageSelect
}: CategoryContentProps) => {
  
  // Render category content based on active category
  switch (activeCategory) {
    case 'music':
      return <MusicCategory />;
    case 'photography':
      return (
        <PhotographyCategory
          activeSubcategory={activePhotoSubcategory}
          onSubcategoryChange={onPhotoSubcategoryChange}
          onImageSelect={onImageSelect}
        />
      );
    case 'drawing':
      return (
        <DrawingCategory
          activeSubcategory={activeDrawingSubcategory}
          onSubcategoryChange={onDrawingSubcategoryChange}
          onImageSelect={onImageSelect}
        />
      );
    case 'painting':
      return <PaintingCategory onImageSelect={onImageSelect} />;
    case 'production':
      return <ProductionCategory />;
    default:
      return null;
  }
};

export default CategoryContent;
