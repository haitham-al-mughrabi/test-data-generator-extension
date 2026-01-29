// Content script - injects the data generator into web pages
// First inject shared-new.js (modular version)
const sharedScript = document.createElement('script');
sharedScript.src = chrome.runtime.getURL('shared-new.js');
sharedScript.onload = function() {
  // Then inject the UI script
  const injectedScript = document.createElement('script');
  injectedScript.src = chrome.runtime.getURL('injected.js');
  injectedScript.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(injectedScript);
  this.remove();
};
(document.head || document.documentElement).appendChild(sharedScript);

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
