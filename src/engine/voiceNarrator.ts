import { SupportedLanguage } from '../types';

export class VoiceNarrator {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static cachedVoices: SpeechSynthesisVoice[] = [];

  static {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        try {
          VoiceNarrator.cachedVoices = window.speechSynthesis.getVoices();
        } catch (e) {
          // ignore
        }
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  public static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public static speak(
    text: string,
    lang: SupportedLanguage = 'en',
    onEnd?: () => void,
    fallbackTextHi?: string
  ): boolean {
    if (!this.synth) return false;

    // Cancel any ongoing speech
    this.stop();

    // 1. Refresh available voices on this machine
    let voices = this.synth.getVoices();
    if (!voices || voices.length === 0) {
      voices = this.cachedVoices;
    }

    // 2. Find best matching voice for the target language
    let matchedVoice: SpeechSynthesisVoice | undefined;
    let bcpCode = 'en-IN';
    let hasNativeVoice = false;

    if (lang === 'hi') {
      matchedVoice = voices.find(v => {
        const c = v.lang.toLowerCase();
        const n = v.name.toLowerCase();
        return c.startsWith('hi') || n.includes('hindi') || n.includes('swara') || n.includes('madhur');
      });
      if (matchedVoice) {
        bcpCode = 'hi-IN';
        hasNativeVoice = true;
      }
    } else if (lang === 'bn') {
      matchedVoice = voices.find(v => {
        const c = v.lang.toLowerCase();
        const n = v.name.toLowerCase();
        return c.startsWith('bn') || n.includes('bengali') || n.includes('bangla') || n.includes('tapan');
      });
      if (matchedVoice) {
        bcpCode = matchedVoice.lang;
        hasNativeVoice = true;
      }
    } else if (lang === 'as') {
      matchedVoice = voices.find(v => {
        const c = v.lang.toLowerCase();
        const n = v.name.toLowerCase();
        return c.startsWith('as') || n.includes('assamese');
      });
      if (matchedVoice) {
        bcpCode = matchedVoice.lang;
        hasNativeVoice = true;
      }
    }

    // 3. CRITICAL BHARAT VOICE FALLBACK:
    // Windows/Linux desktop browsers rarely have native Bengali or Assamese TTS voice packs installed by default.
    // If the exact voice is missing, fallback to Indian Hindi (hi-IN) or Indian English (en-IN).
    let textToSpeak = text;
    if (!hasNativeVoice) {
      matchedVoice = voices.find(v => {
        const c = v.lang.toLowerCase();
        const n = v.name.toLowerCase();
        return c.startsWith('hi') || n.includes('hindi') || n.includes('swara');
      }) || voices.find(v => {
        const c = v.lang.toLowerCase();
        const n = v.name.toLowerCase();
        return c.includes('en-in') || n.includes('india') || n.includes('heera') || n.includes('ravi');
      }) || voices.find(v => v.lang.toLowerCase().startsWith('en')) || voices[0];

      if (matchedVoice) {
        bcpCode = matchedVoice.lang;
        // If falling back from Bengali/Assamese to a Hindi voice, speak the Hindi fallback text so voice engine articulates words instead of failing on unsupported Unicode
        if ((lang === 'bn' || lang === 'as') && fallbackTextHi) {
          textToSpeak = fallbackTextHi;
        }
      }
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = bcpCode;
    utterance.rate = 0.92; // Calm, respectful pacing for Bharat investors
    utterance.pitch = 1.0;

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('[SANGYAN Kavach Voice] Speech utterance error or completed:', e);
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    try {
      this.synth.speak(utterance);
      return true;
    } catch (err) {
      console.warn('[SANGYAN Kavach Voice] Speech playback error:', err);
      if (onEnd) onEnd();
      return false;
    }
  }

  public static stop(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // ignore
      }
      this.currentUtterance = null;
    }
  }

  public static isSpeaking(): boolean {
    return !!this.synth && this.synth.speaking;
  }
}
