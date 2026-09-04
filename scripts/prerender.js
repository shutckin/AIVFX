#!/usr/bin/env node
/**
 * Простой prerender для CRA на свежем Puppeteer (двуязычный RU/EN).
 *
 * Что делает:
 *   1. Поднимает локальный Express-сервер, отдающий папку build/
 *   2. Headless Chrome заходит на каждый маршрут (RU и /en)
 *   3. Ждёт, пока React отрендерит DOM, забирает HTML
 *   4. Подменяет canonical / og:url, проставляет <html lang> и hreflang
 *   5. Кладёт результат в build/<route>/index.html
 *
 * После этого:
 *   • поисковик видит готовый текст (а не пустой <div id="root">)
 *   • у каждой страницы свой canonical → Google индексирует их отдельно
 *   • hreflang связывает RU- и EN-версии одной страницы между собой
 *   • при загрузке в браузере index.js делает hydrateRoot и React оживает
 */

const path = require('path');
const fs = require('fs');
const express = require('express');
const puppeteer = require('puppeteer');

const {
  BILINGUAL,
  RU_ONLY,
  enRoute,
  canonicalFor,
} = require('./site-routes');

// Списки страниц живут в одном месте - scripts/site-routes.js, который
// читает их прямо из файлов данных. Раньше здесь лежала своя копия
// с пометкой «держать в синхроне»: при выходе статьи её приходилось
// дописывать и сюда, и в карту сайта, и достаточно было забыть про
// одно место, чтобы страница осталась без предрендера или вне карты.

// Полный список задач рендера: для двуязычных - RU + EN, для юридических - только RU
const TASKS = [];
for (const logical of BILINGUAL) {
  const ruUrl = canonicalFor(logical);
  const enUrl = canonicalFor(enRoute(logical));
  TASKS.push({ route: logical, locale: 'ru', bilingual: true, ruUrl, enUrl });
  TASKS.push({ route: enRoute(logical), locale: 'en', bilingual: true, ruUrl, enUrl });
}
for (const logical of RU_ONLY) {
  TASKS.push({ route: logical, locale: 'ru', bilingual: false });
}

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
  // Оригинальный (пустой) shell - отдаём его на все SPA-fallback запросы,
  // чтобы React всегда стартовал с чистого #root и рендерил нужную локаль
  // без рассинхронизации с уже перезаписанными RU-страницами.
  const ORIGINAL_INDEX = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8');

  // 1. Локальный сервер для статики build/
  const app = express();
  app.use(express.static(BUILD_DIR));
  // Любой маршрут без файла отдаём как чистый index.html (SPA fallback)
  app.use((req, res) => {
    res.set('Content-Type', 'text/html; charset=utf-8').send(ORIGINAL_INDEX);
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
  for (const task of TASKS) {
    const { route, locale } = task;
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

      // Снимаем рантайм-следы, которых нет в первом рендере React.
      // Классы .in навешивает IntersectionObserver уже после монтирования;
      // если они попадут в HTML, при загрузке страницы разметка не совпадёт
      // с тем, что рендерит React, и он выбросит весь предрендер, перерисовав
      // страницу заново (ошибки гидрации в консоли).
      await page.evaluate(() => {
        // 1. Классы появления по скроллу
        document.querySelectorAll('.reveal.in').forEach((el) => el.classList.remove('in'));
        // 2. Cookie-баннер: React отдаёт его пустым и показывает только после
        //    проверки localStorage - в снимке его быть не должно
        document.querySelectorAll('.cookie-banner').forEach((el) => el.remove());
        // 3. Чат-лаунчер всплывает по таймеру/скроллу - снимаем видимость
        document.querySelectorAll('.chat-launcher.is-visible')
          .forEach((el) => el.classList.remove('is-visible'));
      });

      // КЛЮЧЕВОЕ: подменяем canonical/og:url, проставляем lang и hreflang
      // ДО снятия HTML. Без canonical все prerendered страницы выглядят как
      // варианты главной; hreflang связывает RU↔EN версии между собой.
      await page.evaluate((cfg) => {
        const { canonical, locale, bilingual, ruUrl, enUrl } = cfg;

        // <html lang="ru|en">
        document.documentElement.setAttribute('lang', locale);

        // <link rel="canonical">
        let link = document.querySelector('link[rel="canonical"]');
        if (!link) {
          link = document.createElement('link');
          link.setAttribute('rel', 'canonical');
          document.head.appendChild(link);
        }
        link.setAttribute('href', canonical);

        // <meta property="og:url">
        let og = document.querySelector('meta[property="og:url"]');
        if (!og) {
          og = document.createElement('meta');
          og.setAttribute('property', 'og:url');
          document.head.appendChild(og);
        }
        og.setAttribute('content', canonical);

        // <meta property="og:locale">
        let ogl = document.querySelector('meta[property="og:locale"]');
        if (!ogl) {
          ogl = document.createElement('meta');
          ogl.setAttribute('property', 'og:locale');
          document.head.appendChild(ogl);
        }
        ogl.setAttribute('content', locale === 'en' ? 'en_US' : 'ru_RU');

        // <meta name="twitter:url">
        const tw = document.querySelector('meta[name="twitter:url"]');
        if (tw) tw.setAttribute('content', canonical);

        // Заголовок и описание для превью ссылки - забираем их у самой
        // страницы, а не держим отдельным списком. К этому моменту
        // приложение уже проставило локализованные <title> и
        // <meta name="description">, поэтому карточка в мессенджере
        // получается на языке страницы сама собой.
        //
        // Без этого на /en/ уезжало русское описание из index.html:
        // раньше здесь подменялись только адрес и локаль, а заголовок с
        // описанием оставались теми, что записаны в шаблоне.
        const setMeta = (selector, attr, name, value) => {
          if (!value) return;
          let el = document.querySelector(selector);
          if (!el) {
            el = document.createElement('meta');
            el.setAttribute(attr, name);
            document.head.appendChild(el);
          }
          el.setAttribute('content', value);
        };

        // Хвост вида « | От заявки до повторных продаж» нужен поисковику,
        // но в карточке мессенджера он только удлиняет строку
        const pageTitle = (document.title || '').split('|')[0].trim();
        const descEl = document.querySelector('meta[name="description"]');
        const pageDesc = descEl ? descEl.getAttribute('content') : '';

        setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
        setMeta('meta[property="og:description"]', 'property', 'og:description', pageDesc);
        setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
        setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', pageDesc);

        // Подпись к картинке тоже своя на каждом языке - её читают
        // экранные дикторы, когда карточку озвучивают
        setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt',
          locale === 'en'
            ? 'AIVFX - AI systems, AI video and VFX studio'
            : 'AIVFX - студия AI-систем, AI-видео и VFX');

        // hreflang: убираем старые альтернативы и проставляем заново
        document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
        if (bilingual) {
          const add = (lang, href) => {
            const l = document.createElement('link');
            l.setAttribute('rel', 'alternate');
            l.setAttribute('hreflang', lang);
            l.setAttribute('href', href);
            document.head.appendChild(l);
          };
          add('ru', ruUrl);
          add('en', enUrl);
          add('x-default', ruUrl);
        }
      }, { canonical: canonicalUrl, locale, bilingual: task.bilingual, ruUrl: task.ruUrl, enUrl: task.enUrl });

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
      console.log(`[prerender] ✓ ${route.padEnd(28)} [${locale}] canonical=${canonicalUrl} (${sizeKb} KB)`);
      success++;
    } catch (err) {
      console.error(`[prerender] ✗ ${route}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`[prerender] готово: ${success}/${TASKS.length} страниц`);
  process.exit(success === TASKS.length ? 0 : 1);
}

main().catch(err => {
  console.error('[prerender] фатальная ошибка:', err);
  process.exit(1);
});
