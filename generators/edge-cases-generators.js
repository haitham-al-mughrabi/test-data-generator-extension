// Edge Cases generators
const edgeCasesGenerators = {
  nullValue: () => null,
  
  emptyString: () => '',
  
  whitespace: () => randomChoice([
    '   ',
    '\t\t\t',
    '\n\n\n',
    ' \t \n ',
    '     ',
    '\r\n\r\n'
  ]),

  maxLength: () => {
    // Generate very long string (1000+ characters)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = randomNum(1000, 5000);
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  minValue: () => randomChoice([
    -2147483648, // 32-bit signed integer min
    -9223372036854775808, // 64-bit signed integer min
    Number.MIN_SAFE_INTEGER,
    -Number.MAX_VALUE,
    0,
    1
  ]),

  maxValue: () => randomChoice([
    2147483647, // 32-bit signed integer max
    9223372036854775807, // 64-bit signed integer max
    Number.MAX_SAFE_INTEGER,
    Number.MAX_VALUE,
    999999999999999,
    Infinity
  ]),

  negativeNumber: () => -Math.abs(randomNum(1, 999999)),
  
  zeroValue: () => randomChoice([0, 0.0, -0, +0, '0', 'zero']),
  
  floatingPoint: () => randomChoice([
    3.14159265359,
    0.000000001,
    999999.999999,
    1.7976931348623157e+308, // Max float
    2.2250738585072014e-308, // Min positive float
    NaN,
    Infinity,
    -Infinity
  ]),

  specialChars: () => randomChoice([
    '!@#$%^&*()_+-=[]{}|;:,.<>?',
    '~`"\'\\/',
    '©®™€£¥§¶•‰',
    '←↑→↓↔↕↖↗↘↙',
    '♠♣♥♦♪♫☀☁☂☃',
    '½¼¾⅓⅔⅛⅜⅝⅞',
    '°±×÷√∞≈≠≤≥'
  ]),

  unicodeChars: () => randomChoice([
    '🚀🌟💎🔥⚡🎯🎨🎭',
    'αβγδεζηθικλμνξοπρστυφχψω',
    'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
    '中文测试数据生成器',
    'тестовые данные на русском',
    'اختبار البيانات العربية',
    '日本語のテストデータ',
    '한국어 테스트 데이터'
  ]),

  sqlInjection: () => randomChoice([
    "'; DROP TABLE users; --",
    "' OR '1'='1",
    "' UNION SELECT * FROM passwords --",
    "'; INSERT INTO admin VALUES ('hacker', 'password'); --",
    "' OR 1=1 --",
    "admin'--",
    "' OR 'x'='x",
    "'; EXEC xp_cmdshell('dir'); --"
  ]),

  xssPayload: () => randomChoice([
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert("XSS")>',
    '<svg onload=alert("XSS")>',
    'javascript:alert("XSS")',
    '<iframe src="javascript:alert(\'XSS\')"></iframe>',
    '<body onload=alert("XSS")>',
    '<input onfocus=alert("XSS") autofocus>',
    '<select onfocus=alert("XSS") autofocus>'
  ]),

  longText: () => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
    return text.repeat(randomNum(50, 200));
  },

  invalidFormat: () => randomChoice([
    'not-an-email',
    '12345-invalid-phone',
    '99/99/9999', // Invalid date
    'http://invalid url with spaces',
    'user@',
    '@domain.com',
    '123.456.789.999', // Invalid IP
    'INVALID-UUID-FORMAT',
    '99999999999999999999', // Too long number
    'abc123!@#$%^&*()'
  ]),

  boundaryValue: () => randomChoice([
    255, // 8-bit boundary
    256,
    65535, // 16-bit boundary
    65536,
    2147483647, // 32-bit boundary
    2147483648,
    -1,
    0,
    1,
    999,
    1000,
    9999,
    10000
  ])
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { edgeCasesGenerators };
} else if (typeof window !== 'undefined') {
  window.edgeCasesGenerators = edgeCasesGenerators;
}
