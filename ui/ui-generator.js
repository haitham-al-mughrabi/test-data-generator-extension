function createDataGeneratorUI(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const style = document.createElement('style');
  style.textContent = `
    .dg-app { height: 100%; display: flex; flex-direction: column; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; }
    .dg-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px; text-align: center; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .dg-header h1 { font-size: 15px; font-weight: 700; margin: 0; }
    .dg-tabs { display: flex; background: white; border-bottom: 2px solid #e2e8f0; overflow-x: auto; flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .dg-tab { padding: 10px 14px; border: none; background: none; cursor: pointer; font-size: 12px; font-weight: 600; color: #64748b; border-bottom: 3px solid transparent; white-space: nowrap; transition: all 0.2s; }
    .dg-tab:hover { color: #667eea; }
    .dg-tab.active { color: #667eea; border-bottom-color: #667eea; }
    .dg-main { flex: 1; display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
    .dg-content { flex: 1; overflow-y: auto; min-height: 0; background: white; }
    .dg-tab-content { display: none; padding: 14px; }
    .dg-tab-content.active { display: block; }
    .dg-fields-wrapper { display: flex; flex-wrap: wrap; gap: 8px; }
    .dg-checkbox { display: inline-flex; align-items: center; gap: 6px; padding: 8px 10px; cursor: pointer; font-size: 12px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; transition: all 0.2s; width: calc(50% - 4px); box-sizing: border-box; }
    .dg-checkbox:hover { background: #e0e7ff; border-color: #667eea; }
    .dg-checkbox input { margin: 0; cursor: pointer; }
    .dg-controls { background: white; padding: 12px; border-top: 1px solid #e2e8f0; flex-shrink: 0; }
    .dg-count-control { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; font-size: 12px; font-weight: 500; }
    .dg-count-control input { width: 60px; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12px; }
    .dg-buttons { display: flex; gap: 8px; }
    .dg-btn { padding: 8px 14px; border: none; border-radius: 5px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.2s; }
    .dg-btn-primary { background: #667eea; color: white; }
    .dg-btn-primary:hover { background: #5a67d8; box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3); }
    .dg-btn-secondary { background: #e2e8f0; color: #334155; }
    .dg-btn-secondary:hover { background: #cbd5e1; }
    .dg-results { max-height: 140px; overflow-y: auto; font-size: 11px; background: #f8fafc; padding: 0; margin-top: 10px; border-radius: 6px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; }
    .dg-record-tabs { display: flex; background: white; border-bottom: 1px solid #e2e8f0; overflow-x: auto; flex-shrink: 0; }
    .dg-record-tab { padding: 8px 12px; border: none; background: none; cursor: pointer; font-size: 11px; font-weight: 600; color: #64748b; border-bottom: 2px solid transparent; white-space: nowrap; transition: all 0.2s; }
    .dg-record-tab:hover { color: #667eea; }
    .dg-record-tab.active { color: #667eea; border-bottom-color: #667eea; }
    .dg-record-contents { flex: 1; overflow-y: auto; padding: 8px; }
    .dg-record-content { display: none; }
    .dg-record-content.active { display: block; }
    .dg-record-card { background: white; border: 1px solid #e2e8f0; border-radius: 5px; padding: 8px; }
    .dg-record-title { font-weight: 700; color: #667eea; font-size: 11px; margin-bottom: 6px; }
    .dg-record-field { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 4px; font-size: 10px; }
    .dg-record-label { font-weight: 500; color: #64748b; }
    .dg-record { margin-bottom: 10px; padding: 10px; background: white; border: 1px solid #e2e8f0; border-radius: 5px; }
    .dg-record-header { font-weight: 700; color: #667eea; margin-bottom: 6px; font-size: 11px; }
    .dg-category { margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #f1f5f9; }
    .dg-category-name { font-weight: 600; color: #475569; font-size: 10px; margin-bottom: 4px; }
    .dg-field { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 4px; }
    .dg-field-label { font-weight: 500; color: #64748b; font-size: 10px; }
    .dg-field-value { color: #334155; word-break: break-all; cursor: pointer; padding: 3px 6px; border-radius: 3px; background: #f1f5f9; transition: all 0.2s; }
    .dg-field-value:hover { background: #e0e7ff; color: #667eea; }
    .dg-footer { font-size: 9px; color: #94a3b8; text-align: center; padding: 8px; border-top: 1px solid #e2e8f0; flex-shrink: 0; }
  `;
  document.head.appendChild(style);

  const categories = [
    {
      title: 'Personal',
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
      title: 'Contact',
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
      title: 'Work',
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
      title: 'Finance',
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
      title: 'Date & Time',
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
      title: 'Other',
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
      if (window.resetSharedData) window.resetSharedData();
      const record = {};
      checked.forEach(fieldId => {
        if (window.generators[fieldId]) {
          try {
            record[fieldId] = window.generators[fieldId]();
          } catch (e) {
            record[fieldId] = 'Error';
          }
        }
      });
      generatedData.push(record);
    }

    const resultsDiv = document.getElementById('results');
    
    const recordTabs = generatedData.map((_, idx) => 
      `<button class="dg-record-tab ${idx === 0 ? 'active' : ''}" data-record="${idx}">Record ${idx + 1}</button>`
    ).join('');
    
    const recordContents = generatedData.map((record, idx) => `
      <div class="dg-record-content ${idx === 0 ? 'active' : ''}" data-record-content="${idx}">
        ${Object.entries(record).map(([key, value]) => `
          <div class="dg-record-field">
            <span class="dg-record-label">${key}</span>
            <span class="dg-field-value" data-value="${value}">${value}</span>
          </div>
        `).join('')}
      </div>
    `).join('');
    
    resultsDiv.innerHTML = `
      <div class="dg-record-tabs">${recordTabs}</div>
      <div class="dg-record-contents">${recordContents}</div>
    `;
    
    // Record tab switching
    document.querySelectorAll('.dg-record-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const recordIdx = tab.dataset.record;
        document.querySelectorAll('.dg-record-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.dg-record-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.querySelector(`.dg-record-content[data-record-content="${recordIdx}"]`).classList.add('active');
      });
    });
    
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
