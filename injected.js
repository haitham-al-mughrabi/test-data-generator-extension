// Injected script - runs in web pages
(function() {
  // Avoid duplicate injection
  if (window.dataGeneratorInjected) return;
  window.dataGeneratorInjected = true;

  // Context menu for direct input filling
  let contextMenu = null;
  let targetInput = null;

  // Smart field detection
  function detectFieldType(input) {
    const name = (input.name || '').toLowerCase();
    const id = (input.id || '').toLowerCase();
    const placeholder = (input.placeholder || '').toLowerCase();
    const type = (input.type || '').toLowerCase();
    const className = (input.className || '').toLowerCase();
    const label = getFieldLabel(input);
    
    const allText = `${name} ${id} ${placeholder} ${type} ${className} ${label}`.toLowerCase();
    
    // Field detection patterns
    const patterns = [
      { pattern: /first.*name|fname|given.*name/i, generators: ['firstName', 'firstNameAr'] },
      { pattern: /last.*name|lname|family.*name|surname/i, generators: ['lastName', 'lastNameAr'] },
      { pattern: /full.*name|name|الاسم/i, generators: ['fullName', 'fullNameAr'] },
      { pattern: /email|mail|بريد/i, generators: ['email', 'validEmail'] },
      { pattern: /phone|mobile|cell|هاتف|جوال/i, generators: ['mobileNumber', 'customPhone'] },
      { pattern: /address|عنوان/i, generators: ['address', 'addressAr'] },
      { pattern: /city|مدينة/i, generators: ['city', 'cityAr'] },
      { pattern: /saudi.*id|national.*id|هوية/i, generators: ['saudiId'] },
      { pattern: /iqama|إقامة/i, generators: ['iqamaNumber'] },
      { pattern: /company|employer|شركة/i, generators: ['company'] },
      { pattern: /job|position|title|وظيفة/i, generators: ['jobTitle', 'jobTitleAr'] },
      { pattern: /iban|حساب.*بنكي/i, generators: ['iban'] },
      { pattern: /card|credit|visa|master|بطاقة/i, generators: ['creditCard'] },
      { pattern: /password|pass|كلمة.*مرور/i, generators: ['strongPassword', 'customPassword'] },
      { pattern: /date|تاريخ/i, generators: ['date', 'hijriDate'] },
      { pattern: /age|عمر/i, generators: ['age'] }
    ];
    
    const suggestions = [];
    patterns.forEach(pattern => {
      if (pattern.pattern.test(allText)) {
        suggestions.push(...pattern.generators);
      }
    });
    
    return [...new Set(suggestions)].slice(0, 3);
  }
  
  function getFieldLabel(input) {
    if (input.labels && input.labels.length > 0) {
      return input.labels[0].textContent || '';
    }
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (label) return label.textContent || '';
    const parent = input.parentElement;
    if (parent) {
      const label = parent.querySelector('label');
      if (label) return label.textContent || '';
    }
    return '';
  }

  // Create context menu
  function createContextMenu() {
    const menu = document.createElement('div');
    menu.id = 'dg-context-menu';
    menu.style.cssText = `
      position: fixed;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      display: none;
      min-width: 250px;
      max-height: 400px;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    `;
    
    // Add search input
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
      padding: 8px;
      border-bottom: 1px solid #e2e8f0;
      background: #f8fafc;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Search generators...';
    searchInput.style.cssText = `
      width: 100%;
      padding: 6px 8px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      font-size: 12px;
      outline: none;
      box-sizing: border-box;
    `;
    searchContainer.appendChild(searchInput);
    menu.appendChild(searchContainer);
    
    // Create scrollable content area
    const contentArea = document.createElement('div');
    contentArea.style.cssText = `
      max-height: 350px;
      overflow-y: auto;
    `;
    menu.appendChild(contentArea);
    
    // Add standard input actions first
    const standardActions = [
      { label: '✂️ Cut', action: 'cut' },
      { label: '📋 Copy', action: 'copy' },
      { label: '📄 Paste', action: 'paste' },
      { label: '🗑️ Delete', action: 'delete' },
      { label: '🔤 Select All', action: 'selectAll' }
    ];

    standardActions.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'menu-item standard-action';
      itemDiv.style.cssText = `
        padding: 8px 12px;
        cursor: pointer;
        font-size: 12px;
        color: #374151;
        border-bottom: 1px solid #f1f5f9;
        transition: background 0.2s;
      `;
      itemDiv.textContent = item.label;
      itemDiv.addEventListener('mouseenter', () => {
        itemDiv.style.background = '#f0f9ff';
      });
      itemDiv.addEventListener('mouseleave', () => {
        itemDiv.style.background = 'white';
      });
      itemDiv.addEventListener('click', () => {
        executeStandardAction(item.action);
        hideContextMenu();
      });
      contentArea.appendChild(itemDiv);
    });

    // Add separator
    const separator = document.createElement('div');
    separator.className = 'menu-separator';
    separator.style.cssText = `
      height: 1px;
      background: #e2e8f0;
      margin: 4px 0;
    `;
    contentArea.appendChild(separator);

    // Add "Generate Data" header
    const generateHeader = document.createElement('div');
    generateHeader.className = 'menu-header';
    generateHeader.style.cssText = `
      padding: 8px 12px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    `;
    generateHeader.textContent = '🎲 Generate Data';
    contentArea.appendChild(generateHeader);
    
    // Add smart suggestions if available
    const suggestions = detectFieldType(targetInput);
    if (suggestions.length > 0) {
      const suggestionsHeader = document.createElement('div');
      suggestionsHeader.className = 'menu-header';
      suggestionsHeader.style.cssText = `
        padding: 6px 12px;
        background: #e0f2fe;
        border-bottom: 1px solid #b3e5fc;
        font-size: 10px;
        font-weight: 600;
        color: #0277bd;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `;
      suggestionsHeader.textContent = '💡 Smart Suggestions';
      contentArea.appendChild(suggestionsHeader);

      suggestions.forEach(generatorName => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item generator-item smart-suggestion';
        itemDiv.dataset.searchText = generatorName.toLowerCase();
        itemDiv.dataset.generator = generatorName;
        itemDiv.style.cssText = `
          padding: 8px 12px;
          cursor: pointer;
          font-size: 12px;
          color: #0277bd;
          background: #f0f9ff;
          border-bottom: 1px solid #e0f2fe;
          transition: background 0.2s;
          font-weight: 500;
        `;
        itemDiv.textContent = `⭐ ${generatorName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`;
        itemDiv.addEventListener('mouseenter', () => {
          itemDiv.style.background = '#e0f2fe';
        });
        itemDiv.addEventListener('mouseleave', () => {
          itemDiv.style.background = '#f0f9ff';
        });
        itemDiv.addEventListener('click', () => {
          fillInput(generatorName);
          hideContextMenu();
        });
        contentArea.appendChild(itemDiv);
      });

      // Add separator after suggestions
      const suggestionsSeparator = document.createElement('div');
      suggestionsSeparator.className = 'menu-separator';
      suggestionsSeparator.style.cssText = `
        height: 2px;
        background: #e2e8f0;
        margin: 4px 0;
      `;
      contentArea.appendChild(suggestionsSeparator);
    }
    
    // Common data categories
    const categories = [
      { title: 'Personal', items: [
        { label: 'First Name (EN)', generator: 'firstName' },
        { label: 'First Name (AR)', generator: 'firstNameAr' },
        { label: 'Last Name (EN)', generator: 'lastName' },
        { label: 'Last Name (AR)', generator: 'lastNameAr' },
        { label: 'Full Name (EN)', generator: 'fullName' },
        { label: 'Full Name (AR)', generator: 'fullNameAr' },
        { label: 'Age', generator: 'age' },
        { label: 'Gender (EN)', generator: 'gender' },
        { label: 'Gender (AR)', generator: 'genderAr' },
        { label: 'Saudi ID', generator: 'saudiId' },
        { label: 'Iqama Number', generator: 'iqamaNumber' },
        { label: 'Passport Number', generator: 'passportNumber' }
      ]},
      { title: 'Contact', items: [
        { label: 'Email', generator: 'email' },
        { label: 'Mobile Number', generator: 'mobileNumber' },
        { label: 'Landline Number', generator: 'landlineNumber' },
        { label: 'WhatsApp Number', generator: 'whatsappNumber' },
        { label: 'Address (EN)', generator: 'address' },
        { label: 'Address (AR)', generator: 'addressAr' },
        { label: 'City (EN)', generator: 'city' },
        { label: 'City (AR)', generator: 'cityAr' },
        { label: 'Postal Code', generator: 'postalCode' },
        { label: 'National Address', generator: 'nationalAddress' }
      ]},
      { title: 'Business', items: [
        { label: 'Company', generator: 'company' },
        { label: 'Job Title (EN)', generator: 'jobTitle' },
        { label: 'Job Title (AR)', generator: 'jobTitleAr' },
        { label: 'Work Email', generator: 'workEmail' },
        { label: 'Work Phone', generator: 'workPhone' },
        { label: 'Employee ID', generator: 'employeeId' },
        { label: 'Salary', generator: 'salary' },
        { label: 'Department (EN)', generator: 'department' },
        { label: 'Department (AR)', generator: 'departmentAr' }
      ]},
      { title: 'Finance', items: [
        { label: 'IBAN', generator: 'iban' },
        { label: 'Bank Name (EN)', generator: 'bankName' },
        { label: 'Bank Name (AR)', generator: 'bankNameAr' },
        { label: 'Account Number', generator: 'accountNumber' },
        { label: 'Credit Card', generator: 'creditCard' },
        { label: 'CVV', generator: 'cvv' },
        { label: 'Transaction ID', generator: 'transactionId' }
      ]},
      { title: 'Government', items: [
        { label: 'Commercial Register', generator: 'commercialRegister' },
        { label: 'Tax Number (VAT)', generator: 'taxNumber' },
        { label: 'Municipal License', generator: 'municipalLicense' },
        { label: 'Social Insurance', generator: 'socialInsurance' },
        { label: 'Zakat Number', generator: 'zakat' },
        { label: 'Customs Code', generator: 'customsCode' }
      ]},
      { title: 'Random Values', items: [
        { label: 'Custom Random', generator: 'customRandom' },
        { label: 'Random Numbers', generator: 'randomNumbers' },
        { label: 'Random Letters', generator: 'randomLetters' },
        { label: 'Random Uppercase', generator: 'randomUppercase' },
        { label: 'Random Lowercase', generator: 'randomLowercase' },
        { label: 'Random Arabic Letters', generator: 'randomArabicLetters' },
        { label: 'Random Mixed', generator: 'randomMixed' },
        { label: 'Random Hex', generator: 'randomHex' }
      ]},
      { title: 'Date & Time', items: [
        { label: 'Date', generator: 'date' },
        { label: 'Time', generator: 'time' },
        { label: 'DateTime', generator: 'datetime' },
        { label: 'Timestamp', generator: 'timestamp' },
        { label: 'Hijri Date', generator: 'hijriDate' },
        { label: 'Day of Week (EN)', generator: 'dayOfWeek' },
        { label: 'Day of Week (AR)', generator: 'dayOfWeekAr' }
      ]},
      { title: 'Testing', items: [
        { label: 'Valid Email', generator: 'validEmail' },
        { label: 'Invalid Email', generator: 'invalidEmail' },
        { label: 'Strong Password', generator: 'strongPassword' },
        { label: 'Weak Password', generator: 'weakPassword' },
        { label: 'UUID', generator: 'uuid' },
        { label: 'Hash', generator: 'hash' },
        { label: 'Token', generator: 'token' }
      ]},
      { title: 'Other', items: [
        { label: 'Boolean', generator: 'boolean' },
        { label: 'Number', generator: 'number' },
        { label: 'Color', generator: 'color' },
        { label: 'URL', generator: 'url' },
        { label: 'IP Address', generator: 'ipAddress' },
        { label: 'MAC Address', generator: 'macAddress' },
        { label: 'User Agent', generator: 'userAgent' },
        { label: 'UUID', generator: 'uuid' },
        { label: 'GUID', generator: 'guid' },
        { label: 'Hash', generator: 'hash' },
        { label: 'Token', generator: 'token' },
        { label: 'Device ID', generator: 'deviceId' },
        { label: 'Session ID', generator: 'sessionId' },
        { label: 'API Key', generator: 'apiKey' }
      ]},
      { title: 'Saudi Services', items: [
        { label: 'Hajj ID', generator: 'hajjId' },
        { label: 'Umrah ID', generator: 'umrahId' },
        { label: 'Work Permit', generator: 'workPermit' },
        { label: 'Residency ID', generator: 'residencyId' },
        { label: 'Driving License', generator: 'drivingLicense' },
        { label: 'Vehicle Registration', generator: 'vehicleRegistration' },
        { label: 'Istmara', generator: 'istmara' },
        { label: 'Traffic Violation', generator: 'trafficViolation' },
        { label: 'Health Card', generator: 'healthCard' },
        { label: 'Medical Record', generator: 'medicalRecord' },
        { label: 'Vaccination Certificate', generator: 'vaccinationCertificate' },
        { label: 'COVID Certificate', generator: 'covidCertificate' }
      ]},
      { title: 'Banking Extended', items: [
        { label: 'Bank Branch (EN)', generator: 'bankBranch' },
        { label: 'Bank Branch (AR)', generator: 'bankBranchAr' },
        { label: 'Routing Number', generator: 'routingNumber' },
        { label: 'Sort Code', generator: 'sortCode' },
        { label: 'BIC/SWIFT Code', generator: 'bic' },
        { label: 'Account Type (EN)', generator: 'accountType' },
        { label: 'Account Type (AR)', generator: 'accountTypeAr' },
        { label: 'Check Number', generator: 'checkNumber' },
        { label: 'Loan Number', generator: 'loanNumber' },
        { label: 'Credit Score', generator: 'creditScore' },
        { label: 'Interest Rate', generator: 'interestRate' },
        { label: 'Exchange Rate', generator: 'exchangeRate' },
        { label: 'Investment Amount', generator: 'investmentAmount' }
      ]},
      { title: 'Insurance', items: [
        { label: 'Policy Number', generator: 'policyNumber' },
        { label: 'Insurance Company (EN)', generator: 'insuranceCompany' },
        { label: 'Insurance Company (AR)', generator: 'insuranceCompanyAr' },
        { label: 'Policy Type (EN)', generator: 'policyType' },
        { label: 'Policy Type (AR)', generator: 'policyTypeAr' },
        { label: 'Premium Amount', generator: 'premiumAmount' },
        { label: 'Coverage Amount', generator: 'coverageAmount' },
        { label: 'Deductible', generator: 'deductible' },
        { label: 'Claim Number', generator: 'claimNumber' },
        { label: 'Agent Name (EN)', generator: 'agentName' },
        { label: 'Agent Name (AR)', generator: 'agentNameAr' },
        { label: 'Policy Start Date', generator: 'policyStartDate' },
        { label: 'Policy End Date', generator: 'policyEndDate' },
        { label: 'Beneficiary (EN)', generator: 'beneficiary' },
        { label: 'Beneficiary (AR)', generator: 'beneficiaryAr' }
      ]},
      { title: 'Manufacturing', items: [
        { label: 'Factory Name (EN)', generator: 'factoryName' },
        { label: 'Factory Name (AR)', generator: 'factoryNameAr' },
        { label: 'Production Line', generator: 'productionLine' },
        { label: 'Batch Number', generator: 'batchNumber' },
        { label: 'Lot Number', generator: 'lotNumber' },
        { label: 'Quality Grade', generator: 'qualityGrade' },
        { label: 'Manufacturing Date', generator: 'manufacturingDate' },
        { label: 'Expiry Date', generator: 'expiryDate' },
        { label: 'Machine ID', generator: 'machineId' },
        { label: 'Operator Name (EN)', generator: 'operatorName' },
        { label: 'Operator Name (AR)', generator: 'operatorNameAr' },
        { label: 'Shift Number', generator: 'shiftNumber' },
        { label: 'Production Quantity', generator: 'productionQuantity' },
        { label: 'Defect Rate', generator: 'defectRate' },
        { label: 'Raw Material (EN)', generator: 'rawMaterial' },
        { label: 'Raw Material (AR)', generator: 'rawMaterialAr' }
      ]},
      { title: 'Telecommunications', items: [
        { label: 'Phone Provider (EN)', generator: 'phoneProvider' },
        { label: 'Phone Provider (AR)', generator: 'phoneProviderAr' },
        { label: 'Plan Type (EN)', generator: 'planType' },
        { label: 'Plan Type (AR)', generator: 'planTypeAr' },
        { label: 'Data Allowance', generator: 'dataAllowance' },
        { label: 'Call Minutes', generator: 'callMinutes' },
        { label: 'SMS Count', generator: 'smsCount' },
        { label: 'Network Type', generator: 'networkType' },
        { label: 'Signal Strength', generator: 'signalStrength' },
        { label: 'Tower Location (EN)', generator: 'towerLocation' },
        { label: 'Tower Location (AR)', generator: 'towerLocationAr' },
        { label: 'IMEI Number', generator: 'imei' },
        { label: 'SIM Card Number', generator: 'simCard' },
        { label: 'Roaming Status (EN)', generator: 'roamingStatus' },
        { label: 'Roaming Status (AR)', generator: 'roamingStatusAr' }
      ]},
      { title: 'Construction', items: [
        { label: 'Project Name (EN)', generator: 'projectName' },
        { label: 'Project Name (AR)', generator: 'projectNameAr' },
        { label: 'Contractor Name (EN)', generator: 'contractorName' },
        { label: 'Contractor Name (AR)', generator: 'contractorNameAr' },
        { label: 'Project Manager (EN)', generator: 'projectManager' },
        { label: 'Project Manager (AR)', generator: 'projectManagerAr' },
        { label: 'Building Permit', generator: 'buildingPermit' },
        { label: 'Project Budget', generator: 'projectBudget' },
        { label: 'Completion Date', generator: 'completionDate' },
        { label: 'Floor Area', generator: 'floorArea' },
        { label: 'Building Height', generator: 'buildingHeight' },
        { label: 'Construction Type (EN)', generator: 'constructionType' },
        { label: 'Construction Type (AR)', generator: 'constructionTypeAr' },
        { label: 'Material Type (EN)', generator: 'materialType' },
        { label: 'Material Type (AR)', generator: 'materialTypeAr' },
        { label: 'Safety Rating', generator: 'safetyRating' }
      ]},
      { title: 'Testing & QA', items: [
        { label: 'Test Case ID', generator: 'testCaseId' },
        { label: 'Test Suite', generator: 'testSuite' },
        { label: 'Test Scenario', generator: 'testScenario' },
        { label: 'Test Status', generator: 'testStatus' },
        { label: 'Bug ID', generator: 'bugId' },
        { label: 'Severity Level', generator: 'severity' },
        { label: 'Priority Level', generator: 'priority' },
        { label: 'Test Environment', generator: 'testEnvironment' },
        { label: 'Browser Version', generator: 'browserVersion' },
        { label: 'Operating System', generator: 'operatingSystem' },
        { label: 'Test Data Set', generator: 'testData' },
        { label: 'Expected Result', generator: 'expectedResult' },
        { label: 'Actual Result', generator: 'actualResult' },
        { label: 'Test Executor', generator: 'testExecutor' },
        { label: 'Execution Time', generator: 'executionTime' },
        { label: 'Test Type', generator: 'testType' }
      ]},
      { title: 'Edge Cases', items: [
        { label: 'Null Value', generator: 'nullValue' },
        { label: 'Empty String', generator: 'emptyString' },
        { label: 'Whitespace Only', generator: 'whitespace' },
        { label: 'Maximum Length String', generator: 'maxLength' },
        { label: 'Minimum Value', generator: 'minValue' },
        { label: 'Maximum Value', generator: 'maxValue' },
        { label: 'Negative Number', generator: 'negativeNumber' },
        { label: 'Zero Value', generator: 'zeroValue' },
        { label: 'Floating Point', generator: 'floatingPoint' },
        { label: 'Special Characters', generator: 'specialChars' },
        { label: 'Unicode Characters', generator: 'unicodeChars' },
        { label: 'SQL Injection Test', generator: 'sqlInjection' },
        { label: 'XSS Payload', generator: 'xssPayload' },
        { label: 'Very Long Text', generator: 'longText' },
        { label: 'Invalid Format', generator: 'invalidFormat' },
        { label: 'Boundary Value', generator: 'boundaryValue' }
      ]},
      { title: 'Performance Testing', items: [
        { label: 'Response Time (ms)', generator: 'responseTime' },
        { label: 'Throughput (req/sec)', generator: 'throughput' },
        { label: 'CPU Usage (%)', generator: 'cpuUsage' },
        { label: 'Memory Usage (MB)', generator: 'memoryUsage' },
        { label: 'Disk Usage (GB)', generator: 'diskUsage' },
        { label: 'Network Latency (ms)', generator: 'networkLatency' },
        { label: 'Concurrent Users', generator: 'concurrentUsers' },
        { label: 'Error Rate (%)', generator: 'errorRate' },
        { label: 'Page Load Time (s)', generator: 'loadTime' },
        { label: 'Transaction Rate', generator: 'transactionRate' },
        { label: 'Bandwidth Usage', generator: 'bandwidth' },
        { label: 'Connection Pool Size', generator: 'connectionPool' },
        { label: 'Queue Length', generator: 'queueLength' },
        { label: 'Cache Hit Ratio (%)', generator: 'cacheHitRatio' },
        { label: 'DB Connections', generator: 'dbConnections' }
      ]},
      { title: 'Security Testing', items: [
        { label: 'Vulnerability ID', generator: 'vulnerabilityId' },
        { label: 'Security Level', generator: 'securityLevel' },
        { label: 'Encryption Type', generator: 'encryptionType' },
        { label: 'Auth Token', generator: 'authToken' },
        { label: 'Session ID', generator: 'sessionId' },
        { label: 'CSRF Token', generator: 'csrfToken' },
        { label: 'JWT Token', generator: 'jwtToken' },
        { label: 'API Key', generator: 'apiKey' },
        { label: 'Hash Value', generator: 'hashValue' },
        { label: 'Salt Value', generator: 'saltValue' },
        { label: 'Certificate ID', generator: 'certificateId' },
        { label: 'Permission Level', generator: 'permissionLevel' },
        { label: 'Access Role', generator: 'accessRole' },
        { label: 'Security Scan Result', generator: 'securityScan' },
        { label: 'Penetration Test', generator: 'penetrationTest' }
      ]},
      { title: 'Healthcare', items: [
        { label: 'Medical Record Number', generator: 'medicalRecordNumber' },
        { label: 'Insurance Number', generator: 'insuranceNumber' },
        { label: 'Emergency Contact', generator: 'emergencyContact' },
        { label: 'Allergies', generator: 'allergies' },
        { label: 'Blood Pressure', generator: 'bloodPressure' },
        { label: 'Heart Rate', generator: 'heartRate' }
      ]},
      { title: 'Vehicle', items: [
        { label: 'License Plate', generator: 'licensePlate' },
        { label: 'VIN Number', generator: 'vinNumber' },
        { label: 'Car Make', generator: 'carMake' },
        { label: 'Car Model', generator: 'carModel' },
        { label: 'Car Year', generator: 'carYear' },
        { label: 'Car Color', generator: 'carColor' }
      ]},
      { title: 'E-commerce', items: [
        { label: 'Product Name', generator: 'productName' },
        { label: 'Product Code', generator: 'productCode' },
        { label: 'Barcode', generator: 'barcode' },
        { label: 'Serial Number', generator: 'serialNumber' },
        { label: 'Order Number', generator: 'orderNumber' },
        { label: 'Invoice', generator: 'invoice' }
      ]},
      { title: 'Social Media', items: [
        { label: 'Username', generator: 'username' },
        { label: 'Handle', generator: 'handle' },
        { label: 'Bio', generator: 'bio' },
        { label: 'Hashtag', generator: 'hashtag' },
        { label: 'Post Content', generator: 'postContent' },
        { label: 'Comment', generator: 'comment' }
      ]},
      { title: 'Technology', items: [
        { label: 'API Key', generator: 'apiKey' },
        { label: 'Database Name', generator: 'databaseName' },
        { label: 'Server Name', generator: 'serverName' },
        { label: 'Port Number', generator: 'portNumber' },
        { label: 'Version', generator: 'version' },
        { label: 'Build Number', generator: 'buildNumber' }
      ]},
      { title: 'Travel', items: [
        { label: 'Flight Number', generator: 'flightNumber' },
        { label: 'Airline', generator: 'airline' },
        { label: 'Airport Code', generator: 'airportCode' },
        { label: 'Hotel Name', generator: 'hotelName' },
        { label: 'Booking Reference', generator: 'bookingReference' },
        { label: 'Seat Number', generator: 'seatNumber' }
      ]},
      { title: 'Food & Restaurant', items: [
        { label: 'Dish Name (EN)', generator: 'dishName' },
        { label: 'Dish Name (AR)', generator: 'dishNameAr' },
        { label: 'Restaurant Name', generator: 'restaurantName' },
        { label: 'Cuisine Type', generator: 'cuisineType' },
        { label: 'Menu Item', generator: 'menuItem' },
        { label: 'Recipe', generator: 'recipe' }
      ]},
      { title: 'Sports', items: [
        { label: 'Team Name', generator: 'teamName' },
        { label: 'Player Name', generator: 'playerName' },
        { label: 'Sport Type', generator: 'sportType' },
        { label: 'Score', generator: 'score' },
        { label: 'Stadium', generator: 'stadium' },
        { label: 'League', generator: 'league' }
      ]},
      { title: 'Education', items: [
        { label: 'University (EN)', generator: 'university' },
        { label: 'University (AR)', generator: 'universityAr' },
        { label: 'Degree (EN)', generator: 'degree' },
        { label: 'Degree (AR)', generator: 'degreeAr' },
        { label: 'Student ID', generator: 'studentId' },
        { label: 'GPA', generator: 'gpa' }
      ]},
      { title: 'Real Estate', items: [
        { label: 'Property Type', generator: 'propertyType' },
        { label: 'Property Price', generator: 'propertyPrice' },
        { label: 'Property Size', generator: 'propertySize' },
        { label: 'Bedrooms', generator: 'bedrooms' },
        { label: 'Bathrooms', generator: 'bathrooms' },
        { label: 'Property ID', generator: 'propertyId' }
      ]},
      { title: 'Gaming', items: [
        { label: 'Gamer Tag', generator: 'gamerTag' },
        { label: 'Game Title', generator: 'gameTitle' },
        { label: 'High Score', generator: 'highScore' },
        { label: 'Level', generator: 'level' },
        { label: 'Achievement', generator: 'achievement' },
        { label: 'Guild Name', generator: 'guildName' }
      ]},
      { title: 'Entertainment', items: [
        { label: 'Movie Title', generator: 'movieTitle' },
        { label: 'Actor Name', generator: 'actorName' },
        { label: 'Director', generator: 'director' },
        { label: 'Genre', generator: 'genre' },
        { label: 'Rating', generator: 'rating' },
        { label: 'Review', generator: 'review' }
      ]},
      { title: 'Science & Research', items: [
        { label: 'Chemical Formula', generator: 'chemicalFormula' },
        { label: 'Scientific Name', generator: 'scientificName' },
        { label: 'Research Paper', generator: 'researchPaper' },
        { label: 'Lab Equipment', generator: 'labEquipment' },
        { label: 'Experiment ID', generator: 'experimentId' },
        { label: 'Hypothesis', generator: 'hypothesis' }
      ]},
      { title: 'Legal & Law', items: [
        { label: 'Case Number', generator: 'caseNumber' },
        { label: 'Court Name', generator: 'courtName' },
        { label: 'Judge Name', generator: 'judgeName' },
        { label: 'Legal Document', generator: 'legalDocument' },
        { label: 'Law Firm', generator: 'lawFirm' },
        { label: 'Contract ID', generator: 'contractId' }
      ]},
      { title: 'Fashion & Beauty', items: [
        { label: 'Brand Name', generator: 'brandName' },
        { label: 'Product Category', generator: 'productCategory' },
        { label: 'Color Shade', generator: 'colorShade' },
        { label: 'Size', generator: 'size' },
        { label: 'Material', generator: 'material' },
        { label: 'Style', generator: 'style' }
      ]},
      { title: 'Agriculture', items: [
        { label: 'Crop Type', generator: 'cropType' },
        { label: 'Farm Name', generator: 'farmName' },
        { label: 'Harvest Date', generator: 'harvestDate' },
        { label: 'Yield Amount', generator: 'yieldAmount' },
        { label: 'Fertilizer Type', generator: 'fertilizerType' },
        { label: 'Soil Type', generator: 'soilType' }
      ]},
      { title: 'Logistics & Shipping', items: [
        { label: 'Tracking Number', generator: 'trackingNumber' },
        { label: 'Carrier Name', generator: 'carrierName' },
        { label: 'Package Weight', generator: 'packageWeight' },
        { label: 'Delivery Date', generator: 'deliveryDate' },
        { label: 'Warehouse Code', generator: 'warehouseCode' },
        { label: 'Container Number', generator: 'containerNumber' }
      ]},
      { title: 'Energy & Utilities', items: [
        { label: 'Meter Reading', generator: 'meterReading' },
        { label: 'Utility Bill', generator: 'utilityBill' },
        { label: 'Power Plant', generator: 'powerPlant' },
        { label: 'Grid Reference', generator: 'gridReference' },
        { label: 'Energy Source', generator: 'energySource' },
        { label: 'Consumption Rate', generator: 'consumptionRate' }
      ]},
      { title: 'Banking & Finance Extended', items: [
        { label: 'Bank Branch (EN)', generator: 'bankBranch' },
        { label: 'Bank Branch (AR)', generator: 'bankBranchAr' },
        { label: 'Routing Number', generator: 'routingNumber' },
        { label: 'Sort Code', generator: 'sortCode' },
        { label: 'BIC/SWIFT Code', generator: 'bic' },
        { label: 'Account Type (EN)', generator: 'accountType' },
        { label: 'Account Type (AR)', generator: 'accountTypeAr' },
        { label: 'Investment Type', generator: 'investmentType' }
      ]},
      { title: 'Insurance', items: [
        { label: 'Policy Number', generator: 'policyNumber' },
        { label: 'Insurance Company', generator: 'insuranceCompany' },
        { label: 'Coverage Type', generator: 'coverageType' },
        { label: 'Premium Amount', generator: 'premiumAmount' },
        { label: 'Deductible', generator: 'deductible' },
        { label: 'Claim Number', generator: 'claimNumber' }
      ]},
      { title: 'Manufacturing', items: [
        { label: 'Factory Name', generator: 'factoryName' },
        { label: 'Production Line', generator: 'productionLine' },
        { label: 'Quality Control', generator: 'qualityControl' },
        { label: 'Batch Number', generator: 'batchNumber' },
        { label: 'Machine ID', generator: 'machineId' },
        { label: 'Shift Schedule', generator: 'shiftSchedule' }
      ]},
      { title: 'Telecommunications', items: [
        { label: 'Network Provider', generator: 'networkProvider' },
        { label: 'Signal Strength', generator: 'signalStrength' },
        { label: 'Data Usage', generator: 'dataUsage' },
        { label: 'Plan Type', generator: 'planType' },
        { label: 'Tower ID', generator: 'towerId' },
        { label: 'Frequency', generator: 'frequency' }
      ]},
      { title: 'Construction', items: [
        { label: 'Project Name', generator: 'projectName' },
        { label: 'Contractor', generator: 'contractor' },
        { label: 'Blueprint ID', generator: 'blueprintId' },
        { label: 'Material List', generator: 'materialList' },
        { label: 'Permit Number', generator: 'permitNumber' },
        { label: 'Inspection Date', generator: 'inspectionDate' }
      ]},
      { title: 'Advanced Testing', items: [
        { label: 'Test Case ID', generator: 'testCaseId' },
        { label: 'Bug Report', generator: 'bugReport' },
        { label: 'Performance Metric', generator: 'performanceMetric' },
        { label: 'Load Test Result', generator: 'loadTestResult' },
        { label: 'Security Scan', generator: 'securityScan' },
        { label: 'Edge Case Data', generator: 'edgeCaseData' }
      ]},
      { title: 'Random Text Extended', items: [
        { label: 'Random Text', generator: 'randomText' },
        { label: 'Random Digits', generator: 'randomDigits' },
        { label: 'Random English', generator: 'randomEnglish' },
        { label: 'Random Arabic', generator: 'randomArabic' },
        { label: 'Random Special', generator: 'randomSpecial' },
        { label: 'Random Mixed', generator: 'randomMixed' },
        { label: 'Arabic Numbers ١٢٣', generator: 'randomArabicNumbers' },
        { label: 'Indian Numbers ۱۲۳', generator: 'randomIndianNumbers' },
        { label: 'Random Chinese', generator: 'randomChinese' },
        { label: 'Random Japanese', generator: 'randomJapanese' },
        { label: 'Random Russian', generator: 'randomRussian' },
        { label: 'Random Emoji', generator: 'randomEmoji' },
        { label: 'Invalid/Control Chars', generator: 'randomInvalidChars' }
      ]}
    ];

    categories.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'menu-category';
      categoryDiv.style.cssText = `
        padding: 6px 12px;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
        font-size: 10px;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `;
      categoryDiv.textContent = category.title;
      contentArea.appendChild(categoryDiv);

      category.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item generator-item';
        itemDiv.dataset.searchText = `${category.title} ${item.label}`.toLowerCase();
        itemDiv.dataset.generator = item.generator;
        itemDiv.style.cssText = `
          padding: 8px 12px;
          cursor: pointer;
          font-size: 12px;
          color: #374151;
          border-bottom: 1px solid #f1f5f9;
          transition: background 0.2s;
        `;
        itemDiv.textContent = item.label;
        itemDiv.addEventListener('mouseenter', () => {
          itemDiv.style.background = '#f0f9ff';
        });
        itemDiv.addEventListener('mouseleave', () => {
          itemDiv.style.background = 'white';
        });
        itemDiv.addEventListener('click', () => {
          console.log('Menu item clicked:', item.label, item.generator);
          fillInput(item.generator);
          hideContextMenu();
        });
        contentArea.appendChild(itemDiv);
      });
    });

    // Add search functionality
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const generatorItems = contentArea.querySelectorAll('.generator-item');
      const categories = contentArea.querySelectorAll('.menu-category');
      
      if (!query) {
        // Show all items
        generatorItems.forEach(item => item.style.display = 'block');
        categories.forEach(cat => cat.style.display = 'block');
      } else {
        // Filter items
        let visibleCategories = new Set();
        
        generatorItems.forEach(item => {
          const searchText = item.dataset.searchText;
          if (searchText.includes(query)) {
            item.style.display = 'block';
            // Find which category this item belongs to
            const categoryElement = item.previousElementSibling?.className === 'menu-category' ? 
              item.previousElementSibling : 
              findPreviousCategory(item);
            if (categoryElement) {
              visibleCategories.add(categoryElement);
            }
          } else {
            item.style.display = 'none';
          }
        });
        
        // Show/hide categories based on visible items
        categories.forEach(cat => {
          cat.style.display = visibleCategories.has(cat) ? 'block' : 'none';
        });
      }
    });
    
    // Helper function to find previous category
    function findPreviousCategory(element) {
      let prev = element.previousElementSibling;
      while (prev) {
        if (prev.className === 'menu-category') {
          return prev;
        }
        prev = prev.previousElementSibling;
      }
      return null;
    }

    document.body.appendChild(menu);
    return menu;
  }

  // Execute standard input actions
  function executeStandardAction(action) {
    if (!targetInput) return;

    try {
      targetInput.focus();
      
      switch(action) {
        case 'cut':
          if (targetInput.selectionStart !== targetInput.selectionEnd) {
            const selectedText = targetInput.value.substring(targetInput.selectionStart, targetInput.selectionEnd);
            navigator.clipboard.writeText(selectedText).then(() => {
              const start = targetInput.selectionStart;
              const end = targetInput.selectionEnd;
              const value = targetInput.value;
              targetInput.value = value.substring(0, start) + value.substring(end);
              targetInput.setSelectionRange(start, start);
              targetInput.dispatchEvent(new Event('input', { bubbles: true }));
            }).catch(() => {
              document.execCommand('cut');
            });
          }
          break;
          
        case 'copy':
          if (targetInput.selectionStart !== targetInput.selectionEnd) {
            const selectedText = targetInput.value.substring(targetInput.selectionStart, targetInput.selectionEnd);
            navigator.clipboard.writeText(selectedText).catch(() => {
              document.execCommand('copy');
            });
          }
          break;
          
        case 'paste':
          navigator.clipboard.readText().then(text => {
            const start = targetInput.selectionStart;
            const end = targetInput.selectionEnd;
            const value = targetInput.value;
            targetInput.value = value.substring(0, start) + text + value.substring(end);
            targetInput.setSelectionRange(start + text.length, start + text.length);
            targetInput.dispatchEvent(new Event('input', { bubbles: true }));
            targetInput.dispatchEvent(new Event('change', { bubbles: true }));
          }).catch(() => {
            document.execCommand('paste');
          });
          break;
          
        case 'delete':
          if (targetInput.selectionStart !== targetInput.selectionEnd) {
            const start = targetInput.selectionStart;
            const end = targetInput.selectionEnd;
            const value = targetInput.value;
            targetInput.value = value.substring(0, start) + value.substring(end);
            targetInput.setSelectionRange(start, start);
            targetInput.dispatchEvent(new Event('input', { bubbles: true }));
            targetInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
          break;
          
        case 'selectAll':
          targetInput.select();
          break;
      }
    } catch (error) {
      console.log('Error executing action:', error);
    }
  }

  // Fill input with generated data
  function fillInput(generatorName) {
    console.log('fillInput called with:', generatorName);
    console.log('targetInput:', targetInput);
    
    if (!targetInput) {
      console.log('No target input found');
      return;
    }

    let value = '';
    
    // Simple fallback generators if main generators not loaded
    switch(generatorName) {
      case 'firstName':
        value = ['Ahmed', 'Mohammed', 'Abdullah', 'Omar', 'Ali', 'Hassan', 'Khalid', 'Fahad'][Math.floor(Math.random() * 8)];
        break;
      case 'lastName':
        value = ['Al-Saud', 'Al-Rashid', 'Al-Otaibi', 'Al-Ghamdi', 'Al-Harbi', 'Al-Zahrani'][Math.floor(Math.random() * 6)];
        break;
      case 'fullName':
        const first = ['Ahmed', 'Mohammed', 'Abdullah', 'Omar'][Math.floor(Math.random() * 4)];
        const last = ['Al-Saud', 'Al-Rashid', 'Al-Otaibi'][Math.floor(Math.random() * 3)];
        value = `${first} ${last}`;
        break;
      case 'age':
        value = Math.floor(Math.random() * 50) + 18;
        break;
      case 'saudiId':
        value = '1' + Math.floor(Math.random() * 900000000 + 100000000);
        break;
      case 'email':
        const names = ['ahmed', 'mohammed', 'abdullah'];
        const domains = ['gmail.com', 'hotmail.com', 'outlook.com'];
        value = `${names[Math.floor(Math.random() * 3)]}${Math.floor(Math.random() * 999)}@${domains[Math.floor(Math.random() * 3)]}`;
        break;
      case 'mobileNumber':
        const prefixes = ['050', '053', '054', '055', '056', '058', '059'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        let number = '';
        for (let i = 0; i < 7; i++) {
          number += Math.floor(Math.random() * 10);
        }
        value = `${prefix}${number}`;
        break;
      case 'address':
        value = `${Math.floor(Math.random() * 9999) + 1} King Fahd Road, Riyadh`;
        break;
      case 'city':
        value = ['Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Mecca', 'Medina'][Math.floor(Math.random() * 6)];
        break;
      case 'postalCode':
        value = Math.floor(Math.random() * 90000) + 10000;
        break;
      case 'company':
        value = ['Saudi Aramco', 'SABIC', 'STC', 'Al Rajhi Bank', 'NCB'][Math.floor(Math.random() * 5)];
        break;
      case 'jobTitle':
        value = ['Software Engineer', 'Project Manager', 'Business Analyst', 'Marketing Manager'][Math.floor(Math.random() * 4)];
        break;
      case 'workEmail':
        value = `employee${Math.floor(Math.random() * 999)}@company.com`;
        break;
      case 'employeeId':
        value = `EMP${Math.floor(Math.random() * 90000) + 10000}`;
        break;
      case 'randomNumbers':
        value = '';
        for (let i = 0; i < 10; i++) {
          value += Math.floor(Math.random() * 10);
        }
        break;
      case 'randomText':
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        value = '';
        for (let i = 0; i < 10; i++) {
          value += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        break;
      case 'uuid':
        value = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
        break;
      case 'date':
        const today = new Date();
        const randomDate = new Date(today.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000);
        value = randomDate.toISOString().split('T')[0];
        break;
      default:
        // Try using main generators if available
        if (window.generators && window.generators[generatorName]) {
          try {
            value = window.generators[generatorName]();
          } catch (error) {
            // If generator fails, create a simple fallback
            switch(generatorName) {
              case 'boolean': value = Math.random() > 0.5 ? 'true' : 'false'; break;
              case 'number': value = Math.floor(Math.random() * 1000); break;
              case 'color': value = '#' + Math.floor(Math.random()*16777215).toString(16); break;
              case 'url': value = 'https://example.com'; break;
              case 'ipAddress': value = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`; break;
              case 'macAddress': value = Array.from({length: 6}, () => Math.floor(Math.random()*256).toString(16).padStart(2, '0')).join(':'); break;
              case 'userAgent': value = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'; break;
              case 'hash': value = Math.random().toString(36).substring(2, 15); break;
              case 'token': value = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); break;
              default: value = `Generated ${generatorName.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
            }
          }
        } else {
          // Create meaningful fallbacks for missing generators
          switch(generatorName) {
            case 'boolean': value = Math.random() > 0.5 ? 'true' : 'false'; break;
            case 'number': value = Math.floor(Math.random() * 1000); break;
            case 'color': value = '#' + Math.floor(Math.random()*16777215).toString(16); break;
            case 'url': value = 'https://example.com'; break;
            case 'ipAddress': value = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`; break;
            case 'macAddress': value = Array.from({length: 6}, () => Math.floor(Math.random()*256).toString(16).padStart(2, '0')).join(':'); break;
            case 'userAgent': value = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'; break;
            case 'hash': value = Math.random().toString(36).substring(2, 15); break;
            case 'token': value = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); break;
            case 'guid': 
            case 'uuid': value = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              const r = Math.random() * 16 | 0;
              const v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            }); break;
            // Saudi Services
            case 'hajjId': value = 'H' + Math.floor(Math.random() * 9000000 + 1000000); break;
            case 'umrahId': value = 'U' + Math.floor(Math.random() * 9000000 + 1000000); break;
            case 'workPermit': value = 'WP' + Math.floor(Math.random() * 90000000 + 10000000); break;
            case 'residencyId': value = 'R' + Math.floor(Math.random() * 9000000 + 1000000); break;
            case 'drivingLicense': value = Math.floor(Math.random() * 9000000000 + 1000000000); break;
            case 'vehicleRegistration': value = 'VR' + Math.floor(Math.random() * 9000000 + 1000000); break;
            case 'istmara': value = 'IS' + Math.floor(Math.random() * 9000000 + 1000000); break;
            case 'trafficViolation': value = 'TV' + Math.floor(Math.random() * 900000 + 100000); break;
            case 'healthCard': value = 'HC' + Math.floor(Math.random() * 9000000 + 1000000); break;
            case 'vaccinationCertificate': value = 'VC' + Math.floor(Math.random() * 9000000 + 1000000); break;
            case 'covidCertificate': value = 'COVID' + Math.floor(Math.random() * 900000 + 100000); break;
            // Banking
            case 'checkNumber': value = Math.floor(Math.random() * 90000 + 10000); break;
            case 'loanNumber': value = 'LN' + Math.floor(Math.random() * 90000000 + 10000000); break;
            case 'creditScore': value = Math.floor(Math.random() * 400 + 300); break;
            case 'interestRate': value = (Math.random() * 10 + 1).toFixed(2) + '%'; break;
            case 'exchangeRate': value = (Math.random() * 2 + 3).toFixed(4); break;
            case 'investmentAmount': value = Math.floor(Math.random() * 900000 + 100000) + ' SAR'; break;
            default: value = `Sample ${generatorName.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
          }
        }
    }

    console.log('Generated value:', value);

    try {
      // Insert at cursor position without removing existing content
      const start = targetInput.selectionStart || 0;
      const end = targetInput.selectionEnd || 0;
      const currentValue = targetInput.value || '';
      
      // Insert the new value at cursor position
      const newValue = currentValue.substring(0, start) + value + currentValue.substring(end);
      targetInput.value = newValue;
      
      // Set cursor position after inserted text
      const newCursorPos = start + value.length;
      targetInput.setSelectionRange(newCursorPos, newCursorPos);
      
      // Trigger input events
      targetInput.dispatchEvent(new Event('input', { bubbles: true }));
      targetInput.dispatchEvent(new Event('change', { bubbles: true }));
      
    } catch (error) {
      console.error('Error filling input:', error);
    }
  }

  // Show context menu
  function showContextMenu(e, input) {
    console.log('showContextMenu called');
    // e.preventDefault() is already called in the event listener
    e.stopPropagation();
    targetInput = input;
    
    if (!contextMenu) {
      console.log('Creating context menu');
      contextMenu = createContextMenu();
    }
    
    console.log('Showing menu at:', e.pageX, e.pageY);
    contextMenu.style.display = 'block';
    contextMenu.style.left = e.pageX + 'px';
    contextMenu.style.top = e.pageY + 'px';
    
    // Adjust position if menu goes off screen
    setTimeout(() => {
      const rect = contextMenu.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        contextMenu.style.left = (e.pageX - rect.width) + 'px';
      }
      if (rect.bottom > window.innerHeight) {
        contextMenu.style.top = (e.pageY - rect.height) + 'px';
      }
    }, 10);
  }

  // Hide context menu
  function hideContextMenu() {
    if (contextMenu) {
      contextMenu.style.display = 'none';
    }
    targetInput = null;
  }

  // Add event listeners for context menu
  document.addEventListener('contextmenu', (e) => {
    const target = e.target;
    console.log('Right click detected on:', target.tagName, target.type);
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      console.log('Showing context menu for input field');
      e.preventDefault(); // Only prevent default on input fields
      showContextMenu(e, target);
    }
    // Let other elements show normal context menu
  });

  document.addEventListener('click', (e) => {
    if (contextMenu && !contextMenu.contains(e.target)) {
      hideContextMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideContextMenu();
    }
  });

})();
