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
    #fileControls { display: none; margin-top: 10px; padding: 10px; background: #f1f5f9; border-radius: 5px; }
    #fileControls input, #fileControls select { width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 11px; box-sizing: border-box; margin-top: 4px; margin-bottom: 8px; }
    #fileControls label { font-size: 11px; font-weight: 600; color: #334155; }
  `;
  document.head.appendChild(style);

  const categories = [
    { title: 'Personal', fields: [{ id: 'firstName', label: 'First Name (EN)' }, { id: 'firstNameAr', label: 'First Name (AR)' }, { id: 'lastName', label: 'Last Name (EN)' }, { id: 'lastNameAr', label: 'Last Name (AR)' }, { id: 'fullName', label: 'Full Name (EN)' }, { id: 'fullNameAr', label: 'Full Name (AR)' }, { id: 'gender', label: 'Gender (EN)' }, { id: 'genderAr', label: 'Gender (AR)' }, { id: 'birthdate', label: 'Birthdate' }, { id: 'age', label: 'Age' }, { id: 'nationality', label: 'Nationality (EN)' }, { id: 'nationalityAr', label: 'Nationality (AR)' }, { id: 'bloodType', label: 'Blood Type' }, { id: 'saudiId', label: 'Saudi ID' }, { id: 'passportNumber', label: 'Passport Number' }] },
    { title: 'Contact', fields: [{ id: 'email', label: 'Email' }, { id: 'phone', label: 'Phone' }, { id: 'address', label: 'Address (EN)' }, { id: 'addressAr', label: 'Address (AR)' }, { id: 'city', label: 'City (EN)' }, { id: 'cityAr', label: 'City (AR)' }, { id: 'postalCode', label: 'Postal Code' }, { id: 'country', label: 'Country (EN)' }, { id: 'countryAr', label: 'Country (AR)' }] },
    { title: 'Work', fields: [{ id: 'company', label: 'Company' }, { id: 'jobTitle', label: 'Job Title (EN)' }, { id: 'jobTitleAr', label: 'Job Title (AR)' }, { id: 'salary', label: 'Salary' }, { id: 'department', label: 'Department (EN)' }, { id: 'departmentAr', label: 'Department (AR)' }] },
    { title: 'Finance', fields: [{ id: 'iban', label: 'IBAN' }, { id: 'creditCard', label: 'Credit Card' }, { id: 'cvv', label: 'CVV' }, { id: 'bankName', label: 'Bank Name' }] },
    { title: 'Date & Time', fields: [{ id: 'date', label: 'Date' }, { id: 'time', label: 'Time' }, { id: 'datetime', label: 'DateTime' }, { id: 'timestamp', label: 'Timestamp' }] },
    { title: 'Other', fields: [{ id: 'uuid', label: 'UUID' }, { id: 'url', label: 'URL' }, { id: 'email', label: 'Email' }, { id: 'password', label: 'Password' }, { id: 'ip', label: 'IP Address' }, { id: 'color', label: 'Color' }] },
    { title: 'Files', fields: [{ id: 'txt', label: 'Text File (.txt)' }, { id: 'json', label: 'JSON File (.json)' }, { id: 'csv', label: 'CSV File (.csv)' }] }
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
          <div class="dg-count-control">
            <label>Records:</label>
            <input type="number" id="recordCount" value="1" min="1" max="100">
          </div>
          <div class="dg-buttons">
            <button class="dg-btn dg-btn-primary" id="generateBtn">Generate</button>
            <button class="dg-btn dg-btn-secondary" id="copyBtn">Copy</button>
          </div>
          <div id="fileControls">
            <label>File Name:</label>
            <input type="text" id="fileName" placeholder="test-file">
            <label>File Type:</label>
            <select id="fileType">
              <option value="txt">Text (.txt)</option>
              <option value="json">JSON (.json)</option>
              <option value="csv">CSV (.csv)</option>
              <option value="xml">XML (.xml)</option>
            </select>
            <label>File Size:</label>
            <div style="display: flex; gap: 6px;">
              <input type="number" id="fileSize" value="10" min="1" style="flex: 1;">
              <select id="fileSizeUnit" style="width: 80px;">
                <option value="B">Bytes</option>
                <option value="KB" selected>KB</option>
                <option value="MB">MB</option>
                <option value="GB">GB</option>
              </select>
            </div>
            <button class="dg-btn dg-btn-primary" id="downloadBtn" style="width: 100%;">💾 Save File</button>
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
      
      // Show file controls if Files tab is selected
      const isFilesTab = categories[tabIdx].title === 'Files';
      document.getElementById('fileControls').style.display = isFilesTab ? 'block' : 'none';
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
        
        const isFiles = catKey.includes('Files');
        document.getElementById('fileControls').style.display = isFiles ? 'block' : 'none';
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
    const fileName = document.getElementById('fileName').value || 'test-file';
    const fileType = document.getElementById('fileType').value;
    const fileSize = parseInt(document.getElementById('fileSize').value) || 10;
    const fileSizeUnit = document.getElementById('fileSizeUnit').value;
    
    let fileSizeBytes = fileSize;
    if (fileSizeUnit === 'KB') fileSizeBytes = fileSize * 1024;
    else if (fileSizeUnit === 'MB') fileSizeBytes = fileSize * 1024 * 1024;
    else if (fileSizeUnit === 'GB') fileSizeBytes = fileSize * 1024 * 1024 * 1024;
    
    let content = '';
    if (fileType === 'json') {
      content = JSON.stringify(generatedData, null, 2);
    } else if (fileType === 'csv') {
      if (generatedData.length > 0) {
        const headers = Object.keys(generatedData[0]);
        content = headers.join(',') + '\n';
        content += generatedData.map(r => headers.map(h => r[h]).join(',')).join('\n');
      }
    } else if (fileType === 'xml') {
      content = '<?xml version="1.0" encoding="UTF-8"?>\n<records>\n';
      content += generatedData.map(r => {
        let xml = '  <record>\n';
        Object.entries(r).forEach(([k, v]) => {
          xml += `    <${k}>${v}</${k}>\n`;
        });
        xml += '  </record>\n';
        return xml;
      }).join('');
      content += '</records>';
    } else {
      content = generatedData.map(r => Object.entries(r).map(([k, v]) => `${k}: ${v}`).join('\n')).join('\n\n');
    }
    
    if (content.length < fileSizeBytes) {
      content += '\n' + 'x'.repeat(fileSizeBytes - content.length - 1);
    } else if (content.length > fileSizeBytes) {
      content = content.substring(0, fileSizeBytes);
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.${fileType}`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createDataGeneratorUI };
} else if (typeof window !== 'undefined') {
  window.createDataGeneratorUI = createDataGeneratorUI;
}
