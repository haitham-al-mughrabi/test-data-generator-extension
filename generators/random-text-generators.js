// Random Text generators
function getCustomTextLength() {
  const lengthInput = document.getElementById('textLength');
  return lengthInput && lengthInput.value ? parseInt(lengthInput.value) : 50;
}

function getSelectedCharTypes() {
  const digits = document.getElementById('includeDigits')?.checked;
  const english = document.getElementById('includeEnglish')?.checked;
  const arabic = document.getElementById('includeArabic')?.checked;
  const special = document.getElementById('includeSpecial')?.checked;
  const space = document.getElementById('includeSpace')?.checked;
  
  return { digits, english, arabic, special, space };
}

function generateCustomRandomText() {
  const length = getCustomTextLength();
  const types = getSelectedCharTypes();
  
  let charset = '';
  if (types.digits) charset += '0123456789';
  if (types.english) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  if (types.arabic) charset += 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';
  if (types.special) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (types.space) charset += ' ';
  
  if (!charset) charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

const randomTextGenerators = {
  randomText: () => generateCustomRandomText(),

  randomDigits: () => {
    const length = getCustomTextLength();
    const digits = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return result;
  },

  randomEnglish: () => {
    const length = getCustomTextLength();
    const english = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += english.charAt(Math.floor(Math.random() * english.length));
    }
    return result;
  },

  randomArabic: () => {
    const length = getCustomTextLength();
    const arabic = 'ابتثجحخدذرزسشصضطظعغفقكلمنهويءآأؤإئةى';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += arabic.charAt(Math.floor(Math.random() * arabic.length));
    }
    return result;
  },

  randomSpecial: () => {
    const length = getCustomTextLength();
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`"\'\\';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += special.charAt(Math.floor(Math.random() * special.length));
    }
    return result;
  },

  randomMixed: () => {
    const length = getCustomTextLength();
    const mixed = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzابتثجحخدذرزسشصضطظعغفقكلمنهوي!@#$%^&*()';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += mixed.charAt(Math.floor(Math.random() * mixed.length));
    }
    return result;
  },

  randomArabicNumbers: () => {
    const length = getCustomTextLength();
    const arabicNums = '٠١٢٣٤٥٦٧٨٩';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += arabicNums.charAt(Math.floor(Math.random() * arabicNums.length));
    }
    return result;
  },

  randomIndianNumbers: () => {
    const length = getCustomTextLength();
    const indianNums = '۰۱۲۳۴۵۶۷۸۹';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += indianNums.charAt(Math.floor(Math.random() * indianNums.length));
    }
    return result;
  },

  randomChinese: () => {
    const length = getCustomTextLength();
    const chinese = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chinese.charAt(Math.floor(Math.random() * chinese.length));
    }
    return result;
  },

  randomJapanese: () => {
    const length = getCustomTextLength();
    const japanese = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += japanese.charAt(Math.floor(Math.random() * japanese.length));
    }
    return result;
  },

  randomRussian: () => {
    const length = getCustomTextLength();
    const russian = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += russian.charAt(Math.floor(Math.random() * russian.length));
    }
    return result;
  },

  randomEmoji: () => {
    const length = Math.min(getCustomTextLength(), 100); // Limit emoji length
    const emojis = '😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🤩🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲🥱😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += emojis.charAt(Math.floor(Math.random() * emojis.length));
    }
    return result;
  },

  randomInvalidChars: () => {
    const length = Math.min(getCustomTextLength(), 50); // Limit invalid chars
    // Control characters and other problematic characters
    const invalid = '\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u000B\u000C\u000E\u000F\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001A\u001B\u001C\u001D\u001E\u001F\u007F\u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008A\u008B\u008C\u008D\u008E\u008F\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009A\u009B\u009C\u009D\u009E\u009F';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += invalid.charAt(Math.floor(Math.random() * invalid.length));
    }
    return result;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { randomTextGenerators };
} else if (typeof window !== 'undefined') {
  window.randomTextGenerators = randomTextGenerators;
}
