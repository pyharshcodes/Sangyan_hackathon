import React from 'react';
import { Sparkles, Cpu, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface GeminiLiveInsightsCardProps {
  insights: {
    aiAnalysis: string;
    aiExplanationHi: string;
    manipulationTriggers: string[];
    regulatoryViolationNotes: string;
    confidenceScore: number;
    modelUsed: string;
    latencyMs?: number;
  };
  lang: SupportedLanguage;
}

export function GeminiLiveInsightsCard({ insights, lang }: GeminiLiveInsightsCardProps) {
  const isHindi = lang === 'hi';

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-indigo-700/60 space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-800/80 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
            <Sparkles className="w-5 h-5 text-indigo-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Gemini 1.5 Flash Active</span>
              </span>
              {insights.latencyMs && (
                <span className="text-[10px] text-indigo-300 font-mono flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>{insights.latencyMs}ms</span>
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
              {isHindi ? 'लाइव जेमिनी 1.5 फ्लैश एआई विश्लेषण (Generative AI Reasoning)' : 'Live Generative AI Reasoning & Forensic Breakdown'}
            </h3>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[11px] font-mono px-3 py-1 rounded-xl bg-white/10 text-indigo-200 border border-white/10">
            {insights.modelUsed}
          </span>
        </div>
      </div>

      {/* Main Analysis */}
      <div className="space-y-3">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm leading-relaxed text-indigo-100 font-sans">
          <p className="font-medium">
            {insights.aiAnalysis}
          </p>
        </div>

        {/* Vernacular Explanation from Gemini */}
        {insights.aiExplanationHi && (
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 text-xs sm:text-sm text-indigo-200 space-y-1">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block font-mono">
              आसान भाषा में जेमिनी की व्याख्या (Contextual Analogy):
            </span>
            <p className="leading-relaxed">
              {insights.aiExplanationHi}
            </p>
          </div>
        )}

        {/* Manipulation Triggers Identified by Gemini */}
        {insights.manipulationTriggers && insights.manipulationTriggers.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider font-mono">
              {isHindi ? 'पहचाने गए मनोवैज्ञानिक छल (Manipulation Tactics):' : 'Identified Psychological Triggers:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {insights.manipulationTriggers.map((trigger, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-rose-500/20 text-rose-200 border border-rose-400/30 text-xs font-semibold"
                >
                  ⚠️ {trigger}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Regulatory Citation */}
        {insights.regulatoryViolationNotes && (
          <div className="p-3 rounded-xl bg-slate-900/60 border border-indigo-500/30 text-[11px] text-indigo-300 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>SEBI Regulatory Alignment:</strong> {insights.regulatoryViolationNotes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
