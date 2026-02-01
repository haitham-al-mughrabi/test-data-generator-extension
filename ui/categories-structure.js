// New categories structure with sub-tabs
const categoriesWithSubTabs = [
  { 
    title: 'Personal', 
    subTabs: [
      {
        title: 'Identity',
        fields: [
          { id: 'firstName', label: 'First Name (EN)' }, 
          { id: 'firstNameAr', label: 'First Name (AR)' }, 
          { id: 'lastName', label: 'Last Name (EN)' }, 
          { id: 'lastNameAr', label: 'Last Name (AR)' }, 
          { id: 'fullName', label: 'Full Name (EN)' }, 
          { id: 'fullNameAr', label: 'Full Name (AR)' }, 
          { id: 'gender', label: 'Gender (EN)' }, 
          { id: 'genderAr', label: 'Gender (AR)' }
        ]
      },
      {
        title: 'Demographics',
        fields: [
          { id: 'birthdate', label: 'Birthdate' }, 
          { id: 'age', label: 'Age' }, 
          { id: 'nationality', label: 'Nationality (EN)' }, 
          { id: 'nationalityAr', label: 'Nationality (AR)' }, 
          { id: 'bloodType', label: 'Blood Type' }, 
          { id: 'maritalStatus', label: 'Marital Status (EN)' }, 
          { id: 'maritalStatusAr', label: 'Marital Status (AR)' },
          { id: 'religion', label: 'Religion (EN)' },
          { id: 'religionAr', label: 'Religion (AR)' }
        ]
      },
      {
        title: 'Documents',
        fields: [
          { id: 'saudiId', label: 'Saudi ID' }, 
          { id: 'iqamaNumber', label: 'Iqama Number' }, 
          { id: 'borderNumber', label: 'Border Number' }, 
          { id: 'passportNumber', label: 'Passport Number' }
        ]
      }
    ]
  },
  { 
    title: 'Contact', 
    subTabs: [
      {
        title: 'Communication',
        fields: [
          { id: 'email', label: 'Email' }, 
          { id: 'mobileNumber', label: 'Mobile Number' },
          { id: 'landlineNumber', label: 'Landline Number' },
          { id: 'whatsappNumber', label: 'WhatsApp Number' }
        ]
      },
      {
        title: 'Address',
        fields: [
          { id: 'address', label: 'Address (EN)' }, 
          { id: 'addressAr', label: 'Address (AR)' }, 
          { id: 'nationalAddress', label: 'National Address' },
          { id: 'city', label: 'City (EN)' }, 
          { id: 'cityAr', label: 'City (AR)' }, 
          { id: 'district', label: 'District (EN)' },
          { id: 'districtAr', label: 'District (AR)' },
          { id: 'street', label: 'Street (EN)' },
          { id: 'streetAr', label: 'Street (AR)' },
          { id: 'buildingNumber', label: 'Building Number' },
          { id: 'unitNumber', label: 'Unit Number' },
          { id: 'postalCode', label: 'Postal Code' }, 
          { id: 'additionalNumber', label: 'Additional Number' }
        ]
      },
      {
        title: 'Location',
        fields: [
          { id: 'country', label: 'Country (EN)' }, 
          { id: 'countryAr', label: 'Country (AR)' },
          { id: 'region', label: 'Region (EN)' },
          { id: 'regionAr', label: 'Region (AR)' },
          { id: 'province', label: 'Province (EN)' },
          { id: 'provinceAr', label: 'Province (AR)' }
        ]
      }
    ]
  },
  { 
    title: 'Business', 
    subTabs: [
      {
        title: 'Work Info',
        fields: [
          { id: 'company', label: 'Company' }, 
          { id: 'jobTitle', label: 'Job Title (EN)' }, 
          { id: 'jobTitleAr', label: 'Job Title (AR)' }, 
          { id: 'department', label: 'Department (EN)' }, 
          { id: 'departmentAr', label: 'Department (AR)' },
          { id: 'workLocation', label: 'Work Location (EN)' },
          { id: 'workLocationAr', label: 'Work Location (AR)' }
        ]
      },
      {
        title: 'Employment',
        fields: [
          { id: 'salary', label: 'Salary' }, 
          { id: 'workEmail', label: 'Work Email' },
          { id: 'workPhone', label: 'Work Phone' },
          { id: 'employeeId', label: 'Employee ID' },
          { id: 'workExperience', label: 'Experience (Years)' }
        ]
      },
      {
        title: 'Government',
        fields: [
          { id: 'commercialRegister', label: 'Commercial Register' },
          { id: 'taxNumber', label: 'Tax Number (VAT)' },
          { id: 'municipalLicense', label: 'Municipal License' },
          { id: 'chamberMembership', label: 'Chamber Membership' },
          { id: 'socialInsurance', label: 'Social Insurance (GOSI)' },
          { id: 'laborOfficeNumber', label: 'Labor Office Number' },
          { id: 'zakat', label: 'Zakat Number' },
          { id: 'customsCode', label: 'Customs Code' }
        ]
      }
    ]
  },
  { 
    title: 'Testing', 
    subTabs: [
      {
        title: 'Email Testing',
        fields: [
          { id: 'validEmail', label: 'Valid Email' },
          { id: 'invalidEmail', label: 'Invalid Email' },
          { id: 'disposableEmail', label: 'Disposable Email' },
          { id: 'corporateEmail', label: 'Corporate Email' },
          { id: 'personalEmail', label: 'Personal Email' },
          { id: 'longEmail', label: 'Long Email' },
          { id: 'shortEmail', label: 'Short Email' },
          { id: 'specialCharEmail', label: 'Special Char Email' },
          { id: 'unicodeEmail', label: 'Unicode Email' },
          { id: 'customEmail', label: 'Custom Email' }
        ]
      },
      {
        title: 'Phone Testing',
        fields: [
          { id: 'customPhone', label: 'Custom Phone' },
          { id: 'mobileNumber', label: 'Mobile (05X)' },
          { id: 'landlineNumber', label: 'Landline (01X)' },
          { id: 'shortMobile', label: 'Short Mobile (5X)' },
          { id: 'shortLandline', label: 'Short Landline (1X)' },
          { id: 'invalidPhone', label: 'Invalid Phone' },
          { id: 'wrongLengthPhone', label: 'Wrong Length' },
          { id: 'internationalPhone', label: 'International (+966)' },
          { id: 'formattedPhone', label: 'Formatted Phone' },
          { id: 'unformattedPhone', label: 'Unformatted Phone' }
        ]
      },
      {
        title: 'Password Testing',
        fields: [
          { id: 'customPassword', label: 'Custom Password' },
          { id: 'strongPassword', label: 'Strong Password' },
          { id: 'weakPassword', label: 'Weak Password' },
          { id: 'numericPassword', label: 'Numeric Password' },
          { id: 'alphaPassword', label: 'Alpha Password' },
          { id: 'specialCharPassword', label: 'Special Char Password' },
          { id: 'longPassword', label: 'Long Password' },
          { id: 'shortPassword', label: 'Short Password' },
          { id: 'commonPassword', label: 'Common Password' },
          { id: 'unicodePassword', label: 'Unicode Password' }
        ]
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { categoriesWithSubTabs };
} else if (typeof window !== 'undefined') {
  window.categoriesWithSubTabs = categoriesWithSubTabs;
}
