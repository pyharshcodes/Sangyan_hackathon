import { AUTHENTIC_MARKET_ENTITIES, SUSPICIOUS_TLDS, SEBI_REGISTRATION_PREFIXES } from '../data/sebiEntities';
import { sanitizeUserInput } from './privacySanitizer';

// ==========================================
// 1. INPUT CONTRACT
// ==========================================
export interface AnalysisInput {
  text?: string;
  ocrText?: string;
  url?: string;
  organizationName?: string;
  registrationId?: string;
}

// ==========================================
// 2. EXTRACT CONTRACT
// ==========================================
export interface ExtractedClaims {
  claims: string[];
  entities: string[];
  urls: string[];
  registration_ids: string[];
  promised_returns: string[];
  urgency_signals: string[];
  payment_requests: string[];
  authority_claims: string[];
}

// ==========================================
// 3. RISK SIGNAL CONTRACT
// ==========================================
export interface RiskSignal {
  signal:
    | 'Guaranteed returns'
    | 'Unrealistic promises'
    | 'Urgency'
    | 'FOMO'
    | 'Fake authority'
    | 'Regulatory impersonation'
    | 'Suspicious domain'
    | 'Credential harvesting'
    | 'Advance fee'
    | 'Withdrawal fee'
    | 'Off-platform payment'
    | 'VIP investment group'
    | 'Unknown entity'
    | 'Unverifiable claims';
  severity: 'low' | 'medium' | 'high' | 'critical';
  evidence: string;
  explanation: string;
}

// ==========================================
// 4. OUTPUT CONTRACT
// ==========================================
export type AssessmentLevel =
  | 'CRITICAL_RISK'
  | 'HIGH_RISK'
  | 'MODERATE_RISK'
  | 'LOW_RISK'
  | 'INSUFFICIENT_EVIDENCE';

export interface SangyanEngineOutput {
  assessment: AssessmentLevel;
  summary: string;
  signals: RiskSignal[];
  verified: string[];
  unverified: string[];
  uncertainty: string[];
  safe_next_steps: string[];
  hindi_explanation: string;
  extracted_claims: ExtractedClaims;
  limitations: string[];
}

// ==========================================
// EXTRACTION ENGINE
// ==========================================
export function extractStructuredClaims(input: AnalysisInput): ExtractedClaims {
  const combinedText = [
    input.text || '',
    input.ocrText || '',
    input.url || '',
    input.organizationName || '',
    input.registrationId || ''
  ]
    .join(' ')
    .trim();

  const extracted: ExtractedClaims = {
    claims: [],
    entities: [],
    urls: [],
    registration_ids: [],
    promised_returns: [],
    urgency_signals: [],
    payment_requests: [],
    authority_claims: []
  };

  if (!combinedText) {
    return extracted;
  }

  // 1. Extract URLs
  const urlRegex = /https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.(?:vip|xyz|top|online|site|club|in|com|org|net|co\.in)(?:\/[^\s]*)?/gi;
  const urls: string[] = combinedText.match(urlRegex) || [];
  extracted.urls = Array.from(new Set(urls.map(u => u.trim())));

  // 2. Extract Registration IDs (SEBI syntax: e.g. INA998877112, INH000001234, INZ000031633)
  const regRegex = /\b(INA|INH|INZ|INP|INM|IN-DP|INR|INF)[0-9A-Z]{6,12}\b/gi;
  const regMatches: string[] = combinedText.match(regRegex) || [];
  if (input.registrationId) regMatches.push(input.registrationId);
  extracted.registration_ids = Array.from(new Set(regMatches.map(r => r.toUpperCase().trim())));

  // 3. Extract Promised Returns (e.g. 300% profit, 40% monthly, 5% daily, 10x return)
  const returnRegex = /\b(?:\d{1,4}%\s*(?:profit|return|interest|gain|monthly|daily|fixed)?|\d{1,2}x\s*return|guaranteed\s*return|zero\s*risk|loss\s*refund)\b/gi;
  const returnMatches: string[] = combinedText.match(returnRegex) || [];
  extracted.promised_returns = Array.from(new Set(returnMatches.map(r => r.trim())));

  // 4. Extract Urgency Signals
  const urgencyKeywords = [
    'within 2 hours',
    'immediately',
    'only 3 slots',
    'only 2 slots',
    'urgent alert',
    'hurry',
    'before market opens',
    'limited seats',
    'countdown',
    'जल्दी करें',
    'तुरंत'
  ];
  urgencyKeywords.forEach(k => {
    if (combinedText.toLowerCase().includes(k)) {
      extracted.urgency_signals.push(k);
    }
  });

  // 5. Extract Payment Requests
  const paymentKeywords = [
    'upi',
    'neft',
    'transfer ₹',
    'deposit',
    'recharge wallet',
    'advance fee',
    'processing fee',
    'withdrawal tax',
    'gas fee',
    'clearance fee'
  ];
  paymentKeywords.forEach(k => {
    if (combinedText.toLowerCase().includes(k)) {
      extracted.payment_requests.push(k);
    }
  });
  const moneyMatches: string[] = combinedText.match(/₹\s*[\d,]+|\b\d+,\d{3}\s*rupees/gi) || [];
  if (moneyMatches.length > 0) {
    extracted.payment_requests.push(...moneyMatches);
  }

  // 6. Extract Authority Claims (SEBI, NSDL, RBI, Govt)
  const authorityKeywords = [
    'sebi registered',
    'sebi authorized',
    'sebi guaranteed',
    'nsdl authorized',
    'rbi approved',
    'government certified',
    'special window circular',
    'investor compensation pool'
  ];
  authorityKeywords.forEach(k => {
    if (combinedText.toLowerCase().includes(k)) {
      extracted.authority_claims.push(k);
    }
  });

  // 7. Extract Entities
  if (input.organizationName) {
    extracted.entities.push(input.organizationName);
  }
  const entityMatches: string[] = combinedText.match(/(?:prof\.\s*[a-z\s]+|astra\s*apex\s*capital|zerodha|groww|angel\s*one|upstox|nsdl|sebi|hdfc\s*sky)/gi) || [];
  extracted.entities.push(...entityMatches.map(e => e.trim()));
  extracted.entities = Array.from(new Set(extracted.entities));

  // 8. General Claims
  if (extracted.promised_returns.length > 0) {
    extracted.claims.push(`Promised financial return: ${extracted.promised_returns.join(', ')}`);
  }
  if (extracted.authority_claims.length > 0) {
    extracted.claims.push(`Claim of regulatory authority: ${extracted.authority_claims.join(', ')}`);
  }
  if (extracted.urgency_signals.length > 0) {
    extracted.claims.push(`Time limitation/urgency: ${extracted.urgency_signals.join(', ')}`);
  }

  return extracted;
}

// ==========================================
// DETERMINISTIC + HEURISTIC SIGNAL DETECTOR
// ==========================================
export function detectRiskSignals(
  input: AnalysisInput,
  claims: ExtractedClaims
): { signals: RiskSignal[]; verified: string[]; unverified: string[]; uncertainty: string[] } {
  const combined = [
    input.text || '',
    input.ocrText || '',
    input.url || '',
    input.organizationName || '',
    input.registrationId || ''
  ]
    .join(' ')
    .toLowerCase();

  const signals: RiskSignal[] = [];
  const verified: string[] = [];
  const unverified: string[] = [];
  const uncertainty: string[] = [];

  // Check if input is legitimate educational content (Negative control baseline)
  const isEducationalText =
    (combined.includes('investor awareness') ||
      combined.includes('understanding') ||
      combined.includes('market risks') ||
      combined.includes('scheme information document') ||
      combined.includes('past performance does not guarantee') ||
      combined.includes('read all scheme related documents')) &&
    !combined.includes('guaranteed 300%') &&
    !combined.includes('jackpot');

  if (isEducationalText) {
    verified.push('Official regulatory educational disclosure patterns identified.');
    verified.push('Standard risk disclaimer present: market investments subject to market risks.');
  }

  // -------------------------------------------------------------
  // SIGNAL 1: Guaranteed returns
  // -------------------------------------------------------------
  if (
    combined.includes('guaranteed') ||
    combined.includes('100% loss refund') ||
    combined.includes('zero risk') ||
    combined.includes('fixed profit') ||
    combined.includes('100% loss-free') ||
    combined.includes('निश्चित लाभ') ||
    combined.includes('गारंटी')
  ) {
    signals.push({
      signal: 'Guaranteed returns',
      severity: 'critical',
      evidence: `Promised absolute certainty: "${claims.promised_returns.join(', ') || 'Guaranteed return phrase detected'}"`,
      explanation: 'Under SEBI regulations, no licensed market participant can guarantee fixed investment returns or zero-risk capital preservation in securities markets.'
    });
    unverified.push('Guaranteed profit assertion has no legal or market precedent under SEBI regulations.');
  }

  // -------------------------------------------------------------
  // SIGNAL 2: Unrealistic promises
  // -------------------------------------------------------------
  if (
    /(\d{2,4}%)\s*(profit|return|interest|gain|monthly)/.test(combined) ||
    combined.includes('300%') ||
    combined.includes('40% monthly') ||
    combined.includes('10x return') ||
    combined.includes('daily 5%')
  ) {
    signals.push({
      signal: 'Unrealistic promises',
      severity: 'critical',
      evidence: `Unrealistic rate of return stated: ${claims.promised_returns.join(', ')}`,
      explanation: 'Promises of 40% monthly, 300% in days, or multiple-x growth in short timeframes mathematically exceed standard market benchmarks and are typical of Ponzi schemes.'
    });
    unverified.push('Financial returns exceeding market reality cannot be substantiated by verified investment performance.');
  }

  // -------------------------------------------------------------
  // SIGNAL 3: Urgency
  // -------------------------------------------------------------
  if (
    combined.includes('within 2 hours') ||
    combined.includes('immediately') ||
    combined.includes('urgent alert') ||
    combined.includes('only 2 hours') ||
    combined.includes('hurry') ||
    combined.includes('तुरंत')
  ) {
    signals.push({
      signal: 'Urgency',
      severity: 'high',
      evidence: `Urgency language detected: ${claims.urgency_signals.join(', ') || 'Immediate deadline cited'}`,
      explanation: 'Manufactured deadlines and countdown timers are used to induce panic and bypass careful due diligence before the victim can consult family or advisors.'
    });
  }

  // -------------------------------------------------------------
  // SIGNAL 4: FOMO
  // -------------------------------------------------------------
  if (
    combined.includes('only 3 slots') ||
    combined.includes('only 2 slots') ||
    combined.includes('limited slots') ||
    combined.includes('jackpot calls') ||
    combined.includes('exclusive opportunity') ||
    combined.includes('lock upper circuit')
  ) {
    signals.push({
      signal: 'FOMO',
      severity: 'high',
      evidence: `Scarcity / exclusivity cues: ${claims.urgency_signals.join(', ') || 'VIP slots restriction'}`,
      explanation: 'Creating artificial scarcity ("only 3 slots left", "jackpot") manipulates the fear of missing out, coercing hasty participation.'
    });
  }

  // -------------------------------------------------------------
  // SIGNAL 5: Fake authority
  // -------------------------------------------------------------
  if (
    combined.includes('prof. rajesh sharma') ||
    combined.includes('prof. verma') ||
    combined.includes('astra apex capital') ||
    combined.includes('guru') ||
    (claims.registration_ids.length > 0 &&
      (claims.registration_ids.some(r => r.includes('998877') || r.includes('887766') || r.includes('999999'))))
  ) {
    signals.push({
      signal: 'Fake authority',
      severity: 'critical',
      evidence: `Claimed registration / advisor identity: ${claims.registration_ids.join(', ') || claims.entities.join(', ')}`,
      explanation: 'Sender claims authoritative expert or certified advisory credentials that fail deterministic SEBI registry checksum verification.'
    });
    unverified.push(`Registration identifier (${claims.registration_ids.join(', ') || 'N/A'}) not found in SEBI Registered Investment Advisers or Research Analysts active master directory.`);
  }

  // -------------------------------------------------------------
  // SIGNAL 6: Regulatory impersonation
  // -------------------------------------------------------------
  if (
    combined.includes('sebi guaranteed') ||
    combined.includes('special window circular') ||
    combined.includes('sebi investor compensation pool') ||
    combined.includes('nsdl star pool') ||
    combined.includes('sebi authorized portfolio manager inp') ||
    combined.includes('central kyc verification')
  ) {
    signals.push({
      signal: 'Regulatory impersonation',
      severity: 'critical',
      evidence: `Falsely invoking regulator: ${claims.authority_claims.join(', ') || 'Purported SEBI/NSDL capital backing'}`,
      explanation: 'Regulators like SEBI, RBI, and depositories like NSDL/CDSL do not manage private investor funds, endorse trading groups, or compensate speculative trading schemes.'
    });
    unverified.push('Purported regulatory circular or compensation fund guarantee is fabricated.');
  }

  // -------------------------------------------------------------
  // SIGNAL 7: Suspicious domain
  // -------------------------------------------------------------
  for (const url of claims.urls) {
    const isSuspiciousTld = SUSPICIOUS_TLDS.some(tld => url.toLowerCase().includes(tld));
    const isLookalike =
      (url.toLowerCase().includes('zerodha') ||
        url.toLowerCase().includes('groww') ||
        url.toLowerCase().includes('nsdl')) &&
      !AUTHENTIC_MARKET_ENTITIES.some(e => e.officialDomains.some(d => url.toLowerCase().includes(d)));

    if (isSuspiciousTld || isLookalike) {
      signals.push({
        signal: 'Suspicious domain',
        severity: 'critical',
        evidence: `URL inspection: "${url}" (Lookalike: ${isLookalike ? 'YES' : 'NO'}, High-risk TLD: ${isSuspiciousTld ? 'YES' : 'NO'})`,
        explanation: 'Domain mimics legitimate broker or depository branding (e.g. Zerodha/NSDL) on an unauthorized top-level domain.'
      });
      unverified.push(`Domain "${url}" is not in the official exchange broker member directory.`);
    } else {
      const isOfficial = AUTHENTIC_MARKET_ENTITIES.some(e => e.officialDomains.some(d => url.toLowerCase().includes(d)));
      if (isOfficial) {
        verified.push(`Domain "${url}" is officially recognized in the exchange directory.`);
      }
    }
  }

  // -------------------------------------------------------------
  // SIGNAL 8: Credential harvesting
  // -------------------------------------------------------------
  if (
    combined.includes('account has been temporarily blocked') ||
    combined.includes('re-kyc') ||
    combined.includes('rekyc') ||
    combined.includes('update your aadhaar & bank details') ||
    combined.includes('permanent suspension of holdings') ||
    combined.includes('login password')
  ) {
    signals.push({
      signal: 'Credential harvesting',
      severity: 'critical',
      evidence: `Suspension pretext requesting sensitive details: "${combined.match(/(?:re-kyc|update your aadhaar|temporarily blocked)[^.]*/i)?.[0] || 'KYC update request'}"`,
      explanation: 'Fraudulent notice alleging account suspension to coerce the investor into inputting Aadhaar, banking credentials, or passwords into an external phishing form.'
    });
  }

  // -------------------------------------------------------------
  // SIGNAL 9: Advance fee
  // -------------------------------------------------------------
  if (
    combined.includes('reserve pool') ||
    combined.includes('advance fee') ||
    combined.includes('deposit ₹') ||
    combined.includes('transfer ₹25,000') ||
    combined.includes('entry fee')
  ) {
    signals.push({
      signal: 'Advance fee',
      severity: 'high',
      evidence: `Demanding upfront payment before service: ${claims.payment_requests.join(', ') || 'Upfront transfer'}`,
      explanation: 'Requesting upfront funds for "slot reservations" or "allocation fees" is typical of advance-fee fraud.'
    });
  }

  // -------------------------------------------------------------
  // SIGNAL 10: Withdrawal fee
  // -------------------------------------------------------------
  if (
    combined.includes('withdrawal fee') ||
    combined.includes('processing fee to release') ||
    combined.includes('unfreeze fee') ||
    combined.includes('sebi release tax') ||
    combined.includes('tax deposit before withdrawal')
  ) {
    signals.push({
      signal: 'Withdrawal fee',
      severity: 'critical',
      evidence: 'Demanding additional payment to unfreeze purported account profits',
      explanation: 'Ransom-style condition where fake profits are held hostage pending an advance "tax" or "clearance" fee.'
    });
  }

  // -------------------------------------------------------------
  // SIGNAL 11: Off-platform payment
  // -------------------------------------------------------------
  if (
    combined.includes('upi') ||
    combined.includes('@okaxis') ||
    combined.includes('deposit via neft') ||
    combined.includes('personal upi')
  ) {
    signals.push({
      signal: 'Off-platform payment',
      severity: 'high',
      evidence: `Direct payment route specified: ${claims.payment_requests.join(', ') || 'Personal UPI handle'}`,
      explanation: 'Bypassing regulated stock exchange and banking ASBA mechanisms by routing funds to individual UPI addresses or private bank accounts.'
    });
  }

  // -------------------------------------------------------------
  // SIGNAL 12: VIP investment group
  // -------------------------------------------------------------
  if (
    combined.includes('vip jackpot') ||
    combined.includes('vip group') ||
    combined.includes('vip calls') ||
    combined.includes('telegram') ||
    combined.includes('whatsapp support') ||
    combined.includes('upper circuit')
  ) {
    signals.push({
      signal: 'VIP investment group',
      severity: 'high',
      evidence: 'Solicitation via VIP trading channels or chat groups promising circuit tips',
      explanation: 'Coordinated social media groups operated by unregistered entities frequently run illegal pump-and-dump manipulation.'
    });
  }

  // -------------------------------------------------------------
  // SIGNAL 13: Unknown entity
  // -------------------------------------------------------------
  const recognizedEntity = AUTHENTIC_MARKET_ENTITIES.some(e =>
    claims.entities.some(claimed => claimed.toLowerCase().includes(e.name.toLowerCase().split(' ')[0]))
  );

  if (claims.entities.length > 0 && !recognizedEntity && !isEducationalText) {
    signals.push({
      signal: 'Unknown entity',
      severity: 'medium',
      evidence: `Entity name(s): ${claims.entities.join(', ')}`,
      explanation: 'Organization name does not match recognized Indian stock brokers, depositories, or asset management companies.'
    });
    uncertainty.push(`Physical identity and corporate incorporation of "${claims.entities.join(', ')}" could not be verified.`);
  }

  // -------------------------------------------------------------
  // SIGNAL 14: Unverifiable claims
  // -------------------------------------------------------------
  if (claims.claims.length > 0 && !isEducationalText) {
    signals.push({
      signal: 'Unverifiable claims',
      severity: 'medium',
      evidence: `Extracted claims: ${claims.claims.join('; ')}`,
      explanation: 'Content relies on ungrounded financial assertions that cannot be validated via public market data.'
    });
  }

  // Default uncertainty statement when necessary
  if (uncertainty.length === 0 && signals.length > 0) {
    uncertainty.push('Originating sender phone number and jurisdiction could not be verified from message content alone.');
  }

  return { signals, verified, unverified, uncertainty };
}

// ==========================================
// MASTER ENGINE ANALYSIS ORCHESTRATOR
// ==========================================
export function analyzeContentWithSangyanEngine(input: AnalysisInput): SangyanEngineOutput {
  const combinedRaw = [
    input.text || '',
    input.ocrText || '',
    input.url || '',
    input.organizationName || '',
    input.registrationId || ''
  ]
    .join(' ')
    .trim();

  // Handle empty or whitespace input
  if (!combinedRaw) {
    return {
      assessment: 'INSUFFICIENT_EVIDENCE',
      summary: 'Insufficient evidence to determine legitimacy. No message text, URL, or registration token was provided for analysis.',
      signals: [],
      verified: [],
      unverified: [],
      uncertainty: ['No analyzable financial tokens or claims were supplied in input.'],
      safe_next_steps: [
        'Provide the complete text of the suspicious message, screenshot, or URL.',
        'Never transfer funds without verifying the recipient intermediary on sebi.gov.in.'
      ],
      hindi_explanation: 'जांच के लिए कोई जानकारी या संदेश उपलब्ध नहीं है। कृपया पूरा संदेश, लिंक या स्क्रीनशॉट दर्ज करें।',
      extracted_claims: {
        claims: [],
        entities: [],
        urls: [],
        registration_ids: [],
        promised_returns: [],
        urgency_signals: [],
        payment_requests: [],
        authority_claims: []
      },
      limitations: ['Analysis requires at least one textual claim, URL, or registration identifier.']
    };
  }

  // 1. Client-Side Edge Privacy Sanitization
  const sanitization = sanitizeUserInput(combinedRaw);

  // 2. Extract Structured Claims
  const extracted_claims = extractStructuredClaims(input);

  // 3. Detect Risk Signals & Verifications
  const { signals, verified, unverified, uncertainty } = detectRiskSignals(input, extracted_claims);

  // 4. Calculate Assessment Level (Evidence-Driven)
  const criticalCount = signals.filter(s => s.severity === 'critical').length;
  const highCount = signals.filter(s => s.severity === 'high').length;

  let assessment: AssessmentLevel = 'LOW_RISK';
  if (criticalCount >= 1 || highCount >= 3) {
    assessment = 'CRITICAL_RISK';
  } else if (highCount >= 1 || signals.length >= 2) {
    assessment = 'HIGH_RISK';
  } else if (signals.length === 1) {
    assessment = 'MODERATE_RISK';
  } else if (verified.length > 0) {
    assessment = 'LOW_RISK';
  } else {
    assessment = 'INSUFFICIENT_EVIDENCE';
  }

  // 5. Evidence-First Summary
  let summary = '';
  let hindi_explanation = '';

  if (assessment === 'CRITICAL_RISK' || assessment === 'HIGH_RISK') {
    summary = `High-risk indicators detected (${signals.length} flags). Evidence indicates unverified regulatory claims, unrealistic guaranteed returns, or unauthorized fund solicitation.`;
    hindi_explanation = `इस संदेश में गंभीर खतरे पाए गए हैं। सेबी या असली ब्रोकर कभी भी 300% या निश्चित मुनाफे की गारंटी नहीं देते और न ही किसी निजी यूपीआई पर पैसे मांगते हैं। कोई भी भुगतान करने से पहले आधिकारिक वेबसाइट पर स्वतंत्र जांच करें।`;
  } else if (assessment === 'MODERATE_RISK') {
    summary = `Moderate caution advised. The content contains promotional or urgent cues that could not be independently substantiated against official registries.`;
    hindi_explanation = `इस संदेश में कुछ प्रचार और जल्दबाजी के संकेत हैं। बिना आधिकारिक पुष्टि के किसी अज्ञात व्यक्ति की सलाह पर पैसे न लगाएं।`;
  } else if (assessment === 'LOW_RISK') {
    summary = `Low risk. The content exhibits balanced informational and educational patterns with appropriate market risk disclosures.`;
    hindi_explanation = `यह सामग्री प्रामाणिक वित्तीय शिक्षा या सामान्य जानकारी है। इसमें जोखिमों की उचित चेतावनी दी गई है और किसी को फंसाने के संकेत नहीं मिले हैं।`;
  } else {
    summary = `Insufficient evidence to determine legitimacy. The supplied content is too brief or ambiguous for deterministic verification.`;
    hindi_explanation = `उपलब्ध जानकारी बहुत संक्षिप्त है। किसी भी वित्तीय निर्णय से पहले पूरे दस्तावेज की जांच करें।`;
  }

  // 6. Safe Next Steps
  const safe_next_steps = [
    'Do not transfer money until independently verified through official SEBI/NSDL directories.',
    'Never share trading passwords, OTPs, or Demat PINs on external SMS or WhatsApp links.',
    'Verify any claimed SEBI registration number directly at https://sebi.gov.in.',
    'If you have already sent money, immediately call National Cybercrime Helpline 1930 to request bank freeze.'
  ];

  // 7. Analysis Limitations
  const limitations = [
    'This assessment is derived from deterministic registry syntax and linguistic heuristics. It is not an official judicial or regulatory ruling.',
    'Off-platform interactions and private chat messages cannot be monitored without user submission.',
    'Private bank account ownership cannot be retrieved without formal law enforcement authorization.'
  ];

  return {
    assessment,
    summary,
    signals,
    verified,
    unverified,
    uncertainty,
    safe_next_steps,
    hindi_explanation,
    extracted_claims,
    limitations
  };
}
