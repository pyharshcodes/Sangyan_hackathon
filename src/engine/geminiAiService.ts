/**
 * SANGYAN KAVACH - Gemini Generative AI Reasoning & Explainability Layer
 * 
 * Hybrid Architecture:
 * - Layer 1 (Symbolic AI): Deterministic heuristics, PII masking, SEBI registry checks, 0-hallucination guardrails.
 * - Layer 2 (Generative AI): Google Gemini 1.5/2.0 Flash for deep contextual reasoning, vernacular analogies,
 *   and nuanced manipulation analysis.
 * 
 * Seamless Fallback:
 * If no API key is configured or network is offline, the system automatically falls back
 * to the deterministic engine without breaking.
 */

export interface GeminiAiResponse {
  aiAnalysis: string;
  aiExplanationHi: string;
  manipulationTriggers: string[];
  regulatoryViolationNotes: string;
  confidenceScore: number;
  modelUsed: string;
  latencyMs: number;
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Retrieves the Gemini API key from environment variable or localStorage
 */
export function getGeminiApiKey(): string | null {
  // 1. Check Vite environment variable
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 10) {
    return envKey.trim();
  }

  // 2. Check localStorage (allows user or judge to input their own key live in the browser)
  if (typeof window !== 'undefined' && window.localStorage) {
    const localKey = window.localStorage.getItem('sangyan_gemini_api_key');
    if (localKey && localKey.trim().length > 10) {
      return localKey.trim();
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
 * Lightweight ping to verify that the Gemini API Key is valid and active
 */
export async function pingGeminiConnection(keyToTest?: string): Promise<{
  success: boolean;
  latencyMs: number;
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
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

    if (!response.ok) {
      const errBody = await response.text();
      return {
        success: false,
        latencyMs,
        message: `API Error (${response.status}): ${errBody.slice(0, 120)}`
      };
    }

    return {
      success: true,
      latencyMs,
      message: `Gemini 1.5 Flash Connected! Latency: ${latencyMs}ms`
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
 * Call Gemini 1.5 Flash for deep contextual reasoning
 */
export async function analyzeWithGemini(
  sanitizedText: string,
  detectedSignals: string[]
): Promise<GeminiAiResponse | null> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  const prompt = `You are SANGYAN KAVACH AI, an institutional investor safety assistant built under SEBI (Securities and Exchange Board of India) and NSDL guidelines.
MANDATORY GUARDRAILS:
1. NEVER recommend buying, selling, or holding any security, stock, crypto, or asset.
2. NEVER give financial return forecasts.
3. Your purpose is strictly investor safety, deception detection, and psychological manipulation defense.

ANALYZE THIS INVESTOR MESSAGE/CLAIM:
"${sanitizedText}"

DETECTED SIGNALS BY DETERMINISTIC GUARDRAIL ENGINE:
${detectedSignals.join(', ')}

Respond ONLY in valid JSON with this exact structure:
{
  "aiAnalysis": "A 2-3 sentence analytical explanation of why this message is deceptive, highlighting the psychological trap (FOMO, fake authority, urgency) and SEBI intermediary violations.",
  "aiExplanationHi": "आसान हिंदी में 2-3 वाक्यों में समझाइए कि यह कैसे धोखा है और आम भारतीय परिवार के लिए एक आसान देहाती/व्यावहारिक उदाहरण दीजिए।",
  "manipulationTriggers": ["Array of 2-3 specific manipulation techniques used, e.g. Artificial Scarcity, Sunk Cost Trap, Forged Regulatory Proof"],
  "regulatoryViolationNotes": "Specific reference to SEBI regulations violated (e.g. SEBI Research Analyst Reg 2014, Prohibition of Fraudulent and Unfair Trade Practices PFUTP 2003, or BUDS Act 2019).",
  "confidenceScore": 95
}`;

  const startTime = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
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

    if (!response.ok) {
      console.warn('Gemini API call returned non-OK status:', response.status);
      return null;
    }

    const data = await response.json();
    const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResult) return null;

    const parsed = JSON.parse(textResult);
    return {
      aiAnalysis: parsed.aiAnalysis || '',
      aiExplanationHi: parsed.aiExplanationHi || '',
      manipulationTriggers: parsed.manipulationTriggers || [],
      regulatoryViolationNotes: parsed.regulatoryViolationNotes || '',
      confidenceScore: parsed.confidenceScore || 90,
      modelUsed: 'Google Gemini 1.5 Flash',
      latencyMs
    };
  } catch (err) {
    console.warn('Gemini analysis skipped or failed, using deterministic symbolic engine:', err);
    return null;
  }
}
