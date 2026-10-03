import React, { useState } from 'react';
import {
  PhoneCall,
  MessageSquare,
  Smartphone,
  Radio,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Zap,
  Globe2,
  Users
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { FeaturePhoneIvrSimulator } from './FeaturePhoneIvrSimulator';
import { WhatsAppBharatSimulator } from './WhatsAppBharatSimulator';

interface BharatSimulatorViewProps {
  onAnalyzeSample: (text: string, type: 'text' | 'image' | 'url', imagePreviewUrl?: string) => void;
  onBackToAnalyze: () => void;
  lang: SupportedLanguage;
}

export const BharatSimulatorView: React.FC<BharatSimulatorViewProps> = ({
  onAnalyzeSample,
  onBackToAnalyze,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'phone' | 'whatsapp'>('both');
  const isHindi = lang === 'hi';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Navigation & Header */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBackToAnalyze}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-2xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isHindi ? 'मुख्य स्कैनर पर वापस जाएं' : 'Back to Main Inspector'}</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase font-mono">
              Tier-2/3 & Rural Bharat Track
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200 uppercase font-mono hidden sm:inline">
              Zero-Internet Telephony
            </span>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {isHindi
                  ? 'भारत फीचर फोन व व्हाट्सएप सुरक्षा सिमुलेटर'
                  : 'Bharat Feature-Phone & WhatsApp Defense Simulator'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {isHindi
                  ? 'ग्रामीण और गैर-स्मार्टफोन निवेशकों के लिए 0-इंटरनेट IVR हेल्पलाइन (1800-संज्ञान), *99*1930# USSD प्रोटोकॉल और व्हाट्सएप बॉट'
                  : 'Empowering 65+ Crore Tier-2/3 & non-smartphone citizens via zero-internet IVR (1800-SANGYAN), *99*1930# USSD rails, and regional WhatsApp scanners'}
              </p>
            </div>
          </div>

          {/* Quick Pillar Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-2.5">
              <PhoneCall className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold">1800-SANGYAN Toll-Free</strong>
                <span className="text-[11px] text-slate-500">Interactive voice response (IVR) with regional dialects</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-2.5">
              <Radio className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold">*99*1930# USSD Protocol</strong>
                <span className="text-[11px] text-slate-500">GSM feature-phone keypad checking with 0 KB data</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-2.5">
              <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold">WhatsApp Edge Scanner</strong>
                <span className="text-[11px] text-slate-500">Instant verification of forwarded IPO & trading tips</span>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'both'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isHindi ? 'दोनों सिमुलेटर देखें (Side-by-Side)' : 'Dual View (Side-by-Side)'}
          </button>
          <button
            onClick={() => setActiveTab('phone')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'phone'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isHindi ? '📞 फीचर फोन (IVR / USSD)' : '📞 Feature Phone (IVR / USSD)'}</span>
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isHindi ? '💬 व्हाट्सएप सुरक्षा स्कैनर' : '💬 WhatsApp Scanner'}</span>
          </button>
        </div>
      </div>

      {/* Simulator Displays */}
      <div className="space-y-6">
        {/* DUAL VIEW: 2 Columns on desktop, stacked on mobile */}
        {activeTab === 'both' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-700">
                <span>1. Offline Feature Phone & Keypad (*99#)</span>
                <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-mono">
                  GSM Standard
                </span>
              </div>
              <FeaturePhoneIvrSimulator onAnalyzeSample={onAnalyzeSample} lang={lang} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-700">
                <span>2. WhatsApp Forwarded Message Interceptor</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-mono">
                  Cloud Webhook Ready
                </span>
              </div>
              <WhatsAppBharatSimulator onSelectSampleForAnalysis={onAnalyzeSample} lang={lang} />
            </div>
          </div>
        )}

        {/* SINGLE VIEW: Feature Phone Only */}
        {activeTab === 'phone' && (
          <div className="max-w-2xl mx-auto space-y-3">
            <FeaturePhoneIvrSimulator onAnalyzeSample={onAnalyzeSample} lang={lang} />
          </div>
        )}

        {/* SINGLE VIEW: WhatsApp Only */}
        {activeTab === 'whatsapp' && (
          <div className="max-w-2xl mx-auto space-y-3">
            <WhatsAppBharatSimulator onSelectSampleForAnalysis={onAnalyzeSample} lang={lang} />
          </div>
        )}
      </div>
    </div>
  );
};
