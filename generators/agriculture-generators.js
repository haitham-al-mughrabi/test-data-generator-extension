// Agriculture generators
let sharedAgricultureData = null;

function generateSharedAgricultureData() {
  const cropPairs = [
    { en: 'Dates', ar: 'تمر' },
    { en: 'Wheat', ar: 'قمح' },
    { en: 'Barley', ar: 'شعير' },
    { en: 'Tomatoes', ar: 'طماطم' },
    { en: 'Cucumbers', ar: 'خيار' },
    { en: 'Watermelon', ar: 'بطيخ' },
    { en: 'Alfalfa', ar: 'برسيم' },
    { en: 'Citrus', ar: 'حمضيات' }
  ];

  const farmPairs = [
    { en: 'Al-Kharj Agricultural Farm', ar: 'مزرعة الخرج الزراعية' },
    { en: 'Qassim Green Farm', ar: 'مزرعة القصيم الخضراء' },
    { en: 'Riyadh Valley Farm', ar: 'مزرعة وادي الرياض' },
    { en: 'Eastern Province Farm', ar: 'مزرعة المنطقة الشرقية' },
    { en: 'Najd Agricultural Estate', ar: 'عزبة نجد الزراعية' }
  ];

  const farmerPairs = [
    { en: 'Farmer Ahmed Al-Rashid', ar: 'المزارع أحمد الراشد' },
    { en: 'Farmer Omar Al-Ghamdi', ar: 'المزارع عمر الغامدي' },
    { en: 'Farmer Khalid Al-Otaibi', ar: 'المزارع خالد العتيبي' },
    { en: 'Farmer Salim Al-Mutairi', ar: 'المزارع سليم المطيري' }
  ];

  const soilTypePairs = [
    { en: 'Sandy Soil', ar: 'تربة رملية' },
    { en: 'Clay Soil', ar: 'تربة طينية' },
    { en: 'Loamy Soil', ar: 'تربة طميية' },
    { en: 'Rocky Soil', ar: 'تربة صخرية' },
    { en: 'Alluvial Soil', ar: 'تربة غرينية' }
  ];

  const irrigationPairs = [
    { en: 'Drip Irrigation', ar: 'ري بالتنقيط' },
    { en: 'Sprinkler System', ar: 'نظام الرش' },
    { en: 'Flood Irrigation', ar: 'ري بالغمر' },
    { en: 'Center Pivot', ar: 'المحوري المركزي' },
    { en: 'Subsurface Irrigation', ar: 'ري تحت السطح' }
  ];

  const pesticidePairs = [
    { en: 'Organic Pesticide', ar: 'مبيد عضوي' },
    { en: 'Biological Control', ar: 'مكافحة حيوية' },
    { en: 'Integrated Pest Management', ar: 'إدارة متكاملة للآفات' },
    { en: 'Natural Insecticide', ar: 'مبيد حشري طبيعي' }
  ];

  sharedAgricultureData = {
    crop: randomChoice(cropPairs),
    farm: randomChoice(farmPairs),
    farmer: randomChoice(farmerPairs),
    soilType: randomChoice(soilTypePairs),
    irrigation: randomChoice(irrigationPairs),
    pesticide: randomChoice(pesticidePairs),
    farmSize: randomNum(10, 500),
    yield: randomNum(100, 5000)
  };
}

const agricultureGenerators = {
  cropName: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return sharedAgricultureData.crop.en;
  },

  cropNameAr: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return sharedAgricultureData.crop.ar;
  },

  farmName: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return sharedAgricultureData.farm.en;
  },

  farmNameAr: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return sharedAgricultureData.farm.ar;
  },

  farmerName: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return sharedAgricultureData.farmer.en;
  },

  farmerNameAr: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return sharedAgricultureData.farmer.ar;
  },

  plantingDate: () => {
    const date = new Date();
    date.setMonth(date.getMonth() - randomNum(1, 6));
    return date.toISOString().split('T')[0];
  },

  harvestDate: () => {
    const date = new Date();
    date.setMonth(date.getMonth() + randomNum(1, 4));
    return date.toISOString().split('T')[0];
  },

  farmSize: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return `${sharedAgricultureData.farmSize} hectares`;
  },

  soilType: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return sharedAgricultureData.soilType.en;
  },

  soilTypeAr: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return sharedAgricultureData.soilType.ar;
  },

  irrigationType: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return sharedAgricultureData.irrigation.en;
  },

  irrigationTypeAr: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return sharedAgricultureData.irrigation.ar;
  },

  yieldAmount: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return `${sharedAgricultureData.yield} kg`;
  },

  pesticide: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return sharedAgricultureData.pesticide.en;
  },

  pesticideAr: () => {
    if (!sharedAgricultureData) generateSharedAgricultureData();
    return sharedAgricultureData.pesticide.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { agricultureGenerators };
} else if (typeof window !== 'undefined') {
  window.agricultureGenerators = agricultureGenerators;
}
