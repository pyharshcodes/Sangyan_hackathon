export type SupportedLanguage = 'en' | 'hi' | 'bn' | 'as';

export type RiskLevel =
  | 'No Financial Risk'
  | 'Low'
  | 'Moderate'
  | 'Needs Verification'
  | 'High'
  | 'Critical';

export type ContentCategory =
  | 'Educational'
  | 'Promotional'
  | 'Suspicious'
  | 'Insufficient evidence'
  | 'Non-Financial Document'
  | 'Personal Content';

export type DocumentContentType =
  | 'PERSONAL_PHOTO'
  | 'EDUCATIONAL_DOCUMENT'
  | 'IDENTITY_DOCUMENT'
  | 'BANK_DOCUMENT'
  | 'INVESTMENT_CONTENT'
  | 'FINANCIAL_ADVERTISEMENT'
  | 'INVESTMENT_MESSAGE'
  | 'PAYMENT_TRANSACTION_CONTENT'
  | 'UNKNOWN';

export type FinancialRelevance = 'YES' | 'NO' | 'UNCERTAIN';

export interface ExtractedClaims {
  financialClaims: string[];
  organizations: string[];
  persons: string[];
  registrationIds: string[];
  urls: string[];
  promisedReturns: string[];
  urgencyLanguage: string[];
  paymentRequests: string[];
  contactInfo: string[];
}

export interface VerificationItem {
  subject: string;
  claim: string;
  status: 'Verified Official' | 'Unverified / Discrepancy' | 'Could Not Verify' | 'Known Impersonation';
  details: string;
  sourceReference?: string;
}

export type UrlClassificationType =
  | 'NORMAL WEBSITE'
  | 'GOVERNMENT/EDUCATIONAL'
  | 'FINANCIAL/INVESTMENT'
  | 'E-COMMERCE'
  | 'SOCIAL MEDIA'
  | 'REGISTRATION/EVENT'
  | 'PAYMENT'
  | 'UNKNOWN';

export interface DomainAnalysis {
  domain: string;
  isLookalike: boolean;
  targetBrand?: string;
  suspiciousTld: boolean;
  isOfficialRegistered: boolean;
  notes: string[];
  urlType?: UrlClassificationType;
  financialRelevance?: FinancialRelevance;
  riskLevel?: RiskLevel;
  riskIndicators?: string[];
  explanation?: string;
  explanationHi?: string;
  recommendedAction?: string;
  recommendedActionHi?: string;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  verifiedContent?: boolean;
  unverifiedDestinationNotice?: string;
  observedCharacteristics?: string[];
}

export interface RiskIndicator {
  id: string;
  category: 'Guarantee' | 'Urgency' | 'Authority' | 'Withdrawal' | 'Impersonation' | 'Unregistered' | 'Payment';
  title: string;
  titleHi: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  whyItMatters: string;
  whyItMattersHi: string;
}

export interface EvidenceCard {
  id: string;
  category: 'Identity' | 'URL' | 'Language' | 'Urgency' | 'Payment request' | 'Regulatory claim';
  categoryHi: string;
  status: 'Verified Official' | 'Suspicious / Flagged' | 'Unverified Discrepancy' | 'Normal / Clear';
  statusHi: string;
  severity: 'safe' | 'warning' | 'danger' | 'neutral';
  explanation: string;
  explanationHi: string;
  evidence: string;
}

export interface ConsequenceStep {
  day: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  userState: 'curiosity' | 'false_confidence' | 'panic' | 'financial_loss';
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  rawInput: string;
  sanitizedInput: string;
  inputType: 'text' | 'image' | 'url';
  imagePreviewUrl?: string;

  // Layer 1: Claim extraction
  extractedClaims: ExtractedClaims;

  // Layer 2: Entity verification
  entityVerifications: VerificationItem[];

  // Layer 3: URL / Domain analysis
  domainAnalyses: DomainAnalysis[];

  // Layer 4: Scam pattern analysis
  detectedPatterns: RiskIndicator[];

  // Individual structured Evidence Cards
  evidenceCards: EvidenceCard[];

  // Step 1 & 2: Content classification and financial relevance
  documentContentType?: DocumentContentType;
  financialRelevance?: FinancialRelevance;
  relevanceExplanation?: string;
  urlClassification?: UrlClassificationType;
  urlRiskIndicators?: string[];
  urlConfidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  urlRecommendedAction?: string;

  // Layer 5: Misinformation analysis
  contentClassification: ContentCategory;
  classificationRationale: string;

  // Risk Output (Evidence-driven)
  overallAssessment: RiskLevel;
  heuristicScore: number; // 0 to 100 internal heuristic
  heuristicScoreDisclaimer: string;

  // Explanations
  whyItMattersSummary: string;
  whyItMattersSummaryHi: string;
  hindiExplanation: string;
  hindiAnalogy: string;

  // Evidence & Uncertainty
  verifiedEvidence: string[];
  uncertaintyStatements: string[];

  // Educational Consequence Simulator
  consequenceSteps: ConsequenceStep[];

  // Safe Action Center
  safeNextSteps: {
    step: string;
    stepHi: string;
    critical: boolean;
  }[];

  // Prepared complaint draft
  complaintDraft?: {
    subject: string;
    suspectDetails: string;
    incidentNarrative: string;
    recommendedPortal: 'SEBI SCORES 2.0' | 'National Cybercrime Helpline 1930 / cybercrime.gov.in';
    regulatoryClauses: string[];
  };

  // Hybrid AI & Semantic Archetype Mapping (Flaw 1)
  semanticArchetype?: {
    archetypeId: string;
    name: string;
    nameHi: string;
    category: string;
    similarityScore: number;
    sebiPrecedentCitation: string;
    modusOperandi: string;
    modusOperandiHi: string;
    behaviouralTriggers: string[];
  };

  // Crowdsourced Regional Scam Telemetry (Flaw 10)
  threatTelemetry?: {
    regionalFlagCount: number;
    cityHub: string;
    syndicateDetected: boolean;
  };
}

export interface DemoPreset {
  id: string;
  title: string;
  titleHi: string;
  titleBn?: string;
  titleAs?: string;
  shortDesc: string;
  shortDescBn?: string;
  shortDescAs?: string;
  category: string;
  type: 'text' | 'image' | 'url';
  content: string;
  imageBadgeText?: string;
  imageMockUrl?: string;
}
