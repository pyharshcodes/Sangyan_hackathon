export interface RegisteredBrokerInfo {
  name: string;
  officialDomains: string[];
  sebiRegPrefix: string;
  type: string;
}

export const AUTHENTIC_MARKET_ENTITIES: RegisteredBrokerInfo[] = [
  // --- Depositories & Regulators ---
  {
    name: 'Securities and Exchange Board of India (SEBI)',
    officialDomains: ['sebi.gov.in', 'scores.sebi.gov.in', 'investor.sebi.gov.in', 'saarthi.sebi.gov.in'],
    sebiRegPrefix: 'REGULATOR',
    type: 'Market Regulator'
  },
  {
    name: 'National Securities Depository Limited (NSDL)',
    officialDomains: ['nsdl.co.in', 'nsdlstar.com', 'speed-e.nsdl.com'],
    sebiRegPrefix: 'IN-DP-NSDL',
    type: 'National Depository'
  },
  {
    name: 'Central Depository Services (India) Limited (CDSL)',
    officialDomains: ['cdslindia.com', 'myeasi.cdslindia.com'],
    sebiRegPrefix: 'IN-DP-CDSL',
    type: 'National Depository'
  },
  {
    name: 'National Stock Exchange of India (NSE)',
    officialDomains: ['nseindia.com'],
    sebiRegPrefix: 'EXCHANGE-NSE',
    type: 'Recognized Stock Exchange'
  },
  {
    name: 'BSE Limited (Bombay Stock Exchange)',
    officialDomains: ['bseindia.com'],
    sebiRegPrefix: 'EXCHANGE-BSE',
    type: 'Recognized Stock Exchange'
  },
  {
    name: 'State Bank of India (SBI)',
    officialDomains: ['sbi.co.in', 'onlinesbi.sbi', 'onlinesbi.com', 'sbi'],
    sebiRegPrefix: 'BANK-SBI',
    type: 'Scheduled Commercial Bank / Depository Participant'
  },
  {
    name: 'HDFC Bank Limited',
    officialDomains: ['hdfcbank.com'],
    sebiRegPrefix: 'BANK-HDFC',
    type: 'Scheduled Commercial Bank / Depository Participant'
  },
  {
    name: 'ICICI Bank Limited',
    officialDomains: ['icicibank.com'],
    sebiRegPrefix: 'BANK-ICICI',
    type: 'Scheduled Commercial Bank / Depository Participant'
  },

  // --- Prominent Stock Brokers / DPs ---
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
    name: 'Geojit Financial Services Limited',
    officialDomains: ['geojit.com'],
    sebiRegPrefix: 'INZ000104737',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'Dhan (Moneylicious Securities Private Limited)',
    officialDomains: ['dhan.co'],
    sebiRegPrefix: 'INZ000006031',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'Paytm Money Limited',
    officialDomains: ['paytmmoney.com'],
    sebiRegPrefix: 'INZ000240532',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'Fyers Securities Private Limited',
    officialDomains: ['fyers.in'],
    sebiRegPrefix: 'INZ000008524',
    type: 'Stock Broker / Depository Participant'
  },
  {
    name: 'IIFL Securities Limited',
    officialDomains: ['iiflsecurities.com', 'indiainfoline.com'],
    sebiRegPrefix: 'INZ000164132',
    type: 'Stock Broker / Depository Participant'
  },

  // --- Prominent Mutual Fund AMCs ---
  {
    name: 'SBI Mutual Fund (SBI Funds Management Limited)',
    officialDomains: ['sbimf.com'],
    sebiRegPrefix: 'MF/009/93/3',
    type: 'SEBI Registered Mutual Fund AMC'
  },
  {
    name: 'HDFC Mutual Fund (HDFC Asset Management Company)',
    officialDomains: ['hdfcfund.com'],
    sebiRegPrefix: 'MF/044/00/6',
    type: 'SEBI Registered Mutual Fund AMC'
  },
  {
    name: 'ICICI Prudential Mutual Fund',
    officialDomains: ['icicipruamc.com'],
    sebiRegPrefix: 'MF/003/93/6',
    type: 'SEBI Registered Mutual Fund AMC'
  },
  {
    name: 'Nippon India Mutual Fund',
    officialDomains: ['nipponindiamf.com'],
    sebiRegPrefix: 'MF/022/95/1',
    type: 'SEBI Registered Mutual Fund AMC'
  },
  {
    name: 'Axis Mutual Fund (Axis Asset Management Company)',
    officialDomains: ['axismf.com'],
    sebiRegPrefix: 'MF/061/09/02',
    type: 'SEBI Registered Mutual Fund AMC'
  },
  {
    name: 'UTI Mutual Fund (UTI Asset Management Company)',
    officialDomains: ['utimf.com'],
    sebiRegPrefix: 'MF/048/03/01',
    type: 'SEBI Registered Mutual Fund AMC'
  },
  {
    name: 'Mirae Asset Mutual Fund (Mirae Asset Investment Managers)',
    officialDomains: ['miraeassetmf.co.in'],
    sebiRegPrefix: 'MF/058/08/03',
    type: 'SEBI Registered Mutual Fund AMC'
  },
  {
    name: 'Kotak Mahindra Mutual Fund (Kotak Mahindra AMC)',
    officialDomains: ['kotakmf.com'],
    sebiRegPrefix: 'MF/038/98/1',
    type: 'SEBI Registered Mutual Fund AMC'
  },
  {
    name: 'Tata Mutual Fund (Tata Asset Management Limited)',
    officialDomains: ['tatamutualfund.com'],
    sebiRegPrefix: 'MF/023/95/2',
    type: 'SEBI Registered Mutual Fund AMC'
  },
  {
    name: 'Aditya Birla Sun Life Mutual Fund',
    officialDomains: ['mutualfund.adityabirlacapital.com'],
    sebiRegPrefix: 'MF/020/94/8',
    type: 'SEBI Registered Mutual Fund AMC'
  },
  {
    name: 'DSP Mutual Fund (DSP Investment Managers)',
    officialDomains: ['dspim.com'],
    sebiRegPrefix: 'MF/036/97/5',
    type: 'SEBI Registered Mutual Fund AMC'
  },
  {
    name: 'Canara Robeco Mutual Fund',
    officialDomains: ['canararobeco.com'],
    sebiRegPrefix: 'MF/014/93/2',
    type: 'SEBI Registered Mutual Fund AMC'
  },
  {
    name: 'Edelweiss Mutual Fund (Edelweiss Asset Management)',
    officialDomains: ['edelweissmf.com'],
    sebiRegPrefix: 'MF/059/08/04',
    type: 'SEBI Registered Mutual Fund AMC'
  },

  // --- Prominent SEBI Registered Investment Advisers (RIAs) & Research Analysts ---
  {
    name: 'Capitalmind Wealth (Deepak Shenoy)',
    officialDomains: ['capitalmind.in', 'capitalmindwealth.com'],
    sebiRegPrefix: 'INA100013505',
    type: 'SEBI Registered Portfolio Manager / Investment Adviser'
  },
  {
    name: 'Finbingo Advisory Services',
    officialDomains: ['finbingo.com'],
    sebiRegPrefix: 'INA000013898',
    type: 'SEBI Registered Investment Adviser (RIA)'
  },
  {
    name: 'KFin Technologies Limited (Registrar)',
    officialDomains: ['kfintech.com'],
    sebiRegPrefix: 'INR000000221',
    type: 'SEBI Registered Registrar & Transfer Agent'
  },
  {
    name: 'Computer Age Management Services (CAMS)',
    officialDomains: ['camsonline.com', 'mycams.camsonline.com'],
    sebiRegPrefix: 'INR000002813',
    type: 'SEBI Registered Registrar & Transfer Agent'
  }
];

export const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.vip', '.online', '.site', '.club', '.work', '.biz', '.icu', '.live', '.buzz', '.monster'
];

export const SEBI_REGISTRATION_PREFIXES = [
  { prefix: 'INA', description: 'Investment Adviser (e.g. INA000001234)' },
  { prefix: 'INH', description: 'Research Analyst (e.g. INH000001234)' },
  { prefix: 'INZ', description: 'Stock Broker (e.g. INZ000123456)' },
  { prefix: 'IN-DP', description: 'Depository Participant (e.g. IN-DP-NSDL)' },
  { prefix: 'INP', description: 'Portfolio Manager (e.g. INP000001234)' },
  { prefix: 'INM', description: 'Merchant Banker (e.g. INM000001234)' },
  { prefix: 'INR', description: 'Registrar & Transfer Agent (e.g. INR000000221)' },
  { prefix: 'MF/', description: 'Mutual Fund Asset Management Company' }
];
