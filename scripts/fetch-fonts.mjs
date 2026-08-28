// ── Забрать шрифт Onest к себе ─────────────────────────────────────────
//
// Раньше шрифт грузился с fonts.googleapis.com и fonts.gstatic.com. Это
// два чужих домена, а значит два отдельных соединения с рукопожатием
// поверх обычной загрузки сайта. На большой задержке до сервера каждое
// такое рукопожатие стоит сотни миллисекунд — всё это время текст стоит
// запасным шрифтом, а потом прыгает на Onest. Это тот самый «проскок»
// шрифтов через секунду после открытия.
//
// Свои файлы едут по уже открытому соединению вместе с остальным сайтом.
//
// Скрипт разовый: запускать, когда меняется набор весов в макете.
// После запуска правила из public/fonts.css надо вписать в <style>
// внутри public/index.html — там они начинают работать сразу при разборе
// страницы, без ожидания отдельного файла стилей.
//
// Запуск: node scripts/fetch-fonts.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const FONT_DIR = path.join(here, '..', 'public', 'fonts');
const CSS_OUT = path.join(here, '..', 'public', 'fonts.css');

// Веса, которые реально встречаются в стилях проекта.
// Проверить: grep -rhoE "font-weight:\s*[0-9]+" src/ --include="*.css"
const WEIGHTS = [200, 300, 400, 500, 600, 700];

// Сайт русско-английский. Математику, символы и вьетнамский Google отдаёт
// отдельными файлами — они на страницах не встречаются, качать их незачем.
const KEEP_RANGES = new Set(['cyrillic', 'latin']);

// Без браузерного User-Agent Google отдаёт устаревший формат вместо woff2
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
  + '(KHTML, like Gecko) Chrome/131.0 Safari/537.36';

const url = `https://fonts.googleapis.com/css2?family=Onest:wght@${WEIGHTS.join(';')}&display=swap`;

const css = await (await fetch(url, { headers: { 'User-Agent': UA } })).text();
const blocks = [...css.matchAll(/\/\* (\S+) \*\/\s*@font-face \{(.+?)\}/gs)];

fs.mkdirSync(FONT_DIR, { recursive: true });

const faces = [];
let total = 0;

for (const [, range, body] of blocks) {
  if (!KEEP_RANGES.has(range)) continue;

  const weight = body.match(/font-weight:\s*(\d+)/)[1];
  const src = body.match(/url\((https:\/\/[^)]+\.woff2)\)/)[1];
  const unicodeRange = body.match(/unicode-range:\s*([^;]+);/)[1].trim();

  const name = `onest-${weight}-${range}.woff2`;
  const buf = Buffer.from(await (await fetch(src)).arrayBuffer());
  fs.writeFileSync(path.join(FONT_DIR, name), buf);
  total += buf.length;

  faces.push({ weight: Number(weight), range, name, unicodeRange });
}

faces.sort((a, b) => a.weight - b.weight || a.range.localeCompare(b.range));

const out = [
  '/* ── Шрифт Onest, свой, не с серверов Google ──────────────────────────',
  '   Собрано scripts/fetch-fonts.mjs. Руками не править.',
  '',
  '   Эти же правила вписаны в <style> внутри public/index.html — там они',
  '   начинают работать сразу при разборе страницы. Файл рядом нужен',
  '   как источник, чтобы было откуда копировать после перегенерации. */',
  '',
  ...faces.map(({ weight, name, unicodeRange }) => `@font-face {
  font-family: 'Onest';
  font-style: normal;
  font-weight: ${weight};
  font-display: swap;
  src: url('/fonts/${name}') format('woff2');
  unicode-range: ${unicodeRange};
}`),
];

fs.writeFileSync(CSS_OUT, `${out.join('\n')}\n`, 'utf8');

console.log(`[fonts] скачано ${faces.length} файлов, ${(total / 1024).toFixed(0)} КБ`);
console.log('[fonts] правила: public/fonts.css → вписать в <style> в public/index.html');
