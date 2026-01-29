// Injected script - runs in web pages
(function() {
  // Avoid duplicate injection
  if (window.dataGeneratorInjected) return;
  window.dataGeneratorInjected = true;

  // Create floating toggle button
  const toggleBtn = document.createElement('div');
  toggleBtn.id = 'dg-toggle';
  toggleBtn.innerHTML = '🎲';
  toggleBtn.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10000;
    font-size: 24px;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.2);
  `;

  // Create floating panel
  const panel = document.createElement('div');
  panel.id = 'dg-panel';
  panel.setAttribute('dir', 'ltr');
  panel.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    width: 450px;
    height: 600px;
    background: rgba(255, 255, 255, 0.95);
    border: none;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    z-index: 10001;
    display: none;
    overflow: hidden;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    direction: ltr !important;
    text-align: left !important;
  `;

  // Add close button to panel
  const closeBtn = document.createElement('div');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 28px;
    cursor: pointer;
    color: #667eea;
    z-index: 10002;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
    font-weight: bold;
  `;

  panel.appendChild(closeBtn);

  // Create container for the UI
  const container = document.createElement('div');
  container.id = 'dg-injected-container';
  container.style.padding = '10px';
  panel.appendChild(container);

  // Add to page
  document.body.appendChild(toggleBtn);
  document.body.appendChild(panel);

  // Toggle functionality
  let isOpen = false;
  toggleBtn.onclick = () => {
    isOpen = !isOpen;
    panel.style.display = isOpen ? 'block' : 'none';
    toggleBtn.style.transform = isOpen ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1)';
    toggleBtn.style.boxShadow = isOpen ? '0 12px 35px rgba(102, 126, 234, 0.6)' : '0 8px 25px rgba(102, 126, 234, 0.4)';
    
    // Initialize UI when first opened
    if (isOpen && !container.hasChildNodes()) {
      createDataGeneratorUI('dg-injected-container');
    }
  };

  closeBtn.onclick = () => {
    isOpen = false;
    panel.style.display = 'none';
    toggleBtn.style.transform = 'rotate(0deg) scale(1)';
    toggleBtn.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
  };

  // Hover effects
  toggleBtn.onmouseenter = () => {
    if (!isOpen) {
      toggleBtn.style.transform = 'scale(1.1)';
      toggleBtn.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
    }
  };

  toggleBtn.onmouseleave = () => {
    if (!isOpen) {
      toggleBtn.style.transform = 'scale(1)';
      toggleBtn.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
    }
  };

  closeBtn.onmouseenter = () => {
    closeBtn.style.background = 'rgba(102, 126, 234, 0.1)';
  };

  closeBtn.onmouseleave = () => {
    closeBtn.style.background = 'transparent';
  };

  // Drag functionality for toggle button
  let isDragging = false;
  let startX, startY, startLeft, startTop;

  toggleBtn.onmousedown = (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = parseInt(toggleBtn.style.right) || 20;
    startTop = parseInt(toggleBtn.style.top) || 20;
    e.preventDefault();
  };

  document.onmousemove = (e) => {
    if (!isDragging) return;
    const deltaX = startX - e.clientX;
    const deltaY = e.clientY - startY;
    toggleBtn.style.right = (startLeft + deltaX) + 'px';
    toggleBtn.style.top = (startTop + deltaY) + 'px';
  };

  document.onmouseup = () => {
    isDragging = false;
  };

})();
