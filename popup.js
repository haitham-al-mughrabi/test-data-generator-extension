// Popup script - runs in extension popup
document.addEventListener('DOMContentLoaded', function() {
  // Wait for createDataGeneratorUI to be available
  function initializePopup() {
    if (typeof createDataGeneratorUI === 'function') {
      createDataGeneratorUI('popup-container');
    } else {
      setTimeout(initializePopup, 50);
    }
  }
  
  initializePopup();
});
