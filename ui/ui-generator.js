function createDataGeneratorUI(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const style = document.createElement('style');
  style.textContent = `
    .dg-app { height: 100%; display: flex; flex-direction: column; background: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; }
    .dg-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px; text-align: center; flex-shrink: 0; }
    .dg-header h1 { font-size: 14px; font-weight: 600; margin: 0; }
    .dg-tabs { display: flex; background: #f9fafb; border-bottom: 1px solid #e5e7eb; overflow-x: auto; flex-shrink: 0; }
    .dg-tab { padding: 8px 12px; border: none; background: none; cursor: pointer; font-size: 11px; font-weight: 500; color: #6b7280; border-bottom: 2px solid transparent; white-space: nowrap; }
    .dg-tab.active { color: #667eea; border-bottom-color: #667eea; }
    .dg-main { flex: 1; display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
    .dg-content { flex: 1; overflow-y: auto; min-height: 0; }
    .dg-tab-content { display: none; padding: 12px; }
    .dg-tab-content.active { display: block; }
    .dg-sub-tabs { display: flex; background: #f3f4f6; border-bottom: 1px solid #d1d5db; overflow-x: auto; flex-shrink: 0; }
    .dg-sub-tab { padding: 6px 10px; border: none; background: none; cursor: pointer; font-size: 10px; font-weight: 500; color: #6b7280; border-bottom: 2px solid transparent; white-space: nowrap; }
    .dg-sub-tab.active { color: #374151; border-bottom-color: #374151; }
    .dg-sub-content { display: none; padding: 12px; }
    .dg-sub-content.active { display: block; }
    .dg-fields-wrapper { display: flex; flex-wrap: wrap; }
    .dg-checkbox { display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; margin: 2px 4px 2px 0; cursor: pointer; font-size: 11px; width: calc(50% - 4px); box-sizing: border-box; }
    .dg-checkbox input { margin: 0; }
    .dg-controls { background: #f9fafb; padding: 10px; border-top: 1px solid #e5e7eb; flex-shrink: 0; }
    .dg-count-control { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 11px; }
    .dg-count-control input { width: 50px; padding: 4px; border: 1px solid #d1d5db; border-radius: 3px; }
    .dg-buttons { display: flex; gap: 6px; }
    .dg-btn { padding: 6px 12px; border: none; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: 500; }
    .dg-btn-primary { background: #667eea; color: white; }
    .dg-btn-primary:hover { background: #5a67d8; }
    .dg-btn-secondary { background: #e5e7eb; color: #374151; }
    .dg-btn-secondary:hover { background: #d1d5db; }
    .dg-results { max-height: 150px; overflow-y: auto; font-size: 10px; background: #f8f9fa; padding: 8px; margin-top: 8px; border-radius: 3px; }
    .dg-record { margin-bottom: 6px; padding: 6px; border: 1px solid #e5e7eb; border-radius: 2px; }
    .dg-field { display: flex; justify-content: space-between; gap: 8px; }
    .dg-field-label { font-weight: 500; color: #374151; }
    .dg-field-value { color: #6b7280; word-break: break-all; cursor: pointer; padding: 2px 4px; border-radius: 2px; }
    .dg-field-value:hover { background: #e5e7eb; }
    .dg-footer { font-size: 9px; color: #9ca3af; text-align: center; padding: 6px; border-top: 1px solid #e5e7eb; flex-shrink: 0; }
  `;
  document.head.appendChild(style);

  const categories = [
    {
      title: '👤 Personal',
      fields: [
        { id: 'firstName', label: 'First Name (EN)' },
        { id: 'firstNameAr', label: 'First Name (AR)' },
        { id: 'middleName', label: 'Middle Name (EN)' },
        { id: 'middleNameAr', label: 'Middle Name (AR)' },
        { id: 'lastName', label: 'Last Name (EN)' },
        { id: 'lastNameAr', label: 'Last Name (AR)' },
        { id: 'fullName', label: 'Full Name (EN)' },
        { id: 'fullNameAr', label: 'Full Name (AR)' },
        { id: 'fullNameWithMiddle', label: 'Full Name with Middle (EN)' },
        { id: 'fullNameWithMiddleAr', label: 'Full Name with Middle (AR)' },
        { id: 'gender', label: 'Gender (EN)' },
        { id: 'genderAr', label: 'Gender (AR)' },
        { id: 'birthdate', label: 'Birthdate' },
        { id: 'age', label: 'Age' },
        { id: 'nationality', label: 'Nationality (EN)' },
        { id: 'nationalityAr', label: 'Nationality (AR)' },
        { id: 'bloodType', label: 'Blood Type' },
        { id: 'maritalStatus', label: 'Marital Status (EN)' },
        { id: 'maritalStatusAr', label: 'Marital Status (AR)' },
        { id: 'religion', label: 'Religion (EN)' },
        { id: 'religionAr', label: 'Religion (AR)' },
        { id: 'saudiId', label: 'Saudi ID' },
        { id: 'passportNumber', label: 'Passport Number' },
        { id: 'visaNumber', label: 'Visa Number' },
        { id: 'height', label: 'Height' },
        { id: 'weight', label: 'Weight' }
      ]
    },
    {
      title: '📞 Contact',
      fields: [
        { id: 'email', label: 'Email' },
        { id: 'phone', label: 'Phone' },
        { id: 'mobileNumber', label: 'Mobile Number' },
        { id: 'landline', label: 'Landline' },
        { id: 'address', label: 'Address (EN)' },
        { id: 'addressAr', label: 'Address (AR)' },
        { id: 'saudiAddress', label: 'Saudi Address (EN)' },
        { id: 'saudiAddressAr', label: 'Saudi Address (AR)' },
        { id: 'nationalAddress', label: 'National Address' },
        { id: 'city', label: 'City (EN)' },
        { id: 'cityAr', label: 'City (AR)' },
        { id: 'district', label: 'District (EN)' },
        { id: 'districtAr', label: 'District (AR)' },
        { id: 'streetName', label: 'Street Name (EN)' },
        { id: 'streetNameAr', label: 'Street Name (AR)' },
        { id: 'streetNumber', label: 'Street Number' },
        { id: 'building', label: 'Building' },
        { id: 'floor', label: 'Floor' },
        { id: 'room', label: 'Room' },
        { id: 'postalCode', label: 'Postal Code' },
        { id: 'country', label: 'Country (EN)' },
        { id: 'countryAr', label: 'Country (AR)' },
        { id: 'countryCode', label: 'Country Code' },
        { id: 'coordinates', label: 'Coordinates' },
        { id: 'latitude', label: 'Latitude' },
        { id: 'longitude', label: 'Longitude' }
      ]
    },
    {
      title: '💼 Work',
      fields: [
        { id: 'company', label: 'Company' },
        { id: 'companyId', label: 'Company ID' },
        { id: 'jobTitle', label: 'Job Title (EN)' },
        { id: 'jobTitleAr', label: 'Job Title (AR)' },
        { id: 'department', label: 'Department (EN)' },
        { id: 'departmentAr', label: 'Department (AR)' },
        { id: 'experience', label: 'Experience (EN)' },
        { id: 'experienceAr', label: 'Experience (AR)' },
        { id: 'education', label: 'Education (EN)' },
        { id: 'educationAr', label: 'Education (AR)' },
        { id: 'level', label: 'Level' },
        { id: 'salary', label: 'Salary' },
        { id: 'studentId', label: 'Student ID' },
        { id: 'taxId', label: 'Tax ID' },
        { id: 'vatNumber', label: 'VAT Number' },
        { id: 'licenseNumber', label: 'License Number' },
        { id: 'productName', label: 'Product Name' },
        { id: 'productCode', label: 'Product Code' }
      ]
    },
    {
      title: '💳 Finance',
      fields: [
        { id: 'iban', label: 'IBAN' },
        { id: 'creditCard', label: 'Credit Card' },
        { id: 'visaCard', label: 'Visa Card' },
        { id: 'masterCard', label: 'Master Card' },
        { id: 'madaCard', label: 'Mada Card' },
        { id: 'cardExpiry', label: 'Card Expiry' },
        { id: 'cvv', label: 'CVV' },
        { id: 'bankName', label: 'Bank Name' },
        { id: 'accountNumber', label: 'Account Number' },
        { id: 'currency', label: 'Currency' },
        { id: 'exchangeRate', label: 'Exchange Rate' },
        { id: 'invoice', label: 'Invoice' },
        { id: 'orderNumber', label: 'Order Number' },
        { id: 'stockSymbol', label: 'Stock Symbol' }
      ]
    },
    {
      title: '📅 Date & Time',
      fields: [
        { id: 'date', label: 'Date' },
        { id: 'dateGregorian', label: 'Date Gregorian (EN)' },
        { id: 'dateGregorianAr', label: 'Date Gregorian (AR)' },
        { id: 'dateHijri', label: 'Date Hijri (EN)' },
        { id: 'dateHijriAr', label: 'Date Hijri (AR)' },
        { id: 'datePast', label: 'Date Past' },
        { id: 'dateFuture', label: 'Date Future' },
        { id: 'datePresent', label: 'Date Present' },
        { id: 'time', label: 'Time' },
        { id: 'time12', label: 'Time 12H (EN)' },
        { id: 'time12Ar', label: 'Time 12H (AR)' },
        { id: 'datetime', label: 'DateTime (EN)' },
        { id: 'datetimeAr', label: 'DateTime (AR)' },
        { id: 'datetimeLocal', label: 'DateTime Local' },
        { id: 'timestamp', label: 'Timestamp' },
        { id: 'dayOfWeek', label: 'Day of Week' },
        { id: 'month', label: 'Month' },
        { id: 'timeZone', label: 'Time Zone' }
      ]
    },
    {
      title: '🔧 Other',
      fields: [
        { id: 'uuid', label: 'UUID' },
        { id: 'url', label: 'URL' },
        { id: 'domain', label: 'Domain' },
        { id: 'subdomain', label: 'Subdomain' },
        { id: 'email', label: 'Email' },
        { id: 'username', label: 'Username' },
        { id: 'password', label: 'Password' },
        { id: 'apiKey', label: 'API Key' },
        { id: 'ip', label: 'IP Address' },
        { id: 'macAddress', label: 'MAC Address' },
        { id: 'port', label: 'Port' },
        { id: 'protocol', label: 'Protocol' },
        { id: 'userAgent', label: 'User Agent' },
        { id: 'color', label: 'Color' },
        { id: 'number', label: 'Number' },
        { id: 'boolean', label: 'Boolean' },
        { id: 'barcode', label: 'Barcode' },
        { id: 'serialNumber', label: 'Serial Number' },
        { id: 'hashtag', label: 'Hashtag' },
        { id: 'mention', label: 'Mention' },
        { id: 'gamertag', label: 'Gamertag' },
        { id: 'licensePlate', label: 'License Plate' },
        { id: 'carModel', label: 'Car Model' },
        { id: 'carYear', label: 'Car Year' },
        { id: 'distance', label: 'Distance' },
        { id: 'speed', label: 'Speed' },
        { id: 'temperature', label: 'Temperature' },
        { id: 'fileSize', label: 'File Size' },
        { id: 'score', label: 'Score' }
      ]
    }
  ];

  const tabsHTML = categories.map((cat, idx) => `<button class="dg-tab ${idx === 0 ? 'active' : ''}" data-tab="${idx}">${cat.title}</button>`).join('');
  const contentHTML = categories.map((cat, idx) => `
    <div class="dg-tab-content ${idx === 0 ? 'active' : ''}" data-content="${idx}">
      <div style="padding: 8px; border-bottom: 1px solid #e5e7eb; display: flex; gap: 6px;">
        <button class="dg-btn dg-btn-secondary dg-select-all" style="flex: 1; padding: 4px;" data-tab="${idx}">Select All</button>
        <button class="dg-btn dg-btn-secondary dg-unselect-all" style="flex: 1; padding: 4px;" data-tab="${idx}">Unselect All</button>
      </div>
      <div class="dg-fields-wrapper">
        ${cat.fields.map(field => `
          <label class="dg-checkbox">
            <input type="checkbox" value="${field.id}" checked>
            <span>${field.label}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="dg-app">
      <div class="dg-header"><h1>🎲 Test Data Generator</h1></div>
      <div class="dg-tabs">${tabsHTML}</div>
      <div class="dg-main">
        <div class="dg-content">${contentHTML}</div>
        <div class="dg-controls">
          <div class="dg-count-control">
            <label>Records:</label>
            <input type="number" id="recordCount" value="1" min="1" max="100">
          </div>
          <div class="dg-buttons">
            <button class="dg-btn dg-btn-primary" id="generateBtn">Generate</button>
            <button class="dg-btn dg-btn-secondary" id="copyBtn">Copy</button>
          </div>
          <div class="dg-results" id="results"></div>
        </div>
      </div>
      <div class="dg-footer">Developed by Haitham Al Mughrabi ❤️ ${new Date().getFullYear()}</div>
    </div>
  `;

  // Tab switching
  document.querySelectorAll('.dg-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabIdx = tab.dataset.tab;
      document.querySelectorAll('.dg-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.dg-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-content="${tabIdx}"]`).classList.add('active');
    });
  });

  // Select All / Unselect All
  document.querySelectorAll('.dg-select-all').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabIdx = btn.dataset.tab;
      document.querySelectorAll(`[data-content="${tabIdx}"] .dg-checkbox input`).forEach(c => c.checked = true);
    });
  });

  document.querySelectorAll('.dg-unselect-all').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabIdx = btn.dataset.tab;
      document.querySelectorAll(`[data-content="${tabIdx}"] .dg-checkbox input`).forEach(c => c.checked = false);
    });
  });

  let generatedData = [];

  document.getElementById('generateBtn').addEventListener('click', () => {
    if (!window.generators || Object.keys(window.generators).length === 0) {
      alert('Generators not loaded');
      return;
    }

    const count = parseInt(document.getElementById('recordCount').value) || 1;
    const checked = Array.from(document.querySelectorAll('.dg-checkbox input')).filter(c => c.checked).map(c => c.value);
    
    if (checked.length === 0) {
      alert('Please select at least one field');
      return;
    }
    
    generatedData = [];
    for (let i = 0; i < count; i++) {
      const record = {};
      checked.forEach(fieldId => {
        if (window.generators[fieldId]) {
          record[fieldId] = window.generators[fieldId]();
        }
      });
      generatedData.push(record);
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = generatedData.map(record => `
      <div class="dg-record">
        ${Object.entries(record).map(([key, value]) => `
          <div class="dg-field">
            <span class="dg-field-label">${key}:</span>
            <span class="dg-field-value" data-value="${value}">${value}</span>
          </div>
        `).join('')}
      </div>
    `).join('');
    
    // Add click handlers for copy
    document.querySelectorAll('.dg-field-value').forEach(el => {
      el.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        navigator.clipboard.writeText(value).then(() => {
          const original = this.textContent;
          this.textContent = 'Copied!';
          setTimeout(() => this.textContent = original, 800);
        });
      });
    });
  });

  document.getElementById('copyBtn').addEventListener('click', () => {
    if (generatedData.length === 0) {
      alert('Generate data first');
      return;
    }
    navigator.clipboard.writeText(JSON.stringify(generatedData, null, 2)).then(() => {
      const btn = document.getElementById('copyBtn');
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = originalText, 1000);
    });
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createDataGeneratorUI };
} else if (typeof window !== 'undefined') {
  window.createDataGeneratorUI = createDataGeneratorUI;
}
