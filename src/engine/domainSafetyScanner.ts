import { DomainAnalysis } from '../types';
import { analyzeUrlRisk } from './urlRiskAnalyzer';

export function analyzeDomain(rawUrl: string, accompanyingContext?: string): DomainAnalysis {
  const assessment = analyzeUrlRisk(rawUrl, accompanyingContext);

  const notes: string[] = [];
  if (assessment.isOfficialRegistered) {
    notes.push(`Verified official domain belonging to ${assessment.targetBrand || assessment.hostname}.`);
    notes.push('Matches regulatory records.');
  } else if (assessment.isLookalike) {
    notes.push(`Domain contains the brand name '${assessment.targetBrand}', but is NOT hosted on the official registered domain.`);
  } else if (assessment.riskIndicators.length > 0) {
    notes.push(...assessment.riskIndicators);
  } else {
    notes.push(assessment.explanation);
  }

  return {
    domain: assessment.hostname,
    isLookalike: assessment.isLookalike,
    targetBrand: assessment.targetBrand,
    suspiciousTld: assessment.suspiciousTld,
    isOfficialRegistered: assessment.isOfficialRegistered,
    notes,
    urlType: assessment.urlType,
    financialRelevance: assessment.financialRelevance,
    riskLevel: assessment.riskLevel,
    riskIndicators: assessment.riskIndicators,
    explanation: assessment.explanation,
    explanationHi: assessment.explanationHi,
    recommendedAction: assessment.recommendedAction,
    recommendedActionHi: assessment.recommendedActionHi,
    confidence: assessment.confidence,
    verifiedContent: assessment.verifiedContent,
    unverifiedDestinationNotice: assessment.unverifiedDestinationNotice,
    observedCharacteristics: assessment.observedCharacteristics
  };
}
