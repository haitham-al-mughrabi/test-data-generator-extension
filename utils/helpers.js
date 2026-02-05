// Utility functions
const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

// Reset all shared data
function resetSharedData() {
  if (typeof sharedDocumentData !== 'undefined') sharedDocumentData = null;
  if (typeof sharedServiceData !== 'undefined') sharedServiceData = null;
  if (typeof sharedNameData !== 'undefined') sharedNameData = null;
  if (typeof sharedPersonalData !== 'undefined') sharedPersonalData = null;
  if (typeof sharedLocationData !== 'undefined') sharedLocationData = null;
  if (typeof sharedWorkData !== 'undefined') sharedWorkData = null;
  if (typeof sharedImageData !== 'undefined') sharedImageData = null;
}

// Hijri Date Conversion (simplified approximation)
function gregorianToHijri(gregorianDate) {
  // Simplified conversion - for more accuracy, use a proper Hijri calendar library
  const gregorianYear = gregorianDate.getFullYear();
  const gregorianMonth = gregorianDate.getMonth() + 1;
  const gregorianDay = gregorianDate.getDate();
  
  // Approximate conversion (Hijri year is about 354 days vs 365 for Gregorian)
  const hijriYear = Math.floor((gregorianYear - 622) * 1.030684) + 1;
  
  // Approximate month and day (simplified)
  const dayOfYear = Math.floor((gregorianDate - new Date(gregorianYear, 0, 0)) / (1000 * 60 * 60 * 24));
  const hijriMonth = Math.floor((dayOfYear * 12) / 354) + 1;
  const hijriDay = Math.floor(((dayOfYear * 12) % 354) / 12) + 1;
  
  return {
    year: Math.max(1, hijriYear),
    month: Math.min(12, Math.max(1, hijriMonth)),
    day: Math.min(30, Math.max(1, hijriDay))
  };
}

// Luhn algorithm for card validation
function luhnChecksum(cardNumber) {
  const digits = cardNumber.toString().split('').map(Number);
  const oddDigits = digits.slice().reverse().filter((_, i) => i % 2 === 0);
  const evenDigits = digits.slice().reverse().filter((_, i) => i % 2 === 1);
  
  let checksum = oddDigits.reduce((sum, digit) => sum + digit, 0);
  
  for (let digit of evenDigits) {
    const doubled = digit * 2;
    checksum += doubled > 9 ? Math.floor(doubled / 10) + (doubled % 10) : doubled;
  }
  
  return checksum % 10;
}

function generateLuhnValidCard(binPrefix, length) {
  // Generate number without check digit
  let number = binPrefix;
  for (let i = 0; i < length - binPrefix.length - 1; i++) {
    number += randomNum(0, 9);
  }
  
  // Calculate check digit
  const checksumDigit = (10 - luhnChecksum(number + '0')) % 10;
  return number + checksumDigit;
}

function generatePaymentCard(cardType) {
  let binPrefix;
  
  switch (cardType.toLowerCase()) {
    case 'mada':
      binPrefix = randomChoice(window.saudiData.madaBins);
      break;
    case 'visa':
      binPrefix = '4' + randomNum(10000, 99999).toString();
      break;
    case 'mastercard':
      // MasterCard: 51-55 or 2221-2720
      if (Math.random() > 0.5) {
        binPrefix = randomNum(51, 55).toString() + randomNum(1000, 9999).toString();
      } else {
        binPrefix = randomNum(2221, 2720).toString();
      }
      break;
    default:
      binPrefix = '4' + randomNum(10000, 99999).toString();
  }
  
  const cardNumber = generateLuhnValidCard(binPrefix, 16);
  return cardNumber.replace(/(.{4})/g, '$1 ').trim();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    randomNum, 
    randomChoice, 
    randomDate, 
    gregorianToHijri, 
    luhnChecksum, 
    generateLuhnValidCard, 
    generatePaymentCard 
  };
} else if (typeof window !== 'undefined') {
  window.randomNum = randomNum;
  window.randomChoice = randomChoice;
  window.randomDate = randomDate;
  window.gregorianToHijri = gregorianToHijri;
  window.luhnChecksum = luhnChecksum;
  window.generateLuhnValidCard = generateLuhnValidCard;
  window.generatePaymentCard = generatePaymentCard;
}
