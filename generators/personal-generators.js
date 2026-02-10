// Personal data generators
let sharedNameData = null;
let sharedPersonalData = null;
let sharedDocumentData = null;

function generateSharedDocumentData() {
  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + randomNum(1, 5));
  
  const pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() - randomNum(1, 10));
  
  const cities = [
    { en: 'Riyadh', ar: 'الرياض' },
    { en: 'Jeddah', ar: 'جدة' },
    { en: 'Dammam', ar: 'الدمام' },
    { en: 'Mecca', ar: 'مكة المكرمة' },
    { en: 'Medina', ar: 'المدينة المنورة' },
    { en: 'Khobar', ar: 'الخبر' },
    { en: 'Tabuk', ar: 'تبوك' },
    { en: 'Abha', ar: 'أبها' },
    { en: 'Buraidah', ar: 'بريدة' },
    { en: 'Najran', ar: 'نجران' }
  ];
  
  const visaTypes = [
    { en: 'Work Visa', ar: 'تأشيرة عمل' },
    { en: 'Business Visa', ar: 'تأشيرة أعمال' },
    { en: 'Family Visit', ar: 'زيارة عائلية' },
    { en: 'Tourist Visa', ar: 'تأشيرة سياحية' },
    { en: 'Transit Visa', ar: 'تأشيرة عبور' },
    { en: 'Hajj Visa', ar: 'تأشيرة حج' },
    { en: 'Umrah Visa', ar: 'تأشيرة عمرة' },
    { en: 'Student Visa', ar: 'تأشيرة طالب' }
  ];
  
  const sponsors = {
    companies: [
      { en: 'Saudi Aramco', ar: 'أرامكو السعودية' },
      { en: 'SABIC', ar: 'سابك' },
      { en: 'Al Rajhi Bank', ar: 'مصرف الراجحي' },
      { en: 'STC', ar: 'الاتصالات السعودية' },
      { en: 'SAMBA', ar: 'سامبا' },
      { en: 'NCB', ar: 'الأهلي التجاري' },
      { en: 'Almarai', ar: 'المراعي' },
      { en: 'ACWA Power', ar: 'أكوا باور' },
      { en: 'Maaden', ar: 'معادن' },
      { en: 'SWCC', ar: 'المياه المحلاة' }
    ],
    individuals: [
      { en: 'Mohammed Al-Saud', ar: 'محمد آل سعود' },
      { en: 'Ahmed Al-Rashid', ar: 'أحمد الراشد' },
      { en: 'Abdullah Al-Otaibi', ar: 'عبدالله العتيبي' },
      { en: 'Khalid Al-Ghamdi', ar: 'خالد الغامدي' },
      { en: 'Omar Al-Zahrani', ar: 'عمر الزهراني' }
    ]
  };
  
  sharedDocumentData = {
    iqamaExpiry: futureDate,
    iqamaIssueDate: pastDate,
    passportExpiry: new Date(futureDate.getTime() + (365 * 24 * 60 * 60 * 1000 * randomNum(1, 5))),
    issuePlace: randomChoice(cities),
    visaType: randomChoice(visaTypes),
    sponsor: Math.random() > 0.5 ? randomChoice(sponsors.companies) : randomChoice(sponsors.individuals)
  };
}

// Helper function to generate shared name data
function generateSharedNameData() {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const firstName = randomChoice(names.firstNames[gender]);
  const middleName = randomChoice(names.firstNames[gender]);
  const lastName = randomChoice(names.lastNames);
  
  sharedNameData = {
    firstName,
    middleName,
    lastName,
    gender
  };
}

// Helper function to generate shared personal data
function generateSharedPersonalData() {
  const genderChoice = Math.random() > 0.5;
  const nationalityPairs = [
    { en: 'Saudi Arabian', ar: 'سعودي' },
    { en: 'Egyptian', ar: 'مصري' },
    { en: 'Pakistani', ar: 'باكستاني' },
    { en: 'Indian', ar: 'هندي' },
    { en: 'Bangladeshi', ar: 'بنغلاديشي' },
    { en: 'Filipino', ar: 'فلبيني' },
    { en: 'Sudanese', ar: 'سوداني' },
    { en: 'Yemeni', ar: 'يمني' },
    { en: 'Syrian', ar: 'سوري' },
    { en: 'Jordanian', ar: 'أردني' }
  ];
  
  const maritalPairs = [
    { en: 'Single', ar: 'أعزب' },
    { en: 'Married', ar: 'متزوج' },
    { en: 'Divorced', ar: 'مطلق' },
    { en: 'Widowed', ar: 'أرمل' }
  ];
  
  const religionPairs = [
    { en: 'Islam', ar: 'الإسلام' },
    { en: 'Christianity', ar: 'المسيحية' },
    { en: 'Judaism', ar: 'اليهودية' },
    { en: 'Other', ar: 'أخرى' }
  ];
  
  const educationPairs = [
    { en: 'High School', ar: 'ثانوية عامة' },
    { en: 'Bachelor', ar: 'بكالوريوس' },
    { en: 'Master', ar: 'ماجستير' },
    { en: 'PhD', ar: 'دكتوراه' },
    { en: 'Diploma', ar: 'دبلوم' }
  ];
  
  sharedPersonalData = {
    gender: genderChoice ? { en: 'Male', ar: 'ذكر' } : { en: 'Female', ar: 'أنثى' },
    nationality: randomChoice(nationalityPairs),
    maritalStatus: randomChoice(maritalPairs),
    religion: randomChoice(religionPairs),
    education: randomChoice(educationPairs)
  };
}

const personalGenerators = {
  firstName: () => {
    if (!sharedNameData) generateSharedNameData();
    return sharedNameData.firstName.en;
  },

  firstNameAr: () => {
    if (!sharedNameData) generateSharedNameData();
    return sharedNameData.firstName.ar;
  },

  middleName: () => {
    if (!sharedNameData) generateSharedNameData();
    return sharedNameData.middleName.en;
  },

  middleNameAr: () => {
    if (!sharedNameData) generateSharedNameData();
    return sharedNameData.middleName.ar;
  },

  lastName: () => {
    if (!sharedNameData) generateSharedNameData();
    return sharedNameData.lastName.en;
  },

  lastNameAr: () => {
    if (!sharedNameData) generateSharedNameData();
    return sharedNameData.lastName.ar;
  },

  fullName: () => {
    if (!sharedNameData) generateSharedNameData();
    return `${sharedNameData.firstName.en} ${sharedNameData.lastName.en}`;
  },

  fullNameAr: () => {
    if (!sharedNameData) generateSharedNameData();
    return `${sharedNameData.firstName.ar} ${sharedNameData.lastName.ar}`;
  },

  namePrefix: () => randomChoice(['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.']),
  nameSuffix: () => randomChoice(['Jr.', 'Sr.', 'II', 'III', 'PhD', 'MD']),
  preferredName: () => {
    if (!sharedNameData) generateSharedNameData();
    return randomChoice([sharedNameData.firstName.en, sharedNameData.middleName.en]);
  },
  nickname: () => randomChoice(['Ace', 'Sunny', 'Nova', 'Skye', 'Dash', 'Jay', 'Leo', 'Mimi']),

  fullNameWithMiddle: () => {
    if (!sharedNameData) generateSharedNameData();
    return `${sharedNameData.firstName.en} ${sharedNameData.middleName.en} ${sharedNameData.lastName.en}`;
  },

  fullNameWithMiddleAr: () => {
    if (!sharedNameData) generateSharedNameData();
    return `${sharedNameData.firstName.ar} ${sharedNameData.middleName.ar} ${sharedNameData.lastName.ar}`;
  },

  name: () => {
    if (!sharedNameData) generateSharedNameData();
    return `${sharedNameData.firstName.en} ${sharedNameData.lastName.en} (${sharedNameData.firstName.ar} ${sharedNameData.lastName.ar})`;
  },

  gender: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.gender.en;
  },

  genderAr: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.gender.ar;
  },

  birthdate: () => {
    const start = new Date(1970, 0, 1);
    const end = new Date(2005, 11, 31);
    return randomDate(start, end).toISOString().split('T')[0];
  },

  nationality: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.nationality.en;
  },

  nationalityAr: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.nationality.ar;
  },

  bloodType: () => randomChoice(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),

  maritalStatus: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.maritalStatus.en;
  },

  maritalStatusAr: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.maritalStatus.ar;
  },

  saudiId: () => {
    let id = '1';
    for (let i = 0; i < 9; i++) {
      id += randomNum(0, 9);
    }
    return id;
  },

  age: () => randomNum(18, 80),
  height: () => `${randomNum(150, 200)} cm`,
  weight: () => `${randomNum(50, 120)} kg`,
  
  religion: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.religion.en;
  },
  
  religionAr: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.religion.ar;
  },
  
  education: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.education.en;
  },
  
  educationAr: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.education.ar;
  },

  iqamaNumber: () => {
    let iqama = '2';
    for (let i = 0; i < 9; i++) {
      iqama += randomNum(0, 9);
    }
    return iqama;
  },

  borderNumber: () => {
    // Border number is 10-digit unique ID for expatriates entering Saudi Arabia
    let border = '';
    for (let i = 0; i < 10; i++) {
      border += randomNum(0, 9);
    }
    return border;
  }
};

// Reset shared data for each record
function resetSharedData() {
  sharedNameData = null;
  sharedPersonalData = null;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { personalGenerators, resetSharedData };
} else if (typeof window !== 'undefined') {
  window.personalGenerators = personalGenerators;
  window.resetSharedData = resetSharedData;
}
