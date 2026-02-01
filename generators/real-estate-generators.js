// Real Estate generators
let sharedRealEstateData = null;

function generateSharedRealEstateData() {
  const propertyTypePairs = [
    { en: 'Villa', ar: 'فيلا' },
    { en: 'Apartment', ar: 'شقة' },
    { en: 'Townhouse', ar: 'تاون هاوس' },
    { en: 'Duplex', ar: 'دوبلكس' },
    { en: 'Studio', ar: 'استوديو' },
    { en: 'Penthouse', ar: 'بنت هاوس' },
    { en: 'Commercial Building', ar: 'مبنى تجاري' },
    { en: 'Office Space', ar: 'مساحة مكتبية' }
  ];

  const neighborhoodPairs = [
    { en: 'Al Olaya', ar: 'العليا' },
    { en: 'Al Malaz', ar: 'الملز' },
    { en: 'Al Naseem', ar: 'النسيم' },
    { en: 'Al Rawdah', ar: 'الروضة' },
    { en: 'King Fahd District', ar: 'حي الملك فهد' },
    { en: 'Al Sulaimaniyah', ar: 'السليمانية' },
    { en: 'Al Woroud', ar: 'الورود' },
    { en: 'Al Nakheel', ar: 'النخيل' }
  ];

  const agentPairs = [
    { en: 'Ahmed Al-Rashid Real Estate', ar: 'أحمد الراشد العقارية' },
    { en: 'Nora Al-Mutairi Properties', ar: 'نورا المطيري العقارات' },
    { en: 'Khalid Al-Otaibi Realty', ar: 'خالد العتيبي العقارات' },
    { en: 'Fatima Al-Zahra Homes', ar: 'فاطمة الزهراء للمنازل' }
  ];

  const amenitiesPairs = [
    { en: 'Swimming Pool, Gym, Parking', ar: 'مسبح، صالة رياضية، موقف سيارات' },
    { en: 'Garden, Balcony, Security', ar: 'حديقة، شرفة، أمن' },
    { en: 'Central AC, Elevator, Storage', ar: 'تكييف مركزي، مصعد، مخزن' },
    { en: 'Maid Room, Driver Room, Terrace', ar: 'غرفة خادمة، غرفة سائق، تراس' }
  ];

  sharedRealEstateData = {
    propertyType: randomChoice(propertyTypePairs),
    neighborhood: randomChoice(neighborhoodPairs),
    agent: randomChoice(agentPairs),
    amenities: randomChoice(amenitiesPairs),
    price: randomNum(500000, 5000000),
    size: randomNum(100, 800),
    bedrooms: randomNum(1, 6),
    bathrooms: randomNum(1, 4),
    age: randomNum(0, 20)
  };
}

const realEstateGenerators = {
  propertyType: () => {
    if (!sharedRealEstateData) generateSharedRealEstateData();
    return sharedRealEstateData.propertyType.en;
  },

  propertyTypeAr: () => {
    if (!sharedRealEstateData) generateSharedRealEstateData();
    return sharedRealEstateData.propertyType.ar;
  },

  propertyPrice: () => {
    if (!sharedRealEstateData) generateSharedRealEstateData();
    return `${sharedRealEstateData.price.toLocaleString()} SAR`;
  },

  propertySize: () => {
    if (!sharedRealEstateData) generateSharedRealEstateData();
    return `${sharedRealEstateData.size} sqm`;
  },

  bedrooms: () => {
    if (!sharedRealEstateData) generateSharedRealEstateData();
    return sharedRealEstateData.bedrooms;
  },

  bathrooms: () => {
    if (!sharedRealEstateData) generateSharedRealEstateData();
    return sharedRealEstateData.bathrooms;
  },

  propertyAge: () => {
    if (!sharedRealEstateData) generateSharedRealEstateData();
    return `${sharedRealEstateData.age} years`;
  },

  neighborhood: () => {
    if (!sharedRealEstateData) generateSharedRealEstateData();
    return sharedRealEstateData.neighborhood.en;
  },

  neighborhoodAr: () => {
    if (!sharedRealEstateData) generateSharedRealEstateData();
    return sharedRealEstateData.neighborhood.ar;
  },

  agentName: () => {
    if (!sharedRealEstateData) generateSharedRealEstateData();
    return sharedRealEstateData.agent.en;
  },

  agentNameAr: () => {
    if (!sharedRealEstateData) generateSharedRealEstateData();
    return sharedRealEstateData.agent.ar;
  },

  propertyId: () => `PROP${randomNum(100000, 999999)}`,

  listingDate: () => {
    const date = new Date();
    date.setDate(date.getDate() - randomNum(1, 365));
    return date.toISOString().split('T')[0];
  },

  amenities: () => {
    if (!sharedRealEstateData) generateSharedRealEstateData();
    return sharedRealEstateData.amenities.en;
  },

  amenitiesAr: () => {
    if (!sharedRealEstateData) generateSharedRealEstateData();
    return sharedRealEstateData.amenities.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { realEstateGenerators };
} else if (typeof window !== 'undefined') {
  window.realEstateGenerators = realEstateGenerators;
}
