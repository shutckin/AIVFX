#!/usr/bin/env node
/**
 * Карта сайта, собранная из данных.
 *
 * Раньше public/sitemap.xml правился руками. Достаточно было забыть про
 * него при выходе статьи, и страница оставалась вне карты: поисковик о
 * ней не узнавал, уведомление IndexNow её не включало, и статья висела
 * невидимой ровно до следующего случайного обхода. На этом сайте между
 * массовыми обходами Яндекса проходили месяцы.
 *
 * Теперь список берётся из тех же файлов данных, что и сами страницы
 * (см. site-routes.js), и расходиться им больше негде.
 *
 * Даты. Для статей берём dateModified из данных: поисковику важно, когда
 * менялось содержимое, а не когда собрали сборку. Для остальных страниц
 * ставим дату сборки - они меняются вместе с кодом.
 *
 * Запуск: node scripts/generate-sitemap.js   (вызывается перед сборкой)
 */
const fs = require('fs');
const path = require('path');
const { BILINGUAL, RU_ONLY, enRoute, canonicalFor } = require('./site-routes');

const OUT = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
const BLOG_DATA = path.resolve(__dirname, '..', 'src', 'data', 'blog-posts.js');

const today = new Date().toISOString().slice(0, 10);

// slug → дата последней правки статьи
const articleDates = (() => {
  const text = fs.readFileSync(BLOG_DATA, 'utf8');
  const map = {};
  // Ищем пару «slug ... dateModified» в пределах одной записи: поля идут
  // в фиксированном порядке, а между ними не встречается другой slug
  const re = /slug:\s*'([a-z0-9-]+)'[\s\S]{0,2000}?dateModified:\s*'(\d{4}-\d{2}-\d{2})'/g;
  for (const m of text.matchAll(re)) {
    if (!map[m[1]]) map[m[1]] = m[2];
  }
  return map;
})();

const lastmodFor = (logical) => {
  const m = logical.match(/^\/blog\/([a-z0-9-]+)$/);
  if (m && articleDates[m[1]]) return articleDates[m[1]];
  return today;
};

// Приоритет говорит поисковику, что на сайте главное. Значения
// относительные и работают только внутри одного сайта.
const priorityFor = (logical) => {
  if (logical === '/') return '1.0';
  if (logical.startsWith('/services/')) return '0.9';
  if (logical === '/video-production' || logical === '/works') return '0.9';
  if (logical === '/blog') return '0.8';
  if (logical.startsWith('/blog/')) return '0.7';
  return '0.3';
};

const changefreqFor = (logical) => {
  if (logical === '/' || logical === '/blog') return 'weekly';
  if (logical.startsWith('/blog/')) return 'monthly';
  return 'monthly';
};

const entry = ({ loc, lastmod, changefreq, priority, alternates }) => {
  const links = (alternates || [])
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`)
    .join('\n');
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    links,
    '  </url>',
  ].filter(Boolean).join('\n');
};

const urls = [];

for (const logical of BILINGUAL) {
  const ru = canonicalFor(logical);
  const en = canonicalFor(enRoute(logical));
  const lastmod = lastmodFor(logical);
  const changefreq = changefreqFor(logical);
  const priority = priorityFor(logical);
  // hreflang связывает две языковые версии между собой: без него
  // поисковик считает их конкурирующими страницами и выбирает одну
  const alternates = [
    { lang: 'ru', href: ru },
    { lang: 'en', href: en },
    { lang: 'x-default', href: ru },
  ];
  urls.push(entry({ loc: ru, lastmod, changefreq, priority, alternates }));
  urls.push(entry({ loc: en, lastmod, changefreq, priority, alternates }));
}

for (const logical of RU_ONLY) {
  urls.push(entry({
    loc: canonicalFor(logical),
    lastmod: today,
    changefreq: 'yearly',
    priority: priorityFor(logical),
  }));
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

fs.writeFileSync(OUT, xml, 'utf8');
console.log(`  Карта сайта собрана: ${urls.length} адресов → public/sitemap.xml`);
