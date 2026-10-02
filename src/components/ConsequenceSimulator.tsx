import React, { useState } from 'react';
import { History, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { ConsequenceStep, SupportedLanguage } from '../types';

interface ConsequenceSimulatorProps {
  steps: ConsequenceStep[];
  lang: SupportedLanguage;
}

export const ConsequenceSimulator: React.FC<ConsequenceSimulatorProps> = ({ steps, lang }) => {
  if (!steps || steps.length === 0) {
    return null;
  }

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const getStateBadge = (state: string) => {
    switch (state) {
      case 'curiosity':
        return {
          text:
            lang === 'hi'
              ? 'कौतूहल / ट्रायल (Curiosity)'
              : lang === 'bn'
              ? 'কৌতূহল / ট্রায়াল (Curiosity)'
              : lang === 'as'
              ? 'কৌতূহল / ট্ৰায়েল (Curiosity)'
              : 'Curiosity / Trial',
          bg: 'bg-blue-100 text-blue-800'
        };
      case 'false_confidence':
        return {
          text:
            lang === 'hi'
              ? 'नकली विश्वास (False Confidence)'
              : lang === 'bn'
              ? 'ভুয়া আত্মবিশ্বাস (False Confidence)'
              : lang === 'as'
              ? 'ভুৱা আত্মবিশ্বাস (False Confidence)'
              : 'False Confidence',
          bg: 'bg-emerald-100 text-emerald-800'
        };
      case 'panic':
        return {
          text:
            lang === 'hi'
              ? 'घबराहट व दबाव (Panic & Coercion)'
              : lang === 'bn'
              ? 'আতঙ্ক ও চাপ (Panic & Coercion)'
              : lang === 'as'
              ? 'আতংক আৰু চাপ (Panic & Coercion)'
              : 'Panic & Coercion',
          bg: 'bg-amber-100 text-amber-800'
        };
      case 'financial_loss':
      default:
        return {
          text:
            lang === 'hi'
              ? 'आर्थिक नुकसान (Permanent Loss)'
              : lang === 'bn'
              ? 'আর্থিক ক্ষতি (Permanent Loss)'
              : lang === 'as'
              ? 'বিত্তীয় ক্ষতি (Permanent Loss)'
              : 'Permanent Financial Loss',
          bg: 'bg-rose-100 text-rose-800'
        };
    }
  };

  const titleText =
    lang === 'hi'
      ? 'धोखाधड़ी प्रभाव सिम्युलेटर (Consequence Simulator)'
      : lang === 'bn'
      ? 'প্রতারণা প্রভাব সিমুলেটর (Consequence Simulator)'
      : lang === 'as'
      ? 'প্ৰতাৰণা প্ৰভাৱ চিমুলেটৰ (Consequence Simulator)'
      : 'Educational Fraud-Mechanics Simulator';

  const subText =
    lang === 'hi'
      ? 'समझें कि कैसे शुरुआती लालच से लेकर अंतिम नुकसान तक यह चक्र काम करता है'
      : lang === 'bn'
      ? 'কীভাবে প্রাথমিক লোভ থেকে শেষ পর্যন্ত আর্থিক ক্ষতি হয় তার ধাপগুলো বুঝুন'
      : lang === 'as'
      ? 'প্ৰাৰম্ভিক লোভৰ পৰা চূড়ান্ত ক্ষতি হোৱালৈকে এই চক্ৰটো কেনেকৈ চলে বুজি লওক'
      : 'Step-by-step breakdown of how common investment deception unfolds over time.';

  const guardrailNotice =
    lang === 'hi'
      ? 'महत्वपूर्ण सूचना: "यह सामान्य धोखाधड़ी पैटर्न का केवल एक शैक्षणिक उदाहरण है, भविष्य की कोई भविष्यवाणी नहीं।"'
      : lang === 'bn'
      ? 'গুরুত্বপূর্ণ বিজ্ঞপ্তি: "এটি সাধারণ প্রতারণার কৌশলের একটি শিক্ষামূলক দৃষ্টান্ত, কোনো ভবিষ্যৎবাণী নয়।"'
      : lang === 'as'
      ? 'গুৰুত্বপূৰ্ণ জাননী: "এইটো সাধাৰণ প্ৰতাৰণাৰ এক শিক্ষামূলক উদাহৰণ, ভৱিষ্যতৰ কোনো ভৱিষ্যদ্বাণী নহয়।"'
      : 'Mandatory Notice: "This is an educational illustration of a common fraud pattern, not a prediction of what will happen."';

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <History className="w-4 h-4 text-rose-600" />
            <span>{titleText}</span>
          </h3>
          <p className="text-xs text-slate-500">
            {subText}
          </p>
        </div>
      </div>

      {/* Mandatory Regulatory Guardrail Notice */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start space-x-2 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span className="font-medium">
          {guardrailNotice}
        </span>
      </div>

      {/* Timeline Nav Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const displayTitle = lang === 'hi' ? step.titleHi : step.title;
          return (
            <button
              key={idx}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'border-blue-900 bg-blue-900 text-white shadow-sm'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold">{step.day}</span>
                <Clock className={`w-3.5 h-3.5 ${isActive ? 'text-blue-200' : 'text-slate-400'}`} />
              </div>
              <div className="text-[11px] font-semibold mt-1 truncate">
                {displayTitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep Breakdown */}
      {steps[activeStepIndex] && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono text-xs font-bold">
                {steps[activeStepIndex].day}
              </span>
              <h4 className="font-bold text-sm sm:text-base text-slate-900">
                {lang === 'hi' ? steps[activeStepIndex].titleHi : steps[activeStepIndex].title}
              </h4>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                getStateBadge(steps[activeStepIndex].userState).bg
              }`}
            >
              {getStateBadge(steps[activeStepIndex].userState).text}
            </span>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {lang === 'hi' ? steps[activeStepIndex].descriptionHi : steps[activeStepIndex].description}
          </div>

          <div className="flex justify-between items-center pt-2 text-xs">
            <button
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
              className="text-slate-500 hover:text-slate-900 disabled:opacity-30 font-semibold"
            >
              ← {lang === 'hi' ? 'पिछला चरण' : 'Previous Step'}
            </button>
            <button
              disabled={activeStepIndex === steps.length - 1}
              onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
              className="text-blue-900 hover:text-blue-700 disabled:opacity-30 font-bold flex items-center gap-1"
            >
              <span>{lang === 'hi' ? 'अगला चरण' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
