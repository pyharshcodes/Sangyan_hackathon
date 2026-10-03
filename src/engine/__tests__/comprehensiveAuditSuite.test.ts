import { describe, it, expect } from 'vitest';
import { runSangyanAnalysis } from '../coreAnalyzer';

interface TestCase {
  id: string;
  category: 'SMS_SCAM' | 'SMS_SAFE' | 'CHAT_SCAM' | 'CHAT_SAFE' | 'OCR_SCAM' | 'OCR_SAFE' | 'URL_PHISHING' | 'URL_SAFE' | 'MULTILINGUAL_SCAM';
  type: 'text' | 'image' | 'url';
  input: string;
  expectedRisk: ('Critical' | 'High')[] | ('Low' | 'No Financial Risk' | 'Needs Verification')[];
  description: string;
}

export const COMPREHENSIVE_TEST_CASES: TestCase[] = [
  // ==========================================
  // SECTION 1: SMS SCAMS
  // ==========================================
  {
    id: 'SMS-01',
    category: 'SMS_SCAM',
    type: 'text',
    input: 'URGENT: Your SBI YONO account blocked. Update PAN immediately to avoid permanent deactivation: http://sbi-yono-update.xyz',
    expectedRisk: ['Critical', 'High'],
    description: 'Bank impersonation phishing SMS with .xyz domain'
  },
  {
    id: 'SMS-02',
    category: 'SMS_SCAM',
    type: 'text',
    input: 'Dear Customer, your electricity power will be disconnected tonight 9:30 PM due to unpaid bill. Call electricity officer at 9876543210 immediately.',
    expectedRisk: ['Critical', 'High'],
    description: 'Electricity disconnection coercive urgency scam'
  },
  {
    id: 'SMS-03',
    category: 'SMS_SCAM',
    type: 'text',
    input: 'Congratulations! You won Rs 25,00,000 in KBC Lottery. To claim contact WhatsApp manager on 9123456789. Only 2 seats remaining.',
    expectedRisk: ['Critical', 'High'],
    description: 'Fake lottery / KBC prize scam with urgency'
  },
  {
    id: 'SMS-04',
    category: 'SMS_SCAM',
    type: 'text',
    input: 'Part time online job: Earn Rs 2000-5000 daily by simple typing work from home. Registration fee Rs 499 only. WhatsApp now.',
    expectedRisk: ['Critical', 'High'],
    description: 'Work from home advance registration fee scam'
  },
  {
    id: 'SMS-05',
    category: 'SMS_SCAM',
    type: 'text',
    input: 'Pre-approved Instant Personal Loan of Rs 5,00,000 without CIBIL! Pay Rs 2,500 file processing charge to disburse to your bank account.',
    expectedRisk: ['Critical', 'High'],
    description: 'Fake instant loan with upfront processing fee trap'
  },
  {
    id: 'SMS-06',
    category: 'SMS_SCAM',
    type: 'text',
    input: 'NSDL Alert: Your Demat Account KYC has expired. Trading will be frozen within 2 hours. Update at: https://nsdl-demat-verify.top',
    expectedRisk: ['Critical', 'High'],
    description: 'Demat KYC freeze threat with phishing link'
  },
  {
    id: 'SMS-07',
    category: 'SMS_SCAM',
    type: 'text',
    input: 'FedEx Courier Alert: A parcel sent in your name containing illegal passports and drugs has been intercepted. Digital arrest warrant issued. Connect via Skype immediately to avoid jail.',
    expectedRisk: ['Critical', 'High'],
    description: 'Digital arrest / parcel contraband police extortion scam'
  },

  // ==========================================
  // SECTION 2: SMS SAFE (NEGATIVE CONTROLS)
  // ==========================================
  {
    id: 'SMS-SAFE-01',
    category: 'SMS_SAFE',
    type: 'text',
    input: 'Your OTP for login to HDFC NetBanking is 591024. Valid for 10 minutes. Do not share with anyone including bank staff.',
    expectedRisk: ['Low', 'No Financial Risk'],
    description: 'Standard authentic bank login OTP'
  },
  {
    id: 'SMS-SAFE-02',
    category: 'SMS_SAFE',
    type: 'text',
    input: 'Dear SBI Customer, INR 45,000.00 credited to your A/C ending 9876 on 02-Oct-26 by NEFT salary credit from employer.',
    expectedRisk: ['Low', 'No Financial Risk'],
    description: 'Authentic salary credit alert'
  },
  {
    id: 'SMS-SAFE-03',
    category: 'SMS_SAFE',
    type: 'text',
    input: 'Your monthly electricity bill for CA 10293847 is INR 1,450. Due date: 15-Oct-2026. Pay via official discom portal or BBPS.',
    expectedRisk: ['Low', 'No Financial Risk'],
    description: 'Legitimate electricity bill reminder with BBPS guidance'
  },

  // ==========================================
  // SECTION 3: WHATSAPP / TELEGRAM CHAT SCAMS
  // ==========================================
  {
    id: 'CHAT-01',
    category: 'CHAT_SCAM',
    type: 'text',
    input: 'Bhai ek scheme aayi hai, ₹10,000 do aur 2 mahine me ₹20,000 pakka double. 100% guarantee hai company ki.',
    expectedRisk: ['Critical', 'High'],
    description: 'Vernacular Ponzi scheme with double money promise'
  },
  {
    id: 'CHAT-02',
    category: 'CHAT_SCAM',
    type: 'text',
    input: 'Earn ₹3,000 daily by liking YouTube videos and Google map reviews. Per like ₹50 guaranteed instant payout on Telegram.',
    expectedRisk: ['Critical', 'High'],
    description: 'YouTube like / subscribe part time task scam'
  },
  {
    id: 'CHAT-03',
    category: 'CHAT_SCAM',
    type: 'text',
    input: 'Special Institutional Pre-IPO SME quota allocation available! Guaranteed 250% listing gains. Transfer funds to allocation pool account.',
    expectedRisk: ['Critical', 'High'],
    description: 'Fake SME IPO allotment scam with guaranteed listing gain'
  },
  {
    id: 'CHAT-04',
    category: 'CHAT_SCAM',
    type: 'text',
    input: 'Your trading balance is ₹8,40,000. To withdraw accrued profits, mandatory 18% SEBI tax clearance fee of ₹1,51,200 must be deposited to UPI id.',
    expectedRisk: ['Critical', 'High'],
    description: 'Advance withdrawal ransom tax scam'
  },
  {
    id: 'CHAT-05',
    category: 'CHAT_SCAM',
    type: 'text',
    input: 'Join VIP Premium Stock Options Telegram channel. 99% accuracy daily jackpot calls. Guaranteed Rs 50,000 daily profit.',
    expectedRisk: ['Critical', 'High'],
    description: 'Unregistered VIP Telegram trading advisory'
  },
  {
    id: 'CHAT-06',
    category: 'CHAT_SCAM',
    type: 'text',
    input: 'Crypto cloud mining contract: Deposit 500 USDT and receive 5% fixed daily return forever. Zero risk 100% guaranteed.',
    expectedRisk: ['Critical', 'High'],
    description: 'Crypto cloud mining guaranteed daily yield Ponzi'
  },
  {
    id: 'CHAT-07',
    category: 'CHAT_SCAM',
    type: 'text',
    input: 'Work from hotel review commission: Complete 3 merchant booking tasks and earn 40% commission. Send prepaid deposit of Rs 10,000.',
    expectedRisk: ['Critical', 'High'],
    description: 'Hotel review prepaid merchant task scam'
  },

  // ==========================================
  // SECTION 4: CHAT SAFE (NEGATIVE CONTROLS)
  // ==========================================
  {
    id: 'CHAT-SAFE-01',
    category: 'CHAT_SAFE',
    type: 'text',
    input: 'Reminder: Your monthly SIP of Rs 2,500 in Nippon India Small Cap Fund is due tomorrow. Please maintain sufficient bank balance.',
    expectedRisk: ['Low', 'No Financial Risk'],
    description: 'Legitimate mutual fund SIP reminder'
  },
  {
    id: 'CHAT-SAFE-02',
    category: 'CHAT_SAFE',
    type: 'text',
    input: 'Mutual fund investments are subject to market risks, read all scheme related documents carefully. Issued in public interest by AMFI.',
    expectedRisk: ['Low', 'No Financial Risk'],
    description: 'Official AMFI / SEBI statutory investor awareness disclaimer'
  },
  {
    id: 'CHAT-SAFE-03',
    category: 'CHAT_SAFE',
    type: 'text',
    input: 'Bhai kal market close hone ke baad movie chalte hain kya sham ko?',
    expectedRisk: ['No Financial Risk', 'Low'],
    description: 'Casual non-financial social chat mentioning the word market'
  },

  // ==========================================
  // SECTION 5: SCREENSHOT / OCR CASES
  // ==========================================
  {
    id: 'OCR-01',
    category: 'OCR_SCAM',
    type: 'image',
    input: 'CERTIFICATE OF REGISTRATION - SEBI / Securities and Exchange Board of India. Reg No: INP9988776655. Guaranteed 40% monthly returns on High Yield Investment Portfolio.',
    expectedRisk: ['Critical', 'High'],
    description: 'Forged SEBI certificate promising 40% monthly return'
  },
  {
    id: 'OCR-02',
    category: 'OCR_SCAM',
    type: 'image',
    input: 'Trading Dashboard Screenshot: Available Profit: Rs 15,20,000. Status: WITHDRAWAL PENDING. Pay regulatory clearance fee of Rs 75,000 to unlock wallet.',
    expectedRisk: ['Critical', 'High'],
    description: 'Fake trading dashboard showing virtual profit with withdrawal fee ransom'
  },
  {
    id: 'OCR-03',
    category: 'OCR_SCAM',
    type: 'image',
    input: "Sir just deposit Rs 25,000 in this personal UPI id rajesh@paytm and your demat account will be unblocked instantly",
    expectedRisk: ['Critical', 'High'],
    description: 'Screenshot of scammer chat demanding payment to personal UPI'
  },
  {
    id: 'OCR-04',
    category: 'OCR_SCAM',
    type: 'image',
    input: 'Telegram group screenshot: VIP SME IPO Allocation pool - send funds to personal account within 30 minutes, only 3 seats remaining',
    expectedRisk: ['Critical', 'High'],
    description: 'Telegram group screenshot with urgency and unverified pool'
  },
  {
    id: 'OCR-SAFE-01',
    category: 'OCR_SAFE',
    type: 'image',
    input: 'Student Identity Card - Indian Institute of Technology (BHU) Varanasi. Department of Computer Science. Valid through 2026.',
    expectedRisk: ['No Financial Risk'],
    description: 'IIT BHU Student ID card screenshot'
  },
  {
    id: 'OCR-SAFE-02',
    category: 'OCR_SAFE',
    type: 'image',
    input: 'National Testing Agency Joint Entrance Examination (JEE Main) Score Card. Physics 98.4, Chemistry 96.2, Mathematics 99.1. Qualified for JEE Advanced.',
    expectedRisk: ['No Financial Risk'],
    description: 'JEE Main marksheet screenshot'
  },
  {
    id: 'OCR-SAFE-03',
    category: 'OCR_SAFE',
    type: 'image',
    input: 'State Bank of India Account Statement. Opening balance Rs 35,000, Closing balance Rs 42,000. Routine UPI and salary debits and credits.',
    expectedRisk: ['No Financial Risk'],
    description: 'Routine bank passbook statement'
  },
  {
    id: 'OCR-SAFE-04',
    category: 'OCR_SAFE',
    type: 'image',
    input: '[Personal photograph - Selfie taken with mobile camera in a garden]',
    expectedRisk: ['No Financial Risk'],
    description: 'Personal selfie photograph'
  },
  {
    id: 'OCR-SAFE-05',
    category: 'OCR_SAFE',
    type: 'image',
    input: 'Grocery Store Bill: D-Mart Varanasi. Rice 5kg, Oil 1L, Milk 2L. Total Amount: Rs 840. Paid via UPI.',
    expectedRisk: ['No Financial Risk', 'Low'],
    description: 'Retail grocery store receipt'
  },
  {
    id: 'OCR-SAFE-06',
    category: 'OCR_SAFE',
    type: 'image',
    input: 'Doctor Prescription: Dr. Sharma Clinic. Paracetamol 500mg TDS, Cetirizine 10mg OD. Take after food.',
    expectedRisk: ['No Financial Risk'],
    description: 'Doctor clinic medical prescription'
  },

  // ==========================================
  // SECTION 6: URL / LINK CASES
  // ==========================================
  {
    id: 'URL-01',
    category: 'URL_PHISHING',
    type: 'url',
    input: 'http://sebi-gov-verification-portal.xyz/login',
    expectedRisk: ['Critical', 'High'],
    description: 'SEBI lookalike domain with suspicious .xyz TLD'
  },
  {
    id: 'URL-02',
    category: 'URL_PHISHING',
    type: 'url',
    input: 'https://nsdl-demat-kyc-update.com/pan-verify',
    expectedRisk: ['Critical', 'High'],
    description: 'NSDL Demat KYC phishing domain'
  },
  {
    id: 'URL-03',
    category: 'URL_PHISHING',
    type: 'url',
    input: 'https://sbi-reward-points.web.app/claim',
    expectedRisk: ['Critical', 'High'],
    description: 'Bank reward phishing hosted on free web.app subdomain'
  },
  {
    id: 'URL-04',
    category: 'URL_PHISHING',
    type: 'url',
    input: 'https://hdfc-bank-netbanking.firebaseapp.com/login',
    expectedRisk: ['Critical', 'High'],
    description: 'HDFC Netbanking credential harvester on firebaseapp.com'
  },
  {
    id: 'URL-05',
    category: 'URL_PHISHING',
    type: 'url',
    input: 'http://bit.ly/sme-ipo-guaranteed-allocation',
    expectedRisk: ['Critical', 'High'],
    description: 'Obfuscated short URL masking investment solicitation'
  },
  {
    id: 'URL-06',
    category: 'URL_PHISHING',
    type: 'url',
    input: 'http://tinyurl.com/telegram-vip-trading-club',
    expectedRisk: ['Critical', 'High'],
    description: 'Obfuscated tinyurl pointing to VIP trading club'
  },
  {
    id: 'URL-07',
    category: 'URL_PHISHING',
    type: 'url',
    input: 'http://cdsl-india-kyc.top/verify',
    expectedRisk: ['Critical', 'High'],
    description: 'CDSL Depository phishing on .top TLD'
  },
  {
    id: 'URL-SAFE-01',
    category: 'URL_SAFE',
    type: 'url',
    input: 'https://www.sebi.gov.in/filings/mutual-funds.html',
    expectedRisk: ['Low', 'No Financial Risk'],
    description: 'Official SEBI Government of India portal'
  },
  {
    id: 'URL-SAFE-02',
    category: 'URL_SAFE',
    type: 'url',
    input: 'https://www.nseindia.com/market-data/live-equity-market',
    expectedRisk: ['Low', 'No Financial Risk'],
    description: 'Official National Stock Exchange (NSE) portal'
  },
  {
    id: 'URL-SAFE-03',
    category: 'URL_SAFE',
    type: 'url',
    input: 'https://www.bseindia.com/markets/equity/EQReports/StockPrcHistori.html',
    expectedRisk: ['Low', 'No Financial Risk'],
    description: 'Official Bombay Stock Exchange (BSE) portal'
  },
  {
    id: 'URL-SAFE-04',
    category: 'URL_SAFE',
    type: 'url',
    input: 'https://www.onlinesbi.sbi/sbijava/osbi_retail_index.html',
    expectedRisk: ['Low', 'No Financial Risk'],
    description: 'Official State Bank of India portal (.sbi TLD)'
  },
  {
    id: 'URL-SAFE-05',
    category: 'URL_SAFE',
    type: 'url',
    input: 'https://incometax.gov.in/iec/foportal/',
    expectedRisk: ['Low', 'No Financial Risk'],
    description: 'Official Income Tax Department of India portal'
  },

  // ==========================================
  // SECTION 7: MULTILINGUAL SCAMS
  // ==========================================
  {
    id: 'MULTI-01',
    category: 'MULTILINGUAL_SCAM',
    type: 'text',
    input: 'नमस्ते सर! हमारे वीआईपी ट्रेडिंग ग्रुप से जुड़ें। हर महीने 50% का पक्का मुनाफा और 100% गारंटी। केवल 5 सीटें बची हैं।',
    expectedRisk: ['Critical', 'High'],
    description: 'Hindi VIP Trading Group with 50% guaranteed profit and urgency'
  },
  {
    id: 'MULTI-02',
    category: 'MULTILINGUAL_SCAM',
    type: 'text',
    input: 'डीमैट खाता चेतावनी: आपका ट्रेडिंग खाता बंद कर दिया गया है। तुरंत अपने पैन और आधार को अपडेट करें।',
    expectedRisk: ['Critical', 'High'],
    description: 'Hindi Demat suspension threat'
  },
  {
    id: 'MULTI-03',
    category: 'MULTILINGUAL_SCAM',
    type: 'text',
    input: 'ঘরে বসে প্রতিদিন ৩০০০ টাকা আয় করুন। ১০০% নিশ্চিত লাভ। টাকা দ্বিগুণ হবে মাত্র ৩০ দিনে। আজই যোগাযোগ করুন।',
    expectedRisk: ['Critical', 'High'],
    description: 'Bengali Ponzi scam promising double money and 100% assured profit'
  },
  {
    id: 'MULTI-04',
    category: 'MULTILINGUAL_SCAM',
    type: 'text',
    input: 'সতর্কতা: আপনার ডিম্যাট অ্যাকাউন্ট সাময়িকভাবে ব্লক করা হয়েছে। অ্যাকাউন্ট চালু রাখতে অবিলম্বে কেওয়াইসি আপডেট করুন।',
    expectedRisk: ['Critical', 'High'],
    description: 'Bengali Demat blocked KYC update threat'
  },
  {
    id: 'MULTI-05',
    category: 'MULTILINGUAL_SCAM',
    type: 'text',
    input: 'ঘৰত বহি নিতৌ ৫০০০ টকা উপাৰ্জন কৰক। ১০০% নিশ্চিত লাভ। টকা দুগুণ হ\'ব ৩০ দিনত। এতিয়াই পঞ্জীয়ন কৰক।',
    expectedRisk: ['Critical', 'High'],
    description: 'Assamese Ponzi scam promising 100% return and double money'
  },
  {
    id: 'MULTI-06',
    category: 'MULTILINGUAL_SCAM',
    type: 'text',
    input: 'সাৱধান: আপোনাৰ ডিমেট একাউণ্ট ব্লক কৰা হৈছে। একাউণ্ট সক্ৰিয় কৰিবলৈ পেন কাৰ্ড আপডেট কৰক।',
    expectedRisk: ['Critical', 'High'],
    description: 'Assamese Demat blocked credential threat'
  },
  {
    id: 'MULTI-07',
    category: 'MULTILINGUAL_SCAM',
    type: 'text',
    input: 'Hello sir, aap part time work se daily 2k to 5k kama sakte ho. Sirf YouTube videos like karna hai. Har like par Rs 50 instant Google Pay me.',
    expectedRisk: ['Critical', 'High'],
    description: 'Hinglish YouTube like part time scam'
  },
  {
    id: 'MULTI-08',
    category: 'MULTILINGUAL_SCAM',
    type: 'text',
    input: 'Bhai ye company me invest kar, har mahine 40% return aata hai fixed. Mere dost ne bhi lagaya hai, paisa double ho jata hai.',
    expectedRisk: ['Critical', 'High'],
    description: 'Hinglish fixed 40% return and paisa double Ponzi'
  }
];

describe('Comprehensive 50-Scenario Model Audit Across SMS, OCR, URLs, and Multilingual Inputs', () => {
  COMPREHENSIVE_TEST_CASES.forEach((tc) => {
    it(`[${tc.id}] ${tc.category}: ${tc.description}`, () => {
      const result = runSangyanAnalysis(tc.input, tc.type);
      const isPassed = (tc.expectedRisk as string[]).includes(result.overallAssessment);

      if (!isPassed) {
        console.error(
          `FAIL [${tc.id}] Expected: ${tc.expectedRisk.join('/')} | Actual: ${result.overallAssessment} (Score: ${result.heuristicScore}) | Input: "${tc.input.substring(0, 60)}..."`
        );
      }

      expect(tc.expectedRisk as string[]).toContain(result.overallAssessment);
    });
  });
});
