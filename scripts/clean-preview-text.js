// ── Приводим превью бегущей витрины в порядок ──────────────────────────
//
// В витрине работ на странице AI-контента крутятся короткие превью.
// В нескольких из них есть надписи: у части — русские титры («Поддержка
// AI assistant», «ЦВЕТ АРГУМЕНТ», логотип «ВИДНЕЕ» на стене), у части —
// латиница поверх кадра. На английской версии сайта русский текст в
// превью выглядит как недоделка, поэтому витрина должна быть чисто
// визуальной, без единой надписи.
//
// Сами ролики в портфолио не трогаем — там надписи уместны. Правим
// только файлы превью, и двумя способами:
//
//   trim  — вырезаем отрезок без надписи. Если он короче исходника,
//           замедляем, чтобы превью не стало дёрганым огрызком.
//   crop  — надпись держится весь ролик, но сидит у верхней кромки:
//           срезаем полосу сверху, кадр остаётся целым.
//   bars  — у широкоформатного ролика поля сверху и снизу. В карточке
//           4:3 они лезут прямо в кадр белыми или чёрными рамками,
//           поэтому срезаем их и оставляем только картинку.
//
// Карточка витрины показывает видео в пропорции 4:3 по центру
// (см. .project .thumb-wrap), поэтому проверять правку надо именно в
// таком кадрировании, а не по полному кадру.
//
// Запуск:  node scripts/clean-preview-text.js         — перекодировать
//          node scripts/clean-preview-text.js --check  — только показать план
//
// Оригиналы складываются в media-src/previews-original/ — НЕ в public,
// иначе они уехали бы на сервер лишним весом вместе со сборкой.
// Если правка не понравилась, файл оттуда можно вернуть руками.

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'public', 'portfolio-previews');
// Копии оригиналов держим вне public: всё, что лежит внутри, попадает
// в сборку и уезжает на сервер
const BACKUP_DIR = path.join(__dirname, '..', 'media-src', 'previews-original');

// Что и почему правим. Тайминги сняты покадрово: ролики по 3 секунды,
// надпись появляется на указанной секунде.
const FIXES = [
  {
    id: 'b905b223-9be5-4bec-80b4-1f33beff9fd8',
    name: 'NL Sets',
    why: 'первые 2,2 с — брендовая карточка с русским текстом',
    mode: 'trim',
    from: 2.45,
    to: 3.0,
    // чистого куска чуть больше полсекунды, растягиваем вчетверо:
    // героиня идёт, замедление на ней не читается как брак
    slow: 4,
  },
  {
    id: '31f1a366-06e6-4310-9955-ffb672c4fe76',
    name: 'Застройщик — ресепшен',
    why: 'со второй половины в кадре логотип «ВИДНЕЕ» на стене',
    mode: 'trim',
    from: 0,
    to: 1.5,
    slow: 2,
  },
  {
    id: 'b2e6c70a-0a02-44b1-a524-c2e4c8ea9818',
    name: 'CINQUE',
    why: 'в конце выезжает титр «ЦВЕТ АРГУМЕНТ»',
    mode: 'trim',
    from: 0,
    to: 1.85,
    slow: 1.6,
  },
  {
    id: '6d520c21-f53d-45be-99d0-e48394a98f0c',
    name: 'ED Smart — пряник',
    why: 'в конце появляются коробки с надписями',
    mode: 'trim',
    from: 0,
    to: 2.6,
    slow: 1.15,
  },
  {
    id: '63d3bba0-6b46-485c-9225-3d3ffed18ffe',
    name: 'Porsche 911',
    why: 'широкий кадр с белыми полями сверху и снизу',
    // поле 15 px, но край размыт сжатием — режем с запасом
    mode: 'bars',
    top: 18,
    bottom: 18,
  },
  {
    id: '9cb24953-2745-4d7e-8206-5e0ddffded89',
    name: 'Cinque — мебельное производство',
    why: 'тот же широкий кадр, поля чёрные',
    mode: 'bars',
    top: 18,
    bottom: 18,
  },
  {
    id: 'd264e898-73ae-49ad-8483-8ee76527e5f8',
    name: 'SACRED',
    why: 'надпись SACRED висит весь ролик у верхней кромки',
    mode: 'crop',
    // 55 подобрано пробами: надпись уходит, голова героини остаётся в кадре
    top: 55,
  },
];

const checkOnly = process.argv.includes('--check');

const probe = (file) => {
  const out = execFileSync('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height',
    '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1',
    file,
  ]).toString().trim().split('\n');
  return { width: +out[0], height: +out[1], duration: +out[2] };
};

// Кодек и профиль те же, что у остальных превью, иначе часть браузеров
// покажет чёрный прямоугольник вместо ролика
const encode = (extra) => [
  '-an',
  '-c:v', 'libx264',
  '-profile:v', 'high',
  '-pix_fmt', 'yuv420p',
  '-crf', '24',
  '-preset', 'slow',
  '-movflags', '+faststart',
  ...extra,
];

const mb = (f) => (fs.statSync(f).size / 1024).toFixed(0);

let done = 0;

for (const fix of FIXES) {
  const file = path.join(DIR, `${fix.id}.mp4`);
  if (!fs.existsSync(file)) {
    console.log(`  ПРОПУСК ${fix.name}: файла нет`);
    continue;
  }

  // Резервную копию делаем до всего: она и есть источник правды.
  // Если считать размеры с текущего файла, повторный запуск скрипта
  // отрежет ещё раз от уже отрезанного — так и вышло в первый раз.
  const backup = path.join(BACKUP_DIR, `${fix.id}.mp4`);
  if (!checkOnly && !fs.existsSync(backup)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    fs.copyFileSync(file, backup);
  }

  const source = fs.existsSync(backup) ? backup : file;
  const before = probe(source);
  console.log(`\n  ${fix.name} — ${fix.why}`);
  console.log(`    исходник: ${before.width}×${before.height}, ${before.duration.toFixed(1)}с`);

  if (checkOnly) continue;

  const tmp = path.join(DIR, `${fix.id}.tmp.mp4`);
  let args;

  if (fix.mode === 'trim') {
    const filters = [];
    if (fix.slow && fix.slow !== 1) filters.push(`setpts=${fix.slow}*PTS`);
    // -accurate_seek заставляет отсчитать точный кадр, а не прыгнуть на
    // ближайший опорный: без него в начало отрезка попадал хвост титра,
    // который мы как раз и вырезаем.
    // Длительность задаём через -t, а не -to: -to здесь считалось бы уже
    // по растянутому времени и рубило бы замедленный кусок.
    args = [
      '-y',
      '-accurate_seek',
      '-ss', String(fix.from),
      '-t', String(fix.to - fix.from),
      '-i', source,
      ...encode(filters.length ? ['-vf', filters.join(',')] : []),
      tmp,
    ];
  } else {
    // высота должна остаться чётной, иначе yuv420p не соберётся
    const cut = fix.top + (fix.bottom || 0);
    const h = (before.height - cut) - ((before.height - cut) % 2);
    args = [
      '-y',
      '-i', source,
      ...encode(['-vf', `crop=${before.width}:${h}:0:${fix.top}`]),
      tmp,
    ];
  }

  execFileSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] });
  fs.renameSync(tmp, file);

  const after = probe(file);
  console.log(`    стало:    ${after.width}×${after.height}, ${after.duration.toFixed(1)}с, ${mb(file)} КБ`);
  done += 1;
}

console.log('');
if (checkOnly) {
  console.log('  Это был только план. Запустите без --check, чтобы перекодировать.');
} else {
  console.log(`  Готово: перекодировано ${done} превью.`);
  console.log('  Оригиналы: media-src/previews-original/');
  console.log('  Проверять надо в кадрировании 4:3 — именно так их показывает карточка.');
}
