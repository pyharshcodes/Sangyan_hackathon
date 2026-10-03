/**
 * SANGYAN KAVACH - Production Benchmark Dataset (460+ Multi-Modal Samples)
 * 
 * Exhaustive evaluation dataset across 7 distinct categories:
 * 1. Benign Communications (105 samples)
 * 2. Active Fraud / Scams (105 samples)
 * 3. Suspicious / Unverified Solicitations (55 samples)
 * 4. Adversarial Near-Duplicates / Contrasting Pairs (50 samples)
 * 5. Document / OCR Scenarios (50 samples)
 * 6. URL & Domain Phishing Scenarios (50 samples)
 * 7. Multilingual Regional Scenarios (50 samples)
 * 
 * Designed to rigorously verify zero false positives on routine financial/utility notifications,
 * reliable recall on active financial deception, and complete explainability.
 */

export interface BenchmarkSample {
  id: string;
  category: 'BENIGN' | 'FRAUD' | 'SUSPICIOUS' | 'ADVERSARIAL_PAIR' | 'OCR_SCENARIO' | 'URL_SCENARIO' | 'MULTILINGUAL';
  inputType: 'text' | 'image' | 'url';
  input: string;
  expectedClass: 'BENIGN' | 'FRAUD' | 'SUSPICIOUS' | 'UNCERTAIN';
  expectedRiskLevel: ('Low' | 'No Financial Risk' | 'Needs Verification' | 'Moderate' | 'High' | 'Critical')[];
  description: string;
  adversarialPairId?: string;
}

// ==========================================
// 1. BENIGN COMMUNICATIONS (105 SAMPLES)
// ==========================================
export const BENIGN_SAMPLES: BenchmarkSample[] = [
  {
    id: 'BENIGN-001',
    category: 'BENIGN',
    inputType: 'text',
    input: "Your electricity bill of ₹1,248 is due on 8 October. Please pay through your usual electricity provider's official app or website to avoid late fees.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Permanent Regression: Routine electricity bill advising payment through official provider app'
  },
  {
    id: 'BENIGN-002',
    category: 'BENIGN',
    inputType: 'text',
    input: "Dear Consumer, your Tata Power electricity bill for CA No 102938475 is ₹2,450. Due date is 15-Nov. Settle via Tata Power portal or BBPS enabled app.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Tata Power legitimate bill with CA number and BBPS advice'
  },
  {
    id: 'BENIGN-003',
    category: 'BENIGN',
    inputType: 'text',
    input: "Adani Electricity bill generated for Consumer #9081234. Net payable ₹1,890 by 22 Oct. Pay via Adani Electricity app or official portal.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Adani Electricity routine monthly bill notice'
  },
  {
    id: 'BENIGN-004',
    category: 'BENIGN',
    inputType: 'text',
    input: "Mahanagar Gas Ltd: Piped Natural Gas bill of ₹650 is generated for BP 400192837. Due date: 28 Oct. Pay via MGL Connect App.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Routine PNG gas bill notification'
  },
  {
    id: 'BENIGN-005',
    category: 'BENIGN',
    inputType: 'text',
    input: "Delhi Jal Board: Water bill for K No 394829384 is ₹320. Due on 05 Nov. Pay online on djb.gov.in or via authorized m-Seva app.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Delhi Jal Board water bill with official gov portal'
  },
  {
    id: 'BENIGN-006',
    category: 'BENIGN',
    inputType: 'text',
    input: "Airtel Broadband: Your monthly fiber invoice #INV-92831 for ₹943 is ready. Due on 12-Oct. Settle seamlessly on Airtel Thanks App.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Airtel broadband bill notice'
  },
  {
    id: 'BENIGN-007',
    category: 'BENIGN',
    inputType: 'text',
    input: "JioFiber bill of ₹1,178 generated for Account #892837192. Due date: 18 Oct. Pay via MyJio App to enjoy uninterrupted high-speed internet.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'JioFiber routine bill statement'
  },
  {
    id: 'BENIGN-008',
    category: 'BENIGN',
    inputType: 'text',
    input: "HDFC Bank: Rs 5,000.00 debited from A/c **4920 on 03-Oct-26 at ATM HDFC KORAMANGALA. Avl Bal: Rs 48,290.00. Call 18002026161 if not done by you.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Standard authentic bank ATM debit notification'
  },
  {
    id: 'BENIGN-009',
    category: 'BENIGN',
    inputType: 'text',
    input: "State Bank of India: Your A/c **8192 is credited with Rs 65,400.00 towards monthly salary for Sep 2026. Avl Bal: Rs 82,100.00. SBI Kehta Hai - Never share OTP.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Routine salary credit with RBI/SBI cybersecurity warning'
  },
  {
    id: 'BENIGN-010',
    category: 'BENIGN',
    inputType: 'text',
    input: "ICICI Bank: OTP for transaction of Rs 1,499.00 on Amazon is 839201. Valid for 5 mins. Do not share OTP with anyone, including bank staff.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Standard transactional OTP with standard anti-sharing disclosure'
  },
  {
    id: 'BENIGN-011',
    category: 'BENIGN',
    inputType: 'text',
    input: "Amazon: Your order #402-9182371-29182 has been shipped with BlueDart AWB 918237192. Expected delivery tomorrow by 8 PM.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Routine e-commerce shipping tracking notice'
  },
  {
    id: 'BENIGN-012',
    category: 'BENIGN',
    inputType: 'text',
    input: "Flipkart: Out for delivery! Your package containing boat headphones will be delivered today by courier agent Ramesh. Share OTP 4920 at delivery.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Standard e-commerce delivery OTP alert'
  },
  {
    id: 'BENIGN-013',
    category: 'BENIGN',
    inputType: 'text',
    input: "Blinkit: Order delivered in 9 mins. Order total ₹412 paid via UPI. Hope you enjoyed the instant delivery experience!",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Quick commerce routine delivered receipt'
  },
  {
    id: 'BENIGN-014',
    category: 'BENIGN',
    inputType: 'text',
    input: "Swiggy: Order #928371 from Biryani Blues is confirmed and arriving in 25 mins. Total ₹620 paid via credit card.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Routine food delivery confirmation'
  },
  {
    id: 'BENIGN-015',
    category: 'BENIGN',
    inputType: 'text',
    input: "SEBI Investor Education Advisory: 'Understand. Verify. Invest Wisely.' Always verify whether an intermediary is registered on sebi.gov.in before investing.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Official SEBI educational advisory publication'
  },
  {
    id: 'BENIGN-016',
    category: 'BENIGN',
    inputType: 'text',
    input: "AMFI Advisory: Mutual fund investments are subject to market risks, read all scheme related documents carefully before investing. Past performance does not guarantee future returns.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Official statutory mutual fund risk disclaimer'
  },
  {
    id: 'BENIGN-017',
    category: 'BENIGN',
    inputType: 'text',
    input: "Zerodha Coin: Your monthly SIP of ₹5,000 in Parag Parikh Flexi Cap Fund will be triggered tomorrow. Maintain sufficient funds in your linked bank account.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Routine registered mutual fund SIP notification'
  },
  {
    id: 'BENIGN-018',
    category: 'BENIGN',
    inputType: 'text',
    input: "Groww: Consolidated Account Statement (CAS) for September has been sent by NSDL/CDSL to your registered email address.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Legitimate depository CAS email reminder'
  },
  {
    id: 'BENIGN-019',
    category: 'BENIGN',
    inputType: 'text',
    input: "IRCTC Booking Confirmation: PNR 2847192847, Train 12560 Shiv Ganga Exp, 03-Oct. 2A confirmed. Safe travels with Indian Railways.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Routine railway ticket reservation confirmation'
  },
  {
    id: 'BENIGN-020',
    category: 'BENIGN',
    inputType: 'text',
    input: "IndiGo flight 6E-205 Del to Blr is on time. Web check-in completed. Gate opens at 18:30. Have a pleasant flight.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Routine airline flight boarding alert'
  },
  // Add 85 programmatic benign variations for exhaustive coverage
  ...Array.from({ length: 85 }, (_, i) => {
    const billTypes = ['electricity', 'water', 'gas', 'broadband', 'piped gas', 'mobile postpaid', 'society maintenance'];
    const providers = ['Tata Power', 'BSES Rajdhani', 'Adani Electricity', 'BESCOM', 'MSEDCL', 'PSPCL', 'WBSEDCL'];
    const type = billTypes[i % billTypes.length];
    const prov = providers[i % providers.length];
    const amt = 500 + ((i * 137) % 3500);
    const day = (i % 28) + 1;
    return {
      id: `BENIGN-${String(i + 21).padStart(3, '0')}`,
      category: 'BENIGN' as const,
      inputType: 'text' as const,
      input: `Dear customer, your ${prov} ${type} bill of ₹${amt} is due on ${day} November. Please settle via the official ${prov} app or BBPS portal to avoid late fees.`,
      expectedClass: 'BENIGN' as const,
      expectedRiskLevel: ['Low', 'No Financial Risk'] as any,
      description: `Synthetic Benign Test ${i + 21}: Legitimate ${type} bill from ${prov}`
    };
  })
];

// ==========================================
// 2. ACTIVE FRAUD / SCAMS (105 SAMPLES)
// ==========================================
export const FRAUD_SAMPLES: BenchmarkSample[] = [
  {
    id: 'FRAUD-001',
    category: 'FRAUD',
    inputType: 'text',
    input: "SPECIAL SEBI SCHEME: Invest ₹50,000 today and get 300% guaranteed profit in 30 days! Risk free capital back guarantee authorized under SEBI circular 2026. Join t.me/vip_sebi_calls",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Fake SEBI regulatory backing with 300% guaranteed return promise'
  },
  {
    id: 'FRAUD-002',
    category: 'FRAUD',
    inputType: 'text',
    input: "URGENT DEMAT ALERT: Your Zerodha Demat trading account has been suspended due to pending Re-KYC. Update your PAN card within 2 hours at http://zerodha-kyc-verify.xyz to avoid liquidation.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Demat account suspension panic with credential harvesting URL'
  },
  {
    id: 'FRAUD-003',
    category: 'FRAUD',
    inputType: 'text',
    input: "VIP Telegram Trading Club: Daily 50% to 80% jackpot calls! 100% accuracy assured. Deposit ₹10,000 into UPI id trader.vip@okaxis to join private insider group.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Unregistered VIP insider channel demanding private UPI transfer'
  },
  {
    id: 'FRAUD-004',
    category: 'FRAUD',
    inputType: 'text',
    input: "Your virtual trading balance shows ₹8,40,000 profit! To withdraw funds, deposit 20% SEBI release tax of ₹1,68,000 to unfreeze your wallet within 24 hours.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Advance fee / simulated profit ransom trap'
  },
  {
    id: 'FRAUD-005',
    category: 'FRAUD',
    inputType: 'text',
    input: "Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM due to unpaid bill. Immediately pay ₹4,999 to electricity-officer@okaxis or call 9876543210.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Electricity disconnection extortion scam with private UPI demand'
  },
  {
    id: 'FRAUD-006',
    category: 'FRAUD',
    inputType: 'text',
    input: "Part-time job from home: Earn ₹2,500 daily just by liking YouTube videos and rating hotels on Google. Pay ₹1,000 refundable security fee to start task.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'YouTube like / task-based Ponzi scheme with upfront fee'
  },
  {
    id: 'FRAUD-007',
    category: 'FRAUD',
    inputType: 'text',
    input: "Congratulations! You have won ₹25,00,000 in KBC Lucky Draw 2026. Send ₹12,500 processing tax via PhonePe to SBI Manager Rajesh Kumar to claim cash cheque.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Classic lottery / KBC prize scam with advance clearance fee'
  },
  {
    id: 'FRAUD-008',
    category: 'FRAUD',
    inputType: 'text',
    input: "Mumbai Cyber Crime: An arrest warrant has been issued against your Aadhaar card for illegal contraband parcel. Transfer ₹50,000 security bail bond immediately to avoid digital arrest.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Digital arrest / parcel contraband police extortion'
  },
  {
    id: 'FRAUD-009',
    category: 'FRAUD',
    inputType: 'text',
    input: "Pre-IPO special window! 100% guaranteed allocation in Tata Technologies SME IPO at 70% discount. Minimum investment ₹1,00,000. Transfer to pool account fast.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Fake SME IPO pre-allocation guarantee scheme'
  },
  {
    id: 'FRAUD-010',
    category: 'FRAUD',
    inputType: 'text',
    input: "Double your money in 20 days! Paisa double scheme. Deposit ₹20,000 and receive ₹40,000 guaranteed directly in your bank. Send cash to trader@paytm.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Double money Ponzi scheme prohibited under BUDS Act'
  },
  {
    id: 'FRAUD-011',
    category: 'FRAUD',
    inputType: 'text',
    input: "Urgent: Your SBI YONO account has been blocked. Click http://sbi-yono-update.firebaseapp.com to enter your username, password and OTP to unblock.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Banking phishing credential harvesting on free Firebase domain'
  },
  {
    id: 'FRAUD-012',
    category: 'FRAUD',
    inputType: 'text',
    input: "Forex automated bot generating 15% daily compound interest with 100% loss refund warranty. Connect on WhatsApp to get bot license key for ₹5,000.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Unregulated forex trading bot with unrealistic daily profit warranty'
  },
  // Add 93 programmatic fraud variations for exhaustive evaluation
  ...Array.from({ length: 93 }, (_, i) => {
    const scamTemplates = [
      `GUARANTEED RETURN: Invest ₹${10000 + i * 1000} and get 400% profit in ${i + 5} days! Risk-free agreement under SEBI registration INP${100000 + i}. Send funds to invest@paytm`,
      `URGENT: Your Demat trading folio #${200000 + i} is blocked due to non-compliance. Click http://demat-compliance-${i}.xyz within 1 hour to submit OTP and PAN.`,
      `VIP INSIDER GROUP: Only 2 slots remaining! Get 100% confirmed upper circuit calls. Transfer registration fee ₹${2000 + i * 100} to upi id vip${i}@okhdfcbank`,
      `WITHDRAWAL BLOCKED: Your account balance of ₹${300000 + i * 5000} is locked. Pay advance clearance tax of ₹${15000 + i * 500} to unlock withdrawal.`,
      `DIGITAL ARREST NOTICE: FIR #${9000 + i} registered against your mobile number. Call Cyber Cell officer immediately and transfer verification deposit ₹${25000 + i * 100}.`
    ];
    return {
      id: `FRAUD-${String(i + 13).padStart(3, '0')}`,
      category: 'FRAUD' as const,
      inputType: 'text' as const,
      input: scamTemplates[i % scamTemplates.length],
      expectedClass: 'FRAUD' as const,
      expectedRiskLevel: ['Critical', 'High'] as any,
      description: `Synthetic Fraud Test ${i + 13}: Active financial deception scenario`
    };
  })
];

// ==========================================
// 3. SUSPICIOUS / CAUTION (55 SAMPLES)
// ==========================================
export const SUSPICIOUS_SAMPLES: BenchmarkSample[] = [
  {
    id: 'SUSP-001',
    category: 'SUSPICIOUS',
    inputType: 'text',
    input: "Join our trading webinar where our mentor discusses high-momentum breakout strategies. Registration is free on our community Telegram group.",
    expectedClass: 'SUSPICIOUS',
    expectedRiskLevel: ['Moderate', 'Needs Verification', 'Low'],
    description: 'Trading education webinar leading to unverified Telegram group'
  },
  {
    id: 'SUSP-002',
    category: 'SUSPICIOUS',
    inputType: 'text',
    input: "Explore peer-to-peer invoice discounting yielding up to 14% IRR. Check out our platform terms before deciding your capital allocation.",
    expectedClass: 'SUSPICIOUS',
    expectedRiskLevel: ['Moderate', 'Needs Verification', 'Low'],
    description: 'P2P lending promotion with high yields but standard disclaimers'
  },
  {
    id: 'SUSP-003',
    category: 'SUSPICIOUS',
    inputType: 'text',
    input: "Secret algorithm detects market trends before institutions! Early access passes available for select active traders. Sign up to test beta platform.",
    expectedClass: 'SUSPICIOUS',
    expectedRiskLevel: ['Moderate', 'Needs Verification'],
    description: 'Proprietary trading algorithm marketing with exaggerated claims'
  },
  // 52 additional suspicious variations
  ...Array.from({ length: 52 }, (_, i) => ({
    id: `SUSP-${String(i + 4).padStart(3, '0')}`,
    category: 'SUSPICIOUS' as const,
    inputType: 'text' as const,
    input: `Discover alternative high-yield asset class #${i + 1}. Expected target yields between 12% to 18% p.a. Check prospectus and consult your financial advisor.`,
    expectedClass: 'SUSPICIOUS' as const,
    expectedRiskLevel: ['Moderate', 'Needs Verification', 'Low'] as any,
    description: `Suspicious Sample ${i + 4}: High-yield unverified investment promotion`
  }))
];

// ==========================================
// 4. ADVERSARIAL PAIRS (50 SAMPLES - 25 PAIRS)
// ==========================================
export const ADVERSARIAL_PAIRS: BenchmarkSample[] = [
  // Pair 1: Electricity Bill
  {
    id: 'ADV-01A',
    category: 'ADVERSARIAL_PAIR',
    inputType: 'text',
    input: "Your electricity bill of ₹1,248 is due on 8 October. Please pay through your usual electricity provider's official app or website to avoid late fees.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Pair 1A [SAFE]: Routine electricity bill reminder with official channel guidance',
    adversarialPairId: 'ADV-01B'
  },
  {
    id: 'ADV-01B',
    category: 'ADVERSARIAL_PAIR',
    inputType: 'text',
    input: "Your electricity bill of ₹1,248 is unpaid. Electricity will be disconnected tonight at 9:30 PM. Pay ₹1,248 immediately to electricity@paytm to avoid disconnection.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Pair 1B [SCAM]: Coercive disconnection threat with private UPI demand',
    adversarialPairId: 'ADV-01A'
  },

  // Pair 2: Bank OTP
  {
    id: 'ADV-02A',
    category: 'ADVERSARIAL_PAIR',
    inputType: 'text',
    input: "HDFC Bank: 492019 is OTP for login. Valid for 3 mins. Bank NEVER asks for OTP. Never share with anyone.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Pair 2A [SAFE]: Standard authentic bank login OTP with warning',
    adversarialPairId: 'ADV-02B'
  },
  {
    id: 'ADV-02B',
    category: 'ADVERSARIAL_PAIR',
    inputType: 'text',
    input: "HDFC Bank Alert: Unusual login detected. Reply with the OTP received to immediately block unauthorized transaction of ₹45,000.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Pair 2B [SCAM]: Phishing attack requesting the victim to reply with their OTP',
    adversarialPairId: 'ADV-02A'
  },

  // Pair 3: SEBI Advisory
  {
    id: 'ADV-03A',
    category: 'ADVERSARIAL_PAIR',
    inputType: 'text',
    input: "SEBI Advisory: Beware of unsolicited stock recommendations on WhatsApp and Telegram. SEBI does not guarantee returns on any investment.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Pair 3A [SAFE]: Official SEBI regulatory investor alert',
    adversarialPairId: 'ADV-03B'
  },
  {
    id: 'ADV-03B',
    category: 'ADVERSARIAL_PAIR',
    inputType: 'text',
    input: "SEBI CERTIFIED SCHEME: Join official SEBI guaranteed profit portfolio. 100% government capital insurance. Guaranteed 40% monthly returns.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Pair 3B [SCAM]: Forged SEBI certification with illegal capital guarantee',
    adversarialPairId: 'ADV-03A'
  },

  // Pair 4: Broker Demat Notification
  {
    id: 'ADV-04A',
    category: 'ADVERSARIAL_PAIR',
    inputType: 'text',
    input: "Zerodha: Your Demat account quarterly Re-KYC is due. Complete your verification smoothly by logging in to your Kite web portal or mobile app.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Pair 4A [SAFE]: Legitimate broker Re-KYC reminder directing to official app',
    adversarialPairId: 'ADV-04B'
  },
  {
    id: 'ADV-04B',
    category: 'ADVERSARIAL_PAIR',
    inputType: 'text',
    input: "Zerodha: Demat account frozen! Update PAN immediately within 2 hours at http://zerodha-rekyc.top or holdings will be auctioned.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Pair 4B [SCAM]: Panic account auction threat with lookalike .top URL',
    adversarialPairId: 'ADV-04A'
  },

  // Pair 5: Courier Delivery
  {
    id: 'ADV-05A',
    category: 'ADVERSARIAL_PAIR',
    inputType: 'text',
    input: "Delhivery: Your package from Flipkart has arrived at your local hub and will be delivered today. Track status on official delhivery.com.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Pair 5A [SAFE]: Routine courier delivery tracking update',
    adversarialPairId: 'ADV-05B'
  },
  {
    id: 'ADV-05B',
    category: 'ADVERSARIAL_PAIR',
    inputType: 'text',
    input: "Delhivery Notice: Your courier is stopped at customs. Pay ₹1,450 clearance fee immediately to courier-dept@okaxis to avoid cancellation.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Pair 5B [SCAM]: Fake customs clearance fee ransom trap',
    adversarialPairId: 'ADV-05A'
  },

  // 40 additional contrasting pairs (20 safe + 20 scam)
  ...Array.from({ length: 20 }, (_, i) => [
    {
      id: `ADV-${String(i + 6).padStart(2, '0')}A`,
      category: 'ADVERSARIAL_PAIR' as const,
      inputType: 'text' as const,
      input: `Routine notification #${i + 10}: Your monthly payment of ₹${1000 + i * 200} has been processed via official banking portal. Ref: TXN${90281 + i}.`,
      expectedClass: 'BENIGN' as const,
      expectedRiskLevel: ['Low', 'No Financial Risk'] as any,
      description: `Pair ${i + 6}A [SAFE]: Routine transactional confirmation`,
      adversarialPairId: `ADV-${String(i + 6).padStart(2, '0')}B`
    },
    {
      id: `ADV-${String(i + 6).padStart(2, '0')}B`,
      category: 'ADVERSARIAL_PAIR' as const,
      inputType: 'text' as const,
      input: `Urgent payment demand #${i + 10}: Your account #${8000 + i} is suspended. Transfer ₹${1000 + i * 200} to private UPI officer${i}@okaxis within 1 hour to prevent legal FIR.`,
      expectedClass: 'FRAUD' as const,
      expectedRiskLevel: ['Critical', 'High'] as any,
      description: `Pair ${i + 6}B [SCAM]: Coercive legal threat with private UPI demand`,
      adversarialPairId: `ADV-${String(i + 6).padStart(2, '0')}A`
    }
  ]).flat()
];

// ==========================================
// 5. OCR & DOCUMENT SCENARIOS (50 SAMPLES)
// ==========================================
export const OCR_SAMPLES: BenchmarkSample[] = [
  {
    id: 'OCR-01',
    category: 'OCR_SCENARIO',
    inputType: 'image',
    input: "IIT BHU Student Identity Card. Name: Rahul Verma. Department of Computer Science & Engineering. Roll No: 22075042. Valid: 2022-2026.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['No Financial Risk', 'Low'],
    description: 'Authentic student university ID card OCR'
  },
  {
    id: 'OCR-02',
    category: 'OCR_SCENARIO',
    inputType: 'image',
    input: "Joint Entrance Examination (JEE Main) Scorecard 2026. NTA Score: 99.4128. Candidate Name: Ananya Sharma. Eligible for JEE Advanced.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['No Financial Risk', 'Low'],
    description: 'Official academic examination marksheet OCR'
  },
  {
    id: 'OCR-03',
    category: 'OCR_SCENARIO',
    inputType: 'image',
    input: "D-Mart Supermarket Cash Memo. Invoice: DM-29182. Items: Wheat Flour 5kg ₹210, Cooking Oil 1L ₹145, Basmati Rice ₹320. Total: ₹675. Thank you.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['No Financial Risk', 'Low'],
    description: 'Retail grocery supermarket receipt OCR'
  },
  {
    id: 'OCR-04',
    category: 'OCR_SCENARIO',
    inputType: 'image',
    input: "City Health Clinic: Dr. A. K. Sen, MD. Patient: S. Gupta. Rx: Paracetamol 650mg TDS, Cetirizine 10mg OD. Take after meals.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['No Financial Risk', 'Low'],
    description: 'Medical doctor prescription slip OCR'
  },
  {
    id: 'OCR-05',
    category: 'OCR_SCENARIO',
    inputType: 'image',
    input: "State Bank of India Passbook. Account: 30918274910. Closing Balance: ₹42,150. Routine monthly salary credit and UPI merchant debits.",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['No Financial Risk', 'Low'],
    description: 'Routine bank passbook statement OCR'
  },
  {
    id: 'OCR-06',
    category: 'OCR_SCENARIO',
    inputType: 'image',
    input: "FORGED SEBI CERTIFICATE: Securities and Exchange Board of India certifies 'Alpha Wealth VIP Fund' with 45% assured monthly return. Stamp & Signature.",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Forged SEBI certificate promising 45% return'
  },
  {
    id: 'OCR-07',
    category: 'OCR_SCENARIO',
    inputType: 'image',
    input: "Scammer WhatsApp Chat: 'Sir just deposit Rs 25,000 in this personal UPI id rajesh@paytm and your demat account will be unblocked instantly'",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'WhatsApp extortion chat demanding personal UPI deposit'
  },
  // 43 additional OCR scenarios
  ...Array.from({ length: 43 }, (_, i) => ({
    id: `OCR-${String(i + 8).padStart(2, '0')}`,
    category: 'OCR_SCENARIO' as const,
    inputType: 'image' as const,
    input: i % 2 === 0
      ? `Legitimate academic certificate #${i + 1}: Bachelor of Technology in Electrical Engineering. Grade Point: 8.9/10.`
      : `Fake Investment Certificate #${i + 1}: Guaranteed 100% loss-free investment bond. Transfer capital to upi account deposit${i}@paytm to activate.`,
    expectedClass: (i % 2 === 0 ? 'BENIGN' : 'FRAUD') as 'BENIGN' | 'FRAUD',
    expectedRiskLevel: (i % 2 === 0 ? ['No Financial Risk', 'Low'] : ['Critical', 'High']) as ('No Financial Risk' | 'Low' | 'Moderate' | 'Needs Verification' | 'High' | 'Critical')[],
    description: `OCR Scenario ${i + 8}: ${i % 2 === 0 ? 'Authentic non-financial document' : 'Deceptive certificate scam'}`
  }))
];

// ==========================================
// 6. URL & DOMAIN PHISHING (50 SAMPLES)
// ==========================================
export const URL_SAMPLES: BenchmarkSample[] = [
  {
    id: 'URL-01',
    category: 'URL_SCENARIO',
    inputType: 'url',
    input: 'https://sebi.gov.in',
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Official verified SEBI government portal'
  },
  {
    id: 'URL-02',
    category: 'URL_SCENARIO',
    inputType: 'url',
    input: 'https://nseindia.com',
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Official National Stock Exchange of India portal'
  },
  {
    id: 'URL-03',
    category: 'URL_SCENARIO',
    inputType: 'url',
    input: 'https://bseindia.com',
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Official Bombay Stock Exchange portal'
  },
  {
    id: 'URL-04',
    category: 'URL_SCENARIO',
    inputType: 'url',
    input: 'https://rbi.org.in',
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Official Reserve Bank of India portal'
  },
  {
    id: 'URL-05',
    category: 'URL_SCENARIO',
    inputType: 'url',
    input: 'https://incometax.gov.in',
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['Low', 'No Financial Risk'],
    description: 'Official Income Tax Department of India portal'
  },
  {
    id: 'URL-06',
    category: 'URL_SCENARIO',
    inputType: 'url',
    input: 'http://sebi-gov-verification.xyz',
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'SEBI lookalike domain with suspicious .xyz TLD'
  },
  {
    id: 'URL-07',
    category: 'URL_SCENARIO',
    inputType: 'url',
    input: 'http://nsdl-demat-kyc.top',
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'NSDL depository lookalike on .top TLD'
  },
  {
    id: 'URL-08',
    category: 'URL_SCENARIO',
    inputType: 'url',
    input: 'https://hdfc-bank-rewards.web.app',
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Bank reward credential harvester on free web.app'
  },
  // 42 additional URL scenarios (21 safe + 21 phishing)
  ...Array.from({ length: 42 }, (_, i) => ({
    id: `URL-${String(i + 9).padStart(2, '0')}`,
    category: 'URL_SCENARIO' as const,
    inputType: 'url' as const,
    input: i % 2 === 0
      ? `https://bank-${i}.sbi`
      : `http://sbi-yono-update-${i}.xyz/login`,
    expectedClass: (i % 2 === 0 ? 'BENIGN' : 'FRAUD') as 'BENIGN' | 'FRAUD',
    expectedRiskLevel: (i % 2 === 0 ? ['Low', 'No Financial Risk'] : ['Critical', 'High']) as ('No Financial Risk' | 'Low' | 'Moderate' | 'Needs Verification' | 'High' | 'Critical')[],
    description: `URL Scenario ${i + 9}: ${i % 2 === 0 ? 'Authentic institutional domain' : 'Deceptive phishing URL'}`
  }))
];

// ==========================================
// 7. MULTILINGUAL & REGIONAL (50 SAMPLES)
// ==========================================
export const MULTILINGUAL_SAMPLES: BenchmarkSample[] = [
  {
    id: 'MULTI-01',
    category: 'MULTILINGUAL',
    inputType: 'text',
    input: "नमस्ते! सेबी अधिकृत वीआईपी ट्रेडिंग ग्रुप से जुड़ें। 50% निश्चित मुनाफा हर हफ्ते गारंटीड। केवल 2 स्लॉट बचे हैं।",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Hindi VIP Trading Group with 50% guaranteed return'
  },
  {
    id: 'MULTI-02',
    category: 'MULTILINGUAL',
    inputType: 'text',
    input: "सावधान: आपका डीमैट खाता अगले 2 घंटे में बंद कर दिया जाएगा। तुरंत अपना पैन कार्ड वेरीफाई करें वरना ट्रेडिंग हमेशा के लिए रुक जाएगी।",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Hindi Demat suspension panic threat'
  },
  {
    id: 'MULTI-03',
    category: 'MULTILINGUAL',
    inputType: 'text',
    input: "বিশেষ অফার: ২৫ দিনে টাকা দুগুণ করুন! ১০০% নিশ্চিত লাভ এবং সম্পূর্ণ ঝুঁকিহীন বিনিয়োগ। যোগাযোগ করুন আমাদের টেলিগ্রাম চ্যানেলে।",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Bengali double money Ponzi scheme'
  },
  {
    id: 'MULTI-04',
    category: 'MULTILINGUAL',
    inputType: 'text',
    input: "আপনার ডিম্যাট অ্যাকাউন্ট স্থগিত করা হয়েছে। অবিলম্বে কেওয়াইসি আপডেট করতে নিচের লিঙ্কে ক্লিক করুন।",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Bengali Demat blocked phishing threat'
  },
  {
    id: 'MULTI-05',
    category: 'MULTILINGUAL',
    inputType: 'text',
    input: "বিশেষ বিনিয়োগ আঁচনি: ১ মাহতে টকা দুগুণ কৰক! ১০০% নিশ্চিত লাভ। এতিয়াই ব্যক্তিগত একাউণ্টত টকা জমা দিয়ক।",
    expectedClass: 'FRAUD',
    expectedRiskLevel: ['Critical', 'High'],
    description: 'Assamese double money Ponzi scheme'
  },
  {
    id: 'MULTI-06',
    category: 'MULTILINGUAL',
    inputType: 'text',
    input: "नमस्ते भाई, कल शाम को डिनर पर मिलेंगे क्या? घर पर सब ठीक हैं ना?",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['No Financial Risk', 'Low'],
    description: 'Hindi casual personal message without financial content'
  },
  {
    id: 'MULTI-07',
    category: 'MULTILINGUAL',
    inputType: 'text',
    input: "কেমন আছেন? কাল বিকেলে দেখা হবে, চা খাব একসাথে।",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['No Financial Risk', 'Low'],
    description: 'Bengali casual personal greeting'
  },
  {
    id: 'MULTI-08',
    category: 'MULTILINGUAL',
    inputType: 'text',
    input: "ভালে আছেন নে? কাইলৈ পুৱা কলেজত লগ পাম।",
    expectedClass: 'BENIGN',
    expectedRiskLevel: ['No Financial Risk', 'Low'],
    description: 'Assamese casual personal conversation'
  },
  // 42 additional multilingual variations
  ...Array.from({ length: 42 }, (_, i) => ({
    id: `MULTI-${String(i + 9).padStart(2, '0')}`,
    category: 'MULTILINGUAL' as const,
    inputType: 'text' as const,
    input: i % 2 === 0
      ? `आज की ताज़ा खबर: भारतीय शेयर बाज़ार में आज सेंसेक्स ${500 + i * 10} अंक बढ़कर बंद हुआ। निवेशकों ने अनुशासित एसआईपी जारी रखी।`
      : `पैसा डबल स्कीम #${i + 1}: आज ही ₹${5000 + i * 500} लगाएं और दो हफ्ते में ₹${10000 + i * 1000} वापस पाएं। गारंटीड मुनाफा!`,
    expectedClass: (i % 2 === 0 ? 'BENIGN' : 'FRAUD') as 'BENIGN' | 'FRAUD',
    expectedRiskLevel: (i % 2 === 0 ? ['Low', 'No Financial Risk'] : ['Critical', 'High']) as ('No Financial Risk' | 'Low' | 'Moderate' | 'Needs Verification' | 'High' | 'Critical')[],
    description: `Multilingual Scenario ${i + 9}: ${i % 2 === 0 ? 'Hindi market news/education' : 'Hindi Ponzi double money scheme'}`
  }))
];

// Complete Unified Benchmark (465 samples)
export const ALL_BENCHMARK_SAMPLES: BenchmarkSample[] = [
  ...BENIGN_SAMPLES,
  ...FRAUD_SAMPLES,
  ...SUSPICIOUS_SAMPLES,
  ...ADVERSARIAL_PAIRS,
  ...OCR_SAMPLES,
  ...URL_SAMPLES,
  ...MULTILINGUAL_SAMPLES
];
