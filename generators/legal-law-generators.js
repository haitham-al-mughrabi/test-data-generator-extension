// Legal & Law generators
let sharedLegalData = null;

function generateSharedLegalData() {
  const lawFirmPairs = [
    { en: 'Al-Rashid Law Firm', ar: 'مكتب الراشد للمحاماة' },
    { en: 'Saudi Legal Associates', ar: 'الشركاء القانونيون السعوديون' },
    { en: 'Gulf Legal Consultancy', ar: 'الاستشارات القانونية الخليجية' },
    { en: 'Al-Mutairi & Partners', ar: 'المطيري وشركاؤه' },
    { en: 'Kingdom Law Office', ar: 'مكتب قانون المملكة' }
  ];

  const lawyerPairs = [
    { en: 'Advocate Ahmed Al-Rashid', ar: 'المحامي أحمد الراشد' },
    { en: 'Advocate Fatima Al-Zahra', ar: 'المحامية فاطمة الزهراء' },
    { en: 'Advocate Omar Al-Ghamdi', ar: 'المحامي عمر الغامدي' },
    { en: 'Advocate Nora Al-Mutairi', ar: 'المحامية نورا المطيري' }
  ];

  const caseTypePairs = [
    { en: 'Commercial Dispute', ar: 'نزاع تجاري' },
    { en: 'Family Law', ar: 'قانون الأسرة' },
    { en: 'Labor Law', ar: 'قانون العمل' },
    { en: 'Real Estate', ar: 'عقارات' },
    { en: 'Criminal Law', ar: 'قانون جنائي' },
    { en: 'Corporate Law', ar: 'قانون الشركات' },
    { en: 'Intellectual Property', ar: 'الملكية الفكرية' }
  ];

  const courtPairs = [
    { en: 'Riyadh General Court', ar: 'المحكمة العامة بالرياض' },
    { en: 'Commercial Court', ar: 'المحكمة التجارية' },
    { en: 'Labor Court', ar: 'محكمة العمل' },
    { en: 'Administrative Court', ar: 'المحكمة الإدارية' },
    { en: 'Appeal Court', ar: 'محكمة الاستئناف' }
  ];

  const judgePairs = [
    { en: 'Judge Khalid Al-Otaibi', ar: 'القاضي خالد العتيبي' },
    { en: 'Judge Amina Al-Harbi', ar: 'القاضية أمينة الحربي' },
    { en: 'Judge Salim Al-Zahrani', ar: 'القاضي سليم الزهراني' },
    { en: 'Judge Maryam Al-Ghamdi', ar: 'القاضية مريم الغامدي' }
  ];

  const statusPairs = [
    { en: 'Pending', ar: 'قيد النظر' },
    { en: 'In Progress', ar: 'قيد المراجعة' },
    { en: 'Resolved', ar: 'محلول' },
    { en: 'Closed', ar: 'مغلق' },
    { en: 'Under Appeal', ar: 'قيد الاستئناف' }
  ];

  sharedLegalData = {
    lawFirm: randomChoice(lawFirmPairs),
    lawyer: randomChoice(lawyerPairs),
    caseType: randomChoice(caseTypePairs),
    court: randomChoice(courtPairs),
    judge: randomChoice(judgePairs),
    status: randomChoice(statusPairs)
  };
}

const legalLawGenerators = {
  lawFirm: () => {
    if (!sharedLegalData) generateSharedLegalData();
    return sharedLegalData.lawFirm.en;
  },

  lawFirmAr: () => {
    if (!sharedLegalData) generateSharedLegalData();
    return sharedLegalData.lawFirm.ar;
  },

  lawyerName: () => {
    if (!sharedLegalData) generateSharedLegalData();
    return sharedLegalData.lawyer.en;
  },

  lawyerNameAr: () => {
    if (!sharedLegalData) generateSharedLegalData();
    return sharedLegalData.lawyer.ar;
  },

  caseNumber: () => `CASE${randomNum(100000, 999999)}`,

  caseType: () => {
    if (!sharedLegalData) generateSharedLegalData();
    return sharedLegalData.caseType.en;
  },

  caseTypeAr: () => {
    if (!sharedLegalData) generateSharedLegalData();
    return sharedLegalData.caseType.ar;
  },

  courtName: () => {
    if (!sharedLegalData) generateSharedLegalData();
    return sharedLegalData.court.en;
  },

  courtNameAr: () => {
    if (!sharedLegalData) generateSharedLegalData();
    return sharedLegalData.court.ar;
  },

  judgeName: () => {
    if (!sharedLegalData) generateSharedLegalData();
    return sharedLegalData.judge.en;
  },

  judgeNameAr: () => {
    if (!sharedLegalData) generateSharedLegalData();
    return sharedLegalData.judge.ar;
  },

  licenseNumber: () => `LIC${randomNum(10000, 99999)}`,
  contractId: () => `CON${randomNum(100000, 999999)}`,

  legalStatus: () => {
    if (!sharedLegalData) generateSharedLegalData();
    return sharedLegalData.status.en;
  },

  legalStatusAr: () => {
    if (!sharedLegalData) generateSharedLegalData();
    return sharedLegalData.status.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { legalLawGenerators };
} else if (typeof window !== 'undefined') {
  window.legalLawGenerators = legalLawGenerators;
}
