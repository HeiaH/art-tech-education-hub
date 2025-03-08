
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

export default {
  getImages,
  getPlaceholderImages
};
