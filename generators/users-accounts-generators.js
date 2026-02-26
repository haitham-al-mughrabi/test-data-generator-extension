// Users and Accounts generators
const usersAccountsGenerators = {
  username: () => {
    const adjectives = ['cool', 'smart', 'fast', 'happy', 'lucky', 'brave', 'swift', 'bright', 'clever', 'mighty'];
    const nouns = ['tiger', 'eagle', 'dragon', 'phoenix', 'wolf', 'lion', 'shark', 'falcon', 'panda', 'bear'];
    const num = Math.floor(Math.random() * 9999);
    return `${randomChoice(adjectives)}${randomChoice(nouns)}${num}`;
  },

  password: (length = 12) => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    const all = uppercase + lowercase + numbers + symbols;
    
    let password = '';
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    for (let i = password.length; i < length; i++) {
      password += all[Math.floor(Math.random() * all.length)];
    }
    
    return password.split('').sort(() => Math.random() - 0.5).join('');
  },

  accountType: () => {
    const types = ['Free', 'Premium', 'Pro', 'Enterprise', 'Student', 'Business', 'Developer', 'Admin'];
    return randomChoice(types);
  },

  accountTypeAr: () => {
    const types = ['مجاني', 'متميز', 'احترافي', 'مؤسسي', 'طالب', 'أعمال', 'مطور', 'مسؤول'];
    return randomChoice(types);
  },

  accountStatus: () => {
    const statuses = ['Active', 'Inactive', 'Suspended', 'Pending', 'Verified', 'Unverified', 'Locked', 'Archived'];
    return randomChoice(statuses);
  },

  accountStatusAr: () => {
    const statuses = ['نشط', 'غير نشط', 'معلق', 'قيد الانتظار', 'موثق', 'غير موثق', 'مقفل', 'مؤرشف'];
    return randomChoice(statuses);
  },

  registrationDate: () => {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  },

  lastLoginDate: () => {
    const start = new Date();
    start.setDate(start.getDate() - 90);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  },

  lastLoginTime: () => {
    const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  },

  twoFactorEnabled: () => {
    return Math.random() > 0.5;
  },

  emailVerified: () => {
    return Math.random() > 0.3;
  },

  phoneVerified: () => {
    return Math.random() > 0.5;
  },

  profileCompletion: () => {
    return Math.floor(Math.random() * 100) + 1;
  },

  preferredLanguage: () => {
    const languages = ['English', 'Arabic', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Portuguese', 'Russian', 'Hindi'];
    return randomChoice(languages);
  },

  timezone: () => {
    const timezones = ['UTC', 'EST', 'CST', 'MST', 'PST', 'GMT', 'CET', 'IST', 'JST', 'AEST', 'GST'];
    return randomChoice(timezones);
  },

  userRole: () => {
    const roles = ['User', 'Moderator', 'Editor', 'Manager', 'Administrator', 'Superuser', 'Guest', 'Contributor'];
    return randomChoice(roles);
  },

  userRoleAr: () => {
    const roles = ['مستخدم', 'مشرف', 'محرر', 'مدير', 'مسؤول', 'مسؤول فائق', 'ضيف', 'مساهم'];
    return randomChoice(roles);
  },

  permissions: () => {
    const allPermissions = ['read', 'write', 'delete', 'edit', 'create', 'manage_users', 'manage_content', 'view_analytics', 'export_data', 'admin_panel'];
    const numPermissions = Math.floor(Math.random() * 5) + 1;
    const permissions = [];
    for (let i = 0; i < numPermissions; i++) {
      const perm = randomChoice(allPermissions);
      if (!permissions.includes(perm)) {
        permissions.push(perm);
      }
    }
    return permissions;
  },

  apiKey: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 32; i++) {
      key += chars[Math.floor(Math.random() * chars.length)];
    }
    return key;
  },

  apiSecret: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let secret = '';
    for (let i = 0; i < 40; i++) {
      secret += chars[Math.floor(Math.random() * chars.length)];
    }
    return secret;
  },

  sessionToken: () => {
    const chars = '0123456789abcdef';
    let token = '';
    for (let i = 0; i < 64; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  },

  refreshToken: () => {
    const chars = '0123456789abcdef';
    let token = '';
    for (let i = 0; i < 64; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  },

  loginAttempts: () => {
    return Math.floor(Math.random() * 5);
  },

  accountCreatedIp: () => {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
  },

  lastLoginIp: () => {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
  },

  userAgent: () => {
    const agents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15',
      'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36'
    ];
    return randomChoice(agents);
  },

  deviceType: () => {
    const devices = ['Desktop', 'Laptop', 'Tablet', 'Mobile', 'Smart TV', 'Wearable'];
    return randomChoice(devices);
  },

  operatingSystem: () => {
    const os = ['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'ChromeOS'];
    return randomChoice(os);
  },

  browser: () => {
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera', 'IE'];
    return randomChoice(browsers);
  },

  notificationsEnabled: () => {
    return Math.random() > 0.3;
  },

  marketingOptIn: () => {
    return Math.random() > 0.5;
  },

  userData: () => {
    return {
      username: usersAccountsGenerators.username(),
      email: window.generators?.email?.() || 'user@example.com',
      password: usersAccountsGenerators.password(),
      accountType: usersAccountsGenerators.accountType(),
      accountStatus: usersAccountsGenerators.accountStatus(),
      registrationDate: usersAccountsGenerators.registrationDate(),
      lastLoginDate: usersAccountsGenerators.lastLoginDate(),
      lastLoginTime: usersAccountsGenerators.lastLoginTime(),
      twoFactorEnabled: usersAccountsGenerators.twoFactorEnabled(),
      emailVerified: usersAccountsGenerators.emailVerified(),
      phoneVerified: usersAccountsGenerators.phoneVerified(),
      profileCompletion: usersAccountsGenerators.profileCompletion(),
      preferredLanguage: usersAccountsGenerators.preferredLanguage(),
      timezone: usersAccountsGenerators.timezone(),
      userRole: usersAccountsGenerators.userRole(),
      permissions: usersAccountsGenerators.permissions(),
      apiKey: usersAccountsGenerators.apiKey(),
      sessionToken: usersAccountsGenerators.sessionToken(),
      loginAttempts: usersAccountsGenerators.loginAttempts(),
      lastLoginIp: usersAccountsGenerators.lastLoginIp(),
      deviceType: usersAccountsGenerators.deviceType(),
      operatingSystem: usersAccountsGenerators.operatingSystem(),
      browser: usersAccountsGenerators.browser(),
      notificationsEnabled: usersAccountsGenerators.notificationsEnabled(),
      marketingOptIn: usersAccountsGenerators.marketingOptIn()
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = usersAccountsGenerators;
} else if (typeof window !== 'undefined') {
  window.usersAccountsGenerators = usersAccountsGenerators;
}
