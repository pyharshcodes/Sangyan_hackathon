import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, AlertCircle, Info, PhoneCall, Copy, Check, FileText } from 'lucide-react';
import { AnalysisResult, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface RiskAssessmentCardProps {
  result: AnalysisResult;
  lang: SupportedLanguage;
  onOpenComplaintDraft?: () => void;
}

export const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({
  result,
  lang,
  onOpenComplaintDraft
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const score = result.heuristicScore || 0;

  const handleCopyDossier = () => {
    const textToCopy = `[SANGYAN KAVACH FRAUD DOSSIER]\nThreat Level: ${result.overallAssessment} (${score}/100)\nContent: ${result.sanitizedInput}\nIdentified Signals: ${result.evidenceCards.map((c) => c.category + ': ' + c.evidence).join('; ')}\nTimestamp: ${result.timestamp}\nReported via SANGYAN KAVACH Shield.`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

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
          glowRing: 'ring-emerald-500/20 border-emerald-200',
          strokeColor: '#059669',
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
          glowRing: 'ring-amber-500/20 border-amber-200',
          strokeColor: '#d97706',
          icon: AlertCircle
        };
      case 'Critical':
        return {
          title:
            lang === 'hi'
              ? 'अति-गंभीर जोखिम (CRITICAL FRAUD THREAT)'
              : lang === 'bn'
              ? 'মারাত্মক ঝুঁকি (CRITICAL RISK)'
              : lang === 'as'
              ? 'মাৰাত্মক বিপদ (CRITICAL RISK)'
              : 'CRITICAL FRAUD THREAT',
          desc:
            lang === 'hi'
              ? 'अवैध पोंजी स्कीम / वित्तीय धोखाधड़ी के पुख्ता प्रमाण! पैसे कभी ट्रांसफर न करें।'
              : lang === 'bn'
              ? 'গুরুতর প্রতারণামূলক পরিকল্পনার সুস্পষ্ট প্রমাণ! টাকা পাঠাবেন না।'
              : lang === 'as'
              ? 'গুৰুতৰ প্ৰতাৰণামূলক আঁচনিৰ স্পষ্ট প্ৰমাণ! ধন কেতিয়াও নিদিব।'
              : 'High probability of malicious financial fraud. Strictly DO NOT send funds.',
          badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
          indicatorBg: 'bg-rose-700 text-white',
          glowRing: 'ring-rose-500/30 border-rose-300 shadow-rose-500/10 shadow-lg',
          strokeColor: '#e11d48',
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
              ? 'भ्रामक दावे और अपुष्ट जानकारी पाई गई है। अत्यधिक सतर्कता बरतें।'
              : lang === 'bn'
              ? 'প্রতারণার লক্ষণ ও অপ্রমাণিত দাবির উপস্থিতি।'
              : lang === 'as'
              ? 'প্ৰতাৰণাৰ লক্ষণ আৰু প্ৰমাণহীন দাবী পোৱা গৈছে।'
              : 'Significant deception patterns and unverified claims detected.',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          indicatorBg: 'bg-amber-700 text-white',
          glowRing: 'ring-amber-500/25 border-amber-300',
          strokeColor: '#b45309',
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
          glowRing: 'ring-yellow-500/20 border-yellow-200',
          strokeColor: '#ca8a04',
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
          glowRing: 'ring-emerald-500/20 border-emerald-200',
          strokeColor: '#047857',
          icon: ShieldCheck
        };
    }
  };

  const item = getAssessmentDisplay();
  const Icon = item.icon;
  const isHighOrCritical = result.overallAssessment === 'Critical' || result.overallAssessment === 'High';

  // SVG circular gauge math
  const radius = 38;
  const circumference = 2 * Math.PI * radius; // ~238.76
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div
      className={`bg-white/95 backdrop-blur-md rounded-3xl border p-6 sm:p-8 space-y-5 transition-all ring-4 ${item.glowRing}`}
    >
      {/* Top Header Label with Live Timestamp */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 font-mono">
            {t.riskAssessmentTitle}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-mono">
            DPDP MASKED
          </span>
        </div>

        <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-mono">
          <span>Heuristic + Gemini Engine</span>
          <span className="font-bold text-slate-900">· {result.heuristicScore}/100</span>
        </div>
      </div>

      {/* Main Status & Circular Threat Speedometer Gauge */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Side: Icon & Title */}
        <div className="flex items-start space-x-4 flex-1">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${item.indicatorBg}`}>
            <Icon className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {item.title}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              {item.desc}
            </p>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
              {result.fraudTaxonomy && (
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border font-mono ${
                  result.fraudTaxonomy === 'BENIGN'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : result.fraudTaxonomy === 'SUSPICIOUS'
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : result.fraudTaxonomy === 'UNCERTAIN'
                    ? 'bg-sky-50 text-sky-800 border-sky-300'
                    : 'bg-rose-50 text-rose-800 border-rose-300'
                }`}>
                  Taxonomy: {result.fraudTaxonomy}
                </span>
              )}
              {result.urlClassification && (
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-mono">
                  {result.urlClassification}
                </span>
              )}
              {result.documentContentType && !result.urlClassification && (
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-mono">
                  {result.documentContentType.replace(/_/g, ' ')}
                </span>
              )}
              {(result.financialRelevanceLevel || result.financialRelevance) && (
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border font-mono ${
                    (result.financialRelevanceLevel === 'NONE' || result.financialRelevance === 'NO')
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : (result.financialRelevanceLevel === 'HIGH' || result.financialRelevance === 'YES')
                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  Financial Scope: {result.financialRelevanceLevel || result.financialRelevance}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Futuristic Circular Threat Dial */}
        <div className="flex items-center space-x-4 self-center md:self-auto bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200 shrink-0">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
              {/* Background circle track */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="text-slate-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress arc with dynamic stroke */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke={item.strokeColor}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner dial text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-slate-900 tracking-tight leading-none font-mono">
                {score}%
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5 font-mono">
                THREAT
              </span>
            </div>
          </div>

          <div className="text-left space-y-1">
            <div className="text-xs font-bold text-slate-800">
              {lang === 'hi' ? 'खतरे की तीव्रता' : 'Threat Metric'}
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              Severity: <strong className="text-slate-900">{result.overallAssessment}</strong>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Calibrated Heuristic Index
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Action Strip if High or Critical Risk */}
      {isHighOrCritical && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 flex flex-wrap items-center justify-between gap-3 text-xs text-rose-950">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping shrink-0" />
            <span className="font-bold leading-relaxed">
              {lang === 'hi'
                ? 'सतर्कता: इस व्यक्ति या ग्रुप को कोई पैसा न भेजें। साइबर क्राइम रिपोर्टिंग सक्रिय करें।'
                : 'CRITICAL ALERT: Do not send money or OTP. Preserve evidence & report immediately.'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:1930"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-xs cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Dial 1930</span>
            </a>

            {onOpenComplaintDraft && (
              <button
                onClick={onOpenComplaintDraft}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white text-rose-800 hover:bg-rose-100 border border-rose-300 font-bold transition-all shadow-xs cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-rose-600" />
                <span>{lang === 'hi' ? 'पुलिस/सेबी ड्राफ्ट' : 'FIR / Police Dossier'}</span>
              </button>
            )}

            <button
              onClick={handleCopyDossier}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-xs cursor-pointer"
              title="Copy incident forensic summary to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Dossier'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Hybrid AI Semantic Archetype & Case Precedent */}
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

      {/* Evidence-First Calibrated Reasoning Panel */}
      {((result.negativeEvidence && result.negativeEvidence.length > 0) ||
        (result.positiveEvidence && result.positiveEvidence.length > 0)) && (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center space-x-1.5 font-mono uppercase tracking-wider text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Evidence-First Risk Calibration Engine</span>
            </span>
            {result.requestedAction && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                Action: {result.requestedAction}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Negative Evidence / Mitigating Safety Factors */}
            {result.negativeEvidence && result.negativeEvidence.length > 0 && (
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                <div className="text-[11px] font-bold text-emerald-900 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    {lang === 'hi'
                      ? 'सुरक्षा संकेत व शमन कारक (नकारात्मक साक्ष्य)'
                      : 'Safety Signals & Mitigating Factors (Negative Evidence)'}
                  </span>
                </div>
                <ul className="space-y-1 pl-4 list-disc text-emerald-800 text-[11px] leading-relaxed">
                  {(lang === 'hi' && result.negativeEvidenceHi ? result.negativeEvidenceHi : result.negativeEvidence).map(
                    (signal, idx) => (
                      <li key={idx}>{signal}</li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Positive Fraud Evidence */}
            {result.positiveEvidence && result.positiveEvidence.length > 0 && (
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-1.5">
                <div className="text-[11px] font-bold text-rose-900 flex items-center space-x-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>
                    {lang === 'hi'
                      ? 'सक्रिय धोखाधड़ी व भ्रामक संकेत (सकारात्मक साक्ष्य)'
                      : 'Deception Markers & Active Risk (Positive Evidence)'}
                  </span>
                </div>
                <ul className="space-y-1 pl-4 list-disc text-rose-800 text-[11px] leading-relaxed">
                  {(lang === 'hi' && result.positiveEvidenceHi ? result.positiveEvidenceHi : result.positiveEvidence).map(
                    (signal, idx) => (
                      <li key={idx}>{signal}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Transparent Disclaimer */}
      <div className="pt-1 flex items-start space-x-2 text-[11px] text-slate-400 border-t border-slate-100">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <p>{result.heuristicScoreDisclaimer}</p>
      </div>
    </div>
  );
};
