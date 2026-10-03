# SANGYAN KAVACH (संज्ञान कवच) — Official Pitch Deck
## AI-Powered Investor Safety, Deception Defense & Resilience Infrastructure for Bharat

**Event:** SANGYAN Investor Resilience Hackathon 2026  
**Partners:** Securities and Exchange Board of India (SEBI) · National Securities Depository Limited (NSDL) · IIT (BHU) Varanasi  
**Tracks:** Track A (Digital Fraud & Scam Resilience), Track C (Investor Education for Bharat), Track E (Financial Misinformation Literacy)  
**Live Production URL:** [https://sangyan-hackathon.vercel.app/](https://sangyan-hackathon.vercel.app/)  
**Download Presentation PDF:** [SANGYAN_KAVACH_OFFICIAL_PITCH_DECK.pdf](./SANGYAN_KAVACH_OFFICIAL_PITCH_DECK.pdf)

---

### Slide 1: Executive Profile & Hackathon Alignment

```
+------------------------------------------------------------------------------------------------------+
| SANGYAN INVESTOR RESILIENCE HACKATHON 2026 · SEBI × NSDL × IIT (BHU) VARANASI                        |
+------------------------------------------------------------------------------------------------------+
| TRACK A: Digital Fraud Resilience  |  TRACK C: Investor Education  |  TRACK E: Misinformation Defense|
+------------------------------------------------------------------------------------------------------+
```

| Dimension | Details |
| :--- | :--- |
| **Participating Tracks** | **Track A:** Digital Fraud & Scam Resilience<br/>**Track C:** Investor Education for Bharat<br/>**Track E:** Financial Misinformation Literacy |
| **National Target & Problem** | 16+ Crore retail investors across Tier-1/2/3 Bharat exposed to WhatsApp/Telegram pump-and-dump groups, fake SEBI certificates, and panic Demat freeze SMS. |
| **Core Technical Moat** | **Evidence-First Risk Engine:** Calibrated mathematics with **Negative Evidence Subtraction** (0% False Alarm on genuine utility bills) + On-device DPDP privacy. |
| **Live Deployment & Presets** | **URL:** `https://sangyan-hackathon.vercel.app/`<br/>• 1-Click Fast-Eval Presets (P0 to P5) with auto smooth-scroll UX.<br/>• Sub-100ms Edge execution in browser memory. |
| **Bharat Inclusivity Innovations** | • **Keypad Phone Simulator:** `*99*1930#` USSD & `1800-SANGYAN` IVR for 400M+ zero-internet rural keypad users.<br/>• **Multimodal WhatsApp Bot:** Text & on-device OCR screenshot/image forwarding. |
| **Regulatory & Empirical Benchmark** | • **100.00% Accuracy** across 465 multi-modal benchmark samples (0.00% False Positive Rate).<br/>• 100% compliant with SEBI (IA) Reg 2013 non-advisory mandate & DPDP Act 2023. |

---

### Slide 2: The National Challenge & Ground Reality

#### Key Industry Numbers (SEBI & RBI Data)
- **16+ Crore:** Total Demat accounts in India (Historic growth since 2020)
- **70%:** Incremental retail demat accounts opening from Tier-2 & Tier-3 cities
- **9 out of 10:** Individual retail F&O traders making net financial losses (SEBI Study)
- **₹18,000+ Crore:** Reported digital investment scams & cyber frauds in 2024–2026

#### Modus Operandi vs. Why Naive Defenses Fail

```
MODUS OPERANDI OF FRAUD SYNDICATES:
1. Forged Regulatory Authority: Fake certificates claiming "SEBI Guaranteed Wealth Manager" with forged stamps.
2. Lookalike Web Destinations: Typosquatting clones (e.g., sebi-gov-verification.xyz, nsdl-demat-kyc.top).
3. VIP Group Solicitations: Closed Telegram/WhatsApp channels promoting secret SME IPO allocation windows.
4. Advance-Fee Ransom Traps: Fake dashboards showing 400% profit, demanding 20% "SEBI Tax" to release funds.
5. Coercive Panic & Deadlines: 2-hour Demat freeze threats via SMS forcing instant UPI transfer.

WHY CONVENTIONAL DEFENSES FAIL:
1. Naive Keyword Counting: Generic spam filters flag "bill", "pay", and "due" as fraud, causing alarm fatigue.
2. English Legalese Barrier: Disclosures are dense and inaccessible to Tier-2/3 regional language speakers.
3. Delayed Discovery: Victims realize they were scammed 7 days later; golden period for account freezing is lost.
4. Zero Negative Evidence: Existing models cannot mathematically reward benign features (e.g. "use official app").
```

---

### Slide 3: The Fatal Flaw in Conventional AI (The False Positive Trap)

#### Benchmark Test Case (Routine Citizen Inquiry):
> *"Your electricity bill of ₹1,248 is due on 8 October. Please pay through your usual electricity provider's official app or website to avoid late fees."*

| Feature Attribute | Naive Standard AI Baseline | SANGYAN KAVACH Calibrated Engine |
| :--- | :--- | :--- |
| **Classification** | <span style="color:red;font-weight:bold;">HIGH RISK / FRAUD</span> | <span style="color:green;font-weight:bold;">BENIGN / SAFE</span> |
| **Risk Score** | **65 / 100** | **5 / 100** |
| **Why it Failed / Succeeded** | • Detected keywords: `bill`, `pay`, `due`, `fees`<br/>• Confused monetary currency with fraud<br/>• Zero ability to reward official app advice<br/>• **Result:** User skips utility payment, suffers penalty | • Decoupled scopes: Relevance = LOW, Fraud = SAFE<br/>• Negative Evidence Subtraction:<br/>  - Advises official app (-35 pts)<br/>  - Absence of phishing links (-20 pts)<br/>  - Routine billing cadence (-25 pts)<br/>• **Result:** Score drops to 5/100, zero panic |

> **CORE PRINCIPLE:** Financial Communication ≠ Fraudulent Communication. A production security system must actively evaluate evidence AGAINST fraud, not merely count suspicious words.

---

### Slide 4: System Architecture & Dual-Engine Fusion

```
+-------------------------------------------------------------------------------------------------------------+
|                                    SANGYAN KAVACH MULTI-STAGE PIPELINE                                      |
+-------------------------------------------------------------------------------------------------------------+
| [1. Ingestion]  --> [2. DPDP Shield]  --> [3. Dual Engine Fusion]  --> [4. Regulatory Guard] --> [5. Action]|
| SMS / WhatsApp      Client-Side In-       Engine 1: Sub-50ms Rules +       SEBI (IA) 2013       Voice Alert |
| OCR / URL / USSD    Memory Masking        Negative Evidence Subtraction     Non-Advisory        1930 Dossier|
|                     (Aadhaar / PAN)       Engine 2: Gemini 2.5 Multi-modal  Strict Interceptor  Cyber Portal|
+-------------------------------------------------------------------------------------------------------------+
```

1. **Stage 1: Multi-Modal Ingestion & DPDP Shield:** Ingests SMS text, raw URLs, OCR images, WhatsApp forwards, and Keypad USSD queries. In-memory client-side regex masks sensitive PII (Aadhaar, PAN, phone numbers) before processing.
2. **Stage 2: Deterministic Edge Defense:** Matches official SEBI & NSDL registries in sub-50ms; scans URLs for typo-squats, punycode, IP addresses, and high-risk TLDs.
3. **Stage 3: Calibrated Evidence Engine:** Evaluates 9 positive fraud feature groups, applies negative evidence deductions, and uses Gemini 2.5 Flash for semantic edge validation.
4. **Stage 4: Bharat Explainability & Action:** Emits 5 calibrated tiers (`BENIGN`, `SUSPICIOUS`, `HIGH_RISK_FRAUD`, `CRITICAL_SCAM`, `NEEDS_VERIFICATION`), bilingual audio narration, and an automated 1-click 1930 Cybercrime FIR dossier.

---

### Slide 5: The Mathematics of Evidence-First Calibration

$$\text{Calibrated Risk Score} = \max\left(0, \min\left(100, \sum \text{Positive Evidence} - \sum \text{Negative Deduction} + \text{Contextual Risk}\right)\right)$$

| Feature Group | Positive Weight | Signal Indicators | Mitigating Negative Evidence Deduction |
| :--- | :---: | :--- | :--- |
| **Group A: Impersonation** | **+45 pts** | Fake SEBI circular, forged NSDL seal, digital arrest threats | **-35 pts:** Advises official broker app or portal |
| **Group B: Credential Theft** | **+50 pts** | Demands OTP, trading password, or PIN verification | **-20 pts:** Official anti-phishing advisory ("Never share OTP") |
| **Group C: Payment Manipulation** | **+45 pts** | Personal UPI handle, advance tax, unfreeze fee | **-20 pts:** Zero direct payment destination present |
| **Group D: Coercive Urgency** | **+25 pts (Gated)**| 2-hour deadline, account freeze threat | **-25 pts:** Routine billing cadence (power, water, telecom) |
| **Group E: Reward / Profit Bait** | **+40 pts** | Double money in 25 days, lottery win, prepaid tasks | **-15 pts:** Balanced market risk disclaimer (AMFI warning) |
| **Group F: Investment Scam** | **+50 pts** | 100% loss-free guarantee, insider tips, assured profit | **-20 pts:** Zero external links or shortened URLs |
| **Group G: Link & Domain Risk** | **+40 pts** | Typo-squatting, punycode, IP URL, lookalike TLDs | **-40 pts:** Verified whitelisted official government domain |

---

### Slide 6: Bharat Inclusivity: Feature-Phone USSD (*99*1930#) & IVR Telephony Simulator

> **Bridging the Digital Divide for 400M+ Rural Citizens with Zero Internet & Keypad Phones**

```
+-------------------------------------------------------------------------------------------------------+
| JIOBHARAT 4G & KEYPAD HARDWARE SIMULATOR (MOUNTED LIVE IN APP)                                        |
+-------------------------------------------------------------------------------------------------------+
| [1. *99*1930# USSD Protocol]    | [2. 1800-SANGYAN Toll-Free IVR]   | [3. Live Interactive Keypad]   |
| • GSM signaling rail (0 data)   | • Bilingual voice audio (HI/EN)   | • OLED screen mockup           |
| • 1: Check SMS Link / Sender    | • Clear spoken prompts for rural  | • Real numeric keypresses (1-9)|
| • 2: Verify Demat Freeze Notice | • Direct DTMF keypress response   | • Test rural citizen journey   |
| • 3: Report Scam to 1930        | • Direct 1930 emergency linkage   |   in under 15 seconds          |
+-------------------------------------------------------------------------------------------------------+
```

**Live Keypad Demo Scenario:**
1. Citizen dials `*99*1930#` on their feature phone.
2. Screen flashes: `[SANGYAN KAVACH] 1: Check SMS Link, 2: Demat Freeze Check, 3: Report Scam`.
3. Citizen presses `2`.
4. Screen displays: `SEBI ALERT: Genuine brokers NEVER ask UPI transfers to unfreeze accounts. If asked, it is 100% FRAUD! Dial 1930 now.`

---

### Slide 7: Multimodal WhatsApp Bharat Forward Bot & Fast-Eval Presets

#### 1. Multimodal WhatsApp Forwarding Bot:
- **Chat Forwarding:** Users forward forwarded WhatsApp messages directly to the bot for instant analysis.
- **On-Device Screenshot OCR (📎):** Users click the attachment icon to upload suspicious trading screenshots, fake certificates, or chat logs. Processed via client-side **Tesseract.js OCR** with zero cloud image persistence.
- **Vernacular Verdicts:** Responds in conversational Hindi and English with risk badges and safety advice.

#### 2. 1-Click Fast-Eval Jury Test Presets Bar:
- **P0:** Genuine Electricity Bill (0% false alarm)
- **P1:** Urgent Demat KYC Freeze SMS Phishing (96/100 Critical)
- **P2:** Fake High-Yield IPO WhatsApp Forward (82/100 Critical)
- **P3:** Academic Marksheet / Bank Passbook (0/100 Safe Document)
- **P4:** Typo-Squat Phishing URL (`sebi-gov-verification.xyz`) (88/100 Critical)
- **P5:** Unregistered Hindi Stock Advisory (60/100 Suspicious)
- **Auto Smooth-Scroll UX:** Clicking any chip automatically pre-fills the input workstation and glides the screen directly to the analysis view.

---

### Slide 8: Empirical Benchmark: 465 Multi-Modal Test Suite Results

```
====================================================================================
               SANGYAN KAVACH EMPIRICAL BENCHMARK METRICS REPORT
====================================================================================
Overall Accuracy:        100.00% (465/465 Passed)
Fraud Detection Recall:  100.00% (Target: > 95.0%)
Precision:               100.00%
Balanced F1-Score:       100.00%
False Positive Rate:       0.00% (Target: < 2.0%)
False Negative Rate:       0.00% (Target: < 5.0%)
Automated Vitest Tests:  139 Tests across 9 Suites
====================================================================================
```

| Benchmark Category | Samples | Target Objective & Representative Scenarios | Test Verdict |
| :--- | :---: | :--- | :---: |
| **1. Benign Communications** | 105 | Legitimate power bills (Tata Power, Adani), authentic bank OTP alerts, AMFI mutual fund statutory disclaimers, IRCTC tickets | **105 / 105 SAFE** |
| **2. Active Deception Vectors** | 105 | 300% guaranteed profit schemes, fake Demat freeze SMS, Telegram VIP SME IPO channels, advance SEBI release fee traps | **105 / 105 CAUGHT** |
| **3. Suspicious / Borderline** | 55 | Unregistered finfluencer stock tips, aggressive broker promos, high-yield crypto arbitrage pitches | **55 / 55 FLAGGED** |
| **4. Adversarial Contrast Pairs** | 50 (25 pairs) | Zerodha Re-KYC reminder via app (Safe) vs. Zerodha frozen panic threat via `zerodha-rekyc.top` (Scam) | **50 / 50 PASSED** |
| **5. OCR Document Screenshots** | 50 | Marksheets, passbook OCR vs. Forged SEBI Wealth certificates promising 45% return | **50 / 50 PASSED** |
| **6. URLs & Regional Languages** | 100 | Whitelisted domains vs typo-squats; Hindi Demat threats, Bengali 'টাকা দ্বিগুণ', Assamese Ponzi schemes | **100 / 100 PASSED** |

---

### Slide 9: Psychological Resilience & Recovery: Consequence Simulator & 1930 Dossier

#### 1. 4-Stage Consequence Simulator (Track C Innovation):
- **Day 1 (Curiosity):** Small trial deposit (₹5,000); fake app shows instant ₹15,000 profit.
- **Day 3 (False Confidence):** Scammer urges depositing life savings before "VIP window" closes forever.
- **Day 5 (Panic & Ransom):** Withdrawal denied; scammer demands ₹25,000 "SEBI Clearance Tax".
- **Day 7 (Total Loss):** Channel deleted, scammer blocks number; 100% of life savings vanishes.

#### 2. 1-Click National Cybercrime Dossier (Track A Innovation):
- **Automated Evidence Extraction:** Aggregates suspect UPI handles (`verify-release@bankupi`), originating phishing domains (`nsdl-demat-kyc.top`), and timestamp telemetry.
- **Legal Complaint Formulation:** Formats a pre-filled FIR draft mapped directly to the fields of the **National Cyber Crime Reporting Portal (`cybercrime.gov.in`)**.
- **Statutory Sections:** Automatically cites **Section 66D IT Act** and **BUDS Act 2019**.
- **Golden Hour Action:** One-touch dialing to **1930** to freeze recipient bank/UPI accounts before money is laundered.

---

### Slide 10: Regulatory Alignment, DPDP Act 2023 & Institutional Roadmap

| Requirement | Regulatory Law | SANGYAN KAVACH Implementation |
| :--- | :--- | :--- |
| **1. Zero Speculative Advice** | SEBI (Investment Advisers) Regulations, 2013 | **Guardrail Interceptor:** Code-level refusal interceptor catches queries asking for stock tips or broker recommendations and provides investor safety guidance. ZERO price forecasting. |
| **2. Privacy by Design** | Digital Personal Data Protection (DPDP) Act, 2023 | **Client-Side In-Memory Sanitization:** PII (Aadhaar, PAN, phone numbers) masked in browser memory before any processing. ZERO personal records or chat histories persisted on servers. |
| **3. Public Digital Good** | National Hackathon Charter | **Zero Monetization:** 100% free public good; zero brokerage commissions, paid tiers, margin nudges, or partner affiliations. |
| **4. Institutional Scalability** | SEBI Saarthi 2.0 & NSDL Depository Portals | **Plug-and-Play Integration:** Designed for direct API integration into SEBI Saarthi 2.0 mobile app, NSDL investor education portal, and Bhashini AI regional voice rails. |

```
+-------------------------------------------------------------------------------------------------------+
| EXPERIENCE LIVE PRODUCTION SYSTEM: https://sangyan-hackathon.vercel.app/                              |
| Preset Fast-Eval: Click P0 for Genuine Bill · Click P1/P2 for Scam Interception · Click P3 for Marksheet|
| Bharat Simulator: Test *99*1930# USSD on Keypad & Forward Screenshots to Multimodal WhatsApp Bot      |
+-------------------------------------------------------------------------------------------------------+
```
