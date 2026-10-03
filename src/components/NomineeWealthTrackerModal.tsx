import React, { useState } from 'react';
import { X, ShieldCheck, CheckSquare, Square, Download, ExternalLink, HelpCircle, AlertCircle, FileText, HeartHandshake } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface NomineeWealthTrackerModalProps {
  onClose: () => void;
  lang: SupportedLanguage;
}

export function NomineeWealthTrackerModal({ onClose, lang }: NomineeWealthTrackerModalProps) {
  const isHindi = lang === 'hi';

  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('sangyan_nominee_audit');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore
        }
      }
    }
    return {
      dematNominee: false,
      bankNominee: false,
      mfFolioNominee: false,
      physicalShareAudit: false,
      willOrVaultDoc: false
    };
  });

  const toggleCheck = (id: string) => {
    setChecklist((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('sangyan_nominee_audit', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 5) * 100);

  const handleDownloadDossier = () => {
    const text = `================================================================================
SANGYAN KAVACH - FAMILY WEALTH & NOMINEE RESILIENCE DOSSIER
Initiative aligned with SEBI & NSDL Investor Protection Mandate
Generated: ${new Date().toLocaleString('en-IN')}
================================================================================

AUDIT SCORE: ${progressPercent}% COMPLETED (${completedCount}/5 Protected)

1. DEMAT ACCOUNT NOMINEE:
   Status: ${checklist.dematNominee ? '[X] VERIFIED' : '[ ] PENDING'}
   Portal: NSDL / CDSL Depository Portal (sebi.gov.in / nsdl.co.in)
   Rule: SEBI circular requires every Demat holder to register up to 3 nominees or explicitly opt out. Failure can lead to frozen debit transactions.

2. BANK SAVINGS & FD NOMINEE (FORM DA-1):
   Status: ${checklist.bankNominee ? '[X] VERIFIED' : '[ ] PENDING'}
   Rule: Banking Regulation Act Section 45ZA ensures immediate settlement of funds to surviving legal nominees without civil court succession battles.

3. MUTUAL FUND FOLIOS CENTRAL NOMINATION:
   Status: ${checklist.mfFolioNominee ? '[X] VERIFIED' : '[ ] PENDING'}
   Portal: MF Central (mfcentral.com) / CAMSKRA / KFintech
   Rule: Multi-folio nominee synchronization prevents unclaimed folios from going dormant.

4. UNCLAIMED DIVIDENDS & IEPF RECOVERY AUDIT:
   Status: ${checklist.physicalShareAudit ? '[X] AUDITED' : '[ ] UNCHECKED'}
   Portal: Investor Education and Protection Fund Authority (iepf.gov.in)
   Note: If dividends remain unclaimed for 7 consecutive years, shares transfer to IEPF. File Form IEPF-5 for legal restitution.

5. EMERGENCY FAMILY ACCESS VAULT:
   Status: ${checklist.willOrVaultDoc ? '[X] DOCUMENTED' : '[ ] PENDING'}
   Note: Maintain an offline sealed dossier with Folio numbers, DP ID, and Client ID accessible to spouse/children.

================================================================================
OFFICIAL HELPLINES:
- SEBI Toll-Free: 1800 22 7575 / 1800 266 7575
- NSDL Helpdesk: 022 4886 7000 | info@nsdl.co.in
- IEPF Authority Toll-Free: 1800 114 667
================================================================================`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sangyan_Family_Nominee_Audit_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-blue-300">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-200 uppercase tracking-wider font-mono">
                  Investor Redressal & Demat Claims
                </span>
                <span className="text-[10px] text-blue-200">SEBI & IEPF Mandate</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold">
                {isHindi ? 'परिवार डीमैट नॉमिनी व लावारिस शेयर ऑडिट' : 'Family Demat Nominee & Unclaimed Asset Audit'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-800 text-xs sm:text-sm">
          {/* Awareness Banner */}
          <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-start space-x-3 text-blue-950">
            <AlertCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">
                {isHindi
                  ? 'भारत में ₹1.4 लाख करोड़ से अधिक लावारिस डिविडेंड और शेयर बैंक व IEPF में अटके हैं!'
                  : 'Over ₹1.4 Lakh Crore lies unclaimed in dormant Indian accounts and the IEPF Fund!'}
              </p>
              <p className="text-xs text-blue-900 leading-relaxed">
                {isHindi
                  ? 'अगर डीमैट खाते में नॉमिनी (वारिस) दर्ज नहीं है, तो परिवार को कोर्ट कचहरी के चक्कर काटने पड़ते हैं। 5 मिनट में अपने परिवार की सुरक्षा जांचें।'
                  : 'Without an updated Demat Nominee, surviving family members face protracted legal succession procedures. Complete this 5-point resilience audit.'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>{isHindi ? 'परिवार वित्तीय सुरक्षा स्कोर' : 'Family Financial Resilience Score'}</span>
              <span className={`font-mono ${progressPercent === 100 ? 'text-emerald-700' : 'text-blue-700'}`}>
                {progressPercent}% Complete ({completedCount}/5)
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  progressPercent === 100 ? 'bg-emerald-600' : 'bg-blue-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 5-Point Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isHindi ? '5-बिंदु नॉमिनी व उत्तराधिकार जांच सूची' : '5-Point Nominee & Succession Checklist'}
            </h4>

            {/* Item 1 */}
            <div
              onClick={() => toggleCheck('dematNominee')}
              className="p-3.5 bg-white border border-slate-200 hover:border-blue-300 rounded-xl flex items-start space-x-3 cursor-pointer transition-all"
            >
              <div className="shrink-0 mt-0.5">
                {checklist.dematNominee ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="space-y-0.5 flex-1">
                <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                  1. {isHindi ? 'डीमैट खाते में नॉमिनी (NSDL / CDSL) दर्ज है' : 'Demat Account Nominee registered with NSDL / CDSL'}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {isHindi
                    ? 'सेबी के नियम के अनुसार हर डीमैट खाते में अधिकतम 3 नॉमिनी जोड़ना अनिवार्य है।'
                    : 'SEBI circular makes registering up to 3 nominees or explicit opt-out mandatory to prevent account freeze.'}
                </span>
              </div>
            </div>

            {/* Item 2 */}
            <div
              onClick={() => toggleCheck('bankNominee')}
              className="p-3.5 bg-white border border-slate-200 hover:border-blue-300 rounded-xl flex items-start space-x-3 cursor-pointer transition-all"
            >
              <div className="shrink-0 mt-0.5">
                {checklist.bankNominee ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="space-y-0.5 flex-1">
                <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                  2. {isHindi ? 'बैंक बचत खाते और FD में फॉर्म DA-1 भरा हुआ है' : 'Bank Savings & Fixed Deposit Nominee (Form DA-1) updated'}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {isHindi
                    ? 'सुनिश्चित करें कि सभी बैंक खातों की पासबुक पर "Nominee Registered: Yes" लिखा है।'
                    : 'Ensures immediate settlement to nominee without civil court succession certificate.'}
                </span>
              </div>
            </div>

            {/* Item 3 */}
            <div
              onClick={() => toggleCheck('mfFolioNominee')}
              className="p-3.5 bg-white border border-slate-200 hover:border-blue-300 rounded-xl flex items-start space-x-3 cursor-pointer transition-all"
            >
              <div className="shrink-0 mt-0.5">
                {checklist.mfFolioNominee ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="space-y-0.5 flex-1">
                <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                  3. {isHindi ? 'म्यूचुअल फंड फोलियो में MF Central से नॉमिनी सिंक है' : 'Mutual Fund Folios centrally nominated via MF Central'}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {isHindi
                    ? 'CAMSKRA और KFintech फोलियो को एक जगह सिंक करके वारिस दर्ज करें।'
                    : 'Centrally links all mutual fund investments across AMC houses under unified nominees.'}
                </span>
              </div>
            </div>

            {/* Item 4 */}
            <div
              onClick={() => toggleCheck('physicalShareAudit')}
              className="p-3.5 bg-white border border-slate-200 hover:border-blue-300 rounded-xl flex items-start space-x-3 cursor-pointer transition-all"
            >
              <div className="shrink-0 mt-0.5">
                {checklist.physicalShareAudit ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="space-y-0.5 flex-1">
                <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                  4. {isHindi ? 'बुजुर्गों के पुराने शेयर व IEPF में अटके डिविडेंड की जांच' : 'Audit of ancestral physical shares & IEPF unclaimed dividends'}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {isHindi
                    ? 'यदि 7 साल से डिविडेंड नहीं मिला तो फॉर्म IEPF-5 भरकर केंद्र सरकार से शेयर वापस मांगे जा सकते हैं।'
                    : 'Check iepf.gov.in for shares transferred after 7 years of unpaid dividends; reclaim via Form IEPF-5.'}
                </span>
              </div>
            </div>

            {/* Item 5 */}
            <div
              onClick={() => toggleCheck('willOrVaultDoc')}
              className="p-3.5 bg-white border border-slate-200 hover:border-blue-300 rounded-xl flex items-start space-x-3 cursor-pointer transition-all"
            >
              <div className="shrink-0 mt-0.5">
                {checklist.willOrVaultDoc ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="space-y-0.5 flex-1">
                <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                  5. {isHindi ? 'परिवार के लिए सुरक्षित आपातकालीन वित्तीय फाइल तैयार है' : 'Emergency family access file (Folio numbers, DP ID) maintained'}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {isHindi
                    ? 'पासवर्ड नहीं, बल्कि खातों की सूची व पैन कार्ड की प्रति एक सीलबंद लिफाफे में रखें।'
                    : 'Keep an offline sealed envelope with account list, broker names, and folio numbers.'}
                </span>
              </div>
            </div>
          </div>

          {/* Official Registry Links */}
          <div className="pt-2 border-t border-slate-200">
            <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              {isHindi ? 'आधिकारिक सरकारी व डिपॉजिटरी पोर्टल' : 'Official Portals for Direct Registration'}
            </h5>
            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href="https://nsdl.co.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
              >
                <span>NSDL Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.cdslindia.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
              >
                <span>CDSL Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.iepf.gov.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
              >
                <span>IEPF Authority (Form 5)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://mfcentral.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
              >
                <span>MF Central</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={handleDownloadDossier}
            className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isHindi ? 'ऑडिट रिपोर्ट डाउनलोड करें (.txt)' : 'Download Nominee Audit Docket'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            {isHindi ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
