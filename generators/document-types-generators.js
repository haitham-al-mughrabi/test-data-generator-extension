// Document types and professional file generators
let sharedDocumentTypeData = null;

function generateSharedDocumentTypeData() {
  const documentTypes = {
    legal: [
      { en: 'Contract', ar: 'عقد', extension: 'pdf' },
      { en: 'Agreement', ar: 'اتفاقية', extension: 'docx' },
      { en: 'License', ar: 'رخصة', extension: 'pdf' },
      { en: 'Certificate', ar: 'شهادة', extension: 'pdf' },
      { en: 'Permit', ar: 'تصريح', extension: 'pdf' },
      { en: 'Deed', ar: 'صك', extension: 'pdf' },
      { en: 'Will', ar: 'وصية', extension: 'pdf' },
      { en: 'Power of Attorney', ar: 'توكيل', extension: 'pdf' }
    ],
    business: [
      { en: 'Invoice', ar: 'فاتورة', extension: 'pdf' },
      { en: 'Receipt', ar: 'إيصال', extension: 'pdf' },
      { en: 'Purchase Order', ar: 'أمر شراء', extension: 'xlsx' },
      { en: 'Quotation', ar: 'عرض سعر', extension: 'pdf' },
      { en: 'Business Plan', ar: 'خطة عمل', extension: 'docx' },
      { en: 'Financial Report', ar: 'تقرير مالي', extension: 'xlsx' },
      { en: 'Budget', ar: 'ميزانية', extension: 'xlsx' },
      { en: 'Proposal', ar: 'اقتراح', extension: 'pptx' }
    ],
    academic: [
      { en: 'Thesis', ar: 'أطروحة', extension: 'pdf' },
      { en: 'Research Paper', ar: 'بحث علمي', extension: 'docx' },
      { en: 'Dissertation', ar: 'رسالة دكتوراه', extension: 'pdf' },
      { en: 'Assignment', ar: 'واجب', extension: 'docx' },
      { en: 'Transcript', ar: 'كشف درجات', extension: 'pdf' },
      { en: 'Diploma', ar: 'دبلوم', extension: 'pdf' },
      { en: 'Course Syllabus', ar: 'منهج دراسي', extension: 'pdf' },
      { en: 'Lecture Notes', ar: 'ملاحظات محاضرة', extension: 'docx' }
    ],
    technical: [
      { en: 'Manual', ar: 'دليل', extension: 'pdf' },
      { en: 'Specification', ar: 'مواصفات', extension: 'docx' },
      { en: 'Blueprint', ar: 'مخطط', extension: 'dwg' },
      { en: 'Schematic', ar: 'رسم تخطيطي', extension: 'pdf' },
      { en: 'Documentation', ar: 'توثيق', extension: 'md' },
      { en: 'API Reference', ar: 'مرجع API', extension: 'html' },
      { en: 'User Guide', ar: 'دليل المستخدم', extension: 'pdf' },
      { en: 'Installation Guide', ar: 'دليل التثبيت', extension: 'pdf' }
    ],
    medical: [
      { en: 'Medical Report', ar: 'تقرير طبي', extension: 'pdf' },
      { en: 'Prescription', ar: 'وصفة طبية', extension: 'pdf' },
      { en: 'Lab Results', ar: 'نتائج مختبر', extension: 'pdf' },
      { en: 'X-Ray', ar: 'أشعة سينية', extension: 'dcm' },
      { en: 'Medical History', ar: 'تاريخ طبي', extension: 'pdf' },
      { en: 'Insurance Claim', ar: 'مطالبة تأمين', extension: 'pdf' },
      { en: 'Vaccination Record', ar: 'سجل تطعيم', extension: 'pdf' },
      { en: 'Health Certificate', ar: 'شهادة صحية', extension: 'pdf' }
    ]
  };

  const categories = Object.keys(documentTypes);
  const selectedCategory = randomChoice(categories);
  const selectedDocument = randomChoice(documentTypes[selectedCategory]);
  
  const versions = ['v1.0', 'v2.0', 'v2.1', 'final', 'draft', 'revised', 'updated'];
  const statuses = [
    { en: 'Draft', ar: 'مسودة' },
    { en: 'Final', ar: 'نهائي' },
    { en: 'Approved', ar: 'معتمد' },
    { en: 'Pending', ar: 'معلق' },
    { en: 'Rejected', ar: 'مرفوض' },
    { en: 'Under Review', ar: 'قيد المراجعة' }
  ];

  const priorities = [
    { en: 'High', ar: 'عالي' },
    { en: 'Medium', ar: 'متوسط' },
    { en: 'Low', ar: 'منخفض' },
    { en: 'Urgent', ar: 'عاجل' },
    { en: 'Normal', ar: 'عادي' }
  ];

  sharedDocumentTypeData = {
    category: selectedCategory,
    document: selectedDocument,
    version: randomChoice(versions),
    status: randomChoice(statuses),
    priority: randomChoice(priorities),
    documentNumber: `DOC-${randomNum(1000, 9999)}`,
    referenceNumber: `REF-${randomNum(100000, 999999)}`,
    pageCount: randomNum(1, 100),
    wordCount: randomNum(100, 10000),
    createdDate: new Date(Date.now() - randomNum(1, 365) * 24 * 60 * 60 * 1000),
    modifiedDate: new Date()
  };
}

const documentTypesGenerators = {
  documentType: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.document.en;
  },

  documentTypeAr: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.document.ar;
  },

  documentCategory: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.category.charAt(0).toUpperCase() + sharedDocumentTypeData.category.slice(1);
  },

  documentNumber: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.documentNumber;
  },

  referenceNumber: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.referenceNumber;
  },

  documentVersion: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.version;
  },

  documentStatus: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.status.en;
  },

  documentStatusAr: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.status.ar;
  },

  documentPriority: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.priority.en;
  },

  documentPriorityAr: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.priority.ar;
  },

  pageCount: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.pageCount.toString();
  },

  wordCount: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.wordCount.toString();
  },

  documentTitle: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    const doc = sharedDocumentTypeData.document;
    const num = sharedDocumentTypeData.documentNumber;
    return `${doc.en} ${num}`;
  },

  documentTitleAr: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    const doc = sharedDocumentTypeData.document;
    const num = sharedDocumentTypeData.documentNumber;
    return `${doc.ar} ${num}`;
  },

  documentFileName: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    const doc = sharedDocumentTypeData.document;
    const num = sharedDocumentTypeData.documentNumber.split('-')[1];
    const ext = sharedDocumentTypeData.document.extension;
    return `${doc.en.toLowerCase().replace(/\s+/g, '_')}_${num}.${ext}`;
  },

  documentFileNameAr: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    const doc = sharedDocumentTypeData.document;
    const num = sharedDocumentTypeData.documentNumber.split('-')[1];
    const ext = sharedDocumentTypeData.document.extension;
    return `${doc.ar}_${num}.${ext}`;
  },

  createdDate: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.createdDate.toISOString().split('T')[0];
  },

  modifiedDate: () => {
    if (!sharedDocumentTypeData) generateSharedDocumentTypeData();
    return sharedDocumentTypeData.modifiedDate.toISOString().split('T')[0];
  },

  documentAuthor: () => {
    if (!sharedNameData) generateSharedNameData();
    return `${sharedNameData.firstName.en} ${sharedNameData.lastName.en}`;
  },

  documentAuthorAr: () => {
    if (!sharedNameData) generateSharedNameData();
    return `${sharedNameData.firstName.ar} ${sharedNameData.lastName.ar}`;
  },

  documentTemplate: () => {
    const templates = [
      'Standard Template',
      'Corporate Template',
      'Legal Template',
      'Academic Template',
      'Government Template',
      'Medical Template',
      'Technical Template',
      'Financial Template'
    ];
    return randomChoice(templates);
  },

  documentLanguage: () => {
    const languages = ['English', 'Arabic', 'Bilingual (EN/AR)', 'French', 'Spanish'];
    return randomChoice(languages);
  },

  documentSecurity: () => {
    const securityLevels = [
      { en: 'Public', ar: 'عام' },
      { en: 'Internal', ar: 'داخلي' },
      { en: 'Confidential', ar: 'سري' },
      { en: 'Restricted', ar: 'مقيد' },
      { en: 'Top Secret', ar: 'سري للغاية' }
    ];
    const level = randomChoice(securityLevels);
    return level.en;
  },

  documentSecurityAr: () => {
    const securityLevels = [
      { en: 'Public', ar: 'عام' },
      { en: 'Internal', ar: 'داخلي' },
      { en: 'Confidential', ar: 'سري' },
      { en: 'Restricted', ar: 'مقيد' },
      { en: 'Top Secret', ar: 'سري للغاية' }
    ];
    const level = randomChoice(securityLevels);
    return level.ar;
  },

  documentFormat: () => {
    const formats = ['A4', 'Letter', 'Legal', 'A3', 'Tabloid', 'Executive'];
    return randomChoice(formats);
  },

  documentOrientation: () => {
    return randomChoice(['Portrait', 'Landscape']);
  },

  documentChecksum: () => {
    // Generate a mock SHA-256 checksum
    const chars = '0123456789abcdef';
    let checksum = '';
    for (let i = 0; i < 64; i++) {
      checksum += chars[randomNum(0, 15)];
    }
    return checksum;
  },

  documentSignature: () => {
    const signatureTypes = [
      'Digital Signature',
      'Electronic Signature',
      'Wet Signature',
      'Biometric Signature',
      'PKI Signature'
    ];
    return randomChoice(signatureTypes);
  },

  documentApprover: () => {
    const titles = ['Manager', 'Director', 'CEO', 'CFO', 'Legal Counsel', 'Department Head'];
    const title = randomChoice(titles);
    if (!sharedNameData) generateSharedNameData();
    return `${sharedNameData.firstName.en} ${sharedNameData.lastName.en} (${title})`;
  },

  documentApproverAr: () => {
    const titlesAr = ['مدير', 'مدير عام', 'رئيس تنفيذي', 'مدير مالي', 'مستشار قانوني', 'رئيس قسم'];
    const title = randomChoice(titlesAr);
    if (!sharedNameData) generateSharedNameData();
    return `${sharedNameData.firstName.ar} ${sharedNameData.lastName.ar} (${title})`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { documentTypesGenerators };
} else if (typeof window !== 'undefined') {
  window.documentTypesGenerators = documentTypesGenerators;
}