// ── Подготовка ролика для блока «Как рождается ролик» ──────────────────
//
// Ролик на сайте не проигрывается, а перематывается вместе с прокруткой
// (см. ProcessFlow.js). Для перемотки исходник с обычным сжатием не годится:
// браузер умеет прыгать только по ключевым кадрам, и между ними картинка
// замирает. Поэтому здесь каждый кадр делается ключевым.
//
// Плата за это — размер файла, поэтому одновременно режем разрешение и
// поднимаем сжатие: на сайте ролик живёт в колонке шириной около 600px,
// исходные 1248px там не нужны.
//
// Запуск:
//   node scripts/prepare-reel.js <путь-к-исходнику.mp4>

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

const outVideo = path.join(outDir, 'reel.mp4');
const outPoster = path.join(outDir, 'reel-poster.jpg');

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

// Ширина 720 при вертикали 3:4 даёт 720×960: с запасом хватает для колонки
// на любом экране, включая retina.
console.log('Кодирую с каждым кадром ключевым (это нужно для перемотки)…');
run([
  '-y', '-i', src,
  '-an',                       // звук не нужен: ролик перематывается, а не играет
  '-vf', 'scale=720:-2',
  '-c:v', 'libx264',           // H.264, а не HEVC: HEVC не играет в Chrome и Firefox
  '-profile:v', 'high',
  '-pix_fmt', 'yuv420p',
  '-g', '1',                   // каждый кадр ключевой
  '-crf', '26',
  '-preset', 'slow',
  '-movflags', '+faststart',   // метаданные в начало: перемотка доступна сразу
  outVideo,
]);

console.log('Снимаю постер с первого кадра…');
run(['-y', '-i', src, '-frames:v', '1', '-vf', 'scale=720:-2', '-q:v', '4', outPoster]);

const after = probe(outVideo);
const mb = (f) => (fs.statSync(f).size / 1024 / 1024).toFixed(1);

console.log('');
console.log(`Готово: public/process/reel.mp4 — ${after.width}×${after.height}, ${mb(outVideo)} МБ`);
console.log(`        public/process/reel-poster.jpg — ${mb(outPoster)} МБ`);
console.log('');
if (+mb(outVideo) > 6) {
  console.log('Файл тяжеловат для страницы. Подними --crf до 30 в этом скрипте и перекодируй.');
}
