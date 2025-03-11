/**
 * Image helper for loading and managing images from the file structure
 */

// Default paths for images
const imagePaths = {
  profile: '/images/profile/',
  photography: {
    portrait: '/images/photography/portrait/',
    urban: '/images/photography/urban/',
    nature: '/images/photography/nature/',
    lightpainting: '/images/photography/lightpainting/',
  },
  drawing: {
    watercolor: '/images/drawing/watercolor/',
    pen_ink: '/images/drawing/pen_ink/',
    digital: '/images/drawing/digital/',
  },
  painting: '/images/painting/',
  production: '/images/production/',
};

// Placeholder image paths for development
export const getPlaceholderImages = (category: string, subcategory?: string, count: number = 6) => {
  // This function returns an array of placeholder image paths for development
  // Will be replaced with actual images when available
  const images = [];
  
  for (let i = 1; i <= count; i++) {
    images.push(`/placeholder.svg`); // Use the placeholder SVG as fallback
  }
  
  return images;
};

// Function to get real images when available
export const getImages = (category: string, subcategory?: string, count: number = 6) => {
  let basePath = '';
  
  // Determine the base path based on category and subcategory
  if (category === 'photography' && subcategory) {
    basePath = imagePaths.photography[subcategory as keyof typeof imagePaths.photography];
  } else if (category === 'drawing' && subcategory) {
    basePath = imagePaths.drawing[subcategory as keyof typeof imagePaths.drawing];
  } else if (category === 'painting') {
    basePath = imagePaths.painting;
  } else if (category === 'profile') {
    basePath = imagePaths.profile;
    return [`${basePath}profile.jpg`]; // Specific handling for profile
  }
  
  // For development/placeholder - in production you'd scan directories or use a manifest
  return getPlaceholderImages(category, subcategory, count);
};

/**
 * Dynamically get all images from a specific folder
 * @param folderPath The path to the folder containing the images
 * @returns An array of image paths
 */
export const getImagesFromFolder = async (folderPath: string): Promise<string[]> => {
  try {
    // This is a client-side implementation that relies on the folder structure
    // being available at build time through Vite's import.meta.glob
    
    // For development/demo purposes, we'll check if the folder exists in the public directory
    // and return some placeholder images if it doesn't
    
    // Check if we're in development mode
    const isDev = import.meta.env.DEV;
    
    if (isDev) {
      // In development, we can try to use the Vite glob import
      try {
        // Try to import all images from the specified folder
        const imageModules = import.meta.glob('/public/images/**/*.{png,jpg,jpeg,gif,webp,svg}', { eager: true });
        
        // Filter for images in the specified folder
        const folderImages = Object.keys(imageModules)
          .filter(path => path.startsWith(`/public${folderPath}`))
          .map(path => path.replace('/public', ''));
        
        // If we found images, return them
        if (folderImages.length > 0) {
          return folderImages;
        }
      } catch (e) {
        console.warn('Could not use Vite glob import for images:', e);
      }
    }
    
    // Fallback: Check if we can find the folder directly
    // This may not work in production builds depending on how assets are handled
    try {
      const response = await fetch(`${folderPath}/index.json`);
      if (response.ok) {
        const data = await response.json();
        return data.images.map((img: string) => `${folderPath}/${img}`);
      }
    } catch (e) {
      console.warn('Could not fetch image index:', e);
    }
    
    // Final fallback: return placeholder images
    return [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
    ];
  } catch (error) {
    console.error('Error getting images from folder:', error);
    return [];
  }
};

/**
 * Dynamically load images from the ArtistSection category folders
 * @param category The category name (photography, drawing, etc.)
 * @param subcategory Optional subcategory
 * @returns An array of image paths
 */
export const getCategoryImages = async (category: string, subcategory?: string): Promise<string[]> => {
  let folderPath = `/images/${category}`;
  
  if (subcategory) {
    folderPath = `${folderPath}/${subcategory}`;
  }
  
  return getImagesFromFolder(folderPath);
};

export default {
  getImages,
  getPlaceholderImages,
  getImagesFromFolder,
  getCategoryImages
};
