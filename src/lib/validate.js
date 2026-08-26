// ── Проверка почты ─────────────────────────────────────────────────────
//
// Браузерная проверка type="email" пропускает слишком многое: например
// «a@b» она считает нормальным адресом. А самая частая реальная проблема
// не в формате, а в опечатке в известном домене — клиент пишет gmail.con,
// заявка уходит, ответ не доходит, и никто не понимает почему.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

// Домены, в которых чаще всего ошибаются, и их типовые опечатки
const DOMAIN_TYPOS = {
  'gmail.con': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmail.ru': 'gmail.com',
  'yandex.ri': 'yandex.ru',
  'yandex.com': 'yandex.ru',
  'yandes.ru': 'yandex.ru',
  'yndex.ru': 'yandex.ru',
  'mail.ri': 'mail.ru',
  'mial.ru': 'mail.ru',
  'maiil.ru': 'mail.ru',
  'outlook.con': 'outlook.com',
  'hotmail.con': 'hotmail.com',
  'icloud.con': 'icloud.com',
  'yahoo.con': 'yahoo.com',
};

export const normalizeEmail = (value) => String(value || '').trim().toLowerCase();

export const isValidEmail = (value) => EMAIL_RE.test(normalizeEmail(value));

/**
 * Возвращает исправленный адрес, если в домене узнаётся опечатка,
 * иначе null. Ничего не меняет сам — решение оставляем посетителю.
 */
export const suggestEmailFix = (value) => {
  const email = normalizeEmail(value);
  const at = email.lastIndexOf('@');
  if (at < 1) return null;

  const domain = email.slice(at + 1);
  const fixed = DOMAIN_TYPOS[domain];
  if (!fixed || fixed === domain) return null;

  return `${email.slice(0, at)}@${fixed}`;
};
