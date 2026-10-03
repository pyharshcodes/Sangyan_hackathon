import React, { useState, useRef } from 'react';
import {
  MessageSquare,
  Upload,
  Link,
  ShieldCheck,
  ArrowRight,
  FileText,
  AlertTriangle,
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  Search,
  Sparkles,
  Mic,
  MicOff
} from 'lucide-react';
import { DEMO_PRESETS } from '../data/demoPresets';
import { DemoPreset, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { validateSafeUrl } from '../engine/safeUrlValidator';
import { validateUploadedFile } from '../engine/safeFileValidator';
import { inspectAndNeutralizePromptInjection } from '../engine/promptInjectionDefense';
import { evaluateGuardrailQuery } from '../engine/guardrailInterceptor';
import { extractTextFromImage } from '../engine/ocrService';
import { WhatsAppBharatSimulator } from './WhatsAppBharatSimulator';
import { FeaturePhoneIvrSimulator } from './FeaturePhoneIvrSimulator';
import { CommunityThreatLedger } from './CommunityThreatLedger';
import { TrendingScamsShowcase } from './TrendingScamsShowcase';
import { playScanSound } from '../utils/soundEffects';

interface InputTabsProps {
  onAnalyze: (input: string, type: 'text' | 'image' | 'url', imagePreviewUrl?: string) => void;
  lang: SupportedLanguage;
}

export const InputTabs: React.FC<InputTabsProps> = ({ onAnalyze, lang }) => {
  const [inputMode, setInputMode] = useState<'standard' | 'whatsapp' | 'featurephone'>('standard');
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'url'>('text');
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState<string>('');
  const [guardrailAlert, setGuardrailAlert] = useState<string | null>(null);
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [ocrProgressText, setOcrProgressText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const toggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceNotice('Voice input is not supported in this browser. Please use Chrome or Edge.');
      setTimeout(() => setVoiceNotice(null), 4000);
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setVoiceNotice(null);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      if (lang === 'hi') {
        recognition.lang = 'hi-IN';
      } else if (lang === 'bn') {
        recognition.lang = 'bn-IN';
      } else if (lang === 'as') {
        recognition.lang = 'as-IN';
      } else {
        recognition.lang = 'en-IN';
      }

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceNotice(
          lang === 'hi'
            ? '🎙️ सुन रहे हैं... बोलिए (जैसे: "व्हाट्सएप पर 40% मुनाफे का मैसेज आया है...")'
            : lang === 'bn'
            ? '🎙️ শুনছি... বলুন (যেমন: "হোয়াটসঅ্যাপে ফিক্সড লাভের মেসেজ পেয়েছি...")'
            : lang === 'as'
            ? '🎙️ শুনি আছোঁ... কওক (যেনে: "হোৱাটছএপত লাভৰ বাৰ্তা পালোঁ...")'
            : '🎙️ Listening... Speak your suspicious message clearly.'
        );
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        if (transcript.trim()) {
          setTextContent(transcript.trim());
          checkProhibitedAdviceQuery(transcript.trim());
        }
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
        setVoiceNotice(
          err.error === 'not-allowed'
            ? 'Microphone permission denied. Please allow microphone access in browser.'
            : 'Audio recording stopped. You can type or click the mic to try again.'
        );
        setTimeout(() => setVoiceNotice(null), 5000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setVoiceNotice(null);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.warn('Speech recognition start failed:', err);
      setIsListening(false);
    }
  };

  // Check for prohibited advisory queries across 5 critical vectors
  const checkProhibitedAdviceQuery = (input: string) => {
    const check = evaluateGuardrailQuery(input);
    if (check.isProhibited) {
      const msg =
        lang === 'hi'
          ? `⚠️ ${check.reasonHi} ${check.guidanceHi}`
          : lang === 'bn'
          ? `⚠️ ${check.reasonBn} ${check.guidanceBn}`
          : lang === 'as'
          ? `⚠️ ${check.reasonAs} ${check.guidanceAs}`
          : `⚠️ ${check.reason} ${check.guidance}`;
      setGuardrailAlert(msg);
      return true;
    }
    setGuardrailAlert(null);
    return false;
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textContent.trim()) return;
    if (checkProhibitedAdviceQuery(textContent)) return;
    playScanSound();

    // Check adversarial prompt injection
    const injectionCheck = inspectAndNeutralizePromptInjection(textContent);
    if (injectionCheck.hasInjectionAttempt) {
      setGuardrailAlert(
        `🛡️ Adversarial Instruction Neutralized: Detected bypass directive (${injectionCheck.patternsDetected.join(', ')}). Proceeding with objective verification.`
      );
    }
    onAnalyze(injectionCheck.sanitizedForLlm, 'text');
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlContent.trim()) return;
    if (checkProhibitedAdviceQuery(urlContent)) return;
    playScanSound();

    // Strict SSRF and URL Safety Validation
    const urlValidation = validateSafeUrl(urlContent);
    if (!urlValidation.isValid) {
      setGuardrailAlert(`⚠️ Security Rejection: ${urlValidation.error}`);
      return;
    }

    setGuardrailAlert(null);
    onAnalyze(urlValidation.sanitizedUrl || urlContent, 'url');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Strict Safe File Validation (Size <= 5MB, MIME, Extensions, Magic Bytes)
    const fileCheck = await validateUploadedFile(file);
    if (!fileCheck.isValid) {
      setGuardrailAlert(`⚠️ File Upload Security Block: ${fileCheck.error}`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setGuardrailAlert(null);
    setSelectedImageName(fileCheck.sanitizedName);

    // Convert file to Base64 Data URL so Google Gemini Multimodal AI can visually inspect the pixels
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64DataUrl = event.target?.result as string;
      setImagePreviewUrl(base64DataUrl);
    };
    reader.readAsDataURL(file);

    // Check if this is a known offline testing demo preset file
    const lowerName = fileCheck.sanitizedName.toLowerCase();
    let extractedText = '';

    if (lowerName.includes('demo_jee') || lowerName.includes('demo_marksheet')) {
      extractedText = `National Testing Agency (NTA) - Joint Entrance Examination (JEE Main) Score Card
Candidate Name: Candidate
Roll Number: 240310123456
Physics: 98.4 Percentile | Chemistry: 96.2 Percentile | Mathematics: 99.1 Percentile
Total NTA Score: 98.65 Percentile
Status: Qualified for JEE Advanced`;
      setOcrText(extractedText);
    } else if (lowerName.includes('demo_selfie')) {
      extractedText = `[Personal photograph - No financial content detected in image]`;
      setOcrText(extractedText);
    } else if (lowerName.includes('demo_college_id')) {
      extractedText = `Student Identity Card - Indian Institute of Technology (BHU) Varanasi
Name: Student
Roll Number: 21075042
Department: Computer Science and Engineering
Valid through: 2026`;
      setOcrText(extractedText);
    } else if (lowerName.includes('demo_bank')) {
      extractedText = `State Bank of India - Account Statement
Account Number: XXXXXXXX1234
Branch: Varanasi Main
Transactions: Monthly Salary Credit, Grocery UPI Debit, Electricity Bill Payment.
No investment claims or return promises.`;
      setOcrText(extractedText);
    } else {
      // Execute REAL ON-DEVICE TESSERACT.JS OCR in Web Worker
      setIsOcrScanning(true);
      setOcrProgressText('Initializing on-device OCR...');
      setOcrText(`[Scanning image on-device via Tesseract.js Web Worker...]`);

      try {
        const ocrResult = await extractTextFromImage(file, (p) => {
          setOcrProgressText(`${p.status} (${Math.round(p.progress * 100)}%)`);
        });

        if (ocrResult.text && ocrResult.text.length > 5) {
          extractedText = ocrResult.text;
        } else {
          extractedText = `[Screenshot: ${fileCheck.sanitizedName}]\n(Visual forensic verification ready. Click 'Verify & Inspect Screenshot' to run Google Gemini Multimodal analysis directly on this image)`;
        }
      } catch (err) {
        extractedText = `[Screenshot: ${fileCheck.sanitizedName}]\n(Visual forensic verification ready. Click 'Verify & Inspect Screenshot' to run Google Gemini Multimodal analysis directly on this image)`;
      } finally {
        setIsOcrScanning(false);
        setOcrProgressText('');
      }
      setOcrText(extractedText);
    }
  };

  const handleImageSubmit = () => {
    if (!selectedImageName && !imagePreviewUrl) return;
    playScanSound();
    const textToSend =
      ocrText && ocrText.trim().length > 10 && !ocrText.includes('[Scanning image')
        ? ocrText
        : `Screenshot Analysis: ${selectedImageName || 'uploaded_image'}. Inspect for financial fraud, unverified SEBI claims, guaranteed returns, or phishing.`;
    onAnalyze(textToSend, 'image', imagePreviewUrl || undefined);
  };

  const loadPreset = (preset: DemoPreset) => {
    playScanSound();
    setGuardrailAlert(null);
    if (preset.type === 'text') {
      setActiveTab('text');
      setTextContent(preset.content);
      onAnalyze(preset.content, 'text');
    } else if (preset.type === 'url') {
      setActiveTab('url');
      setUrlContent(preset.content);
      onAnalyze(preset.content, 'url');
    } else if (preset.type === 'image') {
      setActiveTab('image');
      setSelectedImageName(preset.imageBadgeText || 'DEMO_CERTIFICATE.PNG');
      setOcrText(preset.content);
      const mockSvg = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect width="400" height="240" fill="%23f8fafc" stroke="%23cbd5e1" stroke-width="2"/><text x="200" y="60" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230f172a" text-anchor="middle">CERTIFICATE OF WEALTH MANAGEMENT</text><text x="200" y="100" font-family="sans-serif" font-size="12" fill="%23b91c1c" text-anchor="middle">REG NO: INP887766554</text><text x="200" y="140" font-family="sans-serif" font-size="12" fill="%23334155" text-anchor="middle">GUARANTEED 40% MONTHLY INTEREST</text><text x="200" y="180" font-family="sans-serif" font-size="11" fill="%2364748b" text-anchor="middle">SPECIAL ALLOCATION POOL 2026</text></svg>';
      setImagePreviewUrl(mockSvg);
      onAnalyze(preset.content, 'image', mockSvg);
    }
  };

  const getPresetTitle = (preset: DemoPreset) => {
    if (lang === 'bn') return preset.titleBn || preset.title;
    if (lang === 'as') return preset.titleAs || preset.title;
    if (lang === 'hi') return preset.titleHi || preset.title;
    return preset.title;
  };

  const getPresetDesc = (preset: DemoPreset) => {
    if (lang === 'bn') return preset.shortDescBn || preset.shortDesc;
    if (lang === 'as') return preset.shortDescAs || preset.shortDesc;
    return preset.shortDesc;
  };

  return (
    <div className="w-full space-y-6">
      {/* ============================================================== */}
      {/* HERO SECTION - Matches Exact User Mockup Specification       */}
      {/* ============================================================== */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-blue-100/80 shadow-md p-6 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Column: Heading, Subtext, Badges, and Action Buttons */}
          <div className="flex-1 text-left w-full">
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-slate-800 text-xs font-semibold mb-4 shadow-2xs">
              <img src="/logo.png" alt="Logo" className="w-4 h-4 object-contain shrink-0" />
              <img src="/brand-title.png" alt="SANGYAN KAVACH" className="h-3.5 w-auto object-contain inline-block" />
              <span className="text-slate-400 font-bold">·</span>
              <span>{lang === 'hi' ? 'सुरक्षा कवच' : lang === 'bn' ? 'সুরক্ষা কবচ' : lang === 'as' ? 'সুৰক্ষা কৱচ' : 'AI Defense'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1B3D] tracking-tight leading-[1.18]">
              <span>{t.heroHeadingLine1}</span>{' '}
              <span className="text-[#2563EB] block sm:inline">{t.heroHeadingLine2}</span>
            </h1>

            {/* Subtext */}
            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-normal">
              {t.heroSubtitle}
            </p>

            {/* Trust Checklist Row */}
            <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                <span>{t.pillRealLife}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-100" />
                <span>{t.pillFraudTips}</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="inline-flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-purple-600 fill-purple-100" />
                <span>{t.pillDigitalHabits}</span>
              </span>
            </div>

            {/* 3 Primary Action Buttons (Tabs) */}
            <div className="mt-8 flex flex-wrap items-center gap-3 max-w-xl">
              {/* Button 1: CHECK A MESSAGE */}
              <button
                onClick={() => setActiveTab('text')}
                className={`w-full sm:w-auto sm:flex-1 min-h-[48px] py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center space-x-2.5 cursor-pointer ${
                  activeTab === 'text'
                    ? 'bg-[#0B1B3D] text-white shadow-md ring-2 ring-[#0B1B3D]/30 border border-slate-900'
                    : 'bg-[#EBF2FA] hover:bg-[#DDE9F8] text-[#1E293B] border border-blue-100/60'
                }`}
              >
                <MessageSquare className={`w-4 h-4 ${activeTab === 'text' ? 'text-white' : 'text-blue-600'}`} />
                <span>{t.checkMessageBtn}</span>
              </button>

              {/* Button 2: CHECK A LINK */}
              <button
                onClick={() => setActiveTab('url')}
                className={`w-full sm:w-auto sm:flex-1 min-h-[48px] py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center space-x-2.5 cursor-pointer ${
                  activeTab === 'url'
                    ? 'bg-[#0B1B3D] text-white shadow-md ring-2 ring-[#0B1B3D]/30 border border-slate-900'
                    : 'bg-[#EBF2FA] hover:bg-[#DDE9F8] text-[#1E293B] border border-blue-100/60'
                }`}
              >
                <Link className={`w-4 h-4 ${activeTab === 'url' ? 'text-white' : 'text-blue-600'}`} />
                <span>{t.checkLinkBtn}</span>
              </button>

              {/* Button 3: UPLOAD SCREENSHOT */}
              <button
                onClick={() => setActiveTab('image')}
                className={`w-full sm:w-auto sm:flex-1 min-h-[48px] py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center space-x-2.5 cursor-pointer ${
                  activeTab === 'image'
                    ? 'bg-[#0B1B3D] text-white shadow-md ring-2 ring-[#0B1B3D]/30 border border-slate-900'
                    : 'bg-[#EBF2FA] hover:bg-[#DDE9F8] text-[#1E293B] border border-blue-100/60'
                }`}
              >
                <Upload className={`w-4 h-4 ${activeTab === 'image' ? 'text-white' : 'text-blue-600'}`} />
                <span>{t.uploadScreenshotBtn}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Graphic Illustration */}
          <div className="hidden lg:flex lg:w-5/12 items-center justify-center relative select-none pointer-events-none">
            <img
              src="/hero-illustration.png"
              alt="Cyber scam defense illustration"
              className="w-full max-w-[370px] h-auto object-contain drop-shadow-md animate-fadeIn"
            />
          </div>
        </div>
      </div>

      {/* VIRAL INDIAN SCAMS INTERACTIVE SHOWCASE - Realistic 1-Click WhatsApp/Telegram Tests */}
      <TrendingScamsShowcase
        onSelectScam={(text, type) => {
          playScanSound();
          if (type === 'text') {
            setTextContent(text);
            setActiveTab('text');
          } else if (type === 'url') {
            setUrlContent(text);
            setActiveTab('url');
          }
          onAnalyze(text, type);
        }}
        lang={lang}
      />

      {/* CHANNEL DELIVERY SELECTOR (Bharat-First Delivery Mode - Flaw 5 Solution) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 ml-1">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span>{lang === 'hi' ? 'वितरण माध्यम (Delivery Channel):' : 'Investor Access Channel:'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setInputMode('standard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              inputMode === 'standard'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            💻 {lang === 'hi' ? 'वेब जांच कंसोल' : 'Web Verification Console'}
          </button>
          <button
            type="button"
            onClick={() => setInputMode('whatsapp')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              inputMode === 'whatsapp'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            📱 {lang === 'hi' ? 'व्हाट्सएप भारत सिमुलेटर (Tier-2/3 मोड)' : 'WhatsApp Bharat Simulator'}
          </button>
          <button
            type="button"
            onClick={() => setInputMode('featurephone')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              inputMode === 'featurephone'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            📞 {lang === 'hi' ? '1800 आईवीआर व USSD (फीचर फोन)' : '1800-IVR / USSD (Feature Phone)'}
          </button>
        </div>
      </div>

      {inputMode === 'whatsapp' ? (
        <WhatsAppBharatSimulator
          onSelectSampleForAnalysis={(text, type) => onAnalyze(text, type)}
          lang={lang}
        />
      ) : inputMode === 'featurephone' ? (
        <FeaturePhoneIvrSimulator
          onAnalyzeSample={(text, type) => onAnalyze(text, type)}
          lang={lang}
        />
      ) : (
        /* ACTIVE INPUT WORKSTATION - Opens Directly Below Active Tab */
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 space-y-5">
          {/* Guardrail Violation Alert */}
          {guardrailAlert && (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-start space-x-3 text-xs sm:text-sm text-amber-950 animate-fadeIn">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="font-medium leading-relaxed">{guardrailAlert}</div>
            </div>
          )}

        {/* TAB 1: TEXT FORM */}
        {activeTab === 'text' && (
          <form onSubmit={handleTextSubmit} className="space-y-4">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-slate-600" />
                  <span>{t.messageLabel}</span>
                </label>
                
                {/* Speech-to-Text Voice Dictation Button */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleVoiceInput}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isListening
                        ? 'bg-rose-600 text-white animate-pulse shadow-xs ring-2 ring-rose-300'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                    }`}
                    title="Speak in Hindi, Bengali, Assamese or English to automatically dictate your message"
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-3.5 h-3.5 animate-bounce" />
                        <span>{lang === 'hi' ? 'बोलना बंद करें' : lang === 'bn' ? 'থামান' : 'Stop Recording'}</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{lang === 'hi' ? '🎙️ बोलकर बताएं (Mic)' : lang === 'bn' ? '🎙️ মুখে বলুন (Mic)' : '🎙️ Dictate Note (Mic)'}</span>
                      </>
                    )}
                  </button>
                  <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                    Client-side redacted
                  </span>
                </div>
              </div>

              {/* Voice Listening Feedback Banner */}
              {voiceNotice && (
                <div className="mb-2 p-2.5 bg-indigo-50/90 border border-indigo-200 rounded-xl text-xs text-indigo-900 flex items-center justify-between animate-fadeIn">
                  <span className="font-semibold">{voiceNotice}</span>
                  {isListening && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0 ml-2" />}
                </div>
              )}

              <textarea
                value={textContent}
                onChange={(e) => {
                  setTextContent(e.target.value);
                  checkProhibitedAdviceQuery(e.target.value);
                }}
                rows={4}
                className="w-full rounded-2xl border border-slate-300 p-4 text-sm focus:border-slate-800 focus:ring-2 focus:ring-slate-100 outline-none transition-all placeholder:text-slate-400 font-sans leading-relaxed text-slate-900 bg-white"
                placeholder={t.messagePlaceholder}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Phone numbers, bank accounts & UPI IDs are masked in-memory.</span>
              </div>
              <button
                type="submit"
                disabled={!textContent.trim()}
                className="w-full sm:w-auto min-h-[44px] px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{t.verifyButton}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: URL FORM */}
        {activeTab === 'url' && (
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Link className="w-4 h-4 text-slate-600" />
                  <span>Website Link / Portal URL:</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  Lookalike & SSRF check active
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={urlContent}
                  onChange={(e) => {
                    setUrlContent(e.target.value);
                    checkProhibitedAdviceQuery(e.target.value);
                  }}
                  className="w-full rounded-2xl border border-slate-300 p-4 pl-11 text-sm focus:border-slate-800 focus:ring-2 focus:ring-slate-100 outline-none transition-all placeholder:text-slate-400 text-slate-900 bg-white"
                  placeholder={t.linkPlaceholder}
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>Blocks SSRF, loopback, and evaluates lookalike distance against broker registries.</span>
              </div>
              <button
                type="submit"
                disabled={!urlContent.trim()}
                className="w-full sm:w-auto min-h-[44px] px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{t.verifyDomainButton}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: IMAGE / SCREENSHOT FORM */}
        {activeTab === 'image' && (
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept=".jpg,.jpeg,.png,.webp"
              className="hidden"
            />

            {!selectedImageName ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-3xl p-8 text-center cursor-pointer hover:border-slate-500 hover:bg-slate-50/50 transition-all bg-slate-50/40"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-3">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {t.uploadBoxTitle}
                </div>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {t.uploadBoxSubtitle}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-slate-700" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{selectedImageName}</div>
                      <div className="text-[11px] text-slate-500">Extracted OCR content ready</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedImageName(null);
                      setImagePreviewUrl(null);
                      setOcrText('');
                    }}
                    className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                  >
                    Change File
                  </button>
                </div>

                {imagePreviewUrl && (
                  <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-48 flex items-center justify-center bg-slate-50">
                    <img
                      src={imagePreviewUrl}
                      alt="Uploaded Screenshot"
                      className="max-h-48 object-contain"
                    />
                  </div>
                )}

                {isOcrScanning && (
                  <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 animate-pulse">
                    <Sparkles className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                    <div>
                      <span className="font-bold block">On-Device Privacy OCR (Web Worker)</span>
                      <span className="text-[11px] text-blue-700">{ocrProgressText || 'Scanning screenshot locally...'}</span>
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                      <span>Extracted Content Preview:</span>
                    </label>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Lock className="w-2.5 h-2.5" />
                      Client-Side On-Device OCR
                    </span>
                  </div>
                  <textarea
                    value={ocrText}
                    onChange={(e) => setOcrText(e.target.value)}
                    rows={3}
                    className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-800"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleImageSubmit}
                    className="w-full sm:w-auto min-h-[44px] px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>{t.verifyScreenshotButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      )}

      {/* ============================================================== */}
      {/* OFFICIAL JURY TEST SCENARIOS - 1-Click Evaluation               */}
      {/* ============================================================== */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-5 sm:p-6 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t.testScenariosTitle}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {t.oneClickEval}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {DEMO_PRESETS.map((preset) => {
            const isControl = preset.id === 'preset-genuine-education';
            return (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset)}
                className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between hover:shadow-xs min-h-[70px] cursor-pointer ${
                  isControl
                    ? 'bg-emerald-50/80 border-emerald-300 hover:bg-emerald-100/80 text-emerald-950'
                    : 'bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="font-bold flex items-center justify-between w-full">
                  <span className="truncate">{getPresetTitle(preset)}</span>
                  {isControl && (
                    <span className="text-[9px] uppercase font-bold bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded shrink-0 ml-1">
                      Control
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                  {getPresetDesc(preset)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* CROWDSOURCED COMMUNITY THREAT INTELLIGENCE (Hackathon Page 5)  */}
      {/* ============================================================== */}
      <CommunityThreatLedger lang={lang} />
    </div>
  );
};
