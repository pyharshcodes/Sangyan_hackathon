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
  answer: string;
  answerHi: string;
  tag: string;
  tagHi: string;
  actionText?: string;
  actionUrl?: string;
}

const COMMON_INVESTOR_DOUBTS: FAQItem[] = [
  {
    id: 'friend-got-withdrawal',
    question: 'My friend withdrew ₹2,000 from this app. How can it still be a scam?',
    questionHi: 'मेरे दोस्त को ₹2,000 का विड्रॉल मिला था, फिर यह फ्रॉड कैसे हो सकता है?',
    tag: 'Ponzi Bait Psychology',
    tagHi: 'पोंजी बैट साइकोलॉजी',
    answer: 'This is the classic "Ponzi Bait" tactic. Scammers deliberately allow small initial withdrawals (₹500 to ₹3,000) so you believe the system works and deposit a much larger amount (₹50,000 or your entire savings). As soon as you try to withdraw the larger amount, they freeze your account or demand advance tax.',
    answerHi: 'यह ठगों की सबसे पुरानी चाल है जिसे "पोंजी चारा" (Ponzi Bait) कहते हैं। वे शुरू में ₹500 से ₹2,000 निकालने देते हैं ताकि आपका भरोसा जीत सकें। जब आप अपनी बड़ी पूंजी (₹50,000 या लाखों) जमा करते हैं, तो विड्रॉल बंद कर देते हैं और "टैक्स या वेरिफिकेशन फीस" के नाम पर और पैसे ऐंठते हैं।'
  },
  {
    id: 'fake-stamp-letterhead',
    question: 'They sent an official SEBI certificate and government stamp on WhatsApp!',
    questionHi: 'उन्होंने व्हाट्सएप पर सेबी (SEBI) का मुहर लगा सर्टिफिकेट भेजा है!',
    tag: 'Forged Letterhead',
    tagHi: 'फर्जी लेटरहेड जाल',
    answer: 'SEBI NEVER issues investment guarantees, VIP memberships, or certificates via WhatsApp. Scammers easily forge stamps using Photoshop or Canva. Under SEBI regulations, authentic registration can only be verified by searching the intermediary\'s registration number on the official portal www.sebi.gov.in.',
    answerHi: 'सेबी (SEBI) कभी भी किसी को व्हाट्सएप पर गारंटी सर्टिफिकेट या वीआईपी पास जारी नहीं करता। ठग फोटोशॉप या कंप्यूटर से फर्जी सरकारी मुहर बना लेते हैं। किसी भी संस्था की असलियत सिर्फ आधिकारिक वेबसाइट sebi.gov.in पर ही जांची जा सकती है।'
  },
  {
    id: 'already-sent-money',
    question: 'I have already transferred ₹10,000! What should I do right now to save my money?',
    questionHi: 'मैंने पहले ही ₹10,000 ट्रांसफर कर दिए हैं! अपना पैसा बचाने के लिए अभी क्या करूं?',
    tag: 'Emergency Golden Hour',
    tagHi: 'गोल्डन ऑवर इमरजेंसी',
    answer: 'Act within the Golden 2 Hours! Immediately call the National Cybercrime Helpline 1930 (toll-free) and register an emergency complaint. Then call your bank customer care to report "Fraudulent Transaction" and request an immediate account freeze on the beneficiary UPI handle.',
    answerHi: 'तुरंत गोल्डन ऑवर (Golden Hour) में कार्रवाई करें! बिना देर किए 1930 राष्ट्रीय साइबर क्राइम हेल्पलाइन पर कॉल करें। इसके तुरंत बाद अपने बैंक को फोन करके ट्रांजैक्शन ब्लॉक करने और जिस खाते में पैसे गए हैं उस पर साइबर होल्ड लगवाने की विनती करें।'
  },
  {
    id: 'vip-telegram-admin',
    question: 'The group admin says only 5 slots are left for the IPO allotment. Can I invest just ₹5,000?',
    questionHi: 'ग्रुप एडमिन कह रहा है सिर्फ 5 सीटें बची हैं। क्या मैं सिर्फ ₹5,000 लगा सकता हूँ?',
    tag: 'Artificial Scarcity',
    tagHi: 'झूठी जल्दबाजी (FOMO)',
    answer: 'Do not invest even ₹1. Stock market IPO allotment in India is strictly conducted via the ASBA (Application Supported by Blocked Amount) mechanism through your registered bank/broker. No private Telegram or WhatsApp group has legal access to a "secret institutional quota".',
    answerHi: 'एक रुपया भी न भेजें! भारत में किसी भी आईपीओ का आवंटन केवल बैंक के ASBA सिस्टम से डीमैट खाते में होता है। किसी भी व्हाट्सएप या टेलीग्राम ग्रुप के पास कोई "सीक्रेट कोटा" नहीं होता।'
  }
];

export function SocraticDoubtResolver({ lang }: SocraticDoubtResolverProps) {
  const [selectedDoubtId, setSelectedDoubtId] = useState<string | null>(null);
  const isHindi = lang === 'hi';

  const selectedDoubt = COMMON_INVESTOR_DOUBTS.find((d) => d.id === selectedDoubtId);

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
              {isHindi ? 'मन में उठते संकोच' : 'Cognitive Dissonance Resolver'}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
            {isHindi ? 'क्या आपके मन में यह सवाल आ रहा है?' : 'Still Have Lingering Doubts?'}
          </h3>
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        {isHindi
          ? 'अक्सर चेतावनी देखने के बाद भी निवेशक सोचते हैं: "लेकिन मेरे दोस्त को तो फायदा हुआ था!" अपने सवाल पर क्लिक करें और सच्चाई समझें:'
          : 'Even after a warning, cognitive dissonance makes investors rationalize risks. Click any common hesitation below to see how scammers exploit human psychology:'}
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
                  {isHindi ? doubt.questionHi : doubt.question}
                </span>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'rotate-90 text-indigo-600' : 'text-slate-400'
                  }`}
                />
              </div>
              <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-mono">
                {isHindi ? doubt.tagHi : doubt.tag}
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
            <span>{isHindi ? selectedDoubt.questionHi : selectedDoubt.question}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            {isHindi ? selectedDoubt.answerHi : selectedDoubt.answer}
          </p>

          <div className="pt-2 border-t border-indigo-200/60 flex items-center justify-between text-[11px] text-indigo-900 font-semibold">
            <span>
              {isHindi
                ? '💡 कभी भी अज्ञात व्यक्ति या ग्रुप को पूंजी ट्रांसफर न करें।'
                : '💡 SEBI Mandate: Never deposit funds to private UPI or personal bank accounts.'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
