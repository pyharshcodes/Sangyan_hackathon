import React, { useState } from 'react';
import { Phone, PhoneCall, Volume2, ShieldAlert, CheckCircle2, RotateCcw, Hash, ArrowRight } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { VoiceNarrator } from '../engine/voiceNarrator';

interface FeaturePhoneIvrSimulatorProps {
  onAnalyzeSample: (text: string, type: 'text' | 'image' | 'url') => void;
  lang: SupportedLanguage;
}

export function FeaturePhoneIvrSimulator({ onAnalyzeSample, lang }: FeaturePhoneIvrSimulatorProps) {
  const [activeMode, setActiveMode] = useState<'ussd' | 'ivr'>('ussd');
  const [ussdStep, setUssdStep] = useState<number>(1);
  const [inputVal, setInputVal] = useState<string>('');
  const [ivrPlaying, setIvrPlaying] = useState<boolean>(false);
  const [callConnected, setCallConnected] = useState<boolean>(false);

  const isHindi = lang === 'hi';

  const handleStartIvrCall = () => {
    setCallConnected(true);
    setIvrPlaying(true);
    const ivrSpeech = isHindi
      ? 'नमस्ते, सेबी संज्ञान कवच राष्ट्रीय टोल-फ्री हेल्पलाइन 1800-संज्ञान में आपका स्वागत है। यदि आपको व्हाट्सएप या एसएमएस पर 400% गारंटीड मुनाफे या फर्जी आईपीओ का संदेश मिला है, तो सावधान रहें। सेबी के अनुसार कोई भी फिक्स मुनाफे की गारंटी नहीं दे सकता। अपने पैसे किसी निजी यूपीआई पर ट्रांसफर न करें।'
      : 'Welcome to SEBI SANGYAN Kavach National Toll-Free Advisory Hotline 1800-SANGYAN. If you received SMS or WhatsApp tips promising guaranteed profits or secret IPO quotas, this is a financial deception alert. Regulated markets never promise fixed returns. Never transfer funds to private UPI accounts.';

    VoiceNarrator.speak(ivrSpeech, lang, () => {
      setIvrPlaying(false);
    });
  };

  const handleStopIvrCall = () => {
    VoiceNarrator.stop();
    setIvrPlaying(false);
    setCallConnected(false);
  };

  const handleKeypadPress = (key: string) => {
    if (activeMode === 'ussd') {
      if (key === 'C') {
        setInputVal('');
      } else if (key === 'OK') {
        if (inputVal === '1') {
          setUssdStep(2); // Verify Broker
          setInputVal('');
        } else if (inputVal === '2') {
          setUssdStep(3); // Check Scam Tip
          setInputVal('');
        } else if (inputVal === '3') {
          setUssdStep(4); // Emergency Freeze
          setInputVal('');
        } else {
          setInputVal('');
        }
      } else {
        if (inputVal.length < 12) {
          setInputVal((prev) => prev + key);
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-0">
      {/* Simulation Banner */}
      <div className="bg-slate-900 text-white px-4 py-2.5 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-bold tracking-wide">
            {isHindi
              ? '📞 ग्रामीण भारत व फीचर फोन मोड (0-इंटरनेट IVR व *99# USSD)'
              : '📞 Bharat Offline Inclusivity: Feature Phone & Telephony Protocol'}
          </span>
        </div>
        <span className="text-[10px] bg-slate-800 border border-slate-700 px-2 py-0.5 rounded font-mono text-amber-300">
          Open Track: Low-Bandwidth / Zero-Internet
        </span>
      </div>

      {/* Mode Selector Tabs */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveMode('ussd');
              handleStopIvrCall();
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeMode === 'ussd'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            📶 *99*1930# USSD Protocol
          </button>
          <button
            onClick={() => setActiveMode('ivr')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeMode === 'ivr'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            📞 1800-SANGYAN Interactive IVR
          </button>
        </div>

        <span className="text-[11px] text-slate-500 hidden sm:inline">
          {isHindi ? 'बिना इंटरनेट के भी हर नागरिक तक सुरक्षा' : 'Works on ₹1,000 Keypad Feature Phones'}
        </span>
      </div>

      {/* Main Interactive Phone Body */}
      <div className="p-6 bg-slate-100/70 flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Nokia / JioPhone Classic Keypad Hardware Mockup */}
        <div className="w-[280px] bg-[#1e293b] rounded-[40px] p-5 shadow-2xl border-4 border-slate-700 flex flex-col items-center space-y-4 select-none">
          {/* Top Speaker Grill */}
          <div className="w-12 h-1.5 bg-slate-600 rounded-full" />

          {/* LCD Screen */}
          <div className="w-full bg-[#9bb28b] border-4 border-slate-800 rounded-xl p-3 font-mono text-slate-950 min-h-[160px] flex flex-col justify-between shadow-inner">
            {activeMode === 'ussd' ? (
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-1 text-[10px] font-bold">
                  <span>*99*1930# SANGYAN</span>
                  <span>SIM 1</span>
                </div>

                {ussdStep === 1 && (
                  <div className="py-1 text-[11px] leading-tight space-y-0.5">
                    <p className="font-bold">SEBI KAVACH MENU:</p>
                    <p>1. Check Broker Reg No</p>
                    <p>2. Verify WhatsApp Tip</p>
                    <p>3. 1930 Account Freeze</p>
                    <div className="pt-2 flex items-center justify-between font-bold">
                      <span>Input: [{inputVal || '_'}]</span>
                    </div>
                  </div>
                )}

                {ussdStep === 2 && (
                  <div className="py-1 text-[10px] leading-tight space-y-1">
                    <p className="font-bold">REGISTRY CHECK:</p>
                    <p>Enter 12-char SEBI No (e.g. INZ000031633 Zerodha):</p>
                    <p className="font-bold bg-slate-900/10 p-0.5">[{inputVal || 'Enter code'}]</p>
                  </div>
                )}

                {ussdStep === 3 && (
                  <div className="py-1 text-[10px] leading-tight space-y-1">
                    <p className="font-bold text-red-900">🚨 SCAM ALERT 🚨</p>
                    <p>400% Guaranteed IPO Group Tip is ILLEGAL under SEBI PFUTP 2003.</p>
                    <p className="font-bold">Risk: CRITICAL (96%)</p>
                  </div>
                )}

                {ussdStep === 4 && (
                  <div className="py-1 text-[10px] leading-tight space-y-1">
                    <p className="font-bold">EMERGENCY 1930:</p>
                    <p>Dialing National Cybercrime Helpline 1930...</p>
                    <p>Golden Hour Freeze Active.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-2 py-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-300 flex items-center justify-center animate-pulse">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold">1800-SANGYAN</p>
                  <p className="text-[10px] text-slate-800">
                    {callConnected ? (ivrPlaying ? 'Speaking Hindi/Vernacular...' : 'Call Active') : 'Call Disconnected'}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[9px] font-bold border-t border-slate-800/40 pt-1">
              <span>BACK</span>
              <span>SELECT</span>
            </div>
          </div>

          {/* D-Pad & Control Buttons */}
          <div className="w-full flex items-center justify-between px-2 pt-1">
            <button
              onClick={() => handleKeypadPress('OK')}
              className="w-10 h-7 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center cursor-pointer shadow-xs"
            >
              CALL
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-white text-[10px] font-bold">
              OK
            </div>
            <button
              onClick={() => {
                setUssdStep(1);
                setInputVal('');
              }}
              className="w-10 h-7 rounded-lg bg-rose-700 hover:bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center cursor-pointer shadow-xs"
            >
              END
            </button>
          </div>

          {/* Numeric Keypad Grid */}
          <div className="grid grid-cols-3 gap-2 w-full pt-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
              <button
                key={k}
                onClick={() => handleKeypadPress(k)}
                className="h-8 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-600 text-white text-xs font-bold font-mono flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Explanation & Direct Action Column */}
        <div className="flex-1 max-w-md space-y-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {isHindi ? 'डिजिटल समावेशन (Digital Inclusion)' : 'Solving the 400M Feature-Phone Gap'}
            </span>
            <h3 className="text-lg font-black text-slate-900">
              {isHindi ? 'इंटरनेट के बिना भी हर गांव तक सुरक्षा' : 'Telephony & USSD Investor Protection Shield'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isHindi
                ? 'भारत के करोड़ों वरिष्ठ नागरिक और ग्रामीण भाई-बहन स्मार्टफोन नहीं चलाते। संज्ञान कवच टेलीफोनी गेटवे के जरिए वे साधारण ₹1,000 वाले कीपैड फोन से भी सेबी पंजीकरण जांच सकते हैं या टोल-फ्री आईवीआर से बोलकर फ्रॉड की जांच कर सकते हैं।'
                : 'Over 400 million first-generation retail investors across Bharat use basic feature phones without 4G or WhatsApp. SANGYAN Kavach bridges this gap with zero-internet USSD protocols and multi-lingual voice IVR.'}
            </p>
          </div>

          {/* Interactive Trigger Buttons */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                {isHindi ? 'लाइव सिमुलेशन टेस्ट करें:' : 'Test Live Telephony Gateway:'}
              </span>
              {callConnected && (
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Call Active (Toll-Free)</span>
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {!callConnected ? (
                <button
                  onClick={handleStartIvrCall}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-xs cursor-pointer transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{isHindi ? '1800 आईवीआर कॉल शुरू करें' : 'Simulate 1800 Toll-Free Call'}</span>
                </button>
              ) : (
                <button
                  onClick={handleStopIvrCall}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-xs cursor-pointer transition-all"
                >
                  <Phone className="w-4 h-4 rotate-135" />
                  <span>{isHindi ? 'कॉल समाप्त करें' : 'Hang Up Call'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  setActiveMode('ussd');
                  setUssdStep(3);
                }}
                className="py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold text-xs flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
              >
                <Hash className="w-4 h-4 text-blue-700" />
                <span>Simulate *99*1930#</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
