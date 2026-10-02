import React from 'react';
import { CheckCircle2, HelpCircle, AlertCircle } from 'lucide-react';
import { AnalysisResult, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface EvidenceBreakdownProps {
  result: AnalysisResult;
  lang: SupportedLanguage;
}

export const EvidenceBreakdown: React.FC<EvidenceBreakdownProps> = ({ result, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const headerTitle =
    lang === 'hi'
      ? 'पुष्टि और अनिश्चितता का विवरण'
      : lang === 'bn'
      ? 'যাচাইকরণ স্থিতি ও অনিশ্চয়তা'
      : lang === 'as'
      ? 'পৰীক্ষণ স্থিতি আৰু অনিশ্চয়তা'
      : 'Verification Status & Uncertainty';

  const headerSub =
    lang === 'hi'
      ? 'सार्वजनिक रजिस्टरों और आधिकारिक डेटाबेस के आधार पर पारदर्शी जांच'
      : lang === 'bn'
      ? 'সরকারি মাস্টার রেজিস্ট্রি ও ডেটাবেসের ভিত্তিতে নিরপেক্ষ মূল্যায়ন'
      : lang === 'as'
      ? 'চৰকাৰী মাষ্টাৰ ৰেজিষ্ট্ৰী আৰু তথ্যৰ ভিত্তিত নিৰপেক্ষ বিশ্লেষণ'
      : 'Objective separation between corroborated regulatory records and unverifiable claims.';

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
          {headerTitle}
        </h3>
        <p className="text-xs text-slate-500">
          {headerSub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pillar 1: WHAT WE COULD VERIFY */}
        <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{t.whatWeCouldVerifyTitle}</span>
          </div>

          {result.verifiedEvidence.length > 0 ? (
            <ul className="space-y-2.5 text-xs text-emerald-950">
              {result.verifiedEvidence.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">
              {lang === 'hi'
                ? 'आधिकारिक डेटाबेस में कोई पुष्ट रिकॉर्ड नहीं मिला।'
                : lang === 'bn'
                ? 'সরকারি ডাটাবেসে কোনো প্রত্যয়িত রেকর্ড পাওয়া যায়নি।'
                : lang === 'as'
                ? 'চৰকাৰী তথ্যকোষত কোনো নিশ্চিত ৰেকৰ্ড পোৱা নগ\'ল।'
                : 'No corroborating records found in verified official databases.'}
            </p>
          )}

          {/* Detailed Entity Entries */}
          {result.entityVerifications.filter(v => v.status === 'Verified Official').length > 0 && (
            <div className="pt-2 border-t border-emerald-200/70 space-y-2">
              <span className="text-[11px] font-bold text-emerald-900 block">
                Official Directory Records:
              </span>
              {result.entityVerifications
                .filter(v => v.status === 'Verified Official')
                .map((v, i) => (
                  <div key={i} className="text-[11px] bg-white p-2.5 rounded-xl border border-emerald-200">
                    <span className="font-bold text-slate-900 block">{v.subject}</span>
                    <span className="text-slate-600">{v.details}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Pillar 2: WHAT WE COULD NOT VERIFY */}
        <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-3">
          <div className="flex items-center space-x-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{t.whatWeCouldNotVerifyTitle}</span>
          </div>

          {result.uncertaintyStatements.length > 0 ? (
            <ul className="space-y-2.5 text-xs text-amber-950">
              {result.uncertaintyStatements.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">
              {lang === 'hi'
                ? 'पहचाने गए सभी दावों की आधिकारिक पुष्टि मौजूद है।'
                : 'All identified claims have verifiable public corroboration.'}
            </p>
          )}

          <div className="pt-2 border-t border-amber-200/70 p-3 bg-white/80 rounded-xl text-[11px] text-slate-700 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>Independent Verification Rule</span>
            </div>
            <p className="leading-relaxed">
              If a message sender claims to be registered with SEBI but cannot provide an official certificate searchable on <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">sebi.gov.in</code>, treat it as unverified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
