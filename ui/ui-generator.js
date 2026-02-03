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
    .dg-app { height: 100%; display: flex; flex-direction: column; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; }
    .dg-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px; text-align: center; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .dg-header h1 { font-size: 15px; font-weight: 700; margin: 0 0 8px 0; }
    .dg-search { position: relative; max-width: 300px; margin: 0 auto; }
    .dg-search input { width: 100%; padding: 6px 30px 6px 10px; border: none; border-radius: 15px; font-size: 12px; background: rgba(255,255,255,0.9); }
    .dg-search input:focus { outline: none; background: white; }
    .dg-search-icon { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); color: #666; font-size: 12px; }
    .dg-search-clear { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #666; cursor: pointer; font-size: 14px; display: none; }
    .dg-search-results { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 1000; display: none; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .dg-search-result { padding: 8px 12px; cursor: pointer; font-size: 11px; border-bottom: 1px solid #f1f5f9; }
    .dg-search-result:hover { background: #f8fafc; }
    .dg-search-result:last-child { border-bottom: none; }
    .dg-search-category { font-weight: 600; color: #667eea; }
    .dg-search-field { color: #334155; margin-left: 8px; }
    .dg-search-highlight { background: #fef3c7; padding: 1px 2px; border-radius: 2px; }
    .dg-tabs { display: flex; background: white; border-bottom: 2px solid #e2e8f0; overflow-x: auto; flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .dg-tab { padding: 10px 14px; border: none; background: none; cursor: pointer; font-size: 12px; font-weight: 600; color: #64748b; border-bottom: 3px solid transparent; white-space: nowrap; transition: all 0.2s; }
    .dg-tab:hover { color: #667eea; }
    .dg-tab.active { color: #667eea; border-bottom-color: #667eea; }
    .dg-sub-tabs { display: flex; background: #f8fafc; border-bottom: 1px solid #e2e8f0; overflow-x: auto; flex-shrink: 0; padding: 0 14px; }
    .dg-sub-tab { padding: 8px 12px; border: none; background: none; cursor: pointer; font-size: 11px; font-weight: 500; color: #64748b; border-bottom: 2px solid transparent; white-space: nowrap; transition: all 0.2s; margin-right: 4px; }
    .dg-sub-tab:hover { color: #667eea; }
    .dg-sub-tab.active { color: #667eea; border-bottom-color: #667eea; }
    .dg-main { flex: 1; display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
    .dg-content { flex: 1; overflow-y: auto; min-height: 0; background: white; }
    .dg-top-controls { display: flex; background: #f8fafc; border-bottom: 1px solid #e2e8f0; overflow-x: auto; flex-shrink: 0; padding: 0 14px; }
    .dg-top-controls .dg-btn { padding: 8px 12px; border: none; background: none; cursor: pointer; font-size: 11px; font-weight: 500; color: #64748b; border-bottom: 2px solid transparent; white-space: nowrap; transition: all 0.2s; margin-right: 4px; }
    .dg-top-controls .dg-btn:hover { color: #667eea; }
    .dg-tab-content { display: none; }
    .dg-tab-content.active { display: block; }
    .dg-sub-tab-content { display: none; padding: 14px; }
    .dg-sub-tab-content.active { display: block; }
    .dg-tab-controls { display: flex; gap: 4px; margin-bottom: 8px; }
    .dg-tab-controls .dg-btn { flex: 1; padding: 6px 8px; font-size: 10px; background: #cbd5e1 !important; color: #334155 !important; min-width: 0; height: 28px; display: flex; align-items: center; justify-content: center; }
    .dg-tab-controls .dg-btn:hover { background: #94a3b8 !important; }
    .dg-tab-controls .dg-btn.unselect { background: #ef4444 !important; color: white !important; }
    .dg-tab-controls .dg-btn.unselect:hover { background: #dc2626 !important; }
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
    {
      title: "Personal",
      subTabs: [
        {
          title: "Names",
          fields: [
            { id: "firstName", label: "First Name (EN)" },
            { id: "firstNameAr", label: "First Name (AR)" },
            { id: "lastName", label: "Last Name (EN)" },
            { id: "lastNameAr", label: "Last Name (AR)" },
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
            { id: "hrdfCertificate", label: "HRDF Training Certificate" },
            { id: "saudizationNumber", label: "Saudization Compliance ID" },
          ]
        },
        {
          title: "Services & Location",
          fields: [
            { id: "customsCode", label: "Customs Code" },
            { id: "saudiPost", label: "Saudi Post Box" },
            { id: "absherId", label: "Absher ID" },
            { id: "nafathId", label: "Nafath ID" },
            { id: "elmId", label: "Elm ID" },
            { id: "balady", label: "Balady Municipal ID" },
            { id: "misaLicense", label: "MISA Investment License" },
            { id: "etimadNumber", label: "Etimad Supplier Number" },
            { id: "sadadPayment", label: "SADAD Payment ID" },
            { id: "samaLicense", label: "SAMA Financial License" },
            { id: "zatcaCsid", label: "ZATCA CSID (E-Invoice)" },
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
            { id: "bankName", label: "Bank Name (EN)" },
            { id: "bankNameAr", label: "Bank Name (AR)" },
            { id: "accountNumber", label: "Account Number" },
            { id: "swiftCode", label: "SWIFT Code" },
          ]
        },
        {
          title: "Cards & Payment",
          fields: [
            { id: "creditCard", label: "Credit Card" },
            { id: "cvv", label: "CVV" },
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
            { id: "vin", label: "VIN Number" },
            { id: "engineNumber", label: "Engine Number" },
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
            { id: "hashValue", label: "Hash Value" },
            { id: "saltValue", label: "Salt Value" },
            { id: "certificateId", label: "Certificate ID" },
            { id: "permissionLevel", label: "Permission Level" },
            { id: "accessRole", label: "Access Role" },
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
            { id: "datetime", label: "DateTime" },
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
          ]
        }
      ]
    },
    {
      title: "Other",
      subTabs: [
        {
          title: "Identifiers",
          fields: [
            { id: "uuid", label: "UUID" },
            { id: "apiKey", label: "API Key" },
          ]
        },
        {
          title: "Network & Web",
          fields: [
            { id: "url", label: "URL" },
            { id: "ip", label: "IP Address" },
            { id: "macAddress", label: "MAC Address" },
            { id: "userAgent", label: "User Agent" },
          ]
        },
        {
          title: "Security & Misc",
          fields: [
            { id: "password", label: "Password" },
            { id: "color", label: "Color" },
          ]
        }
      ]
    },
    {
      title: "Files",
      subTabs: [
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
  ];

  const tabsHTML = categories
    .map(
      (cat, idx) =>
        `<button class="dg-tab ${idx === 0 ? "active" : ""}" data-tab="${idx}">${cat.title}</button>`,
    )
    .join("");
  const contentHTML = categories
    .map(
      (cat, idx) => {
        // Check if category has sub-tabs
        if (cat.subTabs) {
          const subTabsHTML = cat.subTabs
            .map((subTab, subIdx) => 
              `<button class="dg-sub-tab ${subIdx === 0 ? "active" : ""}" data-sub-tab="${idx}-${subIdx}">${subTab.title}</button>`
            ).join("");
          
          const subTabContentsHTML = cat.subTabs
            .map((subTab, subIdx) => `
              <div class="dg-sub-tab-content ${subIdx === 0 ? "active" : ""}" data-sub-content="${idx}-${subIdx}">
                <div class="dg-fields-wrapper">
                  ${subTab.fields.map((field) => `<label class="dg-checkbox"><input type="checkbox" value="${field.id}"><span>${field.label}</span></label>`).join("")}
                </div>
              </div>
            `).join("");

          return `
            <div class="dg-tab-content ${idx === 0 ? "active" : ""}" data-content="${idx}">
              <div class="dg-sub-tabs">${subTabsHTML}</div>
              <div class="dg-top-controls">
                <button class="dg-btn dg-btn-secondary dg-unselect-all-categories">✕ All</button>
                <button class="dg-btn dg-btn-secondary dg-unselect-all" data-tab="current">✕ Tab</button>
                <button class="dg-btn dg-btn-secondary dg-unselect-sub-all" data-sub-tab="current">✕ Sub</button>
                <button class="dg-btn dg-btn-secondary dg-select-sub-all" data-sub-tab="current">✓ Sub</button>
                <button class="dg-btn dg-btn-secondary dg-select-all" data-tab="current">✓ Tab</button>
                <button class="dg-btn dg-btn-secondary dg-select-all-categories">✓ All</button>
              </div>
              ${
                cat.title === "Files"
                  ? `
                <div class="dg-file-controls active" id="fileControls">
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
              `
                  : ""
              }
              ${
                cat.title === "Date & Time"
                  ? `
                <div class="dg-file-controls active" id="dateTimeControls">
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
                  <div class="dg-file-control-group">
                    <label>Date Conversion:</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeHijri"> Include Hijri
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeGregorian" checked> Include Gregorian
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="showBothDates"> Show Both
                      </label>
                    </div>
                  </div>
                  <div class="dg-file-control-group">
                    <label>Convert Specific Date:</label>
                    <div class="dg-file-size-group">
                      <input type="date" id="specificGregorianDate" placeholder="Gregorian Date">
                      <button type="button" id="convertToHijri" style="width: 80px; padding: 4px; font-size: 9px; background: #667eea; color: white; border: none; border-radius: 4px;">→ Hijri</button>
                    </div>
                  </div>
                  <div class="dg-file-control-group">
                    <label>Convert Hijri Date:</label>
                    <div style="display: flex; gap: 4px;">
                      <input type="number" id="hijriDay" placeholder="Day" min="1" max="30" style="width: 50px;">
                      <select id="hijriMonth" style="flex: 1;">
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
                      <input type="number" id="hijriYear" placeholder="Year" min="1400" max="1500" style="width: 60px;">
                      <button type="button" id="convertToGregorian" style="width: 80px; padding: 4px; font-size: 9px; background: #667eea; color: white; border: none; border-radius: 4px;">→ Greg</button>
                    </div>
                  </div>
                  <div id="conversionResult" style="margin-top: 8px; padding: 8px; background: #f0f9ff; border-radius: 6px; font-size: 10px; display: none;"></div>
                </div>
              `
                  : ""
              }
              ${
                cat.title === "Random Values"
                  ? `
                <div class="dg-file-controls active" id="randomValuesControls">
                  <div class="dg-file-control-group">
                    <label>Character Types:</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeNumbers" checked> Numbers (0-9)
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeUppercase" checked> Uppercase (A-Z)
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeLowercase" checked> Lowercase (a-z)
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeArabicLetters"> Arabic Letters (أ-ي)
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeSpecialChars"> Special (!@#$%)
                      </label>
                    </div>
                  </div>
                  <div class="dg-file-control-group">
                    <label>Length:</label>
                    <div class="dg-file-size-group">
                      <input type="number" id="randomLength" value="10" min="1" max="1000" style="width: 80px;">
                      <span style="font-size: 10px; color: #64748b;">characters</span>
                    </div>
                  </div>
                  <div class="dg-file-control-group">
                    <label>Custom Characters:</label>
                    <input type="text" id="customChars" placeholder="Add custom characters..." style="width: 100%; padding: 4px 6px; font-size: 10px;">
                  </div>
                </div>
              `
                  : ""
              }
              ${
                cat.title === "Random Text"
                  ? `
                <div class="dg-file-controls active" id="randomTextControls">
                  <div class="dg-file-control-group">
                    <label>Text Length:</label>
                    <input type="number" id="textLength" value="50" min="1" max="10000">
                  </div>
                  <div class="dg-file-control-group">
                    <label>Character Types:</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;">
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeDigits" checked> Digits (0-9)
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeEnglish" checked> English (A-z)
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeArabic"> Arabic (ا-ي)
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeSpecial"> Special (!@#$)
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeSpace"> Spaces
                      </label>
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
              `
                  : ""
              }
              ${
                cat.title === "Password Testing"
                  ? `
                <div class="dg-file-controls active" id="passwordControls">
                  <div class="dg-file-control-group">
                    <label>Password Length:</label>
                    <input type="number" id="passwordLength" value="12" min="4" max="128">
                  </div>
                  <div class="dg-file-control-group">
                    <label>Character Types:</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeUppercase" checked> Uppercase (A-Z)
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeLowercase" checked> Lowercase (a-z)
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeNumbers" checked> Numbers (0-9)
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeSpecialChars"> Special (!@#$)
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeArabicChars"> Arabic (ا-ي)
                      </label>
                    </div>
                  </div>
                  <div class="dg-file-control-group">
                    <label>Requirements:</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="mustStartWith"> Must start with letter
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="mustEndWith"> Must end with number
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="noRepeating"> No repeating chars
                      </label>
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
                  <div class="dg-file-control-group">
                    <label>Validation:</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="generateValid" checked> Valid Numbers
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="generateInvalid"> Invalid Numbers
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="wrongLength"> Wrong Length
                      </label>
                    </div>
                  </div>
                </div>
              `
                  : ""
              }
              ${subTabContentsHTML}
            </div>
          `;
        } else {
          // Legacy format for categories without sub-tabs
          return `
            <div class="dg-tab-content ${idx === 0 ? "active" : ""}" data-content="${idx}">
              <div class="dg-top-controls">
                <button class="dg-btn dg-btn-secondary dg-unselect-all-categories">✕ All</button>
                <button class="dg-btn dg-btn-secondary dg-unselect-all" data-tab="current">✕ Tab</button>
                <button class="dg-btn dg-btn-secondary dg-unselect-sub-all" data-sub-tab="current">✕ Sub</button>
                <button class="dg-btn dg-btn-secondary dg-select-sub-all" data-sub-tab="current">✓ Sub</button>
                <button class="dg-btn dg-btn-secondary dg-select-all" data-tab="current">✓ Tab</button>
                <button class="dg-btn dg-btn-secondary dg-select-all-categories">✓ All</button>
              </div>
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
              `
                  : ""
              }
              ${
                cat.title === "Date & Time"
                  ? `
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
                  <div class="dg-file-control-group">
                    <label>Date Conversion:</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeHijri"> Include Hijri
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="includeGregorian" checked> Include Gregorian
                      </label>
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 10px;">
                        <input type="checkbox" id="showBothDates"> Show Both
                      </label>
                    </div>
                  </div>
                  <div class="dg-file-control-group">
                    <label>Convert Specific Date:</label>
                    <div class="dg-file-size-group">
                      <input type="date" id="specificGregorianDate" placeholder="Gregorian Date">
                      <button type="button" id="convertToHijri" style="width: 80px; padding: 4px; font-size: 9px; background: #667eea; color: white; border: none; border-radius: 4px;">→ Hijri</button>
                    </div>
                  </div>
                  <div class="dg-file-control-group">
                    <label>Convert Hijri Date:</label>
                    <div style="display: flex; gap: 4px;">
                      <input type="number" id="hijriDay" placeholder="Day" min="1" max="30" style="width: 50px;">
                      <select id="hijriMonth" style="flex: 1;">
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
                      <input type="number" id="hijriYear" placeholder="Year" min="1400" max="1500" style="width: 60px;">
                      <button type="button" id="convertToGregorian" style="width: 80px; padding: 4px; font-size: 9px; background: #667eea; color: white; border: none; border-radius: 4px;">→ Greg</button>
                    </div>
                  </div>
                  <div id="conversionResult" style="margin-top: 8px; padding: 8px; background: #f0f9ff; border-radius: 6px; font-size: 10px; display: none;"></div>
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
      </div>
      <div class="dg-tabs">${tabsHTML}</div>
      <div class="dg-main">
        <div class="dg-content">
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
      const category = categories[tabIdx];
      const isFilesTab = category.title === "Files";
      const isDateTimeTab = category.title === "Date & Time";
      const isRandomValuesTab = category.title === "Random Values";
      const isRandomTextTab = category.title === "Random Text";
      const isEmailTestingTab = category.title === "Email Testing";
      const isPasswordTestingTab = category.title === "Password Testing";
      const isPhoneTestingTab = category.title === "Phone Testing";
      const fileControls = document.getElementById("fileControls");
      const dateTimeControls = document.getElementById("dateTimeControls");
      const randomValuesControls = document.getElementById(
        "randomValuesControls",
      );
      const randomTextControls = document.getElementById("randomTextControls");
      const emailControls = document.getElementById("emailControls");
      const passwordControls = document.getElementById("passwordControls");
      const phoneControls = document.getElementById("phoneControls");
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
      if (downloadBtn) {
        downloadBtn.style.display = isFilesTab ? "inline-block" : "none";
      }
    });
  });

  // Sub-tab event handlers
  document.querySelectorAll(".dg-sub-tab").forEach((subTab) => {
    subTab.addEventListener("click", () => {
      const subTabKey = subTab.dataset.subTab;
      const [tabIdx] = subTabKey.split('-');
      
      // Remove active class from all sub-tabs in this main tab
      document
        .querySelectorAll(`[data-content="${tabIdx}"] .dg-sub-tab`)
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(`[data-content="${tabIdx}"] .dg-sub-tab-content`)
        .forEach((c) => c.classList.remove("active"));
      
      // Add active class to clicked sub-tab
      subTab.classList.add("active");
      document
        .querySelector(`[data-sub-content="${subTabKey}"]`)
        .classList.add("active");
    });
  });

  document
    .querySelector(".dg-select-all-categories")
    .addEventListener("click", () => {
      document
        .querySelectorAll(".dg-checkbox input")
        .forEach((c) => (c.checked = true));
    });

  document
    .querySelector(".dg-unselect-all-categories")
    .addEventListener("click", () => {
      document
        .querySelectorAll(".dg-checkbox input")
        .forEach((c) => (c.checked = false));
    });

  document.querySelectorAll(".dg-select-all").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabIdx = btn.dataset.tab;
      if (tabIdx === "current") {
        // Get currently active tab and select ALL checkboxes in that tab (all sub-tabs)
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

  // Sub-tab select/unselect handlers - these work only on current visible sub-tab
  document.querySelectorAll(".dg-select-sub-all").forEach((btn) => {
    btn.addEventListener("click", () => {
      const subTabKey = btn.dataset.subTab;
      if (subTabKey === "current") {
        // Get currently active sub-tab and select only its checkboxes
        const activeSubTab = document.querySelector(".dg-sub-tab.active");
        if (activeSubTab) {
          const currentSubTabKey = activeSubTab.dataset.subTab;
          document
            .querySelectorAll(`[data-sub-content="${currentSubTabKey}"] .dg-checkbox input`)
            .forEach((c) => (c.checked = true));
        }
      } else {
        document
          .querySelectorAll(`[data-sub-content="${subTabKey}"] .dg-checkbox input`)
          .forEach((c) => (c.checked = true));
      }
    });
  });

  document.querySelectorAll(".dg-unselect-sub-all").forEach((btn) => {
    btn.addEventListener("click", () => {
      const subTabKey = btn.dataset.subTab;
      if (subTabKey === "current") {
        // Get currently active sub-tab and unselect only its checkboxes
        const activeSubTab = document.querySelector(".dg-sub-tab.active");
        if (activeSubTab) {
          const currentSubTabKey = activeSubTab.dataset.subTab;
          document
            .querySelectorAll(`[data-sub-content="${currentSubTabKey}"] .dg-checkbox input`)
            .forEach((c) => (c.checked = false));
        }
      } else {
        document
          .querySelectorAll(`[data-sub-content="${subTabKey}"] .dg-checkbox input`)
          .forEach((c) => (c.checked = false));
      }
    });
  });

  // Search functionality
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const searchClear = document.getElementById("searchClear");
  const searchIcon = document.getElementById("searchIcon");

  function createSearchIndex() {
    const searchIndex = [];
    categories.forEach((category, categoryIndex) => {
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

      // If category has sub-tabs and a specific sub-tab is requested
      if (subTabIndex !== null && categories[categoryIndex].subTabs) {
        // Switch to the specific sub-tab
        document
          .querySelectorAll(`[data-content="${categoryIndex}"] .dg-sub-tab`)
          .forEach((t) => t.classList.remove("active"));
        document
          .querySelectorAll(`[data-content="${categoryIndex}"] .dg-sub-tab-content`)
          .forEach((c) => c.classList.remove("active"));

        const targetSubTab = document.querySelector(`[data-sub-tab="${categoryIndex}-${subTabIndex}"]`);
        const targetSubContent = document.querySelector(`[data-sub-content="${categoryIndex}-${subTabIndex}"]`);

        if (targetSubTab && targetSubContent) {
          targetSubTab.classList.add("active");
          targetSubContent.classList.add("active");
        }
      }

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

      const fileControls = document.getElementById("fileControls");
      const dateTimeControls = document.getElementById("dateTimeControls");
      const randomValuesControls = document.getElementById(
        "randomValuesControls",
      );
      const randomTextControls = document.getElementById("randomTextControls");
      const emailControls = document.getElementById("emailControls");
      const passwordControls = document.getElementById("passwordControls");
      const phoneControls = document.getElementById("phoneControls");
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

  document.getElementById("controlsHeader").addEventListener("click", () => {
    const controls = document.querySelector(".dg-controls");
    controls.classList.toggle("collapsed");
  });

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
      "txt",
      "json",
      "csv",
      "xml",
      "html",
      "pdf",
      "doc",
      "xlsx",
      "jpg",
      "png",
      "zip",
    ];
    const selectedFileTypes = checked.filter((field) =>
      fileTypes.includes(field),
    );

    if (selectedFileTypes.length > 0) {
      // Handle file generation
      const fileName = document.getElementById("fileName").value || "test-file";
      const fileSize =
        parseInt(document.getElementById("fileSize").value) || 10;
      const fileSizeUnit = document.getElementById("fileSizeUnit").value;

      generatedData = [];
      selectedFileTypes.forEach((fileType) => {
        const record = {
          fileName: `${fileName}.${fileType}`,
          fileType: fileType,
          fileSize: `${fileSize} ${fileSizeUnit}`,
          generated: new Date().toISOString(),
        };
        generatedData.push(record);
      });
    } else {
      // Handle regular data generation
      generatedData = [];
      for (let i = 0; i < count; i++) {
        if (window.resetSharedData) window.resetSharedData();
        const record = {};
        checked.forEach((fieldId) => {
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

    const resultsDiv = document.getElementById("results");
    const recordTabs = generatedData
      .map(
        (_, idx) =>
          `<button class="dg-record-tab ${idx === 0 ? "active" : ""}" data-record="${idx}">Record ${idx + 1}</button>`,
      )
      .join("");
    const recordContents = generatedData
      .map((record, recordIdx) => {
        const grouped = {};
        Object.entries(record).forEach(([key, value]) => {
          const category = categories.find((cat) => {
            if (cat.subTabs) {
              return cat.subTabs.some(subTab => subTab.fields.some(f => f.id === key));
            } else {
              return cat.fields && cat.fields.some((f) => f.id === key);
            }
          });
          const catName = category ? category.title : "Other";
          if (!grouped[catName]) grouped[catName] = [];
          grouped[catName].push({ key, value });
        });

        const catTabs = Object.keys(grouped)
          .map(
            (cat, idx) =>
              `<button class="dg-category-tab ${idx === 0 ? "active" : ""}" data-category="${recordIdx}-${cat}">${cat}</button>`,
          )
          .join("");
        const catContents = Object.entries(grouped)
          .map(
            ([cat, fields], idx) => `
        <div class="dg-category-content ${idx === 0 ? "active" : ""}" data-category-content="${recordIdx}-${cat}">
          ${fields.map(({ key, value }) => `<div class="dg-record-field"><span class="dg-record-label">${key}</span><span class="dg-field-value" data-value="${value}">${value}</span></div>`).join("")}
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

    resultsDiv.innerHTML = `<div class="dg-record-tabs">${recordTabs}</div><div class="dg-record-contents">${recordContents}</div>`;

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
      el.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        navigator.clipboard.writeText(value).then(() => {
          const original = this.textContent;
          this.textContent = "Copied!";
          setTimeout(() => (this.textContent = original), 800);
        });
      });
    });
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

  // Add event listeners for date conversion
  const convertToHijriBtn = document.getElementById("convertToHijri");
  const convertToGregorianBtn = document.getElementById("convertToGregorian");
  const conversionResult = document.getElementById("conversionResult");

  if (convertToHijriBtn) {
    convertToHijriBtn.addEventListener("click", () => {
      const dateInput = document.getElementById("specificGregorianDate");
      if (dateInput && dateInput.value) {
        const gregorianDate = new Date(dateInput.value);
        const hijri = gregorianToHijri(gregorianDate);
        const hijriMonths = [
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
        ];
        const result = `${dateInput.value} → ${hijri.day} ${hijriMonths[hijri.month - 1]} ${hijri.year}هـ`;
        conversionResult.textContent = result;
        conversionResult.style.display = "block";
      }
    });
  }

  if (convertToGregorianBtn) {
    convertToGregorianBtn.addEventListener("click", () => {
      const dayInput = document.getElementById("hijriDay");
      const monthSelect = document.getElementById("hijriMonth");
      const yearInput = document.getElementById("hijriYear");

      if (dayInput.value && monthSelect.value && yearInput.value) {
        const hDay = parseInt(dayInput.value);
        const hMonth = parseInt(monthSelect.value);
        const hYear = parseInt(yearInput.value);
        const gregorianDate = hijriToGregorian(hYear, hMonth, hDay);
        const hijriMonths = [
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
        ];
        const result = `${hDay} ${hijriMonths[hMonth - 1]} ${hYear}هـ → ${gregorianDate.getFullYear()}-${(gregorianDate.getMonth() + 1).toString().padStart(2, "0")}-${gregorianDate.getDate().toString().padStart(2, "0")}`;
        conversionResult.textContent = result;
        conversionResult.style.display = "block";
      }
    });
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { createDataGeneratorUI };
} else if (typeof window !== "undefined") {
  window.createDataGeneratorUI = createDataGeneratorUI;
}
