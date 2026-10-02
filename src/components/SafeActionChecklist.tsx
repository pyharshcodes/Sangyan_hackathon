import React, { useState } from 'react';
import { CheckSquare, Square, FileText, PhoneCall, HeartHandshake } from 'lucide-react';
import { AnalysisResult, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface SafeActionChecklistProps {
  result: AnalysisResult;
  onOpenDraft: () => void;
  onOpenNomineeTracker?: () => void;
  lang: SupportedLanguage;
}

export const SafeActionChecklist: React.FC<SafeActionChecklistProps> = ({
  result,
  onOpenDraft,
  onOpenNomineeTracker,
  lang
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getStepText = (item: { step: string; stepHi: string }) => {
    if (lang === 'hi') return item.stepHi || item.step;
    return item.step;
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header with Exact Spec Title */}
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            {t.whatShouldYouDoNowTitle}
          </h3>
          <p className="text-xs text-slate-500">
            {t.whatShouldYouDoNowSubtitle}
          </p>
        </div>
      </div>

      {/* Checklist items with large >=44px touch targets */}
      <div className="space-y-3">
        {result.safeNextSteps.map((item, idx) => {
          const isDone = !!checkedItems[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`min-h-[52px] p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3.5 ${
                isDone
                  ? 'bg-emerald-50/60 border-emerald-300 text-slate-700'
                  : item.critical
                  ? 'bg-rose-50/30 border-rose-200 hover:bg-rose-50/60'
                  : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/70'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="flex-1 text-xs sm:text-sm">
                <span className={`font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                  {getStepText(item)}
                </span>
                {item.critical && !isDone && (
                  <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                    Critical
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons: 1930 Helpline Call, Incident Draft, and Track B Nominee Tracker */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <a
            href="tel:1930"
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t.emergencyCallBtn}</span>
          </a>

          {onOpenNomineeTracker && (
            <button
              onClick={onOpenNomineeTracker}
              className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-blue-700" />
              <span>{lang === 'hi' ? 'परिवार नॉमिनी ऑडिट (Track B)' : 'Family Nominee Audit (Track B)'}</span>
            </button>
          )}
        </div>

        {result.complaintDraft && (
          <button
            onClick={onOpenDraft}
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>{t.complaintDraftBtn}</span>
          </button>
        )}
      </div>
    </div>
  );
};
