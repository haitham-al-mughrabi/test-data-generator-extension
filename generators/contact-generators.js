// Contact and location generators
let sharedLocationData = null;

// Helper function to generate shared location data
function generateSharedLocationData() {
  const number = randomNum(1, 9999);
  const street = randomChoice(saudiData.streets);
  const district = randomChoice(saudiData.districts);
  const city = randomChoice(saudiData.cities);
  const postal = randomNum(10000, 99999);
  const buildingNum = randomNum(1000, 9999);
  const additional = randomNum(1000, 9999);
  
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let nationalAddr = '';
  for (let i = 0; i < 4; i++) {
    nationalAddr += letters[randomNum(0, 25)];
  }
  for (let i = 0; i < 4; i++) {
    nationalAddr += randomNum(0, 9);
  }
  
  sharedLocationData = {
    streetNumber: number,
    streetName: street,
    district: district,
    city: city,
    postalCode: postal,
    address: {
      en: `${number} ${street.en}, ${district.en}, ${city.en} ${postal}`,
      ar: `${number} ${street.ar}، ${district.ar}، ${city.ar} ${postal}`
    },
    saudiAddress: {
      en: `Building: ${buildingNum}, ${street.en}, ${district.en}, ${city.en}, ${postal}, Additional: ${additional}`,
      ar: `المبنى: ${buildingNum}، ${street.ar}، ${district.ar}، ${city.ar}، ${postal}، إضافي: ${additional}`
    },
    nationalAddress: nationalAddr
  };
}

const contactGenerators = {
  email: () => {
    const firstName = randomChoice(names.firstNames.male.concat(names.firstNames.female)).en.toLowerCase();
    const number = randomNum(1, 999);
    const domain = randomChoice(emailDomains);
    return `${firstName}${number}@${domain}`;
  },

  phone: () => {
    const mobileCarriers = {
      'stc': ['050', '053', '055'],
      'mobily': ['054', '056'], 
      'zain': ['058', '059'],
      'virgin': ['0570', '0571', '0572'],
      'redbull': ['0574', '0575'],
      'lebara': ['0576', '0578'],
      'salam': ['051']
    };
    
    const carriers = Object.keys(mobileCarriers);
    const carrier = randomChoice(carriers);
    const prefix = randomChoice(mobileCarriers[carrier]);
    
    const remainingDigits = prefix.length === 3 ? 7 : 6;
    let subscriberNumber = '';
    for (let i = 0; i < remainingDigits; i++) {
      subscriberNumber += randomNum(0, 9);
    }
    
    const cleanPrefix = prefix.substring(1);
    const formatted = `${subscriberNumber.substring(0, 3)} ${subscriberNumber.substring(3)}`;
    return `+966 ${cleanPrefix} ${formatted}`;
  },

  landline: () => {
    const areaCodes = {
      'riyadh': '011',
      'jeddah': '012', 
      'mecca': '012',
      'eastern': '013',
      'qassim': '014',
      'madinah': '016',
      'tabuk': '017'
    };
    
    const regions = Object.keys(areaCodes);
    const region = randomChoice(regions);
    const areaCode = areaCodes[region];
    
    let subscriberNumber = '';
    for (let i = 0; i < 7; i++) {
      subscriberNumber += randomNum(0, 9);
    }
    
    const cleanCode = areaCode.substring(1);
    const formatted = `${subscriberNumber.substring(0, 3)} ${subscriberNumber.substring(3)}`;
    return `+966 ${cleanCode} ${formatted}`;
  },

  mobileNumber: () => {
    const mobileCarriers = {
      'stc': ['050', '053', '055'],
      'mobily': ['054', '056'], 
      'zain': ['058', '059'],
      'virgin': ['0570', '0571', '0572']
    };
    
    const carriers = Object.keys(mobileCarriers);
    const carrier = randomChoice(carriers);
    const prefix = randomChoice(mobileCarriers[carrier]);
    
    const remainingDigits = prefix.length === 3 ? 7 : 6;
    let subscriberNumber = '';
    for (let i = 0; i < remainingDigits; i++) {
      subscriberNumber += randomNum(0, 9);
    }
    
    const formatted = `${subscriberNumber.substring(0, 3)} ${subscriberNumber.substring(3)}`;
    return `${prefix} ${formatted}`;
  },

  address: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.address.en;
  },

  addressAr: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.address.ar;
  },

  saudiAddress: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.saudiAddress.en;
  },

  saudiAddressAr: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.saudiAddress.ar;
  },

  nationalAddress: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.nationalAddress;
  },

  streetNumber: () => randomNum(1, 9999).toString(),
  
  streetName: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.streetName.en;
  },
  
  streetNameAr: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.streetName.ar;
  },
  
  district: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.district.en;
  },
  
  districtAr: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.district.ar;
  },
  
  city: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.city.en;
  },
  
  cityAr: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.city.ar;
  },
  
  postalCode: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.postalCode;
  },
  
  country: () => 'Saudi Arabia',
  countryAr: () => 'المملكة العربية السعودية',
  countryCode: () => 'SA',

  latitude: () => (randomNum(1600, 3200) / 100).toFixed(6),
  longitude: () => (randomNum(3400, 5500) / 100).toFixed(6),
  coordinates: () => `${(randomNum(1600, 3200) / 100).toFixed(6)}, ${(randomNum(3400, 5500) / 100).toFixed(6)}`,
  timezone: () => randomChoice(['Asia/Riyadh', 'Asia/Kuwait', 'Asia/Bahrain', 'Asia/Qatar']),
  building: () => `Building ${randomChoice(['A', 'B', 'C', 'D'])}`,
  floor: () => `Floor ${randomNum(1, 50)}`,
  room: () => `Room ${randomNum(100, 999)}`
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { contactGenerators };
} else if (typeof window !== 'undefined') {
  window.contactGenerators = contactGenerators;
  window.sharedLocationData = sharedLocationData;
}
