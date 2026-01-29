// Date and time generators
const dateTimeGenerators = {
  date: () => {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    return randomDate(start, end).toISOString().split('T')[0];
  },

  // Enhanced Date & Time Generators
  datePast: () => {
    const start = new Date(1990, 0, 1);
    const end = new Date();
    return randomDate(start, end).toISOString().split('T')[0];
  },

  datePresent: () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
    return randomDate(start, end).toISOString().split('T')[0];
  },

  dateFuture: () => {
    const start = new Date();
    const end = new Date(2030, 11, 31);
    return randomDate(start, end).toISOString().split('T')[0];
  },

  dateGregorian: () => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2030, 11, 31);
    const date = randomDate(start, end);
    return date.toLocaleDateString('en-GB');
  },

  dateGregorianAr: () => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2030, 11, 31);
    const date = randomDate(start, end);
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  },

  dateHijri: () => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2030, 11, 31);
    const date = randomDate(start, end);
    const hijriDate = gregorianToHijri(date);
    return `${hijriDate.day}/${hijriDate.month}/${hijriDate.year}`;
  },

  dateHijriAr: () => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2030, 11, 31);
    const date = randomDate(start, end);
    const hijriDate = gregorianToHijri(date);
    const hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    return `${hijriDate.day} ${hijriMonths[hijriDate.month - 1]} ${hijriDate.year}`;
  },

  time: () => {
    const hour = randomNum(0, 23).toString().padStart(2, '0');
    const minute = randomNum(0, 59).toString().padStart(2, '0');
    return `${hour}:${minute}`;
  },

  time12: () => {
    const hour = randomNum(1, 12);
    const minute = randomNum(0, 59).toString().padStart(2, '0');
    const ampm = randomChoice(['AM', 'PM']);
    return `${hour}:${minute} ${ampm}`;
  },

  time12Ar: () => {
    const hour = randomNum(1, 12);
    const minute = randomNum(0, 59).toString().padStart(2, '0');
    const ampm = randomChoice(['ص', 'م']);
    return `${hour}:${minute} ${ampm}`;
  },

  datetime: () => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2030, 11, 31);
    const date = randomDate(start, end);
    return date.toISOString().replace('T', ' ').split('.')[0];
  },

  datetimeLocal: () => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2030, 11, 31);
    const date = randomDate(start, end);
    return date.toLocaleString('en-GB');
  },

  datetimeAr: () => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2030, 11, 31);
    const date = randomDate(start, end);
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');
    const ampm = hour >= 12 ? 'م' : 'ص';
    const hour12 = hour % 12 || 12;
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${hour12}:${minute} ${ampm}`;
  },

  timestamp: () => new Date().toISOString(),
  timeZone: () => randomChoice(['UTC+3', 'UTC+2', 'UTC+1', 'UTC+0', 'UTC-5']),
  dayOfWeek: () => randomChoice(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  month: () => randomChoice(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { dateTimeGenerators };
} else if (typeof window !== 'undefined') {
  window.dateTimeGenerators = dateTimeGenerators;
}
