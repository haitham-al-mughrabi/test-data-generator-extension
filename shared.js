// Utility functions
if (typeof window.randomChoice === 'undefined') {
  window.randomChoice = function(array) {
    return array[Math.floor(Math.random() * array.length)];
  };
}

if (typeof window.randomInt === 'undefined') {
  window.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
}

if (typeof window.randomNum === 'undefined') {
  window.randomNum = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
}

if (typeof window.randomFloat === 'undefined') {
  window.randomFloat = function(min, max, decimals = 2) {
    return (Math.random() * (max - min) + min).toFixed(decimals);
  };
}

if (typeof window.randomDate === 'undefined') {
  window.randomDate = function(startYear, endYear) {
    // Handle both Date objects and year numbers
    let start, end;
    if (startYear instanceof Date) {
      start = startYear;
      end = endYear;
    } else {
      start = new Date(startYear, 0, 1);
      end = new Date(endYear, 11, 31);
    }
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };
}

if (typeof window.generatePaymentCard === 'undefined') {
  window.generatePaymentCard = function() {
    const prefixes = ['4', '5', '6'];
    const prefix = window.randomChoice(prefixes);
    let card = prefix;
    for (let i = 0; i < 15; i++) {
      card += window.randomNum(0, 9);
    }
    return card.match(/.{1,4}/g).join(' ');
  };
}

// Combine all modular generators into one object
window.generators = {};

// Wait for all generators to load
function initGenerators() {
  if (window.personalGenerators) Object.assign(window.generators, window.personalGenerators);
  if (window.enhancedPersonalGenerators) Object.assign(window.generators, window.enhancedPersonalGenerators);
  if (window.contactGenerators) Object.assign(window.generators, window.contactGenerators);
  if (window.workGenerators) Object.assign(window.generators, window.workGenerators);
  if (window.cryptocurrencyGenerators) Object.assign(window.generators, window.cryptocurrencyGenerators);
  if (window.financeGenerators) Object.assign(window.generators, window.financeGenerators);
  if (window.dateTimeGenerators) Object.assign(window.generators, window.dateTimeGenerators);
  if (window.otherGenerators) Object.assign(window.generators, window.otherGenerators);
  if (window.educationGenerators) Object.assign(window.generators, window.educationGenerators);
  if (window.healthcareGenerators) Object.assign(window.generators, window.healthcareGenerators);
  if (window.automotiveGenerators) Object.assign(window.generators, window.automotiveGenerators);
  if (window.vehicleGenerators) Object.assign(window.generators, window.vehicleGenerators);
  if (window.saudiGovernmentGenerators) Object.assign(window.generators, window.saudiGovernmentGenerators);
  if (window.ecommerceGenerators) Object.assign(window.generators, window.ecommerceGenerators);
  if (window.socialMediaGenerators) Object.assign(window.generators, window.socialMediaGenerators);
  if (window.uuidIdGenerators) Object.assign(window.generators, window.uuidIdGenerators);
  if (window.iotSmartHomeGenerators) Object.assign(window.generators, window.iotSmartHomeGenerators);
  if (window.technologyGenerators) Object.assign(window.generators, window.technologyGenerators);
  if (window.mediaEntertainmentGenerators) Object.assign(window.generators, window.mediaEntertainmentGenerators);
  if (window.gamingGenerators) Object.assign(window.generators, window.gamingGenerators);
  if (window.travelGenerators) Object.assign(window.generators, window.travelGenerators);
  if (window.foodRestaurantGenerators) Object.assign(window.generators, window.foodRestaurantGenerators);
  if (window.sportsFitnessGenerators) Object.assign(window.generators, window.sportsFitnessGenerators);
  if (window.realEstateGenerators) Object.assign(window.generators, window.realEstateGenerators);
  if (window.entertainmentGenerators) Object.assign(window.generators, window.entertainmentGenerators);
  if (window.scienceResearchGenerators) Object.assign(window.generators, window.scienceResearchGenerators);
  if (window.legalLawGenerators) Object.assign(window.generators, window.legalLawGenerators);
  if (window.fashionBeautyGenerators) Object.assign(window.generators, window.fashionBeautyGenerators);
  if (window.emojiGenerators) Object.assign(window.generators, window.emojiGenerators);
  if (window.weatherEnvironmentGenerators) Object.assign(window.generators, window.weatherEnvironmentGenerators);
  if (window.agricultureGenerators) Object.assign(window.generators, window.agricultureGenerators);
  if (window.logisticsShippingGenerators) Object.assign(window.generators, window.logisticsShippingGenerators);
  if (window.energyUtilitiesGenerators) Object.assign(window.generators, window.energyUtilitiesGenerators);
  if (window.randomTextGenerators) Object.assign(window.generators, window.randomTextGenerators);
  if (window.randomValuesGenerators) Object.assign(window.generators, window.randomValuesGenerators);
  if (window.bankingFinanceGenerators) Object.assign(window.generators, window.bankingFinanceGenerators);
  if (window.insuranceGenerators) Object.assign(window.generators, window.insuranceGenerators);
  if (window.manufacturingGenerators) Object.assign(window.generators, window.manufacturingGenerators);
  if (window.telecommunicationsGenerators) Object.assign(window.generators, window.telecommunicationsGenerators);
  if (window.constructionGenerators) Object.assign(window.generators, window.constructionGenerators);
  if (window.testingQAGenerators) Object.assign(window.generators, window.testingQAGenerators);
  if (window.edgeCasesGenerators) Object.assign(window.generators, window.edgeCasesGenerators);
  if (window.performanceTestingGenerators) Object.assign(window.generators, window.performanceTestingGenerators);
  if (window.securityTestingGenerators) Object.assign(window.generators, window.securityTestingGenerators);
  if (window.emailTestingGenerators) Object.assign(window.generators, window.emailTestingGenerators);
  if (window.passwordTestingGenerators) Object.assign(window.generators, window.passwordTestingGenerators);
  if (window.phoneTestingGenerators) Object.assign(window.generators, window.phoneTestingGenerators);
  
  // New enhanced generators
  if (window.fileMediaGenerators) Object.assign(window.generators, window.fileMediaGenerators);
  if (window.documentTypesGenerators) Object.assign(window.generators, window.documentTypesGenerators);
  if (window.imageUrlGenerators) Object.assign(window.generators, window.imageUrlGenerators);
  if (window.colorGenerators) Object.assign(window.generators, window.colorGenerators);
  if (window.currenciesGenerators) Object.assign(window.generators, window.currenciesGenerators);
  if (window.sizesGenerators) Object.assign(window.generators, window.sizesGenerators);
  
  // Missing generators
  if (window.missingGenerators) Object.assign(window.generators, window.missingGenerators);
}

// Initialize immediately
initGenerators();

// Also initialize after a delay to catch late-loading modules
setTimeout(initGenerators, 100);
setTimeout(initGenerators, 500);
