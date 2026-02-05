// Weather & Environment generators
const weatherEnvironmentGenerators = {
  temperature: () => `${randomNum(-5, 50)}°C`,

  temperatureFahrenheit: () => `${randomNum(23, 122)}°F`,

  humidity: () => `${randomNum(10, 95)}%`,

  windSpeed: () => `${randomNum(0, 80)} km/h`,

  windDirection: () => randomChoice([
    'North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'
  ]),

  windDirectionAr: () => randomChoice([
    'شمال', 'شمال شرق', 'شرق', 'جنوب شرق', 'جنوب', 'جنوب غرب', 'غرب', 'شمال غرب'
  ]),

  weatherCondition: () => randomChoice([
    'Sunny', 'Partly Cloudy', 'Cloudy', 'Overcast', 'Light Rain', 'Heavy Rain',
    'Thunderstorm', 'Fog', 'Mist', 'Sandstorm', 'Clear', 'Hot', 'Humid'
  ]),

  weatherConditionAr: () => randomChoice([
    'مشمس', 'غائم جزئياً', 'غائم', 'ملبد بالغيوم', 'مطر خفيف', 'مطر غزير',
    'عاصفة رعدية', 'ضباب', 'رذاذ', 'عاصفة رملية', 'صافي', 'حار', 'رطب'
  ]),

  precipitation: () => `${randomNum(0, 50)} mm`,

  visibility: () => `${randomNum(1, 20)} km`,

  uvIndex: () => randomNum(1, 11),

  airQualityIndex: () => randomNum(1, 500),

  airQuality: () => {
    const aqi = randomNum(1, 500);
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  },

  airQualityAr: () => {
    const aqi = randomNum(1, 500);
    if (aqi <= 50) return 'جيد';
    if (aqi <= 100) return 'معتدل';
    if (aqi <= 150) return 'غير صحي للفئات الحساسة';
    if (aqi <= 200) return 'غير صحي';
    if (aqi <= 300) return 'غير صحي جداً';
    return 'خطر';
  },

  season: () => randomChoice(['Spring', 'Summer', 'Autumn', 'Winter']),

  seasonAr: () => randomChoice(['الربيع', 'الصيف', 'الخريف', 'الشتاء']),

  moonPhase: () => randomChoice([
    'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
    'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'
  ]),

  moonPhaseAr: () => randomChoice([
    'محاق', 'هلال متزايد', 'تربيع أول', 'أحدب متزايد',
    'بدر', 'أحدب متناقص', 'تربيع أخير', 'هلال متناقص'
  ]),

  sunrise: () => {
    const hour = randomNum(5, 7);
    const minute = randomNum(0, 59);
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  },

  sunset: () => {
    const hour = randomNum(17, 19);
    const minute = randomNum(0, 59);
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  },

  barometricPressure: () => `${randomNum(980, 1040)} hPa`,

  dewPoint: () => `${randomNum(-10, 30)}°C`,

  heatIndex: () => `${randomNum(20, 60)}°C`,

  windChill: () => `${randomNum(-20, 10)}°C`,

  pollutant: () => randomChoice([
    'PM2.5', 'PM10', 'Ozone (O3)', 'Nitrogen Dioxide (NO2)', 'Sulfur Dioxide (SO2)', 'Carbon Monoxide (CO)'
  ]),

  pollutantLevel: () => `${randomNum(1, 200)} μg/m³`,

  climateZone: () => randomChoice([
    'Desert', 'Semi-Arid', 'Arid', 'Tropical', 'Subtropical', 'Mediterranean', 'Continental'
  ]),

  climateZoneAr: () => randomChoice([
    'صحراوي', 'شبه قاحل', 'قاحل', 'استوائي', 'شبه استوائي', 'متوسطي', 'قاري'
  ]),

  naturalDisaster: () => randomChoice([
    'Sandstorm', 'Flash Flood', 'Drought', 'Heatwave', 'Dust Storm', 'Heavy Rain', 'Thunderstorm'
  ]),

  naturalDisasterAr: () => randomChoice([
    'عاصفة رملية', 'فيضان مفاجئ', 'جفاف', 'موجة حر', 'عاصفة ترابية', 'مطر غزير', 'عاصفة رعدية'
  ]),

  environmentalAlert: () => randomChoice([
    'High Temperature Warning', 'Dust Storm Alert', 'Air Quality Warning', 'UV Index Alert',
    'Sandstorm Warning', 'Flash Flood Watch', 'Heat Advisory', 'Wind Advisory'
  ]),

  environmentalAlertAr: () => randomChoice([
    'تحذير من درجات الحرارة العالية', 'تنبيه عاصفة ترابية', 'تحذير جودة الهواء', 'تنبيه مؤشر الأشعة فوق البنفسجية',
    'تحذير عاصفة رملية', 'مراقبة الفيضانات المفاجئة', 'استشارة الحرارة', 'استشارة الرياح'
  ]),

  ecosystemType: () => randomChoice([
    'Desert Ecosystem', 'Oasis', 'Coastal Area', 'Mountain Region', 'Wadi', 'Mangrove', 'Coral Reef'
  ]),

  ecosystemTypeAr: () => randomChoice([
    'النظام البيئي الصحراوي', 'واحة', 'منطقة ساحلية', 'منطقة جبلية', 'وادي', 'أشجار القرم', 'الشعاب المرجانية'
  ]),

  wildlifeSpecies: () => randomChoice([
    'Arabian Oryx', 'Sand Cat', 'Fennec Fox', 'Houbara Bustard', 'Arabian Gazelle',
    'Camel', 'Falcon', 'Desert Monitor', 'Spiny-tailed Lizard', 'Arabian Wolf'
  ]),

  wildlifeSpeciesAr: () => randomChoice([
    'المها العربي', 'قط الرمال', 'ثعلب الفنك', 'الحبارى', 'الغزال العربي',
    'الجمل', 'الصقر', 'الورل الصحراوي', 'السحلية شوكية الذيل', 'الذئب العربي'
  ]),

  plantSpecies: () => randomChoice([
    'Date Palm', 'Ghaf Tree', 'Desert Rose', 'Aloe Vera', 'Cactus',
    'Acacia', 'Tamarisk', 'Desert Sage', 'Jojoba', 'Frankincense Tree'
  ]),

  plantSpeciesAr: () => randomChoice([
    'نخلة التمر', 'شجرة الغاف', 'وردة الصحراء', 'الصبار', 'الصبار الشوكي',
    'الأكاسيا', 'الطرفاء', 'المريمية الصحراوية', 'الجوجوبا', 'شجرة اللبان'
  ]),

  waterSource: () => randomChoice([
    'Groundwater', 'Desalinated Water', 'Rainwater', 'Well Water', 'Spring Water',
    'Recycled Water', 'Atmospheric Water', 'Oasis Water'
  ]),

  waterSourceAr: () => randomChoice([
    'المياه الجوفية', 'المياه المحلاة', 'مياه الأمطار', 'مياه البئر', 'مياه الينابيع',
    'المياه المعاد تدويرها', 'المياه الجوية', 'مياه الواحة'
  ]),

  soilType: () => randomChoice([
    'Sandy Soil', 'Clay Soil', 'Rocky Soil', 'Saline Soil', 'Alluvial Soil', 'Desert Soil'
  ]),

  soilTypeAr: () => randomChoice([
    'تربة رملية', 'تربة طينية', 'تربة صخرية', 'تربة مالحة', 'تربة غرينية', 'تربة صحراوية'
  ]),

  renewableEnergy: () => randomChoice([
    'Solar Power', 'Wind Power', 'Geothermal', 'Hydroelectric', 'Biomass', 'Tidal Energy'
  ]),

  renewableEnergyAr: () => randomChoice([
    'الطاقة الشمسية', 'طاقة الرياح', 'الطاقة الحرارية الأرضية', 'الطاقة الكهرومائية', 'الكتلة الحيوية', 'طاقة المد والجزر'
  ]),

  carbonFootprint: () => `${randomNum(1, 50)} tons CO2/year`,

  energyConsumption: () => `${randomNum(100, 2000)} kWh/month`,

  waterConsumption: () => `${randomNum(50, 500)} liters/day`,

  wasteGeneration: () => `${randomNum(0.5, 5)} kg/day`,

  recyclingRate: () => `${randomNum(10, 90)}%`
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { weatherEnvironmentGenerators };
} else if (typeof window !== 'undefined') {
  window.weatherEnvironmentGenerators = weatherEnvironmentGenerators;
}