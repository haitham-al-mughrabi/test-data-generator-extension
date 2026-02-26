// Popup script - runs in extension popup
document.addEventListener('DOMContentLoaded', function() {
  function syncPageMode() {
    const isFullPage = window.innerWidth > 820 || window.innerHeight > 820;
    document.body.classList.toggle('dg-fullpage', isFullPage);
  }

  syncPageMode();
  window.addEventListener('resize', syncPageMode);

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
