import React, { useState, useEffect } from 'react';
import { Radio, AlertOctagon, Volume2, VolumeX, ShieldCheck, Flame } from 'lucide-react';
import { toggleSoundMute, isSoundMuted } from '../utils/soundEffects';
import { SupportedLanguage } from '../types';

interface ThreatRadarBarProps {
  lang: SupportedLanguage;
}

const LIVE_THREAT_FEEDS = [
  {
    tag: '🚨 CRITICAL PONZI',
    tagHi: '🚨 पोंजी अलर्ट',
    tagBn: '🚨 পঞ্জি ফাঁদ',
    tagAs: '🚨 পঞ্জি সতৰ্কতা',
    text: 'Active Threat: Unregistered WhatsApp numbers soliciting ₹10,000 with false 2-month doubling guarantee (BUDS Act Sec 3 Violation).',
    textHi: 'सक्रिय खतरा: अनजान व्हाट्सएप नंबरों से 2 महीने में ₹10,000 डबल करने का झांसा देकर अवैध वसूली (BUDS Act उल्लंघन)।',
    textBn: 'সক্রিয় প্রতারণা: হোয়াটসঅ্যাপে ২ মাসে টাকা দ্বিগুণ করার লোভ দেখিয়ে অর্থ দাবি।',
    textAs: 'সক্ৰিয় বিপদ: হোৱাটছএপত ২ মাহত ধন দুগুণ কৰাৰ প্ৰলোভনেৰে ধন সংগ্ৰহ।'
  },
  {
    tag: '⚠️ TRENDING TASK SCAM',
    tagHi: '⚠️ यूट्यूब टास्क स्कैम',
    tagBn: '⚠️ ইউটিউব টাস্ক প্রতারণা',
    tagAs: '⚠️ ইউটিউব টাস্ক প্ৰতাৰণা',
    text: 'Trending Scam: "Like YouTube videos & earn ₹3,000 daily" Telegram groups demanding prepaid deposits.',
    textHi: 'प्रचलित घोटाला: यूट्यूब लाइक करके रोज ₹3,000 कमाने के नाम पर टेलीग्राम प्रीपेड टास्क ट्रैप।',
    textBn: 'জনপ্রিয় প্রতারণা: ইউটিউব লাইক করে দৈনিক ৩,০০০ টাকা আয়ের ফাঁদে লাখ লাখ টাকা আত্মসাৎ।',
    textAs: 'প্ৰচলিত প্ৰতাৰণা: ইউটিউব লাইক কৰি দৈনিক ৩,০০০ টকা উপাৰ্জনৰ নামত প্ৰিপেইড ডিপ\'জিট ট্ৰেপ।'
  },
  {
    tag: '🏛️ SEBI IMPERSONATION',
    tagHi: '🏛️ फर्जी सेबी अलर्ट',
    tagBn: '🏛️ ভুয়া সেবি বিজ্ঞপ্তি',
    tagAs: '🏛️ ভুৱা সেবি জাননী',
    text: 'Impersonation Alert: Fake "SEBI Special Window Circulars" promising 300% profit in SME IPO pools.',
    textHi: 'फर्जीवाड़ा: सेबी के नाम से नकली सर्कुलर जारी कर एसएमई आईपीओ में 300% मुनाफे का लालच।',
    textBn: 'জালিয়াতি: সেবির নামে ভুয়া বিজ্ঞপ্তি বানিয়ে এসএমই আইপিওতে ৩০০% লাভের মিথ্যা দাবি।',
    textAs: 'জালিয়াতি: সেবিৰ নামত ভুৱা জাননী জাৰি কৰি আইপিঅ\'ত ৩০০% লাভৰ মিছা প্ৰলোভন।'
  },
  {
    tag: '🔒 NSDL DEMAT PHISHING',
    tagHi: '🔒 डीमैट ब्लॉक फिशिंग',
    tagBn: '🔒 ডিম্যাট ফিশিং এসএমএস',
    tagAs: '🔒 ডিম্যাট ফিশিং এছএমএছ',
    text: 'Credential Theft: Spoofed SMS claiming "Demat blocked within 2 hours - Update PAN via link".',
    textHi: 'डेटा चोरी: "2 घंटे में डीमैट खाता सस्पेंड होगा" का डर दिखाकर पैन व ओटीपी चुराने वाले लिंक सक्रिय।',
    textBn: 'ডাটা চুরি: "২ ঘণ্টার মধ্যে ডিম্যাট বন্ধ হবে" বলে ভুয়া লিংকের মাধ্যমে প্যান ও ওটিপি চুরি।',
    textAs: 'তথ্য চুৰি: "২ ঘণ্টাত ডিম্যাট বন্ধ হ\'ব" বুলি ভুৱা লিংকত পেন আৰু পাছৱৰ্ড চুৰিৰ চেষ্টা।'
  }
];

export const ThreatRadarBar: React.FC<ThreatRadarBarProps> = ({ lang }) => {
  const [currentFeedIndex, setCurrentFeedIndex] = useState(0);
  const [muted, setMuted] = useState(isSoundMuted());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeedIndex((prev) => (prev + 1) % LIVE_THREAT_FEEDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleMute = () => {
    const isNowMuted = toggleSoundMute();
    setMuted(isNowMuted);
  };

  const feed = LIVE_THREAT_FEEDS[currentFeedIndex];

  const getTag = () => {
    if (lang === 'hi') return feed.tagHi;
    if (lang === 'bn') return feed.tagBn;
    if (lang === 'as') return feed.tagAs;
    return feed.tag;
  };

  const getText = () => {
    if (lang === 'hi') return feed.textHi;
    if (lang === 'bn') return feed.textBn;
    if (lang === 'as') return feed.textAs;
    return feed.text;
  };

  return (
    <div className="w-full bg-[#070e1e] border-y border-slate-800 text-slate-300 py-2 px-3 sm:px-6 text-xs flex flex-wrap items-center justify-between gap-2 shadow-inner">
      {/* Left: Live Pulse & Threat Intel Ticker */}
      <div className="flex items-center space-x-2.5 flex-1 min-w-[280px] overflow-hidden">
        <div className="flex items-center space-x-1.5 shrink-0 bg-red-950/80 border border-red-500/40 text-red-400 px-2 py-0.5 rounded-full font-mono text-[10px] font-bold">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
          <Radio className="w-3 h-3 text-red-400" />
          <span>LIVE RADAR</span>
        </div>

        <div className="flex items-center space-x-2 truncate">
          <span className="font-extrabold text-[11px] px-2 py-0.5 rounded bg-slate-800 text-amber-300 shrink-0 font-mono">
            {getTag()}
          </span>
          <span className="truncate text-slate-200 text-xs font-medium transition-opacity duration-300">
            {getText()}
          </span>
        </div>
      </div>

      {/* Right: Telemetry Metrics & Sound Toggle */}
      <div className="flex items-center space-x-3 text-[11px] font-mono shrink-0 ml-auto">
        <span className="hidden md:inline-flex items-center text-emerald-400 gap-1 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>4,820+ SEBI AMCs & Brokers</span>
        </span>

        <span className="hidden sm:inline-flex items-center text-blue-400 gap-1 font-semibold">
          <Flame className="w-3.5 h-3.5 text-blue-400" />
          <span>18ms Heuristic Edge Engine</span>
        </span>

        {/* Audio FX Toggle Button */}
        <button
          onClick={handleToggleMute}
          className="flex items-center space-x-1 text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer"
          title={muted ? 'Unmute Futuristic Cyber Sound Effects' : 'Mute Sound Effects'}
        >
          {muted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[10px]">SFX Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] text-emerald-400">SFX On</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
