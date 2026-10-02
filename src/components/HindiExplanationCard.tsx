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
    if (lang === 'bn') {
      return {
        speech: 'এই বার্তায় দ্রুত টাকা দ্বিগুণ বা নিশ্চিত লাভের প্রলোভন দেওয়া হয়েছে। আসল শেয়ার বাজার কখনো ফিক্সড লাভের গ্যারান্টি দেয় না। কোনো ব্যক্তিগত ইউপিআই বা লিংকে টাকা পাঠাবেন না। গ্রামীণ উদাহরণ: যেমন হাটে দ্বিগুণ মূল্যের ভুয়া সোনার কয়েন বিক্রি করার চেষ্টা করা হয়।',
        points: [
          { icon: AlertTriangle, text: 'এই বার্তায় আপনাকে অবিলম্বে টাকা পাঠানোর অযাচিত চাপ ও লোভ দেখানো হচ্ছে।' },
          { icon: ShieldCheck, text: 'আসল শেয়ার বাজার বা নিয়ন্ত্রক সেবি কখনো ফিক্সড নিশ্চিত লাভের গ্যারান্টি দেয় না।' },
          { icon: CheckCircle2, text: 'কোনো ব্যক্তিগত ইউপিআই বা অপরিচিত লিংকে কখনোই টাকা পাঠাবেন না।' }
        ],
        analogy: 'যেমন গ্রামের মেলায় এক অচেনা ব্যক্তি এসে বলে ১০০ টাকার কাচের পাথর কিনলে কাল সকালে আসল হীরা হয়ে যাবে—প্রথমে ছোট লাভে বিশ্বাস জন্মায়, পরে পুরো পুঁজি নিয়ে উধাও হয়ে যায়।'
      };
    }
    if (lang === 'as') {
      return {
        speech: 'এই বাৰ্তাত তৎকালে ধন বিনিয়োগ কৰি নিশ্চিত লাভৰ প্ৰলোভন দিয়া হৈছে। প্ৰকৃত বজাৰ বা সেবিয়ে কেতিয়াও লাভৰ নিশ্চয়তা নিদিয়ে। কোনো ব্যক্তিগত ইউপিআইত ধন নিদিব। উদাহৰণ: যেনেকৈ গাঁৱৰ চক বজাৰত ভুৱা সোণ বেচিবলৈ চেষ্টা কৰা হয়।',
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
