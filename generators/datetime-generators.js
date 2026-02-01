// Date and time generators
function getCustomDateRange() {
  const dateFrom = document.getElementById('dateFrom');
  const dateTo = document.getElementById('dateTo');
  if (dateFrom && dateTo && dateFrom.value && dateTo.value) {
    return {
      start: new Date(dateFrom.value),
      end: new Date(dateTo.value)
    };
  }
  return {
    start: new Date(2020, 0, 1),
    end: new Date()
  };
}

function getCustomTimeRange() {
  const timeFrom = document.getElementById('timeFrom');
  const timeTo = document.getElementById('timeTo');
  if (timeFrom && timeTo && timeFrom.value && timeTo.value) {
    return {
      start: timeFrom.value,
      end: timeTo.value
    };
  }
  return {
    start: '00:00',
    end: '23:59'
  };
}

function getDateSettings() {
  const includeHijri = document.getElementById('includeHijri');
  const includeGregorian = document.getElementById('includeGregorian');
  const showBothDates = document.getElementById('showBothDates');
  
  return {
    includeHijri: includeHijri?.checked ?? false,
    includeGregorian: includeGregorian?.checked ?? true,
    showBothDates: showBothDates?.checked ?? false
  };
}

function formatCustomDate(date) {
  const format = document.getElementById('dateFormat');
  const formatValue = format ? format.value : 'YYYY-MM-DD';
  
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  switch (formatValue) {
    case 'DD/MM/YYYY': return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY': return `${month}/${day}/${year}`;
    case 'DD-MM-YYYY': return `${day}-${month}-${year}`;
    default: return `${year}-${month}-${day}`;
  }
}

// Simple Hijri conversion (approximation)
function gregorianToHijri(gregorianDate) {
  const gYear = gregorianDate.getFullYear();
  const gMonth = gregorianDate.getMonth() + 1;
  const gDay = gregorianDate.getDate();
  
  // Approximate conversion (not astronomically accurate)
  const totalDays = Math.floor((gYear - 622) * 365.25 + (gMonth - 1) * 30.44 + gDay);
  const hYear = Math.floor(totalDays / 354.37) + 1;
  const remainingDays = totalDays % 354.37;
  const hMonth = Math.floor(remainingDays / 29.53) + 1;
  const hDay = Math.floor(remainingDays % 29.53) + 1;
  
  return {
    year: Math.max(1, hYear),
    month: Math.min(12, Math.max(1, hMonth)),
    day: Math.min(30, Math.max(1, hDay))
  };
}

function hijriToGregorian(hYear, hMonth, hDay) {
  // Approximate conversion
  const totalHijriDays = (hYear - 1) * 354.37 + (hMonth - 1) * 29.53 + hDay;
  const gregorianYear = Math.floor(totalHijriDays / 365.25) + 622;
  const remainingDays = totalHijriDays % 365.25;
  const gregorianMonth = Math.floor(remainingDays / 30.44) + 1;
  const gregorianDay = Math.floor(remainingDays % 30.44) + 1;
  
  return new Date(gregorianYear, gregorianMonth - 1, gregorianDay);
}

function formatDateWithSettings(date) {
  const settings = getDateSettings();
  const gregorianFormatted = formatCustomDate(date);
  
  if (settings.showBothDates) {
    const hijri = gregorianToHijri(date);
    const hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    const hijriFormatted = `${hijri.day} ${hijriMonths[hijri.month - 1]} ${hijri.year}هـ`;
    return `${gregorianFormatted} (${hijriFormatted})`;
  }
  
  if (settings.includeHijri && !settings.includeGregorian) {
    const hijri = gregorianToHijri(date);
    const hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    return `${hijri.day} ${hijriMonths[hijri.month - 1]} ${hijri.year}هـ`;
  }
  
  return gregorianFormatted;
}

const dateTimeGenerators = {
  date: () => {
    const range = getCustomDateRange();
    const date = randomDate(range.start, range.end);
    return formatDateWithSettings(date);
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
    const range = getCustomTimeRange();
    const startParts = range.start.split(':');
    const endParts = range.end.split(':');
    const startMinutes = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
    const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);
    const randomMinutes = randomNum(startMinutes, endMinutes);
    const hour = Math.floor(randomMinutes / 60).toString().padStart(2, '0');
    const minute = (randomMinutes % 60).toString().padStart(2, '0');
    return `${hour}:${minute}`;
  },

  datetime: () => {
    const range = getCustomDateRange();
    const date = randomDate(range.start, range.end);
    const timeRange = getCustomTimeRange();
    const startParts = timeRange.start.split(':');
    const endParts = timeRange.end.split(':');
    const startMinutes = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
    const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);
    const randomMinutes = randomNum(startMinutes, endMinutes);
    const hour = Math.floor(randomMinutes / 60).toString().padStart(2, '0');
    const minute = (randomMinutes % 60).toString().padStart(2, '0');
    return `${formatDateWithSettings(date)} ${hour}:${minute}`;
  },

  hijriToGregorian: () => {
    // Generate random Hijri date and convert to Gregorian
    const hYear = randomNum(1440, 1450);
    const hMonth = randomNum(1, 12);
    const hDay = randomNum(1, 29);
    const gregorianDate = hijriToGregorian(hYear, hMonth, hDay);
    const hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    return `${hDay} ${hijriMonths[hMonth - 1]} ${hYear}هـ → ${formatCustomDate(gregorianDate)}`;
  },

  gregorianToHijri: () => {
    // Generate random Gregorian date and convert to Hijri
    const range = getCustomDateRange();
    const gregorianDate = randomDate(range.start, range.end);
    const hijri = gregorianToHijri(gregorianDate);
    const hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    return `${formatCustomDate(gregorianDate)} → ${hijri.day} ${hijriMonths[hijri.month - 1]} ${hijri.year}هـ`;
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
  month: () => randomChoice(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),

  hijriDate: () => {
    const hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    const day = randomNum(1, 29);
    const month = randomChoice(hijriMonths);
    const year = randomNum(1440, 1450);
    return `${day} ${month} ${year}هـ`;
  },

  dayOfWeekAr: () => randomChoice(['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد']),
  monthAr: () => randomChoice(['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'])
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { dateTimeGenerators };
} else if (typeof window !== 'undefined') {
  window.dateTimeGenerators = dateTimeGenerators;
}
