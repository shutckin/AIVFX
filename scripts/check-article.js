// Проверка статьи, написанной агентом, перед вставкой в блог.
// Запуск: node check-article.js <файл.js> <ожидаемый-слаг> <ru|en> <ожидаемый-src-картинки>
//
// Проверяем то, что человек проверять глазами устанет: формат объекта,
// стилевые запреты Арта, структуру блоков, длину описания и ссылки.

const fs = require('fs');
const path = require('path');

const [file, wantSlug, lang, wantImg] = process.argv.slice(2);
const raw = fs.readFileSync(file, 'utf8');

const errors = [];
const warns = [];
const fail = (m) => errors.push(m);
const warn = (m) => warns.push(m);

// Файл - это фрагмент «  { ... },». Чтобы получить из него объект, пишем
// временный модуль и подгружаем его require. Это и синтаксис проверяет,
// и не требует eval.
let post;
const tmp = path.join(path.dirname(file), '.check-' + path.basename(file));
try {
  fs.writeFileSync(tmp, 'module.exports = ' + raw.trim().replace(/,\s*$/, '') + ';\n');
  post = require(tmp);
} catch (e) {
  console.log('ПРОВАЛ: файл не парсится как объект - ' + e.message);
  process.exit(1);
} finally {
  try { fs.unlinkSync(tmp); } catch (e) { /* нечего убирать */ }
}

// ── обязательные поля ───────────────────────────────────────────────
const required = ['slug', 'category', 'title', 'description', 'keywords', 'cover',
  'coverSource', 'date', 'dateModified', 'readingTime', 'related', 'excerpt', 'content'];
required.forEach((f) => { if (!post[f]) fail('нет поля ' + f); });

if (post.slug !== wantSlug) fail(`слаг «${post.slug}» вместо «${wantSlug}»`);
if (post.description && post.description.length > 160) {
  fail(`description ${post.description.length} символов, максимум 160`);
}
if (post.title && post.title.length > 100) warn(`title длинный: ${post.title.length} символов`);

// ── стилевые запреты ────────────────────────────────────────────────
const dashes = (raw.match(/[—–]/g) || []).length;
if (dashes) fail(`длинных тире: ${dashes} штук (запрещены)`);

const banned = [
  /мы (проверил|протестировал|отобрал)и (сотни|десятки|тысячи)/i,
  /за (годы|годы работы|полгода отбора)/i,
  /наши клиенты обычно/i,
  /сгенерировано (ии|нейросет)/i,
  /написано с помощью (ии|нейросет)/i,
];
banned.forEach((re) => { if (re.test(raw)) fail('запрещённая формулировка: ' + re); });

// ── структура блоков ────────────────────────────────────────────────
const c = post.content || [];
const types = c.map((b) => b.type);
const imgs = c.filter((b) => b.type === 'image');
if (imgs.length !== 1) fail(`блоков image: ${imgs.length}, нужен ровно 1`);
if (imgs[0] && imgs[0].src !== wantImg) fail(`картинка «${imgs[0].src}» вместо «${wantImg}»`);
if (imgs[0] && (!imgs[0].alt || !imgs[0].caption)) fail('у картинки нет alt или caption');
if (types[types.length - 1] !== 'cta') fail('последний блок не cta');
if (types.filter((t) => t === 'cta').length !== 1) fail('блоков cta должно быть ровно 1');

const h2 = c.filter((b) => b.type === 'h2').length;
const h3 = c.filter((b) => b.type === 'h3').length;
if (h2 < 5) warn(`подзаголовков h2 всего ${h2}`);
if (h3 < 5) fail(`h3 всего ${h3}, а нужен блок вопросов минимум из 5`);

const faqHead = c.some((b) => b.type === 'h2' && /Частые вопросы|Frequently asked/i.test(b.text));
if (!faqHead) fail('нет заголовка блока частых вопросов');

const badBlocks = c.filter((b) => !['p', 'h2', 'h3', 'ul', 'ol', 'quote', 'image', 'cta'].includes(b.type));
if (badBlocks.length) fail('неизвестные типы блоков: ' + badBlocks.map((b) => b.type).join(', '));
c.forEach((b, i) => {
  if ((b.type === 'ul' || b.type === 'ol') && (!Array.isArray(b.items) || !b.items.length)) {
    fail(`блок ${i} (${b.type}) без items`);
  }
  if (['p', 'h2', 'h3', 'quote'].includes(b.type) && !b.text) fail(`блок ${i} (${b.type}) без text`);
});

// ── объём ───────────────────────────────────────────────────────────
const words = c
  .flatMap((b) => (b.items ? b.items : [b.text || '']))
  .join(' ')
  .split(/\s+/)
  .filter(Boolean).length;
if (words < 900) fail(`всего ${words} слов, мало`);
if (words > 2200) warn(`${words} слов, многовато`);

// ── ссылки ──────────────────────────────────────────────────────────
const links = [...raw.matchAll(/\]\((\/[^)]+)\)/g)].map((m) => m[1]);
const known = new Set();
try {
  const repo = '/Users/art/Documents/Vibecoding/Projects/03-sites/aivfx';
  const posts = fs.readFileSync(path.join(repo, 'src/data/blog-posts.js'), 'utf8');
  [...posts.matchAll(/slug: '([a-z0-9-]+)'/g)].forEach((m) => known.add('/blog/' + m[1] + '/'));
  const sys = fs.readFileSync(path.join(repo, 'src/data/systems-content.js'), 'utf8');
  [...sys.matchAll(/slug: '([a-z0-9-]+)'/g)].forEach((m) => known.add('/services/' + m[1] + '/'));
} catch (e) { warn('не смог прочитать список существующих страниц'); }
known.add('/works/');
known.add('/#contact');
known.add('/blog/');
known.add('/video-production/');
known.add('/' + wantSlug + '/');
known.add('/blog/' + wantSlug + '/');

const dead = [...new Set(links)].filter((l) => !known.has(l));
if (dead.length) fail('ссылки в никуда: ' + dead.join(', '));
const internal = [...new Set(links)].filter((l) => l.startsWith('/blog/') || l.startsWith('/services/'));
if (internal.length < 3) fail(`внутренних ссылок ${internal.length}, нужно минимум 3`);
if (!links.some((l) => l.startsWith('/services/'))) warn('нет ссылки на страницу услуг');
if (links.some((l) => l === '/blog/' + wantSlug + '/')) fail('статья ссылается сама на себя');

// ── язык ────────────────────────────────────────────────────────────
const cyr = (raw.match(/[а-яА-ЯёЁ]/g) || []).length;
if (lang === 'ru' && cyr < 2000) fail('текст не похож на русский, кириллицы мало');
if (lang === 'en' && cyr > 400) fail(`в английской версии ${cyr} кириллических символов`);
if (lang === 'en' && post.coverSource !== 'AIVFX AI generation (Seedream 5 Pro)') {
  fail('в EN-версии неверный coverSource: ' + post.coverSource);
}
if (lang === 'ru' && post.coverSource !== 'AI-генерация AIVFX (Seedream 5 Pro)') {
  fail('в RU-версии неверный coverSource: ' + post.coverSource);
}

// ── вывод ───────────────────────────────────────────────────────────
console.log(`\n${path.basename(file)}  «${post.title}»`);
console.log(`  слов: ${words}, h2: ${h2}, h3: ${h3}, ссылок внутрь: ${internal.length}, description: ${(post.description || '').length}`);
warns.forEach((w) => console.log('  ЗАМЕЧАНИЕ: ' + w));
if (errors.length) {
  errors.forEach((e) => console.log('  ОШИБКА: ' + e));
  console.log('  ИТОГ: ПРОВАЛ');
  process.exit(1);
}
console.log('  ИТОГ: чисто');
