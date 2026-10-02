import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  appName: string;
  appBadge: string;
  tagline: string;
  initiativeBar: string;
  edgePrivacyActive: string;
  helpline: string;
  verifyContentNav: string;
  literacyNav: string;
  guardrailsNav: string;
  beforeYouInvest: string;
  heroSubtext: string;
  heroBadgeText: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroSubtitle: string;
  pillRealLife: string;
  pillFraudTips: string;
  pillDigitalHabits: string;
  trustEvidence: string;
  trustPrivacy: string;
  trustNoAdvice: string;
  checkMessageBtn: string;
  checkLinkBtn: string;
  uploadScreenshotBtn: string;
  testScenariosTitle: string;
  oneClickEval: string;
  messageLabel: string;
  messagePlaceholder: string;
  linkPlaceholder: string;
  verifyButton: string;
  verifyDomainButton: string;
  verifyScreenshotButton: string;
  uploadBoxTitle: string;
  uploadBoxSubtitle: string;
  riskAssessmentTitle: string;
  whyTitle: string;
  whySubtitle: string;
  whatWeCouldVerifyTitle: string;
  whatWeCouldNotVerifyTitle: string;
  whatShouldYouDoNowTitle: string;
  whatShouldYouDoNowSubtitle: string;
  understandSimpleLanguage: string;
  listenAudioBtn: string;
  stopAudioBtn: string;
  desiAnalogyTitle: string;
  emergencyCallBtn: string;
  complaintDraftBtn: string;
  checkAnotherBtn: string;
  inspectedVia: string;
  viewInputBtn: string;
  hideInputBtn: string;
  analyzingTitle: string;
  analyzingSubtitle: string;
  stages: {
    reading: string;
    extracting: string;
    checking: string;
    analyzing: string;
    preparing: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  // ==========================================
  // 1. ENGLISH (DEFAULT)
  // ==========================================
  en: {
    appName: 'SANGYAN KAVACH',
    appBadge: 'KAVACH',
    tagline: 'AI-Powered Investor Safety & Financial Deception Defense',
    initiativeBar: 'National Investor Resilience Initiative · SEBI × NSDL × IIT (BHU) SANGYAN',
    edgePrivacyActive: 'Edge Privacy Redaction Active',
    helpline: 'Helpline: 1930',
    verifyContentNav: 'Verify Content',
    literacyNav: 'Investor Literacy',
    guardrailsNav: 'Guardrails & Privacy',
    beforeYouInvest: 'Before You Invest, Verify.',
    heroSubtext: 'Check suspicious investment messages, links and financial claims before money changes hands.',
    heroBadgeText: 'SANGYAN KAVACH - सुरक्षा कवच',
    heroHeadingLine1: 'Understand Fraud & Scam',
    heroHeadingLine2: 'Before You Fall Victim.',
    heroSubtitle: 'Be aware. Stay alert. Learn how to identify fake messages, suspicious links and common financial scams before they cause harm.',
    pillRealLife: 'Real-life Examples',
    pillFraudTips: 'Fraud Awareness Tips',
    pillDigitalHabits: 'Safer Digital Habits',
    trustEvidence: 'Evidence-first',
    trustPrivacy: 'Privacy-conscious (No PII stored)',
    trustNoAdvice: 'No investment recommendations',
    checkMessageBtn: 'CHECK A MESSAGE',
    checkLinkBtn: 'CHECK A LINK',
    uploadScreenshotBtn: 'UPLOAD SCREENSHOT',
    testScenariosTitle: 'Official Hackathon Test Scenarios',
    oneClickEval: '1-Click Evaluation',
    messageLabel: 'Message Content (WhatsApp / Telegram / SMS):',
    messagePlaceholder: 'Paste suspicious text here (e.g. "Guaranteed 300% profit in 48 hours on SME IPO. Transfer ₹25,000 to personal UPI...")',
    linkPlaceholder: 'https://zerodha-rekyc-update.vip/portal or http://nsdl-ipo-allotment.online',
    verifyButton: 'Verify Content',
    verifyDomainButton: 'Verify Domain',
    verifyScreenshotButton: 'Verify Screenshot',
    uploadBoxTitle: 'Upload WhatsApp / Telegram screenshot or certificate',
    uploadBoxSubtitle: 'Supports PNG, JPG, JPEG, WEBP (Max 5MB). On-device verification inspects claims without leaking personal data.',
    riskAssessmentTitle: 'RISK ASSESSMENT',
    whyTitle: 'Why?',
    whySubtitle: 'Independent evaluation across 6 critical deception vectors.',
    whatWeCouldVerifyTitle: 'WHAT WE COULD VERIFY',
    whatWeCouldNotVerifyTitle: 'WHAT WE COULD NOT VERIFY',
    whatShouldYouDoNowTitle: 'WHAT SHOULD YOU DO NOW?',
    whatShouldYouDoNowSubtitle: 'Immediate precautionary steps to safeguard your capital and protect credentials.',
    understandSimpleLanguage: 'Understand in Simple Language',
    listenAudioBtn: 'Listen in Audio',
    stopAudioBtn: 'Stop Audio',
    desiAnalogyTitle: 'Grassroots Everyday Analogy:',
    emergencyCallBtn: 'Emergency Helpline: 1930',
    complaintDraftBtn: 'Prepare Formal Complaint Draft (SEBI SCORES)',
    checkAnotherBtn: 'Check Another Message / Link',
    inspectedVia: 'Inspected via:',
    viewInputBtn: 'View Input',
    hideInputBtn: 'Hide Input',
    analyzingTitle: 'Analyzing Content Against Regulatory Evidence',
    analyzingSubtitle: 'Authentic multi-stage verification against public registries and known scam typologies.',
    stages: {
      reading: 'Reading content & sanitizing personal data in-memory',
      extracting: 'Extracting financial claims, promised returns & tokens',
      checking: 'Cross-checking evidence with SEBI registries and broker whitelists',
      analyzing: 'Analyzing deception patterns, FOMO & urgency pressure',
      preparing: 'Preparing evidence-calibrated report & regional audio explanation'
    }
  },

  // ==========================================
  // 2. HINDI (हिन्दी)
  // ==========================================
  hi: {
    appName: 'संज्ञान कवच',
    appBadge: 'कवच',
    tagline: 'वित्तीय जालसाजी व भ्रामक दावों से निवेशक सुरक्षा',
    initiativeBar: 'राष्ट्रीय निवेशक संरक्षण पहल · SEBI × NSDL × IIT (BHU) SANGYAN',
    edgePrivacyActive: 'व्यक्तिगत जानकारी की ऑन-डिवाइस सुरक्षा सक्रिय',
    helpline: 'हेल्पलाइन: 1930',
    verifyContentNav: 'सामग्री जांचें',
    literacyNav: 'निवेशक शिक्षा',
    guardrailsNav: 'नियम व गोपनीयता',
    beforeYouInvest: 'निवेश से पहले, स्वतंत्र जांच।',
    heroSubtext: 'पैसे ट्रांसफर करने से पहले संदिग्ध निवेश संदेशों, लिंक्स और वित्तीय दावों की साक्ष्य-आधारित पड़ताल करें।',
    heroBadgeText: 'संज्ञान कवच - सुरक्षा कवच',
    heroHeadingLine1: 'धोखाधड़ी और जालसाजी को समझें',
    heroHeadingLine2: 'शिकार होने से पहले।',
    heroSubtitle: 'सावधान रहें। सतर्क रहें। वित्तीय नुकसान से पहले फर्जी संदेशों, संदिग्ध लिंक्स और आम धोखाधड़ी के तौर-तरीकों को पहचानना सीखें।',
    pillRealLife: 'वास्तविक जीवन के उदाहरण',
    pillFraudTips: 'धोखाधड़ी रोकथाम सुझाव',
    pillDigitalHabits: 'सुरक्षित डिजिटल आदतें',
    trustEvidence: 'साक्ष्य-आधारित जांच',
    trustPrivacy: 'गोपनीयता सुरक्षित (कोई डेटा स्टोर नहीं)',
    trustNoAdvice: 'कोई शेयर खरीदने/बेचने की सलाह नहीं',
    checkMessageBtn: 'CHECK A MESSAGE',
    checkLinkBtn: 'CHECK A LINK',
    uploadScreenshotBtn: 'UPLOAD SCREENSHOT',
    testScenariosTitle: 'त्वरित डेमो परीक्षण परिदृश्य',
    oneClickEval: '1-क्लिक में जांचें',
    messageLabel: 'संदेश सामग्री (व्हाट्सएप / टेलीग्राम / एसएमएस):',
    messagePlaceholder: 'संदेश यहाँ पेस्ट करें (उदा. "SEBI Registered VIP Jackpot: 300% निश्चित मुनाफा 2 दिन में...")',
    linkPlaceholder: 'https://zerodha-rekyc-update.vip/portal या http://nsdl-ipo-allotment.online',
    verifyButton: 'जांच शुरू करें',
    verifyDomainButton: 'लिंक सत्यापित करें',
    verifyScreenshotButton: 'स्क्रीनशॉट की जांच करें',
    uploadBoxTitle: 'स्क्रीनशॉट या सर्टिफिकेट इमेज चुनें',
    uploadBoxSubtitle: 'PNG, JPG, WEBP समर्थित (अधिकतम 5 MB)। ऑन-डिवाइस स्कैन बिना डेटा लीक किए सामग्री की जांच करता है।',
    riskAssessmentTitle: 'सुरक्षा मूल्यांकन',
    whyTitle: 'क्यों? (विस्तृत साक्ष्य विश्लेषण)',
    whySubtitle: '6 प्रमुख धोखाधड़ी आयामों (पहचान, लिंक, भाषा, हड़बड़ी, भुगतान व सेबी मुहर) की स्वतंत्र स्थिति।',
    whatWeCouldVerifyTitle: 'हम क्या सत्यापित कर सके',
    whatWeCouldNotVerifyTitle: 'हम क्या सत्यापित नहीं कर सके',
    whatShouldYouDoNowTitle: 'अब आपको क्या करना चाहिए?',
    whatShouldYouDoNowSubtitle: 'वित्तीय नुकसान और व्यक्तिगत डेटा चोरी से बचने के लिए तुरंत उठाए जाने वाले कदम।',
    understandSimpleLanguage: 'आसान भाषा में समझें',
    listenAudioBtn: 'हिंदी में सुनें (Listen in Audio)',
    stopAudioBtn: 'आवाज़ रोकें (Stop)',
    desiAnalogyTitle: 'देसी उदाहरण (गांव-देहात का रोजमर्रा उदाहरण):',
    emergencyCallBtn: 'आपातकालीन कॉल: 1930',
    complaintDraftBtn: 'शिकायत ड्राफ्ट देखें (SEBI SCORES)',
    checkAnotherBtn: 'नई सामग्री जांचें',
    inspectedVia: 'जांच माध्यम:',
    viewInputBtn: 'इनपुट देखें',
    hideInputBtn: 'इनपुट छिपाएं',
    analyzingTitle: 'सामग्री का निष्पक्ष विश्लेषण जारी है',
    analyzingSubtitle: 'नियमों और साक्ष्यों के आधार पर निष्पक्ष बहु-स्तरीय जांच।',
    stages: {
      reading: 'सामग्री पढ़ी जा रही है व व्यक्तिगत जानकारी हटाई जा रही है',
      extracting: 'दावे, निश्चित मुनाफ़ा और टोकन निकाले जा रहे हैं',
      checking: 'सेबी मास्टर रजिस्टर और आधिकारिक ब्रोकर सूची से मिलान',
      analyzing: 'हड़बड़ी, पम्प-एंड-डंप और धोखे के पैटर्न का विश्लेषण',
      preparing: 'साक्ष्य रिपोर्ट और क्षेत्रीय ऑडियो स्पष्टीकरण तैयार'
    }
  },

  // ==========================================
  // 3. BENGALI (বাংলা)
  // ==========================================
  bn: {
    appName: 'সংজ্ঞান কবচ',
    appBadge: 'কবচ',
    tagline: 'এআই-ভিত্তিক বিনিয়োগকারী সুরক্ষা ও প্রতারণা প্রতিরোধ',
    initiativeBar: 'জাতীয় বিনিয়োগকারী সুরক্ষা উদ্যোগ · SEBI × NSDL × IIT (BHU) SANGYAN',
    edgePrivacyActive: 'অন-ডিভাইস গোপনীয়তা সুরক্ষা সক্রিয়',
    helpline: 'হেল্পলাইন: ১৯৩০',
    verifyContentNav: 'যাচাই করুন',
    literacyNav: 'বিনিয়োগ শিক্ষা',
    guardrailsNav: 'নিয়ম ও গোপনীয়তা',
    beforeYouInvest: 'বিনিয়োগ করার আগে, যাচাই করুন।',
    heroSubtext: 'টাকা পাঠানোর আগে সন্দেহজনক বিনিয়োগ বার্তা, লিংক এবং আর্থিক দাবির প্রমাণ-ভিত্তিক সত্যতা যাচাই করুন।',
    heroBadgeText: 'সংজ্ঞান কবচ - সুরক্ষা কবচ',
    heroHeadingLine1: 'প্রতারণা ও জালিয়াতি বুঝুন',
    heroHeadingLine2: 'শিকার হওয়ার আগেই।',
    heroSubtitle: 'সচেতন থাকুন। সতর্ক থাকুন। আর্থিক ক্ষতি হওয়ার আগেই ভুয়া বার্তা, সন্দেহজনক লিংক এবং সাধারণ আর্থিক প্রতারণা শনাক্ত করতে শিখুন।',
    pillRealLife: 'বাস্তব জীবনের উদাহরণ',
    pillFraudTips: 'প্রতারণা সচেতনতা টিপস',
    pillDigitalHabits: 'নিরাপদ ডিজিটাল অভ্যাস',
    trustEvidence: 'প্রমাণ-ভিত্তিক যাচাই',
    trustPrivacy: 'গোপনীয়তা সুরক্ষিত (কোনো তথ্য সংরক্ষণ করা হয় না)',
    trustNoAdvice: 'শেয়ার কেনা-বেচার পরামর্শ নেই',
    checkMessageBtn: 'CHECK A MESSAGE',
    checkLinkBtn: 'CHECK A LINK',
    uploadScreenshotBtn: 'UPLOAD SCREENSHOT',
    testScenariosTitle: 'অফিসিয়াল ডেমো পরীক্ষা পরিস্থিতি',
    oneClickEval: '১-ক্লিকে যাচাই',
    messageLabel: 'বার্তার বিষয়বস্তু (হোয়াটসঅ্যাপ / টেলিগ্রাম / এসএমএস):',
    messagePlaceholder: 'সন্দেহজনক বার্তা এখানে পেস্ট করুন (যেমন "SEBI Registered VIP: ৩ দিনে ৩০০% নিশ্চিত লাভ...")',
    linkPlaceholder: 'https://zerodha-rekyc-update.vip/portal বা http://nsdl-ipo-allotment.online',
    verifyButton: 'যাচাই শুরু করুন',
    verifyDomainButton: 'ওয়েবসাইট লিংক যাচাই',
    verifyScreenshotButton: 'স্ক্রিনশট যাচাই করুন',
    uploadBoxTitle: 'স্ক্রিনশট বা সার্টিফিকেটের ছবি নির্বাচন করুন',
    uploadBoxSubtitle: 'PNG, JPG, WEBP সমর্থিত (সর্বোচ্চ ৫ MB)। কোনো তথ্য ফাঁদ ছাড়াই আপনার ডিভাইসেই যাচাই সম্পন্ন হয়।',
    riskAssessmentTitle: 'ঝুঁকি মূল্যায়ন',
    whyTitle: 'কেন? (প্রমাণ বিশ্লেষণ)',
    whySubtitle: '৬টি প্রধান প্রতারণা নির্দেশকের (পরিচয়, লিংক, ভাষা, তাড়া, পেমেন্ট ও সেবি অনুমোদন) নিরপেক্ষ মূল্যায়ন।',
    whatWeCouldVerifyTitle: 'আমরা যা যাচাই করতে পেরেছি',
    whatWeCouldNotVerifyTitle: 'যা যাচাই করা সম্ভব হয়নি',
    whatShouldYouDoNowTitle: 'এখন আপনার কী করা উচিত?',
    whatShouldYouDoNowSubtitle: 'আর্থিক ক্ষতি ও তথ্য চুরি থেকে বাঁচতে অবিলম্বে এই সতর্কতাগুলো অনুসরণ করুন।',
    understandSimpleLanguage: 'সহজ ভাষায় বুঝুন',
    listenAudioBtn: 'বাংলায় শুনুন (Listen in Audio)',
    stopAudioBtn: 'শব্দ বন্ধ করুন',
    desiAnalogyTitle: 'সহজ গ্রামীণ উদাহরণ:',
    emergencyCallBtn: 'জরুরি হেল্পলাইন: ১৯৩০',
    complaintDraftBtn: 'অভিযোগের খসড়া তৈরি করুন (SEBI SCORES)',
    checkAnotherBtn: 'নতুন বার্তা বা লিংক যাচাই করুন',
    inspectedVia: 'যাচাইকরণ মোড:',
    viewInputBtn: 'ইনপুট দেখুন',
    hideInputBtn: 'ইনপুট লুকান',
    analyzingTitle: 'নিয়ন্ত্রক প্রমাণের ভিত্তিতে নিরপেক্ষ বিশ্লেষণ চলছে',
    analyzingSubtitle: 'সরকারি মাস্টার রেজিস্ট্রি ও প্রতারণার ধরনের সাথে সরাসরি তথ্য মেলানো হচ্ছে।',
    stages: {
      reading: 'বিষয়বস্তু পড়া হচ্ছে এবং ব্যক্তিগত তথ্য মুছে ফেলা হচ্ছে',
      extracting: 'আর্থিক দাবি, রিটার্ন এবং রেজিস্ট্রেশন নম্বর শনাক্ত করা হচ্ছে',
      checking: 'সেবি রেজিস্টার ও অনুমোদিত ব্রোকার তালিকার সাথে মেলানো হচ্ছে',
      analyzing: 'তাড়া, ভয় এবং পঞ্জি প্রতারণার প্যাটার্ন বিশ্লেষণ করা হচ্ছে',
      preparing: 'প্রমাণিত রিপোর্ট এবং আঞ্চলিক অডিও প্রস্তুত হচ্ছে'
    }
  },

  // ==========================================
  // 4. ASSAMESE (অসমীয়া)
  // ==========================================
  as: {
    appName: 'সংজ্ঞান কৱচ',
    appBadge: 'কৱচ',
    tagline: 'এআই-আধাৰিত বিনিয়োগকাৰী সুৰক্ষা আৰু প্ৰতাৰণা প্ৰতিৰোধ',
    initiativeBar: 'ৰাষ্ট্ৰীয় বিনিয়োগকাৰী সুৰক্ষা পদক্ষেপ · SEBI × NSDL × IIT (BHU) SANGYAN',
    edgePrivacyActive: 'অন-ডিভাইচ গোপনীয়তা সুৰক্ষা সক্ৰিয়',
    helpline: 'হেল্পলাইন: ১৯৩০',
    verifyContentNav: 'পৰীক্ষা কৰক',
    literacyNav: 'বিনিয়োগ শিক্ষা',
    guardrailsNav: 'নিয়ম আৰু গোপনীয়তা',
    beforeYouInvest: 'বিনিয়োগ কৰাৰ পূৰ্বে, নিশ্চিত হওক।',
    heroSubtext: 'ধন হস্তান্তৰ কৰাৰ পূৰ্বে সন্দেহজনক বিনিয়োগ বাৰ্তা, লিংক আৰু বিত্তীয় দাবীৰ প্ৰমাণ-ভিত্তিক সত্যতা পৰীক্ষা কৰক।',
    heroBadgeText: 'সংজ্ঞান কৱচ - সুৰক্ষা কৱচ',
    heroHeadingLine1: 'প্ৰতাৰণা আৰু জালিয়াতি বুজি লওক',
    heroHeadingLine2: 'বলি হোৱাৰ পূৰ্বে।',
    heroSubtitle: 'সজাগ থাকক। সতৰ্ক হওক। ক্ষতি হোৱাৰ পূৰ্বেই ভুৱা বাৰ্তা, সন্দেহজনক লিংক আৰু সাধাৰণ বিত্তীয় প্ৰতাৰণা চিনাক্ত কৰিবলৈ শিকক।',
    pillRealLife: 'বাস্তৱ জীৱনৰ উদাহৰণ',
    pillFraudTips: 'প্ৰতাৰণা সজাগতাৰ টিপছ',
    pillDigitalHabits: 'সুৰক্ষিত ডিজিটেল অভ্যাস',
    trustEvidence: 'প্ৰমাণ-ভিত্তিক পৰীক্ষণ',
    trustPrivacy: 'গোপনীয়তা সুৰক্ষিত (কোনো তথ্য সংৰক্ষণ নহয়)',
    trustNoAdvice: 'কোনো শ্বেয়াৰ ক্ৰয়-বিক্ৰয়ৰ পৰামৰ্শ নাই',
    checkMessageBtn: 'CHECK A MESSAGE',
    checkLinkBtn: 'CHECK A LINK',
    uploadScreenshotBtn: 'UPLOAD SCREENSHOT',
    testScenariosTitle: 'আনুষ্ঠানিক ডেমো পৰীক্ষা পৰিস্থিতি',
    oneClickEval: '১-ক্লিকত পৰীক্ষা',
    messageLabel: 'বাৰ্তাৰ বিষয়বস্তু (হোৱাটছএপ / টেলিগ্ৰাম / এছএমএছ):',
    messagePlaceholder: 'সন্দেহজনক বাৰ্তা ইয়াত পেষ্ট কৰক (যেনে "SEBI Registered VIP: ৩ দিনত ৩০০% নিশ্চিত লাভ...")',
    linkPlaceholder: 'https://zerodha-rekyc-update.vip/portal বা http://nsdl-ipo-allotment.online',
    verifyButton: 'পৰীক্ষণ আৰম্ভ কৰক',
    verifyDomainButton: 'ৱেবছাইট লিংক পৰীক্ষা',
    verifyScreenshotButton: 'স্ক্ৰিনশ্বট পৰীক্ষা কৰক',
    uploadBoxTitle: 'স্ক্ৰিনশ্বট বা প্ৰমাণপত্ৰৰ ছবি বাছক',
    uploadBoxSubtitle: 'PNG, JPG, WEBP সমৰ্থিত (সৰ্বোচ্চ ৫ MB)। কোনো ব্যক্তিগত তথ্য সংগ্ৰহ নকৰাকৈ ডিভাইচতে পৰীক্ষা সম্পন্ন হয়।',
    riskAssessmentTitle: 'বিপদ মূল্যায়ন',
    whyTitle: 'কিয়? (প্ৰমাণ বিশ্লেষণ)',
    whySubtitle: '৬টা প্ৰধান প্ৰতাৰণা লক্ষণৰ (পৰিচয়, লিংক, ভাষা, জৰুৰী চাপ, ধন পৰিশোধ আৰু সেবিৰ অনুমোদন) নিৰপেক্ষ মূল্যায়ন।',
    whatWeCouldVerifyTitle: 'আমি যি নিশ্চিত কৰিব পাৰিলোঁ',
    whatWeCouldNotVerifyTitle: 'যি নিশ্চিত কৰিব পৰা নগ\'ল',
    whatShouldYouDoNowTitle: 'এতিয়া আপুনি কি কৰা উচিত?',
    whatShouldYouDoNowSubtitle: 'বিত্তীয় ক্ষতি আৰু তথ্য চুৰিৰ পৰা ৰক্ষা পাবলৈ তৎকালে এই সাৱধানতাসমূহ লওক।',
    understandSimpleLanguage: 'সহজ ভাষাত বুজি লওক',
    listenAudioBtn: 'অসমীয়াত শুনক (Listen in Audio)',
    stopAudioBtn: 'শব্দ বন্ধ কৰক',
    desiAnalogyTitle: 'দৈনন্দিন জীৱনৰ সহজ উদাহৰণ:',
    emergencyCallBtn: 'জৰুৰী হেল্পলাইন: ১৯৩০',
    complaintDraftBtn: 'অভিযোগৰ খচৰা প্ৰস্তুত কৰক (SEBI SCORES)',
    checkAnotherBtn: 'নতুন বাৰ্তা বা লিংক পৰীক্ষা কৰক',
    inspectedVia: 'পৰীক্ষণ মাধ্যম:',
    viewInputBtn: 'ইনপুট চাওক',
    hideInputBtn: 'ইনপুট লুকুৱাওক',
    analyzingTitle: 'নিয়ন্ত্ৰক প্ৰমাণৰ ভিত্তিত নিৰপেক্ষ বিশ্লেষণ চলি আছে',
    analyzingSubtitle: 'চৰকাৰী মাষ্টাৰ ৰেজিষ্ট্ৰী আৰু প্ৰতাৰণাৰ পদ্ধতিৰ সৈতে তথ্য মিলোৱা হৈছে।',
    stages: {
      reading: 'বিষয়বস্তু পঢ়া হৈছে আৰু ব্যক্তিগত তথ্য আঁতৰোৱা হৈছে',
      extracting: 'বিত্তীয় দাবী, লাভৰ প্ৰতিশ্ৰুতি আৰু পঞ্জীয়ন নম্বৰ চিনাক্তকৰণ',
      checking: 'সেবিৰ ৰেজিষ্টাৰ আৰু অনুমোদিত ব্ৰ\'কাৰ তালিকাৰ সৈতে মিলোৱা হৈছে',
      analyzing: 'জৰুৰী চাপ, ভয় আৰু ভুৱা প্ৰতাৰণাৰ কৌশল বিশ্লেষণ কৰা হৈছে',
      preparing: 'প্ৰমাণিত প্ৰতিবেদন আৰু আঞ্চলিক অডিঅ\' প্ৰস্তুত কৰা হৈছে'
    }
  }
};
