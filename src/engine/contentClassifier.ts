import { ContentCategory, DocumentContentType, FinancialRelevance, RiskIndicator } from '../types';

export interface ClassificationReport {
  category: ContentCategory;
  rationale: string;
  rationaleHi: string;
  documentContentType: DocumentContentType;
  financialRelevance: FinancialRelevance;
  relevanceExplanation: string;
  relevanceExplanationHi: string;
}

/**
 * STEP 1: Classify the structural content type of the submitted text/image.
 * Clearly separates personal photos, educational marksheets, IDs, and bank records from investment claims.
 */
export function classifyDocumentContentType(
  text: string,
  inputType?: 'text' | 'image' | 'url',
  fileName?: string
): DocumentContentType {
  const lower = (text || '').toLowerCase().trim();
  const lowerFile = (fileName || '').toLowerCase().trim();

  // 1. Personal Photo Detection
  const personalPhotoKeywords = [
    'personal photograph',
    'selfie',
    'photo of me',
    'my photo',
    'family photo',
    'portrait',
    'avatar',
    'camera picture',
    'profile picture',
    'photo with friends',
    'vacation picture',
    'nature photo',
    'landscape photo'
  ];
  const isPersonalPhotoText = personalPhotoKeywords.some(k => lower.includes(k));
  const isPersonalPhotoFile = lowerFile.includes('selfie_') || lowerFile.includes('my_portrait');

  if (
    (isPersonalPhotoText || (isPersonalPhotoFile && lower.length < 30)) &&
    !lower.includes('guaranteed') &&
    !lower.includes('sebi') &&
    !lower.includes('profit') &&
    !lower.includes('investment') &&
    !lower.includes('trading') &&
    !lower.includes('ipo') &&
    !lower.includes('upi')
  ) {
    return 'PERSONAL_PHOTO';
  }

  // 2. Identity Document Detection (College ID, Student ID, Aadhaar, PAN)
  const identityDocKeywords = [
    'student identity card',
    'student id',
    'college id',
    'university id',
    'institute identity card',
    'identity card',
    'identity document',
    'aadhaar card',
    'pan card',
    'driving license',
    'voter id',
    'passport',
    'employee id card',
    'enrollment no',
    'department of computer science',
    'valid through',
    'valid till'
  ];
  const isIdentityText = identityDocKeywords.some(k => lower.includes(k));
  const isIdentityFile =
    lowerFile.includes('college_id') ||
    lowerFile.includes('student_id') ||
    lowerFile.includes('id_card') ||
    lowerFile.includes('aadhaar') ||
    lowerFile.includes('pan_card') ||
    lowerFile.includes('passport');

  if (isIdentityText || (isIdentityFile && !lower.includes('guaranteed return') && !lower.includes('invest'))) {
    return 'IDENTITY_DOCUMENT';
  }

  // 3. Educational Document Detection (JEE, NEET, Marksheets, Scorecards, Degrees)
  const educationalDocKeywords = [
    'joint entrance examination',
    'jee main',
    'jee advanced',
    'jee scorecard',
    'jee marksheet',
    'score card',
    'scorecard',
    'marksheet',
    'mark sheet',
    'percentile score',
    'total nta score',
    'national testing agency',
    'candidate name',
    'physics percentile',
    'chemistry percentile',
    'mathematics percentile',
    'cbse board',
    'icse board',
    'grade card',
    'academic transcript',
    'hall ticket',
    'admit card',
    'neet score',
    'degree certificate',
    'semester result',
    'provisional certificate',
    'board examination',
    'passing certificate',
    'marks obtained',
    'qualification status'
  ];
  const isEduDocText = educationalDocKeywords.some(k => lower.includes(k));
  const isEduDocFile =
    lowerFile.includes('jee') ||
    lowerFile.includes('marksheet') ||
    lowerFile.includes('scorecard') ||
    lowerFile.includes('result') ||
    lowerFile.includes('transcript') ||
    lowerFile.includes('grade');

  if (isEduDocText || (isEduDocFile && !lower.includes('guaranteed return') && !lower.includes('invest'))) {
    return 'EDUCATIONAL_DOCUMENT';
  }

  // 4. Bank Document Detection (Routine Statement / Passbook without scam offer)
  const bankDocKeywords = [
    'account statement',
    'bank statement',
    'passbook',
    'opening balance',
    'closing balance',
    'branch code',
    'ifsc code',
    'statement of account',
    'monthly statement summary',
    'state bank of india - account statement',
    'hdfc bank account statement',
    'icici bank statement',
    'salary credit',
    'grocery upi debit',
    'savings account statement',
    'current account statement',
    'monthly salary',
    'sbi kehta hai',
    'rbi kehta hai'
  ];
  const isRoutineBankAlert =
    /(?:credited with|credited to your a\/c|salary credited|debited from a\/c|otp for transaction|auto-debit)/i.test(lower) &&
    /(?:avl bal|available balance|sbi kehta hai|never share otp|do not share otp|valid for \d+ min)/i.test(lower) &&
    !lower.includes('blocked in 2 hours') &&
    !lower.includes('click http');

  const isBankDocText = bankDocKeywords.some(k => lower.includes(k)) || isRoutineBankAlert;
  const isBankDocFile =
    lowerFile.includes('bank_statement') ||
    lowerFile.includes('passbook') ||
    lowerFile.includes('account_stmt');

  if (isBankDocText || (isBankDocFile && !lower.includes('guaranteed 50%') && !lower.includes('vip group'))) {
    return 'BANK_DOCUMENT';
  }

  // 5. Medical Document Detection (Doctor Prescription, Clinic Slip, Medicine Dosage)
  const medicalKeywords = [
    'doctor prescription',
    'prescription',
    'clinic',
    'hospital',
    'patient',
    'dr. sharma',
    'dr.',
    'doctor',
    'paracetamol',
    'cetirizine',
    'tablet',
    'capsule',
    'mg tds',
    'mg od',
    'take after food',
    'take before food',
    'dosage',
    'pharmacy',
    'rx'
  ];
  if (medicalKeywords.some(k => lower.includes(k)) && !lower.includes('invest') && !lower.includes('guaranteed') && !lower.includes('profit')) {
    return 'MEDICAL_DOCUMENT';
  }

  // 6. Retail & Grocery Store Receipt Detection
  const receiptKeywords = [
    'grocery store bill',
    'store bill',
    'supermarket',
    'd-mart',
    'dmart',
    'retail invoice',
    'total amount: rs',
    'restaurant bill',
    'food receipt',
    'grocery bill',
    'retail bill',
    'cash memo',
    'invoice bill',
    'out for delivery',
    'order delivered in',
    'order is confirmed'
  ];
  const hasFoodItems = ['rice', 'oil', 'milk', 'bread', 'butter', 'sugar', 'dal', 'tea', 'wheat', 'vegetables'].some(k => lower.includes(k));
  const isDeliveryNotice = /(?:out for delivery|order #\d+|delivered successfully|delivered in \d+ mins)/i.test(lower) && /(?:flipkart|amazon|swiggy|zomato|blinkit|zepto|courier|delivery agent)/i.test(lower);

  if ((receiptKeywords.some(k => lower.includes(k)) || isDeliveryNotice || (hasFoodItems && lower.includes('bill'))) && !lower.includes('invest') && !lower.includes('guaranteed') && !lower.includes('clearance fee')) {
    return 'RECEIPT_DOCUMENT';
  }

  // 7. Legitimate Utility & Service Bill Reminder (No disconnection extortion)
  const isUtilityBill =
    (lower.includes('electricity bill') ||
      lower.includes('water bill') ||
      lower.includes('gas bill') ||
      lower.includes('power bill') ||
      lower.includes('broadband bill') ||
      lower.includes('piped gas') ||
      lower.includes('bijli bill') ||
      lower.includes('बिजली बिल') ||
      lower.includes('utility bill')) &&
    !lower.includes('disconnected tonight') &&
    !lower.includes('disconnected in ') &&
    !lower.includes('power cut') &&
    !lower.includes('call electricity officer') &&
    !lower.includes('officer helpline') &&
    !lower.includes('immediate disconnect') &&
    !lower.includes('urgent disconnect');

  if (isUtilityBill) {
    return 'UTILITY_BILL';
  }

  // 5. Legitimate Educational Awareness
  const isEducationalContent =
    lower.includes('investor awareness') ||
    lower.includes('sebi advisory') ||
    lower.includes('beware of unsolicited') ||
    lower.includes('sebi does not guarantee') ||
    lower.includes('does not guarantee returns') ||
    lower.includes('scheme information document') ||
    (lower.includes('market risks') && lower.includes('carefully before investing')) ||
    lower.includes('financial literacy') ||
    lower.includes('be a smart investor') ||
    lower.includes('investor education') ||
    lower.includes('invest wisely') ||
    lower.includes('understand. verify. invest wisely') ||
    lower.includes('for more investor education resources') ||
    lower.includes('consult a sebi registered intermediary') ||
    lower.includes('be careful of unsolicited tips') ||
    lower.includes('भारतीय प्रतिभूति और विनिमय बोर्ड') ||
    (lower.includes('securities and exchange board of india') && lower.includes('sebi.gov.in'));

  if (
    isEducationalContent &&
    !lower.includes('forged') &&
    !lower.includes('assured') &&
    !lower.includes('guaranteed') &&
    !lower.includes('vip') &&
    !lower.includes('paisa double') &&
    !lower.includes('double money')
  ) {
    return 'INVESTMENT_CONTENT';
  }

  // 6. Payment / Transaction Demand Content
  const isEduWarning =
    lower.includes('never transfer') ||
    lower.includes('do not transfer') ||
    lower.includes('avoid transferring') ||
    lower.includes('investor awareness') ||
    lower.includes('sebi advisory') ||
    lower.includes('beware of unsolicited') ||
    lower.includes('sebi does not guarantee') ||
    lower.includes('does not guarantee') ||
    lower.includes('be a smart investor') ||
    lower.includes('investor education') ||
    lower.includes('be careful of unsolicited tips') ||
    lower.includes('avoid messages promising');

  if (!isEduWarning) {
    const paymentContentKeywords = [
      'transfer money to',
      'send payment to',
      'to personal upi',
      'release fee',
      'withdrawal fee',
      'processing fee',
      'sebi release tax',
      'mandatory sebi/regulatory',
      'mandatory regulatory',
      'regulatory verification fee',
      'verification fee',
      'to release your funds',
      'transfer fee',
      'release shares',
      'ransom fee',
      'pay 20%',
      'unfreeze fee',
      'allocation wallet',
      'prepaid task',
      'merchant task',
      'like youtube',
      'earn per like',
      'per like ₹',
      'per task ₹',
      'hotel review commission',
      'part-time job earn',
      'part time job earn'
    ];
    if (paymentContentKeywords.some(k => lower.includes(k))) {
      return 'PAYMENT_TRANSACTION_CONTENT';
    }
  }

  // 7. Financial Advertisement
  if (
    /guaranteed\s*\d{1,4}%\s*(return|profit|gain)/i.test(lower) ||
    /\d{1,4}%\s*guaranteed\s*(return|profit|gain)/i.test(lower) ||
    lower.includes('100% loss refund') ||
    lower.includes('zero risk investment') ||
    lower.includes('fixed monthly return') ||
    lower.includes('double your money') ||
    lower.includes('paisa double') ||
    lower.includes('forex trading bot') ||
    lower.includes('डबल') ||
    lower.includes('दोगुना') ||
    lower.includes('दो महीने में डबल') ||
    lower.includes('पैसे डबल') ||
    lower.includes('रुपये डबल') ||
    lower.includes('पैसा डबल') ||
    lower.includes('रुपया डबल') ||
    lower.includes('द्वিগুণ') ||
    lower.includes('দুগুণ')
  ) {
    return 'FINANCIAL_ADVERTISEMENT';
  }

  // 8. Investment Message / Social Media Solicitations / Phishing Alerts
  if (
    lower.includes('vip upper circuit') ||
    lower.includes('telegram channel for trading') ||
    lower.includes('whatsapp support to register folio') ||
    lower.includes('jackpot stock tips') ||
    lower.includes('special allocation window') ||
    lower.includes('vip group') ||
    lower.includes('vip investor group') ||
    lower.includes('insider calls') ||
    lower.includes('stock tips for intraday') ||
    lower.includes('sebi investment alert') ||
    lower.includes('account will be suspended') ||
    lower.includes('permanent account blockage') ||
    lower.includes('unusual login detected') ||
    lower.includes('holdings have been frozen') ||
    lower.includes('portfolio auction') ||
    lower.includes('verify your broker credentials') ||
    lower.includes('secret sme ipo tip') ||
    lower.includes('withdrawal pending') ||
    lower.includes('मांग रहा') ||
    lower.includes('मांग रहे') ||
    lower.includes('पैसे मांग') ||
    lower.includes('रुपये मांग') ||
    lower.includes('जानता नहीं') ||
    lower.includes('पहचानता नहीं') ||
    lower.includes('अनजान व्यक्ति') ||
    lower.includes('अजनबी') ||
    lower.includes("don't know him") ||
    lower.includes('টাকা চাইছে')
  ) {
    return 'INVESTMENT_MESSAGE';
  }

  // 9. General / Legitimate Investment Content
  const investmentKeywords = [
    'mutual fund',
    'systematic investment plan',
    'sip',
    'scheme information document',
    'market risks',
    'equity fund',
    'rupee cost averaging',
    'diversification',
    'asset allocation',
    'index fund',
    'demat account',
    'sebi registered investment adviser',
    'sebi registration',
    'stock market',
    'shares'
  ];
  if (investmentKeywords.some(k => lower.includes(k))) {
    return 'INVESTMENT_CONTENT';
  }

  // 10. Casual Chat / General Non-Financial Messages
  const casualChatGreetings = [
    /\bhi\b/i,
    /\bhello\b/i,
    /\bhey\b/i,
    /\bgood morning\b/i,
    /\bgood evening\b/i,
    /\bgood afternoon\b/i,
    /\bgood night\b/i,
    /\bnamaste\b/i,
    /\bnamaskar\b/i,
    /\bkaise ho\b/i,
    /\bkaisa hai\b/i,
    /\bkya chal raha hai\b/i,
    /\bkya kar rahe ho\b/i,
    /\bme bol raha hun\b/i,
    /\bme bol rhi hun\b/i,
    /\bmain bol raha hun\b/i,
    /\bmain bol rahi hoon\b/i,
    /\bbol rhi hun\b/i,
    /\bbol raha hun\b/i,
    /\bkaha ho\b/i,
    /\bwhats up\b/i,
    /\bwhat's up\b/i,
    /\bwassup\b/i,
    /\bhow are you\b/i,
    /\bhow do you do\b/i,
    /\bhappy birthday\b/i,
    /\bcongratulations\b/i,
    /\bthank you\b/i,
    /\bthanks\b/i,
    /\bsee you\b/i,
    /\bbye\b/i,
    /\bmeeting at\b/i,
    /\btomorrow is\b/i,
    /\brecipe for\b/i,
    /\bingredients\b/i
  ];

  const hasCasualGreeting = casualChatGreetings.some(regex => regex.test(lower));
  if (
    hasCasualGreeting &&
    !lower.includes('guaranteed') &&
    !lower.includes('invest') &&
    !lower.includes('profit') &&
    !lower.includes('return') &&
    !lower.includes('trading') &&
    !lower.includes('sebi') &&
    !lower.includes('demat') &&
    !lower.includes('crypto') &&
    !lower.includes('kyc') &&
    !lower.includes('upi') &&
    !lower.includes('₹') &&
    !lower.includes('डबल') &&
    !lower.includes('पैसे')
  ) {
    return 'NON_FINANCIAL_TEXT';
  }

  // 11. Blank Image or Empty Text
  if (
    lower === '' ||
    lower === '[blank image]' ||
    lower.includes('[blank image - no readable text detected]') ||
    lower.includes('[blank image]')
  ) {
    return 'UNKNOWN';
  }

  // Default Fallback
  return 'UNKNOWN';
}

/**
 * STEP 2: CHECK FINANCIAL RELEVANCE
 * Explicitly determines whether the content has any investment/financial/scam claims.
 * If clearly NO, the system MUST NOT assign HIGH financial risk.
 */
export function determineFinancialRelevance(
  contentType: DocumentContentType,
  text: string,
  inputType?: 'text' | 'image' | 'url'
): {
  relevance: FinancialRelevance;
  rationale: string;
  rationaleHi: string;
} {
  const lower = (text || '').toLowerCase().trim();

  // Non-financial content categories
  if (contentType === 'PERSONAL_PHOTO') {
    return {
      relevance: 'NO',
      rationale: 'Personal photograph. No financial, investment, or commercial transaction content detected.',
      rationaleHi: 'यह एक व्यक्तिगत तस्वीर है। इसमें निवेश, शेयर या वित्तीय लेनदेन से जुड़ा कोई दावा नहीं है।'
    };
  }

  if (contentType === 'EDUCATIONAL_DOCUMENT') {
    return {
      relevance: 'NO',
      rationale: 'Educational document (marksheet / academic certificate). No investment offers, financial claims, or market solicitations detected.',
      rationaleHi: 'यह एक शैक्षणिक दस्तावेज़ (अंकतालिका / प्रमाणपत्र) है। इसमें कोई वित्तीय या निवेश संबंधी दावा नहीं है।'
    };
  }

  if (contentType === 'IDENTITY_DOCUMENT') {
    return {
      relevance: 'NO',
      rationale: 'Institutional or personal identity document. Contains personal credentials, but no financial investment offers or fraudulent claims.',
      rationaleHi: 'यह एक पहचान पत्र (आईडी कार्ड) है। इसमें व्यक्तिगत जानकारी है, लेकिन वित्तीय या निवेश संबंधी कोई खतरा नहीं है।'
    };
  }

  if (contentType === 'BANK_DOCUMENT') {
    // A bank statement is sensitive personal finance, NOT an investment scam!
    return {
      relevance: 'NO',
      rationale: 'Routine bank account statement or passbook. Contains sensitive personal banking figures, but no third-party investment fraud or deceptive solicitation detected.',
      rationaleHi: 'यह एक सामान्य बैंक खाता विवरण (स्टेटमेंट) है। इसमें व्यक्तिगत वित्तीय जानकारी है, लेकिन कोई धोखाधड़ी या फर्जी निवेश स्कीम नहीं है।'
    };
  }

  if (contentType === 'MEDICAL_DOCUMENT') {
    return {
      relevance: 'NO',
      rationale: 'Medical document / doctor prescription. Zero financial investment or scam claims present.',
      rationaleHi: 'यह एक चिकित्सकीय पर्चा है। इसमें कोई वित्तीय जोखिम या निवेश का दावा नहीं है।'
    };
  }

  if (contentType === 'RECEIPT_DOCUMENT') {
    return {
      relevance: 'NO',
      rationale: 'Retail or grocery purchase invoice. Routine merchant transaction with zero investment solicitation.',
      rationaleHi: 'यह घरेलू खरीदारी या सामान्य दुकान की रसीद है। इसमें कोई निवेश धोखाधड़ी नहीं है।'
    };
  }

  if (contentType === 'UTILITY_BILL') {
    return {
      relevance: 'NO',
      rationale: 'Routine utility bill statement. Legitimate billing alert with zero fraudulent investment schemes.',
      rationaleHi: 'यह एक सामान्य बिजली या उपयोगिता बिल है। इसमें कोई धोखाधड़ी नहीं है।'
    };
  }

  if (contentType === 'NON_FINANCIAL_TEXT') {
    return {
      relevance: 'NO',
      rationale: 'Casual personal message or general conversation. Zero financial, investment, or commercial transaction content detected.',
      rationaleHi: 'यह एक सामान्य बातचीत या संदेश है। इसमें निवेश, शेयर या वित्तीय लेनदेन से जुड़ा कोई दावा नहीं है।'
    };
  }

  if (
    contentType === 'INVESTMENT_CONTENT' ||
    contentType === 'FINANCIAL_ADVERTISEMENT' ||
    contentType === 'INVESTMENT_MESSAGE' ||
    contentType === 'PAYMENT_TRANSACTION_CONTENT'
  ) {
    return {
      relevance: 'YES',
      rationale: 'Contains market, investment, or monetary transaction claims that require regulatory scrutiny.',
      rationaleHi: 'इस सामग्री में निवेश, शेयर या पैसों के लेन-देन से जुड़े दावे हैं जिनकी सेबी नियमों के तहत जांच आवश्यक है।'
    };
  }

  // Precise Financial Content Detector - avoids false-positive substring matches like 'rs' in 'Harsh'
  const isFinancialContent = (t: string): boolean => {
    // 1. Explicit Currency amounts: ₹ 500, Rs. 1000, 5000 INR, $ 100
    if (/(?:₹|\$|€|£)\s*\d+/i.test(t)) return true;
    if (/\b(?:rs\.?|inr|usd|usdt|rupees?|rupiya)\s*\d+/i.test(t)) return true;
    if (/\d+\s*(?:rs|inr|usd|rupees?|rupiya)\b/i.test(t)) return true;
    if (/\b(?:rupees?|rupiya)\b/i.test(t)) return true;

    // 2. Specific financial, investment, and market terms (whole-word matching)
    const financialWordRegexes = [
      /\binvest(?:ment|ing|or|ors)?\b/i,
      /\bprofit(?:s|able)?\b/i,
      /\breturn(?:s)?\b/i,
      /\btrad(?:e|ing|er|ers)?\b/i,
      /\bstock(?:s)?\b/i,
      /\bshare(?:s|holder|holders)?\b/i,
      /\bcrypto(?:currency)?\b/i,
      /\bforex\b/i,
      /\bdemat\b/i,
      /\bsebi\b/i,
      /\bnsdl\b/i,
      /\bcdsl\b/i,
      /\bbroker(?:age)?\b/i,
      /\bupi\b/i,
      /\bwallet\b/i,
      /\bdeposit(?:s|ed|ing)?\b/i,
      /\bwithdraw(?:al|s|ed|ing)?\b/i,
      /\bdividend(?:s)?\b/i,
      /\ballotment\b/i,
      /\bipo\b/i,
      /\bloan\b/i,
      /\bcibil\b/i,
      /\bmutual\s+fund(?:s)?\b/i,
      /\bsip\b/i,
      /\bprocessing\s+fee\b/i,
      /\bverification\s+fee\b/i,
      /\bregistration\s+fee\b/i,
      /\brelease\s+fee\b/i,
      /\bprepaid\s+task\b/i,
      /\bper\s+like\b/i,
      /\bdigital\s+arrest\b/i,
      /\billegal\s+passport\b/i,
      /\bnarcotics\b/i,
      /\bdrugs\s+parcel\b/i,
      /\btyping\s+work\b/i,
      /\blottery\b/i,
      /\bkbc\b/i,
      /\belectricity\s+officer\b/i,
      /\bpower\s+will\s+be\s+disconnected\b/i,
      /डीमैट|ट्रेडिंग|शेयर|निवेश|मुनाफा|ब्रोकर|पैन कार्ड|खाता बंद|पैसे डबल|पैसा डबल/i,
      /ডিম্যাট|ট্রেডিং|শেয়ার|বিনিয়োগ|মুনাফা|টাকা দুগুণ/i,
      /ডিমেট|ট্ৰেডিং|বিনিয়োগ|টকা দুগুণ/i
    ];
    if (financialWordRegexes.some(r => r.test(t))) return true;

    // 3. Vernacular (Hindi, Bengali, Assamese) financial phrases
    const vernacularFinancialPhrases = [
      'डबल', 'दोगुना', 'दो गुना', 'तीन गुना', 'मुनाफा', 'मुनाफ़ा', 'ब्याज',
      'पैसे ट्रांसफर', 'पैसे भेजो', 'रुपये भेजो', 'खाता ब्लॉक', 'खाता सस्पेंड',
      'पैसे मांग', 'रुपये मांग', 'पैसा मांग', 'हजार रुपये', 'लाख रुपये', 'करोड़',
      'ডিমেট', 'কেওয়াইসি', 'টাকা পাঠান', 'টকা পঠিয়াওক', 'লাভ', 'দ্বিগুণ', 'দুগুণ',
      'টাকা দ্বিগুণ', 'টকা দুগুণ', 'পইচা'
    ];
    if (vernacularFinancialPhrases.some(p => t.includes(p))) return true;

    return false;
  };

  const hasFinancialContent = isFinancialContent(lower);

  if (hasFinancialContent) {
    return {
      relevance: 'YES',
      rationale: 'Contains financial terms and market claims requiring regulatory safety evaluation.',
      rationaleHi: 'इसमें वित्तीय संदर्भ व निवेश के दावे हैं जिनकी सुरक्षा जांच आवश्यक है।'
    };
  }

  // Non-financial content (casual chat, personal photos, recipes, normal screenshots, notes)
  return {
    relevance: 'NO',
    rationale: 'No financial or investment-related claims detected in this content.',
    rationaleHi: 'इस सामग्री में वित्तीय या निवेश से जुड़ा कोई विषय नहीं पाया गया।'
  };
}

/**
 * STEP 3: Misinformation & Category Classification
 */
export function classifyContent(
  text: string,
  riskIndicators: RiskIndicator[],
  hasSuspiciousDomain: boolean,
  inputType?: 'text' | 'image' | 'url',
  fileName?: string
): ClassificationReport {
  const lower = (text || '').toLowerCase().trim();

  // 1. Structural Content Classification
  const documentContentType = classifyDocumentContentType(text, inputType, fileName);

  // 2. Official Educational Notice Gate
  const isOfficialEducationalNotice =
    (lower.includes('be a smart investor') ||
      lower.includes('investor education') ||
      (lower.includes('securities and exchange board of india') && lower.includes('sebi.gov.in'))) &&
    !lower.includes('guaranteed 300%') &&
    !lower.includes('vip group') &&
    !lower.includes('paisa double');

  if (isOfficialEducationalNotice) {
    return {
      category: 'Educational',
      rationale: 'Official regulatory investor education advisory from SEBI.',
      rationaleHi: 'सेबी की आधिकारिक निवेशक जागरूकता और शिक्षा सामग्री।',
      documentContentType: 'INVESTMENT_CONTENT',
      financialRelevance: 'YES',
      relevanceExplanation: 'Legitimate public education resource published by SEBI.',
      relevanceExplanationHi: 'सेबी द्वारा प्रकाशित प्रामाणिक निवेशक शिक्षा सामग्री।'
    };
  }

  // 3. Financial Relevance Gate for Safe / Ambiguous Content
  const relevanceCheck = determineFinancialRelevance(documentContentType, text, inputType);

  const hasCritical = riskIndicators.some(i => i.severity === 'critical');
  const highCount = riskIndicators.filter(i => i.severity === 'high').length;

  // If clearly non-financial and no critical scam indicators, return safe non-financial category immediately
  if (relevanceCheck.relevance === 'NO' && !hasCritical) {
    if (documentContentType === 'PERSONAL_PHOTO') {
      return {
        category: 'Personal Content',
        rationale: relevanceCheck.rationale,
        rationaleHi: relevanceCheck.rationaleHi,
        documentContentType,
        financialRelevance: 'NO',
        relevanceExplanation: relevanceCheck.rationale,
        relevanceExplanationHi: relevanceCheck.rationaleHi
      };
    }

    return {
      category: 'Non-Financial Document',
      rationale: relevanceCheck.rationale,
      rationaleHi: relevanceCheck.rationaleHi,
      documentContentType,
      financialRelevance: 'NO',
      relevanceExplanation: relevanceCheck.rationale,
      relevanceExplanationHi: relevanceCheck.rationaleHi
    };
  }

  if (hasCritical || highCount >= 1 || hasSuspiciousDomain) {
    return {
      category: 'Suspicious',
      rationale: 'Contains verified deceptive patterns such as unrealistic guaranteed returns, regulatory impersonation, or unverified lookalike portals.',
      rationaleHi: 'इस सामग्री में निश्चित मुनाफे के झूठे वादे, सेबी के नाम का दुरुपयोग या संदिग्ध लिंक जैसे गंभीर खतरे पाए गए हैं।',
      documentContentType: documentContentType === 'UNKNOWN' ? 'INVESTMENT_MESSAGE' : documentContentType,
      financialRelevance: 'YES',
      relevanceExplanation: 'Contains active financial deception markers violating SEBI market regulations.',
      relevanceExplanationHi: 'इसमें सेबी नियमों का उल्लंघन करने वाले भ्रामक वित्तीय दावे शामिल हैं।'
    };
  }

  // 4. Comprehensive Educational & Literacy Signals
  const educationalKeywords = [
    'investor awareness',
    'understanding',
    'market risks',
    'scheme information document',
    'does not guarantee',
    'read all scheme related documents',
    'systematic investment plan',
    'sip',
    'mutual fund',
    'diversification',
    'asset allocation',
    'index fund',
    'rupee cost averaging',
    'long term wealth',
    'compounding',
    'emergency fund',
    'risk profiling',
    'financial literacy',
    'sebi registered investment adviser',
    'scores portal',
    'be a smart investor',
    'invest wisely',
    'understand. verify. invest wisely',
    'for more investor education resources',
    'consult a sebi registered intermediary',
    'be careful of unsolicited tips',
    'avoid messages promising guaranteed returns',
    'securities and exchange board of india',
    'sebi.gov.in',
    'azadi ka amrit mahotsav',
    'भारतीय प्रतिभूति और विनिमय बोर्ड',
    'समझें. परखें. सोच-समझकर निवेश करें',
    'निवेशक जागरूकता',
    'जोखिम प्रकटीकरण',
    'वित्तीय साक्षरता',
    'एसआईपी',
    'म्यूचुअल फंड',
    'বিনিয়োগ শিক্ষা',
    'বিনীযোগ শিক্ষা'
  ];

  const hasDeceptiveHallmarks =
    lower.includes('forged') ||
    lower.includes('alpha wealth') ||
    lower.includes('assured return') ||
    lower.includes('guaranteed return') ||
    lower.includes('double money') ||
    lower.includes('पैसा डबल') ||
    lower.includes('पैसे डबल') ||
    lower.includes('रुपये डबल') ||
    lower.includes('vip fund') ||
    lower.includes('vip group');

  const educationalMatches = educationalKeywords.filter(k => lower.includes(k));
  const educationalMatchCount = educationalMatches.length;
  const isEducational =
    (educationalMatchCount >= 1 || isOfficialEducationalNotice) &&
    (!hasCritical || isOfficialEducationalNotice) &&
    highCount === 0 &&
    !hasDeceptiveHallmarks;

  const isAuthenticBankingAlert =
    (lower.includes('otp for login') || lower.includes('your otp for') || lower.includes('one time password') || (lower.includes('credited to your a/c') && lower.includes('salary credit'))) &&
    (lower.includes('do not share') || lower.includes('valid for') || lower.includes('netbanking') || lower.includes('neft')) &&
    riskIndicators.length === 0;

  if (isEducational || isAuthenticBankingAlert) {
    return {
      category: 'Educational',
      rationale: isAuthenticBankingAlert
        ? 'Official 2FA bank authentication or transactional alert with mandatory security disclosure. Zero fraudulent solicitation present.'
        : 'Presents conceptual financial education with balanced risk disclosures. Contains no commercial soliciting, no speculative advice, and no deceptive urgency.',
      rationaleHi: isAuthenticBankingAlert
        ? 'यह आधिकारिक बैंक द्वारा भेजा गया प्रामाणिक सुरक्षा ओटीपी या लेन-देन अलर्ट है।'
        : 'यह प्रामाणिक वित्तीय शिक्षा है जिसमें बाज़ार के जोखिमों को ईमानदारी से समझाया गया है और किसी शेयर को खरीदने का दबाव नहीं है।',
      documentContentType: 'INVESTMENT_CONTENT',
      financialRelevance: 'YES',
      relevanceExplanation: 'Balanced financial literacy or authentic banking alert.',
      relevanceExplanationHi: 'संतुलित वित्तीय साक्षरता या प्रामाणिक बैंक सुरक्षा सूचना।'
    };
  }

  // 5. Promotional Content
  const isPromotional =
    lower.includes('bonus') ||
    lower.includes('discount') ||
    lower.includes('offer') ||
    lower.includes('join now') ||
    lower.includes('referral') ||
    lower.includes('open an account today');

  if (isPromotional && riskIndicators.length <= 1) {
    return {
      category: 'Promotional',
      rationale: 'Primary intent appears promotional or marketing-driven. While not definitively fraudulent, it aims to drive user signups or engagement rather than pure neutral education.',
      rationaleHi: 'यह मुख्य रूप से प्रचार या मार्केटिंग से जुड़ा संदेश है। इसमें जोखिम की जानकारी कम और प्रचार अधिक है।',
      documentContentType,
      financialRelevance: 'YES',
      relevanceExplanation: 'Marketing or promotional solicitation for financial services.',
      relevanceExplanationHi: 'वित्तीय सेवाओं के लिए प्रचार या मार्केटिंग सामग्री।'
    };
  }

  // 6. Ambiguous / Insufficient Evidence Fallback
  return {
    category: 'Insufficient evidence',
    rationale: 'The provided content is too brief or ambiguous to determine intent with high certainty. Independent verification through official channels is strongly advised.',
    rationaleHi: 'उपलब्ध जानकारी बहुत संक्षिप्त या अस्पष्ट है। किसी भी निर्णय से पहले आधिकारिक स्रोतों से स्वतंत्र जांच जरूरी है।',
    documentContentType,
    financialRelevance: relevanceCheck.relevance,
    relevanceExplanation: 'Ambiguous claims requiring further verification before proceeding.',
    relevanceExplanationHi: 'अस्पष्ट दावे जिनके लिए स्वतंत्र पुष्टि आवश्यक है।'
  };
}
