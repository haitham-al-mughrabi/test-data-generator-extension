// Security Testing generators
const majorEncryptionMethods = [
  "AES-128",
  "AES-192",
  "AES-256",
  "AES-256-GCM",
  "AES-256-CBC",
  "AES-CTR",
  "RSA-2048",
  "RSA-3072",
  "RSA-4096",
  "ECIES",
  "ElGamal",
  "ECC-P256",
  "ECC-P384",
  "ChaCha20-Poly1305",
  "XChaCha20-Poly1305",
  "Salsa20",
  "Twofish",
  "Serpent",
  "Camellia-256",
  "CAST5",
  "IDEA",
  "RC4",
  "RC5",
  "RC6",
  "SEED",
  "ARIA",
  "SM4",
  "GOST 28147-89",
  "Blowfish",
  "3DES",
  "DES",
];

const majorHashMethods = [
  "MD5",
  "SHA-1",
  "SHA-224",
  "SHA-256",
  "SHA-384",
  "SHA-512",
  "SHA3-256",
  "SHA3-512",
  "BLAKE2b",
  "RIPEMD-160",
];

const tlsVersions = ["TLS 1.0", "TLS 1.1", "TLS 1.2", "TLS 1.3"];
const tlsCipherSuites = [
  "TLS_AES_128_GCM_SHA256",
  "TLS_AES_256_GCM_SHA384",
  "TLS_CHACHA20_POLY1305_SHA256",
  "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
  "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
  "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256",
];

function randomAlphaNum(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
  return out;
}

function randomHex(length) {
  const chars = "0123456789abcdef";
  let out = "";
  for (let i = 0; i < length; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
  return out;
}

function randomBase64(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let out = "";
  for (let i = 0; i < length; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
  return out;
}

function samplePlainText() {
  return randomChoice([
    "Confidential customer record #4821",
    "Payment reference: INV-2026-0087",
    "Reset code for test environment",
    "Top secret QA payload",
    "Internal memo for security review",
  ]);
}

function buildMockEncryptionResult() {
  const method = randomChoice(majorEncryptionMethods);
  const plain = samplePlainText();
  const iv = randomHex(24);
  const keyId = `key_${randomHex(8)}`;
  const cipher = randomBase64(44);
  return {
    method,
    plain,
    iv,
    keyId,
    cipher,
    encryptedText: `${method}|iv:${iv}|cipher:${cipher}`,
    decryptedText: `${method}|decrypted:${plain}`,
  };
}

function buildMockHashResult() {
  const method = randomChoice(majorHashMethods);
  const hashLen = method === "SHA-512" || method === "SHA3-512" || method === "BLAKE2b" ? 128 : 64;
  return {
    method,
    text: samplePlainText(),
    digest: randomHex(hashLen),
  };
}

const securityTestingGenerators = {
  vulnerabilityId: () => `CVE-${randomNum(2020, 2026)}-${randomNum(1000, 99999)}`,

  securityLevel: () => randomChoice(["Critical", "High", "Medium", "Low", "Informational"]),

  encryptionType: () => randomChoice(majorEncryptionMethods),

  authToken: () => `Bearer ${randomAlphaNum(64)}`,

  sessionId: () => randomAlphaNum(32),

  csrfToken: () => randomAlphaNum(40),

  jwtToken: () => {
    const header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    const payload = btoa(
      JSON.stringify({
        sub: `user_${randomNum(1000, 9999)}`,
        name: "Test User",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      }),
    );
    const signature = randomBase64(43);
    return `${header}.${payload}.${signature}`;
  },

  apiKey: () => `sk_test_${randomAlphaNum(48)}`,

  hashValue: () => randomHex(64),

  saltValue: () => randomAlphaNum(16),

  certificateId: () => `CERT_${randomNum(100000, 999999)}`,

  permissionLevel: () =>
    randomChoice(["Read Only", "Read/Write", "Admin", "Super Admin", "Guest", "Moderator", "Editor", "Viewer"]),

  accessRole: () =>
    randomChoice(["USER", "ADMIN", "MODERATOR", "GUEST", "EDITOR", "VIEWER", "MANAGER", "DEVELOPER", "TESTER", "ANALYST"]),

  securityScan: () =>
    randomChoice([
      "No vulnerabilities found",
      "Low risk vulnerabilities detected",
      "Medium risk issues identified",
      "High risk security flaws found",
      "Critical vulnerabilities discovered",
      "SQL injection vulnerability",
      "XSS vulnerability detected",
      "CSRF protection missing",
      "Weak password policy",
      "Insecure data transmission",
    ]),

  penetrationTest: () =>
    randomChoice([
      "Passed - No exploitable vulnerabilities",
      "Failed - Critical vulnerabilities found",
      "Partial - Some security gaps identified",
      "Authentication bypass successful",
      "Privilege escalation possible",
      "Data exfiltration prevented",
      "Network intrusion blocked",
      "Social engineering test failed",
      "Physical security compromised",
      "Encryption successfully broken",
    ]),

  encryptionMethod: () => randomChoice(majorEncryptionMethods),

  encryptionPayload: () => samplePlainText(),

  encryptionKey: () => `key_${randomHex(32)}`,

  encryptedText: () => buildMockEncryptionResult().encryptedText,

  decryptedText: () => buildMockEncryptionResult().decryptedText,

  encryptionRoundTrip: () => {
    const item = buildMockEncryptionResult();
    return `method:${item.method} | plain:${item.plain} | encrypted:${item.cipher} | decrypted:${item.plain}`;
  },

  hashAlgorithm: () => randomChoice(majorHashMethods),

  hashText: () => {
    const item = buildMockHashResult();
    return `${item.method}("${item.text}") = ${item.digest}`;
  },

  hmacValue: () => {
    const method = randomChoice(["HMAC-SHA256", "HMAC-SHA384", "HMAC-SHA512"]);
    return `${method}:${randomHex(64)}`;
  },

  passwordHash: () => randomChoice([
    `$2b$12$${randomBase64(53)}`,
    `$argon2id$v=19$m=65536,t=3,p=4$${randomBase64(22)}$${randomBase64(43)}`,
    `pbkdf2_sha256$260000$${randomAlphaNum(16)}$${randomBase64(44)}`,
  ]),

  keyExchangeProtocol: () => randomChoice(["Diffie-Hellman", "ECDH", "X25519", "RSA Key Exchange", "Kyber (PQC)"]),

  digitalSignature: () => {
    const method = randomChoice(["RSA-PSS", "ECDSA", "Ed25519"]);
    return `${method}:${randomHex(96)}`;
  },

  ivValue: () => randomHex(32),

  nonceValue: () => randomHex(24),

  secureRandomBytes: () => `0x${randomHex(64)}`,

  tlsVersion: () => randomChoice(tlsVersions),

  tlsCipherSuite: () => randomChoice(tlsCipherSuites),

  certificateChainStatus: () =>
    randomChoice([
      "Trusted root + full valid chain",
      "Intermediate certificate missing",
      "Self-signed certificate detected",
      "Chain validation failed (unknown issuer)",
      "Cross-signed chain accepted",
    ]),

  ocspStatus: () =>
    randomChoice([
      "OCSP Good",
      "OCSP Revoked",
      "OCSP Unknown",
      "OCSP responder timeout",
      "OCSP stapling enabled and valid",
    ]),

  crlStatus: () =>
    randomChoice([
      "CRL check passed",
      "CRL endpoint unreachable",
      "Certificate serial present in CRL",
      "CRL stale - update required",
    ]),

  certificateExpiryWarning: () =>
    randomChoice([
      "Certificate valid (expires in 276 days)",
      "Expiry warning: 30 days remaining",
      "Critical expiry: 7 days remaining",
      "Certificate expired",
    ]),

  oauthGrantType: () =>
    randomChoice([
      "authorization_code",
      "client_credentials",
      "refresh_token",
      "device_code",
      "implicit (legacy)",
    ]),

  oidcClaimSet: () =>
    JSON.stringify(
      {
        sub: `user_${randomNum(1000, 9999)}`,
        iss: "https://idp.example.test",
        aud: `app_${randomNum(10, 99)}`,
        amr: randomChoice([["pwd"], ["pwd", "otp"], ["fido2"]]),
      },
      null,
      0,
    ),

  mfaResult: () =>
    randomChoice([
      "MFA passed (TOTP)",
      "MFA passed (WebAuthn)",
      "MFA challenge timeout",
      "MFA failed - invalid OTP",
      "MFA bypass risk flagged",
    ]),

  rbacDecision: () =>
    randomChoice([
      "ALLOW: role=admin action=write",
      "ALLOW: role=editor action=update",
      "DENY: role=viewer action=delete",
      "DENY: role=guest action=read_sensitive",
    ]),

  abacDecision: () =>
    randomChoice([
      "ALLOW: department=Finance, sensitivity=internal",
      "DENY: region mismatch (user=EU, data=US)",
      "DENY: clearance level insufficient",
      "ALLOW: project match + time window valid",
    ]),

  refreshTokenRotation: () =>
    randomChoice([
      "Rotation enabled - token family healthy",
      "Rotation disabled - static refresh token",
      "Reuse detected - token family revoked",
      "Rotation misconfigured - overlap window too long",
    ]),

  kmsKeyId: () => `kms-${randomHex(4)}-${randomHex(4)}-${randomHex(8)}`,

  keyRotationStatus: () =>
    randomChoice([
      "Rotation enabled (90-day schedule)",
      "Rotation due in 14 days",
      "Rotation overdue by 43 days",
      "Manual rotation policy",
    ]),

  keyUsageAudit: () =>
    randomChoice([
      "Encrypt: 12,203 | Decrypt: 8,554 | Sign: 213",
      "Unusual decrypt spike detected",
      "No anomalous key usage patterns",
      "Key used from untrusted workload identity",
    ]),

  secretLeakPattern: () =>
    randomChoice([
      "AWS access key pattern detected in logs",
      "JWT secret exposed in environment dump",
      "No secret leakage signatures detected",
      "Private key block found in repository history",
    ]),

  cspPolicyStatus: () =>
    randomChoice([
      "CSP strict mode enforced",
      "CSP present but unsafe-inline detected",
      "CSP missing for critical route",
      "CSP report-only mode active",
    ]),

  corsConfigStatus: () =>
    randomChoice([
      "CORS restricted to trusted origins",
      "Wildcard CORS with credentials (high risk)",
      "Origin reflection vulnerability detected",
      "Preflight policy too permissive",
    ]),

  cookieSecurityFlags: () =>
    randomChoice([
      "HttpOnly+Secure+SameSite=Strict",
      "Missing HttpOnly flag",
      "Missing Secure flag",
      "SameSite=None without Secure",
    ]),

  ssrfPayload: () =>
    randomChoice([
      "http://169.254.169.254/latest/meta-data/",
      "http://127.0.0.1:2375/version",
      "gopher://127.0.0.1:6379/_INFO",
      "http://[::1]/admin",
    ]),

  openRedirectPayload: () =>
    randomChoice([
      "/redirect?next=https://evil.example",
      "/login?return=//attacker.test",
      "/go?url=%2F%2Fevil.test",
      "/continue?target=https:%5c%5cevil.test",
    ]),

  jwtValidationStatus: () =>
    randomChoice([
      "JWT valid (signature + claims)",
      "JWT expired",
      "JWT invalid signature",
      "JWT missing required audience claim",
      "JWT rejected: alg=none attempt",
    ]),

  apiRateLimitHeader: () =>
    `X-RateLimit-Limit:${randomChoice([60, 120, 1000])} X-RateLimit-Remaining:${randomNum(0, 59)} X-RateLimit-Reset:${Date.now() + randomNum(1000, 60000)}`,

  apiScopeMismatch: () =>
    randomChoice([
      "Token scope mismatch: required=payments:write actual=payments:read",
      "Scope validation passed",
      "Excessive scope granted to service account",
      "Missing scope: users:delete",
    ]),

  replayAttackIndicator: () =>
    randomChoice([
      "No replay indicators",
      "Duplicate nonce detected",
      "Timestamp skew exceeds threshold",
      "Potential replay from repeated JTI claim",
    ]),

  firewallDecision: () =>
    randomChoice([
      "ALLOW tcp/443 from 10.0.0.0/16",
      "DENY tcp/22 from 0.0.0.0/0",
      "DENY udp/53 from untrusted segment",
      "ALLOW with IDS monitoring",
    ]),

  idsAlert: () =>
    randomChoice([
      "IDS: SQL injection signature matched",
      "IDS: brute-force login pattern",
      "IDS: command-and-control callback suspected",
      "IDS: no critical alerts",
    ]),

  portScanResult: () =>
    randomChoice([
      "Open ports: 22, 80, 443",
      "Open ports: 443 only",
      "Unexpected port exposed: 6379",
      "Host filtered - no open ports discovered",
    ]),

  ipReputation: () =>
    randomChoice([
      "Benign reputation score 92/100",
      "Suspicious - listed on 2 threat feeds",
      "Malicious - botnet activity observed",
      "Unknown - insufficient telemetry",
    ]),

  dataMaskingOutput: () =>
    randomChoice([
      "Card: 4111-****-****-1111",
      "Email: j***.d**@example.com",
      "National ID: *********1234",
      "Phone: +9665******45",
    ]),

  piiDetectionLabel: () =>
    randomChoice([
      "PII: Email Address",
      "PII: National Identifier",
      "PII: Phone Number",
      "PII: Financial Account",
      "No PII detected",
    ]),

  dlpEventType: () =>
    randomChoice([
      "DLP block: sensitive data egress",
      "DLP quarantine: policy violation",
      "DLP allow with justification",
      "DLP monitor-only event",
    ]),

  dataResidencyTag: () => randomChoice(["KSA-Only", "EU-Only", "US-Only", "Global-Replicated"]),

  cvssScore: () => (Math.round((Math.random() * 10) * 10) / 10).toFixed(1),

  cvssVector: () =>
    randomChoice([
      "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
      "CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:H/I:L/A:L",
      "CVSS:3.1/AV:L/AC:H/PR:H/UI:R/S:U/C:L/I:L/A:N",
    ]),

  cweId: () => `CWE-${randomChoice([79, 89, 22, 287, 200, 352, 862, 434, 918])}`,

  exploitabilityRating: () => randomChoice(["Low", "Medium", "High", "Critical", "Actively Exploited"]),

  remediationSla: () =>
    randomChoice([
      "Critical: 24h | High: 72h | Medium: 14d",
      "Breach: Critical SLA exceeded",
      "On track with remediation SLA",
      "Awaiting patch from vendor",
    ]),

  signatureVerification: () =>
    randomChoice([
      "Signature verification: PASS",
      "Signature verification: FAIL (mismatch)",
      "Signature verification: FAIL (expired cert)",
      "Signature verification: PASS (timestamped)",
    ]),

  checksumValue: () =>
    randomChoice([
      `SHA-256:${randomHex(64)}`,
      `SHA-512:${randomHex(128)}`,
      `CRC32:${randomHex(8)}`,
      `BLAKE2b:${randomHex(128)}`,
    ]),

  tamperEvidence: () =>
    randomChoice([
      "No tamper evidence detected",
      "Hash mismatch in deployment artifact",
      "Binary modified after signing",
      "Log chain break detected",
    ]),

  securityLogEvent: () =>
    randomChoice([
      "auth.failure user=admin src=203.0.113.10",
      "policy.deny action=delete resource=customer_db",
      "waf.block rule=SQLI-942100",
      "key.rotate success key=kms-1a2b-3c4d",
    ]),

  mitreTechniqueId: () =>
    randomChoice([
      "T1190 Exploit Public-Facing Application",
      "T1110 Brute Force",
      "T1059 Command and Scripting Interpreter",
      "T1078 Valid Accounts",
      "T1566 Phishing",
    ]),

  incidentTriageStatus: () =>
    randomChoice([
      "New - awaiting triage",
      "In progress - containment phase",
      "Escalated to IR team",
      "Resolved - false positive",
      "Resolved - confirmed incident",
    ]),

  falsePositiveLikelihood: () => `${randomChoice(["Low", "Medium", "High"])} (${randomNum(5, 95)}%)`,

  iamMisconfiguration: () =>
    randomChoice([
      "Overprivileged role: wildcard actions detected",
      "No IAM drift detected",
      "Public assume-role trust policy detected",
      "Unused admin policy attachment",
    ]),

  storageExposure: () =>
    randomChoice([
      "Bucket private - access blocked",
      "Bucket public-read misconfiguration",
      "Object ACL grants anonymous read",
      "Signed URL expires too late",
    ]),

  securityGroupDrift: () =>
    randomChoice([
      "No SG drift detected",
      "Inbound 0.0.0.0/0 on tcp/22",
      "New unrestricted rule added outside IaC",
      "Drift corrected by policy engine",
    ]),

  pqcAlgorithm: () => randomChoice(["Kyber-768", "Kyber-1024", "Dilithium-3", "Dilithium-5", "Falcon-512"]),

  hybridCryptoMode: () =>
    randomChoice([
      "Hybrid TLS: X25519 + Kyber-768",
      "Hybrid signature: ECDSA + Dilithium-3",
      "Classical-only mode",
      "PQC pilot enabled for internal traffic",
    ]),
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { securityTestingGenerators };
} else if (typeof window !== 'undefined') {
  window.securityTestingGenerators = securityTestingGenerators;
}
