import { VerificationItem } from '../types';
import { AUTHENTIC_MARKET_ENTITIES, SEBI_REGISTRATION_PREFIXES } from '../data/sebiEntities';

export function verifySebiRegistration(regId: string): VerificationItem {
  const cleaned = regId.trim().toUpperCase();

  // 1. Check known authentic entity match
  const matchedEntity = AUTHENTIC_MARKET_ENTITIES.find(e =>
    e.sebiRegPrefix.toUpperCase() === cleaned
  );

  if (matchedEntity) {
    return {
      subject: `Registration ID ${cleaned}`,
      claim: `Purported license belonging to ${matchedEntity.name}`,
      status: 'Verified Official',
      details: `Matches official SEBI database record for ${matchedEntity.name} (${matchedEntity.type}).`,
      sourceReference: 'SEBI Intermediary Database / SEBI Portal'
    };
  }

  // 2. Format syntax evaluation
  // SEBI format typically: 3 letters prefix (e.g. INA, INH, INZ, INP) + 8-9 digits
  const regPattern = /^(INA|INH|INZ|INP|INM|IN-DP|INR|INF)\d{7,10}$/i;
  const knownPrefix = SEBI_REGISTRATION_PREFIXES.find(p => cleaned.startsWith(p.prefix));

  if (!knownPrefix) {
    return {
      subject: `Registration ID ${cleaned}`,
      claim: 'Purported SEBI registration claim',
      status: 'Unverified / Discrepancy',
      details: `The identifier does not follow standard SEBI registration syntax (expected prefixes like INA, INH, INZ). Could not independently verify this information against SEBI intermediary master registries.`,
      sourceReference: 'SEBI Intermediary Categorization Guidelines'
    };
  }

  // 3. Known scam or heuristic mismatch (e.g. repeated numbers or fake series)
  if (/(\d)\1{4,}/.test(cleaned) || cleaned.includes('998877') || cleaned.includes('999999')) {
    return {
      subject: `Registration ID ${cleaned}`,
      claim: `Claimed ${knownPrefix.description}`,
      status: 'Unverified / Discrepancy',
      details: `Could not independently verify this registration (${cleaned}) against active SEBI Registered Investment Advisers/Research Analysts registries. Sequential test/filler pattern detected. High likelihood of unauthorized impersonation.`,
      sourceReference: 'SEBI Public Alert List & Intermediary Registry'
    };
  }

  // Standard case when registration is syntactically plausible but not present in our verified local cache
  return {
    subject: `Registration ID ${cleaned}`,
    claim: `Claimed ${knownPrefix.description}`,
    status: 'Could Not Verify',
    details: `Could not independently verify this registration ID in the local verified registry snapshot. Please cross-check directly on SEBI SCORES or sebi.gov.in before trusting any advice.`,
    sourceReference: 'SEBI Official Portal (sebi.gov.in)'
  };
}

export function verifyEntityName(name: string): VerificationItem {
  const normalized = name.toLowerCase().trim();

  // Check known authentic entity with smart normalization and alias matching
  const matched = AUTHENTIC_MARKET_ENTITIES.find(e => {
    const eLower = e.name.toLowerCase();
    if (normalized.includes(eLower) || eLower.includes(normalized)) return true;

    // Check key entity brand tokens (e.g. "motilal oswal", "geojit", "paytm money", "axis mutual", "uti mutual", "mirae asset")
    const brandTokens = [
      'motilal oswal', 'geojit', 'paytm money', 'dhan', 'fyers', 'iifl',
      'axis mutual', 'uti mutual', 'mirae asset', 'dsp mutual', 'tata mutual',
      'aditya birla', 'canara robeco', 'edelweiss', 'nippon india', 'hdfc mutual',
      'sbi mutual', 'icici prudential', 'zerodha', 'groww', 'angel one', 'upstox', 'sharekhan'
    ];
    for (const token of brandTokens) {
      if (normalized.includes(token) && eLower.includes(token)) return true;
    }
    return false;
  });

  if (matched) {
    return {
      subject: `Entity Name: ${name}`,
      claim: `Representing ${matched.name}`,
      status: 'Verified Official',
      details: `Entity is a recognized Indian regulated financial institution (${matched.type}). Verified against SEBI & Exchange Intermediary Directory. Confirm communication originated from official channel (${matched.officialDomains.join(', ')}).`,
      sourceReference: 'SEBI & Exchange Member Directory (Active Registry)'
    };
  }

  // If claimed entity sounds like a high-profile institution or regulator
  if (normalized.includes('sebi') || normalized.includes('nsdl') || normalized.includes('reserve bank') || normalized.includes('rbi')) {
    return {
      subject: `Entity Name: ${name}`,
      claim: 'Claimed official regulatory affiliation',
      status: 'Unverified / Discrepancy',
      details: `SEBI and NSDL are market infrastructure and regulatory institutions. They NEVER provide stock tips, manage private trading accounts, or guarantee investment profits for individuals.`,
      sourceReference: 'SEBI Advisory on Impersonation of Regulators'
    };
  }

  return {
    subject: `Entity: ${name}`,
    claim: 'Financial advisor / investment firm claim',
    status: 'Could Not Verify',
    details: `Could not independently verify this entity against official market registries. Independent verification is strongly advised before transacting.`,
    sourceReference: 'Independent Public Registry'
  };
}
