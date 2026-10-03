/**
 * SANGYAN KAVACH - Evidence-First Risk Engine
 * 
 * Implements a structured, explainable fraud classification engine
 * based on positive and negative evidence aggregation:
 * 
 * Formula:
 * CalibratedRisk = Max(0, PositiveFraudEvidence - NegativeEvidenceDeduction + ContextualRisk)
 * 
 * Feature Groups:
 * A. IMPERSONATION (SEBI, RBI, Bank, Police, Govt, Support)
 * B. CREDENTIAL THEFT (OTP, PIN, CVV, Password, UPI PIN, KYC Phishing)
 * C. PAYMENT MANIPULATION (Private UPI, Personal A/C, Advance Fee, Release Tax)
 * D. URGENCY / PRESSURE (Coercive threat; Urgency alone is NEVER High Risk)
 * E. REWARD / PRIZE / PROFIT BAIT (Lottery, Cashback, Free Money, Double Money)
 * F. INVESTMENT SCAM SIGNALS (Guaranteed Returns, Insider Tips, VIP Group)
 * G. LINK / DOMAIN RISK (Shortener, Lookalike, Punycode, Non-Official Domain)
 * H. SOCIAL ENGINEERING (Fear, Greed, Authority, Secrecy)
 * I. CONTEXTUAL EVIDENCE (Expected Bill, Official App, Routine Notification)
 */

import {
  RiskLevel,
  FraudTaxonomy,
  FraudRisk,
  FinancialRelevanceLevel,
  FeatureGroupBreakdown,
  RiskIndicator,
  DomainAnalysis,
  VerificationItem,
  DocumentContentType
} from '../types';
import { extractNegativeEvidence, NegativeEvidenceReport } from './negativeEvidenceExtractor';

export interface EvidenceEngineEvaluation {
  calibratedScore: number;
  overallAssessment: RiskLevel;
  fraudTaxonomy: FraudTaxonomy;
  fraudRisk: FraudRisk;
  financialRelevanceLevel: FinancialRelevanceLevel;
  featureGroupBreakdown: FeatureGroupBreakdown;
  positiveEvidence: string[];
  positiveEvidenceHi: string[];
  negativeEvidence: string[];
  negativeEvidenceHi: string[];
  requestedAction: string;
  impersonationDetected: boolean;
  scoreExplanation: string;
}

export function evaluateEvidenceRiskEngine(params: {
  rawText: string;
  sanitizedText: string;
  documentContentType: DocumentContentType;
  financialRelevance: 'YES' | 'NO' | 'UNCERTAIN';
  detectedPatterns: RiskIndicator[];
  domainAnalyses: DomainAnalysis[];
  entityVerifications: VerificationItem[];
  inputType: 'text' | 'image' | 'url';
  extractedClaims: {
    urls: string[];
    paymentRequests: string[];
    urgencyLanguage: string[];
    promisedReturns: string[];
  };
}): EvidenceEngineEvaluation {
  const {
    rawText,
    documentContentType,
    financialRelevance,
    detectedPatterns,
    domainAnalyses,
    entityVerifications,
    inputType,
    extractedClaims
  } = params;

  const lower = (rawText || '').toLowerCase();

  // 1. Extract Negative Evidence (Evidence AGAINST fraud)
  const negReport: NegativeEvidenceReport = extractNegativeEvidence(
    rawText,
    extractedClaims.urls,
    extractedClaims.paymentRequests
  );

  // 2. Initialize Feature Group Breakdown
  const featureBreakdown: FeatureGroupBreakdown = {
    impersonation: [],
    credentialTheft: [],
    paymentManipulation: [],
    urgencyPressure: [],
    rewardBait: [],
    investmentScam: [],
    domainRisk: [],
    socialEngineering: [],
    contextualEvidence: []
  };

  const positiveEvidence: string[] = [];
  const positiveEvidenceHi: string[] = [];
  let positiveScore = 0;
  let hasCriticalSignal = false;
  let impersonationDetected = false;

  // Group A: IMPERSONATION
  const hasSebiImpersonation =
    /(?:sebi|rbi|cbi|police|cyber cell|nsdl|cdsl)\s*(?:official|officer|notice|warrant|order|special window|approval)/i.test(rawText) &&
    !negReport.benignFactors.containsOfficialSafetyWarning;
  const hasDiscrepancy = entityVerifications.some(
    v => v.status === 'Unverified / Discrepancy' || v.status === 'Known Impersonation'
  );

  if (hasSebiImpersonation || hasDiscrepancy) {
    impersonationDetected = true;
    positiveScore += 35;
    hasCriticalSignal = true;
    const msg = 'Impersonation of regulatory or governmental authority (SEBI/RBI/Police/Depository)';
    featureBreakdown.impersonation.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push('नियामक या सरकारी संस्था (SEBI/RBI/पुलिस) की फर्जी पहचान का उपयोग');
  }

  // Group B: CREDENTIAL THEFT
  const isAntiPhishingDisclaimer =
    /never (?:share|disclose|give)|do not (?:share|disclose|give)|don't (?:share|disclose)|कभी भी.*शेयर न करें|साझा न करें|share otp \d+ at delivery|share .* with delivery agent|at delivery/i.test(rawText);

  const hasCredentialTheft =
    !isAntiPhishingDisclaimer &&
    (/(?:enter|share|verify|update|send)\s*(?:your\s*)?(?:otp|pin|cvv|password|mpin|upi pin|netbanking)/i.test(rawText) ||
     /ओटीपी\s*(?:बताएं|भेजें|दर्ज करें)|पासवर्ड/i.test(rawText));

  if (hasCredentialTheft) {
    positiveScore += 45;
    hasCriticalSignal = true;
    const msg = 'Credential theft solicitation (requesting confidential OTP, PIN, CVV, or password)';
    featureBreakdown.credentialTheft.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push('गोपनीय पासवर्ड, ओटीपी या यूपीआई पिन चुराने की मांग');
  }

  // Group C: PAYMENT MANIPULATION
  const hasPrivateUpi = /[\w.-]+@(okhdfcbank|okaxis|oksbi|okicici|paytm|ybl|ibl|upi)/i.test(rawText);
  const hasAdvanceFee =
    /(?:clearance (?:fee|tax)|release (?:fee|tax)|processing (?:fee|tax)|tax before release|withdrawal (?:fee|blocked)|advance (?:fee|clearance)|deposit to withdraw|unlock withdrawal)/i.test(rawText) ||
    /(?:निकासी शुल्क|रिलीज फीस|एडवांस फीस|प्रोसेसिंग चार्ज)/i.test(rawText);
  const hasUnblockExtortion =
    /(?:unblock|unfreeze|unlock|release)\s*(?:your\s*)?(?:demat|trading|broker|bank|account)|(?:demat|trading|broker|bank|account)\s*(?:will be|can be)?\s*(?:unblocked|unfrozen|unlocked)/i.test(rawText) &&
    /(?:deposit|pay|transfer|send|₹|rs\.?|fee|upi)/i.test(rawText);
  const hasInformalCashDemand = /मांग\s*रहा|मांग\s*रहे|पैसे\s*मांग|रुपये\s*मांग|asking for money|send money to|টাকা চাইছে/i.test(rawText);

  if (hasAdvanceFee || hasUnblockExtortion) {
    positiveScore += 45;
    hasCriticalSignal = true;
    const msg = hasUnblockExtortion
      ? 'Account unblocking extortion scam (demands payment to unfreeze/unblock trading or bank account)'
      : 'Advance-fee ransom trap (demands upfront tax/fee to unlock simulated profits)';
    featureBreakdown.paymentManipulation.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push(hasUnblockExtortion ? 'खाता अनब्लॉक करने के नाम पर अवैध वसूली (एक्सटॉर्शन)' : 'मुनाफा निकालने के नाम पर पहले एडवांस टैक्स या फीस जमा करने की अवैध मांग');
  } else if (hasPrivateUpi && !negReport.benignFactors.routineBillingContext) {
    const isDemandingTransfer = /(?:deposit|transfer|send|pay|मांग|भेजें|जमा करें)/i.test(rawText);
    positiveScore += isDemandingTransfer ? 45 : 30;
    if (isDemandingTransfer) hasCriticalSignal = true;
    const msg = 'Direct payment manipulation targeting an unverified personal UPI address';
    featureBreakdown.paymentManipulation.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push('व्यक्तिगत यूपीआई पते पर सीधे पैसे मंगाने का प्रयास');
  } else if (hasInformalCashDemand) {
    positiveScore += 25;
    const msg = 'Informal solicitation of monetary transfer from an unverified stranger';
    featureBreakdown.paymentManipulation.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push('अनजान व्यक्ति द्वारा निजी खाते में पैसे मांगने की गतिविधि');
  }

  // Group D: URGENCY / PRESSURE (Urgency alone is NEVER High Risk)
  const hasExtortionUrgency =
    /disconnected (?:in|tonight|within 2 hours|immediately)|power (?:will be )?cut|arrest warrant|cbi raid|digital arrest/i.test(rawText) ||
    /बिजली काट|कनेक्शन काट|वारंट जारी|गिरफ्तार/i.test(rawText);
  const hasRoutineUrgency = /(?:within 2 hours|immediately|today only|urgent|hurry|last chance)/i.test(rawText);

  if (hasExtortionUrgency) {
    positiveScore += 30;
    const msg = 'Coercive extortion threat (immediate disconnection, criminal arrest, or legal penalty)';
    featureBreakdown.urgencyPressure.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push('तत्काल सेवा काटने या पुलिस कार्रवाई की डराने वाली धमकी');
  } else if (hasRoutineUrgency && !negReport.benignFactors.routineBillingContext) {
    positiveScore += 10; // Capped low - urgency alone cannot make it high risk
    const msg = 'Psychological urgency / artificial time pressure language';
    featureBreakdown.urgencyPressure.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push('मानसिक दबाव और जल्दबाजी पैदा करने वाली भाषा');
  }

  // Group E: REWARD / PRIZE / PROFIT BAIT
  const hasDoubleMoney =
    /(?:double your money|money double|paisa double|पैसे डबल|पैसा डबल|रुपये डबल|रुपया डबल|दोगुना|दो गुना|2x return|300%|500%|টাকা দুগুণ|টকা দুগুণ)/i.test(rawText);
  const hasLotteryBait = /(?:won lottery|lucky draw|free prize|won ₹|cashback ₹)/i.test(rawText);

  if (hasDoubleMoney) {
    positiveScore += 45;
    hasCriticalSignal = true;
    const msg = 'Unrealistic profit bait / Ponzi scheme promise (double money / 300%+ return claims)';
    featureBreakdown.rewardBait.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push('पैसे दोगुने करने या 300% निश्चित मुनाफे का गैर-कानूनी लालच');
  } else if (hasLotteryBait) {
    positiveScore += 35;
    const msg = 'Lottery / fake prize / unexpected cashback lure';
    featureBreakdown.rewardBait.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push('फर्जी लॉटरी या अप्रत्याशित इनाम का लालच');
  }

  // Group F: INVESTMENT SCAM SIGNALS
  const hasGuaranteedReturn =
    /(?:guaranteed\s*(?:\d+%)?\s*(?:return|profit|gain)|100% loss refund|zero risk investment|fixed monthly return|assured\s*(?:\d+%)?\s*(?:return|profit|gain)|गारंटीड|निश्चित लाभ|पक्का मुनाफा|निश्चित रिटर्न|निश्चित मुनाफा)/i.test(rawText);
  const hasVipTips =
    /(?:vip upper circuit|jackpot stock tips|insider calls|vip telegram|vip group|secret ipo tip)/i.test(rawText);

  if (hasGuaranteedReturn) {
    positiveScore += 40;
    hasCriticalSignal = true;
    const msg = 'Illegal guaranteed return claim on market securities (prohibited under SEBI PFUTP regulations)';
    featureBreakdown.investmentScam.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push('शेयर बाजार में फिक्स रिटर्न की गैर-कानूनी गारंटी (सेबी नियमों का उल्लंघन)');
  }
  if (hasVipTips) {
    positiveScore += 30;
    const msg = 'Unregistered advisory / insider tipping syndicate (VIP trading channel bait)';
    featureBreakdown.investmentScam.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push('अवैध वीआईपी टेलीग्राम/व्हाट्सएप ग्रुप और जैकपॉट टिप्स का झांसा');
  }

  // Group G: LINK / DOMAIN RISK
  const hasMaliciousDomain = domainAnalyses.some(
    d => d.isLookalike || d.suspiciousTld || d.riskLevel === 'High' || d.riskLevel === 'Critical'
  );
  const hasShortener = /(?:bit\.ly|t\.co|tinyurl|is\.gd|cutt\.ly|rb\.gy)/i.test(rawText);

  if (hasMaliciousDomain) {
    positiveScore += 35;
    hasCriticalSignal = true;
    const msg = 'Deceptive or lookalike phishing domain mimicking a trusted institution';
    featureBreakdown.domainRisk.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push('विश्वसनीय संस्था के नाम से मिलती-जुलती फर्जी/क्लोन वेबसाइट लिंक');
  } else if (hasShortener && !negReport.benignFactors.routineBillingContext) {
    positiveScore += 15;
    const msg = 'Obfuscated shortened URL hiding true web destination';
    featureBreakdown.domainRisk.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push('असली वेबसाइट को छिपाने वाला छोटा (Shortened) लिंक');
  }

  // Group H: SOCIAL ENGINEERING
  const hasFearGreedSocial =
    /(?:immediate action required|account will be terminated|confidential insider|do not inform anyone)/i.test(rawText);
  if (hasFearGreedSocial && positiveScore > 15) {
    positiveScore += 10;
    const msg = 'Social engineering pressure inducing fear or conspiratorial secrecy';
    featureBreakdown.socialEngineering.push(msg);
    positiveEvidence.push(msg);
    positiveEvidenceHi.push('डर या गोपनीयता का अनुचित मनोवैज्ञानिक दबाव');
  }

  // Group I: CONTEXTUAL EVIDENCE (Contextual Multipliers & Mitigations)
  if (negReport.benignFactors.advisesOfficialChannel) {
    featureBreakdown.contextualEvidence.push("Message explicitly directs recipient to official verified app/portal");
  }
  if (negReport.benignFactors.routineBillingContext) {
    featureBreakdown.contextualEvidence.push("Context matches standard monthly utility billing schedule");
  }
  if (negReport.benignFactors.noPhishingUrl) {
    featureBreakdown.contextualEvidence.push("Absence of external links eliminates direct drive-by web compromise");
  }

  // Identify Requested Action
  let requestedAction = 'No actionable monetary or credential request detected.';
  if (hasCredentialTheft) {
    requestedAction = 'Provide confidential security OTP or login credentials via link/reply.';
  } else if (hasAdvanceFee) {
    requestedAction = 'Transfer advance clearance fee or release tax to unlock account/profits.';
  } else if (hasPrivateUpi) {
    requestedAction = 'Transfer funds directly to an unverified private UPI handle.';
  } else if (hasVipTips) {
    requestedAction = 'Join an unauthorized VIP messaging group for speculative trading calls.';
  } else if (negReport.benignFactors.advisesOfficialChannel) {
    requestedAction = 'Pay routine bill through official service provider app or website.';
  }

  // 3. Financial Relevance Level (NONE | LOW | MEDIUM | HIGH)
  let financialRelevanceLevel: FinancialRelevanceLevel = 'LOW';
  if (
    documentContentType === 'PERSONAL_PHOTO' ||
    documentContentType === 'EDUCATIONAL_DOCUMENT' ||
    documentContentType === 'IDENTITY_DOCUMENT' ||
    documentContentType === 'MEDICAL_DOCUMENT' ||
    documentContentType === 'NON_FINANCIAL_TEXT'
  ) {
    financialRelevanceLevel = 'NONE';
  } else if (
    documentContentType === 'RECEIPT_DOCUMENT' ||
    documentContentType === 'UTILITY_BILL'
  ) {
    financialRelevanceLevel = 'LOW'; // Routine commercial/utility, NOT market fraud
  } else if (
    documentContentType === 'BANK_DOCUMENT' ||
    negReport.benignFactors.containsOfficialSafetyWarning
  ) {
    financialRelevanceLevel = 'MEDIUM'; // Legitimate banking/regulatory
  } else if (financialRelevance === 'YES') {
    financialRelevanceLevel = 'HIGH'; // Investment claims / Solicitations
  } else {
    financialRelevanceLevel = 'LOW';
  }

  // 4. Evidence-First Calibrated Risk Scoring
  // Formula: CalibratedRisk = Max(0, PositiveScore - NegativeDeductions)
  let calibratedScore = 0;
  let overallAssessment: RiskLevel = 'Low';
  let fraudTaxonomy: FraudTaxonomy = 'BENIGN';
  let fraudRisk: FraudRisk = 'BENIGN';

  if (financialRelevanceLevel === 'NONE') {
    calibratedScore = 0;
    overallAssessment = 'No Financial Risk';
    fraudTaxonomy = 'BENIGN';
    fraudRisk = 'BENIGN';
  } else if (negReport.benignFactors.containsOfficialSafetyWarning && positiveScore < 20) {
    calibratedScore = 5;
    overallAssessment = 'Low';
    fraudTaxonomy = 'BENIGN';
    fraudRisk = 'BENIGN';
  } else if (negReport.benignFactors.routineBillingContext && !hasExtortionUrgency && !hasPrivateUpi && !hasCredentialTheft) {
    // Routine utility bill: strictly Benign / Low Risk
    calibratedScore = Math.max(0, Math.min(15, positiveScore - negReport.negativeScoreDeduction));
    overallAssessment = 'Low';
    fraudTaxonomy = 'BENIGN';
    fraudRisk = 'BENIGN';
  } else if (hasCriticalSignal) {
    // Strong positive fraud indicators: negative deductions cannot eliminate active scams
    const effectiveNegative = Math.min(negReport.negativeScoreDeduction, 15);
    calibratedScore = Math.min(96, Math.max(75, positiveScore - effectiveNegative));
    if (calibratedScore >= 80) {
      overallAssessment = 'Critical';
      fraudTaxonomy = 'CRITICAL_SCAM';
      fraudRisk = 'CRITICAL';
    } else {
      overallAssessment = 'High';
      fraudTaxonomy = 'HIGH_RISK_FRAUD';
      fraudRisk = 'HIGH';
    }
  } else if (positiveScore > 0) {
    // Moderate or suspicious signals with negative deduction
    calibratedScore = Math.max(5, positiveScore - negReport.negativeScoreDeduction);
    if (calibratedScore >= 60) {
      overallAssessment = 'High';
      fraudTaxonomy = 'HIGH_RISK_FRAUD';
      fraudRisk = 'HIGH';
    } else if (calibratedScore >= 40) {
      overallAssessment = 'Moderate';
      fraudTaxonomy = 'SUSPICIOUS';
      fraudRisk = 'SUSPICIOUS';
    } else if (calibratedScore >= 20) {
      overallAssessment = 'Needs Verification';
      fraudTaxonomy = 'UNCERTAIN';
      fraudRisk = 'UNCERTAIN';
    } else {
      overallAssessment = 'Low';
      fraudTaxonomy = 'BENIGN';
      fraudRisk = 'BENIGN';
    }
  } else {
    // Zero positive fraud signals
    calibratedScore = Math.max(0, 5 - negReport.negativeScoreDeduction);
    overallAssessment = 'Low';
    fraudTaxonomy = 'BENIGN';
    fraudRisk = 'BENIGN';
  }

  // Safe Guardrail: UNCERTAIN MUST NEVER AUTOMATICALLY BECOME HIGH RISK
  if (fraudTaxonomy === 'UNCERTAIN' && calibratedScore >= 50) {
    calibratedScore = 35;
    overallAssessment = 'Needs Verification';
  }

  const scoreExplanation = `Calibrated Score: ${calibratedScore}/100. Positive Evidence: +${positiveScore} pts across ${positiveEvidence.length} signals. Mitigating Negative Deductions: -${negReport.negativeScoreDeduction} pts (${negReport.negativeSignals.length} benign factors).`;

  return {
    calibratedScore,
    overallAssessment,
    fraudTaxonomy,
    fraudRisk,
    financialRelevanceLevel,
    featureGroupBreakdown: featureBreakdown,
    positiveEvidence,
    positiveEvidenceHi,
    negativeEvidence: negReport.negativeSignals,
    negativeEvidenceHi: negReport.negativeSignalsHi,
    requestedAction,
    impersonationDetected,
    scoreExplanation
  };
}
