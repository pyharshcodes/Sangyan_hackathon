import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InputTabs } from './components/InputTabs';
import { AnalysisLoading } from './components/AnalysisLoading';
import { RiskAssessmentCard } from './components/RiskAssessmentCard';
import { EvidenceCardsGrid } from './components/EvidenceCardsGrid';
import { EvidenceBreakdown } from './components/EvidenceBreakdown';
import { HindiExplanationCard } from './components/HindiExplanationCard';
import { ConsequenceSimulator } from './components/ConsequenceSimulator';
import { SafeActionChecklist } from './components/SafeActionChecklist';
import { ComplaintDraftModal } from './components/ComplaintDraftModal';
import { FinancialLiteracyView } from './components/FinancialLiteracyView';
import { AboutPrivacyView } from './components/AboutPrivacyView';
import { CoolingOffCircuitBreaker } from './components/CoolingOffCircuitBreaker';
import { SocraticDoubtResolver } from './components/SocraticDoubtResolver';
import { NomineeWealthTrackerModal } from './components/NomineeWealthTrackerModal';
import { GeminiApiKeyModal } from './components/GeminiApiKeyModal';
import { GeminiLiveInsightsCard } from './components/GeminiLiveInsightsCard';
import { ThreatRadarBar } from './components/ThreatRadarBar';
import { BharatSimulatorView } from './components/BharatSimulatorView';
import { playScanSound, playAlertSound, playSafeChime } from './utils/soundEffects';
import { AnalysisResult, SupportedLanguage } from './types';
import { runSangyanAnalysis } from './engine/coreAnalyzer';
import { analyzeWithGemini, isGeminiAiActive, synthesizeOfflineGeminiResponse } from './engine/geminiAiService';
import { RotateCcw, Eye, EyeOff, Lock, HeartHandshake } from 'lucide-react';
import { TRANSLATIONS } from './data/translations';

export function App() {
  const [currentView, setCurrentView] = useState<'analyze' | 'learn' | 'about' | 'simulator'>('analyze');
  // Default to English as requested: "app english language me open hona chahiye or english me he sab kuch ho"
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showComplaintDraft, setShowComplaintDraft] = useState(false);
  const [showNomineeTracker, setShowNomineeTracker] = useState(false);
  const [showAiConfig, setShowAiConfig] = useState(false);
  const [showRawInput, setShowRawInput] = useState(false);
  const [currentUploadedImage, setCurrentUploadedImage] = useState<string | undefined>(undefined);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const triggerGeminiEnrichment = (result: AnalysisResult, imagePreviewUrl?: string) => {
    setIsGeminiLoading(true);
    const detectedSignals = result.evidenceCards.map((c) => `${c.category}: ${c.evidence}`);
    analyzeWithGemini(result.sanitizedInput, detectedSignals, imagePreviewUrl)
      .then((geminiInsights) => {
        if (geminiInsights) {
          setAnalysisResult((prev) => {
            if (!prev) return null;

            // Safety Shield: Non-financial or educational content must NEVER be escalated to scam
            const isSafeOrNonFinancial =
              prev.financialRelevance === 'NO' ||
              prev.overallAssessment === 'No Financial Risk' ||
              prev.contentClassification === 'Educational';

            const isScam =
              !isSafeOrNonFinancial &&
              (geminiInsights.riskLevel === 'Critical' || geminiInsights.riskLevel === 'High') &&
              prev.financialRelevance === 'YES';

            // Only elevate overallAssessment if Gemini detected critical/high risk on verified financial scam content
            const updatedAssessment = isScam
              ? (geminiInsights.riskLevel || prev.overallAssessment)
              : prev.overallAssessment;

            const updatedScore = isScam
              ? Math.max(prev.heuristicScore, geminiInsights.confidenceScore || 85)
              : prev.heuristicScore;

            return {
              ...prev,
              geminiInsights,
              overallAssessment: updatedAssessment,
              heuristicScore: updatedScore,
              hindiExplanation: isSafeOrNonFinancial ? prev.hindiExplanation : (geminiInsights.aiExplanationHi || prev.hindiExplanation),
              whyItMattersSummary: isSafeOrNonFinancial ? prev.whyItMattersSummary : (geminiInsights.aiAnalysis || prev.whyItMattersSummary)
            };
          });
        }
      })
      .catch((err) => {
        console.warn('Gemini non-blocking enrichment error:', err);
        const fallback = synthesizeOfflineGeminiResponse(result.sanitizedInput, detectedSignals, imagePreviewUrl);
        setAnalysisResult((prev) => (prev ? { ...prev, geminiInsights: fallback } : null));
      })
      .finally(() => {
        setIsGeminiLoading(false);
      });
  };

  const handleStartAnalysis = (
    input: string,
    type: 'text' | 'image' | 'url',
    imagePreviewUrl?: string
  ) => {
    setIsLoading(true);
    setCurrentUploadedImage(imagePreviewUrl);
    playScanSound();
    // 1. Instant execution of deterministic Symbolic AI verification
    const result = runSangyanAnalysis(input, type, imagePreviewUrl);
    setAnalysisResult(result);

    // Dynamic auditory cyber alert
    if (result.overallAssessment === 'Critical' || result.overallAssessment === 'High') {
      setTimeout(() => playAlertSound(), 600);
    } else if (result.overallAssessment === 'Low' || result.overallAssessment === 'No Financial Risk') {
      setTimeout(() => playSafeChime(), 600);
    }

    // 2. Trigger Gemini Generative AI contextual reasoning & multimodal enrichment
    triggerGeminiEnrichment(result, imagePreviewUrl);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setCurrentUploadedImage(undefined);
    setIsLoading(false);
    setShowComplaintDraft(false);
    setShowRawInput(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans text-slate-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 relative bg-[#f1f6fd]"
      style={{
        backgroundImage: `url('/background.jpg')`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      {/* Background Soft Overlay for optimum card contrast */}
      <div className="fixed inset-0 bg-slate-900/5 backdrop-blur-[1px] pointer-events-none -z-10" />

      {/* GovTech Institutional Header */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        lang={lang}
        setLang={setLang}
        onOpenNomineeTracker={() => setShowNomineeTracker(true)}
        onOpenAiConfig={() => setShowAiConfig(true)}
      />

      {/* Real-time National Financial Cyber Threat Radar */}
      <ThreatRadarBar lang={lang} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* VIEW 1: ANALYZE / HOME */}
        {currentView === 'analyze' && (
          <div className="space-y-6">
            {/* If no result and not loading: Show Hero & Input Workstation */}
            {!isLoading && !analysisResult && (
              <InputTabs
                onAnalyze={handleStartAnalysis}
                lang={lang}
                onOpenSimulator={() => setCurrentView('simulator')}
              />
            )}

            {/* If loading: Show 5-stage authentic analysis experience */}
            {isLoading && (
              <div className="py-6 sm:py-12">
                <AnalysisLoading onComplete={handleLoadingComplete} lang={lang} />
              </div>
            )}

            {/* If result ready: Display GovTech Result Dossier */}
            {!isLoading && analysisResult && (
              <div className="space-y-6 animate-fadeIn">
                {/* Top Action Bar with Sticky-friendly mobile touch buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-slate-200/90 shadow-xs">
                  <button
                    onClick={handleReset}
                    className="min-h-[44px] inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-900 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-2xl transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t.checkAnotherBtn}</span>
                  </button>

                  <div className="flex flex-wrap items-center space-x-2 text-xs">
                    <button
                      onClick={() => setShowNomineeTracker(true)}
                      className="min-h-[44px] inline-flex items-center space-x-1.5 text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-bold px-3.5 py-2 rounded-2xl transition-all cursor-pointer"
                    >
                      <HeartHandshake className="w-4 h-4 text-blue-700" />
                      <span>{lang === 'hi' ? 'परिवार नॉमिनी ऑडिट' : 'Nominee Audit'}</span>
                    </button>
                    <button
                      onClick={() => setCurrentView('simulator')}
                      className="min-h-[44px] inline-flex items-center space-x-1.5 text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-bold px-3 py-2 rounded-2xl transition-all cursor-pointer"
                      title="Test on Bharat Feature-Phone & WhatsApp Simulator"
                    >
                      <span>📱 {lang === 'hi' ? 'भारत सिमुलेटर' : 'Bharat Simulator'}</span>
                    </button>
                    <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-mono text-[11px] font-bold uppercase">
                      {t.inspectedVia} {analysisResult.inputType}
                    </span>
                    <button
                      onClick={() => setShowRawInput(!showRawInput)}
                      className="min-h-[44px] inline-flex items-center space-x-1.5 text-slate-600 hover:text-slate-900 text-xs font-semibold border border-slate-200 px-3 py-2 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      {showRawInput ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showRawInput ? t.hideInputBtn : t.viewInputBtn}</span>
                    </button>
                  </div>
                </div>

                {/* Sanitized Input Inspector */}
                {showRawInput && (
                  <div className="p-5 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200 text-xs font-mono space-y-2 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <span>Client-Side Sanitized Content:</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1 font-sans">
                        <Lock className="w-3 h-3" />
                        PII Sanitized
                      </span>
                    </div>
                    <pre className="whitespace-pre-wrap break-words text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono leading-relaxed">
                      {analysisResult.sanitizedInput}
                    </pre>
                  </div>
                )}

                {/* 1. TOP: RISK ASSESSMENT */}
                <RiskAssessmentCard
                  result={analysisResult}
                  lang={lang}
                  onOpenComplaintDraft={() => setShowComplaintDraft(true)}
                />

                {/* LIVE GENERATIVE AI REASONING (Google Gemini 1.5 Flash - Flaw 1 Solution) */}
                <GeminiLiveInsightsCard
                  insights={analysisResult.geminiInsights}
                  isLoading={isGeminiLoading}
                  isConfigured={isGeminiAiActive()}
                  onOpenConfig={() => setShowAiConfig(true)}
                  lang={lang}
                />

                {/* 2. "Why?" - Individual Evidence Cards Grid (Identity, URL, Language, Urgency, Payment, Regulatory) */}
                <EvidenceCardsGrid cards={analysisResult.evidenceCards} lang={lang} />

                {/* 3. "WHAT WE COULD VERIFY" and "WHAT WE COULD NOT VERIFY" */}
                <EvidenceBreakdown result={analysisResult} lang={lang} />

                {/* 4. BHARAT MODE: "Understand in Simple Language" / "आसान भाषा में समझें" with Audio Playback */}
                <HindiExplanationCard
                  explanationHi={analysisResult.hindiExplanation}
                  analogyHi={analysisResult.hindiAnalogy}
                  lang={lang}
                />

                {/* Socratic Doubt Resolver (Cognitive Dissonance / Lingering doubts - Flaw 6 Solution) */}
                <SocraticDoubtResolver lang={lang} />

                {/* Track D: Behavioural Resilience Cooling-Off Circuit Breaker & Decision Journal (Flaw 3 Solution) */}
                <CoolingOffCircuitBreaker
                  lang={lang}
                  isHighRisk={analysisResult.overallAssessment === 'High' || analysisResult.overallAssessment === 'Critical'}
                />

                {/* 5. Educational Consequence Simulator */}
                <ConsequenceSimulator steps={analysisResult.consequenceSteps} lang={lang} />

                {/* 6. "WHAT SHOULD YOU DO NOW?" - Safe Action Checklist */}
                <SafeActionChecklist
                  result={analysisResult}
                  onOpenDraft={() => setShowComplaintDraft(true)}
                  onOpenNomineeTracker={() => setShowNomineeTracker(true)}
                  lang={lang}
                />
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: FINANCIAL LITERACY / BHARAT SHIKSHA */}
        {currentView === 'learn' && <FinancialLiteracyView lang={lang} />}

        {/* VIEW 3: ABOUT, METHODOLOGY & GUARDRAILS */}
        {currentView === 'about' && <AboutPrivacyView lang={lang} />}

        {/* VIEW 4: BHARAT FEATURE-PHONE & WHATSAPP SIMULATOR */}
        {currentView === 'simulator' && (
          <BharatSimulatorView
            onAnalyzeSample={(text, type, imagePreviewUrl) => {
              setCurrentView('analyze');
              handleStartAnalysis(text, type, imagePreviewUrl);
            }}
            onBackToAnalyze={() => setCurrentView('analyze')}
            lang={lang}
          />
        )}
      </main>

      {/* Modal: Incident / Complaint Draft */}
      {showComplaintDraft && analysisResult && (
        <ComplaintDraftModal
          result={analysisResult}
          onClose={() => setShowComplaintDraft(false)}
          lang={lang}
        />
      )}

      {/* Modal: Track B Family Nominee & Asset Recovery Audit */}
      {showNomineeTracker && (
        <NomineeWealthTrackerModal
          onClose={() => setShowNomineeTracker(false)}
          lang={lang}
        />
      )}

      {/* Modal: Hybrid AI Engine Configuration (Gemini 1.5 Flash) */}
      {showAiConfig && (
        <GeminiApiKeyModal
          onClose={() => setShowAiConfig(false)}
          onKeySaved={() => {
            if (analysisResult) {
              triggerGeminiEnrichment(analysisResult, currentUploadedImage);
            }
          }}
        />
      )}

      {/* Institutional Footer */}
      <Footer lang={lang} />
    </div>
  );
}

export default App;
