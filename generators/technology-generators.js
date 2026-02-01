// Technology generators
let sharedTechData = null;

function generateSharedTechData() {
  const deviceTypePairs = [
    { en: 'Desktop', ar: 'حاسوب مكتبي' },
    { en: 'Laptop', ar: 'حاسوب محمول' },
    { en: 'Tablet', ar: 'جهاز لوحي' },
    { en: 'Smartphone', ar: 'هاتف ذكي' },
    { en: 'Smart TV', ar: 'تلفزيون ذكي' },
    { en: 'Gaming Console', ar: 'جهاز ألعاب' },
    { en: 'Smart Watch', ar: 'ساعة ذكية' },
    { en: 'IoT Device', ar: 'جهاز إنترنت الأشياء' }
  ];

  sharedTechData = {
    deviceType: randomChoice(deviceTypePairs)
  };
}

const technologyGenerators = {
  ipAddress: () => `${randomNum(1, 255)}.${randomNum(0, 255)}.${randomNum(0, 255)}.${randomNum(1, 255)}`,

  macAddress: () => {
    const hex = '0123456789ABCDEF';
    let mac = '';
    for (let i = 0; i < 6; i++) {
      if (i > 0) mac += ':';
      mac += hex[randomNum(0, 15)] + hex[randomNum(0, 15)];
    }
    return mac;
  },

  userAgent: () => {
    const agents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
    ];
    return randomChoice(agents);
  },

  apiKey: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  },

  deviceId: () => `DEV${randomNum(100000000, 999999999)}`,
  sessionId: () => `SES${randomNum(1000000000, 9999999999)}`,
  serverName: () => `server-${randomChoice(['web', 'api', 'db', 'cache'])}-${randomNum(1, 99)}`,
  databaseName: () => `${randomChoice(['users', 'products', 'orders', 'logs'])}_db_${randomNum(1, 10)}`,
  appVersion: () => `${randomNum(1, 5)}.${randomNum(0, 9)}.${randomNum(0, 9)}`,
  osVersion: () => {
    const os = randomChoice(['Windows', 'macOS', 'Linux', 'iOS', 'Android']);
    const version = `${randomNum(10, 15)}.${randomNum(0, 9)}`;
    return `${os} ${version}`;
  },
  browserName: () => randomChoice(['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera']),

  deviceType: () => {
    if (!sharedTechData) generateSharedTechData();
    return sharedTechData.deviceType.en;
  },

  deviceTypeAr: () => {
    if (!sharedTechData) generateSharedTechData();
    return sharedTechData.deviceType.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { technologyGenerators };
} else if (typeof window !== 'undefined') {
  window.technologyGenerators = technologyGenerators;
}
