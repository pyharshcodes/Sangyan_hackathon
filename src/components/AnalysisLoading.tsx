import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AnalysisLoadingProps {
  onComplete: () => void;
  lang: SupportedLanguage;
}

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({ onComplete, lang }) => {
  const [activeStep, setActiveStep] = useState(0);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const getStageTitle = (index: number) => {
    switch (index) {
      case 0: return t.stages.reading;
      case 1: return t.stages.extracting;
      case 2: return t.stages.checking;
      case 3: return t.stages.analyzing;
      case 4: return t.stages.preparing;
      default: return '';
    }
  };

  const stages = [
    { title: getStageTitle(0), desc: 'Sanitizing personal identifiers in-memory.' },
    { title: getStageTitle(1), desc: 'Identifying promised returns, URLs, and regulatory tokens.' },
    { title: getStageTitle(2), desc: 'Comparing registration syntax and official broker domains.' },
    { title: getStageTitle(3), desc: 'Correlating coercive urgency and pump-and-dump patterns.' },
    { title: getStageTitle(4), desc: 'Synthesizing evidence-backed assessment and Bharat audio.' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(onComplete, 350);
          return prev;
        }
      });
    }, 400);

    return () => clearInterval(timer);
  }, [onComplete, stages.length]);

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-10 text-center max-w-xl mx-auto">
      {/* Calm Status Icon */}
      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mx-auto mb-4 border border-slate-200">
        <Loader2 className="w-6 h-6 animate-spin text-slate-700" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 tracking-tight">
        {t.analyzingTitle}
      </h3>
      <p className="text-xs text-slate-500 mt-1 mb-8 max-w-sm mx-auto">
        {t.analyzingSubtitle}
      </p>

      {/* Clean 5-Stage Step Progression */}
      <div className="space-y-3 text-left">
        {stages.map((stage, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                isCurrent
                  ? 'bg-slate-50 border-slate-400 shadow-xs'
                  : isDone
                  ? 'bg-emerald-50/40 border-emerald-200 text-slate-800'
                  : 'bg-slate-50/20 border-slate-100 opacity-40 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isDone ? '✓' : idx + 1}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900">
                    {stage.title}
                  </div>
                  <div className="text-[11px] text-slate-500 hidden sm:block">
                    {stage.desc}
                  </div>
                </div>
              </div>

              {isCurrent && (
                <span className="text-[11px] font-mono font-semibold text-slate-600 animate-pulse">
                  Working...
                </span>
              )}
              {isDone && (
                <span className="text-[11px] font-mono font-semibold text-emerald-700">
                  Done
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
