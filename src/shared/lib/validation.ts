/** Формат: 8(XXX)XXXXXXX, 11 цифр */
const PHONE_FORMAT = /^8\(\d{3}\)\d{7}$/;

/** Оставляет только цифры; если начинается с 7, спереди ставим 8 (код страны) */
function digitsOnly(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("7")) return "8" + digits;
  if (digits.startsWith("8")) return digits;
  return "8" + digits;
}

/**
 * Форматирует ввод телефона в вид 8(XXX)XXXXXXX.
 * Пример: "7" -> "8(7", "707" -> "8(707)", "7073707975" -> "8(707)3707975"
 */
export function formatPhoneInput(value: string): string {
  const d = digitsOnly(value).slice(0, 11);
  if (d.length <= 1) return d ? "8" : "";
  if (d.length <= 4) return `8(${d.slice(1)}`;
  return `8(${d.slice(1, 4)})${d.slice(4)}`;
}

/** Проверяет, что телефон в формате 8(XXX)XXXXXXX */
export function validatePhone(phone: string): boolean {
  return PHONE_FORMAT.test(phone.trim());
}

/** Стандартная валидация email */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}
