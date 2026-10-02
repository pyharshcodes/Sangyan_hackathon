import { describe, it, expect } from 'vitest';
import { runSangyanAnalysis } from '../coreAnalyzer';

describe('P1 to P6 Core Threat & Educational Audit', () => {
  it('P1: Fake SEBI / 300% Guaranteed Return -> Critical/High Risk', () => {
    const text = `🚨 SEBI INVESTMENT ALERT: Your account has been selected for an exclusive investment opportunity with 300% guaranteed returns in 3 days. Limited slots available. Contact our certified advisor on WhatsApp immediately: wa.me/91XXXXXXXXXX. Invest before 8 PM today.`;
    const result = runSangyanAnalysis(text, 'text');
    console.log('P1 result:', { riskLevel: result.overallAssessment, score: result.heuristicScore, docType: result.documentContentType, rel: result.financialRelevance });
    expect(['High', 'Critical']).toContain(result.overallAssessment);
    expect(result.heuristicScore).toBeGreaterThanOrEqual(70);
  });

  it('P2: Fake Demat KYC SMS Phishing -> Critical/High Risk', () => {
    const text = `URGENT: Your DEMAT account will be suspended today due to incomplete KYC. Verify your PAN and account immediately at: https://demat-kyc-verification.example Failure to verify within 2 hours will result in permanent account blockage.`;
    const result = runSangyanAnalysis(text, 'text');
    console.log('P2 result:', { riskLevel: result.overallAssessment, score: result.heuristicScore, docType: result.documentContentType, rel: result.financialRelevance });
    expect(['High', 'Critical']).toContain(result.overallAssessment);
    expect(result.heuristicScore).toBeGreaterThanOrEqual(70);
  });

  it('P3: Telegram VIP Investment Scam -> Critical/High Risk', () => {
    const text = `💰 VIP INVESTOR GROUP — SECRET SME IPO TIP
Our analysts have confirmed 400% profit potential. Only 20 seats remaining! Send ₹10,000 to our “secure allocation wallet” to reserve your allotment. Guaranteed allocation + guaranteed profit. Join now: t.me/example_vip_group`;
    const result = runSangyanAnalysis(text, 'text');
    console.log('P3 result:', { riskLevel: result.overallAssessment, score: result.heuristicScore, docType: result.documentContentType, rel: result.financialRelevance });
    expect(['High', 'Critical']).toContain(result.overallAssessment);
    expect(result.heuristicScore).toBeGreaterThanOrEqual(70);
  });

  it('P4: Fake Withdrawal Fee Scam -> Critical/High Risk', () => {
    const text = `Withdrawal Pending ⚠️
Your investment account shows an accrued profit balance of ₹48,750.
To release your funds, pay the mandatory SEBI/Regulatory Verification Fee of ₹2,499 within 30 minutes to UPI ID: verify-release@bankupi.
Failure to pay will result in account forfeiture.`;
    const result = runSangyanAnalysis(text, 'text');
    console.log('P4 result:', { riskLevel: result.overallAssessment, score: result.heuristicScore, docType: result.documentContentType, rel: result.financialRelevance });
    expect(['High', 'Critical']).toContain(result.overallAssessment);
    expect(result.heuristicScore).toBeGreaterThanOrEqual(70);
  });

  it('P5: Fake Broker / Phishing Security Message -> Critical/High Risk', () => {
    const text = `SECURITY ALERT: Unusual login detected on your trading account. Your holdings have been frozen to prevent liquidation.
To unlock your account and prevent portfolio auction, verify your broker credentials immediately at:
https://broker-security.example/login`;
    const result = runSangyanAnalysis(text, 'text');
    console.log('P5 result:', { riskLevel: result.overallAssessment, score: result.heuristicScore, docType: result.documentContentType, rel: result.financialRelevance });
    expect(['High', 'Critical']).toContain(result.overallAssessment);
    expect(result.heuristicScore).toBeGreaterThanOrEqual(70);
  });

  it('P6: Legitimate Educational / Public Awareness Message -> Low Risk', () => {
    const text = `Investor Awareness: Before making any investment decision, always verify whether the intermediary is registered with SEBI. Check registration credentials directly on the official SEBI website (sebi.gov.in). Never transfer funds to personal UPI handles or private bank accounts for stock trading.
Investments in securities market are subject to market risks. Read all the related documents carefully before investing.`;
    const result = runSangyanAnalysis(text, 'text');
    console.log('P6 result:', { riskLevel: result.overallAssessment, score: result.heuristicScore, docType: result.documentContentType, rel: result.financialRelevance });
    expect(result.overallAssessment).toBe('Low');
    expect(result.heuristicScore).toBeLessThanOrEqual(10);
  });
});
