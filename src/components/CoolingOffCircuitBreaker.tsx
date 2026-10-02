import React, { useState, useEffect } from 'react';
import { Timer, Brain, ShieldAlert, CheckCircle2, AlertTriangle, BookOpen, Clock, HeartHandshake, ChevronDown, ChevronUp } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface CoolingOffCircuitBreakerProps {
  lang: SupportedLanguage;
  detectedBiases?: string[];
  isHighRisk?: boolean;
}

export function CoolingOffCircuitBreaker({ lang, detectedBiases = ['FOMO (Fear of Missing Out)', 'Artificial Urgency Trap'], isHighRisk = true }: CoolingOffCircuitBreakerProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(180);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Decision Journal State
  const [answers, setAnswers] = useState<{
    emergencyFund: boolean | null;
    guaranteedLoss: boolean | null;
    wait48Hours: boolean | null;
  }>({
    emergencyFund: null,
    guaranteedLoss: null,
    wait48Hours: null
  });

  const [journalNote, setJournalNote] = useState('');
  const [journalSaved, setJournalSaved] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setTimerActive(false);
      setTimerFinished(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, secondsLeft]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleStartTimer = () => {
    setSecondsLeft(180);
    setTimerFinished(false);
    setTimerActive(true);
  };

  const handleSaveJournal = () => {
    if (!journalNote.trim()) return;
    setJournalSaved(true);
    setTimeout(() => setJournalSaved(false), 3000);
  };

  const isHindi = lang === 'hi';

  return (
    <div className="bg-gradient-to-br from-amber-50/80 via-white to-blue-50/60 rounded-3xl border border-amber-200/90 p-5 sm:p-6 shadow-sm transition-all">
      {/* Header with Track D Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-300 flex items-center justify-center text-amber-700">
            <Timer className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wider font-mono">
                Track D: Behavioural Resilience
              </span>
              <span className="text-[10px] font-semibold text-slate-500">
                SEBI Investor Protection Directive
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              {isHindi ? 'कूलिंग-ऑफ सर्किट ब्रेकर व निर्णय डायरी' : 'Cooling-Off Circuit Breaker & Decision Journal'}
            </h3>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
          title="Toggle view"
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-5 animate-fadeIn">
          {/* Psychological Insight Alert */}
          <div className="p-3.5 bg-amber-100/70 border border-amber-300/80 rounded-2xl text-xs sm:text-sm text-amber-950 flex items-start space-x-2.5">
            <Brain className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {isHindi
                ? 'ठग हमेशा आपसे तुरंत निर्णय (Urgency / FOMO) करवाते हैं ताकि आपका दिमाग तार्किक रूप से सोचने का समय न पाए। 3 मिनट का ठहराव 92% वित्तीय गलतियों को रोक सकता है।'
                : 'Scammers weaponize FOMO and fake urgency to bypass your rational thinking. Taking an enforced 3-minute pause prevents over 92% of impulsive financial transfer regrets.'}
            </p>
          </div>

          {/* SECTION 1: 180-SECOND CIRCUIT BREAKER TIMER */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex items-center justify-center">
                <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-mono text-xl font-black ${
                  timerActive
                    ? 'border-amber-500 text-amber-600 animate-pulse bg-amber-50'
                    : timerFinished
                    ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                    : 'border-slate-200 text-slate-700 bg-slate-50'
                }`}>
                  {formatTime(secondsLeft)}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {timerFinished
                    ? (isHindi ? '✅ कूलिंग-ऑफ पूरा हुआ!' : '✅ Cooling-Off Complete!')
                    : timerActive
                    ? (isHindi ? 'गहरी सांस लें और सोचें...' : 'Take 3 deep breaths and pause...')
                    : (isHindi ? '180 सेकंड का सुरक्षा ठहराव' : '180-Second Mandatory Pause')}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {timerFinished
                    ? (isHindi ? 'अब आपका दिमाग शांत है। नीचे दिए गए 3 सवालों पर विचार करें।' : 'Your mind is clear of adrenaline. Review the 3 grounding questions below.')
                    : (isHindi ? 'पैसे ट्रांसफर करने या लिंक दबाने से पहले 3 मिनट रुकें।' : 'Do not click links or send UPI payments during this mandatory pause.')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              {!timerActive && !timerFinished && (
                <button
                  onClick={handleStartTimer}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Clock className="w-4 h-4" />
                  <span>{isHindi ? 'सर्किट ब्रेकर शुरू करें (3 Min)' : 'Start Circuit Breaker (3 Min)'}</span>
                </button>
              )}

              {timerActive && (
                <button
                  onClick={() => setTimerActive(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>{isHindi ? 'रोकें' : 'Pause'}</span>
                </button>
              )}

              {timerFinished && (
                <button
                  onClick={handleStartTimer}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Clock className="w-4 h-4" />
                  <span>{isHindi ? 'दोबारा शुरू करें' : 'Reset Timer'}</span>
                </button>
              )}
            </div>
          </div>

          {/* SECTION 2: 3 GROUNDING PRE-COMMITMENT QUESTIONS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-slate-600" />
              <span>{isHindi ? '3 पूर्व-प्रतिबद्धता सुरक्षा सवाल (Pre-Commitment Checklist)' : '3 Grounding Questions Before Any Transfer'}</span>
            </h4>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Question 1 */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">
                    1. {isHindi ? 'क्या यह पैसा अगले 6 महीनों में परिवार के किसी जरूरी काम के लिए है?' : 'Is this emergency savings needed by your family in the next 6 months?'}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {isHindi ? 'आपातकालीन फंड या बच्चों की फीस कभी भी सट्टेबाजी या अज्ञात सलाह में न लगाएं।' : 'Emergency, medical, or education funds should never be exposed to speculative tips.'}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    onClick={() => setAnswers({ ...answers, emergencyFund: true })}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      answers.emergencyFund === true
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isHindi ? 'हाँ (रोकें ❌)' : 'Yes (Stop ❌)'}
                  </button>
                  <button
                    onClick={() => setAnswers({ ...answers, emergencyFund: false })}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      answers.emergencyFund === false
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isHindi ? 'नहीं' : 'No'}
                  </button>
                </div>
              </div>

              {/* Question 2 */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">
                    2. {isHindi ? 'क्या किसी ने वादा किया है कि इसमें "नुकसान बिल्कुल नहीं हो सकता"?' : 'Did someone claim "Capital 100% Guaranteed with Zero Risk"?'}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {isHindi ? 'सेबी के अनुसार शेयर बाजार में गारंटीड रिटर्न देना गैरकानूनी है।' : 'Under SEBI rules, guaranteed fixed returns on equity/trading are strictly illegal.'}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    onClick={() => setAnswers({ ...answers, guaranteedLoss: true })}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      answers.guaranteedLoss === true
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isHindi ? 'हाँ (धोखा ❌)' : 'Yes (Scam ❌)'}
                  </button>
                  <button
                    onClick={() => setAnswers({ ...answers, guaranteedLoss: false })}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      answers.guaranteedLoss === false
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isHindi ? 'नहीं' : 'No'}
                  </button>
                </div>
              </div>

              {/* Question 3 */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">
                    3. {isHindi ? 'क्या आप इस फैसले को 48 घंटे (सोमवार तक) टाल सकते हैं?' : 'Can you wait 48 hours before transferring any funds?'}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {isHindi ? 'अगर वे कह रहे हैं "आज ही मौका खत्म हो जाएगा", तो यह 100% मनोवैज्ञानिक जाल है।' : 'If they claim "Offer closes today", it is deliberate FOMO manipulation.'}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    onClick={() => setAnswers({ ...answers, wait48Hours: true })}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      answers.wait48Hours === true
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isHindi ? 'हाँ (टालें ✅)' : 'Yes (Wait ✅)'}
                  </button>
                  <button
                    onClick={() => setAnswers({ ...answers, wait48Hours: false })}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      answers.wait48Hours === false
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isHindi ? 'नहीं (दबाव है)' : 'No (Feeling Rushed)'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: DECISION JOURNAL ENTRY */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/90 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>{isHindi ? 'निवेशक आत्म-चिंतन डायरी (Decision Journal Note)' : 'Investor Reflection Journal Note'}</span>
              </span>
              {journalSaved && (
                <span className="text-[11px] font-bold text-emerald-600 flex items-center space-x-1 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'सहेजा गया' : 'Note Saved'}</span>
                </span>
              )}
            </div>

            <textarea
              rows={2}
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              placeholder={
                isHindi
                  ? 'लिखें: आपको किस बात ने आकर्षित किया? क्या आपको किसी ने जल्दी करने को कहा है? (यह आपके फोन में सुरक्षित रहेगा)'
                  : 'Write down: What attracted you to this claim? Who told you to rush? (Stored locally on your device for sanity check)'
              }
              className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-sans"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {isHindi ? 'गोपनीय: यह नोट कभी सर्वर पर नहीं भेजा जाता' : 'Confidential: Never uploaded to cloud'}
              </span>
              <button
                onClick={handleSaveJournal}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold cursor-pointer"
              >
                {isHindi ? 'डायरी में दर्ज करें' : 'Record in Journal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
