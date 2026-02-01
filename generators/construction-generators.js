// Construction generators
let sharedConstructionData = null;

function generateSharedConstructionData() {
  const projectPairs = [
    { en: 'Riyadh Metro Extension', ar: 'توسعة مترو الرياض' },
    { en: 'King Salman Park Development', ar: 'تطوير حديقة الملك سلمان' },
    { en: 'NEOM Smart City Phase 1', ar: 'نيوم المدينة الذكية المرحلة الأولى' },
    { en: 'Red Sea Resort Complex', ar: 'مجمع منتجع البحر الأحمر' },
    { en: 'Al Diriyah Gate Project', ar: 'مشروع بوابة الدرعية' },
    { en: 'Qiddiya Entertainment City', ar: 'مدينة القدية الترفيهية' }
  ];

  const contractorPairs = [
    { en: 'Saudi Binladin Group', ar: 'مجموعة بن لادن السعودية' },
    { en: 'Al-Rashid Trading & Contracting', ar: 'الراشد للتجارة والمقاولات' },
    { en: 'Saudi Oger Construction', ar: 'السعودية أوجيه للإنشاءات' },
    { en: 'Abdullah A.M. Al-Khodari & Sons', ar: 'عبدالله عبدالمحسن الخضري وأولاده' },
    { en: 'El-Seif Engineering Contracting', ar: 'السيف للمقاولات الهندسية' }
  ];

  const projectManagerPairs = [
    { en: 'Eng. Ahmed Al-Rashid', ar: 'م. أحمد الراشد' },
    { en: 'Eng. Fatima Al-Zahra', ar: 'م. فاطمة الزهراء' },
    { en: 'Eng. Omar Al-Ghamdi', ar: 'م. عمر الغامدي' },
    { en: 'Eng. Nora Al-Mutairi', ar: 'م. نورا المطيري' }
  ];

  const constructionTypePairs = [
    { en: 'Residential Building', ar: 'مبنى سكني' },
    { en: 'Commercial Complex', ar: 'مجمع تجاري' },
    { en: 'Industrial Facility', ar: 'منشأة صناعية' },
    { en: 'Infrastructure Project', ar: 'مشروع بنية تحتية' },
    { en: 'Mixed-Use Development', ar: 'تطوير متعدد الاستخدامات' }
  ];

  const materialTypePairs = [
    { en: 'Reinforced Concrete', ar: 'خرسانة مسلحة' },
    { en: 'Steel Frame', ar: 'هيكل فولاذي' },
    { en: 'Precast Concrete', ar: 'خرسانة مسبقة الصب' },
    { en: 'Glass Curtain Wall', ar: 'جدار ستائري زجاجي' },
    { en: 'Composite Materials', ar: 'مواد مركبة' }
  ];

  sharedConstructionData = {
    project: randomChoice(projectPairs),
    contractor: randomChoice(contractorPairs),
    projectManager: randomChoice(projectManagerPairs),
    constructionType: randomChoice(constructionTypePairs),
    materialType: randomChoice(materialTypePairs),
    budget: randomNum(1000000, 100000000),
    floorArea: randomNum(500, 50000),
    buildingHeight: randomNum(10, 300)
  };
}

const constructionGenerators = {
  projectName: () => {
    if (!sharedConstructionData) generateSharedConstructionData();
    return sharedConstructionData.project.en;
  },

  projectNameAr: () => {
    if (!sharedConstructionData) generateSharedConstructionData();
    return sharedConstructionData.project.ar;
  },

  contractorName: () => {
    if (!sharedConstructionData) generateSharedConstructionData();
    return sharedConstructionData.contractor.en;
  },

  contractorNameAr: () => {
    if (!sharedConstructionData) generateSharedConstructionData();
    return sharedConstructionData.contractor.ar;
  },

  projectManager: () => {
    if (!sharedConstructionData) generateSharedConstructionData();
    return sharedConstructionData.projectManager.en;
  },

  projectManagerAr: () => {
    if (!sharedConstructionData) generateSharedConstructionData();
    return sharedConstructionData.projectManager.ar;
  },

  buildingPermit: () => `BP${randomNum(100000, 999999)}`,

  projectBudget: () => {
    if (!sharedConstructionData) generateSharedConstructionData();
    return `${sharedConstructionData.budget.toLocaleString()} SAR`;
  },

  completionDate: () => {
    const date = new Date();
    date.setDate(date.getDate() + randomNum(30, 1095)); // 1 month to 3 years
    return date.toISOString().split('T')[0];
  },

  floorArea: () => {
    if (!sharedConstructionData) generateSharedConstructionData();
    return `${sharedConstructionData.floorArea} sqm`;
  },

  buildingHeight: () => {
    if (!sharedConstructionData) generateSharedConstructionData();
    return `${sharedConstructionData.buildingHeight} meters`;
  },

  constructionType: () => {
    if (!sharedConstructionData) generateSharedConstructionData();
    return sharedConstructionData.constructionType.en;
  },

  constructionTypeAr: () => {
    if (!sharedConstructionData) generateSharedConstructionData();
    return sharedConstructionData.constructionType.ar;
  },

  materialType: () => {
    if (!sharedConstructionData) generateSharedConstructionData();
    return sharedConstructionData.materialType.en;
  },

  materialTypeAr: () => {
    if (!sharedConstructionData) generateSharedConstructionData();
    return sharedConstructionData.materialType.ar;
  },

  safetyRating: () => randomChoice(['Excellent', 'Good', 'Satisfactory', 'Needs Improvement'])
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { constructionGenerators };
} else if (typeof window !== 'undefined') {
  window.constructionGenerators = constructionGenerators;
}
