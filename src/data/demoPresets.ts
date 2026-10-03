import { DemoPreset } from '../types';

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'p0-electricity-bill-safe',
    title: 'P0: Legitimate Utility Bill Reminder (Safe / Benign Control)',
    titleHi: 'P0: सामान्य बिजली बिल सूचना (सुरक्षित / नकारात्मक साक्ष्य)',
    titleBn: 'P0: স্বাভাবিক বিদ্যুৎ বিল বিজ্ঞপ্তি (নিরাপদ / কোনো ঝুঁকি নেই)',
    titleAs: 'P0: স্বাভাৱিক বিদ্যুৎ বিল সূচনা (সুৰক্ষিত / কোনো বিপদ নাই)',
    shortDesc: '🟢 Low Risk (Score < 20): Routine utility bill advising payment via official app. Zero scam signals.',
    shortDescBn: '🟢 কম ঝুঁকি: সাধারণ বিদ্যুৎ বিল ও অফিসিয়াল অ্যাপের মাধ্যমে অর্থপ্রদানের পরামর্শ।',
    shortDescAs: '🟢 কম আশংকা: নিয়মীয়া বিদ্যুৎ বিল আৰু অফিচিয়েল এপৰ পৰামৰ্শ।',
    category: 'Legitimate Routine Bill',
    type: 'text',
    content: `Your electricity bill of ₹1,248 is due on 8 October. Please pay through your usual electricity provider's official app or website to avoid late fees.`
  },
  {
    id: 'p1-fake-sebi-guarantee',
    title: 'P1: Fake SEBI / Guaranteed 300% Return',
    titleHi: 'P1: फ़र्ज़ी सेबी / 300% गारंटीड रिटर्न स्कैम',
    titleBn: 'P1: ভুয়া সেবি / ৩০০% নিশ্চিত রিটার্ন স্ক্যাম',
    titleAs: 'P1: ভুৱা সেবি / ৩০০% নিশ্চিত ৰিটাৰ্ণ কেলেংকাৰী',
    shortDesc: '🚨 High/Critical Risk: Fake authority, 300% guaranteed return, urgency, WhatsApp redirection.',
    shortDescBn: '🚨 উচ্চ ঝুঁকি: জাল কর্তৃপক্ষ, ৩০০% নিশ্চিত লাভ, জরুরি তাগিদ, হোয়াটসঅ্যাপ রিডাইরেকশন।',
    shortDescAs: '🚨 উচ্চ আশংকা: ভুৱা কৰ্তৃপক্ষ, ৩০০% নিশ্চিত লাভ, জৰুৰী হেঁচা, হোৱাটছএপ পুনৰ্নিৰ্দেশনা।',
    category: 'Fake Authority & Guarantee',
    type: 'text',
    content: `🚨 SEBI INVESTMENT ALERT: Your account has been selected for an exclusive investment opportunity with 300% guaranteed returns in 3 days. Limited slots available. Contact our certified advisor on WhatsApp immediately: wa.me/91XXXXXXXXXX. Invest before 8 PM today.`
  },
  {
    id: 'p2-demat-kyc-phishing',
    title: 'P2: Fake Demat KYC Phishing SMS',
    titleHi: 'P2: डीमैट केवाईसी सस्पेंशन फ़िशिंग एसएमएस',
    titleBn: 'P2: ডিম্যাট কেওয়াইসি সাসপেনশন ফিশিং এসএমএস',
    titleAs: 'P2: ডিমেট কেৱাইচি নিলম্বন ফিছিং বাৰ্তা',
    shortDesc: '🚨 High/Critical Risk: Urgency, account threat, suspicious link, credential harvesting.',
    shortDescBn: '🚨 উচ্চ ঝুঁকি: হুমকি, ভুয়া লিংক, তথ্য চুরির চেষ্টা।',
    shortDescAs: '🚨 উচ্চ আশংকা: ভাবুকি, ভুৱা লিংক, তথ্য চুৰিৰ চেষ্টা।',
    category: 'Credential Phishing',
    type: 'text',
    content: `URGENT: Your DEMAT account will be suspended today due to incomplete KYC. Verify your PAN and account immediately at: https://demat-kyc-verification.example
Failure to verify within 2 hours will result in permanent account blockage.`
  },
  {
    id: 'p3-telegram-vip-ipo',
    title: 'P3: Telegram VIP SME IPO Tip',
    titleHi: 'P3: टेलीग्राम वीआईपी 400% मुनाफा आईपीओ स्कैम',
    titleBn: 'P3: টেলিগ্রাম ভিআইপি ৪০০% আইপিও স্ক্যাম',
    titleAs: 'P3: টেলিগ্ৰাম ভিআইপি ৪০০% আইপিঅ\' কেলেংকাৰী',
    shortDesc: '🚨 High/Critical Risk: 400% profit promise, scarcity FOMO, advance allocation wallet, VIP channel.',
    shortDescBn: '🚨 উচ্চ ঝুঁকি: ৪০০% লাভের দাবি, অগ্রিম পেমেন্ট, ভিআইপি চ্যানেল।',
    shortDescAs: '🚨 উচ্চ আশংকা: ৪০০% লাভৰ দাবী, আগতীয়া ধন, ভিআইপি চেনেল।',
    category: 'VIP Pump & Dump',
    type: 'text',
    content: `💰 VIP INVESTOR GROUP — SECRET SME IPO TIP
Our analysts have confirmed 400% profit potential. Only 20 seats remaining! Send ₹10,000 to our “secure allocation wallet” to reserve your allotment. Guaranteed allocation + guaranteed profit. Join now: t.me/example_vip_group`
  },
  {
    id: 'p4-fake-withdrawal-fee',
    title: 'P4: Fake Regulatory Withdrawal Fee',
    titleHi: 'P4: मुनाफ़ा निकालने हेतु फ़र्ज़ी सेबी फीस ट्रैप',
    titleBn: 'P4: লাভ তোলার জন্য ভুয়া সেবি ফি ফাঁদ',
    titleAs: 'P4: লাভ উলিওৱাৰ বাবে ভুৱা সেবি মাছুলৰ ফান্দ',
    shortDesc: '🚨 High/Critical Risk: Advance fee ransom, fake SEBI fee, countdown urgency, blocked profits.',
    shortDescBn: '🚨 উচ্চ ঝুঁকি: তহবিল মুক্তির জন্য অগ্রিম ফি দাবি, ভুয়া আইনি দাবি।',
    shortDescAs: '🚨 উচ্চ আশংকা: ধন মুক্তিৰ বাবে আগতীয়া মাছুল দাবী, ভুৱা আইনী দাবী।',
    category: 'Advance Fee Ransom',
    type: 'text',
    content: `Withdrawal Pending ⚠️
Your investment account shows an accrued profit balance of ₹48,750.
To release your funds, pay the mandatory SEBI/Regulatory Verification Fee of ₹2,499 within 30 minutes to UPI ID: verify-release@bankupi.
Failure to pay will result in account forfeiture.`
  },
  {
    id: 'p5-broker-panic-security',
    title: 'P5: Fake Broker Security Notice',
    titleHi: 'P5: ब्रोकर पोर्टफोलियो नीलामी फ़िशिंग ट्रैप',
    titleBn: 'P5: ব্রোকার পোর্টফোলিও নিলাম ফিশিং ফাঁদ',
    titleAs: 'P5: ব্ৰ\'কাৰ পৰ্টফ\'লিঅ\' নিলাম ফিছিং ফান্দ',
    shortDesc: '🚨 High/Critical Risk: Intermediary impersonation, panic freeze narrative, credential stealing link.',
    shortDescBn: '🚨 উচ্চ ঝুঁকি: বিশ্বস্ত সংস্থার নাম ভাঙিয়ে আতঙ্ক সৃষ্টি ও লগইন চুরির অপচেষ্টা।',
    shortDescAs: '🚨 উচ্চ আশংকা: বিশ্বাসী প্ৰতিষ্ঠানৰ নাম লৈ আতংক সৃষ্টি আৰু লগইন চুৰিৰ চেষ্টা।',
    category: 'Panic Phishing Trap',
    type: 'url',
    content: `SECURITY ALERT: Unusual login detected on your trading account. Your holdings have been frozen to prevent liquidation.
To unlock your account and prevent portfolio auction, verify your broker credentials immediately at:
https://broker-security.example/login`
  },
  {
    id: 'p6-legitimate-investor-awareness',
    title: 'P6: Legitimate Investor Awareness (Negative Control)',
    titleHi: 'P6: प्रामाणिक सेबी जागरूकता संदेश (सुरक्षित)',
    titleBn: 'P6: প্রামাণিক সেবি বিনিয়োগকারী সচেতনতা (নিরাপদ)',
    titleAs: 'P6: প্ৰামাণিক সেবি বিনিয়োগকাৰী সজাগতা (সুৰক্ষিত)',
    shortDesc: '🟢 Low Risk: Educational awareness, balanced risk disclosure, no false guarantees, no scam links.',
    shortDescBn: '🟢 কম ঝুঁকি: শিক্ষামূলক তথ্য, বাজার ঝুঁকির স্পষ্ট উল্লেখ, কোনো অসদুপায় নেই।',
    shortDescAs: '🟢 কম আশংকা: শিক্ষামূলক তথ্য, বজাৰ বিপদৰ স্পষ্ট উল্লেখ, কোনো অসৎ উপায় নাই।',
    category: 'Legitimate Education',
    type: 'text',
    content: `Investor Awareness: Before making any investment decision, always verify whether the intermediary is registered with SEBI. Check registration credentials directly on the official SEBI website (sebi.gov.in). Never transfer funds to personal UPI handles or private bank accounts for stock trading.
Investments in securities market are subject to market risks. Read all the related documents carefully before investing.`
  },
  {
    id: 'preset-fake-certificate-image',
    title: 'Screenshot: Fake SEBI PMS Certificate',
    titleHi: 'स्क्रीनशॉट: फर्जी सेबी सर्टिफिकेट व 40% मासिक रिटर्न',
    titleBn: 'স্ক্রিনশট: ভুয়া সেবি সার্টিফিকেট ও ৪০% রিটার্ন',
    titleAs: 'স্ক্ৰিনশ্বট: ভুৱা সেবি প্ৰমাণপত্ৰ আৰু ৪০% ৰিটাৰ্ণ',
    shortDesc: '🚨 High/Critical Risk Screenshot: Fabricated registration doc promising 40% monthly interest.',
    shortDescBn: '🚨 ভুয়া সরকারি সিল ও মাসে ৪০% নিশ্চিত সুদ দাবি করা জাল নথি।',
    shortDescAs: '🚨 ভুৱা চৰকাৰী মোহৰ আৰু মাহে ৪০% নিশ্চিত লাভ দাবী কৰা জাল নথি।',
    category: 'Forged Certificate Screenshot',
    type: 'image',
    imageBadgeText: 'SEBI_CERTIFICATE_FORGERY.JPG',
    content: `[Extracted from Certificate Screenshot]
GOVERNMENT OF INDIA - SECURITIES AND EXCHANGE BOARD OF INDIA (SEBI)
CERTIFICATE OF PERMANENT WEALTH MANAGEMENT
This is to certify that 'Astra Apex Capital' is a SEBI Guaranteed Portfolio Manager (Reg No: INP887766554).
Under Special Window Circular 2026, all retail deposits up to ₹5,00,000 carry mandatory 40% monthly interest guaranteed by SEBI Investor Compensation Pool.
Contact Managing Director on WhatsApp: +91 98765 43210. Deposit via NEFT.`
  },
  {
    id: 'preset-jee-marksheet-doc',
    title: 'Document: JEE Main Marksheet (Academic Control)',
    titleHi: 'दस्तावेज़: जेईई मेन्स अंकतालिका (अकादमिक नियंत्रण)',
    titleBn: 'নথি: জেইই মেইন মার্কশিট (শিক্ষাগত নিয়ন্ত্রণ)',
    titleAs: 'নথি: জেইই মেইন মাৰ্কশ্বীট (শিক্ষাগত নিয়ন্ত্ৰণ)',
    shortDesc: '🛡️ No Financial Risk: Academic marksheet with roll number & percentile. Not an investment offer.',
    shortDescBn: '🛡️ কোনো আর্থিক ঝুঁকি নেই: ব্যক্তিগত পরীক্ষার নম্বরপত্র।',
    shortDescAs: '🛡️ কোনো বিত্তীয় আশংকা নাই: পৰীক্ষাৰ নম্বৰ বহী।',
    category: 'Non-Financial Academic',
    type: 'image',
    imageBadgeText: 'JEE_MAINS_MARKSHEET.PNG',
    content: `National Testing Agency (NTA) - Joint Entrance Examination (JEE Main) Score Card
Candidate Name: Candidate
Roll Number: 240310123456
Physics: 98.4 Percentile | Chemistry: 96.2 Percentile | Mathematics: 99.1 Percentile
Total NTA Score: 98.65 Percentile
Status: Qualified for JEE Advanced`
  }
];
