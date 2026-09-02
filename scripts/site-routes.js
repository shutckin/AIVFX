/**
 * Единый список адресов сайта.
 *
 * Раньше он существовал в трёх местах сразу: статьи перечислены в
 * src/data/blog-posts.js, ещё раз в prerender.js («ВАЖНО: держать в
 * синхроне») и третий раз руками в public/sitemap.xml. Любая новая
 * статья требовала не забыть про три файла, и достаточно было
 * пропустить один, чтобы страница не отрендерилась заранее или не
 * попала в карту сайта, а значит и в уведомление поисковикам.
 *
 * Теперь источник один - файлы данных. Slug'и читаются прямо из них
 * разбором текста, а не импортом: данные лежат в ES-модулях, скрипты
 * сборки работают на CommonJS, и тащить ради одного списка транспайлер
 * было бы дороже, чем разобрать десяток строк регулярным выражением.
 * Формат данных при этом наш собственный и меняется только вместе с
 * этим файлом.
 */
const fs = require('fs');
const path = require('path');

const SITE = 'https://aivfx.ru';
const SRC = path.resolve(__dirname, '..', 'src', 'data');

// Вытаскиваем значения slug из файла данных в порядке появления
const slugsFrom = (file) => {
  const text = fs.readFileSync(path.join(SRC, file), 'utf8');
  const found = [...text.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]);
  // Один и тот же slug встречается в файле не по разу (карточка услуги
  // и пункт меню), поэтому схлопываем, сохраняя порядок
  return [...new Set(found)];
};

const BLOG_SLUGS = slugsFrom('blog-posts.js');

// Страницы услуг - это ключи объекта SERVICE_PAGES, а не поля slug.
// Раньше здесь брались любые «slug: '...'» из файла, и совпадение было
// случайным: те же три значения перечислены ещё и в меню. Стоило добавить
// страницу ключом, не продублировав её в меню, - и она выпадала из карты
// сайта и предрендера, то есть не существовала для поиска.
const SERVICE_SLUGS = (() => {
  const text = fs.readFileSync(path.join(SRC, 'systems-content.js'), 'utf8');
  const start = text.indexOf('export const SERVICE_PAGES = {');
  if (start === -1) return [];
  // Идём по файлу от объявления до закрывающей скобки объекта, считая
  // вложенность: внутри много вложенных объектов и массивов
  let depth = 0;
  let end = text.length;
  for (let i = text.indexOf('{', start); i < text.length; i += 1) {
    if (text[i] === '{') depth += 1;
    else if (text[i] === '}') {
      depth -= 1;
      if (depth === 0) { end = i; break; }
    }
  }
  const body = text.slice(start, end);
  // Ключи верхнего уровня записаны с отступом в два пробела
  return [...body.matchAll(/\n {2}'([a-z0-9-]+)':\s*\{/g)].map((m) => m[1]);
})();

// Какие статьи переведены. Английский блог собирается из четырёх файлов
// частей, и статья попадает туда не одновременно с русской: перевод
// делается отдельным шагом. Обещать поисковику английскую версию, пока
// её нет, нельзя - он придёт по адресу и получит пустую страницу, а это
// прямой минус к доверию ко всему разделу.
const EN_BLOG_SLUGS = (() => {
  const found = new Set();
  for (const file of fs.readdirSync(SRC)) {
    if (!/^_en_part\d+\.js$/.test(file)) continue;
    for (const s of slugsFrom(file)) found.add(s);
  }
  return found;
})();

const translated = (slug) => EN_BLOG_SLUGS.has(slug);

// Страницы услуг, которые существуют только по-русски.
//
// Обучение и консультации проводятся голосом и только на русском, поэтому
// английская версия такой страницы обещала бы услугу, которую человек не
// сможет получить. Лучше не иметь страницы, чем привести на неё
// англоязычного читателя и отказать ему в переписке.
const RU_ONLY_SERVICES = SERVICE_SLUGS.filter((s) => s.startsWith('obuchenie-'));

// Логические пути, у которых есть и RU, и EN-версия
const BILINGUAL = [
  '/',
  ...SERVICE_SLUGS.filter((s) => !RU_ONLY_SERVICES.includes(s)).map((s) => `/services/${s}`),
  '/video-production',
  '/works',
  '/blog',
  ...BLOG_SLUGS.filter(translated).map((s) => `/blog/${s}`),
];

// Только на русском: юридические страницы (своя юрисдикция), обучение
// (см. выше) и статьи, которые ещё не переведены
const RU_ONLY = [
  '/privacy',
  '/consent',
  ...RU_ONLY_SERVICES.map((s) => `/services/${s}`),
  ...BLOG_SLUGS.filter((s) => !translated(s)).map((s) => `/blog/${s}`),
];

// Логический путь → EN-маршрут ('/' → '/en', '/blog' → '/en/blog')
const enRoute = (logical) => (logical === '/' ? '/en' : `/en${logical}`);

// Адрес с завершающим слешем: без него сервер отдаёт 301, и поисковик
// тратит обход впустую
const canonicalFor = (route) => {
  if (route === '/') return `${SITE}/`;
  return `${SITE}${route}/`;
};

module.exports = {
  SITE,
  BLOG_SLUGS,
  SERVICE_SLUGS,
  BILINGUAL,
  RU_ONLY,
  enRoute,
  canonicalFor,
};
