// UI Creation Function
function createDataGeneratorUI(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Simple, clean styles
  const style = document.createElement('style');
  style.textContent = `
    .dg-app {
      height: 100%;
      display: flex;
      flex-direction: column;
      background: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      direction: ltr !important;
      text-align: left !important;
    }
    
    .dg-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px;
      text-align: center;
      flex-shrink: 0;
    }
    
    .dg-header h1 {
      font-size: 16px;
      font-weight: 600;
      margin: 0;
    }
    
    .dg-tabs {
      display: flex;
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
      overflow-x: auto;
      flex-shrink: 0;
    }
    
    .dg-tab {
      padding: 10px 12px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      color: #6b7280;
      border-bottom: 2px solid transparent;
      white-space: nowrap;
    }
    
    .dg-tab.active {
      color: #667eea;
      border-bottom-color: #667eea;
    }
    
    .dg-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    
    .dg-content {
      flex: 1;
      overflow-y: auto;
      min-height: 0;
    }
    
    .dg-tab-content {
      display: none;
      height: 100%;
    }
    
    .dg-tab-content.active {
      display: flex;
      flex-direction: column;
    }
    
    .dg-sub-tabs {
      display: flex;
      background: #f3f4f6;
      border-bottom: 1px solid #d1d5db;
      overflow-x: auto;
      flex-shrink: 0;
    }
    
    .dg-sub-tab {
      padding: 8px 12px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 11px;
      font-weight: 500;
      color: #6b7280;
      border-bottom: 2px solid transparent;
      white-space: nowrap;
    }
    
    .dg-sub-tab.active {
      color: #374151;
      border-bottom-color: #374151;
    }
    
    .dg-sub-content {
      display: none;
      padding: 16px;
      flex: 1;
      overflow-y: auto;
    }
    
    .dg-sub-content.active {
      display: block;
    }
    
    .dg-select-controls {
      display: flex;
      gap: 6px;
      margin-bottom: 12px;
    }
    
    .dg-select-btn {
      padding: 4px 8px;
      border: 1px solid #d1d5db;
      background: white;
      color: #374151;
      border-radius: 3px;
      cursor: pointer;
      font-size: 11px;
      font-weight: 500;
    }
    
    .dg-select-btn:hover {
      background: #f3f4f6;
    }
    
    .dg-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }
    
    .dg-checkbox {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 12px;
    }
    
    .dg-checkbox:hover {
      border-color: #667eea;
      background: #f8faff;
    }
    
    .dg-checkbox input {
      margin: 0;
    }
    
    .dg-checkbox.checked {
      border-color: #667eea;
      background: #f0f4ff;
    }
    
    .dg-controls {
      background: #f9fafb;
      padding: 12px 16px;
      border-top: 1px solid #e5e7eb;
      flex-shrink: 0;
    }
    
    .dg-count-control {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    
    .dg-count-control label {
      font-size: 13px;
      font-weight: 500;
      color: #374151;
    }
    
    .dg-count-control input {
      width: 60px;
      padding: 4px 6px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 13px;
    }
    
    .dg-buttons {
      display: flex;
      gap: 6px;
      margin-bottom: 12px;
    }
    
    .dg-btn {
      flex: 1;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .dg-btn-primary {
      background: #667eea;
      color: white;
    }
    
    .dg-btn-primary:hover {
      background: #5a67d8;
    }
    
    .dg-btn-secondary {
      background: #e5e7eb;
      color: #374151;
    }
    
    .dg-btn-secondary:hover {
      background: #d1d5db;
    }
    
    .dg-results {
      background: #f3f4f6;
      border-radius: 4px;
      font-size: 11px;
      max-height: 100px;
      overflow-y: auto;
      display: none;
    }
    
    .dg-results.show {
      display: block;
    }
    
    .dg-footer {
      background: #f8fafc;
      padding: 8px 16px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      font-size: 11px;
      color: #6b7280;
      flex-shrink: 0;
    }
    
    .dg-footer .heart {
      color: #ef4444;
    }
    
    .dg-record {
      margin-bottom: 16px;
      padding: 12px;
      background: white;
      border-radius: 3px;
      border: 1px solid #e5e7eb;
    }
    
    .dg-field {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px solid #f3f4f6;
    }
    
    .dg-field:last-child {
      border-bottom: none;
    }
    
    .dg-field-label {
      font-weight: 500;
      color: #374151;
      font-size: 10px;
    }
    
    .dg-field-value {
      font-family: monospace;
      color: #6b7280;
      font-size: 10px;
      max-width: 120px;
      word-wrap: break-word;
      word-break: break-all;
      white-space: normal;
      line-height: 1.3;
    }
    
    .dg-copy-btn {
      padding: 1px 4px;
      font-size: 9px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      margin-left: 4px;
    }
    
    .dg-copy-btn:hover {
      background: #5a67d8;
    }
  `;
  document.head.appendChild(style);

  // Data categories (simplified structure for brevity)
  const categories = [
    {
      title: '👤 Personal',
      subTabs: [
        {
          title: '📝 Names',
          fields: [
            { id: 'firstName', label: 'First Name (EN)' },
            { id: 'firstNameAr', label: 'First Name (AR)' },
            { id: 'lastName', label: 'Last Name (EN)' },
            { id: 'fullName', label: 'Full Name (EN)' },
            { id: 'name', label: 'Name (EN/AR)' }
          ]
        }
      ]
    },
    {
      title: '📞 Contact',
      subTabs: [
        {
          title: '📧 Digital',
          fields: [
            { id: 'email', label: 'Email' },
            { id: 'phone', label: 'Phone (+966)' },
            { id: 'address', label: 'Address (EN)' }
          ]
        }
      ]
    },
    {
      title: '💼 Work',
      subTabs: [
        {
          title: '🏢 Professional',
          fields: [
            { id: 'company', label: 'Company' },
            { id: 'jobTitle', label: 'Job Title (EN)' }
          ]
        }
      ]
    },
    {
      title: '💳 Finance',
      subTabs: [
        {
          title: '🏦 Banking',
          fields: [
            { id: 'iban', label: 'IBAN' },
            { id: 'creditCard', label: 'Credit Card' }
          ]
        }
      ]
    },
    {
      title: '🔧 Other',
      subTabs: [
        {
          title: '📅 Data Types',
          fields: [
            { id: 'date', label: 'Date' },
            { id: 'uuid', label: 'UUID' },
            { id: 'password', label: 'Password' }
          ]
        }
      ]
    }
  ];

  // Create UI (simplified)
  container.innerHTML = `
    <div class="dg-app" dir="ltr">
      <div class="dg-header">
        <h1>🎲 Test Data Generator</h1>
      </div>
      <div class="dg-controls">
        <div class="dg-count-control">
          <label>Records:</label>
          <input type="number" id="recordCount" value="1" min="1" max="100">
        </div>
        <div class="dg-buttons">
          <button class="dg-btn dg-btn-primary" id="generateBtn">Generate</button>
          <button class="dg-btn dg-btn-secondary" id="copyBtn">Copy All</button>
        </div>
        <div class="dg-results" id="results"></div>
      </div>
      <div class="dg-footer">
        Developed by Haitham Al Mughrabi ❤️ ${new Date().getFullYear()}
      </div>
    </div>
  `;

  // Add basic functionality
  let generatedData = [];
  
  document.getElementById('generateBtn').addEventListener('click', () => {
    if (!window.DataGenerator) {
      alert('Data generators not loaded yet');
      return;
    }
    
    const count = parseInt(document.getElementById('recordCount').value) || 1;
    generatedData = [];

    for (let i = 0; i < count; i++) {
      if (window.resetSharedData) window.resetSharedData();
      const record = {
        name: window.DataGenerator.fullName(),
        email: window.DataGenerator.email(),
        phone: window.DataGenerator.phone(),
        company: window.DataGenerator.company(),
        iban: window.DataGenerator.iban()
      };
      generatedData.push(record);
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = generatedData.map(record => `
      <div class="dg-record">
        ${Object.entries(record).map(([key, value]) => `
          <div class="dg-field">
            <span class="dg-field-label">${key}:</span>
            <span class="dg-field-value">${value}</span>
          </div>
        `).join('')}
      </div>
    `).join('');
    resultsDiv.classList.add('show');
  });

  document.getElementById('copyBtn').addEventListener('click', () => {
    if (generatedData.length === 0) {
      alert('Generate data first');
      return;
    }
    
    navigator.clipboard.writeText(JSON.stringify(generatedData, null, 2))
      .then(() => {
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
