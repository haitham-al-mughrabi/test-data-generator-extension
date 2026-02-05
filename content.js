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
            // Insert at cursor position without removing existing content
            const start = lastClickedElement.selectionStart || 0;
            const end = lastClickedElement.selectionEnd || 0;
            const currentValue = lastClickedElement.value || '';
            
            // Insert the new value at cursor position
            const newValue = currentValue.substring(0, start) + value + currentValue.substring(end);
            lastClickedElement.value = newValue;
            
            // Set cursor position after inserted text
            const newCursorPos = start + value.length;
            lastClickedElement.setSelectionRange(newCursorPos, newCursorPos);
            
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
