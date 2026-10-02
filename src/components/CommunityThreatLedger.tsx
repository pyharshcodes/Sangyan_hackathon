import React, { useState } from 'react';
import { ShieldAlert, Globe, MapPin, CheckCircle2, TrendingUp, Users, ArrowUpRight, Radio, ExternalLink } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface ThreatRecord {
  id: string;
  city: string;
  type: string;
  signature: string;
  flaggedCount: number;
  timeAgo: string;
  status: 'ACTIVE_BLOCK' | 'INVESTIGATING' | 'CONFIRMED_FRAUD';
}

const LIVE_THREATS: ThreatRecord[] = [
  {
    id: 't-1',
    city: 'Varanasi, UP',
    type: 'Fake SME IPO Allotment Link',
    signature: 't.me/vip_ipo_allocation_2026',
    flaggedCount: 142,
    timeAgo: '4 mins ago',
    status: 'ACTIVE_BLOCK'
  },
  {
    id: 't-2',
    city: 'Patna, Bihar',
    type: 'Demat KYC Suspension Phishing',
    signature: 'https://demat-kyc-verification.example',
    flaggedCount: 289,
    timeAgo: '12 mins ago',
    status: 'CONFIRMED_FRAUD'
  },
  {
    id: 't-3',
    city: 'Jaipur, Rajasthan',
    type: 'Fake ₹48,750 Advance Fee Extortion',
    signature: 'UPI: withdrawal-fee@axl',
    flaggedCount: 84,
    timeAgo: '28 mins ago',
    status: 'ACTIVE_BLOCK'
  },
  {
    id: 't-4',
    city: 'Indore, MP',
    type: 'Upper Circuit Pump & Dump WhatsApp Group',
    signature: 'VIP SureShot Wealth 500%',
    flaggedCount: 310,
    timeAgo: '45 mins ago',
    status: 'CONFIRMED_FRAUD'
  }
];

interface CommunityThreatLedgerProps {
  lang: SupportedLanguage;
  onSelectThreat?: (text: string) => void;
}

export function CommunityThreatLedger({ lang, onSelectThreat }: CommunityThreatLedgerProps) {
  const isHindi = lang === 'hi';
  const [reported, setReported] = useState(false);

  const handleReport = () => {
    setReported(true);
    setTimeout(() => setReported(false), 3000);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 uppercase tracking-wider font-mono">
                Crowdsourced Threat Intelligence
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live Bharat Feed
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              {isHindi ? 'राष्ट्रीय समुदाय स्कैम इंटेलिजेंस लेजर' : 'National Investor Scam Intelligence Ledger'}
            </h3>
          </div>
        </div>

        {/* Counter Pill */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-mono">
            <span className="text-slate-400">Today: </span>
            <strong className="text-slate-900">1,842 Threats Pre-empted</strong>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        {isHindi
          ? 'जब भी कोई भारतीय निवेशक किसी नए फ्रॉड को संज्ञान कवच पर स्कैन करता है, उसका अनाम क्रिप्टोग्राफिक सिग्नेचर (Zero PII) राष्ट्रीय लेजर में दर्ज हो जाता है — जिससे पूरे भारत के निवेशकों को वास्तविक समय में सुरक्षा मिलती है।'
          : 'When an investor scans a new phishing URL or fake telegram tip, an anonymized threat signature (DPDP-compliant) is propagated across Bharat to preemptively immunize other investors before capital is transferred.'}
      </p>

      {/* Threat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {LIVE_THREATS.map((threat) => (
          <div
            key={threat.id}
            className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-2"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 font-bold text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>{threat.city}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{threat.timeAgo}</span>
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-900">{threat.type}</h5>
              <p className="text-[11px] font-mono text-slate-500 truncate mt-0.5">{threat.signature}</p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px]">
              <span className="text-rose-700 font-semibold flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Flagged by {threat.flaggedCount} investors</span>
              </span>
              <span className="px-2 py-0.5 rounded font-mono font-bold bg-rose-100 text-rose-800">
                {threat.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
