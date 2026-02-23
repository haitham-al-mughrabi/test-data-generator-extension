// Password Testing generators
function getPasswordSettings() {
  const lengthInput = document.getElementById('passwordLength');
  const uppercaseCheck = document.getElementById('includeUppercase');
  const lowercaseCheck = document.getElementById('includeLowercase');
  const numbersCheck = document.getElementById('includeNumbers');
  const specialCheck = document.getElementById('includeSpecialChars');
  const arabicCheck = document.getElementById('includeArabicChars');
  const startWithCheck = document.getElementById('mustStartWith');
  const endWithCheck = document.getElementById('mustEndWith');
  const noRepeatingCheck = document.getElementById('noRepeating');
  
  return {
    length: lengthInput?.value ? parseInt(lengthInput.value) : 12,
    includeUppercase: uppercaseCheck?.checked ?? true,
    includeLowercase: lowercaseCheck?.checked ?? true,
    includeNumbers: numbersCheck?.checked ?? true,
    includeSpecialChars: specialCheck?.checked ?? false,
    includeArabicChars: arabicCheck?.checked ?? false,
    mustStartWith: startWithCheck?.checked ?? false,
    mustEndWith: endWithCheck?.checked ?? false,
    noRepeating: noRepeatingCheck?.checked ?? false
  };
}

function generateCustomPassword() {
  const settings = getPasswordSettings();

  const sets = [];
  if (settings.includeUppercase) sets.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  if (settings.includeLowercase) sets.push('abcdefghijklmnopqrstuvwxyz');
  if (settings.includeNumbers) sets.push('0123456789');
  if (settings.includeSpecialChars) sets.push('!@#$%^&*()_+-=[]{}|;:,.<>?');
  if (settings.includeArabicChars) sets.push('ابتثجحخدذرزسشصضطظعغفقكلمنهوي');

  const fallback = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charset = sets.length ? sets.join('') : fallback;

  const minLength = Math.max(settings.length, sets.length || 1);
  const length = minLength;

  let attempts = 0;
  const maxAttempts = 100;
  let password = '';

  do {
    const chars = [];
    const used = new Set();

    // Ensure at least one from each selected set
    for (const set of (sets.length ? sets : [fallback])) {
      let ch = set.charAt(Math.floor(Math.random() * set.length));
      if (settings.noRepeating && used.has(ch)) {
        let guard = 0;
        while (used.has(ch) && guard < 50) {
          ch = set.charAt(Math.floor(Math.random() * set.length));
          guard++;
        }
      }
      chars.push(ch);
      used.add(ch);
    }

    // Fill the remaining length
    while (chars.length < length) {
      let ch = charset.charAt(Math.floor(Math.random() * charset.length));
      if (settings.noRepeating && used.has(ch)) continue;
      chars.push(ch);
      used.add(ch);
    }

    // Shuffle
    password = chars.sort(() => Math.random() - 0.5).join('');

    // Apply start/end requirements
    if (settings.mustStartWith && password.length > 0) {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      if (!letters.includes(password[0])) {
        password = letters.charAt(Math.floor(Math.random() * letters.length)) + password.slice(1);
      }
    }

    if (settings.mustEndWith && password.length > 0) {
      const numbers = '0123456789';
      if (!numbers.includes(password[password.length - 1])) {
        password = password.slice(0, -1) + numbers.charAt(Math.floor(Math.random() * numbers.length));
      }
    }

    attempts++;
  } while (settings.noRepeating && hasDuplicates(password) && attempts < maxAttempts);

  return password;
}

function hasDuplicates(str) {
  return new Set(str).size !== str.length;
}

const passwordTestingGenerators = {
  customPassword: () => generateCustomPassword(),

  weakPassword: () => {
    const weakPasswords = [
      'password',
      '123456',
      'qwerty',
      'abc123',
      'password123',
      '111111',
      'welcome',
      'admin',
      'user123',
      'test123'
    ];
    return randomChoice(weakPasswords);
  },

  strongPassword: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    const length = randomNum(12, 20);
    
    // Ensure at least one of each type
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26));
    password += 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26));
    password += '0123456789'.charAt(Math.floor(Math.random() * 10));
    password += '!@#$%^&*'.charAt(Math.floor(Math.random() * 8));
    
    // Fill the rest
    for (let i = password.length; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  },

  numericPassword: () => {
    const length = randomNum(6, 16);
    let password = '';
    for (let i = 0; i < length; i++) {
      password += Math.floor(Math.random() * 10);
    }
    return password;
  },

  alphabeticPassword: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const length = randomNum(8, 16);
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  },

  specialCharPassword: () => {
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const length = randomNum(6, 12);
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  },

  mixedPassword: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const length = randomNum(10, 18);
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  },

  arabicPassword: () => {
    const chars = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';
    const length = randomNum(8, 16);
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  },

  commonPassword: () => {
    const commonPasswords = [
      'password',
      '123456789',
      'qwerty123',
      'abc123456',
      'password1',
      'welcome123',
      'admin123',
      'user1234',
      'test1234',
      'letmein',
      'monkey123',
      'dragon123',
      'sunshine',
      'master123',
      'shadow123'
    ];
    return randomChoice(commonPasswords);
  },

  complexPassword: () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const arabic = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';
    
    const length = randomNum(16, 24);
    let password = '';
    
    // Ensure complexity requirements
    password += upper.charAt(Math.floor(Math.random() * upper.length));
    password += lower.charAt(Math.floor(Math.random() * lower.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += special.charAt(Math.floor(Math.random() * special.length));
    password += arabic.charAt(Math.floor(Math.random() * arabic.length));
    
    // Fill remaining length
    const allChars = upper + lower + numbers + special + arabic;
    for (let i = password.length; i < length; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    
    // Shuffle
    return password.split('').sort(() => Math.random() - 0.5).join('');
  },

  alphaPassword: () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const length = randomNum(8, 16);
    let password = '';
    for (let i = 0; i < length; i++) {
      password += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return password;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { passwordTestingGenerators };
} else if (typeof window !== 'undefined') {
  window.passwordTestingGenerators = passwordTestingGenerators;
}
