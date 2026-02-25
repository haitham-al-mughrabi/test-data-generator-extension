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
    { en: 'Jordanian', ar: 'أردني' },
    { en: 'Emirati', ar: 'إماراتي' },
    { en: 'Lebanese', ar: 'لبناني' },
    { en: 'Iraqi', ar: 'عراقي' },
    { en: 'Moroccan', ar: 'مغربي' },
    { en: 'Algerian', ar: 'جزائري' },
    { en: 'Tunisian', ar: 'تونسي' },
    { en: 'Libyan', ar: 'ليبي' },
    { en: 'Omani', ar: 'عماني' },
    { en: 'Kuwaiti', ar: 'كويتي' },
    { en: 'Bahraini', ar: 'بحريني' },
    { en: 'Qatari', ar: 'قطري' },
    { en: 'Mauritanian', ar: 'موريتاني' },
    { en: 'Somali', ar: 'صومالي' },
    { en: 'Chadian', ar: 'تشادي' },
    { en: 'Nigerien', ar: 'نيجري' },
    { en: 'Malian', ar: 'مالي' },
    { en: 'Senegalese', ar: 'سنغالي' },
    { en: 'Ivorian', ar: 'إيفواري' },
    { en: 'Ghanaian', ar: 'غاني' },
    { en: 'Nigerian', ar: 'نيجيري' },
    { en: 'Cameroonian', ar: 'كاميروني' },
    { en: 'Congolese', ar: 'كونغولي' },
    { en: 'Rwandan', ar: 'رواندي' },
    { en: 'Ethiopian', ar: 'إثيوبي' },
    { en: 'Eritrean', ar: 'إريتري' },
    { en: 'Djiboutian', ar: 'جيبوتي' },
    { en: 'Kenyan', ar: 'كيني' },
    { en: 'Tanzanian', ar: 'تنزاني' },
    { en: 'Ugandan', ar: 'أوغندي' },
    { en: 'Burundian', ar: 'بوروندي' },
    { en: 'Malawian', ar: 'ملاوي' },
    { en: 'Zambian', ar: 'زامبي' },
    { en: 'Zimbabwean', ar: 'زيمبابوي' },
    { en: 'Mozambican', ar: 'موزمبيقي' },
    { en: 'Angolan', ar: 'أنغولي' },
    { en: 'Namibian', ar: 'ناميبي' },
    { en: 'Botswanan', ar: 'بوتسواني' },
    { en: 'South African', ar: 'جنوب أفريقي' },
    { en: 'Lesotho', ar: 'ليسوتو' },
    { en: 'Swazi', ar: 'سوازي' },
    { en: 'Gambian', ar: 'غامبي' },
    { en: 'Guinean', ar: 'غيني' },
    { en: 'Sierra Leonean', ar: 'سيراليوني' },
    { en: 'Liberian', ar: 'ليبيري' },
    { en: 'Beninese', ar: 'بنيني' },
    { en: 'Togolese', ar: 'توغي' },
    { en: 'Mauritian', ar: 'موريشي' },
    { en: 'Seychellois', ar: 'سيشيلي' },
    { en: 'Comoran', ar: 'قمري' },
    { en: 'Cape Verdean', ar: 'رأس خيري' },
    { en: 'São Toméan', ar: 'ساو تومي' },
    { en: 'Equatoguinean', ar: 'غيني استوائي' },
    { en: 'Gabonese', ar: 'غابوني' },
    { en: 'Central African', ar: 'وسط أفريقي' },
    { en: 'Chadian', ar: 'تشادي' },
    { en: 'Sudanese', ar: 'سوداني' },
    { en: 'Ethiopian', ar: 'إثيوبي' },
    { en: 'Eritrean', ar: 'إريتري' },
    { en: 'Djiboutian', ar: 'جيبوتي' },
    { en: 'British', ar: 'بريطاني' },
    { en: 'American', ar: 'أمريكي' },
    { en: 'Canadian', ar: 'كندي' },
    { en: 'Australian', ar: 'أسترالي' },
    { en: 'New Zealander', ar: 'نيوزيلندي' },
    { en: 'French', ar: 'فرنسي' },
    { en: 'German', ar: 'ألماني' },
    { en: 'Italian', ar: 'إيطالي' },
    { en: 'Spanish', ar: 'إسباني' },
    { en: 'Portuguese', ar: 'برتغالي' },
    { en: 'Dutch', ar: 'هولندي' },
    { en: 'Belgian', ar: 'بلجيكي' },
    { en: 'Swiss', ar: 'سويسري' },
    { en: 'Austrian', ar: 'نمساوي' },
    { en: 'Swedish', ar: 'سويدي' },
    { en: 'Norwegian', ar: 'نرويجي' },
    { en: 'Danish', ar: 'دنماركي' },
    { en: 'Finnish', ar: 'فنلندي' },
    { en: 'Polish', ar: 'بولندي' },
    { en: 'Czech', ar: 'تشيكي' },
    { en: 'Slovak', ar: 'سلوفاكي' },
    { en: 'Hungarian', ar: 'مجري' },
    { en: 'Romanian', ar: 'روماني' },
    { en: 'Bulgarian', ar: 'بلغاري' },
    { en: 'Croatian', ar: 'كرواتي' },
    { en: 'Serbian', ar: 'صربي' },
    { en: 'Bosnian', ar: 'بوسني' },
    { en: 'Montenegrin', ar: 'مونتينيغري' },
    { en: 'Macedonian', ar: 'مقدوني' },
    { en: 'Albanian', ar: 'ألباني' },
    { en: 'Greek', ar: 'يوناني' },
    { en: 'Turkish', ar: 'تركي' },
    { en: 'Russian', ar: 'روسي' },
    { en: 'Ukrainian', ar: 'أوكراني' },
    { en: 'Belarusian', ar: 'بيلاروسي' },
    { en: 'Moldovan', ar: 'مولدوفي' },
    { en: 'Lithuanian', ar: 'ليتواني' },
    { en: 'Latvian', ar: 'لاتفي' },
    { en: 'Estonian', ar: 'إستوني' },
    { en: 'Armenian', ar: 'أرميني' },
    { en: 'Azerbaijani', ar: 'أذربيجاني' },
    { en: 'Georgian', ar: 'جورجي' },
    { en: 'Kazakh', ar: 'كازاخي' },
    { en: 'Uzbek', ar: 'أوزبكي' },
    { en: 'Turkmen', ar: 'تركماني' },
    { en: 'Kyrgyz', ar: 'قيرغيزي' },
    { en: 'Tajik', ar: 'طاجيكي' },
    { en: 'Afghan', ar: 'أفغاني' },
    { en: 'Iranian', ar: 'إيراني' },
    { en: 'Azeri', ar: 'أذربيجاني' },
    { en: 'Bahraini', ar: 'بحريني' },
    { en: 'Omani', ar: 'عماني' },
    { en: 'Qatari', ar: 'قطري' },
    { en: 'Kuwaiti', ar: 'كويتي' },
    { en: 'Saudi', ar: 'سعودي' },
    { en: 'Yemeni', ar: 'يمني' },
    { en: 'Jordanian', ar: 'أردني' },
    { en: 'Syrian', ar: 'سوري' },
    { en: 'Lebanese', ar: 'لبناني' },
    { en: 'Palestinian', ar: 'فلسطيني' },
    { en: 'Iraqi', ar: 'عراقي' },
    { en: 'Iranian', ar: 'إيراني' },
    { en: 'Turkish', ar: 'تركي' },
    { en: 'Cypriot', ar: 'قبرصي' },
    { en: 'Maltese', ar: 'مالطي' },
    { en: 'Andorran', ar: 'أندوري' },
    { en: 'Luxembourger', ar: 'لوكسمبرغي' },
    { en: 'Monégasque', ar: 'موناكي' },
    { en: 'San Marinese', ar: 'سان ماريني' },
    { en: 'Vatican', ar: 'فاتيكاني' },
    { en: 'Chinese', ar: 'صيني' },
    { en: 'Japanese', ar: 'ياباني' },
    { en: 'Korean', ar: 'كوري' },
    { en: 'Vietnamese', ar: 'فيتنامي' },
    { en: 'Thai', ar: 'تايلندي' },
    { en: 'Indonesian', ar: 'إندونيسي' },
    { en: 'Malaysian', ar: 'ماليزي' },
    { en: 'Singaporean', ar: 'سنغافوري' },
    { en: 'Bruneian', ar: 'برونائي' },
    { en: 'East Timorese', ar: 'تيموري' },
    { en: 'Burmese', ar: 'بورمي' },
    { en: 'Cambodian', ar: 'كمبودي' },
    { en: 'Laotian', ar: 'لاوسي' },
    { en: 'Nepalese', ar: 'نيبالي' },
    { en: 'Sri Lankan', ar: 'سيراليوني' },
    { en: 'Maldivian', ar: 'مالديفي' },
    { en: 'Bhutanese', ar: 'بوتيني' },
    { en: 'Bangladeshi', ar: 'بنغلاديشي' },
    { en: 'Indian', ar: 'هندي' },
    { en: 'Pakistani', ar: 'باكستاني' },
    { en: 'Afghan', ar: 'أفغاني' },
    { en: 'Iranian', ar: 'إيراني' },
    { en: 'Armenian', ar: 'أرميني' },
    { en: 'Azerbaijani', ar: 'أذربيجاني' },
    { en: 'Georgian', ar: 'جورجي' },
    { en: 'Turkmen', ar: 'تركماني' },
    { en: 'Uzbek', ar: 'أوزبكي' },
    { en: 'Kyrgyz', ar: 'قيرغيزي' },
    { en: 'Tajik', ar: 'طاجيكي' },
    { en: 'Kazakh', ar: 'كازاخي' },
    { en: 'Mongolian', ar: 'منغولي' },
    { en: 'Tibetan', ar: 'تيبيتي' },
    { en: 'Chinese', ar: 'صيني' },
    { en: 'Tibetan', ar: 'تيبيتي' },
    { en: 'Hong Konger', ar: 'هونغ كونغي' },
    { en: 'Macanese', ar: 'ماك��وي' },
    { en: 'Taiwanese', ar: 'تايواني' },
    { en: 'Japanese', ar: 'ياباني' },
    { en: 'Korean', ar: 'كوري' },
    { en: 'Vietnamese', ar: 'فيتنامي' },
    { en: 'Thai', ar: 'تايلندي' },
    { en: 'Cambodian', ar: 'كمبودي' },
    { en: 'Laotian', ar: 'لاوسي' },
    { en: 'Burmese', ar: 'بورمي' },
    { en: 'Malaysian', ar: 'ماليزي' },
    { en: 'Singaporean', ar: 'سنغافوري' },
    { en: 'Indonesian', ar: 'إندونيسي' },
    { en: 'Philippine', ar: 'فلبيني' },
    { en: 'Bruneian', ar: 'برونائي' },
    { en: 'East Timorese', ar: 'تيموري' },
    { en: 'Papua New Guinean', ar: 'بابوا غيني' },
    { en: 'Fijian', ar: 'فيجي' },
    { en: 'Solomon Islander', ar: 'جزر سليمان' },
    { en: 'Vanuatuan', ar: 'فانواتو' },
    { en: 'Samoan', ar: 'ساموي' },
    { en: 'Tongan', ar: 'تونغي' },
    { en: 'Kiribatian', ar: 'كيريباتي' },
    { en: 'Nauruan', ar: 'ناورو' },
    { en: 'Tuvaluan', ar: 'توفالو' },
    { en: 'Palauan', ar: 'بالاوي' },
    { en: 'Micronesian', ar: 'ميكرونيزي' },
    { en: 'American', ar: 'أمريكي' },
    { en: 'Canadian', ar: 'كندي' },
    { en: 'Mexican', ar: 'مكسيكي' },
    { en: 'Guatemalan', ar: 'غواتيمالي' },
    { en: 'Salvadoran', ar: 'سلفادوري' },
    { en: 'Honduran', ar: 'هندوراسي' },
    { en: 'Nicaraguan', ar: 'نيكاراغوي' },
    { en: 'Costa Rican', ar: 'كوستاريكي' },
    { en: 'Panamanian', ar: 'بنمي' },
    { en: 'Cuban', ar: 'كوبي' },
    { en: 'Jamaican', ar: 'جامايكي' },
    { en: 'Haitian', ar: 'هايتي' },
    { en: 'Dominican', ar: 'دومينيكي' },
    { en: 'Puerto Rican', ar: 'بورتوريكي' },
    { en: 'Colombian', ar: 'كولومبي' },
    { en: 'Venezuelan', ar: 'فنزويلي' },
    { en: 'Ecuadorian', ar: 'إكوادوري' },
    { en: 'Peruvian', ar: 'بيروي' },
    { en: 'Bolivian', ar: 'بوليفي' },
    { en: 'Paraguayan', ar: 'باراغواي' },
    { en: 'Chilean', ar: 'تشيلي' },
    { en: 'Argentine', ar: 'أرجنتيني' },
    { en: 'Uruguayan', ar: 'أوروغواي' },
    { en: 'Brazilian', ar: 'برازيلي' },
    { en: 'Guyanese', ar: 'غياني' },
    { en: 'Surinamer', ar: 'سورينامي' },
    { en: 'French Guianese', ar: 'غوياني فرنسي' },
    { en: 'Belizean', ar: 'بليزي' }
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
    return randomDate(1970, 2005).toISOString().split('T')[0];
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
