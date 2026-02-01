// Travel generators
let sharedTravelData = null;

function generateSharedTravelData() {
  const airlinePairs = [
    { en: 'Saudi Arabian Airlines', ar: 'الخطوط الجوية السعودية' },
    { en: 'Emirates', ar: 'طيران الإمارات' },
    { en: 'Qatar Airways', ar: 'الخطوط الجوية القطرية' },
    { en: 'Etihad Airways', ar: 'طيران الاتحاد' },
    { en: 'Flynas', ar: 'طيران ناس' },
    { en: 'Flyadeal', ar: 'طيران أديل' },
    { en: 'Turkish Airlines', ar: 'الخطوط الجوية التركية' },
    { en: 'Lufthansa', ar: 'لوفتهانزا' }
  ];

  const airportPairs = [
    { en: 'King Khalid International Airport', ar: 'مطار الملك خالد الدولي' },
    { en: 'King Abdulaziz International Airport', ar: 'مطار الملك عبدالعزيز الدولي' },
    { en: 'King Fahd International Airport', ar: 'مطار الملك فهد الدولي' },
    { en: 'Prince Mohammed bin Abdulaziz Airport', ar: 'مطار الأمير محمد بن عبدالعزيز' },
    { en: 'Dubai International Airport', ar: 'مطار دبي الدولي' },
    { en: 'Hamad International Airport', ar: 'مطار حمد الدولي' },
    { en: 'Kuwait International Airport', ar: 'مطار الكويت الدولي' },
    { en: 'Bahrain International Airport', ar: 'مطار البحرين الدولي' }
  ];

  const hotelPairs = [
    { en: 'Ritz-Carlton Riyadh', ar: 'ريتز كارلتون الرياض' },
    { en: 'Four Seasons Hotel', ar: 'فندق فور سيزونز' },
    { en: 'Marriott Hotel', ar: 'فندق ماريوت' },
    { en: 'Hilton Hotel', ar: 'فندق هيلتون' },
    { en: 'InterContinental Hotel', ar: 'فندق إنتركونتيننتال' },
    { en: 'Sheraton Hotel', ar: 'فندق شيراتون' },
    { en: 'Hyatt Regency', ar: 'حياة ريجنسي' },
    { en: 'Radisson Blu', ar: 'راديسون بلو' }
  ];

  const destinationPairs = [
    { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، السعودية' },
    { en: 'Jeddah, Saudi Arabia', ar: 'جدة، السعودية' },
    { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
    { en: 'Doha, Qatar', ar: 'الدوحة، قطر' },
    { en: 'Kuwait City, Kuwait', ar: 'مدينة الكويت، الكويت' },
    { en: 'Manama, Bahrain', ar: 'المنامة، البحرين' },
    { en: 'Istanbul, Turkey', ar: 'إسطنبول، تركيا' },
    { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' }
  ];

  sharedTravelData = {
    airline: randomChoice(airlinePairs),
    airport: randomChoice(airportPairs),
    hotel: randomChoice(hotelPairs),
    destination: randomChoice(destinationPairs)
  };
}

const travelGenerators = {
  flightNumber: () => {
    const airlines = ['SV', 'EK', 'QR', 'EY', 'XY', 'F3', 'TK', 'LH'];
    return `${randomChoice(airlines)}${randomNum(100, 9999)}`;
  },

  airline: () => {
    if (!sharedTravelData) generateSharedTravelData();
    return sharedTravelData.airline.en;
  },

  airlineAr: () => {
    if (!sharedTravelData) generateSharedTravelData();
    return sharedTravelData.airline.ar;
  },

  airport: () => {
    if (!sharedTravelData) generateSharedTravelData();
    return sharedTravelData.airport.en;
  },

  airportAr: () => {
    if (!sharedTravelData) generateSharedTravelData();
    return sharedTravelData.airport.ar;
  },

  hotelName: () => {
    if (!sharedTravelData) generateSharedTravelData();
    return sharedTravelData.hotel.en;
  },

  hotelNameAr: () => {
    if (!sharedTravelData) generateSharedTravelData();
    return sharedTravelData.hotel.ar;
  },

  bookingReference: () => `BK${randomNum(100000, 999999)}`,

  seatNumber: () => {
    const rows = randomNum(1, 60);
    const seats = randomChoice(['A', 'B', 'C', 'D', 'E', 'F']);
    return `${rows}${seats}`;
  },

  gateNumber: () => `${randomChoice(['A', 'B', 'C', 'D'])}${randomNum(1, 50)}`,
  terminal: () => `Terminal ${randomNum(1, 5)}`,

  destination: () => {
    if (!sharedTravelData) generateSharedTravelData();
    return sharedTravelData.destination.en;
  },

  destinationAr: () => {
    if (!sharedTravelData) generateSharedTravelData();
    return sharedTravelData.destination.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { travelGenerators };
} else if (typeof window !== 'undefined') {
  window.travelGenerators = travelGenerators;
}
