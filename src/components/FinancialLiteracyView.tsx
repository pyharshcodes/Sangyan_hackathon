import React, { useState } from 'react';
import { BookOpen, Sparkles, AlertCircle, ShieldCheck, Volume2, Square } from 'lucide-react';
import { BHARAT_GLOSSARY, OFFICIAL_CHANNELS } from '../data/educationalKnowledge';
import { VoiceNarrator } from '../engine/voiceNarrator';
import { SupportedLanguage } from '../types';

interface FinancialLiteracyViewProps {
  lang: SupportedLanguage;
}

export const FinancialLiteracyView: React.FC<FinancialLiteracyViewProps> = ({ lang }) => {
  const [activeSpeechIdx, setActiveSpeechIdx] = useState<number | null>(null);

  const handleSpeakTerm = (idx: number, item: typeof BHARAT_GLOSSARY[0]) => {
    if (activeSpeechIdx === idx) {
      VoiceNarrator.stop();
      setActiveSpeechIdx(null);
    } else {
      let speechText = '';
      if (lang === 'hi') {
        speechText = `${item.termHi}। इसका सरल अर्थ: ${item.simpleDefinitionHi}। देसी उदाहरण: ${item.ruralAnalogyHi}। ठगों की सामान्य चाल: ${item.commonScamTrick}`;
      } else if (lang === 'bn') {
        speechText = `${item.term}। সহজ অর্থ: ${item.simpleDefinition}। প্রতারকদের সাধারণ কৌশল: ${item.commonScamTrick}`;
      } else if (lang === 'as') {
        speechText = `${item.term}। সহজ অৰ্থ: ${item.simpleDefinition}। প্ৰতাৰকৰ কৌশল: ${item.commonScamTrick}`;
      } else {
        speechText = `${item.term}. Simple definition: ${item.simpleDefinition}. Common deception tactic: ${item.commonScamTrick}`;
      }

      const success = VoiceNarrator.speak(speechText, lang, () => {
        setActiveSpeechIdx(null);
      });
      if (success) setActiveSpeechIdx(idx);
    }
  };

  const titleText =
    lang === 'hi'
      ? 'भारत-फर्स्ट निवेशक पाठशाला (Investor Resilience for Bharat)'
      : lang === 'bn'
      ? 'ভারত-ফার্স্ট বিনিয়োগকারী পাঠশালা (Investor Resilience for Bharat)'
      : lang === 'as'
      ? 'ভাৰত-ফাৰ্ষ্ট বিনিয়োগকাৰী পাঠশালা (Investor Resilience for Bharat)'
      : 'Bharat-First Investor Resilience & Literacy';

  const subText =
    lang === 'hi'
      ? 'कठिन अंग्रेजी शब्दों को आसान देसी भाषा और ग्रामीण उदाहरणों में समझें। जानें कि कैसे ठग आपके विश्वास का दुरुपयोग करते हैं।'
      : lang === 'bn'
      ? 'জটিল বাজার পরিভাষা সহজ গ্রামীণ উপমায় বুঝুন। জানুন কীভাবে প্রতারকরা সাধারণ মানুষের বিশ্বাসের অপব্যবহার করে।'
      : lang === 'as'
      ? 'কঠিন বজাৰৰ শব্দবোৰ সহজ উপমাৰে বুজি লওক। জানক কেনেকৈ প্ৰতাৰকে আপোনাৰ বিশ্বাসৰ অপব্যৱহাৰ কৰে।'
      : 'Demystifying complex market jargon into clear vernacular analogies. Understand how fraudulent operators deceive retail investors.';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-blue-900">
        <div className="flex items-center space-x-3 mb-2">
          <BookOpen className="w-6 h-6 text-amber-300" />
          <h2 className="text-lg sm:text-xl font-bold">
            {titleText}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-blue-200 max-w-2xl leading-relaxed">
          {subText}
        </p>
      </div>

      {/* Bharat Glossary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BHARAT_GLOSSARY.map((item, idx) => {
          const isSpeakingThis = activeSpeechIdx === idx;
          const displayTerm = lang === 'hi' ? item.termHi : item.term;
          const displayDef = lang === 'hi' ? item.simpleDefinitionHi : item.simpleDefinition;

          return (
            <div
              key={idx}
              className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-300 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    {displayTerm}
                  </h3>
                  <button
                    onClick={() => handleSpeakTerm(idx, item)}
                    className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      isSpeakingThis
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                    }`}
                  >
                    {isSpeakingThis ? (
                      <>
                        <Square className="w-3 h-3 fill-current" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{lang === 'hi' ? 'सुनें (Listen)' : 'Listen Audio'}</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {displayDef}
                </p>

                {/* Rural Analogy */}
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-amber-900 mb-0.5">
                      {lang === 'hi' ? 'देसी उदाहरण:' : 'Grassroots Analogy:'}
                    </span>
                    <span>{item.ruralAnalogyHi}</span>
                  </div>
                </div>

                {/* Scam Trick */}
                <div className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl text-xs text-rose-950 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-rose-900 mb-0.5">
                      {lang === 'hi' ? 'ठगों की सामान्य चाल:' : 'Scam Exploitation Tactic:'}
                    </span>
                    <span>{item.commonScamTrick}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Grievance Portals Guide */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>{lang === 'hi' ? 'आधिकारिक नियामक व शिकायत केंद्र' : 'Official Regulatory & Grievance Channels'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
            <div className="font-bold text-slate-900 text-sm">{OFFICIAL_CHANNELS.sebiScores.name}</div>
            <p className="text-slate-600">{OFFICIAL_CHANNELS.sebiScores.purpose}</p>
            <div className="pt-2 border-t border-slate-200 text-blue-900 font-semibold">
              Helpline: {OFFICIAL_CHANNELS.sebiScores.helpline}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2 text-xs">
            <div className="font-bold text-rose-950 text-sm">{OFFICIAL_CHANNELS.cybercrime.name}</div>
            <p className="text-slate-600">{OFFICIAL_CHANNELS.cybercrime.purpose}</p>
            <div className="pt-2 border-t border-rose-200 text-rose-700 font-bold">
              Helpline: {OFFICIAL_CHANNELS.cybercrime.helpline}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
            <div className="font-bold text-slate-900 text-sm">{OFFICIAL_CHANNELS.nsdl.name}</div>
            <p className="text-slate-600">{OFFICIAL_CHANNELS.nsdl.purpose}</p>
            <div className="pt-2 border-t border-slate-200 text-slate-800 font-semibold">
              Portal: {OFFICIAL_CHANNELS.nsdl.portal}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
