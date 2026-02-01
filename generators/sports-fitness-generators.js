// Sports & Fitness generators
let sharedSportsData = null;

function generateSharedSportsData() {
  const sportPairs = [
    { en: 'Football', ar: 'كرة القدم' },
    { en: 'Basketball', ar: 'كرة السلة' },
    { en: 'Tennis', ar: 'تنس' },
    { en: 'Swimming', ar: 'سباحة' },
    { en: 'Running', ar: 'جري' },
    { en: 'Cycling', ar: 'ركوب الدراجات' },
    { en: 'Volleyball', ar: 'كرة الطائرة' },
    { en: 'Martial Arts', ar: 'فنون قتالية' }
  ];

  const teamPairs = [
    { en: 'Al Hilal', ar: 'الهلال' },
    { en: 'Al Nassr', ar: 'النصر' },
    { en: 'Al Ahli', ar: 'الأهلي' },
    { en: 'Al Ittihad', ar: 'الاتحاد' },
    { en: 'Al Shabab', ar: 'الشباب' },
    { en: 'Al Fateh', ar: 'الفتح' },
    { en: 'Al Taawoun', ar: 'التعاون' },
    { en: 'Al Ettifaq', ar: 'الاتفاق' }
  ];

  const playerPairs = [
    { en: 'Mohammed Al-Sahlawi', ar: 'محمد السهلاوي' },
    { en: 'Salem Al-Dawsari', ar: 'سالم الدوسري' },
    { en: 'Yasser Al-Shahrani', ar: 'ياسر الشهراني' },
    { en: 'Abdullah Otayf', ar: 'عبدالله عطيف' },
    { en: 'Fahad Al-Muwallad', ar: 'فهد المولد' }
  ];

  const coachPairs = [
    { en: 'Coach Ahmed Al-Rashid', ar: 'المدرب أحمد الراشد' },
    { en: 'Coach Omar Al-Ghamdi', ar: 'المدرب عمر الغامدي' },
    { en: 'Coach Khalid Al-Mutairi', ar: 'المدرب خالد المطيري' },
    { en: 'Coach Salim Al-Otaibi', ar: 'المدرب سليم العتيبي' }
  ];

  const stadiumPairs = [
    { en: 'King Fahd International Stadium', ar: 'استاد الملك فهد الدولي' },
    { en: 'Prince Faisal bin Fahd Stadium', ar: 'استاد الأمير فيصل بن فهد' },
    { en: 'King Abdullah Sports City', ar: 'مدينة الملك عبدالله الرياضية' },
    { en: 'Al Jawhar Stadium', ar: 'استاد الجوهرة' }
  ];

  const workoutPairs = [
    { en: 'Cardio Training', ar: 'تدريب القلب' },
    { en: 'Weight Lifting', ar: 'رفع الأثقال' },
    { en: 'Yoga', ar: 'يوغا' },
    { en: 'Pilates', ar: 'بيلاتس' },
    { en: 'CrossFit', ar: 'كروس فيت' },
    { en: 'HIIT', ar: 'تدريب عالي الكثافة' }
  ];

  const goalPairs = [
    { en: 'Weight Loss', ar: 'فقدان الوزن' },
    { en: 'Muscle Building', ar: 'بناء العضلات' },
    { en: 'Endurance', ar: 'التحمل' },
    { en: 'Flexibility', ar: 'المرونة' },
    { en: 'Strength', ar: 'القوة' },
    { en: 'General Fitness', ar: 'اللياقة العامة' }
  ];

  sharedSportsData = {
    sport: randomChoice(sportPairs),
    team: randomChoice(teamPairs),
    player: randomChoice(playerPairs),
    coach: randomChoice(coachPairs),
    stadium: randomChoice(stadiumPairs),
    workout: randomChoice(workoutPairs),
    goal: randomChoice(goalPairs)
  };
}

const sportsFitnessGenerators = {
  sportName: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.sport.en;
  },

  sportNameAr: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.sport.ar;
  },

  teamName: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.team.en;
  },

  teamNameAr: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.team.ar;
  },

  playerName: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.player.en;
  },

  playerNameAr: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.player.ar;
  },

  coachName: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.coach.en;
  },

  coachNameAr: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.coach.ar;
  },

  stadiumName: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.stadium.en;
  },

  stadiumNameAr: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.stadium.ar;
  },

  matchScore: () => `${randomNum(0, 5)}-${randomNum(0, 5)}`,

  workoutType: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.workout.en;
  },

  workoutTypeAr: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.workout.ar;
  },

  fitnessGoal: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.goal.en;
  },

  fitnessGoalAr: () => {
    if (!sharedSportsData) generateSharedSportsData();
    return sharedSportsData.goal.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { sportsFitnessGenerators };
} else if (typeof window !== 'undefined') {
  window.sportsFitnessGenerators = sportsFitnessGenerators;
}
