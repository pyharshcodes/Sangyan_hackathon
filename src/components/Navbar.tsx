import React, { useState } from 'react';
import { Shield, ShieldAlert, PhoneCall, Globe, BookOpen, Info, CheckCircle2, ChevronDown, HeartHandshake } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentView: 'analyze' | 'learn' | 'about';
  setCurrentView: (view: 'analyze' | 'learn' | 'about') => void;
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  onOpenNomineeTracker?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, lang, setLang, onOpenNomineeTracker }) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'bn', label: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'as', label: 'অসমীয়া (Assamese)', flag: '🇮🇳' }
  ];

  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Top GovTech Authority Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200 text-[11px] sm:text-xs">
            {t.initiativeBar}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="flex items-center text-emerald-400 font-mono hidden sm:flex">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            {t.edgePrivacyActive}
          </span>
          <a
            href="tel:1930"
            className="flex items-center bg-rose-950 text-rose-300 px-2.5 py-0.5 rounded border border-rose-800 hover:bg-rose-900 transition-colors font-semibold"
            title="National Cyber Crime Reporting Helpline"
          >
            <PhoneCall className="w-3 h-3 mr-1 text-rose-400" />
            {t.helpline}
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div
            onClick={() => setCurrentView('analyze')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 p-1 shadow-xs group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden shrink-0">
              <img src="/logo.png" alt="SANGYAN KAVACH Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <img
                  src="/brand-title.png"
                  alt="SANGYAN KAVACH"
                  className="h-6 sm:h-7 w-auto object-contain"
                />
                {lang !== 'en' && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-900 font-sans border border-blue-200">
                    {t.appBadge}
                  </span>
                )}
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium hidden md:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Navigation Links + Language Selector */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <nav className="flex items-center space-x-1 text-xs sm:text-sm font-semibold">
              <button
                onClick={() => setCurrentView('analyze')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  currentView === 'analyze'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>{t.verifyContentNav}</span>
              </button>

              <button
                onClick={() => setCurrentView('learn')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  currentView === 'learn'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">{t.literacyNav}</span>
              </button>

              <button
                onClick={() => setCurrentView('about')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  currentView === 'about'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Info className="w-4 h-4" />
                <span className="hidden md:inline">{t.guardrailsNav}</span>
              </button>

              {onOpenNomineeTracker && (
                <button
                  onClick={onOpenNomineeTracker}
                  className="px-2.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 font-bold text-xs shadow-2xs cursor-pointer"
                  title="Open Family Demat Nominee & Unclaimed Asset Audit (Track B)"
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-blue-700" />
                  <span className="hidden lg:inline">Nominee Audit</span>
                  <span className="lg:hidden">Track B</span>
                </button>
              )}

              <a
                href="/presentation.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 font-bold text-xs shadow-2xs"
                title="Open Official 10-Slide Jury Presentation Deck"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="hidden sm:inline">Jury Deck</span>
                <span className="sm:hidden">Deck</span>
              </a>
            </nav>

            {/* Multilingual Selector: English, Hindi, Bengali, Assamese */}
            <div className="relative border-l border-slate-200 pl-2 sm:pl-3 ml-1">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 transition-all shadow-2xs"
                title="Select Language / ভাষা বাছক"
              >
                <Globe className="w-3.5 h-3.5 text-slate-700" />
                <span>{currentLangObj.label}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Language Dropdown Menu */}
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-slate-200 py-1.5 z-50 animate-scaleUp">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Select Language / ভাষা
                  </div>
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        lang === item.code ? 'font-bold text-slate-900 bg-slate-100' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                      {lang === item.code && <span className="text-emerald-600 font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
