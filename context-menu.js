// Context menu for direct input filling
(function() {
  let contextMenu = null;
  let targetInput = null;
  let generatedDataCache = {};

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
      pointer-events: auto;
    `;
    
    // Prevent menu from closing when clicking/interacting with search
    searchInput.addEventListener('mousedown', (e) => e.stopPropagation());
    searchInput.addEventListener('click', (e) => e.stopPropagation());
    searchInput.addEventListener('focus', (e) => e.stopPropagation());
    searchInput.addEventListener('keydown', (e) => e.stopPropagation());
    
    const resetCacheButton = document.createElement('button');
    resetCacheButton.type = 'button';
    resetCacheButton.textContent = 'Reset';
    resetCacheButton.title = 'Flush cached generated values';
    resetCacheButton.style.cssText = `
      margin-left: 6px;
      padding: 6px 8px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      background: white;
      color: #334155;
      font-size: 11px;
      cursor: pointer;
      flex-shrink: 0;
    `;
    resetCacheButton.addEventListener('mouseenter', () => {
      resetCacheButton.style.background = '#f1f5f9';
    });
    resetCacheButton.addEventListener('mouseleave', () => {
      resetCacheButton.style.background = 'white';
    });
    resetCacheButton.addEventListener('mousedown', (e) => e.stopPropagation());
    resetCacheButton.addEventListener('click', (e) => {
      e.stopPropagation();
      generatedDataCache = {};
      resetCacheButton.textContent = 'Flushed';
      setTimeout(() => {
        resetCacheButton.textContent = 'Reset';
      }, 900);
    });

    const searchRow = document.createElement('div');
    searchRow.style.cssText = `
      display: flex;
      align-items: center;
      gap: 6px;
    `;
    searchInput.style.width = 'auto';
    searchInput.style.flex = '1';
    searchRow.appendChild(searchInput);
    searchRow.appendChild(resetCacheButton);
    searchContainer.appendChild(searchRow);
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
      { label: '🔤 Select All', action: 'selectAll' },
      { label: '📋 Select All & Copy', action: 'selectAllAndCopy' },
      { label: '✂️ Select All & Cut', action: 'selectAllAndCut' },
      { label: '🗑️ Select All & Remove', action: 'selectAllAndRemove' }
    ];
    const suggestions = detectFieldType(targetInput);
    
    function formatGeneratorLabel(generatorName) {
      return generatorName
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/^./, str => str.toUpperCase());
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
        { label: 'Birthdate', generator: 'birthdate' },
        { label: 'Nationality (EN)', generator: 'nationality' },
        { label: 'Nationality (AR)', generator: 'nationalityAr' },
        { label: 'Blood Type', generator: 'bloodType' },
        { label: 'Marital Status (EN)', generator: 'maritalStatus' },
        { label: 'Marital Status (AR)', generator: 'maritalStatusAr' },
        { label: 'Religion (EN)', generator: 'religion' },
        { label: 'Religion (AR)', generator: 'religionAr' },
        { label: 'Saudi ID', generator: 'saudiId' },
        { label: 'Iqama Number', generator: 'iqamaNumber' },
        { label: 'Border Number', generator: 'borderNumber' },
        { label: 'Passport Number', generator: 'passportNumber' }
      ]},
      { title: 'Contact', items: [
        { label: 'Email', generator: 'email' },
        { label: 'Mobile Number', generator: 'mobileNumber' },
        { label: 'Landline Number', generator: 'landlineNumber' },
        { label: 'WhatsApp Number', generator: 'whatsappNumber' },
        { label: 'Address (EN)', generator: 'address' },
        { label: 'Address (AR)', generator: 'addressAr' },
        { label: 'National Address', generator: 'nationalAddress' },
        { label: 'City (EN)', generator: 'city' },
        { label: 'City (AR)', generator: 'cityAr' },
        { label: 'District (EN)', generator: 'district' },
        { label: 'District (AR)', generator: 'districtAr' },
        { label: 'Street (EN)', generator: 'street' },
        { label: 'Street (AR)', generator: 'streetAr' },
        { label: 'Building Number', generator: 'buildingNumber' },
        { label: 'Unit Number', generator: 'unitNumber' },
        { label: 'Postal Code', generator: 'postalCode' },
        { label: 'Additional Number', generator: 'additionalNumber' },
        { label: 'Country (EN)', generator: 'country' },
        { label: 'Country (AR)', generator: 'countryAr' }
      ]},
      { title: 'Saudi Government', items: [
        { label: 'Saudi ID', generator: 'saudiId' },
        { label: 'Iqama Number', generator: 'iqamaNumber' },
        { label: 'Commercial Register (CR)', generator: 'commercialRegister' },
        { label: 'VAT Number (15-digit)', generator: 'vatNumber' },
        { label: 'VAT Number (Simple)', generator: 'vatNumberSimple' },
        { label: 'Tax Number', generator: 'taxNumber' },
        { label: 'Nafath OTP', generator: 'nafathOTP' },
        { label: 'Absher OTP', generator: 'absherOTP' },
        { label: 'Nafath ID', generator: 'nafathId' },
        { label: 'Absher ID', generator: 'absherId' },
        { label: 'Yaqeen Code', generator: 'yaqeenCode' },
        { label: 'ZATCA Number', generator: 'zatcaNumber' },
        { label: 'ZATCA Invoice UUID', generator: 'zatcaInvoiceUUID' },
        { label: 'Esal Invoice', generator: 'esalInvoiceNumber' },
        { label: 'Fatoorah Invoice', generator: 'fatoorahInvoiceNumber' },
        { label: 'GOSI Number', generator: 'gosiNumber' },
        { label: 'GOSI Establishment', generator: 'gosiEstablishmentNumber' },
        { label: 'MOL Establishment', generator: 'molEstablishmentNumber' },
        { label: 'MOL Labor Office', generator: 'molLaborOfficeNumber' },
        { label: 'MOL Sequence', generator: 'molSequenceNumber' },
        { label: 'Qiwa Number', generator: 'qiwaNumber' },
        { label: 'Qiwa Contract ID', generator: 'qiwaContractId' },
        { label: 'Mudad Contract', generator: 'mudadContractId' },
        { label: 'Ajeer Contract', generator: 'ajeerContractId' },
        { label: 'Muqeem Number', generator: 'muqeemNumber' },
        { label: 'Tawakkalna ID', generator: 'tawakkalnaID' },
        { label: 'Tawakkalna QR', generator: 'tawakkalnaQR' },
        { label: 'Sehhaty ID', generator: 'sehhatyID' },
        { label: 'Sehhaty Appointment', generator: 'sehhatyAppointment' },
        { label: 'Balady Request', generator: 'baladyRequestNumber' },
        { label: 'Balady License', generator: 'baladyLicenseNumber' },
        { label: 'Simah Credit Score', generator: 'simahCreditScore' },
        { label: 'Simah Report', generator: 'simahReportNumber' },
        { label: 'Najiz Case Number', generator: 'najizCaseNumber' },
        { label: 'Najiz Deed Number', generator: 'najizDeedNumber' },
        { label: 'Najiz Court', generator: 'najizCourtNumber' },
        { label: 'Ejar Contract', generator: 'ejarContractNumber' },
        { label: 'Ejar Unit', generator: 'ejarUnitNumber' },
        { label: 'Wathq Deed', generator: 'wathqDeedNumber' },
        { label: 'Wathq Verification', generator: 'wathqVerificationCode' },
        { label: 'Sakani Application', generator: 'sakaniApplicationNumber' },
        { label: 'Sakani Beneficiary', generator: 'sakaniBeneficiaryNumber' },
        { label: 'Rega Broker License', generator: 'regaBrokerLicense' },
        { label: 'Rega Ad License', generator: 'regaAdvertisementLicense' },
        { label: 'Thiqah Business ID', generator: 'thiqahBusinessID' },
        { label: 'Elm Invoice', generator: 'elmInvoiceNumber' },
        { label: 'Mada Card', generator: 'madaCardNumber' },
        { label: 'Sadad Bill Number', generator: 'sadadBillNumber' },
        { label: 'STC Pay Wallet', generator: 'stcPayWallet' },
        { label: 'Wasel Tracking', generator: 'waselTracking' },
        { label: 'Jahez Order', generator: 'jahezOrderNumber' },
        { label: 'HungerStation Order', generator: 'hungerstationOrderNumber' },
        { label: 'Careem Trip ID', generator: 'careemTripID' }
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
        { label: 'Department (AR)', generator: 'departmentAr' },
        { label: 'Work Experience', generator: 'workExperience' },
        { label: 'Work Location (EN)', generator: 'workLocation' },
        { label: 'Work Location (AR)', generator: 'workLocationAr' }
      ]},
      { title: 'Finance', items: [
        { label: 'IBAN', generator: 'iban' },
        { label: 'Credit Card', generator: 'creditCard' },
        { label: 'CVV', generator: 'cvv' },
        { label: 'Bank Name (EN)', generator: 'bankName' },
        { label: 'Bank Name (AR)', generator: 'bankNameAr' },
        { label: 'Account Number', generator: 'accountNumber' },
        { label: 'SWIFT Code', generator: 'swiftCode' },
        { label: 'Currency (EN)', generator: 'currency' },
        { label: 'Currency (AR)', generator: 'currencyAr' },
        { label: 'Transaction ID', generator: 'transactionId' }
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
        { label: 'Day of Week (AR)', generator: 'dayOfWeekAr' },
        { label: 'Month (EN)', generator: 'month' },
        { label: 'Month (AR)', generator: 'monthAr' },
        { label: 'Hijri → Gregorian', generator: 'hijriToGregorian' },
        { label: 'Gregorian → Hijri', generator: 'gregorianToHijri' }
      ]},
      { title: 'Files', items: [
        { label: 'TXT File', generator: 'txt' },
        { label: 'JSON File', generator: 'json' },
        { label: 'CSV File', generator: 'csv' },
        { label: 'XML File', generator: 'xml' },
        { label: 'HTML File', generator: 'html' },
        { label: 'PDF File', generator: 'pdf' },
        { label: 'DOC File', generator: 'doc' },
        { label: 'XLSX File', generator: 'xlsx' },
        { label: 'JPG File', generator: 'jpg' },
        { label: 'PNG File', generator: 'png' }
      ]},
      { title: 'Email Testing', items: [
        { label: 'Valid Email', generator: 'validEmail' },
        { label: 'Invalid Email', generator: 'invalidEmail' },
        { label: 'Disposable Email', generator: 'disposableEmail' },
        { label: 'Corporate Email', generator: 'corporateEmail' },
        { label: 'Personal Email', generator: 'personalEmail' },
        { label: 'Long Email', generator: 'longEmail' },
        { label: 'Short Email', generator: 'shortEmail' },
        { label: 'Special Char Email', generator: 'specialCharEmail' },
        { label: 'Unicode Email', generator: 'unicodeEmail' },
        { label: 'Custom Email', generator: 'customEmail' }
      ]},
      { title: 'Phone Testing', items: [
        { label: 'Custom Phone', generator: 'customPhone' },
        { label: 'Mobile (05X)', generator: 'mobileNumber' },
        { label: 'Landline (01X)', generator: 'landlineNumber' },
        { label: 'Short Mobile (5X)', generator: 'shortMobile' },
        { label: 'Short Landline (1X)', generator: 'shortLandline' },
        { label: 'Invalid Phone', generator: 'invalidPhone' },
        { label: 'Wrong Length', generator: 'wrongLengthPhone' },
        { label: 'International (+966)', generator: 'internationalPhone' },
        { label: 'Formatted Phone', generator: 'formattedPhone' },
        { label: 'Unformatted Phone', generator: 'unformattedPhone' }
      ]},
      { title: 'Password Testing', items: [
        { label: 'Custom Password', generator: 'customPassword' },
        { label: 'Strong Password', generator: 'strongPassword' },
        { label: 'Weak Password', generator: 'weakPassword' },
        { label: 'Numeric Password', generator: 'numericPassword' },
        { label: 'Alpha Password', generator: 'alphaPassword' },
        { label: 'Special Char Password', generator: 'specialCharPassword' },
        { label: 'Long Password', generator: 'longPassword' },
        { label: 'Short Password', generator: 'shortPassword' },
        { label: 'Common Password', generator: 'commonPassword' },
        { label: 'Unicode Password', generator: 'unicodePassword' }
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
        { label: 'Encryption Method', generator: 'encryptionMethod' },
        { label: 'Encryption Payload', generator: 'encryptionPayload' },
        { label: 'Encryption Key', generator: 'encryptionKey' },
        { label: 'Encrypted Text', generator: 'encryptedText' },
        { label: 'Decrypted Text', generator: 'decryptedText' },
        { label: 'Encrypt/Decrypt Round Trip', generator: 'encryptionRoundTrip' },
        { label: 'Hash Algorithm', generator: 'hashAlgorithm' },
        { label: 'Hash Text', generator: 'hashText' },
        { label: 'Auth Token', generator: 'authToken' },
        { label: 'Session ID', generator: 'sessionId' },
        { label: 'CSRF Token', generator: 'csrfToken' },
        { label: 'JWT Token', generator: 'jwtToken' },
        { label: 'API Key', generator: 'apiKey' },
        { label: 'Hash Value', generator: 'hashValue' },
        { label: 'HMAC Value', generator: 'hmacValue' },
        { label: 'Password Hash', generator: 'passwordHash' },
        { label: 'Salt Value', generator: 'saltValue' },
        { label: 'Key Exchange Protocol', generator: 'keyExchangeProtocol' },
        { label: 'Digital Signature', generator: 'digitalSignature' },
        { label: 'IV Value', generator: 'ivValue' },
        { label: 'Nonce Value', generator: 'nonceValue' },
        { label: 'Secure Random Bytes', generator: 'secureRandomBytes' },
        { label: 'Certificate ID', generator: 'certificateId' },
        { label: 'TLS Version', generator: 'tlsVersion' },
        { label: 'TLS Cipher Suite', generator: 'tlsCipherSuite' },
        { label: 'Certificate Chain Status', generator: 'certificateChainStatus' },
        { label: 'OCSP Status', generator: 'ocspStatus' },
        { label: 'CRL Status', generator: 'crlStatus' },
        { label: 'Certificate Expiry Warning', generator: 'certificateExpiryWarning' },
        { label: 'OAuth Grant Type', generator: 'oauthGrantType' },
        { label: 'OIDC Claim Set', generator: 'oidcClaimSet' },
        { label: 'MFA Result', generator: 'mfaResult' },
        { label: 'RBAC Decision', generator: 'rbacDecision' },
        { label: 'ABAC Decision', generator: 'abacDecision' },
        { label: 'Refresh Token Rotation', generator: 'refreshTokenRotation' },
        { label: 'JWT Validation Status', generator: 'jwtValidationStatus' },
        { label: 'API Rate Limit Header', generator: 'apiRateLimitHeader' },
        { label: 'API Scope Mismatch', generator: 'apiScopeMismatch' },
        { label: 'Replay Attack Indicator', generator: 'replayAttackIndicator' },
        { label: 'CSP Policy Status', generator: 'cspPolicyStatus' },
        { label: 'CORS Config Status', generator: 'corsConfigStatus' },
        { label: 'Cookie Security Flags', generator: 'cookieSecurityFlags' },
        { label: 'SSRF Payload', generator: 'ssrfPayload' },
        { label: 'Open Redirect Payload', generator: 'openRedirectPayload' },
        { label: 'KMS Key ID', generator: 'kmsKeyId' },
        { label: 'Key Rotation Status', generator: 'keyRotationStatus' },
        { label: 'Key Usage Audit', generator: 'keyUsageAudit' },
        { label: 'Secret Leak Pattern', generator: 'secretLeakPattern' },
        { label: 'Firewall Decision', generator: 'firewallDecision' },
        { label: 'IDS Alert', generator: 'idsAlert' },
        { label: 'Port Scan Result', generator: 'portScanResult' },
        { label: 'IP Reputation', generator: 'ipReputation' },
        { label: 'Data Masking Output', generator: 'dataMaskingOutput' },
        { label: 'PII Detection Label', generator: 'piiDetectionLabel' },
        { label: 'DLP Event Type', generator: 'dlpEventType' },
        { label: 'Data Residency Tag', generator: 'dataResidencyTag' },
        { label: 'CVSS Score', generator: 'cvssScore' },
        { label: 'CVSS Vector', generator: 'cvssVector' },
        { label: 'CWE ID', generator: 'cweId' },
        { label: 'Exploitability Rating', generator: 'exploitabilityRating' },
        { label: 'Remediation SLA', generator: 'remediationSla' },
        { label: 'Signature Verification', generator: 'signatureVerification' },
        { label: 'Checksum Value', generator: 'checksumValue' },
        { label: 'Tamper Evidence', generator: 'tamperEvidence' },
        { label: 'Security Log Event', generator: 'securityLogEvent' },
        { label: 'MITRE Technique ID', generator: 'mitreTechniqueId' },
        { label: 'Incident Triage Status', generator: 'incidentTriageStatus' },
        { label: 'False Positive Likelihood', generator: 'falsePositiveLikelihood' },
        { label: 'IAM Misconfiguration', generator: 'iamMisconfiguration' },
        { label: 'Storage Exposure', generator: 'storageExposure' },
        { label: 'Security Group Drift', generator: 'securityGroupDrift' },
        { label: 'PQC Algorithm', generator: 'pqcAlgorithm' },
        { label: 'Hybrid Crypto Mode', generator: 'hybridCryptoMode' },
        { label: 'Permission Level', generator: 'permissionLevel' },
        { label: 'Access Role', generator: 'accessRole' },
        { label: 'Security Scan Result', generator: 'securityScan' },
        { label: 'Penetration Test', generator: 'penetrationTest' }
      ]},
      { title: 'Healthcare', items: [
        { label: 'Medical Record', generator: 'medicalRecord' },
        { label: 'Insurance Number', generator: 'insuranceNumber' },
        { label: 'Doctor Name (EN)', generator: 'doctorName' },
        { label: 'Doctor Name (AR)', generator: 'doctorNameAr' },
        { label: 'Hospital (EN)', generator: 'hospital' },
        { label: 'Hospital (AR)', generator: 'hospitalAr' },
        { label: 'Diagnosis (EN)', generator: 'diagnosis' },
        { label: 'Diagnosis (AR)', generator: 'diagnosisAr' },
        { label: 'Medication (EN)', generator: 'medication' },
        { label: 'Medication (AR)', generator: 'medicationAr' },
        { label: 'Emergency Contact', generator: 'emergencyContact' },
        { label: 'Allergies', generator: 'allergies' },
        { label: 'Blood Pressure', generator: 'bloodPressure' },
        { label: 'Heart Rate', generator: 'heartRate' }
      ]},
      { title: 'Vehicle', items: [
        { label: 'License Plate', generator: 'licensePlate' },
        { label: 'Car Model (EN)', generator: 'carModel' },
        { label: 'Car Model (AR)', generator: 'carModelAr' },
        { label: 'Car Brand (EN)', generator: 'carBrand' },
        { label: 'Car Brand (AR)', generator: 'carBrandAr' },
        { label: 'Car Year', generator: 'carYear' },
        { label: 'Car Color (EN)', generator: 'carColor' },
        { label: 'Car Color (AR)', generator: 'carColorAr' },
        { label: 'VIN Number', generator: 'vin' },
        { label: 'Engine Number', generator: 'engineNumber' }
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

    // Auto-include newly added generators that are not listed above.
    const manualGeneratorNames = new Set();
    categories.forEach(category => {
      category.items.forEach(item => manualGeneratorNames.add(item.generator));
    });

    const availableGeneratorNames = Object.keys(window.generators || {}).filter(
      name => typeof window.generators[name] === 'function'
    );

    const autoItems = availableGeneratorNames
      .filter(name => !manualGeneratorNames.has(name))
      .sort((a, b) => a.localeCompare(b))
      .map(name => ({ label: formatGeneratorLabel(name), generator: name }));

    if (autoItems.length > 0) {
      categories.push({
        title: 'All Generators (Auto)',
        items: autoItems
      });
    }

    function getCategoryIcon(title) {
      const titleIcons = {
        'Personal': '👤',
        'Contact': '📧',
        'Business': '💼',
        'Work': '💼',
        'Finance': '💳',
        'Healthcare': '🏥',
        'Saudi Government': '🏛️',
        'Government': '🏛️',
        'E-commerce': '🛒',
        'Technology': '💻',
        'Testing & QA': '🧪',
        'Advanced Testing': '🧪',
        'Travel': '✈️',
        'Education': '🎓',
        'Real Estate': '🏠',
        'Entertainment': '🎬',
        'Sports': '⚽',
        'Sports & Fitness': '⚽',
        'Food': '🍽️',
        'Agriculture': '🌾',
        'Manufacturing': '🏭',
        'Construction': '🏗️',
        'Telecommunications': '📱',
        'Telecom': '📱',
        'Insurance': '🛡️',
        'Banking': '🏦',
        'Banking Extended': '🏦',
        'Banking & Finance Extended': '🏦',
        'Energy': '⚡',
        'Energy & Utilities': '⚡',
        'Logistics': '📦',
        'Fashion': '👗',
        'Legal': '⚖️',
        'Science': '🔬',
        'Documents': '📄',
        'Files': '📁',
        'Images': '🖼️',
        'Date & Time': '📅',
        'Random Text': '📝',
        'Random Text Extended': '📝',
        'Random Values': '🎲',
        'Password Testing': '🔒',
        'Phone Testing': '☎️',
        'Email Testing': '✉️',
        'Edge Cases': '⚠️',
        'Performance': '⚡',
        'Security': '🔐',
        'Other': '📋',
        'Saudi Services': '🇸🇦',
        'Media': '📺',
        'Automotive': '🚙',
        'Weather': '🌤️',
        'Crypto': '₿',
        'IoT': '🔌',
        'All Generators (Auto)': '📋'
      };
      return titleIcons[title] || '📋';
    }

    const flyoutMenu = document.createElement('div');
    flyoutMenu.id = 'dg-context-submenu';
    flyoutMenu.style.cssText = `
      position: fixed;
      background: white;
      border: 1px solid #dbe4f0;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16);
      z-index: 10001;
      display: none;
      min-width: 260px;
      max-width: 320px;
      max-height: 380px;
      overflow-y: auto;
      overflow-x: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    `;
    document.body.appendChild(flyoutMenu);
    menu._flyout = flyoutMenu;

    const topEntries = [];

    function toSubmenuItems(items, type, prefix = '') {
      return items.map(item => {
        if (type === 'action') {
          return {
            label: item.label,
            searchText: `${prefix} ${item.label}`.toLowerCase(),
            onSelect: () => {
              executeStandardAction(item.action);
              hideContextMenu();
            }
          };
        }
        if (type === 'generatorName') {
          const label = `⭐ ${formatGeneratorLabel(item)}`;
          return {
            label,
            searchText: `${prefix} ${label} ${item}`.toLowerCase(),
            onSelect: () => {
              fillInput(item);
              hideContextMenu();
            }
          };
        }
        return {
          label: item.label,
          searchText: `${prefix} ${item.label} ${item.generator}`.toLowerCase(),
          onSelect: () => {
            fillInput(item.generator);
            hideContextMenu();
          }
        };
      });
    }

    topEntries.push({
      label: '⚙️ Actions',
      searchText: 'actions',
      items: toSubmenuItems(standardActions, 'action', 'actions')
    });

    if (suggestions.length > 0) {
      topEntries.push({
        label: '💡 Smart Suggestions',
        searchText: 'smart suggestions',
        items: toSubmenuItems(suggestions, 'generatorName', 'smart suggestions')
      });
    }

    categories.forEach(category => {
      topEntries.push({
        label: `${getCategoryIcon(category.title)} ${category.title}`,
        searchText: category.title.toLowerCase(),
        items: toSubmenuItems(category.items, 'generatorItem', category.title)
      });
    });

    const mainRows = [];
    let activeRow = null;
    let hideTimer = null;

    function clearHideTimer() {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
    }

    function hideFlyout() {
      flyoutMenu.style.display = 'none';
      flyoutMenu.innerHTML = '';
      if (activeRow) {
        activeRow.style.background = 'white';
      }
      activeRow = null;
    }

    function scheduleHideFlyout() {
      clearHideTimer();
      hideTimer = setTimeout(() => {
        hideFlyout();
      }, 160);
    }

    function renderFlyout(entry, row, query) {
      clearHideTimer();
      flyoutMenu.innerHTML = '';

      const header = document.createElement('div');
      header.style.cssText = `
        padding: 7px 10px;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
        font-size: 11px;
        font-weight: 600;
        color: #64748b;
      `;
      header.textContent = entry.label;
      flyoutMenu.appendChild(header);

      const visibleItems = entry.items.filter(item => !query || item.searchText.includes(query));
      if (visibleItems.length === 0) {
        const empty = document.createElement('div');
        empty.style.cssText = `
          padding: 10px;
          font-size: 12px;
          color: #94a3b8;
        `;
        empty.textContent = 'No matching items';
        flyoutMenu.appendChild(empty);
      } else {
        visibleItems.forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'menu-item submenu-item';
          itemDiv.style.cssText = `
            padding: 8px 10px;
            cursor: pointer;
            font-size: 12px;
            color: #374151;
            border-bottom: 1px solid #f1f5f9;
            transition: background 0.15s;
          `;
          itemDiv.textContent = item.label;
          itemDiv.addEventListener('mouseenter', () => {
            itemDiv.style.background = '#f0f9ff';
          });
          itemDiv.addEventListener('mouseleave', () => {
            itemDiv.style.background = 'white';
          });
          itemDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            item.onSelect();
          });
          flyoutMenu.appendChild(itemDiv);
        });
      }

      const rowRect = row.getBoundingClientRect();
      let left = rowRect.right - 2;
      let top = rowRect.top;
      flyoutMenu.style.left = `${left}px`;
      flyoutMenu.style.top = `${top}px`;
      flyoutMenu.style.display = 'block';

      const rect = flyoutMenu.getBoundingClientRect();
      if (rect.right > window.innerWidth - 4) {
        left = rowRect.left - rect.width + 2;
      }
      if (rect.bottom > window.innerHeight - 4) {
        top = Math.max(4, window.innerHeight - rect.height - 4);
      }
      flyoutMenu.style.left = `${Math.max(4, left)}px`;
      flyoutMenu.style.top = `${Math.max(4, top)}px`;
    }

    function setActiveRow(row) {
      if (activeRow && activeRow !== row) {
        activeRow.style.background = 'white';
      }
      activeRow = row;
      if (activeRow) {
        activeRow.style.background = '#eaf4ff';
      }
    }

    function matchesEntry(entry, query) {
      if (!query) return true;
      if (entry.searchText.includes(query) || entry.label.toLowerCase().includes(query)) return true;
      return entry.items.some(item => item.searchText.includes(query));
    }

    function renderMainRows(query) {
      let visibleRows = 0;
      mainRows.forEach(({ row, entry }) => {
        const show = matchesEntry(entry, query);
        row.style.display = show ? 'flex' : 'none';
        if (show) visibleRows++;
      });

      if (activeRow && activeRow.style.display === 'none') {
        hideFlyout();
      }

      if (visibleRows === 0) {
        if (!contentArea.querySelector('.menu-empty-state')) {
          const empty = document.createElement('div');
          empty.className = 'menu-empty-state';
          empty.style.cssText = `
            padding: 10px 12px;
            font-size: 12px;
            color: #94a3b8;
          `;
          empty.textContent = 'No matching menu items';
          contentArea.appendChild(empty);
        }
      } else {
        const empty = contentArea.querySelector('.menu-empty-state');
        if (empty) empty.remove();
      }
    }

    topEntries.forEach(entry => {
      const row = document.createElement('div');
      row.className = 'menu-item top-entry';
      row.style.cssText = `
        padding: 8px 12px;
        cursor: pointer;
        font-size: 12px;
        color: #374151;
        border-bottom: 1px solid #f1f5f9;
        transition: background 0.15s;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      `;

      const labelSpan = document.createElement('span');
      labelSpan.textContent = entry.label;
      const arrowSpan = document.createElement('span');
      arrowSpan.textContent = '▸';
      arrowSpan.style.cssText = 'color: #94a3b8; font-size: 12px;';

      row.appendChild(labelSpan);
      row.appendChild(arrowSpan);

      row.addEventListener('mouseenter', () => {
        const query = searchInput.value.toLowerCase().trim();
        setActiveRow(row);
        renderFlyout(entry, row, query);
      });
      row.addEventListener('mouseleave', () => {
        scheduleHideFlyout();
      });
      row.addEventListener('click', (e) => {
        e.stopPropagation();
        const query = searchInput.value.toLowerCase().trim();
        setActiveRow(row);
        renderFlyout(entry, row, query);
      });

      contentArea.appendChild(row);
      mainRows.push({ row, entry });
    });

    flyoutMenu.addEventListener('mouseenter', () => {
      clearHideTimer();
    });
    flyoutMenu.addEventListener('mouseleave', () => {
      scheduleHideFlyout();
    });

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      renderMainRows(query);
      if (activeRow) {
        const active = mainRows.find(item => item.row === activeRow);
        if (active && active.row.style.display !== 'none') {
          renderFlyout(active.entry, active.row, query);
        } else {
          hideFlyout();
        }
      }
    });

    renderMainRows('');
    
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
          
        case 'selectAllAndCopy':
          targetInput.select();
          if (targetInput.value) {
            navigator.clipboard.writeText(targetInput.value).catch(() => {
              document.execCommand('copy');
            });
          }
          break;
          
        case 'selectAllAndCut':
          targetInput.select();
          if (targetInput.value) {
            navigator.clipboard.writeText(targetInput.value).then(() => {
              targetInput.value = '';
              targetInput.dispatchEvent(new Event('input', { bubbles: true }));
              targetInput.dispatchEvent(new Event('change', { bubbles: true }));
            }).catch(() => {
              document.execCommand('cut');
            });
          }
          break;
          
        case 'selectAllAndRemove':
          targetInput.select();
          targetInput.value = '';
          targetInput.dispatchEvent(new Event('input', { bubbles: true }));
          targetInput.dispatchEvent(new Event('change', { bubbles: true }));
          break;
      }
    } catch (error) {
      console.log('Error executing action:', error);
    }
  }

  // Fill input with generated data
  function fillInput(generatorName) {
    if (!targetInput) {
      return;
    }

    const hasCachedValue = Object.prototype.hasOwnProperty.call(generatedDataCache, generatorName);
    let value = hasCachedValue ? generatedDataCache[generatorName] : '';

    if (hasCachedValue) {
      try {
        // Replace current field value for generator actions to avoid concatenated outputs.
        const newValue = String(value ?? '');
        targetInput.value = newValue;
        targetInput.setSelectionRange(newValue.length, newValue.length);
        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
        targetInput.dispatchEvent(new Event('change', { bubbles: true }));
      } catch (error) {
        console.error('Error filling input:', error);
      }
      return;
    }
    
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

    generatedDataCache[generatorName] = value;

    try {
      // Replace current field value for generator actions to avoid concatenated outputs.
      const newValue = String(value ?? '');
      targetInput.value = newValue;
      targetInput.setSelectionRange(newValue.length, newValue.length);
      
      // Mark input as filled by extension to prevent clearing
      targetInput.dataset.dgFilled = 'true';
      
      // Protect value from being cleared by page scripts
      const protectedValue = newValue;
      const originalValueSetter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(targetInput), 'value').set;
      
      Object.defineProperty(targetInput, 'value', {
        get() {
          return this.getAttribute('value') || protectedValue;
        },
        set(val) {
          // Allow setting if it's not empty or if enough time has passed
          if (val !== '' || !this.dataset.dgFilled) {
            originalValueSetter.call(this, val);
            this.setAttribute('value', val);
          }
        },
        configurable: true
      });
      
      // Remove protection after 2 seconds
      setTimeout(() => {
        delete targetInput.dataset.dgFilled;
        Object.defineProperty(targetInput, 'value', {
          get() {
            return originalValueSetter.call(this);
          },
          set(val) {
            originalValueSetter.call(this, val);
          },
          configurable: true
        });
      }, 2000);
      
      // Trigger input events
      targetInput.dispatchEvent(new Event('input', { bubbles: true }));
      targetInput.dispatchEvent(new Event('change', { bubbles: true }));
      
    } catch (error) {
      console.error('Error filling input:', error);
    }
  }

  // Show context menu
  function showContextMenu(e, input) {
    // e.preventDefault() is already called in the event listener
    e.stopPropagation();
    targetInput = input;
    
    if (!contextMenu) {
      contextMenu = createContextMenu();
    }

    // Reset search and return to top-level categories on each open.
    const searchInput = contextMenu.querySelector('input[type="text"]');
    if (searchInput) {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
    }
    if (contextMenu._flyout) {
      contextMenu._flyout.style.display = 'none';
    }
    
    contextMenu.style.display = 'block';
    contextMenu.style.left = e.pageX + 'px';
    contextMenu.style.top = e.pageY + 'px';
    
    // Adjust position if menu goes off screen
    const rect = contextMenu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      contextMenu.style.left = (e.pageX - rect.width) + 'px';
    }
    if (rect.bottom > window.innerHeight) {
      contextMenu.style.top = (e.pageY - rect.height) + 'px';
    }
  }

  // Hide context menu
  function hideContextMenu() {
    if (contextMenu) {
      contextMenu.style.display = 'none';
      if (contextMenu._flyout) {
        contextMenu._flyout.style.display = 'none';
      }
    }
    // Don't clear targetInput immediately - let it persist for the click handler
    setTimeout(() => {
      targetInput = null;
    }, 100);
  }

  // Add event listeners
  document.addEventListener('contextmenu', (e) => {
    const target = e.target;
    const isEditable = target.tagName === 'INPUT' || 
                       target.tagName === 'TEXTAREA' || 
                       target.contentEditable === 'true' ||
                       target.isContentEditable;
    
    if (isEditable) {
      e.preventDefault();
      showContextMenu(e, target);
    }
  });

  document.addEventListener('click', (e) => {
    const clickInsideFlyout = contextMenu && contextMenu._flyout && contextMenu._flyout.contains(e.target);
    if (contextMenu && !contextMenu.contains(e.target) && !clickInsideFlyout) {
      hideContextMenu();
    }
  }, true); // Use capture phase to handle before menu item clicks

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideContextMenu();
    }
  });

})();
