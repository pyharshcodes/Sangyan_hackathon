import React, { useState } from 'react';
import {
  Phone,
  PhoneCall,
  Volume2,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
  Hash,
  ArrowRight,
  Radio,
  Zap,
  PhoneOff
} from 'lucide-react';
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
    setActiveMode('ivr');
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
      if (key === 'C' || key === 'END') {
        setInputVal('');
        setUssdStep(1);
      } else if (key === 'OK' || key === 'CALL') {
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
      <div className="bg-slate-900 text-white px-4 py-2 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-bold tracking-wide">
            {isHindi
              ? '📞 ग्रामीण भारत व 0-इंटरनेट फीचर फोन मोड'
              : '📞 Bharat Offline Inclusivity: Feature Phone & Telephony Protocol'}
          </span>
        </div>
        <span className="text-[10px] bg-slate-800 border border-slate-700 px-2 py-0.5 rounded font-mono text-amber-300">
          Zero-Data GSM
        </span>
      </div>

      {/* Mode Selector Tabs */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
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
            📶 *99*1930# USSD
          </button>
          <button
            onClick={() => {
              setActiveMode('ivr');
              if (!callConnected) handleStartIvrCall();
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeMode === 'ivr'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            📞 1800-SANGYAN IVR
          </button>
        </div>

        <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
          Works on ₹1,000 Keypad Phones
        </span>
      </div>

      {/* Main Container */}
      <div className="p-5 bg-gradient-to-b from-slate-100/90 to-slate-100/50 space-y-5">
        {/* Modern Sleek Feature Phone Hardware Mockup */}
        <div className="w-[260px] mx-auto bg-[#0b1329] rounded-[36px] p-4 shadow-2xl border-2 border-slate-700/80 ring-1 ring-slate-800 select-none space-y-3">
          {/* Top Speaker Slit & Front Brand */}
          <div className="space-y-1 text-center">
            <div className="w-10 h-1 bg-slate-600/80 rounded-full mx-auto" />
            <div className="text-[8px] font-mono tracking-widest text-slate-500 uppercase font-bold">
              SEBI KAVACH 4G
            </div>
          </div>

          {/* High-Contrast Modern OLED Display */}
          <div className="w-full bg-[#030712] border border-slate-800 rounded-2xl p-2.5 font-mono text-white min-h-[175px] flex flex-col justify-between shadow-inner">
            {/* Display Top Status Bar */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-1 text-[9px] text-slate-400 font-bold">
              <span className="text-emerald-400">📶 4G VOLTE</span>
              <span className="text-slate-300">10:42 AM</span>
              <span className="text-emerald-400">🔋 98%</span>
            </div>

            {/* Display Screen Body */}
            {activeMode === 'ussd' ? (
              <div className="py-1 text-[11px] leading-tight space-y-1">
                <div className="text-[10px] text-cyan-400 font-bold flex items-center justify-between">
                  <span>*99*1930# DIALOG</span>
                  <span className="text-[9px] text-slate-400">SIM 1</span>
                </div>

                {ussdStep === 1 && (
                  <div className="space-y-0.5 text-slate-200">
                    <p className="font-bold text-amber-300">SEBI KAVACH MENU:</p>
                    <p>1. Check Broker Reg</p>
                    <p>2. Verify WhatsApp Tip</p>
                    <p>3. 1930 Account Freeze</p>
                    <div className="pt-1.5 flex items-center justify-between text-cyan-300 font-bold">
                      <span>Input: [{inputVal || '_'}]</span>
                    </div>
                  </div>
                )}

                {ussdStep === 2 && (
                  <div className="space-y-1 text-slate-200">
                    <p className="font-bold text-amber-300">REGISTRY CHECK:</p>
                    <p className="text-[10px]">Enter 12-char SEBI Code (e.g. INZ000031633):</p>
                    <div className="bg-slate-900 border border-slate-700 p-1 rounded text-emerald-400 text-[10px] font-bold">
                      [{inputVal || 'Enter code'}]
                    </div>
                  </div>
                )}

                {ussdStep === 3 && (
                  <div className="space-y-1 text-slate-200">
                    <p className="font-bold text-rose-400">🚨 SCAM ALERT 🚨</p>
                    <p className="text-[10px] leading-tight text-slate-300">
                      400% Guaranteed Tip is ILLEGAL under SEBI PFUTP 2003.
                    </p>
                    <p className="font-bold text-rose-300 text-[10px]">Risk: CRITICAL (96/100)</p>
                  </div>
                )}

                {ussdStep === 4 && (
                  <div className="space-y-1 text-slate-200">
                    <p className="font-bold text-amber-300">EMERGENCY 1930:</p>
                    <p className="text-[10px] leading-tight text-slate-300">
                      Dialing National Cybercrime Helpline 1930...
                    </p>
                    <p className="text-emerald-400 text-[10px] font-bold">Golden Hour Freeze Active.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-3 text-center space-y-1.5">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center animate-pulse">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">1800-SANGYAN</p>
                  <p className="text-[10px] text-slate-400">
                    {callConnected ? (ivrPlaying ? '🎙️ Speaking Hindi Audio...' : 'Call Connected') : 'Ready to Dial'}
                  </p>
                </div>
              </div>
            )}

            {/* Display Bottom Softkeys */}
            <div className="flex items-center justify-between text-[9px] font-bold border-t border-slate-800/80 pt-1 text-slate-400">
              <span className="hover:text-white cursor-pointer" onClick={() => setUssdStep(1)}>
                [ Exit ]
              </span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleKeypadPress('OK')}>
                [ Select ]
              </span>
            </div>
          </div>

          {/* D-Pad & Call / End Controls */}
          <div className="flex items-center justify-between px-1 pt-1">
            <button
              onClick={() => handleKeypadPress('OK')}
              className="w-11 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center cursor-pointer shadow-xs transition-colors"
              title="Call / Confirm"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>

            {/* Navigation Ring / OK Button */}
            <div
              onClick={() => handleKeypadPress('OK')}
              className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 hover:bg-slate-700 flex items-center justify-center text-white text-[10px] font-bold cursor-pointer shadow-xs"
            >
              OK
            </div>

            <button
              onClick={() => {
                setUssdStep(1);
                setInputVal('');
                handleStopIvrCall();
              }}
              className="w-11 h-8 rounded-xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-[10px] flex items-center justify-center cursor-pointer shadow-xs transition-colors"
              title="End / Clear"
            >
              <PhoneOff className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Realistic 3x4 Tactile Keypad Grid */}
          <div className="grid grid-cols-3 gap-1.5 w-full pt-1">
            {[
              { k: '1', sub: '_' },
              { k: '2', sub: 'ABC' },
              { k: '3', sub: 'DEF' },
              { k: '4', sub: 'GHI' },
              { k: '5', sub: 'JKL' },
              { k: '6', sub: 'MNO' },
              { k: '7', sub: 'PQRS' },
              { k: '8', sub: 'TUV' },
              { k: '9', sub: 'WXYZ' },
              { k: '*', sub: '·' },
              { k: '0', sub: '+' },
              { k: '#', sub: '⇧' }
            ].map(({ k, sub }) => (
              <button
                key={k}
                onClick={() => handleKeypadPress(k)}
                className="h-8 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:bg-slate-900 border border-slate-700/60 text-white flex flex-col items-center justify-center transition-all cursor-pointer shadow-xs select-none"
              >
                <span className="text-xs font-bold leading-none font-mono">{k}</span>
                <span className="text-[7px] text-slate-400 font-mono tracking-tighter leading-none mt-0.5">
                  {sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 1-Click Interactive Telephony Gateway Triggers */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">
              {isHindi ? 'त्वरित टेलीफोनी गेटवे टेस्ट:' : 'Quick Telephony Triggers:'}
            </span>
            {callConnected && (
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>IVR Call Active</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {!callConnected ? (
              <button
                onClick={handleStartIvrCall}
                className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center justify-center space-x-2 shadow-xs cursor-pointer transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{isHindi ? '1800 टोल-फ्री कॉल करें' : 'Dial 1800 Toll-Free Call'}</span>
              </button>
            ) : (
              <button
                onClick={handleStopIvrCall}
                className="py-2.5 px-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold flex items-center justify-center space-x-2 shadow-xs cursor-pointer transition-all"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>{isHindi ? 'कॉल समाप्त करें' : 'Hang Up Call'}</span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveMode('ussd');
                setUssdStep(3);
              }}
              className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
            >
              <Hash className="w-3.5 h-3.5 text-blue-700" />
              <span>{isHindi ? 'USSD *99# चलाएं' : 'Simulate *99*1930#'}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed pt-1 border-t border-slate-100">
            {isHindi
              ? 'बिना स्मार्टफोन या 4G डेटा के साधारण कीपैड फोन से *99# डायल करके या 1800-संज्ञान पर कॉल करके कोई भी नागरिक सेबी सुरक्षा जांच कर सकता है।'
              : 'Allows 400M+ basic keypad phone users to verify brokers and report scam SMS via simple keystrokes with 0 KB internet.'}
          </p>
        </div>
      </div>
    </div>
  );
}
