// Social Media generators
let sharedSocialData = null;

function generateSharedSocialData() {
  const displayNamePairs = [
    { en: 'Tech Enthusiast', ar: 'عاشق التقنية' },
    { en: 'Travel Blogger', ar: 'مدون سفر' },
    { en: 'Food Lover', ar: 'محب الطعام' },
    { en: 'Fitness Coach', ar: 'مدرب لياقة' },
    { en: 'Artist', ar: 'فنان' },
    { en: 'Photographer', ar: 'مصور' },
    { en: 'Writer', ar: 'كاتب' },
    { en: 'Entrepreneur', ar: 'رائد أعمال' }
  ];

  const bioPairs = [
    { en: 'Living life to the fullest 🌟', ar: 'أعيش الحياة بأقصى ما أستطيع 🌟' },
    { en: 'Passionate about technology and innovation', ar: 'شغوف بالتقنية والابتكار' },
    { en: 'Exploring the world one city at a time', ar: 'أستكشف العالم مدينة تلو الأخرى' },
    { en: 'Creating memories and sharing stories', ar: 'أصنع الذكريات وأشارك القصص' },
    { en: 'Dream big, work hard, stay humble', ar: 'احلم كبيراً، اعمل بجد، ابق متواضعاً' }
  ];

  sharedSocialData = {
    displayName: randomChoice(displayNamePairs),
    bio: randomChoice(bioPairs),
    followers: randomNum(100, 50000),
    following: randomNum(50, 2000),
    posts: randomNum(10, 1000)
  };
}

const socialMediaGenerators = {
  username: () => {
    const adjectives = ['cool', 'smart', 'fast', 'bright', 'happy', 'strong'];
    const nouns = ['user', 'player', 'star', 'hero', 'pro', 'master'];
    return `${randomChoice(adjectives)}_${randomChoice(nouns)}_${randomNum(100, 999)}`;
  },

  displayName: () => {
    if (!sharedSocialData) generateSharedSocialData();
    return sharedSocialData.displayName.en;
  },

  displayNameAr: () => {
    if (!sharedSocialData) generateSharedSocialData();
    return sharedSocialData.displayName.ar;
  },

  bio: () => {
    if (!sharedSocialData) generateSharedSocialData();
    return sharedSocialData.bio.en;
  },

  bioAr: () => {
    if (!sharedSocialData) generateSharedSocialData();
    return sharedSocialData.bio.ar;
  },

  hashtag: () => `#${randomChoice(['tech', 'life', 'travel', 'food', 'fitness', 'art', 'photography', 'business'])}${randomNum(1, 99)}`,

  mention: () => `@${randomChoice(['user', 'friend', 'buddy', 'mate'])}${randomNum(100, 999)}`,

  followers: () => {
    if (!sharedSocialData) generateSharedSocialData();
    return sharedSocialData.followers.toLocaleString();
  },

  following: () => {
    if (!sharedSocialData) generateSharedSocialData();
    return sharedSocialData.following.toLocaleString();
  },

  posts: () => {
    if (!sharedSocialData) generateSharedSocialData();
    return sharedSocialData.posts.toLocaleString();
  },

  socialHandle: () => `@${randomChoice(['insta', 'twitter', 'snap', 'tiktok'])}_${randomNum(1000, 9999)}`
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { socialMediaGenerators };
} else if (typeof window !== 'undefined') {
  window.socialMediaGenerators = socialMediaGenerators;
}
