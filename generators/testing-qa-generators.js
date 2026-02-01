// Testing & QA generators
const testingQAGenerators = {
  testCaseId: () => `TC_${randomNum(1000, 9999)}`,
  
  testSuite: () => randomChoice([
    'Login Functionality',
    'User Registration',
    'Payment Processing',
    'Search Features',
    'Navigation Tests',
    'Form Validation',
    'API Integration',
    'Database Operations',
    'Security Tests',
    'Performance Tests'
  ]),

  testScenario: () => randomChoice([
    'Valid user login with correct credentials',
    'Invalid login attempt with wrong password',
    'Registration with valid email format',
    'Payment with valid credit card',
    'Search with special characters',
    'Form submission with empty fields',
    'API response validation',
    'Database connection timeout',
    'SQL injection prevention',
    'Load testing with 1000 users'
  ]),

  testStatus: () => randomChoice(['Pass', 'Fail', 'Blocked', 'Not Executed', 'In Progress', 'Skipped']),
  
  bugId: () => `BUG_${randomNum(10000, 99999)}`,
  
  severity: () => randomChoice(['Critical', 'High', 'Medium', 'Low', 'Trivial']),
  
  priority: () => randomChoice(['P1 - Critical', 'P2 - High', 'P3 - Medium', 'P4 - Low', 'P5 - Trivial']),
  
  testEnvironment: () => randomChoice([
    'Development',
    'Testing',
    'Staging',
    'Pre-Production',
    'Production',
    'UAT',
    'Integration',
    'Local'
  ]),

  browserVersion: () => {
    const browsers = [
      'Chrome 120.0.6099.109',
      'Firefox 121.0.1',
      'Safari 17.2.1',
      'Edge 120.0.2210.77',
      'Opera 106.0.4998.19'
    ];
    return randomChoice(browsers);
  },

  operatingSystem: () => randomChoice([
    'Windows 11',
    'Windows 10',
    'macOS Sonoma 14.2',
    'macOS Ventura 13.6',
    'Ubuntu 22.04 LTS',
    'iOS 17.2',
    'Android 14',
    'Android 13'
  ]),

  testData: () => `TestData_Set_${randomNum(1, 100)}`,
  
  expectedResult: () => randomChoice([
    'User successfully logged in',
    'Error message displayed',
    'Form submitted successfully',
    'Payment processed',
    'Search results displayed',
    'Validation error shown',
    'API returns 200 status',
    'Database record created',
    'Access denied message',
    'Page loads within 3 seconds'
  ]),

  actualResult: () => randomChoice([
    'User successfully logged in',
    'Error message displayed',
    'Form submitted successfully',
    'Payment failed',
    'No search results',
    'Validation passed incorrectly',
    'API returns 500 error',
    'Database timeout',
    'Unauthorized access granted',
    'Page loads in 8 seconds'
  ]),

  testExecutor: () => randomChoice([
    'Ahmed Al-Tester',
    'Fatima QA-Engineer',
    'Omar Test-Lead',
    'Nora Automation-Tester',
    'Khalid Manual-Tester',
    'Automated Test Suite',
    'Selenium Grid',
    'CI/CD Pipeline'
  ]),

  executionTime: () => `${randomNum(1, 300)} seconds`,
  
  testType: () => randomChoice([
    'Functional Testing',
    'Integration Testing',
    'Unit Testing',
    'System Testing',
    'Acceptance Testing',
    'Regression Testing',
    'Smoke Testing',
    'Sanity Testing',
    'Performance Testing',
    'Security Testing',
    'Usability Testing',
    'API Testing'
  ])
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testingQAGenerators };
} else if (typeof window !== 'undefined') {
  window.testingQAGenerators = testingQAGenerators;
}
