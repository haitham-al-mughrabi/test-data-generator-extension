console.log('typeof module:', typeof module);
console.log('typeof window:', typeof window);

// Simulate browser environment
global.window = global;

console.log('After setting global.window:');
console.log('typeof module:', typeof module);
console.log('typeof window:', typeof window);

const testObj = { test: 'value' };

if (typeof module !== 'undefined' && module.exports) {
  console.log('Using module.exports');
  module.exports = { testObj };
} else if (typeof window !== 'undefined') {
  console.log('Using window assignment');
  window.testObj = testObj;
} else {
  console.log('No export method available');
}

console.log('Final result:');
console.log('module.exports:', module.exports);
console.log('window.testObj:', window.testObj);