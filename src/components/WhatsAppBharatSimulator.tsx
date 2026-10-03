import React, { useState, useMemo, useRef } from 'react';
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  ShieldAlert,
  ShieldCheck,
  CheckCheck,
  Play,
  Pause,
  Volume2,
  ArrowRight,
  AlertTriangle,
  Paperclip,
  Camera,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  FileText
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { VoiceNarrator } from '../engine/voiceNarrator';
import { runSangyanAnalysis } from '../engine/coreAnalyzer';
import { validateUploadedFile } from '../engine/safeFileValidator';
import { extractTextFromImage } from '../engine/ocrService';

interface WhatsAppBharatSimulatorProps {
  onSelectSampleForAnalysis: (text: string, type: 'text' | 'image' | 'url', imagePreviewUrl?: string) => void;
  lang: SupportedLanguage;
}

interface ForwardSample {
  id: string;
  title: string;
  titleHi: string;
  text: string;
  isImage?: boolean;
  imageUrl?: string;
}

const SAMPLE_FORWARDS: ForwardSample[] = [
  {
    id: 'fwd-ipo',
    title: '💥 400% Guaranteed SME IPO Group Tip',
    titleHi: '💥 400% गारंटीड SME IPO टिप',
    text: '🚨 VIP INVESTOR GROUP — SECRET SME IPO TIP: Our analysts confirmed 400% profit potential. Only 20 seats left! Send ₹10,000 to reserve allotment. Guaranteed allocation. Join now: t.me/vip_ipo_group'
  },
  {
    id: 'fwd-kyc',
    title: '⚠️ Fake Demat KYC Suspension SMS',
    titleHi: '⚠️ डीमैट खाता सस्पेंड SMS',
    text: 'URGENT: Your DEMAT account will be suspended today due to incomplete KYC. Verify your PAN and account immediately at: https://demat-kyc-verification.example. Blocked within 2 hours.'
  },
  {
    id: 'fwd-withdraw',
    title: '💸 Fake ₹48,750 Withdrawal Release Fee',
    titleHi: '💸 ₹48,750 विड्रॉल फीस फ्रॉड',
    text: 'Withdrawal Pending: Your investment generated ₹48,750 profit. Pay ₹2,499 regulatory verification fee within 30 minutes to release funds. Contact: support@example-help.com'
  },
  {
    id: 'fwd-safe-bill',
    title: '🟢 Safe Electricity Bill (Control)',
    titleHi: '🟢 बिजली बिल (सुरक्षित कंट्रोल)',
    text: "Your electricity bill of ₹1,248 is due on 8 October. Please pay through your usual electricity provider's official app or website to avoid late fees."
  },
  {
    id: 'fwd-amazon-order',
    title: '🟢 Amazon Order Delivery Alert',
    titleHi: '🟢 अमेज़न डिलीवरी अलर्ट',
    text: 'Your order from Amazon has been shipped. Order #AMZ45821 is expected to arrive by 5 October. You can track your delivery through the Amazon app.'
  },
  {
    id: 'fwd-img-scam-cert',
    title: '📸 Screenshot: Fake SEBI Guaranteed Certificate',
    titleHi: '📸 स्क्रीनशॉट: फर्जी सेबी सर्टिफिकेट',
    text: 'SEBI Guaranteed Portfolio Manager INP887766554. 40% monthly interest guaranteed under Special Window Circular. Zero Market Risk.',
    isImage: true,
    imageUrl: '/hero-illustration.png'
  },
  {
    id: 'fwd-img-safe-edu',
    title: '📸 Screenshot: Official SEBI Investor Shiksha',
    titleHi: '📸 स्क्रीनशॉट: आधिकारिक सेबी शिक्षा',
    text: 'SEBI Investor Awareness: Understanding Index Funds and Market Volatility. Past performance does not guarantee future results.',
    isImage: true,
    imageUrl: '/hero-illustration.png'
  }
];

export function WhatsAppBharatSimulator({ onSelectSampleForAnalysis, lang }: WhatsAppBharatSimulatorProps) {
  const [selectedSample, setSelectedSample] = useState<ForwardSample>(SAMPLE_FORWARDS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [ocrStatusText, setOcrStatusText] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isHindi = lang === 'hi';

  // Live dynamic prediction using the real SANGYAN evidence-first analysis engine
  const liveAnalysis = useMemo(() => {
    return runSangyanAnalysis(
      selectedSample.text,
      selectedSample.isImage ? 'image' : 'text',
      selectedSample.imageUrl
    );
  }, [selectedSample.text, selectedSample.isImage, selectedSample.imageUrl]);

  const isCriticalOrHigh =
    liveAnalysis.overallAssessment === 'Critical' || liveAnalysis.overallAssessment === 'High';
  const isSafe =
    liveAnalysis.overallAssessment === 'Low' || liveAnalysis.overallAssessment === 'No Financial Risk';

  // Compute dynamic explanation based on real engine analysis
  const computedBotReplyHi = useMemo(() => {
    if (isSafe) {
      if (liveAnalysis.financialRelevance === 'NO') {
        return 'नमस्ते! संज्ञान कवच जांच: यह एक सामान्य गैर-वित्तीय सूचना है (जैसे ई-कॉमर्स या डिलीवरी)। इसमें कोई वित्तीय जोखिम, क्रेडेंशियल चोरी या साइबर फ्रॉड नहीं है। यह पूरी तरह सुरक्षित है।';
      }
      return 'नमस्ते! संज्ञान कवच जांच: यह संदेश/स्क्रीनशॉट सुरक्षित प्रतीत होता है। इसमें कोई अनधिकृत भुगतान मांग या क्रेडेंशियल चोरी नहीं पाई गई है। आधिकारिक ऐप से ही लेन-देन करें।';
    }
    if (isCriticalOrHigh) {
      return (
        liveAnalysis.hindiExplanation ||
        'चेतावनी: यह संदेश/स्क्रीनशॉट अत्यधिक जोखिम भरा व धोखाधड़ी युक्त है! सेबी नियमों के अनुसार किसी अज्ञात लिंक या निजी यूपीआई पर पैसे न भेजें।'
      );
    }
    return liveAnalysis.hindiExplanation || 'संज्ञान जांच: इस सामग्री में संदिग्ध दावे पाए गए हैं। सावधानी बरतें।';
  }, [liveAnalysis, isSafe, isCriticalOrHigh]);

  const computedBotReplyEn = useMemo(() => {
    if (isSafe) {
      if (liveAnalysis.financialRelevance === 'NO') {
        return 'SANGYAN Kavach Verification: This is a routine, non-financial operational notification (e.g., shipping/delivery). Zero financial deception, phishing vectors, or credential harvesting detected. Completely safe.';
      }
      return 'SANGYAN Kavach Verification: Verified benign financial communication. Official channel recommended with zero suspicious redirects or credential demands detected.';
    }
    if (isCriticalOrHigh) {
      return (
        liveAnalysis.whyItMattersSummary ||
        'CRITICAL FRAUD ALERT: Detected coercive urgency, impersonation, or unverified investment claims. Never transfer funds or share credentials.'
      );
    }
    return liveAnalysis.whyItMattersSummary || 'Suspicious communication detected. Exercise caution and verify independently.';
  }, [liveAnalysis, isSafe, isCriticalOrHigh]);

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      VoiceNarrator.stop();
      setIsPlayingAudio(false);
    } else {
      const speechText = isHindi ? computedBotReplyHi : computedBotReplyEn;
      const started = VoiceNarrator.speak(speechText, lang, () => {
        setIsPlayingAudio(false);
      });
      if (started) setIsPlayingAudio(true);
    }
  };

  const handleSendCustomMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customInput.trim()) return;
    const userMsg = customInput.trim();
    setCustomInput('');
    setUploadError(null);
    setSelectedSample({
      id: 'custom-' + Date.now(),
      title: 'Custom Message',
      titleHi: 'कस्टम संदेश',
      text: userMsg,
      isImage: false
    });
    setIsPlayingAudio(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    const fileCheck = await validateUploadedFile(file);
    if (!fileCheck.isValid) {
      setUploadError(fileCheck.error || 'Invalid file format.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Convert file to Base64 Data URL for preview & multimodal inspection
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64DataUrl = event.target?.result as string;

      setIsOcrScanning(true);
      setOcrStatusText('Scanning screenshot on-device (OCR)...');

      let extractedText = '';
      try {
        const ocrResult = await extractTextFromImage(file, (p) => {
          setOcrStatusText(`Reading text (${Math.round(p.progress * 100)}%)...`);
        });

        if (ocrResult.text && ocrResult.text.trim().length > 5) {
          extractedText = ocrResult.text.trim();
        } else {
          extractedText = `Screenshot: ${fileCheck.sanitizedName}\n(Visual forensic verification ready)`;
        }
      } catch (err) {
        extractedText = `Screenshot: ${fileCheck.sanitizedName}\n(Visual forensic verification ready)`;
      } finally {
        setIsOcrScanning(false);
        setOcrStatusText('');
      }

      setSelectedSample({
        id: 'upload-' + Date.now(),
        title: fileCheck.sanitizedName,
        titleHi: fileCheck.sanitizedName,
        text: extractedText,
        isImage: true,
        imageUrl: base64DataUrl
      });
      setIsPlayingAudio(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeInFullEngine = () => {
    onSelectSampleForAnalysis(
      selectedSample.text,
      selectedSample.isImage ? 'image' : 'text',
      selectedSample.imageUrl
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-0">
      {/* Simulation Banner */}
      <div className="bg-emerald-800 text-white px-4 py-2 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold tracking-wide">
            {isHindi ? '📱 भारत व्हाट्सएप सुरक्षा सिमुलेटर (Text + Image/Screenshot Forwarding)' : '📱 Bharat WhatsApp Protection Simulator (Text & Image OCR)'}
          </span>
        </div>
        <span className="text-[10px] bg-emerald-700 px-2 py-0.5 rounded font-mono">
          On-Device Multimodal Engine
        </span>
      </div>

      {/* Preset Selector Bar */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-bold text-slate-700 shrink-0">
          {isHindi ? 'फॉरवर्ड संदेश या स्क्रीनशॉट चुनें:' : 'Select Forwarded Sample:'}
        </span>
        {SAMPLE_FORWARDS.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedSample(item);
              setIsPlayingAudio(false);
              setUploadError(null);
            }}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer text-left flex items-center space-x-1 ${
              selectedSample.id === item.id
                ? 'bg-emerald-700 text-white font-bold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {item.isImage && <ImageIcon className="w-3.5 h-3.5 shrink-0 text-amber-300" />}
            <span>{isHindi ? item.titleHi : item.title}</span>
          </button>
        ))}
      </div>

      {/* Error alert if image upload failed */}
      {uploadError && (
        <div className="p-2.5 bg-rose-50 border-b border-rose-200 text-xs text-rose-800 flex items-center justify-between">
          <span>⚠️ {uploadError}</span>
          <button onClick={() => setUploadError(null)} className="font-bold cursor-pointer text-rose-600 hover:text-rose-900">×</button>
        </div>
      )}

      {/* WhatsApp Simulated Chat Window */}
      <div className="bg-[#e5ddd5] min-h-[440px] p-3 sm:p-4 flex flex-col justify-between space-y-4 relative">
        {/* Chat Header */}
        <div className="bg-[#075e54] text-white p-3 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-emerald-900 font-bold text-sm">
              🛡️
            </div>
            <div>
              <h4 className="text-sm font-bold flex items-center space-x-1.5">
                <span>संज्ञान कवच (SANGYAN Kavach)</span>
                <span className="text-[10px] bg-emerald-600 px-1.5 py-0.2 rounded text-emerald-100 font-mono">OFFICIAL</span>
              </h4>
              <p className="text-[10px] text-emerald-100/90">
                {isHindi ? 'सेबी व NSDL अनुपालन सुरक्षा बॉट (+91 1800-KAVACH)' : 'SEBI & NSDL Compliant Investor Shield Bot'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-white/80">
            <Phone className="w-4 h-4 cursor-pointer" />
            <Video className="w-4 h-4 cursor-pointer" />
            <MoreVertical className="w-4 h-4 cursor-pointer" />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="space-y-3 flex-1 overflow-y-auto py-2">
          {/* User message (Forwarded message / screenshot from user) */}
          <div className="flex justify-end">
            <div className="bg-[#dcf8c6] rounded-2xl rounded-tr-xs p-3 max-w-[85%] sm:max-w-[70%] shadow-xs text-xs space-y-1.5 text-slate-900">
              <div className="flex items-center space-x-1 text-[10px] text-slate-500 italic">
                <span>Forwarded</span>
              </div>

              {/* Render forwarded image if present */}
              {selectedSample.imageUrl && (
                <div className="rounded-xl overflow-hidden border border-emerald-300/60 bg-black/5 max-h-48 flex items-center justify-center my-1">
                  <img
                    src={selectedSample.imageUrl}
                    alt="Forwarded Screenshot"
                    className="max-h-44 w-auto object-contain rounded-lg"
                  />
                </div>
              )}

              <p className="leading-relaxed whitespace-pre-wrap font-sans">{selectedSample.text}</p>

              <div className="flex items-center justify-end space-x-1 text-[10px] text-slate-500 pt-0.5">
                <span>10:42 AM</span>
                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
              </div>
            </div>
          </div>

          {/* OCR Scanning In-Progress Indicator in Chat */}
          {isOcrScanning && (
            <div className="flex justify-start">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl rounded-tl-xs p-3 max-w-[80%] shadow-xs text-xs space-y-1 text-slate-900 border border-emerald-200 animate-pulse flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
                <span className="font-semibold text-emerald-900 text-[11px]">{ocrStatusText || 'Scanning screenshot locally...'}</span>
              </div>
            </div>
          )}

          {/* SANGYAN Kavach Bot Reply (Real Engine Prediction Result) */}
          {!isOcrScanning && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 max-w-[90%] sm:max-w-[75%] shadow-xs text-xs space-y-2.5 text-slate-900 border border-slate-100">
                {/* Dynamic Risk Tag */}
                {isCriticalOrHigh ? (
                  <div className="flex items-center justify-between bg-rose-50 border border-rose-200 text-rose-800 px-2.5 py-1.5 rounded-xl font-bold text-[11px]">
                    <span className="flex items-center space-x-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>🚨 {liveAnalysis.overallAssessment.toUpperCase()} RISK FRAUD DETECTED</span>
                    </span>
                    <span className="font-mono text-[10px] bg-rose-100 px-2 py-0.5 rounded text-rose-900 font-bold">
                      Score: {liveAnalysis.heuristicScore}/100
                    </span>
                  </div>
                ) : isSafe ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1.5 rounded-xl font-bold text-[11px]">
                    <span className="flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>🟢 VERIFIED SAFE / BENIGN</span>
                    </span>
                    <span className="font-mono text-[10px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-900 font-bold">
                      Score: {liveAnalysis.heuristicScore}/100
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1.5 rounded-xl font-bold text-[11px]">
                    <span className="flex items-center space-x-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>⚠️ SUSPICIOUS / PROCEED WITH CAUTION</span>
                    </span>
                    <span className="font-mono text-[10px] bg-amber-100 px-2 py-0.5 rounded text-amber-900 font-bold">
                      Score: {liveAnalysis.heuristicScore}/100
                    </span>
                  </div>
                )}

                {/* Bot Text Message */}
                <p className="text-slate-800 leading-relaxed font-sans">
                  {isHindi ? computedBotReplyHi : computedBotReplyEn}
                </p>

                {/* Audio Voice Note Card (Bhashini-style) */}
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3">
                  <button
                    onClick={handleToggleAudio}
                    className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span className="flex items-center space-x-1">
                        <Volume2 className="w-3 h-3 text-emerald-600" />
                        <span>{isHindi ? 'आवाज में सुनें (भाषिणी AI)' : 'Vernacular Voice Note'}</span>
                      </span>
                      <span>0:14</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-1.5 bg-emerald-600 rounded-full transition-all duration-300 ${
                          isPlayingAudio ? 'w-2/3 animate-pulse' : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleAnalyzeInFullEngine}
                  className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <span>{isHindi ? 'विस्तृत सेबी रिपोर्ट देखें (Open Dossier)' : 'View Complete Investigation Dossier'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-end text-[10px] text-slate-400">
                  <span>10:42 AM</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hidden File Input for Image Attachments */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
        />

        {/* Interactive Custom Input Bar with Paperclip & Camera Icons */}
        <form onSubmit={handleSendCustomMessage} className="bg-white p-2 rounded-2xl flex items-center space-x-1.5 border border-slate-200 shadow-xs">
          {/* Attachment Paperclip Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer shrink-0"
            title={isHindi ? 'स्क्रीनशॉट या फोटो भेजें' : 'Attach Screenshot or Photo (OCR)'}
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Camera Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer shrink-0"
            title={isHindi ? 'कैमरा / फोटो अपलोड' : 'Take or Upload Photo'}
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Text Input Field */}
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder={isHindi ? 'संदेश लिखें या 📎 से फोटो/स्क्रीनशॉट भेजें...' : 'Type message or click 📎 to send screenshot...'}
            className="flex-1 text-xs text-slate-800 bg-transparent px-2 py-1.5 outline-none font-sans"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white flex items-center justify-center cursor-pointer transition-colors shrink-0 shadow-xs"
            title="Send"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
