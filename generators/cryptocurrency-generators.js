// Cryptocurrency generators
const cryptocurrencyGenerators = {
  cryptoSymbol: () => randomChoice([
    'BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'SOL', 'DOGE', 'DOT', 'AVAX', 'SHIB',
    'MATIC', 'LTC', 'UNI', 'LINK', 'BCH', 'XLM', 'VET', 'FIL', 'TRX', 'ETC',
    'ALGO', 'ATOM', 'HBAR', 'NEAR', 'FLOW', 'ICP', 'MANA', 'SAND', 'CRO', 'APE'
  ]),

  cryptoName: () => randomChoice([
    'Bitcoin', 'Ethereum', 'Binance Coin', 'Ripple', 'Cardano', 'Solana', 'Dogecoin',
    'Polkadot', 'Avalanche', 'Shiba Inu', 'Polygon', 'Litecoin', 'Uniswap', 'Chainlink',
    'Bitcoin Cash', 'Stellar', 'VeChain', 'Filecoin', 'TRON', 'Ethereum Classic',
    'Algorand', 'Cosmos', 'Hedera', 'NEAR Protocol', 'Flow', 'Internet Computer',
    'Decentraland', 'The Sandbox', 'Cronos', 'ApeCoin'
  ]),

  cryptoPrice: () => {
    const price = (randomNum(1, 100000) / 100).toFixed(2);
    return `$${price}`;
  },

  cryptoPriceSAR: () => {
    const price = (randomNum(1, 375000) / 100).toFixed(2);
    return `${price} SAR`;
  },

  marketCap: () => {
    const cap = randomNum(1, 2000);
    const suffix = randomChoice(['M', 'B', 'T']);
    return `$${cap}${suffix}`;
  },

  volume24h: () => {
    const volume = randomNum(1, 100);
    const suffix = randomChoice(['M', 'B']);
    return `$${volume}${suffix}`;
  },

  priceChange24h: () => {
    const change = (randomNum(-5000, 5000) / 100).toFixed(2);
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change}%`;
  },

  walletAddress: () => {
    // Bitcoin-style address
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
    let address = randomChoice(['1', '3', 'bc1']);
    const length = address === 'bc1' ? randomNum(39, 59) : randomNum(25, 34);
    
    for (let i = address.length; i < length; i++) {
      address += chars[randomNum(0, chars.length - 1)];
    }
    return address;
  },

  ethereumAddress: () => {
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
      address += chars[randomNum(0, chars.length - 1)];
    }
    return address;
  },

  transactionHash: () => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += chars[randomNum(0, chars.length - 1)];
    }
    return hash;
  },

  blockHeight: () => randomNum(700000, 900000),

  gasPrice: () => `${randomNum(10, 200)} Gwei`,

  gasLimit: () => randomNum(21000, 500000),

  transactionFee: () => {
    const fee = (randomNum(1, 10000) / 10000).toFixed(6);
    return `${fee} ETH`;
  },

  transactionFeeSAR: () => {
    const fee = (randomNum(1, 100) / 100).toFixed(2);
    return `${fee} SAR`;
  },

  stakingReward: () => `${(randomNum(100, 2000) / 100).toFixed(2)}%`,

  stakingPeriod: () => randomChoice(['7 days', '14 days', '30 days', '60 days', '90 days', '180 days', '365 days']),

  yieldFarming: () => `${(randomNum(500, 15000) / 100).toFixed(2)}% APY`,

  liquidityPool: () => {
    const token1 = randomChoice(['ETH', 'BTC', 'USDT', 'BNB', 'ADA']);
    const token2 = randomChoice(['USDC', 'DAI', 'BUSD', 'USDT', 'ETH']);
    return `${token1}/${token2}`;
  },

  dexName: () => randomChoice([
    'Uniswap', 'SushiSwap', 'PancakeSwap', 'Curve', 'Balancer', 'dYdX',
    '1inch', 'Kyber Network', 'Bancor', 'Compound', 'Aave', 'MakerDAO'
  ]),

  nftCollection: () => randomChoice([
    'Bored Ape Yacht Club', 'CryptoPunks', 'Azuki', 'Moonbirds', 'Doodles',
    'Cool Cats', 'World of Women', 'Pudgy Penguins', 'Art Blocks', 'Sandbox',
    'Decentraland', 'Axie Infinity', 'NBA Top Shot', 'CryptoKitties'
  ]),

  nftPrice: () => {
    const price = (randomNum(1, 10000) / 100).toFixed(2);
    return `${price} ETH`;
  },

  nftRarity: () => randomChoice(['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic']),

  blockchainNetwork: () => randomChoice([
    'Ethereum', 'Binance Smart Chain', 'Polygon', 'Solana', 'Avalanche',
    'Fantom', 'Arbitrum', 'Optimism', 'Cardano', 'Polkadot', 'Cosmos', 'NEAR'
  ]),

  consensusMechanism: () => randomChoice([
    'Proof of Work', 'Proof of Stake', 'Delegated Proof of Stake', 'Proof of Authority',
    'Proof of History', 'Nominated Proof of Stake', 'Practical Byzantine Fault Tolerance'
  ]),

  miningDifficulty: () => `${(randomNum(1000, 50000) / 100).toFixed(2)}T`,

  hashRate: () => {
    const rate = randomNum(100, 300);
    return `${rate} EH/s`;
  },

  cryptoExchange: () => randomChoice([
    'Binance', 'Coinbase', 'Kraken', 'Huobi', 'KuCoin', 'Gate.io', 'Bybit',
    'OKX', 'Crypto.com', 'Bitfinex', 'Gemini', 'FTX', 'Bitstamp', 'Rain'
  ]),

  tradingPair: () => {
    const base = randomChoice(['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'DOT']);
    const quote = randomChoice(['USDT', 'USDC', 'BUSD', 'SAR', 'USD']);
    return `${base}/${quote}`;
  },

  orderType: () => randomChoice(['Market', 'Limit', 'Stop Loss', 'Take Profit', 'OCO']),

  orderSide: () => randomChoice(['Buy', 'Sell']),

  orderAmount: () => {
    const amount = (randomNum(1, 10000) / 1000).toFixed(3);
    return `${amount} BTC`;
  },

  portfolioValue: () => {
    const value = randomNum(1000, 1000000);
    return `$${value.toLocaleString()}`;
  },

  portfolioValueSAR: () => {
    const value = randomNum(3750, 3750000);
    return `${value.toLocaleString()} SAR`;
  },

  roi: () => {
    const roi = (randomNum(-5000, 10000) / 100).toFixed(2);
    const sign = roi >= 0 ? '+' : '';
    return `${sign}${roi}%`;
  },

  defiProtocol: () => randomChoice([
    'Compound', 'Aave', 'MakerDAO', 'Curve', 'Yearn Finance', 'SushiSwap',
    'Balancer', 'Synthetix', 'Bancor', 'Kyber Network', 'dYdX', '1inch'
  ]),

  tokenStandard: () => randomChoice(['ERC-20', 'ERC-721', 'ERC-1155', 'BEP-20', 'SPL', 'TRC-20']),

  smartContractAddress: () => {
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
      address += chars[randomNum(0, chars.length - 1)];
    }
    return address;
  },

  airdropAmount: () => {
    const amount = randomNum(10, 10000);
    const token = randomChoice(['UNI', 'ENS', 'LOOKS', 'APE', 'OP', 'ARB']);
    return `${amount} ${token}`;
  },

  vestingPeriod: () => randomChoice(['1 month', '3 months', '6 months', '12 months', '24 months', '36 months']),

  lockupPeriod: () => randomChoice(['No lockup', '7 days', '30 days', '90 days', '180 days', '365 days']),

  cryptoNews: () => randomChoice([
    'Bitcoin reaches new all-time high',
    'Ethereum 2.0 upgrade completed successfully',
    'Major bank adopts cryptocurrency payments',
    'New DeFi protocol launches with high yields',
    'Regulatory clarity improves market sentiment',
    'Institutional adoption continues to grow',
    'Layer 2 solutions gain traction',
    'NFT marketplace sees record volume'
  ])
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { cryptocurrencyGenerators };
} else if (typeof window !== 'undefined') {
  window.cryptocurrencyGenerators = cryptocurrencyGenerators;
}