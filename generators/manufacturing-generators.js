// Manufacturing generators
let sharedManufacturingData = null;

function generateSharedManufacturingData() {
  const factoryPairs = [
    { en: 'Saudi Steel Manufacturing', ar: 'التصنيع السعودي للصلب' },
    { en: 'Petrochemical Industries Corp', ar: 'شركة الصناعات البتروكيماوية' },
    { en: 'Al-Rajhi Food Processing', ar: 'الراجحي لتجهيز الأغذية' },
    { en: 'SABIC Plastics Plant', ar: 'مصنع سابك للبلاستيك' },
    { en: 'Arabian Cement Factory', ar: 'مصنع الأسمنت العربي' },
    { en: 'Gulf Electronics Assembly', ar: 'تجميع الخليج للإلكترونيات' }
  ];

  const operatorPairs = [
    { en: 'Operator Ahmed Al-Rashid', ar: 'المشغل أحمد الراشد' },
    { en: 'Operator Omar Al-Ghamdi', ar: 'المشغل عمر الغامدي' },
    { en: 'Operator Khalid Al-Otaibi', ar: 'المشغل خالد العتيبي' },
    { en: 'Operator Salim Al-Mutairi', ar: 'المشغل سليم المطيري' }
  ];

  const rawMaterialPairs = [
    { en: 'Steel Alloy', ar: 'سبيكة الصلب' },
    { en: 'Plastic Resin', ar: 'راتنج البلاستيك' },
    { en: 'Aluminum Sheet', ar: 'صفائح الألومنيوم' },
    { en: 'Chemical Compound', ar: 'مركب كيميائي' },
    { en: 'Textile Fiber', ar: 'ألياف نسيجية' },
    { en: 'Glass Material', ar: 'مواد زجاجية' }
  ];

  sharedManufacturingData = {
    factory: randomChoice(factoryPairs),
    operator: randomChoice(operatorPairs),
    rawMaterial: randomChoice(rawMaterialPairs),
    productionQuantity: randomNum(100, 10000),
    defectRate: (randomNum(1, 50) / 10).toFixed(1),
    qualityGrade: randomChoice(['A+', 'A', 'B+', 'B', 'C'])
  };
}

const manufacturingGenerators = {
  factoryName: () => {
    if (!sharedManufacturingData) generateSharedManufacturingData();
    return sharedManufacturingData.factory.en;
  },

  factoryNameAr: () => {
    if (!sharedManufacturingData) generateSharedManufacturingData();
    return sharedManufacturingData.factory.ar;
  },

  productionLine: () => `LINE-${randomChoice(['A', 'B', 'C', 'D'])}-${randomNum(1, 10)}`,
  batchNumber: () => `BATCH${randomNum(100000, 999999)}`,
  lotNumber: () => `LOT${randomNum(10000, 99999)}`,

  qualityGrade: () => {
    if (!sharedManufacturingData) generateSharedManufacturingData();
    return sharedManufacturingData.qualityGrade;
  },

  manufacturingDate: () => {
    const date = new Date();
    date.setDate(date.getDate() - randomNum(1, 30));
    return date.toISOString().split('T')[0];
  },

  expiryDate: () => {
    const date = new Date();
    date.setDate(date.getDate() + randomNum(30, 730)); // 1 month to 2 years
    return date.toISOString().split('T')[0];
  },

  machineId: () => `MCH${randomNum(1000, 9999)}`,

  operatorName: () => {
    if (!sharedManufacturingData) generateSharedManufacturingData();
    return sharedManufacturingData.operator.en;
  },

  operatorNameAr: () => {
    if (!sharedManufacturingData) generateSharedManufacturingData();
    return sharedManufacturingData.operator.ar;
  },

  shiftNumber: () => randomChoice(['1st Shift', '2nd Shift', '3rd Shift', 'Night Shift']),

  productionQuantity: () => {
    if (!sharedManufacturingData) generateSharedManufacturingData();
    return `${sharedManufacturingData.productionQuantity} units`;
  },

  defectRate: () => {
    if (!sharedManufacturingData) generateSharedManufacturingData();
    return `${sharedManufacturingData.defectRate}%`;
  },

  rawMaterial: () => {
    if (!sharedManufacturingData) generateSharedManufacturingData();
    return sharedManufacturingData.rawMaterial.en;
  },

  rawMaterialAr: () => {
    if (!sharedManufacturingData) generateSharedManufacturingData();
    return sharedManufacturingData.rawMaterial.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { manufacturingGenerators };
} else if (typeof window !== 'undefined') {
  window.manufacturingGenerators = manufacturingGenerators;
}
