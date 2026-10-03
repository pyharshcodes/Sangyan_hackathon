import { describe, it, expect } from 'vitest';
import { runSangyanAnalysis } from '../coreAnalyzer';
import { classifyContent, classifyDocumentContentType, determineFinancialRelevance } from '../contentClassifier';

describe('Financial Relevance & Document Content Classification Gate', () => {
  // Test Case 1: Normal personal photograph / selfie
  it('Test Case 1: Normal personal photograph / selfie -> No Financial Risk', () => {
    const text = '[Personal photograph - No text detected in image]';
    const docType = classifyDocumentContentType(text, 'image', 'selfie_camera_pic.jpg');
    expect(docType).toBe('PERSONAL_PHOTO');

    const relevance = determineFinancialRelevance(docType, text);
    expect(relevance.relevance).toBe('NO');

    const result = runSangyanAnalysis(text, 'image');
    expect(result.documentContentType).toBe('PERSONAL_PHOTO');
    expect(result.financialRelevance).toBe('NO');
    expect(result.overallAssessment).toBe('No Financial Risk');
    expect(result.heuristicScore).toBe(0);
    expect(result.consequenceSteps).toHaveLength(0);
    expect(result.complaintDraft).toBeUndefined();
    expect(result.evidenceCards.every(c => c.status === 'Normal / Clear')).toBe(true);
  });

  // Test Case 2: JEE marksheet / educational marksheet
  it('Test Case 2: JEE marksheet / educational marksheet -> No Financial Risk', () => {
    const text = `National Testing Agency (NTA) - Joint Entrance Examination (JEE Main) Score Card
Candidate Name: Harshit Kumar
Roll Number: 240310123456
Physics: 98.4 Percentile | Chemistry: 96.2 Percentile | Mathematics: 99.1 Percentile
Total NTA Score: 98.65 Percentile
Status: Qualified for JEE Advanced`;

    const docType = classifyDocumentContentType(text, 'image', 'jee_mains_scorecard.pdf');
    expect(docType).toBe('EDUCATIONAL_DOCUMENT');

    const relevance = determineFinancialRelevance(docType, text);
    expect(relevance.relevance).toBe('NO');

    const result = runSangyanAnalysis(text, 'image');
    expect(result.documentContentType).toBe('EDUCATIONAL_DOCUMENT');
    expect(result.financialRelevance).toBe('NO');
    expect(result.overallAssessment).toBe('No Financial Risk');
    expect(result.heuristicScore).toBe(0);
    expect(result.consequenceSteps).toHaveLength(0);
    expect(result.complaintDraft).toBeUndefined();
    expect(result.evidenceCards.every(c => c.status === 'Normal / Clear')).toBe(true);
  });

  // Test Case 3: College ID / government identity document
  it('Test Case 3: College ID / government identity document -> No Financial Risk', () => {
    const text = `Student Identity Card - Indian Institute of Technology (BHU) Varanasi
Name: Student
Roll Number: 21075042
Department: Computer Science and Engineering
Valid through: 2026`;

    const docType = classifyDocumentContentType(text, 'image', 'college_id_card.png');
    expect(docType).toBe('IDENTITY_DOCUMENT');

    const relevance = determineFinancialRelevance(docType, text);
    expect(relevance.relevance).toBe('NO');

    const result = runSangyanAnalysis(text, 'image');
    expect(result.documentContentType).toBe('IDENTITY_DOCUMENT');
    expect(result.financialRelevance).toBe('NO');
    expect(result.overallAssessment).toBe('No Financial Risk');
    expect(result.heuristicScore).toBe(0);
    expect(result.consequenceSteps).toHaveLength(0);
    expect(result.complaintDraft).toBeUndefined();
    expect(result.evidenceCards.every(c => c.status === 'Normal / Clear')).toBe(true);
  });

  // Test Case 4: Bank statement / passbook screenshot
  it('Test Case 4: Bank statement / passbook screenshot -> No Financial Risk', () => {
    const text = `State Bank of India - Account Statement
Account Number: 30987654321
Branch: Varanasi Main, IFSC: SBIN0001234
Opening Balance: ₹45,210.00
Closing Balance: ₹52,190.00
Monthly summary:
- Salary Credit: +₹65,000 via NEFT
- Grocery UPI Debit: -₹1,200
- Electricity Bill: -₹2,100`;

    const docType = classifyDocumentContentType(text, 'image', 'sbi_bank_statement.pdf');
    expect(docType).toBe('BANK_DOCUMENT');

    const relevance = determineFinancialRelevance(docType, text);
    expect(relevance.relevance).toBe('NO');

    const result = runSangyanAnalysis(text, 'image');
    expect(result.documentContentType).toBe('BANK_DOCUMENT');
    expect(result.financialRelevance).toBe('NO');
    expect(result.overallAssessment).toBe('No Financial Risk');
    expect(result.heuristicScore).toBe(0);
    expect(result.consequenceSteps).toHaveLength(0);
    expect(result.complaintDraft).toBeUndefined();
    expect(result.evidenceCards.every(c => c.status === 'Normal / Clear')).toBe(true);
  });

  // Test Case 5: Legitimate financial educational post / news article
  it('Test Case 5: Legitimate financial educational post -> Low / Educational Risk', () => {
    const text = `Investor Awareness Guide: Understanding Mutual Funds & SIP.
Systematic Investment Plans (SIP) help in rupee cost averaging and long term compounding.
Mutual fund investments are subject to market risks, read all scheme related documents carefully before investing.`;

    const docType = classifyDocumentContentType(text, 'text');
    expect(docType).toBe('INVESTMENT_CONTENT');

    const relevance = determineFinancialRelevance(docType, text);
    expect(relevance.relevance).toBe('YES');

    const result = runSangyanAnalysis(text, 'text');
    expect(result.documentContentType).toBe('INVESTMENT_CONTENT');
    expect(result.financialRelevance).toBe('YES');
    expect(result.contentClassification).toBe('Educational');
    expect(result.overallAssessment).toBe('Low');
    expect(result.heuristicScore).toBe(5);
    expect(result.consequenceSteps).toHaveLength(0);
    expect(result.complaintDraft).toBeUndefined();
  });

  // Test Case 6: Investment advertisement claiming "Guaranteed 50% return in 30 days"
  it('Test Case 6: Investment ad claiming "Guaranteed 50% return in 30 days" -> High / Critical Risk', () => {
    const text = `Double your wealth! Guaranteed 50% return in 30 days with our AI crypto & stock bot. 100% loss refund guaranteed. Hurry, only 3 slots remaining!`;

    const docType = classifyDocumentContentType(text, 'text');
    expect(docType).toBe('FINANCIAL_ADVERTISEMENT');

    const relevance = determineFinancialRelevance(docType, text);
    expect(relevance.relevance).toBe('YES');

    const result = runSangyanAnalysis(text, 'text');
    expect(result.financialRelevance).toBe('YES');
    expect(['High', 'Critical']).toContain(result.overallAssessment);
    expect(result.heuristicScore).toBeGreaterThanOrEqual(55);
    expect(result.consequenceSteps.length).toBeGreaterThan(0);
    expect(result.complaintDraft).toBeDefined();
  });

  // Test Case 7: Suspicious WhatsApp message asking user to join VIP stock group
  it('Test Case 7: WhatsApp message asking to join VIP stock group -> High / Critical Risk', () => {
    const text = `SEBI AUTHORIZED SCHEME - VIP UPPER CIRCUIT CLUB. Get 300% profit with our daily insider jackpot calls. Join our WhatsApp VIP group now before entry closes.`;

    const docType = classifyDocumentContentType(text, 'text');
    expect(docType).toBe('INVESTMENT_MESSAGE');

    const relevance = determineFinancialRelevance(docType, text);
    expect(relevance.relevance).toBe('YES');

    const result = runSangyanAnalysis(text, 'text');
    expect(result.financialRelevance).toBe('YES');
    expect(['High', 'Critical']).toContain(result.overallAssessment);
    expect(result.heuristicScore).toBeGreaterThanOrEqual(55);
    expect(result.consequenceSteps.length).toBeGreaterThan(0);
    expect(result.complaintDraft).toBeDefined();
  });

  // Test Case 8: Payment / investment request asking user to transfer funds to personal UPI
  it('Test Case 8: Payment request asking to transfer funds to personal UPI -> High / Critical Risk', () => {
    const text = `Your institutional IPO allotment for Tata Tech SME quota is confirmed. Pay ₹25,000 release fee immediately to personal UPI handle ramesh.invest@okaxis before 4 PM to release shares.`;

    const docType = classifyDocumentContentType(text, 'text');
    expect(docType).toBe('PAYMENT_TRANSACTION_CONTENT');

    const relevance = determineFinancialRelevance(docType, text);
    expect(relevance.relevance).toBe('YES');

    const result = runSangyanAnalysis(text, 'text');
    expect(result.financialRelevance).toBe('YES');
    expect(['High', 'Critical']).toContain(result.overallAssessment);
    expect(result.heuristicScore).toBeGreaterThanOrEqual(55);
    expect(result.consequenceSteps.length).toBeGreaterThan(0);
    expect(result.complaintDraft).toBeDefined();
  });

  // Test Case 9: Completely blank image
  it('Test Case 9: Completely blank image -> No Financial Risk', () => {
    const text = '[blank image - no readable text detected]';

    const docType = classifyDocumentContentType(text, 'image', 'blank.png');
    expect(docType).toBe('UNKNOWN');

    const relevance = determineFinancialRelevance(docType, text);
    expect(relevance.relevance).toBe('NO');

    const result = runSangyanAnalysis(text, 'image');
    expect(result.documentContentType).toBe('UNKNOWN');
    expect(result.financialRelevance).toBe('NO');
    expect(result.overallAssessment).toBe('No Financial Risk');
    expect(result.heuristicScore).toBe(0);
    expect(result.consequenceSteps).toHaveLength(0);
    expect(result.complaintDraft).toBeUndefined();
  });

  // Test Case 10: Random image containing text unrelated to finance (food recipe)
  it('Test Case 10: Random text unrelated to finance (food recipe) -> No Financial Risk', () => {
    const text = `Recipe for Paneer Butter Masala:
Heat 2 tbsp butter in a pan. Add cumin seeds, chopped onions, and ginger garlic paste.
Saute until golden brown. Add pureed tomatoes, chili powder, and garam masala.
Cook until oil separates. Stir in paneer cubes and fresh cream. Simmer for 5 minutes.`;

    const docType = classifyDocumentContentType(text, 'image', 'recipe_notes.jpg');
    expect(docType).toBe('NON_FINANCIAL_TEXT');

    const relevance = determineFinancialRelevance(docType, text);
    expect(relevance.relevance).toBe('NO');

    const result = runSangyanAnalysis(text, 'image');
    expect(result.documentContentType).toBe('NON_FINANCIAL_TEXT');
    expect(result.financialRelevance).toBe('NO');
    expect(result.overallAssessment).toBe('No Financial Risk');
    expect(result.heuristicScore).toBe(0);
    expect(result.consequenceSteps).toHaveLength(0);
    expect(result.complaintDraft).toBeUndefined();
    expect(result.evidenceCards.every(c => c.status === 'Normal / Clear')).toBe(true);
  });

  // Test Case 11: Casual chat greeting in Hinglish
  it('Test Case 11: Casual chat greeting in Hinglish -> No Financial Risk', () => {
    const text = 'Hi, Harsh me pallak bol rhi hun';
    const result = runSangyanAnalysis(text, 'text');
    console.log('Result for casual greeting:', {
      overallAssessment: result.overallAssessment,
      heuristicScore: result.heuristicScore,
      financialRelevance: result.financialRelevance,
      documentContentType: result.documentContentType,
      detectedPatterns: result.detectedPatterns.map(p => p.id),
      classificationRationale: result.classificationRationale
    });
    expect(result.financialRelevance).toBe('NO');
    expect(result.overallAssessment).toBe('No Financial Risk');
  });

  // Test Case 12: College chat / homework inquiry
  it('Test Case 12: College chat inquiry -> No Financial Risk', () => {
    const text = 'Good morning sir, please find attached my computer science assignment notes.';
    const result = runSangyanAnalysis(text, 'text');
    expect(result.financialRelevance).toBe('NO');
    expect(result.overallAssessment).toBe('No Financial Risk');
    expect(result.heuristicScore).toBe(0);
  });

  // Test Case 13: Normal WhatsApp chat between friends
  it('Test Case 13: Normal WhatsApp chat between friends -> No Financial Risk', () => {
    const text = 'Kaha ho bhai? Sham ko cricket khelne chalna hai kya? Kal chhutti hai.';
    const result = runSangyanAnalysis(text, 'text');
    expect(result.financialRelevance).toBe('NO');
    expect(result.overallAssessment).toBe('No Financial Risk');
    expect(result.heuristicScore).toBe(0);
  });
});
