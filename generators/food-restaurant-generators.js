// Food & Restaurant generators
let sharedFoodData = null;

function generateSharedFoodData() {
  const dishPairs = [
    { en: 'Kabsa', ar: 'كبسة' },
    { en: 'Mandi', ar: 'مندي' },
    { en: 'Shawarma', ar: 'شاورما' },
    { en: 'Hummus', ar: 'حمص' },
    { en: 'Falafel', ar: 'فلافل' },
    { en: 'Biryani', ar: 'برياني' },
    { en: 'Grilled Chicken', ar: 'دجاج مشوي' },
    { en: 'Fish Curry', ar: 'كاري السمك' },
    { en: 'Lamb Ouzi', ar: 'عوزي لحم' },
    { en: 'Stuffed Grape Leaves', ar: 'ورق عنب محشي' }
  ];

  const restaurantPairs = [
    { en: 'Al Najdiyah Restaurant', ar: 'مطعم النجدية' },
    { en: 'Herfy', ar: 'هرفي' },
    { en: 'Al Baik', ar: 'البيك' },
    { en: 'Kudu', ar: 'كودو' },
    { en: 'Al Tazaj', ar: 'التاج' },
    { en: 'Maison de Zaid', ar: 'بيت زايد' },
    { en: 'Al Romansiah', ar: 'الرومانسية' },
    { en: 'Najd Village', ar: 'قرية نجد' }
  ];

  const cuisinePairs = [
    { en: 'Saudi Arabian', ar: 'سعودي' },
    { en: 'Lebanese', ar: 'لبناني' },
    { en: 'Turkish', ar: 'تركي' },
    { en: 'Indian', ar: 'هندي' },
    { en: 'Italian', ar: 'إيطالي' },
    { en: 'Chinese', ar: 'صيني' },
    { en: 'Mexican', ar: 'مكسيكي' },
    { en: 'Mediterranean', ar: 'متوسطي' }
  ];

  const ingredientPairs = [
    { en: 'Rice', ar: 'أرز' },
    { en: 'Chicken', ar: 'دجاج' },
    { en: 'Lamb', ar: 'لحم ضأن' },
    { en: 'Tomatoes', ar: 'طماطم' },
    { en: 'Onions', ar: 'بصل' },
    { en: 'Garlic', ar: 'ثوم' },
    { en: 'Spices', ar: 'بهارات' },
    { en: 'Olive Oil', ar: 'زيت زيتون' }
  ];

  const chefPairs = [
    { en: 'Chef Ahmed Al-Rashid', ar: 'الشيف أحمد الراشد' },
    { en: 'Chef Fatima Al-Zahra', ar: 'الشيف فاطمة الزهراء' },
    { en: 'Chef Omar Al-Ghamdi', ar: 'الشيف عمر الغامدي' },
    { en: 'Chef Nora Al-Mutairi', ar: 'الشيف نورا المطيري' },
    { en: 'Chef Khalid Al-Otaibi', ar: 'الشيف خالد العتيبي' }
  ];

  sharedFoodData = {
    dish: randomChoice(dishPairs),
    restaurant: randomChoice(restaurantPairs),
    cuisine: randomChoice(cuisinePairs),
    ingredient: randomChoice(ingredientPairs),
    chef: randomChoice(chefPairs),
    price: randomNum(15, 150)
  };
}

const foodRestaurantGenerators = {
  dishName: () => {
    if (!sharedFoodData) generateSharedFoodData();
    return sharedFoodData.dish.en;
  },

  dishNameAr: () => {
    if (!sharedFoodData) generateSharedFoodData();
    return sharedFoodData.dish.ar;
  },

  restaurantName: () => {
    if (!sharedFoodData) generateSharedFoodData();
    return sharedFoodData.restaurant.en;
  },

  restaurantNameAr: () => {
    if (!sharedFoodData) generateSharedFoodData();
    return sharedFoodData.restaurant.ar;
  },

  cuisine: () => {
    if (!sharedFoodData) generateSharedFoodData();
    return sharedFoodData.cuisine.en;
  },

  cuisineAr: () => {
    if (!sharedFoodData) generateSharedFoodData();
    return sharedFoodData.cuisine.ar;
  },

  menuPrice: () => {
    if (!sharedFoodData) generateSharedFoodData();
    return `${sharedFoodData.price} SAR`;
  },

  ingredient: () => {
    if (!sharedFoodData) generateSharedFoodData();
    return sharedFoodData.ingredient.en;
  },

  ingredientAr: () => {
    if (!sharedFoodData) generateSharedFoodData();
    return sharedFoodData.ingredient.ar;
  },

  tableNumber: () => randomNum(1, 50),
  orderNumber: () => `ORD${randomNum(100000, 999999)}`,
  deliveryTime: () => `${randomNum(15, 60)} minutes`,

  chefName: () => {
    if (!sharedFoodData) generateSharedFoodData();
    return sharedFoodData.chef.en;
  },

  chefNameAr: () => {
    if (!sharedFoodData) generateSharedFoodData();
    return sharedFoodData.chef.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { foodRestaurantGenerators };
} else if (typeof window !== 'undefined') {
  window.foodRestaurantGenerators = foodRestaurantGenerators;
}
