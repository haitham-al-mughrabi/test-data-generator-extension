// Missing generators - simple implementations
window.missingGenerators = {
  // Saudi Services
  hajjId: () => 'H' + randomNum(1000000, 9999999),
  umrahId: () => 'U' + randomNum(1000000, 9999999),
  workPermit: () => 'WP' + randomNum(10000000, 99999999),
  residencyId: () => 'R' + randomNum(1000000, 9999999),
  drivingLicense: () => randomNum(1000000000, 9999999999).toString(),
  istmara: () => 'IS' + randomNum(1000000, 9999999),
  healthCard: () => 'HC' + randomNum(1000000, 9999999),
  vaccinationCertificate: () => 'VC' + randomNum(1000000, 9999999),
  covidCertificate: () => 'COVID' + randomNum(100000, 999999),
  
  // Healthcare
  allergies: () => randomChoice(['Peanuts', 'Shellfish', 'Penicillin', 'Latex', 'Pollen', 'Dust', 'None']),
  bloodPressure: () => `${randomNum(90, 140)}/${randomNum(60, 90)} mmHg`,
  heartRate: () => `${randomNum(60, 100)} bpm`,
  
  // Technology
  portNumber: () => randomChoice([80, 443, 8080, 3000, 5432, 27017, 3306, 6379]),
  version: () => `${randomNum(1, 5)}.${randomNum(0, 20)}.${randomNum(0, 50)}`,
  buildNumber: () => `${randomNum(1000, 9999)}`,
  
  // Travel
  airportCode: () => randomChoice(['RUH', 'JED', 'DMM', 'MED', 'TIF', 'AHB', 'GIZ', 'TUU', 'ELQ', 'YNB']),
  
  // Entertainment
  director: () => randomChoice(['Steven Spielberg', 'Christopher Nolan', 'Martin Scorsese', 'Quentin Tarantino', 'James Cameron']),
  review: () => randomChoice(['Excellent movie!', 'Great performance', 'Must watch', 'Disappointing', 'Masterpiece', 'Average at best']),
  
  // Sports
  sportType: () => randomChoice(['Football', 'Basketball', 'Tennis', 'Swimming', 'Running', 'Cycling', 'Volleyball']),
  stadium: () => randomChoice(['King Fahd Stadium', 'King Abdullah Stadium', 'Prince Faisal Stadium', 'Al Jawhara Stadium']),
  league: () => randomChoice(['Saudi Pro League', 'Kings Cup', 'Super Cup', 'AFC Champions League']),
  
  // Food & Restaurant
  cuisineType: () => randomChoice(['Saudi', 'Lebanese', 'Italian', 'Chinese', 'Indian', 'Turkish', 'American', 'Japanese']),
  menuItem: () => randomChoice(['Kabsa', 'Mandi', 'Shawarma', 'Falafel', 'Hummus', 'Grilled Chicken', 'Biryani']),
  recipe: () => randomChoice(['Mix ingredients', 'Bake at 180°C', 'Grill for 20 minutes', 'Simmer for 1 hour', 'Fry until golden']),
  
  // Social Media
  handle: () => '@' + randomChoice(['user', 'pro', 'official', 'real']) + '_' + randomNum(100, 999),
  postContent: () => randomChoice(['Having a great day!', 'Check this out!', 'Amazing experience', 'Love this place', 'Best day ever!']),
  comment: () => randomChoice(['Nice!', 'Great post!', 'Love it!', 'Amazing!', 'Awesome!', '👍', '❤️']),
  
  // Gaming
  gamerTag: () => randomChoice(['Shadow', 'Dragon', 'Phoenix', 'Warrior', 'Legend']) + randomNum(100, 999),
  highScore: () => randomNum(10000, 999999),
  guildName: () => randomChoice(['Elite Warriors', 'Dragon Slayers', 'Shadow Legends', 'Phoenix Rising', 'Dark Knights']),
  
  // Email Testing
  unicodeEmail: () => 'user' + randomNum(1, 999) + '@مثال.com',
  customEmail: () => 'custom' + randomNum(1, 999) + '@domain.com',
  
  // Password Testing
  longPassword: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let pwd = '';
    for (let i = 0; i < randomNum(32, 64); i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
  },
  shortPassword: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pwd = '';
    for (let i = 0; i < randomNum(3, 5); i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
  },
  unicodePassword: () => {
    const chars = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي0123456789';
    let pwd = '';
    for (let i = 0; i < 12; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
  }
};

// Merge with main generators
if (typeof window !== 'undefined' && window.generators) {
  Object.assign(window.generators, window.missingGenerators);
}
