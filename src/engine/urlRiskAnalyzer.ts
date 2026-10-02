import { UrlClassificationType, FinancialRelevance, RiskLevel } from '../types';
import { AUTHENTIC_MARKET_ENTITIES, SUSPICIOUS_TLDS } from '../data/sebiEntities';

export interface UrlRiskAssessment {
  rawInput: string;
  url: string;
  hostname: string;
  pathname: string;
  contextText: string;
  urlType: UrlClassificationType;
  financialRelevance: FinancialRelevance;
  riskLevel: RiskLevel;
  riskIndicators: string[];
  explanation: string;
  explanationHi: string;
  recommendedAction: string;
  recommendedActionHi: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  isOfficialRegistered: boolean;
  isLookalike: boolean;
  targetBrand?: string;
  suspiciousTld: boolean;
  hasSuspiciousDomainKeywords: boolean;
  hasSuspiciousPathKeywords: boolean;
  isShortener: boolean;
  hasExcessiveSubdomains: boolean;
  verifiedContent: boolean;
  unverifiedDestinationNotice?: string;
  observedCharacteristics: string[];
}

/**
 * Extracts URL string and any accompanying text from the user input.
 */
export function extractUrlAndContext(rawInput: string): {
  urlString: string;
  contextText: string;
  parsed: URL | null;
} {
  const trimmed = (rawInput || '').trim();
  const urlMatch = trimmed.match(/https?:\/\/[^\s]+/i);

  let urlString = '';
  let contextText = '';

  if (urlMatch) {
    urlString = urlMatch[0];
    contextText = trimmed.replace(urlString, '').trim();
  } else {
    // If user provided a domain without protocol (e.g. quickprofit-india.example/invest-now)
    const firstToken = trimmed.split(/\s+/)[0];
    if (firstToken.includes('.') && !firstToken.includes(' ')) {
      urlString = firstToken.startsWith('http') ? firstToken : `https://${firstToken}`;
      contextText = trimmed.substring(firstToken.length).trim();
    } else {
      urlString = trimmed;
      contextText = '';
    }
  }

  let parsed: URL | null = null;
  try {
    parsed = new URL(urlString.startsWith('http') ? urlString : `https://${urlString}`);
  } catch {
    parsed = null;
  }

  return { urlString, contextText, parsed };
}

/**
 * STEP 1: Identify the URL type
 */
export function classifyUrlType(
  hostname: string,
  pathname: string,
  fullText: string
): UrlClassificationType {
  const lowerHost = hostname.toLowerCase();
  const lowerPath = pathname.toLowerCase();
  const lowerFull = fullText.toLowerCase();

  // 1. GOVERNMENT / EDUCATIONAL
  // Check official Indian regulatory & government domains
  const isGov =
    lowerHost.endsWith('.gov.in') ||
    lowerHost.endsWith('.nic.in') ||
    lowerHost.endsWith('.gov') ||
    lowerHost === 'sebi.gov.in' ||
    lowerHost.endsWith('.sebi.gov.in') ||
    lowerHost === 'rbi.org.in' ||
    lowerHost.endsWith('.rbi.org.in') ||
    lowerHost === 'nsdl.co.in' ||
    lowerHost.endsWith('.nsdl.co.in') ||
    lowerHost === 'cdslindia.com' ||
    lowerHost.endsWith('.cdslindia.com') ||
    lowerHost.includes('incometax.gov.in') ||
    lowerHost.includes('cybercrime.gov.in');

  const isEdu =
    lowerHost.endsWith('.ac.in') ||
    lowerHost.endsWith('.edu.in') ||
    lowerHost.endsWith('.edu') ||
    lowerHost.includes('iitbhu.ac.in') ||
    lowerHost.includes('ugc.gov.in') ||
    lowerHost.includes('iit') ||
    lowerHost.includes('nit') ||
    lowerHost.includes('university') ||
    lowerHost.includes('college');

  if (isGov || isEdu) {
    return 'GOVERNMENT/EDUCATIONAL';
  }

  // 2. REGISTRATION / EVENT
  const registrationTokens = [
    'hackathon',
    'registration',
    'register',
    'webinar',
    'summit',
    'conference',
    'contest',
    'meetup',
    'devfolio',
    'unstop',
    'eventbrite',
    'luma',
    '/event',
    '/events'
  ];
  const hasRegToken = registrationTokens.some(
    t => lowerPath.includes(t) || lowerHost.includes(t) || lowerFull.includes(t)
  );
  // Ensure it's not a scam disguised as registration (e.g. "guaranteed 50% return registration")
  if (
    hasRegToken &&
    !lowerFull.includes('guaranteed') &&
    !lowerFull.includes('profit') &&
    !lowerFull.includes('upper circuit')
  ) {
    return 'REGISTRATION/EVENT';
  }

  // 3. PAYMENT
  const paymentTokens = [
    'pay-release',
    'release-fee',
    'release-shares',
    'release-quota',
    'unfreeze',
    'transfer-funds',
    'paytm',
    'phonepe',
    'razorpay',
    'cashfree',
    '/pay',
    '/payment',
    '/checkout',
    '/billing',
    '/gateway',
    'upi'
  ];
  if (
    paymentTokens.some(t => lowerPath.includes(t) || lowerHost.includes(t)) ||
    lowerFull.includes('release fee') ||
    lowerFull.includes('transfer funds') ||
    lowerFull.includes('personal upi')
  ) {
    return 'PAYMENT';
  }

  // 4. SOCIAL MEDIA
  const socialDomains = [
    't.me',
    'telegram.me',
    'telegram.org',
    'wa.me',
    'whatsapp.com',
    'api.whatsapp.com',
    'instagram.com',
    'facebook.com',
    'fb.com',
    'twitter.com',
    'x.com',
    'youtube.com',
    'youtu.be',
    'linkedin.com',
    'discord.gg'
  ];
  if (socialDomains.some(d => lowerHost === d || lowerHost.endsWith(`.${d}`))) {
    return 'SOCIAL MEDIA';
  }

  // 5. E-COMMERCE
  const ecommerceDomains = [
    'amazon.in',
    'amazon.com',
    'flipkart.com',
    'myntra.com',
    'ajio.com',
    'meesho.com',
    'tatacliq.com',
    'nykaa.com',
    'shopify.com'
  ];
  if (
    ecommerceDomains.some(d => lowerHost === d || lowerHost.endsWith(`.${d}`)) ||
    lowerPath.includes('/shop') ||
    lowerPath.includes('/product') ||
    lowerPath.includes('/cart')
  ) {
    return 'E-COMMERCE';
  }

  // 6. FINANCIAL / INVESTMENT
  // Check official market entities
  const isOfficialMarketEntity = AUTHENTIC_MARKET_ENTITIES.some(entity =>
    entity.officialDomains.some(d => lowerHost === d || lowerHost.endsWith(`.${d}`))
  );

  const financialTokens = [
    'invest',
    'profit',
    'trading',
    'crypto',
    'forex',
    'stock',
    'share',
    'broker',
    'demat',
    'mutualfund',
    'sip',
    'dividend',
    'allotment',
    'quickprofit',
    'wealthgrow',
    'fastreturns',
    'return',
    'wealth',
    'fund',
    'portfolio',
    'equity',
    'market',
    'scheme',
    'sebi'
  ];
  const hasFinancialToken = financialTokens.some(
    t => lowerHost.includes(t) || lowerPath.includes(t) || lowerFull.includes(t)
  );

  if (isOfficialMarketEntity || hasFinancialToken) {
    return 'FINANCIAL/INVESTMENT';
  }

  // 7. NORMAL WEBSITE
  const knownNewsDomains = [
    'economictimes.indiatimes.com',
    'thehindu.com',
    'indianexpress.com',
    'livemint.com',
    'business-standard.com',
    'ndtv.com',
    'moneycontrol.com',
    'bbc.com',
    'reuters.com',
    'bloomberg.com',
    'techcrunch.com',
    'cnbc.com',
    'timesofindia.indiatimes.com',
    'hindustantimes.com',
    'news18.com',
    'indiatoday.in'
  ];
  const isKnownNews = knownNewsDomains.some(d => lowerHost === d || lowerHost.endsWith(`.${d}`));

  const standardWebTokens = [
    'wikipedia.org',
    'github.com',
    'stackoverflow.com',
    'medium.com',
    'google.com',
    'microsoft.com',
    'apple.com'
  ];
  const isStandardWeb = standardWebTokens.some(d => lowerHost === d || lowerHost.endsWith(`.${d}`));

  const newsPaths = ['/news/', '/article/', '/blog/', '/post/', '/policy-update', '/about', '/contact'];
  const hasNewsPath = newsPaths.some(p => lowerPath.includes(p));

  if (isKnownNews || isStandardWeb || (hasNewsPath && !hasFinancialToken)) {
    return 'NORMAL WEBSITE';
  }

  // 8. UNKNOWN
  return 'UNKNOWN';
}

/**
 * STEP 2 & 3: Check for suspicious indicators and compute risk assessment
 */
export function analyzeUrlRisk(
  rawInput: string,
  accompanyingContext?: string
): UrlRiskAssessment {
  const { urlString, contextText: extractedContext, parsed } = extractUrlAndContext(rawInput);
  const contextText = accompanyingContext ? `${extractedContext} ${accompanyingContext}`.trim() : extractedContext;
  const fullText = `${urlString} ${contextText}`.trim().toLowerCase();

  const hostname = parsed ? parsed.hostname.toLowerCase() : rawInput.split('/')[0].split('?')[0].toLowerCase();
  const pathname = parsed ? parsed.pathname.toLowerCase() : '';

  // 1. STEP 1: Classify URL type
  const urlType = classifyUrlType(hostname, pathname, fullText);

  // 2. Check official registered registry
  let isOfficialRegistered = false;
  let targetBrand: string | undefined;

  for (const entity of AUTHENTIC_MARKET_ENTITIES) {
    if (entity.officialDomains.some(d => hostname === d || hostname.endsWith(`.${d}`))) {
      isOfficialRegistered = true;
      targetBrand = entity.name;
      break;
    }
  }

  // Also consider official government / educational domains as authentic institutional
  const isOfficialGovEdu =
    hostname.endsWith('.gov.in') ||
    hostname.endsWith('.nic.in') ||
    hostname.endsWith('.ac.in') ||
    hostname.endsWith('.edu.in') ||
    hostname.endsWith('.edu') ||
    hostname.endsWith('.gov');

  // 3. Look-alike detection against reputable brands
  const brandKeywords = [
    { key: 'zerodha', brand: 'Zerodha Broking Ltd' },
    { key: 'groww', brand: 'Groww (Nextbillion)' },
    { key: 'angelone', brand: 'Angel One' },
    { key: 'upstox', brand: 'Upstox' },
    { key: 'sebi', brand: 'SEBI (Regulator)' },
    { key: 'nsdl', brand: 'NSDL (Depository)' },
    { key: 'cdsl', brand: 'CDSL (Depository)' },
    { key: 'icicidirect', brand: 'ICICI Direct' },
    { key: 'hdfcsec', brand: 'HDFC Securities' }
  ];

  let isLookalike = false;
  if (!isOfficialRegistered) {
    for (const { key, brand } of brandKeywords) {
      if (hostname.includes(key)) {
        isLookalike = true;
        targetBrand = brand;
        break;
      }
    }
  }

  // 4. Suspicious TLD check
  const suspiciousTld = SUSPICIOUS_TLDS.some(tld => hostname.endsWith(tld));

  // 5. URL Shorteners
  const shorteners = ['bit.ly', 'tinyurl.com', 'is.gd', 'cutt.ly', 't.co', 'ow.ly', 'rb.gy', 'shorturl.at'];
  const isShortener = shorteners.some(s => hostname === s || hostname.endsWith(`.${s}`));

  // 6. Excessive subdomains
  const domainParts = hostname.split('.');
  const hasExcessiveSubdomains = domainParts.length >= 4 && !hostname.endsWith('.co.in') && !hostname.endsWith('.gov.in');

  // 7. Suspicious domain keywords (High-yield, fast-gain, double money, etc.)
  const suspiciousDomainKeywordsList = [
    'quickprofit',
    'fastprofit',
    'easyprofit',
    'instantprofit',
    'sureprofit',
    'dailyprofit',
    'fastreturns',
    'quickreturns',
    'highreturns',
    'guaranteedreturns',
    'suregain',
    'doublemoney',
    'paisa-double',
    'wealthgrow',
    'instantwealth',
    'cryptobot',
    'forexbot',
    'tradingbot',
    'autotrade',
    'vip-signals',
    'jackpot-calls',
    'broker-security',
    'kyc-verification',
    'account-verify',
    'trading-login'
  ];
  const hasSuspiciousDomainKeywords = suspiciousDomainKeywordsList.some(k => hostname.includes(k));

  // 8. Suspicious path keywords
  const suspiciousPathKeywordsList = [
    'invest-now',
    'start-investing-now',
    'invest-today',
    'double-money',
    'vip-group',
    'join-vip',
    'release-fee',
    'release-quota',
    'unfreeze',
    'transfer-funds',
    're-kyc',
    'rekyc',
    'claim-profit'
  ];
  const hasSuspiciousPathKeywords = suspiciousPathKeywordsList.some(k => pathname.includes(k));

  // 9. Accompanying claims analysis
  const hasGuaranteedReturn =
    /guaranteed\s*(\d{1,3}x|\d{1,4}%)/i.test(fullText) ||
    fullText.includes('guaranteed 5x') ||
    fullText.includes('guaranteed return') ||
    fullText.includes('guaranteed profit') ||
    fullText.includes('double your money') ||
    fullText.includes('zero risk') ||
    fullText.includes('risk-free') ||
    fullText.includes('100% loss refund') ||
    fullText.includes('पक्का मुनाफा');

  const hasUrgency =
    fullText.includes('today only') ||
    fullText.includes('act now') ||
    fullText.includes('invest now, today only') ||
    fullText.includes('invest now') ||
    fullText.includes('only 3 slots') ||
    fullText.includes('only 2 slots') ||
    fullText.includes('before 4 pm') ||
    fullText.includes('within 2 hours') ||
    fullText.includes('within 30 minutes') ||
    fullText.includes('immediately') ||
    fullText.includes('immediate') ||
    fullText.includes('limited slots') ||
    fullText.includes('seats remaining') ||
    fullText.includes('urgent') ||
    fullText.includes('hurry');

  const hasPaymentRequest =
    fullText.includes('release fee') ||
    fullText.includes('release shares') ||
    fullText.includes('personal upi') ||
    fullText.includes('transfer funds') ||
    fullText.includes('pay ₹') ||
    fullText.includes('unfreeze shares') ||
    fullText.includes('processing fee to release');

  const hasVipGroupClaim =
    fullText.includes('vip group') ||
    fullText.includes('exclusive vip') ||
    fullText.includes('jackpot calls') ||
    fullText.includes('upper circuit club') ||
    fullText.includes('insider');

  const hasCredentialPhishing =
    fullText.includes('unusual login') ||
    fullText.includes('holdings have been frozen') ||
    fullText.includes('broker credentials') ||
    fullText.includes('portfolio auction') ||
    fullText.includes('prevent liquidation') ||
    fullText.includes('account blockage') ||
    fullText.includes('account will be suspended');

  // Build risk indicators list
  const riskIndicators: string[] = [];
  const observedCharacteristics: string[] = [];

  observedCharacteristics.push(`URL Type Classified: ${urlType}`);
  observedCharacteristics.push(`Hostname: ${hostname}`);
  if (pathname && pathname !== '/') {
    observedCharacteristics.push(`Path Anatomy: ${pathname}`);
  }

  if (isLookalike) {
    riskIndicators.push(`Brand Impersonation / Lookalike Domain (targeting ${targetBrand})`);
  }
  if (suspiciousTld) {
    riskIndicators.push(`High-risk / disposable TLD frequently associated with short-lived scams`);
  }
  if (hasSuspiciousDomainKeywords) {
    const matched = suspiciousDomainKeywordsList.find(k => hostname.includes(k));
    riskIndicators.push(`Suspicious high-gain domain naming ('${matched}')`);
  }
  if (hasSuspiciousPathKeywords) {
    const matched = suspiciousPathKeywordsList.find(k => pathname.includes(k));
    riskIndicators.push(`Aggressive financial call-to-action path ('${matched}')`);
  }
  if (hasGuaranteedReturn) {
    riskIndicators.push(`Guaranteed returns or zero-risk promise in associated solicitation`);
  }
  if (hasUrgency) {
    riskIndicators.push(`Artificial urgency / FOMO pressure ('today only' / 'act now')`);
  }
  if (hasPaymentRequest) {
    riskIndicators.push(`Advance release fee / personal payment request`);
  }
  if (hasVipGroupClaim) {
    riskIndicators.push(`Unregistered VIP group / insider tip channel solicitation`);
  }
  if (hasCredentialPhishing) {
    riskIndicators.push(`Broker phishing / panic account freeze narrative to harvest credentials`);
  }
  if (isShortener) {
    riskIndicators.push(`URL shortener masks actual destination domain and redirect path`);
  }
  if (hasExcessiveSubdomains) {
    riskIndicators.push(`Excessive subdomains obscuring root domain identity`);
  }

  // Verified content flag
  const verifiedContent = isOfficialRegistered || isOfficialGovEdu;
  let unverifiedDestinationNotice: string | undefined;

  if (!verifiedContent) {
    unverifiedDestinationNotice =
      'The destination website could not be dynamically scraped or independently verified in real-time. Analysis is conducted based on observed URL anatomy, domain syntax, known security indicators, and submitted contextual claims.';
  }

  // Financial Relevance Gate for URLs
  let financialRelevance: FinancialRelevance = 'NO';
  if (
    urlType === 'FINANCIAL/INVESTMENT' ||
    urlType === 'PAYMENT' ||
    hasGuaranteedReturn ||
    hasSuspiciousDomainKeywords ||
    hasSuspiciousPathKeywords ||
    hasPaymentRequest ||
    hasCredentialPhishing
  ) {
    financialRelevance = 'YES';
  } else if (urlType === 'GOVERNMENT/EDUCATIONAL' && (hostname.includes('sebi') || hostname.includes('nsdl') || hostname.includes('rbi'))) {
    financialRelevance = 'YES';
  } else if (urlType === 'UNKNOWN') {
    const financialTokens = ['invest', 'stock', 'share', 'profit', 'crypto', 'trade', 'fund', 'rupee', '₹'];
    financialRelevance = financialTokens.some(k => fullText.includes(k)) ? 'UNCERTAIN' : 'NO';
  } else {
    financialRelevance = 'NO';
  }

  // STEP 3: Risk Level Determination
  let riskLevel: RiskLevel = 'Low';
  let confidence: 'HIGH' | 'MEDIUM' | 'LOW' = 'HIGH';
  let explanation = '';
  let explanationHi = '';
  let recommendedAction = '';
  let recommendedActionHi = '';

  // 1. High Risk / Critical Triggers
  const hasCriticalScamTriggers =
    isLookalike ||
    hasGuaranteedReturn ||
    hasPaymentRequest ||
    (hasCredentialPhishing && !verifiedContent) ||
    (hasSuspiciousDomainKeywords && !verifiedContent) ||
    (hasSuspiciousPathKeywords && !verifiedContent && (hasUrgency || financialRelevance === 'YES')) ||
    (hasUrgency && (urlType === 'FINANCIAL/INVESTMENT' || hasVipGroupClaim) && !verifiedContent);

  if (hasCriticalScamTriggers) {
    riskLevel = 'High';
    confidence = 'HIGH';

    if (isLookalike) {
      explanation = `The link uses a deceptive lookalike domain attempting to impersonate ${targetBrand}. It is not hosted on the official registered domain.`;
      explanationHi = `यह लिंक असली संस्था (${targetBrand}) की नकल करने वाला फर्जी लुक-एलाइक डोमेन है। यह सेबी-पंजीकृत आधिकारिक पोर्टल नहीं है।`;
      recommendedAction = `DO NOT open this link or enter your login, trading PIN, or Aadhaar credentials. Report this phishing site immediately.`;
      recommendedActionHi = `इस लिंक को न खोलें और न ही कोई पासवर्ड दर्ज करें। तुरंत 1930 पर या सेबी को शिकायत दर्ज करें।`;
    } else if (hasCredentialPhishing) {
      explanation = `The link is part of a panic-inducing phishing trap claiming account suspension or unauthorized login to steal trading and broker credentials.`;
      explanationHi = `यह लिंक खाता सस्पेंड होने का डर दिखाकर आपके ब्रोकर और ट्रेडिंग पासवर्ड चुराने की फ़िशिंग चाल है।`;
      recommendedAction = `DO NOT enter your broker login, password, or PIN. Official brokers never unlock accounts via unverified external links.`;
      recommendedActionHi = `अपना ब्रोकर पासवर्ड या पिन दर्ज न करें। आधिकारिक ब्रोकर कभी ऐसे बाहरी लिंक से खाता अनलॉक नहीं करवाते।`;
    } else if (hasPaymentRequest) {
      explanation = `The URL is linked to a demand for an advance release fee to unfreeze assets via personal payment rails, matching known advance-fee fraud typologies.`;
      explanationHi = `यह लिंक शेयर या पैसे निकालने के लिए अग्रिम "रिलीज फीस" की अवैध मांग से जुड़ा है, जो एक प्रसिद्ध साइबर धोखाधड़ी का तरीका है।`;
      recommendedAction = `DO NOT pay any advance fees or transfer money to personal UPI handles. Regulated intermediaries never demand clearance payments to release customer funds.`;
      recommendedActionHi = `कोई भी रिलीज फीस या यूपीआई ट्रांसफर न करें। असली संस्थाएं कभी पैसे निकालने के लिए अलग से फीस नहीं मांगतीं।`;
    } else if (hasGuaranteedReturn) {
      explanation = `The link is associated with an investment solicitation promising unusually high guaranteed returns and operates on an unverified domain. Under SEBI regulations, market investments cannot guarantee returns.`;
      explanationHi = `यह लिंक अवैध निश्चित मुनाफे के वादे से जुड़ा है। सेबी नियमों के अनुसार शेयर बाजार में किसी भी निश्चित मुनाफे की गारंटी देना कानूनी रूप से प्रतिबंधित है।`;
      recommendedAction = `STOP. Do not invest money or click to join unverified investment channels.`;
      recommendedActionHi = `रुकें। पैसे न लगाएं और न ही किसी अनधिकृत ग्रुप से जुड़ें।`;
    } else if (hasUrgency) {
      explanation = `The link is associated with an investment solicitation using urgency ('today only' / 'invest now') to encourage immediate action on an unverified domain before due diligence can be conducted.`;
      explanationHi = `यह लिंक कृत्रिम हड़बड़ी ("केवल आज", "अभी निवेश करें") का दबाव बनाकर बिना सोचे-समझे पैसे लगाने के लिए प्रेरित करता है।`;
      recommendedAction = `Do not succumb to artificial deadlines. Verify the investment offer and adviser registration directly on the official SEBI registry (sebi.gov.in).`;
      recommendedActionHi = `हड़बड़ी में कोई फैसला न लें। सेबी की आधिकारिक वेबसाइट पर जाकर सलाहकार का पंजीकरण चेक करें।`;
    } else {
      // General suspicious high-gain domain like quickprofit-india.example/invest-now
      explanation = `The destination could not be independently verified. The URL contains potentially suspicious indicators: domain anatomy suggests an aggressive high-return investment solicitation ('${hostname}') with immediate fund commitment call-to-action on an unregistered domain.`;
      explanationHi = `इस वेबसाइट की आधिकारिक पुष्टि नहीं हो सकी है। यूआरएल में अत्यधिक मुनाफे के भ्रामक संकेत हैं जो अनधिकृत वित्तीय पोंजी योजनाओं से मेल खाते हैं।`;
      recommendedAction = `DO NOT deposit money or provide personal credentials. Verify any investment entity directly on the official SEBI registry (sebi.gov.in).`;
      recommendedActionHi = `इस पोर्टल पर कोई पैसे न लगाएं। किसी भी ब्रोकर या स्कीम की पुष्टि केवल आधिकारिक सेबी वेबसाइट से करें।`;
    }
  } else if (urlType === 'UNKNOWN' || (isShortener && !verifiedContent)) {
    // 2. Needs Verification (Unknown / unverified domains without explicit scam tokens)
    riskLevel = 'Needs Verification';
    confidence = 'MEDIUM';
    riskIndicators.push('Unverified destination domain');
    riskIndicators.push('Unrecognized publisher identity in regulatory whitelist');

    explanation =
      'The destination could not be independently verified. The URL does not match known authentic institutional registries, but no explicit financial fraud or scam tokens were detected.';
    explanationHi =
      'इस वेबसाइट की आधिकारिक पुष्टि नहीं हो सकी है। इसमें सीधा कोई घोटाला नहीं मिला है, लेकिन बिना स्वतंत्र जांच के इस पर भरोसा न करें।';
    recommendedAction =
      'Exercise general caution. Do not enter personal details, banking passwords, or OTPs on unfamiliar websites.';
    recommendedActionHi =
      'सावधानी बरतें। किसी भी अनजान वेबसाइट पर अपना बैंक खाता, पासवर्ड या ओटीपी दर्ज न करें।';
  } else if (urlType === 'GOVERNMENT/EDUCATIONAL') {
    // 3. Official Government / Educational
    riskLevel = 'Low';
    confidence = 'HIGH';

    explanation = isOfficialGovEdu
      ? `The domain belongs to an official accredited educational or government portal (${hostname}). Contains no deceptive financial solicitation.`
      : `The domain is an official, verified Indian regulatory portal (${targetBrand || hostname}). Matches official government records.`;
    explanationHi = `यह एक आधिकारिक सरकारी या शैक्षणिक पोर्टल है। इसमें कोई भ्रामक वित्तीय दावा नहीं है।`;
    recommendedAction =
      'Authorized official destination. Safe to consult official regulatory notices and public directories.';
    recommendedActionHi = `अधिकृत सरकारी पोर्टल। जानकारी देखने के लिए सुरक्षित।`;
  } else if (urlType === 'REGISTRATION/EVENT') {
    // 4. Registration / Event
    riskLevel = 'No Financial Risk';
    confidence = 'HIGH';

    explanation =
      'The URL appears to be a registration/event link and contains no detected financial solicitation or investment-risk indicators.';
    explanationHi =
      'यह यूआरएल किसी इवेंट या रजिस्ट्रेशन से संबंधित है और इसमें कोई वित्तीय धोखाधड़ी या निवेश का जोखिम नहीं है।';
    recommendedAction =
      'Safe to proceed for registration. Always ensure you do not share bank OTPs or financial passwords on event forms.';
    recommendedActionHi =
      'रजिस्ट्रेशन के लिए सुरक्षित। किसी भी फॉर्म में बैंक पासवर्ड या ओटीपी कभी न भरें।';
  } else if (urlType === 'NORMAL WEBSITE') {
    // 5. Normal Website (News, General)
    riskLevel = 'No Financial Risk';
    confidence = 'HIGH';

    explanation =
      'The URL points to an established public or news publication providing informational reporting. No deceptive financial solicitation was detected.';
    explanationHi =
      'यह लिंक एक सामान्य समाचार या सूचना पोर्टल का है। इसमें कोई फर्जी निवेश योजना नहीं है।';
    recommendedAction =
      'Informational content. Standard media reading habits apply.';
    recommendedActionHi =
      'सामान्य सूचना सामग्री। पढ़ने के लिए सुरक्षित।';
  } else if (urlType === 'FINANCIAL/INVESTMENT' && isOfficialRegistered) {
    // 6. Legitimate Investment Education on Official Registered Broker
    riskLevel = 'Low';
    confidence = 'HIGH';

    explanation = `The URL is hosted on an authorized SEBI-registered broker portal (${targetBrand}) providing educational or market information without deceptive profit guarantees.`;
    explanationHi = `यह लिंक सेबी-पंजीकृत आधिकारिक संस्था (${targetBrand}) का है जिसमें वैध जानकारी दी गई है।`;
    recommendedAction =
      'Genuine educational material. Read to learn fundamental market principles and risk disclosures.';
    recommendedActionHi =
      'प्रामाणिक वित्तीय सामग्री। बाज़ार के जोखिमों को समझने के लिए पढ़ें।';
  } else {
    // Default safe fallback
    riskLevel = 'No Financial Risk';
    confidence = 'MEDIUM';
    explanation = 'The URL contains no detected financial solicitation or investment-risk indicators.';
    explanationHi = 'इस लिंक में कोई वित्तीय जोखिम या निवेश का खतरा नहीं पाया गया।';
    recommendedAction = 'Safe to browse. Maintain general digital hygiene.';
    recommendedActionHi = 'ब्राउज़ करने के लिए सुरक्षित।';
  }

  return {
    rawInput,
    url: urlString,
    hostname,
    pathname,
    contextText,
    urlType,
    financialRelevance,
    riskLevel,
    riskIndicators,
    explanation,
    explanationHi,
    recommendedAction,
    recommendedActionHi,
    confidence,
    isOfficialRegistered,
    isLookalike,
    targetBrand,
    suspiciousTld,
    hasSuspiciousDomainKeywords,
    hasSuspiciousPathKeywords,
    isShortener,
    hasExcessiveSubdomains,
    verifiedContent,
    unverifiedDestinationNotice,
    observedCharacteristics
  };
}
