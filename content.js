// Content script - injects the data generator into web pages
// Load all required scripts
const scripts = [
  'data/saudi-data.js',
  'data/names-data.js',
  'utils/helpers.js',
  'generators/personal-generators.js',
  'generators/enhanced-personal-generators.js',
  'generators/file-media-generators.js',
  'generators/document-types-generators.js',
  'generators/image-url-generators.js',
  'generators/color-generators.js',
  'generators/contact-generators.js',
  'generators/work-generators.js',
  'generators/cryptocurrency-generators.js',
  'generators/finance-generators.js',
  'generators/datetime-generators.js',
  'generators/other-generators.js',
  'generators/education-generators.js',
  'generators/healthcare-generators.js',
  'generators/vehicle-generators.js',
  'generators/automotive-generators.js',
  'generators/saudi-government-generators.js',
  'generators/ecommerce-generators.js',
  'generators/social-media-generators.js',
  'generators/technology-generators.js',
  'generators/iot-smarthome-generators.js',
  'generators/gaming-generators.js',
  'generators/travel-generators.js',
  'generators/food-restaurant-generators.js',
  'generators/sports-fitness-generators.js',
  'generators/real-estate-generators.js',
  'generators/entertainment-generators.js',
  'generators/media-entertainment-generators.js',
  'generators/science-research-generators.js',
  'generators/legal-law-generators.js',
  'generators/fashion-beauty-generators.js',
  'generators/agriculture-generators.js',
  'generators/logistics-shipping-generators.js',
  'generators/energy-utilities-generators.js',
  'generators/emoji-generators.js',
  'generators/weather-environment-generators.js',
  'generators/random-text-generators.js',
  'generators/random-values-generators.js',
  'generators/uuid-id-generators.js',
  'generators/banking-finance-generators.js',
  'generators/insurance-generators.js',
  'generators/manufacturing-generators.js',
  'generators/telecommunications-generators.js',
  'generators/construction-generators.js',
  'generators/testing-qa-generators.js',
  'generators/edge-cases-generators.js',
  'generators/performance-testing-generators.js',
  'generators/security-testing-generators.js',
  'generators/email-testing-generators.js',
  'generators/password-testing-generators.js',
  'generators/phone-testing-generators.js',
  'generators/missing-generators.js',
  'shared.js',
  'ui/ui-generator.js',
  'injected.js',
  'context-menu.js'
];

let loadedScripts = 0;

function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(src);
  script.onload = function() {
    this.remove();
    if (callback) callback();
  };
  script.onerror = function() {
    console.log('Failed to load:', src);
    this.remove();
    if (callback) callback();
  };
  (document.head || document.documentElement).appendChild(script);
}

// Load scripts sequentially
function loadNextScript() {
  if (loadedScripts < scripts.length) {
    loadScript(scripts[loadedScripts], () => {
      loadedScripts++;
      loadNextScript();
    });
  }
}

loadNextScript();

// Content script for handling context menu messages
let lastClickedElement = null;

// Track the last clicked input field
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.contentEditable === 'true') {
    lastClickedElement = e.target;
  }
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fillField' && lastClickedElement) {
    try {
      // Wait for generators to be available
      const checkAndFill = () => {
        if (window.generators && window.generators[message.dataType]) {
          const value = window.generators[message.dataType]();
          
          if (lastClickedElement.tagName === 'INPUT' || lastClickedElement.tagName === 'TEXTAREA') {
            // Replace entire field value for generator actions.
            const newValue = String(value ?? '');
            lastClickedElement.value = newValue;
            lastClickedElement.setSelectionRange(newValue.length, newValue.length);
            
            lastClickedElement.dispatchEvent(new Event('input', { bubbles: true }));
            lastClickedElement.dispatchEvent(new Event('change', { bubbles: true }));
          } else if (lastClickedElement.contentEditable === 'true') {
            lastClickedElement.textContent = value;
          }
          lastClickedElement = null;
        } else {
          // Retry after a short delay if generators aren't ready
          setTimeout(checkAndFill, 100);
        }
      };
      checkAndFill();
    } catch (error) {
      console.log('Test Data Generator: Error filling field', error);
    }
  }
  sendResponse({success: true});
});
