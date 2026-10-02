export interface PromptInjectionCheckResult {
  hasInjectionAttempt: boolean;
  patternsDetected: string[];
  sanitizedForLlm: string;
}

const INJECTION_PATTERNS = [
  { name: 'Ignore previous instructions', regex: /ignore\s+(?:all\s+)?previous\s+(?:instructions|prompts|directions)/gi },
  { name: 'System override', regex: /system\s*(?:override|prompt|directive|message):\s*/gi },
  { name: 'Jailbreak / DAN mode', regex: /(?:you\s+are\s+now\s+(?:in\s+)?dan\s+mode|jailbreak|developer\s+mode\s+enabled)/gi },
  { name: 'Role impersonation attack', regex: /(?:pretend\s+to\s+be|act\s+as|roleplay\s+as)\s+(?:an?\s+)?(?:investment\s+advisor|broker|stock\s+recommender)/gi },
  { name: 'Guardrail bypass command', regex: /(?:bypass|disable|turn\s+off|disregard)\s+(?:guardrails?|safety\s+filters?|sebi\s+rules?)/gi },
  { name: 'Forced output coercion', regex: /(?:always\s+output|say\s+this\s+is\s+100%\s+safe|classify\s+as\s+verified)/gi }
];

export function inspectAndNeutralizePromptInjection(input: string): PromptInjectionCheckResult {
  if (!input) {
    return { hasInjectionAttempt: false, patternsDetected: [], sanitizedForLlm: '' };
  }

  const detected: string[] = [];
  let sanitized = input;

  for (const { name, regex } of INJECTION_PATTERNS) {
    if (regex.test(sanitized)) {
      detected.push(name);
      // Neutralize the injection directive so LLM or parser treats it as inert user text
      sanitized = sanitized.replace(regex, `[NEUTRALIZED_ADVERSARIAL_INSTRUCTION: ${name}] `);
    }
  }

  return {
    hasInjectionAttempt: detected.length > 0,
    patternsDetected: detected,
    sanitizedForLlm: sanitized
  };
}
