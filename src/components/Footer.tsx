import React from 'react';
import { Shield, Lock, AlertCircle, ExternalLink } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface FooterProps {
  lang: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      {/* Guardrail Banner */}
      <div className="bg-slate-950/80 border-b border-slate-800 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center space-x-2 text-slate-300">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold text-slate-200">
              {lang === 'hi'
                ? 'मूल सिद्धांत: "हम यह नहीं बताते कि क्या खरीदें। हम समझाते हैं कि आपसे क्या कहा जा रहा है।"'
                : lang === 'bn'
                ? 'মূল নীতি: "কী কিনবেন তা আমরা বলি না। আপনাকে কী বলা হচ্ছে তা বুঝতে সাহায্য করি।"'
                : lang === 'as'
                ? 'মূল নীতি: "কি কিনিব আমি নকওঁ। আপোনাক কি কোৱা হৈছে বুজি পোৱাত সহায় কৰোঁ।"'
                : 'Core Philosophy: "Don’t tell investors what to buy. Help them understand what they are being told."'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-amber-400 font-mono text-[11px]">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Strict Zero-Speculation & Zero-Tips Public Guardrail</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-white p-0.5 flex items-center justify-center overflow-hidden shrink-0">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="bg-white/95 px-2.5 py-1 rounded-lg border border-slate-200/80 inline-flex items-center">
                <img src="/brand-title.png" alt="SANGYAN KAVACH" className="h-5 w-auto object-contain" />
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-[12px]">
              {lang === 'hi'
                ? 'भारतीय खुदरा निवेशकों और भारत के प्रथम-पीढ़ी ट्रेडर्स के लिए एक निष्पक्ष, गैर-व्यावसायिक सुरक्षा कवच। पैसे ट्रांसफर करने से पहले संदिग्ध दावों की पड़ताल।'
                : 'A public-good deception defense layer for Indian retail investors. Inspects claims, verifies regulatory identifiers, and highlights hidden risk patterns before money changes hands.'}
            </p>
            <div className="flex items-center space-x-2 text-emerald-400 text-[11px] font-mono">
              <Lock className="w-3.5 h-3.5" />
              <span>Client-Side PII Scrubbing Active</span>
            </div>
          </div>

          {/* Col 2: Regulatory Links */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              {lang === 'hi' ? 'आधिकारिक नियामक पोर्टल' : 'Official Regulatory Portals'}
            </h4>
            <ul className="space-y-1.5 text-[12px]">
              <li>
                <a
                  href="https://sebi.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>SEBI Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://scores.sebi.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>SEBI SCORES 2.0 (Grievance)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://nsdl.co.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>NSDL Depository Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>National Cyber Crime Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency Helpline */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              {lang === 'hi' ? 'आपातकालीन वित्तीय हेल्पलाइन' : 'Immediate Incident Helplines'}
            </h4>
            <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Cyber Fraud Helpline</span>
                <span className="bg-rose-500/20 text-rose-300 font-mono px-2 py-0.5 rounded text-xs">
                  Dial 1930
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Call within 2 hours of unauthorized transfer to freeze money mule accounts.
              </p>
              <div className="pt-1 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-300">SEBI Toll-Free:</span>
                <span className="font-mono text-blue-300">1800 22 7575</span>
              </div>
            </div>
          </div>

          {/* Col 4: Public Safety Charter */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Public Safety Charter
            </h4>
            <div className="text-[11px] space-y-1 text-slate-400 leading-normal">
              <p className="font-medium text-slate-300">SANGYAN Investor Resilience Initiative</p>
              <p>Science & Technology Council, IIT (BHU) Varanasi</p>
              <p className="text-slate-500">In collaboration with SEBI & NSDL</p>
              <div className="pt-2 text-[10px] text-slate-500">
                Built strictly for public welfare. No commercial funnels, tips, or algorithmic trading.
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
          <div>© 2026 SANGYAN KAVACH · Public Digital Defense Infrastructure</div>
          <div className="mt-2 sm:mt-0 flex items-center space-x-4">
            <span>Public Defense: Fraud & Scam Resilience</span>
            <span>•</span>
            <span>Investor Literacy & Multilingual Education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
