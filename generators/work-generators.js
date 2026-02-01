// Work and business generators
let sharedWorkData = null;

function generateSharedWorkData() {
  const jobPairs = [
    // Medical & Healthcare - طبي وصحي
    { en: 'Doctor', ar: 'طبيب' },
    { en: 'Nurse', ar: 'ممرض' },
    { en: 'Pharmacist', ar: 'صيدلاني' },
    { en: 'Dentist', ar: 'طبيب أسنان' },
    { en: 'Physical Therapist', ar: 'معالج طبيعي' },
    { en: 'Laboratory Technician', ar: 'فني مختبر' },
    { en: 'Surgeon', ar: 'جراح' },
    { en: 'Anesthesiologist', ar: 'طبيب تخدير' },
    { en: 'Radiologist', ar: 'أخصائي أشعة' },
    { en: 'Cardiologist', ar: 'أخصائي قلب' },
    { en: 'Pediatrician', ar: 'طبيب أطفال' },
    { en: 'Psychiatrist', ar: 'طبيب نفسي' },
    
    // Engineering & Technical - هندسة وتقنية
    { en: 'Civil Engineer', ar: 'مهندس مدني' },
    { en: 'Mechanical Engineer', ar: 'مهندس ميكانيكي' },
    { en: 'Electrical Engineer', ar: 'مهندس كهربائي' },
    { en: 'Petroleum Engineer', ar: 'مهندس بترول' },
    { en: 'Chemical Engineer', ar: 'مهندس كيميائي' },
    { en: 'Software Engineer', ar: 'مهندس برمجيات' },
    { en: 'Network Engineer', ar: 'مهندس شبكات' },
    { en: 'Systems Administrator', ar: 'مدير أنظمة' },
    { en: 'IT Support Specialist', ar: 'أخصائي دعم تقني' },
    { en: 'Database Administrator', ar: 'مدير قواعد بيانات' },
    
    // Business & Finance - أعمال ومالية
    { en: 'Chief Executive Officer', ar: 'الرئيس التنفيذي' },
    { en: 'Chief Financial Officer', ar: 'المدير المالي' },
    { en: 'General Manager', ar: 'المدير العام' },
    { en: 'Operations Manager', ar: 'مدير العمليات' },
    { en: 'Human Resources Manager', ar: 'مدير الموارد البشرية' },
    { en: 'Marketing Manager', ar: 'مدير التسويق' },
    { en: 'Sales Manager', ar: 'مدير المبيعات' },
    { en: 'Business Analyst', ar: 'محلل أعمال' },
    { en: 'Financial Analyst', ar: 'محلل مالي' },
    { en: 'Accountant', ar: 'محاسب' },
    { en: 'Auditor', ar: 'مدقق حسابات' },
    { en: 'Investment Advisor', ar: 'مستشار استثماري' },
    { en: 'Bank Manager', ar: 'مدير بنك' },
    
    // Education & Training - تعليم وتدريب
    { en: 'Teacher', ar: 'مدرس' },
    { en: 'Professor', ar: 'أستاذ' },
    { en: 'School Principal', ar: 'مدير مدرسة' },
    { en: 'Academic Coordinator', ar: 'منسق أكاديمي' },
    { en: 'Training Specialist', ar: 'أخصائي تدريب' },
    { en: 'Educational Consultant', ar: 'مستشار تعليمي' },
    
    // Oil & Gas Industry - صناعة النفط والغاز
    { en: 'Drilling Engineer', ar: 'مهندس حفر' },
    { en: 'Reservoir Engineer', ar: 'مهندس مكامن' },
    { en: 'Production Engineer', ar: 'مهندس إنتاج' },
    { en: 'Pipeline Engineer', ar: 'مهندس أنابيب' },
    { en: 'HSE Specialist', ar: 'أخصائي صحة وسلامة' },
    { en: 'Operations Supervisor', ar: 'مشرف عمليات' },
    { en: 'Maintenance Technician', ar: 'فني صيانة' },
    { en: 'Geologist', ar: 'جيولوجي' },
    
    // Construction & Architecture - بناء وعمارة
    { en: 'Architect', ar: 'مهندس معماري' },
    { en: 'Construction Manager', ar: 'مدير إنشاءات' },
    { en: 'Site Engineer', ar: 'مهندس موقع' },
    { en: 'Quantity Surveyor', ar: 'مساح كميات' },
    { en: 'Interior Designer', ar: 'مصمم داخلي' },
    { en: 'Safety Officer', ar: 'ضابط سلامة' },
    
    // Transportation & Logistics - نقل ولوجستيات
    { en: 'Logistics Coordinator', ar: 'منسق لوجستي' },
    { en: 'Supply Chain Manager', ar: 'مدير سلسلة التوريد' },
    { en: 'Warehouse Manager', ar: 'مدير مستودع' },
    { en: 'Truck Driver', ar: 'سائق شاحنة' },
    { en: 'Pilot', ar: 'طيار' },
    { en: 'Air Traffic Controller', ar: 'مراقب جوي' },
    
    // Hospitality & Tourism - ضيافة وسياحة
    { en: 'Hotel Manager', ar: 'مدير فندق' },
    { en: 'Restaurant Manager', ar: 'مدير مطعم' },
    { en: 'Chef', ar: 'طباخ' },
    { en: 'Tour Guide', ar: 'مرشد سياحي' },
    { en: 'Travel Agent', ar: 'وكيل سفر' },
    { en: 'Event Coordinator', ar: 'منسق فعاليات' },
    
    // Legal & Compliance - قانوني وامتثال
    { en: 'Lawyer', ar: 'محامي' },
    { en: 'Legal Consultant', ar: 'مستشار قانوني' },
    { en: 'Compliance Officer', ar: 'ضابط امتثال' },
    { en: 'Contract Specialist', ar: 'أخصائي عقود' },
    
    // Security & Emergency Services - أمن وخدمات طوارئ
    { en: 'Security Guard', ar: 'حارس أمن' },
    { en: 'Police Officer', ar: 'شرطي' },
    { en: 'Firefighter', ar: 'رجل إطفاء' },
    { en: 'Paramedic', ar: 'مسعف' },
    
    // Media & Communications - إعلام واتصالات
    { en: 'Journalist', ar: 'صحفي' },
    { en: 'Editor', ar: 'محرر' },
    { en: 'Graphic Designer', ar: 'مصمم جرافيك' },
    { en: 'Photographer', ar: 'مصور' },
    { en: 'Social Media Manager', ar: 'مدير وسائل التواصل' },
    
    // Retail & Sales - تجارة ومبيعات
    { en: 'Store Manager', ar: 'مدير متجر' },
    { en: 'Sales Representative', ar: 'مندوب مبيعات' },
    { en: 'Customer Service Representative', ar: 'ممثل خدمة عملاء' },
    { en: 'Cashier', ar: 'أمين صندوق' }
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
  productName: () => randomChoice(['Smartphone Pro', 'Laptop Elite', 'Tablet Max', 'Watch Smart', 'Headphones Premium']),

  workEmail: () => {
    const firstName = randomChoice(names.firstNames.male.concat(names.firstNames.female)).en.toLowerCase();
    const lastName = randomChoice(names.lastNames).en.toLowerCase();
    const companies = ['aramco', 'sabic', 'stc', 'alrajhi', 'samba', 'ncb'];
    const company = randomChoice(companies);
    return `${firstName}.${lastName}@${company}.com`;
  },

  workPhone: () => {
    const areaCodes = ['011', '012', '013', '014', '016', '017'];
    const areaCode = randomChoice(areaCodes);
    let number = '';
    for (let i = 0; i < 7; i++) {
      number += randomNum(0, 9);
    }
    return `+966 ${areaCode.substring(1)} ${number.substring(0, 3)} ${number.substring(3)}`;
  },

  employeeId: () => `EMP${randomNum(10000, 99999)}`,
  workExperience: () => randomNum(1, 25),
  
  workLocation: () => {
    const locations = ['Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Mecca', 'Medina', 'Tabuk', 'Abha'];
    return randomChoice(locations);
  },

  workLocationAr: () => {
    const locations = ['الرياض', 'جدة', 'الدمام', 'الخبر', 'مكة المكرمة', 'المدينة المنورة', 'تبوك', 'أبها'];
    return randomChoice(locations);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { workGenerators };
} else if (typeof window !== 'undefined') {
  window.workGenerators = workGenerators;
}
