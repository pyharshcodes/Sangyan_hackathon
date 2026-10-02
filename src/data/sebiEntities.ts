export interface RegisteredBrokerInfo {
  name: string;
  officialDomains: string[];
  sebiRegPrefix: string;
  type: string;
}

export const AUTHENTIC_MARKET_ENTITIES: RegisteredBrokerInfo[] = [
  {
    name: 'Zerodha Broking Limited',
    officialDomains: ['zerodha.com', 'kite.zerodha.com', 'console.zerodha.com'],
    sebiRegPrefix: 'INZ000031633',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'Groww (Nextbillion Technology)',
    officialDomains: ['groww.in'],
    sebiRegPrefix: 'INZ000301838',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'Angel One Limited',
    officialDomains: ['angelone.in'],
    sebiRegPrefix: 'INZ000161534',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'Upstox (RKSV Securities)',
    officialDomains: ['upstox.com'],
    sebiRegPrefix: 'INZ000185137',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'ICICI Securities Limited',
    officialDomains: ['icicidirect.com'],
    sebiRegPrefix: 'INZ000183631',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'HDFC Securities Limited',
    officialDomains: ['hdfcsec.com', 'hdfcsky.com'],
    sebiRegPrefix: 'INZ000186937',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'National Securities Depository Limited (NSDL)',
    officialDomains: ['nsdl.co.in', 'nsdlstar.com'],
    sebiRegPrefix: 'IN-DP-NSDL',
    type: 'Depository'
  },
  {
    name: 'Central Depository Services (India) Limited (CDSL)',
    officialDomains: ['cdslindia.com', 'myeasi.cdslindia.com'],
    sebiRegPrefix: 'IN-DP-CDSL',
    type: 'Depository'
  },
  {
    name: 'Kotak Securities Limited',
    officialDomains: ['kotaksecurities.com', 'kotakneo.com'],
    sebiRegPrefix: 'INZ000200137',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'Motilal Oswal Financial Services Limited',
    officialDomains: ['motilaloswal.com'],
    sebiRegPrefix: 'INZ000158836',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'SBI Cap Securities Limited',
    officialDomains: ['sbismart.com', 'sbisecurities.in'],
    sebiRegPrefix: 'INZ000200032',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'Sharekhan Limited (BNP Paribas)',
    officialDomains: ['sharekhan.com'],
    sebiRegPrefix: 'INZ000171337',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: '5paisa Capital Limited',
    officialDomains: ['5paisa.com'],
    sebiRegPrefix: 'INZ000010231',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'Securities and Exchange Board of India (SEBI)',
    officialDomains: ['sebi.gov.in', 'scores.sebi.gov.in', 'investor.sebi.gov.in'],
    sebiRegPrefix: 'REGULATOR',
    type: 'Market Regulator'
  }
];

export const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.vip', '.online', '.site', '.club', '.work', '.biz', '.icu', '.live', '.buzz', '.monster'
];

export const SEBI_REGISTRATION_PREFIXES = [
  { prefix: 'INA', description: 'Investment Adviser (e.g. INA000001234)' },
  { prefix: 'INH', description: 'Research Analyst (e.g. INH000001234)' },
  { prefix: 'INZ', description: 'Stock Broker (e.g. INZ000123456)' },
  { prefix: 'IN-DP', description: 'Depository Participant' },
  { prefix: 'INP', description: 'Portfolio Manager' },
  { prefix: 'INM', description: 'Merchant Banker' }
];
