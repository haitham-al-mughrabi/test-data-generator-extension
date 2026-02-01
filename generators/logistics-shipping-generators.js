// Logistics & Shipping generators
let sharedLogisticsData = null;

function generateSharedLogisticsData() {
  const carrierPairs = [
    { en: 'Saudi Post', ar: 'البريد السعودي' },
    { en: 'SMSA Express', ar: 'سمسا إكسبريس' },
    { en: 'Aramex', ar: 'أرامكس' },
    { en: 'DHL Saudi Arabia', ar: 'دي إتش إل السعودية' },
    { en: 'FedEx', ar: 'فيدكس' },
    { en: 'UPS', ar: 'يو بي إس' },
    { en: 'J&T Express', ar: 'جي آند تي إكسبريس' },
    { en: 'Naqel Express', ar: 'ناقل إكسبريس' }
  ];

  const locationPairs = [
    { en: 'Riyadh', ar: 'الرياض' },
    { en: 'Jeddah', ar: 'جدة' },
    { en: 'Dammam', ar: 'الدمام' },
    { en: 'Mecca', ar: 'مكة المكرمة' },
    { en: 'Medina', ar: 'المدينة المنورة' },
    { en: 'Khobar', ar: 'الخبر' },
    { en: 'Tabuk', ar: 'تبوك' },
    { en: 'Abha', ar: 'أبها' }
  ];

  const statusPairs = [
    { en: 'Shipped', ar: 'تم الشحن' },
    { en: 'In Transit', ar: 'في الطريق' },
    { en: 'Out for Delivery', ar: 'خرج للتسليم' },
    { en: 'Delivered', ar: 'تم التسليم' },
    { en: 'Pending', ar: 'في الانتظار' },
    { en: 'Delayed', ar: 'متأخر' },
    { en: 'Returned', ar: 'مُرتجع' }
  ];

  const warehousePairs = [
    { en: 'Riyadh Distribution Center', ar: 'مركز توزيع الرياض' },
    { en: 'Jeddah Logistics Hub', ar: 'مركز جدة اللوجستي' },
    { en: 'Eastern Province Warehouse', ar: 'مستودع المنطقة الشرقية' },
    { en: 'Central Sorting Facility', ar: 'مرفق الفرز المركزي' }
  ];

  sharedLogisticsData = {
    carrier: randomChoice(carrierPairs),
    origin: randomChoice(locationPairs),
    destination: randomChoice(locationPairs),
    status: randomChoice(statusPairs),
    warehouse: randomChoice(warehousePairs),
    weight: randomNum(1, 50),
    cost: randomNum(15, 200)
  };
}

const logisticsShippingGenerators = {
  shipmentId: () => `SHP${randomNum(1000000, 9999999)}`,

  carrierName: () => {
    if (!sharedLogisticsData) generateSharedLogisticsData();
    return sharedLogisticsData.carrier.en;
  },

  carrierNameAr: () => {
    if (!sharedLogisticsData) generateSharedLogisticsData();
    return sharedLogisticsData.carrier.ar;
  },

  trackingCode: () => `TRK${randomNum(100000000, 999999999)}`,

  origin: () => {
    if (!sharedLogisticsData) generateSharedLogisticsData();
    return sharedLogisticsData.origin.en;
  },

  originAr: () => {
    if (!sharedLogisticsData) generateSharedLogisticsData();
    return sharedLogisticsData.origin.ar;
  },

  destination: () => {
    if (!sharedLogisticsData) generateSharedLogisticsData();
    return sharedLogisticsData.destination.en;
  },

  destinationAr: () => {
    if (!sharedLogisticsData) generateSharedLogisticsData();
    return sharedLogisticsData.destination.ar;
  },

  shipmentWeight: () => {
    if (!sharedLogisticsData) generateSharedLogisticsData();
    return `${sharedLogisticsData.weight} kg`;
  },

  shipmentDimensions: () => `${randomNum(10, 100)}x${randomNum(10, 100)}x${randomNum(5, 50)} cm`,

  deliveryStatus: () => {
    if (!sharedLogisticsData) generateSharedLogisticsData();
    return sharedLogisticsData.status.en;
  },

  deliveryStatusAr: () => {
    if (!sharedLogisticsData) generateSharedLogisticsData();
    return sharedLogisticsData.status.ar;
  },

  shippingCost: () => {
    if (!sharedLogisticsData) generateSharedLogisticsData();
    return `${sharedLogisticsData.cost} SAR`;
  },

  estimatedDelivery: () => {
    const date = new Date();
    date.setDate(date.getDate() + randomNum(1, 7));
    return date.toISOString().split('T')[0];
  },

  warehouseLocation: () => {
    if (!sharedLogisticsData) generateSharedLogisticsData();
    return sharedLogisticsData.warehouse.en;
  },

  warehouseLocationAr: () => {
    if (!sharedLogisticsData) generateSharedLogisticsData();
    return sharedLogisticsData.warehouse.ar;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { logisticsShippingGenerators };
} else if (typeof window !== 'undefined') {
  window.logisticsShippingGenerators = logisticsShippingGenerators;
}
