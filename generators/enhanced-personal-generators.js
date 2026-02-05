// Enhanced personal details generators with more comprehensive data
let sharedEnhancedPersonalData = null;

function generateSharedEnhancedPersonalData() {
  const personalityTraits = [
    { en: 'Outgoing', ar: 'اجتماعي' },
    { en: 'Introverted', ar: 'انطوائي' },
    { en: 'Creative', ar: 'مبدع' },
    { en: 'Analytical', ar: 'تحليلي' },
    { en: 'Optimistic', ar: 'متفائل' },
    { en: 'Practical', ar: 'عملي' },
    { en: 'Ambitious', ar: 'طموح' },
    { en: 'Patient', ar: 'صبور' }
  ];

  const hobbies = [
    { en: 'Reading', ar: 'القراءة' },
    { en: 'Photography', ar: 'التصوير' },
    { en: 'Cooking', ar: 'الطبخ' },
    { en: 'Traveling', ar: 'السفر' },
    { en: 'Gaming', ar: 'الألعاب' },
    { en: 'Sports', ar: 'الرياضة' },
    { en: 'Music', ar: 'الموسيقى' },
    { en: 'Art', ar: 'الفن' },
    { en: 'Gardening', ar: 'البستنة' },
    { en: 'Writing', ar: 'الكتابة' }
  ];

  const languages = [
    { en: 'Arabic', ar: 'العربية', level: 'Native' },
    { en: 'English', ar: 'الإنجليزية', level: 'Fluent' },
    { en: 'French', ar: 'الفرنسية', level: 'Intermediate' },
    { en: 'German', ar: 'الألمانية', level: 'Basic' },
    { en: 'Spanish', ar: 'الإسبانية', level: 'Intermediate' },
    { en: 'Urdu', ar: 'الأردية', level: 'Fluent' },
    { en: 'Hindi', ar: 'الهندية', level: 'Basic' },
    { en: 'Turkish', ar: 'التركية', level: 'Basic' }
  ];

  const skills = [
    { en: 'Leadership', ar: 'القيادة', category: 'soft' },
    { en: 'Communication', ar: 'التواصل', category: 'soft' },
    { en: 'Problem Solving', ar: 'حل المشاكل', category: 'soft' },
    { en: 'Project Management', ar: 'إدارة المشاريع', category: 'professional' },
    { en: 'Data Analysis', ar: 'تحليل البيانات', category: 'technical' },
    { en: 'Programming', ar: 'البرمجة', category: 'technical' },
    { en: 'Marketing', ar: 'التسويق', category: 'professional' },
    { en: 'Sales', ar: 'المبيعات', category: 'professional' }
  ];

  const emergencyContacts = [
    { relation: { en: 'Father', ar: 'الأب' }, name: randomChoice(names.firstNames.male) },
    { relation: { en: 'Mother', ar: 'الأم' }, name: randomChoice(names.firstNames.female) },
    { relation: { en: 'Brother', ar: 'الأخ' }, name: randomChoice(names.firstNames.male) },
    { relation: { en: 'Sister', ar: 'الأخت' }, name: randomChoice(names.firstNames.female) },
    { relation: { en: 'Spouse', ar: 'الزوج/الزوجة' }, name: randomChoice(names.firstNames.male.concat(names.firstNames.female)) }
  ];

  const medicalInfo = {
    allergies: [
      { en: 'Peanuts', ar: 'الفول السوداني' },
      { en: 'Shellfish', ar: 'المحار' },
      { en: 'Dairy', ar: 'منتجات الألبان' },
      { en: 'Pollen', ar: 'حبوب اللقاح' },
      { en: 'Dust', ar: 'الغبار' }
    ],
    medications: [
      { en: 'Aspirin', ar: 'الأسبرين' },
      { en: 'Insulin', ar: 'الأنسولين' },
      { en: 'Blood Pressure Medication', ar: 'دواء ضغط الدم' },
      { en: 'Vitamins', ar: 'الفيتامينات' }
    ],
    conditions: [
      { en: 'Diabetes', ar: 'السكري' },
      { en: 'Hypertension', ar: 'ارتفاع ضغط الدم' },
      { en: 'Asthma', ar: 'الربو' },
      { en: 'Heart Disease', ar: 'أمراض القلب' }
    ]
  };

  const preferences = {
    colors: [
      { en: 'Blue', ar: 'أزرق' },
      { en: 'Green', ar: 'أخضر' },
      { en: 'Red', ar: 'أحمر' },
      { en: 'Black', ar: 'أسود' },
      { en: 'White', ar: 'أبيض' }
    ],
    foods: [
      { en: 'Kabsa', ar: 'كبسة' },
      { en: 'Mandi', ar: 'مندي' },
      { en: 'Shawarma', ar: 'شاورما' },
      { en: 'Hummus', ar: 'حمص' },
      { en: 'Falafel', ar: 'فلافل' }
    ],
    music: [
      { en: 'Classical', ar: 'كلاسيكية' },
      { en: 'Pop', ar: 'بوب' },
      { en: 'Rock', ar: 'روك' },
      { en: 'Traditional', ar: 'تراثية' },
      { en: 'Jazz', ar: 'جاز' }
    ]
  };

  sharedEnhancedPersonalData = {
    personality: randomChoice(personalityTraits),
    hobbies: [randomChoice(hobbies), randomChoice(hobbies), randomChoice(hobbies)],
    languages: [randomChoice(languages), randomChoice(languages)],
    skills: [randomChoice(skills), randomChoice(skills), randomChoice(skills)],
    emergencyContact: randomChoice(emergencyContacts),
    medicalAllergy: randomChoice(medicalInfo.allergies),
    medication: randomChoice(medicalInfo.medications),
    medicalCondition: randomChoice(medicalInfo.conditions),
    favoriteColor: randomChoice(preferences.colors),
    favoriteFood: randomChoice(preferences.foods),
    favoriteMusic: randomChoice(preferences.music),
    birthPlace: randomChoice(saudiData.cities),
    motherTongue: randomChoice(languages.slice(0, 3)), // Arabic, English, or French
    eyeColor: randomChoice([
      { en: 'Brown', ar: 'بني' },
      { en: 'Black', ar: 'أسود' },
      { en: 'Green', ar: 'أخضر' },
      { en: 'Blue', ar: 'أزرق' },
      { en: 'Hazel', ar: 'عسلي' }
    ]),
    hairColor: randomChoice([
      { en: 'Black', ar: 'أسود' },
      { en: 'Brown', ar: 'بني' },
      { en: 'Dark Brown', ar: 'بني غامق' },
      { en: 'Light Brown', ar: 'بني فاتح' },
      { en: 'Gray', ar: 'رمادي' }
    ])
  };
}

const enhancedPersonalGenerators = {
  personalityTrait: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.personality.en;
  },

  personalityTraitAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.personality.ar;
  },

  hobby: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.hobbies[0].en;
  },

  hobbyAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.hobbies[0].ar;
  },

  hobbiesList: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.hobbies.map(h => h.en).join(', ');
  },

  hobbiesListAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.hobbies.map(h => h.ar).join('، ');
  },

  language: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    const lang = sharedEnhancedPersonalData.languages[0];
    return `${lang.en} (${lang.level})`;
  },

  languageAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    const lang = sharedEnhancedPersonalData.languages[0];
    return `${lang.ar} (${lang.level})`;
  },

  languagesList: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.languages.map(l => `${l.en} (${l.level})`).join(', ');
  },

  skill: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.skills[0].en;
  },

  skillAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.skills[0].ar;
  },

  skillsList: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.skills.map(s => s.en).join(', ');
  },

  emergencyContactName: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    const contact = sharedEnhancedPersonalData.emergencyContact;
    return `${contact.name.en} (${contact.relation.en})`;
  },

  emergencyContactNameAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    const contact = sharedEnhancedPersonalData.emergencyContact;
    return `${contact.name.ar} (${contact.relation.ar})`;
  },

  emergencyContactPhone: () => {
    const prefixes = ['050', '053', '054', '055', '056', '058', '059'];
    const prefix = randomChoice(prefixes);
    let number = '';
    for (let i = 0; i < 7; i++) {
      number += randomNum(0, 9);
    }
    return `+966 ${prefix.substring(1)} ${number.substring(0, 3)} ${number.substring(3)}`;
  },

  medicalAllergy: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.medicalAllergy.en;
  },

  medicalAllergyAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.medicalAllergy.ar;
  },

  medication: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.medication.en;
  },

  medicationAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.medication.ar;
  },

  medicalCondition: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.medicalCondition.en;
  },

  medicalConditionAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.medicalCondition.ar;
  },

  favoriteColor: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.favoriteColor.en;
  },

  favoriteColorAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.favoriteColor.ar;
  },

  favoriteFood: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.favoriteFood.en;
  },

  favoriteFoodAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.favoriteFood.ar;
  },

  favoriteMusic: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.favoriteMusic.en;
  },

  favoriteMusicAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.favoriteMusic.ar;
  },

  birthPlace: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.birthPlace.en;
  },

  birthPlaceAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.birthPlace.ar;
  },

  motherTongue: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.motherTongue.en;
  },

  motherTongueAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.motherTongue.ar;
  },

  eyeColor: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.eyeColor.en;
  },

  eyeColorAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.eyeColor.ar;
  },

  hairColor: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.hairColor.en;
  },

  hairColorAr: () => {
    if (!sharedEnhancedPersonalData) generateSharedEnhancedPersonalData();
    return sharedEnhancedPersonalData.hairColor.ar;
  },

  biometricId: () => {
    // Generate a mock biometric ID
    let id = 'BIO';
    for (let i = 0; i < 10; i++) {
      id += randomNum(0, 9);
    }
    return id;
  },

  socialSecurityNumber: () => {
    // Generate a mock social security number format
    let ssn = '';
    for (let i = 0; i < 9; i++) {
      ssn += randomNum(0, 9);
      if (i === 2 || i === 4) ssn += '-';
    }
    return ssn;
  },

  personalityScore: () => {
    const traits = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'];
    const trait = randomChoice(traits);
    const score = randomNum(1, 10);
    return `${trait}: ${score}/10`;
  },

  lifestyleChoice: () => {
    const lifestyles = [
      { en: 'Active', ar: 'نشط' },
      { en: 'Sedentary', ar: 'خامل' },
      { en: 'Balanced', ar: 'متوازن' },
      { en: 'Adventurous', ar: 'مغامر' },
      { en: 'Homebody', ar: 'منزلي' }
    ];
    const lifestyle = randomChoice(lifestyles);
    return lifestyle.en;
  },

  lifestyleChoiceAr: () => {
    const lifestyles = [
      { en: 'Active', ar: 'نشط' },
      { en: 'Sedentary', ar: 'خامل' },
      { en: 'Balanced', ar: 'متوازن' },
      { en: 'Adventurous', ar: 'مغامر' },
      { en: 'Homebody', ar: 'منزلي' }
    ];
    const lifestyle = randomChoice(lifestyles);
    return lifestyle.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { enhancedPersonalGenerators };
} else if (typeof window !== 'undefined') {
  window.enhancedPersonalGenerators = enhancedPersonalGenerators;
}