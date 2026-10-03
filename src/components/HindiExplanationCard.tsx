import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, Square, Headphones } from 'lucide-react';
import { VoiceNarrator } from '../engine/voiceNarrator';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HindiExplanationCardProps {
  explanationHi: string;
  analogyHi: string;
  lang: SupportedLanguage;
}

export const HindiExplanationCard: React.FC<HindiExplanationCardProps> = ({
  explanationHi,
  analogyHi,
  lang
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    setIsSupported(VoiceNarrator.isSupported());
    return () => {
      VoiceNarrator.stop();
    };
  }, []);

  const getExplanationText = () => {
    const isKycPhish =
      explanationHi.includes('केवाईसी') ||
      explanationHi.includes('अकाउंट ब्लॉक') ||
      explanationHi.includes('डीमैट') ||
      explanationHi.includes('सस्पेंड');

    const isTaskScam =
      explanationHi.includes('टास्क') ||
      explanationHi.includes('यूट्यूब') ||
      explanationHi.includes('लाइक');

    const isWithdrawalScam =
      explanationHi.includes('निकासी') ||
      explanationHi.includes('टैक्स') ||
      explanationHi.includes('विड्रॉल') ||
      explanationHi.includes('फीस');

    const isSafeOrEdu =
      explanationHi.includes('शैक्षणिक') ||
      explanationHi.includes('जोखिम नहीं') ||
      explanationHi.includes('व्यक्तिगत') ||
      explanationHi.includes('सुरक्षा शील्ड');

    if (lang === 'bn') {
      if (isKycPhish) {
        return {
          speech: 'এই বার্তাটি একটি বিপজ্জনক ফিশিং ফাঁদ। এতে ডিম্যাট বা ব্যাংক অ্যাকাউন্ট ব্লক করার মিথ্যা ভয় দেখিয়ে ভুয়া লিংকে ক্লিক করাতে চাইছে। কোনো ব্রোকার এসএমএসে লিঙ্ক পাঠিয়ে ডিম্যাট ব্লক করে না।',
          points: [
            { icon: AlertTriangle, text: 'এসএমএসে আসা অপরিচিত লিংকে নিজের প্যান, আধার বা ট্রেডিং পাসওয়ার্ড কখনো দেবেন না।' },
            { icon: ShieldCheck, text: 'আসল ব্রোকার অ্যাকাউন্ট ব্লক করার জন্য কখনো ২ ঘণ্টার জরুরি সময়সীমা দেয় না।' },
            { icon: CheckCircle2, text: 'সবসময় অফিসিয়াল অ্যাপ বা পোর্টাল (যেমন zerodha.com, groww.in) খুলে সরাসরি লগইন করুন।' }
          ],
          analogy: 'যেমন কোনো বহিরাগত এসে বলে "আপনার ঘরের তালা অবিলম্বে না বদলালে পুলিশে দেব"—আসলে সে আপনার চাবি চুরি করার মতলব আঁটছে।'
        };
      }
      if (isTaskScam) {
        return {
          speech: 'এটি ভারতের সবচেয়ে বিপজ্জনক টাস্ক ও ইউটিউব লাইক প্রতারণা। শুরুতে ছোট ছোট কাজের জন্য দেড়শো-দুশো টাকা দিয়ে বিশ্বাস তৈরি করে, পরে বড় প্রিপেইড টাস্কে লাখ লাখ টাকা আটকে দেয়।',
          points: [
            { icon: AlertTriangle, text: 'ভিডিও লাইক বা গুগল রিভিউ দিয়ে দৈনিক ৩,০০০ টাকা আয়ের দাবি সম্পূর্ণ ভুয়া।' },
            { icon: ShieldCheck, text: 'কমিশন আনলক করার জন্য কোনো ভুয়া ওয়েবসাইটে প্রিপেইড ডিপোজিট করবেন না।' },
            { icon: CheckCircle2, text: 'টাকা পাঠিয়ে থাকলে অবিলম্বে ১৯৩০ জাতীয় সাইবার ক্রাইম হেল্পলাইনে কল করুন।' }
          ],
          analogy: 'যেমন মেলায় কেউ প্রথমে বিনামূল্যে সামান্য গুড় খাইয়ে মিষ্টির প্রতি লোভ জন্মায়, পরে ভেতর নিয়ে গিয়ে সর্বস্ব লুটে নেয়।'
        };
      }
      if (isWithdrawalScam) {
        return {
          speech: 'মুনাফা তোলার জন্য অগ্রিম ট্যাক্স বা প্রসেসিং ফি চাওয়ার দাবি সম্পূর্ণ বেআইনি। এটি একটি ক্লাসিক র্যানসম ফাঁদ। একবার ফি দিলে আরো টাকার দাবি করবে, কিন্তু মুনাফা ফেরত দেবে না।',
          points: [
            { icon: AlertTriangle, text: 'ভার্চুয়াল ব্যালেন্স বা ভুয়া মুনাফা দেখিয়ে ২০% ট্যাক্স বা ভেরিফিকেশন ফি চাওয়া হচ্ছে।' },
            { icon: ShieldCheck, text: 'সেবি বা আসল ব্রোকার মুনাফা তোলার জন্য আলাদা কোনো অগ্রিম ব্যক্তিগত ফি নেয় না।' },
            { icon: CheckCircle2, text: 'কোনো ব্যক্তিগত ইউপিআই নম্বরে কোনো ফি পাঠাবেন না; তৎক্ষণাৎ ব্যাংককে জানান।' }
          ],
          analogy: 'যেমন কোনো মহাজন বন্ধকী গয়না ফেরত দেওয়ার নাম করে বারবার ফি চাইতে থাকে, কিন্তু গয়না কখনই ফেরত দেয় না।'
        };
      }
      if (isSafeOrEdu) {
        return {
          speech: 'এই নথিতে কোনো আর্থিক প্রতারণা বা বেআইনি বিনিয়োগ স্কিমের অস্তিত্ব নেই। এটি নিরাপদ ও নিয়মসম্মত বিষয়বস্তু।',
          points: [
            { icon: ShieldCheck, text: 'এতে কোনো অসৎ মুনাফা বা লোভনীয় বিনিয়োগ দাবির উপস্থিতি নেই।' },
            { icon: CheckCircle2, text: 'ব্যক্তিগত ও শিক্ষামূলক নথি অন-ডিভাইস গোপনীয়তার সাথে যাচাই করা হয়েছে।' },
            { icon: AlertTriangle, text: 'শেয়ার বাজারে বিনিয়োগের পূর্বে সর্বদা সেবি-নিবন্ধিত মধ্যস্থতাকারীদের পরামর্শ নিন।' }
          ],
          analogy: 'যেমন সতর্ক স্বাস্থ্যবিধি শরীরকে সুস্থ রাখে, তেমনই সেবির নিয়ম মেনে চলা আপনার আর্থিক সঞ্চয়কে সুরক্ষিত রাখে।'
        };
      }
      // Default Bengali Guaranteed Returns
      return {
        speech: 'এই বার্তায় দ্রুত টাকা দ্বিগুণ বা নিশ্চিত লাভের প্রলোভন দেওয়া হয়েছে। আসল শেয়ার বাজার কখনো ফিক্সড লাভের গ্যারান্টি দেয় না। কোনো ব্যক্তিগত ইউপিআই বা লিংকে টাকা পাঠাবেন না।',
        points: [
          { icon: AlertTriangle, text: 'এই বার্তায় আপনাকে অবিলম্বে টাকা পাঠানোর অযাচিত চাপ ও লোভ দেখানো হচ্ছে।' },
          { icon: ShieldCheck, text: 'আসল শেয়ার বাজার বা নিয়ন্ত্রক সেবি কখনো ফিক্সড নিশ্চিত লাভের গ্যারান্টি দেয় না।' },
          { icon: CheckCircle2, text: 'কোনো ব্যক্তিগত ইউপিআই বা অপরিচিত লিংকে কখনোই টাকা পাঠাবেন না।' }
        ],
        analogy: 'যেমন গ্রামের মেলায় এক অচেনা ব্যক্তি এসে বলে ১০০ টাকার কাচের পাথর কিনলে কাল সকালে আসল হীরা হয়ে যাবে—প্রথমে ছোট লাভে বিশ্বাস জন্মায়, পরে পুরো পুঁজি নিয়ে উধাও হয়ে যায়।'
      };
    }

    if (lang === 'as') {
      if (isKycPhish) {
        return {
          speech: 'এই বাৰ্তাটি এক অতি বিপজ্জনক ফিছিং ফান্দ। ডিমেট বা বেংক একাউণ্ট বন্ধ হোৱাৰ ভুৱা ভয় দেখুৱাই লিংক ক্লিক কৰাবলৈ চেষ্টা কৰা হৈছে। কোনো ব্ৰ\'কাৰে এছএমএছত লিংক পঠিয়াই একাউণ্ট বন্ধ নকৰে।',
          points: [
            { icon: AlertTriangle, text: 'এছএমএছ বা হোৱাটছএপত অহা লিংকত নিজৰ পেন বা পাছৱৰ্ড কেতিয়াও নিদিব।' },
            { icon: ShieldCheck, text: 'প্ৰকৃত ব্ৰ\'কাৰে কেতিয়াও ২ ঘণ্টাৰ ভিতৰত ডিমেট একাউণ্ট ব্লক কৰাৰ ভাবুকি নিদিয়ে।' },
            { icon: CheckCircle2, text: 'সদায় ব্ৰ\'কাৰৰ অফিচিয়েল এপ্লিকেচন খুলিহে লেনদেন বা পৰীক্ষা কৰক।' }
          ],
          analogy: 'যেনেকৈ কোনোবা অচিনাকি মানুহে আহি কয় "আপোনাৰ ঘৰৰ তলা সলনি নকৰিলে জব্দ হ\'ব"—আচলতে তেওঁ আপোনাৰ চাবিটো চুৰি কৰিবহে বিচাৰিছে।'
        };
      }
      if (isTaskScam) {
        return {
          speech: 'এইটো ভাৰতত সৰ্বাধিক বিয়পা টাস্ক আৰু ইউটিউব লাইক প্ৰতাৰণা। প্ৰথমতে সামান্য ধন দি বিশ্বাস জন্মায়, তাৰ পিছত ডাঙৰ প্ৰিপেইড টাস্কৰ নামত সকলো ধন আত্মসাৎ কৰে।',
          points: [
            { icon: AlertTriangle, text: 'ভিডিঅ\' লাইক কৰি দৈনিক ৩,০০০ টকা লাভ কৰাৰ দাবী সম্পূৰ্ণ ভুৱা।' },
            { icon: ShieldCheck, text: 'কমিচন লাভৰ বাবে কোনো ভুৱা ৱেবছাইটত আগতীয়াকৈ ধন জমা নকৰিব।' },
            { icon: CheckCircle2, text: 'ধন পঠিয়াই থাকিলে তৎকালে ১৯৩০ ৰাষ্ট্ৰীয় চাইবাৰ ক্ৰাইম হেল্পলাইনত ফোন কৰক।' }
          ],
          analogy: 'যেনেকৈ মেলাত কোনোবাই প্ৰথমে মিঠাই খুৱাই পিছত সকলো সা-সম্পত্তি কাঢ়ি লয়।'
        };
      }
      if (isWithdrawalScam) {
        return {
          speech: 'লাভৰ ধন উলিয়াবলৈ আগতীয়াকৈ টেক্স বা মাচুল বিচৰাটো সম্পূৰ্ণ জালিয়াতি। সেবি বা কোনো প্ৰকৃত ব্ৰ\'কাৰে ধন তোলাৰ বাবে বেলেগকৈ ব্যক্তিগত ধন নিবিচাৰে।',
          points: [
            { icon: AlertTriangle, text: 'ভুৱা লাভ দেখুৱাই ২০% টেক্স বা ভেৰিফিকেচন মাচুল বিচৰা হৈছে।' },
            { icon: ShieldCheck, text: 'একবাৰ মাচুল দিলে প্ৰতাৰকে আৰু অধিক ধন দাবী কৰিব, কিন্তু মূল ধন ঘূৰাই নিদিয়ে।' },
            { icon: CheckCircle2, text: 'কোনো ব্যক্তিগত ইউপিআইত ধন নিদিব; তৎকালে আপোনাৰ বেংকক খবৰ দিয়ক।' }
          ],
          analogy: 'যেনেকৈ বন্ধকী সোণ ঘূৰাই দিয়াৰ নামত বাৰে বাৰে সুত বিচাৰি থাকে, কিন্তু সোণ কেতিয়াও ঘূৰাই নিদিয়ে।'
        };
      }
      if (isSafeOrEdu) {
        return {
          speech: 'এই নথিত কোনো বিত্তীয় প্ৰতাৰণা বা বেআইনী বিনিয়োগৰ তথ্য নাই। এইটো সুৰক্ষিত বিষয়বস্তু।',
          points: [
            { icon: ShieldCheck, text: 'ইয়াত কোনো ভুৱা লাভ বা প্ৰতাৰণামূলক দাবী পোৱা নগ\'ল।' },
            { icon: CheckCircle2, text: 'ব্যক্তিগত আৰু শৈক্ষিক নথি ডিভাইচতে গোপনীয়তাৰে পৰীক্ষা কৰা হৈছে।' },
            { icon: AlertTriangle, text: 'নিয়ন্ত্ৰিত বজাৰত কেৱল সেবিৰ পঞ্জীয়নভুক্ত মধ্যস্থতাকাৰীৰ সৈতেহে লেনদেন কৰক।' }
          ],
          analogy: 'সঠিক স্বাস্থ্যসচেতনতাই যেনেকৈ ৰোগৰ পৰা ৰক্ষা কৰে, তেনেকৈ সেবিৰ নিয়মে আপোনাৰ সঞ্চয় সুৰক্ষিত ৰাখে।'
        };
      }
      // Default Assamese Guaranteed Returns
      return {
        speech: 'এই বাৰ্তাত তৎকালে ধন বিনিয়োগ কৰি নিশ্চিত লাভৰ প্ৰলোভন দিয়া হৈছে। প্ৰকৃত বজাৰ বা সেবিয়ে কেতিয়াও লাভৰ নিশ্চয়তা নিদিয়ে। কোনো ব্যক্তিগত ইউপিআইত ধন নিদিব।',
        points: [
          { icon: AlertTriangle, text: 'এই বাৰ্তাত আপোনাক খৰখেদাকৈ ধন জমা দিয়াৰ প্ৰলোভন আৰু চাপ দিয়া হৈছে।' },
          { icon: ShieldCheck, text: 'প্ৰকৃত শ্বেয়াৰ বজাৰ বা সেবিয়ে কেতিয়াও কোনো ফিক্সড নিশ্চিত লাভৰ গেৰাণ্টি নিদিয়ে।' },
          { icon: CheckCircle2, text: 'কোনো ব্যক্তিগত ইউপিআই নম্বৰ বা সন্দেহজনক লিংকত কেতিয়াও ধন নিদিব।' }
        ],
        analogy: 'যেনেকৈ গাঁৱৰ সাপ্তাহিক বজাৰত কোনোবাই সাধাৰণ পিতলক খাঁটি সোণ বুলি কম দামত বিক্ৰী কৰিব বিচাৰে—প্ৰথমে সামান্য বিশ্বাস জন্মাই পিছত সকলো ধন লৈ পলায়ন কৰে।'
      };
    }
    if (lang === 'hi') {
      return {
        speech: `${explanationHi}। देसी उदाहरण: ${analogyHi}`,
        points: [
          { icon: AlertTriangle, text: 'इस संदेश में आपको तुरंत पैसे लगाने का लालच या दबाव दिया जा रहा है।' },
          { icon: ShieldCheck, text: 'असली शेयर बाज़ार या सेबी कभी भी फिक्स मुनाफे की गारंटी नहीं देते।' },
          { icon: CheckCircle2, text: 'किसी भी निजी यूपीआई या अनजान लिंक पर कभी पैसे ट्रांसफर न करें।' }
        ],
        analogy: analogyHi
      };
    }
    // Default English
    return {
      speech: 'This message attempts to lure you with guaranteed high profits and artificial urgency. Legitimate regulated markets and SEBI never promise fixed returns. Never transfer money to personal UPI accounts or unverified links.',
      points: [
        { icon: AlertTriangle, text: 'This message uses artificial urgency to rush you before you can verify.' },
        { icon: ShieldCheck, text: 'Legitimate markets and SEBI never guarantee fixed returns or upper circuits.' },
        { icon: CheckCircle2, text: 'Never transfer money to personal UPI IDs or off-platform payment links.' }
      ],
      analogy: 'Like an uninvited stranger at a village fair offering "magic multiplying seeds" for a small advance fee—once you hand over money, they disappear.'
    };
  };

  const localizedContent = getExplanationText();

  const handleToggleAudio = () => {
    if (isPlaying) {
      VoiceNarrator.stop();
      setIsPlaying(false);
    } else {
      const success = VoiceNarrator.speak(localizedContent.speech, lang, () => {
        setIsPlaying(false);
      });
      if (success) setIsPlaying(true);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-800 space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-amber-400 border border-slate-700 shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 flex-wrap">
              <span>BHARAT-FIRST ACCESSIBILITY</span>
              <span className="text-amber-400">·</span>
              <span className="text-amber-300 font-mono">🇮🇳 BHASHINI ARCHITECTURE</span>
            </div>
            {/* Prominent heading required by spec */}
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              {t.understandSimpleLanguage}
            </h3>
          </div>
        </div>

        {/* Audio Playback Button */}
        {isSupported && (
          <button
            onClick={handleToggleAudio}
            className={`min-h-[44px] px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 shadow-xs ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                <span>{t.stopAudioBtn}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{t.listenAudioBtn}</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Short, icon-based concise sentences (No dense paragraphs) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {localizedContent.points.map((pt, i) => {
          const Icon = pt.icon;
          return (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-start space-x-2.5"
            >
              <Icon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {pt.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* Everyday Analogy Box */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-xs sm:text-sm text-amber-200 flex items-start space-x-3">
        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300 block mb-1">
            {t.desiAnalogyTitle}
          </span>
          <p className="leading-relaxed text-amber-100 font-normal">
            {localizedContent.analogy}
          </p>
        </div>
      </div>
    </div>
  );
};
