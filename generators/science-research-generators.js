// Science & Research generators
let sharedScienceData = null;

function generateSharedScienceData() {
  const researchPairs = [
    { en: 'AI in Healthcare Applications', ar: 'تطبيقات الذكاء الاصطناعي في الرعاية الصحية' },
    { en: 'Renewable Energy Systems', ar: 'أنظمة الطاقة المتجددة' },
    { en: 'Desert Ecosystem Studies', ar: 'دراسات النظام البيئي الصحراوي' },
    { en: 'Water Desalination Technology', ar: 'تقنية تحلية المياه' },
    { en: 'Solar Panel Efficiency', ar: 'كفاءة الألواح الشمسية' },
    { en: 'Genetic Engineering Research', ar: 'أبحاث الهندسة الوراثية' },
    { en: 'Climate Change Impact', ar: 'تأثير التغير المناخي' },
    { en: 'Nanotechnology Applications', ar: 'تطبيقات تقنية النانو' }
  ];

  const scientistPairs = [
    { en: 'Dr. Ahmed Al-Rashid', ar: 'د. أحمد الراشد' },
    { en: 'Dr. Fatima Al-Zahra', ar: 'د. فاطمة الزهراء' },
    { en: 'Dr. Omar Al-Ghamdi', ar: 'د. عمر الغامدي' },
    { en: 'Dr. Nora Al-Mutairi', ar: 'د. نورا المطيري' },
    { en: 'Dr. Khalid Al-Otaibi', ar: 'د. خالد العتيبي' }
  ];

  const labPairs = [
    { en: 'Advanced Research Laboratory', ar: 'مختبر الأبحاث المتقدمة' },
    { en: 'King Abdullah Research Center', ar: 'مركز الملك عبدالله للأبحاث' },
    { en: 'KAUST Innovation Lab', ar: 'مختبر الابتكار في كاوست' },
    { en: 'Saudi Research Institute', ar: 'معهد الأبحاث السعودي' },
    { en: 'Technology Development Center', ar: 'مركز تطوير التقنية' }
  ];

  const fieldPairs = [
    { en: 'Artificial Intelligence', ar: 'الذكاء الاصطناعي' },
    { en: 'Biotechnology', ar: 'التقنية الحيوية' },
    { en: 'Environmental Science', ar: 'علوم البيئة' },
    { en: 'Materials Science', ar: 'علوم المواد' },
    { en: 'Computer Science', ar: 'علوم الحاسوب' },
    { en: 'Chemistry', ar: 'الكيمياء' },
    { en: 'Physics', ar: 'الفيزياء' },
    { en: 'Engineering', ar: 'الهندسة' }
  ];

  const journalPairs = [
    { en: 'Saudi Journal of Science', ar: 'المجلة السعودية للعلوم' },
    { en: 'Arabian Research Quarterly', ar: 'الفصلية العربية للأبحاث' },
    { en: 'Middle East Technology Review', ar: 'مراجعة تقنية الشرق الأوسط' },
    { en: 'Gulf Science Journal', ar: 'مجلة علوم الخليج' }
  ];

  const hypothesisPairs = [
    { en: 'Improved efficiency through optimization', ar: 'تحسين الكفاءة من خلال التحسين' },
    { en: 'Enhanced performance with new materials', ar: 'أداء محسن بمواد جديدة' },
    { en: 'Reduced environmental impact', ar: 'تقليل التأثير البيئي' },
    { en: 'Cost-effective solution development', ar: 'تطوير حلول فعالة من حيث التكلفة' }
  ];

  const methodologyPairs = [
    { en: 'Experimental design with control groups', ar: 'تصميم تجريبي مع مجموعات ضابطة' },
    { en: 'Statistical analysis and modeling', ar: 'التحليل الإحصائي والنمذجة' },
    { en: 'Laboratory testing and validation', ar: 'الاختبار المعملي والتحقق' },
    { en: 'Field studies and data collection', ar: 'الدراسات الميدانية وجمع البيانات' }
  ];

  sharedScienceData = {
    research: randomChoice(researchPairs),
    scientist: randomChoice(scientistPairs),
    lab: randomChoice(labPairs),
    field: randomChoice(fieldPairs),
    journal: randomChoice(journalPairs),
    hypothesis: randomChoice(hypothesisPairs),
    methodology: randomChoice(methodologyPairs)
  };
}

const scienceResearchGenerators = {
  researchTitle: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.research.en;
  },

  researchTitleAr: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.research.ar;
  },

  scientistName: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.scientist.en;
  },

  scientistNameAr: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.scientist.ar;
  },

  labName: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.lab.en;
  },

  labNameAr: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.lab.ar;
  },

  researchField: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.field.en;
  },

  researchFieldAr: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.field.ar;
  },

  publicationDate: () => {
    const date = new Date();
    date.setDate(date.getDate() - randomNum(1, 1095)); // Last 3 years
    return date.toISOString().split('T')[0];
  },

  journalName: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.journal.en;
  },

  journalNameAr: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.journal.ar;
  },

  experimentId: () => `EXP${randomNum(100000, 999999)}`,

  hypothesis: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.hypothesis.en;
  },

  hypothesisAr: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.hypothesis.ar;
  },

  methodology: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.methodology.en;
  },

  methodologyAr: () => {
    if (!sharedScienceData) generateSharedScienceData();
    return sharedScienceData.methodology.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { scienceResearchGenerators };
} else if (typeof window !== 'undefined') {
  window.scienceResearchGenerators = scienceResearchGenerators;
}
