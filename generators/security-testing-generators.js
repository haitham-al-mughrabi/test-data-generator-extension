// Security Testing generators
const securityTestingGenerators = {
  vulnerabilityId: () => `CVE-${randomNum(2020, 2024)}-${randomNum(1000, 9999)}`,
  
  securityLevel: () => randomChoice([
    'Critical',
    'High', 
    'Medium',
    'Low',
    'Informational'
  ]),

  encryptionType: () => randomChoice([
    'AES-256',
    'AES-128',
    'RSA-2048',
    'RSA-4096',
    'SHA-256',
    'SHA-512',
    'MD5',
    'Blowfish',
    'DES',
    '3DES'
  ]),

  authToken: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 64; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `Bearer ${token}`;
  },

  sessionId: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let session = '';
    for (let i = 0; i < 32; i++) {
      session += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return session;
  },

  csrfToken: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 40; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  },

  jwtToken: () => {
    const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    const payload = btoa(JSON.stringify({
      sub: `user_${randomNum(1000, 9999)}`,
      name: 'Test User',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    }));
    const signature = 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    return `${header}.${payload}.${signature}`;
  },

  apiKey: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'sk_test_';
    for (let i = 0; i < 48; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  },

  hashValue: () => {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 64; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
  },

  saltValue: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let salt = '';
    for (let i = 0; i < 16; i++) {
      salt += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return salt;
  },

  certificateId: () => `CERT_${randomNum(100000, 999999)}`,

  permissionLevel: () => randomChoice([
    'Read Only',
    'Read/Write',
    'Admin',
    'Super Admin',
    'Guest',
    'Moderator',
    'Editor',
    'Viewer'
  ]),

  accessRole: () => randomChoice([
    'USER',
    'ADMIN',
    'MODERATOR',
    'GUEST',
    'EDITOR',
    'VIEWER',
    'MANAGER',
    'DEVELOPER',
    'TESTER',
    'ANALYST'
  ]),

  securityScan: () => randomChoice([
    'No vulnerabilities found',
    'Low risk vulnerabilities detected',
    'Medium risk issues identified',
    'High risk security flaws found',
    'Critical vulnerabilities discovered',
    'SQL injection vulnerability',
    'XSS vulnerability detected',
    'CSRF protection missing',
    'Weak password policy',
    'Insecure data transmission'
  ]),

  penetrationTest: () => randomChoice([
    'Passed - No exploitable vulnerabilities',
    'Failed - Critical vulnerabilities found',
    'Partial - Some security gaps identified',
    'Authentication bypass successful',
    'Privilege escalation possible',
    'Data exfiltration prevented',
    'Network intrusion blocked',
    'Social engineering test failed',
    'Physical security compromised',
    'Encryption successfully broken'
  ])
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { securityTestingGenerators };
} else if (typeof window !== 'undefined') {
  window.securityTestingGenerators = securityTestingGenerators;
}
