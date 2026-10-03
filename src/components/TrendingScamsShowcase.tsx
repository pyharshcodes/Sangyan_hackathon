import React from 'react';
import { Flame, ArrowUpRight, MessageCircle, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface TrendingScamsShowcaseProps {
  onSelectScam: (text: string, type: 'text' | 'image' | 'url') => void;
  lang: SupportedLanguage;
}

const TRENDING_SCAMS = [
  {
    id: 'scam-double-money',
    title: 'पैसे डबल / अनजान व्यक्ति का मैसेज',
    titleEn: 'Stranger Ponzi / Double Money Trap',
    tag: 'BUDS Act Violation',
    tagColor: 'bg-rose-100 text-rose-800 border-rose-200',
    type: 'WhatsApp' as const,
    severity: 'Critical' as const,
    text: '₹10,000 मांग रहा है, बोला दो महीने में डबल हो जाएंगे, मैं उसको जानता नहीं हूँ।',
    preview: '₹10,000 मांग रहा है, बोला दो महीने में डबल हो जाएंगे, मैं उसको जानता नहीं हूँ...',
    highlights: 'Double Money Guarantee · Unknown Stranger'
  },
  {
    id: 'scam-youtube-task',
    title: 'यूट्यूब लाइक / पार्ट-टाइम जॉब फ्रॉड',
    titleEn: 'YouTube Like Task / Part-Time Job Scam',
    tag: '1930 Cyber Helpline #1 Alert',
    tagColor: 'bg-amber-100 text-amber-900 border-amber-200',
    type: 'Telegram' as const,
    severity: 'Critical' as const,
    text: 'Part-time job earn ₹3,000 daily! Simple task: like YouTube videos and subscribe channels. Earn ₹150 per like. Complete prepaid task to unlock VIP commissions.',
    preview: 'Part-time job earn ₹3,000 daily! Simple task: like YouTube videos...',
    highlights: 'Prepaid Deposit Bait · False Commission'
  },
  {
    id: 'scam-demat-kyc',
    title: 'डीमैट ब्लॉक / पैन क्रेडेंशियल फिशिंग',
    titleEn: 'Demat Account Suspension Phishing SMS',
    tag: 'NSDL Impersonation',
    tagColor: 'bg-rose-100 text-rose-800 border-rose-200',
    type: 'SMS' as const,
    severity: 'Critical' as const,
    text: 'URGENT: Your Demat trading account has been temporarily blocked due to incomplete KYC. Update PAN & bank details within 2 hours at https://nsdl-kyc-verify.in to avoid permanent suspension.',
    preview: 'URGENT: Your Demat trading account has been blocked...',
    highlights: '2-Hour Threat · Password & OTP Harvesting'
  },
  {
    id: 'scam-vip-ipo',
    title: 'वीआईपी ग्रुप / 300% गारंटीड रिटर्न',
    titleEn: 'WhatsApp VIP Upper Circuit / SME Tip',
    tag: 'SEBI PFUTP 2003 Violation',
    tagColor: 'bg-purple-100 text-purple-900 border-purple-200',
    type: 'WhatsApp' as const,
    severity: 'Critical' as const,
    text: 'Join VIP Investor Group! 300% Guaranteed profit in special SME IPO window circular. Zero risk. Deposit ₹25,000 to secure allocation wallet before 11 AM.',
    preview: 'Join VIP Investor Group! 300% Guaranteed profit in special SME IPO...',
    highlights: 'Unregistered Advisor · Zero-Risk Fiction'
  },
  {
    id: 'scam-genuine-sip',
    title: 'प्रामाणिक निवेशक शिक्षा (सुरक्षित कंट्रोल)',
    titleEn: 'Genuine Investor Education (Safe Control)',
    tag: 'Verified SEBI Shiksha',
    tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    type: 'Advisory' as const,
    severity: 'Low' as const,
    text: 'Mutual fund investments are subject to market risks, read all scheme related documents carefully before investing. A Systematic Investment Plan (SIP) allows disciplined investing through rupee cost averaging. It does not guarantee fixed profit.',
    preview: 'Mutual fund investments are subject to market risks...',
    highlights: 'Balanced Disclosures · No False Promises'
  },
  {
    id: 'scam-safe-electricity-bill',
    title: 'बिजली बिल SMS (नेगेटिव एविडेंस टेस्ट)',
    titleEn: 'Electricity Bill SMS (Negative Evidence Test)',
    tag: 'Benign Control (0/100)',
    tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    type: 'SMS' as const,
    severity: 'Low' as const,
    text: "Your electricity bill of ₹1,248 is due on 8 October. Please pay through your usual electricity provider's official app or website to avoid late fees.",
    preview: "Your electricity bill of ₹1,248 is due on 8 October. Please pay through your usual electricity provider's official app...",
    highlights: 'Official App Advised · 0 Phishing Links'
  }
];

export const TrendingScamsShowcase: React.FC<TrendingScamsShowcaseProps> = ({ onSelectScam, lang }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-[#0b162c] to-slate-900 text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-lg space-y-4 relative overflow-hidden">
      {/* Decorative cyber grid accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <Flame className="w-4 h-4 fill-current" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono">
                {lang === 'hi' ? 'वायरल साइबर स्कैम टेस्ट' : 'Viral Cyber Scams in Bharat'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse font-mono">
                LIVE JURY PRESETS
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              {lang === 'hi'
                ? 'एक क्लिक में भारत के सबसे खतरनाक फ्रॉड मैसेज टेस्ट करें और AI डिटेक्शन देखें:'
                : 'Test real-world deceptive messages with 1-click and inspect deep AI forensic analysis:'}
            </p>
          </div>
        </div>

        <span className="text-[11px] text-slate-400 font-mono hidden md:inline-flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-400" />
          Instant 18ms Heuristic + Gemini Reasoning
        </span>
      </div>

      {/* Horizontal Scrollable / Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
        {TRENDING_SCAMS.map((item) => {
          const isSafe = item.severity === 'Low';
          return (
            <div
              key={item.id}
              onClick={() => onSelectScam(item.text, 'text')}
              className={`group p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between hover:scale-[1.02] hover:shadow-md relative ${
                isSafe
                  ? 'bg-emerald-950/40 border-emerald-500/30 hover:border-emerald-400/80 hover:bg-emerald-950/60'
                  : 'bg-slate-800/60 border-slate-700/80 hover:border-rose-500/80 hover:bg-slate-800/90'
              }`}
            >
              {/* Card Top: Source Type & Regulatory Tag */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center space-x-1.5 font-bold font-mono text-slate-300">
                    <MessageCircle className={`w-3.5 h-3.5 ${isSafe ? 'text-emerald-400' : 'text-blue-400'}`} />
                    <span>{item.type}</span>
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-extrabold text-sm text-white group-hover:text-blue-300 transition-colors">
                  {lang === 'hi' ? item.title : item.titleEn}
                </h4>

                {/* Realistic Chat Bubble Quote */}
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-200 font-mono leading-relaxed line-clamp-2 italic">
                  "{item.preview}"
                </div>
              </div>

              {/* Card Bottom: Highlights & 1-Click Button */}
              <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-sans truncate mr-2">
                  {isSafe ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      Safe Control Case
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1 font-semibold">
                      <AlertTriangle className="w-3 h-3" />
                      {item.highlights}
                    </span>
                  )}
                </span>

                <span className="inline-flex items-center space-x-1 text-xs font-bold text-amber-300 group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>{lang === 'hi' ? 'जांचें' : 'Test Now'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
