// Minimal test for image generators
let customImageDimensions = { width: 400, height: 300 };

function setImageDimensions(width, height) {
  customImageDimensions = { 
    width: parseInt(width) || 400, 
    height: parseInt(height) || 300 
  };
}

function getImageDimensions() {
  return customImageDimensions;
}

const imageUrlGenerators = {
  placeholderImage: () => {
    const { width, height } = customImageDimensions;
    return `https://via.placeholder.com/${width}x${height}`;
  },

  loremPicsumImage: () => {
    const { width, height } = customImageDimensions;
    return `https://picsum.photos/${width}/${height}`;
  },

  qrCodeUrl: () => {
    const { width, height } = customImageDimensions;
    const size = Math.min(width, height);
    const data = 'test-data';
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { imageUrlGenerators, setImageDimensions, getImageDimensions };
} else if (typeof window !== 'undefined') {
  window.imageUrlGenerators = imageUrlGenerators;
  window.setImageDimensions = setImageDimensions;
  window.getImageDimensions = getImageDimensions;
}

console.log('Minimal image generators loaded');
console.log('Functions available:', Object.keys(imageUrlGenerators));