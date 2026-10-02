export interface UrlValidationResult {
  isValid: boolean;
  sanitizedUrl?: string;
  hostname?: string;
  error?: string;
  isSsrfRisk: boolean;
}

export function validateSafeUrl(rawUrl: string): UrlValidationResult {
  const trimmed = rawUrl.trim();

  // 1. Check for malicious non-HTTP protocols
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('file:') ||
    lower.startsWith('ftp:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('about:')
  ) {
    return {
      isValid: false,
      isSsrfRisk: true,
      error: 'Dangerous URI scheme detected. Only standard HTTP and HTTPS links are permitted.'
    };
  }

  // 2. Parse URL (extract URL string if accompanied by explanatory text)
  const urlCandidate = trimmed.split(/\s+/)[0];
  let parsed: URL;
  try {
    parsed = new URL(urlCandidate.startsWith('http://') || urlCandidate.startsWith('https://') ? urlCandidate : `https://${urlCandidate}`);
  } catch {
    return {
      isValid: false,
      isSsrfRisk: false,
      error: 'Invalid URL format. Please provide a well-formed web address.'
    };
  }

  // Ensure protocol is strictly http or https
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return {
      isValid: false,
      isSsrfRisk: true,
      error: `Disallowed protocol: ${parsed.protocol}. Only HTTP and HTTPS are permitted.`
    };
  }

  const hostname = parsed.hostname.toLowerCase();

  // 3. SSRF Protection: Loopback, Cloud Metadata & Private IP Range Detection
  // Check localhost / 0.0.0.0 / ::1
  if (
    hostname === 'localhost' ||
    hostname === '0.0.0.0' ||
    hostname === '[::1]' ||
    hostname === '::1' ||
    hostname.endsWith('.localhost')
  ) {
    return {
      isValid: false,
      isSsrfRisk: true,
      hostname,
      error: 'SSRF Protection: Access to localhost or loopback addresses is strictly forbidden.'
    };
  }

  // Check IPv4 Private / Link-Local Ranges
  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = hostname.match(ipv4Regex);

  if (match) {
    const octets = match.slice(1, 5).map(Number);
    const [a, b, c, d] = octets;

    // Check invalid octets
    if (octets.some(o => o < 0 || o > 255)) {
      return { isValid: false, isSsrfRisk: true, error: 'Malformed IP address.' };
    }

    // 127.0.0.0/8 (Loopback)
    if (a === 127) {
      return { isValid: false, isSsrfRisk: true, hostname, error: 'SSRF Protection: Loopback IP addresses are blocked.' };
    }

    // 169.254.0.0/16 (Link-local & AWS/Cloud Metadata e.g. 169.254.169.254)
    if (a === 169 && b === 254) {
      return { isValid: false, isSsrfRisk: true, hostname, error: 'SSRF Protection: Cloud metadata addresses are blocked.' };
    }

    // 10.0.0.0/8 (RFC 1918 Private)
    if (a === 10) {
      return { isValid: false, isSsrfRisk: true, hostname, error: 'SSRF Protection: Private internal subnet (10.0.0.0/8) is blocked.' };
    }

    // 172.16.0.0/12 (RFC 1918 Private: 172.16.0.0 - 172.31.255.255)
    if (a === 172 && b >= 16 && b <= 31) {
      return { isValid: false, isSsrfRisk: true, hostname, error: 'SSRF Protection: Private internal subnet (172.16.0.0/12) is blocked.' };
    }

    // 192.168.0.0/16 (RFC 1918 Private)
    if (a === 192 && b === 168) {
      return { isValid: false, isSsrfRisk: true, hostname, error: 'SSRF Protection: Local area network address (192.168.0.0/16) is blocked.' };
    }

    // 0.0.0.0/8 (Current network)
    if (a === 0) {
      return { isValid: false, isSsrfRisk: true, hostname, error: 'SSRF Protection: Non-routable address blocked.' };
    }
  }

  // 4. Port Validation (Prevent port scanning of internal services)
  if (parsed.port) {
    const portNum = parseInt(parsed.port, 10);
    const standardPorts = [80, 443, 8080, 8443];
    if (!standardPorts.includes(portNum)) {
      return {
        isValid: false,
        isSsrfRisk: true,
        hostname,
        error: `Disallowed port (${parsed.port}). Inspection is restricted to standard web ports (80, 443, 8080, 8443).`
      };
    }
  }

  return {
    isValid: true,
    isSsrfRisk: false,
    hostname,
    sanitizedUrl: trimmed.length > urlCandidate.length ? trimmed : parsed.toString()
  };
}
