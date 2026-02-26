// Numbers generators - All types of numbers

const numbersGenerators = {
  // Basic Numbers
  integer: () => Math.floor(Math.random() * 1000000),
  positiveInteger: () => Math.floor(Math.random() * 1000000) + 1,
  negativeInteger: () => -Math.floor(Math.random() * 1000000) - 1,
  decimal: () => (Math.random() * 1000000 - 500000).toFixed(2),
  positiveDecimal: () => (Math.random() * 1000000).toFixed(2),
  negativeDecimal: () => -(Math.random() * 1000000).toFixed(2),
  percentage: () => (Math.random() * 100).toFixed(2) + '%',
  fraction: () => {
    const n = Math.floor(Math.random() * 100) + 1;
    const d = Math.floor(Math.random() * 100) + 1;
    return `${n}/${d}`;
  },
  evenNumber: () => Math.floor(Math.random() * 500000) * 2,
  oddNumber: () => Math.floor(Math.random() * 500000) * 2 + 1,
  primeNumber: () => {
    const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541];
    return primes[Math.floor(Math.random() * primes.length)];
  },
  wholeNumber: () => Math.floor(Math.random() * 1000000),
  naturalNumber: () => Math.floor(Math.random() * 1000000) + 1,
  realNumber: () => (Math.random() * 2000000 - 1000000).toFixed(4),
  
  // Number Systems
  binaryNumber: () => '0b' + Math.floor(Math.random() * 65536).toString(2),
  octalNumber: () => '0o' + Math.floor(Math.random() * 65536).toString(8),
  hexadecimalNumber: () => '0x' + Math.floor(Math.random() * 65536).toString(16).toUpperCase(),
  scientificNotation: () => {
    const base = (Math.random() * 9 + 1).toFixed(2);
    const exp = Math.floor(Math.random() * 20) - 10;
    return `${base}e${exp >= 0 ? '+' : ''}${exp}`;
  },
  romanNumeral: () => {
    const num = Math.floor(Math.random() * 3999) + 1;
    const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
    let result = '', n = num;
    for (let i = 0; i < vals.length; i++) {
      while (n >= vals[i]) { result += syms[i]; n -= vals[i]; }
    }
    return result;
  },
  
  // Complex Numbers
  complexNumber: () => {
    const real = (Math.random() * 200 - 100).toFixed(2);
    const imag = (Math.random() * 200 - 100).toFixed(2);
    return `${real} ${imag >= 0 ? '+' : ''}${imag}i`;
  },
  imaginaryNumber: () => (Math.random() * 200 - 100).toFixed(2) + 'i',
  rationalNumber: () => (Math.random() * 1000 - 500).toFixed(4),
  irrationalNumber: () => {
    const irr = [
      {name:'π',value:Math.PI},{name:'√2',value:Math.sqrt(2)},{name:'√3',value:Math.sqrt(3)},
      {name:'√5',value:Math.sqrt(5)},{name:'e',value:Math.E},{name:'φ',value:(1+Math.sqrt(5))/2}
    ];
    const s = irr[Math.floor(Math.random() * irr.length)];
    return `${s.name} ≈ ${s.value.toFixed(6)}`;
  },
  absoluteValue: () => {
    const v = Math.floor(Math.random() * 1000000) - 500000;
    return `|${v}| = ${Math.abs(v)}`;
  },
  
  // Special Numbers
  squareNumber: () => { const b = Math.floor(Math.random() * 1000) + 1; return b * b; },
  cubeNumber: () => { const b = Math.floor(Math.random() * 100) + 1; return b * b * b; },
  fibonacciNumber: () => {
    const fibs = [0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765,10946,17711,28657,46368,75025,121393,196418,317811,514229,832040,1346269,2178309,3524578,5702887,9227465,14930352,24157817,39088169];
    return fibs[Math.floor(Math.random() * fibs.length)];
  },
  factorial: () => {
    const n = Math.floor(Math.random() * 12) + 1;
    let r = 1; for (let i = 2; i <= n; i++) r *= i;
    return `${n}! = ${r}`;
  },
  powerOf2: () => Math.pow(2, Math.floor(Math.random() * 20)),
  powerOf10: () => Math.pow(10, Math.floor(Math.random() * 12)),
  zero: () => 0,
  one: () => 1,
  infinity: () => '∞',
  pi: () => Math.PI.toFixed(10),
  eulerNumber: () => Math.E.toFixed(10),
  goldenRatio: () => ((1 + Math.sqrt(5)) / 2).toFixed(10),
  
  // Ranges & Digits
  randomRange1to100: () => Math.floor(Math.random() * 100) + 1,
  randomRange1to1000: () => Math.floor(Math.random() * 1000) + 1,
  randomRange0to1: () => Math.random().toFixed(6),
  digit: () => Math.floor(Math.random() * 10),
  twoDigits: () => Math.floor(Math.random() * 90) + 10,
  threeDigits: () => Math.floor(Math.random() * 900) + 100,
  fourDigits: () => Math.floor(Math.random() * 9000) + 1000,
  fiveDigits: () => Math.floor(Math.random() * 90000) + 10000,
  sixDigits: () => Math.floor(Math.random() * 900000) + 100000,
  
  // ID Numbers
  sequenceNumber: () => `SEQ-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
  serialNumber: () => `SN${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
  referenceNumber: () => `REF-${Math.floor(Math.random() * 1000000000)}`,
  orderNumber: () => `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  invoiceNumber: () => `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
  ticketNumber: () => `TKT-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
  confirmationNumber: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let r = ''; for (let i = 0; i < 8; i++) r += chars.charAt(Math.floor(Math.random() * chars.length));
    return r;
  },
  trackingNumber: () => `TRK${Math.floor(Math.random() * 10000000000)}`,
  barcodeNumber: () => {
    let code = ''; for (let i = 0; i < 12; i++) code += Math.floor(Math.random() * 10);
    let sum = 0; for (let i = 0; i < 12; i++) sum += parseInt(code[i]) * (i % 2 === 0 ? 1 : 3);
    return code + ((10 - (sum % 10)) % 10);
  },
  isbnNumber: () => {
    let code = '978'; for (let i = 0; i < 9; i++) code += Math.floor(Math.random() * 10);
    let sum = 0; for (let i = 0; i < 12; i++) sum += parseInt(code[i]) * (i % 2 === 0 ? 1 : 3);
    return code + ((10 - (sum % 10)) % 10);
  },
  versionNumber: () => `${Math.floor(Math.random()*10)}.${Math.floor(Math.random()*20)}.${Math.floor(Math.random()*100)}`,
  portNumber: () => Math.floor(Math.random() * 65535) + 1,
  
  // Coordinates & Location
  latitude: () => (Math.random() * 180 - 90).toFixed(6),
  longitude: () => (Math.random() * 360 - 180).toFixed(6),
  altitude: () => Math.floor(Math.random() * 9000) - 500,
  
  // Temperature
  temperatureCelsius: () => (Math.random() * 100 - 20).toFixed(1) + '°C',
  temperatureFahrenheit: () => (Math.random() * 180 - 4).toFixed(1) + '°F',
  temperatureKelvin: () => (Math.random() * 373 + 253).toFixed(1) + 'K',
  
  // Weight & Mass
  weightKg: () => (Math.random() * 200).toFixed(2) + ' kg',
  weightLbs: () => (Math.random() * 440).toFixed(2) + ' lbs',
  
  // Height & Length
  heightCm: () => Math.floor(Math.random() * 100 + 140) + ' cm',
  heightFeet: () => {
    const ft = Math.floor(Math.random() * 3 + 4);
    const inch = Math.floor(Math.random() * 12);
    return `${ft}'${inch}"`;
  },
  distanceKm: () => (Math.random() * 1000).toFixed(2) + ' km',
  distanceMiles: () => (Math.random() * 621).toFixed(2) + ' miles',
  
  // Speed & Velocity
  speedKmh: () => Math.floor(Math.random() * 200) + ' km/h',
  speedMph: () => Math.floor(Math.random() * 124) + ' mph',
  
  // Area & Volume
  areaSqMeters: () => (Math.random() * 1000).toFixed(2) + ' m²',
  areaSqFeet: () => (Math.random() * 10764).toFixed(2) + ' ft²',
  volumeLiters: () => (Math.random() * 100).toFixed(2) + ' L',
  volumeGallons: () => (Math.random() * 26.4).toFixed(2) + ' gal',
  
  // Angles
  angleDegrees: () => Math.floor(Math.random() * 360) + '°',
  angleRadians: () => (Math.random() * 2 * Math.PI).toFixed(4) + ' rad',
  
  // Ratings & Scores
  probability: () => Math.random().toFixed(4),
  score: () => Math.floor(Math.random() * 101),
  rating1to5: () => Math.floor(Math.random() * 5) + 1,
  rating1to10: () => Math.floor(Math.random() * 10) + 1,
  quantity: () => Math.floor(Math.random() * 1000) + 1,
  count: () => Math.floor(Math.random() * 10000),
  index: () => Math.floor(Math.random() * 1000),
  rank: () => Math.floor(Math.random() * 100) + 1,
  level: () => Math.floor(Math.random() * 100) + 1,
  
  // Time Values
  age: () => Math.floor(Math.random() * 100) + 1,
  year: () => Math.floor(Math.random() * 100) + 1950,
  month: () => Math.floor(Math.random() * 12) + 1,
  day: () => Math.floor(Math.random() * 31) + 1,
  hour: () => Math.floor(Math.random() * 24),
  minute: () => Math.floor(Math.random() * 60),
  second: () => Math.floor(Math.random() * 60),
  millisecond: () => Math.floor(Math.random() * 1000),
  unixTimestamp: () => Math.floor(Date.now() / 1000),
  timestampMs: () => Date.now(),
  
  // Computer & Tech
  randomSeed: () => Math.floor(Math.random() * 4294967296),
  hashCode: () => Math.floor(Math.random() * 2147483647),
  memorySizeBytes: () => Math.floor(Math.random() * 1073741824),
  memorySizeKB: () => (Math.random() * 1048576).toFixed(2) + ' KB',
  memorySizeMB: () => (Math.random() * 1024).toFixed(2) + ' MB',
  memorySizeGB: () => (Math.random() * 1024).toFixed(2) + ' GB',
  fileSizeBytes: () => Math.floor(Math.random() * 10737418240),
  bandwidthMbps: () => (Math.random() * 1000).toFixed(2) + ' Mbps',
  
  // Physics & Engineering
  frequencyHz: () => (Math.random() * 20000).toFixed(2) + ' Hz',
  voltageV: () => (Math.random() * 240).toFixed(2) + ' V',
  currentA: () => (Math.random() * 100).toFixed(2) + ' A',
  powerW: () => (Math.random() * 10000).toFixed(2) + ' W',
  energyKWh: () => (Math.random() * 1000).toFixed(2) + ' kWh',
  pressurePa: () => (Math.random() * 101325).toFixed(2) + ' Pa',
  humidityPercent: () => Math.floor(Math.random() * 100) + '%',
  phLevel: () => (Math.random() * 14).toFixed(2),
  
  // Decimal Precision
  decimal2Places: () => (Math.random() * 1000).toFixed(2),
  decimal4Places: () => (Math.random() * 1000).toFixed(4),
  decimal6Places: () => (Math.random() * 1000).toFixed(6),
  
  // Large & Small
  largeNumberMillion: () => (Math.random() * 1000000).toFixed(0),
  largeNumberBillion: () => (Math.random() * 1000000000).toFixed(0),
  smallNumber: () => (Math.random() * 0.999 + 0.001).toFixed(6),
  tinyNumber: () => {
    const base = (Math.random() * 9 + 1).toFixed(2);
    const exp = Math.floor(Math.random() * 10) + 1;
    return `${base}e-${exp}`;
  },
  hugeNumber: () => {
    const base = (Math.random() * 9 + 1).toFixed(2);
    const exp = Math.floor(Math.random() * 100) + 10;
    return `${base}e+${exp}`;
  },
  
  // Mathematical Functions
  squareRoot: () => {
    const num = Math.floor(Math.random() * 1000) + 1;
    return `√${num} = ${Math.sqrt(num).toFixed(4)}`;
  },
  cubeRoot: () => {
    const num = Math.floor(Math.random() * 1000) + 1;
    return `∛${num} = ${Math.cbrt(num).toFixed(4)}`;
  },
  logarithm: () => {
    const num = Math.floor(Math.random() * 1000) + 1;
    return `log₁₀(${num}) = ${Math.log10(num).toFixed(4)}`;
  },
  naturalLogarithm: () => {
    const num = Math.floor(Math.random() * 1000) + 1;
    return `ln(${num}) = ${Math.log(num).toFixed(4)}`;
  },
  exponential: () => {
    const exp = Math.floor(Math.random() * 10);
    return `e^${exp} = ${Math.exp(exp).toFixed(4)}`;
  },
  sine: () => {
    const angle = Math.floor(Math.random() * 360);
    return `sin(${angle}°) = ${Math.sin(angle * Math.PI / 180).toFixed(4)}`;
  },
  cosine: () => {
    const angle = Math.floor(Math.random() * 360);
    return `cos(${angle}°) = ${Math.cos(angle * Math.PI / 180).toFixed(4)}`;
  },
  tangent: () => {
    const angle = Math.floor(Math.random() * 360);
    return `tan(${angle}°) = ${Math.tan(angle * Math.PI / 180).toFixed(4)}`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { numbersGenerators };
} else if (typeof window !== 'undefined') {
  window.numbersGenerators = numbersGenerators;
}
