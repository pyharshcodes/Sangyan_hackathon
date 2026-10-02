import { describe, it, expect } from 'vitest';
import {
  extractStructuredClaims,
  detectRiskSignals,
  analyzeContentWithSangyanEngine,
  AnalysisInput
} from '../sangyanEngine';

describe('SANGYAN KAVACH Analysis Engine - Unit Tests', () => {
  // ==============================================================
  // 1. EXTRACT STRUCTURED CLAIMS TESTS
  // ==============================================================
  describe('Structured Claims Extraction', () => {
    it('correctly extracts URLs, registration IDs, promised returns, urgency, and payments', () => {
      const input: AnalysisInput = {
        text: 'Prof. Rajesh Sharma (Reg: INA998877112) Guaranteed 300% profit in 48 hours! Only 3 slots left. Transfer ₹25,000 via UPI: rajesh@okaxis. Check https://sme-ipo-allotment.vip'
      };

      const extracted = extractStructuredClaims(input);

      expect(extracted.registration_ids).toContain('INA998877112');
      expect(extracted.urls).toContain('https://sme-ipo-allotment.vip');
      expect(extracted.promised_returns.length).toBeGreaterThan(0);
      expect(extracted.urgency_signals).toContain('only 3 slots');
      expect(extracted.payment_requests).toContain('upi');
    });
  });

  // ==============================================================
  // 2. RISK PATTERN TESTS (14 SPECIFIC SIGNALS)
  // ==============================================================
  describe('14 Core Risk Signals Verification', () => {
    // 1. Guaranteed returns
    it('detects Signal 1: Guaranteed returns', () => {
      const input: AnalysisInput = { text: '100% Guaranteed fixed profit on all intraday trades. Zero risk.' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'Guaranteed returns');
      expect(signal).toBeDefined();
      expect(signal?.severity).toBe('critical');
    });

    // 2. Unrealistic promises
    it('detects Signal 2: Unrealistic promises', () => {
      const input: AnalysisInput = { text: 'Get 40% monthly returns on our algorithmic high-frequency bot.' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'Unrealistic promises');
      expect(signal).toBeDefined();
      expect(signal?.severity).toBe('critical');
    });

    // 3. Urgency
    it('detects Signal 3: Urgency', () => {
      const input: AnalysisInput = { text: 'Urgent alert! Update your verification within 2 hours immediately.' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'Urgency');
      expect(signal).toBeDefined();
      expect(signal?.severity).toBe('high');
    });

    // 4. FOMO
    it('detects Signal 4: FOMO', () => {
      const input: AnalysisInput = { text: 'VIP SME IPO Jackpot Calls: Only 2 slots left for retail partners. Lock upper circuit.' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'FOMO');
      expect(signal).toBeDefined();
      expect(signal?.severity).toBe('high');
    });

    // 5. Fake authority
    it('detects Signal 5: Fake authority', () => {
      const input: AnalysisInput = { text: 'Prof. Rajesh Sharma certified advisor with license INA998877112.' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'Fake authority');
      expect(signal).toBeDefined();
      expect(signal?.severity).toBe('critical');
    });

    // 6. Regulatory impersonation
    it('detects Signal 6: Regulatory impersonation', () => {
      const input: AnalysisInput = { text: 'SEBI Guaranteed Portfolio Manager under Special Window Circular with Investor Compensation Pool backing.' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'Regulatory impersonation');
      expect(signal).toBeDefined();
      expect(signal?.severity).toBe('critical');
    });

    // 7. Suspicious domain
    it('detects Signal 7: Suspicious domain (Lookalike & High-risk TLD)', () => {
      const input: AnalysisInput = { text: 'Access your account at https://zerodha-rekyc-update.vip/login' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'Suspicious domain');
      expect(signal).toBeDefined();
      expect(signal?.severity).toBe('critical');
    });

    // 8. Credential harvesting
    it('detects Signal 8: Credential harvesting', () => {
      const input: AnalysisInput = { text: 'Your trading account has been temporarily blocked. Re-KYC update your Aadhaar & bank details.' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'Credential harvesting');
      expect(signal).toBeDefined();
      expect(signal?.severity).toBe('critical');
    });

    // 9. Advance fee
    it('detects Signal 9: Advance fee', () => {
      const input: AnalysisInput = { text: 'Pay advance fee of ₹25,000 into the reserve pool before allocation.' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'Advance fee');
      expect(signal).toBeDefined();
      expect(signal?.severity).toBe('high');
    });

    // 10. Withdrawal fee
    it('detects Signal 10: Withdrawal fee', () => {
      const input: AnalysisInput = { text: 'Pay 20% SEBI release tax and processing fee to release your trading profits.' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'Withdrawal fee');
      expect(signal).toBeDefined();
      expect(signal?.severity).toBe('critical');
    });

    // 11. Off-platform payment
    it('detects Signal 11: Off-platform payment', () => {
      const input: AnalysisInput = { text: 'Deposit via NEFT directly to personal UPI pool address.' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'Off-platform payment');
      expect(signal).toBeDefined();
      expect(signal?.severity).toBe('high');
    });

    // 12. VIP investment group
    it('detects Signal 12: VIP investment group', () => {
      const input: AnalysisInput = { text: 'Join our Telegram VIP group for exclusive upper circuit insider calls.' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'VIP investment group');
      expect(signal).toBeDefined();
      expect(signal?.severity).toBe('high');
    });

    // 13. Unknown entity
    it('detects Signal 13: Unknown entity', () => {
      const input: AnalysisInput = { organizationName: 'Astra Apex Capital' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'Unknown entity');
      expect(signal).toBeDefined();
    });

    // 14. Unverifiable claims
    it('detects Signal 14: Unverifiable claims', () => {
      const input: AnalysisInput = { text: 'Guaranteed 300% profit with secret institutional allotment quota.' };
      const claims = extractStructuredClaims(input);
      const { signals } = detectRiskSignals(input, claims);

      const signal = signals.find(s => s.signal === 'Unverifiable claims');
      expect(signal).toBeDefined();
    });
  });

  // ==============================================================
  // 3. NEGATIVE CONTROL TESTS (LEGITIMATE EDUCATIONAL CONTENT)
  // ==============================================================
  describe('Negative Control: Legitimate Educational Content', () => {
    it('accurately identifies genuine SEBI educational content as LOW_RISK without false alarms', () => {
      const input: AnalysisInput = {
        text: `SEBI Investor Awareness Initiative:
Understanding Index Funds and Market Volatility.
An index fund is a passive mutual fund that mirrors a market benchmark such as the Nifty 50.
Important Note: All mutual funds are subject to market risks. Past performance does not guarantee future results. No genuine regulator guarantees returns. Read all scheme related documents carefully.`
      };

      const result = analyzeContentWithSangyanEngine(input);

      expect(result.assessment).toBe('LOW_RISK');
      expect(result.signals.length).toBe(0);
      expect(result.verified.length).toBeGreaterThan(0);
      expect(result.summary).toContain('Low risk');
    });

    it('verifies official broker domain Zerodha.com cleanly', () => {
      const input: AnalysisInput = {
        url: 'https://zerodha.com'
      };

      const result = analyzeContentWithSangyanEngine(input);

      expect(result.assessment).toBe('LOW_RISK');
      expect(result.verified.some(v => v.includes('zerodha.com'))).toBe(true);
    });
  });

  // ==============================================================
  // 4. INSUFFICIENT EVIDENCE & EDGE CASE TESTS
  // ==============================================================
  describe('Insufficient Evidence & Edge Cases', () => {
    it('handles empty input gracefully by returning INSUFFICIENT_EVIDENCE', () => {
      const input: AnalysisInput = { text: '' };
      const result = analyzeContentWithSangyanEngine(input);

      expect(result.assessment).toBe('INSUFFICIENT_EVIDENCE');
      expect(result.summary).toContain('Insufficient evidence');
    });

    it('handles non-financial casual text without asserting false scam certainty', () => {
      const input: AnalysisInput = { text: 'Hello, are you coming to the store today?' };
      const result = analyzeContentWithSangyanEngine(input);

      expect(result.assessment).toBe('INSUFFICIENT_EVIDENCE');
      expect(result.signals.length).toBe(0);
    });
  });

  // ==============================================================
  // 5. EVIDENCE-FIRST RULE & STRUCTURED JSON OUTPUT
  // ==============================================================
  describe('Output Structure & Evidence-First Contract', () => {
    it('ensures full compliance with the requested structured JSON schema', () => {
      const input: AnalysisInput = {
        text: 'SEBI VIP Group: 300% guaranteed profit in 2 days. Send ₹10,000 to rajesh@okaxis'
      };

      const result = analyzeContentWithSangyanEngine(input);

      expect(result).toHaveProperty('assessment');
      expect(result).toHaveProperty('summary');
      expect(result).toHaveProperty('signals');
      expect(result).toHaveProperty('verified');
      expect(result).toHaveProperty('unverified');
      expect(result).toHaveProperty('uncertainty');
      expect(result).toHaveProperty('safe_next_steps');
      expect(result).toHaveProperty('hindi_explanation');
      expect(result).toHaveProperty('extracted_claims');
      expect(result).toHaveProperty('limitations');

      // Evidence-first rule: Never says bare "SCAM" without explaining why
      expect(result.summary).toContain('High-risk indicators detected');
      expect(result.signals.length).toBeGreaterThan(0);
      result.signals.forEach(sig => {
        expect(sig.evidence).toBeTruthy();
        expect(sig.explanation).toBeTruthy();
      });
    });
  });
});
