import { SupportedLanguage } from '../types';

export class VoiceNarrator {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  public static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public static speak(text: string, lang: SupportedLanguage = 'en', onEnd?: () => void): boolean {
    if (!this.synth) return false;

    // Cancel ongoing speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map language code to BCP 47
    let bcpCode = 'en-IN';
    if (lang === 'hi') bcpCode = 'hi-IN';
    else if (lang === 'bn') bcpCode = 'bn-IN';
    else if (lang === 'as') bcpCode = 'as-IN';

    utterance.lang = bcpCode;
    utterance.rate = 0.95; // Calm cadence for Bharat retail investors
    utterance.pitch = 1.0;

    // Pick best matching voice
    const voices = this.synth.getVoices();
    let matchedVoice = voices.find(v => {
      const code = v.lang.toLowerCase();
      if (lang === 'hi') return code.includes('hi') || v.name.toLowerCase().includes('hindi');
      if (lang === 'bn') return code.includes('bn') || code.includes('ben') || v.name.toLowerCase().includes('bengali');
      if (lang === 'as') return code.includes('as') || code.includes('asm') || code.includes('bn') || v.name.toLowerCase().includes('assamese');
      return code.includes('en-in') || code.includes('en') || v.name.toLowerCase().includes('india');
    });

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    return true;
  }

  public static stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public static isSpeaking(): boolean {
    return !!this.synth && this.synth.speaking;
  }
}
