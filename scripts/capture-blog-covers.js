#!/usr/bin/env node
/**
 * Захват обложек для статей блога — скриншоты официальных сайтов сервисов.
 * Редакционное использование с указанием источника (подпись под обложкой в UI).
 *
 * Запуск: node scripts/capture-blog-covers.js
 * Результат: public/blog-images/<slug>.jpg (1280×720, 16:9)
 */
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const OUT_DIR = path.resolve(__dirname, '..', 'public', 'blog-images');
fs.mkdirSync(OUT_DIR, { recursive: true });

// Статья (slug) → официальный сайт сервиса
const TARGETS = [
  { slug: 'kak-sozdat-ai-avatar-heygen', url: 'https://www.heygen.com/' },
  { slug: 'kling-gayd',                  url: 'https://www.klingai.com/' },
  { slug: 'runway-gayd',                 url: 'https://runwayml.com/' },
  { slug: 'veo-gayd',                    url: 'https://deepmind.google/models/veo/' },
  { slug: 'midjourney-gayd',             url: 'https://www.midjourney.com/home' },
];

// Частые селекторы кнопок принятия cookie — пытаемся закрыть баннер
const COOKIE_SELECTORS = [
  '#onetrust-accept-btn-handler',
  'button[aria-label="Accept all"]',
  'button[aria-label="Accept"]',
  'button[mode="primary"]',
  '.cookie-accept', '.accept-cookies',
];

async function dismissBanners(page) {
  for (const sel of COOKIE_SELECTORS) {
    try {
      const el = await page.$(sel);
      if (el) { await el.click(); await new Promise(r => setTimeout(r, 600)); }
    } catch {}
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US'],
  });
  let ok = 0;
  for (const { slug, url } of TARGETS) {
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
      await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 50000 });
      await new Promise(r => setTimeout(r, 3000));
      await dismissBanners(page);
      await new Promise(r => setTimeout(r, 1500));
      const out = path.join(OUT_DIR, `${slug}.jpg`);
      await page.screenshot({ path: out, type: 'jpeg', quality: 82 });
      const kb = (fs.statSync(out).size / 1024).toFixed(0);
      console.log(`✓ ${slug.padEnd(32)} ${url}  (${kb} KB)`);
      ok++;
    } catch (e) {
      console.log(`✗ ${slug.padEnd(32)} ${e.message.slice(0, 80)}`);
    } finally {
      await page.close();
    }
  }
  await browser.close();
  console.log(`\nГотово: ${ok}/${TARGETS.length}`);
})();
