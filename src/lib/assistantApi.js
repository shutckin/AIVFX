// ── Ассистент на сайте: обращение к серверу ────────────────────────────
//
// Ключ модели живёт только на сервере. Браузер знает лишь адрес функции —
// то же правило, что и для заявок: любой ключ, попавший в браузер,
// считается публичным, исключений не бывает.
//
// Если сервер недоступен, ключ ещё не подключён или ответ не пришёл —
// функция возвращает null. Виджет в этом случае отвечает по прежнему
// сценарию: посетитель не должен видеть поломку из-за чужой проблемы.

const ENDPOINT = process.env.REACT_APP_ASSISTANT_API || '';

// Модели просили не использовать разметку, но изредка она всё равно
// проскакивает. В обычном текстовом пузыре звёздочки видны как есть
// и выглядят браком, поэтому подчищаем их на всякий случай.
const stripMarkup = (text) => String(text)
  .replace(/\*\*(.+?)\*\*/g, '$1')   // **жирный**
  .replace(/(^|\s)\*(\S.*?\S)\*(?=\s|$)/g, '$1$2') // *курсив*
  .replace(/^#{1,6}\s+/gm, '')        // ## заголовки
  .replace(/^\s*[-*]\s+/gm, '• ')     // маркеры списка
  .replace(/\n{3,}/g, '\n\n')
  .trim();

export const isAssistantConfigured = () => Boolean(ENDPOINT);

// Дольше ждать нет смысла: посетитель решит, что чат завис
const TIMEOUT_MS = 20000;

/**
 * Спрашивает ассистента.
 *
 * @param {Array<{role: 'user'|'assistant', content: string}>} messages диалог целиком
 * @returns {Promise<{reply: string, slots: object|null, handoff: boolean}|null>} null — отвечать по сценарию
 */
export const askAssistant = async (messages) => {
  if (!ENDPOINT) return null;

  const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = ctrl ? setTimeout(() => ctrl.abort(), TIMEOUT_MS) : null;

  try {
    const r = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal: ctrl ? ctrl.signal : undefined,
    });

    const data = await r.json().catch(() => null);
    if (!r.ok || !data || !data.ok || !data.reply) return null;

    return {
      reply: stripMarkup(data.reply),
      slots: data.slots || null,
      // Сервер говорит, что пора передать разговор человеку —
      // виджет покажет форму с кнопками вместо голой ссылки
      handoff: Boolean(data.handoff),
    };
  } catch (e) {
    // Сеть, таймаут, неверный ответ — всё это повод молча отступить
    // на сценарий, а не показывать посетителю ошибку
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
};
