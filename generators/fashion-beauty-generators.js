// Fashion & Beauty generators
let sharedFashionData = null;

function generateSharedFashionData() {
  const brandPairs = [
    { en: 'Zara', ar: 'زارا' },
    { en: 'H&M', ar: 'إتش آند إم' },
    { en: 'Mango', ar: 'مانجو' },
    { en: 'Centrepoint', ar: 'سنتر بوينت' },
    { en: 'Max Fashion', ar: 'ماكس فاشن' },
    { en: 'Splash', ar: 'سبلاش' },
    { en: 'Namshi', ar: 'نمشي' },
    { en: 'Ounass', ar: 'أوناس' }
  ];

  const colorPairs = [
    { en: 'Black', ar: 'أسود' },
    { en: 'White', ar: 'أبيض' },
    { en: 'Navy Blue', ar: 'أزرق كحلي' },
    { en: 'Beige', ar: 'بيج' },
    { en: 'Burgundy', ar: 'عنابي' },
    { en: 'Emerald Green', ar: 'أخضر زمردي' },
    { en: 'Rose Gold', ar: 'ذهبي وردي' },
    { en: 'Silver', ar: 'فضي' }
  ];

  const materialPairs = [
    { en: 'Cotton', ar: 'قطن' },
    { en: 'Silk', ar: 'حرير' },
    { en: 'Wool', ar: 'صوف' },
    { en: 'Linen', ar: 'كتان' },
    { en: 'Polyester', ar: 'بوليستر' },
    { en: 'Leather', ar: 'جلد' },
    { en: 'Denim', ar: 'دنيم' },
    { en: 'Chiffon', ar: 'شيفون' }
  ];

  const seasonPairs = [
    { en: 'Spring/Summer', ar: 'ربيع/صيف' },
    { en: 'Fall/Winter', ar: 'خريف/شتاء' },
    { en: 'Resort', ar: 'منتجع' },
    { en: 'Pre-Fall', ar: 'ما قبل الخريف' }
  ];

  const designerPairs = [
    { en: 'Amina Al-Jassim', ar: 'أمينة الجاسم' },
    { en: 'Nora Al-Shaikh', ar: 'نورا الشيخ' },
    { en: 'Fatima Al-Rashid', ar: 'فاطمة الراشد' },
    { en: 'Layla Al-Mutairi', ar: 'ليلى المطيري' }
  ];

  const collectionPairs = [
    { en: 'Elegant Evening', ar: 'أمسية أنيقة' },
    { en: 'Modern Classic', ar: 'كلاسيكي عصري' },
    { en: 'Desert Rose', ar: 'وردة الصحراء' },
    { en: 'Royal Heritage', ar: 'التراث الملكي' },
    { en: 'Urban Chic', ar: 'أناقة حضرية' }
  ];

  sharedFashionData = {
    brand: randomChoice(brandPairs),
    color: randomChoice(colorPairs),
    material: randomChoice(materialPairs),
    season: randomChoice(seasonPairs),
    designer: randomChoice(designerPairs),
    collection: randomChoice(collectionPairs),
    price: randomNum(50, 2000)
  };
}

const fashionBeautyGenerators = {
  brandName: () => {
    if (!sharedFashionData) generateSharedFashionData();
    return sharedFashionData.brand.en;
  },

  brandNameAr: () => {
    if (!sharedFashionData) generateSharedFashionData();
    return sharedFashionData.brand.ar;
  },

  productColor: () => {
    if (!sharedFashionData) generateSharedFashionData();
    return sharedFashionData.color.en;
  },

  productColorAr: () => {
    if (!sharedFashionData) generateSharedFashionData();
    return sharedFashionData.color.ar;
  },

  size: () => randomChoice(['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '38', '40', '42', '44']),

  material: () => {
    if (!sharedFashionData) generateSharedFashionData();
    return sharedFashionData.material.en;
  },

  materialAr: () => {
    if (!sharedFashionData) generateSharedFashionData();
    return sharedFashionData.material.ar;
  },

  season: () => {
    if (!sharedFashionData) generateSharedFashionData();
    return sharedFashionData.season.en;
  },

  seasonAr: () => {
    if (!sharedFashionData) generateSharedFashionData();
    return sharedFashionData.season.ar;
  },

  designer: () => {
    if (!sharedFashionData) generateSharedFashionData();
    return sharedFashionData.designer.en;
  },

  designerAr: () => {
    if (!sharedFashionData) generateSharedFashionData();
    return sharedFashionData.designer.ar;
  },

  collection: () => {
    if (!sharedFashionData) generateSharedFashionData();
    return sharedFashionData.collection.en;
  },

  collectionAr: () => {
    if (!sharedFashionData) generateSharedFashionData();
    return sharedFashionData.collection.ar;
  },

  styleCode: () => `STY${randomNum(10000, 99999)}`,

  retailPrice: () => {
    if (!sharedFashionData) generateSharedFashionData();
    return `${sharedFashionData.price} SAR`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fashionBeautyGenerators };
} else if (typeof window !== 'undefined') {
  window.fashionBeautyGenerators = fashionBeautyGenerators;
}
