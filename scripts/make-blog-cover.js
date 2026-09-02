#!/usr/bin/env node
/**
 * Типографские обложки для статей блога.
 *
 * Обычно обложки генерируются моделью, но она доступна не всегда: доступ
 * к генератору требует интерактивной авторизации, а статья должна выйти
 * сегодня. Такая обложка - не замена фотографии, а честная альтернатива:
 * тема статьи, набранная фирменной типографикой на фирменном фоне. В
 * ленте блога она читается не хуже картинки, потому что там всё равно
 * читают заголовок, а не разглядывают изображение.
 *
 * Размер 1280×720 - тот же, что у остальных обложек блога, чтобы карточки
 * в витрине не прыгали по высоте.
 *
 * Запуск: node scripts/make-blog-cover.js
 */
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'blog-images');

const W = 1280;
const H = 720;

// Что рисуем: файл, надстрочная строка и сама тема
const COVERS = [
  {
    file: 'cover-seedance.jpg',
    kicker: 'МОДЕЛЬ · BYTEDANCE',
    title: 'Seedance 2.5',
    sub: '30 секунд нативно · до 3 минут · 50 референсов',
  },
  {
    file: 'cover-agregatory.jpg',
    kicker: 'ПЛАТФОРМЫ · ОДНА ПОДПИСКА',
    title: 'Higgsfield · Flowith · Syntx',
    sub: 'Десятки моделей в одном месте',
  },
  {
    file: 'cover-nano-seedream.jpg',
    kicker: 'ИЗОБРАЖЕНИЯ · СРАВНЕНИЕ',
    title: 'Nano Banana Pro\nи Seedream 5 Pro',
    sub: 'Текст в кадре, слои, правка по областям',
  },
];

const fontFile = (weight) => {
  const p = path.join(ROOT, 'public', 'fonts', `onest-${weight}-latin.woff2`);
  return 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
};
const fontFileCyr = (weight) => {
  const p = path.join(ROOT, 'public', 'fonts', `onest-${weight}-cyrillic.woff2`);
  return 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
};

const html = ({ kicker, title, sub }) => `
<style>
  @font-face { font-family: 'Onest'; font-weight: 400; src: url('${fontFile(400)}') format('woff2'); }
  @font-face { font-family: 'Onest'; font-weight: 400; src: url('${fontFileCyr(400)}') format('woff2'); unicode-range: U+0400-04FF; }
  @font-face { font-family: 'Onest'; font-weight: 500; src: url('${fontFile(500)}') format('woff2'); }
  @font-face { font-family: 'Onest'; font-weight: 500; src: url('${fontFileCyr(500)}') format('woff2'); unicode-range: U+0400-04FF; }
  @font-face { font-family: 'Onest'; font-weight: 600; src: url('${fontFile(600)}') format('woff2'); }
  @font-face { font-family: 'Onest'; font-weight: 600; src: url('${fontFileCyr(600)}') format('woff2'); unicode-range: U+0400-04FF; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${W}px; height: ${H}px; overflow: hidden;
    font-family: 'Onest', sans-serif;
    background: #0b0b0d; color: #f2f5fa;
    -webkit-font-smoothing: antialiased;
  }
  .wrap { position: relative; width: 100%; height: 100%; padding: 78px 84px; display: flex; flex-direction: column; justify-content: space-between; }
  /* Та же сетка и то же свечение, что на страницах сайта: обложка должна
     выглядеть частью издания, а не отдельной картинкой */
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(216,234,255,0.10) 1px, transparent 1px),
      linear-gradient(90deg, rgba(216,234,255,0.10) 1px, transparent 1px);
    background-size: 56px 56px;
    opacity: 0.5;
    mask-image: linear-gradient(160deg, black 0%, transparent 62%);
    -webkit-mask-image: linear-gradient(160deg, black 0%, transparent 62%);
  }
  .glow {
    position: absolute; inset: 0;
    background:
      radial-gradient(680px 420px at 88% 6%, rgba(61,110,247,0.30) 0%, transparent 66%),
      radial-gradient(520px 360px at 4% 96%, rgba(61,110,247,0.14) 0%, transparent 72%);
  }
  .in { position: relative; }
  .kicker {
    font-weight: 500; font-size: 20px; letter-spacing: 0.18em;
    text-transform: uppercase; color: #6a94ff;
  }
  .title {
    font-weight: 600; font-size: 78px; line-height: 1.02;
    letter-spacing: -0.04em; white-space: pre-line; margin-top: 22px;
  }
  .sub { font-weight: 400; font-size: 26px; color: rgba(216,234,255,0.62); margin-top: 24px; }
  .foot { display: flex; align-items: center; justify-content: space-between; }
  .rule { flex: 1; height: 1px; background: rgba(216,234,255,0.16); margin-right: 26px; }
  .brand { font-weight: 600; font-size: 24px; letter-spacing: -0.03em; }
</style>
<div class="wrap">
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="in kicker">${kicker}</div>
  <div class="in">
    <div class="title">${title}</div>
    <div class="sub">${sub}</div>
  </div>
  <div class="in foot">
    <span class="rule"></span>
    <span class="brand">AIVFX</span>
  </div>
</div>`;

async function main() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  for (const cover of COVERS) {
    await page.setContent(html(cover), { waitUntil: 'load' });
    await page.evaluateHandle('document.fonts.ready');
    await new Promise((r) => setTimeout(r, 200));
    const out = path.join(OUT_DIR, cover.file);
    await page.screenshot({ path: out, type: 'jpeg', quality: 90 });
    console.log(`  ${cover.file.padEnd(28)} ${(fs.statSync(out).size / 1024).toFixed(0)} КБ`);
  }

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
