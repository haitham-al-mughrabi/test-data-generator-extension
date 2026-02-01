// Banking & Finance generators
let sharedBankingData = null;

function generateSharedBankingData() {
  const branchPairs = [
    { en: 'Riyadh Main Branch', ar: 'الفرع الرئيسي بالرياض' },
    { en: 'Jeddah Commercial Branch', ar: 'الفرع التجاري بجدة' },
    { en: 'Dammam Business Center', ar: 'مركز الأعمال بالدمام' },
    { en: 'King Fahd Road Branch', ar: 'فرع طريق الملك فهد' },
    { en: 'Al Olaya Financial Center', ar: 'المركز المالي بالعليا' },
    { en: 'Khobar Corporate Branch', ar: 'الفرع المؤسسي بالخبر' }
  ];

  const accountTypePairs = [
    { en: 'Savings Account', ar: 'حساب توفير' },
    { en: 'Current Account', ar: 'حساب جاري' },
    { en: 'Fixed Deposit', ar: 'وديعة ثابتة' },
    { en: 'Investment Account', ar: 'حساب استثماري' },
    { en: 'Business Account', ar: 'حساب تجاري' },
    { en: 'Student Account', ar: 'حساب طلابي' }
  ];

  sharedBankingData = {
    branch: randomChoice(branchPairs),
    accountType: randomChoice(accountTypePairs),
    creditScore: randomNum(300, 850),
    interestRate: (randomNum(100, 1500) / 100).toFixed(2),
    investmentAmount: randomNum(10000, 1000000)
  };
}

const bankingFinanceGenerators = {
  bankBranch: () => {
    if (!sharedBankingData) generateSharedBankingData();
    return sharedBankingData.branch.en;
  },

  bankBranchAr: () => {
    if (!sharedBankingData) generateSharedBankingData();
    return sharedBankingData.branch.ar;
  },

  routingNumber: () => `${randomNum(100000000, 999999999)}`,
  sortCode: () => `${randomNum(10, 99)}-${randomNum(10, 99)}-${randomNum(10, 99)}`,
  bic: () => `${randomChoice(['RIBL', 'NCBK', 'RJHI', 'SABB'])}SA${randomNum(10, 99)}`,

  accountType: () => {
    if (!sharedBankingData) generateSharedBankingData();
    return sharedBankingData.accountType.en;
  },

  accountTypeAr: () => {
    if (!sharedBankingData) generateSharedBankingData();
    return sharedBankingData.accountType.ar;
  },

  transactionId: () => `TXN${randomNum(1000000000, 9999999999)}`,
  checkNumber: () => `${randomNum(1000, 9999)}`,
  loanNumber: () => `LN${randomNum(100000000, 999999999)}`,

  creditScore: () => {
    if (!sharedBankingData) generateSharedBankingData();
    return sharedBankingData.creditScore;
  },

  interestRate: () => {
    if (!sharedBankingData) generateSharedBankingData();
    return `${sharedBankingData.interestRate}%`;
  },

  exchangeRate: () => `${(randomNum(250, 400) / 100).toFixed(4)}`,

  investmentAmount: () => {
    if (!sharedBankingData) generateSharedBankingData();
    return `${sharedBankingData.investmentAmount.toLocaleString()} SAR`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { bankingFinanceGenerators };
} else if (typeof window !== 'undefined') {
  window.bankingFinanceGenerators = bankingFinanceGenerators;
}
