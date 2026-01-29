// Background script for context menu
chrome.runtime.onInstalled.addListener(() => {
  // Create parent menu
  chrome.contextMenus.create({
    id: "testDataGenerator",
    title: "🎲 Fill with Test Data",
    contexts: ["editable"]
  });

  // Personal - Names
  chrome.contextMenus.create({
    id: "firstName",
    parentId: "testDataGenerator",
    title: "First Name",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "firstNameAr",
    parentId: "testDataGenerator",
    title: "First Name (AR)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "lastName",
    parentId: "testDataGenerator",
    title: "Last Name",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "lastNameAr",
    parentId: "testDataGenerator",
    title: "Last Name (AR)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "fullName",
    parentId: "testDataGenerator",
    title: "Full Name",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "fullNameAr",
    parentId: "testDataGenerator",
    title: "Full Name (AR)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "name",
    parentId: "testDataGenerator",
    title: "Name (EN/AR)",
    contexts: ["editable"]
  });

  // Personal - Demographics
  chrome.contextMenus.create({
    id: "separator1",
    parentId: "testDataGenerator",
    type: "separator",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "gender",
    parentId: "testDataGenerator",
    title: "Gender",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "age",
    parentId: "testDataGenerator",
    title: "Age",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "birthdate",
    parentId: "testDataGenerator",
    title: "Birthdate",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "nationality",
    parentId: "testDataGenerator",
    title: "Nationality",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "bloodType",
    parentId: "testDataGenerator",
    title: "Blood Type",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "maritalStatus",
    parentId: "testDataGenerator",
    title: "Marital Status",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "saudiId",
    parentId: "testDataGenerator",
    title: "Saudi ID",
    contexts: ["editable"]
  });

  // Contact
  chrome.contextMenus.create({
    id: "separator2",
    parentId: "testDataGenerator",
    type: "separator",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "email",
    parentId: "testDataGenerator",
    title: "Email",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "phone",
    parentId: "testDataGenerator",
    title: "Phone",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "mobileNumber",
    parentId: "testDataGenerator",
    title: "Mobile Number",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "landline",
    parentId: "testDataGenerator",
    title: "Landline",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "address",
    parentId: "testDataGenerator",
    title: "Address",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "addressAr",
    parentId: "testDataGenerator",
    title: "Address (AR)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "city",
    parentId: "testDataGenerator",
    title: "City",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "postalCode",
    parentId: "testDataGenerator",
    title: "Postal Code",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "nationalAddress",
    parentId: "testDataGenerator",
    title: "National Address",
    contexts: ["editable"]
  });

  // Work
  chrome.contextMenus.create({
    id: "separator3",
    parentId: "testDataGenerator",
    type: "separator",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "company",
    parentId: "testDataGenerator",
    title: "Company",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "jobTitle",
    parentId: "testDataGenerator",
    title: "Job Title",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "department",
    parentId: "testDataGenerator",
    title: "Department",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "salary",
    parentId: "testDataGenerator",
    title: "Salary",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "experience",
    parentId: "testDataGenerator",
    title: "Experience",
    contexts: ["editable"]
  });

  // Finance
  chrome.contextMenus.create({
    id: "separator4",
    parentId: "testDataGenerator",
    type: "separator",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "iban",
    parentId: "testDataGenerator",
    title: "IBAN",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "bankName",
    parentId: "testDataGenerator",
    title: "Bank Name",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "accountNumber",
    parentId: "testDataGenerator",
    title: "Account Number",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "creditCard",
    parentId: "testDataGenerator",
    title: "Credit Card",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "visaCard",
    parentId: "testDataGenerator",
    title: "Visa Card",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "masterCard",
    parentId: "testDataGenerator",
    title: "MasterCard",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "madaCard",
    parentId: "testDataGenerator",
    title: "Mada Card",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "cardExpiry",
    parentId: "testDataGenerator",
    title: "Card Expiry",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "cvv",
    parentId: "testDataGenerator",
    title: "CVV",
    contexts: ["editable"]
  });

  // Other - Common
  chrome.contextMenus.create({
    id: "separator5",
    parentId: "testDataGenerator",
    type: "separator",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "date",
    parentId: "testDataGenerator",
    title: "Date (Random)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "datePast",
    parentId: "testDataGenerator",
    title: "Date (Past)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "datePresent",
    parentId: "testDataGenerator",
    title: "Date (Present)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "dateFuture",
    parentId: "testDataGenerator",
    title: "Date (Future)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "dateGregorian",
    parentId: "testDataGenerator",
    title: "Date Gregorian",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "dateGregorianAr",
    parentId: "testDataGenerator",
    title: "Date Gregorian (AR)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "dateHijri",
    parentId: "testDataGenerator",
    title: "Date Hijri",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "dateHijriAr",
    parentId: "testDataGenerator",
    title: "Date Hijri (AR)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "time",
    parentId: "testDataGenerator",
    title: "Time (24h)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "time12",
    parentId: "testDataGenerator",
    title: "Time (12h)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "time12Ar",
    parentId: "testDataGenerator",
    title: "Time (12h AR)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "datetime",
    parentId: "testDataGenerator",
    title: "Date & Time",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "datetimeLocal",
    parentId: "testDataGenerator",
    title: "Date & Time (Local)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "datetimeAr",
    parentId: "testDataGenerator",
    title: "Date & Time (AR)",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "timestamp",
    parentId: "testDataGenerator",
    title: "Timestamp",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "number",
    parentId: "testDataGenerator",
    title: "Number",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "boolean",
    parentId: "testDataGenerator",
    title: "Boolean",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "uuid",
    parentId: "testDataGenerator",
    title: "UUID",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "color",
    parentId: "testDataGenerator",
    title: "Color",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "url",
    parentId: "testDataGenerator",
    title: "URL",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "ip",
    parentId: "testDataGenerator",
    title: "IP Address",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "password",
    parentId: "testDataGenerator",
    title: "Password",
    contexts: ["editable"]
  });

  // IDs & Documents
  chrome.contextMenus.create({
    id: "separator6",
    parentId: "testDataGenerator",
    type: "separator",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "passportNumber",
    parentId: "testDataGenerator",
    title: "Passport Number",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "visaNumber",
    parentId: "testDataGenerator",
    title: "Visa Number",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "taxId",
    parentId: "testDataGenerator",
    title: "Tax ID",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "licenseNumber",
    parentId: "testDataGenerator",
    title: "License Number",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "studentId",
    parentId: "testDataGenerator",
    title: "Student ID",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "medicalRecord",
    parentId: "testDataGenerator",
    title: "Medical Record",
    contexts: ["editable"]
  });

  // Business
  chrome.contextMenus.create({
    id: "separator7",
    parentId: "testDataGenerator",
    type: "separator",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "companyId",
    parentId: "testDataGenerator",
    title: "Company ID",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "vatNumber",
    parentId: "testDataGenerator",
    title: "VAT Number",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "invoice",
    parentId: "testDataGenerator",
    title: "Invoice Number",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "orderNumber",
    parentId: "testDataGenerator",
    title: "Order Number",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "productCode",
    parentId: "testDataGenerator",
    title: "Product Code",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "barcode",
    parentId: "testDataGenerator",
    title: "Barcode",
    contexts: ["editable"]
  });

  chrome.contextMenus.create({
    id: "serialNumber",
    parentId: "testDataGenerator",
    title: "Serial Number",
    contexts: ["editable"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.parentMenuItemId === "testDataGenerator") {
    chrome.tabs.sendMessage(tab.id, {
      action: "fillField",
      dataType: info.menuItemId
    }).catch(error => {
      console.log('Test Data Generator: Message sending failed', error);
    });
  }
});
