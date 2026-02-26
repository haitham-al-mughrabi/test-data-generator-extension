// Date conversion functions
function gregorianToHijri(gregorianDate) {
  const gYear = gregorianDate.getFullYear();
  const gMonth = gregorianDate.getMonth() + 1;
  const gDay = gregorianDate.getDate();

  // Approximate conversion (not astronomically accurate)
  const totalDays = Math.floor(
    (gYear - 622) * 365.25 + (gMonth - 1) * 30.44 + gDay,
  );
  const hYear = Math.floor(totalDays / 354.37) + 1;
  const remainingDays = totalDays % 354.37;
  const hMonth = Math.floor(remainingDays / 29.53) + 1;
  const hDay = Math.floor(remainingDays % 29.53) + 1;

  return {
    year: Math.max(1, hYear),
    month: Math.min(12, Math.max(1, hMonth)),
    day: Math.min(30, Math.max(1, hDay)),
  };
}

function hijriToGregorian(hYear, hMonth, hDay) {
  // Approximate conversion
  const totalHijriDays = (hYear - 1) * 354.37 + (hMonth - 1) * 29.53 + hDay;
  const gregorianYear = Math.floor(totalHijriDays / 365.25) + 622;
  const remainingDays = totalHijriDays % 365.25;
  const gregorianMonth = Math.floor(remainingDays / 30.44) + 1;
  const gregorianDay = Math.floor(remainingDays % 30.44) + 1;

  return new Date(gregorianYear, gregorianMonth - 1, gregorianDay);
}

function createDataGeneratorUI(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const style = document.createElement("style");
  style.textContent = `
    :root {
      --ink: #101828;
      --muted: #5b6b7f;
      --brand-1: #5b7cfa;
      --brand-2: #7f56d9;
      --brand-3: #18a1cd;
      --accent: #f59e0b;
      --surface: #ffffff;
      --surface-2: #f7f7fb;
      --surface-3: #eef1f7;
      --line: rgba(15, 23, 42, 0.08);
      --shadow-1: 0 10px 30px rgba(12, 17, 29, 0.12);
      --shadow-2: 0 6px 16px rgba(12, 17, 29, 0.08);
      --shadow-3: 0 2px 8px rgba(12, 17, 29, 0.06);
    }
    .dg-app { height: 100%; width: 100%; display: flex; flex-direction: column; background: radial-gradient(circle at 12% 8%, rgba(123, 92, 255, 0.12), transparent 42%), radial-gradient(circle at 88% 12%, rgba(24, 161, 205, 0.12), transparent 46%), linear-gradient(180deg, #fbfbff 0%, #f2f4fb 100%); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif; position: relative; color: var(--ink); animation: dgFadeUp 0.5s ease; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
    @keyframes dgFadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    .dg-header { 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
      color: white; 
      padding: 20px 24px; 
      flex-shrink: 0; 
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 24px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .dg-header h1 { 
      font-size: 20px; 
      font-weight: 700; 
      margin: 0; 
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 10px;
      white-space: nowrap;
    }
    .dg-search { 
      position: relative; 
      flex: 1;
      max-width: 400px;
    }
    .dg-search input { 
      width: 100%; 
      padding: 10px 40px 10px 16px; 
      border: 2px solid rgba(255,255,255,0.2); 
      border-radius: 12px; 
      font-size: 14px; 
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      color: white;
      transition: all 0.2s ease;
    }
    .dg-search input::placeholder {
      color: rgba(255,255,255,0.7);
    }
    .dg-search input:focus {
      background: white;
      border-color: rgba(255,255,255,0.8);
      color: #1f2937;
      outline: none;
    }
    .dg-search input:focus { outline: none; background: white; box-shadow: 0 10px 26px rgba(15, 23, 42, 0.2); transform: translateY(-1px); }
    .dg-search-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.8); font-size: 16px; pointer-events: none; }
    .dg-search-clear { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.2); border: none; color: white; cursor: pointer; font-size: 12px; display: none; width: 20px; height: 20px; border-radius: 50%; transition: all 0.2s ease; }
    .dg-search-clear:hover { background: rgba(255,255,255,0.3); }
    .dg-search-results { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid var(--line); border-radius: 10px; max-height: 200px; overflow-y: auto; z-index: 1000; display: none; box-shadow: var(--shadow-2); }
    .dg-search-result { padding: 10px 12px; cursor: pointer; font-size: 11px; border-bottom: 1px solid #f0f2f8; transition: background 0.2s ease; }
    .dg-search-result:hover { background: #f3f6ff; }
    .dg-search-result:last-child { border-bottom: none; }
    .dg-search-category { font-weight: 700; color: var(--brand-2); }
    .dg-search-field { color: var(--muted); margin-left: 8px; }
    .dg-search-highlight { background: #fff1c2; padding: 1px 3px; border-radius: 3px; }
    .dg-body { flex: 1; display: flex; min-height: 0; overflow: hidden; width: 100%; }
    .dg-tabs-panel {
      display: flex;
      flex-direction: column;
      width: 200px;
      flex-shrink: 0;
      border-right: 1px solid var(--line);
      background: linear-gradient(180deg, #ffffff 0%, #f6f7fb 100%);
      min-height: 0;
      overflow: hidden;
    }
    .dg-tabs-header {
      background: linear-gradient(135deg, rgba(91, 124, 250, 0.98) 0%, rgba(24, 161, 205, 0.95) 100%);
      padding: 14px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      font-size: 12px;
      font-weight: 800;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
    .dg-tabs { 
      display: flex; 
      flex-direction: column; 
      background: transparent;
      overflow-y: auto; 
      flex-shrink: 1; 
      width: 100%; 
      padding: 16px 8px 60px 8px;
      gap: 4px;
      min-height: 0;
    }
    .dg-tab { 
      padding: 12px 16px; 
      border: none; 
      background: transparent;
      cursor: pointer; 
      font-size: 13px; 
      font-weight: 600; 
      color: #5b6b7f;
      border-radius: 10px;
      white-space: normal; 
      transition: all 0.2s ease; 
      text-align: left; 
      position: relative; 
      word-wrap: break-word; 
      letter-spacing: 0.2px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .dg-tab:hover { 
      color: var(--brand-1);
      background: rgba(91, 124, 250, 0.08);
      transform: translateX(4px);
    }
    .dg-tab.active { 
      color: white;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      transform: translateX(4px);
    }
    .dg-tab.active::before {
      content: "";
      position: absolute;
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 60%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 0 4px 4px 0;
    }
    .dg-sub-tabs { display: none; }
    .dg-sub-tab { display: none; }
    .dg-sub-tab:hover { display: none; }
    .dg-sub-tab.active { display: none; }
    .dg-main { display: flex; flex-direction: column; min-height: 0; overflow: hidden; width: 315px; flex-shrink: 0; margin-right: 0; }
    .dg-content { flex: 1; overflow-y: auto; min-height: 0; background: linear-gradient(180deg, #ffffff 0%, #f6f7fb 100%); min-width: 0; padding: 0 0 56px; }
    .dg-field-section { margin-bottom: 16px; padding: 16px; background: white; border-radius: 0; border: 1px solid rgba(91, 124, 250, 0.08); box-shadow: var(--shadow-3); animation: dgFadeUp 0.45s ease; }
    .dg-field-section:first-child { padding-top: 16px; }
    .dg-section-title { font-size: 12px; font-weight: 900; color: var(--brand-2); margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid rgba(91, 124, 250, 0.12); letter-spacing: 0.8px; text-transform: uppercase; position: relative; }
    .dg-section-title::after { content: ""; position: absolute; left: 0; bottom: -1px; width: 40px; height: 2px; border-radius: 999px; background: linear-gradient(90deg, var(--brand-1), rgba(127, 86, 217, 0.2)); }
    .dg-top-controls { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); background: linear-gradient(135deg, rgba(91, 124, 250, 0.98) 0%, rgba(127, 86, 217, 0.98) 100%); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; flex-shrink: 0; padding: 10px; gap: 8px; }
    .dg-top-controls .dg-btn { width: 100%; padding: 9px 10px; border: 1px solid rgba(255,255,255,0.7); background: rgba(255,255,255,0.15); cursor: pointer; font-size: 10px; font-weight: 800; color: white; border-radius: 8px; white-space: nowrap; transition: all 0.25s ease; margin: 0; text-align: center; }
    .dg-top-controls .dg-btn:hover { color: white; border-color: white; background: rgba(255,255,255,0.3); box-shadow: 0 8px 18px rgba(15, 23, 42, 0.2); transform: translateY(-2px); }
    .dg-top-controls .dg-btn.unselect { border-color: #ff7b7b; color: #ffe1e1; background: rgba(255, 107, 107, 0.2); }
    .dg-top-controls .dg-btn.unselect:hover { background: rgba(255,107,107,0.45); color: white; border-color: white; }
    .dg-top-controls .dg-btn.select-all { border-color: #61d98b; color: #e2ffe9; background: rgba(97, 217, 139, 0.2); }
    .dg-top-controls .dg-btn.select-all:hover { background: rgba(97,217,139,0.45); color: white; border-color: white; }
    .dg-tab-content { display: none; height: 100%; overflow-y: auto; }
    .dg-tab-content.active { display: flex; flex-direction: column; }
    .dg-sub-tab-content { display: none; }
    .dg-sub-tab-content.active { display: none; }
    .dg-tab-controls { display: flex; gap: 6px; margin-bottom: 0; }
    .dg-tab-controls .dg-btn { flex: 1; padding: 6px 8px; font-size: 10px; background: #e1e7f5 !important; color: #334155 !important; min-width: 0; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 8px; }
    .dg-tab-controls .dg-btn:hover { background: #c7d4ee !important; box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08); transform: translateY(-1px); }
    .dg-tab-controls .dg-btn.unselect { background: #ef4444 !important; color: white !important; }
    .dg-tab-controls .dg-btn.unselect:hover { background: #dc2626 !important; }
    .dg-fields-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .dg-fields-wrapper .dg-checkbox:nth-child(odd) { background: #ffffff; }
    .dg-fields-wrapper .dg-checkbox:nth-child(even) { background: #f7f8fd; }
    .dg-checkbox { display: inline-flex; align-items: center; gap: 8px; padding: 10px 12px; cursor: pointer; font-size: 13px; background: white; border: 1px solid rgba(91, 124, 250, 0.12); border-radius: 10px; transition: all 0.2s ease; width: 100%; box-sizing: border-box; color: var(--ink); margin-bottom: 0; word-wrap: break-word; white-space: normal; font-weight: 700; }
    .dg-checkbox:hover { background: #ffffff; border-color: rgba(91, 124, 250, 0.4); box-shadow: var(--shadow-3); transform: translateY(-1px); }
    .dg-checkbox input { flex-shrink: 0; }
    .dg-checkbox span { word-wrap: break-word; white-space: normal; }
    .dg-right-sidebar { display: flex; flex-direction: column; flex: 1; background: linear-gradient(180deg, #f8fbff 0%, #eef3fb 100%); border-left: 1px solid var(--line); box-shadow: -2px 0 12px rgba(15, 23, 42, 0.06); min-height: 0; overflow: hidden; padding: 0 0 56px; }
    .dg-right-sidebar-content { flex: 1; overflow-y: auto; display: flex; flex-direction: column; min-height: 0; gap: 12px; padding: 0; }
    .dg-panel-section { background: white; border: 1px solid rgba(91, 124, 250, 0.16); border-radius: 0; box-shadow: var(--shadow-3); overflow: hidden; display: flex; flex-direction: column; min-height: 0; }
    .dg-panel-header { background: linear-gradient(135deg, rgba(91, 124, 250, 0.98) 0%, rgba(24, 161, 205, 0.95) 100%); padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.2); cursor: pointer; user-select: none; display: flex; justify-content: space-between; align-items: center; }
    .dg-panel-header:hover { filter: brightness(1.02); }
    .dg-panel-title { font-size: 12px; font-weight: 800; color: white; text-transform: uppercase; letter-spacing: 0.5px; }
    .dg-panel-meta { font-size: 10px; font-weight: 800; color: rgba(255, 255, 255, 0.9); background: rgba(255, 255, 255, 0.18); padding: 3px 8px; letter-spacing: 0.4px; text-transform: uppercase; }
    .dg-panel-toggle { color: white; font-size: 13px; line-height: 1; transition: transform 0.25s ease; }
    .dg-panel-section.collapsed .dg-panel-toggle { transform: rotate(180deg); }
    .dg-panel-section.collapsed .dg-panel-content { display: none; }
    .dg-panel-content { min-height: 0; }
    .dg-controls-section { flex-shrink: 0; }
    .dg-controls { background: transparent; border: none; }
    .dg-controls-content { padding: 12px; }
    .dg-controls-subsection { margin-bottom: 12px; background: linear-gradient(180deg, #f5f8ff 0%, #eef3ff 100%); border: 1px solid rgba(91, 124, 250, 0.2); border-radius: 12px; padding: 12px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.8); }
    .dg-controls-subtitle { font-size: 10px; font-weight: 900; color: #54627a; text-transform: uppercase; letter-spacing: 0.9px; margin-bottom: 10px; }
    .dg-count-control { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; font-size: 13px; font-weight: 600; color: var(--muted); }
    .dg-count-control input { width: 60px; padding: 6px 8px; border: 1px solid rgba(91, 124, 250, 0.3); border-radius: 6px; font-size: 12px; }
    .dg-buttons { display: flex; gap: 8px; padding: 12px 14px; border-top: 1px solid var(--line); background: #fbfcff; }
    .dg-btn { padding: 10px 16px; border: none; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 800; transition: all 0.2s ease; letter-spacing: 0.2px; }
    .dg-btn-primary { background: linear-gradient(135deg, var(--brand-1) 0%, var(--brand-2) 100%); color: white; }
    .dg-btn-primary:hover { box-shadow: 0 10px 20px rgba(91, 124, 250, 0.3); transform: translateY(-1px); }
    .dg-btn-secondary { background: #e7ebf4; color: #334155; }
    .dg-btn-secondary:hover { background: #d5dcee; transform: translateY(-1px); box-shadow: var(--shadow-3); }
    .dg-results-section { flex: 1; min-height: 260px; }
    .dg-panel-content.results-content { flex: 1; display: flex; min-height: 0; background: linear-gradient(180deg, #f8faff 0%, #f1f4fb 100%); }
    .dg-results { flex: 1; overflow-y: auto; font-size: 12px; background: transparent; padding: 0; display: flex; flex-direction: column; min-width: 0; box-shadow: inset 0 1px 0 rgba(15, 23, 42, 0.06), inset 0 8px 24px rgba(15, 23, 42, 0.04); }
    .dg-record-tabs { display: flex; background: rgba(255,255,255,0.95); border-bottom: 1px solid var(--line); overflow-x: auto; flex-shrink: 0; padding: 6px 10px; gap: 6px; backdrop-filter: blur(8px); }
    .dg-record-tab { padding: 8px 12px; border: 1px solid transparent; background: rgba(91, 124, 250, 0.06); cursor: pointer; font-size: 10px; font-weight: 800; color: #5b6b7f; border-radius: 10px; white-space: nowrap; transition: all 0.25s ease; letter-spacing: 0.6px; text-transform: uppercase; }
    .dg-record-tab:hover { color: var(--brand-1); border-color: rgba(91, 124, 250, 0.25); background: rgba(91, 124, 250, 0.12); }
    .dg-record-tab.active { color: white; border-color: transparent; background: linear-gradient(135deg, var(--brand-1) 0%, var(--brand-2) 100%); box-shadow: 0 8px 16px rgba(91, 124, 250, 0.25); }
    .dg-record-contents { flex: 1; overflow-y: auto; padding: 0; min-width: 0; }
    .dg-record-content { display: none; height: 100%; min-width: 0; }
    .dg-record-content.active { display: flex; flex-direction: column; min-width: 0; }
    .dg-category-tabs { display: flex; background: rgba(255,255,255,0.95); border-bottom: 1px solid var(--line); overflow-x: auto; flex-shrink: 0; padding: 6px 10px; gap: 6px; backdrop-filter: blur(8px); }
    .dg-category-tab { padding: 7px 10px; border: 1px solid transparent; background: rgba(24, 161, 205, 0.08); cursor: pointer; font-size: 9px; font-weight: 800; color: #5b6b7f; border-radius: 10px; white-space: nowrap; transition: all 0.25s ease; text-transform: uppercase; letter-spacing: 0.6px; }
    .dg-category-tab:hover { color: var(--brand-1); border-color: rgba(24, 161, 205, 0.35); background: rgba(24, 161, 205, 0.18); }
    .dg-category-tab.active { color: white; border-color: transparent; background: linear-gradient(135deg, #18a1cd 0%, #5b7cfa 100%); box-shadow: 0 8px 16px rgba(24, 161, 205, 0.25); }
    .dg-category-contents { flex: 1; overflow-y: auto; padding: 0; }
    .dg-category-content { display: none; }
    .dg-category-content.active { display: block; }
    .dg-record-field { display: flex; flex-direction: column; gap: 12px; padding: 14px 16px; font-size: 11px; border: 1px solid rgba(91, 124, 250, 0.08); background: white; transition: all 0.2s ease; border-radius: 0; margin: 8px 0; box-shadow: 0 6px 16px rgba(15, 23, 42, 0.04); }
    .dg-record-field:nth-child(odd) { background: #ffffff; }
    .dg-record-field:nth-child(even) { background: #f8f9fe; }
    .dg-record-field:hover { background: #eef3ff !important; border-color: rgba(91, 124, 250, 0.35); box-shadow: 0 10px 20px rgba(91, 124, 250, 0.12); transform: translateY(-1px); }
    .dg-subsection-group { margin-bottom: 12px; margin-top: 12px; padding: 0; border: 1px dashed rgba(91, 124, 250, 0.22); border-radius: 10px; background: rgba(255, 255, 255, 0.7); }
    .dg-subsection-title { font-size: 10px; font-weight: 900; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; padding: 10px; }
    .dg-record-key { font-size: 10px; color: #64748b; font-weight: 700; }
    .dg-record-label { font-weight: 800; color: var(--brand-2); min-width: 90px; text-transform: uppercase; font-size: 9px; letter-spacing: 0.9px; }
    .dg-field-value { color: #1f2937; word-break: break-all; cursor: pointer; padding: 6px 10px; border-radius: 10px; background: #eef2f8; transition: all 0.2s ease; flex: 1; text-align: left; font-family: "SFMono-Regular", "Menlo", "Monaco", "Courier New", monospace; font-size: 12px; font-weight: 700; }
    .dg-field-value:hover { background: #e2e8ff; color: var(--brand-1); box-shadow: 0 4px 10px rgba(91, 124, 250, 0.2); }
    .dg-footer { font-size: 9px; color: #8a94a6; text-align: center; padding: 10px; border-top: 1px solid var(--line); background: linear-gradient(180deg, #ffffff 0%, #f6f7fb 100%); width: 100%; position: absolute; bottom: 0; left: 0; right: 0; font-weight: 700; letter-spacing: 0.4px; text-transform: uppercase; }
    .dg-file-controls { display: none; margin-top: 14px; padding: 12px; background: linear-gradient(145deg, #f2f7ff 0%, #eaf1ff 100%); border: 1px solid rgba(91, 124, 250, 0.24); border-radius: 0; box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 6px 18px rgba(15, 23, 42, 0.06); }
    .dg-file-controls.active { display: block; }
    .dg-file-controls-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding: 10px 12px; border: 1px solid rgba(91, 124, 250, 0.25); background: white; }
    .dg-file-controls-title { font-size: 11px; font-weight: 900; color: #334155; text-transform: uppercase; letter-spacing: 0.9px; }
    .dg-file-controls-hint { font-size: 10px; color: #64748b; font-weight: 700; }
    .dg-file-controls-sections { display: grid; grid-template-columns: 1fr; gap: 10px; }
    .dg-file-control-section { background: #ffffff; border: 1px solid rgba(91, 124, 250, 0.18); padding: 10px; position: relative; }
    .dg-file-control-section::before { content: ""; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(180deg, #5b7cfa 0%, #18a1cd 100%); }
    .dg-file-control-section-title { font-size: 10px; font-weight: 900; color: #334155; letter-spacing: 0.7px; text-transform: uppercase; margin-bottom: 8px; padding-left: 8px; }
    .dg-file-control-group { margin-bottom: 8px; padding-left: 8px; }
    .dg-file-control-group:last-child { margin-bottom: 0; }
    .dg-file-control-group label { display: block; font-size: 11px; font-weight: 700; color: #344054; margin-bottom: 5px; }
    .dg-file-control-group input, .dg-file-control-group select { width: 100%; padding: 8px 10px; border: 1px solid rgba(91, 124, 250, 0.35); border-radius: 0; font-size: 11px; box-sizing: border-box; background: #fcfdff; font-weight: 700; color: #0f172a; }
    .dg-file-size-group { display: flex; gap: 8px; align-items: center; }
    .dg-file-size-group input { flex: 1; min-width: 0; }
    .dg-file-size-group select { width: 90px; flex-shrink: 0; }
    .dg-file-size-group .dg-multiply { font-weight: 900; color: #475569; font-size: 13px; line-height: 1; }
    .dg-dimension-input { max-width: 120px; text-align: center; }
    .dg-inline-pair { display: flex; gap: 8px; align-items: center; }
    .dg-inline-pair > * { flex: 1; min-width: 0; }
    .dg-inline-pair .dg-compact-input { max-width: 70px; text-align: center; }
    .dg-month-select-wrap { flex: 1; min-width: 0; position: relative; }
    .dg-month-input { display: none; width: 100%; }
    .dg-month-input.active { display: block; }
    .dg-mode-toggle { display: inline-flex; border: 1px solid rgba(91, 124, 250, 0.28); background: #f5f8ff; overflow: hidden; }
    .dg-mode-btn { border: none; background: transparent; color: #42526b; font-size: 10px; font-weight: 800; padding: 6px 10px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.4px; }
    .dg-mode-btn.active { background: linear-gradient(135deg, #5b7cfa 0%, #7f56d9 100%); color: white; }
    .dg-checkbox-inline-group { display: flex; flex-wrap: wrap; gap: 8px; }
    .dg-checkbox-inline { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; color: #334155; background: #f8fbff; border: 1px solid rgba(91, 124, 250, 0.22); padding: 4px 8px; }
    .dg-checkbox-inline input { margin: 0; }
    .dg-convert-actions { display: flex; justify-content: flex-end; margin-top: 6px; }
    .dg-mini-btn { border: none; background: linear-gradient(135deg, #5b7cfa 0%, #7f56d9 100%); color: white; font-size: 10px; font-weight: 800; padding: 6px 10px; cursor: pointer; letter-spacing: 0.3px; text-transform: uppercase; }
    .dg-mini-btn.secondary { background: linear-gradient(135deg, #18a1cd 0%, #5b7cfa 100%); }
    .dg-conversion-output { margin-top: 8px; padding: 10px; border: 1px solid rgba(24, 161, 205, 0.25); background: #f0f8ff; font-size: 10px; color: #0f172a; font-weight: 700; display: none; }
    .dg-conversion-output-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .dg-conversion-grid { display: grid; gap: 8px; }
    .dg-conversion-item { background: white; border: 1px solid rgba(91, 124, 250, 0.22); padding: 8px; }
    .dg-conversion-item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .dg-conversion-item-label { font-size: 9px; font-weight: 900; color: #42526b; letter-spacing: 0.5px; text-transform: uppercase; }
    .dg-conversion-value { font-family: "SFMono-Regular", "Menlo", "Monaco", "Courier New", monospace; font-size: 11px; font-weight: 700; color: #111827; background: #f8fbff; border: 1px solid rgba(91, 124, 250, 0.18); padding: 8px; white-space: normal; word-break: break-word; }
    .dg-date-tools-tabs { display: flex; gap: 0; border: 1px solid rgba(91, 124, 250, 0.24); margin-bottom: 10px; overflow: hidden; }
    .dg-date-tools-tab { flex: 1; border: none; background: #f4f7ff; color: #475569; font-size: 10px; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; padding: 8px 10px; cursor: pointer; }
    .dg-date-tools-tab + .dg-date-tools-tab { border-left: 1px solid rgba(91, 124, 250, 0.2); }
    .dg-date-tools-tab.active { background: linear-gradient(135deg, #5b7cfa 0%, #7f56d9 100%); color: white; }
    .dg-date-tools-panel { display: none; }
    .dg-date-tools-panel.active { display: block; }
    .dg-user-note { margin-top: 8px; padding: 8px 10px; border: 1px solid rgba(24, 161, 205, 0.2); background: #f0f8ff; color: #334155; font-size: 10px; line-height: 1.45; font-weight: 700; }
    #dateTimeControls { margin: 0; margin-bottom: 12px; padding: 0; background: linear-gradient(145deg, #f2f7ff 0%, #eaf1ff 100%); border: 1px solid rgba(91, 124, 250, 0.24); box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 6px 18px rgba(15, 23, 42, 0.06); }
    #dateTimeControls,
    #dateTimeControls *:not(.dg-conversion-value):not(code) { font-family: inherit; }
    #dateTimeControls .dg-file-controls-header { margin-bottom: 10px; padding: 10px 12px; border: 1px solid rgba(91, 124, 250, 0.25); background: white; }
    #dateTimeControls .dg-file-controls-title { color: #334155; }
    #dateTimeControls .dg-file-controls-hint { color: #64748b; }
    #dateTimeControls .dg-date-tools-tabs { display: flex; gap: 6px; border: none; margin-bottom: 10px; background: transparent; overflow: visible; }
    #dateTimeControls .dg-date-tools-tab { border: 1px solid transparent; background: rgba(91, 124, 250, 0.08); color: #5b6b7f; border-radius: 0; padding: 8px 10px; font-size: 9px; letter-spacing: 0.6px; transition: all 0.2s ease; }
    #dateTimeControls .dg-date-tools-tab + .dg-date-tools-tab { border-left: 1px solid transparent; }
    #dateTimeControls .dg-date-tools-tab:hover { color: var(--brand-1); border-color: rgba(91, 124, 250, 0.25); background: rgba(91, 124, 250, 0.14); }
    #dateTimeControls .dg-date-tools-tab.active { background: linear-gradient(135deg, #5b7cfa 0%, #7f56d9 100%); color: white; box-shadow: 0 8px 16px rgba(91, 124, 250, 0.25); }
    #dateTimeControls .dg-date-tools-panel.active { background: transparent; border: none; padding: 0; }
    #dateTimeControls .dg-file-controls-sections { gap: 10px; }
    #dateTimeControls .dg-file-control-section { border: 1px solid rgba(91, 124, 250, 0.18); background: #ffffff; border-radius: 0; box-shadow: none; }
    #dateTimeControls .dg-file-control-section::before { width: 4px; border-radius: 0; }
    #dateTimeControls .dg-file-control-section-title { color: #334155; letter-spacing: 0.7px; margin-bottom: 8px; }
    #dateTimeControls .dg-file-control-group input,
    #dateTimeControls .dg-file-control-group select { border-radius: 0; background: #fcfdff; border-color: rgba(91, 124, 250, 0.35); }
    #dateTimeControls .dg-file-control-group input:focus,
    #dateTimeControls .dg-file-control-group select:focus { outline: none; border-color: #5b7cfa; box-shadow: 0 0 0 3px rgba(91, 124, 250, 0.14); }
    #dateTimeControls .dg-checkbox-inline { background: #f8fbff; border-color: rgba(91, 124, 250, 0.22); border-radius: 0; }
    #dateTimeControls .dg-mode-toggle { border-radius: 0; }
    #dateTimeControls .dg-mode-btn { padding: 6px 10px; }
    #dateTimeControls .dg-mini-btn { border-radius: 0; }
    #dateTimeControls .dg-conversion-output { border-radius: 0; background: #f0f8ff; border-color: rgba(24, 161, 205, 0.25); }
    #dateTimeControls .dg-conversion-item { border-radius: 0; border-color: rgba(91, 124, 250, 0.22); }
    #dateTimeControls .dg-conversion-value { border-radius: 0; background: #f8fbff; }
    #dateTimeControls .dg-user-note { border-left: 4px solid #18a1cd; border-radius: 0; background: #f0f8ff; }
    #securityControls { margin: 0; margin-bottom: 12px; padding: 0; background: linear-gradient(145deg, #f2f7ff 0%, #eaf1ff 100%); border: 1px solid rgba(91, 124, 250, 0.24); box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 6px 18px rgba(15, 23, 42, 0.06); }
    #securityControls .dg-file-controls-header { margin-bottom: 10px; padding: 10px 12px; border: 1px solid rgba(91, 124, 250, 0.25); background: white; }
    #securityControls .dg-file-controls-title { color: #334155; }
    #securityControls .dg-file-controls-hint { color: #64748b; }
    #securityControls .dg-date-tools-tabs { display: flex; gap: 6px; border: none; margin-bottom: 10px; background: transparent; overflow: visible; }
    #securityControls .dg-date-tools-tab { border: 1px solid transparent; background: rgba(91, 124, 250, 0.08); color: #5b6b7f; border-radius: 0; padding: 8px 10px; font-size: 9px; letter-spacing: 0.6px; transition: all 0.2s ease; }
    #securityControls .dg-date-tools-tab + .dg-date-tools-tab { border-left: 1px solid transparent; }
    #securityControls .dg-date-tools-tab:hover { color: var(--brand-1); border-color: rgba(91, 124, 250, 0.25); background: rgba(91, 124, 250, 0.14); }
    #securityControls .dg-date-tools-tab.active { background: linear-gradient(135deg, #5b7cfa 0%, #7f56d9 100%); color: white; box-shadow: 0 8px 16px rgba(91, 124, 250, 0.25); }
    #securityControls .dg-date-tools-panel.active { background: transparent; border: none; padding: 0; }
    #securityControls .dg-file-controls-sections { gap: 10px; }
    #securityControls .dg-file-control-section { border: 1px solid rgba(91, 124, 250, 0.18); background: #ffffff; border-radius: 0; box-shadow: none; }
    #securityControls .dg-file-control-section::before { width: 4px; border-radius: 0; }
    #securityControls .dg-file-control-group input,
    #securityControls .dg-file-control-group select,
    #securityControls .dg-file-control-group textarea { border-radius: 0; background: #fcfdff; border-color: rgba(91, 124, 250, 0.35); }
    #securityControls .dg-file-control-group textarea { width: 100%; min-height: 72px; resize: vertical; padding: 8px 10px; font-size: 11px; font-weight: 700; color: #0f172a; box-sizing: border-box; }
    #securityControls .dg-file-control-group input:focus,
    #securityControls .dg-file-control-group select:focus,
    #securityControls .dg-file-control-group textarea:focus { outline: none; border-color: #5b7cfa; box-shadow: 0 0 0 3px rgba(91, 124, 250, 0.14); }
    #securityControls .dg-security-actions { display: flex; gap: 8px; flex-wrap: wrap; }
    #securityControls .dg-user-note { border-left: 4px solid #18a1cd; border-radius: 0; background: #f0f8ff; }
    #colorControls { margin: 0; margin-bottom: 12px; padding: 0; background: linear-gradient(145deg, #f2f7ff 0%, #eaf1ff 100%); border: 1px solid rgba(91, 124, 250, 0.24); box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 6px 18px rgba(15, 23, 42, 0.06); }
    #colorControls .dg-file-controls-header { margin: 0; border-left: none; border-right: none; border-top: none; }
    #colorControls .dg-file-controls-sections { padding: 10px 12px 12px; gap: 10px; }
    #colorControls .dg-file-control-section { border: 1px solid rgba(91, 124, 250, 0.18); background: #ffffff; border-radius: 0; box-shadow: none; }
    #colorControls .dg-file-control-section::before { width: 4px; border-radius: 0; }
    #colorControls .dg-file-control-group { margin-bottom: 8px; padding-left: 8px; }
    #colorControls .dg-file-control-group:last-child { margin-bottom: 0; }
    #colorControls .dg-file-control-group label { color: #334155; }
    #colorControls #colorInput,
    #colorControls #colorOutputType { border: 1px solid rgba(91, 124, 250, 0.35); border-radius: 0; background: #fcfdff; color: #0f172a; font-weight: 700; width: 100%; padding: 8px 10px; font-size: 11px; }
    #colorControls #colorInput:focus,
    #colorControls #colorOutputType:focus { outline: none; border-color: #5b7cfa; box-shadow: 0 0 0 3px rgba(91, 124, 250, 0.14); }
    #colorControls #convertColorBtn { width: 100%; }
    #colorControls #colorConversionResult { margin-top: 8px; padding: 10px; border: 1px solid rgba(24, 161, 205, 0.25); background: #f0f8ff; font-size: 10px; color: #0f172a; font-weight: 700; min-height: 56px; }
    #randomValuesControls { margin: 0; margin-bottom: 12px; padding: 0; background: linear-gradient(145deg, #f2f7ff 0%, #eaf1ff 100%); border: 1px solid rgba(91, 124, 250, 0.24); box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 6px 18px rgba(15, 23, 42, 0.06); }
    #randomValuesControls .dg-file-controls-header { margin: 0; border-left: none; border-right: none; border-top: none; }
    #randomValuesControls .dg-file-controls-sections { padding: 10px 12px 12px; gap: 10px; }
    #randomValuesControls .dg-file-control-section { border: 1px solid rgba(91, 124, 250, 0.18); background: #ffffff; border-radius: 0; box-shadow: none; }
    #randomValuesControls .dg-file-control-section::before { width: 4px; border-radius: 0; }
    #randomValuesControls .dg-file-control-group { margin-bottom: 8px; padding-left: 8px; }
    #randomValuesControls .dg-file-control-group:last-child { margin-bottom: 0; }
    #randomValuesControls .dg-file-control-group label { color: #334155; }
    #randomValuesControls .dg-rv-check-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
    #randomValuesControls .dg-rv-check { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; color: #334155; background: #f8fbff; border: 1px solid rgba(91, 124, 250, 0.22); padding: 4px 8px; }
    #randomValuesControls .dg-rv-check input { margin: 0; }
    #randomValuesControls input[type="text"],
    #randomValuesControls input[type="number"] { border: 1px solid rgba(91, 124, 250, 0.35); border-radius: 0; background: #fcfdff; color: #0f172a; font-weight: 700; }
    #randomValuesControls input[type="text"]:focus,
    #randomValuesControls input[type="number"]:focus { outline: none; border-color: #5b7cfa; box-shadow: 0 0 0 3px rgba(91, 124, 250, 0.14); }
    #randomTextControls,
    #phoneControls { margin: 0; margin-bottom: 12px; padding: 0; background: white; border: 1px solid rgba(91, 124, 250, 0.15); box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04); }
    #randomTextControls .dg-file-controls-header,
    #phoneControls .dg-file-controls-header { margin: 0; border-left: none; border-right: none; border-top: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 16px; }
    #randomTextControls .dg-file-controls-title,
    #phoneControls .dg-file-controls-title { color: white; font-size: 13px; font-weight: 700; }
    #randomTextControls .dg-file-controls-hint,
    #phoneControls .dg-file-controls-hint { color: rgba(255, 255, 255, 0.85); font-size: 11px; }
    #randomTextControls .dg-file-controls-sections,
    #phoneControls .dg-file-controls-sections { padding: 16px; gap: 12px; }
    #randomTextControls .dg-file-control-section,
    #phoneControls .dg-file-control-section { border: 1px solid rgba(91, 124, 250, 0.12); background: #f8fafc; border-radius: 8px; box-shadow: none; padding: 12px; }
    #randomTextControls .dg-file-control-section::before,
    #phoneControls .dg-file-control-section::before { display: none; }
    #randomTextControls .dg-file-control-section-title,
    #phoneControls .dg-file-control-section-title { font-size: 11px; font-weight: 700; color: #475569; margin-bottom: 10px; }
    #randomTextControls .dg-file-control-group,
    #phoneControls .dg-file-control-group { margin-bottom: 10px; padding-left: 0; }
    #randomTextControls .dg-file-control-group:last-child,
    #phoneControls .dg-file-control-group:last-child { margin-bottom: 0; }
    #randomTextControls .dg-file-control-group label,
    #phoneControls .dg-file-control-group label { color: #64748b; font-size: 11px; font-weight: 600; }
    #randomTextControls .dg-file-control-group input[type="number"],
    #randomTextControls .dg-file-control-group select,
    #phoneControls .dg-file-control-group input[type="number"],
    #phoneControls .dg-file-control-group select { width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; }
    #randomTextControls .dg-rt-check-grid,
    #phoneControls .dg-phone-check-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    #randomTextControls .dg-rt-check,
    #phoneControls .dg-phone-check { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: var(--ink); background: white; border: 1px solid rgba(91, 124, 250, 0.12); padding: 10px 12px; border-radius: 10px; cursor: pointer; transition: all 0.2s ease; flex: 1; min-width: 140px; }
    #randomTextControls .dg-rt-check:hover,
    #phoneControls .dg-phone-check:hover { background: #ffffff; border-color: rgba(91, 124, 250, 0.4); box-shadow: var(--shadow-3); transform: translateY(-1px); }
    #randomTextControls .dg-rt-check input,
    #phoneControls .dg-phone-check input { margin: 0; cursor: pointer; flex-shrink: 0; }
    #passwordControls,
    #emailControls { margin: 0; margin-bottom: 12px; padding: 0; background: white; border: 1px solid rgba(91, 124, 250, 0.15); box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04); }
    #passwordControls .dg-file-controls-header,
    #emailControls .dg-file-controls-header { margin: 0; border-left: none; border-right: none; border-top: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 16px; }
    #passwordControls .dg-file-controls-title,
    #emailControls .dg-file-controls-title { color: white; font-size: 13px; font-weight: 700; }
    #passwordControls .dg-file-controls-hint,
    #emailControls .dg-file-controls-hint { color: rgba(255, 255, 255, 0.85); font-size: 11px; }
    #passwordControls .dg-file-controls-sections,
    #emailControls .dg-file-controls-sections { padding: 16px; gap: 12px; }
    #passwordControls .dg-file-control-section,
    #emailControls .dg-file-control-section { border: 1px solid rgba(91, 124, 250, 0.12); background: #f8fafc; border-radius: 8px; box-shadow: none; padding: 12px; }
    #passwordControls .dg-file-control-section::before,
    #emailControls .dg-file-control-section::before { display: none; }
    #passwordControls .dg-file-control-section-title,
    #emailControls .dg-file-control-section-title { font-size: 11px; font-weight: 700; color: #475569; margin-bottom: 10px; }
    #passwordControls .dg-file-control-group,
    #emailControls .dg-file-control-group { margin-bottom: 10px; padding-left: 0; }
    #passwordControls .dg-file-control-group:last-child,
    #emailControls .dg-file-control-group:last-child { margin-bottom: 0; }
    #passwordControls .dg-file-control-group label,
    #emailControls .dg-file-control-group label { color: #64748b; font-size: 11px; font-weight: 600; }
    #passwordControls .dg-file-control-group input[type="number"],
    #emailControls .dg-file-control-group input[type="number"] { width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; }
    #passwordControls .dg-pw-check-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    #passwordControls .dg-pw-check { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: var(--ink); background: white; border: 1px solid rgba(91, 124, 250, 0.12); padding: 10px 12px; border-radius: 10px; cursor: pointer; transition: all 0.2s ease; flex: 1; min-width: 140px; }
    #passwordControls .dg-pw-check:hover { background: #ffffff; border-color: rgba(91, 124, 250, 0.4); box-shadow: var(--shadow-3); transform: translateY(-1px); }
    #passwordControls .dg-pw-check input { margin: 0; cursor: pointer; flex-shrink: 0; }
    .dg-checkbox-inline,
    .dg-rv-check,
    .dg-rt-check,
    .dg-phone-check,
    .dg-pw-check { transition: all 0.2s ease; }
    .dg-checkbox-inline:hover,
    .dg-rv-check:hover,
    .dg-rt-check:hover,
    .dg-phone-check:hover,
    .dg-pw-check:hover { border-color: rgba(91, 124, 250, 0.45); background: #eef4ff; }
    .dg-checkbox-inline input[type="checkbox"],
    .dg-rv-check input[type="checkbox"],
    .dg-rt-check input[type="checkbox"],
    .dg-phone-check input[type="checkbox"],
    .dg-pw-check input[type="checkbox"] {
      appearance: none;
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border: 1.5px solid rgba(91, 124, 250, 0.5);
      background: #ffffff;
      display: inline-grid;
      place-content: center;
      cursor: pointer;
      transition: all 0.15s ease;
      flex-shrink: 0;
    }
    .dg-checkbox-inline input[type="checkbox"]::after,
    .dg-rv-check input[type="checkbox"]::after,
    .dg-rt-check input[type="checkbox"]::after,
    .dg-phone-check input[type="checkbox"]::after,
    .dg-pw-check input[type="checkbox"]::after {
      content: "";
      width: 7px;
      height: 4px;
      border: 2px solid white;
      border-top: 0;
      border-right: 0;
      transform: rotate(-45deg) scale(0);
      transform-origin: center;
      transition: transform 0.12s ease;
      margin-top: -1px;
    }
    .dg-checkbox-inline input[type="checkbox"]:checked,
    .dg-rv-check input[type="checkbox"]:checked,
    .dg-rt-check input[type="checkbox"]:checked,
    .dg-phone-check input[type="checkbox"]:checked,
    .dg-pw-check input[type="checkbox"]:checked {
      background: linear-gradient(135deg, #5b7cfa 0%, #7f56d9 100%);
      border-color: #5b7cfa;
      box-shadow: 0 0 0 1px rgba(91, 124, 250, 0.12);
    }
    .dg-checkbox-inline input[type="checkbox"]:checked::after,
    .dg-rv-check input[type="checkbox"]:checked::after,
    .dg-rt-check input[type="checkbox"]:checked::after,
    .dg-phone-check input[type="checkbox"]:checked::after,
    .dg-pw-check input[type="checkbox"]:checked::after { transform: rotate(-45deg) scale(1); }
    .dg-checkbox-inline input[type="checkbox"]:focus-visible,
    .dg-rv-check input[type="checkbox"]:focus-visible,
    .dg-rt-check input[type="checkbox"]:focus-visible,
    .dg-phone-check input[type="checkbox"]:focus-visible,
    .dg-pw-check input[type="checkbox"]:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(91, 124, 250, 0.2); }
    .dg-files-section { margin-top: 18px; border: 1px solid rgba(91, 124, 250, 0.24); background: linear-gradient(180deg, #f2f7ff 0%, #edf3ff 100%); box-shadow: var(--shadow-3); }
    .dg-files-section-header { padding: 12px 14px; border-bottom: 1px solid rgba(91, 124, 250, 0.2); background: linear-gradient(135deg, rgba(91, 124, 250, 0.98) 0%, rgba(24, 161, 205, 0.95) 100%); color: white; display: flex; justify-content: space-between; align-items: center; gap: 8px; }
    .dg-files-section-title { font-size: 12px; font-weight: 900; letter-spacing: 0.6px; text-transform: uppercase; }
    .dg-files-section-count { font-size: 10px; font-weight: 800; background: rgba(255,255,255,0.2); padding: 4px 8px; text-transform: uppercase; letter-spacing: 0.4px; }
    .dg-files-list { padding: 10px; display: grid; gap: 8px; }
    .dg-file-item { background: white; border: 1px solid rgba(91, 124, 250, 0.18); padding: 10px 12px; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
    .dg-file-item-main { min-width: 0; display: grid; gap: 4px; }
    .dg-file-item-name { font-weight: 800; color: #1f2937; font-size: 12px; line-height: 1.3; word-break: break-word; }
    .dg-file-item-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .dg-file-tag { font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 900; padding: 2px 6px; background: #e9efff; color: #3656be; border: 1px solid rgba(91, 124, 250, 0.25); }
    .dg-file-item-meta { font-size: 10px; color: #64748b; font-weight: 700; }
    .dg-download-file-btn { background: linear-gradient(135deg, #5b7cfa 0%, #7f56d9 100%); color: white; border: none; padding: 8px 12px; cursor: pointer; font-weight: 800; font-size: 10px; text-transform: uppercase; letter-spacing: 0.4px; white-space: nowrap; transition: all 0.2s ease; border-radius: 0; }
    .dg-download-file-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 16px rgba(91, 124, 250, 0.25); }
    .dg-image-controls { display: none; margin-top: 10px; padding: 15px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(16, 185, 129, 0.12) 100%); border: 1px solid rgba(24, 161, 205, 0.4); border-radius: 12px; box-shadow: var(--shadow-3); }
    .dg-image-controls.active { display: block; }
    .dg-image-controls h4 { margin: 0 0 12px 0; color: #0b4b5a; font-size: 12px; font-weight: 800; display: flex; align-items: center; gap: 6px; text-transform: uppercase; letter-spacing: 0.6px; }
    .dg-image-controls h4::before { content: "🖼️"; font-size: 16px; }
    .dg-image-control-group { margin-bottom: 12px; }
    .dg-image-control-group:last-child { margin-bottom: 0; }
    .dg-image-control-group label { display: block; font-size: 11px; font-weight: 700; color: #0b4b5a; margin-bottom: 6px; }
    .dg-image-size-group { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    .dg-image-size-group input { flex: 1; padding: 8px 10px; border: 1px solid rgba(24, 161, 205, 0.5); border-radius: 8px; font-size: 12px; font-weight: 700; text-align: center; background: white; transition: all 0.2s ease; }
    .dg-image-size-group input:focus { outline: none; border-color: #0284c7; box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.12); }
    .dg-image-size-group span { color: #0b4b5a; font-weight: 800; font-size: 14px; }
    .dg-current-dimensions { background: rgba(255, 255, 255, 0.8); padding: 8px 10px; border-radius: 8px; font-size: 11px; color: #0b4b5a; font-weight: 700; margin-bottom: 8px; border: 1px solid rgba(14, 165, 233, 0.3); }
    .dg-preset-buttons { display: flex; flex-wrap: wrap; gap: 4px; }
    .dg-preset-btn { padding: 6px 10px; border: 1px solid rgba(24, 161, 205, 0.6); background: white; color: #0b4b5a; border-radius: 8px; cursor: pointer; font-size: 10px; font-weight: 700; transition: all 0.2s ease; min-width: 70px; text-align: center; }
    .dg-preset-btn:hover { background: #18a1cd; color: white; transform: translateY(-1px); box-shadow: 0 4px 10px rgba(24, 161, 205, 0.2); }
    .dg-preset-btn.popular { background: var(--accent); border-color: var(--accent); color: white; }
    .dg-preset-btn.popular:hover { background: #d97706; border-color: #d97706; }
    .dg-aspect-ratios { margin-top: 8px; }
    .dg-aspect-ratios label { font-size: 10px; margin-bottom: 4px; }
    .dg-aspect-btn { padding: 4px 8px; border: 1px solid rgba(24, 161, 205, 0.6); background: white; color: #0b4b5a; border-radius: 6px; cursor: pointer; font-size: 9px; font-weight: 700; margin: 2px; transition: all 0.2s ease; }
    .dg-aspect-btn:hover { background: #18a1cd; color: white; }
    .dg-header-actions { display: flex; align-items: center; gap: 10px; margin-left: auto; }
    .dg-header-actions .dg-btn { background: rgba(255,255,255,0.2); color: white; border: 2px solid rgba(255,255,255,0.3); backdrop-filter: blur(10px); font-weight: 700; padding: 9px 14px; border-radius: 10px; transition: all 0.2s ease; }
    .dg-header-actions .dg-btn:hover { background: rgba(255,255,255,0.3); border-color: rgba(255,255,255,0.6); }
    .dg-json-toggle.active { background: rgba(255,255,255,0.35) !important; border-color: white !important; }
    .dg-maximize-btn.active { background: rgba(255,255,255,0.35) !important; border-color: white !important; }
    .dg-json-view { display: none; flex: 1; min-height: 0; overflow: hidden; border-top: 1px solid var(--line); }
    .dg-json-view.active { display: flex; }
    .dg-app.json-mode .dg-footer { display: none; }
    body.dg-force-maximized { width: 100vw !important; height: 100vh !important; overflow: hidden; }
    .dg-app.dg-force-maximized { position: fixed; inset: 0; z-index: 2147483647; }
    .dg-json-pane { flex: 1; min-height: 0; display: flex; flex-direction: column; }
    .dg-json-pane + .dg-json-pane { border-left: 1px solid var(--line); }
    .dg-json-editor-pane { background: linear-gradient(180deg, #f8fbff 0%, #eef3fb 100%); }
    .dg-json-fields-pane { background: linear-gradient(180deg, #ffffff 0%, #f7f8fd 100%); }
    .dg-json-pane-header { padding: 12px 14px; background: linear-gradient(135deg, rgba(91, 124, 250, 0.98) 0%, rgba(24, 161, 205, 0.95) 100%); color: white; border-bottom: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .dg-json-pane-title { font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.6px; }
    .dg-json-pane-note { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.88); }
    .dg-json-editor-wrap { display: flex; flex-direction: column; gap: 10px; padding: 12px; min-height: 0; flex: 1; }
    .dg-json-editor-surface { display: flex; flex: 1; min-height: 0; border: 1px solid rgba(91, 124, 250, 0.25); background: white; }
    .dg-json-line-numbers { width: 48px; flex-shrink: 0; border-right: 1px solid rgba(91, 124, 250, 0.18); background: #f4f7ff; overflow: hidden; padding: 12px 8px; font-size: 12px; line-height: 1.5; font-family: "SFMono-Regular", "Menlo", "Monaco", "Courier New", monospace; text-align: right; color: #7b8aa5; user-select: none; }
    .dg-json-line-numbers div { height: 1.5em; }
    #jsonTemplateInput { width: 100%; flex: 1; min-height: 0; resize: none; border: none; background: white; padding: 12px; font-size: 12px; line-height: 1.5; font-family: "SFMono-Regular", "Menlo", "Monaco", "Courier New", monospace; color: #0f172a; }
    #jsonTemplateInput:focus { outline: none; border-color: #5b7cfa; box-shadow: 0 0 0 3px rgba(91, 124, 250, 0.14); }
    .dg-json-actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .dg-json-actions .dg-btn { padding: 8px 11px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
    #jsonTemplateStatus { min-height: 18px; font-size: 11px; font-weight: 700; color: #42526b; }
    #jsonTemplateStatus.error { color: #dc2626; }
    .dg-json-fields-wrap { flex: 1; min-height: 0; overflow-y: auto; padding: 10px; }
    .dg-json-field-card { border: 1px solid rgba(91, 124, 250, 0.18); background: #ffffff; margin-bottom: 8px; transition: all 0.2s ease; }
    .dg-json-field-card:hover { border-color: rgba(91, 124, 250, 0.35); box-shadow: 0 8px 16px rgba(15, 23, 42, 0.08); }
    .dg-json-field-card.active { border-color: #5b7cfa; box-shadow: 0 10px 20px rgba(91, 124, 250, 0.15); }
    .dg-json-field-main { padding: 10px; cursor: pointer; }
    .dg-json-field-path { font-size: 10px; font-weight: 900; color: #334155; margin-bottom: 6px; word-break: break-all; }
    .dg-json-field-input { width: 100%; border: 1px solid rgba(91, 124, 250, 0.2); padding: 8px 10px; font-size: 12px; font-family: "SFMono-Regular", "Menlo", "Monaco", "Courier New", monospace; color: #111827; background: #f8fbff; }
    .dg-json-field-input:focus { outline: none; border-color: #5b7cfa; background: #ffffff; }
    .dg-json-generator-row { display: none; gap: 8px; padding: 10px; border-top: 1px solid rgba(91, 124, 250, 0.15); background: #f6f8ff; }
    .dg-json-field-card.active .dg-json-generator-row { display: flex; }
    .dg-json-generator-select { flex: 1; min-width: 0; border: 1px solid rgba(91, 124, 250, 0.3); padding: 8px; font-size: 11px; background: #ffffff; color: #1f2937; font-weight: 700; }
    .dg-json-generator-select:focus { outline: none; border-color: #5b7cfa; }
    .dg-json-empty { border: 1px dashed rgba(91, 124, 250, 0.35); background: #f8fbff; color: #516177; font-size: 12px; font-weight: 700; padding: 14px; text-align: center; }
    .dg-app.dg-fullpage .dg-tabs-panel { width: min(22vw, 300px); }
    .dg-app.dg-fullpage .dg-main { width: min(36vw, 620px); }
    .dg-app.dg-fullpage .dg-right-sidebar { min-width: 420px; }
    .dg-app.dg-fullpage .dg-fields-wrapper { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .dg-app.dg-fullpage .dg-content { padding-bottom: 18px; }
    .dg-app.dg-fullpage .dg-right-sidebar { padding-bottom: 18px; }
    .dg-app.dg-fullpage .dg-footer { position: static; }
    .dg-app.dg-fullpage .dg-json-editor-pane { flex: 1.1; }
    .dg-app.dg-fullpage .dg-json-fields-pane { flex: 1.2; }
    .dg-app.dg-fullpage #jsonTemplateInput { font-size: 13px; }
  `;
  document.head.appendChild(style);

  const categories = [
    {
      title: "Personal",
      subTabs: [
        {
          title: "Names",
          fields: [
            { id: "namePrefix", label: "Name Prefix" },
            { id: "firstName", label: "First Name (EN)" },
            { id: "firstNameAr", label: "First Name (AR)" },
            { id: "preferredName", label: "Preferred Name" },
            { id: "nickname", label: "Nickname" },
            { id: "lastName", label: "Last Name (EN)" },
            { id: "lastNameAr", label: "Last Name (AR)" },
            { id: "nameSuffix", label: "Name Suffix" },
            { id: "fullName", label: "Full Name (EN)" },
            { id: "fullNameAr", label: "Full Name (AR)" },
          ]
        },
        {
          title: "Demographics",
          fields: [
            { id: "gender", label: "Gender (EN)" },
            { id: "genderAr", label: "Gender (AR)" },
            { id: "birthdate", label: "Birthdate" },
            { id: "age", label: "Age" },
            { id: "nationality", label: "Nationality (EN)" },
            { id: "nationalityAr", label: "Nationality (AR)" },
            { id: "bloodType", label: "Blood Type" },
          ]
        },
        {
          title: "IDs & Documents",
          fields: [
            { id: "saudiId", label: "Saudi ID" },
            { id: "iqamaNumber", label: "Iqama Number" },
            { id: "borderNumber", label: "Border Number" },
            { id: "passportNumber", label: "Passport Number" },
            { id: "passportWithPrefixEn", label: "Passport (EN, With Prefix)" },
            { id: "passportWithoutPrefixEn", label: "Passport (EN, Without Prefix)" },
            { id: "passportWithPrefixAr", label: "Passport (AR, With Prefix)" },
            { id: "passportWithoutPrefixAr", label: "Passport (AR, Without Prefix)" },
          ]
        },
        {
          title: "Status",
          fields: [
            { id: "maritalStatus", label: "Marital Status (EN)" },
            { id: "maritalStatusAr", label: "Marital Status (AR)" },
            { id: "religion", label: "Religion (EN)" },
            { id: "religionAr", label: "Religion (AR)" },
          ]
        }
      ]
    },
    {
      title: "Contact",
      subTabs: [
        {
          title: "Email & Phone",
          fields: [
            { id: "email", label: "Email" },
            { id: "mobileNumber", label: "Mobile Number" },
            { id: "landlineNumber", label: "Landline Number" },
            { id: "whatsappNumber", label: "WhatsApp Number" },
          ]
        },
        {
          title: "Address",
          fields: [
            { id: "address", label: "Address (EN)" },
            { id: "addressAr", label: "Address (AR)" },
            { id: "nationalAddress", label: "National Address" },
            { id: "city", label: "City (EN)" },
            { id: "cityAr", label: "City (AR)" },
            { id: "district", label: "District (EN)" },
            { id: "districtAr", label: "District (AR)" },
          ]
        },
        {
          title: "Location Details",
          fields: [
            { id: "street", label: "Street (EN)" },
            { id: "streetAr", label: "Street (AR)" },
            { id: "buildingNumber", label: "Building Number" },
            { id: "unitNumber", label: "Unit Number" },
            { id: "postalCode", label: "Postal Code" },
            { id: "additionalNumber", label: "Additional Number" },
            { id: "country", label: "Country (EN)" },
            { id: "countryAr", label: "Country (AR)" },
            { id: "lat", label: "Latitude" },
            { id: "lng", label: "Longitude" },
            { id: "geoHash", label: "GeoHash" },
            { id: "plusCode", label: "Plus Code" },
          ]
        }
      ]
    },
    {
      title: "Saudi Government",
      subTabs: [
        {
          title: "Business Registration",
          fields: [
            { id: "commercialRegister", label: "Commercial Register" },
            { id: "unifiedEstablishmentNumber", label: "Unified Establishment Number" },
            { id: "taxNumber", label: "Tax Number (VAT)" },
            { id: "municipalLicense", label: "Municipal License" },
            { id: "chamberMembership", label: "Chamber Membership" },
            { id: "moiciLicense", label: "MOCI License" },
            { id: "monshaatLicense", label: "Monsha'at SME License" },
            { id: "saberCertificate", label: "SABER Certificate" },
          ]
        },
        {
          title: "Employment & Social",
          fields: [
            { id: "socialInsurance", label: "Social Insurance (GOSI)" },
            { id: "gosiNumber", label: "GOSI Registration Number" },
            { id: "laborOfficeNumber", label: "Labor Office Number" },
            { id: "zakat", label: "Zakat Number" },
            { id: "qiwaNumber", label: "Qiwa Platform Number" },
            { id: "qiwaContractId", label: "Qiwa Employment Contract ID" },
            { id: "mudadContractId", label: "Mudad Contract ID (Legacy)" },
            { id: "hrdfCertificate", label: "HRDF Training Certificate" },
            { id: "saudizationNumber", label: "Saudization Compliance ID" },
            { id: "takamolId", label: "Takamol Training Platform ID" },
          ]
        },
        {
          title: "Digital Services",
          fields: [
            { id: "absherId", label: "Absher ID" },
            { id: "nafathId", label: "Nafath ID" },
            { id: "elmId", label: "Elm ID" },
            { id: "tawakkalnaQr", label: "Tawakkalna QR Code" },
            { id: "sehhatyId", label: "Sehhaty Health ID" },
            { id: "muqeemNumber", label: "Muqeem Residence Service" },
            { id: "nusukPermit", label: "Nusuk Hajj/Umrah Permit" },
            { id: "zatcaCsid", label: "ZATCA CSID (E-Invoice)" },
          ]
        },
        {
          title: "Services & Infrastructure",
          fields: [
            { id: "customsCode", label: "Customs Code" },
            { id: "saudiPost", label: "Saudi Post Box" },
            { id: "balady", label: "Balady Municipal ID" },
            { id: "misaLicense", label: "MISA Investment License" },
            { id: "etimadNumber", label: "Etimad Supplier Number" },
            { id: "sadadPayment", label: "SADAD Payment ID" },
            { id: "samaLicense", label: "SAMA Financial License" },
            { id: "waselCard", label: "Wasel Transport Card" },
            { id: "darbCard", label: "Darb Metro/Bus Card" },
            { id: "musanedId", label: "Musaned Domestic Worker ID" },
            { id: "ajeerContractId", label: "Ajeer Domestic Contract ID" },
            { id: "fasahTerminationId", label: "Fasah Contract Termination ID" },
            { id: "region", label: "Region (EN)" },
            { id: "regionAr", label: "Region (AR)" },
            { id: "province", label: "Province (EN)" },
            { id: "provinceAr", label: "Province (AR)" },
          ]
        }
      ]
    },
    {
      title: "Work",
      subTabs: [
        {
          title: "Company Info",
          fields: [
            { id: "company", label: "Company" },
            { id: "department", label: "Department (EN)" },
            { id: "departmentAr", label: "Department (AR)" },
            { id: "workLocation", label: "Work Location (EN)" },
            { id: "workLocationAr", label: "Work Location (AR)" },
          ]
        },
        {
          title: "Job Details",
          fields: [
            { id: "jobTitle", label: "Job Title (EN)" },
            { id: "jobTitleAr", label: "Job Title (AR)" },
            { id: "employeeId", label: "Employee ID" },
            { id: "workExperience", label: "Experience (Years)" },
          ]
        },
        {
          title: "Compensation & Contact",
          fields: [
            { id: "salary", label: "Salary" },
            { id: "workEmail", label: "Work Email" },
            { id: "workPhone", label: "Work Phone" },
          ]
        }
      ]
    },
    {
      title: "Education",
      subTabs: [
        {
          title: "Institution",
          fields: [
            { id: "university", label: "University (EN)" },
            { id: "universityAr", label: "University (AR)" },
          ]
        },
        {
          title: "Academic Details",
          fields: [
            { id: "degree", label: "Degree (EN)" },
            { id: "degreeAr", label: "Degree (AR)" },
            { id: "major", label: "Major (EN)" },
            { id: "majorAr", label: "Major (AR)" },
            { id: "graduationYear", label: "Graduation Year" },
            { id: "gpa", label: "GPA" },
          ]
        },
        {
          title: "Student Info",
          fields: [
            { id: "studentId", label: "Student ID" },
          ]
        }
      ]
    },
    {
      title: "Finance",
      subTabs: [
        {
          title: "Banking",
          fields: [
            { id: "iban", label: "IBAN" },
            { id: "ibanCountry", label: "IBAN Country" },
            { id: "bankName", label: "Bank Name (EN)" },
            { id: "bankNameAr", label: "Bank Name (AR)" },
            { id: "accountNumber", label: "Account Number" },
            { id: "accountBalance", label: "Account Balance" },
            { id: "swiftCode", label: "SWIFT Code" },
          ]
        },
        {
          title: "Cards & Payment",
          fields: [
            { id: "creditCard", label: "Credit Card" },
            { id: "cardType", label: "Card Type" },
            { id: "cardIssuer", label: "Card Issuer" },
            { id: "cardLast4", label: "Card Last 4" },
            { id: "cardExpiry", label: "Card Expiry" },
            { id: "cvv", label: "CVV" },
            { id: "merchantName", label: "Merchant Name" },
          ]
        },
        {
          title: "Currency",
          fields: [
            { id: "currency", label: "Currency (EN)" },
            { id: "currencyAr", label: "Currency (AR)" },
          ]
        }
      ]
    },
    {
      title: "Crypto",
      subTabs: [
        {
          title: "Market",
          fields: [
            { id: "cryptoSymbol", label: "Symbol" },
            { id: "cryptoName", label: "Name" },
            { id: "cryptoPrice", label: "Price (USD)" },
            { id: "cryptoPriceSAR", label: "Price (SAR)" },
            { id: "marketCap", label: "Market Cap" },
            { id: "volume24h", label: "24h Volume" },
            { id: "priceChange24h", label: "24h Change" }
          ]
        },
        {
          title: "Addresses",
          fields: [
            { id: "walletAddress", label: "Wallet Address" },
            { id: "ethereumAddress", label: "Ethereum Address" },
            { id: "transactionHash", label: "Transaction Hash" },
            { id: "smartContractAddress", label: "Smart Contract Address" },
            { id: "blockHeight", label: "Block Height" }
          ]
        },
        {
          title: "Trading",
          fields: [
            { id: "tradingPair", label: "Trading Pair" },
            { id: "orderType", label: "Order Type" },
            { id: "orderSide", label: "Order Side" },
            { id: "orderAmount", label: "Order Amount" },
            { id: "cryptoExchange", label: "Exchange" },
            { id: "portfolioValue", label: "Portfolio Value (USD)" },
            { id: "portfolioValueSAR", label: "Portfolio Value (SAR)" },
            { id: "roi", label: "ROI" }
          ]
        },
        {
          title: "DeFi & NFTs",
          fields: [
            { id: "tokenStandard", label: "Token Standard" },
            { id: "dexName", label: "DEX Name" },
            { id: "liquidityPool", label: "Liquidity Pool" },
            { id: "defiProtocol", label: "DeFi Protocol" },
            { id: "stakingReward", label: "Staking Reward" },
            { id: "stakingPeriod", label: "Staking Period" },
            { id: "yieldFarming", label: "Yield Farming" },
            { id: "nftCollection", label: "NFT Collection" },
            { id: "nftPrice", label: "NFT Price" },
            { id: "nftRarity", label: "NFT Rarity" }
          ]
        }
      ]
    },
    {
      title: "Healthcare",
      subTabs: [
        {
          title: "Medical Records",
          fields: [
            { id: "medicalRecord", label: "Medical Record" },
            { id: "insuranceNumber", label: "Insurance Number" },
          ]
        },
        {
          title: "Healthcare Providers",
          fields: [
            { id: "doctorName", label: "Doctor Name (EN)" },
            { id: "doctorNameAr", label: "Doctor Name (AR)" },
            { id: "hospital", label: "Hospital (EN)" },
            { id: "hospitalAr", label: "Hospital (AR)" },
          ]
        },
        {
          title: "Medical Details",
          fields: [
            { id: "diagnosis", label: "Diagnosis (EN)" },
            { id: "diagnosisAr", label: "Diagnosis (AR)" },
            { id: "medication", label: "Medication (EN)" },
            { id: "medicationAr", label: "Medication (AR)" },
          ]
        }
      ]
    },
    {
      title: "Vehicle",
      subTabs: [
        {
          title: "Vehicle Info",
          fields: [
            { id: "carModel", label: "Car Model (EN)" },
            { id: "carModelAr", label: "Car Model (AR)" },
            { id: "carBrand", label: "Car Brand (EN)" },
            { id: "carBrandAr", label: "Car Brand (AR)" },
            { id: "carYear", label: "Car Year" },
            { id: "carColor", label: "Car Color (EN)" },
            { id: "carColorAr", label: "Car Color (AR)" },
          ]
        },
        {
          title: "Registration & IDs",
          fields: [
            { id: "licensePlate", label: "License Plate" },
            { id: "saudiLicensePlate", label: "Saudi License Plate" },
            { id: "diplomaticPlate", label: "Diplomatic Plate" },
            { id: "publicTransportPlate", label: "Public Transport Plate" },
            { id: "commercialPlate", label: "Commercial Plate" },
            { id: "vin", label: "VIN Number" },
            { id: "engineNumber", label: "Engine Number" },
            { id: "vehicleRegistration", label: "Vehicle Registration (Istimara)" },
          ]
        }
      ]
    },
    {
      title: "Automotive",
      subTabs: [
        {
          title: "Specs & Usage",
          fields: [
            { id: "engineSize", label: "Engine Size" },
            { id: "fuelType", label: "Fuel Type (EN)" },
            { id: "fuelTypeAr", label: "Fuel Type (AR)" },
            { id: "transmission", label: "Transmission (EN)" },
            { id: "transmissionAr", label: "Transmission (AR)" },
            { id: "mileage", label: "Mileage" },
            { id: "price", label: "Price" }
          ]
        },
        {
          title: "Insurance & Service",
          fields: [
            { id: "insuranceCompany", label: "Insurance Company" },
            { id: "insuranceType", label: "Insurance Type (EN)" },
            { id: "insuranceTypeAr", label: "Insurance Type (AR)" },
            { id: "dealership", label: "Dealership" },
            { id: "serviceType", label: "Service Type (EN)" },
            { id: "serviceTypeAr", label: "Service Type (AR)" }
          ]
        },
        {
          title: "Parts & IDs",
          fields: [
            { id: "partName", label: "Part Name (EN)" },
            { id: "partNameAr", label: "Part Name (AR)" },
            { id: "licensePlateEn", label: "License Plate (EN)" },
            { id: "drivingLicenseNumber", label: "Driving License Number" },
            { id: "licenseCategory", label: "License Category (EN)" },
            { id: "licenseCategoryAr", label: "License Category (AR)" }
          ]
        }
      ]
    },
    {
      title: "E-commerce",
      subTabs: [
        {
          title: "Products",
          fields: [
            { id: "productName", label: "Product Name (EN)" },
            { id: "productNameAr", label: "Product Name (AR)" },
            { id: "productSku", label: "Product SKU" },
            { id: "productPrice", label: "Product Price" },
            { id: "productCategory", label: "Category (EN)" },
            { id: "productCategoryAr", label: "Category (AR)" },
            { id: "productBrand", label: "Brand (EN)" },
            { id: "productBrandAr", label: "Brand (AR)" },
            { id: "productDescription", label: "Description (EN)" },
            { id: "productDescriptionAr", label: "Description (AR)" },
          ]
        },
        {
          title: "Orders & Shipping",
          fields: [
            { id: "orderNumber", label: "Order Number" },
            { id: "trackingNumber", label: "Tracking Number" },
            { id: "couponCode", label: "Coupon Code" },
          ]
        },
        {
          title: "Reviews",
          fields: [
            { id: "reviewRating", label: "Review Rating" },
          ]
        }
      ]
    },
    {
      title: "Social Media",
      subTabs: [
        {
          title: "Profile Info",
          fields: [
            { id: "username", label: "Username" },
            { id: "displayName", label: "Display Name (EN)" },
            { id: "displayNameAr", label: "Display Name (AR)" },
            { id: "socialHandle", label: "Social Handle" },
          ]
        },
        {
          title: "Content",
          fields: [
            { id: "bio", label: "Bio (EN)" },
            { id: "bioAr", label: "Bio (AR)" },
            { id: "hashtag", label: "Hashtag" },
            { id: "mention", label: "Mention" },
          ]
        },
        {
          title: "Statistics",
          fields: [
            { id: "followers", label: "Followers Count" },
            { id: "following", label: "Following Count" },
            { id: "posts", label: "Posts Count" },
          ]
        }
      ]
    },
    {
      title: "Technology",
      subTabs: [
        {
          title: "Network & IDs",
          fields: [
            { id: "ipAddress", label: "IP Address" },
            { id: "macAddress", label: "MAC Address" },
            { id: "deviceId", label: "Device ID" },
            { id: "sessionId", label: "Session ID" },
          ]
        },
        {
          title: "Software & Apps",
          fields: [
            { id: "userAgent", label: "User Agent" },
            { id: "apiKey", label: "API Key" },
            { id: "appVersion", label: "App Version" },
            { id: "osVersion", label: "OS Version" },
            { id: "browserName", label: "Browser Name" },
          ]
        },
        {
          title: "Infrastructure",
          fields: [
            { id: "serverName", label: "Server Name" },
            { id: "databaseName", label: "Database Name" },
            { id: "deviceType", label: "Device Type (EN)" },
            { id: "deviceTypeAr", label: "Device Type (AR)" },
          ]
        }
      ]
    },
    {
      title: "IoT & Smart Home",
      subTabs: [
        {
          title: "Devices",
          fields: [
            { id: "deviceBrand", label: "Device Brand" },
            { id: "deviceModel", label: "Device Model" },
            { id: "firmwareVersion", label: "Firmware Version" },
            { id: "roomLocation", label: "Room Location (EN)" },
            { id: "roomLocationAr", label: "Room Location (AR)" }
          ]
        },
        {
          title: "Network & Power",
          fields: [
            { id: "wifiSSID", label: "WiFi SSID" },
            { id: "signalStrength", label: "Signal Strength" },
            { id: "batteryLevel", label: "Battery Level" },
            { id: "powerConsumption", label: "Power Consumption" },
            { id: "dataUsage", label: "Data Usage" }
          ]
        },
        {
          title: "Automation",
          fields: [
            { id: "sensorReading", label: "Sensor Reading" },
            { id: "automationRule", label: "Automation Rule (EN)" },
            { id: "automationRuleAr", label: "Automation Rule (AR)" },
            { id: "sceneMode", label: "Scene Mode (EN)" },
            { id: "sceneModeAr", label: "Scene Mode (AR)" },
            { id: "voiceCommand", label: "Voice Command (EN)" },
            { id: "voiceCommandAr", label: "Voice Command (AR)" }
          ]
        },
        {
          title: "Platform & Ops",
          fields: [
            { id: "appName", label: "App Name" },
            { id: "cloudService", label: "Cloud Service" },
            { id: "updateFrequency", label: "Update Frequency" },
            { id: "dataRetention", label: "Data Retention" },
            { id: "maintenanceSchedule", label: "Maintenance Schedule" }
          ]
        }
      ]
    },
    {
      title: "Gaming",
      subTabs: [
        {
          title: "Player Info",
          fields: [
            { id: "gamertag", label: "Gamertag" },
            { id: "playerLevel", label: "Player Level" },
            { id: "playerScore", label: "Player Score" },
            { id: "character", label: "Character Name (EN)" },
            { id: "characterAr", label: "Character Name (AR)" },
          ]
        },
        {
          title: "Games & Achievements",
          fields: [
            { id: "gameTitle", label: "Game Title (EN)" },
            { id: "gameTitleAr", label: "Game Title (AR)" },
            { id: "achievement", label: "Achievement (EN)" },
            { id: "achievementAr", label: "Achievement (AR)" },
          ]
        },
        {
          title: "Social",
          fields: [
            { id: "guild", label: "Guild Name (EN)" },
            { id: "guildAr", label: "Guild Name (AR)" },
          ]
        }
      ]
    },
    {
      title: "Travel",
      subTabs: [
        {
          title: "Flights",
          fields: [
            { id: "flightNumber", label: "Flight Number" },
            { id: "airline", label: "Airline (EN)" },
            { id: "airlineAr", label: "Airline (AR)" },
            { id: "airport", label: "Airport (EN)" },
            { id: "airportAr", label: "Airport (AR)" },
            { id: "seatNumber", label: "Seat Number" },
            { id: "gateNumber", label: "Gate Number" },
            { id: "terminal", label: "Terminal" },
          ]
        },
        {
          title: "Accommodation",
          fields: [
            { id: "hotelName", label: "Hotel Name (EN)" },
            { id: "hotelNameAr", label: "Hotel Name (AR)" },
            { id: "bookingReference", label: "Booking Reference" },
          ]
        },
        {
          title: "Destinations",
          fields: [
            { id: "destination", label: "Destination (EN)" },
            { id: "destinationAr", label: "Destination (AR)" },
          ]
        }
      ]
    },
    {
      title: "Food & Restaurant",
      subTabs: [
        {
          title: "Menu & Dishes",
          fields: [
            { id: "dishName", label: "Dish Name (EN)" },
            { id: "dishNameAr", label: "Dish Name (AR)" },
            { id: "cuisine", label: "Cuisine Type (EN)" },
            { id: "cuisineAr", label: "Cuisine Type (AR)" },
            { id: "menuPrice", label: "Menu Price" },
            { id: "ingredient", label: "Ingredient (EN)" },
            { id: "ingredientAr", label: "Ingredient (AR)" },
          ]
        },
        {
          title: "Restaurant Info",
          fields: [
            { id: "restaurantName", label: "Restaurant Name (EN)" },
            { id: "restaurantNameAr", label: "Restaurant Name (AR)" },
            { id: "chefName", label: "Chef Name (EN)" },
            { id: "chefNameAr", label: "Chef Name (AR)" },
          ]
        },
        {
          title: "Orders & Service",
          fields: [
            { id: "tableNumber", label: "Table Number" },
            { id: "orderNumber", label: "Order Number" },
            { id: "deliveryTime", label: "Delivery Time" },
          ]
        }
      ]
    },
    {
      title: "Sports & Fitness",
      subTabs: [
        {
          title: "Sports Info",
          fields: [
            { id: "sportName", label: "Sport Name (EN)" },
            { id: "sportNameAr", label: "Sport Name (AR)" },
            { id: "teamName", label: "Team Name (EN)" },
            { id: "teamNameAr", label: "Team Name (AR)" },
            { id: "stadiumName", label: "Stadium Name (EN)" },
            { id: "stadiumNameAr", label: "Stadium Name (AR)" },
          ]
        },
        {
          title: "People",
          fields: [
            { id: "playerName", label: "Player Name (EN)" },
            { id: "playerNameAr", label: "Player Name (AR)" },
            { id: "coachName", label: "Coach Name (EN)" },
            { id: "coachNameAr", label: "Coach Name (AR)" },
          ]
        },
        {
          title: "Performance & Fitness",
          fields: [
            { id: "matchScore", label: "Match Score" },
            { id: "workoutType", label: "Workout Type (EN)" },
            { id: "workoutTypeAr", label: "Workout Type (AR)" },
            { id: "fitnessGoal", label: "Fitness Goal (EN)" },
            { id: "fitnessGoalAr", label: "Fitness Goal (AR)" },
          ]
        }
      ]
    },
    {
      title: "Real Estate",
      subTabs: [
        {
          title: "Property Details",
          fields: [
            { id: "propertyType", label: "Property Type (EN)" },
            { id: "propertyTypeAr", label: "Property Type (AR)" },
            { id: "propertyPrice", label: "Property Price" },
            { id: "propertySize", label: "Property Size" },
            { id: "bedrooms", label: "Bedrooms" },
            { id: "bathrooms", label: "Bathrooms" },
            { id: "propertyAge", label: "Property Age" },
            { id: "propertyId", label: "Property ID" },
          ]
        },
        {
          title: "Location & Features",
          fields: [
            { id: "neighborhood", label: "Neighborhood (EN)" },
            { id: "neighborhoodAr", label: "Neighborhood (AR)" },
            { id: "amenities", label: "Amenities (EN)" },
            { id: "amenitiesAr", label: "Amenities (AR)" },
          ]
        },
        {
          title: "Listing Info",
          fields: [
            { id: "agentName", label: "Agent Name (EN)" },
            { id: "agentNameAr", label: "Agent Name (AR)" },
            { id: "listingDate", label: "Listing Date" },
          ]
        }
      ]
    },
    {
      title: "Entertainment",
      subTabs: [
        {
          title: "Movies & Shows",
          fields: [
            { id: "movieTitle", label: "Movie Title (EN)" },
            { id: "movieTitleAr", label: "Movie Title (AR)" },
            { id: "genre", label: "Genre (EN)" },
            { id: "genreAr", label: "Genre (AR)" },
            { id: "releaseYear", label: "Release Year" },
            { id: "rating", label: "Rating" },
            { id: "duration", label: "Duration" },
          ]
        },
        {
          title: "People",
          fields: [
            { id: "actorName", label: "Actor Name (EN)" },
            { id: "actorNameAr", label: "Actor Name (AR)" },
            { id: "directorName", label: "Director Name (EN)" },
            { id: "directorNameAr", label: "Director Name (AR)" },
          ]
        },
        {
          title: "Cinema & Tickets",
          fields: [
            { id: "cinemaName", label: "Cinema Name (EN)" },
            { id: "cinemaNameAr", label: "Cinema Name (AR)" },
            { id: "showTime", label: "Show Time" },
            { id: "ticketPrice", label: "Ticket Price" },
          ]
        }
      ]
    },
    {
      title: "Media & Streaming",
      subTabs: [
        {
          title: "Movies & TV",
          fields: [
            { id: "movieGenre", label: "Movie Genre" },
            { id: "movieRating", label: "Movie Rating" },
            { id: "movieDuration", label: "Movie Duration" },
            { id: "tvShow", label: "TV Show" },
            { id: "episodeNumber", label: "Episode Number" }
          ]
        },
        {
          title: "Music & Audio",
          fields: [
            { id: "musicGenre", label: "Music Genre" },
            { id: "artist", label: "Artist" },
            { id: "songTitle", label: "Song Title" },
            { id: "albumTitle", label: "Album Title" },
            { id: "podcastTitle", label: "Podcast Title" }
          ]
        },
        {
          title: "Books & Content",
          fields: [
            { id: "bookTitle", label: "Book Title" },
            { id: "author", label: "Author" },
            { id: "contentType", label: "Content Type" },
            { id: "viewCount", label: "View Count" },
            { id: "streamingService", label: "Streaming Service" }
          ]
        },
        {
          title: "Platforms",
          fields: [
            { id: "gamePlatform", label: "Game Platform" },
            { id: "socialMediaPlatform", label: "Social Media Platform" },
            { id: "influencerHandle", label: "Influencer Handle" }
          ]
        }
      ]
    },
    {
      title: "Science & Research",
      subTabs: [
        {
          title: "Research Projects",
          fields: [
            { id: "researchTitle", label: "Research Title (EN)" },
            { id: "researchTitleAr", label: "Research Title (AR)" },
            { id: "researchField", label: "Research Field (EN)" },
            { id: "researchFieldAr", label: "Research Field (AR)" },
            { id: "experimentId", label: "Experiment ID" },
          ]
        },
        {
          title: "People & Institutions",
          fields: [
            { id: "scientistName", label: "Scientist Name (EN)" },
            { id: "scientistNameAr", label: "Scientist Name (AR)" },
            { id: "labName", label: "Lab Name (EN)" },
            { id: "labNameAr", label: "Lab Name (AR)" },
          ]
        },
        {
          title: "Publications & Methods",
          fields: [
            { id: "publicationDate", label: "Publication Date" },
            { id: "journalName", label: "Journal Name (EN)" },
            { id: "journalNameAr", label: "Journal Name (AR)" },
            { id: "hypothesis", label: "Hypothesis (EN)" },
            { id: "hypothesisAr", label: "Hypothesis (AR)" },
            { id: "methodology", label: "Methodology (EN)" },
            { id: "methodologyAr", label: "Methodology (AR)" },
          ]
        }
      ]
    },
    {
      title: "Legal & Law",
      subTabs: [
        {
          title: "Legal Entities",
          fields: [
            { id: "lawFirm", label: "Law Firm (EN)" },
            { id: "lawFirmAr", label: "Law Firm (AR)" },
            { id: "lawyerName", label: "Lawyer Name (EN)" },
            { id: "lawyerNameAr", label: "Lawyer Name (AR)" },
            { id: "judgeName", label: "Judge Name (EN)" },
            { id: "judgeNameAr", label: "Judge Name (AR)" },
          ]
        },
        {
          title: "Cases & Courts",
          fields: [
            { id: "caseNumber", label: "Case Number" },
            { id: "caseType", label: "Case Type (EN)" },
            { id: "caseTypeAr", label: "Case Type (AR)" },
            { id: "courtName", label: "Court Name (EN)" },
            { id: "courtNameAr", label: "Court Name (AR)" },
          ]
        },
        {
          title: "Documents & Status",
          fields: [
            { id: "licenseNumber", label: "License Number" },
            { id: "contractId", label: "Contract ID" },
            { id: "legalStatus", label: "Legal Status (EN)" },
            { id: "legalStatusAr", label: "Legal Status (AR)" },
          ]
        }
      ]
    },
    {
      title: "Fashion & Beauty",
      subTabs: [
        {
          title: "Brands & Designers",
          fields: [
            { id: "brandName", label: "Brand Name (EN)" },
            { id: "brandNameAr", label: "Brand Name (AR)" },
            { id: "designer", label: "Designer (EN)" },
            { id: "designerAr", label: "Designer (AR)" },
            { id: "collection", label: "Collection (EN)" },
            { id: "collectionAr", label: "Collection (AR)" },
          ]
        },
        {
          title: "Product Details",
          fields: [
            { id: "productColor", label: "Product Color (EN)" },
            { id: "productColorAr", label: "Product Color (AR)" },
            { id: "size", label: "Size" },
            { id: "material", label: "Material (EN)" },
            { id: "materialAr", label: "Material (AR)" },
            { id: "styleCode", label: "Style Code" },
          ]
        },
        {
          title: "Seasonal & Pricing",
          fields: [
            { id: "season", label: "Season (EN)" },
            { id: "seasonAr", label: "Season (AR)" },
            { id: "retailPrice", label: "Retail Price" },
          ]
        }
      ]
    },
    {
      title: "Agriculture",
      subTabs: [
        {
          title: "Farm & Farmer",
          fields: [
            { id: "farmName", label: "Farm Name (EN)" },
            { id: "farmNameAr", label: "Farm Name (AR)" },
            { id: "farmerName", label: "Farmer Name (EN)" },
            { id: "farmerNameAr", label: "Farmer Name (AR)" },
            { id: "farmSize", label: "Farm Size" },
          ]
        },
        {
          title: "Crops & Cultivation",
          fields: [
            { id: "cropName", label: "Crop Name (EN)" },
            { id: "cropNameAr", label: "Crop Name (AR)" },
            { id: "plantingDate", label: "Planting Date" },
            { id: "harvestDate", label: "Harvest Date" },
            { id: "yieldAmount", label: "Yield Amount" },
          ]
        },
        {
          title: "Farming Methods",
          fields: [
            { id: "soilType", label: "Soil Type (EN)" },
            { id: "soilTypeAr", label: "Soil Type (AR)" },
            { id: "irrigationType", label: "Irrigation Type (EN)" },
            { id: "irrigationTypeAr", label: "Irrigation Type (AR)" },
            { id: "pesticide", label: "Pesticide (EN)" },
            { id: "pesticideAr", label: "Pesticide (AR)" },
          ]
        }
      ]
    },
    {
      title: "Logistics & Shipping",
      subTabs: [
        {
          title: "Shipment Info",
          fields: [
            { id: "shipmentId", label: "Shipment ID" },
            { id: "trackingCode", label: "Tracking Code" },
            { id: "shipmentWeight", label: "Shipment Weight" },
            { id: "shipmentDimensions", label: "Dimensions" },
            { id: "shippingCost", label: "Shipping Cost" },
          ]
        },
        {
          title: "Carrier & Delivery",
          fields: [
            { id: "carrierName", label: "Carrier Name (EN)" },
            { id: "carrierNameAr", label: "Carrier Name (AR)" },
            { id: "deliveryStatus", label: "Delivery Status (EN)" },
            { id: "deliveryStatusAr", label: "Delivery Status (AR)" },
            { id: "estimatedDelivery", label: "Estimated Delivery" },
          ]
        },
        {
          title: "Locations",
          fields: [
            { id: "origin", label: "Origin (EN)" },
            { id: "originAr", label: "Origin (AR)" },
            { id: "destination", label: "Destination (EN)" },
            { id: "destinationAr", label: "Destination (AR)" },
            { id: "warehouseLocation", label: "Warehouse Location (EN)" },
            { id: "warehouseLocationAr", label: "Warehouse Location (AR)" },
          ]
        }
      ]
    },
    {
      title: "Energy & Utilities",
      subTabs: [
        {
          title: "Utility Services",
          fields: [
            { id: "utilityCompany", label: "Utility Company (EN)" },
            { id: "utilityCompanyAr", label: "Utility Company (AR)" },
            { id: "energyType", label: "Energy Type (EN)" },
            { id: "energyTypeAr", label: "Energy Type (AR)" },
            { id: "serviceType", label: "Service Type (EN)" },
            { id: "serviceTypeAr", label: "Service Type (AR)" },
          ]
        },
        {
          title: "Metering & Consumption",
          fields: [
            { id: "meterNumber", label: "Meter Number" },
            { id: "consumption", label: "Consumption" },
            { id: "billAmount", label: "Bill Amount" },
            { id: "billingPeriod", label: "Billing Period" },
          ]
        },
        {
          title: "Infrastructure",
          fields: [
            { id: "powerPlant", label: "Power Plant (EN)" },
            { id: "powerPlantAr", label: "Power Plant (AR)" },
            { id: "gridConnection", label: "Grid Connection" },
            { id: "voltage", label: "Voltage" },
            { id: "frequency", label: "Frequency" },
          ]
        }
      ]
    },
    {
      title: "Emojis",
      subTabs: [
        {
          title: "Categories",
          fields: [
            { id: "emojiCategory", label: "Emoji Category" },
            { id: "emojiRandom", label: "Random Emoji" }
          ]
        },
        {
          title: "Smileys",
          fields: [
            { id: "emojiSmileys", label: "Smileys & Emotions" }
          ]
        },
        {
          title: "People",
          fields: [
            { id: "emojiPeople", label: "People & Body" }
          ]
        },
        {
          title: "Animals",
          fields: [
            { id: "emojiAnimals", label: "Animals & Nature" }
          ]
        },
        {
          title: "Food",
          fields: [
            { id: "emojiFood", label: "Food & Drink" }
          ]
        },
        {
          title: "Travel",
          fields: [
            { id: "emojiTravel", label: "Travel & Places" }
          ]
        },
        {
          title: "Activities",
          fields: [
            { id: "emojiActivities", label: "Activities" }
          ]
        },
        {
          title: "Objects",
          fields: [
            { id: "emojiObjects", label: "Objects" }
          ]
        },
        {
          title: "Symbols",
          fields: [
            { id: "emojiSymbols", label: "Symbols" }
          ]
        },
        {
          title: "Flags",
          fields: [
            { id: "emojiFlags", label: "Flags" }
          ]
        }
      ]
    },
    {
      title: "Weather & Environment",
      subTabs: [
        {
          title: "Conditions",
          fields: [
            { id: "temperature", label: "Temperature (C)" },
            { id: "temperatureFahrenheit", label: "Temperature (F)" },
            { id: "humidity", label: "Humidity" },
            { id: "windSpeed", label: "Wind Speed" },
            { id: "windDirection", label: "Wind Direction (EN)" },
            { id: "windDirectionAr", label: "Wind Direction (AR)" },
            { id: "weatherCondition", label: "Condition (EN)" },
            { id: "weatherConditionAr", label: "Condition (AR)" },
            { id: "precipitation", label: "Precipitation" },
            { id: "visibility", label: "Visibility" }
          ]
        },
        {
          title: "Air & Sun",
          fields: [
            { id: "uvIndex", label: "UV Index" },
            { id: "airQualityIndex", label: "Air Quality Index" },
            { id: "airQuality", label: "Air Quality (EN)" },
            { id: "airQualityAr", label: "Air Quality (AR)" },
            { id: "pollutant", label: "Pollutant" },
            { id: "pollutantLevel", label: "Pollutant Level" },
            { id: "sunrise", label: "Sunrise" },
            { id: "sunset", label: "Sunset" }
          ]
        },
        {
          title: "Climate & Alerts",
          fields: [
            { id: "climateZone", label: "Climate Zone (EN)" },
            { id: "climateZoneAr", label: "Climate Zone (AR)" },
            { id: "moonPhase", label: "Moon Phase (EN)" },
            { id: "moonPhaseAr", label: "Moon Phase (AR)" },
            { id: "barometricPressure", label: "Barometric Pressure" },
            { id: "dewPoint", label: "Dew Point" },
            { id: "heatIndex", label: "Heat Index" },
            { id: "windChill", label: "Wind Chill" },
            { id: "naturalDisaster", label: "Natural Disaster (EN)" },
            { id: "naturalDisasterAr", label: "Natural Disaster (AR)" },
            { id: "environmentalAlert", label: "Environmental Alert (EN)" },
            { id: "environmentalAlertAr", label: "Environmental Alert (AR)" }
          ]
        },
        {
          title: "Ecosystem",
          fields: [
            { id: "ecosystemType", label: "Ecosystem Type (EN)" },
            { id: "ecosystemTypeAr", label: "Ecosystem Type (AR)" },
            { id: "wildlifeSpecies", label: "Wildlife Species (EN)" },
            { id: "wildlifeSpeciesAr", label: "Wildlife Species (AR)" },
            { id: "plantSpecies", label: "Plant Species (EN)" },
            { id: "plantSpeciesAr", label: "Plant Species (AR)" },
            { id: "waterSource", label: "Water Source (EN)" },
            { id: "waterSourceAr", label: "Water Source (AR)" },
            { id: "renewableEnergy", label: "Renewable Energy (EN)" },
            { id: "renewableEnergyAr", label: "Renewable Energy (AR)" },
            { id: "carbonFootprint", label: "Carbon Footprint" },
            { id: "energyConsumption", label: "Energy Consumption" },
            { id: "waterConsumption", label: "Water Consumption" },
            { id: "wasteGeneration", label: "Waste Generation" },
            { id: "recyclingRate", label: "Recycling Rate" }
          ]
        }
      ]
    },
    {
      title: "Random Values",
      subTabs: [
        {
          title: "Basic Random",
          fields: [
            { id: "customRandom", label: "Custom Random" },
            { id: "randomNumbers", label: "Random Numbers" },
            { id: "randomLetters", label: "Random Letters" },
            { id: "randomMixed", label: "Random Mixed" },
            { id: "randomAlphanumeric", label: "Random Alphanumeric" },
          ]
        },
        {
          title: "Case Variations",
          fields: [
            { id: "randomUppercase", label: "Random Uppercase" },
            { id: "randomLowercase", label: "Random Lowercase" },
          ]
        },
        {
          title: "Special & International",
          fields: [
            { id: "randomArabicLetters", label: "Random Arabic Letters" },
            { id: "randomSpecialChars", label: "Random Special Chars" },
            { id: "randomHex", label: "Random Hex" },
          ]
        }
      ]
    },
    {
      title: "IDs & Keys",
      subTabs: [
        {
          title: "UUIDs",
          fields: [
            { id: "uuid", label: "UUID v4" },
            { id: "uuidV1", label: "UUID v1" },
            { id: "uuidV3", label: "UUID v3" },
            { id: "uuidV5", label: "UUID v5" },
            { id: "guid", label: "GUID" },
            { id: "shortUuid", label: "Short UUID" },
            { id: "uuidNoDashes", label: "UUID (No Dashes)" }
          ]
        },
        {
          title: "Sortable IDs",
          fields: [
            { id: "ulid", label: "ULID" },
            { id: "ksuid", label: "KSUID" },
            { id: "snowflakeId", label: "Snowflake ID" },
            { id: "mongoObjectId", label: "Mongo ObjectId" },
            { id: "xid", label: "XID" }
          ]
        },
        {
          title: "Tokens & Hashes",
          fields: [
            { id: "nanoid", label: "Nano ID" },
            { id: "cuid", label: "CUID" },
            { id: "jwtToken", label: "JWT Token" },
            { id: "hash", label: "Hash (SHA-256)" },
            { id: "randomSeed", label: "Random Seed" }
          ]
        },
        {
          title: "Generic IDs",
          fields: [
            { id: "alphanumericId", label: "Alphanumeric ID" },
            { id: "numericId", label: "Numeric ID" },
            { id: "hexId", label: "Hex ID" },
            { id: "base64Id", label: "Base64 ID" },
            { id: "prefixedId", label: "Prefixed ID" },
            { id: "timestampId", label: "Timestamp ID" }
          ]
        }
      ]
    },
    {
      title: "Random Text",
      subTabs: [
        {
          title: "Basic Text",
          fields: [
            { id: "randomText", label: "Random Text" },
            { id: "randomDigits", label: "Random Digits" },
            { id: "randomEnglish", label: "Random English" },
            { id: "randomSpecial", label: "Random Special Chars" },
            { id: "randomMixed", label: "Random Mixed" },
          ]
        },
        {
          title: "International",
          fields: [
            { id: "randomArabic", label: "Random Arabic" },
            { id: "randomArabicNumbers", label: "Arabic Numbers ١٢٣" },
            { id: "randomIndianNumbers", label: "Indian Numbers ۱۲۳" },
            { id: "randomChinese", label: "Random Chinese" },
            { id: "randomJapanese", label: "Random Japanese" },
            { id: "randomRussian", label: "Random Russian" },
          ]
        },
        {
          title: "Special Characters",
          fields: [
            { id: "randomEmoji", label: "Random Emoji" },
            { id: "randomInvalidChars", label: "Invalid/Control Chars" },
          ]
        }
      ]
    },
    {
      title: "Colors",
      subTabs: [
        {
          title: "Web Colors",
          fields: [
            { id: "hexColor", label: "HEX Color (#RRGGBB)" },
            { id: "hexColorShort", label: "HEX Short (#RGB)" },
            { id: "rgbColor", label: "RGB Color" },
            { id: "rgbaColor", label: "RGBA Color" },
            { id: "cssColorName", label: "CSS Color Name" },
            { id: "cssGradient", label: "CSS Gradient" }
          ]
        },
        {
          title: "Design Colors",
          fields: [
            { id: "hslColor", label: "HSL Color" },
            { id: "hslaColor", label: "HSLA Color" },
            { id: "hsvColor", label: "HSV Color" },
            { id: "hwbColor", label: "HWB Color" },
            { id: "labColor", label: "LAB Color" }
          ]
        },
        {
          title: "Print & Industry",
          fields: [
            { id: "cmykColor", label: "CMYK Color" },
            { id: "pantoneColor", label: "Pantone Color" },
            { id: "ralColor", label: "RAL Color" }
          ]
        },
        {
          title: "Framework Colors",
          fields: [
            { id: "materialColor", label: "Material Design" },
            { id: "tailwindColor", label: "Tailwind CSS" },
            { id: "bootstrapColor", label: "Bootstrap Color" }
          ]
        },
        {
          title: "Color Converters",
          fields: [
            { id: "colorAllFormats", label: "All Formats (JSON)" },
            { id: "hexToRgbConverter", label: "HEX → RGB" },
            { id: "hexToHslConverter", label: "HEX → HSL" },
            { id: "hexToCmykConverter", label: "HEX → CMYK" },
            { id: "rgbToHexConverter", label: "RGB → HEX" },
            { id: "rgbToHslConverter", label: "RGB → HSL" },
            { id: "hslToRgbConverter", label: "HSL → RGB" },
            { id: "hslToHexConverter", label: "HSL → HEX" }
          ]
        }
      ]
    },
    {
      title: "Banking & Finance",
      subTabs: [
        {
          title: "Bank Details",
          fields: [
            { id: "bankBranch", label: "Bank Branch (EN)" },
            { id: "bankBranchAr", label: "Bank Branch (AR)" },
            { id: "routingNumber", label: "Routing Number" },
            { id: "sortCode", label: "Sort Code" },
            { id: "bic", label: "BIC/SWIFT Code" },
          ]
        },
        {
          title: "Accounts & Products",
          fields: [
            { id: "accountType", label: "Account Type (EN)" },
            { id: "accountTypeAr", label: "Account Type (AR)" },
            { id: "loanNumber", label: "Loan Number" },
            { id: "creditScore", label: "Credit Score" },
            { id: "investmentAmount", label: "Investment Amount" },
          ]
        },
        {
          title: "Transactions & Rates",
          fields: [
            { id: "transactionId", label: "Transaction ID" },
            { id: "checkNumber", label: "Check Number" },
            { id: "interestRate", label: "Interest Rate" },
            { id: "exchangeRate", label: "Exchange Rate" },
          ]
        }
      ]
    },
    {
      title: "Insurance",
      subTabs: [
        {
          title: "Policy Details",
          fields: [
            { id: "policyNumber", label: "Policy Number" },
            { id: "policyType", label: "Policy Type (EN)" },
            { id: "policyTypeAr", label: "Policy Type (AR)" },
            { id: "policyStartDate", label: "Policy Start Date" },
            { id: "policyEndDate", label: "Policy End Date" },
          ]
        },
        {
          title: "Coverage & Costs",
          fields: [
            { id: "premiumAmount", label: "Premium Amount" },
            { id: "coverageAmount", label: "Coverage Amount" },
            { id: "deductible", label: "Deductible" },
          ]
        },
        {
          title: "People & Claims",
          fields: [
            { id: "insuranceCompany", label: "Insurance Company (EN)" },
            { id: "insuranceCompanyAr", label: "Insurance Company (AR)" },
            { id: "agentName", label: "Agent Name (EN)" },
            { id: "agentNameAr", label: "Agent Name (AR)" },
            { id: "claimNumber", label: "Claim Number" },
            { id: "beneficiary", label: "Beneficiary (EN)" },
            { id: "beneficiaryAr", label: "Beneficiary (AR)" },
          ]
        }
      ]
    },
    {
      title: "Manufacturing",
      subTabs: [
        {
          title: "Production Facility",
          fields: [
            { id: "factoryName", label: "Factory Name (EN)" },
            { id: "factoryNameAr", label: "Factory Name (AR)" },
            { id: "productionLine", label: "Production Line" },
            { id: "machineId", label: "Machine ID" },
            { id: "shiftNumber", label: "Shift Number" },
          ]
        },
        {
          title: "Production Data",
          fields: [
            { id: "batchNumber", label: "Batch Number" },
            { id: "lotNumber", label: "Lot Number" },
            { id: "manufacturingDate", label: "Manufacturing Date" },
            { id: "expiryDate", label: "Expiry Date" },
            { id: "productionQuantity", label: "Production Quantity" },
          ]
        },
        {
          title: "Quality & Materials",
          fields: [
            { id: "qualityGrade", label: "Quality Grade" },
            { id: "defectRate", label: "Defect Rate" },
            { id: "operatorName", label: "Operator Name (EN)" },
            { id: "operatorNameAr", label: "Operator Name (AR)" },
            { id: "rawMaterial", label: "Raw Material (EN)" },
            { id: "rawMaterialAr", label: "Raw Material (AR)" },
          ]
        }
      ]
    },
    {
      title: "Telecommunications",
      subTabs: [
        {
          title: "Service Provider",
          fields: [
            { id: "phoneProvider", label: "Phone Provider (EN)" },
            { id: "phoneProviderAr", label: "Phone Provider (AR)" },
            { id: "planType", label: "Plan Type (EN)" },
            { id: "planTypeAr", label: "Plan Type (AR)" },
            { id: "networkType", label: "Network Type" },
          ]
        },
        {
          title: "Usage & Allowances",
          fields: [
            { id: "dataAllowance", label: "Data Allowance" },
            { id: "callMinutes", label: "Call Minutes" },
            { id: "smsCount", label: "SMS Count" },
            { id: "roamingStatus", label: "Roaming Status (EN)" },
            { id: "roamingStatusAr", label: "Roaming Status (AR)" },
          ]
        },
        {
          title: "Device & Network",
          fields: [
            { id: "signalStrength", label: "Signal Strength" },
            { id: "towerLocation", label: "Tower Location (EN)" },
            { id: "towerLocationAr", label: "Tower Location (AR)" },
            { id: "imei", label: "IMEI Number" },
            { id: "simCard", label: "SIM Card Number" },
          ]
        }
      ]
    },
    {
      title: "Construction",
      subTabs: [
        {
          title: "Project Info",
          fields: [
            { id: "projectName", label: "Project Name (EN)" },
            { id: "projectNameAr", label: "Project Name (AR)" },
            { id: "projectBudget", label: "Project Budget" },
            { id: "completionDate", label: "Completion Date" },
            { id: "buildingPermit", label: "Building Permit" },
          ]
        },
        {
          title: "People & Companies",
          fields: [
            { id: "contractorName", label: "Contractor Name (EN)" },
            { id: "contractorNameAr", label: "Contractor Name (AR)" },
            { id: "projectManager", label: "Project Manager (EN)" },
            { id: "projectManagerAr", label: "Project Manager (AR)" },
          ]
        },
        {
          title: "Building Specs",
          fields: [
            { id: "floorArea", label: "Floor Area" },
            { id: "buildingHeight", label: "Building Height" },
            { id: "constructionType", label: "Construction Type (EN)" },
            { id: "constructionTypeAr", label: "Construction Type (AR)" },
            { id: "materialType", label: "Material Type (EN)" },
            { id: "materialTypeAr", label: "Material Type (AR)" },
            { id: "safetyRating", label: "Safety Rating" },
          ]
        }
      ]
    },
    {
      title: "Testing & QA",
      subTabs: [
        {
          title: "Test Cases",
          fields: [
            { id: "testCaseId", label: "Test Case ID" },
            { id: "testSuite", label: "Test Suite" },
            { id: "testScenario", label: "Test Scenario" },
            { id: "testStatus", label: "Test Status" },
            { id: "testType", label: "Test Type" },
          ]
        },
        {
          title: "Bug Tracking",
          fields: [
            { id: "bugId", label: "Bug ID" },
            { id: "severity", label: "Severity Level" },
            { id: "priority", label: "Priority Level" },
          ]
        },
        {
          title: "Test Environment",
          fields: [
            { id: "testEnvironment", label: "Test Environment" },
            { id: "browserVersion", label: "Browser Version" },
            { id: "operatingSystem", label: "Operating System" },
            { id: "testData", label: "Test Data Set" },
            { id: "testExecutor", label: "Test Executor" },
            { id: "executionTime", label: "Execution Time" },
          ]
        },
        {
          title: "Results",
          fields: [
            { id: "expectedResult", label: "Expected Result" },
            { id: "actualResult", label: "Actual Result" },
          ]
        }
      ]
    },
    {
      title: "Edge Cases",
      subTabs: [
        {
          title: "Null & Empty",
          fields: [
            { id: "nullValue", label: "Null Value" },
            { id: "emptyString", label: "Empty String" },
            { id: "whitespace", label: "Whitespace Only" },
            { id: "zeroValue", label: "Zero Value" },
          ]
        },
        {
          title: "Boundary Values",
          fields: [
            { id: "maxLength", label: "Maximum Length String" },
            { id: "minValue", label: "Minimum Value" },
            { id: "maxValue", label: "Maximum Value" },
            { id: "boundaryValue", label: "Boundary Value" },
            { id: "boundaryString", label: "Boundary String" },
            { id: "negativeNumber", label: "Negative Number" },
            { id: "floatingPoint", label: "Floating Point" },
          ]
        },
        {
          title: "Special Characters",
          fields: [
            { id: "specialChars", label: "Special Characters" },
            { id: "unicodeChars", label: "Unicode Characters" },
            { id: "longText", label: "Very Long Text" },
            { id: "invalidFormat", label: "Invalid Format" },
            { id: "invalidEmail", label: "Invalid Email" },
            { id: "invalidDate", label: "Invalid Date" },
          ]
        },
        {
          title: "Security Testing",
          fields: [
            { id: "sqlInjection", label: "SQL Injection Test" },
            { id: "xssPayload", label: "XSS Payload" },
          ]
        }
      ]
    },
    {
      title: "Performance Testing",
      subTabs: [
        {
          title: "Response Metrics",
          fields: [
            { id: "responseTime", label: "Response Time (ms)" },
            { id: "throughput", label: "Throughput (req/sec)" },
            { id: "loadTime", label: "Page Load Time (s)" },
            { id: "transactionRate", label: "Transaction Rate" },
          ]
        },
        {
          title: "System Resources",
          fields: [
            { id: "cpuUsage", label: "CPU Usage (%)" },
            { id: "memoryUsage", label: "Memory Usage (MB)" },
            { id: "diskUsage", label: "Disk Usage (GB)" },
            { id: "bandwidth", label: "Bandwidth Usage" },
          ]
        },
        {
          title: "Network & Connections",
          fields: [
            { id: "networkLatency", label: "Network Latency (ms)" },
            { id: "concurrentUsers", label: "Concurrent Users" },
            { id: "connectionPool", label: "Connection Pool Size" },
            { id: "dbConnections", label: "DB Connections" },
          ]
        },
        {
          title: "Quality Metrics",
          fields: [
            { id: "errorRate", label: "Error Rate (%)" },
            { id: "queueLength", label: "Queue Length" },
            { id: "cacheHitRatio", label: "Cache Hit Ratio (%)" },
          ]
        }
      ]
    },
    {
      title: "Security Testing",
      subTabs: [
        {
          title: "Vulnerabilities",
          fields: [
            { id: "vulnerabilityId", label: "Vulnerability ID" },
            { id: "securityLevel", label: "Security Level" },
            { id: "securityScan", label: "Security Scan Result" },
            { id: "penetrationTest", label: "Penetration Test" },
          ]
        },
        {
          title: "Authentication",
          fields: [
            { id: "authToken", label: "Auth Token" },
            { id: "sessionId", label: "Session ID" },
            { id: "csrfToken", label: "CSRF Token" },
            { id: "jwtToken", label: "JWT Token" },
            { id: "apiKey", label: "API Key" },
          ]
        },
        {
          title: "Encryption & Access",
          fields: [
            { id: "encryptionType", label: "Encryption Type" },
            { id: "encryptionMethod", label: "Encryption Method" },
            { id: "encryptionPayload", label: "Encryption Payload" },
            { id: "encryptionKey", label: "Encryption Key" },
            { id: "encryptedText", label: "Encrypted Text" },
            { id: "decryptedText", label: "Decrypted Text" },
            { id: "encryptionRoundTrip", label: "Encrypt/Decrypt Round Trip" },
            { id: "hashAlgorithm", label: "Hash Algorithm" },
            { id: "hashText", label: "Hash Text" },
            { id: "hashValue", label: "Hash Value" },
            { id: "hmacValue", label: "HMAC Value" },
            { id: "passwordHash", label: "Password Hash" },
            { id: "saltValue", label: "Salt Value" },
            { id: "keyExchangeProtocol", label: "Key Exchange Protocol" },
            { id: "digitalSignature", label: "Digital Signature" },
            { id: "ivValue", label: "IV Value" },
            { id: "nonceValue", label: "Nonce Value" },
            { id: "secureRandomBytes", label: "Secure Random Bytes" },
            { id: "certificateId", label: "Certificate ID" },
            { id: "permissionLevel", label: "Permission Level" },
            { id: "accessRole", label: "Access Role" },
          ]
        },
        {
          title: "TLS & PKI",
          fields: [
            { id: "tlsVersion", label: "TLS Version" },
            { id: "tlsCipherSuite", label: "TLS Cipher Suite" },
            { id: "certificateChainStatus", label: "Certificate Chain Status" },
            { id: "ocspStatus", label: "OCSP Status" },
            { id: "crlStatus", label: "CRL Status" },
            { id: "certificateExpiryWarning", label: "Certificate Expiry Warning" },
          ]
        },
        {
          title: "AuthN & AuthZ",
          fields: [
            { id: "oauthGrantType", label: "OAuth Grant Type" },
            { id: "oidcClaimSet", label: "OIDC Claim Set" },
            { id: "mfaResult", label: "MFA Result" },
            { id: "rbacDecision", label: "RBAC Decision" },
            { id: "abacDecision", label: "ABAC Decision" },
            { id: "refreshTokenRotation", label: "Refresh Token Rotation" },
          ]
        },
        {
          title: "API & Web Security",
          fields: [
            { id: "jwtValidationStatus", label: "JWT Validation Status" },
            { id: "apiRateLimitHeader", label: "API Rate Limit Header" },
            { id: "apiScopeMismatch", label: "API Scope Mismatch" },
            { id: "replayAttackIndicator", label: "Replay Attack Indicator" },
            { id: "cspPolicyStatus", label: "CSP Policy Status" },
            { id: "corsConfigStatus", label: "CORS Config Status" },
            { id: "cookieSecurityFlags", label: "Cookie Security Flags" },
            { id: "ssrfPayload", label: "SSRF Payload" },
            { id: "openRedirectPayload", label: "Open Redirect Payload" },
          ]
        },
        {
          title: "Secrets & Key Management",
          fields: [
            { id: "kmsKeyId", label: "KMS Key ID" },
            { id: "keyRotationStatus", label: "Key Rotation Status" },
            { id: "keyUsageAudit", label: "Key Usage Audit" },
            { id: "secretLeakPattern", label: "Secret Leak Pattern" },
          ]
        },
        {
          title: "Network & Detection",
          fields: [
            { id: "firewallDecision", label: "Firewall Decision" },
            { id: "idsAlert", label: "IDS Alert" },
            { id: "portScanResult", label: "Port Scan Result" },
            { id: "ipReputation", label: "IP Reputation" },
          ]
        },
        {
          title: "Data Protection",
          fields: [
            { id: "dataMaskingOutput", label: "Data Masking Output" },
            { id: "piiDetectionLabel", label: "PII Detection Label" },
            { id: "dlpEventType", label: "DLP Event Type" },
            { id: "dataResidencyTag", label: "Data Residency Tag" },
          ]
        },
        {
          title: "Vulnerability Management",
          fields: [
            { id: "cvssScore", label: "CVSS Score" },
            { id: "cvssVector", label: "CVSS Vector" },
            { id: "cweId", label: "CWE ID" },
            { id: "exploitabilityRating", label: "Exploitability Rating" },
            { id: "remediationSla", label: "Remediation SLA" },
          ]
        },
        {
          title: "Integrity & Signing",
          fields: [
            { id: "signatureVerification", label: "Signature Verification" },
            { id: "checksumValue", label: "Checksum Value" },
            { id: "tamperEvidence", label: "Tamper Evidence" },
          ]
        },
        {
          title: "SIEM & Incident Response",
          fields: [
            { id: "securityLogEvent", label: "Security Log Event" },
            { id: "mitreTechniqueId", label: "MITRE Technique ID" },
            { id: "incidentTriageStatus", label: "Incident Triage Status" },
            { id: "falsePositiveLikelihood", label: "False Positive Likelihood" },
          ]
        },
        {
          title: "Cloud & PQC",
          fields: [
            { id: "iamMisconfiguration", label: "IAM Misconfiguration" },
            { id: "storageExposure", label: "Storage Exposure" },
            { id: "securityGroupDrift", label: "Security Group Drift" },
            { id: "pqcAlgorithm", label: "PQC Algorithm" },
            { id: "hybridCryptoMode", label: "Hybrid Crypto Mode" },
          ]
        }
      ]
    },
    {
      title: "Email Testing",
      subTabs: [
        {
          title: "Valid Emails",
          fields: [
            { id: "validEmail", label: "Valid Email" },
            { id: "businessEmail", label: "Business Email" },
            { id: "personalEmail", label: "Personal Email" },
            { id: "customDomainEmail", label: "Custom Domain Email" },
          ]
        },
        {
          title: "Special Formats",
          fields: [
            { id: "subdomainEmail", label: "Subdomain Email" },
            { id: "internationalEmail", label: "International Email" },
            { id: "specialCharEmail", label: "Special Char Email" },
            { id: "numericEmail", label: "Numeric Email" },
            { id: "roleBasedEmail", label: "Role-based Email" },
          ]
        },
        {
          title: "Edge Cases",
          fields: [
            { id: "invalidEmail", label: "Invalid Email" },
            { id: "tempEmail", label: "Temporary Email" },
            { id: "disposableEmail", label: "Disposable Email" },
            { id: "longEmail", label: "Long Email" },
            { id: "shortEmail", label: "Short Email" },
          ]
        }
      ]
    },
    {
      title: "Password Testing",
      subTabs: [
        {
          title: "Standard Passwords",
          fields: [
            { id: "customPassword", label: "Custom Password" },
            { id: "strongPassword", label: "Strong Password" },
            { id: "complexPassword", label: "Complex Password" },
          ]
        },
        {
          title: "Character Types",
          fields: [
            { id: "numericPassword", label: "Numeric Only" },
            { id: "alphabeticPassword", label: "Alphabetic Only" },
            { id: "specialCharPassword", label: "Special Chars Only" },
            { id: "mixedPassword", label: "Mixed Characters" },
            { id: "arabicPassword", label: "Arabic Characters" },
          ]
        },
        {
          title: "Security Levels",
          fields: [
            { id: "weakPassword", label: "Weak Password" },
            { id: "commonPassword", label: "Common Password" },
          ]
        }
      ]
    },
    {
      title: "Phone Testing",
      subTabs: [
        {
          title: "Valid Numbers",
          fields: [
            { id: "customPhone", label: "Custom Phone" },
            { id: "mobileNumber", label: "Mobile (05X)" },
            { id: "landlineNumber", label: "Landline (01X)" },
            { id: "shortMobile", label: "Mobile (5X)" },
            { id: "shortLandline", label: "Landline (1X)" },
          ]
        },
        {
          title: "Formatted Numbers",
          fields: [
            { id: "internationalPhone", label: "International (+966)" },
            { id: "formattedPhone", label: "Formatted Phone" },
            { id: "unformattedPhone", label: "Unformatted Phone" },
          ]
        },
        {
          title: "Invalid Cases",
          fields: [
            { id: "invalidPhone", label: "Invalid Phone" },
            { id: "wrongLengthPhone", label: "Wrong Length" },
          ]
        }
      ]
    },
    {
      title: "Date & Time",
      subTabs: [
        {
          title: "Basic Dates",
          fields: [
            { id: "date", label: "Date" },
            { id: "time", label: "Time" },
            { id: "time12", label: "Time (12h)" },
            { id: "time12Ar", label: "Time (12h) AR" },
            { id: "time24", label: "Time (24h)" },
            { id: "datetime", label: "DateTime" },
            { id: "datetimeIso", label: "DateTime (ISO)" },
            { id: "datetimeRfc3339", label: "DateTime (RFC3339)" },
            { id: "datetimeUnix", label: "DateTime (Unix)" },
            { id: "datetimeLocal", label: "DateTime (Local)" },
            { id: "dateIso", label: "Date (ISO)" },
            { id: "timestamp", label: "Timestamp" },
          ]
        },
        {
          title: "Hijri Calendar",
          fields: [
            { id: "hijriDate", label: "Hijri Date" },
            { id: "hijriToGregorian", label: "Hijri → Gregorian" },
            { id: "gregorianToHijri", label: "Gregorian → Hijri" },
          ]
        },
        {
          title: "Localized",
          fields: [
            { id: "dayOfWeek", label: "Day of Week (EN)" },
            { id: "dayOfWeekAr", label: "Day of Week (AR)" },
            { id: "month", label: "Month (EN)" },
            { id: "monthAr", label: "Month (AR)" },
            { id: "timeZone", label: "Time Zone" },
            { id: "utcOffset", label: "UTC Offset" },
          ]
        }
      ]
    },
    {
      title: "Other",
      subTabs: [
        {
          title: "UUIDs & GUIDs",
          fields: [
            { id: "uuid", label: "UUID v4" },
            { id: "uuidv1", label: "UUID v1 (Timestamp)" },
            { id: "uuidv3", label: "UUID v3 (MD5)" },
            { id: "uuidv5", label: "UUID v5 (SHA-1)" },
            { id: "guid", label: "GUID (Microsoft)" },
            { id: "shortUuid", label: "Short UUID" },
            { id: "uuidNoDashes", label: "UUID (No Dashes)" },
          ]
        },
        {
          title: "Database IDs",
          fields: [
            { id: "mongoObjectId", label: "MongoDB ObjectId" },
            { id: "snowflakeId", label: "Snowflake ID" },
            { id: "ulid", label: "ULID" },
            { id: "ksuid", label: "KSUID" },
            { id: "cuid", label: "CUID" },
            { id: "nanoid", label: "Nano ID" },
            { id: "xid", label: "XID" },
          ]
        },
        {
          title: "Custom IDs",
          fields: [
            { id: "alphanumericId", label: "Alphanumeric ID" },
            { id: "numericId", label: "Numeric ID" },
            { id: "hexId", label: "Hex ID" },
            { id: "base64Id", label: "Base64 ID" },
            { id: "prefixedId", label: "Prefixed ID" },
            { id: "timestampId", label: "Timestamp ID" },
          ]
        },
        {
          title: "Additional Generators",
          fields: [
            { id: "ai", label: "AI" },
            { id: "airdropAmount", label: "Airdrop Amount" },
            { id: "alertType", label: "Alert Type" },
            { id: "alertTypeAr", label: "Alert Type (AR)" },
            { id: "avatarDiceBear", label: "Avatar Dice Bear" },
            { id: "avatarPravatar", label: "Avatar Pravatar" },
            { id: "avatarRobohash", label: "Avatar Robohash" },
            { id: "avatarUrl", label: "Avatar URL" },
            { id: "barcode", label: "Barcode" },
            { id: "biometricId", label: "Biometric ID" },
            { id: "birthPlace", label: "Birth Place" },
            { id: "birthPlaceAr", label: "Birth Place (AR)" },
            { id: "blockchainNetwork", label: "Blockchain Network" },
            { id: "boolean", label: "Boolean" },
            { id: "building", label: "Building" },
            { id: "cfg", label: "CFG" },
            { id: "chartBarUrl", label: "Chart Bar URL" },
            { id: "chartPieUrl", label: "Chart Pie URL" },
            { id: "chartUrl", label: "Chart URL" },
            { id: "cloudStorageUrl", label: "Cloud Storage URL" },
            { id: "colorDepth", label: "Color Depth" },
            { id: "communicationProtocol", label: "Communication Protocol" },
            { id: "companyId", label: "Company ID" },
            { id: "compressionRatio", label: "Compression Ratio" },
            { id: "conf", label: "Conf" },
            { id: "consensusMechanism", label: "Consensus Mechanism" },
            { id: "coordinates", label: "Coordinates" },
            { id: "costSavings", label: "Cost Savings" },
            { id: "countryCode", label: "Country Code" },
            { id: "countryFlag", label: "Country Flag" },
            { id: "createdDate", label: "Created Date" },
            { id: "cryptoNews", label: "Crypto News" },
            { id: "dateFuture", label: "Date Future" },
            { id: "dateGregorian", label: "Date Gregorian" },
            { id: "dateGregorianAr", label: "Date Gregorian (AR)" },
            { id: "dateHijri", label: "Date Hijri" },
            { id: "dateHijriAr", label: "Date Hijri (AR)" },
            { id: "datePast", label: "Date Past" },
            { id: "datePresent", label: "Date Present" },
            { id: "datetimeAr", label: "Datetime (AR)" },
            { id: "db", label: "DB" },
            { id: "deviceStatus", label: "Device Status" },
            { id: "deviceStatusAr", label: "Device Status (AR)" },
            { id: "distance", label: "Distance" },
            { id: "documentApprover", label: "Document Approver" },
            { id: "documentApproverAr", label: "Document Approver (AR)" },
            { id: "documentAuthor", label: "Document Author" },
            { id: "documentAuthorAr", label: "Document Author (AR)" },
            { id: "documentCategory", label: "Document Category" },
            { id: "documentChecksum", label: "Document Checksum" },
            { id: "documentFileName", label: "Document File Name" },
            { id: "documentFileNameAr", label: "Document File Name (AR)" },
            { id: "documentFormat", label: "Document Format" },
            { id: "documentLanguage", label: "Document Language" },
            { id: "documentNumber", label: "Document Number" },
            { id: "documentOrientation", label: "Document Orientation" },
            { id: "documentPath", label: "Document Path" },
            { id: "documentPathAr", label: "Document Path (AR)" },
            { id: "documentPriority", label: "Document Priority" },
            { id: "documentPriorityAr", label: "Document Priority (AR)" },
            { id: "documentSecurity", label: "Document Security" },
            { id: "documentSecurityAr", label: "Document Security (AR)" },
            { id: "documentSignature", label: "Document Signature" },
            { id: "documentStatus", label: "Document Status" },
            { id: "documentStatusAr", label: "Document Status (AR)" },
            { id: "documentTemplate", label: "Document Template" },
            { id: "documentTitle", label: "Document Title" },
            { id: "documentTitleAr", label: "Document Title (AR)" },
            { id: "documentType", label: "Document Type" },
            { id: "documentTypeAr", label: "Document Type (AR)" },
            { id: "documentVersion", label: "Document Version" },
            { id: "door", label: "Door" },
            { id: "downloadUrl", label: "Download URL" },
            { id: "education", label: "Education" },
            { id: "educationAr", label: "Education (AR)" },
            { id: "emergencyContactName", label: "Emergency Contact Name" },
            { id: "emergencyContactNameAr", label: "Emergency Contact Name (AR)" },
            { id: "emergencyContactPhone", label: "Emergency Contact Phone" },
            { id: "energyUsage", label: "Energy Usage" },
            { id: "eps", label: "Eps" },
            { id: "exp", label: "Exp" },
            { id: "experience", label: "Experience" },
            { id: "experienceAr", label: "Experience (AR)" },
            { id: "eyeColor", label: "Eye Color" },
            { id: "eyeColorAr", label: "Eye Color (AR)" },
            { id: "favoriteColor", label: "Favorite Color" },
            { id: "favoriteColorAr", label: "Favorite Color (AR)" },
            { id: "favoriteFood", label: "Favorite Food" },
            { id: "favoriteFoodAr", label: "Favorite Food (AR)" },
            { id: "favoriteMusic", label: "Favorite Music" },
            { id: "favoriteMusicAr", label: "Favorite Music (AR)" },
            { id: "fig", label: "Fig" },
            { id: "fineAmount", label: "Fine Amount" },
            { id: "flac", label: "Flac" },
            { id: "floor", label: "Floor" },
            { id: "fuelStation", label: "Fuel Station" },
            { id: "fullNameWithMiddle", label: "Full Name With Middle" },
            { id: "fullNameWithMiddleAr", label: "Full Name With Middle (AR)" },
            { id: "gameGenre", label: "Game Genre" },
            { id: "garageLocation", label: "Garage Location" },
            { id: "gasLimit", label: "Gas Limit" },
            { id: "gasPrice", label: "Gas Price" },
            { id: "gravatar", label: "Gravatar" },
            { id: "hairColor", label: "Hair Color" },
            { id: "hairColorAr", label: "Hair Color (AR)" },
            { id: "hashRate", label: "Hash Rate" },
            { id: "height", label: "Height" },
            { id: "hobbiesList", label: "Hobbies List" },
            { id: "hobbiesListAr", label: "Hobbies List (AR)" },
            { id: "hobby", label: "Hobby" },
            { id: "hobbyAr", label: "Hobby (AR)" },
            { id: "iat", label: "Iat" },
            { id: "iconUrl", label: "Icon URL" },
            { id: "imageAspectRatio", label: "Image Aspect Ratio" },
            { id: "imageDimensions", label: "Image Dimensions" },
            { id: "imageHeight", label: "Image Height" },
            { id: "imageUrl", label: "Image URL" },
            { id: "imageWidth", label: "Image Width" },
            { id: "includeArabicLetters", label: "Include Arabic Letters" },
            { id: "includeLowercase", label: "Include Lowercase" },
            { id: "includeNumbers", label: "Include Numbers" },
            { id: "includeSpecialChars", label: "Include Special Chars" },
            { id: "includeUppercase", label: "Include Uppercase" },
            { id: "ini", label: "INI" },
            { id: "invoice", label: "Invoice" },
            { id: "landline", label: "Landline" },
            { id: "language", label: "Language" },
            { id: "languageAr", label: "Language (AR)" },
            { id: "languagesList", label: "Languages List" },
            { id: "latitude", label: "Latitude" },
            { id: "level", label: "Level" },
            { id: "lifestyleChoice", label: "Lifestyle Choice" },
            { id: "lifestyleChoiceAr", label: "Lifestyle Choice (AR)" },
            { id: "lockupPeriod", label: "Lockup Period" },
            { id: "log", label: "Log" },
            { id: "longitude", label: "Longitude" },
            { id: "loremPicsumBlurred", label: "Lorem Picsum Blurred" },
            { id: "loremPicsumGrayscale", label: "Lorem Picsum Grayscale" },
            { id: "loremPicsumImage", label: "Lorem Picsum Image" },
            { id: "loremPicsumImageWithId", label: "Lorem Picsum Image With ID" },
            { id: "madaCard", label: "Mada Card" },
            { id: "masterCard", label: "Master Card" },
            { id: "mediaFormat", label: "Media Format" },
            { id: "medicalAllergy", label: "Medical Allergy" },
            { id: "medicalAllergyAr", label: "Medical Allergy (AR)" },
            { id: "medicalCondition", label: "Medical Condition" },
            { id: "medicalConditionAr", label: "Medical Condition (AR)" },
            { id: "metadata", label: "Metadata" },
            { id: "middleName", label: "Middle Name" },
            { id: "middleNameAr", label: "Middle Name (AR)" },
            { id: "miningDifficulty", label: "Mining Difficulty" },
            { id: "mkv", label: "Mkv" },
            { id: "modifiedDate", label: "Modified Date" },
            { id: "motherTongue", label: "Mother Tongue" },
            { id: "motherTongueAr", label: "Mother Tongue (AR)" },
            { id: "motion", label: "Motion" },
            { id: "mov", label: "Mov" },
            { id: "name", label: "Name" },
            { id: "number", label: "Number" },
            { id: "pageCount", label: "Page Count" },
            { id: "parkingType", label: "Parking Type" },
            { id: "parkingTypeAr", label: "Parking Type (AR)" },
            { id: "personalityScore", label: "Personality Score" },
            { id: "personalityTrait", label: "Personality Trait" },
            { id: "personalityTraitAr", label: "Personality Trait (AR)" },
            { id: "phone", label: "Phone" },
            { id: "placeholderImage", label: "Placeholder Image" },
            { id: "placeholderImageColored", label: "Placeholder Image Colored" },
            { id: "placeholderImageWithText", label: "Placeholder Image With Text" },
            { id: "ppt", label: "Ppt" },
            { id: "pptx", label: "Pptx" },
            { id: "productCode", label: "Product Code" },
            { id: "psd", label: "Psd" },
            { id: "qrCodeColored", label: "Qr Code Colored" },
            { id: "qrCodeUrl", label: "Qr Code URL" },
            { id: "referenceNumber", label: "Reference Number" },
            { id: "resolution", label: "Resolution" },
            { id: "room", label: "Room" },
            { id: "saudiAddress", label: "Saudi Address" },
            { id: "saudiAddressAr", label: "Saudi Address (AR)" },
            { id: "score", label: "Score" },
            { id: "serialNumber", label: "Serial Number" },
            { id: "sketch", label: "Sketch" },
            { id: "skill", label: "Skill" },
            { id: "skillAr", label: "Skill (AR)" },
            { id: "skillsList", label: "Skills List" },
            { id: "smartHomeHub", label: "Smart Home Hub" },
            { id: "socialSecurityNumber", label: "Social Security Number" },
            { id: "speed", label: "Speed" },
            { id: "stockSymbol", label: "Stock Symbol" },
            { id: "streetName", label: "Street Name" },
            { id: "streetNameAr", label: "Street Name (AR)" },
            { id: "streetNumber", label: "Street Number" },
            { id: "taxId", label: "Tax ID" },
            { id: "thumbnailUrl", label: "Thumbnail URL" },
            { id: "timezone", label: "Timezone" },
            { id: "trafficViolation", label: "Traffic Violation" },
            { id: "trafficViolationAr", label: "Traffic Violation (AR)" },
            { id: "transactionFee", label: "Transaction Fee" },
            { id: "transactionFeeSAR", label: "Transaction Fee SAR" },
            { id: "uiAvatar", label: "Ui Avatar" },
            { id: "uiAvatarRounded", label: "Ui Avatar Rounded" },
            { id: "unsplashDailyImage", label: "Unsplash Daily Image" },
            { id: "unsplashFeaturedImage", label: "Unsplash Featured Image" },
            { id: "unsplashImage", label: "Unsplash Image" },
            { id: "vatNumber", label: "Vat Number" },
            { id: "vestingPeriod", label: "Vesting Period" },
            { id: "visaCard", label: "Visa Card" },
            { id: "visaNumber", label: "Visa Number" },
            { id: "water", label: "Water" },
            { id: "weight", label: "Weight" },
            { id: "wmv", label: "Wmv" },
            { id: "wordCount", label: "Word Count" },

          ]
        },
        {
          title: "Network & Web",
          fields: [
            { id: "url", label: "URL" },
            { id: "urlPath", label: "URL Path" },
            { id: "queryString", label: "Query String" },
            { id: "slug", label: "Slug" },
            { id: "ip", label: "IP Address" },
            { id: "ipv6", label: "IPv6 Address" },
            { id: "cidr", label: "CIDR" },
            { id: "macAddress", label: "MAC Address" },
            { id: "userAgent", label: "User Agent" },
            { id: "userAgentMobile", label: "User Agent (Mobile)" },
            { id: "userAgentDesktop", label: "User Agent (Desktop)" },
            { id: "sessionId", label: "Session ID" },
            { id: "apiKey", label: "API Key" },
            { id: "domain", label: "Domain" },
            { id: "domainTld", label: "Domain TLD" },
            { id: "subdomain", label: "Subdomain" },
            { id: "port", label: "Port" },
            { id: "portRange", label: "Port Range" },
            { id: "protocol", label: "Protocol" },
            { id: "httpStatus", label: "HTTP Status" },
          ]
        },
        {
          title: "Security & Misc",
          fields: [
            { id: "password", label: "Password" },
            { id: "color", label: "Color" },
            { id: "jwt", label: "JWT Token" },
            { id: "hash", label: "Hash (SHA-256)" },
            { id: "randomSeed", label: "Random Seed" },
          ]
        }
      ]
    },
    {
      title: "Files",
      subTabs: [
        {
          title: "File Info",
          fields: [
            { id: "fileName", label: "File Name" },
            { id: "fileNameAr", label: "File Name (AR)" },
            { id: "fileExtension", label: "File Extension" },
            { id: "fileType", label: "File Type" },
            { id: "mimeType", label: "MIME Type" },
            { id: "fileSize", label: "File Size" },
            { id: "fileSizeBytes", label: "File Size (Bytes)" },
            { id: "fileSizeHuman", label: "File Size (Human)" },
          ]
        },
        {
          title: "Documents",
          fields: [
            { id: "txt", label: "Text File (.txt)" },
            { id: "pdf", label: "PDF File (.pdf)" },
            { id: "doc", label: "Word File (.doc)" },
            { id: "docx", label: "Word File (.docx)" },
            { id: "rtf", label: "Rich Text (.rtf)" },
            { id: "md", label: "Markdown (.md)" },
          ]
        },
        {
          title: "Spreadsheets & Data",
          fields: [
            { id: "xlsx", label: "Excel File (.xlsx)" },
            { id: "xls", label: "Excel File (.xls)" },
            { id: "csv", label: "CSV File (.csv)" },
            { id: "json", label: "JSON File (.json)" },
            { id: "xml", label: "XML File (.xml)" },
            { id: "yaml", label: "YAML File (.yaml)" },
            { id: "yml", label: "YAML File (.yml)" },
            { id: "toml", label: "TOML File (.toml)" },
          ]
        },
        {
          title: "Code & Scripts",
          fields: [
            { id: "html", label: "HTML File (.html)" },
            { id: "css", label: "CSS File (.css)" },
            { id: "js", label: "JavaScript (.js)" },
            { id: "py", label: "Python File (.py)" },
            { id: "java", label: "Java File (.java)" },
            { id: "cpp", label: "C++ File (.cpp)" },
            { id: "sql", label: "SQL File (.sql)" },
          ]
        },
        {
          title: "Images",
          fields: [
            { id: "jpg", label: "JPEG Image (.jpg)" },
            { id: "png", label: "PNG Image (.png)" },
            { id: "gif", label: "GIF Image (.gif)" },
            { id: "svg", label: "SVG Image (.svg)" },
            { id: "bmp", label: "BMP Image (.bmp)" },
            { id: "webp", label: "WebP Image (.webp)" },
            { id: "ico", label: "Icon File (.ico)" },
          ]
        },
        {
          title: "Archives & Media",
          fields: [
            { id: "zip", label: "ZIP Archive (.zip)" },
            { id: "rar", label: "RAR Archive (.rar)" },
            { id: "7z", label: "7-Zip Archive (.7z)" },
            { id: "tar", label: "TAR Archive (.tar)" },
            { id: "mp3", label: "MP3 Audio (.mp3)" },
            { id: "wav", label: "WAV Audio (.wav)" },
            { id: "mp4", label: "MP4 Video (.mp4)" },
            { id: "avi", label: "AVI Video (.avi)" },
          ]
        }
      ]
    },
    {
      title: "Currencies",
      subTabs: [
        {
          title: "Currency Info",
          fields: [
            { id: "currencyCode", label: "Currency Code" },
            { id: "currencyName", label: "Currency Name" },
            { id: "currencyAmount", label: "Currency Amount" },
            { id: "exchangeRate", label: "Exchange Rate" },
            { id: "currencyConversion", label: "Currency Conversion" }
          ]
        },
        {
          title: "Pricing",
          fields: [
            { id: "priceRange", label: "Price Range" },
            { id: "discount", label: "Discount" },
            { id: "tax", label: "Tax Calculation" }
          ]
        },
        {
          title: "Cryptocurrency",
          fields: [
            { id: "cryptoCurrency", label: "Crypto Currency" },
            { id: "cryptoCode", label: "Crypto Code" },
            { id: "cryptoPrice", label: "Crypto Price" },
            { id: "cryptoWallet", label: "Crypto Wallet" }
          ]
        }
      ]
    },
    {
      title: "Sizes",
      subTabs: [
        {
          title: "Clothing",
          fields: [
            { id: "clothingSize", label: "Clothing Size" },
            { id: "clothingSizeNumeric", label: "Clothing Size (Numeric)" },
            { id: "clothingSizeEU", label: "Clothing Size (EU)" },
            { id: "clothingSizeConversion", label: "Clothing Size Conversion" }
          ]
        },
        {
          title: "Footwear",
          fields: [
            { id: "shoeSize", label: "Shoe Size (US)" },
            { id: "shoeSizeEU", label: "Shoe Size (EU)" },
            { id: "shoeSizeUK", label: "Shoe Size (UK)" },
            { id: "shoeSizeConversion", label: "Shoe Size Conversion" }
          ]
        },
        {
          title: "Accessories",
          fields: [
            { id: "hatSize", label: "Hat Size" },
            { id: "hatSizeNumeric", label: "Hat Size (Numeric)" },
            { id: "ringSize", label: "Ring Size" }
          ]
        },
        {
          title: "Measurements",
          fields: [
            { id: "height", label: "Height" },
            { id: "weight", label: "Weight" },
            { id: "chest", label: "Chest" },
            { id: "waist", label: "Waist" },
            { id: "inseam", label: "Inseam" }
          ]
        },
        {
          title: "Display & Paper",
          fields: [
            { id: "screenSize", label: "Screen Size" },
            { id: "screenResolution", label: "Screen Resolution" },
            { id: "paperSize", label: "Paper Size" },
            { id: "paperSizeDimensions", label: "Paper Size Dimensions" }
          ]
        }
      ]
    },
  ];

  // Tab icons mapping
  const tabIcons = {
    'Personal': '👤',
    'Contact': '📧',
    'Saudi Government': '🏛️',
    'Work': '💼',
    'Business': '💼',
    'Finance': '💳',
    'Healthcare': '🏥',
    'Government': '🏛️',
    'E-commerce': '🛒',
    'Social Media': '📱',
    'Technology': '💻',
    'Testing & QA': '🧪',
    'Travel': '✈️',
    'Education': '🎓',
    'Real Estate': '🏠',
    'Entertainment': '🎬',
    'Media & Streaming': '📺',
    'Emojis': '😊',
    'Sports': '⚽',
    'Sports & Fitness': '⚽',
    'Food': '🍽️',
    'Food & Restaurant': '🍽️',
    'Agriculture': '🌾',
    'Manufacturing': '🏭',
    'Construction': '🏗️',
    'Telecom': '📱',
    'Telecommunications': '📱',
    'Insurance': '🛡️',
    'Banking': '🏦',
    'Banking & Finance': '🏦',
    'Energy': '⚡',
    'Energy & Utilities': '⚡',
    'Logistics': '📦',
    'Logistics & Shipping': '📦',
    'Fashion': '👗',
    'Fashion & Beauty': '👗',
    'Legal': '⚖️',
    'Legal & Law': '⚖️',
    'Science': '🔬',
    'Science & Research': '🔬',
    'Documents': '📄',
    'Files': '📁',
    'Images': '🖼️',
    'Vehicle': '🚗',
    'Date & Time': '📅',
    'Random Text': '📝',
    'Random Values': '🎲',
    'UUIDs': '🔑',
    'IDs & Keys': '🔑',
    'Passwords': '🔒',
    'Phone Testing': '☎️',
    'Email Testing': '✉️',
    'Edge Cases': '⚠️',
    'Performance': '⚡',
    'Performance Testing': '⚡',
    'Security': '🔐',
    'Security Testing': '🔐',
    'Vehicles': '🚗',
    'Saudi Services': '🇸🇦',
    'Media': '📺',
    'Automotive': '🚙',
    'Weather': '🌤️',
    'Weather & Environment': '🌤️',
    'Crypto': '₿',
    'IoT': '🔌',
    'IoT & Smart Home': '🔌',
    'Colors': '🎨',
    'Currencies': '💰',
    'Sizes': '📏',
    'Other': '📋'
  };

  // Reorder categories by usage priority
  const categoryOrder = [
    'Personal', 'Contact', 'Work', 'Finance', 'Saudi Services',
    'Date & Time', 'Random Values', 'Random Text', 'UUIDs', 'Passwords',
    'Phone Testing', 'Email Testing', 'Colors', 'Files', 'Images',
    'Testing & QA', 'Edge Cases', 'Performance', 'Security',
    'Technology', 'E-commerce', 'Healthcare', 'Government',
    'Education', 'Travel', 'Real Estate', 'Vehicles', 'Automotive',
    'Banking', 'Insurance', 'Telecom', 'Energy', 'Logistics',
    'Food', 'Entertainment', 'Media', 'Sports', 'Fashion',
    'Construction', 'Manufacturing', 'Agriculture', 'Legal', 'Science',
    'Documents', 'Weather', 'Crypto', 'IoT', 'Other'
  ];

  const sortedCategories = [...categories].sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.title);
    const indexB = categoryOrder.indexOf(b.title);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const tabsHTML = sortedCategories
    .map(
      (cat, idx) => {
        const icon = tabIcons[cat.title] || '📋';
        return `<button class="dg-tab ${idx === 0 ? "active" : ""}" data-tab="${idx}"><span style="font-size: 18px;">${icon}</span><span>${cat.title}</span></button>`;
      }
    )
    .join("");
  const contentHTML = sortedCategories
    .map(
      (cat, idx) => {
        // Check if category has sub-tabs
        if (cat.subTabs) {
          // Flatten all fields from sub-tabs into sections
          let allFieldsHTML = cat.subTabs
            .map((subTab, subIdx) => {
              const sectionFields =
                cat.title === "Date & Time" && subTab.title === "Basic Dates"
                  ? subTab.fields.filter(
                      (field) => field.id !== "date" && field.id !== "time",
                    )
                  : subTab.fields;
              return `
              <div class="dg-field-section">
                <div class="dg-section-title" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                  <input type="checkbox" class="dg-section-checkbox" data-section="${idx}-${subIdx}" style="cursor: pointer;">
                  <span>${subTab.title}</span>
                </div>
                <div class="dg-fields-wrapper" data-section-fields="${idx}-${subIdx}">
                  ${sectionFields.map((field) => `<label class="dg-checkbox"><input type="checkbox" value="${field.id}"><span>${field.label}</span></label>`).join("")}
                </div>
              </div>
            `;
            })
            .join("");

          if (cat.title === "Date & Time") {
            allFieldsHTML += `
              <div class="dg-field-section">
                <div class="dg-section-title" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                  <input type="checkbox" class="dg-section-checkbox" data-section="${idx}-conditional-datetime" style="cursor: pointer;">
                  <span>Condirional Date and Time</span>
                </div>
                <div class="dg-fields-wrapper" data-section-fields="${idx}-conditional-datetime">
                  <label class="dg-checkbox"><input type="checkbox" value="date"><span>Date</span></label>
                  <label class="dg-checkbox"><input type="checkbox" value="time"><span>Time</span></label>
                </div>
              </div>
            `;
          }

          return `
            <div class="dg-tab-content ${idx === 0 ? "active" : ""}" data-content="${idx}">
              ${
                cat.title === "Colors"
                  ? `
                <div class="dg-file-controls active" id="colorControls">
                  <div class="dg-file-controls-header">
                    <div class="dg-file-controls-title">Color Testing Controls</div>
                    <div class="dg-file-controls-hint">Convert and inspect color formats</div>
                  </div>
                  <div class="dg-file-controls-sections">
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Input</div>
                      <div class="dg-file-control-group">
                        <label>Input Color:</label>
                        <input type="text" id="colorInput" placeholder="#FF5733 or rgb(255,87,51)" value="#FF5733">
                      </div>
                    </div>
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Output</div>
                      <div class="dg-file-control-group">
                        <label>Convert To:</label>
                        <select id="colorOutputType">
                          <option value="all">All Formats</option>
                          <option value="hex">HEX</option>
                          <option value="rgb">RGB</option>
                          <option value="rgba">RGBA</option>
                          <option value="hsl">HSL</option>
                          <option value="hsla">HSLA</option>
                          <option value="hsv">HSV</option>
                          <option value="cmyk">CMYK</option>
                        </select>
                      </div>
                      <div class="dg-file-control-group">
                        <button id="convertColorBtn" class="dg-btn dg-btn-primary">🎨 Convert Color</button>
                      </div>
                    </div>
                  </div>
                  <div id="colorConversionResult"></div>
                </div>
              `
                  : ""
              }
              ${
                cat.title === "Files"
                  ? `
                <div class="dg-file-controls active" id="fileControls">
                  <div class="dg-file-controls-header">
                    <div class="dg-file-controls-title">File Generation Settings</div>
                    <div class="dg-file-controls-hint">Applied to selected file types</div>
                  </div>
                  <div class="dg-file-controls-sections">
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">File Identity</div>
                      <div class="dg-file-control-group">
                        <label>File Name:</label>
                        <input type="text" id="fileName" placeholder="test-file" value="test-file">
                      </div>
                    </div>
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">File Size</div>
                      <div class="dg-file-control-group">
                        <label>Target Size:</label>
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
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Image Settings</div>
                      <div class="dg-file-control-group">
                        <label>Dimensions (images only):</label>
                        <div class="dg-file-size-group">
                          <input type="number" class="dg-dimension-input" id="imageWidth" placeholder="Width" value="800" min="1">
                          <span class="dg-multiply">×</span>
                          <input type="number" class="dg-dimension-input" id="imageHeight" placeholder="Height" value="600" min="1">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `
                  : ""
              }
              ${
                cat.title === "Date & Time"
                  ? `
                <div class="dg-file-controls active" id="dateTimeControls">
                  <div class="dg-file-controls-header">
                    <div class="dg-file-controls-title">Date & Time Settings</div>
                    <div class="dg-file-controls-hint">Formatting and conversion options</div>
                  </div>
                  <div class="dg-date-tools-tabs">
                    <button type="button" class="dg-date-tools-tab active" data-date-tools-tab="basic">Generator</button>
                    <button type="button" class="dg-date-tools-tab" data-date-tools-tab="convert">Converter</button>
                  </div>
                  <div class="dg-date-tools-panel active" data-date-tools-panel="basic">
                    <div class="dg-file-controls-sections">
                      <div class="dg-file-control-section">
                        <div class="dg-file-control-section-title">Range</div>
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
                      </div>
                      <div class="dg-file-control-section">
                        <div class="dg-file-control-section-title">Format</div>
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
                      <div class="dg-file-control-section">
                        <div class="dg-file-control-section-title">Generated Fields</div>
                        <div class="dg-file-control-group">
                          <label>Date Conversion:</label>
                          <div class="dg-checkbox-inline-group">
                            <label class="dg-checkbox-inline">
                              <input type="checkbox" id="includeHijri"> Include Hijri
                            </label>
                            <label class="dg-checkbox-inline">
                              <input type="checkbox" id="includeGregorian" checked> Include Gregorian
                            </label>
                            <label class="dg-checkbox-inline">
                              <input type="checkbox" id="showBothDates"> Show Both
                            </label>
                          </div>
                          <div class="dg-user-note">Note: these options affect generated <code>date</code> and <code>time</code> fields only when those fields are selected in this tab.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="dg-date-tools-panel" data-date-tools-panel="convert">
                    <div class="dg-file-controls-sections">
                      <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Convert Tools</div>
                      <input type="hidden" id="gregorianMonthMode" value="english">
                      <input type="hidden" id="hijriMonthMode" value="arabic">
                      <div class="dg-file-control-group">
                        <label>Gregorian Month Input:</label>
                        <div class="dg-mode-toggle" data-mode-toggle="gregorian">
                          <button type="button" class="dg-mode-btn active" data-mode-value="english">English</button>
                          <button type="button" class="dg-mode-btn" data-mode-value="arabic">Arabic</button>
                          <button type="button" class="dg-mode-btn" data-mode-value="numbers">Numbers</button>
                        </div>
                      </div>
                      <div class="dg-file-control-group">
                        <label>Convert Specific Gregorian Date:</label>
                        <div class="dg-inline-pair">
                          <input type="number" class="dg-compact-input" id="specificGregorianDay" placeholder="Day" min="1" max="31">
                          <div class="dg-month-select-wrap">
                            <select id="specificGregorianMonthEnglish" class="dg-month-input active">
                              <option value="1">January</option>
                              <option value="2">February</option>
                              <option value="3">March</option>
                              <option value="4">April</option>
                              <option value="5">May</option>
                              <option value="6">June</option>
                              <option value="7">July</option>
                              <option value="8">August</option>
                              <option value="9">September</option>
                              <option value="10">October</option>
                              <option value="11">November</option>
                              <option value="12">December</option>
                            </select>
                            <select id="specificGregorianMonthArabic" class="dg-month-input">
                              <option value="1">يناير</option>
                              <option value="2">فبراير</option>
                              <option value="3">مارس</option>
                              <option value="4">أبريل</option>
                              <option value="5">مايو</option>
                              <option value="6">يونيو</option>
                              <option value="7">يوليو</option>
                              <option value="8">أغسطس</option>
                              <option value="9">سبتمبر</option>
                              <option value="10">أكتوبر</option>
                              <option value="11">نوفمبر</option>
                              <option value="12">ديسمبر</option>
                            </select>
                            <select id="specificGregorianMonthNumbers" class="dg-month-input">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                            </select>
                          </div>
                          <input type="number" class="dg-compact-input" id="specificGregorianYear" placeholder="Year" min="1900" max="2100">
                        </div>
                        <div class="dg-convert-actions">
                          <button type="button" id="convertToHijri" class="dg-mini-btn">To Hijri</button>
                        </div>
                      </div>
                      <div class="dg-file-control-group">
                        <label>Hijri Month Input:</label>
                        <div class="dg-mode-toggle" data-mode-toggle="hijri">
                          <button type="button" class="dg-mode-btn active" data-mode-value="arabic">Arabic</button>
                          <button type="button" class="dg-mode-btn" data-mode-value="english">English</button>
                          <button type="button" class="dg-mode-btn" data-mode-value="numbers">Numbers</button>
                        </div>
                      </div>
                      <div class="dg-file-control-group">
                        <label>Hijri Output Format:</label>
                        <div class="dg-inline-pair">
                          <select id="hijriOutputMode">
                            <option value="arabic">Arabic Text</option>
                            <option value="english">English Text</option>
                            <option value="numbers">Numbers Only</option>
                          </select>
                          <select id="hijriOutputFormat">
                            <option value="text">Text (Day Month Year)</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          </select>
                        </div>
                      </div>
                      <div class="dg-file-control-group">
                        <label>Gregorian Output Format:</label>
                        <div class="dg-inline-pair">
                          <select id="gregorianOutputMode">
                            <option value="english">English Text</option>
                            <option value="arabic">Arabic Text</option>
                            <option value="numbers">Numbers Only</option>
                          </select>
                          <select id="gregorianOutputFormat">
                            <option value="text">Text (Day Month Year)</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                          </select>
                        </div>
                      </div>
                      <div class="dg-file-control-group">
                        <label>Convert Hijri Date:</label>
                        <div class="dg-inline-pair">
                          <input type="number" class="dg-compact-input" id="hijriDay" placeholder="Day" min="1" max="30">
                          <div class="dg-month-select-wrap">
                            <select id="hijriMonthArabic" class="dg-month-input active">
                              <option value="1">محرم</option>
                              <option value="2">صفر</option>
                              <option value="3">ربيع الأول</option>
                              <option value="4">ربيع الثاني</option>
                              <option value="5">جمادى الأولى</option>
                              <option value="6">جمادى الثانية</option>
                              <option value="7">رجب</option>
                              <option value="8">شعبان</option>
                              <option value="9">رمضان</option>
                              <option value="10">شوال</option>
                              <option value="11">ذو القعدة</option>
                              <option value="12">ذو الحجة</option>
                            </select>
                            <select id="hijriMonthEnglish" class="dg-month-input">
                              <option value="1">Muharram</option>
                              <option value="2">Safar</option>
                              <option value="3">Rabi I</option>
                              <option value="4">Rabi II</option>
                              <option value="5">Jumada I</option>
                              <option value="6">Jumada II</option>
                              <option value="7">Rajab</option>
                              <option value="8">Sha'ban</option>
                              <option value="9">Ramadan</option>
                              <option value="10">Shawwal</option>
                              <option value="11">Dhu al-Qi'dah</option>
                              <option value="12">Dhu al-Hijjah</option>
                            </select>
                            <select id="hijriMonthNumbers" class="dg-month-input">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                            </select>
                          </div>
                          <input type="number" class="dg-compact-input" id="hijriYear" placeholder="Year" min="1400" max="1500">
                        </div>
                        <div class="dg-convert-actions">
                          <button type="button" id="convertToGregorian" class="dg-mini-btn secondary">To Gregorian</button>
                        </div>
                      </div>
                      <div id="conversionResult" class="dg-conversion-output">
                        <div class="dg-conversion-output-header">
                          <span>Conversion Result</span>
                        </div>
                        <div class="dg-conversion-grid">
                          <div class="dg-conversion-item">
                            <div class="dg-conversion-item-header">
                              <span class="dg-conversion-item-label">Input</span>
                              <button type="button" id="copyConversionInput" class="dg-mini-btn">Copy</button>
                            </div>
                            <div id="conversionInputText" class="dg-conversion-value"></div>
                          </div>
                          <div class="dg-conversion-item">
                            <div class="dg-conversion-item-header">
                              <span class="dg-conversion-item-label">Output</span>
                              <button type="button" id="copyConversionOutput" class="dg-mini-btn secondary">Copy</button>
                            </div>
                            <div id="conversionOutputText" class="dg-conversion-value"></div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              `
                  : ""
              }
              ${
                cat.title === "Security Testing"
                  ? `
                <div class="dg-file-controls active" id="securityControls">
                  <div class="dg-file-controls-header">
                    <div class="dg-file-controls-title">Security Testing Controls</div>
                    <div class="dg-file-controls-hint">Encrypt, decrypt, hash, and analyze payloads</div>
                  </div>
                  <div class="dg-date-tools-tabs">
                    <button type="button" class="dg-date-tools-tab active" data-date-tools-tab="generator">Generator</button>
                    <button type="button" class="dg-date-tools-tab" data-date-tools-tab="crypto">Crypto Tools</button>
                  </div>
                  <div class="dg-date-tools-panel active" data-date-tools-panel="generator">
                    <div class="dg-file-controls-sections">
                      <div class="dg-file-control-section">
                        <div class="dg-file-control-section-title">Security Field Scope</div>
                        <div class="dg-file-control-group">
                          <label>Encryption Method:</label>
                          <select id="securityDefaultMethod">
                            <option value="AES-256">AES-256</option>
                            <option value="AES-256-GCM">AES-256-GCM</option>
                            <option value="AES-256-CBC">AES-256-CBC</option>
                            <option value="AES-CTR">AES-CTR</option>
                            <option value="AES-128">AES-128</option>
                            <option value="RSA-2048">RSA-2048</option>
                            <option value="RSA-3072">RSA-3072</option>
                            <option value="RSA-4096">RSA-4096</option>
                            <option value="ECIES">ECIES</option>
                            <option value="ElGamal">ElGamal</option>
                            <option value="ChaCha20-Poly1305">ChaCha20-Poly1305</option>
                            <option value="XChaCha20-Poly1305">XChaCha20-Poly1305</option>
                            <option value="Camellia-256">Camellia-256</option>
                            <option value="Serpent">Serpent</option>
                            <option value="Twofish">Twofish</option>
                            <option value="ECC-P256">ECC-P256</option>
                            <option value="ECC-P384">ECC-P384</option>
                          </select>
                        </div>
                        <div class="dg-file-control-group">
                          <label>Hash Algorithm:</label>
                          <select id="securityDefaultHash">
                            <option value="SHA-256">SHA-256</option>
                            <option value="SHA-512">SHA-512</option>
                            <option value="SHA3-256">SHA3-256</option>
                            <option value="SHA3-512">SHA3-512</option>
                            <option value="BLAKE2b">BLAKE2b</option>
                            <option value="MD5">MD5</option>
                          </select>
                        </div>
                        <div class="dg-user-note">Note: these defaults are for tools and previewing security payload styles.</div>
                      </div>
                    </div>
                  </div>
                  <div class="dg-date-tools-panel" data-date-tools-panel="crypto">
                    <div class="dg-file-controls-sections">
                      <div class="dg-file-control-section">
                        <div class="dg-file-control-section-title">Crypto Tools</div>
                        <div class="dg-file-control-group">
                          <label>Method:</label>
                          <select id="securityCryptoMethod">
                            <option value="AES-256">AES-256</option>
                            <option value="AES-256-GCM">AES-256-GCM</option>
                            <option value="AES-256-CBC">AES-256-CBC</option>
                            <option value="AES-CTR">AES-CTR</option>
                            <option value="AES-192">AES-192</option>
                            <option value="AES-128">AES-128</option>
                            <option value="RSA-2048">RSA-2048</option>
                            <option value="RSA-3072">RSA-3072</option>
                            <option value="RSA-4096">RSA-4096</option>
                            <option value="ECIES">ECIES</option>
                            <option value="ElGamal">ElGamal</option>
                            <option value="ChaCha20-Poly1305">ChaCha20-Poly1305</option>
                            <option value="XChaCha20-Poly1305">XChaCha20-Poly1305</option>
                            <option value="Salsa20">Salsa20</option>
                            <option value="ECC-P256">ECC-P256</option>
                            <option value="ECC-P384">ECC-P384</option>
                            <option value="Twofish">Twofish</option>
                            <option value="Serpent">Serpent</option>
                            <option value="Camellia-256">Camellia-256</option>
                            <option value="CAST5">CAST5</option>
                            <option value="IDEA">IDEA</option>
                            <option value="RC4">RC4</option>
                            <option value="RC5">RC5</option>
                            <option value="RC6">RC6</option>
                            <option value="SEED">SEED</option>
                            <option value="ARIA">ARIA</option>
                            <option value="SM4">SM4</option>
                            <option value="GOST 28147-89">GOST 28147-89</option>
                            <option value="Blowfish">Blowfish</option>
                            <option value="3DES">3DES</option>
                            <option value="DES">DES</option>
                            <option value="Base64">Base64</option>
                          </select>
                        </div>
                        <div class="dg-file-control-group">
                          <label>Key / Secret:</label>
                          <input type="text" id="securityCryptoKey" placeholder="Enter key or secret (optional)">
                        </div>
                        <div class="dg-file-control-group">
                          <label>Input Text:</label>
                          <textarea id="securityCryptoInput" placeholder="Type plain text, cipher text, or message to hash..."></textarea>
                        </div>
                        <div class="dg-security-actions">
                          <button type="button" id="securityEncryptBtn" class="dg-mini-btn">Encrypt</button>
                          <button type="button" id="securityDecryptBtn" class="dg-mini-btn secondary">Decrypt</button>
                          <button type="button" id="securityHashBtn" class="dg-mini-btn secondary">Hash</button>
                        </div>
                        <div id="securityCryptoResult" class="dg-conversion-output">
                          <div class="dg-conversion-output-header">
                            <span>Crypto Result</span>
                          </div>
                          <div class="dg-conversion-grid">
                            <div class="dg-conversion-item">
                              <div class="dg-conversion-item-header">
                                <span class="dg-conversion-item-label">Input</span>
                                <button type="button" id="copySecurityInput" class="dg-mini-btn">Copy</button>
                              </div>
                              <div id="securityInputText" class="dg-conversion-value"></div>
                            </div>
                            <div class="dg-conversion-item">
                              <div class="dg-conversion-item-header">
                                <span class="dg-conversion-item-label">Output</span>
                                <button type="button" id="copySecurityOutput" class="dg-mini-btn secondary">Copy</button>
                              </div>
                              <div id="securityOutputText" class="dg-conversion-value"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `
                  : ""
              }
              ${
                cat.title === "Random Values"
                  ? `
                <div class="dg-file-controls active" id="randomValuesControls">
                  <div class="dg-file-controls-header">
                    <div class="dg-file-controls-title">Random Values Controls</div>
                    <div class="dg-file-controls-hint">Character pool and output length</div>
                  </div>
                  <div class="dg-file-controls-sections">
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Character Types</div>
                      <div class="dg-file-control-group">
                        <div class="dg-rv-check-grid">
                          <label class="dg-rv-check">
                            <input type="checkbox" id="includeNumbers" checked> Numbers (0-9)
                          </label>
                          <label class="dg-rv-check">
                            <input type="checkbox" id="includeUppercase" checked> Uppercase (A-Z)
                          </label>
                          <label class="dg-rv-check">
                            <input type="checkbox" id="includeLowercase" checked> Lowercase (a-z)
                          </label>
                          <label class="dg-rv-check">
                            <input type="checkbox" id="includeArabicLetters"> Arabic Letters (أ-ي)
                          </label>
                          <label class="dg-rv-check">
                            <input type="checkbox" id="includeSpecialChars"> Special (!@#$%)
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Output</div>
                      <div class="dg-file-control-group">
                        <label>Length:</label>
                        <div class="dg-file-size-group">
                          <input type="number" id="randomLength" value="10" min="1" max="1000" class="dg-dimension-input">
                          <span style="font-size: 10px; color: #64748b;">characters</span>
                        </div>
                      </div>
                      <div class="dg-file-control-group">
                        <label>Custom Characters:</label>
                        <input type="text" id="customChars" placeholder="Add custom characters...">
                      </div>
                    </div>
                  </div>
                </div>
              `
                  : ""
              }
              ${
                cat.title === "Random Text"
                  ? `
                <div class="dg-file-controls active" id="randomTextControls">
                  <div class="dg-file-controls-header">
                    <div class="dg-file-controls-title">Random Text Controls</div>
                    <div class="dg-file-controls-hint">Text length and character mix</div>
                  </div>
                  <div class="dg-file-controls-sections">
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Output</div>
                      <div class="dg-file-control-group">
                        <label>Text Length:</label>
                        <input type="number" id="textLength" value="50" min="1" max="10000">
                      </div>
                    </div>
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Character Types</div>
                      <div class="dg-file-control-group">
                        <div class="dg-rt-check-grid">
                          <label class="dg-rt-check">
                            <input type="checkbox" id="includeDigits" checked> Digits (0-9)
                          </label>
                          <label class="dg-rt-check">
                            <input type="checkbox" id="includeEnglish" checked> English (A-z)
                          </label>
                          <label class="dg-rt-check">
                            <input type="checkbox" id="includeArabic"> Arabic (ا-ي)
                          </label>
                          <label class="dg-rt-check">
                            <input type="checkbox" id="includeSpecial"> Special (!@#$)
                          </label>
                          <label class="dg-rt-check">
                            <input type="checkbox" id="includeSpace"> Spaces
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `
                  : ""
              }
              ${
                cat.title === "Email Testing"
                  ? `
                <div class="dg-file-controls active" id="emailControls">
                  <div class="dg-file-controls-header">
                    <div class="dg-file-controls-title">Email Testing Controls</div>
                    <div class="dg-file-controls-hint">Domain, format, and length profile</div>
                  </div>
                  <div class="dg-file-controls-sections">
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Domain</div>
                      <div class="dg-file-control-group">
                        <label>Email Domain:</label>
                        <select id="emailDomain">
                          <option value="random">Random Domain</option>
                          <option value="gmail.com">gmail.com</option>
                          <option value="yahoo.com">yahoo.com</option>
                          <option value="hotmail.com">hotmail.com</option>
                          <option value="outlook.com">outlook.com</option>
                          <option value="company.com">company.com</option>
                          <option value="test.com">test.com</option>
                          <option value="example.com">example.com</option>
                          <option value="custom">Custom Domain</option>
                        </select>
                      </div>
                      <div class="dg-file-control-group" id="customDomainGroup" style="display: none;">
                        <label>Custom Domain:</label>
                        <input type="text" id="customDomain" placeholder="mydomain.com">
                      </div>
                    </div>
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Output</div>
                      <div class="dg-file-control-group">
                        <label>Email Format:</label>
                        <select id="emailFormat">
                          <option value="standard">Standard (name@domain.com)</option>
                          <option value="subdomain">Subdomain (name@sub.domain.com)</option>
                          <option value="plus">Plus Addressing (name+tag@domain.com)</option>
                          <option value="dot">Dot Notation (first.last@domain.com)</option>
                          <option value="underscore">Underscore (first_last@domain.com)</option>
                          <option value="hyphen">Hyphen (first-last@domain.com)</option>
                        </select>
                      </div>
                      <div class="dg-file-control-group">
                        <label>Email Length:</label>
                        <select id="emailLength">
                          <option value="short">Short (5-10 chars)</option>
                          <option value="medium" selected>Medium (10-20 chars)</option>
                          <option value="long">Long (20-40 chars)</option>
                          <option value="very-long">Very Long (40+ chars)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              `
                  : ""
              }
              ${
                cat.title === "Password Testing"
                  ? `
                <div class="dg-file-controls active" id="passwordControls">
                  <div class="dg-file-controls-header">
                    <div class="dg-file-controls-title">Password Testing Controls</div>
                    <div class="dg-file-controls-hint">Length, composition, and constraints</div>
                  </div>
                  <div class="dg-file-controls-sections">
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Output</div>
                      <div class="dg-file-control-group">
                        <label>Password Length:</label>
                        <input type="number" id="passwordLength" value="12" min="4" max="128">
                      </div>
                    </div>
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Character Types</div>
                      <div class="dg-file-control-group">
                        <div class="dg-pw-check-grid">
                          <label class="dg-pw-check">
                            <input type="checkbox" id="includeUppercase" checked> Uppercase (A-Z)
                          </label>
                          <label class="dg-pw-check">
                            <input type="checkbox" id="includeLowercase" checked> Lowercase (a-z)
                          </label>
                          <label class="dg-pw-check">
                            <input type="checkbox" id="includeNumbers" checked> Numbers (0-9)
                          </label>
                          <label class="dg-pw-check">
                            <input type="checkbox" id="includeSpecialChars"> Special (!@#$)
                          </label>
                          <label class="dg-pw-check">
                            <input type="checkbox" id="includeArabicChars"> Arabic (ا-ي)
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Requirements</div>
                      <div class="dg-file-control-group">
                        <div class="dg-pw-check-grid">
                          <label class="dg-pw-check">
                            <input type="checkbox" id="mustStartWith"> Must start with letter
                          </label>
                          <label class="dg-pw-check">
                            <input type="checkbox" id="mustEndWith"> Must end with number
                          </label>
                          <label class="dg-pw-check">
                            <input type="checkbox" id="noRepeating"> No repeating chars
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `
                  : ""
              }
              ${
                cat.title === "Phone Testing"
                  ? `
                <div class="dg-file-controls active" id="phoneControls">
                  <div class="dg-file-controls-header">
                    <div class="dg-file-controls-title">Phone Testing Controls</div>
                    <div class="dg-file-controls-hint">Type, format, and validation profile</div>
                  </div>
                  <div class="dg-file-controls-sections">
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Phone Pattern</div>
                      <div class="dg-file-control-group">
                        <label>Phone Type:</label>
                        <select id="phoneType">
                          <option value="mobile">Mobile (05X)</option>
                          <option value="landline">Landline (01X)</option>
                          <option value="short-mobile">Short Mobile (5X)</option>
                          <option value="short-landline">Short Landline (1X)</option>
                          <option value="mixed">Mixed Types</option>
                        </select>
                      </div>
                      <div class="dg-file-control-group">
                        <label>Phone Format:</label>
                        <select id="phoneFormat">
                          <option value="formatted">Formatted (+966 5X XXX XXXX)</option>
                          <option value="unformatted">Unformatted (05XXXXXXXX)</option>
                          <option value="international">International (+966)</option>
                          <option value="local">Local (05X)</option>
                        </select>
                      </div>
                    </div>
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Validation</div>
                      <div class="dg-file-control-group">
                        <div class="dg-phone-check-grid">
                          <label class="dg-phone-check">
                            <input type="checkbox" id="generateValid" checked> Valid Numbers
                          </label>
                          <label class="dg-phone-check">
                            <input type="checkbox" id="generateInvalid"> Invalid Numbers
                          </label>
                          <label class="dg-phone-check">
                            <input type="checkbox" id="wrongLength"> Wrong Length
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `
                  : ""
              }
              ${allFieldsHTML}
            </div>
          `;
        } else {
          // Legacy format for categories without sub-tabs
          return `
            <div class="dg-tab-content ${idx === 0 ? "active" : ""}" data-content="${idx}">
              <div class="dg-fields-wrapper">
                ${cat.fields.map((field) => `<label class="dg-checkbox"><input type="checkbox" value="${field.id}"><span>${field.label}</span></label>`).join("")}
              </div>
              <div class="dg-fields-wrapper">
                ${cat.fields.map((field) => `<label class="dg-checkbox"><input type="checkbox" value="${field.id}"><span>${field.label}</span></label>`).join("")}
              </div>
              ${
                cat.title === "Files"
                  ? `
                <div class="dg-file-controls" id="fileControls">
                  <div class="dg-file-controls-header">
                    <div class="dg-file-controls-title">File Generation Settings</div>
                    <div class="dg-file-controls-hint">Applied to selected file types</div>
                  </div>
                  <div class="dg-file-controls-sections">
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">File Identity</div>
                      <div class="dg-file-control-group">
                        <label>File Name:</label>
                        <input type="text" id="fileName" placeholder="test-file" value="test-file">
                      </div>
                    </div>
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">File Size</div>
                      <div class="dg-file-control-group">
                        <label>Target Size:</label>
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
                    <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Image Settings</div>
                      <div class="dg-file-control-group">
                        <label>Dimensions (images only):</label>
                        <div class="dg-file-size-group">
                          <input type="number" class="dg-dimension-input" id="imageWidth" placeholder="Width" value="800" min="1">
                          <span class="dg-multiply">×</span>
                          <input type="number" class="dg-dimension-input" id="imageHeight" placeholder="Height" value="600" min="1">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `
                  : ""
              }
              ${
                cat.title === "Date & Time"
                  ? `
                <div class="dg-file-controls" id="dateTimeControls">
                  <div class="dg-file-controls-header">
                    <div class="dg-file-controls-title">Date & Time Settings</div>
                    <div class="dg-file-controls-hint">Formatting and conversion options</div>
                  </div>
                  <div class="dg-date-tools-tabs">
                    <button type="button" class="dg-date-tools-tab active" data-date-tools-tab="basic">Generator</button>
                    <button type="button" class="dg-date-tools-tab" data-date-tools-tab="convert">Converter</button>
                  </div>
                  <div class="dg-date-tools-panel active" data-date-tools-panel="basic">
                    <div class="dg-file-controls-sections">
                      <div class="dg-file-control-section">
                        <div class="dg-file-control-section-title">Range</div>
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
                      </div>
                      <div class="dg-file-control-section">
                        <div class="dg-file-control-section-title">Format</div>
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
                      <div class="dg-file-control-section">
                        <div class="dg-file-control-section-title">Generated Fields</div>
                        <div class="dg-file-control-group">
                          <label>Date Conversion:</label>
                          <div class="dg-checkbox-inline-group">
                            <label class="dg-checkbox-inline">
                              <input type="checkbox" id="includeHijri"> Include Hijri
                            </label>
                            <label class="dg-checkbox-inline">
                              <input type="checkbox" id="includeGregorian" checked> Include Gregorian
                            </label>
                            <label class="dg-checkbox-inline">
                              <input type="checkbox" id="showBothDates"> Show Both
                            </label>
                          </div>
                          <div class="dg-user-note">Note: these options affect generated <code>date</code> and <code>time</code> fields only when those fields are selected in this tab.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="dg-date-tools-panel" data-date-tools-panel="convert">
                    <div class="dg-file-controls-sections">
                      <div class="dg-file-control-section">
                      <div class="dg-file-control-section-title">Convert Tools</div>
                      <input type="hidden" id="gregorianMonthMode" value="english">
                      <input type="hidden" id="hijriMonthMode" value="arabic">
                      <div class="dg-file-control-group">
                        <label>Gregorian Month Input:</label>
                        <div class="dg-mode-toggle" data-mode-toggle="gregorian">
                          <button type="button" class="dg-mode-btn active" data-mode-value="english">English</button>
                          <button type="button" class="dg-mode-btn" data-mode-value="arabic">Arabic</button>
                          <button type="button" class="dg-mode-btn" data-mode-value="numbers">Numbers</button>
                        </div>
                      </div>
                      <div class="dg-file-control-group">
                        <label>Convert Specific Gregorian Date:</label>
                        <div class="dg-inline-pair">
                          <input type="number" class="dg-compact-input" id="specificGregorianDay" placeholder="Day" min="1" max="31">
                          <div class="dg-month-select-wrap">
                            <select id="specificGregorianMonthEnglish" class="dg-month-input active">
                              <option value="1">January</option>
                              <option value="2">February</option>
                              <option value="3">March</option>
                              <option value="4">April</option>
                              <option value="5">May</option>
                              <option value="6">June</option>
                              <option value="7">July</option>
                              <option value="8">August</option>
                              <option value="9">September</option>
                              <option value="10">October</option>
                              <option value="11">November</option>
                              <option value="12">December</option>
                            </select>
                            <select id="specificGregorianMonthArabic" class="dg-month-input">
                              <option value="1">يناير</option>
                              <option value="2">فبراير</option>
                              <option value="3">مارس</option>
                              <option value="4">أبريل</option>
                              <option value="5">مايو</option>
                              <option value="6">يونيو</option>
                              <option value="7">يوليو</option>
                              <option value="8">أغسطس</option>
                              <option value="9">سبتمبر</option>
                              <option value="10">أكتوبر</option>
                              <option value="11">نوفمبر</option>
                              <option value="12">ديسمبر</option>
                            </select>
                            <select id="specificGregorianMonthNumbers" class="dg-month-input">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                            </select>
                          </div>
                          <input type="number" class="dg-compact-input" id="specificGregorianYear" placeholder="Year" min="1900" max="2100">
                        </div>
                        <div class="dg-convert-actions">
                          <button type="button" id="convertToHijri" class="dg-mini-btn">To Hijri</button>
                        </div>
                      </div>
                      <div class="dg-file-control-group">
                        <label>Hijri Month Input:</label>
                        <div class="dg-mode-toggle" data-mode-toggle="hijri">
                          <button type="button" class="dg-mode-btn active" data-mode-value="arabic">Arabic</button>
                          <button type="button" class="dg-mode-btn" data-mode-value="english">English</button>
                          <button type="button" class="dg-mode-btn" data-mode-value="numbers">Numbers</button>
                        </div>
                      </div>
                      <div class="dg-file-control-group">
                        <label>Hijri Output Format:</label>
                        <div class="dg-inline-pair">
                          <select id="hijriOutputMode">
                            <option value="arabic">Arabic Text</option>
                            <option value="english">English Text</option>
                            <option value="numbers">Numbers Only</option>
                          </select>
                          <select id="hijriOutputFormat">
                            <option value="text">Text (Day Month Year)</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          </select>
                        </div>
                      </div>
                      <div class="dg-file-control-group">
                        <label>Gregorian Output Format:</label>
                        <div class="dg-inline-pair">
                          <select id="gregorianOutputMode">
                            <option value="english">English Text</option>
                            <option value="arabic">Arabic Text</option>
                            <option value="numbers">Numbers Only</option>
                          </select>
                          <select id="gregorianOutputFormat">
                            <option value="text">Text (Day Month Year)</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                          </select>
                        </div>
                      </div>
                      <div class="dg-file-control-group">
                        <label>Convert Hijri Date:</label>
                        <div class="dg-inline-pair">
                          <input type="number" class="dg-compact-input" id="hijriDay" placeholder="Day" min="1" max="30">
                          <div class="dg-month-select-wrap">
                            <select id="hijriMonthArabic" class="dg-month-input active">
                              <option value="1">محرم</option>
                              <option value="2">صفر</option>
                              <option value="3">ربيع الأول</option>
                              <option value="4">ربيع الثاني</option>
                              <option value="5">جمادى الأولى</option>
                              <option value="6">جمادى الثانية</option>
                              <option value="7">رجب</option>
                              <option value="8">شعبان</option>
                              <option value="9">رمضان</option>
                              <option value="10">شوال</option>
                              <option value="11">ذو القعدة</option>
                              <option value="12">ذو الحجة</option>
                            </select>
                            <select id="hijriMonthEnglish" class="dg-month-input">
                              <option value="1">Muharram</option>
                              <option value="2">Safar</option>
                              <option value="3">Rabi I</option>
                              <option value="4">Rabi II</option>
                              <option value="5">Jumada I</option>
                              <option value="6">Jumada II</option>
                              <option value="7">Rajab</option>
                              <option value="8">Sha'ban</option>
                              <option value="9">Ramadan</option>
                              <option value="10">Shawwal</option>
                              <option value="11">Dhu al-Qi'dah</option>
                              <option value="12">Dhu al-Hijjah</option>
                            </select>
                            <select id="hijriMonthNumbers" class="dg-month-input">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                            </select>
                          </div>
                          <input type="number" class="dg-compact-input" id="hijriYear" placeholder="Year" min="1400" max="1500">
                        </div>
                        <div class="dg-convert-actions">
                          <button type="button" id="convertToGregorian" class="dg-mini-btn secondary">To Gregorian</button>
                        </div>
                      </div>
                      <div id="conversionResult" class="dg-conversion-output">
                        <div class="dg-conversion-output-header">
                          <span>Conversion Result</span>
                        </div>
                        <div class="dg-conversion-grid">
                          <div class="dg-conversion-item">
                            <div class="dg-conversion-item-header">
                              <span class="dg-conversion-item-label">Input</span>
                              <button type="button" id="copyConversionInput" class="dg-mini-btn">Copy</button>
                            </div>
                            <div id="conversionInputText" class="dg-conversion-value"></div>
                          </div>
                          <div class="dg-conversion-item">
                            <div class="dg-conversion-item-header">
                              <span class="dg-conversion-item-label">Output</span>
                              <button type="button" id="copyConversionOutput" class="dg-mini-btn secondary">Copy</button>
                            </div>
                            <div id="conversionOutputText" class="dg-conversion-value"></div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              `
                  : ""
              }
            </div>
          `;
        }
      }
    )
    .join("");

  container.innerHTML = `
    <div class="dg-app">
      <div class="dg-header">
        <h1>🎲 Test Data Generator</h1>
        <div class="dg-search">
          <input type="text" id="searchInput" placeholder="Search fields..." autocomplete="off">
          <span class="dg-search-icon" id="searchIcon">🔍</span>
          <button class="dg-search-clear" id="searchClear">✕</button>
          <div class="dg-search-results" id="searchResults"></div>
        </div>
        <div class="dg-header-actions">
          <button id="maximizeViewBtn" class="dg-btn dg-btn-secondary dg-maximize-btn">⛶ Maximize</button>
          <button id="jsonFillerToggleBtn" class="dg-btn dg-btn-secondary dg-json-toggle">🧩 JSON Filler</button>
          <button id="resetAllBtn" class="dg-btn dg-btn-secondary">🔄 Reset All</button>
        </div>
      </div>
      <div class="dg-body" id="mainGeneratorView">
        <div class="dg-tabs-panel">
          <div class="dg-tabs-header">🗂️ Tabs</div>
          <div class="dg-tabs">${tabsHTML}</div>
        </div>
        <div class="dg-main">
          <div class="dg-content">
            ${contentHTML}
          </div>
        </div>
        <div class="dg-right-sidebar">
          <div class="dg-right-sidebar-content">
            <section class="dg-panel-section dg-controls-section" id="controlsSection">
              <div class="dg-panel-header" id="controlsHeader">
                <span class="dg-panel-title">⚙️ Controls</span>
                <div class="dg-panel-toggle">▲</div>
              </div>
              <div class="dg-panel-content">
                <div class="dg-controls">
                  <div class="dg-controls-content">
                    <div class="dg-count-control">
                      <label>Records:</label>
                      <input type="number" id="recordCount" value="1" min="1" max="100">
                    </div>
                    <div class="dg-controls-subsection">
                      <div class="dg-controls-subtitle">Selection Controls</div>
                      <div class="dg-top-controls">
                        <button class="dg-btn dg-btn-secondary dg-unselect-all-categories">✕ All</button>
                        <button class="dg-btn dg-btn-secondary dg-unselect-all" data-tab="current">✕ Tab</button>
                        <button class="dg-btn dg-btn-secondary dg-select-all" data-tab="current">✓ Tab</button>
                        <button class="dg-btn dg-btn-secondary dg-select-all-categories">✓ All</button>
                      </div>
                    </div>

                    <!-- Image Dimension Controls -->
                    <div class="dg-image-controls" id="imageControls">
                      <h4>Image Dimensions</h4>

                      <div class="dg-current-dimensions" id="currentDimensions">
                        Current: 400 × 300 px (4:3 ratio)
                      </div>

                    <div class="dg-image-control-group">
                      <label>Custom Size</label>
                      <div class="dg-image-size-group">
                        <input type="number" id="imageWidth" value="400" min="50" max="2000" placeholder="Width">
                        <span>×</span>
                        <input type="number" id="imageHeight" value="300" min="50" max="2000" placeholder="Height">
                      </div>
                    </div>

                    <div class="dg-image-control-group">
                      <label>Popular Sizes</label>
                      <div class="dg-preset-buttons">
                        <button class="dg-preset-btn popular" data-size="400,300">400×300</button>
                        <button class="dg-preset-btn popular" data-size="800,600">800×600</button>
                        <button class="dg-preset-btn popular" data-size="1200,800">1200×800</button>
                        <button class="dg-preset-btn" data-size="150,150">150×150</button>
                        <button class="dg-preset-btn" data-size="300,200">300×200</button>
                        <button class="dg-preset-btn" data-size="600,400">600×400</button>
                        <button class="dg-preset-btn" data-size="1024,768">1024×768</button>
                        <button class="dg-preset-btn" data-size="1920,1080">1920×1080</button>
                      </div>
                    </div>

                    <div class="dg-image-control-group">
                      <div class="dg-aspect-ratios">
                        <label>Common Aspect Ratios</label>
                        <div>
                          <button class="dg-aspect-btn" data-ratio="1:1" data-base="400">1:1 Square</button>
                          <button class="dg-aspect-btn" data-ratio="4:3" data-base="400">4:3 Standard</button>
                          <button class="dg-aspect-btn" data-ratio="16:9" data-base="400">16:9 Widescreen</button>
                          <button class="dg-aspect-btn" data-ratio="3:2" data-base="400">3:2 Photo</button>
                          <button class="dg-aspect-btn" data-ratio="21:9" data-base="400">21:9 Ultrawide</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="dg-buttons">
                    <button class="dg-btn dg-btn-primary" id="generateBtn">Generate</button>
                    <button class="dg-btn dg-btn-secondary" id="copyBtn">Copy</button>
                    <button class="dg-btn dg-btn-secondary" id="downloadBtn" style="display: none;">💾 Save File</button>
                  </div>
                </div>
              </div>
            </section>

            <section class="dg-panel-section dg-results-section" id="resultsSection">
              <div class="dg-panel-header" id="resultsHeader">
                <span class="dg-panel-title">📊 Results</span>
                <span class="dg-panel-meta" id="resultsCounter">0 items</span>
                <div class="dg-panel-toggle">▲</div>
              </div>
              <div class="dg-panel-content results-content">
                <div class="dg-results" id="results"></div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="dg-json-view" id="jsonFillerView">
        <div class="dg-json-pane dg-json-editor-pane">
          <div class="dg-json-pane-header">
            <span class="dg-json-pane-title">JSON Template</span>
            <span class="dg-json-pane-note">Paste JSON, then parse.</span>
          </div>
          <div class="dg-json-editor-wrap">
            <div class="dg-json-editor-surface">
              <div class="dg-json-line-numbers" id="jsonTemplateLineNumbers"></div>
              <textarea id="jsonTemplateInput" spellcheck="false" placeholder='{
  "fullName": "",
  "email": "",
  "address": {
    "city": "",
    "zip": ""
  }
}'></textarea>
            </div>
            <div class="dg-json-actions">
              <button class="dg-btn dg-btn-primary" id="jsonParseBtn">Parse JSON</button>
              <button class="dg-btn dg-btn-secondary" id="jsonApplyAllBtn">Apply Selected Generators</button>
              <button class="dg-btn dg-btn-secondary" id="jsonCopyResultBtn">Copy JSON</button>
            </div>
            <div id="jsonTemplateStatus"></div>
          </div>
        </div>
        <div class="dg-json-pane dg-json-fields-pane">
          <div class="dg-json-pane-header">
            <span class="dg-json-pane-title">Fields & Generators</span>
            <span class="dg-json-pane-note">Click a field to pick a generator.</span>
          </div>
          <div class="dg-json-fields-wrap" id="jsonFieldsContainer">
            <div class="dg-json-empty">No JSON parsed yet.</div>
          </div>
        </div>
      </div>
      <div class="dg-footer">Developed by Haitham Al Mughrabi ❤️ ${new Date().getFullYear()}</div>
    </div>
  `;

  let generatedData = [];
  let jsonTemplateData = null;
  let jsonFieldsState = [];
  let jsonLineMap = {};

  const maximizeViewBtn = document.getElementById("maximizeViewBtn");
  const jsonFillerToggleBtn = document.getElementById("jsonFillerToggleBtn");
  const mainGeneratorView = document.getElementById("mainGeneratorView");
  const jsonFillerView = document.getElementById("jsonFillerView");
  const appRoot = container.querySelector(".dg-app");
  const jsonTemplateInput = document.getElementById("jsonTemplateInput");
  const jsonTemplateLineNumbers = document.getElementById(
    "jsonTemplateLineNumbers",
  );
  const jsonParseBtn = document.getElementById("jsonParseBtn");
  const jsonApplyAllBtn = document.getElementById("jsonApplyAllBtn");
  const jsonCopyResultBtn = document.getElementById("jsonCopyResultBtn");
  const jsonFieldsContainer = document.getElementById("jsonFieldsContainer");
  const jsonTemplateStatus = document.getElementById("jsonTemplateStatus");

  function syncAppLayoutMode() {
    const fullPageByBody =
      typeof document !== "undefined" &&
      document.body &&
      document.body.classList.contains("dg-fullpage");
    const fullPageBySize = window.innerWidth > 820 || window.innerHeight > 820;
    appRoot.classList.toggle("dg-fullpage", fullPageByBody || fullPageBySize);
  }

  function formatGeneratorLabel(generatorName) {
    if (!generatorName) return "";
    return generatorName
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function escapeAttributeValue(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeHtmlText(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function getValueType(value) {
    if (Array.isArray(value)) return "array";
    if (value === null) return "null";
    return typeof value;
  }

  function formatValueForInput(value) {
    if (value === null) return "null";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value ?? "");
  }

  function coerceInputValue(rawValue, originalType) {
    if (originalType === "number") {
      const parsed = Number(rawValue);
      return Number.isNaN(parsed) ? rawValue : parsed;
    }
    if (originalType === "boolean") {
      if (rawValue === "true") return true;
      if (rawValue === "false") return false;
      return rawValue;
    }
    if (originalType === "null") {
      return rawValue === "null" ? null : rawValue;
    }
    if (originalType === "array" || originalType === "object") {
      try {
        return JSON.parse(rawValue);
      } catch (error) {
        return rawValue;
      }
    }
    return rawValue;
  }

  function getGeneratorOptionsHTML(selectedGenerator) {
    const generators = Object.keys(window.generators || {})
      .filter((name) => typeof window.generators[name] === "function")
      .sort((a, b) => a.localeCompare(b));
    const options = [
      '<option value="">Choose generator...</option>',
      ...generators.map((name) => {
        const selected = selectedGenerator === name ? "selected" : "";
        return `<option value="${name}" ${selected}>${formatGeneratorLabel(name)} (${name})</option>`;
      }),
    ];
    return options.join("");
  }

  function getPathTokens(path) {
    const tokens = [];
    const regex = /([^[.\]]+)|\[(\d+)\]/g;
    let match;
    while ((match = regex.exec(path)) !== null) {
      if (typeof match[1] === "string" && match[1] !== "") {
        tokens.push(match[1]);
      } else if (typeof match[2] !== "undefined") {
        tokens.push(Number(match[2]));
      }
    }
    return tokens;
  }

  function setValueByPath(target, path, value) {
    const tokens = getPathTokens(path);
    if (!tokens.length) return;
    let cursor = target;
    for (let i = 0; i < tokens.length - 1; i++) {
      cursor = cursor[tokens[i]];
    }
    cursor[tokens[tokens.length - 1]] = value;
  }

  function updateJsonLineNumbers() {
    if (!jsonTemplateLineNumbers || !jsonTemplateInput) return;
    const lineCount = Math.max(1, (jsonTemplateInput.value.match(/\n/g) || []).length + 1);
    let lineHtml = "";
    for (let line = 1; line <= lineCount; line++) {
      lineHtml += `<div>${line}</div>`;
    }
    jsonTemplateLineNumbers.innerHTML = lineHtml;
    jsonTemplateLineNumbers.scrollTop = jsonTemplateInput.scrollTop;
  }

  function serializeJsonWithLineMap(value) {
    const lineMap = {};
    const lines = [];
    let currentLine = 0;

    function pushLine(text, path) {
      lines.push(text);
      currentLine += 1;
      if (path) {
        lineMap[path] = currentLine;
      }
    }

    function writeNode(node, indentLevel, path, options = {}) {
      const { key = null, isLast = true, asProperty = false } = options;
      const indent = "  ".repeat(indentLevel);
      const keyPrefix = asProperty ? `${JSON.stringify(key)}: ` : "";

      if (Array.isArray(node)) {
        if (node.length === 0) {
          pushLine(`${indent}${keyPrefix}[]${isLast ? "" : ","}`, path);
          return;
        }
        pushLine(`${indent}${keyPrefix}[`, path);
        node.forEach((item, index) => {
          const childPath = path ? `${path}[${index}]` : `[${index}]`;
          writeNode(item, indentLevel + 1, childPath, {
            isLast: index === node.length - 1,
            asProperty: false,
          });
        });
        pushLine(`${indent}]${isLast ? "" : ","}`);
        return;
      }

      if (node !== null && typeof node === "object") {
        const entries = Object.entries(node);
        if (entries.length === 0) {
          pushLine(`${indent}${keyPrefix}{}${isLast ? "" : ","}`, path);
          return;
        }
        pushLine(`${indent}${keyPrefix}{`, path);
        entries.forEach(([childKey, childValue], index) => {
          const childPath = path ? `${path}.${childKey}` : childKey;
          writeNode(childValue, indentLevel + 1, childPath, {
            key: childKey,
            isLast: index === entries.length - 1,
            asProperty: true,
          });
        });
        pushLine(`${indent}}${isLast ? "" : ","}`);
        return;
      }

      pushLine(
        `${indent}${keyPrefix}${JSON.stringify(node)}${isLast ? "" : ","}`,
        path,
      );
    }

    writeNode(value, 0, "", { isLast: true, asProperty: false });
    return { text: lines.join("\n"), lineMap };
  }

  function refreshJsonEditorFromData() {
    if (!jsonTemplateInput || jsonTemplateData === null) return;
    const serialized = serializeJsonWithLineMap(jsonTemplateData);
    jsonLineMap = serialized.lineMap || {};
    jsonTemplateInput.value = serialized.text;
    updateJsonLineNumbers();
  }

  function scrollJsonToField(path, options = {}) {
    if (!jsonTemplateInput || !path) return;
    const { focusEditor = false } = options;
    const line = jsonLineMap[path];
    if (!line) return;
    const lineHeight =
      parseFloat(window.getComputedStyle(jsonTemplateInput).lineHeight) || 18;
    const targetScrollTop = Math.max(
      0,
      (line - 1) * lineHeight - jsonTemplateInput.clientHeight / 3,
    );
    jsonTemplateInput.scrollTop = targetScrollTop;
    if (jsonTemplateLineNumbers) {
      jsonTemplateLineNumbers.scrollTop = jsonTemplateInput.scrollTop;
    }

    const lines = jsonTemplateInput.value.split("\n");
    let cursorPosition = 0;
    for (let i = 0; i < line - 1; i++) {
      cursorPosition += lines[i].length + 1;
    }
    if (focusEditor) {
      jsonTemplateInput.focus();
      jsonTemplateInput.setSelectionRange(cursorPosition, cursorPosition);
    }
  }

  function flattenJsonFields(value, path = "") {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return [{ path, value: [] }];
      }
      return value.flatMap((item, index) =>
        flattenJsonFields(item, `${path}[${index}]`),
      );
    }
    if (value !== null && typeof value === "object") {
      const keys = Object.keys(value);
      if (keys.length === 0) {
        return [{ path, value: {} }];
      }
      return keys.flatMap((key) =>
        flattenJsonFields(value[key], path ? `${path}.${key}` : key),
      );
    }
    return [{ path, value }];
  }

  function renderJsonFields() {
    if (!jsonFieldsState.length) {
      jsonFieldsContainer.innerHTML =
        '<div class="dg-json-empty">No leaf fields found in this JSON.</div>';
      return;
    }
    jsonFieldsContainer.innerHTML = jsonFieldsState
      .map(
        (field, index) => `
          <div class="dg-json-field-card" data-json-field-card="${index}">
            <div class="dg-json-field-main" data-json-field-main="${index}">
              <div class="dg-json-field-path">${escapeHtmlText(field.path)}</div>
              <input class="dg-json-field-input" data-json-field-input="${index}" value="${escapeAttributeValue(formatValueForInput(field.value))}">
            </div>
            <div class="dg-json-generator-row">
              <select class="dg-json-generator-select" data-json-generator="${index}">
                ${getGeneratorOptionsHTML(field.generator)}
              </select>
              <button class="dg-btn dg-btn-primary" data-json-fill="${index}">Fill</button>
            </div>
          </div>
        `,
      )
      .join("");

    jsonFieldsContainer.querySelectorAll("[data-json-field-main]").forEach((row) => {
      row.addEventListener("click", () => {
        const idx = row.getAttribute("data-json-field-main");
        jsonFieldsContainer
          .querySelectorAll(".dg-json-field-card")
          .forEach((card) => card.classList.remove("active"));
        const card = jsonFieldsContainer.querySelector(
          `[data-json-field-card="${idx}"]`,
        );
        if (card) card.classList.add("active");
        if (jsonFieldsState[idx]) {
          scrollJsonToField(jsonFieldsState[idx].path);
        }
      });
    });

    jsonFieldsContainer.querySelectorAll("[data-json-field-input]").forEach((input) => {
      const index = Number(input.getAttribute("data-json-field-input"));

      input.addEventListener("input", () => {
        const field = jsonFieldsState[index];
        if (!field || !jsonTemplateData) return;
        const coercedValue = coerceInputValue(input.value, field.valueType);
        field.value = coercedValue;
        setValueByPath(jsonTemplateData, field.path, coercedValue);
        refreshJsonEditorFromData();
        scrollJsonToField(field.path);
      });

      input.addEventListener("focus", () => {
        if (jsonFieldsState[index]) {
          scrollJsonToField(jsonFieldsState[index].path);
        }
      });
    });

    jsonFieldsContainer.querySelectorAll("[data-json-generator]").forEach((select) => {
      select.addEventListener("change", () => {
        const index = Number(select.getAttribute("data-json-generator"));
        if (!jsonFieldsState[index]) return;
        jsonFieldsState[index].generator = select.value;
      });
    });

    jsonFieldsContainer.querySelectorAll("[data-json-fill]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.getAttribute("data-json-fill"));
        const field = jsonFieldsState[index];
        if (!field || !field.generator) return;
        const generatorFn = window.generators?.[field.generator];
        if (typeof generatorFn !== "function" || !jsonTemplateData) return;
        try {
          const generatedValue = generatorFn();
          field.value = generatedValue;
          setValueByPath(jsonTemplateData, field.path, generatedValue);
          const input = jsonFieldsContainer.querySelector(
            `[data-json-field-input="${index}"]`,
          );
          if (input) input.value = formatValueForInput(generatedValue);
          refreshJsonEditorFromData();
          scrollJsonToField(field.path);
          jsonTemplateStatus.textContent = `Generated value for ${field.path}`;
          jsonTemplateStatus.classList.remove("error");
        } catch (error) {
          jsonTemplateStatus.textContent = `Generator failed for ${field.path}`;
          jsonTemplateStatus.classList.add("error");
        }
      });
    });
  }

  function parseAndRenderJsonTemplate() {
    const text = (jsonTemplateInput.value || "").trim();
    if (!text) {
      jsonTemplateStatus.textContent = "Paste JSON first.";
      jsonTemplateStatus.classList.add("error");
      return;
    }
    try {
      const parsed = JSON.parse(text);
      if (typeof parsed !== "object" || parsed === null) {
        jsonTemplateStatus.textContent = "JSON root must be object or array.";
        jsonTemplateStatus.classList.add("error");
        return;
      }
      jsonTemplateData = parsed;
      const currentSelections = new Map(
        jsonFieldsState.map((item) => [item.path, item.generator || ""]),
      );
      jsonFieldsState = flattenJsonFields(parsed)
        .filter((item) => item.path)
        .map((item) => ({
          path: item.path,
          value: item.value,
          valueType: getValueType(item.value),
          generator: currentSelections.get(item.path) || "",
        }));
      renderJsonFields();
      jsonTemplateStatus.textContent = `Parsed ${jsonFieldsState.length} field${jsonFieldsState.length === 1 ? "" : "s"}.`;
      jsonTemplateStatus.classList.remove("error");
      refreshJsonEditorFromData();
    } catch (error) {
      jsonTemplateStatus.textContent = `Invalid JSON: ${error.message}`;
      jsonTemplateStatus.classList.add("error");
    }
  }

  function setViewMode(mode) {
    const jsonMode = mode === "json";
    mainGeneratorView.style.display = jsonMode ? "none" : "flex";
    jsonFillerView.classList.toggle("active", jsonMode);
    jsonFillerToggleBtn.classList.toggle("active", jsonMode);
    jsonFillerToggleBtn.textContent = jsonMode
      ? "⬅ Back To Generator"
      : "🧩 JSON Filler";
    appRoot.classList.toggle("json-mode", jsonMode);
  }

  function syncMaximizeButton() {
    if (!maximizeViewBtn) return;
    const isLikelyPopup = window.innerWidth <= 820 && window.innerHeight <= 820;
    if (isLikelyPopup) {
      maximizeViewBtn.classList.remove("active");
      maximizeViewBtn.textContent = "⤢ Full Page";
      return;
    }
    const isFullscreen = !!document.fullscreenElement;
    const isFallbackMax = appRoot.classList.contains("dg-force-maximized");
    const isMaximized = isFullscreen || isFallbackMax;
    maximizeViewBtn.classList.toggle("active", isMaximized);
    maximizeViewBtn.textContent = isMaximized ? "🗗 Restore" : "⛶ Maximize";
  }

  async function toggleMaximizeView() {
    const isLikelyPopup = window.innerWidth <= 820 && window.innerHeight <= 820;
    if (isLikelyPopup) {
      const hasChromeRuntime =
        typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.getURL;
      const hasChromeTabs =
        typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create;
      const openUrl = hasChromeRuntime
        ? chrome.runtime.getURL(
            `popup.html${jsonFillerView.classList.contains("active") ? "#json-filler" : ""}`,
          )
        : `popup.html${jsonFillerView.classList.contains("active") ? "#json-filler" : ""}`;
      try {
        if (hasChromeTabs) {
          chrome.tabs.create({ url: openUrl });
        } else {
          window.open(openUrl, "_blank");
        }
      } catch (error) {
        window.open(openUrl, "_blank");
      }
      return;
    }

    const isFullscreen = !!document.fullscreenElement;
    const isFallbackMax = appRoot.classList.contains("dg-force-maximized");

    if (isFullscreen) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        // Ignore if browser blocks exiting fullscreen here.
      }
      syncMaximizeButton();
      return;
    }

    if (isFallbackMax) {
      appRoot.classList.remove("dg-force-maximized");
      document.body.classList.remove("dg-force-maximized");
      syncMaximizeButton();
      return;
    }

    try {
      await document.documentElement.requestFullscreen();
    } catch (error) {
      appRoot.classList.add("dg-force-maximized");
      document.body.classList.add("dg-force-maximized");
    }
    syncMaximizeButton();
  }

  if (jsonFillerToggleBtn) {
    jsonFillerToggleBtn.addEventListener("click", () => {
      const isActive = jsonFillerView.classList.contains("active");
      setViewMode(isActive ? "main" : "json");
    });
  }

  if ((window.location.hash || "").toLowerCase().includes("json-filler")) {
    setViewMode("json");
  }

  if (jsonParseBtn) {
    jsonParseBtn.addEventListener("click", parseAndRenderJsonTemplate);
  }

  if (jsonApplyAllBtn) {
    jsonApplyAllBtn.addEventListener("click", () => {
      if (!jsonTemplateData || !jsonFieldsState.length) {
        jsonTemplateStatus.textContent = "Parse JSON first.";
        jsonTemplateStatus.classList.add("error");
        return;
      }
      jsonFieldsState.forEach((field, index) => {
        if (!field.generator) return;
        const generatorFn = window.generators?.[field.generator];
        if (typeof generatorFn !== "function") return;
        try {
          const generatedValue = generatorFn();
          field.value = generatedValue;
          setValueByPath(jsonTemplateData, field.path, generatedValue);
          const input = jsonFieldsContainer.querySelector(
            `[data-json-field-input="${index}"]`,
          );
          if (input) input.value = formatValueForInput(generatedValue);
        } catch (error) {
          // Skip failed generator and continue others.
        }
      });
      refreshJsonEditorFromData();
      jsonTemplateStatus.textContent = "Applied selected generators.";
      jsonTemplateStatus.classList.remove("error");
    });
  }

  if (jsonTemplateInput) {
    jsonTemplateInput.addEventListener("input", updateJsonLineNumbers);
    jsonTemplateInput.addEventListener("scroll", () => {
      if (jsonTemplateLineNumbers) {
        jsonTemplateLineNumbers.scrollTop = jsonTemplateInput.scrollTop;
      }
    });
    updateJsonLineNumbers();
  }

  if (jsonCopyResultBtn) {
    jsonCopyResultBtn.addEventListener("click", () => {
      const payload = jsonTemplateInput.value || "";
      if (!payload.trim()) return;
      navigator.clipboard.writeText(payload).then(() => {
        const original = jsonCopyResultBtn.textContent;
        jsonCopyResultBtn.textContent = "Copied!";
        setTimeout(() => {
          jsonCopyResultBtn.textContent = original;
        }, 900);
      });
    });
  }

  if (maximizeViewBtn) {
    maximizeViewBtn.addEventListener("click", () => {
      toggleMaximizeView();
    });
  }

  window.addEventListener("resize", syncAppLayoutMode);
  syncAppLayoutMode();
  document.addEventListener("fullscreenchange", syncMaximizeButton);
  syncMaximizeButton();

  document.querySelectorAll(".dg-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabIdx = tab.dataset.tab;
      document
        .querySelectorAll(".dg-tab")
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(".dg-tab-content")
        .forEach((c) => c.classList.remove("active"));
      tab.classList.add("active");
      document
        .querySelector(`[data-content="${tabIdx}"]`)
        .classList.add("active");

      // Show/hide file controls and download button based on Files tab
      const category = sortedCategories[tabIdx];
      const isFilesTab = category.title === "Files";
      const isDateTimeTab = category.title === "Date & Time";
      const isRandomValuesTab = category.title === "Random Values";
      const isRandomTextTab = category.title === "Random Text";
      const isEmailTestingTab = category.title === "Email Testing";
      const isPasswordTestingTab = category.title === "Password Testing";
      const isPhoneTestingTab = category.title === "Phone Testing";
      const isSecurityTestingTab = category.title === "Security Testing";
      const isColorsTab = category.title === "Colors";
      const isImagesTab = category.title === "Images & Avatars";
      const fileControls = document.getElementById("fileControls");
      const dateTimeControls = document.getElementById("dateTimeControls");
      const randomValuesControls = document.getElementById(
        "randomValuesControls",
      );
      const randomTextControls = document.getElementById("randomTextControls");
      const emailControls = document.getElementById("emailControls");
      const passwordControls = document.getElementById("passwordControls");
      const phoneControls = document.getElementById("phoneControls");
      const securityControls = document.getElementById("securityControls");
      const colorControls = document.getElementById("colorControls");
      const imageControls = document.getElementById("imageControls");
      const downloadBtn = document.getElementById("downloadBtn");

      if (fileControls) {
        fileControls.classList.toggle("active", isFilesTab);
      }
      if (dateTimeControls) {
        dateTimeControls.classList.toggle("active", isDateTimeTab);
      }
      if (randomValuesControls) {
        randomValuesControls.classList.toggle("active", isRandomValuesTab);
      }
      if (randomTextControls) {
        randomTextControls.classList.toggle("active", isRandomTextTab);
      }
      if (emailControls) {
        emailControls.classList.toggle("active", isEmailTestingTab);
      }
      if (passwordControls) {
        passwordControls.classList.toggle("active", isPasswordTestingTab);
      }
      if (phoneControls) {
        phoneControls.classList.toggle("active", isPhoneTestingTab);
      }
      if (securityControls) {
        securityControls.classList.toggle("active", isSecurityTestingTab);
      }
      if (colorControls) {
        colorControls.classList.toggle("active", isColorsTab);
      }
      if (imageControls) {
        imageControls.classList.toggle("active", isImagesTab);
      }
      if (downloadBtn) {
        downloadBtn.style.display = isFilesTab ? "inline-block" : "none";
      }
    });
  });

  // Sub-tab event handlers removed - no longer needed with flattened structure

  // Save and restore checkbox state
  function saveCheckboxState() {
    const checkedValues = Array.from(document.querySelectorAll(".dg-checkbox input:checked"))
      .map(cb => cb.value);
    chrome.storage.local.set({ selectedFields: checkedValues });
  }

  function restoreCheckboxState() {
    chrome.storage.local.get(['selectedFields'], (result) => {
      if (result.selectedFields && result.selectedFields.length > 0) {
        document.querySelectorAll(".dg-checkbox input").forEach((cb) => {
          if (result.selectedFields.includes(cb.value)) {
            cb.checked = true;
          }
        });
        // Update section checkboxes after restoring
        document.querySelectorAll(".dg-fields-wrapper").forEach((wrapper) => {
          const sectionId = wrapper.dataset.sectionFields;
          if (sectionId) {
            const sectionCheckbox = document.querySelector(`.dg-section-checkbox[data-section="${sectionId}"]`);
            if (sectionCheckbox) {
              const allCheckboxes = wrapper.querySelectorAll(".dg-checkbox input");
              const checkedCount = wrapper.querySelectorAll(".dg-checkbox input:checked").length;
              sectionCheckbox.checked = checkedCount === allCheckboxes.length;
              sectionCheckbox.indeterminate = checkedCount > 0 && checkedCount < allCheckboxes.length;
            }
          }
        });
      }
    });
  }

  // Save and restore generated data
  function saveGeneratedData(data, files) {
    chrome.storage.local.set({ 
      generatedData: data,
      generatedFiles: files || []
    });
  }

  function restoreGeneratedData() {
    chrome.storage.local.get(['generatedData', 'generatedFiles'], (result) => {
      if (result.generatedData && result.generatedData.length > 0) {
        generatedData = result.generatedData;
        const generatedFiles = result.generatedFiles || [];
        displayGeneratedData(generatedData, generatedFiles);
      }
    });
  }

  function buildFieldMetadataMap() {
    const metadataMap = {};

    categories.forEach((category) => {
      if (category.subTabs && Array.isArray(category.subTabs)) {
        category.subTabs.forEach((subTab) => {
          subTab.fields.forEach((field) => {
            metadataMap[field.id] = {
              categoryTitle: category.title,
              subSectionTitle: subTab.title,
              fieldLabel: field.label
            };
          });
        });
      } else if (category.fields && Array.isArray(category.fields)) {
        category.fields.forEach((field) => {
          metadataMap[field.id] = {
            categoryTitle: category.title,
            subSectionTitle: 'General',
            fieldLabel: field.label
          };
        });
      }
    });

    return metadataMap;
  }

  const fieldMetadataMap = buildFieldMetadataMap();

  function getFieldMetadata(fieldId) {
    return fieldMetadataMap[fieldId] || {
      categoryTitle: 'Other',
      subSectionTitle: 'General',
      fieldLabel: fieldId
    };
  }

  function getPlainFieldValue(value) {
    return typeof value === 'string' ? value.replace(/<[^>]*>/g, '').trim() : value;
  }

  function buildRecordContentsHTML(data) {
    return data
      .map((record, recordIdx) => {
        const grouped = {};

        Object.entries(record).forEach(([fieldId, value]) => {
          const meta = getFieldMetadata(fieldId);
          if (!grouped[meta.categoryTitle]) grouped[meta.categoryTitle] = {};
          if (!grouped[meta.categoryTitle][meta.subSectionTitle]) grouped[meta.categoryTitle][meta.subSectionTitle] = [];
          grouped[meta.categoryTitle][meta.subSectionTitle].push({
            fieldId,
            fieldLabel: meta.fieldLabel,
            value
          });
        });

        const catTabs = Object.keys(grouped)
          .map(
            (cat, idx) =>
              `<button class="dg-category-tab ${idx === 0 ? "active" : ""}" data-category="${recordIdx}-${cat}">${cat}</button>`,
          )
          .join("");

        const catContents = Object.entries(grouped)
          .map(
            ([cat, subSections], idx) => `
        <div class="dg-category-content ${idx === 0 ? "active" : ""}" data-category-content="${recordIdx}-${cat}">
          ${Object.entries(subSections).map(([subSection, fields]) => `
            <div class="dg-subsection-group">
              <div class="dg-subsection-title">${subSection}</div>
              ${fields.map(({ fieldId, fieldLabel, value }) => {
                const plainValue = getPlainFieldValue(value);
                return `<div class="dg-record-field"><span class="dg-record-label">${fieldLabel} <span class="dg-record-key">[${fieldId}]</span></span><span class="dg-field-value" data-value="${plainValue}">${value}</span></div>`;
              }).join("")}
            </div>
          `).join("")}
        </div>
      `,
          )
          .join("");

        return `
        <div class="dg-record-content ${recordIdx === 0 ? "active" : ""}" data-record-content="${recordIdx}">
          <div class="dg-category-tabs">${catTabs}</div>
          <div class="dg-category-contents">${catContents}</div>
        </div>
      `;
      })
      .join("");
  }

  function updateResultsCounter(recordCount = 0, fileCount = 0) {
    const counterEl = document.getElementById("resultsCounter");
    if (!counterEl) return;
    const total = (recordCount || 0) + (fileCount || 0);
    counterEl.textContent = `${total} item${total === 1 ? "" : "s"}`;
  }

  function displayGeneratedData(data, files) {
    const resultsDiv = document.getElementById("results");
    let resultsHTML = "";

    // Show regular data section
    if (data.length > 0) {
      const recordTabs = data.map((_, idx) =>
        `<button class="dg-record-tab ${idx === 0 ? "active" : ""}" data-record="${idx}">Record ${idx + 1}</button>`
      ).join("");
      
      const recordContents = buildRecordContentsHTML(data);

      resultsHTML = `<div class="dg-record-tabs">${recordTabs}</div><div class="dg-record-contents">${recordContents}</div>`;
    }

    // Show files section
    if (files && files.length > 0) {
      const filesHTML = `
        <div class="dg-files-section" style="margin-top: ${data.length > 0 ? "20px" : "0"};">
          <div class="dg-files-section-header">
            <div class="dg-files-section-title">📁 Generated Files</div>
            <div class="dg-files-section-count">${files.length} file${files.length > 1 ? "s" : ""}</div>
          </div>
          <div class="dg-files-list">
            ${files
              .map(
                (file, idx) => `
              <div class="dg-file-item">
                <div class="dg-file-item-main">
                  <div class="dg-file-item-name">${file.fileName}</div>
                  <div class="dg-file-item-tags">
                    <span class="dg-file-tag">${file.fileType.toUpperCase()}</span>
                    <span class="dg-file-tag">${file.fileSize}</span>
                    ${file.dimensions ? `<span class="dg-file-tag">${file.dimensions}</span>` : ""}
                  </div>
                  <div class="dg-file-item-meta">Ready to download</div>
                </div>
                <button class="dg-download-file-btn" data-file-idx="${idx}">Download</button>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      `;
      resultsHTML += filesHTML;
    }

    resultsDiv.innerHTML = resultsHTML;
    updateResultsCounter(data.length, (files && files.length) || 0);
    attachResultsEventListeners();
  }

  function attachResultsEventListeners() {
    // Record tabs
    document.querySelectorAll(".dg-record-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const recordIdx = tab.dataset.record;
        document.querySelectorAll(".dg-record-tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".dg-record-content").forEach((c) => c.classList.remove("active"));
        tab.classList.add("active");
        document.querySelector(`.dg-record-content[data-record-content="${recordIdx}"]`).classList.add("active");
      });
    });

    // Category tabs
    document.querySelectorAll(".dg-category-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const catKey = tab.dataset.category;
        const recordIdx = catKey.split("-")[0];
        document.querySelectorAll(`.dg-record-content[data-record-content="${recordIdx}"] .dg-category-tab`).forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(`.dg-record-content[data-record-content="${recordIdx}"] .dg-category-content`).forEach((c) => c.classList.remove("active"));
        tab.classList.add("active");
        document.querySelector(`.dg-category-content[data-category-content="${catKey}"]`).classList.add("active");
      });
    });

    // Field values
    document.querySelectorAll(".dg-field-value").forEach((el) => {
      el.addEventListener("click", function (e) {
        if (e.target.tagName === 'CODE') return;
        const value = this.getAttribute("data-value");
        navigator.clipboard.writeText(value).then(() => {
          const original = this.textContent;
          this.textContent = "Copied!";
          setTimeout(() => (this.textContent = original), 800);
        });
      });
    });

    // Code blocks
    document.querySelectorAll(".dg-field-value code").forEach((codeEl) => {
      codeEl.addEventListener("click", function (e) {
        e.stopPropagation();
        const textContent = this.textContent.trim();
        navigator.clipboard.writeText(textContent).then(() => {
          const original = this.textContent;
          this.textContent = "Copied!";
          setTimeout(() => (this.textContent = original), 500);
        });
      });
    });
  }

  // Reset all button
  document.getElementById("resetAllBtn").addEventListener("click", () => {
    if (confirm("Reset all data? This will clear selections and generated data.")) {
      // Clear checkboxes
      document.querySelectorAll(".dg-checkbox input").forEach((cb) => cb.checked = false);
      document.querySelectorAll(".dg-section-checkbox").forEach((cb) => {
        cb.checked = false;
        cb.indeterminate = false;
      });
      // Clear results
      document.getElementById("results").innerHTML = "";
      updateResultsCounter(0, 0);
      generatedData = [];
      // Clear storage
      chrome.storage.local.clear();
    }
  });

  // Restore state on load
  restoreCheckboxState();
  restoreGeneratedData();

  // Save state whenever checkboxes change
  document.querySelectorAll(".dg-checkbox input").forEach((cb) => {
    cb.addEventListener("change", saveCheckboxState);
  });

  document.querySelectorAll(".dg-section-checkbox").forEach((cb) => {
    cb.addEventListener("change", saveCheckboxState);
  });

  document
    .querySelectorAll(".dg-select-all-categories")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".dg-tab-content")
          .forEach((tabContent) => {
            const tabBtn = document.querySelector(`.dg-tab[data-tab="${tabContent.dataset.content}"]`);
            if (tabBtn && !tabBtn.textContent.includes("Files")) {
              tabContent.querySelectorAll(".dg-checkbox input").forEach((c) => (c.checked = true));
            }
          });
      });
    });

  document
    .querySelectorAll(".dg-unselect-all-categories")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".dg-tab-content")
          .forEach((tabContent) => {
            const tabBtn = document.querySelector(`.dg-tab[data-tab="${tabContent.dataset.content}"]`);
            if (tabBtn && !tabBtn.textContent.includes("Files")) {
              tabContent.querySelectorAll(".dg-checkbox input").forEach((c) => (c.checked = false));
            }
          });
      });
    });

  document.querySelectorAll(".dg-select-all").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabIdx = btn.dataset.tab;
      if (tabIdx === "current") {
        // Get currently active tab and select ALL checkboxes in that tab
        const activeTab = document.querySelector(".dg-tab.active");
        if (activeTab) {
          const currentTabIdx = activeTab.dataset.tab;
          document
            .querySelectorAll(`[data-content="${currentTabIdx}"] .dg-checkbox input`)
            .forEach((c) => (c.checked = true));
        }
      } else {
        document
          .querySelectorAll(`[data-content="${tabIdx}"] .dg-checkbox input`)
          .forEach((c) => (c.checked = true));
      }
    });
  });

  document.querySelectorAll(".dg-unselect-all").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabIdx = btn.dataset.tab;
      if (tabIdx === "current") {
        // Get currently active tab and unselect ALL checkboxes in that tab (all sub-tabs)
        const activeTab = document.querySelector(".dg-tab.active");
        if (activeTab) {
          const currentTabIdx = activeTab.dataset.tab;
          document
            .querySelectorAll(`[data-content="${currentTabIdx}"] .dg-checkbox input`)
            .forEach((c) => (c.checked = false));
        }
      } else {
        document
          .querySelectorAll(`[data-content="${tabIdx}"] .dg-checkbox input`)
          .forEach((c) => (c.checked = false));
      }
    });
  });

  // Sub-tab select/unselect handlers removed - no longer needed with flattened structure

  // Search functionality
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const searchClear = document.getElementById("searchClear");
  const searchIcon = document.getElementById("searchIcon");

  // Section checkbox functionality
  document.querySelectorAll(".dg-section-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function(e) {
      e.stopPropagation();
      const sectionId = this.dataset.section;
      const fieldsWrapper = document.querySelector(`[data-section-fields="${sectionId}"]`);
      if (fieldsWrapper) {
        fieldsWrapper.querySelectorAll(".dg-checkbox input").forEach((input) => {
          input.checked = this.checked;
        });
      }
    });
  });

  // Update section checkbox when individual checkboxes change
  document.querySelectorAll(".dg-fields-wrapper").forEach((wrapper) => {
    const sectionId = wrapper.dataset.sectionFields;
    if (sectionId) {
      wrapper.addEventListener("change", function() {
        const sectionCheckbox = document.querySelector(`.dg-section-checkbox[data-section="${sectionId}"]`);
        if (sectionCheckbox) {
          const allCheckboxes = wrapper.querySelectorAll(".dg-checkbox input");
          const checkedCount = wrapper.querySelectorAll(".dg-checkbox input:checked").length;
          sectionCheckbox.checked = checkedCount === allCheckboxes.length;
          sectionCheckbox.indeterminate = checkedCount > 0 && checkedCount < allCheckboxes.length;
        }
      });
    }
  });

  function createSearchIndex() {
    const searchIndex = [];
    sortedCategories.forEach((category, categoryIndex) => {
      if (category.subTabs) {
        // Handle categories with sub-tabs
        category.subTabs.forEach((subTab, subTabIndex) => {
          subTab.fields.forEach((field) => {
            searchIndex.push({
              categoryIndex,
              subTabIndex,
              categoryTitle: category.title,
              subTabTitle: subTab.title,
              fieldId: field.id,
              fieldLabel: field.label,
              searchText:
                `${category.title} ${subTab.title} ${field.label} ${field.id}`.toLowerCase(),
            });
          });
        });
      } else {
        // Handle legacy categories without sub-tabs
        category.fields.forEach((field) => {
          searchIndex.push({
            categoryIndex,
            categoryTitle: category.title,
            fieldId: field.id,
            fieldLabel: field.label,
            searchText:
              `${category.title} ${field.label} ${field.id}`.toLowerCase(),
          });
        });
      }
    });
    return searchIndex;
  }

  const searchIndex = createSearchIndex();

  function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    return text.replace(regex, '<span class="dg-search-highlight">$1</span>');
  }

  function performSearch(query) {
    if (!query || query.length < 2) {
      searchResults.style.display = "none";
      return;
    }

    const results = searchIndex
      .filter((item) => item.searchText.includes(query.toLowerCase()))
      .slice(0, 10);

    if (results.length === 0) {
      searchResults.innerHTML =
        '<div class="dg-search-result">No results found</div>';
    } else {
      searchResults.innerHTML = results
        .map(
          (result) => `
        <div class="dg-search-result" data-category="${result.categoryIndex}" data-sub-tab="${result.subTabIndex || ''}" data-field="${result.fieldId}">
          <div class="dg-search-category">${highlightText(result.categoryTitle, query)}${result.subTabTitle ? ` → ${highlightText(result.subTabTitle, query)}` : ''}</div>
          <div class="dg-search-field">${highlightText(result.fieldLabel, query)}</div>
        </div>
      `,
        )
        .join("");
    }

    searchResults.style.display = "block";
  }

  function selectSearchResult(categoryIndex, fieldId, subTabIndex = null) {
    // Switch to the category tab
    document
      .querySelectorAll(".dg-tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".dg-tab-content")
      .forEach((c) => c.classList.remove("active"));

    const targetTab = document.querySelector(`[data-tab="${categoryIndex}"]`);
    const targetContent = document.querySelector(
      `[data-content="${categoryIndex}"]`,
    );

    if (targetTab && targetContent) {
      targetTab.classList.add("active");
      targetContent.classList.add("active");

      // Sub-tab navigation removed - fields are now all visible in flattened structure

      // Show/hide controls based on category
      const category = categories[categoryIndex];
      const categoryTitle = category.title;
      const isFilesTab = categoryTitle === "Files";
      const isDateTimeTab = categoryTitle === "Date & Time";
      const isRandomValuesTab = categoryTitle === "Random Values";
      const isRandomTextTab = categoryTitle === "Random Text";
      const isEmailTestingTab = categoryTitle === "Email Testing";
      const isPasswordTestingTab = categoryTitle === "Password Testing";
      const isPhoneTestingTab = categoryTitle === "Phone Testing";
      const isSecurityTestingTab = categoryTitle === "Security Testing";
      const isColorsTab = categoryTitle === "Colors";

      const fileControls = document.getElementById("fileControls");
      const dateTimeControls = document.getElementById("dateTimeControls");
      const randomValuesControls = document.getElementById(
        "randomValuesControls",
      );
      const randomTextControls = document.getElementById("randomTextControls");
      const emailControls = document.getElementById("emailControls");
      const passwordControls = document.getElementById("passwordControls");
      const phoneControls = document.getElementById("phoneControls");
      const securityControls = document.getElementById("securityControls");
      const colorControls = document.getElementById("colorControls");
      const downloadBtn = document.getElementById("downloadBtn");

      if (fileControls) fileControls.classList.toggle("active", isFilesTab);
      if (dateTimeControls)
        dateTimeControls.classList.toggle("active", isDateTimeTab);
      if (randomValuesControls)
        randomValuesControls.classList.toggle("active", isRandomValuesTab);
      if (randomTextControls)
        randomTextControls.classList.toggle("active", isRandomTextTab);
      if (emailControls)
        emailControls.classList.toggle("active", isEmailTestingTab);
      if (passwordControls)
        passwordControls.classList.toggle("active", isPasswordTestingTab);
      if (phoneControls)
        phoneControls.classList.toggle("active", isPhoneTestingTab);
      if (securityControls)
        securityControls.classList.toggle("active", isSecurityTestingTab);
      if (colorControls)
        colorControls.classList.toggle("active", isColorsTab);
      if (downloadBtn)
        downloadBtn.style.display = isFilesTab ? "inline-block" : "none";
    }

    // Only highlight and check field if it's a specific field search, not category search
    const searchQuery = searchInput.value.toLowerCase().trim();
    const categoryTitle = categories[categoryIndex].title.toLowerCase();

    // If search query matches category name, don't select any field
    if (searchQuery === categoryTitle || categoryTitle.includes(searchQuery)) {
      // Just navigate to tab, don't select any field
    } else {
      // Highlight and check the specific field
      const fieldCheckbox = document.querySelector(`input[value="${fieldId}"]`);
      if (fieldCheckbox) {
        fieldCheckbox.checked = true;
        fieldCheckbox.closest(".dg-checkbox").style.background = "#e0e7ff";
        fieldCheckbox.closest(".dg-checkbox").style.borderColor = "#667eea";

        // Scroll to the field
        fieldCheckbox.scrollIntoView({ behavior: "smooth", block: "center" });

        // Remove highlight after 2 seconds
        setTimeout(() => {
          fieldCheckbox.closest(".dg-checkbox").style.background = "";
          fieldCheckbox.closest(".dg-checkbox").style.borderColor = "";
        }, 2000);
      }
    }

    // Clear search
    searchInput.value = "";
    searchResults.style.display = "none";
    searchClear.style.display = "none";
    searchIcon.style.display = "block";
  }

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    performSearch(query);

    if (query) {
      searchClear.style.display = "block";
      searchIcon.style.display = "none";
    } else {
      searchClear.style.display = "none";
      searchIcon.style.display = "block";
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchInput.value = "";
      searchResults.style.display = "none";
      searchClear.style.display = "none";
      searchIcon.style.display = "block";
      searchInput.blur();
    }
  });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchResults.style.display = "none";
    searchClear.style.display = "none";
    searchIcon.style.display = "block";
    searchInput.focus();
  });

  searchResults.addEventListener("click", (e) => {
    const resultItem = e.target.closest(".dg-search-result");
    if (resultItem) {
      const categoryIndex = parseInt(resultItem.dataset.category);
      const fieldId = resultItem.dataset.field;
      const subTabIndex = resultItem.dataset.subTab ? parseInt(resultItem.dataset.subTab) : null;
      selectSearchResult(categoryIndex, fieldId, subTabIndex);
    }
  });

  // Hide search results when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dg-search")) {
      searchResults.style.display = "none";
    }
  });

  // Handle custom domain toggle
  document.addEventListener("change", function (e) {
    if (e.target && e.target.id === "emailDomain") {
      const customDomainGroup = document.getElementById("customDomainGroup");
      if (customDomainGroup) {
        if (e.target.value === "custom") {
          customDomainGroup.style.display = "block";
          // Focus on custom domain input
          const customDomainInput = document.getElementById("customDomain");
          if (customDomainInput) {
            setTimeout(() => customDomainInput.focus(), 100);
          }
        } else {
          customDomainGroup.style.display = "none";
        }
      }
    }
  });

  const controlsHeaderEl = document.getElementById("controlsHeader");
  if (controlsHeaderEl) {
    controlsHeaderEl.addEventListener("click", () => {
      const controlsSection = document.getElementById("controlsSection");
      if (controlsSection) controlsSection.classList.toggle("collapsed");
    });
  }

  const resultsHeaderEl = document.getElementById("resultsHeader");
  if (resultsHeaderEl) {
    resultsHeaderEl.addEventListener("click", () => {
      const resultsSection = document.getElementById("resultsSection");
      if (resultsSection) resultsSection.classList.toggle("collapsed");
    });
  }

  // Image dimension controls event handlers
  const imageWidthInput = document.getElementById("imageWidth");
  const imageHeightInput = document.getElementById("imageHeight");
  const currentDimensionsDisplay = document.getElementById("currentDimensions");
  
  function updateImageDimensions() {
    const width = parseInt(imageWidthInput.value) || 400;
    const height = parseInt(imageHeightInput.value) || 300;
    if (typeof setImageDimensions === 'function') {
      setImageDimensions(width, height);
    }
    updateCurrentDimensionsDisplay(width, height);
  }
  
  function updateCurrentDimensionsDisplay(width, height) {
    if (currentDimensionsDisplay) {
      // Calculate aspect ratio
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
      const divisor = gcd(width, height);
      const aspectRatio = `${width / divisor}:${height / divisor}`;
      
      currentDimensionsDisplay.textContent = `Current: ${width} × ${height} px (${aspectRatio} ratio)`;
    }
  }
  
  if (imageWidthInput) {
    imageWidthInput.addEventListener("input", updateImageDimensions);
  }
  
  if (imageHeightInput) {
    imageHeightInput.addEventListener("input", updateImageDimensions);
  }
  
  // Preset dimension buttons
  document.querySelectorAll(".dg-preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const [width, height] = btn.dataset.size.split(',');
      imageWidthInput.value = width;
      imageHeightInput.value = height;
      updateImageDimensions();
    });
  });
  
  // Aspect ratio buttons
  document.querySelectorAll(".dg-aspect-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const ratio = btn.dataset.ratio;
      const baseSize = parseInt(btn.dataset.base) || 400;
      
      let width, height;
      switch(ratio) {
        case "1:1":
          width = height = baseSize;
          break;
        case "4:3":
          width = baseSize;
          height = Math.round(baseSize * 3 / 4);
          break;
        case "16:9":
          width = baseSize;
          height = Math.round(baseSize * 9 / 16);
          break;
        case "3:2":
          width = baseSize;
          height = Math.round(baseSize * 2 / 3);
          break;
        case "21:9":
          width = baseSize;
          height = Math.round(baseSize * 9 / 21);
          break;
        default:
          width = height = baseSize;
      }
      
      imageWidthInput.value = width;
      imageHeightInput.value = height;
      updateImageDimensions();
    });
  });

  // Dynamic file size calculation based on image dimensions
  function calculateFileSizeFromDimensions(width, height) {
    // Rough estimate: ~3 bytes per pixel for compressed images
    const pixels = width * height;
    const bytes = pixels * 3;
    const kb = Math.round(bytes / 1024);
    return kb;
  }

  function calculateDimensionsFromFileSize(sizeKB) {
    // Rough estimate: assuming square image at ~3 bytes per pixel
    const bytes = sizeKB * 1024;
    const pixels = bytes / 3;
    const dimension = Math.round(Math.sqrt(pixels));
    return dimension;
  }

  // Add event listeners for dynamic updates
  const imageWidthEl = document.getElementById("imageWidth");
  const imageHeightEl = document.getElementById("imageHeight");
  const fileSizeEl = document.getElementById("fileSize");
  const fileSizeUnitEl = document.getElementById("fileSizeUnit");

  if (imageWidthEl && imageHeightEl && fileSizeEl) {
    // Update file size when dimensions change
    function updateFileSizeFromDimensions() {
      const width = parseInt(imageWidthEl.value) || 800;
      const height = parseInt(imageHeightEl.value) || 600;
      const estimatedKB = calculateFileSizeFromDimensions(width, height);
      
      if (fileSizeUnitEl.value === "KB") {
        fileSizeEl.value = estimatedKB;
      } else if (fileSizeUnitEl.value === "MB") {
        fileSizeEl.value = (estimatedKB / 1024).toFixed(2);
      }
    }

    // Update dimensions when file size changes
    function updateDimensionsFromFileSize() {
      let sizeKB = parseInt(fileSizeEl.value) || 10;
      if (fileSizeUnitEl.value === "MB") {
        sizeKB = sizeKB * 1024;
      } else if (fileSizeUnitEl.value === "GB") {
        sizeKB = sizeKB * 1024 * 1024;
      }
      
      const dimension = calculateDimensionsFromFileSize(sizeKB);
      imageWidthEl.value = dimension;
      imageHeightEl.value = dimension;
    }

    imageWidthEl.addEventListener("input", updateFileSizeFromDimensions);
    imageHeightEl.addEventListener("input", updateFileSizeFromDimensions);
    fileSizeEl.addEventListener("input", updateDimensionsFromFileSize);
    fileSizeUnitEl.addEventListener("change", updateDimensionsFromFileSize);
  }

  // Color converter functionality
  const convertColorBtn = document.getElementById("convertColorBtn");
  if (convertColorBtn) {
    convertColorBtn.addEventListener("click", () => {
      const colorInput = document.getElementById("colorInput").value.trim();
      const outputType = document.getElementById("colorOutputType").value;
      const resultDiv = document.getElementById("colorConversionResult");
      
      if (!colorInput) {
        resultDiv.innerHTML = '<div style="color: #ef4444;">❌ Please enter a color value</div>';
        return;
      }

      if (!window.colorConverter) {
        resultDiv.innerHTML = '<div style="color: #ef4444;">❌ Color converter not loaded</div>';
        return;
      }

      try {
        const converted = window.colorConverter.convertColor(colorInput);
        if (!converted) {
          resultDiv.innerHTML = '<div style="color: #ef4444;">❌ Invalid color format. Try: #FF5733, rgb(255,87,51), or hsl(9,100%,60%)</div>';
          return;
        }

        let resultHTML = '';
        
        if (outputType === 'all') {
          resultHTML = `
            <div style="font-weight: 600; margin-bottom: 8px; color: #1e293b;">✅ All Formats:</div>
            <div style="display: grid; gap: 6px;">
              <div><strong>HEX:</strong> <code class="color-copy-value" data-value="${converted.hex}" style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; cursor: pointer;">${converted.hex}</code></div>
              <div><strong>RGB:</strong> <code class="color-copy-value" data-value="${converted.rgb}" style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; cursor: pointer;">${converted.rgb}</code></div>
              <div><strong>RGBA:</strong> <code class="color-copy-value" data-value="${converted.rgba}" style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; cursor: pointer;">${converted.rgba}</code></div>
              <div><strong>HSL:</strong> <code class="color-copy-value" data-value="${converted.hsl}" style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; cursor: pointer;">${converted.hsl}</code></div>
              <div><strong>HSLA:</strong> <code class="color-copy-value" data-value="${converted.hsla}" style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; cursor: pointer;">${converted.hsla}</code></div>
              <div><strong>HSV:</strong> <code class="color-copy-value" data-value="${converted.hsv}" style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; cursor: pointer;">${converted.hsv}</code></div>
              <div><strong>CMYK:</strong> <code class="color-copy-value" data-value="${converted.cmyk}" style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; cursor: pointer;">${converted.cmyk}</code></div>
              <div style="margin-top: 8px; padding: 20px; background: ${converted.hex}; border-radius: 6px; text-align: center; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.3); font-weight: 600;">Color Preview</div>
            </div>
          `;
        } else {
          const value = converted[outputType];
          resultHTML = `
            <div style="font-weight: 600; margin-bottom: 8px; color: #1e293b;">✅ Converted to ${outputType.toUpperCase()}:</div>
            <div class="color-copy-value" data-value="${value}" style="font-size: 18px; font-weight: 600; padding: 12px; background: #e2e8f0; border-radius: 6px; cursor: pointer; text-align: center;">${value}</div>
            <div style="margin-top: 8px; padding: 20px; background: ${converted.hex}; border-radius: 6px; text-align: center; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.3); font-weight: 600;">Color Preview</div>
            <div style="margin-top: 8px; font-size: 11px; color: #64748b; text-align: center;">💡 Click values to copy</div>
          `;
        }
        
        resultDiv.innerHTML = resultHTML;
        
        // Add event listeners for copy
        document.querySelectorAll('.color-copy-value').forEach(el => {
          el.addEventListener('click', function() {
            navigator.clipboard.writeText(this.dataset.value);
          });
        });
      } catch (error) {
        resultDiv.innerHTML = `<div style="color: #ef4444;">❌ Error: ${error.message}</div>`;
      }
    });
  }

  document.getElementById("generateBtn").addEventListener("click", () => {
    if (!window.generators || Object.keys(window.generators).length === 0) {
      alert("Generators not loaded");
      return;
    }

    const count = parseInt(document.getElementById("recordCount").value) || 1;
    const checked = Array.from(document.querySelectorAll(".dg-checkbox input"))
      .filter((c) => c.checked)
      .map((c) => c.value);

    if (checked.length === 0) {
      alert("Please select at least one field");
      return;
    }

    // Check if any file types are selected
    const fileTypes = [
      "txt", "pdf", "doc", "docx", "rtf", "md",
      "xlsx", "xls", "csv", "json", "xml", "yaml", "yml", "toml",
      "html", "css", "js", "py", "java", "cpp", "sql",
      "jpg", "png", "gif", "svg", "bmp", "webp", "ico",
      "zip", "rar", "tar", "gz",
      "mp4", "avi", "mov", "mp3", "wav"
    ];
    const selectedFileTypes = checked.filter((field) =>
      fileTypes.includes(field),
    );
    const regularFields = checked.filter((field) =>
      !fileTypes.includes(field),
    );

    // Generate regular data
    generatedData = [];
    let generatedFiles = [];
    
    if (regularFields.length > 0) {
      for (let i = 0; i < count; i++) {
        if (window.resetSharedData) window.resetSharedData();
        const record = {};
        regularFields.forEach((fieldId) => {
          if (window.generators[fieldId]) {
            try {
              record[fieldId] = window.generators[fieldId]();
            } catch (e) {
              record[fieldId] = "Error";
            }
          }
        });
        generatedData.push(record);
      }
    }

    // Generate files separately
    if (selectedFileTypes.length > 0) {
      const fileName = document.getElementById("fileName")?.value || "test-file";
      const fileSize = parseInt(document.getElementById("fileSize")?.value) || 10;
      const fileSizeUnit = document.getElementById("fileSizeUnit")?.value || "KB";
      const imageWidth = parseInt(document.getElementById("imageWidth")?.value) || 800;
      const imageHeight = parseInt(document.getElementById("imageHeight")?.value) || 600;

      // Set image dimensions for generators
      if (window.setImageDimensions) {
        window.setImageDimensions(imageWidth, imageHeight);
      }

      selectedFileTypes.forEach((fileType) => {
        const isImage = ['jpg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'].includes(fileType);
        generatedFiles.push({
          fileName: `${fileName}.${fileType}`,
          fileType: fileType,
          fileSize: `${fileSize} ${fileSizeUnit}`,
          dimensions: isImage ? `${imageWidth}×${imageHeight}` : null,
          generated: new Date().toISOString(),
        });
      });
    }

    const resultsDiv = document.getElementById("results");
    let resultsHTML = "";

    // Show regular data section
    if (generatedData.length > 0) {
    const recordTabs = generatedData
      .map(
        (_, idx) =>
          `<button class="dg-record-tab ${idx === 0 ? "active" : ""}" data-record="${idx}">Record ${idx + 1}</button>`,
      )
      .join("");
    const recordContents = buildRecordContentsHTML(generatedData);

    resultsHTML = `<div class="dg-record-tabs">${recordTabs}</div><div class="dg-record-contents">${recordContents}</div>`;
    }

    // Show files section
    if (generatedFiles.length > 0) {
      const filesHTML = `
        <div class="dg-files-section" style="margin-top: ${generatedData.length > 0 ? "20px" : "0"};">
          <div class="dg-files-section-header">
            <div class="dg-files-section-title">📁 Generated Files</div>
            <div class="dg-files-section-count">${generatedFiles.length} file${generatedFiles.length > 1 ? "s" : ""}</div>
          </div>
          <div class="dg-files-list">
            ${generatedFiles
              .map(
                (file, idx) => `
              <div class="dg-file-item">
                <div class="dg-file-item-main">
                  <div class="dg-file-item-name">${file.fileName}</div>
                  <div class="dg-file-item-tags">
                    <span class="dg-file-tag">${file.fileType.toUpperCase()}</span>
                    <span class="dg-file-tag">${file.fileSize}</span>
                    ${file.dimensions ? `<span class="dg-file-tag">${file.dimensions}</span>` : ""}
                  </div>
                  <div class="dg-file-item-meta">Ready to download</div>
                </div>
                <button class="dg-download-file-btn" data-file-idx="${idx}">Download</button>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      `;
      resultsHTML += filesHTML;
    }

    resultsDiv.innerHTML = resultsHTML;
    updateResultsCounter(generatedData.length, generatedFiles.length);

    // Save generated data
    saveGeneratedData(generatedData, generatedFiles);

    // Add event listeners for regular data tabs
    if (generatedData.length > 0) {

    document.querySelectorAll(".dg-record-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const recordIdx = tab.dataset.record;
        document
          .querySelectorAll(".dg-record-tab")
          .forEach((t) => t.classList.remove("active"));
        document
          .querySelectorAll(".dg-record-content")
          .forEach((c) => c.classList.remove("active"));
        tab.classList.add("active");
        document
          .querySelector(
            `.dg-record-content[data-record-content="${recordIdx}"]`,
          )
          .classList.add("active");
      });
    });

    document.querySelectorAll(".dg-category-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const catKey = tab.dataset.category;
        const recordIdx = catKey.split("-")[0];
        document
          .querySelectorAll(
            `.dg-record-content[data-record-content="${recordIdx}"] .dg-category-tab`,
          )
          .forEach((t) => t.classList.remove("active"));
        document
          .querySelectorAll(
            `.dg-record-content[data-record-content="${recordIdx}"] .dg-category-content`,
          )
          .forEach((c) => c.classList.remove("active"));
        tab.classList.add("active");
        document
          .querySelector(
            `.dg-category-content[data-category-content="${catKey}"]`,
          )
          .classList.add("active");
      });
    });

    document.querySelectorAll(".dg-field-value").forEach((el) => {
      el.addEventListener("click", function (e) {
        // Don't copy if clicking on a code element (color converter values)
        if (e.target.tagName === 'CODE') {
          return;
        }
        
        const value = this.getAttribute("data-value");
        navigator.clipboard.writeText(value).then(() => {
          const original = this.textContent;
          this.textContent = "Copied!";
          setTimeout(() => (this.textContent = original), 800);
        });
      });
    });

    // Add click handlers for color converter code blocks
    document.querySelectorAll(".dg-field-value code").forEach((codeEl) => {
      codeEl.addEventListener("click", function (e) {
        e.stopPropagation();
        const textContent = this.textContent.trim();
        navigator.clipboard.writeText(textContent).then(() => {
          const original = this.textContent;
          this.textContent = "Copied!";
          setTimeout(() => (this.textContent = original), 500);
        });
      });
    });
    }

    // Helper function to download a single file
    function downloadSingleFile(file) {
      const fileType = file.fileType;
      const isImage = ['jpg', 'png', 'gif', 'webp', 'bmp', 'ico'].includes(fileType);

      // Handle image files
      if (isImage && file.dimensions) {
        const [width, height] = file.dimensions.split('×').map(d => parseInt(d));
        const targetSize = parseInt(file.fileSize) * (file.fileSize.includes('KB') ? 1024 : file.fileSize.includes('MB') ? 1024*1024 : 1);
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add text
        ctx.fillStyle = 'white';
        ctx.font = `${Math.min(width, height) / 10}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${width}×${height}`, width / 2, height / 2);
        
        // Export and pad to exact size
        const mimeType = `image/${fileType === 'jpg' ? 'jpeg' : fileType}`;
        canvas.toBlob((imageBlob) => {
          // Pad the blob to match target size
          const reader = new FileReader();
          reader.onload = function() {
            const imageBytes = new Uint8Array(reader.result);
            let finalBytes;
            
            if (imageBlob.size < targetSize) {
              // Pad with random data to reach target size
              finalBytes = new Uint8Array(targetSize);
              finalBytes.set(imageBytes, 0);
              // Fill rest with random bytes
              for (let i = imageBytes.length; i < targetSize; i++) {
                finalBytes[i] = Math.floor(Math.random() * 256);
              }
            } else {
              // Truncate if too large
              finalBytes = imageBytes.slice(0, targetSize);
            }
            
            const finalBlob = new Blob([finalBytes], { type: mimeType });
            const url = URL.createObjectURL(finalBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.fileName;
            a.click();
            URL.revokeObjectURL(url);
          };
          reader.readAsArrayBuffer(imageBlob);
        }, mimeType, 0.92);
        return;
      }

      // Handle text files
      const fileSizeBytes = parseInt(file.fileSize) * (file.fileSize.includes('KB') ? 1024 : file.fileSize.includes('MB') ? 1024*1024 : 1);
      let content = "";
      let mimeType = "text/plain";

      if (fileType === "json") {
        content = JSON.stringify({ message: "Test JSON file", generated: file.generated }, null, 2);
        mimeType = "application/json";
      } else if (fileType === "csv") {
        content = "Name,Email,Phone\nJohn Doe,john@example.com,+1234567890";
        mimeType = "text/csv";
      } else if (fileType === "xml") {
        content = `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n  <message>Test XML file</message>\n  <generated>${file.generated}</generated>\n</data>`;
        mimeType = "application/xml";
      } else if (fileType === "html") {
        content = `<!DOCTYPE html><html><head><title>Test</title></head><body><h1>Test HTML</h1><p>Generated: ${file.generated}</p></body></html>`;
        mimeType = "text/html";
      } else if (fileType === "txt") {
        content = `Test text file\nGenerated: ${file.generated}`;
        mimeType = "text/plain";
      } else {
        content = `Binary file placeholder for ${fileType}`;
      }

      // Pad content to match file size
      while (content.length < fileSizeBytes) {
        content += content;
      }
      content = content.substring(0, fileSizeBytes);

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.fileName;
      a.click();
      URL.revokeObjectURL(url);
    }

    // Add event listeners for file downloads
    if (generatedFiles.length > 0) {
      document.querySelectorAll(".dg-download-file-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const fileIdx = parseInt(this.getAttribute("data-file-idx"));
          const file = generatedFiles[fileIdx];
          downloadSingleFile(file);
        });
      });
    }
  });

  document.getElementById("copyBtn").addEventListener("click", () => {
    if (generatedData.length === 0) {
      alert("Generate data first");
      return;
    }
    navigator.clipboard
      .writeText(JSON.stringify(generatedData, null, 2))
      .then(() => {
        const btn = document.getElementById("copyBtn");
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = originalText), 1000);
      });
  });

  document.getElementById("downloadBtn").addEventListener("click", () => {
    if (generatedData.length === 0) {
      alert("Generate files first");
      return;
    }

    // Check if we have file data
    const hasFileData = generatedData.some((record) => record.fileType);
    if (!hasFileData) {
      alert("No files generated. Please select file types and generate first.");
      return;
    }

    const fileName = document.getElementById("fileName").value || "test-file";
    const fileSize = parseInt(document.getElementById("fileSize").value) || 10;
    const fileSizeUnit = document.getElementById("fileSizeUnit").value;

    let fileSizeBytes = fileSize;
    if (fileSizeUnit === "KB") fileSizeBytes = fileSize * 1024;
    else if (fileSizeUnit === "MB") fileSizeBytes = fileSize * 1024 * 1024;
    else if (fileSizeUnit === "GB")
      fileSizeBytes = fileSize * 1024 * 1024 * 1024;

    // Download each generated file
    generatedData.forEach((record) => {
      if (!record.fileType) return;

      const fileType = record.fileType;
      let content = "";
      let mimeType = "text/plain";

      if (fileType === "json") {
        content = JSON.stringify(
          { message: "Test JSON file", generated: new Date().toISOString() },
          null,
          2,
        );
        mimeType = "application/json";
      } else if (fileType === "csv") {
        content =
          "Name,Email,Phone\nJohn Doe,john@example.com,+1234567890\nJane Smith,jane@example.com,+0987654321";
        mimeType = "text/csv";
      } else if (fileType === "xml") {
        content =
          '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n  <message>Test XML file</message>\n  <generated>' +
          new Date().toISOString() +
          "</generated>\n</data>";
        mimeType = "application/xml";
      } else if (fileType === "html") {
        content =
          "<!DOCTYPE html><html><head><title>Test HTML</title></head><body><h1>Test HTML File</h1><p>Generated: " +
          new Date().toISOString() +
          "</p></body></html>";
        mimeType = "text/html";
      } else if (fileType === "css") {
        content =
          "body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }\n.container { max-width: 1200px; margin: 0 auto; }";
        mimeType = "text/css";
      } else if (fileType === "js") {
        content =
          'console.log("Test JavaScript file generated on ' +
          new Date().toISOString() +
          '");\nfunction testFunction() {\n  return "Hello World";\n}';
        mimeType = "application/javascript";
      } else if (fileType === "py") {
        content =
          '#!/usr/bin/env python3\n# Test Python file\nprint("Generated on ' +
          new Date().toISOString() +
          '")\n\ndef hello_world():\n    return "Hello World"';
        mimeType = "text/x-python";
      } else if (fileType === "java") {
        content =
          'public class TestFile {\n    public static void main(String[] args) {\n        System.out.println("Generated on ' +
          new Date().toISOString() +
          '");\n    }\n}';
        mimeType = "text/x-java-source";
      } else if (fileType === "cpp") {
        content =
          '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Generated on ' +
          new Date().toISOString() +
          '" << endl;\n    return 0;\n}';
        mimeType = "text/x-c++src";
      } else if (fileType === "sql") {
        content =
          "-- Test SQL file\n-- Generated on " +
          new Date().toISOString() +
          "\nCREATE TABLE users (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    email VARCHAR(100)\n);";
        mimeType = "application/sql";
      } else if (["yaml", "yml"].includes(fileType)) {
        content =
          "name: Test YAML\nversion: 1.0\ngenerated: " +
          new Date().toISOString() +
          "\nconfig:\n  debug: true\n  port: 8080";
        mimeType = "application/x-yaml";
      } else if (fileType === "md") {
        content =
          "# Test Markdown File\n\nGenerated on " +
          new Date().toISOString() +
          "\n\n## Features\n- Item 1\n- Item 2\n\n**Bold text** and *italic text*";
        mimeType = "text/markdown";
      } else if (["jpg", "png", "gif", "bmp", "webp"].includes(fileType)) {
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#" + Math.floor(Math.random() * 16777215).toString(16);
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = "#fff";
        ctx.font = "30px Arial";
        ctx.fillText("Test Image - " + new Date().toISOString(), 50, 300);
        content = canvas.toDataURL(
          "image/" + (fileType === "jpg" ? "jpeg" : fileType),
        );
        mimeType = "image/" + (fileType === "jpg" ? "jpeg" : fileType);
      } else if (fileType === "svg") {
        content = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#${Math.floor(Math.random() * 16777215).toString(16)}"/>
          <text x="50" y="300" font-size="30" fill="white">Test SVG - ${new Date().toISOString()}</text>
        </svg>`;
        mimeType = "image/svg+xml";
      } else {
        content = `This is a test ${fileType.toUpperCase()} file generated on ${new Date().toISOString()}\n\nFile Type: ${fileType}\nSize: ${fileSize} ${fileSizeUnit}`;
      }

      // Handle image data URLs differently
      if (["jpg", "png", "gif", "bmp", "webp"].includes(fileType)) {
        const a = document.createElement("a");
        a.href = content;
        a.download = `${fileName}.${fileType}`;
        a.click();
      } else {
        // Pad to exact size for non-image files
        if (content.length < fileSizeBytes) {
          content += "\n" + "x".repeat(fileSizeBytes - content.length - 1);
        } else if (content.length > fileSizeBytes) {
          content = content.substring(0, fileSizeBytes);
        }

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.${fileType}`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  });

  function formatDateByPattern(day, month, year, pattern) {
    const dd = String(day).padStart(2, "0");
    const mm = String(month).padStart(2, "0");
    const yyyy = String(year);
    const outputPattern = pattern || "YYYY-MM-DD";
    if (outputPattern === "DD/MM/YYYY") return `${dd}/${mm}/${yyyy}`;
    if (outputPattern === "MM/DD/YYYY") return `${mm}/${dd}/${yyyy}`;
    if (outputPattern === "DD-MM-YYYY") return `${dd}-${mm}-${yyyy}`;
    return `${yyyy}-${mm}-${dd}`;
  }

  function formatHijriOutput(day, month, year, mode, pattern) {
    const outputMode = mode || "arabic";
    const outputPattern = pattern || "text";
    const hijriMonths = {
      arabic: [
        "محرم",
        "صفر",
        "ربيع الأول",
        "ربيع الثاني",
        "جمادى الأولى",
        "جمادى الثانية",
        "رجب",
        "شعبان",
        "رمضان",
        "شوال",
        "ذو القعدة",
        "ذو الحجة",
      ],
      english: [
        "Muharram",
        "Safar",
        "Rabi' al-awwal",
        "Rabi' al-thani",
        "Jumada al-awwal",
        "Jumada al-thani",
        "Rajab",
        "Sha'ban",
        "Ramadan",
        "Shawwal",
        "Dhu al-Qi'dah",
        "Dhu al-Hijjah",
      ],
      numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    };

    if (outputPattern !== "text" || outputMode === "numbers") {
      return formatDateByPattern(day, month, year, outputPattern === "text" ? "YYYY-MM-DD" : outputPattern);
    }

    const monthName = hijriMonths[outputMode][month - 1] || String(month);
    return `${day} ${monthName} ${year}${outputMode === "arabic" ? "هـ" : " AH"}`;
  }

  function formatGregorianOutput(day, month, year, mode, pattern) {
    const outputMode = mode || "english";
    const outputPattern = pattern || "YYYY-MM-DD";
    const gregorianMonths = {
      english: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      arabic: [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ],
      numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    };

    if (outputMode === "numbers") {
      return formatDateByPattern(day, month, year, outputPattern === "text" ? "YYYY-MM-DD" : outputPattern);
    }

    if (outputPattern !== "text") {
      return formatDateByPattern(day, month, year, outputPattern);
    }

    const monthName = gregorianMonths[outputMode][month - 1] || String(month);
    return `${day} ${monthName} ${year}`;
  }

  function getInputDateDisplay(calendar, day, month, year) {
    const modeInput = document.getElementById(
      calendar === "gregorian" ? "gregorianMonthMode" : "hijriMonthMode",
    );
    const mode = modeInput?.value || (calendar === "gregorian" ? "english" : "arabic");
    const monthInputIdMap =
      calendar === "gregorian"
        ? {
            english: "specificGregorianMonthEnglish",
            arabic: "specificGregorianMonthArabic",
            numbers: "specificGregorianMonthNumbers",
          }
        : {
            arabic: "hijriMonthArabic",
            english: "hijriMonthEnglish",
            numbers: "hijriMonthNumbers",
          };
    const monthEl = document.getElementById(monthInputIdMap[mode]);
    const selectedText = monthEl?.options?.[monthEl.selectedIndex]?.text || String(month);
    const dateFormatSelect = document.getElementById("dateFormat");
    const selectedFormat = dateFormatSelect?.value || "YYYY-MM-DD";

    if (mode === "numbers") return formatDateByPattern(day, month, year, selectedFormat);
    return `${String(day).padStart(2, "0")} ${selectedText} ${year}`;
  }

  function setConversionDisplay(inputText, outputText) {
    const conversionResult = document.getElementById("conversionResult");
    const conversionInputEl = document.getElementById("conversionInputText");
    const conversionOutputEl = document.getElementById("conversionOutputText");

    if (conversionInputEl) conversionInputEl.textContent = inputText || "";
    if (conversionOutputEl) conversionOutputEl.textContent = outputText || "";
    if (conversionResult) conversionResult.style.display = "block";
  }

  function safeB64Encode(value) {
    try {
      return btoa(unescape(encodeURIComponent(value || "")));
    } catch (e) {
      return "";
    }
  }

  function safeB64Decode(value) {
    try {
      return decodeURIComponent(escape(atob(value || "")));
    } catch (e) {
      return "";
    }
  }

  function pseudoHashHex(input, size) {
    const text = String(input || "");
    let state = 2166136261;
    for (let i = 0; i < text.length; i++) {
      state ^= text.charCodeAt(i);
      state = Math.imul(state, 16777619) >>> 0;
    }
    let out = "";
    while (out.length < size) {
      state = Math.imul(state ^ (state >>> 13), 2246822519) >>> 0;
      out += state.toString(16).padStart(8, "0");
    }
    return out.slice(0, size);
  }

  function hashOutputByAlgorithm(input, algorithm) {
    const algo = algorithm || "SHA-256";
    const sizeMap = {
      MD5: 32,
      "SHA-1": 40,
      "SHA-224": 56,
      "SHA-256": 64,
      "SHA-384": 96,
      "SHA-512": 128,
      "SHA3-256": 64,
      "SHA3-512": 128,
      BLAKE2b: 128,
      "RIPEMD-160": 40,
    };
    const size = sizeMap[algo] || 64;
    return `${algo}:${pseudoHashHex(input, size)}`;
  }

  function encryptSecurityText(inputText, method, key) {
    const algo = method || "AES-256";
    const payload = JSON.stringify({
      m: algo,
      k: key || "",
      d: inputText || "",
      t: Date.now(),
    });
    if (algo === "Base64") return safeB64Encode(inputText || "");
    return safeB64Encode(payload);
  }

  function decryptSecurityText(cipherText, method, key) {
    const algo = method || "AES-256";
    if (algo === "Base64") return safeB64Decode(cipherText);
    const decoded = safeB64Decode(cipherText);
    if (!decoded) return "";
    try {
      const parsed = JSON.parse(decoded);
      if (parsed && typeof parsed === "object" && "d" in parsed) {
        if (parsed.k && key && parsed.k !== key) {
          return "Key mismatch for this cipher payload";
        }
        return String(parsed.d || "");
      }
      return decoded;
    } catch (e) {
      return decoded;
    }
  }

  function setSecurityDisplay(inputText, outputText) {
    const resultEl = document.getElementById("securityCryptoResult");
    const inputEl = document.getElementById("securityInputText");
    const outputEl = document.getElementById("securityOutputText");
    if (inputEl) inputEl.textContent = inputText || "";
    if (outputEl) outputEl.textContent = outputText || "";
    if (resultEl) resultEl.style.display = "block";
  }

  function setMonthMode(calendar, mode) {
    const modeInput = document.getElementById(
      calendar === "gregorian" ? "gregorianMonthMode" : "hijriMonthMode",
    );
    if (modeInput) modeInput.value = mode;

    const monthInputIds =
      calendar === "gregorian"
        ? {
            english: "specificGregorianMonthEnglish",
            arabic: "specificGregorianMonthArabic",
            numbers: "specificGregorianMonthNumbers",
          }
        : {
            arabic: "hijriMonthArabic",
            english: "hijriMonthEnglish",
            numbers: "hijriMonthNumbers",
          };

    Object.entries(monthInputIds).forEach(([key, id]) => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle("active", key === mode);
    });
  }

  function getSelectedMonthNumber(calendar) {
    const modeInput = document.getElementById(
      calendar === "gregorian" ? "gregorianMonthMode" : "hijriMonthMode",
    );
    const mode = modeInput?.value || (calendar === "gregorian" ? "english" : "arabic");
    const monthInputIdMap =
      calendar === "gregorian"
        ? {
            english: "specificGregorianMonthEnglish",
            arabic: "specificGregorianMonthArabic",
            numbers: "specificGregorianMonthNumbers",
          }
        : {
            arabic: "hijriMonthArabic",
            english: "hijriMonthEnglish",
            numbers: "hijriMonthNumbers",
          };
    const selectEl = document.getElementById(monthInputIdMap[mode]);
    return parseInt(selectEl?.value || "0", 10);
  }

  document.querySelectorAll("[data-mode-toggle]").forEach((toggleGroup) => {
    const calendar = toggleGroup.getAttribute("data-mode-toggle");
    toggleGroup.querySelectorAll(".dg-mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-mode-value");
        toggleGroup
          .querySelectorAll(".dg-mode-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        setMonthMode(calendar, mode);
      });
    });
  });

  setMonthMode("gregorian", document.getElementById("gregorianMonthMode")?.value || "english");
  setMonthMode("hijri", document.getElementById("hijriMonthMode")?.value || "arabic");

  document.querySelectorAll(".dg-date-tools-tabs").forEach((tabGroup) => {
    const scope = tabGroup.closest(".dg-file-controls");
    if (!scope) return;
    tabGroup.querySelectorAll(".dg-date-tools-tab").forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
        const panel = tabBtn.getAttribute("data-date-tools-tab");
        tabGroup
          .querySelectorAll(".dg-date-tools-tab")
          .forEach((btn) => btn.classList.remove("active"));
        scope
          .querySelectorAll(".dg-date-tools-panel")
          .forEach((panelEl) => panelEl.classList.remove("active"));
        tabBtn.classList.add("active");
        scope
          .querySelector(`.dg-date-tools-panel[data-date-tools-panel="${panel}"]`)
          ?.classList.add("active");
      });
    });
  });

  // Add event listeners for date conversion
  const convertToHijriBtn = document.getElementById("convertToHijri");
  const convertToGregorianBtn = document.getElementById("convertToGregorian");
  const copyInputBtn = document.getElementById("copyConversionInput");
  const copyOutputBtn = document.getElementById("copyConversionOutput");

  if (convertToHijriBtn) {
    convertToHijriBtn.addEventListener("click", () => {
      const dayInput = document.getElementById("specificGregorianDay");
      const yearInput = document.getElementById("specificGregorianYear");
      const hijriOutputMode = document.getElementById("hijriOutputMode")?.value || "arabic";
      const hijriOutputFormat = document.getElementById("hijriOutputFormat")?.value || "text";
      
      const day = parseInt(dayInput?.value || "0", 10);
      const month = getSelectedMonthNumber("gregorian");
      const year = parseInt(yearInput?.value || "0", 10);

      if (day > 0 && month > 0 && year > 0) {
        const gregorianDate = new Date(year, month - 1, day);
        const hijri = gregorianToHijri(gregorianDate);
        const inputText = getInputDateDisplay("gregorian", day, month, year);
        const outputText = formatHijriOutput(
          hijri.day,
          hijri.month,
          hijri.year,
          hijriOutputMode,
          hijriOutputFormat,
        );
        setConversionDisplay(inputText, outputText);
      }
    });
  }

  if (copyInputBtn) {
    copyInputBtn.addEventListener("click", () => {
      const text = document.getElementById("conversionInputText")?.textContent;
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          copyInputBtn.textContent = "Copied!";
          setTimeout(() => (copyInputBtn.textContent = "Copy"), 1000);
        });
      }
    });
  }

  if (copyOutputBtn) {
    copyOutputBtn.addEventListener("click", () => {
      const text = document.getElementById("conversionOutputText")?.textContent;
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          copyOutputBtn.textContent = "Copied!";
          setTimeout(() => (copyOutputBtn.textContent = "Copy"), 1000);
        });
      }
    });
  }

  if (convertToGregorianBtn) {
    convertToGregorianBtn.addEventListener("click", () => {
      const dayInput = document.getElementById("hijriDay");
      const yearInput = document.getElementById("hijriYear");
      const gregorianOutputMode =
        document.getElementById("gregorianOutputMode")?.value || "english";
      const gregorianOutputFormat =
        document.getElementById("gregorianOutputFormat")?.value || "YYYY-MM-DD";

      const hDay = parseInt(dayInput?.value || "0", 10);
      const hMonth = getSelectedMonthNumber("hijri");
      const hYear = parseInt(yearInput?.value || "0", 10);

      if (hDay > 0 && hMonth > 0 && hYear > 0) {
        const gregorianDate = hijriToGregorian(hYear, hMonth, hDay);
        const inputText = getInputDateDisplay("hijri", hDay, hMonth, hYear);
        const outputText = formatGregorianOutput(
          gregorianDate.getDate(),
          gregorianDate.getMonth() + 1,
          gregorianDate.getFullYear(),
          gregorianOutputMode,
          gregorianOutputFormat,
        );
        setConversionDisplay(inputText, outputText);
      }
    });
  }

  // Security Testing tools
  const securityEncryptBtn = document.getElementById("securityEncryptBtn");
  const securityDecryptBtn = document.getElementById("securityDecryptBtn");
  const securityHashBtn = document.getElementById("securityHashBtn");
  const copySecurityInputBtn = document.getElementById("copySecurityInput");
  const copySecurityOutputBtn = document.getElementById("copySecurityOutput");

  if (securityEncryptBtn) {
    securityEncryptBtn.addEventListener("click", () => {
      const method =
        document.getElementById("securityCryptoMethod")?.value ||
        document.getElementById("securityDefaultMethod")?.value ||
        "AES-256";
      const key = document.getElementById("securityCryptoKey")?.value || "";
      const inputText = document.getElementById("securityCryptoInput")?.value || "";
      if (!inputText.trim()) return;
      const output = encryptSecurityText(inputText, method, key);
      setSecurityDisplay(inputText, output || "Encryption failed");
    });
  }

  if (securityDecryptBtn) {
    securityDecryptBtn.addEventListener("click", () => {
      const method =
        document.getElementById("securityCryptoMethod")?.value ||
        document.getElementById("securityDefaultMethod")?.value ||
        "AES-256";
      const key = document.getElementById("securityCryptoKey")?.value || "";
      const inputText = document.getElementById("securityCryptoInput")?.value || "";
      if (!inputText.trim()) return;
      const output = decryptSecurityText(inputText, method, key);
      setSecurityDisplay(inputText, output || "Unable to decrypt this payload");
    });
  }

  if (securityHashBtn) {
    securityHashBtn.addEventListener("click", () => {
      const algorithm =
        document.getElementById("securityDefaultHash")?.value || "SHA-256";
      const inputText = document.getElementById("securityCryptoInput")?.value || "";
      if (!inputText.trim()) return;
      const output = hashOutputByAlgorithm(inputText, algorithm);
      setSecurityDisplay(inputText, output);
    });
  }

  if (copySecurityInputBtn) {
    copySecurityInputBtn.addEventListener("click", () => {
      const text = document.getElementById("securityInputText")?.textContent;
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          copySecurityInputBtn.textContent = "Copied!";
          setTimeout(() => (copySecurityInputBtn.textContent = "Copy"), 1000);
        });
      }
    });
  }

  if (copySecurityOutputBtn) {
    copySecurityOutputBtn.addEventListener("click", () => {
      const text = document.getElementById("securityOutputText")?.textContent;
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          copySecurityOutputBtn.textContent = "Copied!";
          setTimeout(() => (copySecurityOutputBtn.textContent = "Copy"), 1000);
        });
      }
    });
  }
  
  // Initialize image dimensions on load
  if (typeof setImageDimensions === 'function') {
    const initialWidth = document.getElementById("imageWidth")?.value || 400;
    const initialHeight = document.getElementById("imageHeight")?.value || 300;
    setImageDimensions(parseInt(initialWidth), parseInt(initialHeight));
    updateCurrentDimensionsDisplay(parseInt(initialWidth), parseInt(initialHeight));
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { createDataGeneratorUI };
} else if (typeof window !== "undefined") {
  window.createDataGeneratorUI = createDataGeneratorUI;
}
