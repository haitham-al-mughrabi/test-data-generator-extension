// Random Values generators
function getRandomValuesSettings() {
  const includeNumbers = document.getElementById('includeNumbers');
  const includeUppercase = document.getElementById('includeUppercase');
  const includeLowercase = document.getElementById('includeLowercase');
  const includeArabicLetters = document.getElementById('includeArabicLetters');
  const includeSpecialChars = document.getElementById('includeSpecialChars');
  const randomLength = document.getElementById('randomLength');
  const customChars = document.getElementById('customChars');
  
  return {
    includeNumbers: includeNumbers?.checked ?? true,
    includeUppercase: includeUppercase?.checked ?? true,
    includeLowercase: includeLowercase?.checked ?? true,
    includeArabicLetters: includeArabicLetters?.checked ?? false,
    includeSpecialChars: includeSpecialChars?.checked ?? false,
    length: parseInt(randomLength?.value) || 10,
    customChars: customChars?.value || ''
  };
}

function generateRandomString(settings) {
  let charset = '';
  
  if (settings.includeNumbers) {
    charset += '0123456789';
  }
  if (settings.includeUppercase) {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if (settings.includeLowercase) {
    charset += 'abcdefghijklmnopqrstuvwxyz';
  }
  if (settings.includeArabicLetters) {
    charset += 'أبتثجحخدذرزسشصضطظعغفقكلمنهوي';
  }
  if (settings.includeSpecialChars) {
    charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  }
  if (settings.customChars) {
    charset += settings.customChars;
  }
  
  if (!charset) {
    charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  }
  
  let result = '';
  for (let i = 0; i < settings.length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

const randomValuesGenerators = {
  customRandom: () => {
    const settings = getRandomValuesSettings();
    return generateRandomString(settings);
  },

  randomNumbers: () => {
    const settings = getRandomValuesSettings();
    return generateRandomString({
      ...settings,
      includeNumbers: true,
      includeUppercase: false,
      includeLowercase: false,
      includeArabicLetters: false,
      includeSpecialChars: false,
      customChars: ''
    });
  },

  randomLetters: () => {
    const settings = getRandomValuesSettings();
    return generateRandomString({
      ...settings,
      includeNumbers: false,
      includeUppercase: true,
      includeLowercase: true,
      includeArabicLetters: false,
      includeSpecialChars: false,
      customChars: ''
    });
  },

  randomUppercase: () => {
    const settings = getRandomValuesSettings();
    return generateRandomString({
      ...settings,
      includeNumbers: false,
      includeUppercase: true,
      includeLowercase: false,
      includeArabicLetters: false,
      includeSpecialChars: false,
      customChars: ''
    });
  },

  randomLowercase: () => {
    const settings = getRandomValuesSettings();
    return generateRandomString({
      ...settings,
      includeNumbers: false,
      includeUppercase: false,
      includeLowercase: true,
      includeArabicLetters: false,
      includeSpecialChars: false,
      customChars: ''
    });
  },

  randomArabicLetters: () => {
    const settings = getRandomValuesSettings();
    return generateRandomString({
      ...settings,
      includeNumbers: false,
      includeUppercase: false,
      includeLowercase: false,
      includeArabicLetters: true,
      includeSpecialChars: false,
      customChars: ''
    });
  },

  randomMixed: () => {
    const settings = getRandomValuesSettings();
    return generateRandomString({
      ...settings,
      includeNumbers: true,
      includeUppercase: true,
      includeLowercase: true,
      includeArabicLetters: true,
      includeSpecialChars: true
    });
  },

  randomAlphanumeric: () => {
    const settings = getRandomValuesSettings();
    return generateRandomString({
      ...settings,
      includeNumbers: true,
      includeUppercase: true,
      includeLowercase: true,
      includeArabicLetters: false,
      includeSpecialChars: false,
      customChars: ''
    });
  },

  randomSpecialChars: () => {
    const settings = getRandomValuesSettings();
    return generateRandomString({
      ...settings,
      includeNumbers: false,
      includeUppercase: false,
      includeLowercase: false,
      includeArabicLetters: false,
      includeSpecialChars: true,
      customChars: ''
    });
  },

  randomHex: () => {
    const settings = getRandomValuesSettings();
    return generateRandomString({
      ...settings,
      includeNumbers: false,
      includeUppercase: false,
      includeLowercase: false,
      includeArabicLetters: false,
      includeSpecialChars: false,
      customChars: '0123456789ABCDEF'
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { randomValuesGenerators };
} else if (typeof window !== 'undefined') {
  window.randomValuesGenerators = randomValuesGenerators;
}
