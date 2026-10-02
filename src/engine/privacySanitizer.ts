export interface SanitizationReport {
  sanitizedText: string;
  redactedCount: {
    phoneNumbers: number;
    upiIds: number;
    bankAccounts: number;
    aadhaarPan: number;
    otpsAndPins: number;
    cardNumbers: number;
  };
  totalRedacted: number;
  hasAdversarialCharacters: boolean;
}

export function sanitizeUserInput(input: string): SanitizationReport {
  if (!input) {
    return {
      sanitizedText: '',
      redactedCount: {
        phoneNumbers: 0,
        upiIds: 0,
        bankAccounts: 0,
        aadhaarPan: 0,
        otpsAndPins: 0,
        cardNumbers: 0
      },
      totalRedacted: 0,
      hasAdversarialCharacters: false
    };
  }

  // 1. Unicode Normalization & Strip Dangerous Invisible / BiDi Characters
  let text = input.normalize('NFKC');
  const bidiOrZeroWidthRegex = /[\u200B-\u200D\uFEFF\u202A-\u202E\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;
  const hasAdversarialCharacters = bidiOrZeroWidthRegex.test(text);
  text = text.replace(bidiOrZeroWidthRegex, ' ');

  let phones = 0;
  let upis = 0;
  let bankAccs = 0;
  let idCards = 0;
  let otps = 0;
  let cards = 0;

  // 2. Redact OTPs and PINs (e.g. "OTP: 123456", "your OTP is 847291", "PIN: 1234")
  const otpRegex = /\b(?:otp(?:\s+is|\s*:)?\s*(\d{4,8})|pin(?:\s+is|\s*:)?\s*(\d{4,6})|password(?:\s+is|\s*:)?\s*([a-zA-Z0-9@#$%^&*!]{6,20}))\b/gi;
  text = text.replace(otpRegex, () => {
    otps++;
    return '[REDACTED_OTP_CREDENTIAL]';
  });

  // 3. Redact Credit / Debit Card Numbers (15-16 digits, with spaces or hyphens)
  const cardRegex = /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|[0-9]{4}[-\s][0-9]{4}[-\s][0-9]{4}[-\s][0-9]{4})\b/g;
  text = text.replace(cardRegex, () => {
    cards++;
    return '[REDACTED_CARD_NUMBER]';
  });

  // 4. Redact UPI IDs (e.g. user@okaxis, xyz@paytm, name@sbi)
  const upiRegex = /[a-zA-Z0-9.\-_]{2,256}@(okaxis|paytm|okhdfcbank|oksbi|icici|ybl|upi|apl|axl|ibl|barodampay|federal)/gi;
  text = text.replace(upiRegex, () => {
    upis++;
    return '[REDACTED_UPI_HANDLE]';
  });

  // 5. Redact 10-digit Indian mobile numbers (+91-XXXXX or 9XXXXXXXXX)
  const phoneRegex = /(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}\b/g;
  text = text.replace(phoneRegex, () => {
    phones++;
    return '[REDACTED_MOBILE_NUMBER]';
  });

  // 6. Redact Aadhaar (12 digits)
  const aadhaarRegex = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g;
  text = text.replace(aadhaarRegex, () => {
    idCards++;
    return '[REDACTED_AADHAAR_NUMBER]';
  });

  // 7. Redact Indian PAN Card pattern ([A-Z]{5}[0-9]{4}[A-Z]{1})
  const panRegex = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g;
  text = text.replace(panRegex, () => {
    idCards++;
    return '[REDACTED_PAN_NUMBER]';
  });

  // 8. Redact long bank account numbers (11 to 18 consecutive digits)
  const bankAccRegex = /\b\d{11,18}\b/g;
  text = text.replace(bankAccRegex, () => {
    bankAccs++;
    return '[REDACTED_BANK_ACCOUNT]';
  });

  return {
    sanitizedText: text,
    redactedCount: {
      phoneNumbers: phones,
      upiIds: upis,
      bankAccounts: bankAccs,
      aadhaarPan: idCards,
      otpsAndPins: otps,
      cardNumbers: cards
    },
    totalRedacted: phones + upis + bankAccs + idCards + otps + cards,
    hasAdversarialCharacters
  };
}
