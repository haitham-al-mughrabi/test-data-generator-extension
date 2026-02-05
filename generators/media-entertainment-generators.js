// Media & Entertainment generators
const mediaEntertainmentGenerators = {
  movieTitle: () => {
    const titles = [
      { en: "Desert Storm", ar: "عاصفة الصحراء" },
      { en: "Kingdom's Pride", ar: "فخر المملكة" },
      { en: "Arabian Nights", ar: "ليالي عربية" },
      { en: "The Last Oasis", ar: "الواحة الأخيرة" },
      { en: "Sands of Time", ar: "رمال الزمن" },
      { en: "Pearl Diver", ar: "غواص اللؤلؤ" },
      { en: "Falcon's Flight", ar: "طيران الصقر" },
      { en: "Bedouin Tales", ar: "حكايات البدو" },
      { en: "City of Gold", ar: "مدينة الذهب" },
      { en: "Mirage", ar: "السراب" },
      { en: "The Caravan", ar: "القافلة" },
      { en: "Desert Rose", ar: "وردة الصحراء" },
      { en: "Moonlight in Riyadh", ar: "ضوء القمر في الرياض" },
      { en: "The Merchant", ar: "التاجر" },
      { en: "Winds of Change", ar: "رياح التغيير" }
    ];
    const title = randomChoice(titles);
    return `${title.en} (${title.ar})`;
  },

  movieGenre: () => randomChoice([
    'Action', 'Drama', 'Comedy', 'Romance', 'Thriller', 'Horror', 'Sci-Fi', 
    'Documentary', 'Animation', 'Adventure', 'Crime', 'Fantasy', 'Mystery', 'War'
  ]),

  movieRating: () => randomChoice(['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR']),

  movieDuration: () => `${randomNum(80, 180)} minutes`,

  tvShow: () => {
    const shows = [
      { en: "Riyadh Stories", ar: "حكايات الرياض" },
      { en: "The Palace", ar: "القصر" },
      { en: "Desert Detectives", ar: "محققو الصحراء" },
      { en: "Saudi Kitchen", ar: "المطبخ السعودي" },
      { en: "Nomad Life", ar: "حياة البدو" },
      { en: "Tech Valley", ar: "وادي التقنية" },
      { en: "Family Matters", ar: "شؤون العائلة" },
      { en: "The Entrepreneur", ar: "رجل الأعمال" },
      { en: "Heritage Hunters", ar: "صيادو التراث" },
      { en: "Modern Arabia", ar: "العربية الحديثة" }
    ];
    const show = randomChoice(shows);
    return `${show.en} (${show.ar})`;
  },

  musicGenre: () => randomChoice([
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Jazz', 'Classical', 'Electronic',
    'Folk', 'Reggae', 'Blues', 'Punk', 'Metal', 'Alternative', 'Arabic Pop', 'Khaleeji'
  ]),

  artist: () => {
    const artists = [
      { en: "Mohammed Abdu", ar: "محمد عبده" },
      { en: "Abdul Majeed Abdullah", ar: "عبدالمجيد عبدالله" },
      { en: "Rashed Al-Majed", ar: "راشد الماجد" },
      { en: "Assala Nasri", ar: "أصالة نصري" },
      { en: "Majid Al Mohandis", ar: "ماجد المهندس" },
      { en: "Elissa", ar: "إليسا" },
      { en: "Fairuz", ar: "فيروز" },
      { en: "Umm Kulthum", ar: "أم كلثوم" },
      { en: "Amr Diab", ar: "عمرو دياب" },
      { en: "Nancy Ajram", ar: "نانسي عجرم" }
    ];
    const artist = randomChoice(artists);
    return `${artist.en} (${artist.ar})`;
  },

  songTitle: () => {
    const songs = [
      { en: "Desert Wind", ar: "ريح الصحراء" },
      { en: "My Homeland", ar: "وطني" },
      { en: "Arabian Dream", ar: "حلم عربي" },
      { en: "Golden Sands", ar: "الرمال الذهبية" },
      { en: "Night in Jeddah", ar: "ليلة في جدة" },
      { en: "Love Story", ar: "قصة حب" },
      { en: "Mother's Prayer", ar: "دعاء الأم" },
      { en: "Falcon's Song", ar: "أغنية الصقر" },
      { en: "Pearl of the Gulf", ar: "لؤلؤة الخليج" },
      { en: "Memories", ar: "ذكريات" }
    ];
    const song = randomChoice(songs);
    return `${song.en} (${song.ar})`;
  },

  albumTitle: () => {
    const albums = [
      { en: "Greatest Hits", ar: "أعظم الأغاني" },
      { en: "New Horizons", ar: "آفاق جديدة" },
      { en: "Golden Collection", ar: "المجموعة الذهبية" },
      { en: "Live in Riyadh", ar: "مباشر من الرياض" },
      { en: "Best of Arabia", ar: "أفضل العربية" },
      { en: "Timeless", ar: "خالد" },
      { en: "Desert Symphony", ar: "سيمفونية الصحراء" },
      { en: "Modern Classics", ar: "كلاسيكيات حديثة" }
    ];
    const album = randomChoice(albums);
    return `${album.en} (${album.ar})`;
  },

  bookTitle: () => {
    const books = [
      { en: "Tales from the Desert", ar: "حكايات من الصحراء" },
      { en: "The Merchant's Journey", ar: "رحلة التاجر" },
      { en: "Arabian Wisdom", ar: "الحكمة العربية" },
      { en: "Sands of Memory", ar: "رمال الذاكرة" },
      { en: "The Last Caravan", ar: "القافلة الأخيرة" },
      { en: "Pearls of the Gulf", ar: "لآلئ الخليج" },
      { en: "Modern Saudi Arabia", ar: "السعودية الحديثة" },
      { en: "Desert Flowers", ar: "زهور الصحراء" },
      { en: "The Falcon's Eye", ar: "عين الصقر" },
      { en: "Heritage and Progress", ar: "التراث والتقدم" }
    ];
    const book = randomChoice(books);
    return `${book.en} (${book.ar})`;
  },

  author: () => {
    const authors = [
      { en: "Abdul Rahman Munif", ar: "عبدالرحمن منيف" },
      { en: "Turki Al-Hamad", ar: "تركي الحمد" },
      { en: "Ghazi Al-Gosaibi", ar: "غازي القصيبي" },
      { en: "Laila Al-Juhani", ar: "ليلى الجهني" },
      { en: "Yousef Al-Mohaimeed", ar: "يوسف المحيميد" },
      { en: "Raja Alem", ar: "رجاء عالم" },
      { en: "Mohammed Hassan Alwan", ar: "محمد حسن علوان" },
      { en: "Badriah Al-Bishr", ar: "بدرية البشر" }
    ];
    const author = randomChoice(authors);
    return `${author.en} (${author.ar})`;
  },

  gameTitle: () => {
    const games = [
      "Desert Warrior", "Arabian Quest", "Falcon Hunter", "Oasis Builder", 
      "Caravan Master", "Pearl Diver", "Sand Storm", "Kingdom Defense",
      "Bedouin Adventure", "Mirage Runner", "Camel Racing", "Treasure Hunt",
      "Desert Rally", "Arabian Nights RPG", "Nomad Survival"
    ];
    return randomChoice(games);
  },

  gameGenre: () => randomChoice([
    'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Sports', 'Racing',
    'Puzzle', 'Fighting', 'Shooter', 'Platform', 'MMO', 'Casual', 'Indie'
  ]),

  gamePlatform: () => randomChoice([
    'PlayStation 5', 'Xbox Series X', 'Nintendo Switch', 'PC', 'Mobile',
    'PlayStation 4', 'Xbox One', 'Steam', 'Epic Games', 'App Store', 'Google Play'
  ]),

  streamingService: () => randomChoice([
    'Netflix', 'Amazon Prime', 'Disney+', 'Hulu', 'HBO Max', 'Apple TV+',
    'Shahid VIP', 'OSN', 'Starzplay', 'YouTube Premium', 'Spotify', 'Anghami'
  ]),

  podcastTitle: () => {
    const podcasts = [
      { en: "Saudi Voices", ar: "أصوات سعودية" },
      { en: "Tech Talk Arabia", ar: "حديث التقنية العربية" },
      { en: "Business in the Kingdom", ar: "الأعمال في المملكة" },
      { en: "Cultural Conversations", ar: "محادثات ثقافية" },
      { en: "Desert Wisdom", ar: "حكمة الصحراء" },
      { en: "Modern Arabia", ar: "العربية الحديثة" },
      { en: "Startup Stories", ar: "قصص الشركات الناشئة" },
      { en: "Heritage Hour", ar: "ساعة التراث" }
    ];
    const podcast = randomChoice(podcasts);
    return `${podcast.en} (${podcast.ar})`;
  },

  socialMediaPlatform: () => randomChoice([
    'Twitter', 'Instagram', 'TikTok', 'Snapchat', 'Facebook', 'LinkedIn',
    'YouTube', 'WhatsApp', 'Telegram', 'Discord', 'Reddit', 'Pinterest'
  ]),

  influencerHandle: () => {
    const handles = [
      '@saudi_lifestyle', '@riyadh_foodie', '@desert_explorer', '@tech_saudi',
      '@fashion_ksa', '@travel_arabia', '@fitness_gulf', '@art_middle_east',
      '@business_saudi', '@culture_arabia', '@music_ksa', '@sports_gulf'
    ];
    return randomChoice(handles);
  },

  contentType: () => randomChoice([
    'Video', 'Photo', 'Story', 'Reel', 'Live Stream', 'Podcast', 'Blog Post',
    'Article', 'Review', 'Tutorial', 'Vlog', 'Short Film', 'Documentary'
  ]),

  viewCount: () => {
    const multipliers = ['K', 'M', 'B'];
    const multiplier = randomChoice(multipliers);
    const base = randomNum(1, 999);
    return `${base}${multiplier}`;
  },

  rating: () => `${(randomNum(10, 50) / 10).toFixed(1)}/5.0`,

  releaseYear: () => randomNum(1990, 2024),

  episodeNumber: () => `S${randomNum(1, 10)}E${randomNum(1, 24)}`,

  duration: () => {
    const hours = randomNum(0, 3);
    const minutes = randomNum(1, 59);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mediaEntertainmentGenerators };
} else if (typeof window !== 'undefined') {
  window.mediaEntertainmentGenerators = mediaEntertainmentGenerators;
}