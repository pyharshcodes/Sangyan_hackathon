import React, { useState } from 'react';
import { HelpCircle, ChevronRight, MessageSquare, AlertTriangle, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface SocraticDoubtResolverProps {
  lang: SupportedLanguage;
}

interface FAQItem {
  id: string;
  question: string;
  questionHi: string;
  questionBn: string;
  questionAs: string;
  answer: string;
  answerHi: string;
  answerBn: string;
  answerAs: string;
  tag: string;
  tagHi: string;
  tagBn: string;
  tagAs: string;
  actionText?: string;
  actionUrl?: string;
}

const COMMON_INVESTOR_DOUBTS: FAQItem[] = [
  {
    id: 'friend-got-withdrawal',
    question: 'My friend withdrew ₹2,000 from this app. How can it still be a scam?',
    questionHi: 'मेरे दोस्त को ₹2,000 का विड्रॉल मिला था, फिर यह फ्रॉड कैसे हो सकता है?',
    questionBn: 'আমার বন্ধু এই অ্যাপ থেকে ₹২,০০০ তুলতে পেরেছিল। তবে এটি কীভাবে জালিয়াতি হতে পারে?',
    questionAs: 'মোৰ বন্ধুৱে এই এপৰ পৰা ₹২,০০০ লাভ কৰিছিল। তেন্তে এইটো কেনেকৈ প্ৰতাৰণা হ\'ব পাৰে?',
    tag: 'Ponzi Bait Psychology',
    tagHi: 'पोंजी बैट साइकोलॉजी',
    tagBn: 'পঞ্জি টোপ ফাঁদ',
    tagAs: 'পঞ্জি প্ৰতাৰণা কৌশল',
    answer: 'This is the classic "Ponzi Bait" tactic. Scammers deliberately allow small initial withdrawals (₹500 to ₹3,000) so you believe the system works and deposit a much larger amount (₹50,000 or your entire savings). As soon as you try to withdraw the larger amount, they freeze your account or demand advance tax.',
    answerHi: 'यह ठगों की सबसे पुरानी चाल है जिसे "पोंजी चारा" (Ponzi Bait) कहते हैं। वे शुरू में ₹500 से ₹2,000 निकालने देते हैं ताकि आपका भरोसा जीत सकें। जब आप अपनी बड़ी पूंजी (₹50,000 या लाखों) जमा करते हैं, तो विड्रॉल बंद कर देते हैं और "टैक्स या वेरिफिकेशन फीस" के नाम पर और पैसे ऐंठते हैं।',
    answerBn: 'এটি প্রতারকদের সবচেয়ে পুরনো কৌশল যাকে "পঞ্জি টোপ" (Ponzi Bait) বলা হয়। তারা শুরুতে ₹৫০০ থেকে ₹২,০০০ তুলতে দেয় যাতে আপনি তাদের বিশ্বাস করেন। কিন্তু যখন আপনি আপনার সব জমানো টাকা (₹৫০,০০০ বা লাখ টাকা) জমা করবেন, তখনই উইথড্রয়াল বন্ধ করে দিয়ে উল্টো ট্যাক্স বা ফি চেয়ে বসবে।',
    answerAs: 'এইটো প্ৰতাৰকৰ অতি পুৰণি কৌশল যাক "পঞ্জি টোপ" (Ponzi Bait) বোলা হয়। আৰম্ভণিতে তেওঁলোকে বিশ্বাস জন্মাবলৈ ₹৫০০ বা ₹২,০০০ উলিয়াবলৈ দিয়ে। কিন্তু আপুনি যেতিয়া ডাঙৰ ধন জমা দিয়ে, তেতিয়া একাউণ্ট ফ্ৰীজ কৰি আৰু অধিক মাচুল দাবী কৰে।'
  },
  {
    id: 'fake-stamp-letterhead',
    question: 'They sent an official SEBI certificate and government stamp on WhatsApp!',
    questionHi: 'उन्होंने व्हाट्सएप पर सेबी (SEBI) का मुहर लगा सर्टिफिकेट भेजा है!',
    questionBn: 'তারা হোয়াটসঅ্যাপে সেবি (SEBI)-র সরকারি সিল ও সার্টিফিকেট পাঠিয়েছে!',
    questionAs: 'তেওঁলোকে হোৱাটছএপত সেবি (SEBI)ৰ ছাব মৰা প্ৰমাণপত্ৰ পঠিয়াইছে!',
    tag: 'Forged Letterhead',
    tagHi: 'फर्जी लेटरहेड जाल',
    tagBn: 'নকল সরকারি লেটারহেড',
    tagAs: 'ভুৱা চৰকাৰী প্ৰমাণপত্ৰ',
    answer: 'SEBI NEVER issues investment guarantees, VIP memberships, or certificates via WhatsApp. Scammers easily forge stamps using Photoshop or Canva. Under SEBI regulations, authentic registration can only be verified by searching the intermediary\'s registration number on the official portal www.sebi.gov.in.',
    answerHi: 'सेबी (SEBI) कभी भी किसी को व्हाट्सएप पर गारंटी सर्टिफिकेट या वीआईपी पास जारी नहीं करता। ठग फोटोशॉप या कंप्यूटर से फर्जी सरकारी मुहर बना लेते हैं। किसी भी संस्था की असलियत सिर्फ आधिकारिक वेबसाइट sebi.gov.in पर ही जांची जा सकती है।',
    answerBn: 'নিয়ন্ত্রক সেবি (SEBI) কখনো হোয়াটসঅ্যাপে কোনো গ্যারান্টি সার্টিফিকেট বা ভিআইপি পাস দেয় না। জালিয়াতরা ফটোশপ দিয়ে ভুয়া সরকারি সিল বানিয়ে নেয়। যেকোনো প্রতিষ্ঠানের আসল সত্যতা শুধুমাত্র অফিশিয়াল ওয়েবসাইট sebi.gov.in-এ যাচাই করা যায়।',
    answerAs: 'সেবিয়ে (SEBI) কেতিয়াও হোৱাটছএপত কোনো লাভৰ গেৰাণ্টি প্ৰমাণপত্ৰ নিদিয়ে। কম্পিউটাৰত সহজেই ভুৱা চৰকাৰী ছাব বনাই লোৱা হয়। যিকোনো প্ৰতিষ্ঠানৰ সত্যতা কেৱল অফিচিয়েল ৱেবছাইট sebi.gov.in তহে পৰীক্ষা কৰিব পাৰি।'
  },
  {
    id: 'already-sent-money',
    question: 'I have already transferred ₹10,000! What should I do right now to save my money?',
    questionHi: 'मैंने पहले ही ₹10,000 ट्रांसफर कर दिए हैं! अपना पैसा बचाने के लिए अभी क्या करूं?',
    questionBn: 'আমি ইতিমধ্যে ₹১০,০০০ পাঠিয়ে ফেলেছি! টাকা বাঁচাতে এখন আমার কী করা উচিত?',
    questionAs: 'মই ইতিমধ্যে ₹১০,০০০ পঠিয়াই দিলোঁ! ধন ৰক্ষা কৰিবলৈ এতিয়া কি কৰিম?',
    tag: 'Emergency Golden Hour',
    tagHi: 'गोल्डन ऑवर इमरजेंसी',
    tagBn: 'জরুরি গোল্ডেন আওয়ার',
    tagAs: 'জৰুৰী গোল্ডেন আৱাৰ',
    answer: 'Act within the Golden 2 Hours! Immediately call the National Cybercrime Helpline 1930 (toll-free) and register an emergency complaint. Then call your bank customer care to report "Fraudulent Transaction" and request an immediate account freeze on the beneficiary UPI handle.',
    answerHi: 'तुरंत गोल्डन ऑवर (Golden Hour) में कार्रवाई करें! बिना देर किए 1930 राष्ट्रीय साइबर क्राइम हेल्पलाइन पर कॉल करें। इसके तुरंत बाद अपने बैंक को फोन करके ट्रांजैक्शन ब्लॉक करने और जिस खाते में पैसे गए हैं उस पर साइबर होल्ड लगवाने की विनती करें।',
    answerBn: 'তৎক্ষণাৎ গোল্ডেন আওয়ারের (প্রথম ২ ঘণ্টা) মধ্যে পদক্ষেপ নিন! এক মুহূর্ত দেরি না করে ১৯৩০ জাতীয় সাইবার ক্রাইম হেল্পলাইনে ফোন করুন। এরপর নিজের ব্যাংকে ফোন করে লেনদেনটি প্রতারণামূলক বলে রিপোর্ট করুন ও টাকা যে অ্যাকাউন্টে গেছে তা ফ্রিজ করার অনুরোধ জানান।',
    answerAs: 'তৎকালে গোল্ডেন আৱাৰৰ (প্ৰথম ২ ঘণ্টা) ভিতৰত ব্যৱস্থা লওক! পলম নকৰি ১৯৩০ ৰাষ্ট্ৰীয় চাইবাৰ ক্ৰাইম হেল্পলাইনত ফোন কৰক। তাৰ পিছত নিজৰ বেংকক খবৰ দি ধন যোৱা একাউণ্টটো ফ্ৰীজ কৰিবলৈ অনুৰোধ জনাওক।'
  },
  {
    id: 'vip-telegram-admin',
    question: 'The group admin says only 5 slots are left for the IPO allotment. Can I invest just ₹5,000?',
    questionHi: 'ग्रुप एडमिन कह रहा है सिर्फ 5 सीटें बची हैं। क्या मैं सिर्फ ₹5,000 लगा सकता हूँ?',
    questionBn: 'গ্রুপ অ্যাডমিন বলছে আইপিও-র জন্য মাত্র ৫টি আসন বাকি আছে। আমি কি ₹৫,০০০ দিতে পারি?',
    questionAs: 'গ্ৰুপ এডমিনে কৈছে আইপিঅ\'ৰ মাত্ৰ ৫খন আসন বাকী আছে। মই কি ₹৫,০০০ দিব পাৰোঁ?',
    tag: 'Artificial Scarcity',
    tagHi: 'झूठी जल्दबाजी (FOMO)',
    tagBn: 'ভুয়া কৃত্রিম তাড়া',
    tagAs: 'ভুৱা জৰুৰী চাপ',
    answer: 'Do not invest even ₹1. Stock market IPO allotment in India is strictly conducted via the ASBA (Application Supported by Blocked Amount) mechanism through your registered bank/broker. No private Telegram or WhatsApp group has legal access to a "secret institutional quota".',
    answerHi: 'एक रुपया भी न भेजें! भारत में किसी भी आईपीओ का आवंटन केवल बैंक के ASBA सिस्टम से डीमैट खाते में होता है। किसी भी व्हाट्सएप या टेलीग्राम ग्रुप के पास कोई "सीक्रेट कोटा" नहीं होता।',
    answerBn: 'একটি টাকাও দেবেন না! ভারতে আইপিও-র আবেদন ও বরাদ্দ সম্পূর্ণভাবে আপনার নিজস্ব ব্যাংক অ্যাকাউন্টের ASBA প্রক্রিয়ার মাধ্যমে সম্পন্ন হয়। কোনো ব্যক্তিগত হোয়াটসঅ্যাপ বা টেলিগ্রাম গ্রুপের কাছে কোনো গোপন প্রাতিষ্ঠানিক কোটা থাকে না।',
    answerAs: 'এটকাও নিদিব! ভাৰতত যিকোনো আইপিঅ\'ৰ আবেদন কেৱল বেংকৰ অনুমোদিত ASBA ব্যৱস্থাৰ দ্বাৰাহে হয়। কোনো ব্যক্তিগত টেলিগ্ৰাম বা হোৱাটছএপ গ্ৰুপৰ কোনো গোপন চৰকাৰী কোটা নাথাকে।'
  }
];

export function SocraticDoubtResolver({ lang }: SocraticDoubtResolverProps) {
  const [selectedDoubtId, setSelectedDoubtId] = useState<string | null>(null);

  const getQuestion = (d: FAQItem) => {
    if (lang === 'hi') return d.questionHi;
    if (lang === 'bn') return d.questionBn;
    if (lang === 'as') return d.questionAs;
    return d.question;
  };

  const getTag = (d: FAQItem) => {
    if (lang === 'hi') return d.tagHi;
    if (lang === 'bn') return d.tagBn;
    if (lang === 'as') return d.tagAs;
    return d.tag;
  };

  const getAnswer = (d: FAQItem) => {
    if (lang === 'hi') return d.answerHi;
    if (lang === 'bn') return d.answerBn;
    if (lang === 'as') return d.answerAs;
    return d.answer;
  };

  const selectedDoubt = COMMON_INVESTOR_DOUBTS.find((d) => d.id === selectedDoubtId);

  const getHeading = () => {
    if (lang === 'hi') return 'क्या आपके मन में यह सवाल आ रहा है?';
    if (lang === 'bn') return 'আপনার মনেও কি এই প্রশ্নগুলো জাগছে?';
    if (lang === 'as') return 'আপোনাৰ মনতো এনেকুৱা প্ৰশ্ন উদয় হৈছে নেকি?';
    return 'Still Have Lingering Doubts?';
  };

  const getSubheading = () => {
    if (lang === 'hi') return 'मन में उठते संकोच';
    if (lang === 'bn') return 'সন্দেহ নিরসন সহায়ক';
    if (lang === 'as') return 'সন্দেহ দূৰীকৰণ সহায়ক';
    return 'Cognitive Dissonance Resolver';
  };

  const getDescription = () => {
    if (lang === 'hi') return 'अक्सर चेतावनी देखने के बाद भी निवेशक सोचते हैं: "लेकिन मेरे दोस्त को तो फायदा हुआ था!" अपने सवाल पर क्लिक करें और सच्चाई समझें:';
    if (lang === 'bn') return 'সতর্কবার্তা দেখার পরও অনেকে ভাবেন: "কিন্তু আমার বন্ধু তো লাভ করেছিল!" আসল মনস্তাত্ত্বিক ফাঁদ বুঝতে প্রশ্নে ক্লিক করুন:';
    if (lang === 'as') return 'সতৰ্কবাৰ্তা দেখাৰ পিছতো বহুতে ভাবে: "মোৰ বন্ধুৱে দেখোন ধন পালে!" সত্যটো বুজিবলৈ প্ৰশ্নত ক্লিক কৰক:';
    return 'Even after a warning, cognitive dissonance makes investors rationalize risks. Click any common hesitation below to see how scammers exploit human psychology:';
  };

  const getFooterNote = () => {
    if (lang === 'hi') return '💡 कभी भी अज्ञात व्यक्ति या ग्रुप को पूंजी ट्रांसफर न करें।';
    if (lang === 'bn') return '💡 সেবির নির্দেশিকা: অপরিচিত কোনো ইউপিআই বা ব্যক্তিগত অ্যাকাউন্টে টাকা পাঠাবেন না।';
    if (lang === 'as') return '💡 সেবিৰ নিৰ্দেশনা: কোনো ব্যক্তিগত ইউপিআই বা একাউণ্টত ধন কেতিয়াও নিদিব।';
    return '💡 SEBI Mandate: Never deposit funds to private UPI or personal bank accounts.';
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
      {/* Title */}
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 uppercase tracking-wider font-mono">
              Socratic Investor Support
            </span>
            <span className="text-[10px] font-semibold text-slate-500">
              {getSubheading()}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
            {getHeading()}
          </h3>
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        {getDescription()}
      </p>

      {/* Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {COMMON_INVESTOR_DOUBTS.map((doubt) => {
          const isSelected = selectedDoubtId === doubt.id;
          return (
            <button
              key={doubt.id}
              onClick={() => setSelectedDoubtId(isSelected ? null : doubt.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-slate-900 leading-snug">
                  {getQuestion(doubt)}
                </span>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'rotate-90 text-indigo-600' : 'text-slate-400'
                  }`}
                />
              </div>
              <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-mono">
                {getTag(doubt)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Answer Drawer */}
      {selectedDoubt && (
        <div className="p-4 sm:p-5 bg-gradient-to-br from-indigo-50/90 to-blue-50/70 border border-indigo-200 rounded-2xl space-y-3 animate-fadeIn">
          <div className="flex items-center space-x-2 text-indigo-900 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{getQuestion(selectedDoubt)}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            {getAnswer(selectedDoubt)}
          </p>

          <div className="pt-2 border-t border-indigo-200/60 flex items-center justify-between text-[11px] text-indigo-900 font-semibold">
            <span>
              {getFooterNote()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
