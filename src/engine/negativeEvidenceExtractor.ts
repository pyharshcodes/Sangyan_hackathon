/**
 * SANGYAN KAVACH - Negative Evidence & Benign Signal Extraction Engine
 * 
 * In evidence-based cybersecurity and fraud analysis, false positives occur when
 * systems blindly count words ("bill", "pay", "due", "account") without evaluating
 * contradictory evidence (evidence AGAINST fraud).
 * 
 * Core Formula:
 * CalibratedRisk = Max(0, PositiveFraudEvidence - NegativeEvidenceDeduction + ContextualRisk)
 * 
 * Negative Evidence actively dampens fraud confidence when legitimate characteristics
 * are proven present (e.g. advising official apps, routine billing dates, absence of links,
 * absence of OTP/credential demands, absence of disconnection extortion).
 */

export interface NegativeEvidenceReport {
  negativeScoreDeduction: number;
  negativeSignals: string[];
  negativeSignalsHi: string[];
  benignFactors: {
    noPhishingUrl: boolean;
    advisesOfficialChannel: boolean;
    routineBillingContext: boolean;
    noDisconnectionExtortion: boolean;
    noCredentialDemanded: boolean;
    noDirectPaymentDestination: boolean;
    containsOfficialSafetyWarning: boolean;
    standardTransactionNotification: boolean;
  };
}

export function extractNegativeEvidence(
  text: string,
  urls: string[] = [],
  paymentDestinations: string[] = []
): NegativeEvidenceReport {
  const lower = (text || '').toLowerCase();
  const signals: string[] = [];
  const signalsHi: string[] = [];
  let deduction = 0;

  // 1. Advises official app / official portal / branch visit
  const advisesOfficial =
    /official (?:app|website|portal|branch)|usual (?:electricity|service|utility|bank) provider's official|official banking app|nearest (?:bank )?branch|visit official website|official self-care|official app or website/i.test(text) ||
    /आधिकारिक (?:ऐप|वेबसाइट|शाखा)|ऑफिशियल ऐप|ऑफिशियल वेबसाइट/i.test(text);

  if (advisesOfficial) {
    deduction += 25;
    signals.push("Advises payment strictly through provider's official app or verified website");
    signalsHi.push("संदेश स्पष्ट रूप से प्रदाता के आधिकारिक ऐप या वेबसाइट के माध्यम से भुगतान करने की सलाह देता है");
  }

  // 2. Absence of URL / links (only mitigating if not demanding payment directly to private UPI)
  const hasPrivateUpi = /[\w.-]+@(okhdfcbank|okaxis|oksbi|okicici|paytm|ybl|ibl|upi)/i.test(text);
  const hasNoUrl = urls.length === 0 && !/https?:\/\/|www\.|\.com\/|\.in\/|\.org\/|\.xyz|\.top/i.test(text);
  if (hasNoUrl && !hasPrivateUpi) {
    deduction += 15;
    signals.push("No unverified external URL, shortened link, or phishing destination included");
    signalsHi.push("संदेश में कोई भी अज्ञात या संदिग्ध वेब लिंक (URL) नहीं है");
  }

  // 3. Routine Utility / Service Billing Context (without extortion)
  const isRoutineBill =
    /(?:electricity|water|gas|piped gas|broadband|mobile|dth)\s+bill/i.test(lower) &&
    /(?:is due on|due date|bill date|bill cycle|invoice|billing period|ca number|consumer no|account no)/i.test(lower) &&
    !/(?:disconnected tonight|power cut within|meter will be removed|call electricity officer|call immediately to avoid disconnect)/i.test(lower);

  if (isRoutineBill) {
    deduction += 25;
    signals.push("Routine utility billing notification with standard due date (no extortion/disconnection threats)");
    signalsHi.push("यह सामान्य नियत तारीख (Due Date) वाला रूटीन बिजली/उपयोगिता बिल है, जिसमें कोई धमकी नहीं है");
  }

  // 4. No disconnection / police / legal extortion
  const noDisconnectionExtortion =
    !/disconnect(?:ed)? (?:in|within|tonight|today)|power (?:will be )?cut|meter will be (?:blocked|removed)|police arrest|cbi arrest|digital arrest|fir registered|warrant issued/i.test(lower) &&
    !/बिजली काट|कनेक्शन काट|गिरफ्तार|वारंट/i.test(lower);

  if (noDisconnectionExtortion && isRoutineBill) {
    deduction += 10;
    signals.push("Absence of coercive extortion or immediate service disconnection threats");
    signalsHi.push("तत्काल सेवा काटने या पुलिस कार्रवाई की कोई डराने वाली धमकी नहीं पाई गई");
  }

  // 5. No Credential Theft / OTP solicitation
  const noCredentialDemanded =
    !/enter (?:your )?(?:otp|pin|cvv|password|mpin|upi pin|netbanking password)/i.test(lower) &&
    !/share (?:your )?(?:otp|pin|cvv|password)/i.test(lower) &&
    !/ओटीपी (?:बताएं|शेयर करें|दर्ज करें)|पासवर्ड/i.test(lower);

  if (noCredentialDemanded && !hasPrivateUpi) {
    deduction += 10;
    signals.push("No solicitation of confidential credentials (zero OTP, PIN, CVV, or password requests)");
    signalsHi.push("गोपनीय क्रेडेंशियल (OTP, PIN, पासवर्ड) की कोई मांग नहीं की गई है");
  }

  // 6. No Direct Personal Payment Destination (No private UPI ID or personal account)
  const noDirectPaymentDestination = !hasPrivateUpi && paymentDestinations.length === 0;

  if (noDirectPaymentDestination) {
    deduction += 15;
    signals.push("No direct personal UPI ID, untraceable crypto wallet, or private bank account provided");
    signalsHi.push("सीधे किसी व्यक्तिगत यूपीआई आईडी या अज्ञात बैंक खाते में पैसे भेजने का कोई अनुरोध नहीं है");
  }

  // 7. Contains Standard Regulatory / Banking Security Disclosures
  const containsOfficialSafetyWarning =
    /never share (?:your )?(?:otp|pin|cvv|password)|bank never asks for otp|sebi does not guarantee|mutual fund investments are subject to market risks|be a smart investor|consult a sebi registered intermediary|do not click on suspicious links/i.test(lower) ||
    /ओटीपी किसी के साथ साझा न करें|बैंक कभी ओटीपी नहीं मांगता|बाज़ार जोखिमों के अधीन/i.test(lower);

  if (containsOfficialSafetyWarning) {
    deduction += 30;
    signals.push("Contains standard regulatory investor protection or bank cybersecurity warning disclaimers");
    signalsHi.push("आधिकारिक सेबी या बैंकिंग सुरक्षा चेतावनी (जैसे 'ओटीपी साझा न करें') मौजूद है");
  }

  // 8. Routine E-Commerce / Delivery / Order Tracking notification
  const isStandardDelivery =
    /(?:order|package|courier|consignment) (?:has been shipped|out for delivery|delivered successfully|arriving today)/i.test(lower) &&
    /(?:flipkart|amazon|myntra|bluedart|delhivery|dtdc|speed post)/i.test(lower) &&
    !/delivery fee pending|customs clearance fee|pay to release/i.test(lower);

  if (isStandardDelivery) {
    deduction += 25;
    signals.push("Standard e-commerce delivery or courier tracking update with zero fee extortion");
    signalsHi.push("यह सामान्य ई-कॉमर्स कूरियर डिलीवरी का संदेश है, जिसमें कोई अतिरिक्त शुल्क नहीं मांगा गया है");
  }

  // 9. Routine Salary / Bank Balance Credit Alert
  const isRoutineBankCredit =
    /(?:credited with|credited to your a\/c|salary credited|deposited to account|auto-debit successful)/i.test(lower) &&
    /(?:avl bal|available balance|ref no|rrn)/i.test(lower) &&
    !/click here to verify|update kyc to unlock|claim cashback/i.test(lower);

  if (isRoutineBankCredit) {
    deduction += 25;
    signals.push("Standard automated bank transaction / salary credit SMS with verified balance disclosure");
    signalsHi.push("यह बैंक का सामान्य ऑटोमेटेड क्रेडिट/सैलरी मैसेज है जिसमें कोई फर्जी लिंक नहीं है");
  }

  return {
    negativeScoreDeduction: Math.min(deduction, 70), // Capped so it doesn't arbitrarily exceed threshold
    negativeSignals: signals,
    negativeSignalsHi: signalsHi,
    benignFactors: {
      noPhishingUrl: hasNoUrl,
      advisesOfficialChannel: advisesOfficial,
      routineBillingContext: isRoutineBill,
      noDisconnectionExtortion,
      noCredentialDemanded,
      noDirectPaymentDestination,
      containsOfficialSafetyWarning,
      standardTransactionNotification: isStandardDelivery || isRoutineBankCredit
    }
  };
}
