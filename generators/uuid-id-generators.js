// UUID and ID Generators

// UUID v4 (Random)
function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// UUID v1 (Timestamp-based)
function generateUuidv1() {
  const timestamp = Date.now();
  const clockSeq = Math.floor(Math.random() * 16384);
  const node = Array.from({length: 6}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
  
  const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, '0');
  const timeMid = ((timestamp >> 32) & 0xffff).toString(16).padStart(4, '0');
  const timeHi = (((timestamp >> 48) & 0x0fff) | 0x1000).toString(16).padStart(4, '0');
  const clockSeqHi = ((clockSeq >> 8) | 0x80).toString(16).padStart(2, '0');
  const clockSeqLow = (clockSeq & 0xff).toString(16).padStart(2, '0');
  
  return `${timeLow}-${timeMid}-${timeHi}-${clockSeqHi}${clockSeqLow}-${node}`;
}

// UUID v3 (MD5-based)
function generateUuidv3() {
  const namespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
  const name = Math.random().toString(36).substring(2);
  // Simplified MD5-like hash for demo
  const hash = Array.from(name + namespace).reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0).toString(16).padStart(32, '0').substring(0, 32);
  
  return `${hash.substring(0,8)}-${hash.substring(8,12)}-3${hash.substring(13,16)}-${hash.substring(16,20)}-${hash.substring(20,32)}`;
}

// UUID v5 (SHA-1-based)
function generateUuidv5() {
  const namespace = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
  const name = Math.random().toString(36).substring(2);
  // Simplified SHA-1-like hash for demo
  const hash = Array.from(name + namespace).reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0).toString(16).padStart(40, '0').substring(0, 32);
  
  return `${hash.substring(0,8)}-${hash.substring(8,12)}-5${hash.substring(13,16)}-${hash.substring(16,20)}-${hash.substring(20,32)}`;
}

// GUID (Microsoft format)
function generateGuid() {
  return generateUuid().toUpperCase();
}

// Short UUID (22 characters)
function generateShortUuid() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({length: 22}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// UUID without dashes
function generateUuidNoDashes() {
  return generateUuid().replace(/-/g, '');
}

// MongoDB ObjectId
function generateMongoObjectId() {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const machineId = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
  const processId = Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
  const counter = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
  return timestamp + machineId + processId + counter;
}

// Snowflake ID (Twitter-style)
function generateSnowflakeId() {
  const timestamp = Date.now() - 1288834974657; // Twitter epoch
  const datacenter = Math.floor(Math.random() * 32);
  const worker = Math.floor(Math.random() * 32);
  const sequence = Math.floor(Math.random() * 4096);
  
  return ((timestamp << 22) | (datacenter << 17) | (worker << 12) | sequence).toString();
}

// ULID (Universally Unique Lexicographically Sortable Identifier)
function generateUlid() {
  const encoding = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  const timestamp = Date.now();
  const randomness = Array.from({length: 16}, () => encoding[Math.floor(Math.random() * 32)]).join('');
  
  let timestampStr = '';
  let ts = timestamp;
  for (let i = 0; i < 10; i++) {
    timestampStr = encoding[ts % 32] + timestampStr;
    ts = Math.floor(ts / 32);
  }
  
  return timestampStr + randomness;
}

// KSUID (K-Sortable Unique Identifier)
function generateKsuid() {
  const epoch = 1400000000; // KSUID epoch
  const timestamp = Math.floor(Date.now() / 1000) - epoch;
  const payload = Array.from({length: 16}, () => Math.floor(Math.random() * 256));
  
  const base62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  let num = timestamp;
  
  // Convert timestamp to base62
  while (num > 0) {
    result = base62[num % 62] + result;
    num = Math.floor(num / 62);
  }
  
  // Add random payload
  payload.forEach(byte => {
    result += base62[byte % 62];
  });
  
  return result.padStart(27, '0');
}

// CUID (Collision-resistant Unique Identifier)
function generateCuid() {
  const timestamp = Date.now().toString(36);
  const counter = Math.floor(Math.random() * 1679616).toString(36).padStart(4, '0');
  const fingerprint = Math.floor(Math.random() * 1679616).toString(36).padStart(4, '0');
  const random = Math.floor(Math.random() * 1679616).toString(36).padStart(4, '0');
  
  return 'c' + timestamp + counter + fingerprint + random;
}

// Nano ID
function generateNanoid() {
  const alphabet = '_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from({length: 21}, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
}

// XID
function generateXid() {
  const timestamp = Math.floor(Date.now() / 1000);
  const machineId = Math.floor(Math.random() * 16777216);
  const pid = Math.floor(Math.random() * 65536);
  const counter = Math.floor(Math.random() * 16777216);
  
  return [timestamp, machineId, pid, counter]
    .map(n => n.toString(16).padStart(8, '0'))
    .join('')
    .substring(0, 24);
}

// Alphanumeric ID
function generateAlphanumericId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = Math.floor(Math.random() * 8) + 8; // 8-15 characters
  return Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// Numeric ID
function generateNumericId() {
  const length = Math.floor(Math.random() * 6) + 10; // 10-15 digits
  return Array.from({length}, (_, i) => i === 0 ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 10)).join('');
}

// Hex ID
function generateHexId() {
  const length = Math.floor(Math.random() * 8) + 16; // 16-23 characters
  return Array.from({length}, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

// Base64 ID
function generateBase64Id() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const length = Math.floor(Math.random() * 8) + 16; // 16-23 characters
  return Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// Prefixed ID
function generatePrefixedId() {
  const prefixes = ['usr_', 'ord_', 'prod_', 'inv_', 'cust_', 'sess_', 'txn_', 'acc_'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const id = Array.from({length: 12}, () => Math.floor(Math.random() * 36).toString(36)).join('');
  return prefix + id;
}

// Timestamp ID
function generateTimestampId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return timestamp + random;
}

// Session ID
function generateSessionId() {
  return Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

// JWT Token (mock structure)
function generateJwt() {
  const header = btoa(JSON.stringify({alg: "HS256", typ: "JWT"})).replace(/=/g, '');
  const payload = btoa(JSON.stringify({
    sub: generateUuid(),
    name: "Test User",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600
  })).replace(/=/g, '');
  const signature = Array.from({length: 43}, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'[Math.floor(Math.random() * 64)]).join('');
  
  return `${header}.${payload}.${signature}`;
}

// Hash (SHA-256 style)
function generateHash() {
  return Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

// Random Seed
function generateRandomSeed() {
  return Math.floor(Math.random() * 2147483647);
}
