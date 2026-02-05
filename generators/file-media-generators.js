// File types and media generators
let sharedFileData = null;

function generateSharedFileData() {
  const fileExtensions = {
    documents: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'pages'],
    spreadsheets: ['xls', 'xlsx', 'csv', 'ods', 'numbers'],
    presentations: ['ppt', 'pptx', 'odp', 'key'],
    images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'tiff', 'ico'],
    videos: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v'],
    audio: ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma'],
    archives: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'],
    code: ['js', 'html', 'css', 'php', 'py', 'java', 'cpp', 'c', 'rb', 'go', 'swift'],
    data: ['json', 'xml', 'yaml', 'sql', 'db', 'sqlite']
  };

  const mimeTypes = {
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'txt': 'text/plain',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'mp4': 'video/mp4',
    'mp3': 'audio/mpeg',
    'zip': 'application/zip',
    'json': 'application/json',
    'xml': 'application/xml'
  };

  const categories = Object.keys(fileExtensions);
  const selectedCategory = randomChoice(categories);
  const selectedExtension = randomChoice(fileExtensions[selectedCategory]);
  
  const fileNames = [
    'document', 'report', 'presentation', 'image', 'video', 'audio', 'data', 'backup',
    'project', 'analysis', 'summary', 'invoice', 'contract', 'proposal', 'manual',
    'guide', 'tutorial', 'template', 'sample', 'example', 'test', 'demo', 'final',
    'draft', 'version', 'copy', 'original', 'modified', 'updated', 'new', 'old'
  ];

  const arabicFileNames = [
    'وثيقة', 'تقرير', 'عرض', 'صورة', 'فيديو', 'صوت', 'بيانات', 'نسخة_احتياطية',
    'مشروع', 'تحليل', 'ملخص', 'فاتورة', 'عقد', 'اقتراح', 'دليل',
    'مرشد', 'درس', 'قالب', 'عينة', 'مثال', 'اختبار', 'تجريبي', 'نهائي',
    'مسودة', 'نسخة', 'نسخة', 'أصلي', 'معدل', 'محدث', 'جديد', 'قديم'
  ];

  const fileName = randomChoice(fileNames);
  const arabicFileName = randomChoice(arabicFileNames);
  const fileNumber = randomNum(1, 999);
  
  sharedFileData = {
    category: selectedCategory,
    extension: selectedExtension,
    mimeType: mimeTypes[selectedExtension] || 'application/octet-stream',
    fileName: fileName,
    arabicFileName: arabicFileName,
    fileNumber: fileNumber,
    size: randomNum(10, 1000), // Initial size in KB (will be adjusted by fileSize generator)
    fullFileName: `${fileName}_${fileNumber}.${selectedExtension}`,
    arabicFullFileName: `${arabicFileName}_${fileNumber}.${selectedExtension}`
  };
}

const fileMediaGenerators = {
  fileName: () => {
    if (!sharedFileData) generateSharedFileData();
    return sharedFileData.fullFileName;
  },

  fileNameAr: () => {
    if (!sharedFileData) generateSharedFileData();
    return sharedFileData.arabicFullFileName;
  },

  fileExtension: () => {
    if (!sharedFileData) generateSharedFileData();
    return sharedFileData.extension;
  },

  fileType: () => {
    if (!sharedFileData) generateSharedFileData();
    return sharedFileData.category;
  },

  mimeType: () => {
    if (!sharedFileData) generateSharedFileData();
    return sharedFileData.mimeType;
  },

  fileSize: () => {
    if (!sharedFileData) generateSharedFileData();
    const size = sharedFileData.size;
    
    // Make file sizes more realistic based on file type
    let actualSize = size;
    const extension = sharedFileData.extension.toLowerCase();
    
    // Adjust size based on file type for realism
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
      // Images: 50KB to 5MB
      actualSize = randomNum(50, 5000);
    } else if (['mp4', 'avi', 'mov', 'wmv'].includes(extension)) {
      // Videos: 1MB to 500MB
      actualSize = randomNum(1000, 500000);
    } else if (['mp3', 'wav', 'flac', 'aac'].includes(extension)) {
      // Audio: 1MB to 50MB
      actualSize = randomNum(1000, 50000);
    } else if (['pdf', 'doc', 'docx'].includes(extension)) {
      // Documents: 10KB to 10MB
      actualSize = randomNum(10, 10000);
    } else if (['zip', 'rar', '7z'].includes(extension)) {
      // Archives: 100KB to 100MB
      actualSize = randomNum(100, 100000);
    } else {
      // Other files: 1KB to 1MB
      actualSize = randomNum(1, 1000);
    }
    
    // Store the actual size for consistency
    sharedFileData.actualSize = actualSize;
    
    if (actualSize < 1024) return `${actualSize} KB`;
    if (actualSize < 1024 * 1024) return `${(actualSize / 1024).toFixed(1)} MB`;
    return `${(actualSize / (1024 * 1024)).toFixed(1)} GB`;
  },

  fileSizeBytes: () => {
    if (!sharedFileData) generateSharedFileData();
    // Use the actual size if it was calculated, otherwise use the original size
    const actualSize = sharedFileData.actualSize || sharedFileData.size;
    return (actualSize * 1024).toString();
  },

  imageUrl: () => {
    const imageServices = [
      'https://picsum.photos',
      'https://source.unsplash.com',
      'https://via.placeholder.com'
    ];
    const service = randomChoice(imageServices);
    const width = randomChoice([200, 300, 400, 500, 600, 800, 1024]);
    const height = randomChoice([200, 300, 400, 500, 600, 800, 1024]);
    
    if (service === 'https://picsum.photos') {
      return `${service}/${width}/${height}`;
    } else if (service === 'https://source.unsplash.com') {
      return `${service}/${width}x${height}`;
    } else {
      return `${service}/${width}x${height}`;
    }
  },

  avatarUrl: () => {
    const avatarServices = [
      'https://i.pravatar.cc',
      'https://robohash.org',
      'https://avatars.dicebear.com/api/avataaars'
    ];
    const service = randomChoice(avatarServices);
    const size = randomChoice([50, 100, 150, 200, 300]);
    const id = randomNum(1, 1000);
    
    if (service === 'https://i.pravatar.cc') {
      return `${service}/${size}?img=${id}`;
    } else if (service === 'https://robohash.org') {
      return `${service}/${id}.png?size=${size}x${size}`;
    } else {
      return `${service}/${id}.svg?size=${size}`;
    }
  },

  documentPath: () => {
    const folders = ['Documents', 'Files', 'Reports', 'Projects', 'Archive'];
    const folderAr = ['المستندات', 'الملفات', 'التقارير', 'المشاريع', 'الأرشيف'];
    const folder = randomChoice(folders);
    if (!sharedFileData) generateSharedFileData();
    return `/${folder}/${sharedFileData.fullFileName}`;
  },

  documentPathAr: () => {
    const foldersAr = ['المستندات', 'الملفات', 'التقارير', 'المشاريع', 'الأرشيف'];
    const folder = randomChoice(foldersAr);
    if (!sharedFileData) generateSharedFileData();
    return `/${folder}/${sharedFileData.arabicFullFileName}`;
  },

  downloadUrl: () => {
    if (!sharedFileData) generateSharedFileData();
    const baseUrl = 'https://example.com/downloads';
    return `${baseUrl}/${sharedFileData.fullFileName}`;
  },

  thumbnailUrl: () => {
    if (!sharedFileData) generateSharedFileData();
    const baseUrl = 'https://example.com/thumbnails';
    return `${baseUrl}/${sharedFileData.fileName}_thumb.jpg`;
  },

  cloudStorageUrl: () => {
    const services = [
      'https://drive.google.com/file/d',
      'https://onedrive.live.com/download',
      'https://dropbox.com/s',
      'https://icloud.com/share'
    ];
    const service = randomChoice(services);
    const fileId = Math.random().toString(36).substring(2, 15);
    return `${service}/${fileId}`;
  },

  mediaFormat: () => {
    const formats = {
      video: ['H.264', 'H.265', 'VP9', 'AV1', 'MPEG-4'],
      audio: ['MP3', 'AAC', 'FLAC', 'OGG', 'WAV'],
      image: ['JPEG', 'PNG', 'WebP', 'AVIF', 'SVG']
    };
    const category = randomChoice(Object.keys(formats));
    return randomChoice(formats[category]);
  },

  resolution: () => {
    const resolutions = [
      '1920x1080', '1280x720', '3840x2160', '2560x1440',
      '1366x768', '1024x768', '800x600', '640x480'
    ];
    return randomChoice(resolutions);
  },

  colorDepth: () => randomChoice(['8-bit', '16-bit', '24-bit', '32-bit']),

  compressionRatio: () => `${randomNum(10, 95)}%`,

  metadata: () => {
    const cameras = ['Canon EOS R5', 'Nikon D850', 'Sony A7R IV', 'iPhone 13 Pro'];
    const camera = randomChoice(cameras);
    const iso = randomChoice([100, 200, 400, 800, 1600, 3200]);
    const aperture = randomChoice(['f/1.4', 'f/2.8', 'f/4.0', 'f/5.6', 'f/8.0']);
    const shutter = randomChoice(['1/60', '1/125', '1/250', '1/500', '1/1000']);
    
    return `Camera: ${camera}, ISO: ${iso}, Aperture: ${aperture}, Shutter: ${shutter}`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fileMediaGenerators };
} else if (typeof window !== 'undefined') {
  window.fileMediaGenerators = fileMediaGenerators;
}