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
}

// Initialize immediately
initGenerators();

// Also initialize after a delay to catch late-loading modules
setTimeout(initGenerators, 100);
setTimeout(initGenerators, 500);
