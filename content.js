// Content script - injects the data generator into web pages
// Load all required scripts
const scripts = [
  'data/saudi-data.js',
  'data/names-data.js',
  'utils/helpers.js',
  'shared.js',
  'generators/personal-generators.js',
  'generators/contact-generators.js',
  'generators/work-generators.js',
  'generators/finance-generators.js',
  'generators/other-generators.js',
  'generators/datetime-generators.js',
  'generators/random-values-generators.js',
  'ui/ui-generator.js',
  'injected.js'
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
      // Wait for DataGenerator to be available
      const checkAndFill = () => {
        if (window.DataGenerator && window.DataGenerator[message.dataType]) {
          const value = window.DataGenerator[message.dataType]();
          
          if (lastClickedElement.tagName === 'INPUT' || lastClickedElement.tagName === 'TEXTAREA') {
            lastClickedElement.value = value;
            lastClickedElement.dispatchEvent(new Event('input', { bubbles: true }));
            lastClickedElement.dispatchEvent(new Event('change', { bubbles: true }));
          } else if (lastClickedElement.contentEditable === 'true') {
            lastClickedElement.textContent = value;
          }
          lastClickedElement = null;
        } else {
          // Retry after a short delay if DataGenerator isn't ready
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
