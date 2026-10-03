import { RiskIndicator } from '../types';

export function detectScamPatterns(text: string): RiskIndicator[] {
  const indicators: RiskIndicator[] = [];
  const rawLower = text.toLowerCase();
  // De-obfuscate spaced characters (e.g. "g u a r a n t e e d", "p r o f i t", "s e b i")
  const deSpaced = rawLower.replace(/\b([a-z0-9%])(?:\s+([a-z0-9%])){2,}\b/gi, (match) => match.replace(/\s+/g, ''));
  const lower = rawLower + ' ' + deSpaced;

  // Pattern 1: Guaranteed Returns / Zero Risk
  const isNegativeGuaranteeContext =
    lower.includes('does not guarantee') ||
    lower.includes('no guarantee') ||
    lower.includes('never guarantee') ||
    lower.includes('no genuine market participant or regulator guarantees') ||
    lower.includes('neither sebi nor') ||
    lower.includes('no guaranteed return');

  const hasDoubleMoneyPromise =
    lower.includes('डबल') ||
    lower.includes('दोगुना') ||
    lower.includes('दो गुना') ||
    lower.includes('तीन गुना') ||
    lower.includes('तिगुना') ||
    lower.includes('3 गुना') ||
    lower.includes('चार गुना') ||
    lower.includes('4 गुना') ||
    lower.includes('दस गुना') ||
    lower.includes('10 गुना') ||
    /\d+\s*गुना/.test(lower) ||
    lower.includes('पैसे डबल') ||
    lower.includes('रुपये डबल') ||
    lower.includes('पैसा डबल') ||
    lower.includes('रुपया डबल') ||
    lower.includes('डबल हो जाएंगे') ||
    lower.includes('डबल हो जाएगा') ||
    lower.includes('डबल मिलेंगे') ||
    lower.includes('डबल कर') ||
    lower.includes('double money') ||
    lower.includes('money double') ||
    lower.includes('paisa double') ||
    lower.includes('double ho ja') ||
    lower.includes('double your money') ||
    /double\s*in\s*\d+/i.test(lower) ||
    /\d+x\s*return/i.test(lower) ||
    lower.includes('द्वিগুণ') ||
    lower.includes('দুগুণ') ||
    lower.includes('টাকা দ্বিগুণ') ||
    lower.includes('টকা দুগুণ');

  if (
    !isNegativeGuaranteeContext &&
    (hasDoubleMoneyPromise ||
      lower.includes('guaranteed') ||
      lower.includes('guarantee') ||
      lower.includes('100% loss refund') ||
      lower.includes('zero risk') ||
      lower.includes('fixed profit') ||
      lower.includes('100% loss-free') ||
      lower.includes('assured profit') ||
      lower.includes('assured return') ||
      /(\d{1,4}%)\s*(profit|return|interest|gain|potential)/i.test(lower) ||
      /(guaranteed|assured|fixed)\s*(\d{1,4}%\s*)?(profit|return|interest|gain|allocation)/i.test(lower) ||
      lower.includes('पक्का मुनाफा') ||
      lower.includes('निश्चित लाभ') ||
      lower.includes('गारंटी'))
  ) {
    indicators.push({
      id: 'pattern-guaranteed-return',
      category: 'Guarantee',
      severity: 'critical',
      title: 'Illegal Guaranteed Return or Zero-Risk Promise',
      titleHi: 'अवैध निश्चित मुनाफ़ा / गारंटीड रिटर्न का दावा',
      description: 'The message promises guaranteed returns or claims zero risk on market-linked investments.',
      whyItMatters: 'Under SEBI regulations, NO regulated market intermediary is permitted to promise fixed returns or zero loss. Financial markets are inherently variable. Guaranteed return promises are the single most common indicator of Ponzi and advance-fee schemes.',
      whyItMattersHi: 'सेबी के नियमों के अनुसार कोई भी व्यक्ति या संस्था शेयर बाजार में फिक्स मुनाफ़े की गारंटी नहीं दे सकती। यह पोंजी स्कीम का सबसे बड़ा संकेत है।'
    });
  }

  // Pattern 2: False Regulatory Authority / Impersonation
  const hasFakeAuthContext =
    lower.includes('sebi registered vip') ||
    lower.includes('sebi guaranteed') ||
    lower.includes('special window circular') ||
    lower.includes('nsdl star pool') ||
    lower.includes('sebi investor compensation pool') ||
    lower.includes('authorized portfolio manager inp') ||
    lower.includes('sebi investment alert') ||
    lower.includes('sebi alert') ||
    lower.includes('sebi/regulatory') ||
    lower.includes('regulatory verification fee') ||
    lower.includes('sebi release tax') ||
    lower.includes('certified advisor on whatsapp') ||
    lower.includes('sebi clearance fee') ||
    lower.includes('सेबी गारंटी');

  const isLegitSebiGuidance =
    lower.includes('verify whether the intermediary is registered with sebi') ||
    lower.includes('check registration credentials directly on the official sebi website') ||
    lower.includes('sebi investor awareness');

  if (hasFakeAuthContext && !isLegitSebiGuidance) {
    indicators.push({
      id: 'pattern-fake-authority',
      category: 'Authority',
      severity: 'critical',
      title: 'False Claim of Regulatory Backing / Impersonation',
      titleHi: 'नियामक (SEBI/NSDL) का फर्जी नाम या मुहर का इस्तेमाल',
      description: 'The content falsely claims that SEBI or NSDL guarantees the capital, authorizes an alert, or sponsors the private scheme.',
      whyItMatters: 'Regulators like SEBI, RBI, and NSDL operate market infrastructure and regulatory surveillance. They NEVER endorse private trading schemes, guarantee funds, or manage retail accounts.',
      whyItMattersHi: 'सेबी और एनएसडीएल कभी भी किसी प्राइवेट ग्रुप या स्कीम में मुनाफा कमाने की गारंटी नहीं देते। ऐसे दावों से ठग भरोसा जीतने की कोशिश करते हैं।'
    });
  }

  // Pattern 3: High Urgency & Artificial Scarcity (FOMO)
  if (
    /only \d+ (seats|slots|spots|users|investors)/i.test(lower) ||
    lower.includes('seats remaining') ||
    lower.includes('slots remaining') ||
    lower.includes('limited slots') ||
    lower.includes('urgent') ||
    /within \d+\s*(hours|hrs|minutes|mins|days)/i.test(lower) ||
    /before \d+\s*(pm|am|today)/i.test(lower) ||
    lower.includes('immediately') ||
    lower.includes('jackpot calls') ||
    lower.includes('lock upper circuit') ||
    lower.includes('account forfeiture') ||
    lower.includes('hurry') ||
    lower.includes('जल्दी करें') ||
    lower.includes('केवल 2 सीटें')
  ) {
    indicators.push({
      id: 'pattern-urgency-fomo',
      category: 'Urgency',
      severity: 'high',
      title: 'Artificial Time Pressure & Coercive Urgency',
      titleHi: 'कृत्रिम हड़बड़ी और सीमित समय का मानसिक दबाव',
      description: 'Uses countdowns, limited slots, or immediate deadlines to prevent deliberate decision-making.',
      whyItMatters: 'Fraudsters intentionally induce panic and FOMO to bypass the investor\'s natural verification instincts before they can consult family or consult official records.',
      whyItMattersHi: 'ठग जानबूझकर "तुरंत करें" या "केवल सीमित सीटें बची हैं" का दबाव बनाते हैं ताकि आप सोचने या किसी से पूछने का मौका न पा सकें।'
    });
  }

  // Pattern 4: Phishing & Demat Account Suspension Threats
  if (
    lower.includes('demat trading account has been temporarily blocked') ||
    /(demat|trading|broker|account)\s*(will be|has been|is)\s*(suspended|blocked|frozen|locked)/i.test(lower) ||
    lower.includes('account will be suspended') ||
    lower.includes('permanent account blockage') ||
    lower.includes('re-kyc') ||
    lower.includes('rekyc') ||
    lower.includes('incomplete kyc') ||
    lower.includes('verify your pan') ||
    lower.includes('update your aadhaar & bank details') ||
    lower.includes('demat-kyc') ||
    lower.includes('खाता बंद')
  ) {
    indicators.push({
      id: 'pattern-kyc-phishing',
      category: 'Impersonation',
      severity: 'critical',
      title: 'Account Suspension Threat & Credential Harvesting',
      titleHi: 'डीमैट ब्लॉक की धमकी और व्यक्तिगत जानकारी चुराने का प्रयास',
      description: 'Claims the user\'s Demat account is suspended and demands immediate KYC update via external link.',
      whyItMatters: 'Brokers never lock trading accounts via arbitrary SMS links with 2-hour deadlines. Official Re-KYC is performed directly within registered broker applications or through official depository portals.',
      whyItMattersHi: 'ब्रोकर कभी भी एसएमएस में अनजान लिंक भेजकर 2 घंटे में खाता फ्रीज करने की धमकी नहीं देते।'
    });
  }

  // Pattern 5: Fake Broker Impersonation & Panic Security Trap
  if (
    lower.includes('unusual login detected') ||
    lower.includes('holdings have been frozen') ||
    lower.includes('portfolio auction') ||
    lower.includes('prevent liquidation') ||
    lower.includes('verify your broker credentials') ||
    lower.includes('broker-security') ||
    lower.includes('unlock your account and prevent')
  ) {
    indicators.push({
      id: 'pattern-broker-panic-phishing',
      category: 'Impersonation',
      severity: 'critical',
      title: 'Broker Impersonation & Panic Security Trap',
      titleHi: 'फ़र्ज़ी ब्रोकर सुरक्षा चेतावनी एवं पैनिक ट्रैप',
      description: 'Impersonates a broker security alert claiming unauthorized access and threatening portfolio liquidation to harvest login credentials.',
      whyItMatters: 'Regulated brokers will never lock your portfolio and demand external credential re-entry via arbitrary SMS/email links. Always log in directly via the official broker application.',
      whyItMattersHi: 'ब्रोकर कभी भी पोर्टफोलियो नीलाम करने की धमकी देकर किसी बाहरी लिंक पर पासवर्ड या क्रेडेंशियल दर्ज करने को नहीं कहते।'
    });
  }

  // Pattern 6: VIP / Insider Group / Unofficial Channel
  if (
    lower.includes('vip investor group') ||
    lower.includes('vip jackpot') ||
    lower.includes('vip group') ||
    lower.includes('vip calls') ||
    lower.includes('t.me/') ||
    lower.includes('wa.me/') ||
    lower.includes('telegram') ||
    lower.includes('whatsapp') ||
    lower.includes('upper circuit') ||
    lower.includes('insider') ||
    lower.includes('secret sme ipo tip') ||
    lower.includes('secret tip') ||
    lower.includes('गुप्त सूचना')
  ) {
    indicators.push({
      id: 'pattern-vip-group',
      category: 'Unregistered',
      severity: 'high',
      title: 'Unregistered VIP Group / Pump-and-Dump Vector',
      titleHi: 'अनाधिकृत वीआईपी ग्रुप या गुप्त टिप्स का जाल',
      description: 'Solicitation via private groups promising insider information or upper-circuit manipulation.',
      whyItMatters: 'SEBI strictly prohibits unregistered entities from running paid recommendation channels. Such groups are frequently used for coordinated pump-and-dump operations where organizers exit while retail investors suffer 100% loss.',
      whyItMattersHi: 'व्हाट्सएप या टेलीग्राम पर "वीआईपी टिप्स" देने वाले ग्रुप अक्सर पम्प-एंड-डंप गिरोह होते हैं जो आम निवेशकों को फंसाते हैं।'
    });
  }

  // Pattern 7: Withdrawal Fee / Advance Tax Trap
  if (
    lower.includes('withdrawal pending') ||
    lower.includes('accrued profit balance') ||
    lower.includes('to release your funds') ||
    lower.includes('release your funds') ||
    lower.includes('verification fee') ||
    lower.includes('mandatory sebi/regulatory') ||
    lower.includes('regulatory verification fee') ||
    lower.includes('withdrawal fee') ||
    lower.includes('release fee') ||
    lower.includes('release shares') ||
    lower.includes('processing fee to release') ||
    lower.includes('unfreeze fee') ||
    lower.includes('tax deposit before withdrawal') ||
    lower.includes('account forfeiture') ||
    lower.includes('निकासी शुल्क')
  ) {
    indicators.push({
      id: 'pattern-withdrawal-fee',
      category: 'Withdrawal',
      severity: 'critical',
      title: 'Advance Withdrawal Fee / Ransom Trap',
      titleHi: 'मुनाफ़ा निकालने के लिए अग्रिम टैक्स या फीस की मांग',
      description: 'Demands an advance payment or processing fee before allowing the user to withdraw their supposed balance.',
      whyItMatters: 'A classic hallmark of cyber investment scams. Scammers show artificial virtual profits on fake websites, then demand more real money as "clearance fees". In reality, the initial money was never invested and cannot be recovered.',
      whyItMattersHi: 'जब कोई कहे कि "मुनाफ़ा निकालने के लिए पहले 20% टैक्स भरो", तो समझ लें कि यह पूरी तरह जालसाजी है।'
    });
  }

  // Pattern 8: Unofficial Payment Method / Personal Transfer / Demanding Money
  const isPaymentWarningContext =
    lower.includes('never transfer funds') ||
    lower.includes('never send funds') ||
    lower.includes('never transfer') ||
    lower.includes('do not transfer') ||
    lower.includes('do not send') ||
    lower.includes('avoid transferring');

  const hasInformalPaymentDemand =
    lower.includes('मांग रहा') ||
    lower.includes('मांग रहे') ||
    lower.includes('मांगता है') ||
    lower.includes('मांग रहा है') ||
    lower.includes('पैसे मांग') ||
    lower.includes('रुपये मांग') ||
    lower.includes('पैसा मांग') ||
    lower.includes('रुपया मांग') ||
    /₹\s*[\d,]+\s*(?:मांग|भेज|दे|डाल)/i.test(lower) ||
    lower.includes('भेजने को बोल रहा') ||
    lower.includes('देने को बोल रहा') ||
    lower.includes('जमा करने को बोल रहा') ||
    lower.includes('asking for money') ||
    lower.includes('demanding money') ||
    lower.includes('asking to send') ||
    lower.includes('asking to transfer') ||
    lower.includes('টাকা চাইছে') ||
    lower.includes('পয়সা চাইছে') ||
    lower.includes('টাকা দিতে বলছে') ||
    lower.includes('টকা বিচাৰিছে');

  if (
    !isPaymentWarningContext &&
    (hasInformalPaymentDemand ||
      lower.includes('allocation wallet') ||
      lower.includes('secure allocation wallet') ||
      lower.includes('upi id:') ||
      lower.includes('to personal upi') ||
      /send\s*₹?\s*\d+/i.test(lower) ||
      /transfer\s*₹?\s*\d+/i.test(lower) ||
      /pay\s*₹?\s*\d+/i.test(lower) ||
      lower.includes('transfer ₹') ||
      lower.includes('deposit via neft') ||
      lower.includes('पर्सनल खाता') ||
      lower.includes('यूपीआई पर भेजें'))
  ) {
    indicators.push({
      id: 'pattern-suspicious-payment',
      category: 'Payment',
      severity: 'high',
      title: 'Direct Personal Transfer / Non-ASBA Payment Request',
      titleHi: 'व्यक्तिगत यूपीआई या गैर-मान्यता प्राप्त खाते में भुगतान की मांग',
      description: 'Directs funds to personal UPI handles or pooled accounts rather than approved SEBI banking rails (ASBA).',
      whyItMatters: 'IPO investments and primary market applications in India strictly require ASBA (Application Supported by Blocked Amount) through your own bank. Legitimate brokers NEVER ask you to send money to personal UPI addresses.',
      whyItMattersHi: 'असली आईपीओ का पैसा आपके खुद के बैंक खाते में ब्लॉक (ASBA) होता है। किसी व्यक्ति के निजी यूपीआई पर कभी पैसे न भेजें।'
    });
  }

  // Pattern 9: Task-Based Ponzi / YouTube Like Scam (India's #1 Trending Cyber Fraud)
  const isTaskScam =
    lower.includes('like youtube') ||
    lower.includes('like video') ||
    lower.includes('subscribe channel and earn') ||
    lower.includes('earn per like') ||
    /per\s*like\s*₹?\s*\d+/i.test(lower) ||
    /per\s*task\s*₹?\s*\d+/i.test(lower) ||
    lower.includes('prepaid task') ||
    lower.includes('merchant task') ||
    lower.includes('hotel review commission') ||
    lower.includes('google review task') ||
    lower.includes('part-time job earn') ||
    lower.includes('part time job earn') ||
    lower.includes('task completion bonus') ||
    lower.includes('telegram task') ||
    lower.includes('video like karke kamao') ||
    lower.includes('टास्क पूरा करें') ||
    lower.includes('यूट्यूब लाइक');

  if (isTaskScam) {
    indicators.push({
      id: 'pattern-task-ponzi-scam',
      category: 'Withdrawal',
      severity: 'critical',
      title: 'Task-Based Ponzi / YouTube Like Deception Vector',
      titleHi: 'टास्क-आधारित पोंजी / यूट्यूब लाइक जालसाजी',
      description: 'Promises payments for simple tasks (liking videos, giving ratings) and traps victims into sending large prepaid deposits to unlock virtual commissions.',
      whyItMatters: 'National Cybercrime Reporting Portal (1930) identifies Task Scams as India\'s fastest growing cyber fraud. Victims receive small initial payouts (₹150-₹500), but are then forced into "Prepaid Merchant Tasks" costing lakhs with zero withdrawal possible.',
      whyItMattersHi: '1930 साइबर हेल्पलाइन के अनुसार यह भारत का सबसे तेज़ी से फैलता स्कैम है। शुरुआत में छोटे पैसे देकर भरोसा जीतते हैं, फिर बड़े प्रीपेड टास्क के नाम पर लाखों लूट लेते हैं।'
    });
  }

  // Pattern 10: Unverified Stranger / Social Media Solicitation (BUDS Act 2019 Violation)
  const isStrangerWarningContext =
    lower.includes('do not talk to strangers') ||
    lower.includes('beware of strangers');

  const hasStrangerContext =
    lower.includes('जानता नहीं') ||
    lower.includes('पहचानता नहीं') ||
    lower.includes('जानती नहीं') ||
    lower.includes('पहचानती नहीं') ||
    lower.includes('अनजान व्यक्ति') ||
    lower.includes('अजनबी') ||
    lower.includes('अज्ञात व्यक्ति') ||
    lower.includes('अपरिचित व्यक्ति') ||
    lower.includes('अपरिचित') ||
    lower.includes("don't know him") ||
    lower.includes('dont know him') ||
    lower.includes('do not know him') ||
    lower.includes("don't know her") ||
    lower.includes('unknown person') ||
    lower.includes('stranger') ||
    lower.includes('unknown contact') ||
    lower.includes('never met him') ||
    lower.includes('never met them') ||
    lower.includes('met on telegram') ||
    lower.includes('met on whatsapp') ||
    lower.includes('met on instagram') ||
    lower.includes('met on facebook') ||
    lower.includes('met on tinder') ||
    lower.includes('চিনিনা') ||
    lower.includes('অপরিচিত ব্যক্তি') ||
    lower.includes('জানি না') ||
    lower.includes('চিনি নাপাওঁ') ||
    lower.includes('অচিনাকি মানুহ');

  if (!isStrangerWarningContext && hasStrangerContext) {
    indicators.push({
      id: 'pattern-stranger-solicitation',
      category: 'Unregistered',
      severity: 'critical',
      title: 'Unverified Stranger Solicitation (BUDS Act Violation)',
      titleHi: 'अनजान व्यक्ति द्वारा निवेश/पैसे की मांग (BUDS Act व सेबी नियमों का उल्लंघन)',
      description: 'An unknown person or social media stranger is soliciting funds or investment without regulatory credentials.',
      whyItMatters: 'Section 3 of the Banning of Unregulated Deposit Schemes Act, 2019 (BUDS Act) strictly prohibits any individual or unregistered entity from soliciting deposits or investments. Accepting or asking for money with promised returns without SEBI registration is a cognizable criminal offense.',
      whyItMattersHi: 'BUDS Act 2019 और सेबी नियमों के अनुसार किसी भी अनजान व्यक्ति द्वारा मुनाफ़े के नाम पर पैसे मांगना गैरकानूनी और संज्ञेय अपराध है। ऐसे लोग पैसे लेकर तुरंत संपर्क बंद कर देते हैं।'
    });
  }

  return indicators;
}
