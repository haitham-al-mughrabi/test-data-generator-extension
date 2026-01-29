// Saudi Arabia specific data
const saudiData = {
  cities: [
    { en: "Riyadh", ar: "الرياض", region: "Central" },
    { en: "Jeddah", ar: "جدة", region: "Western" },
    { en: "Mecca", ar: "مكة المكرمة", region: "Western" },
    { en: "Medina", ar: "المدينة المنورة", region: "Western" },
    { en: "Dammam", ar: "الدمام", region: "Eastern" },
    { en: "Khobar", ar: "الخبر", region: "Eastern" },
    { en: "Dhahran", ar: "الظهران", region: "Eastern" },
    { en: "Tabuk", ar: "تبوك", region: "Northern" },
    { en: "Abha", ar: "أبها", region: "Southern" },
    { en: "Khamis Mushait", ar: "خميس مشيط", region: "Southern" },
    { en: "Buraidah", ar: "بريدة", region: "Central" },
    { en: "Najran", ar: "نجران", region: "Southern" },
    { en: "Jubail", ar: "الجبيل", region: "Eastern" },
    { en: "Yanbu", ar: "ينبع", region: "Western" },
    { en: "Taif", ar: "الطائف", region: "Western" },
  ],
  streets: [
    { en: "King Fahd Road", ar: "طريق الملك فهد" },
    { en: "King Abdullah Road", ar: "طريق الملك عبدالله" },
    { en: "Olaya Street", ar: "شارع العليا" },
    { en: "Tahlia Street", ar: "شارع التحلية" },
    { en: "Prince Sultan Street", ar: "شارع الأمير سلطان" },
    { en: "King Abdulaziz Road", ar: "طريق الملك عبدالعزيز" },
    { en: "Palestine Street", ar: "شارع فلسطين" },
    { en: "Makkah Road", ar: "طريق مكة" },
    { en: "Airport Road", ar: "طريق المطار" },
    { en: "Ring Road", ar: "الطريق الدائري" },
    { en: "Prince Mohammed bin Abdulaziz Road", ar: "طريق الأمير محمد بن عبدالعزيز" },
    { en: "Al Urubah Road", ar: "طريق العروبة" },
    { en: "Eastern Ring Road", ar: "الطريق الدائري الشرقي" },
    { en: "Northern Ring Road", ar: "الطريق الدائري الشمالي" }
  ],
  districts: [
    { en: "Al Olaya", ar: "العليا" },
    { en: "Al Malaz", ar: "الملز" },
    { en: "Al Sulaimaniyah", ar: "السليمانية" },
    { en: "Al Naseem", ar: "النسيم" },
    { en: "Al Rawdah", ar: "الروضة" },
    { en: "Al Sahafah", ar: "الصحافة" },
    { en: "Al Worood", ar: "الورود" },
    { en: "Al Nakheel", ar: "النخيل" },
    { en: "Al Hamra", ar: "الحمراء" },
    { en: "Al Aziziyah", ar: "العزيزية" },
    { en: "Al Faisaliyah", ar: "الفيصلية" },
    { en: "Al Murabba", ar: "المربع" },
    { en: "Al Batha", ar: "البطحاء" },
    { en: "Al Dirah", ar: "الديرة" },
    { en: "King Fahd District", ar: "حي الملك فهد" }
  ],
  companies: [
    "Saudi Aramco", "SABIC", "Al Rajhi Bank", "Saudi Telecom Company", "SAMBA Financial Group", "Riyad Bank", "Saudi Electricity Company", "Almarai", "Saudi Basic Industries", "National Commercial Bank",
    "Banque Saudi Fransi", "Arab National Bank", "Saudi Investment Bank", "Alinma Bank", "Bank AlBilad", "Saudi British Bank", "Jadwa Investment", "Kingdom Holding Company", "Savola Group", "Mobile Telecommunications Company"
  ],
  jobTitles: [
    "Software Engineer", "Project Manager", "Business Analyst", "Marketing Manager", "Sales Representative", "HR Specialist", "Financial Analyst", "Operations Manager", "Quality Assurance Engineer", "Data Scientist",
    "Product Manager", "UI/UX Designer", "System Administrator", "Network Engineer", "Database Administrator", "Customer Service Representative", "Supply Chain Manager", "Legal Counsel", "Research Analyst", "Training Specialist"
  ],
  bankCodes: {
    "10": "National Commercial Bank",
    "45": "Saudi British Bank", 
    "20": "Riyad Bank",
    "40": "Saudi Hollandi Bank",
    "05": "Alinma Bank",
    "50": "Alawwal Bank",
    "60": "Al Rajhi Bank",
    "65": "Saudi Investment Bank",
    "15": "Banque Saudi Fransi",
    "30": "Arab National Bank",
    "90": "Gulf International Bank",
    "95": "Emirates NBD",
    "85": "BNP Paribas",
    "76": "Bank AlBilad",
    "80": "Al Jazira Bank"
  },
  madaBins: [
    "440647", "440795", "446404", "457865", "588845", "588846", "588847", "588848", "588849",
    "627571", "636120", "968201", "968202", "968203", "968204", "968205", "968206", "968207",
    "968208", "968209", "968210", "968211"
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { saudiData };
} else if (typeof window !== 'undefined') {
  window.saudiData = saudiData;
}
