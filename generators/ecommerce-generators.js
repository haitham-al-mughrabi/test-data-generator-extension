// E-commerce generators
let sharedEcommerceData = null;

function generateSharedEcommerceData() {
  const productPairs = [
    { en: 'Wireless Headphones', ar: 'سماعات لاسلكية' },
    { en: 'Smart Watch', ar: 'ساعة ذكية' },
    { en: 'Gaming Laptop', ar: 'لابتوب ألعاب' },
    { en: 'Coffee Maker', ar: 'صانعة القهوة' },
    { en: 'Running Shoes', ar: 'حذاء جري' },
    { en: 'Smartphone', ar: 'هاتف ذكي' },
    { en: 'Tablet', ar: 'جهاز لوحي' },
    { en: 'Backpack', ar: 'حقيبة ظهر' },
    { en: 'Perfume', ar: 'عطر' },
    { en: 'Sunglasses', ar: 'نظارات شمسية' }
  ];

  const categoryPairs = [
    { en: 'Electronics', ar: 'إلكترونيات' },
    { en: 'Fashion', ar: 'أزياء' },
    { en: 'Home & Garden', ar: 'المنزل والحديقة' },
    { en: 'Sports', ar: 'رياضة' },
    { en: 'Beauty', ar: 'جمال' },
    { en: 'Books', ar: 'كتب' },
    { en: 'Automotive', ar: 'سيارات' },
    { en: 'Health', ar: 'صحة' }
  ];

  const brandPairs = [
    { en: 'Samsung', ar: 'سامسونج' },
    { en: 'Apple', ar: 'آبل' },
    { en: 'Nike', ar: 'نايك' },
    { en: 'Adidas', ar: 'أديداس' },
    { en: 'Sony', ar: 'سوني' },
    { en: 'LG', ar: 'إل جي' },
    { en: 'Huawei', ar: 'هواوي' },
    { en: 'Zara', ar: 'زارا' }
  ];

  sharedEcommerceData = {
    product: randomChoice(productPairs),
    category: randomChoice(categoryPairs),
    brand: randomChoice(brandPairs),
    price: randomNum(50, 5000)
  };
}

const ecommerceGenerators = {
  productName: () => {
    if (!sharedEcommerceData) generateSharedEcommerceData();
    return sharedEcommerceData.product.en;
  },

  productNameAr: () => {
    if (!sharedEcommerceData) generateSharedEcommerceData();
    return sharedEcommerceData.product.ar;
  },

  productSku: () => `SKU${randomNum(100000, 999999)}`,

  productPrice: () => {
    if (!sharedEcommerceData) generateSharedEcommerceData();
    return `${sharedEcommerceData.price} SAR`;
  },

  productCategory: () => {
    if (!sharedEcommerceData) generateSharedEcommerceData();
    return sharedEcommerceData.category.en;
  },

  productCategoryAr: () => {
    if (!sharedEcommerceData) generateSharedEcommerceData();
    return sharedEcommerceData.category.ar;
  },

  productBrand: () => {
    if (!sharedEcommerceData) generateSharedEcommerceData();
    return sharedEcommerceData.brand.en;
  },

  productBrandAr: () => {
    if (!sharedEcommerceData) generateSharedEcommerceData();
    return sharedEcommerceData.brand.ar;
  },

  productDescription: () => {
    const descriptions = [
      'High-quality product with excellent features',
      'Premium design with modern technology',
      'Durable and reliable for everyday use',
      'Perfect for professional and personal use'
    ];
    return randomChoice(descriptions);
  },

  productDescriptionAr: () => {
    const descriptions = [
      'منتج عالي الجودة بمميزات ممتازة',
      'تصميم فاخر بتقنية حديثة',
      'متين وموثوق للاستخدام اليومي',
      'مثالي للاستخدام المهني والشخصي'
    ];
    return randomChoice(descriptions);
  },

  orderNumber: () => `ORD${randomNum(1000000, 9999999)}`,
  trackingNumber: () => `TRK${randomNum(100000000, 999999999)}`,
  couponCode: () => `SAVE${randomNum(10, 50)}`,
  reviewRating: () => (randomNum(30, 50) / 10).toFixed(1)
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ecommerceGenerators };
} else if (typeof window !== 'undefined') {
  window.ecommerceGenerators = ecommerceGenerators;
}
