// Simple working popup
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('popup-container');
  
  container.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h2>🎲 Test Data Generator</h2>
      <div style="margin: 10px 0;">
        <label>Records: </label>
        <input type="number" id="count" value="1" min="1" max="10" style="width: 50px;">
      </div>
      <button id="generate" style="padding: 8px 16px; background: #007cba; color: white; border: none; border-radius: 4px; cursor: pointer;">Generate</button>
      <button id="copy" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 5px;">Copy</button>
      <div id="output" style="margin-top: 15px; font-size: 12px; background: #f8f9fa; padding: 10px; border-radius: 4px; max-height: 300px; overflow-y: auto;"></div>
    </div>
  `;
  
  let data = [];
  
  document.getElementById('generate').onclick = () => {
    const count = parseInt(document.getElementById('count').value) || 1;
    data = [];
    
    for (let i = 0; i < count; i++) {
      data.push({
        name: generateName(),
        email: generateEmail(),
        phone: generatePhone(),
        company: generateCompany()
      });
    }
    
    document.getElementById('output').innerHTML = data.map(item => 
      `<div style="margin-bottom: 10px; padding: 8px; border: 1px solid #ddd; border-radius: 3px;">
        <div><strong>Name:</strong> ${item.name}</div>
        <div><strong>Email:</strong> ${item.email}</div>
        <div><strong>Phone:</strong> ${item.phone}</div>
        <div><strong>Company:</strong> ${item.company}</div>
      </div>`
    ).join('');
  };
  
  document.getElementById('copy').onclick = () => {
    if (data.length > 0) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      alert('Copied to clipboard!');
    }
  };
});

function generateName() {
  const first = ['Mohammed', 'Ahmed', 'Abdullah', 'Khalid', 'Omar', 'Ali', 'Hassan', 'Ibrahim'];
  const last = ['Al-Saud', 'Al-Rashid', 'Al-Otaibi', 'Al-Ghamdi', 'Al-Harbi', 'Al-Zahrani'];
  return `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`;
}

function generateEmail() {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
  const name = generateName().toLowerCase().replace(/[^a-z]/g, '');
  return `${name}${Math.floor(Math.random() * 999)}@${domains[Math.floor(Math.random() * domains.length)]}`;
}

function generatePhone() {
  return `+966 5${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`;
}

function generateCompany() {
  const companies = ['Saudi Aramco', 'SABIC', 'STC', 'Al Rajhi Bank', 'NCB', 'SAMBA'];
  return companies[Math.floor(Math.random() * companies.length)];
}
