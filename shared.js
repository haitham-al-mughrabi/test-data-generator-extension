// Main shared.js - contains only the generators object and UI function
// All individual functions have been moved to modular files

const generators = {
  firstName: () => {
    if (!sharedNameData) generateSharedNameData();
    return sharedNameData.firstName.en;
  },
  
  firstNameAr: () => {
    if (!sharedNameData) generateSharedNameData();
    return sharedNameData.firstName.ar;
  },
  
  middleName: () => {
    if (!sharedNameData) generateSharedNameData();
    return sharedNameData.middleName.en;
  },
  
  middleNameAr: () => {
    if (!sharedNameData) generateSharedNameData();
    return sharedNameData.middleName.ar;
  },
  
  lastName: () => {
    if (!sharedNameData) generateSharedNameData();
    return sharedNameData.lastName.en;
  },
  
  lastNameAr: () => {
    if (!sharedNameData) generateSharedNameData();
    return sharedNameData.lastName.ar;
  },
  
  fullName: () => {
    if (!sharedNameData) generateSharedNameData();
    return `${sharedNameData.firstName.en} ${sharedNameData.middleName.en} ${sharedNameData.lastName.en}`;
  },
  
  fullNameAr: () => {
    if (!sharedNameData) generateSharedNameData();
    return `${sharedNameData.firstName.ar} ${sharedNameData.middleName.ar} ${sharedNameData.lastName.ar}`;
  },
  
  gender: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.gender.en;
  },
  
  genderAr: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.gender.ar;
  },
  
  birthdate: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.birthdate.toISOString().split('T')[0];
  },
  
  age: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.age;
  },
  
  nationality: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.nationality.en;
  },
  
  nationalityAr: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.nationality.ar;
  },
  
  bloodType: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.bloodType;
  },
  
  maritalStatus: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.maritalStatus.en;
  },
  
  maritalStatusAr: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.maritalStatus.ar;
  },
  
  saudiId: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.saudiId;
  },
  
  iqamaNumber: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.iqamaNumber;
  },
  
  passportNumber: () => {
    if (!sharedPersonalData) generateSharedPersonalData();
    return sharedPersonalData.passportNumber;
  },
  
  iqamaExpiry: () => {
    if (!sharedDocumentData) generateSharedDocumentData();
    return sharedDocumentData.iqamaExpiry.toISOString().split('T')[0];
  },
  
  iqamaExpiryAr: () => {
    if (!sharedDocumentData) generateSharedDocumentData();
    const hijriDate = gregorianToHijri(sharedDocumentData.iqamaExpiry);
    return `${hijriDate.day}/${hijriDate.month}/${hijriDate.year}`;
  },
  
  iqamaIssueDate: () => {
    if (!sharedDocumentData) generateSharedDocumentData();
    return sharedDocumentData.iqamaIssueDate.toISOString().split('T')[0];
  },
  
  iqamaIssueDateAr: () => {
    if (!sharedDocumentData) generateSharedDocumentData();
    const hijriDate = gregorianToHijri(sharedDocumentData.iqamaIssueDate);
    return `${hijriDate.day}/${hijriDate.month}/${hijriDate.year}`;
  },
  
  passportExpiry: () => {
    if (!sharedDocumentData) generateSharedDocumentData();
    return sharedDocumentData.passportExpiry.toISOString().split('T')[0];
  },
  
  passportExpiryAr: () => {
    if (!sharedDocumentData) generateSharedDocumentData();
    const hijriDate = gregorianToHijri(sharedDocumentData.passportExpiry);
    return `${hijriDate.day}/${hijriDate.month}/${hijriDate.year}`;
  },
  
  issuePlace: () => {
    if (!sharedDocumentData) generateSharedDocumentData();
    return sharedDocumentData.issuePlace.en;
  },
  
  issuePlaceAr: () => {
    if (!sharedDocumentData) generateSharedDocumentData();
    return sharedDocumentData.issuePlace.ar;
  },
  
  visaType: () => {
    if (!sharedDocumentData) generateSharedDocumentData();
    return sharedDocumentData.visaType.en;
  },
  
  visaTypeAr: () => {
    if (!sharedDocumentData) generateSharedDocumentData();
    return sharedDocumentData.visaType.ar;
  },
  
  sponsor: () => {
    if (!sharedDocumentData) generateSharedDocumentData();
    return sharedDocumentData.sponsor.en;
  },
  
  sponsorAr: () => {
    if (!sharedDocumentData) generateSharedDocumentData();
    return sharedDocumentData.sponsor.ar;
  },
  
  email: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.email;
  },
  
  phone: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.phone;
  },
  
  address: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.address.en;
  },
  
  addressAr: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.address.ar;
  },
  
  city: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.city.en;
  },
  
  cityAr: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.city.ar;
  },
  
  district: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.district.en;
  },
  
  districtAr: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.district.ar;
  },
  
  postalCode: () => {
    if (!sharedLocationData) generateSharedLocationData();
    return sharedLocationData.postalCode;
  },
  
  company: () => {
    if (!sharedWorkData) generateSharedWorkData();
    return sharedWorkData.company.en;
  },
  
  companyAr: () => {
    if (!sharedWorkData) generateSharedWorkData();
    return sharedWorkData.company.ar;
  },
  
  jobTitle: () => {
    if (!sharedWorkData) generateSharedWorkData();
    return sharedWorkData.jobTitle.en;
  },
  
  jobTitleAr: () => {
    if (!sharedWorkData) generateSharedWorkData();
    return sharedWorkData.jobTitle.ar;
  },
  
  department: () => {
    if (!sharedWorkData) generateSharedWorkData();
    return sharedWorkData.department.en;
  },
  
  departmentAr: () => {
    if (!sharedWorkData) generateSharedWorkData();
    return sharedWorkData.department.ar;
  },
  
  salary: () => {
    if (!sharedWorkData) generateSharedWorkData();
    return sharedWorkData.salary;
  },
  
  iban: () => financeGenerators.iban(),
  bankName: () => financeGenerators.bankName(),
  bankNameAr: () => financeGenerators.bankNameAr(),
  accountNumber: () => financeGenerators.accountNumber(),
  creditCard: () => financeGenerators.creditCard(),
  
  date: () => datetimeGenerators.date(),
  time: () => datetimeGenerators.time(),
  datetime: () => datetimeGenerators.datetime(),
  hijriDate: () => datetimeGenerators.hijriDate(),
  hijriDateAr: () => datetimeGenerators.hijriDateAr(),
  
  number: () => otherGenerators.number(),
  boolean: () => otherGenerators.boolean(),
  uuid: () => otherGenerators.uuid(),
  color: () => otherGenerators.color(),
  url: () => otherGenerators.url(),
  ipAddress: () => otherGenerators.ipAddress(),
  password: () => otherGenerators.password(),
  
  // Saudi Services
  hajjId: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.hajj;
  },
  
  umrahId: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.umrah;
  },
  
  workPermitId: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.workPermit;
  },
  
  residencyId: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.residency;
  },
  
  drivingLicenseId: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.driving;
  },
  
  vehicleRegistrationId: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.vehicle;
  },
  
  istmaraId: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.istmara;
  },
  
  trafficViolationId: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.traffic;
  },
  
  customsDeclarationId: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.customs;
  },
  
  healthInsuranceId: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.health;
  },
  
  medicalFileId: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.medical;
  },
  
  vaccinationId: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.vaccination;
  },
  
  covidTestId: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.covid;
  },
  
  maroofStatus: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.maroof.en;
  },
  
  maroofStatusAr: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.maroof.ar;
  },
  
  saudizationRate: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return `${sharedServiceData.saudizationRate}%`;
  },
  
  nitaqatColor: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.nitaqat.en;
  },
  
  nitaqatColorAr: () => {
    if (!sharedServiceData) generateSharedServiceData();
    return sharedServiceData.nitaqat.ar;
  },
  
  // File generators
  pdfFile: () => generateFile('pdf'),
  docxFile: () => generateFile('docx'),
  xlsxFile: () => generateFile('xlsx'),
  pptxFile: () => generateFile('pptx'),
  txtFile: () => generateFile('txt'),
  csvFile: () => generateFile('csv'),
  jsonFile: () => generateFile('json'),
  xmlFile: () => generateFile('xml'),
  zipFile: () => generateFile('zip'),
  imageFile: () => generateFile('jpg')
};

// Include the UI function from ui-generator.js
// This will be available after the modular files are loaded
