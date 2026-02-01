// Vehicle generators
let sharedVehicleData = null;

function generateSharedVehicleData() {
  const carBrandPairs = [
    { en: 'Toyota', ar: 'تويوتا' },
    { en: 'Honda', ar: 'هوندا' },
    { en: 'Nissan', ar: 'نيسان' },
    { en: 'Hyundai', ar: 'هيونداي' },
    { en: 'BMW', ar: 'بي إم دبليو' },
    { en: 'Mercedes-Benz', ar: 'مرسيدس بنز' },
    { en: 'Audi', ar: 'أودي' },
    { en: 'Lexus', ar: 'لكزس' },
    { en: 'Chevrolet', ar: 'شيفروليه' },
    { en: 'Ford', ar: 'فورد' }
  ];

  const carModelPairs = [
    { en: 'Camry', ar: 'كامري' },
    { en: 'Accord', ar: 'أكورد' },
    { en: 'Altima', ar: 'التيما' },
    { en: 'Sonata', ar: 'سوناتا' },
    { en: 'Corolla', ar: 'كورولا' },
    { en: 'Civic', ar: 'سيفيك' },
    { en: 'Elantra', ar: 'إلانترا' },
    { en: 'Prado', ar: 'برادو' },
    { en: 'Fortuner', ar: 'فورتشنر' },
    { en: 'Patrol', ar: 'باترول' }
  ];

  const colorPairs = [
    { en: 'White', ar: 'أبيض' },
    { en: 'Black', ar: 'أسود' },
    { en: 'Silver', ar: 'فضي' },
    { en: 'Gray', ar: 'رمادي' },
    { en: 'Blue', ar: 'أزرق' },
    { en: 'Red', ar: 'أحمر' },
    { en: 'Gold', ar: 'ذهبي' },
    { en: 'Brown', ar: 'بني' },
    { en: 'Green', ar: 'أخضر' },
    { en: 'Beige', ar: 'بيج' }
  ];

  sharedVehicleData = {
    brand: randomChoice(carBrandPairs),
    model: randomChoice(carModelPairs),
    color: randomChoice(colorPairs),
    year: randomNum(2010, 2024)
  };
}

const vehicleGenerators = {
  licensePlate: () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let plate = '';
    for (let i = 0; i < 3; i++) {
      plate += letters[randomNum(0, 25)];
    }
    plate += ' ';
    for (let i = 0; i < 4; i++) {
      plate += randomNum(0, 9);
    }
    return plate;
  },

  carBrand: () => {
    if (!sharedVehicleData) generateSharedVehicleData();
    return sharedVehicleData.brand.en;
  },

  carBrandAr: () => {
    if (!sharedVehicleData) generateSharedVehicleData();
    return sharedVehicleData.brand.ar;
  },

  carModel: () => {
    if (!sharedVehicleData) generateSharedVehicleData();
    return sharedVehicleData.model.en;
  },

  carModelAr: () => {
    if (!sharedVehicleData) generateSharedVehicleData();
    return sharedVehicleData.model.ar;
  },

  carYear: () => {
    if (!sharedVehicleData) generateSharedVehicleData();
    return sharedVehicleData.year;
  },

  carColor: () => {
    if (!sharedVehicleData) generateSharedVehicleData();
    return sharedVehicleData.color.en;
  },

  carColorAr: () => {
    if (!sharedVehicleData) generateSharedVehicleData();
    return sharedVehicleData.color.ar;
  },

  vin: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let vin = '';
    for (let i = 0; i < 17; i++) {
      vin += chars[randomNum(0, chars.length - 1)];
    }
    return vin;
  },

  engineNumber: () => `ENG${randomNum(100000, 999999)}`
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { vehicleGenerators };
} else if (typeof window !== 'undefined') {
  window.vehicleGenerators = vehicleGenerators;
}
