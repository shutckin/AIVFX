// ── Медиа под язык страницы ──────────────────────────────────────────────
//
// На роликах и графике есть надписи, поэтому для английской версии сайта
// нужен свой файл. Правило простое: к имени добавляется суффикс -en.
//
//   /process/reel.mp4  →  /process/reel-en.mp4
//
// Английской версии может ещё не быть. Держать где-то список готовых
// переводов — плохая идея: его придётся править руками при каждой новой
// картинке, и рано или поздно он разойдётся с тем, что лежит на диске.
// Поэтому проверку делаем в момент загрузки: не нашлось английского —
// молча берём русский. Файл появится на сервере — подхватится сам,
// без единой правки в коде.
//
// Важная тонкость. Сайт с клиентской маршрутизацией на любой неизвестный
// адрес отдаёт главную страницу с кодом 200, а не «не найдено». Поэтому
// по коду ответа судить нельзя: проверяем тип содержимого, иначе вместо
// ролика в тег попадёт HTML, и видео молча окажется пустым.

const EN_SUFFIX = '-en';

// Разбирает '/process/reel.mp4' на основу и расширение
const split = (path) => {
  const dot = path.lastIndexOf('.');
  if (dot <= 0) return { base: path, ext: '' };
  return { base: path.slice(0, dot), ext: path.slice(dot) };
};

/**
 * Пара адресов для языка страницы.
 * Для русского запасной не нужен — оригинал и так на русском.
 *
 * @param {string} path адрес русского файла
 * @param {string} locale 'ru' | 'en'
 * @returns {{ primary: string, fallback: string|null }}
 */
export const mediaFor = (path, locale) => {
  if (locale !== 'en') return { primary: path, fallback: null };
  const { base, ext } = split(path);
  return { primary: `${base}${EN_SUFFIX}${ext}`, fallback: path };
};

/**
 * Скачивает файл, при неудаче пробует запасной.
 * Возвращает Blob либо null, если не вышло ни то, ни другое.
 */
export const fetchLocalized = async (path, locale) => {
  const { primary, fallback } = mediaFor(path, locale);

  const tryOne = async (url) => {
    const r = await fetch(url);
    if (!r.ok) return null;
    const type = r.headers.get('content-type') || '';
    if (!type.startsWith('video/')) return null; // это подставная страница, а не файл
    return r.blob();
  };

  try {
    const first = await tryOne(primary);
    if (first) return first;
  } catch (e) {
    // сеть отвалилась — ниже ещё одна попытка на запасном
  }

  if (!fallback) return null;
  try {
    return await tryOne(fallback);
  } catch (e) {
    return null;
  }
};
