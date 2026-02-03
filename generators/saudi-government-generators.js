// Saudi Government and official document generators
let sharedSaudiData = null;

function generateSharedSaudiData() {
  const regionPairs = [
    { en: 'Riyadh Region', ar: 'منطقة الرياض' },
    { en: 'Makkah Region', ar: 'منطقة مكة المكرمة' },
    { en: 'Eastern Province', ar: 'المنطقة الشرقية' },
    { en: 'Madinah Region', ar: 'منطقة المدينة المنورة' },
    { en: 'Qassim Region', ar: 'منطقة القصيم' },
    { en: 'Hail Region', ar: 'منطقة حائل' },
    { en: 'Tabuk Region', ar: 'منطقة تبوك' },
    { en: 'Northern Borders', ar: 'منطقة الحدود الشمالية' },
    { en: 'Jazan Region', ar: 'منطقة جازان' },
    { en: 'Najran Region', ar: 'منطقة نجران' },
    { en: 'Al Bahah Region', ar: 'منطقة الباحة' },
    { en: 'Al Jouf Region', ar: 'منطقة الجوف' },
    { en: 'Asir Region', ar: 'منطقة عسير' }
  ];

  const provincePairs = [
    { en: 'Riyadh Province', ar: 'محافظة الرياض' },
    { en: 'Jeddah Province', ar: 'محافظة جدة' },
    { en: 'Dammam Province', ar: 'محافظة الدمام' },
    { en: 'Taif Province', ar: 'محافظة الطائف' },
    { en: 'Buraidah Province', ar: 'محافظة بريدة' },
    { en: 'Khamis Mushait Province', ar: 'محافظة خميس مشيط' },
    { en: 'Hofuf Province', ar: 'محافظة الهفوف' },
    { en: 'Mubarraz Province', ar: 'محافظة المبرز' },
    { en: 'Jubail Province', ar: 'محافظة الجبيل' },
    { en: 'Yanbu Province', ar: 'محافظة ينبع' }
  ];

  sharedSaudiData = {
    region: randomChoice(regionPairs),
    province: randomChoice(provincePairs)
  };
}

const saudiGovernmentGenerators = {
  commercialRegister: () => `${randomNum(1000000000, 9999999999)}`,
  
  unifiedEstablishmentNumber: () => `7${randomNum(100000000, 999999999)}`,
  
  taxNumber: () => `3${randomNum(10000000000000, 99999999999999)}`,
  
  municipalLicense: () => `ML${randomNum(100000, 999999)}`,
  
  moiciLicense: () => `MOCI${randomNum(100000, 999999)}`,
  
  chamberMembership: () => `CM${randomNum(10000000, 99999999)}`,
  
  socialInsurance: () => `${randomNum(100000000, 999999999)}`,
  
  gosiNumber: () => `GOSI${randomNum(1000000, 9999999)}`,
  
  qiwaNumber: () => `QW${randomNum(100000000, 999999999)}`,
  
  qiwaContractId: () => `QWC${randomNum(1000000000, 9999999999)}`,
  
  mudadContractId: () => `MDC${randomNum(1000000000, 9999999999)}`,
  
  takamolId: () => `TKM${randomNum(100000000, 999999999)}`,
  
  musanedId: () => `MSN${randomNum(100000000, 999999999)}`,
  
  ajeerContractId: () => `AJR${randomNum(1000000000, 9999999999)}`,
  
  fasahTerminationId: () => `FSH${randomNum(100000000, 999999999)}`,
  
  laborOfficeNumber: () => `LO${randomNum(1000000, 9999999)}`,
  
  zakat: () => `ZK${randomNum(100000000, 999999999)}`,
  
  customsCode: () => `CC${randomNum(10000000, 99999999)}`,
  
  saudiPost: () => `${randomNum(10000, 99999)}`,
  
  absherId: () => `ABS${randomNum(1000000000, 9999999999)}`,
  
  nafathId: () => `NFT${randomNum(100000000, 999999999)}`,
  
  elmId: () => `ELM${randomNum(10000000, 99999999)}`,
  
  balady: () => `BLD${randomNum(100000, 999999)}`,
  
  misaLicense: () => `MISA${randomNum(100000, 999999)}`,
  
  monshaatLicense: () => `MST${randomNum(100000, 999999)}`,
  
  saberCertificate: () => `SABER${randomNum(1000000, 9999999)}`,
  
  hrdfCertificate: () => `HRDF${randomNum(100000, 999999)}`,
  
  saudizationNumber: () => `SZ${randomNum(10000000, 99999999)}`,
  
  etimadNumber: () => `ETM${randomNum(100000000, 999999999)}`,
  
  sadadPayment: () => `SADAD${randomNum(1000000, 9999999)}`,
  
  samaLicense: () => `SAMA${randomNum(100000, 999999)}`,
  
  zatcaCsid: () => `CSID${randomNum(100000000000, 999999999999)}`,
  
  tawakkalnaQr: () => `TW${randomNum(1000000000000000, 9999999999999999)}`,
  
  sehhatyId: () => `SH${randomNum(100000000, 999999999)}`,
  
  muqeemNumber: () => `MQ${randomNum(100000000, 999999999)}`,
  
  nusukPermit: () => `NSK${randomNum(1000000, 9999999)}`,
  
  waselCard: () => `WSL${randomNum(1000000000, 9999999999)}`,
  
  darbCard: () => `DRB${randomNum(1000000000, 9999999999)}`,

  region: () => {
    if (!sharedSaudiData) generateSharedSaudiData();
    return sharedSaudiData.region.en;
  },

  regionAr: () => {
    if (!sharedSaudiData) generateSharedSaudiData();
    return sharedSaudiData.region.ar;
  },

  province: () => {
    if (!sharedSaudiData) generateSharedSaudiData();
    return sharedSaudiData.province.en;
  },

  provinceAr: () => {
    if (!sharedSaudiData) generateSharedSaudiData();
    return sharedSaudiData.province.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { saudiGovernmentGenerators };
} else if (typeof window !== 'undefined') {
  window.saudiGovernmentGenerators = saudiGovernmentGenerators;
}
