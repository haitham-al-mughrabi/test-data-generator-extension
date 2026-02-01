// Email Testing generators
function getEmailSettings() {
  const domain = document.getElementById('emailDomain')?.value || 'random';
  const customDomain = document.getElementById('customDomain')?.value || 'example.com';
  const format = document.getElementById('emailFormat')?.value || 'standard';
  const length = document.getElementById('emailLength')?.value || 'medium';
  
  return { domain, customDomain, format, length };
}

function generateEmailName(length) {
  const firstNames = ['ahmed', 'fatima', 'omar', 'nora', 'khalid', 'layla', 'salim', 'amina', 'yusuf', 'maryam'];
  const lastNames = ['alrashid', 'alzahra', 'alghamdi', 'almutairi', 'alotaibi', 'alharbi', 'alzahrani'];
  
  let minLen, maxLen;
  switch (length) {
    case 'short': minLen = 3; maxLen = 8; break;
    case 'long': minLen = 15; maxLen = 30; break;
    case 'very-long': minLen = 30; maxLen = 50; break;
    default: minLen = 8; maxLen = 15; break;
  }
  
  const firstName = randomChoice(firstNames);
  const lastName = randomChoice(lastNames);
  const number = randomNum(1, 999);
  
  let name = `${firstName}${number}`;
  if (name.length < minLen) {
    name = `${firstName}.${lastName}${number}`;
  }
  if (name.length > maxLen) {
    name = name.substring(0, maxLen);
  }
  
  return name;
}

function getDomainName(domainSetting, customDomain) {
  if (domainSetting === 'custom') return customDomain;
  if (domainSetting === 'random') {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'test.com', 'example.com'];
    return randomChoice(domains);
  }
  return domainSetting;
}

function generateCustomEmail() {
  const settings = getEmailSettings();
  const name = generateEmailName(settings.length);
  const domain = getDomainName(settings.domain, settings.customDomain);
  
  switch (settings.format) {
    case 'subdomain':
      const subdomain = randomChoice(['mail', 'email', 'user', 'test', 'dev']);
      return `${name}@${subdomain}.${domain}`;
    case 'plus':
      const tag = randomChoice(['work', 'personal', 'test', 'newsletter', 'shopping']);
      return `${name}+${tag}@${domain}`;
    case 'dot':
      const parts = name.split(/[0-9]/);
      if (parts.length > 1) {
        return `${parts[0]}.${parts[1] || 'user'}@${domain}`;
      }
      return `${name.substring(0, name.length/2)}.${name.substring(name.length/2)}@${domain}`;
    case 'underscore':
      return name.includes('.') ? `${name.replace('.', '_')}@${domain}` : `${name}_user@${domain}`;
    case 'hyphen':
      return name.includes('.') ? `${name.replace('.', '-')}@${domain}` : `${name}-user@${domain}`;
    default:
      return `${name}@${domain}`;
  }
}

const emailTestingGenerators = {
  validEmail: () => generateCustomEmail(),

  invalidEmail: () => {
    const invalidFormats = [
      'user@',
      '@domain.com',
      'user@@domain.com',
      'user@domain',
      'user.domain.com',
      'user@domain..com',
      'user@.domain.com',
      'user@domain.com.',
      'user name@domain.com',
      'user@domain .com',
      'user@domain,com',
      'user@domain@com',
      'user@domain.c',
      'user@domain.toolongextension'
    ];
    return randomChoice(invalidFormats);
  },

  businessEmail: () => {
    const businessDomains = ['company.com', 'corp.sa', 'business.net', 'enterprise.org', 'firm.co'];
    const roles = ['admin', 'manager', 'director', 'ceo', 'cto', 'hr', 'sales', 'support'];
    const domain = randomChoice(businessDomains);
    const role = randomChoice(roles);
    return `${role}@${domain}`;
  },

  personalEmail: () => {
    const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const name = generateEmailName('medium');
    const domain = randomChoice(personalDomains);
    return `${name}@${domain}`;
  },

  tempEmail: () => {
    const tempDomains = ['10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com', 'temp-mail.org'];
    const name = generateEmailName('short');
    const domain = randomChoice(tempDomains);
    return `${name}@${domain}`;
  },

  subdomainEmail: () => {
    const subdomains = ['mail', 'email', 'user', 'test', 'dev', 'staging', 'prod'];
    const domains = ['company.com', 'test.org', 'example.net'];
    const name = generateEmailName('medium');
    const subdomain = randomChoice(subdomains);
    const domain = randomChoice(domains);
    return `${name}@${subdomain}.${domain}`;
  },

  internationalEmail: () => {
    const intlDomains = ['example.co.uk', 'test.de', 'mail.fr', 'email.jp', 'user.cn', 'test.in', 'mail.au'];
    const name = generateEmailName('medium');
    const domain = randomChoice(intlDomains);
    return `${name}@${domain}`;
  },

  longEmail: () => {
    const longName = 'verylongusernamethatexceedsnormallimits' + randomNum(1000, 9999);
    const domain = 'verylongdomainnamethatisunusuallylong.com';
    return `${longName}@${domain}`;
  },

  shortEmail: () => {
    const shortName = randomChoice(['a', 'b', 'x', 'z']) + randomNum(1, 9);
    const shortDomain = randomChoice(['a.co', 'b.io', 'x.me', 'z.to']);
    return `${shortName}@${shortDomain}`;
  },

  specialCharEmail: () => {
    const specialNames = [
      'user+tag',
      'user.name',
      'user_name',
      'user-name',
      'user123',
      'user.123',
      'user+123'
    ];
    const name = randomChoice(specialNames);
    const domain = 'example.com';
    return `${name}@${domain}`;
  },

  numericEmail: () => {
    const numericName = randomNum(100000, 999999);
    const domain = randomChoice(['numbers.com', 'digits.org', 'numeric.net']);
    return `${numericName}@${domain}`;
  },

  disposableEmail: () => {
    const disposableDomains = [
      'throwaway.email',
      'discard.email',
      'temporary.email',
      'disposable.email',
      'trash-mail.com',
      'fake-mail.org'
    ];
    const name = generateEmailName('short');
    const domain = randomChoice(disposableDomains);
    return `${name}@${domain}`;
  },

  roleBasedEmail: () => {
    const roles = [
      'admin', 'administrator', 'support', 'help', 'info', 'contact',
      'sales', 'marketing', 'hr', 'noreply', 'no-reply', 'webmaster',
      'postmaster', 'hostmaster', 'abuse', 'security', 'privacy'
    ];
    const role = randomChoice(roles);
    const domain = randomChoice(['company.com', 'business.org', 'corp.net']);
    return `${role}@${domain}`;
  },

  customDomainEmail: () => {
    const settings = getEmailSettings();
    const customDomain = settings.customDomain || 'mydomain.com';
    const name = generateEmailName(settings.length);
    return `${name}@${customDomain}`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { emailTestingGenerators };
} else if (typeof window !== 'undefined') {
  window.emailTestingGenerators = emailTestingGenerators;
}
