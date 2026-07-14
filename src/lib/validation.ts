/** Shared, slightly stricter email check used by contact/newsletter forms and APIs. */
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const PHONE_REGEX = /^[+\d][\d\s()./-]{5,38}$/;

/** Strip CR/LF and other control characters that can break email headers. */
export function stripControlChars(value: string): string {
  return value.replace(/[\r\n\0\u0001-\u001f\u007f]/g, '');
}

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  if (email.length < 5 || email.length > 200) return false;
  return EMAIL_REGEX.test(email);
}

export function isValidPhone(value: string): boolean {
  const phone = value.trim();
  if (phone.length < 6 || phone.length > 40) return false;
  return PHONE_REGEX.test(phone);
}
