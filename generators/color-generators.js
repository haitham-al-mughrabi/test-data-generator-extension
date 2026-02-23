// Color generators - All formats

// Color conversion utilities
const colorConverter = {
  // HEX to RGB
  hexToRgb: (hex) => {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  },

  // RGB to HEX
  rgbToHex: (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  },

  // RGB to HSL
  rgbToHsl: (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  },

  // HSL to RGB
  hslToRgb: (h, s, l) => {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  },

  // RGB to HSV
  rgbToHsv: (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
  },

  // RGB to CMYK
  rgbToCmyk: (r, g, b) => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y);
    
    if (k === 1) {
      c = m = y = 0;
    } else {
      c = Math.round(((c - k) / (1 - k)) * 100);
      m = Math.round(((m - k) / (1 - k)) * 100);
      y = Math.round(((y - k) / (1 - k)) * 100);
      k = Math.round(k * 100);
    }
    return { c, m, y, k };
  },

  // Convert any color to all formats
  convertColor: (color) => {
    let rgb;
    
    // Parse input color
    if (color.startsWith('#')) {
      rgb = colorConverter.hexToRgb(color);
    } else if (color.startsWith('rgb')) {
      const match = color.match(/\d+/g);
      rgb = { r: parseInt(match[0]), g: parseInt(match[1]), b: parseInt(match[2]) };
    } else if (color.startsWith('hsl')) {
      const match = color.match(/\d+/g);
      rgb = colorConverter.hslToRgb(parseInt(match[0]), parseInt(match[1]), parseInt(match[2]));
    } else {
      return null;
    }

    const hsl = colorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsv = colorConverter.rgbToHsv(rgb.r, rgb.g, rgb.b);
    const cmyk = colorConverter.rgbToCmyk(rgb.r, rgb.g, rgb.b);
    const hex = colorConverter.rgbToHex(rgb.r, rgb.g, rgb.b);

    return {
      hex: hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`,
      hsv: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`,
      cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`
    };
  }
};

const colorGenerators = {
  // HEX Color
  hexColor: () => {
    const hex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const color = `#${hex}`;
    return `<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 20px; height: 20px; background: ${color}; border: 1px solid #ccc; border-radius: 4px;"></span>${color}</span>`;
  },

  hexColorShort: () => {
    const hex = Math.floor(Math.random() * 4096).toString(16).padStart(3, '0');
    const color = `#${hex}`;
    return `<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 20px; height: 20px; background: ${color}; border: 1px solid #ccc; border-radius: 4px;"></span>${color}</span>`;
  },

  // RGB Color
  rgbColor: () => {
    const r = randomNum(0, 255);
    const g = randomNum(0, 255);
    const b = randomNum(0, 255);
    const color = `rgb(${r}, ${g}, ${b})`;
    return `<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 20px; height: 20px; background: ${color}; border: 1px solid #ccc; border-radius: 4px;"></span>${color}</span>`;
  },

  rgbaColor: () => {
    const r = randomNum(0, 255);
    const g = randomNum(0, 255);
    const b = randomNum(0, 255);
    const a = (Math.random()).toFixed(2);
    const color = `rgba(${r}, ${g}, ${b}, ${a})`;
    return `<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 20px; height: 20px; background: ${color}; border: 1px solid #ccc; border-radius: 4px;"></span>${color}</span>`;
  },

  // HSL Color
  hslColor: () => {
    const h = randomNum(0, 360);
    const s = randomNum(0, 100);
    const l = randomNum(0, 100);
    const color = `hsl(${h}, ${s}%, ${l}%)`;
    return `<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 20px; height: 20px; background: ${color}; border: 1px solid #ccc; border-radius: 4px;"></span>${color}</span>`;
  },

  hslaColor: () => {
    const h = randomNum(0, 360);
    const s = randomNum(0, 100);
    const l = randomNum(0, 100);
    const a = (Math.random()).toFixed(2);
    const color = `hsla(${h}, ${s}%, ${l}%, ${a})`;
    return `<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 20px; height: 20px; background: ${color}; border: 1px solid #ccc; border-radius: 4px;"></span>${color}</span>`;
  },

  // HSV/HSB Color
  hsvColor: () => {
    const h = randomNum(0, 360);
    const s = randomNum(0, 100);
    const v = randomNum(0, 100);
    const color = `hsv(${h}, ${s}%, ${v}%)`;
    // Convert HSV to HSL for preview
    const hslColor = `hsl(${h}, ${s}%, ${v/2}%)`;
    return `<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 20px; height: 20px; background: ${hslColor}; border: 1px solid #ccc; border-radius: 4px;"></span>${color}</span>`;
  },

  // CMYK Color
  cmykColor: () => {
    const c = randomNum(0, 100);
    const m = randomNum(0, 100);
    const y = randomNum(0, 100);
    const k = randomNum(0, 100);
    const color = `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
    // Approximate CMYK to RGB for preview
    const r = Math.round(255 * (1 - c/100) * (1 - k/100));
    const g = Math.round(255 * (1 - m/100) * (1 - k/100));
    const b = Math.round(255 * (1 - y/100) * (1 - k/100));
    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    return `<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 20px; height: 20px; background: ${rgbColor}; border: 1px solid #ccc; border-radius: 4px;"></span>${color}</span>`;
  },

  // LAB Color
  labColor: () => {
    const l = randomNum(0, 100);
    const a = randomNum(-128, 127);
    const b = randomNum(-128, 127);
    const color = `lab(${l}%, ${a}, ${b})`;
    return `<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 20px; height: 20px; background: hsl(${(a+128)*360/256}, 50%, ${l}%); border: 1px solid #ccc; border-radius: 4px;"></span>${color}</span>`;
  },

  // HWB Color
  hwbColor: () => {
    const h = randomNum(0, 360);
    const w = randomNum(0, 100);
    const b = randomNum(0, 100);
    const color = `hwb(${h} ${w}% ${b}%)`;
    const hslColor = `hsl(${h}, 50%, ${50 - (w-b)/2}%)`;
    return `<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 20px; height: 20px; background: ${hslColor}; border: 1px solid #ccc; border-radius: 4px;"></span>${color}</span>`;
  },

  // Pantone Color
  pantoneColor: () => {
    const pantones = [
      'PANTONE 185 C', 'PANTONE 186 C', 'PANTONE 187 C', 'PANTONE 188 C',
      'PANTONE 200 C', 'PANTONE 201 C', 'PANTONE 202 C', 'PANTONE 203 C',
      'PANTONE 300 C', 'PANTONE 301 C', 'PANTONE 302 C', 'PANTONE 303 C',
      'PANTONE 485 C', 'PANTONE 486 C', 'PANTONE 487 C', 'PANTONE 488 C',
      'PANTONE 2925 C', 'PANTONE 2935 C', 'PANTONE 2945 C', 'PANTONE 2955 C',
      'PANTONE 7689 C', 'PANTONE 7690 C', 'PANTONE 7691 C', 'PANTONE 7692 C'
    ];
    return randomChoice(pantones);
  },

  // RAL Color
  ralColor: () => {
    const ralColors = [
      'RAL 1000', 'RAL 1001', 'RAL 1002', 'RAL 1003', 'RAL 1004',
      'RAL 2000', 'RAL 2001', 'RAL 2002', 'RAL 2003', 'RAL 2004',
      'RAL 3000', 'RAL 3001', 'RAL 3002', 'RAL 3003', 'RAL 3004',
      'RAL 5000', 'RAL 5001', 'RAL 5002', 'RAL 5003', 'RAL 5004',
      'RAL 6000', 'RAL 6001', 'RAL 6002', 'RAL 6003', 'RAL 6004',
      'RAL 7000', 'RAL 7001', 'RAL 7002', 'RAL 7003', 'RAL 7004',
      'RAL 9000', 'RAL 9001', 'RAL 9002', 'RAL 9003', 'RAL 9004'
    ];
    return randomChoice(ralColors);
  },

  // CSS Color Names
  cssColorName: () => {
    const colors = [
      'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure',
      'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue',
      'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse',
      'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson',
      'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray',
      'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange',
      'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue',
      'DarkSlateGray', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue',
      'DimGray', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen',
      'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod',
      'Gray', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink',
      'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender',
      'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral',
      'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGreen', 'LightPink',
      'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue',
      'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta',
      'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple',
      'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed',
      'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite',
      'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange',
      'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise',
      'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink',
      'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red',
      'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown',
      'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue',
      'SlateBlue', 'SlateGray', 'Snow', 'SpringGreen', 'SteelBlue',
      'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise',
      'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'
    ];
    const color = randomChoice(colors);
    return `<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 20px; height: 20px; background: ${color}; border: 1px solid #ccc; border-radius: 4px;"></span>${color}</span>`;
  },

  // Material Design Colors
  materialColor: () => {
    const colors = [
      '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
      '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
      '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
      '#FF5722', '#795548', '#9E9E9E', '#607D8B'
    ];
    const color = randomChoice(colors);
    return `<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 20px; height: 20px; background: ${color}; border: 1px solid #ccc; border-radius: 4px;"></span>${color}</span>`;
  },

  // Tailwind CSS Colors
  tailwindColor: () => {
    const colors = [
      'slate-500', 'gray-500', 'zinc-500', 'neutral-500', 'stone-500',
      'red-500', 'orange-500', 'amber-500', 'yellow-500', 'lime-500',
      'green-500', 'emerald-500', 'teal-500', 'cyan-500', 'sky-500',
      'blue-500', 'indigo-500', 'violet-500', 'purple-500', 'fuchsia-500',
      'pink-500', 'rose-500'
    ];
    return randomChoice(colors);
  },

  // Bootstrap Colors
  bootstrapColor: () => {
    const colors = [
      'primary', 'secondary', 'success', 'danger', 'warning',
      'info', 'light', 'dark', 'muted', 'white'
    ];
    return randomChoice(colors);
  },

  // Gradient
  cssGradient: () => {
    const hex1 = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const hex2 = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const color1 = `#${hex1}`;
    const color2 = `#${hex2}`;
    const angle = randomNum(0, 360);
    const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    return `<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 40px; height: 20px; background: ${gradient}; border: 1px solid #ccc; border-radius: 4px;"></span>${gradient}</span>`;
  },

  // Color Converters (generate a color and show all formats)
  colorAllFormats: () => {
    const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const converted = colorConverter.convertColor(hex);
    return JSON.stringify(converted, null, 2);
  },

  hexToRgbConverter: () => {
    const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const rgb = colorConverter.hexToRgb(hex);
    const rgbValue = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    return `<div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; font-size: 12px; color: #64748b;">Input:</span>
          <span style="display: inline-block; width: 32px; height: 32px; background: ${hex}; border: 1px solid #ccc; border-radius: 4px;"></span>
        </div>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${hex}</code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; font-size: 12px; color: #64748b;">Output:</span>
          <span style="display: inline-block; width: 32px; height: 32px; background: ${rgbValue}; border: 1px solid #ccc; border-radius: 4px;"></span>
        </div>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${rgbValue}</code>
      </div>
    </div>`;
  },

  hexToHslConverter: () => {
    const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const rgb = colorConverter.hexToRgb(hex);
    const hsl = colorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hslValue = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    return `<div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; font-size: 12px; color: #64748b;">Input:</span>
          <span style="display: inline-block; width: 32px; height: 32px; background: ${hex}; border: 1px solid #ccc; border-radius: 4px;"></span>
        </div>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${hex}</code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; font-size: 12px; color: #64748b;">Output:</span>
          <span style="display: inline-block; width: 32px; height: 32px; background: ${hslValue}; border: 1px solid #ccc; border-radius: 4px;"></span>
        </div>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${hslValue}</code>
      </div>
    </div>`;
  },

  hexToCmykConverter: () => {
    const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const rgb = colorConverter.hexToRgb(hex);
    const cmyk = colorConverter.rgbToCmyk(rgb.r, rgb.g, rgb.b);
    const cmykValue = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    return `<div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; font-size: 12px; color: #64748b;">Input:</span>
          <span style="display: inline-block; width: 32px; height: 32px; background: ${hex}; border: 1px solid #ccc; border-radius: 4px;"></span>
        </div>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${hex}</code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span style="font-weight: 600; font-size: 12px; color: #64748b;">Output:</span>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${cmykValue}</code>
      </div>
    </div>`;
  },

  rgbToHexConverter: () => {
    const r = randomNum(0, 255);
    const g = randomNum(0, 255);
    const b = randomNum(0, 255);
    const hex = colorConverter.rgbToHex(r, g, b);
    const rgbValue = `rgb(${r}, ${g}, ${b})`;
    return `<div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; font-size: 12px; color: #64748b;">Input:</span>
          <span style="display: inline-block; width: 32px; height: 32px; background: ${rgbValue}; border: 1px solid #ccc; border-radius: 4px;"></span>
        </div>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${rgbValue}</code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; font-size: 12px; color: #64748b;">Output:</span>
          <span style="display: inline-block; width: 32px; height: 32px; background: ${hex}; border: 1px solid #ccc; border-radius: 4px;"></span>
        </div>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${hex}</code>
      </div>
    </div>`;
  },

  rgbToHslConverter: () => {
    const r = randomNum(0, 255);
    const g = randomNum(0, 255);
    const b = randomNum(0, 255);
    const hsl = colorConverter.rgbToHsl(r, g, b);
    const rgbValue = `rgb(${r}, ${g}, ${b})`;
    const hslValue = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    return `<div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; font-size: 12px; color: #64748b;">Input:</span>
          <span style="display: inline-block; width: 32px; height: 32px; background: ${rgbValue}; border: 1px solid #ccc; border-radius: 4px;"></span>
        </div>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${rgbValue}</code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; font-size: 12px; color: #64748b;">Output:</span>
          <span style="display: inline-block; width: 32px; height: 32px; background: ${hslValue}; border: 1px solid #ccc; border-radius: 4px;"></span>
        </div>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${hslValue}</code>
      </div>
    </div>`;
  },

  hslToRgbConverter: () => {
    const h = randomNum(0, 360);
    const s = randomNum(0, 100);
    const l = randomNum(0, 100);
    const rgb = colorConverter.hslToRgb(h, s, l);
    const hslValue = `hsl(${h}, ${s}%, ${l}%)`;
    const rgbValue = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    return `<div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; font-size: 12px; color: #64748b;">Input:</span>
          <span style="display: inline-block; width: 32px; height: 32px; background: ${hslValue}; border: 1px solid #ccc; border-radius: 4px;"></span>
        </div>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${hslValue}</code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; font-size: 12px; color: #64748b;">Output:</span>
          <span style="display: inline-block; width: 32px; height: 32px; background: ${rgbValue}; border: 1px solid #ccc; border-radius: 4px;"></span>
        </div>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${rgbValue}</code>
      </div>
    </div>`;
  },

  hslToHexConverter: () => {
    const h = randomNum(0, 360);
    const s = randomNum(0, 100);
    const l = randomNum(0, 100);
    const rgb = colorConverter.hslToRgb(h, s, l);
    const hex = colorConverter.rgbToHex(rgb.r, rgb.g, rgb.b);
    const hslValue = `hsl(${h}, ${s}%, ${l}%)`;
    return `<div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; font-size: 12px; color: #64748b;">Input:</span>
          <span style="display: inline-block; width: 32px; height: 32px; background: ${hslValue}; border: 1px solid #ccc; border-radius: 4px;"></span>
        </div>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${hslValue}</code>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 600; font-size: 12px; color: #64748b;">Output:</span>
          <span style="display: inline-block; width: 32px; height: 32px; background: ${hex}; border: 1px solid #ccc; border-radius: 4px;"></span>
        </div>
        <code style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px; cursor: pointer; display: block;">${hex}</code>
      </div>
    </div>`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { colorGenerators, colorConverter };
} else {
  window.colorGenerators = colorGenerators;
  window.colorConverter = colorConverter;
}
