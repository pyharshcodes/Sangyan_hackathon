import { describe, it, expect } from 'vitest';
import { runSangyanAnalysis } from '../coreAnalyzer';
import { analyzeUrlRisk } from '../urlRiskAnalyzer';

describe('URL / Link Risk Detection Pipeline', () => {
  // Case 1: Normal hackathon registration URL
  it('Case 1: Normal hackathon registration URL -> Low / No Financial Risk', () => {
    const input = 'https://example.com/hackathon/register';
    const assessment = analyzeUrlRisk(input);

    expect(assessment.urlType).toBe('REGISTRATION/EVENT');
    expect(assessment.financialRelevance).toBe('NO');
    expect(['No Financial Risk', 'Low']).toContain(assessment.riskLevel);
    expect(assessment.confidence).toBe('HIGH');
    expect(assessment.riskIndicators.length).toBe(0);

    const result = runSangyanAnalysis(input, 'url');
    expect(['No Financial Risk', 'Low']).toContain(result.overallAssessment);
    expect(result.urlClassification).toBe('REGISTRATION/EVENT');
    expect(result.heuristicScore).toBeLessThanOrEqual(5);
  });

  // Case 2: Government website URL
  it('Case 2: Government website URL (SEBI) -> Low Risk / Verified Official', () => {
    const input = 'https://sebi.gov.in/filings';
    const assessment = analyzeUrlRisk(input);

    expect(assessment.urlType).toBe('GOVERNMENT/EDUCATIONAL');
    expect(assessment.riskLevel).toBe('Low');
    expect(assessment.isOfficialRegistered).toBe(true);
    expect(assessment.confidence).toBe('HIGH');

    const result = runSangyanAnalysis(input, 'url');
    expect(result.overallAssessment).toBe('Low');
    expect(result.urlClassification).toBe('GOVERNMENT/EDUCATIONAL');
    expect(result.evidenceCards.find(c => c.id === 'card-url')?.status).toBe('Verified Official');
  });

  // Case 3: Educational website URL
  it('Case 3: Educational website URL -> Low / No Financial Risk', () => {
    const input = 'https://iitbhu.ac.in';
    const assessment = analyzeUrlRisk(input);

    expect(assessment.urlType).toBe('GOVERNMENT/EDUCATIONAL');
    expect(assessment.financialRelevance).toBe('NO');
    expect(['No Financial Risk', 'Low']).toContain(assessment.riskLevel);
    expect(assessment.confidence).toBe('HIGH');

    const result = runSangyanAnalysis(input, 'url');
    expect(['No Financial Risk', 'Low']).toContain(result.overallAssessment);
    expect(result.urlClassification).toBe('GOVERNMENT/EDUCATIONAL');
  });

  // Case 4: Normal news article
  it('Case 4: Normal news article -> Low / No Financial Risk', () => {
    const input = 'https://economictimes.indiatimes.com/news/economy/policy-update';
    const assessment = analyzeUrlRisk(input);

    expect(assessment.urlType).toBe('NORMAL WEBSITE');
    expect(assessment.financialRelevance).toBe('NO');
    expect(['No Financial Risk', 'Low']).toContain(assessment.riskLevel);
    expect(assessment.confidence).toBe('HIGH');

    const result = runSangyanAnalysis(input, 'url');
    expect(['No Financial Risk', 'Low']).toContain(result.overallAssessment);
    expect(result.urlClassification).toBe('NORMAL WEBSITE');
  });

  // Case 5: Normal investment education article
  it('Case 5: Normal investment education article on verified broker -> Low Risk', () => {
    const input = 'https://zerodha.com/varsity/module/introduction-to-stock-markets';
    const assessment = analyzeUrlRisk(input);

    expect(assessment.urlType).toBe('FINANCIAL/INVESTMENT');
    expect(assessment.isOfficialRegistered).toBe(true);
    expect(assessment.riskLevel).toBe('Low');
    expect(assessment.confidence).toBe('HIGH');

    const result = runSangyanAnalysis(input, 'url');
    expect(result.overallAssessment).toBe('Low');
    expect(result.urlClassification).toBe('FINANCIAL/INVESTMENT');
    expect(result.evidenceCards.find(c => c.id === 'card-url')?.status).toBe('Verified Official');
  });

  // Case 6: Suspicious investment URL
  it('Case 6: Suspicious investment URL -> High Risk', () => {
    const input = 'https://quickprofit-india.example/invest-now';
    const assessment = analyzeUrlRisk(input);

    expect(assessment.urlType).toBe('FINANCIAL/INVESTMENT');
    expect(assessment.financialRelevance).toBe('YES');
    expect(['High', 'Critical']).toContain(assessment.riskLevel);
    expect(assessment.riskIndicators.length).toBeGreaterThan(0);
    expect(assessment.verifiedContent).toBe(false);
    expect(assessment.unverifiedDestinationNotice).toBeDefined();

    const result = runSangyanAnalysis(input, 'url');
    expect(['High', 'Critical']).toContain(result.overallAssessment);
    expect(result.urlClassification).toBe('FINANCIAL/INVESTMENT');
    expect(result.heuristicScore).toBeGreaterThanOrEqual(75);
    expect(result.evidenceCards.find(c => c.id === 'card-url')?.status).toBe('Suspicious / Flagged');
  });

  // Case 7: URL accompanied by "guaranteed 5x return"
  it('Case 7: URL accompanied by "guaranteed 5x return" -> High / Critical Risk', () => {
    const input = 'https://wealthgrow.example/plan - Invest ₹10,000 and get guaranteed 5x return in 7 days!';
    const assessment = analyzeUrlRisk(input);

    expect(assessment.urlType).toBe('FINANCIAL/INVESTMENT');
    expect(assessment.financialRelevance).toBe('YES');
    expect(['High', 'Critical']).toContain(assessment.riskLevel);
    expect(assessment.riskIndicators.some(i => i.toLowerCase().includes('guaranteed'))).toBe(true);

    const result = runSangyanAnalysis(input, 'url');
    expect(['High', 'Critical']).toContain(result.overallAssessment);
    expect(result.urlClassification).toBe('FINANCIAL/INVESTMENT');
    expect(result.consequenceSteps.length).toBeGreaterThan(0);
    expect(result.complaintDraft).toBeDefined();
  });

  // Case 8: URL accompanied by "invest now, today only"
  it('Case 8: URL accompanied by "invest now, today only" -> High Risk', () => {
    const input = 'https://exclusive-stockpicks.example/join - Invest now, today only! Exclusive VIP group';
    const assessment = analyzeUrlRisk(input);

    expect(assessment.urlType).toBe('FINANCIAL/INVESTMENT');
    expect(assessment.financialRelevance).toBe('YES');
    expect(['High', 'Critical']).toContain(assessment.riskLevel);
    expect(assessment.riskIndicators.some(i => i.toLowerCase().includes('urgency') || i.toLowerCase().includes('vip'))).toBe(true);

    const result = runSangyanAnalysis(input, 'url');
    expect(['High', 'Critical']).toContain(result.overallAssessment);
    expect(result.urlClassification).toBe('FINANCIAL/INVESTMENT');
    expect(result.evidenceCards.find(c => c.id === 'card-url')?.status).toBe('Suspicious / Flagged');
  });

  // Case 9: Suspicious payment request
  it('Case 9: Suspicious payment request -> High / Critical Risk', () => {
    const input = 'https://pay-release-quota.example/transfer-funds - Pay ₹5,000 release fee to personal UPI to unfreeze shares';
    const assessment = analyzeUrlRisk(input);

    expect(assessment.urlType).toBe('PAYMENT');
    expect(assessment.financialRelevance).toBe('YES');
    expect(['High', 'Critical']).toContain(assessment.riskLevel);
    expect(assessment.riskIndicators.some(i => i.toLowerCase().includes('release fee') || i.toLowerCase().includes('payment'))).toBe(true);

    const result = runSangyanAnalysis(input, 'url');
    expect(['High', 'Critical']).toContain(result.overallAssessment);
    expect(result.urlClassification).toBe('PAYMENT');
    expect(result.complaintDraft).toBeDefined();
  });

  // Case 10: Unknown/unverifiable URL
  it('Case 10: Unknown/unverifiable URL -> Needs Verification', () => {
    const input = 'https://random-blog-xyz123.com/article';
    const assessment = analyzeUrlRisk(input);

    expect(assessment.urlType).toBe('UNKNOWN');
    expect(assessment.financialRelevance).toBe('NO');
    expect(assessment.riskLevel).toBe('Needs Verification');
    expect(assessment.confidence).toBe('MEDIUM');
    expect(assessment.verifiedContent).toBe(false);
    expect(assessment.unverifiedDestinationNotice).toBeDefined();

    const result = runSangyanAnalysis(input, 'url');
    expect(result.overallAssessment).toBe('Needs Verification');
    expect(result.urlClassification).toBe('UNKNOWN');
    expect(result.heuristicScore).toBe(25);
    expect(result.evidenceCards.find(c => c.id === 'card-url')?.status).toBe('Unverified Discrepancy');
  });
});
