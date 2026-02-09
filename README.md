# Test Data Generator Chrome Extension

A comprehensive Chrome extension for generating realistic test data across 50+ categories with bilingual support (Arabic/English), specifically optimized for Saudi Arabian data formats and international standards.

## 🚀 Features

### 📊 50+ Data Categories

**Personal Data**
- Names (First, Last, Full - EN/AR)
- Demographics (Gender, Birthdate, Age, Nationality, Blood Type)
- IDs & Documents (Saudi ID, Iqama, Border Number, Passport)
- Status (Marital Status, Religion)
- Enhanced Personal (Personality Traits, Hobbies, Skills, Languages, Medical Info, Emergency Contacts)

**Contact Information**
- Email addresses
- Phone numbers (Saudi formatted)
- Physical addresses
- Social media handles

**Work & Professional**
- Company names
- Job titles
- Departments
- Salary information
- Work experience

**Finance & Banking**
- IBAN numbers
- Credit card numbers
- Bank names
- Account types
- Insurance information

**Healthcare**
- Medical records
- Prescriptions
- Appointments
- Medical conditions
- Blood types

**Government & Legal**
- Saudi government services
- Legal documents
- License numbers
- Court information
- Case details

**E-commerce**
- Products
- Orders
- Reviews
- Inventory
- Pricing

**Technology**
- APIs
- Databases
- Software testing data
- UUIDs & IDs
- Passwords

**Travel & Tourism**
- Hotels
- Flights
- Bookings
- Destinations
- Travel dates

**Education**
- Students
- Courses
- Grades
- Institutions
- Departments

**Real Estate**
- Properties
- Mortgages
- Rentals
- Locations
- Prices

**Entertainment**
- Movies
- Music
- Games
- Events
- Shows

**Sports & Fitness**
- Teams
- Players
- Matches
- Statistics
- Scores

**Food & Restaurant**
- Menus
- Orders
- Reviews
- Recipes
- Cuisines

**Agriculture**
- Crops
- Livestock
- Equipment
- Weather
- Farming methods

**Manufacturing**
- Products
- Quality control
- Supply chain
- Equipment
- Processes

**Testing & QA**
- Edge cases
- Performance data
- Security testing
- Validation data
- Error scenarios

**Media & Entertainment**
- Movies
- TV Shows
- Music
- Books
- Games
- Social media content

**Automotive**
- Vehicle information
- Insurance
- Services
- Traffic violations
- Maintenance

**Weather & Environment**
- Weather data
- Air quality
- Wildlife
- Climate
- Natural disasters

**Cryptocurrency**
- Digital assets
- Wallets
- Trading data
- DeFi protocols
- Blockchain data

**IoT & Smart Home**
- Connected devices
- Automation
- Sensors
- Controls
- Smart home data

**Files & Media**
- File types (50+ extensions)
- MIME types
- File sizes
- Metadata
- Document management

**Date & Time**
- Gregorian dates
- Hijri dates
- Date ranges
- Time formats
- Timezones

**Random Values**
- Random numbers
- Random letters
- Random text
- Alphanumeric
- Special characters

**Banking & Finance**
- Account numbers
- Routing numbers
- Transaction IDs
- Payment methods

**Insurance**
- Policy numbers
- Coverage types
- Claims
- Premiums

**Telecommunications**
- Phone numbers
- Network data
- Service plans
- Billing

**Construction**
- Projects
- Materials
- Equipment
- Contractors

**Energy & Utilities**
- Power plants
- Consumption data
- Billing
- Services

**Logistics & Shipping**
- Shipment tracking
- Carriers
- Delivery status
- Locations

**Fashion & Beauty**
- Brands
- Designers
- Products
- Sizes
- Colors

**Legal & Law**
- Law firms
- Lawyers
- Cases
- Courts
- Documents

**Science & Research**
- Research data
- Experiments
- Publications
- Institutions

**Document Types**
- 40+ professional document types
- Legal documents
- Business documents
- Academic documents
- Technical documents

### 🎯 Access Methods
1. **Extension Popup**: Click extension icon in Chrome toolbar
2. **Web Page Integration**: Floating dice button (🎲) on any webpage
3. **Context Menu**: Right-click on input fields for instant data generation

### 🌐 Bilingual Support
- Arabic and English data generation
- Saudi-specific formats and cultural context
- International standards compliance

### 💾 Export Options
- Copy to clipboard
- Download as JSON
- Download as ZIP (with actual binary files)

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
2. Browse categories using the left sidebar tabs
3. Select desired data types with checkboxes (2 per row)
4. Set the number of records to generate (1-100)
5. Configure image dimensions if needed
6. Click "Generate" to create test data
7. View results in the right panel
8. Export options: Copy to clipboard or Download

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
- **File Generation**: Create actual binary files with specified sizes
- **Image Dimensions**: Customize image sizes with preset options
- **Date Conversion**: Convert between Gregorian and Hijri calendars

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
├── generators/                # Data generators (50+ files)
│   ├── personal-generators.js
│   ├── enhanced-personal-generators.js
│   ├── contact-generators.js
│   ├── work-generators.js
│   ├── finance-generators.js
│   ├── healthcare-generators.js
│   ├── government-generators.js
│   ├── ecommerce-generators.js
│   ├── technology-generators.js
│   ├── testing-qa-generators.js
│   ├── travel-generators.js
│   ├── education-generators.js
│   ├── real-estate-generators.js
│   ├── entertainment-generators.js
│   ├── sports-fitness-generators.js
│   ├── food-restaurant-generators.js
│   ├── agriculture-generators.js
│   ├── manufacturing-generators.js
│   ├── construction-generators.js
│   ├── telecommunications-generators.js
│   ├── insurance-generators.js
│   ├── banking-finance-generators.js
│   ├── energy-utilities-generators.js
│   ├── logistics-shipping-generators.js
│   ├── fashion-beauty-generators.js
│   ├── legal-law-generators.js
│   ├── science-research-generators.js
│   ├── document-types-generators.js
│   ├── file-media-generators.js
│   ├── image-url-generators.js
│   ├── datetime-generators.js
│   ├── random-text-generators.js
│   ├── random-values-generators.js
│   ├── uuid-id-generators.js
│   ├── password-testing-generators.js
│   ├── phone-testing-generators.js
│   ├── email-testing-generators.js
│   ├── edge-cases-generators.js
│   ├── performance-testing-generators.js
│   ├── security-testing-generators.js
│   ├── vehicle-generators.js
│   ├── saudi-government-generators.js
│   ├── media-entertainment-generators.js
│   ├── automotive-generators.js
│   ├── weather-environment-generators.js
│   ├── cryptocurrency-generators.js
│   ├── iot-smarthome-generators.js
│   └── other-generators.js
├── ui/                        # UI components
│   ├── ui-generator.js        # Dynamic UI generation
│   └── categories-structure.js # Category definitions
├── utils/                     # Utility functions
│   └── helpers.js             # Helper functions
└── icons/                     # Extension icons
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
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
- [x] Modern UI/UX design
- [x] File generation with accurate sizes
- [x] Bilingual support

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

### v2.0.0 (Latest - Modern UI Redesign)
- **Complete UI Redesign**: Modern card-based layout with gradients
- **Improved Typography**: Larger, clearer fonts with better contrast
- **Enhanced Colors**: Vibrant, colorful design with smooth animations
- **Better Organization**: Two checkboxes per row for efficient browsing
- **File Generation**: Create actual binary files with specified sizes
- **ZIP Export**: Download multiple files as ZIP archive
- **Responsive Layout**: Three-column design (tabs, content, results)
- **Performance**: Optimized for faster data generation

### v1.1.0 (Enhanced Version)
- **Enhanced Personal Details**: Added 40+ new personal data fields
- **File Types & Media**: Comprehensive file type support
- **Document Management**: 40+ professional document types
- **Image & Media URLs**: 25+ image services
- **Expanded Name Database**: 150+ names and 60+ family names
- **Data Stability**: Improved consistency with shared data contexts

### v1.0.0
- Initial release with 50+ data generators
- Bilingual support (Arabic/English)
- Saudi-specific data formats
- Context menu integration
- Web page floating button
- Export functionality (JSON/CSV/Clipboard)

---

**Made with ❤️ for developers and testers worldwide**
