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
const SERVICE_SLUGS = slugsFrom('systems-content.js');

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

// Логические пути, у которых есть и RU, и EN-версия
const BILINGUAL = [
  '/',
  ...SERVICE_SLUGS.map((s) => `/services/${s}`),
  '/video-production',
  '/works',
  '/blog',
  ...BLOG_SLUGS.filter(translated).map((s) => `/blog/${s}`),
];

// Только на русском: юридические страницы (своя юрисдикция) и статьи,
// которые ещё не переведены
const RU_ONLY = [
  '/privacy',
  '/consent',
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
