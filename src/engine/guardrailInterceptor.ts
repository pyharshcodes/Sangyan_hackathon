export interface GuardrailCheckResult {
  isProhibited: boolean;
  category?: 'STOCK_RECOMMENDATION' | 'PRICE_PREDICTION' | 'GUARANTEED_DEMAND' | 'BROKER_RECOMMENDATION' | 'TIP_SERVICE';
  reason: string;
  reasonHi: string;
  reasonBn: string;
  reasonAs: string;
  guidance: string;
  guidanceHi: string;
  guidanceBn: string;
  guidanceAs: string;
}

export function evaluateGuardrailQuery(input: string): GuardrailCheckResult {
  if (!input || typeof input !== 'string') {
    return {
      isProhibited: false,
      reason: '',
      reasonHi: '',
      reasonBn: '',
      reasonAs: '',
      guidance: '',
      guidanceHi: '',
      guidanceBn: '',
      guidanceAs: ''
    };
  }

  const lower = input.toLowerCase().trim();

  // 1. Stock / Asset Recommendation Requests
  const stockRecEnglish = /\b(should\s+i\s+(buy|sell|invest)|which\s+(stock|share|crypto|coin|mutual\s*fund|asset)\s+(to|should\s+i)\s+(buy|invest)|what\s+stock\s+to\s+buy|suggest\s+(me\s+)?(a\s+)?(stock|share|portfolio)|best\s+(penny\s+)?(stocks|shares)\s+to\s+buy|share\s+tips|stock\s+tips|which\s+share\s+should\s+i\s+buy)\b/i;
  const stockRecIndic = /(क्या\s+(मुझे|हम)\s+.*(खरीदना|बेचना|निवेश|लें|खरीदें)|कौन\s*सा\s*(शेयर|स्टॉक)\s*(खरीदें|लें|खरीदूं)|शेयर\s+(खरीदूं|खरीदना\s*चाहिए)|কোন\s*(শেয়ার|স্টক)\s*কিনব|কিনা\s*উচিত|কোনটো\s*শ্বেয়াৰ\s*কিনিম|কিনিব\s*লাগে\s*নেকি)/iu;

  if (stockRecEnglish.test(lower) || stockRecIndic.test(lower)) {
    return {
      isProhibited: true,
      category: 'STOCK_RECOMMENDATION',
      reason: 'SANGYAN KAVACH does not provide buy, sell, or hold stock recommendations.',
      reasonHi: 'संज्ञान कवच किसी भी शेयर को खरीदने, बेचने या रखने की सलाह नहीं देता।',
      reasonBn: 'সংজ্ঞান কবচ কোনো শেয়ার কেনা, বেচা বা ধরে রাখার পরামর্শ দেয় না।',
      reasonAs: 'সংজ্ঞান কৱচ-এ কোনো শ্বেয়াৰ ক্ৰয়, বিক্ৰী বা ৰখাৰ পৰামৰ্শ নিদিয়ে।',
      guidance: 'Under SEBI (Investment Advisers) Regulations, 2013, only certified SEBI-Registered Investment Advisers (RIAs) can provide personalized recommendations based on your risk profile. Never trade based on unsolicited tips or unverified social media claims.',
      guidanceHi: 'सेबी नियमों के तहत केवल पंजीकृत सलाहकार (RIA) ही निवेश सलाह दे सकते हैं। किसी भी अपुष्ट सोशल मीडिया टिप या ग्रुप के आधार पर कभी पैसे न लगाएं।',
      guidanceBn: 'সেবি নিয়মাবলীর অধীনে केवल অনুমোদিত উপদেষ্টা (RIA) ব্যক্তিগত পরামর্শ দিতে পারেন। অপরিচিত কোনো সোশ্যাল মিডিয়া টিপসে ভরসা করবেন না।',
      guidanceAs: 'সেবিৰ নিয়ম অনুসৰি কেৱল অনুমোদিত উপদেষ্টা (RIA)-এ ব্যক্তিগত পৰামৰ্শ দিব পাৰে। কোনো অচিনাকি ছ\'চিয়েল মিডিয়া টিপছত বিশ্বাস নকৰিব।'
    };
  }

  // 2. Price Prediction & Market Direction Requests
  const pricePredEnglish = /\b(will\s+(this\s+)?(stock|share|nifty|banknifty|market)\s+(go\s+up|rise|fall|crash|double|reach|hit)|target\s+price\s+of|price\s+prediction|tomorrow('s)?\s+(target|gap\s*up|gap\s*down))\b/i;
  const pricePredIndic = /(क्या\s+.*(शेयर|स्टॉक|मार्केट|निफ्टी)\s*(ऊपर|नीचे|गिरेगा|बढ़ेगा)|टारगेट\s*प्राइस|भाव\s*(बढ़ेगा|गिरेगा)|দাম\s*বাড়বে\s*কিনা|দাম\s*বাঢ়িবনে|দাম\s*কিমান\s*হব)/iu;

  if (pricePredEnglish.test(lower) || pricePredIndic.test(lower)) {
    return {
      isProhibited: true,
      category: 'PRICE_PREDICTION',
      reason: 'SANGYAN KAVACH does not forecast market movements, target prices, or index levels.',
      reasonHi: 'संज्ञान कवच शेयर बाज़ार की भविष्यवाणियां या टारगेट प्राइस नहीं देता।',
      reasonBn: 'সংজ্ঞান কবচ বাজারের ভবিষ্যৎবাণী বা শেয়ারের টার্গেট মূল্য নির্ধারণ করে না।',
      reasonAs: 'সংজ্ঞান কৱচ-এ বজাৰৰ ভৱিষ্যদ্বাণী বা লক্ষ্য মূল্য নিৰ্ধাৰণ নকৰে।',
      guidance: 'Equity markets are inherently subject to market fluctuations. Any individual or group claiming "certain" price targets or guaranteed upper circuits is violating SEBI code of conduct.',
      guidanceHi: 'शेयर बाज़ार में कोई भी निश्चित भविष्यवाणी नहीं कर सकता। निश्चित अपर सर्किट का दावा करने वाले ठग हो सकते हैं।',
      guidanceBn: 'শেয়ার বাজারে निश्चित ভবিষ্যৎবাণী করা অসম্ভব। নিশ্চিত মুনাফার দাবিদাররা প্রতারক হতে পারে।',
      guidanceAs: 'শ্বেয়াৰ বজাৰত নিশ্চিত ভৱিষ্যদ্বাণী অসম্ভৱ। নিশ্চিত লাভৰ দাবী কৰা ব্যক্তি প্ৰতাৰক হ\'ব পাৰে।'
    };
  }

  // 3. Guaranteed Investment Requests
  const guaranteeDemandEnglish = /\b(give\s+me\s+(a\s+)?guaranteed\s+(investment|return|profit)|fixed\s+return\s+scheme|100%\s+safe\s+investment\s+with\s+high\s+return)\b/i;
  const guaranteeDemandIndic = /(निश्चित\s*मुनाफे\s*वाली\s*(योजना|स्कीम)|गंभीर\s*मुनाफ़ा\s*की\s*गारंटी|गारंटीड\s*(रिटर्न|मुनाफा)|निশ্চিত\s*লাভের\s*স্কিম|निশ্চিত\s*লাভৰ\s*আঁচনি)/iu;

  if (guaranteeDemandEnglish.test(lower) || guaranteeDemandIndic.test(lower)) {
    return {
      isProhibited: true,
      category: 'GUARANTEED_DEMAND',
      reason: 'Regulated capital markets do not offer guaranteed high returns.',
      reasonHi: 'नियामक शेयर बाज़ार में कोई निश्चित उच्च मुनाफे की गारंटी नहीं होती।',
      reasonBn: 'অনুমোদিত শেয়ার বাজারে কোনো নির্দিষ্ট उच्च লাভের গ্যারান্টি নেই।',
      reasonAs: 'নিয়ন্ত্ৰিত শ্বেয়াৰ বজাৰত কোনো নিশ্চিত উচ্চ লাভৰ গেৰাণ্টি নাথাকে।',
      guidance: 'SEBI and RBI guidelines strictly forbid registered intermediaries from promising fixed or guaranteed returns on market-linked securities. Schemes promising 30%–300% guaranteed returns are almost invariably Ponzi schemes or advance-fee scams.',
      guidanceHi: 'सेबी और आरबीआई के नियम शेयर बाज़ार में फिक्स रिटर्न की गारंटी देने से मना करते हैं। 30% से 300% गारंटी वाले ऑफर पोंजी स्कीम होते हैं।',
      guidanceBn: 'সেবি কোনো ফিক্সড রিটার্নের প্রতিশ্রুতি নিষিদ্ধ করেছে। অস্বাভাবিক লাভের প্রতিশ্রুতি পঞ্জি স্কিমের লক্ষণ।',
      guidanceAs: 'সেবিয়ে কোনো নিশ্চিত লাভৰ প্ৰতিশ্ৰুতি নিষিদ্ধ কৰিছে। অস্বাভাৱিক লাভৰ প্ৰতিশ্ৰুতি প্ৰতাৰণাৰ লক্ষণ।'
    };
  }

  // 4. Broker / Commercial Entity Recommendation Requests
  const brokerRecEnglish = /\b(recommend\s+(a\s+)?(broker|trading\s+app|platform)|which\s+broker\s+(is\s+best|should\s+i\s+use)|best\s+(demat\s+account|trading\s+app)|is\s+zerodha\s+better\s+than|groww\s+vs\s+angel)\b/i;
  const brokerRecIndic = /(कौन\s*सा\s*(ब्रोकर|ऐप)\s*(अच्छा|बेस्ट|सही)\s*है|ब्रोकर\s*सुझाएं|কোন\s*ব্রোকার\s*ভালো|কোনটো\s*(ব্ৰ'কাৰ|ব্ৰোকাৰ)\s*ভাল)/iu;

  if (brokerRecEnglish.test(lower) || brokerRecIndic.test(lower)) {
    return {
      isProhibited: true,
      category: 'BROKER_RECOMMENDATION',
      reason: 'SANGYAN KAVACH is a public-good utility and maintains strict commercial neutrality.',
      reasonHi: 'संज्ञान कवच एक निष्पक्ष सार्वजनिक पहल है और किसी भी व्यावसायिक ब्रोकर या ऐप की सिफारिश नहीं करता।',
      reasonBn: 'সংজ্ঞান কবচ একটি নিরপেক্ষ জনস্বার্থমূলক প্ল্যাটফর্ম এবং কোনো বাণিজ্যিক ব্রোকারের সুপারিশ করে না।',
      reasonAs: 'সংজ্ঞান কৱচ এক নিৰপেক্ষ ৰাজহুৱা পদক্ষেপ আৰু কোনো বাণিজ্যিক ব্ৰ\'কাৰৰ পোষকতা নকৰে।',
      guidance: 'We do not partner with or endorse any brokerage house. You can independently verify any broker’s SEBI registration number (INZ series) on the official SEBI directory (sebi.gov.in) or NSE/BSE member registries.',
      guidanceHi: 'हम किसी ब्रोकर का प्रचार नहीं करते। आप सेबी की वेबसाइट (sebi.gov.in) पर जाकर किसी भी ब्रोकर का रजिस्ट्रेशन नंबर (INZ) स्वतंत्र रूप से जांच सकते हैं।',
      guidanceBn: 'আমরা কোনো ব্রোকারের অনুমোদন দিই না। সেবির ওয়েবসাইটে গিয়ে যেকোনো ব্রোকারের বৈধতা নিজে যাচাই করুন।',
      guidanceAs: 'আমি কোনো ব্ৰ\'কাৰৰ প্ৰচাৰ নকৰোঁ। সেবিৰ ৱেবছাইটত গৈ ব্ৰ\'কাৰৰ বৈধতা নিজে পৰীক্ষা কৰক।'
    };
  }

  // 5. Tip Service / VIP Group Demands
  const tipServiceEnglish = /\b(give\s+me\s+(stock|trading|intraday|jackpot)\s+tips|telegram\s+(channel|group)\s+for\s+trading|vip\s+calls|free\s+tips)\b/i;
  const tipServiceIndic = /(टिप्स\s*चाहिए|ट्रेडिंग\s*ग्रुप|शेयर\s*टिप्स|টিপস\s*চাই|টিপছ\s*লাগে)/iu;

  if (tipServiceEnglish.test(lower) || tipServiceIndic.test(lower)) {
    return {
      isProhibited: true,
      category: 'TIP_SERVICE',
      reason: 'Unregistered advisory groups operating via Telegram/WhatsApp are illegal under SEBI regulations.',
      reasonHi: 'टेलीग्राम या व्हाट्सएप पर चलने वाले गैर-पंजीकृत टिप्स ग्रुप सेबी नियमों के अनुसार अवैध हैं।',
      reasonBn: 'টেলিগ্রাম বা হোয়াটসঅ্যাপে পরিচালিত অনুমোদনহীন টিপস গ্রুপ সম্পূর্ণ বেআইনি।',
      reasonAs: 'টেলিগ্ৰাম বা হোৱাটছএপত চলা অনুমোদনহীন টিপছ গোটসমূহ সম্পূৰ্ণ বেআইনী।',
      guidance: 'SEBI strictly prohibits financial advisory without registration. Operating or following unauthorized "VIP Upper Circuit" tip channels frequently leads to sudden capital loss via pump-and-dump market manipulation.',
      guidanceHi: 'बिना सेबी पंजीकरण के टिप्स देना गैर-कानूनी है। ऐसे ग्रुप अक्सर पंप-एंड-डंप धोखाधड़ी के लिए बनाए जाते हैं।',
      guidanceBn: 'সেবি অনুমোদন ছাড়া টিপস দেওয়া শাস্তিযোগ্য অপরাধ। এসব গ্রুপের ফাঁদে পা দেবেন না।',
      guidanceAs: 'সেবিৰ অনুমোদন অবিহনে টিপছ দিয়াটো অপৰাধ। এনে গোটৰ প্ৰলোভনত ভৰি নিদিব।'
    };
  }

  return {
    isProhibited: false,
    reason: '',
    reasonHi: '',
    reasonBn: '',
    reasonAs: '',
    guidance: '',
    guidanceHi: '',
    guidanceBn: '',
    guidanceAs: ''
  };
}
