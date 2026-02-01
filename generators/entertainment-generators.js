// Entertainment generators
let sharedEntertainmentData = null;

function generateSharedEntertainmentData() {
  const moviePairs = [
    { en: 'Desert Storm', ar: 'عاصفة الصحراء' },
    { en: 'Kingdom of Sand', ar: 'مملكة الرمال' },
    { en: 'The Last Oasis', ar: 'الواحة الأخيرة' },
    { en: 'Arabian Nights', ar: 'ليالي عربية' },
    { en: 'City of Gold', ar: 'مدينة الذهب' },
    { en: 'The Pearl Diver', ar: 'غواص اللؤلؤ' },
    { en: 'Falcon Hunter', ar: 'صياد الصقور' },
    { en: 'Bedouin Tales', ar: 'حكايات البدو' }
  ];

  const actorPairs = [
    { en: 'Ahmed Al-Rashid', ar: 'أحمد الراشد' },
    { en: 'Fatima Al-Zahra', ar: 'فاطمة الزهراء' },
    { en: 'Omar Al-Ghamdi', ar: 'عمر الغامدي' },
    { en: 'Nora Al-Mutairi', ar: 'نورا المطيري' },
    { en: 'Khalid Al-Otaibi', ar: 'خالد العتيبي' },
    { en: 'Layla Al-Harbi', ar: 'ليلى الحربي' }
  ];

  const directorPairs = [
    { en: 'Director Salim Al-Rashid', ar: 'المخرج سليم الراشد' },
    { en: 'Director Amina Al-Zahra', ar: 'المخرجة أمينة الزهراء' },
    { en: 'Director Yusuf Al-Ghamdi', ar: 'المخرج يوسف الغامدي' },
    { en: 'Director Maryam Al-Otaibi', ar: 'المخرجة مريم العتيبي' }
  ];

  const genrePairs = [
    { en: 'Action', ar: 'أكشن' },
    { en: 'Drama', ar: 'دراما' },
    { en: 'Comedy', ar: 'كوميديا' },
    { en: 'Romance', ar: 'رومانسي' },
    { en: 'Thriller', ar: 'إثارة' },
    { en: 'Adventure', ar: 'مغامرة' },
    { en: 'Historical', ar: 'تاريخي' },
    { en: 'Family', ar: 'عائلي' }
  ];

  const cinemaPairs = [
    { en: 'VOX Cinemas', ar: 'سينما فوكس' },
    { en: 'Muvi Cinemas', ar: 'سينما موفي' },
    { en: 'AMC Cinemas', ar: 'سينما إيه إم سي' },
    { en: 'Novo Cinemas', ar: 'سينما نوفو' },
    { en: 'Red Sea Mall Cinema', ar: 'سينما البحر الأحمر مول' }
  ];

  sharedEntertainmentData = {
    movie: randomChoice(moviePairs),
    actor: randomChoice(actorPairs),
    director: randomChoice(directorPairs),
    genre: randomChoice(genrePairs),
    cinema: randomChoice(cinemaPairs),
    year: randomNum(2015, 2024),
    rating: (randomNum(30, 50) / 10).toFixed(1),
    duration: randomNum(90, 180)
  };
}

const entertainmentGenerators = {
  movieTitle: () => {
    if (!sharedEntertainmentData) generateSharedEntertainmentData();
    return sharedEntertainmentData.movie.en;
  },

  movieTitleAr: () => {
    if (!sharedEntertainmentData) generateSharedEntertainmentData();
    return sharedEntertainmentData.movie.ar;
  },

  actorName: () => {
    if (!sharedEntertainmentData) generateSharedEntertainmentData();
    return sharedEntertainmentData.actor.en;
  },

  actorNameAr: () => {
    if (!sharedEntertainmentData) generateSharedEntertainmentData();
    return sharedEntertainmentData.actor.ar;
  },

  directorName: () => {
    if (!sharedEntertainmentData) generateSharedEntertainmentData();
    return sharedEntertainmentData.director.en;
  },

  directorNameAr: () => {
    if (!sharedEntertainmentData) generateSharedEntertainmentData();
    return sharedEntertainmentData.director.ar;
  },

  genre: () => {
    if (!sharedEntertainmentData) generateSharedEntertainmentData();
    return sharedEntertainmentData.genre.en;
  },

  genreAr: () => {
    if (!sharedEntertainmentData) generateSharedEntertainmentData();
    return sharedEntertainmentData.genre.ar;
  },

  releaseYear: () => {
    if (!sharedEntertainmentData) generateSharedEntertainmentData();
    return sharedEntertainmentData.year;
  },

  rating: () => {
    if (!sharedEntertainmentData) generateSharedEntertainmentData();
    return `${sharedEntertainmentData.rating}/5.0`;
  },

  duration: () => {
    if (!sharedEntertainmentData) generateSharedEntertainmentData();
    return `${sharedEntertainmentData.duration} minutes`;
  },

  cinemaName: () => {
    if (!sharedEntertainmentData) generateSharedEntertainmentData();
    return sharedEntertainmentData.cinema.en;
  },

  cinemaNameAr: () => {
    if (!sharedEntertainmentData) generateSharedEntertainmentData();
    return sharedEntertainmentData.cinema.ar;
  },

  showTime: () => {
    const times = ['14:30', '17:00', '19:30', '22:00', '00:30'];
    return randomChoice(times);
  },

  ticketPrice: () => `${randomNum(25, 75)} SAR`
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { entertainmentGenerators };
} else if (typeof window !== 'undefined') {
  window.entertainmentGenerators = entertainmentGenerators;
}
