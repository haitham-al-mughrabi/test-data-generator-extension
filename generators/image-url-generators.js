// Image and media URL generators - Fixed version
let sharedImageData = null;
let customImageDimensions = { width: 400, height: 300 }; // Default dimensions

// Function to set custom image dimensions
function setImageDimensions(width, height) {
  customImageDimensions = { 
    width: parseInt(width) || 400, 
    height: parseInt(height) || 300 
  };
  // Reset shared data to use new dimensions
  sharedImageData = null;
}

// Function to get current image dimensions
function getImageDimensions() {
  return customImageDimensions;
}

// Safe helper functions with fallbacks
function safeRandomChoice(arr) {
  if (typeof randomChoice === 'function') {
    return randomChoice(arr);
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

function safeRandomNum(min, max) {
  if (typeof randomNum === 'function') {
    return randomNum(min, max);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSharedImageData() {
  const imageCategories = [
    'nature', 'city', 'people', 'technology', 'food', 'animals', 'architecture',
    'business', 'travel', 'sports', 'art', 'fashion', 'cars', 'abstract'
  ];

  const videoFormats = ['mp4', 'webm', 'ogg', 'avi', 'mov'];
  const audioFormats = ['mp3', 'wav', 'ogg', 'aac', 'm4a'];

  sharedImageData = {
    category: safeRandomChoice(imageCategories),
    size: customImageDimensions,
    videoFormat: safeRandomChoice(videoFormats),
    audioFormat: safeRandomChoice(audioFormats),
    imageId: safeRandomNum(1, 1000),
    seed: Math.random().toString(36).substring(2, 15)
  };
}

// Safe name data with fallback
function getSafeName() {
  if (typeof sharedNameData !== 'undefined' && sharedNameData) {
    return {
      firstName: sharedNameData.firstName?.en || 'John',
      lastName: sharedNameData.lastName?.en || 'Doe'
    };
  }
  
  if (typeof generateSharedNameData === 'function') {
    try {
      generateSharedNameData();
      if (sharedNameData) {
        return {
          firstName: sharedNameData.firstName?.en || 'John',
          lastName: sharedNameData.lastName?.en || 'Doe'
        };
      }
    } catch (e) {
      // Fallback if generation fails
    }
  }
  
  // Final fallback
  return {
    firstName: 'John',
    lastName: 'Doe'
  };
}

const imageUrlGenerators = {
  // Placeholder image services - exact dimensions guaranteed
  placeholderImage: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    return `https://via.placeholder.com/${width}x${height}`;
  },

  placeholderImageWithText: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const text = sharedImageData.category.toUpperCase();
    return `https://via.placeholder.com/${width}x${height}?text=${text}`;
  },

  placeholderImageColored: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const colors = ['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8', 'F7DC6F', 'BB8FCE', '85C1E9'];
    const bgColor = safeRandomChoice(colors);
    const textColor = 'FFFFFF';
    return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${width}x${height}`;
  },

  // Lorem Picsum (real photos) - exact dimensions guaranteed
  loremPicsumImage: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    return `https://picsum.photos/${width}/${height}`;
  },

  loremPicsumImageWithId: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const { imageId } = sharedImageData;
    return `https://picsum.photos/id/${imageId}/${width}/${height}`;
  },

  loremPicsumGrayscale: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    return `https://picsum.photos/${width}/${height}?grayscale`;
  },

  loremPicsumBlurred: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const blur = safeRandomNum(1, 10);
    return `https://picsum.photos/${width}/${height}?blur=${blur}`;
  },

  // Unsplash images - exact dimensions guaranteed
  unsplashImage: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height, category } = sharedImageData;
    return `https://source.unsplash.com/${width}x${height}/?${category}`;
  },

  unsplashFeaturedImage: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    return `https://source.unsplash.com/featured/${width}x${height}`;
  },

  unsplashDailyImage: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    return `https://source.unsplash.com/daily/${width}x${height}`;
  },

  // Avatar generators - exact dimensions where supported
  avatarDiceBear: () => {
    if (!sharedImageData) generateSharedImageData();
    const styles = ['avataaars', 'bottts', 'identicon', 'initials', 'personas'];
    const style = safeRandomChoice(styles);
    const { seed } = sharedImageData;
    const { width } = sharedImageData.size;
    return `https://avatars.dicebear.com/api/${style}/${seed}.svg?size=${width}`;
  },

  avatarRobohash: () => {
    if (!sharedImageData) generateSharedImageData();
    const { seed } = sharedImageData;
    const { width, height } = sharedImageData.size;
    const sets = ['set1', 'set2', 'set3', 'set4'];
    const set = safeRandomChoice(sets);
    return `https://robohash.org/${seed}.png?set=${set}&size=${width}x${height}`;
  },

  avatarPravatar: () => {
    if (!sharedImageData) generateSharedImageData();
    const { imageId } = sharedImageData;
    const { width } = sharedImageData.size;
    const size = Math.min(width, 500);
    return `https://i.pravatar.cc/${size}?img=${imageId}`;
  },

  // UI Avatars (text-based) - exact dimensions guaranteed
  uiAvatar: () => {
    const nameData = getSafeName();
    const name = `${nameData.firstName}+${nameData.lastName}`;
    if (!sharedImageData) generateSharedImageData();
    const { width } = sharedImageData.size;
    const colors = ['007bff', '28a745', 'dc3545', 'ffc107', '17a2b8', '6f42c1'];
    const background = safeRandomChoice(colors);
    return `https://ui-avatars.com/api/?name=${name}&size=${width}&background=${background}&color=fff`;
  },

  uiAvatarRounded: () => {
    const nameData = getSafeName();
    const name = `${nameData.firstName}+${nameData.lastName}`;
    if (!sharedImageData) generateSharedImageData();
    const { width } = sharedImageData.size;
    const colors = ['007bff', '28a745', 'dc3545', 'ffc107', '17a2b8', '6f42c1'];
    const background = safeRandomChoice(colors);
    return `https://ui-avatars.com/api/?name=${name}&size=${width}&background=${background}&color=fff&rounded=true`;
  },

  // Gravatar - supports exact sizes
  gravatar: () => {
    if (!sharedImageData) generateSharedImageData();
    const { seed } = sharedImageData;
    const hash = seed.substring(0, 32);
    const { width } = sharedImageData.size;
    return `https://www.gravatar.com/avatar/${hash}?s=${width}&d=identicon`;
  },

  // QR Code generators - exact dimensions guaranteed
  qrCodeUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { seed } = sharedImageData;
    const { width, height } = sharedImageData.size;
    const size = Math.min(width, height);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(seed)}`;
  },

  qrCodeColored: () => {
    if (!sharedImageData) generateSharedImageData();
    const { seed } = sharedImageData;
    const { width, height } = sharedImageData.size;
    const size = Math.min(width, height);
    const colors = ['000000', '1f77b4', 'ff7f0e', '2ca02c', 'd62728', '9467bd'];
    const color = safeRandomChoice(colors);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(seed)}&color=${color}`;
  },

  // Chart and graph URLs - exact dimensions guaranteed
  chartUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const chartTypes = ['line', 'bar', 'pie', 'doughnut', 'radar'];
    const chartType = safeRandomChoice(chartTypes);
    const data = Array.from({length: 5}, () => safeRandomNum(10, 100)).join(',');
    return `https://quickchart.io/chart?width=${width}&height=${height}&c={type:'${chartType}',data:{labels:['A','B','C','D','E'],datasets:[{data:[${data}]}]}}`;
  },

  chartBarUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const data = Array.from({length: 5}, () => safeRandomNum(10, 100)).join(',');
    return `https://quickchart.io/chart?width=${width}&height=${height}&c={type:'bar',data:{labels:['Jan','Feb','Mar','Apr','May'],datasets:[{data:[${data}]}]}}`;
  },

  chartPieUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const data = Array.from({length: 4}, () => safeRandomNum(10, 100)).join(',');
    return `https://quickchart.io/chart?width=${width}&height=${height}&c={type:'pie',data:{labels:['A','B','C','D'],datasets:[{data:[${data}]}]}}`;
  },

  // Country flags - exact dimensions guaranteed
  countryFlag: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const countries = ['sa', 'ae', 'kw', 'qa', 'bh', 'om', 'jo', 'lb', 'eg', 'ma'];
    const country = safeRandomChoice(countries);
    return `https://flagcdn.com/${width}x${height}/${country}.png`;
  },

  // Icon URLs - exact dimensions guaranteed
  iconUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width } = sharedImageData.size;
    const icons = ['home', 'user', 'settings', 'search', 'heart', 'star', 'phone', 'email'];
    const icon = safeRandomChoice(icons);
    const colors = ['000000', 'ffffff', '007bff', '28a745', 'dc3545'];
    const color = safeRandomChoice(colors);
    return `https://img.icons8.com/${width}/${color}/${icon}.png`;
  },

  // Custom dimension info
  imageDimensions: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    return `${width}x${height}`;
  },

  imageWidth: () => {
    if (!sharedImageData) generateSharedImageData();
    return sharedImageData.size.width.toString();
  },

  imageHeight: () => {
    if (!sharedImageData) generateSharedImageData();
    return sharedImageData.size.height.toString();
  },

  imageAspectRatio: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  },

  // Additional generators for compatibility
  imageUrl: () => imageUrlGenerators.loremPicsumImage(),
  avatarUrl: () => imageUrlGenerators.avatarDiceBear()
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { imageUrlGenerators, setImageDimensions, getImageDimensions };
}

// Always assign to window if it exists (for browser compatibility)
if (typeof window !== 'undefined') {
  window.imageUrlGenerators = imageUrlGenerators;
  window.setImageDimensions = setImageDimensions;
  window.getImageDimensions = getImageDimensions;
}