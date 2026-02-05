// Image and media URL generators
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

function generateSharedImageData() {
  // Ensure helper functions are available
  if (typeof randomChoice !== 'function' || typeof randomNum !== 'function') {
    console.warn('Helper functions not available, using fallbacks');
    // Provide fallback implementations
    if (typeof randomChoice !== 'function') {
      window.randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
    }
    if (typeof randomNum !== 'function') {
      window.randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

  const imageCategories = [
    'nature', 'city', 'people', 'technology', 'food', 'animals', 'architecture',
    'business', 'travel', 'sports', 'art', 'fashion', 'cars', 'abstract'
  ];

  const predefinedSizes = [
    { width: 150, height: 150 },
    { width: 200, height: 200 },
    { width: 300, height: 200 },
    { width: 400, height: 300 },
    { width: 500, height: 400 },
    { width: 600, height: 400 },
    { width: 800, height: 600 },
    { width: 1024, height: 768 },
    { width: 1200, height: 800 },
    { width: 1920, height: 1080 }
  ];

  const videoFormats = ['mp4', 'webm', 'ogg', 'avi', 'mov'];
  const audioFormats = ['mp3', 'wav', 'ogg', 'aac', 'm4a'];

  sharedImageData = {
    category: randomChoice(imageCategories),
    // Use custom dimensions if set, otherwise use predefined
    size: customImageDimensions,
    predefinedSize: randomChoice(predefinedSizes),
    videoFormat: randomChoice(videoFormats),
    audioFormat: randomChoice(audioFormats),
    imageId: randomNum(1, 1000),
    seed: Math.random().toString(36).substring(2, 15)
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
    const bgColor = randomChoice(colors);
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
    const blur = randomNum(1, 10);
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
    const style = randomChoice(styles);
    const { seed } = sharedImageData;
    const { width } = sharedImageData.size;
    // DiceBear supports size parameter for square avatars
    return `https://avatars.dicebear.com/api/${style}/${seed}.svg?size=${width}`;
  },

  avatarRobohash: () => {
    if (!sharedImageData) generateSharedImageData();
    const { seed } = sharedImageData;
    const { width, height } = sharedImageData.size;
    const sets = ['set1', 'set2', 'set3', 'set4'];
    const set = randomChoice(sets);
    return `https://robohash.org/${seed}.png?set=${set}&size=${width}x${height}`;
  },

  avatarPravatar: () => {
    if (!sharedImageData) generateSharedImageData();
    const { imageId } = sharedImageData;
    const { width } = sharedImageData.size;
    // Pravatar supports square sizes up to 500px
    const size = Math.min(width, 500);
    return `https://i.pravatar.cc/${size}?img=${imageId}`;
  },

  // UI Avatars (text-based) - exact dimensions guaranteed
  uiAvatar: () => {
    if (!sharedNameData) generateSharedNameData();
    const name = `${sharedNameData.firstName.en}+${sharedNameData.lastName.en}`;
    if (!sharedImageData) generateSharedImageData();
    const { width } = sharedImageData.size;
    const colors = ['007bff', '28a745', 'dc3545', 'ffc107', '17a2b8', '6f42c1'];
    const background = randomChoice(colors);
    return `https://ui-avatars.com/api/?name=${name}&size=${width}&background=${background}&color=fff`;
  },

  uiAvatarRounded: () => {
    if (!sharedNameData) generateSharedNameData();
    const name = `${sharedNameData.firstName.en}+${sharedNameData.lastName.en}`;
    if (!sharedImageData) generateSharedImageData();
    const { width } = sharedImageData.size;
    const colors = ['007bff', '28a745', 'dc3545', 'ffc107', '17a2b8', '6f42c1'];
    const background = randomChoice(colors);
    return `https://ui-avatars.com/api/?name=${name}&size=${width}&background=${background}&color=fff&rounded=true`;
  },

  // Gravatar - supports exact sizes
  gravatar: () => {
    if (!sharedImageData) generateSharedImageData();
    const { seed } = sharedImageData;
    const hash = seed.substring(0, 32); // Mock MD5 hash
    const { width } = sharedImageData.size;
    return `https://www.gravatar.com/avatar/${hash}?s=${width}&d=identicon`;
  },

  // Placeholder.com - exact dimensions guaranteed
  placeholderCom: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const colors = ['cccccc', 'ff6b6b', '4ecdc4', '45b7d1', 'ffa07a'];
    const color = randomChoice(colors);
    return `https://placeholder.com/${width}x${height}/${color}`;
  },

  // DummyImage.com - exact dimensions guaranteed
  dummyImage: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const colors = ['cccccc', 'ff6b6b', '4ecdc4', '45b7d1', 'ffa07a'];
    const bgColor = randomChoice(colors);
    const textColor = '000000';
    return `https://dummyimage.com/${width}x${height}/${bgColor}/${textColor}&text=${width}x${height}`;
  },

  // FakeImg.pl - exact dimensions guaranteed
  fakeImg: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const colors = ['cccccc', 'ff6b6b', '4ecdc4', '45b7d1', 'ffa07a'];
    const color = randomChoice(colors);
    return `https://fakeimg.pl/${width}x${height}/${color}/?text=${width}x${height}`;
  },

  // Video URLs
  sampleVideoUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { videoFormat } = sharedImageData;
    const videoNames = ['sample', 'demo', 'test', 'example', 'preview'];
    const videoName = randomChoice(videoNames);
    return `https://sample-videos.com/zip/10/mp4/SampleVideo_${randomNum(100, 999)}kb_${videoFormat}.${videoFormat}`;
  },

  youtubeVideoUrl: () => {
    const videoId = Math.random().toString(36).substring(2, 13);
    return `https://www.youtube.com/watch?v=${videoId}`;
  },

  youtubeThumbnail: () => {
    const videoId = Math.random().toString(36).substring(2, 13);
    const quality = randomChoice(['default', 'mqdefault', 'hqdefault', 'sddefault', 'maxresdefault']);
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  },

  youtubeThumbnailCustom: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const videoId = Math.random().toString(36).substring(2, 13);
    // Note: YouTube thumbnails have fixed sizes, but we can indicate desired size
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg?w=${width}&h=${height}`;
  },

  vimeoVideoUrl: () => {
    const videoId = randomNum(100000000, 999999999);
    return `https://vimeo.com/${videoId}`;
  },

  // Audio URLs
  sampleAudioUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { audioFormat } = sharedImageData;
    const audioNames = ['sample', 'demo', 'test', 'music', 'sound'];
    const audioName = randomChoice(audioNames);
    return `https://sample-audio.com/${audioName}_${randomNum(1, 100)}.${audioFormat}`;
  },

  // Social media images
  facebookProfileImage: () => {
    const userId = randomNum(100000000000000, 999999999999999);
    if (!sharedImageData) generateSharedImageData();
    const { width } = sharedImageData.size;
    return `https://graph.facebook.com/${userId}/picture?type=large&width=${width}&height=${width}`;
  },

  twitterProfileImage: () => {
    if (!sharedNameData) generateSharedNameData();
    const username = sharedNameData.firstName.en.toLowerCase();
    if (!sharedImageData) generateSharedImageData();
    const { width } = sharedImageData.size;
    return `https://unavatar.io/twitter/${username}?size=${width}`;
  },

  linkedinProfileImage: () => {
    if (!sharedNameData) generateSharedNameData();
    const username = `${sharedNameData.firstName.en.toLowerCase()}-${sharedNameData.lastName.en.toLowerCase()}`;
    if (!sharedImageData) generateSharedImageData();
    const { width } = sharedImageData.size;
    return `https://unavatar.io/linkedin/${username}?size=${width}`;
  },

  // QR Code generators - exact dimensions guaranteed
  qrCodeUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { seed } = sharedImageData;
    const { width, height } = sharedImageData.size;
    const size = Math.min(width, height); // QR codes are square
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(seed)}`;
  },

  qrCodeWithLogo: () => {
    if (!sharedImageData) generateSharedImageData();
    const { seed } = sharedImageData;
    const { width, height } = sharedImageData.size;
    const size = Math.min(width, height);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(seed)}&format=png&logo=https://example.com/logo.png`;
  },

  qrCodeColored: () => {
    if (!sharedImageData) generateSharedImageData();
    const { seed } = sharedImageData;
    const { width, height } = sharedImageData.size;
    const size = Math.min(width, height);
    const colors = ['000000', '1f77b4', 'ff7f0e', '2ca02c', 'd62728', '9467bd'];
    const color = randomChoice(colors);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(seed)}&color=${color}`;
  },

  // Chart and graph URLs - exact dimensions guaranteed
  chartUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const chartTypes = ['line', 'bar', 'pie', 'doughnut', 'radar'];
    const chartType = randomChoice(chartTypes);
    const data = Array.from({length: 5}, () => randomNum(10, 100)).join(',');
    return `https://quickchart.io/chart?width=${width}&height=${height}&c={type:'${chartType}',data:{labels:['A','B','C','D','E'],datasets:[{data:[${data}]}]}}`;
  },

  chartBarUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const data = Array.from({length: 5}, () => randomNum(10, 100)).join(',');
    return `https://quickchart.io/chart?width=${width}&height=${height}&c={type:'bar',data:{labels:['Jan','Feb','Mar','Apr','May'],datasets:[{data:[${data}]}]}}`;
  },

  chartPieUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const data = Array.from({length: 4}, () => randomNum(10, 100)).join(',');
    return `https://quickchart.io/chart?width=${width}&height=${height}&c={type:'pie',data:{labels:['A','B','C','D'],datasets:[{data:[${data}]}]}}`;
  },

  // Map images - exact dimensions guaranteed
  mapImage: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const lat = (randomNum(1600, 3200) / 100).toFixed(6);
    const lng = (randomNum(3400, 5500) / 100).toFixed(6);
    const zoom = randomChoice([10, 12, 14, 16]);
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&key=YOUR_API_KEY`;
  },

  mapImageSatellite: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const lat = (randomNum(1600, 3200) / 100).toFixed(6);
    const lng = (randomNum(3400, 5500) / 100).toFixed(6);
    const zoom = randomChoice([10, 12, 14, 16]);
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=satellite&key=YOUR_API_KEY`;
  },

  // Icon URLs - exact dimensions guaranteed
  iconUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width } = sharedImageData.size;
    const icons = ['home', 'user', 'settings', 'search', 'heart', 'star', 'phone', 'email'];
    const icon = randomChoice(icons);
    const colors = ['000000', 'ffffff', '007bff', '28a745', 'dc3545'];
    const color = randomChoice(colors);
    return `https://img.icons8.com/${width}/${color}/${icon}.png`;
  },

  iconUrlColored: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width } = sharedImageData.size;
    const icons = ['home', 'user', 'settings', 'search', 'heart', 'star', 'phone', 'email'];
    const icon = randomChoice(icons);
    const colors = ['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8'];
    const color = randomChoice(colors);
    return `https://img.icons8.com/${width}/${color}/${icon}.png`;
  },

  // Flag images - exact dimensions guaranteed
  countryFlag: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width, height } = sharedImageData.size;
    const countries = ['sa', 'ae', 'kw', 'qa', 'bh', 'om', 'jo', 'lb', 'eg', 'ma'];
    const country = randomChoice(countries);
    return `https://flagcdn.com/${width}x${height}/${country}.png`;
  },

  countryFlagRounded: () => {
    if (!sharedImageData) generateSharedImageData();
    const { width } = sharedImageData.size;
    const countries = ['sa', 'ae', 'kw', 'qa', 'bh', 'om', 'jo', 'lb', 'eg', 'ma'];
    const country = randomChoice(countries);
    return `https://flagcdn.com/w${width}/${country}.png`;
  },

  // CDN URLs
  cdnImageUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { category, imageId } = sharedImageData;
    const { width, height } = sharedImageData.size;
    const cdnProviders = ['cloudinary', 'imgix', 'cloudflare'];
    const provider = randomChoice(cdnProviders);
    return `https://${provider}.com/demo/${category}/${imageId}.jpg?w=${width}&h=${height}`;
  },

  // Stock photo URLs
  stockPhotoUrl: () => {
    if (!sharedImageData) generateSharedImageData();
    const { category, imageId } = sharedImageData;
    const { width, height } = sharedImageData.size;
    const stockSites = ['shutterstock', 'getty', 'adobe', 'istockphoto'];
    const site = randomChoice(stockSites);
    return `https://www.${site}.com/image-photo/${category}-${imageId}?w=${width}&h=${height}`;
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
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { imageUrlGenerators, setImageDimensions, getImageDimensions };
} else if (typeof window !== 'undefined') {
  window.imageUrlGenerators = imageUrlGenerators;
  window.setImageDimensions = setImageDimensions;
  window.getImageDimensions = getImageDimensions;
}