import React, { useState, useEffect } from 'react';
import { X, Sparkles, Key, CheckCircle2, ShieldCheck, ExternalLink, Cpu, AlertCircle } from 'lucide-react';
import { getGeminiApiKey, setGeminiApiKey } from '../engine/geminiAiService';

interface GeminiApiKeyModalProps {
  onClose: () => void;
}

export function GeminiApiKeyModal({ onClose }: GeminiApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const existing = getGeminiApiKey();
    if (existing) {
      setApiKey(existing);
    }
  }, []);

  const handleSave = () => {
    setGeminiApiKey(apiKey.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  const handleClear = () => {
    setGeminiApiKey('');
    setApiKey('');
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 1000);
  };

  const isConnected = !!apiKey && apiKey.trim().length > 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-indigo-900 to-slate-900 text-white">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-300">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold">Hybrid AI Engine Configuration</h3>
              <p className="text-[11px] text-indigo-200">Google Gemini 1.5 Flash + Symbolic Guardrails</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-800">
          {/* Status Badge */}
          <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
            isConnected
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-indigo-50 border-indigo-200 text-indigo-950'
          }`}>
            <div className="flex items-center space-x-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-500'}`} />
              <span className="font-bold text-xs">
                {isConnected ? 'Gemini 1.5 Flash Active ⚡' : 'Symbolic Deterministic Guardrail Mode Active 🛡️'}
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white font-bold border border-slate-200">
              {isConnected ? 'Hybrid Neural' : 'Symbolic Heuristics'}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            By connecting your free <strong>Google Gemini API Key</strong>, SANGYAN Kavach activates real-time contextual Generative AI reasoning, nuanced manipulation detection, and dynamic vernacular explanations alongside our deterministic SEBI regulatory guardrails.
          </p>

          {/* Key Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Gemini API Key (Optional):</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-normal"
              >
                <span>Get Free Key (Google AI Studio)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full text-xs font-mono p-3 pr-8 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50"
              />
              <Key className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
            </div>
            <p className="text-[10px] text-slate-500">
              Stored strictly in your local browser memory (localStorage). Never sent to our servers.
            </p>
          </div>

          {/* Fallback Notice */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero-Downtime Guarantee:</span>
            </div>
            <p>
              Even without an API key or when offline, SANGYAN Kavach functions at 100% capacity using client-side Symbolic AI rule heuristics and SEBI Precedent token matching.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
          >
            Clear Key
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
