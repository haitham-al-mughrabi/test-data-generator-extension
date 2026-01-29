# Test Data Generator Chrome Extension

A comprehensive Chrome extension for generating random test data with support for Arabic and English content, specifically tailored for Saudi Arabian data formats.

## Features

### Data Types Supported:
- **Personal**: Names (EN/AR), Gender, Birthdate, Nationality, Blood Type, Marital Status, Saudi ID
- **Contact**: Email, Phone, Address
- **Work**: Company, Job Title  
- **Finance**: IBAN
- **Other**: Date, Number, Boolean, UUID, Color, URL, IP Address, Password

### Access Methods:
1. **Extension Popup**: Click the extension icon in Chrome toolbar
2. **Web Page Integration**: Floating dice button (🎲) on any webpage

## Installation

1. **Download/Clone** this repository
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** (toggle in top-right)
4. **Click "Load unpacked"** and select the extension folder
5. **Pin the extension** to your toolbar for easy access

## Usage

### Via Extension Popup:
1. Click the extension icon in Chrome toolbar
2. Select data types using checkboxes
3. Set the count of records to generate
4. Click "Generate" to create test data
5. Use "Copy" to copy to clipboard or "Export JSON" to download

### Via Web Page:
1. Visit any website
2. Look for the floating dice button (🎲) in the top-right corner
3. Click to open the data generator panel
4. Use the same interface as the popup version
5. Drag the dice button to reposition it

### Interface Features:
- **Tabbed Organization**: Person, Contact, Work, Finance, Other
- **Bulk Selection**: "All" and "None" buttons for each category
- **Multiple Export Options**: Copy to clipboard, Export as JSON
- **Real-time Generation**: Generate multiple records at once
- **Bilingual Support**: Arabic and English data where applicable

## Testing

Open `test.html` in your browser to test the functionality without installing the extension.

## File Structure

```
├── manifest.json          # Extension configuration
├── shared.js              # Core data generation logic
├── popup.html             # Extension popup interface
├── popup.js               # Popup functionality
├── content.js             # Content script injection
├── injected.js            # Web page integration
├── test.html              # Standalone test page
└── README.md              # This file
```

## Data Examples

- **Names**: Mohammed Al-Saud (محمد آل سعود)
- **Addresses**: 1234 King Fahd Road, Al Olaya, Riyadh
- **Phone**: +966 55 123 4567
- **Email**: mohammed123@gmail.com
- **Saudi ID**: 1234567890
- **IBAN**: SA1234567890123456789012

## Browser Compatibility

- Chrome 88+
- Edge 88+
- Other Chromium-based browsers

## Privacy

This extension:
- ✅ Generates data locally (no network requests)
- ✅ Does not collect or store personal information
- ✅ Does not access or modify website data
- ✅ Only injects UI elements when activated

## License

MIT License - Feel free to use and modify as needed.
