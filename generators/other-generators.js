// Other/miscellaneous generators
let sharedServiceData = null;

function generateSharedServiceData() {
  const serviceIds = {
    hajj: randomNum(1000000, 9999999),
    umrah: randomNum(1000000, 9999999),
    workPermit: randomNum(1000000, 9999999),
    residency: randomNum(1000000, 9999999),
    driving: randomNum(1000000000, 9999999999),
    vehicle: randomNum(1000000, 9999999),
    istmara: randomNum(1000000, 9999999),
    traffic: randomNum(1000000, 9999999),
    customs: randomNum(1000000000, 9999999999),
    health: randomNum(1000000, 9999999),
    medical: randomNum(1000000, 9999999),
    vaccination: randomNum(1000000, 9999999),
    covid: randomNum(1000000, 9999999)
  };
  
  const businessStatus = {
    maroof: randomChoice([
      { en: 'Verified', ar: 'موثق' },
      { en: 'Pending', ar: 'قيد المراجعة' },
      { en: 'Not Verified', ar: 'غير موثق' }
    ]),
    saudizationRate: randomNum(10, 95),
    nitaqat: randomChoice([
      { en: 'Green', ar: 'أخضر' },
      { en: 'Yellow', ar: 'أصفر' },
      { en: 'Red', ar: 'أحمر' },
      { en: 'Platinum', ar: 'بلاتيني' }
    ])
  };
  
  sharedServiceData = {
    ...serviceIds,
    ...businessStatus
  };
}

// File generation functions
function generateFile(type) {
  const fileName = `sample_${Date.now()}.${type}`;
  const sizeInput = document.getElementById('fileSizeInput');
  const unitSelect = document.getElementById('fileSizeUnit');
  
  let fileSize;
  if (sizeInput && sizeInput.value && unitSelect) {
    fileSize = `${sizeInput.value} ${unitSelect.value}`;
  } else {
    fileSize = randomNum(10, 500) + 'KB';
  }
  
  return { fileName, fileSize, type };
}

function getCustomFileSizeInBytes() {
  const sizeInput = document.getElementById('fileSizeInput');
  const unitSelect = document.getElementById('fileSizeUnit');
  if (sizeInput && sizeInput.value && unitSelect) {
    const size = parseInt(sizeInput.value);
    const unit = unitSelect.value;
    switch(unit) {
      case 'KB': return size * 1024;
      case 'MB': return size * 1024 * 1024;
      case 'GB': return size * 1024 * 1024 * 1024;
      default: return null;
    }
  }
  return null;
}

function generateContentWithSize(baseContent, targetSize) {
  if (!targetSize) return baseContent;
  let content = baseContent;
  while (content.length < targetSize) {
    content += baseContent;
  }
  return content.substring(0, targetSize);
}

const otherGenerators = {
  number: () => randomNum(1, 10000),
  boolean: () => Math.random() > 0.5,
  
  uuid: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  
  color: () => `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
  
  url: () => {
    const domains = ['example.com', 'test.org', 'demo.net', 'sample.co'];
    const paths = ['home', 'about', 'contact', 'products', 'services'];
    return `https://www.${randomChoice(domains)}/${randomChoice(paths)}`;
  },
  
  ip: () => `${randomNum(1, 255)}.${randomNum(0, 255)}.${randomNum(0, 255)}.${randomNum(1, 255)}`,
  
  password: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < randomNum(8, 16); i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  },

  // IDs & Documents
  passportNumber: () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let passport = '';
    for (let i = 0; i < 2; i++) {
      passport += letters[randomNum(0, 25)];
    }
    for (let i = 0; i < 7; i++) {
      passport += randomNum(0, 9);
    }
    return passport;
  },
  
  visaNumber: () => `V${randomNum(10000000, 99999999)}`,
  taxId: () => `TAX${randomNum(1000000, 9999999)}`,
  licenseNumber: () => `LIC${randomNum(1000000, 9999999)}`,
  studentId: () => `STU${randomNum(100000, 999999)}`,
  medicalRecord: () => `MR${randomNum(100000, 999999)}`,

  // Tech Data
  macAddress: () => {
    const hex = '0123456789ABCDEF';
    let mac = '';
    for (let i = 0; i < 6; i++) {
      if (i > 0) mac += ':';
      mac += hex[randomNum(0, 15)] + hex[randomNum(0, 15)];
    }
    return mac;
  },
  
  userAgent: () => randomChoice([
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
  ]),
  
  apiKey: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  },

  domain: () => `${randomChoice(['example', 'test', 'demo', 'sample'])}-${randomNum(1, 999)}.com`,
  subdomain: () => `${randomChoice(['www', 'api', 'admin', 'blog', 'shop'])}.example.com`,
  port: () => randomChoice([80, 443, 8080, 3000, 5000, 8000]),
  protocol: () => randomChoice(['HTTP', 'HTTPS', 'FTP', 'SSH', 'SMTP']),

  // Social Data
  username: () => `${randomChoice(names.firstNames.male.concat(names.firstNames.female)).en.toLowerCase()}${randomNum(1, 9999)}`,
  hashtag: () => `#${randomChoice(['tech', 'life', 'work', 'travel', 'food', 'sports'])}${randomNum(1, 99)}`,
  mention: () => `@${randomChoice(names.firstNames.male.concat(names.firstNames.female)).en.toLowerCase()}${randomNum(1, 999)}`,

  // Gaming Data
  gamertag: () => `${randomChoice(['Shadow', 'Fire', 'Ice', 'Storm', 'Dark', 'Light'])}${randomChoice(['Wolf', 'Eagle', 'Dragon', 'Tiger', 'Lion'])}${randomNum(1, 999)}`,
  score: () => randomNum(0, 999999),
  level: () => randomNum(1, 100),

  // Measurements
  temperature: () => `${randomNum(-10, 50)}°C`,
  distance: () => `${(randomNum(1, 1000) / 10).toFixed(1)} km`,
  speed: () => `${randomNum(10, 200)} km/h`,
  fileSize: () => {
    const size = randomNum(1, 999);
    const unit = randomChoice(['KB', 'MB', 'GB']);
    return `${size} ${unit}`;
  },

  // Vehicle Data
  licensePlate: () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let plate = '';
    for (let i = 0; i < 3; i++) {
      plate += letters[randomNum(0, 25)];
    }
    plate += ' ';
    for (let i = 0; i < 4; i++) {
      plate += randomNum(0, 9);
    }
    return plate;
  },
  
  carModel: () => randomChoice(['Toyota Camry', 'Honda Accord', 'Nissan Altima', 'Hyundai Sonata', 'BMW 3 Series']),
  carYear: () => randomNum(2015, 2024),

  // File generators
  txt: () => ({ type: 'txt', name: `document_${randomNum(1000, 9999)}.txt`, size: `${randomNum(1, 100)}KB` }),
  json: () => ({ type: 'json', name: `data_${randomNum(1000, 9999)}.json`, size: `${randomNum(1, 50)}KB` }),
  csv: () => ({ type: 'csv', name: `export_${randomNum(1000, 9999)}.csv`, size: `${randomNum(5, 200)}KB` }),
  xml: () => ({ type: 'xml', name: `config_${randomNum(1000, 9999)}.xml`, size: `${randomNum(2, 80)}KB` }),
  html: () => ({ type: 'html', name: `page_${randomNum(1000, 9999)}.html`, size: `${randomNum(10, 500)}KB` }),
  css: () => ({ type: 'css', name: `styles_${randomNum(1000, 9999)}.css`, size: `${randomNum(5, 150)}KB` }),
  js: () => ({ type: 'js', name: `script_${randomNum(1000, 9999)}.js`, size: `${randomNum(10, 300)}KB` }),
  py: () => ({ type: 'py', name: `script_${randomNum(1000, 9999)}.py`, size: `${randomNum(5, 200)}KB` }),
  java: () => ({ type: 'java', name: `Main_${randomNum(1000, 9999)}.java`, size: `${randomNum(10, 400)}KB` }),
  cpp: () => ({ type: 'cpp', name: `main_${randomNum(1000, 9999)}.cpp`, size: `${randomNum(5, 250)}KB` }),
  pdf: () => ({ type: 'pdf', name: `report_${randomNum(1000, 9999)}.pdf`, size: `${randomNum(100, 5000)}KB` }),
  doc: () => ({ type: 'doc', name: `document_${randomNum(1000, 9999)}.doc`, size: `${randomNum(50, 2000)}KB` }),
  docx: () => ({ type: 'docx', name: `document_${randomNum(1000, 9999)}.docx`, size: `${randomNum(50, 2000)}KB` }),
  xlsx: () => ({ type: 'xlsx', name: `spreadsheet_${randomNum(1000, 9999)}.xlsx`, size: `${randomNum(20, 1000)}KB` }),
  xls: () => ({ type: 'xls', name: `spreadsheet_${randomNum(1000, 9999)}.xls`, size: `${randomNum(20, 1000)}KB` }),
  ppt: () => ({ type: 'ppt', name: `presentation_${randomNum(1000, 9999)}.ppt`, size: `${randomNum(500, 10000)}KB` }),
  pptx: () => ({ type: 'pptx', name: `presentation_${randomNum(1000, 9999)}.pptx`, size: `${randomNum(500, 10000)}KB` }),
  jpg: () => ({ type: 'jpg', name: `image_${randomNum(1000, 9999)}.jpg`, size: `${randomNum(200, 8000)}KB` }),
  png: () => ({ type: 'png', name: `screenshot_${randomNum(1000, 9999)}.png`, size: `${randomNum(100, 5000)}KB` }),
  gif: () => ({ type: 'gif', name: `animation_${randomNum(1000, 9999)}.gif`, size: `${randomNum(500, 15000)}KB` }),
  svg: () => ({ type: 'svg', name: `vector_${randomNum(1000, 9999)}.svg`, size: `${randomNum(5, 200)}KB` }),
  bmp: () => ({ type: 'bmp', name: `bitmap_${randomNum(1000, 9999)}.bmp`, size: `${randomNum(1000, 20000)}KB` }),
  webp: () => ({ type: 'webp', name: `image_${randomNum(1000, 9999)}.webp`, size: `${randomNum(50, 2000)}KB` }),
  ico: () => ({ type: 'ico', name: `icon_${randomNum(1000, 9999)}.ico`, size: `${randomNum(1, 50)}KB` }),
  zip: () => ({ type: 'zip', name: `archive_${randomNum(1000, 9999)}.zip`, size: `${randomNum(500, 50000)}KB` }),
  rar: () => ({ type: 'rar', name: `archive_${randomNum(1000, 9999)}.rar`, size: `${randomNum(500, 50000)}KB` }),
  '7z': () => ({ type: '7z', name: `archive_${randomNum(1000, 9999)}.7z`, size: `${randomNum(300, 30000)}KB` }),
  tar: () => ({ type: 'tar', name: `archive_${randomNum(1000, 9999)}.tar`, size: `${randomNum(1000, 100000)}KB` }),
  mp3: () => ({ type: 'mp3', name: `audio_${randomNum(1000, 9999)}.mp3`, size: `${randomNum(3000, 15000)}KB` }),
  wav: () => ({ type: 'wav', name: `audio_${randomNum(1000, 9999)}.wav`, size: `${randomNum(10000, 100000)}KB` }),
  flac: () => ({ type: 'flac', name: `audio_${randomNum(1000, 9999)}.flac`, size: `${randomNum(20000, 80000)}KB` }),
  mp4: () => ({ type: 'mp4', name: `video_${randomNum(1000, 9999)}.mp4`, size: `${randomNum(50000, 500000)}KB` }),
  avi: () => ({ type: 'avi', name: `video_${randomNum(1000, 9999)}.avi`, size: `${randomNum(100000, 1000000)}KB` }),
  mkv: () => ({ type: 'mkv', name: `video_${randomNum(1000, 9999)}.mkv`, size: `${randomNum(200000, 2000000)}KB` }),
  mov: () => ({ type: 'mov', name: `video_${randomNum(1000, 9999)}.mov`, size: `${randomNum(80000, 800000)}KB` }),
  wmv: () => ({ type: 'wmv', name: `video_${randomNum(1000, 9999)}.wmv`, size: `${randomNum(50000, 500000)}KB` }),
  sql: () => ({ type: 'sql', name: `database_${randomNum(1000, 9999)}.sql`, size: `${randomNum(10, 5000)}KB` }),
  db: () => ({ type: 'db', name: `database_${randomNum(1000, 9999)}.db`, size: `${randomNum(100, 50000)}KB` }),
  log: () => ({ type: 'log', name: `system_${randomNum(1000, 9999)}.log`, size: `${randomNum(50, 10000)}KB` }),
  ini: () => ({ type: 'ini', name: `config_${randomNum(1000, 9999)}.ini`, size: `${randomNum(1, 50)}KB` }),
  cfg: () => ({ type: 'cfg', name: `config_${randomNum(1000, 9999)}.cfg`, size: `${randomNum(1, 50)}KB` }),
  conf: () => ({ type: 'conf', name: `config_${randomNum(1000, 9999)}.conf`, size: `${randomNum(1, 100)}KB` }),
  yaml: () => ({ type: 'yaml', name: `config_${randomNum(1000, 9999)}.yaml`, size: `${randomNum(2, 200)}KB` }),
  yml: () => ({ type: 'yml', name: `config_${randomNum(1000, 9999)}.yml`, size: `${randomNum(2, 200)}KB` }),
  toml: () => ({ type: 'toml', name: `config_${randomNum(1000, 9999)}.toml`, size: `${randomNum(1, 50)}KB` }),
  md: () => ({ type: 'md', name: `readme_${randomNum(1000, 9999)}.md`, size: `${randomNum(5, 500)}KB` }),
  rtf: () => ({ type: 'rtf', name: `document_${randomNum(1000, 9999)}.rtf`, size: `${randomNum(20, 1000)}KB` }),
  eps: () => ({ type: 'eps', name: `vector_${randomNum(1000, 9999)}.eps`, size: `${randomNum(100, 5000)}KB` }),
  ai: () => ({ type: 'ai', name: `design_${randomNum(1000, 9999)}.ai`, size: `${randomNum(500, 20000)}KB` }),
  psd: () => ({ type: 'psd', name: `design_${randomNum(1000, 9999)}.psd`, size: `${randomNum(1000, 50000)}KB` }),
  sketch: () => ({ type: 'sketch', name: `design_${randomNum(1000, 9999)}.sketch`, size: `${randomNum(500, 15000)}KB` }),
  fig: () => ({ type: 'fig', name: `design_${randomNum(1000, 9999)}.fig`, size: `${randomNum(200, 5000)}KB` })
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { otherGenerators };
} else if (typeof window !== 'undefined') {
  window.otherGenerators = otherGenerators;
}
