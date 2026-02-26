// Currencies and exchange rates generators
const currenciesGenerators = {
  currencyCode: () => {
    const codes = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY', 'RUB', 'INR', 'BRL', 'ZAR', 'SAR', 'AED', 'QAR', 'KWD', 'BHD', 'OMR', 'JOD', 'ILS', 'EGP', 'PKR', 'BDT', 'THB', 'MYR', 'PHP', 'IDR', 'VND', 'TWD', 'HKD', 'SGD', 'MOP', 'CLP', 'COP', 'PEN', 'ARS', 'UYU', 'CRC', 'HNL', 'GTQ', 'NIO', 'DOP', 'CUP', 'JMD', 'TTD', 'BSD', 'BBD', 'BZD', 'XCD', 'ANG', 'AWG', 'SRD', 'GYD', 'FJD', 'PGK', 'SBD', 'TOP', 'WST', 'VUV', 'XPF', 'KZT', 'UZS', 'TJS', 'KGS', 'MNT', 'GEL', 'AMD', 'AZN', 'BYN', 'UAH', 'MDL', 'RON', 'BGN', 'HRK', 'RSD', 'BAM', 'MKD', 'ALL', 'DZD', 'TND', 'LBP', 'SYP', 'IQD', 'IRR', 'AFN', 'LKR', 'MMK', 'LAK', 'KHR', 'BND', 'ETB', 'KES', 'UGX', 'TZS', 'MUR', 'SCR', 'GMD', 'SLL', 'GHS', 'NGN', 'CFA', 'XOF', 'XAF', 'CVE', 'MZN', 'MWK', 'ZMW', 'BWP', 'LSL', 'SZL', 'NAD', 'ANG', 'SRD', 'GYD'];
    return randomChoice(codes);
  },

  currencyName: () => {
    const currencies = [
      { code: 'USD', name: 'US Dollar', ar: 'الدولار الأمريكي' },
      { code: 'EUR', name: 'Euro', ar: 'اليورو' },
      { code: 'GBP', name: 'British Pound', ar: 'الجنيه الإسترليني' },
      { code: 'JPY', name: 'Japanese Yen', ar: 'الين الياباني' },
      { code: 'AUD', name: 'Australian Dollar', ar: 'الدولار الأسترالي' },
      { code: 'CAD', name: 'Canadian Dollar', ar: 'الدولار الكندي' },
      { code: 'CHF', name: 'Swiss Franc', ar: 'الفرنك السويسري' },
      { code: 'CNY', name: 'Chinese Yuan', ar: 'اليوان الصيني' },
      { code: 'SEK', name: 'Swedish Krona', ar: 'الكرونة السويدية' },
      { code: 'NZD', name: 'New Zealand Dollar', ar: 'دولار نيوزيلندا' },
      { code: 'SAR', name: 'Saudi Riyal', ar: 'الريال السعودي' },
      { code: 'AED', name: 'UAE Dirham', ar: 'الدرهم الإماراتي' },
      { code: 'QAR', name: 'Qatari Riyal', ar: 'الريال القطري' },
      { code: 'KWD', name: 'Kuwaiti Dinar', ar: 'الدينار الكويتي' },
      { code: 'BHD', name: 'Bahraini Dinar', ar: 'الدينار البحريني' },
      { code: 'OMR', name: 'Omani Rial', ar: 'الريال العماني' },
      { code: 'JOD', name: 'Jordanian Dinar', ar: 'الدينار الأردني' },
      { code: 'ILS', name: 'Israeli Shekel', ar: 'الشيكل الإسرائيلي' },
      { code: 'EGP', name: 'Egyptian Pound', ar: 'الجنيه المصري' },
      { code: 'TRY', name: 'Turkish Lira', ar: 'الليرة التركية' },
      { code: 'INR', name: 'Indian Rupee', ar: 'الروبية الهندية' },
      { code: 'PKR', name: 'Pakistani Rupee', ar: 'الروبية الباكستانية' },
      { code: 'BDT', name: 'Bangladeshi Taka', ar: 'التاكا البنغلاديشية' },
      { code: 'THB', name: 'Thai Baht', ar: 'البات التايلاندي' },
      { code: 'MYR', name: 'Malaysian Ringgit', ar: 'الرينجت الماليزي' },
      { code: 'SGD', name: 'Singapore Dollar', ar: 'دولار سنغافورة' },
      { code: 'HKD', name: 'Hong Kong Dollar', ar: 'دولار هونج كونج' },
      { code: 'BRL', name: 'Brazilian Real', ar: 'الريال البرازيلي' },
      { code: 'MXN', name: 'Mexican Peso', ar: 'البيزو المكسيكي' },
      { code: 'ZAR', name: 'South African Rand', ar: 'الراند الجنوب أفريقي' }
    ];
    const currency = randomChoice(currencies);
    return { code: currency.code, name: currency.name, ar: currency.ar };
  },

  exchangeRate: (fromCurrency = 'USD', toCurrency = 'EUR') => {
    const rates = {
      'USD': { 'EUR': 0.92, 'GBP': 0.79, 'JPY': 149.50, 'AUD': 1.53, 'CAD': 1.36, 'CHF': 0.88, 'CNY': 7.24, 'SAR': 3.75, 'AED': 3.67, 'INR': 83.12 },
      'EUR': { 'USD': 1.09, 'GBP': 0.86, 'JPY': 162.50, 'AUD': 1.66, 'CAD': 1.48, 'CHF': 0.96, 'CNY': 7.87, 'SAR': 4.08, 'AED': 4.00, 'INR': 90.35 },
      'GBP': { 'USD': 1.27, 'EUR': 1.16, 'JPY': 189.00, 'AUD': 1.93, 'CAD': 1.72, 'CHF': 1.12, 'CNY': 9.15, 'SAR': 4.75, 'AED': 4.65, 'INR': 105.00 },
      'SAR': { 'USD': 0.27, 'EUR': 0.25, 'GBP': 0.21, 'JPY': 39.87, 'AUD': 0.41, 'CAD': 0.36, 'CHF': 0.23, 'CNY': 1.93, 'AED': 0.98, 'INR': 22.17 },
      'AED': { 'USD': 0.27, 'EUR': 0.25, 'GBP': 0.21, 'JPY': 40.68, 'AUD': 0.42, 'CAD': 0.37, 'CHF': 0.24, 'CNY': 1.97, 'SAR': 1.02, 'INR': 22.62 }
    };
    
    if (rates[fromCurrency] && rates[fromCurrency][toCurrency]) {
      return parseFloat((rates[fromCurrency][toCurrency] * (Math.random() * 0.05 + 0.975)).toFixed(4));
    }
    return parseFloat((Math.random() * 2 + 0.5).toFixed(4));
  },

  currencyAmount: (min = 10, max = 10000) => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  },

  currencyConversion: (amount, fromCurrency = 'USD', toCurrency = 'EUR') => {
    const rate = currenciesGenerators.exchangeRate(fromCurrency, toCurrency);
    return {
      amount: parseFloat(amount.toFixed(2)),
      fromCurrency: fromCurrency,
      toCurrency: toCurrency,
      rate: rate,
      convertedAmount: parseFloat((amount * rate).toFixed(2))
    };
  },

  cryptoCurrency: () => {
    const cryptos = ['Bitcoin', 'Ethereum', 'Litecoin', 'Ripple', 'Cardano', 'Polkadot', 'Solana', 'Dogecoin', 'Shiba Inu', 'Polygon'];
    return randomChoice(cryptos);
  },

  cryptoCode: () => {
    const codes = ['BTC', 'ETH', 'LTC', 'XRP', 'ADA', 'DOT', 'SOL', 'DOGE', 'SHIB', 'MATIC', 'USDT', 'USDC', 'DAI', 'BUSD', 'WBTC'];
    return randomChoice(codes);
  },

  cryptoPrice: (min = 100, max = 50000) => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  },

  cryptoWallet: () => {
    const chars = '0123456789abcdef';
    let wallet = '0x';
    for (let i = 0; i < 40; i++) {
      wallet += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return wallet;
  },

  priceRange: (min = 10, max = 1000) => {
    const minPrice = parseFloat(min.toFixed(2));
    const maxPrice = parseFloat(max.toFixed(2));
    return {
      minPrice: minPrice,
      maxPrice: maxPrice,
      averagePrice: parseFloat(((minPrice + maxPrice) / 2).toFixed(2))
    };
  },

  discount: (originalPrice, discountPercent = null) => {
    const discount = discountPercent || Math.floor(Math.random() * 50) + 5;
    const discountAmount = parseFloat((originalPrice * (discount / 100)).toFixed(2));
    const finalPrice = parseFloat((originalPrice - discountAmount).toFixed(2));
    return {
      originalPrice: originalPrice,
      discountPercent: discount,
      discountAmount: discountAmount,
      finalPrice: finalPrice
    };
  },

  tax: (amount, taxRate = 15) => {
    const taxAmount = parseFloat((amount * (taxRate / 100)).toFixed(2));
    const totalWithTax = parseFloat((amount + taxAmount).toFixed(2));
    return {
      amount: amount,
      taxRate: taxRate,
      taxAmount: taxAmount,
      totalWithTax: totalWithTax
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = currenciesGenerators;
} else if (typeof window !== 'undefined') {
  window.currenciesGenerators = currenciesGenerators;
}
