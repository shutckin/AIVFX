// ── Отправка заявок с сайта ────────────────────────────────────────────
//
// Браузер больше НИКОГДА не знает токен Telegram-бота. Он отправляет
// заявку на наш серверный обработчик, а тот уже пишет в Telegram.
//
// Раньше было наоборот: токен лежал прямо в JS-файле сайта, его можно было
// достать из исходников страницы, чем в августе 2026 года и воспользовались.
// Любой ключ, попавший в браузер, считается публичным — исключений не бывает.

const ENDPOINT = process.env.REACT_APP_LEAD_API || '';

// Адрес обработчика не задан — заявка физически не может уйти.
// Это ошибка конфигурации, и притворяться успехом нельзя.
export const isLeadApiConfigured = () => Boolean(ENDPOINT);

const currentPage = () => {
  if (typeof window === 'undefined') return '';
  return window.location.pathname + window.location.search;
};

/**
 * Отправляет заявку. Бросает исключение при любой неудаче — вызывающий код
 * обязан показать посетителю прямые контакты, а не ложный успех.
 *
 * @param {object} payload поля формы
 * @param {'systems'|'video'|'chat'} kind какая форма отправляет
 * @param {{ startedAt?: number, honeypot?: string }} meta анти-спам
 */
export const sendLead = async (payload, kind = 'systems', meta = {}) => {
  if (!ENDPOINT) throw new Error('lead api endpoint is not configured');

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      kind,
      page: currentPage(),
      // Скрытое поле-ловушка: человек его не видит, автозаполнялка ботов — да
      website: meta.honeypot || '',
      // Сколько посетитель провёл на форме: мгновенная отправка = бот
      elapsedMs: meta.startedAt ? Date.now() - meta.startedAt : undefined,
    }),
  });

  if (!res.ok) throw new Error(`lead api error: ${res.status}`);

  const data = await res.json().catch(() => null);
  if (!data || data.ok !== true) throw new Error('lead api rejected the request');
};

/**
 * Отправка при уходе со страницы (сводка диалога с ассистентом).
 * sendBeacon переживает закрытие вкладки, но не умеет читать ответ —
 * поэтому используется только там, где ответ не нужен.
 */
export const sendLeadBeacon = (payload, kind = 'chat') => {
  if (!ENDPOINT || typeof navigator === 'undefined' || !navigator.sendBeacon) return false;

  const body = new Blob(
    [JSON.stringify({ ...payload, kind, page: currentPage(), elapsedMs: 60000 })],
    { type: 'application/json' }
  );

  try {
    return navigator.sendBeacon(ENDPOINT, body);
  } catch (_) {
    return false;
  }
};
