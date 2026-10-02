import React, { useState } from 'react';
import { X, Copy, Check, FileText, AlertTriangle, ExternalLink, Download, Share2, ShieldAlert } from 'lucide-react';
import { AnalysisResult, SupportedLanguage } from '../types';

interface ComplaintDraftModalProps {
  result: AnalysisResult;
  onClose: () => void;
  lang: SupportedLanguage;
}

export const ComplaintDraftModal: React.FC<ComplaintDraftModalProps> = ({
  result,
  onClose,
  lang
}) => {
  const [copied, setCopied] = useState(false);
  const [alertCopied, setAlertCopied] = useState(false);
  const draft = result.complaintDraft;

  if (!draft) return null;

  const fullComplaintText = `OFFICIAL EVIDENCE DOSSIER & INCIDENT NARRATIVE
GENERATED VIA SANGYAN KAVACH INVESTOR RESILIENCE PROTOCOL
----------------------------------------------------------------------
TO: ${draft.recommendedPortal}
SUBJECT: ${draft.subject}
DATE: ${new Date().toLocaleDateString('en-IN')}
TIMESTAMP: ${new Date().toISOString()}

INCIDENT PARTICULARS:
Suspect / Claimed Identity: ${draft.suspectDetails}

NARRATIVE STATEMENT:
${draft.incidentNarrative}

EXTRACTED SUSPICIOUS CONTENT SAMPLE (PII REDACTED):
${result.sanitizedInput}

RELEVANT REGULATORY & LEGAL VIOLATIONS IDENTIFIED:
${draft.regulatoryClauses.map((c, i) => `${i + 1}. ${c}`).join('\n')}

REQUESTED RELIEF:
1. Verification and blocking of fraudulent domain / communication channels.
2. Necessary enforcement action against impersonation of market regulatory authority (SEBI).
3. Freezing of associated mule UPI/bank accounts if fraudulent transactions occurred.
4. Investigation under Section 12A of SEBI Act 1992 and Information Technology Act Section 66D.`;

  const emergencyAlertText = `⚠️ SEBI/INVESTOR FRAUD WARNING: Do not send money or trust claims from '${draft.suspectDetails}'. SANGYAN KAVACH has flagged this as an illegal financial scheme with deceptive guarantees / fake regulatory claims. Verify any intermediary directly on sebi.gov.in before transferring any funds!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullComplaintText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyAlert = () => {
    navigator.clipboard.writeText(emergencyAlertText);
    setAlertCopied(true);
    setTimeout(() => setAlertCopied(false), 2500);
  };

  const handleDownloadDossier = () => {
    const element = document.createElement('a');
    const file = new Blob([fullComplaintText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `SANGYAN_EVIDENCE_DOSSIER_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const modalTitle =
    lang === 'hi'
      ? 'तैयार शिकायत प्रारूप व साक्ष्य दस्तावेज़'
      : lang === 'bn'
      ? 'প্রস্তুতকৃত অভিযোগের খসড়া (Complaint Dossier)'
      : lang === 'as'
      ? 'প্ৰস্তুত কৰা অভিযোগৰ খচৰা (Complaint Dossier)'
      : 'Grievance Assistant: Official Complaint & Evidence Dossier';

  const disclaimerNotice =
    lang === 'hi'
      ? 'यह केवल आपकी सुविधा के लिए तैयार किया गया कानूनी प्रारूप है। यह शिकायत अभी तक आधिकारिक रूप से जमा नहीं की गई है। कृपया इसे कॉपी/डाउनलोड करके आधिकारिक पोर्टल पर खुद दर्ज करें।'
      : lang === 'bn'
      ? 'এটি শুধুমাত্র আপনার সুবিধার জন্য তৈরি খসড়া। এটি এখনও সরকারি পোর্টালে জমা দেওয়া হয়নি। অনুগ্রহ করে এটি কপি করে অফিসিয়াল পোর্টালে জমা দিন।'
      : lang === 'as'
      ? 'এইটো আপোনাৰ সুবিধাৰ্থে প্ৰস্তুত কৰা খচৰাহে। এইটো এতিয়াও চৰকাৰী পৰ্টেলত দাখিল হোৱা নাই। অনুগ্ৰহ কৰি ইয়াক কপি কৰি অফিচিয়েল পৰ্টেলত দাখিল কৰক।'
      : 'This is a prepared evidentiary complaint draft for your convenience. It has NOT been automatically submitted to authorities. Please copy or download this structured text and file directly on the official portal.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col animate-scaleUp">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                {modalTitle}
              </h3>
              <p className="text-[11px] text-slate-400">
                Track B Grievance Assistant · Formatted for {draft.recommendedPortal}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 flex items-start space-x-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">
              {lang === 'hi' ? 'महत्वपूर्ण अस्वीकरण (पारदर्शिता नियम):' : 'Mandatory Verification Notice:'}
            </span>
            <span className="text-[11px] leading-relaxed">
              {disclaimerNotice}
            </span>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Statement'}</span>
            </button>

            <button
              onClick={handleDownloadDossier}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold shadow-2xs cursor-pointer transition-all"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Download Evidence (.txt)</span>
            </button>
          </div>

          <button
            onClick={handleCopyAlert}
            className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl font-semibold transition-all text-[11px] cursor-pointer ${
              alertCopied
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
            }`}
          >
            {alertCopied ? <Check className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
            <span>{alertCopied ? 'Alert Copied!' : 'Copy WhatsApp Warning'}</span>
          </button>
        </div>

        {/* Modal Body / Pre-filled text */}
        <div className="p-5 overflow-y-auto flex-1 text-xs space-y-4">
          <div>
            <textarea
              readOnly
              value={fullComplaintText}
              rows={11}
              className="w-full font-mono text-xs p-3.5 rounded-2xl border border-slate-300 bg-slate-50 text-slate-800 focus:outline-none leading-relaxed"
            />
          </div>

          {/* 3-Step Guided Submission Flow */}
          <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-200 text-xs text-blue-950 space-y-2">
            <span className="font-bold block text-blue-900">
              📌 3-Step Guided Redressal Protocol:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="bg-white/80 p-2 rounded-xl border border-blue-100">
                <span className="font-bold block text-slate-800">1. Download Dossier</span>
                <span className="text-slate-600">Save this evidence file to attach as proof.</span>
              </div>
              <div className="bg-white/80 p-2 rounded-xl border border-blue-100">
                <span className="font-bold block text-slate-800">2. Open Official Portal</span>
                <span className="text-slate-600">Log in securely with your mobile/PAN.</span>
              </div>
              <div className="bg-white/80 p-2 rounded-xl border border-blue-100">
                <span className="font-bold block text-slate-800">3. Paste Statement</span>
                <span className="text-slate-600">Submit complaint directly for action.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-blue-200/60">
              <span className="text-[11px] text-blue-800">
                Recommended authority: <strong>{draft.recommendedPortal}</strong>
              </span>
              <a
                href={
                  draft.recommendedPortal.includes('SCORES')
                    ? 'https://scores.sebi.gov.in'
                    : 'https://cybercrime.gov.in'
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-900 text-white font-bold hover:bg-blue-800 transition-colors shrink-0 shadow-2xs"
              >
                <span>Launch {draft.recommendedPortal.includes('SCORES') ? 'SEBI SCORES 2.0' : 'Cybercrime Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
