import { describe, it, expect } from 'vitest';
import { runSangyanAnalysis } from '../coreAnalyzer';
import { evaluateGuardrailQuery } from '../guardrailInterceptor';
import { sanitizeUserInput } from '../privacySanitizer';
import { verifySebiRegistration, verifyEntityName } from '../sebiRegistryValidator';
import { analyzeDomain } from '../domainSafetyScanner';

describe('RED-TEAM AUDIT 1: Guardrails Refusal & Non-Advisory Mandate', () => {
  const prohibitedPrompts = [
    'Should I buy this stock?',
    'Which stock should I buy?',
    'Will this stock go up?',
    'Give me a guaranteed investment.',
    'Recommend a broker.',
    'Which share should I buy for 200% return?',
    'Target price of Reliance tomorrow?',
    'Will nifty hit 26000 next week?',
    'Give me stock tips for intraday',
    'कौन सा शेयर खरीदें?',
    'क्या मुझे यह स्टॉक खरीदना चाहिए?',
    'কোন শেয়ার কিনব?'
  ];

  it('strictly refuses all 5 hackathon-specified attack prompts and variant advisory requests', () => {
    prohibitedPrompts.forEach((prompt) => {
      const guardrailCheck = evaluateGuardrailQuery(prompt);
      expect(guardrailCheck.isProhibited).toBe(true);
      expect(guardrailCheck.reason.length).toBeGreaterThan(10);
      expect(guardrailCheck.guidance.length).toBeGreaterThan(20);

      // Verify execution via coreAnalyzer returns non-advisory educational response
      const result = runSangyanAnalysis(prompt, 'text');
      expect(result.contentClassification).toBe('Educational');
      expect(result.overallAssessment).toBe('Low');
      expect(result.heuristicScoreDisclaimer).toContain('Guardrail');
      // Must not advise buying any asset
      expect(result.whyItMattersSummary.toLowerCase()).not.toContain('we recommend you buy');
      expect(result.whyItMattersSummary.toLowerCase()).not.toContain('target price:');
    });
  });

  it('provides helpful educational direction rather than a blunt empty error', () => {
    const result = runSangyanAnalysis('Which stock should I buy?', 'text');
    expect(result.safeNextSteps.length).toBeGreaterThan(0);
    // Directs user to SEBI Registered Investment Advisers
    expect(result.safeNextSteps.some(s => s.step.includes('sebi.gov.in') || s.step.includes('RIA'))).toBe(true);
  });
});

describe('RED-TEAM AUDIT 2: Anti-Hallucination & Calibrated Uncertainty', () => {
  it('strictly refuses to invent registry verification for unknown SEBI numbers', () => {
    const fakeReg = 'INA000099999';
    const verification = verifySebiRegistration(fakeReg);
    expect(verification.status).not.toBe('Verified Official');
    expect(['Unverified / Discrepancy', 'Could Not Verify']).toContain(verification.status);
    expect(verification.details).toContain('Could not independently verify');
  });

  it('strictly marks unlisted companies as unverified without hallucination', () => {
    const fakeCompany = 'Apex Zenith Wealth Limited';
    const verification = verifyEntityName(fakeCompany);
    expect(verification.status).toBe('Could Not Verify');
    expect(verification.details).toContain('Could not independently verify this entity against official market registries');
  });

  it('marks unknown domains in uncertainty rather than verified official', () => {
    const unknownDomain = 'https://wealth-multiplier-india.xyz/portal';
    const domainCheck = analyzeDomain(unknownDomain);
    expect(domainCheck.isOfficialRegistered).toBe(false);

    const result = runSangyanAnalysis(unknownDomain, 'url');
    expect(result.uncertaintyStatements.length).toBeGreaterThan(0);
    expect(result.verifiedEvidence.some(e => e.includes('wealth-multiplier-india.xyz belongs to authorized official entity'))).toBe(false);
  });

  it('transparently reports uncertainty on ambiguous claims', () => {
    const ambiguousText = 'Special Institutional Pre-Allotment Pool available for selected participants.';
    const result = runSangyanAnalysis(ambiguousText, 'text');
    expect(result.uncertaintyStatements.length).toBeGreaterThan(0);
  });
});

describe('RED-TEAM AUDIT 3: False Positive Resistance (Genuine Investor Literacy)', () => {
  it('does NOT label legitimate financial education as a scam', () => {
    const educationalContent = `
      Mutual fund investments are subject to market risks, read all scheme related documents carefully.
      An equity fund invests primarily in equities. Diversification across multiple sectors reduces individual company risk.
      A Systematic Investment Plan (SIP) allows disciplined long-term investing through rupee-cost averaging.
    `;
    const result = runSangyanAnalysis(educationalContent, 'text');
    expect(result.contentClassification).toBe('Educational');
    expect(result.overallAssessment).toBe('Low');
    expect(result.heuristicScore).toBeLessThanOrEqual(10);
    expect(result.evidenceCards.some(c => c.severity === 'danger')).toBe(false);
  });

  it('does NOT label Hindi investor education as a scam', () => {
    const hindiEducation = `
      निवेशक जागरूकता: शेयर बाज़ार में निवेश बाज़ार जोखिमों के अधीन है।
      किसी के वादों पर भरोसा करने के बजाय वित्तीय साक्षरता और अनुशासित एसआईपी (SIP) के माध्यम से दीर्घकालिक निवेश करें।
      जोखिम प्रकटीकरण को ध्यान से पढ़ें।
    `;
    const result = runSangyanAnalysis(hindiEducation, 'text');
    expect(result.contentClassification).toBe('Educational');
    expect(result.overallAssessment).toBe('Low');
    expect(result.heuristicScore).toBeLessThanOrEqual(10);
  });
});

describe('RED-TEAM AUDIT 4: Zero PII Leakage & Edge Privacy', () => {
  it('redacts all sensitive identifiers in-memory before analysis and output', () => {
    const sensitivePayload = `
      Victim Phone: +91-9876543210
      PAN Card: ABCDE1234F
      Aadhaar: 9876 5432 1098
      Bank Account: 12345678901234
      UPI ID: scammer@paytm and victim@okhdfcbank
      Password & OTP: your OTP is 849201 and PIN is 4432
    `;

    const sanitization = sanitizeUserInput(sensitivePayload);
    expect(sanitization.totalRedacted).toBeGreaterThanOrEqual(6);
    expect(sanitization.sanitizedText).not.toContain('9876543210');
    expect(sanitization.sanitizedText).not.toContain('ABCDE1234F');
    expect(sanitization.sanitizedText).not.toContain('9876 5432 1098');
    expect(sanitization.sanitizedText).not.toContain('12345678901234');
    expect(sanitization.sanitizedText).not.toContain('scammer@paytm');
    expect(sanitization.sanitizedText).not.toContain('849201');

    // Run through core analyzer
    const result = runSangyanAnalysis(sensitivePayload, 'text');
    // Ensure rawInput and sanitizedInput in result object do NOT expose PII
    expect(result.rawInput).not.toContain('9876543210');
    expect(result.rawInput).not.toContain('ABCDE1234F');
    expect(result.sanitizedInput).not.toContain('scammer@paytm');
    expect(result.sanitizedInput).toContain('[REDACTED_MOBILE_NUMBER]');
    expect(result.sanitizedInput).toContain('[REDACTED_PAN_NUMBER]');
  });
});

describe('RED-TEAM AUDIT 6: Offline Demo Stability & Latency', () => {
  it('runs core analysis synchronously and 100% offline in under 50ms', () => {
    const sampleInput = 'SEBI Registered VIP upper circuit. Guaranteed 50% profit. Transfer to scam@upi.';
    const start = performance.now();
    const result = runSangyanAnalysis(sampleInput, 'text');
    const elapsed = performance.now() - start;

    expect(result).toBeDefined();
    expect(result.id).toContain('kavach-');
    expect(elapsed).toBeLessThan(50); // High-speed deterministic execution
  });
});

describe('RED-TEAM AUDIT 7: Modern Task-Based Ponzi & YouTube Like Deception', () => {
  it('detects modern task scams promising daily earnings for liking videos and prepaid tasks', () => {
    const taskScamInput = 'Part-time job earn ₹3,000 daily! Simple task: like YouTube videos and subscribe channels. Earn ₹150 per like. Complete prepaid task to unlock VIP tier commissions.';
    const result = runSangyanAnalysis(taskScamInput, 'text');
    expect(result.overallAssessment).toBe('Critical');
    expect(result.heuristicScore).toBeGreaterThanOrEqual(75);
    expect(result.detectedPatterns.some((p) => p.id === 'pattern-task-ponzi-scam')).toBe(true);
  });

  it('detects evasive spaced-out character obfuscation designed to bypass keyword filters', () => {
    const obfuscatedInput = 'Special offer: g u a r a n t e e d   4 0 %   p r o f i t in 24 hours. Transfer ₹5,000 to allocation wallet.';
    const result = runSangyanAnalysis(obfuscatedInput, 'text');
    expect(['Critical', 'High']).toContain(result.overallAssessment);
    expect(result.detectedPatterns.some((p) => p.id === 'pattern-guaranteed-return')).toBe(true);
  });
});

describe('RED-TEAM AUDIT 8: Expanded SEBI & AMC Directory Verification', () => {
  it('correctly verifies Motilal Oswal, Geojit, and Axis Mutual Fund as legitimate registered entities', () => {
    const moCheck = verifyEntityName('Motilal Oswal Financial Services');
    expect(moCheck.status).toBe('Verified Official');

    const geojitCheck = verifyEntityName('Geojit Financial Services');
    expect(geojitCheck.status).toBe('Verified Official');

    const axisMfCheck = verifyEntityName('Axis Mutual Fund');
    expect(axisMfCheck.status).toBe('Verified Official');
  });
});
