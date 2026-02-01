// Healthcare generators
let sharedHealthcareData = null;

function generateSharedHealthcareData() {
  const doctorPairs = [
    { en: 'Dr. Ahmed Al-Rashid', ar: 'د. أحمد الراشد' },
    { en: 'Dr. Fatima Al-Zahra', ar: 'د. فاطمة الزهراء' },
    { en: 'Dr. Mohammed Al-Saud', ar: 'د. محمد آل سعود' },
    { en: 'Dr. Aisha Al-Otaibi', ar: 'د. عائشة العتيبي' },
    { en: 'Dr. Omar Al-Ghamdi', ar: 'د. عمر الغامدي' },
    { en: 'Dr. Nora Al-Zahrani', ar: 'د. نورا الزهراني' },
    { en: 'Dr. Khalid Al-Mutairi', ar: 'د. خالد المطيري' },
    { en: 'Dr. Maryam Al-Harbi', ar: 'د. مريم الحربي' }
  ];

  const hospitalPairs = [
    { en: 'King Faisal Specialist Hospital', ar: 'مستشفى الملك فيصل التخصصي' },
    { en: 'King Fahd Medical City', ar: 'مدينة الملك فهد الطبية' },
    { en: 'National Guard Hospital', ar: 'مستشفى الحرس الوطني' },
    { en: 'King Abdulaziz Medical City', ar: 'مدينة الملك عبدالعزيز الطبية' },
    { en: 'Prince Sultan Military Hospital', ar: 'مستشفى الأمير سلطان العسكري' },
    { en: 'King Khalid University Hospital', ar: 'مستشفى جامعة الملك خالد' },
    { en: 'Riyadh Care Hospital', ar: 'مستشفى الرياض كير' },
    { en: 'Dr. Sulaiman Al Habib Hospital', ar: 'مستشفى د. سليمان الحبيب' }
  ];

  const diagnosisPairs = [
    { en: 'Hypertension', ar: 'ارتفاع ضغط الدم' },
    { en: 'Diabetes Type 2', ar: 'السكري النوع الثاني' },
    { en: 'Asthma', ar: 'الربو' },
    { en: 'Migraine', ar: 'الصداع النصفي' },
    { en: 'Arthritis', ar: 'التهاب المفاصل' },
    { en: 'Gastritis', ar: 'التهاب المعدة' },
    { en: 'Anxiety Disorder', ar: 'اضطراب القلق' },
    { en: 'Back Pain', ar: 'آلام الظهر' }
  ];

  const medicationPairs = [
    { en: 'Paracetamol 500mg', ar: 'باراسيتامول 500 مجم' },
    { en: 'Ibuprofen 400mg', ar: 'إيبوبروفين 400 مجم' },
    { en: 'Metformin 850mg', ar: 'ميتفورمين 850 مجم' },
    { en: 'Lisinopril 10mg', ar: 'ليسينوبريل 10 مجم' },
    { en: 'Omeprazole 20mg', ar: 'أوميبرازول 20 مجم' },
    { en: 'Salbutamol Inhaler', ar: 'بخاخ سالبوتامول' },
    { en: 'Vitamin D3 1000IU', ar: 'فيتامين د3 1000 وحدة' },
    { en: 'Aspirin 75mg', ar: 'أسبرين 75 مجم' }
  ];

  sharedHealthcareData = {
    doctor: randomChoice(doctorPairs),
    hospital: randomChoice(hospitalPairs),
    diagnosis: randomChoice(diagnosisPairs),
    medication: randomChoice(medicationPairs)
  };
}

const healthcareGenerators = {
  medicalRecord: () => `MR${randomNum(100000, 999999)}`,
  insuranceNumber: () => `INS${randomNum(10000000, 99999999)}`,

  doctorName: () => {
    if (!sharedHealthcareData) generateSharedHealthcareData();
    return sharedHealthcareData.doctor.en;
  },

  doctorNameAr: () => {
    if (!sharedHealthcareData) generateSharedHealthcareData();
    return sharedHealthcareData.doctor.ar;
  },

  hospital: () => {
    if (!sharedHealthcareData) generateSharedHealthcareData();
    return sharedHealthcareData.hospital.en;
  },

  hospitalAr: () => {
    if (!sharedHealthcareData) generateSharedHealthcareData();
    return sharedHealthcareData.hospital.ar;
  },

  diagnosis: () => {
    if (!sharedHealthcareData) generateSharedHealthcareData();
    return sharedHealthcareData.diagnosis.en;
  },

  diagnosisAr: () => {
    if (!sharedHealthcareData) generateSharedHealthcareData();
    return sharedHealthcareData.diagnosis.ar;
  },

  medication: () => {
    if (!sharedHealthcareData) generateSharedHealthcareData();
    return sharedHealthcareData.medication.en;
  },

  medicationAr: () => {
    if (!sharedHealthcareData) generateSharedHealthcareData();
    return sharedHealthcareData.medication.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { healthcareGenerators };
} else if (typeof window !== 'undefined') {
  window.healthcareGenerators = healthcareGenerators;
}
