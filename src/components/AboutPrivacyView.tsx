import React from 'react';
import { Lock, AlertTriangle, Scale } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface AboutPrivacyViewProps {
  lang: SupportedLanguage;
}

export const AboutPrivacyView: React.FC<AboutPrivacyViewProps> = ({ lang }) => {
  const headerTitle =
    lang === 'hi'
      ? 'कार्यप्रणाली, गोपनीयता व अनिवार्य सुरक्षा नियम'
      : lang === 'bn'
      ? 'পদ্ধতি, গোপনীয়তা ও বাধ্যতামূলক সুরক্ষা নিয়ম'
      : lang === 'as'
      ? 'কাৰ্যপ্ৰণালী, গোপনীয়তা আৰু বাধ্যতামূলক সুৰক্ষা নিয়ম'
      : 'Methodology, Privacy & Mandatory Guardrails';

  const headerSub =
    lang === 'hi'
      ? 'संज्ञान कवच को भारतीय प्रतिभूति और विनिमय बोर्ड (SEBI), NSDL और IIT (BHU) वाराणसी के निवेशक सुरक्षा ढांचे के पूर्ण अनुपालन के तहत विकसित किया गया है।'
      : 'SANGYAN KAVACH is built strictly in conformance with the public-good investor resilience framework developed with SEBI, NSDL & IIT (BHU).';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-800">
        <div className="flex items-center space-x-3 mb-2">
          <Scale className="w-6 h-6 text-emerald-400" />
          <h2 className="text-lg sm:text-xl font-bold">
            {headerTitle}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {headerSub}
        </p>
      </div>

      {/* Mandatory Guardrails Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>{lang === 'hi' ? 'अनिवार्य नियामक सुरक्षा नियम (Guardrails)' : 'Mandatory Public-Good Guardrails'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">1. Zero Investment Recommendations</span>
            <p className="text-slate-600">
              The product NEVER provides buy, sell, or hold tips, price targets, or trading algorithms. Our philosophy is: "Don't tell investors what to buy. Help them understand what they are being told."
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">2. Zero Commercial / Broking Funnels</span>
            <p className="text-slate-600">
              No affiliate codes, no broking account referrals, no paid subscription upsells, and no transaction commissions.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">3. Transparent Non-Binary Uncertainty</span>
            <p className="text-slate-600">
              No oversimplified "100% scam" or authoritative illusions. Risk scores are explicitly qualified as internal heuristic estimates alongside transparent citations of verified vs. unverified evidence.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">4. Pre-Transaction Interception</span>
            <p className="text-slate-600">
              Designed to intervene at the psychological moment of exposure (via WhatsApp/Telegram forwards, SMS, or screenshots) before the investor commits real funds.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy by Design */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-600" />
          <span>{lang === 'hi' ? 'डेटा गोपनीयता व प्रसंस्करण नीति (Data Privacy)' : 'Data Privacy & Processing Transparency'}</span>
        </h3>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">What We Process:</span>
              <p className="text-slate-600">
                Extracted claims, domain hostnames, and registration tokens submitted by you, strictly for analytical evaluation.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">What We Store:</span>
              <p className="text-slate-600">
                Zero permanent user data. Processing is entirely in-memory during the active session. No database or tracking cookies.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">What We Never Ask For:</span>
              <p className="text-slate-600">
                Never OTPs, banking PINs, passwords, Aadhaar images, or personal financial account statements.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Automated Client-Side PII Scrubbing:</span>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>10-digit Indian Mobile Numbers are masked as <code className="bg-white px-1 py-0.5 rounded font-mono border">[REDACTED_MOBILE_NUMBER]</code></li>
              <li>UPI VPA handles (@okaxis, @paytm, @upi) are masked as <code className="bg-white px-1 py-0.5 rounded font-mono border">[REDACTED_UPI_HANDLE]</code></li>
              <li>Bank accounts, Aadhaar, PAN patterns, and accidental OTP tokens are scrubbed before inference.</li>
              <li>Upload validation strictly caps screenshots at 5 MB and verifies raster image binary headers to reject SVG/script files.</li>
            </ul>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Public Digital Infrastructure (PDI) Alignment:</span>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Project Bhashini (MeitY):</strong> Regional language representations aligned with National Public Language AI standards for vernacular accessibility.</li>
              <li><strong>DigiLocker Credential Framework:</strong> Regulatory intermediary certificates audited against DigiLocker digital signature & PKI standards to detect graphic forgeries.</li>
              <li><strong>Account Aggregator (NBFC-AA):</strong> Strict non-harvesting data minimization principles; personal financial records never stored or profiled.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hybrid AI & Technical Architecture Specification */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-600" />
          <span>{lang === 'hi' ? 'तकनीकी आर्किटेक्चर: सिंबॉलिक हीयूरिस्टिक्स + सेमांटिक वेक्टर AI' : 'Technical Architecture: Symbolic AI Heuristics + Semantic Grounding'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-1.5">
            <span className="font-bold text-indigo-950 block">Deterministic Regulatory Guardrails (Symbolic AI)</span>
            <p className="text-slate-600 leading-relaxed">
              Zero hallucination risk. Direct evaluation of SEBI Intermediary regulations (INA/INH/INZ prefixes), Banning of Unregulated Deposit Schemes Act (BUDS 2019), and SEBI SCORES 2.0 redressal clauses.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1.5">
            <span className="font-bold text-blue-950 block">Semantic Vector Archetype Grounding</span>
            <p className="text-slate-600 leading-relaxed">
              Matches incoming forwards against 12 authentic SEBI enforcement orders (Sharpline Pump & Dump, NSDL KYC Phishing, Advance Fee Extortion) via client-side vector cosine token similarity.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Phone & Offline Access Protocol (1800-KAVACH IVR & USSD) */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-600" />
          <span>{lang === 'hi' ? 'ग्रामीण भारत व फीचर फोन कनेक्टिविटी (IVR व USSD)' : 'Bharat-First Inclusivity: Feature Phone & Offline Access'}</span>
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed">
          {lang === 'hi'
            ? 'भारत के करोड़ों ग्रामीण निवेशकों के पास केवल JioPhone या बेसिक 2G फोन हैं। संज्ञान कवच उनके लिए भी 100% सुलभ है:'
            : 'For millions of Tier-2/3 and rural investors without smartphones or 4G data, SANGYAN Kavach provides 100% offline access channels:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
            <span className="font-bold text-slate-900 block">📞 1800-SANGYAN (Toll-Free Interactive IVR)</span>
            <p className="text-slate-600">
              Users can call from any basic phone and use speech-to-speech in 12 Indian languages to verify suspicious SMS messages or phone calls before transferring money.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
            <span className="font-bold text-slate-900 block">📶 *99*1930# USSD Protocol</span>
            <p className="text-slate-600">
              Zero-internet USSD menu allowing instant verification of SEBI registration numbers or reporting emergency scam SMS within seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
