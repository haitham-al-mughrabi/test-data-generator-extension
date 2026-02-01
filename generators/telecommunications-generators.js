// Telecommunications generators
let sharedTelecomData = null;

function generateSharedTelecomData() {
  const providerPairs = [
    { en: 'Saudi Telecom Company (STC)', ar: 'شركة الاتصالات السعودية' },
    { en: 'Mobily', ar: 'موبايلي' },
    { en: 'Zain Saudi Arabia', ar: 'زين السعودية' },
    { en: 'Virgin Mobile Saudi Arabia', ar: 'فيرجن موبايل السعودية' },
    { en: 'Lebara Mobile', ar: 'ليبارا موبايل' },
    { en: 'SALAM Mobile', ar: 'سلام موبايل' }
  ];

  const planTypePairs = [
    { en: 'Prepaid Plan', ar: 'باقة مسبقة الدفع' },
    { en: 'Postpaid Plan', ar: 'باقة آجلة الدفع' },
    { en: 'Business Plan', ar: 'باقة الأعمال' },
    { en: 'Family Plan', ar: 'باقة العائلة' },
    { en: 'Student Plan', ar: 'باقة الطلاب' },
    { en: 'Unlimited Plan', ar: 'باقة غير محدودة' }
  ];

  const towerLocationPairs = [
    { en: 'Riyadh Central Tower', ar: 'برج الرياض المركزي' },
    { en: 'Jeddah Coastal Station', ar: 'محطة جدة الساحلية' },
    { en: 'Dammam Industrial Tower', ar: 'برج الدمام الصناعي' },
    { en: 'King Fahd District Station', ar: 'محطة حي الملك فهد' },
    { en: 'Al Olaya Communication Hub', ar: 'مركز اتصالات العليا' }
  ];

  const roamingStatusPairs = [
    { en: 'Active', ar: 'نشط' },
    { en: 'Inactive', ar: 'غير نشط' },
    { en: 'International Roaming', ar: 'تجوال دولي' },
    { en: 'Regional Roaming', ar: 'تجوال إقليمي' },
    { en: 'Blocked', ar: 'محظور' }
  ];

  sharedTelecomData = {
    provider: randomChoice(providerPairs),
    planType: randomChoice(planTypePairs),
    towerLocation: randomChoice(towerLocationPairs),
    roamingStatus: randomChoice(roamingStatusPairs),
    dataAllowance: randomNum(1, 100),
    callMinutes: randomNum(100, 5000),
    smsCount: randomNum(50, 1000)
  };
}

const telecommunicationsGenerators = {
  phoneProvider: () => {
    if (!sharedTelecomData) generateSharedTelecomData();
    return sharedTelecomData.provider.en;
  },

  phoneProviderAr: () => {
    if (!sharedTelecomData) generateSharedTelecomData();
    return sharedTelecomData.provider.ar;
  },

  planType: () => {
    if (!sharedTelecomData) generateSharedTelecomData();
    return sharedTelecomData.planType.en;
  },

  planTypeAr: () => {
    if (!sharedTelecomData) generateSharedTelecomData();
    return sharedTelecomData.planType.ar;
  },

  dataAllowance: () => {
    if (!sharedTelecomData) generateSharedTelecomData();
    return `${sharedTelecomData.dataAllowance} GB`;
  },

  callMinutes: () => {
    if (!sharedTelecomData) generateSharedTelecomData();
    return `${sharedTelecomData.callMinutes} minutes`;
  },

  smsCount: () => {
    if (!sharedTelecomData) generateSharedTelecomData();
    return `${sharedTelecomData.smsCount} SMS`;
  },

  networkType: () => randomChoice(['4G LTE', '5G', '3G', 'GSM']),
  signalStrength: () => `${randomNum(-120, -30)} dBm`,

  towerLocation: () => {
    if (!sharedTelecomData) generateSharedTelecomData();
    return sharedTelecomData.towerLocation.en;
  },

  towerLocationAr: () => {
    if (!sharedTelecomData) generateSharedTelecomData();
    return sharedTelecomData.towerLocation.ar;
  },

  imei: () => {
    let imei = '';
    for (let i = 0; i < 15; i++) {
      imei += randomNum(0, 9);
    }
    return imei;
  },

  simCard: () => {
    let sim = '89966';
    for (let i = 0; i < 15; i++) {
      sim += randomNum(0, 9);
    }
    return sim;
  },

  roamingStatus: () => {
    if (!sharedTelecomData) generateSharedTelecomData();
    return sharedTelecomData.roamingStatus.en;
  },

  roamingStatusAr: () => {
    if (!sharedTelecomData) generateSharedTelecomData();
    return sharedTelecomData.roamingStatus.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { telecommunicationsGenerators };
} else if (typeof window !== 'undefined') {
  window.telecommunicationsGenerators = telecommunicationsGenerators;
}
