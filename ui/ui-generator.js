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
    .dg-top-controls { display: flex; gap: 6px; padding: 8px 0; border-bottom: 1px solid #e2e8f0; flex-shrink: 0; }
    .dg-top-controls .dg-btn { flex: 1; padding: 8px 10px; font-size: 11px; margin: 0; background: #667eea !important; color: white !important; min-width: 0; height: 32px; display: flex; align-items: center; justify-content: center; }
    .dg-top-controls .dg-btn:hover { background: #5a67d8 !important; }
    .dg-tab-content { display: none; padding: 14px; }
    .dg-tab-content.active { display: block; }
    .dg-tab-controls { display: flex; gap: 6px; margin-bottom: 8px; }
    .dg-tab-controls .dg-btn { flex: 1; padding: 8px 10px; font-size: 11px; background: #cbd5e1 !important; color: #334155 !important; min-width: 0; height: 32px; display: flex; align-items: center; justify-content: center; }
    .dg-tab-controls .dg-btn:hover { background: #94a3b8 !important; }
    .dg-fields-wrapper { display: flex; flex-wrap: wrap; gap: 8px; }
    .dg-checkbox { display: inline-flex; align-items: center; gap: 6px; padding: 8px 10px; cursor: pointer; font-size: 12px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; transition: all 0.2s; width: calc(50% - 4px); box-sizing: border-box; }
    .dg-checkbox:hover { background: #e0e7ff; border-color: #667eea; }
    .dg-checkbox input { margin: 0; cursor: pointer; }
    .dg-controls { background: white; border-top: 1px solid #e2e8f0; flex-shrink: 0; transition: all 0.3s ease; }
    .dg-controls.collapsed .dg-controls-content { display: none; }
    .dg-controls.collapsed .dg-results { display: none; }
    .dg-controls-header { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-bottom: 1px solid #f1f5f9; cursor: pointer; user-select: none; }
    .dg-controls-header:hover { background: #f8fafc; }
    .dg-controls-header span { font-size: 12px; font-weight: 600; color: #64748b; }
    .dg-controls-toggle { font-size: 14px; transition: transform 0.3s ease; }
    .dg-controls.collapsed .dg-controls-toggle { transform: rotate(180deg); }
    .dg-controls-content { padding: 12px; }
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
    .dg-record-contents { flex: 1; overflow-y: auto; padding: 0; }
    .dg-record-content { display: none; height: 100%; }
    .dg-record-content.active { display: flex; flex-direction: column; }
    .dg-category-tabs { display: flex; background: #f1f5f9; border-bottom: 1px solid #e2e8f0; overflow-x: auto; flex-shrink: 0; }
    .dg-category-tab { padding: 6px 10px; border: none; background: none; cursor: pointer; font-size: 10px; font-weight: 600; color: #64748b; border-bottom: 2px solid transparent; white-space: nowrap; transition: all 0.2s; }
    .dg-category-tab:hover { color: #667eea; }
    .dg-category-tab.active { color: #667eea; border-bottom-color: #667eea; }
    .dg-category-contents { flex: 1; overflow-y: auto; padding: 8px; }
    .dg-category-content { display: none; }
    .dg-category-content.active { display: block; }
    .dg-record-field { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 4px; font-size: 10px; }
    .dg-record-label { font-weight: 500; color: #64748b; }
    .dg-field-value { color: #334155; word-break: break-all; cursor: pointer; padding: 3px 6px; border-radius: 3px; background: #f1f5f9; transition: all 0.2s; }
    .dg-field-value:hover { background: #e0e7ff; color: #667eea; }
    .dg-footer { font-size: 9px; color: #94a3b8; text-align: center; padding: 8px; border-top: 1px solid #e2e8f0; flex-shrink: 0; }
    .dg-file-controls { display: none; margin-top: 10px; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; }
    .dg-file-controls.active { display: block; }
    .dg-file-control-group { margin-bottom: 10px; }
    .dg-file-control-group:last-child { margin-bottom: 0; }
    .dg-file-control-group label { display: block; font-size: 11px; font-weight: 600; color: #334155; margin-bottom: 4px; }
    .dg-file-control-group input, .dg-file-control-group select { width: 100%; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 11px; box-sizing: border-box; }
    .dg-file-size-group { display: flex; gap: 6px; }
    .dg-file-size-group input { flex: 1; }
    .dg-file-size-group select { width: 80px; flex-shrink: 0; }
  `;
  document.head.appendChild(style);

  const categories = [
    { title: 'Personal', fields: [
      { id: 'firstName', label: 'First Name (EN)' }, 
      { id: 'firstNameAr', label: 'First Name (AR)' }, 
      { id: 'lastName', label: 'Last Name (EN)' }, 
      { id: 'lastNameAr', label: 'Last Name (AR)' }, 
      { id: 'fullName', label: 'Full Name (EN)' }, 
      { id: 'fullNameAr', label: 'Full Name (AR)' }, 
      { id: 'gender', label: 'Gender (EN)' }, 
      { id: 'genderAr', label: 'Gender (AR)' }, 
      { id: 'birthdate', label: 'Birthdate' }, 
      { id: 'age', label: 'Age' }, 
      { id: 'nationality', label: 'Nationality (EN)' }, 
      { id: 'nationalityAr', label: 'Nationality (AR)' }, 
      { id: 'bloodType', label: 'Blood Type' }, 
      { id: 'saudiId', label: 'Saudi ID' }, 
      { id: 'iqamaNumber', label: 'Iqama Number' },
      { id: 'passportNumber', label: 'Passport Number' },
      { id: 'maritalStatus', label: 'Marital Status (EN)' },
      { id: 'maritalStatusAr', label: 'Marital Status (AR)' },
      { id: 'religion', label: 'Religion (EN)' },
      { id: 'religionAr', label: 'Religion (AR)' }
    ] },
    { title: 'Contact', fields: [
      { id: 'email', label: 'Email' }, 
      { id: 'mobileNumber', label: 'Mobile Number' },
      { id: 'landlineNumber', label: 'Landline Number' },
      { id: 'whatsappNumber', label: 'WhatsApp Number' },
      { id: 'address', label: 'Address (EN)' }, 
      { id: 'addressAr', label: 'Address (AR)' }, 
      { id: 'nationalAddress', label: 'National Address' },
      { id: 'city', label: 'City (EN)' }, 
      { id: 'cityAr', label: 'City (AR)' }, 
      { id: 'district', label: 'District (EN)' },
      { id: 'districtAr', label: 'District (AR)' },
      { id: 'street', label: 'Street (EN)' },
      { id: 'streetAr', label: 'Street (AR)' },
      { id: 'buildingNumber', label: 'Building Number' },
      { id: 'unitNumber', label: 'Unit Number' },
      { id: 'postalCode', label: 'Postal Code' }, 
      { id: 'additionalNumber', label: 'Additional Number' },
      { id: 'country', label: 'Country (EN)' }, 
      { id: 'countryAr', label: 'Country (AR)' }
    ] },
    { title: 'Saudi Government', fields: [
      { id: 'commercialRegister', label: 'Commercial Register' },
      { id: 'taxNumber', label: 'Tax Number (VAT)' },
      { id: 'municipalLicense', label: 'Municipal License' },
      { id: 'chamberMembership', label: 'Chamber Membership' },
      { id: 'socialInsurance', label: 'Social Insurance (GOSI)' },
      { id: 'laborOfficeNumber', label: 'Labor Office Number' },
      { id: 'zakat', label: 'Zakat Number' },
      { id: 'customsCode', label: 'Customs Code' },
      { id: 'saudiPost', label: 'Saudi Post Box' },
      { id: 'absherId', label: 'Absher ID' },
      { id: 'nafathId', label: 'Nafath ID' },
      { id: 'elmId', label: 'Elm ID' },
      { id: 'region', label: 'Region (EN)' },
      { id: 'regionAr', label: 'Region (AR)' },
      { id: 'province', label: 'Province (EN)' },
      { id: 'provinceAr', label: 'Province (AR)' }
    ] },
    { title: 'Work', fields: [
      { id: 'company', label: 'Company' }, 
      { id: 'jobTitle', label: 'Job Title (EN)' }, 
      { id: 'jobTitleAr', label: 'Job Title (AR)' }, 
      { id: 'salary', label: 'Salary' }, 
      { id: 'department', label: 'Department (EN)' }, 
      { id: 'departmentAr', label: 'Department (AR)' },
      { id: 'workEmail', label: 'Work Email' },
      { id: 'workPhone', label: 'Work Phone' },
      { id: 'employeeId', label: 'Employee ID' },
      { id: 'workExperience', label: 'Experience (Years)' },
      { id: 'workLocation', label: 'Work Location (EN)' },
      { id: 'workLocationAr', label: 'Work Location (AR)' }
    ] },
    { title: 'Education', fields: [
      { id: 'university', label: 'University (EN)' },
      { id: 'universityAr', label: 'University (AR)' },
      { id: 'degree', label: 'Degree (EN)' },
      { id: 'degreeAr', label: 'Degree (AR)' },
      { id: 'major', label: 'Major (EN)' },
      { id: 'majorAr', label: 'Major (AR)' },
      { id: 'graduationYear', label: 'Graduation Year' },
      { id: 'gpa', label: 'GPA' },
      { id: 'studentId', label: 'Student ID' }
    ] },
    { title: 'Finance', fields: [
      { id: 'iban', label: 'IBAN' }, 
      { id: 'creditCard', label: 'Credit Card' }, 
      { id: 'cvv', label: 'CVV' }, 
      { id: 'bankName', label: 'Bank Name (EN)' },
      { id: 'bankNameAr', label: 'Bank Name (AR)' },
      { id: 'accountNumber', label: 'Account Number' },
      { id: 'swiftCode', label: 'SWIFT Code' },
      { id: 'currency', label: 'Currency (EN)' },
      { id: 'currencyAr', label: 'Currency (AR)' }
    ] },
    { title: 'Healthcare', fields: [
      { id: 'medicalRecord', label: 'Medical Record' },
      { id: 'insuranceNumber', label: 'Insurance Number' },
      { id: 'doctorName', label: 'Doctor Name (EN)' },
      { id: 'doctorNameAr', label: 'Doctor Name (AR)' },
      { id: 'hospital', label: 'Hospital (EN)' },
      { id: 'hospitalAr', label: 'Hospital (AR)' },
      { id: 'diagnosis', label: 'Diagnosis (EN)' },
      { id: 'diagnosisAr', label: 'Diagnosis (AR)' },
      { id: 'medication', label: 'Medication (EN)' },
      { id: 'medicationAr', label: 'Medication (AR)' }
    ] },
    { title: 'Vehicle', fields: [
      { id: 'licensePlate', label: 'License Plate' },
      { id: 'carModel', label: 'Car Model (EN)' },
      { id: 'carModelAr', label: 'Car Model (AR)' },
      { id: 'carBrand', label: 'Car Brand (EN)' },
      { id: 'carBrandAr', label: 'Car Brand (AR)' },
      { id: 'carYear', label: 'Car Year' },
      { id: 'carColor', label: 'Car Color (EN)' },
      { id: 'carColorAr', label: 'Car Color (AR)' },
      { id: 'vin', label: 'VIN Number' },
      { id: 'engineNumber', label: 'Engine Number' }
    ] },
    { title: 'Date & Time', fields: [
      { id: 'date', label: 'Date' }, 
      { id: 'time', label: 'Time' }, 
      { id: 'datetime', label: 'DateTime' }, 
      { id: 'timestamp', label: 'Timestamp' },
      { id: 'hijriDate', label: 'Hijri Date' },
      { id: 'dayOfWeek', label: 'Day of Week (EN)' },
      { id: 'dayOfWeekAr', label: 'Day of Week (AR)' },
      { id: 'month', label: 'Month (EN)' },
      { id: 'monthAr', label: 'Month (AR)' }
    ] },
    { title: 'Other', fields: [
      { id: 'uuid', label: 'UUID' }, 
      { id: 'url', label: 'URL' }, 
      { id: 'password', label: 'Password' }, 
      { id: 'ip', label: 'IP Address' }, 
      { id: 'color', label: 'Color' },
      { id: 'macAddress', label: 'MAC Address' },
      { id: 'userAgent', label: 'User Agent' },
      { id: 'apiKey', label: 'API Key' }
    ] },
    { title: 'Files', fields: [
      { id: 'txt', label: 'Text File (.txt)' }, 
      { id: 'json', label: 'JSON File (.json)' }, 
      { id: 'csv', label: 'CSV File (.csv)' },
      { id: 'xml', label: 'XML File (.xml)' },
      { id: 'html', label: 'HTML File (.html)' },
      { id: 'css', label: 'CSS File (.css)' },
      { id: 'js', label: 'JavaScript (.js)' },
      { id: 'py', label: 'Python File (.py)' },
      { id: 'java', label: 'Java File (.java)' },
      { id: 'cpp', label: 'C++ File (.cpp)' },
      { id: 'pdf', label: 'PDF File (.pdf)' },
      { id: 'doc', label: 'Word File (.doc)' },
      { id: 'docx', label: 'Word File (.docx)' },
      { id: 'xlsx', label: 'Excel File (.xlsx)' },
      { id: 'xls', label: 'Excel File (.xls)' },
      { id: 'ppt', label: 'PowerPoint (.ppt)' },
      { id: 'pptx', label: 'PowerPoint (.pptx)' },
      { id: 'jpg', label: 'JPEG Image (.jpg)' },
      { id: 'png', label: 'PNG Image (.png)' },
      { id: 'gif', label: 'GIF Image (.gif)' },
      { id: 'svg', label: 'SVG Image (.svg)' },
      { id: 'bmp', label: 'BMP Image (.bmp)' },
      { id: 'webp', label: 'WebP Image (.webp)' },
      { id: 'ico', label: 'Icon File (.ico)' },
      { id: 'zip', label: 'ZIP Archive (.zip)' },
      { id: 'rar', label: 'RAR Archive (.rar)' },
      { id: '7z', label: '7-Zip Archive (.7z)' },
      { id: 'tar', label: 'TAR Archive (.tar)' },
      { id: 'mp3', label: 'MP3 Audio (.mp3)' },
      { id: 'wav', label: 'WAV Audio (.wav)' },
      { id: 'flac', label: 'FLAC Audio (.flac)' },
      { id: 'mp4', label: 'MP4 Video (.mp4)' },
      { id: 'avi', label: 'AVI Video (.avi)' },
      { id: 'mkv', label: 'MKV Video (.mkv)' },
      { id: 'mov', label: 'MOV Video (.mov)' },
      { id: 'wmv', label: 'WMV Video (.wmv)' },
      { id: 'sql', label: 'SQL File (.sql)' },
      { id: 'db', label: 'Database (.db)' },
      { id: 'log', label: 'Log File (.log)' },
      { id: 'ini', label: 'Config File (.ini)' },
      { id: 'cfg', label: 'Config File (.cfg)' },
      { id: 'conf', label: 'Config File (.conf)' },
      { id: 'yaml', label: 'YAML File (.yaml)' },
      { id: 'yml', label: 'YAML File (.yml)' },
      { id: 'toml', label: 'TOML File (.toml)' },
      { id: 'md', label: 'Markdown (.md)' },
      { id: 'rtf', label: 'Rich Text (.rtf)' },
      { id: 'eps', label: 'EPS File (.eps)' },
      { id: 'ai', label: 'Adobe Illustrator (.ai)' },
      { id: 'psd', label: 'Photoshop (.psd)' },
      { id: 'sketch', label: 'Sketch File (.sketch)' },
      { id: 'fig', label: 'Figma File (.fig)' }
    ] }
  ];

  const tabsHTML = categories.map((cat, idx) => `<button class="dg-tab ${idx === 0 ? 'active' : ''}" data-tab="${idx}">${cat.title}</button>`).join('');
  const contentHTML = categories.map((cat, idx) => `
    <div class="dg-tab-content ${idx === 0 ? 'active' : ''}" data-content="${idx}">
      <div class="dg-tab-controls">
        <button class="dg-btn dg-btn-secondary dg-select-all" data-tab="${idx}">✓ Tab</button>
        <button class="dg-btn dg-btn-secondary dg-unselect-all" data-tab="${idx}">✕ Tab</button>
      </div>
      <div class="dg-fields-wrapper">
        ${cat.fields.map(field => `<label class="dg-checkbox"><input type="checkbox" value="${field.id}"><span>${field.label}</span></label>`).join('')}
      </div>
      ${cat.title === 'Files' ? `
        <div class="dg-file-controls" id="fileControls">
          <div class="dg-file-control-group">
            <label>File Name:</label>
            <input type="text" id="fileName" placeholder="test-file" value="test-file">
          </div>
          <div class="dg-file-control-group">
            <label>File Size:</label>
            <div class="dg-file-size-group">
              <input type="number" id="fileSize" value="10" min="1">
              <select id="fileSizeUnit">
                <option value="B">Bytes</option>
                <option value="KB" selected>KB</option>
                <option value="MB">MB</option>
                <option value="GB">GB</option>
              </select>
            </div>
          </div>
        </div>
      ` : ''}
      ${cat.title === 'Date & Time' ? `
        <div class="dg-file-controls" id="dateTimeControls">
          <div class="dg-file-control-group">
            <label>Date Range:</label>
            <div class="dg-file-size-group">
              <input type="date" id="dateFrom" value="2020-01-01">
              <input type="date" id="dateTo" value="2030-12-31">
            </div>
          </div>
          <div class="dg-file-control-group">
            <label>Time Range:</label>
            <div class="dg-file-size-group">
              <input type="time" id="timeFrom" value="00:00">
              <input type="time" id="timeTo" value="23:59">
            </div>
          </div>
          <div class="dg-file-control-group">
            <label>Date Format:</label>
            <select id="dateFormat">
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD-MM-YYYY">DD-MM-YYYY</option>
            </select>
          </div>
        </div>
      ` : ''}
    </div>
  `).join('');

  container.innerHTML = `
    <div class="dg-app">
      <div class="dg-header"><h1>🎲 Test Data Generator</h1></div>
      <div class="dg-tabs">${tabsHTML}</div>
      <div class="dg-main">
        <div class="dg-content">
          <div class="dg-top-controls">
            <button class="dg-btn dg-btn-secondary dg-select-all-categories">✓ Select All</button>
            <button class="dg-btn dg-btn-secondary dg-unselect-all-categories">✕ Unselect All</button>
          </div>
          ${contentHTML}
        </div>
        <div class="dg-controls">
          <div class="dg-controls-header" id="controlsHeader">
            <span>Controls</span>
            <div class="dg-controls-toggle">▲</div>
          </div>
          <div class="dg-controls-content">
            <div class="dg-count-control">
              <label>Records:</label>
              <input type="number" id="recordCount" value="1" min="1" max="100">
            </div>
            <div class="dg-buttons">
              <button class="dg-btn dg-btn-primary" id="generateBtn">Generate</button>
              <button class="dg-btn dg-btn-secondary" id="copyBtn">Copy</button>
              <button class="dg-btn dg-btn-secondary" id="downloadBtn" style="display: none;">💾 Save File</button>
            </div>
          </div>
          <div class="dg-results" id="results"></div>
        </div>
      </div>
      <div class="dg-footer">Developed by Haitham Al Mughrabi ❤️ ${new Date().getFullYear()}</div>
    </div>
  `;

  let generatedData = [];

  document.querySelectorAll('.dg-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabIdx = tab.dataset.tab;
      document.querySelectorAll('.dg-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.dg-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-content="${tabIdx}"]`).classList.add('active');
      
      // Show/hide file controls and download button based on Files tab
      const isFilesTab = categories[tabIdx].title === 'Files';
      const isDateTimeTab = categories[tabIdx].title === 'Date & Time';
      const fileControls = document.getElementById('fileControls');
      const dateTimeControls = document.getElementById('dateTimeControls');
      const downloadBtn = document.getElementById('downloadBtn');
      
      if (fileControls) {
        fileControls.classList.toggle('active', isFilesTab);
      }
      if (dateTimeControls) {
        dateTimeControls.classList.toggle('active', isDateTimeTab);
      }
      if (downloadBtn) {
        downloadBtn.style.display = isFilesTab ? 'inline-block' : 'none';
      }
    });
  });

  document.querySelector('.dg-select-all-categories').addEventListener('click', () => {
    document.querySelectorAll('.dg-checkbox input').forEach(c => c.checked = true);
  });

  document.querySelector('.dg-unselect-all-categories').addEventListener('click', () => {
    document.querySelectorAll('.dg-checkbox input').forEach(c => c.checked = false);
  });

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

  document.getElementById('controlsHeader').addEventListener('click', () => {
    const controls = document.querySelector('.dg-controls');
    controls.classList.toggle('collapsed');
  });

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

    // Check if any file types are selected
    const fileTypes = ['txt', 'json', 'csv', 'xml', 'html', 'pdf', 'doc', 'xlsx', 'jpg', 'png', 'zip'];
    const selectedFileTypes = checked.filter(field => fileTypes.includes(field));
    
    if (selectedFileTypes.length > 0) {
      // Handle file generation
      const fileName = document.getElementById('fileName').value || 'test-file';
      const fileSize = parseInt(document.getElementById('fileSize').value) || 10;
      const fileSizeUnit = document.getElementById('fileSizeUnit').value;
      
      generatedData = [];
      selectedFileTypes.forEach(fileType => {
        const record = {
          fileName: `${fileName}.${fileType}`,
          fileType: fileType,
          fileSize: `${fileSize} ${fileSizeUnit}`,
          generated: new Date().toISOString()
        };
        generatedData.push(record);
      });
    } else {
      // Handle regular data generation
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
    }

    const resultsDiv = document.getElementById('results');
    const recordTabs = generatedData.map((_, idx) => `<button class="dg-record-tab ${idx === 0 ? 'active' : ''}" data-record="${idx}">Record ${idx + 1}</button>`).join('');
    const recordContents = generatedData.map((record, recordIdx) => {
      const grouped = {};
      Object.entries(record).forEach(([key, value]) => {
        const category = categories.find(cat => cat.fields.some(f => f.id === key));
        const catName = category ? category.title : 'Other';
        if (!grouped[catName]) grouped[catName] = [];
        grouped[catName].push({ key, value });
      });
      
      const catTabs = Object.keys(grouped).map((cat, idx) => `<button class="dg-category-tab ${idx === 0 ? 'active' : ''}" data-category="${recordIdx}-${cat}">${cat}</button>`).join('');
      const catContents = Object.entries(grouped).map(([cat, fields], idx) => `
        <div class="dg-category-content ${idx === 0 ? 'active' : ''}" data-category-content="${recordIdx}-${cat}">
          ${fields.map(({ key, value }) => `<div class="dg-record-field"><span class="dg-record-label">${key}</span><span class="dg-field-value" data-value="${value}">${value}</span></div>`).join('')}
        </div>
      `).join('');
      
      return `
        <div class="dg-record-content ${recordIdx === 0 ? 'active' : ''}" data-record-content="${recordIdx}">
          <div class="dg-category-tabs">${catTabs}</div>
          <div class="dg-category-contents">${catContents}</div>
        </div>
      `;
    }).join('');
    
    resultsDiv.innerHTML = `<div class="dg-record-tabs">${recordTabs}</div><div class="dg-record-contents">${recordContents}</div>`;
    
    document.querySelectorAll('.dg-record-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const recordIdx = tab.dataset.record;
        document.querySelectorAll('.dg-record-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.dg-record-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.querySelector(`.dg-record-content[data-record-content="${recordIdx}"]`).classList.add('active');
      });
    });
    
    document.querySelectorAll('.dg-category-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const catKey = tab.dataset.category;
        const recordIdx = catKey.split('-')[0];
        document.querySelectorAll(`.dg-record-content[data-record-content="${recordIdx}"] .dg-category-tab`).forEach(t => t.classList.remove('active'));
        document.querySelectorAll(`.dg-record-content[data-record-content="${recordIdx}"] .dg-category-content`).forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.querySelector(`.dg-category-content[data-category-content="${catKey}"]`).classList.add('active');
      });
    });
    
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

  document.getElementById('downloadBtn').addEventListener('click', () => {
    if (generatedData.length === 0) {
      alert('Generate files first');
      return;
    }

    // Check if we have file data
    const hasFileData = generatedData.some(record => record.fileType);
    if (!hasFileData) {
      alert('No files generated. Please select file types and generate first.');
      return;
    }

    const fileName = document.getElementById('fileName').value || 'test-file';
    const fileSize = parseInt(document.getElementById('fileSize').value) || 10;
    const fileSizeUnit = document.getElementById('fileSizeUnit').value;
    
    let fileSizeBytes = fileSize;
    if (fileSizeUnit === 'KB') fileSizeBytes = fileSize * 1024;
    else if (fileSizeUnit === 'MB') fileSizeBytes = fileSize * 1024 * 1024;
    else if (fileSizeUnit === 'GB') fileSizeBytes = fileSize * 1024 * 1024 * 1024;
    
    // Download each generated file
    generatedData.forEach(record => {
      if (!record.fileType) return;
      
      const fileType = record.fileType;
      let content = '';
      let mimeType = 'text/plain';
      
      if (fileType === 'json') {
        content = JSON.stringify({ message: 'Test JSON file', generated: new Date().toISOString() }, null, 2);
        mimeType = 'application/json';
      } else if (fileType === 'csv') {
        content = 'Name,Email,Phone\nJohn Doe,john@example.com,+1234567890\nJane Smith,jane@example.com,+0987654321';
        mimeType = 'text/csv';
      } else if (fileType === 'xml') {
        content = '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n  <message>Test XML file</message>\n  <generated>' + new Date().toISOString() + '</generated>\n</data>';
        mimeType = 'application/xml';
      } else if (fileType === 'html') {
        content = '<!DOCTYPE html><html><head><title>Test HTML</title></head><body><h1>Test HTML File</h1><p>Generated: ' + new Date().toISOString() + '</p></body></html>';
        mimeType = 'text/html';
      } else if (fileType === 'css') {
        content = 'body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }\n.container { max-width: 1200px; margin: 0 auto; }';
        mimeType = 'text/css';
      } else if (fileType === 'js') {
        content = 'console.log("Test JavaScript file generated on ' + new Date().toISOString() + '");\nfunction testFunction() {\n  return "Hello World";\n}';
        mimeType = 'application/javascript';
      } else if (fileType === 'py') {
        content = '#!/usr/bin/env python3\n# Test Python file\nprint("Generated on ' + new Date().toISOString() + '")\n\ndef hello_world():\n    return "Hello World"';
        mimeType = 'text/x-python';
      } else if (fileType === 'java') {
        content = 'public class TestFile {\n    public static void main(String[] args) {\n        System.out.println("Generated on ' + new Date().toISOString() + '");\n    }\n}';
        mimeType = 'text/x-java-source';
      } else if (fileType === 'cpp') {
        content = '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Generated on ' + new Date().toISOString() + '" << endl;\n    return 0;\n}';
        mimeType = 'text/x-c++src';
      } else if (fileType === 'sql') {
        content = '-- Test SQL file\n-- Generated on ' + new Date().toISOString() + '\nCREATE TABLE users (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    email VARCHAR(100)\n);';
        mimeType = 'application/sql';
      } else if (['yaml', 'yml'].includes(fileType)) {
        content = 'name: Test YAML\nversion: 1.0\ngenerated: ' + new Date().toISOString() + '\nconfig:\n  debug: true\n  port: 8080';
        mimeType = 'application/x-yaml';
      } else if (fileType === 'md') {
        content = '# Test Markdown File\n\nGenerated on ' + new Date().toISOString() + '\n\n## Features\n- Item 1\n- Item 2\n\n**Bold text** and *italic text*';
        mimeType = 'text/markdown';
      } else if (['jpg', 'png', 'gif', 'bmp', 'webp'].includes(fileType)) {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = '#fff';
        ctx.font = '30px Arial';
        ctx.fillText('Test Image - ' + new Date().toISOString(), 50, 300);
        content = canvas.toDataURL('image/' + (fileType === 'jpg' ? 'jpeg' : fileType));
        mimeType = 'image/' + (fileType === 'jpg' ? 'jpeg' : fileType);
      } else if (fileType === 'svg') {
        content = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#${Math.floor(Math.random()*16777215).toString(16)}"/>
          <text x="50" y="300" font-size="30" fill="white">Test SVG - ${new Date().toISOString()}</text>
        </svg>`;
        mimeType = 'image/svg+xml';
      } else {
        content = `This is a test ${fileType.toUpperCase()} file generated on ${new Date().toISOString()}\n\nFile Type: ${fileType}\nSize: ${fileSize} ${fileSizeUnit}`;
      }
      
      // Handle image data URLs differently
      if (['jpg', 'png', 'gif', 'bmp', 'webp'].includes(fileType)) {
        const a = document.createElement('a');
        a.href = content;
        a.download = `${fileName}.${fileType}`;
        a.click();
      } else {
        // Pad to exact size for non-image files
        if (content.length < fileSizeBytes) {
          content += '\n' + 'x'.repeat(fileSizeBytes - content.length - 1);
        } else if (content.length > fileSizeBytes) {
          content = content.substring(0, fileSizeBytes);
        }
        
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.${fileType}`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createDataGeneratorUI };
} else if (typeof window !== 'undefined') {
  window.createDataGeneratorUI = createDataGeneratorUI;
}
