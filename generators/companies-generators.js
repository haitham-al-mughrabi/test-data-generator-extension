// Companies and business data generators
const companiesGenerators = {
  companyName: () => {
    const prefixes = ['Tech', 'Global', 'Prime', 'Elite', 'Smart', 'Digital', 'Cloud', 'Quantum', 'Nexus', 'Apex', 'Zenith', 'Vertex', 'Synergy', 'Velocity', 'Horizon'];
    const suffixes = ['Solutions', 'Systems', 'Services', 'Group', 'Corp', 'Industries', 'Enterprises', 'Labs', 'Hub', 'Works', 'Innovations', 'Dynamics', 'Partners', 'Ventures'];
    return randomChoice(prefixes) + ' ' + randomChoice(suffixes);
  },

  companyNameAr: () => {
    const names = ['شركة التقنية المتقدمة', 'مجموعة الحلول الذكية', 'شركة الابتكار الرقمي', 'مؤسسة النجاح العالمية', 'شركة الخدمات المتكاملة', 'مجموعة الأعمال الحديثة', 'شركة الرؤية المستقبلية', 'مؤسسة التطور والتنمية', 'شركة الجودة والتميز', 'مجموعة الاستثمارات الذكية'];
    return randomChoice(names);
  },

  industry: () => {
    const industries = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Energy', 'Telecommunications', 'Transportation', 'Real Estate', 'Education', 'Media', 'Hospitality', 'Agriculture', 'Construction', 'Consulting', 'Legal Services', 'Accounting', 'Insurance', 'Automotive', 'Pharmaceuticals'];
    return randomChoice(industries);
  },

  industryAr: () => {
    const industries = ['التكنولوجيا', 'المالية', 'الرعاية الصحية', 'البيع بالتجزئة', 'التصنيع', 'الطاقة', 'الاتصالات', 'النقل', 'العقارات', 'التعليم', 'الإعلام', 'الضيافة', 'الزراعة', 'البناء', 'الاستشارات', 'الخدمات القانونية', 'المحاسبة', 'التأمين', 'السيارات', 'الأدوية'];
    return randomChoice(industries);
  },

  companySize: () => {
    const sizes = ['Startup', 'Small', 'Medium', 'Large', 'Enterprise'];
    return randomChoice(sizes);
  },

  companySizeAr: () => {
    const sizes = ['ناشئة', 'صغيرة', 'متوسطة', 'كبيرة', 'مؤسسة عملاقة'];
    return randomChoice(sizes);
  },

  companyAddress: () => {
    const streets = ['Main', 'Oak', 'Elm', 'Pine', 'Maple', 'Cedar', 'Birch', 'Walnut', 'Cherry', 'Ash'];
    const types = ['Street', 'Avenue', 'Boulevard', 'Road', 'Lane', 'Drive', 'Court', 'Circle', 'Plaza', 'Way'];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
    const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA'];
    const num = Math.floor(Math.random() * 9999) + 1;
    const zip = Math.floor(Math.random() * 90000) + 10000;
    return `${num} ${randomChoice(streets)} ${randomChoice(types)}, ${randomChoice(cities)}, ${randomChoice(states)} ${zip}`;
  },

  companyAddressSaudi: () => {
    const cities = ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة', 'الخبر', 'تبوك', 'أبها', 'بريدة', 'نجران'];
    const districts = ['الروضة', 'الملز', 'الشميسي', 'الرحمانية', 'الحمراء', 'الشرقية', 'الغربية', 'الشمالية', 'الجنوبية', 'الوسطى'];
    const num = Math.floor(Math.random() * 9999) + 1;
    const zip = Math.floor(Math.random() * 90000) + 10000;
    return `${num} شارع، ${randomChoice(districts)}، ${randomChoice(cities)} ${zip}`;
  },

  companyPhone: () => {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `+1 (${areaCode}) ${exchange}-${number}`;
  },

  companyPhoneSaudi: () => {
    const number = Math.floor(Math.random() * 900000000) + 100000000;
    return `+966 ${number.toString().slice(0, 2)} ${number.toString().slice(2)}`;
  },

  companyEmail: () => {
    const domains = ['company.com', 'business.com', 'corp.com', 'enterprise.com', 'solutions.com', 'services.com', 'group.com', 'industries.com'];
    const prefixes = ['info', 'contact', 'support', 'hello', 'team', 'business', 'sales', 'admin'];
    return `${randomChoice(prefixes)}@${randomChoice(domains)}`;
  },

  companyWebsite: () => {
    const name = companiesGenerators.companyName().toLowerCase().replace(/\s+/g, '');
    const tlds = ['.com', '.io', '.co', '.net', '.org', '.biz', '.info'];
    return `https://www.${name}${randomChoice(tlds)}`;
  },

  companyRegistration: () => {
    const prefix = Math.floor(Math.random() * 9000) + 1000;
    const suffix = Math.floor(Math.random() * 9000000) + 1000000;
    return `${prefix}-${suffix}`;
  },

  taxId: () => {
    const num = Math.floor(Math.random() * 900000000) + 100000000;
    return `${num.toString().slice(0, 2)}-${num.toString().slice(2, 5)}-${num.toString().slice(5)}`;
  },

  companyFoundedYear: () => {
    const year = Math.floor(Math.random() * 50) + 1975;
    return year;
  },

  numberOfEmployees: () => {
    const ranges = [
      { min: 1, max: 10 },
      { min: 11, max: 50 },
      { min: 51, max: 200 },
      { min: 201, max: 1000 },
      { min: 1001, max: 5000 },
      { min: 5001, max: 50000 }
    ];
    const range = randomChoice(ranges);
    return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  },

  annualRevenue: () => {
    const millions = Math.floor(Math.random() * 1000) + 1;
    return `$${millions}M`;
  },

  ceo: () => {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa', 'James', 'Maria'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    return `${randomChoice(firstNames)} ${randomChoice(lastNames)}`;
  },

  ceoAr: () => {
    const names = ['محمد علي', 'فاطمة أحمد', 'عبدالله محمد', 'نورا سالم', 'خالد إبراهيم', 'ليلى حسن', 'سعود عمر', 'هند ياسر', 'ياسر محمود', 'سارة علي'];
    return randomChoice(names);
  },

  companyDescription: () => {
    const descriptions = [
      'Leading provider of innovative solutions in the industry',
      'Committed to delivering excellence and customer satisfaction',
      'Pioneering technology and business transformation',
      'Dedicated to sustainable growth and development',
      'Trusted partner for digital innovation and success',
      'Focused on creating value for stakeholders',
      'Driving industry standards and best practices',
      'Committed to quality, integrity, and excellence',
      'Transforming businesses through technology',
      'Building tomorrow\'s solutions today'
    ];
    return randomChoice(descriptions);
  },

  companyDescriptionAr: () => {
    const descriptions = [
      'مزود رائد للحلول المبتكرة في الصناعة',
      'ملتزمون بتقديم التميز ورضا العملاء',
      'رائدون في التكنولوجيا وتحول الأعمال',
      'مكرسون للنمو المستدام والتطور',
      'شريك موثوق للابتكار الرقمي والنجاح',
      'مركزون على خلق القيمة للمساهمين',
      'قيادة معايير الصناعة والممارسات الفضلى',
      'ملتزمون بالجودة والنزاهة والتميز',
      'تحويل الأعمال من خلال التكنولوجيا',
      'بناء حلول الغد اليوم'
    ];
    return randomChoice(descriptions);
  },

  companyData: () => {
    return {
      name: companiesGenerators.companyName(),
      nameAr: companiesGenerators.companyNameAr(),
      industry: companiesGenerators.industry(),
      industryAr: companiesGenerators.industryAr(),
      size: companiesGenerators.companySize(),
      sizeAr: companiesGenerators.companySizeAr(),
      address: companiesGenerators.companyAddress(),
      phone: companiesGenerators.companyPhone(),
      email: companiesGenerators.companyEmail(),
      website: companiesGenerators.companyWebsite(),
      registration: companiesGenerators.companyRegistration(),
      taxId: companiesGenerators.taxId(),
      founded: companiesGenerators.companyFoundedYear(),
      employees: companiesGenerators.numberOfEmployees(),
      revenue: companiesGenerators.annualRevenue(),
      ceo: companiesGenerators.ceo(),
      ceoAr: companiesGenerators.ceoAr(),
      description: companiesGenerators.companyDescription()
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = companiesGenerators;
} else if (typeof window !== 'undefined') {
  window.companiesGenerators = companiesGenerators;
}
