// Combine all modular generators into one object
window.generators = {};

// Wait for all generators to load
function initGenerators() {
  if (window.personalGenerators) Object.assign(window.generators, window.personalGenerators);
  if (window.contactGenerators) Object.assign(window.generators, window.contactGenerators);
  if (window.workGenerators) Object.assign(window.generators, window.workGenerators);
  if (window.financeGenerators) Object.assign(window.generators, window.financeGenerators);
  if (window.dateTimeGenerators) Object.assign(window.generators, window.dateTimeGenerators);
  if (window.otherGenerators) Object.assign(window.generators, window.otherGenerators);
  if (window.educationGenerators) Object.assign(window.generators, window.educationGenerators);
  if (window.healthcareGenerators) Object.assign(window.generators, window.healthcareGenerators);
  if (window.vehicleGenerators) Object.assign(window.generators, window.vehicleGenerators);
  if (window.saudiGovernmentGenerators) Object.assign(window.generators, window.saudiGovernmentGenerators);
  if (window.ecommerceGenerators) Object.assign(window.generators, window.ecommerceGenerators);
  if (window.socialMediaGenerators) Object.assign(window.generators, window.socialMediaGenerators);
  if (window.technologyGenerators) Object.assign(window.generators, window.technologyGenerators);
  if (window.gamingGenerators) Object.assign(window.generators, window.gamingGenerators);
  if (window.travelGenerators) Object.assign(window.generators, window.travelGenerators);
  if (window.foodRestaurantGenerators) Object.assign(window.generators, window.foodRestaurantGenerators);
  if (window.sportsFitnessGenerators) Object.assign(window.generators, window.sportsFitnessGenerators);
  if (window.realEstateGenerators) Object.assign(window.generators, window.realEstateGenerators);
  if (window.entertainmentGenerators) Object.assign(window.generators, window.entertainmentGenerators);
  if (window.scienceResearchGenerators) Object.assign(window.generators, window.scienceResearchGenerators);
  if (window.legalLawGenerators) Object.assign(window.generators, window.legalLawGenerators);
  if (window.fashionBeautyGenerators) Object.assign(window.generators, window.fashionBeautyGenerators);
  if (window.agricultureGenerators) Object.assign(window.generators, window.agricultureGenerators);
  if (window.logisticsShippingGenerators) Object.assign(window.generators, window.logisticsShippingGenerators);
  if (window.energyUtilitiesGenerators) Object.assign(window.generators, window.energyUtilitiesGenerators);
  if (window.randomTextGenerators) Object.assign(window.generators, window.randomTextGenerators);
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
}

// Initialize immediately
initGenerators();

// Also initialize after a delay to catch late-loading modules
setTimeout(initGenerators, 100);
setTimeout(initGenerators, 500);
