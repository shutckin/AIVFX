#!/usr/bin/env node
/**
 * Картинка для превью ссылки — та самая, что показывают Telegram, WhatsApp,
 * Слак и соцсети, когда кто-то кидает ссылку на сайт.
 *
 * Раньше в мета-тегах стоял адрес /og-image.jpg, а файла по нему не было:
 * сервер отдавал 404, и превью выходило голым текстом.
 *
 * Картинка намеренно одна на оба языка. Всё, что на ней написано, —
 * латиница и домен: так она одинаково читается и в русском превью, и в
 * английском, и её не нужно перерисовывать при каждой правке текстов.
 *
 * Размер 1200×630 — то, что ждут все площадки. Меньше 300×200 Telegram
 * просто не покажет, больше 5 МБ не возьмёт; здесь около сотни килобайт.
 *
 * Запуск:  node scripts/make-og-image.js          — собрать все варианты
 *          node scripts/make-og-image.js a        — только вариант «a»
 *
 * Результат: public/og-image.jpg (боевой) и media-src/og-variants/*.jpg
 * (варианты на выбор, в сборку не попадают).
 */
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const VARIANTS_DIR = path.join(ROOT, 'media-src', 'og-variants');

const W = 1200;
const H = 630;

// Шрифт и фон подставляем прямо в разметку: страница рисуется локально,
// сети нет, поэтому всё должно лежать рядом файлами
const fontFile = (weight) => {
  const p = path.join(PUBLIC, 'fonts', `onest-${weight}-latin.woff2`);
  return 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64');
};

const imageFile = (rel) => {
  const p = path.join(PUBLIC, rel);
  if (!fs.existsSync(p)) return null;
  return 'data:image/jpeg;base64,' + fs.readFileSync(p).toString('base64');
};

const BASE_CSS = `
  @font-face { font-family: 'Onest'; font-weight: 300; src: url('${fontFile(300)}') format('woff2'); }
  @font-face { font-family: 'Onest'; font-weight: 400; src: url('${fontFile(400)}') format('woff2'); }
  @font-face { font-family: 'Onest'; font-weight: 500; src: url('${fontFile(500)}') format('woff2'); }
  @font-face { font-family: 'Onest'; font-weight: 600; src: url('${fontFile(600)}') format('woff2'); }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${W}px; height: ${H}px; overflow: hidden;
    font-family: 'Onest', sans-serif;
    background: #0b0b0d; color: #f2f5fa;
    -webkit-font-smoothing: antialiased;
  }
  .wrap { position: relative; width: 100%; height: 100%; }
  /* Тонкая рамка по краю: в ленте мессенджера картинка не сливается с фоном */
  .edge {
    position: absolute; inset: 0;
    box-shadow: inset 0 0 0 1px rgba(216, 234, 255, 0.10);
  }
  .logo {
    font-weight: 600; letter-spacing: -0.045em; line-height: 0.9;
    color: #f2f5fa;
  }
  .rule { height: 1px; background: rgba(216, 234, 255, 0.16); }
  .sub {
    font-weight: 400; color: rgba(216, 234, 255, 0.62);
    letter-spacing: 0.01em;
  }
  .meta {
    font-weight: 500; font-size: 22px; letter-spacing: 0.16em;
    text-transform: uppercase; color: #6a94ff;
  }
  .domain {
    font-weight: 500; font-size: 26px; letter-spacing: 0.02em;
    color: rgba(216, 234, 255, 0.55);
  }
`;

// ── Вариант A: одна типографика ────────────────────────────────────────
// Ничего лишнего: имя во весь кадр, служебная строка сверху, домен снизу.
// Кадры работ стареют и привязывают карточку к одному направлению —
// голая типографика не устаревает и одинаково честна для обеих услуг.
const variantA = () => `
<style>${BASE_CSS}
  .a { padding: 76px 84px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
  .a .glow {
    position: absolute; width: 900px; height: 900px; border-radius: 50%;
    right: -320px; top: -420px;
    background: radial-gradient(circle, rgba(61,110,247,0.20) 0%, rgba(61,110,247,0) 62%);
  }
  .a .logo { font-size: 168px; }
  .a .sub { font-size: 34px; margin-top: 26px; max-width: 820px; line-height: 1.32; }
  .a .foot { display: flex; align-items: center; justify-content: space-between; }
</style>
<div class="wrap">
  <div class="glow"></div>
  <div class="edge"></div>
  <div class="a">
    <div class="meta">AI systems &nbsp;·&nbsp; AI video &nbsp;·&nbsp; VFX</div>
    <div>
      <div class="logo">AIVFX</div>
      <div class="sub">Automation that answers, qualifies and follows up.<br>Commercials generated, not filmed.</div>
    </div>
    <div class="foot">
      <div class="rule" style="flex:1; margin-right: 28px;"></div>
      <div class="domain">aivfx.ru</div>
    </div>
  </div>
</div>`;

// ── Вариант B: кадр справа ─────────────────────────────────────────────
// Слева имя, справа кадр под наклонной маской. Показывает, что студия
// делает картинку, а не только пишет код.
const variantB = (img, opts = {}) => `
<style>${BASE_CSS}
  .b { display: grid; grid-template-columns: 1fr 1fr; height: 100%; }
  .b .left { padding: 76px 0 76px 84px; display: flex; flex-direction: column; justify-content: space-between; }
  .b .logo { font-size: 132px; }
  .b .sub { font-size: 27px; margin-top: 22px; max-width: 440px; line-height: 1.34; }
  .b .shot { position: relative; overflow: hidden; }
  .b .shot img { width: 100%; height: 100%; object-fit: cover; }
  /* Затемнение к левому краю, чтобы кадр не спорил с текстом */
  .b .shot::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, #0b0b0d 0%, rgba(11,11,13,0.55) 26%, rgba(11,11,13,0) 62%);
  }
</style>
<div class="wrap">
  <div class="b">
    <div class="left">
      <div class="meta">${opts.meta || 'AI systems &nbsp;·&nbsp; AI video'}</div>
      <div>
        <div class="logo">AIVFX</div>
        <div class="sub">${opts.sub || 'Commercials generated, not filmed.'}</div>
      </div>
      <div class="domain">aivfx.ru</div>
    </div>
    <div class="shot"><img src="${img}" alt=""></div>
  </div>
  <div class="edge"></div>
</div>`;

// ── Вариант C: кадр во всю карточку ────────────────────────────────────
// Самый «киношный»: кадр на весь размер, имя поверх. Читается издалека
// в ленте, но целиком отдаёт карточку одному направлению — видео.
const variantC = (img) => `
<style>${BASE_CSS}
  .c { position: absolute; inset: 0; }
  .c img { width: 100%; height: 100%; object-fit: cover; }
  .c .veil {
    position: absolute; inset: 0;
    background:
      linear-gradient(180deg, rgba(11,11,13,0.55) 0%, rgba(11,11,13,0.30) 40%, rgba(11,11,13,0.92) 100%);
  }
  .c .body {
    position: absolute; inset: 0; padding: 70px 84px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .c .logo { font-size: 140px; text-shadow: 0 4px 60px rgba(0,0,0,0.5); }
  .c .sub { font-size: 30px; margin-top: 18px; color: rgba(242,245,250,0.80); }
  .c .foot { display: flex; align-items: center; justify-content: space-between; }
</style>
<div class="wrap">
  <div class="c">
    <img src="${img}" alt="">
    <div class="veil"></div>
    <div class="body">
      <div class="meta">AI systems &nbsp;·&nbsp; AI video &nbsp;·&nbsp; VFX</div>
      <div class="foot">
        <div>
          <div class="logo">AIVFX</div>
          <div class="sub">Commercials generated, not filmed.</div>
        </div>
        <div class="domain">aivfx.ru</div>
      </div>
    </div>
  </div>
  <div class="edge"></div>
</div>`;

async function main() {
  const only = process.argv[2];

  const shot = imageFile('services/s01-video-poster.jpg');
  const robot = imageFile('fixed/aivid-poster.jpg');
  // Ночной кадр в превью почти чёрный и в ленте читается как пятно,
  // поэтому в пару к нему берём светлые кадры витрины
  const vfx = imageFile('services/s02-vfx.jpg');
  const suite = imageFile('services/s04-formats.jpg');

  const VARIANTS = [
    { id: 'a', html: variantA(), why: 'только типографика' },
    { id: 'b', html: shot ? variantB(shot) : null, why: 'кадр справа — ночной город' },
    { id: 'c', html: shot ? variantC(shot) : null, why: 'кадр во всю карточку' },
    { id: 'd', html: robot ? variantB(robot) : null, why: 'маскот, подпись про видео' },
    // Маскот — символ AI-систем, а подпись про одни ролики рядом с ним
    // спорит сама с собой. Здесь строка охватывает оба направления.
    {
      id: 'd2',
      html: robot ? variantB(robot, {
        meta: 'AI systems &nbsp;·&nbsp; AI video &nbsp;·&nbsp; VFX',
        sub: 'Automation that answers and follows up.<br>Commercials generated, not filmed.',
      }) : null,
      why: 'маскот, подпись про оба направления',
    },
    { id: 'e', html: vfx ? variantB(vfx) : null, why: 'кадр справа — вайрфрейм и рендер' },
    { id: 'f', html: suite ? variantB(suite) : null, why: 'кадр справа — монтажная' },
  ].filter((v) => v.html && (!only || v.id === only));

  fs.mkdirSync(VARIANTS_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });

  for (const v of VARIANTS) {
    await page.setContent(v.html, { waitUntil: 'load' });
    await page.evaluateHandle('document.fonts.ready');
    await new Promise((r) => setTimeout(r, 250));
    const out = path.join(VARIANTS_DIR, `og-${v.id}.jpg`);
    await page.screenshot({ path: out, type: 'jpeg', quality: 92 });
    const kb = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`  ${v.id} — ${v.why.padEnd(34)} ${kb} КБ`);
  }

  await browser.close();
  console.log(`\n  Варианты: media-src/og-variants/`);
  console.log('  Выбранный копируется в public/og-image.jpg вручную или так:');
  console.log('    cp media-src/og-variants/og-<id>.jpg public/og-image.jpg');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
