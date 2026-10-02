import React, { useState } from 'react';
import { Send, Phone, Video, MoreVertical, ShieldAlert, CheckCheck, Play, Pause, Volume2, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface WhatsAppBharatSimulatorProps {
  onSelectSampleForAnalysis: (text: string, type: 'text' | 'image' | 'url') => void;
  lang: SupportedLanguage;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  time: string;
  text?: string;
  isVoice?: boolean;
  voiceDuration?: string;
  riskBadge?: 'CRITICAL' | 'SAFE' | 'WARNING';
  actionButtonText?: string;
}

const SAMPLE_FORWARDS = [
  {
    id: 'fwd-ipo',
    title: '💥 400% Guaranteed SME IPO Group Tip',
    titleHi: '💥 400% गारंटीड SME IPO व्हाट्सएप टिप',
    text: '🚨 VIP INVESTOR GROUP — SECRET SME IPO TIP: Our analysts confirmed 400% profit potential. Only 20 seats left! Send ₹10,000 to reserve allotment. Guaranteed allocation. Join now: t.me/vip_ipo_group',
    botReplyHi: 'नमस्ते रमेश जी, यह 100% फर्जी IPO स्कैम है! सेबी के अनुसार कोई भी व्हाट्सएप पर शेयर आवंटन की गारंटी नहीं दे सकता। अपने ₹10,000 किसी को न भेजें!',
    botReplyEn: 'Hello Ramesh ji, this is a CRITICAL FRAUD ALERT. Guaranteed IPO allotment over WhatsApp is strictly prohibited under SEBI rules. Never transfer funds to private UPI IDs.'
  },
  {
    id: 'fwd-kyc',
    title: '⚠️ Fake Demat KYC Suspension SMS',
    titleHi: '⚠️ डीमैट खाता सस्पेंड होने का फर्जी SMS',
    text: 'URGENT: Your DEMAT account will be suspended today due to incomplete KYC. Verify your PAN and account immediately at: https://demat-kyc-verification.example. Blocked within 2 hours.',
    botReplyHi: 'चेतावनी: NSDL/CDSL कभी भी व्हाट्सएप या एसएमएस पर ऐसा लिंक नहीं भेजते। यह पासवर्ड और पैन चुराने वाली फिशिंग लिंक है!',
    botReplyEn: 'WARNING: This is a credential phishing link impersonating depositories. NSDL/CDSL never request credential updates via external URLs.'
  },
  {
    id: 'fwd-withdraw',
    title: '💸 Fake ₹48,750 Withdrawal Release Fee',
    titleHi: '💸 ₹48,750 विड्रॉल रिलीज फीस फ्रॉड',
    text: 'Withdrawal Pending: Your investment generated ₹48,750 profit. Pay ₹2,499 regulatory verification fee within 30 minutes to release funds. Contact: support@example-help.com',
    botReplyHi: 'रमेश जी, यह पोंजी एडवांस फीस फ्रॉड है! अगर आपने ₹2,499 दिए तो वे ₹5,000 और मांगेंगे लेकिन ₹1 भी वापस नहीं मिलेगा!',
    botReplyEn: 'Advance fee extortion alert: Legitimate brokers deduct statutory charges directly from payouts. Never pay upfront fees to unlock balances.'
  }
];

export function WhatsAppBharatSimulator({ onSelectSampleForAnalysis, lang }: WhatsAppBharatSimulatorProps) {
  const [selectedSample, setSelectedSample] = useState<typeof SAMPLE_FORWARDS[0]>(SAMPLE_FORWARDS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const isHindi = lang === 'hi';

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleAnalyzeInFullEngine = () => {
    onSelectSampleForAnalysis(selectedSample.text, 'text');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-0">
      {/* Simulation Banner */}
      <div className="bg-emerald-800 text-white px-4 py-2 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold tracking-wide">
            {isHindi ? '📱 भारत व्हाट्सएप सुरक्षा सिमुलेटर (Tier-2/3 Investor Channel)' : '📱 Bharat WhatsApp Protection Simulator (Tier-2/3 Direct Delivery)'}
          </span>
        </div>
        <span className="text-[10px] bg-emerald-700 px-2 py-0.5 rounded font-mono">
          Cloud API / Webhook Ready
        </span>
      </div>

      {/* Preset Selector Bar */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-bold text-slate-700 shrink-0">
          {isHindi ? 'फॉरवर्ड संदेश चुनें:' : 'Select Sample Forward:'}
        </span>
        {SAMPLE_FORWARDS.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedSample(item);
              setIsPlayingAudio(false);
            }}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              selectedSample.id === item.id
                ? 'bg-emerald-700 text-white font-bold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isHindi ? item.titleHi : item.title}
          </button>
        ))}
      </div>

      {/* WhatsApp Simulated Chat Window */}
      <div className="bg-[#e5ddd5] min-h-[380px] p-3 sm:p-4 flex flex-col justify-between space-y-4 relative">
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
          {/* User message (Forwarded message from Ramesh) */}
          <div className="flex justify-end">
            <div className="bg-[#dcf8c6] rounded-2xl rounded-tr-xs p-3 max-w-[85%] sm:max-w-[70%] shadow-xs text-xs space-y-1 text-slate-900">
              <div className="flex items-center space-x-1 text-[10px] text-slate-500 italic">
                <span>Forwarded</span>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap">{selectedSample.text}</p>
              <div className="flex items-center justify-end space-x-1 text-[10px] text-slate-500">
                <span>10:42 AM</span>
                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
              </div>
            </div>
          </div>

          {/* SANGYAN Kavach Bot Reply */}
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 max-w-[90%] sm:max-w-[75%] shadow-xs text-xs space-y-2.5 text-slate-900 border border-slate-100">
              {/* Threat Alert Tag */}
              <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-700 px-2.5 py-1 rounded-lg font-bold text-[11px]">
                <span className="flex items-center space-x-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>🚨 HIGH RISK DETECTED</span>
                </span>
                <span className="font-mono text-[10px]">Score: 94/100</span>
              </div>

              {/* Bot Text Message */}
              <p className="text-slate-800 leading-relaxed font-sans">
                {isHindi ? selectedSample.botReplyHi : selectedSample.botReplyEn}
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
        </div>

        {/* Input bar preview */}
        <div className="bg-white p-2 rounded-2xl flex items-center space-x-2 border border-slate-200 shadow-xs">
          <input
            type="text"
            readOnly
            value={isHindi ? 'व्हाट्सएप पर फॉरवर्ड जांचने के लिए ऊपर दिए गए उदाहरण पर क्लिक करें...' : 'Click any preset above to test real-time WhatsApp forwarding response...'}
            className="flex-1 text-xs text-slate-500 bg-transparent px-2 outline-none font-sans"
          />
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
            <Send className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
