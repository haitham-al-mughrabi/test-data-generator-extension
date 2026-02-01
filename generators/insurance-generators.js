// Insurance generators
let sharedInsuranceData = null;

function generateSharedInsuranceData() {
  const insuranceCompanyPairs = [
    { en: 'Saudi Arabian Insurance Company', ar: 'الشركة السعودية للتأمين' },
    { en: 'Tawuniya Insurance', ar: 'التعاونية للتأمين' },
    { en: 'Malath Insurance', ar: 'ملاذ للتأمين' },
    { en: 'SABB Takaful', ar: 'سامبا تكافل' },
    { en: 'Al Rajhi Takaful', ar: 'الراجحي تكافل' },
    { en: 'Bupa Arabia', ar: 'بوبا العربية' },
    { en: 'Medgulf Insurance', ar: 'مدجلف للتأمين' }
  ];

  const policyTypePairs = [
    { en: 'Health Insurance', ar: 'تأمين صحي' },
    { en: 'Car Insurance', ar: 'تأمين سيارات' },
    { en: 'Life Insurance', ar: 'تأمين على الحياة' },
    { en: 'Property Insurance', ar: 'تأمين الممتلكات' },
    { en: 'Travel Insurance', ar: 'تأمين السفر' },
    { en: 'Business Insurance', ar: 'تأمين الأعمال' }
  ];

  const agentPairs = [
    { en: 'Agent Ahmed Al-Rashid', ar: 'الوكيل أحمد الراشد' },
    { en: 'Agent Fatima Al-Zahra', ar: 'الوكيلة فاطمة الزهراء' },
    { en: 'Agent Omar Al-Ghamdi', ar: 'الوكيل عمر الغامدي' },
    { en: 'Agent Nora Al-Mutairi', ar: 'الوكيلة نورا المطيري' }
  ];

  const beneficiaryPairs = [
    { en: 'Spouse', ar: 'الزوج/الزوجة' },
    { en: 'Children', ar: 'الأطفال' },
    { en: 'Parents', ar: 'الوالدين' },
    { en: 'Siblings', ar: 'الأشقاء' },
    { en: 'Estate', ar: 'التركة' }
  ];

  sharedInsuranceData = {
    company: randomChoice(insuranceCompanyPairs),
    policyType: randomChoice(policyTypePairs),
    agent: randomChoice(agentPairs),
    beneficiary: randomChoice(beneficiaryPairs),
    premiumAmount: randomNum(500, 10000),
    coverageAmount: randomNum(50000, 1000000),
    deductible: randomNum(500, 5000)
  };
}

const insuranceGenerators = {
  policyNumber: () => `POL${randomNum(100000000, 999999999)}`,

  insuranceCompany: () => {
    if (!sharedInsuranceData) generateSharedInsuranceData();
    return sharedInsuranceData.company.en;
  },

  insuranceCompanyAr: () => {
    if (!sharedInsuranceData) generateSharedInsuranceData();
    return sharedInsuranceData.company.ar;
  },

  policyType: () => {
    if (!sharedInsuranceData) generateSharedInsuranceData();
    return sharedInsuranceData.policyType.en;
  },

  policyTypeAr: () => {
    if (!sharedInsuranceData) generateSharedInsuranceData();
    return sharedInsuranceData.policyType.ar;
  },

  premiumAmount: () => {
    if (!sharedInsuranceData) generateSharedInsuranceData();
    return `${sharedInsuranceData.premiumAmount} SAR`;
  },

  coverageAmount: () => {
    if (!sharedInsuranceData) generateSharedInsuranceData();
    return `${sharedInsuranceData.coverageAmount.toLocaleString()} SAR`;
  },

  deductible: () => {
    if (!sharedInsuranceData) generateSharedInsuranceData();
    return `${sharedInsuranceData.deductible} SAR`;
  },

  claimNumber: () => `CLM${randomNum(100000000, 999999999)}`,

  agentName: () => {
    if (!sharedInsuranceData) generateSharedInsuranceData();
    return sharedInsuranceData.agent.en;
  },

  agentNameAr: () => {
    if (!sharedInsuranceData) generateSharedInsuranceData();
    return sharedInsuranceData.agent.ar;
  },

  policyStartDate: () => {
    const date = new Date();
    date.setDate(date.getDate() - randomNum(1, 365));
    return date.toISOString().split('T')[0];
  },

  policyEndDate: () => {
    const date = new Date();
    date.setDate(date.getDate() + randomNum(30, 365));
    return date.toISOString().split('T')[0];
  },

  beneficiary: () => {
    if (!sharedInsuranceData) generateSharedInsuranceData();
    return sharedInsuranceData.beneficiary.en;
  },

  beneficiaryAr: () => {
    if (!sharedInsuranceData) generateSharedInsuranceData();
    return sharedInsuranceData.beneficiary.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { insuranceGenerators };
} else if (typeof window !== 'undefined') {
  window.insuranceGenerators = insuranceGenerators;
}
