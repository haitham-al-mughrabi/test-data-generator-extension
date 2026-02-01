// Gaming generators
let sharedGamingData = null;

function generateSharedGamingData() {
  const gameTitlePairs = [
    { en: 'Desert Warriors', ar: 'محاربو الصحراء' },
    { en: 'Kingdom Quest', ar: 'مهمة المملكة' },
    { en: 'Space Adventure', ar: 'مغامرة الفضاء' },
    { en: 'Racing Champions', ar: 'أبطال السباق' },
    { en: 'Battle Arena', ar: 'ساحة المعركة' },
    { en: 'Magic Legends', ar: 'أساطير السحر' },
    { en: 'City Builder', ar: 'باني المدن' },
    { en: 'Football Manager', ar: 'مدير كرة القدم' }
  ];

  const achievementPairs = [
    { en: 'First Victory', ar: 'النصر الأول' },
    { en: 'Master Player', ar: 'لاعب محترف' },
    { en: 'Speed Runner', ar: 'عداء سريع' },
    { en: 'Treasure Hunter', ar: 'صائد الكنوز' },
    { en: 'Team Leader', ar: 'قائد الفريق' },
    { en: 'Champion', ar: 'بطل' },
    { en: 'Explorer', ar: 'مستكشف' },
    { en: 'Strategist', ar: 'استراتيجي' }
  ];

  const guildPairs = [
    { en: 'Golden Eagles', ar: 'النسور الذهبية' },
    { en: 'Desert Lions', ar: 'أسود الصحراء' },
    { en: 'Storm Warriors', ar: 'محاربو العاصفة' },
    { en: 'Fire Dragons', ar: 'تنانين النار' },
    { en: 'Shadow Knights', ar: 'فرسان الظل' },
    { en: 'Royal Guards', ar: 'الحرس الملكي' },
    { en: 'Thunder Bolts', ar: 'صواعق الرعد' },
    { en: 'Crystal Hunters', ar: 'صيادو الكريستال' }
  ];

  const characterPairs = [
    { en: 'Warrior Khalid', ar: 'المحارب خالد' },
    { en: 'Mage Fatima', ar: 'الساحرة فاطمة' },
    { en: 'Archer Omar', ar: 'الرامي عمر' },
    { en: 'Knight Salim', ar: 'الفارس سليم' },
    { en: 'Assassin Layla', ar: 'القاتلة ليلى' },
    { en: 'Healer Amina', ar: 'المعالجة أمينة' },
    { en: 'Ranger Yusuf', ar: 'الحارس يوسف' },
    { en: 'Paladin Noor', ar: 'المقدس نور' }
  ];

  sharedGamingData = {
    gameTitle: randomChoice(gameTitlePairs),
    achievement: randomChoice(achievementPairs),
    guild: randomChoice(guildPairs),
    character: randomChoice(characterPairs),
    level: randomNum(1, 100),
    score: randomNum(1000, 999999)
  };
}

const gamingGenerators = {
  gamertag: () => {
    const prefixes = ['Shadow', 'Fire', 'Ice', 'Storm', 'Dark', 'Light', 'Swift', 'Mighty'];
    const suffixes = ['Wolf', 'Eagle', 'Dragon', 'Tiger', 'Lion', 'Hawk', 'Bear', 'Fox'];
    return `${randomChoice(prefixes)}${randomChoice(suffixes)}${randomNum(1, 999)}`;
  },

  playerLevel: () => {
    if (!sharedGamingData) generateSharedGamingData();
    return sharedGamingData.level;
  },

  playerScore: () => {
    if (!sharedGamingData) generateSharedGamingData();
    return sharedGamingData.score.toLocaleString();
  },

  gameTitle: () => {
    if (!sharedGamingData) generateSharedGamingData();
    return sharedGamingData.gameTitle.en;
  },

  gameTitleAr: () => {
    if (!sharedGamingData) generateSharedGamingData();
    return sharedGamingData.gameTitle.ar;
  },

  achievement: () => {
    if (!sharedGamingData) generateSharedGamingData();
    return sharedGamingData.achievement.en;
  },

  achievementAr: () => {
    if (!sharedGamingData) generateSharedGamingData();
    return sharedGamingData.achievement.ar;
  },

  guild: () => {
    if (!sharedGamingData) generateSharedGamingData();
    return sharedGamingData.guild.en;
  },

  guildAr: () => {
    if (!sharedGamingData) generateSharedGamingData();
    return sharedGamingData.guild.ar;
  },

  character: () => {
    if (!sharedGamingData) generateSharedGamingData();
    return sharedGamingData.character.en;
  },

  characterAr: () => {
    if (!sharedGamingData) generateSharedGamingData();
    return sharedGamingData.character.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { gamingGenerators };
} else if (typeof window !== 'undefined') {
  window.gamingGenerators = gamingGenerators;
}
