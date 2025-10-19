import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE, ACCEPTED_FILE_EXTENSIONS } from './constants';

export function validateFile(file) {
  const errors = [];

  if (!file) {
    errors.push('Please select a file');
    return errors;
  }

  // Check file type
  if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
    errors.push(`File type not supported. Accepted types: ${ACCEPTED_FILE_EXTENSIONS.join(', ')}`);
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = ACCEPTED_FILE_EXTENSIONS.some(ext => fileName.endsWith(ext));
  if (!hasValidExtension) {
    errors.push(`Invalid file extension. Accepted: ${ACCEPTED_FILE_EXTENSIONS.join(', ')}`);
  }

  return errors;
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

