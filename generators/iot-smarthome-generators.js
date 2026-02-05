// IoT & Smart Home generators
const iotSmartHomeGenerators = {
  deviceType: () => randomChoice([
    'Smart Thermostat', 'Smart Light Bulb', 'Smart Door Lock', 'Security Camera',
    'Motion Sensor', 'Smart Speaker', 'Smart TV', 'Smart Refrigerator',
    'Smart Washing Machine', 'Smart Air Conditioner', 'Smart Doorbell',
    'Smoke Detector', 'Water Leak Sensor', 'Smart Plug', 'Smart Switch',
    'Smart Curtains', 'Robot Vacuum', 'Smart Garage Door', 'Smart Irrigation',
    'Smart Mirror', 'Smart Scale', 'Fitness Tracker', 'Smart Watch'
  ]),

  deviceTypeAr: () => randomChoice([
    'منظم حرارة ذكي', 'مصباح ذكي', 'قفل باب ذكي', 'كاميرا أمان',
    'مستشعر حركة', 'مكبر صوت ذكي', 'تلفزيون ذكي', 'ثلاجة ذكية',
    'غسالة ذكية', 'مكيف هواء ذكي', 'جرس باب ذكي',
    'كاشف دخان', 'مستشعر تسرب المياه', 'قابس ذكي', 'مفتاح ذكي',
    'ستائر ذكية', 'مكنسة روبوت', 'باب مرآب ذكي', 'ري ذكي',
    'مرآة ذكية', 'ميزان ذكي', 'متتبع لياقة', 'ساعة ذكية'
  ]),

  deviceBrand: () => randomChoice([
    'Samsung', 'LG', 'Philips', 'Amazon', 'Google', 'Apple', 'Xiaomi',
    'Huawei', 'TP-Link', 'D-Link', 'Netgear', 'Ring', 'Nest', 'Ecobee',
    'Honeywell', 'Bosch', 'Siemens', 'GE', 'Whirlpool', 'Dyson'
  ]),

  deviceModel: () => {
    const models = [
      'SmartHome Pro 2024', 'IoT Elite X1', 'ConnectMax 5G', 'HomeHub Ultra',
      'SmartLife Premium', 'TechHome Advanced', 'AutoHome Series 3',
      'IntelliDevice Pro', 'SmartControl Max', 'HomeAssist Premium'
    ];
    return randomChoice(models);
  },

  macAddress: () => {
    const chars = '0123456789ABCDEF';
    let mac = '';
    for (let i = 0; i < 6; i++) {
      if (i > 0) mac += ':';
      mac += chars[randomNum(0, 15)] + chars[randomNum(0, 15)];
    }
    return mac;
  },

  ipAddress: () => {
    return `192.168.${randomNum(1, 255)}.${randomNum(1, 254)}`;
  },

  deviceId: () => {
    const chars = '0123456789abcdef';
    let id = '';
    for (let i = 0; i < 16; i++) {
      id += chars[randomNum(0, chars.length - 1)];
    }
    return id;
  },

  firmwareVersion: () => {
    const major = randomNum(1, 5);
    const minor = randomNum(0, 9);
    const patch = randomNum(0, 99);
    return `${major}.${minor}.${patch}`;
  },

  wifiSSID: () => {
    const names = [
      'HomeNetwork_5G', 'SmartHome_WiFi', 'MyRouter_2.4G', 'FamilyNet',
      'SecureHome', 'FastInternet', 'HomeOffice_WiFi', 'GuestNetwork',
      'SmartDevices', 'MainNetwork', 'HomeWiFi_Pro', 'ConnectedHome'
    ];
    return randomChoice(names);
  },

  signalStrength: () => `${randomNum(-90, -30)} dBm`,

  batteryLevel: () => `${randomNum(0, 100)}%`,

  powerConsumption: () => `${randomNum(1, 500)} W`,

  dataUsage: () => `${randomNum(1, 1000)} MB/month`,

  sensorReading: () => {
    const sensors = {
      temperature: `${randomNum(15, 35)}°C`,
      humidity: `${randomNum(30, 80)}%`,
      pressure: `${randomNum(980, 1040)} hPa`,
      light: `${randomNum(0, 1000)} lux`,
      motion: randomChoice(['Detected', 'Not Detected']),
      door: randomChoice(['Open', 'Closed']),
      water: randomChoice(['Dry', 'Wet', 'Leak Detected']),
      air_quality: `${randomNum(50, 300)} AQI`
    };
    
    const sensorType = randomChoice(Object.keys(sensors));
    return `${sensorType}: ${sensors[sensorType]}`;
  },

  automationRule: () => {
    const rules = [
      'Turn on lights when motion detected',
      'Lock doors at 11 PM daily',
      'Adjust thermostat when away',
      'Send alert if door left open',
      'Turn off all lights at sunrise',
      'Start coffee maker at 7 AM',
      'Close curtains at sunset',
      'Turn on security system when leaving',
      'Dim lights for movie mode',
      'Water plants every 3 days'
    ];
    return randomChoice(rules);
  },

  automationRuleAr: () => {
    const rules = [
      'تشغيل الأضواء عند اكتشاف الحركة',
      'قفل الأبواب في الساعة 11 مساءً يومياً',
      'ضبط منظم الحرارة عند الخروج',
      'إرسال تنبيه إذا ترك الباب مفتوحاً',
      'إطفاء جميع الأضواء عند شروق الشمس',
      'تشغيل آلة القهوة في الساعة 7 صباحاً',
      'إغلاق الستائر عند غروب الشمس',
      'تشغيل نظام الأمان عند المغادرة',
      'تخفيف الأضواء لوضع الأفلام',
      'سقي النباتات كل 3 أيام'
    ];
    return randomChoice(rules);
  },

  smartHomeHub: () => randomChoice([
    'Samsung SmartThings', 'Amazon Echo Plus', 'Google Nest Hub', 'Apple HomeKit',
    'Hubitat Elevation', 'Wink Hub', 'Vera Controller', 'Home Assistant',
    'OpenHAB', 'Domoticz', 'Fibaro Home Center', 'Homey Pro'
  ]),

  communicationProtocol: () => randomChoice([
    'WiFi', 'Zigbee', 'Z-Wave', 'Bluetooth', 'Thread', 'Matter',
    'LoRaWAN', 'NB-IoT', '6LoWPAN', 'CoAP', 'MQTT', 'HTTP/HTTPS'
  ]),

  securityLevel: () => randomChoice([
    'WPA3', 'WPA2', 'AES-256', 'TLS 1.3', 'End-to-End Encrypted',
    'Two-Factor Authentication', 'Biometric', 'PIN Protected'
  ]),

  deviceStatus: () => randomChoice([
    'Online', 'Offline', 'Updating', 'Error', 'Low Battery', 'Maintenance Mode',
    'Standby', 'Active', 'Pairing', 'Connecting', 'Ready', 'Busy'
  ]),

  deviceStatusAr: () => randomChoice([
    'متصل', 'غير متصل', 'يتم التحديث', 'خطأ', 'بطارية منخفضة', 'وضع الصيانة',
    'استعداد', 'نشط', 'اقتران', 'يتصل', 'جاهز', 'مشغول'
  ]),

  alertType: () => randomChoice([
    'Motion Detected', 'Door/Window Opened', 'Low Battery', 'Device Offline',
    'Temperature Alert', 'Water Leak', 'Smoke Detected', 'Security Breach',
    'System Update Available', 'Maintenance Required', 'Connection Lost'
  ]),

  alertTypeAr: () => randomChoice([
    'تم اكتشاف حركة', 'فتح باب/نافذة', 'بطارية منخفضة', 'الجهاز غير متصل',
    'تنبيه درجة الحرارة', 'تسرب مياه', 'تم اكتشاف دخان', 'خرق أمني',
    'تحديث النظام متاح', 'صيانة مطلوبة', 'فقدان الاتصال'
  ]),

  energyUsage: () => `${(randomNum(1, 100) / 10).toFixed(1)} kWh`,

  costSavings: () => `${randomNum(10, 500)} SAR/month`,

  roomLocation: () => randomChoice([
    'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Garage', 'Garden',
    'Office', 'Dining Room', 'Basement', 'Attic', 'Hallway', 'Balcony'
  ]),

  roomLocationAr: () => randomChoice([
    'غرفة المعيشة', 'غرفة النوم', 'المطبخ', 'الحمام', 'المرآب', 'الحديقة',
    'المكتب', 'غرفة الطعام', 'القبو', 'العلية', 'الممر', 'الشرفة'
  ]),

  sceneMode: () => randomChoice([
    'Good Morning', 'Good Night', 'Movie Time', 'Dinner Party', 'Away Mode',
    'Vacation Mode', 'Energy Saving', 'Security Mode', 'Romantic', 'Work Mode'
  ]),

  sceneModeAr: () => randomChoice([
    'صباح الخير', 'تصبح على خير', 'وقت الأفلام', 'حفلة عشاء', 'وضع الخروج',
    'وضع الإجازة', 'توفير الطاقة', 'وضع الأمان', 'رومانسي', 'وضع العمل'
  ]),

  voiceCommand: () => randomChoice([
    'Turn on the lights', 'Set temperature to 22 degrees', 'Play music',
    'Lock all doors', 'Show me the front door camera', 'Start the dishwasher',
    'Turn off all devices', 'Activate security mode', 'Dim the lights',
    'Open the garage door', 'Water the plants', 'Start the vacuum'
  ]),

  voiceCommandAr: () => randomChoice([
    'شغل الأضواء', 'اضبط الحرارة على 22 درجة', 'شغل الموسيقى',
    'اقفل جميع الأبواب', 'أرني كاميرا الباب الأمامي', 'شغل غسالة الأطباق',
    'أطفئ جميع الأجهزة', 'فعل وضع الأمان', 'خفف الأضواء',
    'افتح باب المرآب', 'اسق النباتات', 'شغل المكنسة'
  ]),

  appName: () => randomChoice([
    'SmartHome Control', 'IoT Manager', 'Home Assistant', 'Smart Life',
    'Tuya Smart', 'Mi Home', 'Samsung SmartThings', 'Google Home',
    'Amazon Alexa', 'Apple Home', 'Philips Hue', 'LIFX'
  ]),

  updateFrequency: () => randomChoice([
    'Real-time', 'Every 5 minutes', 'Every 15 minutes', 'Hourly',
    'Daily', 'Weekly', 'On demand', 'When triggered'
  ]),

  cloudService: () => randomChoice([
    'AWS IoT Core', 'Google Cloud IoT', 'Microsoft Azure IoT', 'IBM Watson IoT',
    'Oracle IoT Cloud', 'Alibaba Cloud IoT', 'Samsung ARTIK Cloud',
    'Particle Cloud', 'ThingSpeak', 'Blynk', 'Cayenne', 'Ubidots'
  ]),

  dataRetention: () => randomChoice([
    '7 days', '30 days', '90 days', '1 year', '2 years', '5 years', 'Indefinite'
  ]),

  maintenanceSchedule: () => randomChoice([
    'Weekly', 'Monthly', 'Quarterly', 'Semi-annually', 'Annually', 'As needed'
  ])
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { iotSmartHomeGenerators };
} else if (typeof window !== 'undefined') {
  window.iotSmartHomeGenerators = iotSmartHomeGenerators;
}