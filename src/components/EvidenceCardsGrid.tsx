import React from 'react';
import {
  UserCheck,
  Globe,
  FileText,
  Clock,
  CreditCard,
  Building,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { EvidenceCard, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface EvidenceCardsGridProps {
  cards: EvidenceCard[];
  lang: SupportedLanguage;
}

export const EvidenceCardsGrid: React.FC<EvidenceCardsGridProps> = ({ cards, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Identity':
        return UserCheck;
      case 'URL':
        return Globe;
      case 'Language':
        return FileText;
      case 'Urgency':
        return Clock;
      case 'Payment request':
        return CreditCard;
      case 'Regulatory claim':
      default:
        return Building;
    }
  };

  const getCategoryLabel = (card: EvidenceCard) => {
    if (lang === 'hi') return card.categoryHi || card.category;
    if (lang === 'bn') {
      switch (card.category) {
        case 'Identity': return 'পরিচয় (Identity)';
        case 'URL': return 'ওয়েবসাইট লিংক (URL)';
        case 'Language': return 'ভাষা ও প্ররোচনা (Language)';
        case 'Urgency': return 'তাড়া ও লোভ (Urgency)';
        case 'Payment request': return 'পেমেন্ট অনুরোধ (Payment)';
        default: return 'নিয়ন্ত্রক দাবি (SEBI Claim)';
      }
    }
    if (lang === 'as') {
      switch (card.category) {
        case 'Identity': return 'পৰিচয় (Identity)';
        case 'URL': return 'ৱেবছাইট লিংক (URL)';
        case 'Language': return 'ভাষা আৰু প্ৰৰোচনা (Language)';
        case 'Urgency': return 'জৰুৰী চাপ (Urgency)';
        case 'Payment request': return 'ধন পৰিশোধ অনুৰোধ (Payment)';
        default: return 'নিয়ন্ত্ৰক দাবী (SEBI Claim)';
      }
    }
    return card.category;
  };

  const getStatusBadge = (card: EvidenceCard) => {
    switch (card.severity) {
      case 'danger':
        return {
          icon: XCircle,
          text:
            lang === 'hi'
              ? card.statusHi
              : lang === 'bn'
              ? 'সন্দেহজনক / ঝুঁকি'
              : lang === 'as'
              ? 'সন্দেহজনক / বিপদ'
              : card.status,
          className: 'bg-rose-50 text-rose-800 border-rose-200'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          text:
            lang === 'hi'
              ? card.statusHi
              : lang === 'bn'
              ? 'সতর্কতা প্রয়োজন'
              : lang === 'as'
              ? 'সাৱধানতা প্ৰয়োজন'
              : card.status,
          className: 'bg-amber-50 text-amber-800 border-amber-200'
        };
      case 'safe':
        return {
          icon: CheckCircle2,
          text:
            lang === 'hi'
              ? card.statusHi
              : lang === 'bn'
              ? 'যাচাইকৃত / নিরাপদ'
              : lang === 'as'
              ? 'পৰীক্ষিত / নিৰাপদ'
              : card.status,
          className: 'bg-emerald-50 text-emerald-800 border-emerald-200'
        };
      case 'neutral':
      default:
        return {
          icon: HelpCircle,
          text:
            lang === 'hi'
              ? card.statusHi
              : lang === 'bn'
              ? 'অযাচাইকৃত'
              : lang === 'as'
              ? 'অপৰীক্ষিত'
              : card.status,
          className: 'bg-slate-50 text-slate-700 border-slate-200'
        };
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-5">
      {/* "Why?" Section Header */}
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
            {t.whyTitle}
          </h3>
          <p className="text-xs text-slate-500">
            {t.whySubtitle}
          </p>
        </div>
      </div>

      {/* 6 Individual Evidence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {cards.map((card) => {
          const Icon = getCategoryIcon(card.category);
          const badge = getStatusBadge(card);
          const StatusIcon = badge.icon;

          return (
            <div
              key={card.id}
              className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between space-y-3"
            >
              {/* Card Top: Category & Status */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-200/80 text-slate-800 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      {getCategoryLabel(card)}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${badge.className}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    <span>{badge.text}</span>
                  </span>
                </div>

                {/* Explanation */}
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {lang === 'hi' ? card.explanationHi : card.explanation}
                </p>
              </div>

              {/* Evidence Line */}
              <div className="pt-2 border-t border-slate-200/60 text-[11px] font-mono text-slate-600 bg-white/70 p-2 rounded-xl">
                <span className="font-bold text-slate-800 block text-[10px] uppercase font-sans">
                  {lang === 'hi'
                    ? 'साक्ष्य / तथ्य:'
                    : lang === 'bn'
                    ? 'প্রমাণ / তথ্য:'
                    : lang === 'as'
                    ? 'প্ৰমাণ / তথ্য:'
                    : 'Evidence:'}
                </span>
                <span className="break-words line-clamp-2">{card.evidence}</span>
              </div>

              {card.category === 'Regulatory claim' && (
                <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                  <a
                    href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-blue-700 hover:text-blue-900 font-bold hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>{lang === 'hi' ? 'सेबी के लाइव पोर्टल पर जांचें' : 'Verify on Live SEBI Portal'}</span>
                  </a>
                  <span className="text-[9px] text-slate-400 font-mono">sebi.gov.in</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
