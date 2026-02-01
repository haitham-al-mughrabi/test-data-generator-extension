// Energy & Utilities generators
let sharedEnergyData = null;

function generateSharedEnergyData() {
  const utilityPairs = [
    { en: 'Saudi Electricity Company', ar: 'الشركة السعودية للكهرباء' },
    { en: 'National Water Company', ar: 'شركة المياه الوطنية' },
    { en: 'Saudi Aramco Power', ar: 'أرامكو السعودية للطاقة' },
    { en: 'ACWA Power', ar: 'أكوا باور' },
    { en: 'Marafiq Utilities', ar: 'مرافق للمرافق' }
  ];

  const energyTypePairs = [
    { en: 'Electricity', ar: 'كهرباء' },
    { en: 'Natural Gas', ar: 'غاز طبيعي' },
    { en: 'Solar Power', ar: 'طاقة شمسية' },
    { en: 'Wind Power', ar: 'طاقة الرياح' },
    { en: 'Water Supply', ar: 'إمداد المياه' },
    { en: 'Sewage Treatment', ar: 'معالجة الصرف الصحي' }
  ];

  const powerPlantPairs = [
    { en: 'Riyadh Power Plant', ar: 'محطة كهرباء الرياض' },
    { en: 'Jeddah Thermal Station', ar: 'محطة جدة الحرارية' },
    { en: 'Dammam Gas Plant', ar: 'محطة الدمام للغاز' },
    { en: 'Qurayyah Solar Park', ar: 'منتزه القريّة الشمسي' },
    { en: 'Dumat Al Jandal Wind Farm', ar: 'مزرعة دومة الجندل للرياح' }
  ];

  const serviceTypePairs = [
    { en: 'Residential', ar: 'سكني' },
    { en: 'Commercial', ar: 'تجاري' },
    { en: 'Industrial', ar: 'صناعي' },
    { en: 'Agricultural', ar: 'زراعي' },
    { en: 'Government', ar: 'حكومي' }
  ];

  sharedEnergyData = {
    utility: randomChoice(utilityPairs),
    energyType: randomChoice(energyTypePairs),
    powerPlant: randomChoice(powerPlantPairs),
    serviceType: randomChoice(serviceTypePairs),
    consumption: randomNum(500, 5000),
    billAmount: randomNum(100, 2000)
  };
}

const energyUtilitiesGenerators = {
  meterNumber: () => `MTR${randomNum(10000000, 99999999)}`,

  utilityCompany: () => {
    if (!sharedEnergyData) generateSharedEnergyData();
    return sharedEnergyData.utility.en;
  },

  utilityCompanyAr: () => {
    if (!sharedEnergyData) generateSharedEnergyData();
    return sharedEnergyData.utility.ar;
  },

  energyType: () => {
    if (!sharedEnergyData) generateSharedEnergyData();
    return sharedEnergyData.energyType.en;
  },

  energyTypeAr: () => {
    if (!sharedEnergyData) generateSharedEnergyData();
    return sharedEnergyData.energyType.ar;
  },

  consumption: () => {
    if (!sharedEnergyData) generateSharedEnergyData();
    return `${sharedEnergyData.consumption} kWh`;
  },

  billAmount: () => {
    if (!sharedEnergyData) generateSharedEnergyData();
    return `${sharedEnergyData.billAmount} SAR`;
  },

  billingPeriod: () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = randomChoice(months);
    const year = randomNum(2023, 2024);
    return `${month} ${year}`;
  },

  powerPlant: () => {
    if (!sharedEnergyData) generateSharedEnergyData();
    return sharedEnergyData.powerPlant.en;
  },

  powerPlantAr: () => {
    if (!sharedEnergyData) generateSharedEnergyData();
    return sharedEnergyData.powerPlant.ar;
  },

  gridConnection: () => `GRID${randomNum(100000, 999999)}`,
  voltage: () => `${randomChoice([110, 220, 380, 440])}V`,
  frequency: () => '50 Hz',

  serviceType: () => {
    if (!sharedEnergyData) generateSharedEnergyData();
    return sharedEnergyData.serviceType.en;
  },

  serviceTypeAr: () => {
    if (!sharedEnergyData) generateSharedEnergyData();
    return sharedEnergyData.serviceType.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { energyUtilitiesGenerators };
} else if (typeof window !== 'undefined') {
  window.energyUtilitiesGenerators = energyUtilitiesGenerators;
}
