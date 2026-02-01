// Education generators
let sharedEducationData = null;

function generateSharedEducationData() {
  const universityPairs = [
    { en: 'King Saud University', ar: 'جامعة الملك سعود' },
    { en: 'King Abdulaziz University', ar: 'جامعة الملك عبدالعزيز' },
    { en: 'King Fahd University', ar: 'جامعة الملك فهد' },
    { en: 'Princess Nourah University', ar: 'جامعة الأميرة نورة' },
    { en: 'Imam Muhammad University', ar: 'جامعة الإمام محمد' },
    { en: 'King Khalid University', ar: 'جامعة الملك خالد' },
    { en: 'Taibah University', ar: 'جامعة طيبة' },
    { en: 'Qassim University', ar: 'جامعة القصيم' },
    { en: 'Umm Al-Qura University', ar: 'جامعة أم القرى' },
    { en: 'King Faisal University', ar: 'جامعة الملك فيصل' }
  ];

  const degreePairs = [
    { en: 'Bachelor of Science', ar: 'بكالوريوس علوم' },
    { en: 'Bachelor of Arts', ar: 'بكالوريوس آداب' },
    { en: 'Bachelor of Engineering', ar: 'بكالوريوس هندسة' },
    { en: 'Master of Science', ar: 'ماجستير علوم' },
    { en: 'Master of Business Administration', ar: 'ماجستير إدارة أعمال' },
    { en: 'Doctor of Philosophy', ar: 'دكتوراه فلسفة' },
    { en: 'Diploma', ar: 'دبلوم' },
    { en: 'Associate Degree', ar: 'درجة مشارك' }
  ];

  const majorPairs = [
    { en: 'Computer Science', ar: 'علوم الحاسوب' },
    { en: 'Business Administration', ar: 'إدارة الأعمال' },
    { en: 'Engineering', ar: 'الهندسة' },
    { en: 'Medicine', ar: 'الطب' },
    { en: 'Law', ar: 'القانون' },
    { en: 'Education', ar: 'التعليم' },
    { en: 'Finance', ar: 'المالية' },
    { en: 'Marketing', ar: 'التسويق' },
    { en: 'Psychology', ar: 'علم النفس' },
    { en: 'Arabic Literature', ar: 'الأدب العربي' }
  ];

  sharedEducationData = {
    university: randomChoice(universityPairs),
    degree: randomChoice(degreePairs),
    major: randomChoice(majorPairs),
    graduationYear: randomNum(2000, 2024),
    gpa: (randomNum(250, 400) / 100).toFixed(2)
  };
}

const educationGenerators = {
  university: () => {
    if (!sharedEducationData) generateSharedEducationData();
    return sharedEducationData.university.en;
  },

  universityAr: () => {
    if (!sharedEducationData) generateSharedEducationData();
    return sharedEducationData.university.ar;
  },

  degree: () => {
    if (!sharedEducationData) generateSharedEducationData();
    return sharedEducationData.degree.en;
  },

  degreeAr: () => {
    if (!sharedEducationData) generateSharedEducationData();
    return sharedEducationData.degree.ar;
  },

  major: () => {
    if (!sharedEducationData) generateSharedEducationData();
    return sharedEducationData.major.en;
  },

  majorAr: () => {
    if (!sharedEducationData) generateSharedEducationData();
    return sharedEducationData.major.ar;
  },

  graduationYear: () => {
    if (!sharedEducationData) generateSharedEducationData();
    return sharedEducationData.graduationYear;
  },

  gpa: () => {
    if (!sharedEducationData) generateSharedEducationData();
    return sharedEducationData.gpa;
  },

  studentId: () => `STU${randomNum(100000, 999999)}`
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { educationGenerators };
} else if (typeof window !== 'undefined') {
  window.educationGenerators = educationGenerators;
}
