#!/usr/bin/env node
/**
 * Простой prerender для CRA на свежем Puppeteer.
 *
 * Что делает:
 *   1. Поднимает локальный Express-сервер, отдающий папку build/
 *   2. Headless Chrome заходит на каждый маршрут из ROUTES
 *   3. Ждёт, пока React отрендерит DOM, забирает HTML
 *   4. Подменяет canonical / og:url на правильный URL этой страницы
 *   5. Кладёт результат в build/<route>/index.html
 *
 * После этого:
 *   • поисковик видит готовый текст (а не пустой <div id="root">)
 *   • у каждой страницы свой canonical → Google индексирует их отдельно
 *   • при загрузке в браузере index.js делает hydrateRoot и React оживает
 */

const path = require('path');
const fs = require('fs');
const express = require('express');
const puppeteer = require('puppeteer');

const SITE_ORIGIN = 'https://aivfx.ru';
// Канонический URL = origin + маршрут (заканчивается слэшем для не-корневых)
function canonicalFor(route) {
  if (route === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${route}/`;
}

// Slug'и статей блога. ВАЖНО: держать в синхроне с src/data/blog-posts.js
const BLOG_SLUGS = [
  'kak-sdelat-ai-video',
  'sravnenie-neyrosetey-dlya-video',
  'skolko-stoit-ai-video',
];

const ROUTES = [
  '/',
  '/works',
  '/privacy',
  '/consent',
  '/blog',
  ...BLOG_SLUGS.map((s) => `/blog/${s}`),
];
const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const PORT = 8765;
// Сколько ждать после networkidle, чтобы клиентские lazy-чанки успели подгрузиться
const SETTLE_MS = 1500;

function fileExists(p) {
  try { fs.accessSync(p); return true; } catch { return false; }
}

if (!fileExists(BUILD_DIR)) {
  console.error('[prerender] папка build/ не найдена. Сначала запусти `npm run build`.');
  process.exit(1);
}

async function main() {
  // 1. Локальный сервер для статики build/
  const app = express();
  app.use(express.static(BUILD_DIR));
  // Любой маршрут без файла отдаём как index.html (SPA fallback)
  app.use((req, res) => {
    res.sendFile(path.join(BUILD_DIR, 'index.html'));
  });

  const server = await new Promise((resolve, reject) => {
    const s = app.listen(PORT, (err) => err ? reject(err) : resolve(s));
  });
  console.log(`[prerender] static server: http://localhost:${PORT}`);

  // 2. Headless Chrome
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let success = 0;
  for (const route of ROUTES) {
    const url = `http://localhost:${PORT}${route}`;
    const canonicalUrl = canonicalFor(route);
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
      // Дополнительная пауза для lazy-загрузки секций
      await new Promise(r => setTimeout(r, SETTLE_MS));

      // Проверяем, что есть какой-то контент
      const hasContent = await page.evaluate(() => {
        const root = document.getElementById('root');
        return !!(root && root.textContent && root.textContent.trim().length > 100);
      });

      if (!hasContent) {
        console.warn(`[prerender] ⚠ ${route}: контент пустой, пропускаю`);
        await page.close();
        continue;
      }

      // КЛЮЧЕВОЕ: подменяем canonical и og:url ДО снятия HTML.
      // Без этого все prerendered страницы имеют canonical=главная,
      // и Google считает их вариантами главной → не индексирует отдельно.
      await page.evaluate((newCanonical) => {
        // <link rel="canonical">
        let link = document.querySelector('link[rel="canonical"]');
        if (!link) {
          link = document.createElement('link');
          link.setAttribute('rel', 'canonical');
          document.head.appendChild(link);
        }
        link.setAttribute('href', newCanonical);

        // <meta property="og:url">
        let og = document.querySelector('meta[property="og:url"]');
        if (!og) {
          og = document.createElement('meta');
          og.setAttribute('property', 'og:url');
          document.head.appendChild(og);
        }
        og.setAttribute('content', newCanonical);

        // <meta name="twitter:url">
        let tw = document.querySelector('meta[name="twitter:url"]');
        if (tw) tw.setAttribute('content', newCanonical);
      }, canonicalUrl);

      // Получаем готовый HTML
      const html = await page.content();

      // Куда сохраняем
      const outDir = route === '/' ? BUILD_DIR : path.join(BUILD_DIR, route);
      if (route !== '/') {
        fs.mkdirSync(outDir, { recursive: true });
      }
      const outFile = path.join(outDir, 'index.html');
      fs.writeFileSync(outFile, html, 'utf8');

      const sizeKb = (html.length / 1024).toFixed(1);
      console.log(`[prerender] ✓ ${route.padEnd(12)} canonical=${canonicalUrl} → ${path.relative(process.cwd(), outFile)} (${sizeKb} KB)`);
      success++;
    } catch (err) {
      console.error(`[prerender] ✗ ${route}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`[prerender] готово: ${success}/${ROUTES.length} страниц`);
  process.exit(success === ROUTES.length ? 0 : 1);
}

main().catch(err => {
  console.error('[prerender] фатальная ошибка:', err);
  process.exit(1);
});
