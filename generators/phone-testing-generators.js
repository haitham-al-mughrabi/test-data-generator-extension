// Phone Testing generators
function getPhoneSettings() {
  const phoneTypeSelect = document.getElementById('phoneType');
  const phoneFormatSelect = document.getElementById('phoneFormat');
  const generateValidCheck = document.getElementById('generateValid');
  const generateInvalidCheck = document.getElementById('generateInvalid');
  const wrongLengthCheck = document.getElementById('wrongLength');
  
  return {
    phoneType: phoneTypeSelect?.value || 'mobile',
    phoneFormat: phoneFormatSelect?.value || 'formatted',
    generateValid: generateValidCheck?.checked ?? true,
    generateInvalid: generateInvalidCheck?.checked ?? false,
    wrongLength: wrongLengthCheck?.checked ?? false
  };
}

function generatePhoneNumber(type, format, isValid = true, correctLength = true) {
  let number = '';
  
  if (!isValid) {
    // Generate invalid numbers
    const invalidPatterns = [
      '00000000000',
      '11111111111', 
      '99999999999',
      '01234567890',
      '05000000000',
      '01000000000'
    ];
    return randomChoice(invalidPatterns);
  }
  
  if (!correctLength) {
    // Generate wrong length numbers
    const lengths = [7, 8, 9, 11, 12, 13];
    const length = randomChoice(lengths);
    for (let i = 0; i < length; i++) {
      number += randomNum(0, 9);
    }
    return number;
  }
  
  // Generate valid numbers based on type
  switch (type) {
    case 'mobile':
      // Mobile: 05X XXXX XXXX (10 digits total)
      const mobilePrefixes = ['050', '053', '054', '055', '056', '058', '059'];
      const mobilePrefix = randomChoice(mobilePrefixes);
      number = mobilePrefix;
      for (let i = 0; i < 7; i++) {
        number += randomNum(0, 9);
      }
      break;
      
    case 'landline':
      // Landline: 01X XXXX XXXX (10 digits total)
      const landlinePrefixes = ['011', '012', '013', '014', '016', '017'];
      const landlinePrefix = randomChoice(landlinePrefixes);
      number = landlinePrefix;
      for (let i = 0; i < 7; i++) {
        number += randomNum(0, 9);
      }
      break;
      
    case 'short-mobile':
      // Short mobile: 5X XXXX XXXX (9 digits total)
      const shortMobilePrefixes = ['50', '53', '54', '55', '56', '58', '59'];
      const shortMobilePrefix = randomChoice(shortMobilePrefixes);
      number = shortMobilePrefix;
      for (let i = 0; i < 7; i++) {
        number += randomNum(0, 9);
      }
      break;
      
    case 'short-landline':
      // Short landline: 1X XXXX XXXX (9 digits total)
      const shortLandlinePrefixes = ['11', '12', '13', '14', '16', '17'];
      const shortLandlinePrefix = randomChoice(shortLandlinePrefixes);
      number = shortLandlinePrefix;
      for (let i = 0; i < 7; i++) {
        number += randomNum(0, 9);
      }
      break;
      
    default:
      // Mixed - randomly choose type
      const types = ['mobile', 'landline', 'short-mobile', 'short-landline'];
      return generatePhoneNumber(randomChoice(types), format, isValid, correctLength);
  }
  
  // Apply formatting
  switch (format) {
    case 'formatted':
      if (number.length === 10) {
        return `+966 ${number.substring(1, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
      } else if (number.length === 9) {
        return `+966 ${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5)}`;
      }
      return number;
      
    case 'international':
      return `+966${number.startsWith('0') ? number.substring(1) : number}`;
      
    case 'local':
      return number.startsWith('0') ? number : '0' + number;
      
    default:
      return number;
  }
}

const phoneTestingGenerators = {
  customPhone: () => {
    const settings = getPhoneSettings();
    return generatePhoneNumber(
      settings.phoneType, 
      settings.phoneFormat, 
      settings.generateValid && !settings.generateInvalid,
      !settings.wrongLength
    );
  },

  mobileNumber: () => generatePhoneNumber('mobile', 'formatted'),
  
  landlineNumber: () => generatePhoneNumber('landline', 'formatted'),
  
  shortMobile: () => generatePhoneNumber('short-mobile', 'unformatted'),
  
  shortLandline: () => generatePhoneNumber('short-landline', 'unformatted'),
  
  invalidPhone: () => generatePhoneNumber('mobile', 'unformatted', false),
  
  wrongLengthPhone: () => generatePhoneNumber('mobile', 'unformatted', true, false),
  
  internationalPhone: () => generatePhoneNumber('mobile', 'international'),
  
  formattedPhone: () => generatePhoneNumber(
    randomChoice(['mobile', 'landline']), 
    'formatted'
  ),
  
  unformattedPhone: () => generatePhoneNumber(
    randomChoice(['mobile', 'landline']), 
    'unformatted'
  )
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { phoneTestingGenerators };
} else if (typeof window !== 'undefined') {
  window.phoneTestingGenerators = phoneTestingGenerators;
}
