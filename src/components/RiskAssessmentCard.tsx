import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { AnalysisResult, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface RiskAssessmentCardProps {
  result: AnalysisResult;
  lang: SupportedLanguage;
}

export const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({ result, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const getAssessmentDisplay = () => {
    switch (result.overallAssessment) {
      case 'No Financial Risk':
        return {
          title:
            lang === 'hi'
              ? 'कोई वित्तीय जोखिम नहीं (NO FINANCIAL RISK)'
              : lang === 'bn'
              ? 'কোনো আর্থিক ঝুঁকি নেই (NO FINANCIAL RISK)'
              : lang === 'as'
              ? 'কোনো বিত্তীয় বিপদ নাই (NO FINANCIAL RISK)'
              : 'NO FINANCIAL RISK',
          desc:
            lang === 'hi'
              ? 'यह गैर-वित्तीय सामग्री या व्यक्तिगत दस्तावेज़ है। कोई निवेश या धोखाधड़ी का जोखिम नहीं।'
              : lang === 'bn'
              ? 'এটি অ-আর্থিক বিষয়বস্তু বা ব্যক্তিগত নথি। এতে কোনো বিনিয়োগ ঝুঁকি বা প্রতারণা নেই।'
              : lang === 'as'
              ? 'ইয়া কোনো বিত্তীয় বিনিয়োগ বা প্ৰতাৰণামূলক বিষয়বস্তু নহয়।'
              : 'Non-financial or personal content. Zero investment fraud risk.',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          indicatorBg: 'bg-emerald-600 text-white',
          icon: ShieldCheck
        };
      case 'Needs Verification':
        return {
          title:
            lang === 'hi'
              ? 'सत्यापन आवश्यक (NEEDS VERIFICATION)'
              : lang === 'bn'
              ? 'যাচাই প্রয়োজন (NEEDS VERIFICATION)'
              : lang === 'as'
              ? 'পৰীক্ষাৰ প্ৰয়োজন (NEEDS VERIFICATION)'
              : 'NEEDS VERIFICATION',
          desc:
            lang === 'hi'
              ? 'अस्पष्ट या अपर्याप्त जानकारी। बिना आधिकारिक पुष्टि के कोई वित्तीय निर्णय न लें।'
              : lang === 'bn'
              ? 'অস্পষ্ট তথ্য। কোনো আর্থিক সিদ্ধান্ত নেওয়ার আগে সরকারি উৎস থেকে যাচাই করুন।'
              : lang === 'as'
              ? 'অস্পষ্ট তথ্য। বিত্তীয় সিদ্ধান্ত লোৱাৰ আগতে পৰীক্ষা কৰক।'
              : 'Ambiguous or insufficient evidence. Independent verification advised.',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          indicatorBg: 'bg-amber-600 text-white',
          icon: AlertCircle
        };
      case 'Critical':
        return {
          title:
            lang === 'hi'
              ? 'अति-गंभीर जोखिम (CRITICAL RISK)'
              : lang === 'bn'
              ? 'মারাত্মক ঝুঁকি (CRITICAL RISK)'
              : lang === 'as'
              ? 'মাৰাত্মক বিপদ (CRITICAL RISK)'
              : 'CRITICAL RISK',
          desc:
            lang === 'hi'
              ? 'गंभीर धोखाधड़ी या अवैध योजना के पुख्ता संकेत।'
              : lang === 'bn'
              ? 'গুরুতর প্রতারণামূলক পরিকল্পনার সুস্পষ্ট প্রমাণ।'
              : lang === 'as'
              ? 'গুৰুতৰ প্ৰতাৰণামূলক আঁচনিৰ স্পষ্ট প্ৰমাণ।'
              : 'High probability of malicious deception or fraudulent scheme.',
          badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
          indicatorBg: 'bg-rose-700 text-white',
          icon: ShieldAlert
        };
      case 'High':
        return {
          title:
            lang === 'hi'
              ? 'उच्च जोखिम (HIGH RISK)'
              : lang === 'bn'
              ? 'উচ্চ ঝুঁকি (HIGH RISK)'
              : lang === 'as'
              ? 'উচ্চ বিপদ (HIGH RISK)'
              : 'HIGH RISK',
          desc:
            lang === 'hi'
              ? 'भ्रामक दावे और अपुष्ट जानकारी पाई गई है।'
              : lang === 'bn'
              ? 'প্রতারণার লক্ষণ ও অপ্রমাণিত দাবির উপস্থিতি।'
              : lang === 'as'
              ? 'প্ৰতাৰণাৰ লক্ষণ আৰু প্ৰমাণহীন দাবী পোৱা গৈছে।'
              : 'Significant deception patterns and unverified claims detected.',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          indicatorBg: 'bg-amber-700 text-white',
          icon: AlertTriangle
        };
      case 'Moderate':
        return {
          title:
            lang === 'hi'
              ? 'सावधानी आवश्यक (MODERATE CAUTION)'
              : lang === 'bn'
              ? 'সতর্কতা প্রয়োজন (MODERATE CAUTION)'
              : lang === 'as'
              ? 'সাৱধানতা প্ৰয়োজন (MODERATE CAUTION)'
              : 'MODERATE CAUTION',
          desc:
            lang === 'hi'
              ? 'अपुष्ट प्रचार सामग्री। स्वतंत्र पुष्टि आवश्यक है।'
              : lang === 'bn'
              ? 'অযাচাইকৃত প্রচারমূলক দাবি। সতর্ক থাকুন।'
              : lang === 'as'
              ? 'অযাচাইকৃত প্ৰচাৰমূলক দাবী। সতৰ্ক থাকক।'
              : 'Unsubstantiated promotional claims. Independent verification required.',
          badgeBg: 'bg-yellow-100 text-yellow-900 border-yellow-300',
          indicatorBg: 'bg-yellow-700 text-white',
          icon: AlertCircle
        };
      case 'Low':
      default:
        return {
          title:
            lang === 'hi'
              ? 'कम जोखिम / संतुलित सामग्री (LOW RISK)'
              : lang === 'bn'
              ? 'স্বাভাবিক / কম ঝুঁকি (LOW RISK)'
              : lang === 'as'
              ? 'স্বাভাৱিক / কম বিপদ (LOW RISK)'
              : 'LOW RISK / BALANCED',
          desc:
            lang === 'hi'
              ? 'उचित जानकारी व जोखिम प्रकटीकरण वाली सामग्री।'
              : lang === 'bn'
              ? 'সঠিক তথ্য ও ভারসাম্যপূর্ণ সতর্কতাসহ বার্তা।'
              : lang === 'as'
              ? 'সঠিক তথ্য আৰু সন্তুলিত বিষয়বস্তু।'
              : 'Educational or informational content with balanced disclosures.',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          indicatorBg: 'bg-emerald-700 text-white',
          icon: ShieldCheck
        };
    }
  };

  const item = getAssessmentDisplay();
  const Icon = item.icon;

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-4">
      {/* Top Header Label */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {t.riskAssessmentTitle}
        </div>
        <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 font-mono">
          <span>Heuristic Index:</span>
          <span className="font-bold text-slate-900">{result.heuristicScore}/100</span>
        </div>
      </div>

      {/* Main Status Block (Accessible: text + icon + badge, never color alone) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.indicatorBg}`}>
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {item.title}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {item.desc}
            </p>
          </div>
        </div>

        {/* Content Category & Relevance Badges */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
          {result.urlClassification && (
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-mono">
              {result.urlClassification}
            </span>
          )}
          {result.documentContentType && !result.urlClassification && (
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-mono">
              {result.documentContentType.replace(/_/g, ' ')}
            </span>
          )}
          {result.financialRelevance && (
            <span
              className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl border font-mono ${
                result.financialRelevance === 'NO'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : result.financialRelevance === 'YES'
                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              Relevance: {result.financialRelevance}
            </span>
          )}
          {!result.documentContentType && !result.urlClassification && (
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-mono">
              {result.contentClassification}
            </span>
          )}
        </div>
      </div>

      {/* Hybrid AI Semantic Archetype & Case Precedent (Flaw 1 Solution) */}
      {result.semanticArchetype && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/90 space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-indigo-950 flex items-center space-x-1.5">
              <span className="px-2 py-0.5 rounded-md bg-indigo-200 text-indigo-900 font-mono text-[10px] font-black uppercase">
                Hybrid AI Grounding
              </span>
              <span>{lang === 'hi' ? result.semanticArchetype.nameHi : result.semanticArchetype.name}</span>
            </span>
            <span className="text-[11px] font-mono font-bold text-indigo-800 bg-white px-2 py-0.5 rounded border border-indigo-200">
              Vector Match: {result.semanticArchetype.similarityScore}%
            </span>
          </div>

          <div className="text-[11px] text-slate-700 bg-white/70 p-2.5 rounded-xl border border-indigo-100 font-sans space-y-1">
            <div className="font-semibold text-indigo-900">
              ⚖️ {result.semanticArchetype.sebiPrecedentCitation}
            </div>
            <p className="text-slate-600">
              {lang === 'hi' ? result.semanticArchetype.modusOperandiHi : result.semanticArchetype.modusOperandi}
            </p>
          </div>
        </div>
      )}

      {/* Regional Community Threat Telemetry (Flaw 10 Solution) */}
      {result.threatTelemetry && (
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-2 text-xs text-rose-900">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            <span className="font-bold">
              {lang === 'hi'
                ? `⚠️ क्षेत्रीय थ्रेट लेजर: पिछले 48 घंटों में ${result.threatTelemetry.regionalFlagCount} निवेशकों ने इस सिंडिकेट को रिपोर्ट किया है (${result.threatTelemetry.cityHub})`
                : `⚠️ Community Scam Telemetry: Flagged by ${result.threatTelemetry.regionalFlagCount} investors in ${result.threatTelemetry.cityHub} in the last 48 hours.`}
            </span>
          </div>
          <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold uppercase shrink-0">
            Syndicate Alert
          </span>
        </div>
      )}

      {/* Transparent Disclaimer */}
      <div className="pt-2 flex items-start space-x-2 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <p>{result.heuristicScoreDisclaimer}</p>
      </div>
    </div>
  );
};
