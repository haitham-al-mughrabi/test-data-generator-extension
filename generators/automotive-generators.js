// Automotive generators
const automotiveGenerators = {
  carBrand: () => randomChoice([
    'Toyota', 'Honda', 'Nissan', 'Hyundai', 'Kia', 'Chevrolet', 'Ford', 'BMW',
    'Mercedes-Benz', 'Audi', 'Volkswagen', 'Lexus', 'Infiniti', 'Mazda', 'Subaru',
    'Mitsubishi', 'Suzuki', 'Jeep', 'Land Rover', 'Porsche', 'Jaguar', 'Volvo',
    'Cadillac', 'Lincoln', 'Acura', 'Genesis', 'Tesla', 'BYD', 'Geely', 'Chery'
  ]),

  carModel: () => {
    const models = {
      'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius', 'Land Cruiser', 'Prado', 'Hilux'],
      'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V', 'Passport'],
      'Nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Murano', 'Maxima', 'Armada', 'Patrol'],
      'BMW': ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X7', 'i3', 'i8'],
      'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS', 'A-Class', 'CLA'],
      'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Genesis', 'Veloster', 'Kona', 'Palisade']
    };
    
    const brands = Object.keys(models);
    const brand = randomChoice(brands);
    const model = randomChoice(models[brand] || ['Sedan', 'SUV', 'Hatchback']);
    return `${brand} ${model}`;
  },

  licensePlate: () => {
    // Saudi license plate format: 3 Arabic letters + 3-4 numbers
    const arabicLetters = ['أ', 'ب', 'ج', 'د', 'ه', 'و', 'ز', 'ح', 'ط', 'ي', 'ك', 'ل', 'م', 'ن', 'س', 'ع', 'ف', 'ص', 'ق', 'ر', 'ش', 'ت', 'ث', 'خ', 'ذ', 'ض', 'ظ', 'غ'];
    let plate = '';
    
    // 3 Arabic letters
    for (let i = 0; i < 3; i++) {
      plate += randomChoice(arabicLetters);
    }
    
    // 3-4 numbers
    const numDigits = randomChoice([3, 4]);
    for (let i = 0; i < numDigits; i++) {
      plate += randomNum(0, 9);
    }
    
    return plate;
  },

  licensePlateEn: () => {
    // English format for international use
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let plate = '';
    
    // 3 letters
    for (let i = 0; i < 3; i++) {
      plate += letters[randomNum(0, 25)];
    }
    
    plate += '-';
    
    // 4 numbers
    for (let i = 0; i < 4; i++) {
      plate += randomNum(0, 9);
    }
    
    return plate;
  },

  vin: () => {
    const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ1234567890';
    let vin = '';
    for (let i = 0; i < 17; i++) {
      vin += chars[randomNum(0, chars.length - 1)];
    }
    return vin;
  },

  engineSize: () => {
    const sizes = ['1.0L', '1.2L', '1.4L', '1.6L', '1.8L', '2.0L', '2.4L', '2.5L', '3.0L', '3.5L', '4.0L', '5.0L', '6.0L'];
    return randomChoice(sizes);
  },

  fuelType: () => randomChoice([
    'Gasoline', 'Diesel', 'Hybrid', 'Electric', 'Plug-in Hybrid', 'CNG', 'LPG'
  ]),

  fuelTypeAr: () => randomChoice([
    'بنزين', 'ديزل', 'هجين', 'كهربائي', 'هجين قابل للشحن', 'غاز طبيعي', 'غاز البترول المسال'
  ]),

  transmission: () => randomChoice(['Manual', 'Automatic', 'CVT', 'Semi-Automatic']),

  transmissionAr: () => randomChoice(['يدوي', 'أوتوماتيكي', 'متغير مستمر', 'نصف أوتوماتيكي']),

  carColor: () => randomChoice([
    'White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Brown', 
    'Gold', 'Beige', 'Orange', 'Yellow', 'Purple', 'Pink'
  ]),

  carColorAr: () => randomChoice([
    'أبيض', 'أسود', 'فضي', 'رمادي', 'أحمر', 'أزرق', 'أخضر', 'بني',
    'ذهبي', 'بيج', 'برتقالي', 'أصفر', 'بنفسجي', 'وردي'
  ]),

  carYear: () => randomNum(2000, 2024),

  mileage: () => `${randomNum(5000, 200000)} km`,

  price: () => `${randomNum(15000, 500000)} SAR`,

  insuranceCompany: () => randomChoice([
    'TAWUNIYA', 'Malath Insurance', 'Al Alamiya', 'SABB Takaful', 'Al Rajhi Takaful',
    'Buruj Cooperative Insurance', 'Gulf General Cooperative Insurance', 'Saudi Enaya Cooperative Insurance',
    'Solidarity Saudi Takaful', 'Walaa Cooperative Insurance', 'Weqaya Takaful', 'Al Ahlia Insurance'
  ]),

  insuranceType: () => randomChoice([
    'Comprehensive', 'Third Party', 'Third Party Fire & Theft', 'Commercial'
  ]),

  insuranceTypeAr: () => randomChoice([
    'شامل', 'ضد الغير', 'ضد الغير والحريق والسرقة', 'تجاري'
  ]),

  dealership: () => randomChoice([
    'Abdul Latif Jameel', 'Haji Husein Alireza', 'Mohamed Yousuf Naghi Motors', 'Al-Jazirah Vehicles',
    'Petromin Corporation', 'United Motors', 'Al Jomaih Automotive', 'Zahid Tractor',
    'Wallan Trading Company', 'Al Majdouie Motors', 'Samaco Automotive', 'Al Hammad Motors'
  ]),

  serviceType: () => randomChoice([
    'Oil Change', 'Brake Service', 'Tire Rotation', 'Engine Tune-up', 'AC Service',
    'Battery Replacement', 'Transmission Service', 'Wheel Alignment', 'Car Wash', 'Detailing'
  ]),

  serviceTypeAr: () => randomChoice([
    'تغيير الزيت', 'خدمة الفرامل', 'دوران الإطارات', 'ضبط المحرك', 'خدمة التكييف',
    'استبدال البطارية', 'خدمة ناقل الحركة', 'ضبط العجلات', 'غسيل السيارة', 'تنظيف شامل'
  ]),

  partName: () => randomChoice([
    'Engine Oil', 'Brake Pads', 'Air Filter', 'Spark Plugs', 'Battery', 'Tires',
    'Windshield Wipers', 'Headlights', 'Radiator', 'Alternator', 'Starter', 'Clutch'
  ]),

  partNameAr: () => randomChoice([
    'زيت المحرك', 'فحمات الفرامل', 'فلتر الهواء', 'شمعات الإشعال', 'البطارية', 'الإطارات',
    'ماسحات الزجاج', 'المصابيح الأمامية', 'الرادياتير', 'المولد', 'بادئ التشغيل', 'القابض'
  ]),

  drivingLicenseNumber: () => {
    let license = '';
    for (let i = 0; i < 10; i++) {
      license += randomNum(0, 9);
    }
    return license;
  },

  licenseCategory: () => randomChoice([
    'Private Car', 'Motorcycle', 'Heavy Vehicle', 'Bus', 'Taxi', 'Truck'
  ]),

  licenseCategoryAr: () => randomChoice([
    'سيارة خاصة', 'دراجة نارية', 'مركبة ثقيلة', 'حافلة', 'تاكسي', 'شاحنة'
  ]),

  trafficViolation: () => randomChoice([
    'Speeding', 'Running Red Light', 'Illegal Parking', 'No Seatbelt', 'Phone Use While Driving',
    'Wrong Lane', 'Expired Registration', 'No Insurance', 'Reckless Driving', 'DUI'
  ]),

  trafficViolationAr: () => randomChoice([
    'تجاوز السرعة', 'تجاوز الإشارة الحمراء', 'وقوف خاطئ', 'عدم ربط الحزام', 'استخدام الهاتف أثناء القيادة',
    'مسار خاطئ', 'انتهاء التسجيل', 'عدم وجود تأمين', 'قيادة متهورة', 'القيادة تحت تأثير المخدرات'
  ]),

  fineAmount: () => `${randomChoice([100, 150, 200, 300, 500, 1000, 1500, 2000])} SAR`,

  garageLocation: () => {
    const locations = [
      { en: 'Al Olaya District', ar: 'حي العليا' },
      { en: 'Al Malaz District', ar: 'حي الملز' },
      { en: 'Al Sulaimaniyah', ar: 'السليمانية' },
      { en: 'Al Rawdah', ar: 'الروضة' },
      { en: 'Al Sahafah', ar: 'الصحافة' }
    ];
    const location = randomChoice(locations);
    return `${location.en} (${location.ar})`;
  },

  fuelStation: () => randomChoice([
    'ARAMCO', 'ALDREES', 'TOTAL', 'Shell', 'Mobil', 'Petromin', 'WOQOD'
  ]),

  parkingType: () => randomChoice([
    'Street Parking', 'Parking Garage', 'Valet Parking', 'Private Parking', 'Mall Parking'
  ]),

  parkingTypeAr: () => randomChoice([
    'وقوف الشارع', 'مرآب السيارات', 'وقوف الخدمة', 'وقوف خاص', 'وقوف المول'
  ])
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { automotiveGenerators };
} else if (typeof window !== 'undefined') {
  window.automotiveGenerators = automotiveGenerators;
}