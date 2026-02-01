// Context menu for direct input filling
(function() {
  let contextMenu = null;
  let targetInput = null;

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
        { label: 'Commercial Register', generator: 'commercialRegister' },
        { label: 'Tax Number (VAT)', generator: 'taxNumber' },
        { label: 'Municipal License', generator: 'municipalLicense' },
        { label: 'Chamber Membership', generator: 'chamberMembership' },
        { label: 'Social Insurance (GOSI)', generator: 'socialInsurance' },
        { label: 'Labor Office Number', generator: 'laborOfficeNumber' },
        { label: 'Zakat Number', generator: 'zakat' },
        { label: 'Customs Code', generator: 'customsCode' },
        { label: 'Saudi Post Box', generator: 'saudiPost' },
        { label: 'Absher ID', generator: 'absherId' },
        { label: 'Nafath ID', generator: 'nafathId' },
        { label: 'Elm ID', generator: 'elmId' },
        { label: 'Region (EN)', generator: 'region' },
        { label: 'Region (AR)', generator: 'regionAr' },
        { label: 'Province (EN)', generator: 'province' },
        { label: 'Province (AR)', generator: 'provinceAr' }
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
    if (!targetInput) {
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
            value = 'Test Data';
          }
        } else {
          value = 'Test Data';
        }
    }

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
      
      // Visual feedback
      targetInput.style.background = '#dcfce7';
      setTimeout(() => {
        targetInput.style.background = '';
      }, 1000);
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
    }
    targetInput = null;
  }

  // Add event listeners
  document.addEventListener('contextmenu', (e) => {
    const target = e.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
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
