// Sizes converter and generator
const sizesGenerators = {
  // Clothing sizes
  clothingSize: () => {
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    return randomChoice(sizes);
  },

  clothingSizeNumeric: () => {
    const sizes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26];
    return randomChoice(sizes);
  },

  clothingSizeEU: () => {
    const sizes = [32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56];
    return randomChoice(sizes);
  },

  // Shoe sizes
  shoeSize: () => {
    const sizes = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15];
    return randomChoice(sizes);
  },

  shoeSizeEU: () => {
    const sizes = [35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47];
    return randomChoice(sizes);
  },

  shoeSizeUK: () => {
    const sizes = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13];
    return randomChoice(sizes);
  },

  // Hat sizes
  hatSize: () => {
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    return randomChoice(sizes);
  },

  hatSizeNumeric: () => {
    const sizes = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62];
    return randomChoice(sizes);
  },

  // Ring sizes
  ringSize: () => {
    const sizes = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13];
    return randomChoice(sizes);
  },

  // Conversions
  shoeSizeConversion: (size, fromSystem = 'US', toSystem = 'EU') => {
    const conversions = {
      'US_to_EU': { 5: 35, 6: 36, 7: 37, 8: 38, 9: 39, 10: 40, 11: 41, 12: 42, 13: 43, 14: 44, 15: 45 },
      'US_to_UK': { 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: 12, 15: 13 },
      'EU_to_US': { 35: 5, 36: 6, 37: 7, 38: 8, 39: 9, 40: 10, 41: 11, 42: 12, 43: 13, 44: 14, 45: 15 },
      'EU_to_UK': { 35: 3, 36: 4, 37: 5, 38: 6, 39: 7, 40: 8, 41: 9, 42: 10, 43: 11, 44: 12, 45: 13 },
      'UK_to_US': { 3: 5, 4: 6, 5: 7, 6: 8, 7: 9, 8: 10, 9: 11, 10: 12, 11: 13, 12: 14, 13: 15 },
      'UK_to_EU': { 3: 35, 4: 36, 5: 37, 6: 38, 7: 39, 8: 40, 9: 41, 10: 42, 11: 43, 12: 44, 13: 45 }
    };
    
    const key = `${fromSystem}_to_${toSystem}`;
    if (conversions[key] && conversions[key][size]) {
      return conversions[key][size];
    }
    return null;
  },

  clothingSizeConversion: (size, fromSystem = 'US', toSystem = 'EU') => {
    const conversions = {
      'US_to_EU': { 'XS': 32, 'S': 34, 'M': 36, 'L': 38, 'XL': 40, 'XXL': 42, 'XXXL': 44 },
      'US_to_UK': { 'XS': 6, 'S': 8, 'M': 10, 'L': 12, 'XL': 14, 'XXL': 16, 'XXXL': 18 },
      'EU_to_US': { 32: 'XS', 34: 'S', 36: 'M', 38: 'L', 40: 'XL', 42: 'XXL', 44: 'XXXL' },
      'EU_to_UK': { 32: 6, 34: 8, 36: 10, 38: 12, 40: 14, 42: 16, 44: 18 },
      'UK_to_US': { 6: 'XS', 8: 'S', 10: 'M', 12: 'L', 14: 'XL', 16: 'XXL', 18: 'XXXL' },
      'UK_to_EU': { 6: 32, 8: 34, 10: 36, 12: 38, 14: 40, 16: 42, 18: 44 }
    };
    
    const key = `${fromSystem}_to_${toSystem}`;
    if (conversions[key] && conversions[key][size]) {
      return conversions[key][size];
    }
    return null;
  },

  // Measurements
  height: (unit = 'cm') => {
    let height;
    if (unit === 'cm') {
      height = Math.floor(Math.random() * 50) + 150; // 150-200 cm
    } else if (unit === 'inches') {
      height = Math.floor(Math.random() * 20) + 59; // 59-79 inches
    } else if (unit === 'feet') {
      const feet = Math.floor(Math.random() * 2) + 5;
      const inches = Math.floor(Math.random() * 12);
      return `${feet}'${inches}"`;
    }
    return height;
  },

  weight: (unit = 'kg') => {
    let weight;
    if (unit === 'kg') {
      weight = Math.floor(Math.random() * 80) + 50; // 50-130 kg
    } else if (unit === 'lbs') {
      weight = Math.floor(Math.random() * 176) + 110; // 110-286 lbs
    }
    return weight;
  },

  chest: (unit = 'cm') => {
    let chest;
    if (unit === 'cm') {
      chest = Math.floor(Math.random() * 40) + 80; // 80-120 cm
    } else if (unit === 'inches') {
      chest = Math.floor(Math.random() * 16) + 32; // 32-48 inches
    }
    return chest;
  },

  waist: (unit = 'cm') => {
    let waist;
    if (unit === 'cm') {
      waist = Math.floor(Math.random() * 40) + 60; // 60-100 cm
    } else if (unit === 'inches') {
      waist = Math.floor(Math.random() * 16) + 24; // 24-40 inches
    }
    return waist;
  },

  inseam: (unit = 'cm') => {
    let inseam;
    if (unit === 'cm') {
      inseam = Math.floor(Math.random() * 20) + 70; // 70-90 cm
    } else if (unit === 'inches') {
      inseam = Math.floor(Math.random() * 8) + 28; // 28-36 inches
    }
    return inseam;
  },

  // Screen sizes
  screenSize: () => {
    const sizes = ['13"', '14"', '15"', '15.6"', '17"', '21.5"', '24"', '27"', '32"', '43"', '55"', '65"', '75"', '85"'];
    return randomChoice(sizes);
  },

  screenResolution: () => {
    const resolutions = ['1024x768', '1280x720', '1366x768', '1440x900', '1600x900', '1920x1080', '2560x1440', '3840x2160', '7680x4320'];
    return randomChoice(resolutions);
  },

  // Paper sizes
  paperSize: () => {
    const sizes = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'B4', 'B5', 'Letter', 'Legal', 'Tabloid'];
    return randomChoice(sizes);
  },

  paperSizeDimensions: (size = 'A4') => {
    const dimensions = {
      'A0': { mm: '841 × 1189', inches: '33.1 × 46.8' },
      'A1': { mm: '594 × 841', inches: '23.4 × 33.1' },
      'A2': { mm: '420 × 594', inches: '16.5 × 23.4' },
      'A3': { mm: '297 × 420', inches: '11.7 × 16.5' },
      'A4': { mm: '210 × 297', inches: '8.3 × 11.7' },
      'A5': { mm: '148 × 210', inches: '5.8 × 8.3' },
      'A6': { mm: '105 × 148', inches: '4.1 × 5.8' },
      'Letter': { mm: '216 × 279', inches: '8.5 × 11' },
      'Legal': { mm: '216 × 356', inches: '8.5 × 14' },
      'Tabloid': { mm: '279 × 432', inches: '11 × 17' }
    };
    return dimensions[size] || dimensions['A4'];
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = sizesGenerators;
} else if (typeof window !== 'undefined') {
  window.sizesGenerators = sizesGenerators;
}
