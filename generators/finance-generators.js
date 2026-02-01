// Finance generators
const financeGenerators = {
  iban: () => {
    const bankCodes = Object.keys(saudiData.bankCodes);
    const bankCode = randomChoice(bankCodes);
    
    let accountNumber = '';
    for (let i = 0; i < 18; i++) {
      accountNumber += randomNum(0, 9);
    }
    
    const initialIban = `SA00${bankCode}${accountNumber}`;
    const rearrangedIban = initialIban.slice(4) + initialIban.slice(0, 4);
    
    let numericIban = '';
    for (let char of rearrangedIban) {
      if (char >= 'A' && char <= 'Z') {
        numericIban += (char.charCodeAt(0) - 55).toString();
      } else {
        numericIban += char;
      }
    }
    
    const remainder = BigInt(numericIban) % 97n;
    const checkDigits = (98n - remainder).toString().padStart(2, '0');
    
    return `SA${checkDigits}${bankCode}${accountNumber}`;
  },

  bankName: () => {
    const bankCodes = Object.keys(saudiData.bankCodes);
    const bankCode = randomChoice(bankCodes);
    return saudiData.bankCodes[bankCode];
  },

  accountNumber: () => {
    let acc = '';
    for (let i = 0; i < 12; i++) {
      acc += randomNum(0, 9);
    }
    return acc;
  },

  creditCard: () => generatePaymentCard('visa'),
  visaCard: () => generatePaymentCard('visa'),
  masterCard: () => generatePaymentCard('mastercard'),
  madaCard: () => generatePaymentCard('mada'),

  cardExpiry: () => {
    const month = randomNum(1, 12).toString().padStart(2, '0');
    const year = randomNum(2025, 2030);
    return `${month}/${year}`;
  },

  cvv: () => randomNum(100, 999).toString(),

  currency: () => randomChoice(['SAR', 'USD', 'EUR', 'GBP', 'AED', 'KWD', 'QAR', 'BHD']),
  exchangeRate: () => (randomNum(100, 500) / 100).toFixed(4),
  stockSymbol: () => randomChoice(['SABIC', 'STC', 'RAJHI', 'NCB', 'SAMBA', 'ARAMCO']),

  bankNameAr: () => {
    const bankPairs = [
      'مصرف الراجحي', 'البنك الأهلي التجاري', 'بنك الرياض', 'مجموعة سامبا المالية',
      'البنك السعودي الفرنسي', 'البنك العربي الوطني', 'البنك السعودي للاستثمار', 'بنك الإنماء'
    ];
    return randomChoice(bankPairs);
  },

  swiftCode: () => `RIBL${randomChoice(['SA', 'RY'])}${randomNum(10, 99)}`,
  
  currencyAr: () => {
    const currencies = ['ريال سعودي', 'دولار أمريكي', 'يورو', 'جنيه إسترليني', 'درهم إماراتي'];
    return randomChoice(currencies);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { financeGenerators };
} else if (typeof window !== 'undefined') {
  window.financeGenerators = financeGenerators;
}
