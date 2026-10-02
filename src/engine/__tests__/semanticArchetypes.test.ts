import { describe, it, expect } from 'vitest';
import { classifySemanticArchetype } from '../semanticIntentClassifier';

describe('Semantic Intent & Regulatory Precedent Classifier (Hybrid AI)', () => {
  it('correctly maps 400% profit SME IPO claim to Pump-and-Dump Precedent', () => {
    const input = 'VIP INVESTOR GROUP — SECRET SME IPO TIP: 400% profit guaranteed. Join now.';
    const match = classifySemanticArchetype(input);

    expect(match).not.toBeNull();
    expect(match?.category).toBe('PUMP_AND_DUMP');
    expect(match?.sebiPrecedentCitation).toContain('Sharpline');
    expect(match?.similarityScore).toBeGreaterThanOrEqual(50);
  });

  it('correctly maps Demat suspension SMS to Depository Credential Phishing', () => {
    const input = 'URGENT: Your DEMAT account will be suspended today due to incomplete KYC. Verify PAN immediately.';
    const match = classifySemanticArchetype(input);

    expect(match).not.toBeNull();
    expect(match?.category).toBe('DEMAT_PHISHING');
    expect(match?.sebiPrecedentCitation).toContain('NSDL');
  });

  it('correctly maps Withdrawal fee release to Advance Fee Fraud Precedent', () => {
    const input = 'Withdrawal pending: pay regulatory verification fee to release ₹48,750 funds.';
    const match = classifySemanticArchetype(input);

    expect(match).not.toBeNull();
    expect(match?.category).toBe('WITHDRAWAL_FRAUD');
    expect(match?.sebiPrecedentCitation).toContain('C-1930');
  });

  it('correctly maps YouTube like part-time job to Task Scam Precedent', () => {
    const input = 'Part time job earn 3000 daily from home by liking youtube videos and merchant task.';
    const match = classifySemanticArchetype(input);

    expect(match).not.toBeNull();
    expect(match?.category).toBe('TASK_SCAM');
    expect(match?.sebiPrecedentCitation).toContain('I4C');
  });

  it('returns null or low score for completely non-financial personal text', () => {
    const input = 'Family picnic photos at India Gate New Delhi in December with kids.';
    const match = classifySemanticArchetype(input);

    expect(match).toBeNull();
  });
});
