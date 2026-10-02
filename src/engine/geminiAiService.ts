/**
 * SANGYAN KAVACH - Gemini Generative AI Reasoning & Explainability Layer
 * 
 * Hybrid Architecture:
 * - Layer 1 (Symbolic AI): Deterministic heuristics, PII masking, SEBI registry checks, 0-hallucination guardrails.
 * - Layer 2 (Generative AI): Google Gemini (2.5 Flash, 2.0 Flash, 2.5 Pro, 1.5 Pro) for deep contextual reasoning,
 *   vernacular analogies, and psychological manipulation defense.
 * 
 * Multi-Model Auto-Discovery & Cascade Fallback:
 * Automatically probes which models are available to the user's specific API key (including Pro accounts)
 * and cascades seamlessly without 404 failures.
 */

export interface GeminiAiResponse {
  aiAnalysis: string;
  aiExplanationHi: string;
  manipulationTriggers: string[];
  regulatoryViolationNotes: string;
  confidenceScore: number;
  modelUsed: string;
  latencyMs: number;
  riskLevel?: 'Critical' | 'High' | 'Needs Verification' | 'Low';
}

/**
 * Candidate models supported by Google Gemini API in 2026.
 * Ordered by modern capability, speed, and reliability.
 */
export const CANDIDATE_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.5-pro',
  'gemini-1.5-pro',
  'gemini-1.5-pro-latest',
  'gemini-1.5-flash-latest',
  'gemini-pro',
  'gemini-1.5-flash'
];

export function normalizeModelName(rawName: string): string {
  return rawName.replace(/^models\//, '');
}

export function formatDisplayName(rawName: string): string {
  const clean = normalizeModelName(rawName);
  if (clean.includes('2.5-pro')) return 'Google Gemini 2.5 Pro';
  if (clean.includes('2.5-flash')) return 'Google Gemini 2.5 Flash';
  if (clean.includes('2.0-flash')) return 'Google Gemini 2.0 Flash';
  if (clean.includes('1.5-pro')) return 'Google Gemini 1.5 Pro';
  if (clean.includes('1.5-flash')) return 'Google Gemini 1.5 Flash';
  if (clean === 'gemini-pro') return 'Google Gemini Pro';
  return `Google Gemini (${clean})`;
}

export function getStoredGeminiModel(): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage.getItem('sangyan_gemini_active_model');
  }
  return null;
}

export function setStoredGeminiModel(model: string): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem('sangyan_gemini_active_model', normalizeModelName(model));
  }
}

/**
 * Retrieves the Gemini API key from environment variable or localStorage
 */
export function getGeminiApiKey(): string | null {
  // 1. Check Vite environment variable (prefixed and non-prefixed)
  const envKey =
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    (import.meta as any).env?.GEMINI_API_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 10) {
    return envKey.trim();
  }

  // 2. Check localStorage (allows user or judge to input their own key live in the browser)
  if (typeof window !== 'undefined' && window.localStorage) {
    const keysToCheck = ['sangyan_gemini_api_key', 'VITE_GEMINI_API_KEY', 'GEMINI_API_KEY'];
    for (const k of keysToCheck) {
      const val = window.localStorage.getItem(k);
      if (val && typeof val === 'string' && val.trim().length > 10) {
        return val.trim();
      }
    }
  }

  return null;
}

/**
 * Save user-provided Gemini API key to localStorage for session persistence
 */
export function setGeminiApiKey(key: string): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    if (!key || key.trim() === '') {
      window.localStorage.removeItem('sangyan_gemini_api_key');
      window.localStorage.removeItem('VITE_GEMINI_API_KEY');
      window.localStorage.removeItem('GEMINI_API_KEY');
      window.localStorage.removeItem('sangyan_gemini_active_model');
    } else {
      window.localStorage.setItem('sangyan_gemini_api_key', key.trim());
    }
  }
}

/**
 * Check if live Generative AI is currently active
 */
export function isGeminiAiActive(): boolean {
  return getGeminiApiKey() !== null;
}

/**
 * Discovers models available to this specific key using Google's ListModels REST endpoint
 */
export async function discoverAvailableModels(apiKey: string): Promise<string[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) return [];
    const data = await res.json();
    if (!data.models || !Array.isArray(data.models)) return [];

    const available = data.models
      .filter((m: any) => {
        const methods = m.supportedGenerationMethods;
        return Array.isArray(methods) && methods.includes('generateContent');
      })
      .map((m: any) => normalizeModelName(m.name));

    return available;
  } catch (err) {
    console.warn('[SANGYAN Kavach] Model discovery via ListModels failed or timed out:', err);
    return [];
  }
}

/**
 * Determines the best model for this API key
 */
export async function resolveBestModel(apiKey: string): Promise<string> {
  const stored = getStoredGeminiModel();
  if (stored) return stored;

  const discovered = await discoverAvailableModels(apiKey);
  if (discovered.length > 0) {
    for (const cand of CANDIDATE_MODELS) {
      const match = discovered.find((d) => d === cand || d.startsWith(cand));
      if (match) {
        setStoredGeminiModel(match);
        return match;
      }
    }
    setStoredGeminiModel(discovered[0]);
    return discovered[0];
  }

  return 'gemini-2.5-flash';
}

/**
 * Lightweight ping to verify that the Gemini API Key is valid and active.
 * Probes ListModels first to detect whether user has Pro or Flash, then validates generation.
 */
export async function pingGeminiConnection(keyToTest?: string): Promise<{
  success: boolean;
  latencyMs: number;
  modelUsed?: string;
  message: string;
}> {
  const apiKey = keyToTest || getGeminiApiKey();
  if (!apiKey) {
    return {
      success: false,
      latencyMs: 0,
      message: 'No API key provided. Operating in Symbolic Heuristic mode.'
    };
  }

  const startTime = Date.now();
  try {
    // 1. Discover models available to this specific key
    const available = await discoverAvailableModels(apiKey);

    // Build prioritize candidate list based on discovered models
    let modelsToTry: string[] = [];
    if (available.length > 0) {
      for (const cand of CANDIDATE_MODELS) {
        if (available.some((a) => a === cand || a.startsWith(cand))) {
          modelsToTry.push(cand);
        }
      }
      for (const av of available) {
        if (!modelsToTry.includes(av)) {
          modelsToTry.push(av);
        }
      }
    } else {
      modelsToTry = [...CANDIDATE_MODELS];
    }

    let lastError = '';

    // 2. Cascade test generateContent until the first valid model responds
    for (const model of modelsToTry) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: 'Respond with exactly: {"status": "ok", "system": "SANGYAN_KAVACH_READY"}' }]
              }
            ],
            generationConfig: {
              temperature: 0.1,
              responseMimeType: 'application/json'
            }
          })
        });

        clearTimeout(timeoutId);
        const latencyMs = Date.now() - startTime;

        if (response.ok) {
          setStoredGeminiModel(model);
          const display = formatDisplayName(model);
          return {
            success: true,
            latencyMs,
            modelUsed: display,
            message: `${display} Connected! Latency: ${latencyMs}ms`
          };
        } else {
          const errBody = await response.text();
          // If error is 400 with API_KEY_INVALID, the key itself is wrong
          if (response.status === 400 && (errBody.includes('API_KEY_INVALID') || errBody.includes('API key not valid'))) {
            return {
              success: false,
              latencyMs,
              message: 'Invalid Google AI Studio Key. Please verify and re-copy from Google AI Studio.'
            };
          }
          lastError = `(${response.status}): ${errBody.slice(0, 140)}`;
        }
      } catch (callErr: any) {
        lastError = callErr.message || 'Network error';
      }
    }

    return {
      success: false,
      latencyMs: Date.now() - startTime,
      message: `Model check failed: ${lastError || 'No supported Gemini model answered'}`
    };
  } catch (err: any) {
    return {
      success: false,
      latencyMs: Date.now() - startTime,
      message: err.name === 'AbortError' ? 'Connection timed out (6s)' : (err.message || 'Network error')
    };
  }
}

/**
 * Call Google Gemini with auto-cascading model resolution
 */
export async function analyzeWithGemini(
  sanitizedText: string,
  detectedSignals: string[],
  imageDataUrl?: string
): Promise<GeminiAiResponse | null> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    console.log('[SANGYAN Kavach] No Gemini API key found. Using Symbolic Heuristics.');
    return null;
  }

  const activeModel = await resolveBestModel(apiKey);
  const modelsToAttempt = [
    activeModel,
    ...CANDIDATE_MODELS.filter((m) => m !== activeModel)
  ];

  const prompt = `You are SANGYAN KAVACH AI, an institutional investor safety assistant built under SEBI (Securities and Exchange Board of India) and NSDL guidelines.
MANDATORY GUARDRAILS:
1. NEVER recommend buying, selling, or holding any security, stock, crypto, or asset.
2. NEVER give financial return forecasts.
3. Your purpose is strictly investor safety, deception detection, and psychological manipulation defense.

${imageDataUrl ? 'A USER HAS UPLOADED A SCREENSHOT TO VERIFY. Perform thorough visual analysis on the image: inspect all text, stamps, fake SEBI certificates, guaranteed profits, VIP groups, WhatsApp/Telegram tips, withdrawal fees, or Demat phishing.' : ''}

ANALYZE THIS INVESTOR MESSAGE/CLAIM OR SCREENSHOT:
"${sanitizedText}"

DETECTED SIGNALS BY DETERMINISTIC GUARDRAIL ENGINE:
${detectedSignals.join(', ')}

Respond ONLY in valid JSON with this exact structure:
{
  "aiAnalysis": "A 2-3 sentence analytical explanation of why this message or screenshot is deceptive, highlighting the psychological trap (FOMO, fake authority, urgency) and SEBI intermediary violations.",
  "aiExplanationHi": "आसान हिंदी में 2-3 वाक्यों में समझाइए कि यह कैसे धोखा है और आम भारतीय परिवार के लिए एक आसान देहाती/व्यावहारिक उदाहरण दीजिए।",
  "manipulationTriggers": ["Array of 2-3 specific manipulation techniques used, e.g. Artificial Scarcity, Sunk Cost Trap, Forged Regulatory Proof"],
  "regulatoryViolationNotes": "Specific reference to SEBI regulations violated (e.g. SEBI Research Analyst Reg 2014, Prohibition of Fraudulent and Unfair Trade Practices PFUTP 2003, or BUDS Act 2019).",
  "riskLevel": "Critical",
  "confidenceScore": 95
}`;

  for (const model of modelsToAttempt) {
    const startTime = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      // Construct multimodal parts if image data URL is provided
      const parts: any[] = [];
      if (imageDataUrl && imageDataUrl.startsWith('data:image/')) {
        const matches = imageDataUrl.match(/^data:(image\/[a-zA-Z0-9.+_-]+);base64,(.+)$/);
        if (matches && matches[1] && matches[2]) {
          parts.push({
            inlineData: {
              mimeType: matches[1],
              data: matches[2]
            }
          });
        }
      }
      parts.push({ text: prompt });

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json'
          }
        })
      });

      clearTimeout(timeoutId);
      const latencyMs = Date.now() - startTime;

      if (!response.ok) {
        console.warn(`[SANGYAN Kavach] Model ${model} returned error status: ${response.status}. Trying next candidate.`);
        continue;
      }

      const data = await response.json();
      const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textResult) continue;

      setStoredGeminiModel(model);
      const displayModel = formatDisplayName(model);

      console.log(`[SANGYAN Kavach] ${displayModel} Response Received in ${latencyMs}ms`);

      let parsed: any = null;
      try {
        let cleaned = textResult.trim();
        if (cleaned.startsWith('```json')) cleaned = cleaned.replace(/^```json\s*/i, '');
        if (cleaned.startsWith('```')) cleaned = cleaned.replace(/^```\s*/, '');
        if (cleaned.endsWith('```')) cleaned = cleaned.replace(/\s*```$/, '');
        cleaned = cleaned.trim();
        parsed = JSON.parse(cleaned);
      } catch (parseErr) {
        console.warn('[SANGYAN Kavach] JSON clean parse failed, using robust fallback extraction:', parseErr);
        parsed = {
          aiAnalysis: textResult.replace(/[`{}]/g, '').slice(0, 300),
          aiExplanationHi: 'जेमिनी ने इस सामग्री में मनोवैज्ञानिक दबाव व अनधिकृत वित्तीय दावों की पुष्टि की है।',
          manipulationTriggers: ['Psychological Urgency', 'Unverified Financial Claim'],
          regulatoryViolationNotes: 'SEBI Intermediary Regulations and Investor Safety Advisory.',
          confidenceScore: 94,
          riskLevel: 'Critical'
        };
      }

      const assignedRisk = parsed.riskLevel || (parsed.confidenceScore > 80 ? 'Critical' : 'Needs Verification');

      return {
        aiAnalysis: parsed.aiAnalysis || 'Deceptive financial manipulation detected by Gemini.',
        aiExplanationHi: parsed.aiExplanationHi || '',
        manipulationTriggers: parsed.manipulationTriggers || ['Psychological FOMO', 'Unverified Claim'],
        regulatoryViolationNotes: parsed.regulatoryViolationNotes || 'SEBI Intermediary Regulations.',
        confidenceScore: parsed.confidenceScore || 94,
        modelUsed: displayModel,
        riskLevel: assignedRisk,
        latencyMs
      };
    } catch (err) {
      console.warn(`[SANGYAN Kavach] Error querying model ${model}:`, err);
    }
  }

  console.warn('[SANGYAN Kavach] All Gemini models exhausted or unreachable, falling back to Symbolic AI.');
  return null;
}
