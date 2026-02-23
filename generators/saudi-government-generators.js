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
  
  // VAT Number - 15 digits format: 3XXXXXXXX-X-XXX-XX
  vatNumber: () => {
    const part1 = `3${randomNum(10000000, 99999999)}`;
    const part2 = randomNum(1, 9);
    const part3 = randomNum(100, 999);
    const part4 = randomNum(10, 99);
    return `${part1}-${part2}-${part3}-${part4}`;
  },
  
  // VAT Number (simple format)
  vatNumberSimple: () => `3${randomNum(100000000000000, 999999999999999)}`,
  
  unifiedEstablishmentNumber: () => `7${randomNum(100000000, 999999999)}`,
  
  taxNumber: () => `3${randomNum(10000000000000, 99999999999999)}`,
  
  // Nafath OTP (6 digits)
  nafathOTP: () => `${randomNum(100000, 999999)}`,
  
  // Absher OTP (4-6 digits)
  absherOTP: () => `${randomNum(1000, 9999)}`,
  
  // Yaqeen Verification Code
  yaqeenCode: () => `YQ${randomNum(100000, 999999)}`,
  
  // MOL (Ministry of Labor) Establishment Number
  molEstablishmentNumber: () => `${randomNum(10000000, 99999999)}`,
  
  // MOL Labor Office Number  
  molLaborOfficeNumber: () => `${randomNum(100, 999)}`,
  
  // MOL Sequence Number
  molSequenceNumber: () => `${randomNum(1000000, 9999999)}`,
  
  municipalLicense: () => `ML${randomNum(100000, 999999)}`,
  
  moiciLicense: () => `MOCI${randomNum(100000, 999999)}`,
  
  chamberMembership: () => `CM${randomNum(10000000, 99999999)}`,
  
  socialInsurance: () => `${randomNum(100000000, 999999999)}`,
  
  gosiNumber: () => `GOSI${randomNum(1000000, 9999999)}`,
  
  // GOSI Establishment Number
  gosiEstablishmentNumber: () => `${randomNum(100000, 999999)}`,
  
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
  
  // ZATCA (Zakat, Tax and Customs Authority) Number
  zatcaNumber: () => `ZATCA${randomNum(1000000, 9999999)}`,
  
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
  
  // Sadad Bill Number (10 digits)
  sadadBillNumber: () => `${randomNum(1000000000, 9999999999)}`,
  
  // Esal Invoice Number
  esalInvoiceNumber: () => `ESL${randomNum(100000000000, 999999999999)}`,
  
  // Fatoorah E-Invoice Number
  fatoorahInvoiceNumber: () => `FTR${randomNum(100000000000, 999999999999)}`,
  
  // ZATCA E-Invoice UUID
  zatcaInvoiceUUID: () => {
    const hex = '0123456789abcdef';
    let uuid = '';
    for (let i = 0; i < 32; i++) {
      uuid += hex[randomNum(0, 15)];
      if ([8, 12, 16, 20].includes(i)) uuid += '-';
    }
    return uuid;
  },
  
  // Mada Card Number (starts with 4, 5, or 6)
  madaCardNumber: () => {
    const prefix = randomChoice(['4', '5', '6']);
    let card = prefix;
    for (let i = 0; i < 15; i++) {
      card += randomNum(0, 9);
    }
    return card.match(/.{1,4}/g).join(' ');
  },
  
  // Tawakkalna QR Code
  tawakkalnaQR: () => `TW${randomNum(1000000000000000, 9999999999999999)}`,
  
  // Tawakkalna User ID
  tawakkalnaID: () => `TWK${randomNum(100000000, 999999999)}`,
  
  // Sehhaty Health ID
  sehhatyID: () => `SHT${randomNum(100000000, 999999999)}`,
  
  // Sehhaty Appointment Number
  sehhatyAppointment: () => `APT${randomNum(1000000, 9999999)}`,
  
  // Muqeem Platform Number
  muqeemNumber: () => `MQM${randomNum(100000000, 999999999)}`,
  
  // Balady Municipality Platform
  baladyRequestNumber: () => `BLD${randomNum(1000000000, 9999999999)}`,
  
  baladyLicenseNumber: () => `BLC${randomNum(100000000, 999999999)}`,
  
  // Simah Credit Bureau
  simahCreditScore: () => randomNum(300, 900),
  
  simahReportNumber: () => `SMH${randomNum(100000000000, 999999999999)}`,
  
  // Najiz MOJ (Ministry of Justice)
  najizCaseNumber: () => `NJZ${randomNum(1000000000, 9999999999)}`,
  
  najizDeedNumber: () => `${randomNum(100000000, 999999999)}`,
  
  najizCourtNumber: () => `CRT${randomNum(100000, 999999)}`,
  
  // Ejar Rental Platform
  ejarContractNumber: () => `EJR${randomNum(1000000000, 9999999999)}`,
  
  ejarUnitNumber: () => `UNIT${randomNum(100000000, 999999999)}`,
  
  // Wathq Real Estate Authentication
  wathqDeedNumber: () => `WTQ${randomNum(100000000, 999999999)}`,
  
  wathqVerificationCode: () => `${randomNum(100000, 999999)}`,
  
  // Sakani Housing
  sakaniApplicationNumber: () => `SKN${randomNum(1000000000, 9999999999)}`,
  
  sakaniBeneficiaryNumber: () => `BNF${randomNum(100000000, 999999999)}`,
  
  // Rega Real Estate Authority
  regaBrokerLicense: () => `FAL${randomNum(100000000, 999999999)}`,
  
  regaAdvertisementLicense: () => `ADV${randomNum(100000000, 999999999)}`,
  
  // Thiqah Business Gateway
  thiqahBusinessID: () => `THQ${randomNum(100000000, 999999999)}`,
  
  thiqahVerificationCode: () => `${randomNum(100000, 999999)}`,
  
  // Elm Company Services
  elmInvoiceNumber: () => `ELM${randomNum(1000000000, 9999999999)}`,
  
  elmSubscriberNumber: () => `SUB${randomNum(100000000, 999999999)}`,
  
  // Meras Inheritance Platform
  merasInheritanceNumber: () => `MRS${randomNum(100000000, 999999999)}`,
  
  merasCaseNumber: () => `MRC${randomNum(1000000000, 9999999999)}`,
  
  // Taqdeer Vehicle Estimation
  taqdeerReportNumber: () => `TQD${randomNum(100000000, 999999999)}`,
  
  taqdeerVehicleID: () => `VEH${randomNum(1000000, 9999999)}`,
  
  // Bayan Customs Declaration
  bayanDeclarationNumber: () => `BYN${randomNum(1000000000, 9999999999)}`,
  
  bayanManifestNumber: () => `MNF${randomNum(100000000, 999999999)}`,
  
  // Fasah Customs Platform
  fasahDeclarationNumber: () => `FSH${randomNum(1000000000, 9999999999)}`,
  
  fasahBrokerLicense: () => `BRK${randomNum(100000, 999999)}`,
  
  // Wasel Delivery Tracking
  waselTracking: () => `WSL${randomNum(1000000000, 9999999999)}`,
  
  // Jahez Order Number
  jahezOrderNumber: () => `JHZ${randomNum(100000000, 999999999)}`,
  
  // HungerStation Order Number
  hungerstationOrderNumber: () => `HGS${randomNum(100000000, 999999999)}`,
  
  // Careem Trip ID
  careemTripID: () => `CRM${randomNum(1000000000, 9999999999)}`,
  
  // STC Pay Wallet Number
  stcPayWallet: () => `966${randomNum(500000000, 599999999)}`,
  
  // Urpay Transaction ID
  urpayTransactionID: () => `URP${randomNum(100000000000, 999999999999)}`,
  
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
