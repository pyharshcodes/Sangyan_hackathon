export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedName: string;
  sizeBytes: number;
}

export const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB Max
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

export async function validateUploadedFile(file: File): Promise<FileValidationResult> {
  const sizeBytes = file.size;
  const fileName = file.name || 'unnamed_screenshot.png';

  // 1. Sanitize file name to prevent path traversal or special character attacks
  const sanitizedName = fileName
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, 100);

  // 2. File size boundary check
  if (sizeBytes > MAX_UPLOAD_SIZE_BYTES) {
    return {
      isValid: false,
      error: `File size exceeds the 5 MB limit (Uploaded: ${(sizeBytes / (1024 * 1024)).toFixed(2)} MB). Please upload a compressed screenshot.`,
      sanitizedName,
      sizeBytes
    };
  }

  if (sizeBytes === 0) {
    return {
      isValid: false,
      error: 'Empty file detected. Please upload a valid screenshot.',
      sanitizedName,
      sizeBytes
    };
  }

  // 3. Extension check
  const lowerName = sanitizedName.toLowerCase();
  const hasValidExt = ALLOWED_EXTENSIONS.some(ext => lowerName.endsWith(ext));
  if (!hasValidExt) {
    return {
      isValid: false,
      error: 'Unsupported file extension. Only PNG, JPG, JPEG, and WEBP screenshot images are allowed. SVG and executable files are rejected for safety.',
      sanitizedName,
      sizeBytes
    };
  }

  // 4. MIME type check
  if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return {
      isValid: false,
      error: `Disallowed MIME type: ${file.type || 'unknown'}. Only static raster images (JPEG, PNG, WEBP) are allowed.`,
      sanitizedName,
      sizeBytes
    };
  }

  // 5. Header / Magic Bytes Sniffing (Detect spoofed files pretending to be images)
  try {
    const buffer = await file.slice(0, 12).arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
    const isWebp =
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 && // 'RIFF'
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50; // 'WEBP'

    if (!isJpeg && !isPng && !isWebp) {
      return {
        isValid: false,
        error: 'File header verification failed. The file content does not match genuine JPEG, PNG, or WEBP image signatures.',
        sanitizedName,
        sizeBytes
      };
    }
  } catch (err) {
    // If arrayBuffer reading fails, return safe rejection
    return {
      isValid: false,
      error: 'Could not read file binary headers safely.',
      sanitizedName,
      sizeBytes
    };
  }

  return {
    isValid: true,
    sanitizedName,
    sizeBytes
  };
}
