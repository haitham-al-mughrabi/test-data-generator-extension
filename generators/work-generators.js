// Work and business generators
let sharedWorkData = null;

function generateSharedWorkData() {
  const jobPairs = [
    { en: 'Software Engineer', ar: 'مهندس برمجيات' },
    { en: 'Project Manager', ar: 'مدير مشروع' },
    { en: 'Business Analyst', ar: 'محلل أعمال' },
    { en: 'Marketing Manager', ar: 'مدير تسويق' },
    { en: 'Sales Representative', ar: 'مندوب مبيعات' },
    { en: 'HR Specialist', ar: 'أخصائي موارد بشرية' },
    { en: 'Financial Analyst', ar: 'محلل مالي' },
    { en: 'Operations Manager', ar: 'مدير عمليات' },
    { en: 'Quality Assurance Engineer', ar: 'مهندس ضمان جودة' },
    { en: 'Data Scientist', ar: 'عالم بيانات' }
  ];
  
  const deptPairs = [
    { en: 'IT', ar: 'تقنية المعلومات' },
    { en: 'HR', ar: 'الموارد البشرية' },
    { en: 'Finance', ar: 'المالية' },
    { en: 'Marketing', ar: 'التسويق' },
    { en: 'Sales', ar: 'المبيعات' },
    { en: 'Operations', ar: 'العمليات' },
    { en: 'Legal', ar: 'القانونية' }
  ];
  
  const years = randomNum(1, 20);
  
  sharedWorkData = {
    jobTitle: randomChoice(jobPairs),
    department: randomChoice(deptPairs),
    experience: { en: `${years} years`, ar: `${years} سنة` }
  };
}

const workGenerators = {
  company: () => randomChoice(saudiData.companies),
  
  jobTitle: () => {
    if (!sharedWorkData) generateSharedWorkData();
    return sharedWorkData.jobTitle.en;
  },

  jobTitleAr: () => {
    if (!sharedWorkData) generateSharedWorkData();
    return sharedWorkData.jobTitle.ar;
  },

  department: () => {
    if (!sharedWorkData) generateSharedWorkData();
    return sharedWorkData.department.en;
  },

  departmentAr: () => {
    if (!sharedWorkData) generateSharedWorkData();
    return sharedWorkData.department.ar;
  },

  experience: () => {
    if (!sharedWorkData) generateSharedWorkData();
    return sharedWorkData.experience.en;
  },

  experienceAr: () => {
    if (!sharedWorkData) generateSharedWorkData();
    return sharedWorkData.experience.ar;
  },

  salary: () => `${randomNum(3000, 25000)} SAR`,

  companyId: () => `CR${randomNum(1000000000, 9999999999)}`,
  vatNumber: () => `${randomNum(100000000000000, 999999999999999)}`,
  invoice: () => `INV-${randomNum(10000, 99999)}`,
  orderNumber: () => `ORD-${new Date().getFullYear()}-${randomNum(10000, 99999)}`,
  productCode: () => `PRD-${randomNum(10000, 99999)}`,
  barcode: () => {
    let code = '';
    for (let i = 0; i < 13; i++) {
      code += randomNum(0, 9);
    }
    return code;
  },
  serialNumber: () => `SN${randomNum(100000000, 999999999)}`,
  productName: () => randomChoice(['Smartphone Pro', 'Laptop Elite', 'Tablet Max', 'Watch Smart', 'Headphones Premium'])
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { workGenerators };
} else if (typeof window !== 'undefined') {
  window.workGenerators = workGenerators;
}
