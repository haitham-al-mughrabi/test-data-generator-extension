# Test Data Generator Chrome Extension

A comprehensive Chrome extension for generating realistic test data across 40+ categories with bilingual support (Arabic/English), specifically optimized for Saudi Arabian data formats and international standards.

## 🚀 Features

### 📊 40+ Data Categories
- **Personal**: Names, Gender, Age, Nationality, Blood Type, Marital Status, Saudi ID
- **Contact**: Email, Phone, Address, Social Media
- **Work**: Company, Job Title, Department, Salary
- **Finance**: IBAN, Credit Cards, Banking, Insurance
- **Healthcare**: Medical Records, Prescriptions, Appointments
- **Government**: Saudi Government Services, Legal Documents
- **E-commerce**: Products, Orders, Reviews, Inventory
- **Technology**: APIs, Databases, Software Testing
- **Travel**: Hotels, Flights, Bookings, Destinations
- **Education**: Students, Courses, Grades, Institutions
- **Real Estate**: Properties, Mortgages, Rentals
- **Entertainment**: Movies, Music, Games, Events
- **Sports**: Teams, Players, Matches, Statistics
- **Food & Restaurant**: Menus, Orders, Reviews, Recipes
- **Agriculture**: Crops, Livestock, Equipment, Weather
- **Manufacturing**: Products, Quality Control, Supply Chain
- **Testing & QA**: Edge Cases, Performance Data, Security Testing

### 🎯 Access Methods
1. **Extension Popup**: Click extension icon in Chrome toolbar
2. **Web Page Integration**: Floating dice button (🎲) on any webpage
3. **Context Menu**: Right-click on input fields for instant data generation

### 🌐 Bilingual Support
- Arabic and English data generation
- Saudi-specific formats and cultural context
- International standards compliance

## 📦 Installation

### From Chrome Web Store (Recommended)
*Coming Soon - Extension under review*

### Manual Installation (Developer Mode)
1. **Download** the latest release from GitHub
2. **Extract** the ZIP file to a folder
3. **Open Chrome** → Navigate to `chrome://extensions/`
4. **Enable Developer Mode** (toggle in top-right)
5. **Click "Load unpacked"** → Select the extracted folder
6. **Pin the extension** to toolbar for easy access

## 🎮 Usage Guide

### Extension Popup
1. Click the Test Data Generator icon in Chrome toolbar
2. Browse categories using the tabbed interface
3. Select desired data types with checkboxes
4. Set the number of records to generate (1-100)
5. Click "Generate" to create test data
6. Export options: Copy to clipboard or Download as JSON

### Web Page Integration
1. Visit any website
2. Look for the floating dice button (🎲) in the top-right corner
3. Click to open the data generator panel
4. Drag the dice button to reposition it anywhere on the page
5. Use the same interface as the popup version

### Context Menu Integration
1. Right-click on any input field on a webpage
2. Select "Generate Test Data" from the context menu
3. Choose from quick data type options
4. Data is automatically inserted into the field

### Advanced Features
- **Bulk Generation**: Create up to 100 records at once
- **Smart Categorization**: Organized tabs for easy navigation
- **Export Formats**: JSON, CSV, and clipboard copy
- **Persistent Settings**: Remembers your preferences
- **Responsive Design**: Works on all screen sizes

## 🧪 Testing & Development

### Test Files Included
- `test.html` - Standalone testing interface
- `debug.html` - Development debugging tools
- `context-menu-test.html` - Context menu functionality testing

### Running Tests
```bash
# Open test file in browser
open test.html

# Or serve locally
python -m http.server 8000
# Navigate to http://localhost:8000/test.html
```

## 📁 Project Structure

```
test-data-generator/
├── manifest.json              # Extension configuration
├── background.js              # Service worker
├── content.js                 # Content script injection
├── popup.html                 # Extension popup UI
├── popup.js                   # Popup functionality
├── injected.js                # Web page integration
├── context-menu.js            # Context menu functionality
├── shared.js                  # Core utilities
├── data/                      # Data files
│   ├── saudi-data.js          # Saudi-specific data
│   └── names-data.js          # Name databases
├── generators/                # Data generators (40+ files)
│   ├── personal-generators.js
│   ├── contact-generators.js
│   ├── work-generators.js
│   ├── finance-generators.js
│   ├── healthcare-generators.js
│   ├── government-generators.js
│   ├── ecommerce-generators.js
│   ├── technology-generators.js
│   ├── testing-qa-generators.js
│   └── ... (30+ more generators)
├── ui/                        # UI components
│   └── ui-generator.js        # Dynamic UI generation
├── utils/                     # Utility functions
│   └── helpers.js             # Helper functions
└── test-files/                # Testing resources
    ├── test.html
    ├── debug.html
    └── context-menu-test.html
```

## 📋 Data Examples

### Personal Data
```json
{
  "name": "Ahmed Al-Rashid (أحمد الراشد)",
  "saudiId": "1234567890",
  "gender": "Male",
  "birthdate": "1990-05-15",
  "nationality": "Saudi Arabian",
  "bloodType": "O+",
  "maritalStatus": "Married"
}
```

### Contact Information
```json
{
  "email": "ahmed.rashid@gmail.com",
  "phone": "+966 55 123 4567",
  "address": "1234 King Fahd Road, Al Olaya, Riyadh 12345",
  "socialMedia": {
    "twitter": "@ahmed_rashid",
    "instagram": "ahmed.rashid.sa"
  }
}
```

### Financial Data
```json
{
  "iban": "SA1234567890123456789012",
  "creditCard": "4532 1234 5678 9012",
  "bankName": "Saudi National Bank",
  "accountType": "Savings"
}
```

## 🔧 Browser Compatibility

- ✅ Chrome 88+
- ✅ Microsoft Edge 88+
- ✅ Brave Browser
- ✅ Opera 74+
- ✅ Other Chromium-based browsers

## 🔒 Privacy & Security

This extension prioritizes user privacy:

- ✅ **100% Local Generation**: All data generated locally, no network requests
- ✅ **No Data Collection**: Does not collect, store, or transmit personal information
- ✅ **No Website Modification**: Only injects UI elements when activated
- ✅ **Minimal Permissions**: Only requests necessary permissions
- ✅ **Open Source**: Full source code available for review
- ✅ **No Analytics**: No tracking or usage analytics

### Permissions Explained
- `activeTab`: Access current tab for context menu integration
- `storage`: Save user preferences locally
- `contextMenus`: Add right-click menu options

## 🚀 Production Checklist

- [x] Code optimization and minification
- [x] Comprehensive testing across all generators
- [x] Performance optimization for large datasets
- [x] Error handling and validation
- [x] Accessibility compliance (WCAG 2.1)
- [x] Cross-browser compatibility testing
- [x] Security audit and validation
- [x] Documentation and user guides
- [x] Privacy policy compliance
- [x] Chrome Web Store submission preparation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/test-data-generator/issues)
- **Documentation**: [Wiki](https://github.com/your-username/test-data-generator/wiki)
- **Email**: support@testdatagenerator.com

## 🔄 Version History

### v1.0.0 (Current)
- Initial release with 40+ data generators
- Bilingual support (Arabic/English)
- Saudi-specific data formats
- Context menu integration
- Web page floating button
- Export functionality (JSON/CSV/Clipboard)

---

**Made with ❤️ for developers and testers worldwide**
