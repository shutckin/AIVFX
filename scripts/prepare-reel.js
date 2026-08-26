// ── Подготовка ролика для блока «Как рождается ролик» ──────────────────
//
// Ролик на сайте не проигрывается, а перематывается вместе с прокруткой
// (см. ProcessFlow.js). Браузер умеет прыгать только по опорным кадрам,
// поэтому их надо ставить часто — иначе картинка при перемотке замирает.
//
// Первая версия скрипта делала опорным КАЖДЫЙ кадр. Перемотка от этого
// идеальная, но вес растёт в разы, и чтобы влезть в разумный размер
// приходилось так давить качество, что с продукта пропадала фактура.
// Сейчас опорный кадр раз в полсекунды: перемотка на глаз такая же,
// а качество можно держать почти исходное.
//
// Готовим две версии одного ролика:
//   reel-lq.mp4 — лёгкая, включается сразу, чтобы блок не ждал загрузки
//   reel.mp4    — полная, подменяет лёгкую, когда докачается
//
// Запуск:
//   node scripts/prepare-reel.js <путь-к-исходнику.mp4> [имя]
//
// Имя по умолчанию reel. Для английской версии передаётся с суффиксом,
// например approach-en — тогда лёгкая версия станет approach-lq-en.mp4,
// как того ждёт lib/localizedMedia.

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const src = process.argv[2];
if (!src) {
  console.error('Укажите путь к исходному ролику:\n  node scripts/prepare-reel.js ~/Downloads/reel.mp4');
  process.exit(1);
}
if (!fs.existsSync(src)) {
  console.error(`Файл не найден: ${src}`);
  process.exit(1);
}

const outDir = path.join(__dirname, '..', 'public', 'process');
fs.mkdirSync(outDir, { recursive: true });

const name = process.argv[3] || 'reel';

// Суффикс языка должен остаться последним, иначе сайт не найдёт файл:
// approach-en → approach-lq-en, а не approach-en-lq
const withLight = (n) => (n.endsWith('-en')
  ? `${n.slice(0, -3)}-lq-en`
  : `${n}-lq`);

const outVideo = path.join(outDir, `${name}.mp4`);
const outLight = path.join(outDir, `${withLight(name)}.mp4`);
const outPoster = path.join(outDir, `${name}-poster.jpg`);

// Опорный кадр раз в полсекунды: при 12 кадрах в секунду это каждый шестой
const GOP = 6;

// Общие ключи кодирования. H.264, а не HEVC: HEVC не играет в Chrome
// и Firefox. yuv420p — иначе часть браузеров не покажет вовсе.
const common = (width, crf) => [
  '-an',                       // звук не нужен: ролик перематывается, а не играет
  '-vf', `scale=${width}:-2,fps=12`,
  '-c:v', 'libx264',
  '-profile:v', 'high',
  '-pix_fmt', 'yuv420p',
  '-g', String(GOP),
  '-keyint_min', String(GOP),
  '-sc_threshold', '0',        // без этого кодек ставит опорные кадры по-своему
  '-crf', String(crf),
  '-preset', 'slow',
  '-movflags', '+faststart',   // метаданные в начало: перемотка доступна сразу
];

const run = (args) => execFileSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] });

const probe = (file) => {
  const out = execFileSync('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,r_frame_rate',
    '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1',
    file,
  ]).toString().trim().split('\n');
  return { width: +out[0], height: +out[1], fps: out[2], duration: +out[3] };
};

const before = probe(src);
console.log(`Исходник: ${before.width}×${before.height}, ${before.duration.toFixed(1)}с`);

// Не больше 1248 по ширине: выше апскейл новых деталей не добавит,
// только вес. Меньше — оставляем как есть.
console.log('Кодирую полную версию…');
run(['-y', '-i', src, ...common(Math.min(1248, before.width), 23), outVideo]);

// Лёгкая версия нужна ровно на те секунды, пока грузится полная.
// 560 по ширине на полном экране мылит, но это лучше пустого места.
console.log('Кодирую лёгкую версию для мгновенного старта…');
run(['-y', '-i', src, ...common(Math.min(560, before.width), 30), outLight]);

console.log('Снимаю постер с первого кадра…');
run(['-y', '-i', src, '-frames:v', '1', '-vf', `scale=${Math.min(1248, before.width)}:-2`, '-q:v', '4', outPoster]);

const after = probe(outVideo);
const mb = (f) => (fs.statSync(f).size / 1024 / 1024).toFixed(1);

console.log('');
console.log(`Готово: ${path.basename(outVideo)} — ${after.width}×${after.height}, ${mb(outVideo)} МБ`);
console.log(`        ${path.basename(outLight)} — ${mb(outLight)} МБ`);
console.log(`        ${path.basename(outPoster)} — ${mb(outPoster)} МБ`);
console.log('');
if (+mb(outLight) > 2) {
  console.log('Лёгкая версия великовата: она должна долетать почти мгновенно.');
  console.log('Подними ей crf с 30 до 34 в этом скрипте.');
}
