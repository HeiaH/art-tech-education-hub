
import { X } from 'lucide-react';

interface ImageViewerProps {
  imageSrc: string;
  onClose: () => void;
}

const ImageViewer = ({ imageSrc, onClose }: ImageViewerProps) => {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-5xl max-h-full">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white bg-black/50 p-2 rounded-full"
        >
          <X size={24} />
        </button>
        <img 
          src={imageSrc} 
          alt="Enlarged view" 
          className="max-w-full max-h-[90vh] object-contain" 
        />
      </div>
    </div>
  );
};

export default ImageViewer;
