// Performance Testing generators
const performanceTestingGenerators = {
  responseTime: () => `${randomNum(50, 5000)} ms`,
  
  throughput: () => `${randomNum(10, 10000)} req/sec`,
  
  cpuUsage: () => `${(randomNum(100, 9500) / 100).toFixed(1)}%`,
  
  memoryUsage: () => `${randomNum(128, 8192)} MB`,
  
  diskUsage: () => `${(randomNum(100, 50000) / 100).toFixed(1)} GB`,
  
  networkLatency: () => `${randomNum(1, 500)} ms`,
  
  concurrentUsers: () => randomChoice([
    '10 users',
    '50 users', 
    '100 users',
    '500 users',
    '1,000 users',
    '5,000 users',
    '10,000 users',
    '50,000 users'
  ]),

  errorRate: () => `${(randomNum(0, 1000) / 100).toFixed(2)}%`,
  
  loadTime: () => `${(randomNum(50, 1500) / 100).toFixed(2)}s`,
  
  transactionRate: () => `${randomNum(1, 1000)} TPS`,
  
  bandwidth: () => randomChoice([
    `${randomNum(1, 100)} Mbps`,
    `${randomNum(100, 1000)} Kbps`,
    `${(randomNum(1, 10000) / 100).toFixed(1)} GB/hour`
  ]),

  connectionPool: () => `${randomNum(10, 500)} connections`,
  
  queueLength: () => `${randomNum(0, 1000)} items`,
  
  cacheHitRatio: () => `${(randomNum(7000, 9900) / 100).toFixed(1)}%`,
  
  dbConnections: () => `${randomNum(5, 200)} active connections`
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { performanceTestingGenerators };
} else if (typeof window !== 'undefined') {
  window.performanceTestingGenerators = performanceTestingGenerators;
}
